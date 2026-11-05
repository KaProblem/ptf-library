// Recomputes the answers of elements/derivative-functions.md (PTF SPEC.md §7.1).
// Derivatives are taken numerically, so the check does not reuse the rules it tests.

const H = 1e-5;
const d = (f) => (x) => (f(x + H) - f(x - H)) / (2 * H);
const grid = (a, b, n = 400) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);
const isAntiderivative = (F, f) => grid(-4, 4, 80).every((x) => ptf.near(d(F)(x), f(x), 1e-5));
// Classify x0 as "max", "min" or "none" from values nearby.
const kind = (f, x0, e = 1e-3) => (f(x0) > f(x0 - e) && f(x0) > f(x0 + e) ? "max" : f(x0) < f(x0 - e) && f(x0) < f(x0 + e) ? "min" : "none");
const f = (x) => x ** 3 - 6 * x * x + 9 * x + 1;

check("road-flat", () => { const k = kind((x) => x ** 3, 0); return [k === "none", k === "min", k === "max"]; });

check("which-antiderivatives", () => [(x) => x * x, (x) => x * x + 5, () => 2, (x) => 2 * x * x, (x) => x * x + x]
  .map((F) => isAntiderivative(F, (x) => 2 * x)));

check("motion-context", () => {
  const s = (t) => 2 * t * t + t, v = d(s), a = d(v);
  return [isAntiderivative(s, v), ptf.near(d(s)(3), a(3), 1e-3), isAntiderivative(v, s), false];
});

check("extrema-from-derivative", () => {
  // f = antiderivative of (x − 1)(x − 4) = x³/3 − 5x²/2 + 4x.
  const F = (x) => x ** 3 / 3 - 2.5 * x * x + 4 * x;
  ptf.assert(isAntiderivative(F, (x) => (x - 1) * (x - 4)), "F′ = (x − 1)(x − 4)");
  const xs = grid(-2, 7, 900);
  const max = xs.filter((x) => kind(F, x, 0.01) === "max"), min = xs.filter((x) => kind(F, x, 0.01) === "min");
  return [Math.round(max[0]), Math.round(min[0])];
});

check("graph-of-antiderivative", () => {
  const g = (x) => 4 - x * x, F = (x) => 4 * x - x ** 3 / 3;
  ptf.assert(isAntiderivative(F, g), "F′ = f");
  const inc = grid(-2, 2).every((x, i, a) => i === 0 || F(x) >= F(a[i - 1]));
  return [inc, kind(F, 2) === "max", kind(F, 0) === "max", !inc, isAntiderivative((x) => -2 * x, g)];
});

check("curve-sketch", () => {
  const f1 = d(f), f2 = d(f1);
  const zeros = grid(-1, 5, 6000).filter((x, i, a) => i > 0 && Math.sign(f1(x)) !== Math.sign(f1(a[i - 1])));
  const infl = grid(-1, 5, 6000).filter((x, i, a) => i > 0 && Math.sign(f2(x)) !== Math.sign(f2(a[i - 1])));
  const [x1, x2] = zeros.map((x) => ptf.round(x, 2));
  ptf.assert(kind(f, 1) === "max" && kind(f, 3) === "min", "max at 1, min at 3");
  const xi = ptf.round(infl[0], 2);
  ptf.assert(ptf.near(f(xi), 3, 1e-9), "inflection point (2 | 3)");
  return { rows: [x1, x2, ptf.round(f2(1), 3), f(1), f(3), xi] };
});

check("curvature", () => {
  // An example with f′ < 0 and f″ > 0 on [2; 5]: f(x) = 1/x.
  const g = (x) => 1 / x, g1 = d(g), g2 = d(g1), xs = grid(2, 5, 30);
  ptf.assert(xs.every((x) => g1(x) < 0 && g2(x) > 0), "example fits");
  const lessSteep = xs.every((x, i) => i === 0 || Math.abs(g1(x)) < Math.abs(g1(xs[i - 1])));
  return [lessSteep, !lessSteep, xs.every((x) => g1(x) > 0), xs.some((x) => g2(x) < 0)];
});

check("tangent-slope", () => ptf.round(d(f)(4), 6));

check("derivative-graph-reading", () => {
  // Example: f′(x) = 3 − (x − 2)², so f = 3x − (x − 2)³/3 + C.
  const g = (x) => 3 * x - (x - 2) ** 3 / 3, g1 = d(g), g2 = d(g1);
  const inflection = g2(1.9) > 0 && g2(2.1) < 0;
  return [inflection && ptf.near(g1(2), 3, 1e-6), kind(g, 2) === "max", ptf.near(g(2), 3), ptf.near(g1(2), 0, 1e-6)];
});

check("extremum-probe", () => {
  // Example with f′(5) = 0, f″(5) = −2: f(x) = −(x − 5)².
  const g = (x) => -((x - 5) ** 2);
  ptf.assert(ptf.near(d(g)(5), 0, 1e-6) && ptf.near(d(d(g))(5), -2, 1e-3), "example fits");
  return [kind(g, 5) === "max", kind(g, 5) === "min", false];
});

check("describe-from-derivative", () => true);
