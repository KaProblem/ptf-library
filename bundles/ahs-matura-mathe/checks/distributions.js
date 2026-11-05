// Recomputes the answers of elements/distributions.md (PTF SPEC.md §7.1).

const choose = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };
const pmf = (n, p, k) => choose(n, k) * p ** k * (1 - p) ** (n - k);
const cdf = (n, p, k) => { let s = 0; for (let i = 0; i <= k; i++) s += pmf(n, p, i); return s; };
const E = (vals, ps) => vals.reduce((s, v, i) => s + v * ps[i], 0);
const SD = (vals, ps) => { const m = E(vals, ps); return Math.sqrt(vals.reduce((s, v, i) => s + (v - m) ** 2 * ps[i], 0)); };
const nums = (text) => (String(text).match(/[−-]?\d+(?:\.\d+)?/g) || []).map(ptf.num);

fact("school fair σ ≈ 1.47", () => ptf.near(SD([5, 1, 0], [0.1, 0.3, 0.6]), 1.47, 0.005));
fact("B(10, 0.3): P(X ≤ 2) ≈ 0.383, P(X ≥ 1) ≈ 0.972, σ ≈ 1.45", () =>
  ptf.near(cdf(10, 0.3, 2), 0.383, 0.0005) && ptf.near(1 - pmf(10, 0.3, 0), 0.972, 0.0005) && ptf.near(Math.sqrt(2.1), 1.45, 0.005));

check("fair-expected", () => E([5, 1, 0], [0.1, 0.3, 0.6]));

check("valid-distribution", (q) => q.options.map((o) => {
  const ps = nums(o.text);
  return ps.length === 4 && ps.every((p) => p >= 0 && p <= 1) && ptf.near(ps.reduce((s, p) => s + p, 0), 1);
}));

check("expected-meaning", () => {
  const ps = [0, 1, 2, 3].map((k) => pmf(3, 0.5, k));
  ptf.assert(ptf.near(E([0, 1, 2, 3], ps), 1.5), "E = 1.5");
  const mostLikely = Math.max(...ps);
  return [true, false, ptf.near(mostLikely, ps[1]) && false, ptf.near(ps[1] + ps[2], 1)];
});

check("binomial-exactly", () => pmf(10, 0.3, 3));

check("binomial-at-least", () => ({
  rows: [20 * 0.05, pmf(20, 0.05, 0), 1 - pmf(20, 0.05, 0), cdf(20, 0.05, 1)],
  result: 1 - pmf(20, 0.05, 0),
}));

check("binomial-parameters", () => [10 * 0.3, 10 * 0.3 * 0.7]);

check("is-it-binomial", () => {
  // Simulate the per-trial success probability of each situation for a few histories.
  const constantP = [
    [1 / 6, 1 / 6, 1 / 6],          // die: same every throw
    [1 / 4, 1 / 4, 1 / 4],          // guessing
    [4 / 10, 3 / 9, 4 / 9],         // cards: depends on what was drawn
  ].map((ps) => ps.every((p) => p === ps[0]));
  return [constantP[0], constantP[1], constantP[2], false, false];
});

check("formula-meaning", () => {
  const v = 1 - 0.75 ** 8;
  return [ptf.near(v, 1 - pmf(8, 0.25, 0)), ptf.near(v, pmf(8, 0.25, 1)), ptf.near(v, pmf(8, 0.25, 8)), ptf.near(v, 8 * 0.25)];
});

check("expected-probe", () => {
  const p3 = pmf(10, 0.3, 3);
  return [ptf.near(p3, 0.27, 0.005) && 1 - p3 > p3, ptf.near(p3, 0.9, 0.05), ptf.near(p3, 0.3, 1e-9)];
});

check("model-check", () => {
  ptf.assert(6 / 24 === 0.25 && !ptf.near(5 / 23, 0.25), "p changes after the first pick");
  return true;
});
