// Recomputes the answers of elements/logistic-regression.md (PTF SPEC.md §7.1).

const sig = (z) => 1 / (1 + Math.exp(-z));
const ll = (y, p) => (y === 1 ? -Math.log(p) : -Math.log(1 - p));
const spam = (x) => sig(-2 + 0.8 * x);

check("rain-warmup", () => [true, false, false]);

check("sigmoid-value", () => spam(5));

check("sigmoid-shape", () => [
  sig(0) === 0.5,
  [-50, -5, 0, 5, 30].every((z) => sig(z) > 0 && sig(z) < 1),
  ptf.near(sig(2) - sig(0), sig(6) - sig(4), 0.01),
  sig(-3) < 0,
]);

check("confident-wrong", () => {
  const a = ll(1, 0.6), b = ll(1, 0.1);
  ptf.assert(ptf.round(a, 2) === 0.51 && ptf.round(b, 2) === 2.3, "stated losses");
  return [b > 4 * a, ptf.near(a, b), a > b];
});

check("log-loss-not-spam", () => {
  ptf.assert(ptf.round((0.99 - 0) ** 2, 2) === 0.98, "MSE comparison in the explanation");
  return ll(0, 0.99);
});

check("why-regularize", () => {
  // Separable data: x = 1 (lottery) always spam, x = 0 never. Loss keeps falling as w grows.
  const data = [[1, 1], [1, 1], [0, 0], [0, 0]];
  const loss = (w) => data.reduce((s, [x, y]) => s + ll(y, sig(w * x - w / 2)), 0);
  const falling = [1, 2, 4, 8, 16].every((w, i, a) => i === 0 || loss(w) < loss(a[i - 1]));
  return [falling, !falling, false];
});

check("logreg-probe", () => [true, false, false]);

check("odds-college", () => {
  const z = (x) => -2 + 0.8 * x, odds = (p) => p / (1 - p);
  return [
    ptf.near(odds(sig(z(3))) / odds(sig(z(2))), Math.exp(0.8)) && ptf.round(Math.exp(0.8), 2) === 2.23,
    ptf.near(sig(z(2.5)), 0.5),
    ptf.near(sig(z(1)) - sig(z(0)), 0.8),
    sig(z(0)) === -2,
    ptf.near(Math.log(0.8 / 0.2), 0.8),
  ];
});

check("mean-log-loss-college", () => [[1, 0.8], [0, 0.3], [1, 0.6], [0, 0.1]].reduce((s, [y, p]) => s + ll(y, p), 0) / 4);

check("why-not-mse-college", () => {
  // Confident mistake: y = 1, z = −6. Gradient wrt z: log loss p − y; MSE 2(p − y) σ′(z).
  const z = -6, p = sig(z), gLog = p - 1, gMse = 2 * (p - 1) * p * (1 - p);
  return [Math.abs(gLog) > 100 * Math.abs(gMse), false, false, false];
});

check("separable-college", () => {
  const data = [[-2, 0], [-1, 0], [1, 1], [3, 1]];
  const L = (w, b = 0) => data.reduce((s, [x, y]) => s + ll(y, sig(w * x + b)), 0) / data.length;
  const Lreg = (w, lam) => L(w) + lam * w * w;
  const scaling = [1, 2, 4, 8].every((c, i, a) => i === 0 || L(c) < L(a[i - 1]));
  // Regularized loss has a finite minimum: it rises again for large w.
  const finite = [0.01, 0.1].every((lam) => Lreg(50, lam) > Lreg(2, lam));
  return [scaling, finite, false, false];
});

fact("σ(0) = 0.5, σ(2) ≈ 0.88, σ(−2) ≈ 0.12, σ(z) + σ(−z) = 1", () =>
  sig(0) === 0.5 && ptf.round(sig(2), 2) === 0.88 && ptf.round(sig(-2), 2) === 0.12 && [0.3, 2, 7].every((z) => ptf.near(sig(z) + sig(-z), 1)));
fact("spam x = 0 → 0.12; x = 5 → 0.88", () => ptf.round(spam(0), 2) === 0.12 && ptf.round(spam(5), 2) === 0.88);
fact("p = 0.8 ↔ odds 4 ↔ z = ln 4 ≈ 1.39", () => ptf.near(0.8 / 0.2, 4) && ptf.round(Math.log(4), 2) === 1.39);
fact("log losses 0.105, 2.303, 4.605", () => ptf.round(ll(1, 0.9), 3) === 0.105 && ptf.round(ll(1, 0.1), 3) === 2.303 && ptf.round(ll(0, 0.99), 3) === 4.605);
fact("mean log loss ≈ 0.299", () => ptf.round([[1, 0.8], [0, 0.3], [1, 0.6], [0, 0.1]].reduce((s, [y, p]) => s + ll(y, p), 0) / 4, 3) === 0.299);
fact("p(0) ≈ 0.119, p(5) ≈ 0.881, e^0.8 ≈ 2.23", () => ptf.round(spam(0), 3) === 0.119 && ptf.round(spam(5), 3) === 0.881 && ptf.round(Math.exp(0.8), 2) === 2.23);
fact("confident mistake costs −ln(0.001) ≈ 6.9", () => ptf.round(-Math.log(0.001), 1) === 6.9);
fact("e^(−2) ≈ 0.135, ln 0.1 ≈ −2.30", () => ptf.round(Math.exp(-2), 3) === 0.135 && ptf.round(Math.log(0.1), 2) === -2.3);
