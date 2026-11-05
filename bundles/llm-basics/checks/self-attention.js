// Recomputes the answers of elements/self-attention.md (ptf-spec SPEC.md §7.1).

const softmax = (z) => { const e = z.map(Math.exp), s = e.reduce((a, b) => a + b, 0); return e.map((x) => x / s); };
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

check("tiny-attention", (q) => {
  const qv = [1, 0], keys = [[2, 0], [0, 1], [1, 1]], d = 2;
  const raw = keys.map((k) => dot(qv, k)), scaled = raw.map((s) => s / Math.sqrt(d)), w = softmax(scaled);
  q.rows.forEach((row, i) => {
    ptf.assert(ptf.near(ptf.num(row[1]), raw[i]), `q · k in row ${i + 1}`);
    ptf.assert(ptf.near(ptf.num(row[2]), scaled[i], 0.005), `scaled score in row ${i + 1}`);
    ptf.assert(ptf.near(ptf.num(row[3]), Math.exp(scaled[i]), 0.005), `e^score in row ${i + 1}`);
  });
  const unscaled = softmax(raw);
  ptf.assert([0.665, 0.090, 0.245].every((x, i) => ptf.near(x, unscaled[i], 0.0005)), "unscaled weights in the explanation");
  ptf.assert(w[0] === Math.max(...w) && ptf.near(w[0] * 100, 57.6, 0.05), "token 1 gets 57.6 %");
  return { rows: w };
});

check("score-variance", () => {
  // Var(Σ qᵢkᵢ) = Σ Var(qᵢ)Var(kᵢ) for independent, mean-0 entries; cross-checked by simulation.
  let seed = 42;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const gauss = () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(2 * Math.PI * rnd());
  const n = 4000, s = Array.from({ length: n }, () => { let t = 0; for (let i = 0; i < 64; i++) t += gauss() * gauss(); return t; });
  const m = s.reduce((a, b) => a + b, 0) / n, v = s.reduce((a, b) => a + (b - m) ** 2, 0) / n;
  ptf.assert(ptf.near(v, 64, 6), "simulated variance near 64");
  return 64 * 1 * 1;
});
