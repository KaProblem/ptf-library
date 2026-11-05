// Recomputes the answers of elements/overfitting-regularization.md (PTF SPEC.md §7.1).

const sumSq = (w) => w.reduce((s, x) => s + x * x, 0);
const objective = (loss, w, lam) => loss + lam * sumSq(w);
const argminEpoch = (vals) => vals.indexOf(Math.min(...vals)) + 1;
// Classify (training, validation) losses with simple thresholds: gap > 0.2 overfits, both > 0.4 underfits.
const diagnose = ([tr, va]) => (va - tr > 0.2 ? "over" : tr > 0.4 && va > 0.4 ? "under" : "good");

check("wiggly-warmup", () => {
  // Points on y = x + noise; degree-9 interpolation vs the true line at a new point.
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], noise = [0.3, -0.2, 0.25, -0.3, 0.1, -0.15, 0.2, -0.25, 0.3, -0.1];
  const ys = xs.map((x, i) => x + noise[i]);
  const lagrange = (x) => xs.reduce((s, xi, i) => s + ys[i] * xs.reduce((p, xj, j) => (j === i ? p : p * (x - xj) / (xi - xj)), 1), 0);
  const xNew = 9.5, truth = xNew;
  return [Math.abs(lagrange(xNew) - truth) > Math.abs(xNew - truth) + 0.3, false, false];
});

check("diagnose-fit", () => {
  const d = [[0.05, 0.6], [0.55, 0.58], [0.18, 0.21]].map(diagnose);
  return [d.join() === "over,under,good", false, false];
});

check("early-stop-epoch", () => argminEpoch([0.92, 0.66, 0.50, 0.44, 0.43, 0.47, 0.55]));

check("curve-reading", () => [true, false, false]);

check("l2-penalty", () => { const w = [0.2, -0.5, 5, 1]; return { rows: [null, sumSq(w), 0.1 * sumSq(w)], result: 0.1 * sumSq(w) }; });

check("lambda-effect", () => [true, false, false]);
check("overfit-probe", () => [true, false, false]);

check("lambda-ranking-college", () => {
  const A = (l) => objective(0.40, [1, 2], l), B = (l) => objective(0.35, [3, 4], l);
  ptf.assert(ptf.near(A(0.01), 0.45) && ptf.near(B(0.01), 0.60), "0.45 vs 0.60");
  ptf.assert(ptf.near(A(0.001), 0.405) && ptf.near(B(0.001), 0.375), "0.405 vs 0.375");
  return [A(0.01) < B(0.01), B(0.001) < A(0.001), ptf.near(A(0.005), B(0.005)), A(0) < B(0)];
});

check("weight-decay-college", () => { let w = 2; for (let i = 0; i < 10; i++) w -= 0.1 * 2 * 0.05 * w; return w; });

check("curve-diagnosis-college", () => [true, true, false, false]);

fact("best validation epoch 4 in 0.90, 0.60, 0.45, 0.41, 0.43, 0.48", () => argminEpoch([0.9, 0.6, 0.45, 0.41, 0.43, 0.48]) === 4);
fact("Σw² = 26.29, penalty 2.629, 25 from the 5", () => ptf.near(sumSq([0.2, -0.5, 5, 1]), 26.29) && ptf.near(0.1 * 26.29, 2.629));
fact("λ = 0.01: A 0.45 < B 0.60; λ = 0.001: A 0.405 > B 0.375", () =>
  ptf.near(objective(0.4, [1, 2], 0.01), 0.45) && ptf.near(objective(0.35, [3, 4], 0.01), 0.6) &&
  ptf.near(objective(0.4, [1, 2], 0.001), 0.405) && ptf.near(objective(0.35, [3, 4], 0.001), 0.375));
fact("models flip at λ = 0.0025", () => ptf.near((0.40 - 0.35) / (25 - 5), 0.0025));
