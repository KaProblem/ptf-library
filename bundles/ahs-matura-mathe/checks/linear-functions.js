// Recomputes the answers of elements/linear-functions.md (PTF SPEC.md §7.1).

const nums = (text) => (String(text).match(/[−-]?\d+(?:[.,]\d+)?/g) || []).map(ptf.num);
const diffs = (ys) => ys.slice(1).map((y, i) => y - ys[i]);
const line = (k, d) => (x) => k * x + d;
const through = (P, Q) => { const k = (Q[1] - P[1]) / (Q[0] - P[0]); return { k, d: P[1] - k * P[0] }; };

check("taxi-distance", () => (26 - 4) / 2.2);

check("which-are-linear", (q) => q.options.map((o) => {
  const ds = diffs(nums(o.text));
  return ds.every((d) => ptf.near(d, ds[0]));
}));

check("two-points", () => { const { k, d } = through([1, 5], [4, 11]); return [k, d]; });

check("tank-context", () => {
  const V = line(-7.5, 60), empty = 60 / 7.5;
  return [V(0) === 60, ptf.near(V(1) - V(0), -7.5), 10 <= empty && ptf.near(V(10), -15), ptf.near(empty, 7.5), false];
});

check("parameter-effect", () => {
  const f = line(2, 1), g = line(2, 4), xs = [-3, 0, 1.5, 7];
  const up3 = xs.every((x) => ptf.near(g(x), f(x) + 3));
  const steeper = (g(1) - g(0)) > (f(1) - f(0));
  const crossAt3 = ptf.near(f(3), g(3));
  const right3 = xs.every((x) => ptf.near(g(x), f(x - 3)));
  return [up3, steeper, crossAt3, right3];
});

check("slope-from-change", () => { const { k, d } = through([2, 9], [7, -1]); return line(k, d)(8); });

check("constant-change", () => {
  // Test each identity on a non-proportional line at several x.
  const f = line(-1.5, 4), k = -1.5, d = 4, xs = [-2, 0, 3.3, 10];
  return [
    xs.every((x) => ptf.near(f(x + 1) - f(x), k)),
    xs.every((x) => ptf.near(f(x + 1), k * f(x))),
    xs.every((x) => ptf.near(f(2 * x), 2 * f(x))),
    xs.every((x) => ptf.near(f(x + 1) - f(x), d)),
  ];
});

check("proportional", () => {
  // Each situation as a function; proportional if f(2x) = 2 f(x) for several x.
  const fs = [(m) => 2.5 * m, (t) => 90 * t, (s) => 4 + 2.2 * s, (m) => 10 + 0.05 * m, (s) => s * s];
  return fs.map((f) => [1, 2.5, 7].every((x) => ptf.near(f(2 * x), 2 * f(x))));
});

check("linear-model-fit", () => {
  // Hourly changes over 4 hours: linear means constant differences.
  const series = [
    [0, 1, 2, 3, 4].map((t) => 20 - 1.2 * t),
    [0, 1, 2, 3, 4].map((t) => 100 * 2 ** t),
    [0, 0.5, 1, 1.5, 2].map((t) => 15 * t - 5 * t * t),
    [0, 1, 2, 3, 4].map((t) => 20 + 60 * Math.exp(-0.5 * t)),
  ];
  return series.map((ys) => diffs(ys).every((d) => ptf.near(d, diffs(ys)[0])));
});

check("zero-of-line", () => -3 / -0.5);

check("graph-reading-probe", () => {
  const { k, d } = through([0, -2], [3, 4]);
  return [[2, -2], [-2, 2], [4 / 3, -2]].map(([kk, dd]) => ptf.near(kk, k) && ptf.near(dd, d));
});

check("phone-plans", () => {
  const A = line(0.02, 12), B = line(0.09, 5), x = (12 - 5) / (0.09 - 0.02);
  ptf.assert(ptf.near(x, 100) && ptf.near(A(100), B(100)), "equal at 100 minutes");
  ptf.assert(A(101) < B(101) && A(99) > B(99), "A cheaper above 100");
  return true;
});

// Numbers in Key facts.
fact("(1|5), (4|11) → f(x) = 2x + 3", () => { const { k, d } = through([1, 5], [4, 11]); return k === 2 && d === 3; });
fact("taxi f(10) = 26", () => ptf.near(line(2.2, 4)(10), 26));
fact("60-litre tank, 7.5 l per hour: empty after 8 h", () => 60 / 7.5 === 8);
fact("3 kg cost € 7.50 → € 2.50 per kg", () => 7.5 / 3 === 2.5);
fact("taxi: 0, 1, 2 km cost 4, 6.20, 8.40", () => [0, 1, 2].map(line(2.2, 4)).every((v, i) => ptf.near(v, [4, 6.2, 8.4][i])));
