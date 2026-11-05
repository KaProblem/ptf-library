// Recomputes the answers of elements/polynomial-functions.md (PTF SPEC.md §7.1).
// Zeros, extrema and inflection points are found by scanning for sign changes.

const H = 1e-4;
const d = (f) => (x) => (f(x + H) - f(x - H)) / (2 * H);
const scan = (f, a = -20, b = 20, n = 40000) => {
  const xs = Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);
  return xs.filter((x, i) => i > 0 && Math.sign(f(x)) !== Math.sign(f(xs[i - 1])) && Math.sign(f(xs[i - 1])) !== 0);
};
const zeros = (f) => scan(f).length;
const extrema = (f) => scan(d(f)).length;
const ends = (f) => [Math.sign(f(-1e3)), Math.sign(f(1e3))];

fact("x³ + x has only the zero 0", () => zeros((x) => x ** 3 + x) === 1);

check("cubic-zeros", () => {
  const counts = [(x) => x ** 3 + x, (x) => x ** 3 - 3 * x + 2.0001, (x) => x ** 3 - 4 * x].map(zeros);
  const twoTouch = [-1, 0, 1].filter((z) => Math.abs(((x) => (x + 1) ** 2 * (x - 1))(z)) < 1e-12).length === 2;
  ptf.assert(counts[0] === 1 && counts[2] === 3 && twoTouch, "1, 2 (double zero) and 3 occur");
  return [true, false, false];
});

check("end-behaviour", () => {
  const same = (a, b) => a[0] === b[0] && a[1] === b[1];
  return [
    same(ends((x) => -2 * x ** 4 + x), [-1, -1]),
    same(ends((x) => x ** 3 - 5 * x), [-1, 1]),
    same(ends((x) => -x * x + 4), [1, 1]),
    same(ends((x) => x ** 4 - 3 * x * x), [-1, -1]),
    ends((x) => -(x ** 3))[1] === 1,
  ];
});

check("table-values", () => { const f = (x) => x ** 3 - 4 * x; return [f(-1), f(1)]; });

check("value-of-quadratic", () => 0.5 * 9 - 2 * 3 + 1);

check("argument-of-quadratic", () => {
  // 0.5x² − 2x = 0
  const a = 0.5, b = -2, c = 0, D = b * b - 4 * a * c;
  return [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)];
});

check("degree-four-counts", () => {
  const examples = [(x) => x ** 4, (x) => x ** 4 + 1, (x) => x ** 4 - 5 * x * x + 4, (x) => x ** 4 - 2 * x * x];
  const ex = examples.map(extrema), zs = examples.map(zeros), infl = examples.map((f) => scan(d(d(f)), -5, 5, 20000).length);
  return [ex.every((n) => n <= 3), infl.every((n) => n <= 2), zs.every((n) => n === 4), zs.every((n) => n >= 1), ex.every((n) => n === 3)];
});

check("factored-form", () => {
  const f = (x) => 2 * (x + 1) * (x - 3) ** 2;
  const crossesAtMinus1 = Math.sign(f(-1.01)) !== Math.sign(f(-0.99));
  const touchesAt3 = f(3) === 0 && Math.sign(f(2.99)) === Math.sign(f(3.01));
  const lead = f(1000) / 1000 ** 3;
  return [crossesAtMinus1 && touchesAt3, f(1) === 0 && f(-3) === 0, zeros(f) === 3, ptf.near(lead, 0, 0.1)];
});

check("profit-model", () => {
  const G = (x) => -x * x + 12 * x - 20, zs = scan(G, 0, 15, 15000).map((x) => ptf.round(x, 2));
  const v = scan(d(G), 0, 15, 15000).map((x) => ptf.round(x, 2))[0];
  ptf.assert(ptf.near(G(v), 16, 1e-6), "maximum € 16 000 at 600 items");
  return { rows: [zs[0], zs[1], v, G(v)], result: null };
});

check("parabola-probe", () => {
  const qs = [(x) => x * x + 1, (x) => -3 * x * x + 2 * x, (x) => 0.5 * x * x - 4 * x + 8];
  return [qs.every((f) => extrema(f) === 1), qs.every((f) => zeros(f) >= 1), qs.some((f) => scan(d(d(f)), -5, 5, 2000).length > 0)];
});

check("odd-degree-zero", () => {
  ptf.assert(ends((x) => x ** 5 - x + 3)[0] !== ends((x) => x ** 5 - x + 3)[1] && zeros((x) => x ** 4 + 1) === 0, "odd: opposite ends; x⁴ + 1 has no zero");
  return true;
});
