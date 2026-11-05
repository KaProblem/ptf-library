// Recomputes the answers of elements/differentiation-rules.md (PTF SPEC.md §7.1).
// Every claimed derivative is compared with a numerical derivative.

const H = 1e-6;
const d = (f) => (x) => (f(x + H) - f(x - H)) / (2 * H);
const xs = [0.3, 0.8, 1.5, 2.2, 4];
const isDerivative = (f, g) => xs.every((x) => ptf.near(d(f)(x), g(x), 1e-4 * Math.max(1, Math.abs(g(x)))));
const dq = (f, a, h) => (f(a + h) - f(a)) / h;

fact("(x³)′ at 2 is about 12", () => ptf.near(d((x) => x ** 3)(2), 12, 1e-6));
fact("((2x)³)′ = 24x²", () => isDerivative((x) => (2 * x) ** 3, (x) => 24 * x * x));
fact("(7 sin x)′ = 7 cos x", () => isDerivative((x) => 7 * Math.sin(x), (x) => 7 * Math.cos(x)));

check("guess-the-rule", () => {
  const f = (x) => x * x;
  return { rows: [0.1, 0.01, 0.001].map((h) => dq(f, 3, h)), result: d(f)(3) };
});

check("polynomial-derivative", () => ptf.round(d((x) => 3 * x ** 4 - 2 * x + 5)(2), 4));

check("which-derivatives", () => [
  isDerivative(Math.sqrt, (x) => 1 / (2 * Math.sqrt(x))),
  isDerivative((x) => 4 / x, (x) => -4 / (x * x)),
  isDerivative((x) => x ** 3 + 7, (x) => 3 * x * x + 7),
  isDerivative((x) => 1 / x, () => 1),
  isDerivative((x) => x ** 5, (x) => 5 * x ** 5),
]);

check("inner-factor", () => [
  isDerivative((x) => Math.exp(2 * x), (x) => 2 * Math.exp(2 * x)),
  isDerivative((x) => 5 * Math.sin(3 * x), (x) => 15 * Math.cos(3 * x)),
  isDerivative((x) => Math.exp(2 * x), (x) => Math.exp(2 * x)),
  isDerivative((x) => Math.cos(2 * x), (x) => 2 * Math.sin(2 * x)),
  isDerivative((x) => (2 * x) ** 3, (x) => 3 * (2 * x) ** 2),
]);

check("root-slope", () => ptf.round(d((x) => 6 * Math.sqrt(x))(9), 6));

check("rules-probe", () => {
  const f = (x) => 2 * x ** 3 - 4 * x + 1;
  return [isDerivative(f, (x) => 6 * x * x - 4), isDerivative(f, (x) => 6 * x * x - 3), isDerivative(f, (x) => 6 * x ** 3 - 4 * x)];
});

check("why-constant-drops", () => {
  ptf.assert(isDerivative((x) => Math.sin(x) + 5, Math.cos), "shifting does not change the derivative");
  return true;
});
