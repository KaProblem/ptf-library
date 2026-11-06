// Recomputes the answers of elements/multiclass-classification.md (PTF SPEC.md §7.1).

const softmax = (z) => { const m = Math.max(...z), e = z.map((v) => Math.exp(v - m)), s = e.reduce((a, b) => a + b, 0); return e.map((v) => v / s); };
const ce = (z, y) => -Math.log(softmax(z)[y]);
const sig = (z) => 1 / (1 + Math.exp(-z));
const p = softmax([2, 1, 0]);

check("fruit-warmup", () => [ptf.near(0.7 + 0.6 + 0.1, 1.4), false, false]);

check("ova-setup", () => [true, true, false, 10 * 9 / 2 === 45 && false]);

check("softmax-by-hand", () => {
  const e = [Math.exp(2), Math.exp(1), 1], s = e[0] + e[1] + e[2];
  return { rows: [s, e[0] / s, e[1] / s, e[2] / s], result: e[0] / s };
});

check("cross-entropy-hs", () => ce([2, 1, 0], 1));

check("shift-scores", () => {
  const q = softmax([12, 11, 10]);
  const same = q.every((v, i) => ptf.near(v, p[i], 1e-12));
  return [same, q[0] > 0.95, q.every((v) => ptf.near(v, 1 / 3, 0.05))];
});

check("tags-or-classes", () => [true, false, false]);

check("multiclass-probe", () => { const q = softmax([3.2, -1.0, 0.4]); return [q[0] === Math.max(...q), false, false]; });

check("softmax-grad-college", () => {
  const g = p.map((v, i) => v - (i === 0 ? 1 : 0));
  // Finite-difference check of ∂L/∂z.
  const fd = [0, 1, 2].map((i) => { const zp = [2, 1, 0], zm = [2, 1, 0]; zp[i] += 1e-6; zm[i] -= 1e-6; return (ce(zp, 0) - ce(zm, 0)) / 2e-6; });
  ptf.assert(fd.every((v, i) => ptf.near(v, g[i], 1e-5)), "gradient p − onehot");
  return [
    [-0.335, 0.245, 0.09].every((v, i) => ptf.round(g[i], 3) === v),
    g[0] < 0 && g[1] > 0 && g[2] > 0,
    ptf.near(g[1], g[2]),
    ptf.near(g.reduce((a, b) => a + b, 0), 1),
  ];
});

check("baseline-loss-college", () => ce(Array(10).fill(0), 3));

check("two-class-college", () => {
  const ok = [-3, 0, 0.7, 4].every((z) => ptf.near(softmax([z, 0])[0], sig(z)));
  const z = [1, 0.5, -1], sep = z.map(sig), sm = softmax(z);
  return [ok, true, sep.every((v, i) => ptf.near(v, sm[i])), false];
});

check("output-design-college", () => {
  // With softmax, at most one class can exceed 0.5.
  const trials = [[3, 2.9, -1], [0, 0, 0, 0], [5, 4, 3]].map((z) => softmax(z).filter((v) => v > 0.5).length);
  return [true, false, trials.some((n) => n > 1)];
});

fact("e² ≈ 7.389, e ≈ 2.718, sum ≈ 11.107; p ≈ (0.665, 0.245, 0.090)", () =>
  ptf.round(Math.exp(2), 3) === 7.389 && ptf.round(Math.E, 3) === 2.718 && ptf.round(Math.exp(2) + Math.E + 1, 3) === 11.107 &&
  [0.665, 0.245, 0.09].every((v, i) => ptf.round(p[i], 3) === v));
fact("(12, 11, 10) gives the same p", () => softmax([12, 11, 10]).every((v, i) => ptf.near(v, p[i], 1e-12)));
fact("losses 0.408 and 2.408; ln 3 ≈ 1.099; ln 10 ≈ 2.303", () =>
  ptf.round(ce([2, 1, 0], 0), 3) === 0.408 && ptf.round(ce([2, 1, 0], 2), 3) === 2.408 && ptf.round(Math.log(3), 3) === 1.099 && ptf.round(Math.log(10), 3) === 2.303);
fact("−ln 0.665 ≈ 0.41, −ln 0.090 ≈ 2.41", () => ptf.round(-Math.log(p[0]), 2) === 0.41 && ptf.round(-Math.log(p[2]), 2) === 2.41);
fact("e² ≈ 7.39, e¹ ≈ 2.72, total 11.11", () => ptf.round(Math.exp(2), 2) === 7.39 && ptf.round(Math.E, 2) === 2.72 && ptf.round(Math.exp(2) + Math.E + 1, 2) === 11.11);
