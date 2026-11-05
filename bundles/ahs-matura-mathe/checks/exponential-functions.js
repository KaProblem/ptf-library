// Recomputes the answers of elements/exponential-functions.md (PTF SPEC.md §7.1).
// Conceptual questions without a computed answer (half-life-steps, which-model-fits)
// are not checked here.

// Paper 0.1 mm thick, folded 42 times, in km.
check("paper-folding", () => 0.1 * 2 ** 42 / 1e6);

// A table is exponential when consecutive quotients are equal (and no value is 0).
check("which-tables-exponential", (q) => q.options.map((o) => {
  const ys = o.text.split(",").map(ptf.num);
  if (ys.some((y) => y <= 0)) return false;
  const r = ys.slice(1).map((y, i) => y / ys[i]);
  return r.every((x) => ptf.near(x, r[0], 1e-9));
}));

// € 24 000 losing 15 % a year, after 4 years.
check("value-from-formula", () => 24000 * 0.85 ** 4);

// 8 000 inhabitants, +2 % a year.
check("parameters-in-context", () => [8000, 1 + 2 / 100]);

// f = 3 · 1.5^x, g = 6 · 1.5^x: test each claim at several x.
check("parameter-effects", () => {
  const f = (x) => 3 * 1.5 ** x, g = (x) => 6 * 1.5 ** x, xs = [0, 1, 2.5, 4];
  const stretched = xs.every((x) => ptf.near(g(x), 2 * f(x)));
  const twiceAsFast = xs.every((x) => ptf.near(g(x + 1) / g(x), 2 * (f(x + 1) / f(x))));
  const shiftedUp = xs.every((x) => ptf.near(g(x), f(x) + 2));
  return [stretched, twiceAsFast, shiftedUp];
});

// f(x + 3) for f = a · b^x, compared with each option at sample values.
check("step-property", () => {
  const cases = [[2, 1.5, 0.7], [5, 0.8, 2], [1, 3, -1]];
  const opts = [
    (a, b, x) => b ** 3 * a * b ** x,
    (a, b, x) => 3 * b * a * b ** x,
    (a, b, x) => a * b ** x + b ** 3,
  ];
  return opts.map((o) => cases.every(([a, b, x]) => ptf.near(o(a, b, x), a * b ** (x + 3), 1e-9)));
});

// 5 % a year for 10 years: which percentage is the growth?
check("percent-ten-years", (q) => {
  const growth = (1.05 ** 10 - 1) * 100;          // 62.9 %
  ptf.assert(ptf.near(Math.log(2) / Math.log(1.05), 14.2, 0.05), "doubling time in the feedback");
  return q.options.map((o) => ptf.near(ptf.num(o.text), growth, 1));
});

// Medicine: −20 % per hour.
check("medicine-half-life", () => {
  const b = 1 - 0.2;
  const T = Math.log(0.5) / Math.log(b);
  return { rows: [b, null, T, b ** 3], result: T };
});

// Half-life 10 days: share left after 5 days.
check("half-of-half-life", (q) => {
  const left = 0.5 ** (5 / 10) * 100;               // 70.7 %
  return q.options.map((o) => ptf.near(ptf.num(o.text), left, 0.5));
});

// f(t) = 50 · e^(0.04 t): f′(t) = 0.04 f(t); year-to-year factor e^0.04.
check("derivative-e", (q) => {
  const f = (t) => 50 * Math.exp(0.04 * t), h = 1e-6, t = 3;
  const slope = (f(t + h) - f(t - h)) / (2 * h);
  ptf.assert(ptf.near(slope / f(t), 0.04, 1e-6), "f'(t) = 0.04 · f(t)");
  ptf.assert(ptf.near(Math.exp(0.04), 1.0408, 5e-5), "factor per year in the feedback");
  // Option 1: relative rate 4 % per year. Option 2: absolute 0.04 per year. Option 3: exactly 4 % per year step.
  return [ptf.near(slope / f(t), 0.04, 1e-6), ptf.near(slope, 0.04, 1e-6), ptf.near(f(t + 1) / f(t), 1.04, 1e-9)];
});

// Bacteria: doubling every 30 min means 2^(2t); after 3 days 2^144 times the start.
check("bacteria-model-fit", (q) => {
  ptf.assert(2 * 72 === 144, "3 days = 72 h, two doublings per hour");
  ptf.assert(q.sample_answer.includes("2^144"), "sample answer names 2^144");
  return true;
});

// Pond: doubles daily, full on day 30.
check("pond-day", (q) => {
  const area = (day) => 2 ** (day - 30);            // share of the pond
  ptf.assert(ptf.near(area(25), 1 / 32), "day 25 feedback says 1/32");
  return q.options.map((o) => ptf.near(area(ptf.num(o.text)), 0.5));
});

// Numbers in Key facts and the misconceptions.
fact("b = 0.8 per hour → T½ = ln 2 / ln 1.25 ≈ 3.11 h", () => ptf.near(Math.log(2) / Math.log(1.25), 3.11, 0.005) && ptf.near(Math.log(0.5) / Math.log(0.8), Math.log(2) / Math.log(1.25)));
fact("3 % per year → T₂ ≈ 23.4 years", () => ptf.near(Math.log(2) / Math.log(1.03), 23.4, 0.05));
fact("0.8³ = 0.512", () => ptf.near(0.8 ** 3, 0.512));
fact("0.1 mm · 2^42 ≈ 4.4 · 10^11 mm ≈ 440 000 km", () => ptf.near(0.1 * 2 ** 42, 4.4e11, 0.05e11));
fact("1.05^10 ≈ 1.63", () => ptf.near(1.05 ** 10, 1.63, 0.005));
fact("½^(1/2) ≈ 0.71", () => ptf.near(0.5 ** 0.5, 0.71, 0.005));
