// Recomputes the answers of elements/equations.md (PTF SPEC.md §7.1).

const quadRoots = (a, b, c) => {
  const D = b * b - 4 * a * c;
  if (D < -1e-12) return [];
  if (Math.abs(D) <= 1e-12) return [-b / (2 * a)];
  return [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((x, y) => x - y);
};
// Solves a1 x + b1 y = c1, a2 x + b2 y = c2: { kind: "one" | "none" | "infinite", x, y }.
const solve2 = ([a1, b1, c1], [a2, b2, c2]) => {
  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) > 1e-12) return { kind: "one", x: (c1 * b2 - c2 * b1) / det, y: (a1 * c2 - a2 * c1) / det };
  const consistent = Math.abs(a1 * c2 - a2 * c1) < 1e-12 && Math.abs(b1 * c2 - b2 * c1) < 1e-12;
  return { kind: consistent ? "infinite" : "none" };
};
const sample = Array.from({ length: 401 }, (_, i) => -20 + i * 0.1);

check("bat-and-ball", () => ((1.1 - 1) / 2) * 100);

check("rearrange-formula", () => {
  const a = 3, c = 7, h = 4, A = ((a + c) / 2) * h;
  return [
    ptf.near(2 * A / h - a, c),
    ptf.near(2 * A / (a + c), h),
    ptf.near(2 * A - a / h, c),
    ptf.near(A / (a + c) * 2 - 1, h),
    ptf.near(2 * A * h - c, a),
  ];
});

check("term-in-context", () => {
  // Prices that fit: a = 10, c = 7 → 2a + 3c = 41; test each equation with them and another fitting pair.
  const pairs = [[10, 7], [13, 5]];
  const eqs = [(a, c) => 2 * a + 3 * c, (a, c) => 2 * c + 3 * a, (a, c) => 5 * (a + c), (a, c) => (5 * (a + c)) / 2];
  return eqs.map((e) => pairs.every(([a, c]) => ptf.near(e(a, c), 41)));
});

check("linear-equation", () => {
  // 3(x − 2) = 2x + 5 ↔ x − 11 = 0; 2(x + 1) = 2x + 3 ↔ 0x = 1.
  const x = 11;
  ptf.assert(ptf.near(3 * (x - 2), 2 * x + 5), "x = 11 solves the first");
  const second = sample.filter((v) => ptf.near(2 * (v + 1), 2 * v + 3)).length;
  return [x, second];
});

check("quadratic-solve", () => quadRoots(1, -6, 5));

check("quadratic-cases", (q) => q.options.map((o) => quadRoots(1, 4, ptf.num(o.text.replace("c =", ""))).length === 1));

check("inequality", (q) => {
  const sol = sample.filter((x) => 3 - 2 * x > 7);
  const descr = [(x) => x < -2, (x) => x > -2, (x) => x < 2, (x) => x > 5];
  return descr.map((d) => sample.every((x) => d(x) === sol.includes(x)));
});

check("inequality-context", () => {
  const vs = Array.from({ length: 31 }, (_, i) => i);
  const cheaper = vs.filter((v) => 30 + 2 * v < 8 * v);
  const descr = [(v) => v > 5, (v) => v < 5, (v) => v > 3, () => false];
  return descr.map((d) => vs.every((v) => d(v) === cheaper.includes(v)));
});

check("ticket-system", () => {
  const s = solve2([1, 1, 16], [2, 3, 41]);
  ptf.assert(s.kind === "one" && ptf.near(2 * s.x + 3 * s.y, 41), "solution checks");
  return [null, null, s.y, s.x];
});

check("system-cases", () => [
  solve2([1, 2, 4], [3, 6, 12]).kind === "infinite",
  solve2([1, 2, 4], [3, 6, 10]).kind === "infinite",
  solve2([1, 2, 4], [1, -2, 0]).kind === "infinite",
  solve2([1, 2, 4], [2, 1, 4]).kind === "infinite",
]);

check("square-root-probe", () => {
  // x² − 3x = 0 → roots of the quadratic.
  const r = quadRoots(1, -3, 0);
  const same = (xs) => xs.length === r.length && xs.every((x, i) => ptf.near(x, r[i]));
  return [same([0, 3]), same([3]), same([Math.sqrt(3)])];
});

check("explain-cases", () => {
  ptf.assert([quadRoots(1, 0, 1), quadRoots(1, 0, 0), quadRoots(1, 0, -1)].map((r) => r.length).join() === "0,1,2", "0, 1, 2 solutions occur");
  return true;
});
