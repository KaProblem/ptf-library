// Recomputes the answers of elements/decoding-strategies.md (ptf-spec SPEC.md §7.1).

const softmax = (z) => { const m = Math.max(...z); const e = z.map((x) => Math.exp(x - m)); const s = e.reduce((a, b) => a + b, 0); return e.map((x) => x / s); };
const withT = (z, T) => softmax(z.map((x) => x / T));
const topK = (p, k) => { const kept = p.slice(0, k); const s = kept.reduce((a, b) => a + b, 0); return kept.map((x) => x / s); };
const topP = (p, P) => {
  let cum = 0, n = 0;
  while (n < p.length && cum < P - 1e-12) cum += p[n++];
  const kept = p.slice(0, n); const s = kept.reduce((a, b) => a + b, 0);
  return { kept: kept.map((x) => x / s), cum: p.slice(0, n).map((_, i) => p.slice(0, i + 1).reduce((a, b) => a + b, 0)) };
};
const P = [0.5, 0.2, 0.15, 0.1, 0.05];

check("topk-coffee", () => topK(P, 2)[0] * 100);
check("topp-count", () => topP(P, 0.8).kept.length);

check("temperature-calc", () => ({
  rows: [withT([2, 1, 0], 0.5)[0], withT([2, 1, 0], 1)[0], withT([2, 1, 0], 2)[0]],
  result: withT([2, 1, 0], 0.1)[0],
}));

check("topp-renorm", () => {
  const r = topP(P, 0.8);
  ptf.assert(ptf.near(r.cum[2], 0.85), "cumulative 0.85");
  return { rows: r.kept, result: r.kept.length };
});

check("beam-vs-greedy", () => {
  // Step-2 distributions: after A the best is 0.4, after B 0.9.
  const step1 = { A: 0.6, B: 0.4 }, best2 = { A: 0.4, B: 0.9 };
  const greedyFirst = step1.A > step1.B ? "A" : "B";
  const greedy = step1[greedyFirst] * best2[greedyFirst];
  const beam = Math.max(step1.A * best2.A, step1.B * best2.B);
  ptf.assert(ptf.near(greedy, 0.24) && ptf.near(beam, 0.36), "0.24 and 0.36");
  return [true, beam === greedy, false];
});

fact("Logits [2, 1, 0]: top token 0.665 at T = 1, 0.867 at T = 0.5, 0.506 at T = 2", () =>
  ptf.round(withT([2, 1, 0], 1)[0], 3) === 0.665 && ptf.round(withT([2, 1, 0], 0.5)[0], 3) === 0.867 && ptf.round(withT([2, 1, 0], 2)[0], 3) === 0.506);
fact("k = 2 → [0.714, 0.286]", () => topK(P, 2).map((x) => ptf.round(x, 3)).join() === "0.714,0.286");
fact("top-p 0.8: cumulative 0.5, 0.7, 0.85 → keep 3 tokens → [0.588, 0.235, 0.176]", () =>
  topP(P, 0.8).kept.map((x) => ptf.round(x, 3)).join() === "0.588,0.235,0.176");
fact("greedy gets A… with 0.6 · 0.4 = 0.24, beam search … 0.4 · 0.9 = 0.36", () => ptf.near(0.6 * 0.4, 0.24) && ptf.near(0.4 * 0.9, 0.36));
fact("they are rescaled to about 71 % and 29 %", () => ptf.round(topK(P, 2)[0] * 100, 0) === 71 && ptf.round(topK(P, 2)[1] * 100, 0) === 29);
fact("coffee (50) + tea (20) + cocoa (15) = 85 %", () => 50 + 20 + 15 === 85);
fact("tends to uniform (1/3 each here)", () => ptf.near(withT([2, 1, 0], 1e6)[0], 1 / 3, 1e-4));
