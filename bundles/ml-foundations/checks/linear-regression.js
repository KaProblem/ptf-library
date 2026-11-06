// Recomputes the answers of elements/linear-regression.md (PTF SPEC.md §7.1).

const lin = (b, w) => (x) => b + w.reduce((s, wi, i) => s + wi * x[i], 0);
const errs = (ys, ps) => ys.map((y, i) => y - ps[i]);
const L1 = (e) => e.reduce((s, v) => s + Math.abs(v), 0);
const L2 = (e) => e.reduce((s, v) => s + v * v, 0);
const MAE = (e) => L1(e) / e.length;
const MSE = (e) => L2(e) / e.length;

const labels = [12, 20, 15, 30], preds = [10, 22, 15, 24];

check("pizza-warmup", () => lin(10, [3])([4]));

check("weight-and-bias", () => {
  const f = lin(18000, [-1500]);
  return [
    f([5]) - f([4]) === -1500,
    f([0]) === 18000,
    false, // "bias" is the constant term, not unfairness
    f([4]) === 6000,
    -1500 === 18000,
  ];
});

check("two-features", () => lin(10, [3, 2])([5, 3]));

check("four-losses", () => {
  const e = errs(labels, preds);
  return { rows: [null, L1(e), MAE(e), L2(e), MSE(e)], result: MSE(e) };
});

check("outlier-effect", () => {
  const e = 40;
  return [e * e > 10 * e, e * e === e, false];
});

check("pick-loss-highschool", () => {
  // Same total absolute error: one large miss vs many small ones. MSE prefers the many small ones.
  const big = [8, 0, 0, 0], small = [2, 2, 2, 2];
  const mseAvoidsBig = MSE(small) < MSE(big), maeIndifferent = MAE(small) === MAE(big);
  return [mseAvoidsBig, !maeIndifferent, false];
});

check("linreg-probe", () => { const e = [1, 3]; return [MSE(e) === 5, MSE(e) === 2, MSE(e) === 4]; });

check("partial-effect-college", () => {
  const f = lin(150, [11.5, 40, 0.02]);
  const fKm = lin(150, [11.5, 40, 0.02 * 1000]);
  return [
    ptf.near(f([60, 1, 500]) - f([60, 0, 500]), 40),
    ptf.near(f([60, 1, 500]), 900),
    false, // 0.02 per metre is 20 per km: weight size depends on the unit
    ptf.near(fKm([60, 1, 0.5]), f([60, 1, 500])) && ptf.near(0.02 * 1000, 20),
    false, // b is the prediction at size 0, not a typical flat
  ];
});

check("rmse-college", () => Math.sqrt(MSE(errs([3, 5, 9, 4], [4, 5, 6, 6]))));

check("mae-mse-college", () => { const e = [1, -1, 2, -2, 10]; return [MAE(e), MSE(e)]; });

check("gradient-pull-college", () => {
  const dSq = (e) => 2 * e, dAbs = (e) => Math.sign(e);
  return [dSq(20) / dSq(2) === 10 && dAbs(20) === dAbs(2), false, false, false];
});

// Numbers in Key facts and level texts.
fact("y′ = 10 + 3x: 4 km → 22 minutes", () => lin(10, [3])([4]) === 22);
fact("y′ = 5 + 2x₁ + 0.5x₂ with 3, 8 → 15", () => lin(5, [2, 0.5])([3, 8]) === 15);
fact("errors 2, −2, 0, 6; L1 = 10, MAE = 2.5, L2 = 44, MSE = 11", () => {
  const e = errs(labels, preds);
  return e.join() === "2,-2,0,6" && L1(e) === 10 && MAE(e) === 2.5 && L2(e) === 44 && MSE(e) === 11;
});
fact("RMSE = √11 ≈ 3.32", () => ptf.round(Math.sqrt(11), 2) === 3.32);
fact("the error of 6 is ≈ 82 % of L2", () => ptf.round(36 / 44 * 100, 0) === 82);
fact("b = 10, w = (3, 2): 4 km, 2 pizzas → 26 minutes", () => lin(10, [3, 2])([4, 2]) === 26);
