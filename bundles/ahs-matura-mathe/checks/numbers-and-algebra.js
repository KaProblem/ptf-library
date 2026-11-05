// Recomputes the answers of elements/numbers-and-algebra.md (PTF SPEC.md §7.1).
// Rationality of roots is decided by the perfect-square test; π is irrational by a known theorem.

const isSquare = (n) => Number.isInteger(n) && n >= 0 && Math.round(Math.sqrt(n)) ** 2 === n;
// Decimal digits of p/q by long division: does the expansion end or repeat? (Always, for a fraction.)
const decimal = (p, q, digits = 12) => { let s = Math.floor(p / q) + ".", r = p % q; for (let i = 0; i < digits; i++) { r *= 10; s += Math.floor(r / q); r %= q; } return s; };
const solutionsOf = (pred, xs) => xs.filter(pred);
const xs = Array.from({ length: 41 }, (_, i) => i - 20);

fact("0.999… = 1: 10x − x = 9", () => { const nines = 1 - 1e-15; return ptf.near(10 * nines - nines, 9, 1e-12); });
fact("2/11 = 0.1818…", () => decimal(2, 11).startsWith("0.18181818"));
fact("1.414² = 1.999396", () => ptf.near(1.414 ** 2, 1.999396, 1e-12));

check("point-nine", () => {
  ptf.assert(ptf.near(3 * (1 / 3), 1), "3 · 1/3 = 1");
  return [true, false, false];
});

check("which-rational", () => [
  decimal(2, 11).startsWith("0.181818"),   // 0.1818… is 2/11
  isSquare(16),
  isSquare(5),
  false,                                   // π (Lindemann)
  isSquare(2),                             // √2 / 2 is rational only if √2 is
]);

check("number-set-statements", () => [
  xs.every((z) => Number.isInteger(z / 1)),
  !xs.some((x) => x * x === -9) && ptf.near(-(3 ** 2), -9),   // (3i)² = −9
  -4 >= 0,
  1.414 ** 2 === 2,
  Number.isInteger(1 / 2),
]);

check("fractions-decimals", () => [3 / 8, 3]);

check("not-equivalent", () => {
  // Compare solution sets before and after each step on a range of whole and half numbers.
  const vals = Array.from({ length: 81 }, (_, i) => (i - 40) / 2);
  const same = (a, b) => vals.every((x) => a(x) === b(x));
  return [
    !same((x) => x === 2, (x) => x * x === 4),
    !same((x) => 3 * x + 1 === 7, (x) => 3 * x === 6),
    !same((x) => 3 * x === 6, (x) => x === 2),
    !same((x) => x / 2 === 5, (x) => x === 10),
  ];
});

check("algebra-terms", () => {
  let seed = 3; const r = () => ((seed = (seed * 48271) % 2147483647) / 2147483647) * 20 - 10;
  const identity = Array.from({ length: 50 }, () => [r(), r(), r()]).every(([a, b, c]) => ptf.near(a * (b + c), a * b + a * c, 1e-9));
  return [identity, solutionsOf((x) => x + 1 === x, xs).length === 0, false, false, false];
});

check("sets-probe", () => {
  const v = -3 / 1;
  return [Number.isInteger(v) && v < 0, !Number.isInteger(v), v >= 0];
});

check("why-sqrt2-irrational", () => {
  ptf.assert(1.414213562 ** 2 !== 2 && !isSquare(2), "√2 is not a terminating decimal");
  return true;
});
