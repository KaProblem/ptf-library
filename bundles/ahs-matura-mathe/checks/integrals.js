// Recomputes the answers of elements/integrals.md (PTF SPEC.md §7.1).
// Integrals are computed numerically (midpoint sums), independent of antiderivatives.

const integral = (f, a, b, n = 20000) => { const h = (b - a) / n; let s = 0; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h) * h; return s; };
const area = (f, a, b) => integral((x) => Math.abs(f(x)), a, b, 40000);
const H = 1e-5;
const d = (F) => (x) => (F(x + H) - F(x - H)) / (2 * H);
const isAnti = (F, f) => [-2, -0.5, 0.3, 1, 2.7].every((x) => ptf.near(d(F)(x), f(x), 1e-4));

fact("midpoint sum with 100 strips for x² on [0; 3] is 8.999775", () => ptf.near(integral((x) => x * x, 0, 3, 100), 8.999775, 1e-9));
fact("∫₀⁴ (x − 2) dx = 0 and area 4", () => ptf.near(integral((x) => x - 2, 0, 4), 0, 1e-9) && ptf.near(area((x) => x - 2, 0, 4), 4, 1e-6));

check("car-distance", () => {
  ptf.assert([4, 6, 8, 10].reduce((s, v) => s + v, 0) === 28, "one-second pieces with middle speeds");
  return integral((t) => 2 * t + 3, 0, 4);
});

check("sum-of-products", () => {
  const f = (x) => x * x, sums = [10, 100, 1000].map((n) => integral(f, 0, 3, n));
  ptf.assert(Math.abs(sums[2] - 9) < Math.abs(sums[0] - 9), "sums approach the integral");
  return [true, false, ptf.near(sums[2], f(3) * 3, 1e-3), false];
});

check("integral-x-squared", () => integral((x) => x * x, 0, 3));

check("polynomial-integral", () => {
  const F = (x) => x ** 3 + x * x;
  ptf.assert(isAnti(F, (x) => 3 * x * x + 2 * x), "F is an antiderivative");
  const I = integral((x) => 3 * x * x + 2 * x, 1, 2);
  return { rows: [null, F(2), F(1), I], result: I };
});

check("integration-rules", () => [
  isAnti((x) => 2 * x ** 3 + x, (x) => 6 * x * x + 1),
  isAnti((x) => (2 * x) ** 4 / 8, (x) => (2 * x) ** 3),
  isAnti((x) => 3 * x * x, (x) => x ** 3),
  isAnti(() => 0, () => 5),
  isAnti((x) => 4 * x * x, (x) => 4 * x),
]);

check("signed-area", () => {
  const f = (x) => x - 2, I = integral(f, 0, 4), A = area(f, 0, 4);
  return [ptf.near(I, 0, 1e-9), ptf.near(A, 4, 1e-6), ptf.near(A, 0, 1e-6), ptf.near(I, 4, 1e-6), false];
});

check("area-under-parabola", () => area((x) => 4 - x * x, 0, 2));

check("water-context", () => {
  // Example: inflow z(t) = 3 + 0.2t l/min, 50 l in the tank at minute 10.
  const z = (t) => 3 + 0.2 * t, V = (t) => 50 + integral(z, 10, t);
  const I = integral(z, 10, 20);
  return [ptf.near(I, V(20) - V(10), 1e-9), ptf.near(I, V(20), 1e-9), ptf.near(I, I / 10), ptf.near(I, (d(z)(20) + d(z)(10)) / 2 * 10, 1e-9)];
});

check("which-expression-area", () => {
  const f = (x) => x * (x - 3), A = area(f, 0, 4);
  const I = (a, b) => integral(f, a, b);
  return [-I(0, 3) + I(3, 4), I(0, 4), I(0, 3) + I(3, 4), I(0, 3) - I(3, 4)].map((v) => ptf.near(v, A, 1e-6));
});

check("integral-probe", (q) => q.options.map((o) => ptf.num(o.text) === 10 - 4));

check("explain-net-change", () => {
  const r = (t) => Math.sin((2 * Math.PI * t) / 24);
  ptf.assert(ptf.near(integral(r, 0, 24), 0, 1e-9) && r(6) > 0, "a rate with net change 0 that is not 0");
  return true;
});
