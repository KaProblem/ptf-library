// Recomputes the answers of elements/power-functions.md (PTF SPEC.md §7.1).

const xs = [0.5, 1, 2, 3, 7.5];
const constProduct = (f) => xs.every((x) => ptf.near(x * f(x), xs[0] * f(xs[0])));

fact("√(4x) = 2√x", () => xs.every((x) => ptf.near(Math.sqrt(4 * x), 2 * Math.sqrt(x))));
fact("pizza per euro ≈ 71 and 84 cm²", () => ptf.near((Math.PI * 15 ** 2) / 10, 71, 0.5) && ptf.near((Math.PI * 20 ** 2) / 15, 84, 0.5));

check("trip-time", () => 120 / 80);

check("indirect-situations", () => [
  constProduct((n) => 600 / n),
  constProduct((v) => 120 / v),
  constProduct((x) => 60 - x),
  constProduct((s) => s * s),
  constProduct((n) => 12.9 * n),
]);

check("parameter-from-point", () => { const a = 4 / 2 ** 3; return [a, a * 4 ** 3]; });

check("scaling-factor", (q) => {
  const ratios = [0.3, 2, 5].map((a) => (a * (3 * 1.7) ** 2) / (a * 1.7 ** 2));
  ptf.assert(ratios.every((r) => ptf.near(r, ratios[0])), "independent of a");
  return q.options.map((o) => /\d/.test(o.text) && ptf.near(ptf.num(o.text), ratios[0]));
});

check("parameter-effect-power", () => {
  const g = (x) => -2 * x * x + 3, grid = Array.from({ length: 401 }, (_, i) => -2 + i * 0.01);
  const top = grid.every((x) => g(x) <= g(0)) && g(0) === 3;
  return [top, !Number.isFinite(4 / 0), 4 / 0 === 0, xs.every((x) => ptf.near((-x) ** 3, x ** 3)), false];
});

check("workers-days", () => (6 * 10) / 4);

check("power-probe", () => {
  const r = 3, A = Math.PI * r * r;
  return [ptf.near(A, Math.PI * r ** 2), ptf.near(A, Math.PI * 2 ** r), ptf.near(A, 2 * Math.PI * r)];
});

check("explain-scaling", () => {
  ptf.assert(ptf.near((40 / 30) ** 2, 1.78, 0.005) && 15 / 10 === 1.5, "1.78 times the area, 1.5 times the price");
  return true;
});
