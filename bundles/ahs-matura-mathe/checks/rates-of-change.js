// Recomputes the answers of elements/rates-of-change.md (PTF SPEC.md §7.1).

const dq = (f, a, b) => (f(b) - f(a)) / (b - a);

check("round-trip-speed", () => (120 + 120) / (120 / 60 + 120 / 40));

check("price-change", () => [92 - 80, ((92 - 80) / 80) * 100]);

check("two-towns", () => {
  const A = [1000, 1200], B = [50000, 51000];
  const abs = ([a, b]) => b - a, rel = ([a, b]) => (b - a) / a;
  return [abs(B) > abs(A), rel(A) > rel(B), ptf.near(rel(A), rel(B)), abs(A) > abs(B), ptf.near(rel(B), 10)];
});

check("percentage-points", () => {
  const before = 2, after = 3;
  ptf.assert(after - before === 1, "1 percentage point");
  const rel = ((after - before) / before) * 100;
  return [rel === 50, rel === 1, rel === 150];
});

check("secant-slope", () => dq((x) => x * x, 1, 3));

check("secant-to-tangent", () => {
  const f = (x) => x * x, hs = [1, 0.1, 0.01, 0.001];
  return { rows: hs.map((h) => dq(f, 2, 2 + h)), result: 4 };
});

check("which-is-instantaneous", () => {
  // Evaluate each expression for f(x) = x³ at a = 2 (f′(2) = 12) with a tiny h.
  const f = (x) => x ** 3, a = 2, h = 1e-7, d = 12;
  return [
    ptf.near((f(a + h) - f(a)) / h, d, 1e-4),
    ptf.near(f(a + 1) - f(a), d, 1e-4),
    ptf.near(f(a) / a, d, 1e-4),
    ptf.near(f(a + h) - f(a), d, 1e-4),
  ];
});

check("position-interpretation", () => {
  // An accelerating cyclist s(t) = 0.3 t² + 2t shows which readings hold.
  const s = (t) => 0.3 * t * t + 2 * t, ds = (t) => 0.6 * t + 2;
  const avg = (s(5) - s(2)) / 3;
  ptf.assert(ptf.near(dq(s, 5, 5 + 1e-7), ds(5), 1e-5), "s′ is the speed");
  return [
    ptf.near(avg, dq(s, 2, 5)),
    true,
    ptf.near(s(5) - s(2), avg),
    ptf.near(ds(5), s(5)),
    // For a quadratic the average equals the speed at the midpoint; take a cubic to show it fails in general.
    ptf.near(dq((t) => t ** 3, 2, 5), 3 * 3.5 ** 2),
  ];
});

check("marginal-cost", () => {
  // A cost function with K′(100) = 3.5: K(x) = 500 + 2x + 0.0075 x².
  const K = (x) => 500 + 2 * x + 0.0075 * x * x;
  const dK = dq(K, 100, 100 + 1e-6);
  ptf.assert(ptf.near(dK, 3.5, 1e-4), "K′(100) = 3.5");
  return [ptf.near(K(101) - K(100), 3.5, 0.01), ptf.near(K(100), 3.5), ptf.near(K(100) / 100, 3.5), false];
});

check("rate-unit", () => [true, false, false]);

check("temperature-rate", () => (16 - 4) / (14 - 6));

check("average-speed-probe", () => {
  // A counterexample schedule: 1 h stop, then 2 h at 120 km/h.
  const legs = [[1, 0], [2, 120]];
  const dist = legs.reduce((s, [t, v]) => s + t * v, 0), time = legs.reduce((s, [t]) => s + t, 0);
  ptf.assert(dist === 240 && time === 3, "the schedule covers 240 km in 3 h");
  return [dist / time === 80, legs.every(([, v]) => v === 80), legs.every(([, v]) => v <= 80)];
});

check("explain-derivative", () => true);

// Numbers in Key facts.
fact("€ 80 → € 92: + € 12, + 15 %", () => 92 - 80 === 12 && ptf.near((12 / 80) * 100, 15));
fact("50 000 → 51 000 is + 2 %, 1 000 → 1 200 is + 20 %", () => ptf.near(1000 / 50000, 0.02) && ptf.near(200 / 1000, 0.2));
fact("x² on [1; 3]: 4; at 2 with h = 0.1, 0.01: 4.1, 4.01", () => ptf.near(dq((x) => x * x, 1, 3), 4) && ptf.near(dq((x) => x * x, 2, 2.1), 4.1) && ptf.near(dq((x) => x * x, 2, 2.01), 4.01));
fact("240 km in 2 h + 3 h = 48 km/h", () => 240 / (2 + 3) === 48);
