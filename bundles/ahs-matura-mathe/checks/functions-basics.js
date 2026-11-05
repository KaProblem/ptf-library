// Recomputes the answers of elements/functions-basics.md (PTF SPEC.md §7.1).

const xs = [-3, -1.5, -0.5, 0.7, 2, 4.2];
const all = (p) => xs.every(p);
const h = (t) => -5 * t * t + 20 * t + 1.5;
const quadRoots = (a, b, c) => { const D = b * b - 4 * a * c; return D < 0 ? [] : [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)]; };

check("is-it-a-function", () => {
  // Model each relation as input → list of outputs; a function has exactly one per input.
  const students = { Ana: "03-14", Ben: "07-02", Cem: "03-14" };
  const byDate = {};
  for (const [s, d] of Object.entries(students)) (byDate[d] ||= []).push(s);
  const rels = [
    Object.keys(students).map((s) => [students[s]]),
    xs.map((x) => [x * x]),
    ["03-14", "07-02", "12-24"].map((d) => byDate[d] || []),
    [-0.5, 0, 0.5].map((x) => [...new Set([Math.sqrt(1 - x * x), -Math.sqrt(1 - x * x)])]),
    [1, 4, 9].map((x) => [Math.sqrt(x), -Math.sqrt(x)]),
  ];
  return rels.map((r) => r.every((outs) => outs.length === 1));
});

check("function-types", () => {
  // Exponential: f(x + 1) / f(x) is the same for all x.
  const fs = [(x) => 3 * 2 ** x, (x) => 0.5 ** x - 0.5 ** x / 2, (x) => 3 * x * x, (x) => 2 / x, (x) => 2 * x + 3];
  return fs.map((f) => { const r = xs.map((x) => f(x + 1) / f(x)); return r.every((v) => Number.isFinite(v) && ptf.near(v, r[0], 1e-9)); });
});

check("table-to-graph", () => {
  const T = { 0: 1, 1: 3, 2: 7, 3: 13 }, d = [T[1] - T[0], T[2] - T[1], T[3] - T[2]];
  return [T[2] === 7, d[0] < d[1] && d[1] < d[2], d.every((v) => v === d[0]), T[0] === 0, T[7] === 2];
});

check("ball-height", () => h(2));

check("cubic-properties", () => {
  const f = (x) => x ** 3 - 3 * x, e = 1e-3;
  const grid = Array.from({ length: 2001 }, (_, i) => -5 + i * 0.005);
  return [
    f(-1) > f(-1 - e) && f(-1) > f(-1 + e),
    all((x) => ptf.near(f(-x), -f(x))),
    grid.every((x) => f(x) <= 2 + 1e-12),
    grid.filter((x) => x >= -1 && x < 1).every((x) => f(x + 0.005) >= f(x)),
    [0, Math.sqrt(3), -Math.sqrt(3)].filter((z) => ptf.near(f(z), 0, 1e-9)).length === 1,
  ];
});

check("intersection-parabola-line", () => {
  const [x1, x2] = quadRoots(1, -1, -2);
  return [x1 * x1, x2];
});

check("model-domain", () => {
  const land = Math.max(...quadRoots(-5, 20, 1.5));
  ptf.assert(ptf.near(land, 4.07, 0.005), "lands at about 4.07 s");
  ptf.assert(ptf.near(h(5), -23.5) && ptf.near(h(-1), -23.5), "values in the options");
  return [true, 5 <= land, -1 >= 0, false];
});

check("cylinder-volume", () => {
  const V = (r, hh) => r * r * Math.PI * hh, r = 3, hh = 5;
  return [
    ptf.near(V(2 * r, hh), 4 * V(r, hh)),
    ptf.near(V(r, 2 * hh), 2 * V(r, hh)),
    ptf.near(V(2 * r, hh / 2), V(r, hh)),
    ptf.near(V(2 * r, hh), 2 * V(r, hh)),
    (100 / (4 * 4 * Math.PI)) > (100 / (3 * 3 * Math.PI)),
  ];
});

check("types-overview", () => {
  const f = (x) => 2 * 0.5 ** x;
  const asymptoteNoZero = f(60) < 1e-15 && f(60) > 0 && xs.every((x) => f(x) > 0);
  // x³ is a degree-3 polynomial without extrema: its derivative 3x² never changes sign.
  const twoExtremaAlways = false;
  const periodPi = ptf.near(Math.sin(1 + Math.PI), Math.sin(1));
  const constantHasZero = false;   // f(x) = 3 is linear (k = 0) and never 0
  return [asymptoteNoZero, twoExtremaAlways, periodPi, constantHasZero];
});

check("vertical-line-probe", () => {
  const g = (x) => x * x - 4;
  return [g(2) === 0 && g(-2) === 0 && g(0) === -4, g(-4) === 0, false];
});

check("ball-times", () => Math.max(...quadRoots(-5, 20, 1.5 - 16.5)));

check("describe-graph", () => true);

// Numbers in Key facts.
fact("x³ − 3x: zeros 0, ±√3 ≈ ±1.73, max (−1|2), min (1|−2)", () => {
  const f = (x) => x ** 3 - 3 * x;
  return [0, Math.sqrt(3), -Math.sqrt(3)].every((z) => ptf.near(f(z), 0, 1e-12)) && ptf.near(Math.sqrt(3), 1.73, 0.005) && f(-1) === 2 && f(1) === -2;
});
fact("x² = x + 2 at (−1|1) and (2|4)", () => [[-1, 1], [2, 4]].every(([x, y]) => x * x === y && x + 2 === y));
fact("h(t) = 16.5 at t = 1 and 3", () => ptf.near(h(1), 16.5) && ptf.near(h(3), 16.5));
