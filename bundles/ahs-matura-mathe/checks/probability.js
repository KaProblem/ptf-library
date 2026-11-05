// Recomputes the answers of elements/probability.md (PTF SPEC.md §7.1).
// Counting is done by listing outcomes wherever that is feasible.

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const dice2 = range(1, 6).flatMap((a) => range(1, 6).map((b) => [a, b]));
const coins3 = ["H", "T"].flatMap((a) => ["H", "T"].flatMap((b) => ["H", "T"].map((c) => a + b + c)));
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
const choose = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };
const count = (xs, p) => xs.filter(p).length;

check("birthday", () => {
  let allDifferent = 1;
  for (let k = 0; k < 23; k++) allDifferent *= (365 - k) / 365;
  return (1 - allDifferent) * 100;
});

check("sample-space-coins", () => {
  const heads = (s) => count([...s], (c) => c === "H");
  const atLeastOneH = coins3.filter((s) => heads(s) >= 1);
  const complement = coins3.filter((s) => !atLeastOneH.includes(s));
  const notExactlyTwoH = coins3.filter((s) => heads(s) !== 2);
  const exactlyTwoT = coins3.filter((s) => heads(s) === 1);
  const byHeads = range(0, 3).map((h) => count(coins3, (s) => heads(s) === h));
  return [
    coins3.length === 8,
    complement.length === 1 && complement[0] === "TTT",
    notExactlyTwoH.length === exactlyTwoT.length,
    count(coins3, (s) => heads(s) === 1) === 1,
    byHeads.every((n) => n === byHeads[0]),
  ];
});

check("two-dice-events", () => [dice2.length, count(dice2, ([a, b]) => a === 6 || b === 6)]);

check("relative-frequency", () => (37 / 10000) * 100);

check("reliable-estimate", (q) => {
  ptf.assert(ptf.near(13 / 20, 0.65) && ptf.near(1160 / 2000, 0.58), "percentages in the options");
  // Standard error of a relative frequency shrinks with n: compare 20 and 2000 trials.
  const se = (p, n) => Math.sqrt((p * (1 - p)) / n);
  return [se(0.58, 2000) < se(0.58, 20), false, false, false];
});

check("laplace-sum-eight", () => (count(dice2, ([a, b]) => a + b === 8) / 36) * 100);

check("without-replacement", () => {
  const r = 4, b = 6, n = r + b;
  const both = (r / n) * ((r - 1) / (n - 1));
  const mixed = (r / n) * (b / (n - 1)) + (b / n) * (r / (n - 1));
  // Cross-check by listing all ordered draws.
  const balls = [...Array(r).fill("R"), ...Array(b).fill("B")];
  const pairs = balls.flatMap((x, i) => balls.filter((_, j) => j !== i).map((y) => x + y));
  ptf.assert(ptf.near(count(pairs, (p) => p === "RR") / pairs.length, both), "listing agrees");
  ptf.assert(ptf.near(both, 2 / 15) && ptf.near(both * 100, 13.3, 0.05), "result text 2/15 ≈ 13.3 %");
  return [r / n, (r - 1) / (n - 1), both, mixed];
});

check("at-least-one-six", () => {
  // All 6^4 sequences.
  let hit = 0, all = 0;
  for (const a of range(1, 6)) for (const b of range(1, 6)) for (const c of range(1, 6)) for (const d of range(1, 6)) {
    all++; if ([a, b, c, d].includes(6)) hit++;
  }
  const p = hit / all;
  const opts = [1 - (5 / 6) ** 4, 4 * (1 / 6), (1 / 6) ** 4, 1 - (1 / 6) ** 4];
  return opts.map((x) => ptf.near(x, p, 1e-12));
});

check("tree-two-stages", () => (0.7 * 0.8 + 0.3 * 0.6) * 100);

check("addition-rule", (q) => {
  const pa = 0.4, pb = 0.3, pab = 0.1, union = (pa + pb - pab) * 100;
  return q.options.map((o) => ptf.near(ptf.num(o.text), union, 1e-9));
});

check("roulette-streak", () => {
  const p = 18 / 37;
  ptf.assert(ptf.near(p * 100, 48.6, 0.05), "48.6 % in the explanation");
  return [true, false, false];   // independence: the conditional probability equals p
});

check("binomial-coefficient-meaning", () => {
  ptf.assert(choose(20, 3) * factorial(3) === 6840, "ordered podiums 6840");
  return [true, choose(20, 3) === choose(20, 17), choose(20, 3) === choose(20, 3) * factorial(3), choose(20, 3) === 60, choose(20, 3) === 3 ** 20];
});

check("lotto", () => choose(45, 6));

check("dice-seven-or-twelve", () => {
  const p = (s) => count(dice2, ([a, b]) => a + b === s) / 36;
  return [ptf.near(p(7), 6 * p(12)), range(2, 12).every((s) => ptf.near(p(s), 1 / 11)), ptf.near(p(7), 2 * p(12))];
});

check("why-complement", () => {
  ptf.assert(ptf.near(0.1 ** 3, 0.001) && ptf.near(1 - 0.1 ** 3, 0.999), "0.001 and 0.999");
  return true;
});

// Numbers in Key facts and the misconceptions.
fact("P(all 23 birthdays different) ≈ 49.3 %", () => { let p = 1; for (let k = 0; k < 23; k++) p *= (365 - k) / 365; return ptf.near(p * 100, 49.3, 0.05); });
fact("about 253 pairs among 23 people", () => choose(23, 2) === 253);
fact("C(20, 3) = 1140, C(45, 6) = 8 145 060", () => choose(20, 3) === 1140 && choose(45, 6) === 8145060);
fact("1 − (5/6)^4 ≈ 51.8 %", () => ptf.near((1 - (5 / 6) ** 4) * 100, 51.8, 0.05));
fact("5/36 ≈ 13.9 %, 2/15 ≈ 13.3 %", () => ptf.near((5 / 36) * 100, 13.9, 0.05) && ptf.near((2 / 15) * 100, 13.3, 0.05));
fact("P(7) = 6/36, P(12) = 1/36", () => count(dice2, ([a, b]) => a + b === 7) === 6 && count(dice2, ([a, b]) => a + b === 12) === 1);
