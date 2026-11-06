// Recomputes the answers of elements/numerical-data.md (PTF SPEC.md §7.1).

const minmax = (x, lo, hi) => (x - lo) / (hi - lo);
const z = (x, m, s) => (x - m) / s;
const quantileBins = (n, k) => { const sizes = Array(k).fill(0); for (let i = 0; i < n; i++) sizes[Math.floor(i * k / n)]++; return sizes; };

check("scales-warmup", () => [true, false, false]);

check("find-problems", () => [true, true, false, false]);

check("scale-values", () => [minmax(50, 20, 120), z(50, 70, 15)]);

check("which-scaling", () => {
  const plays = [300, 500, 800, 1e6, 1e8];
  const lin = plays.map((x) => minmax(x, 300, 1e8));
  const squashed = lin.slice(0, 3).every((v) => v < 1e-5);
  const logs = plays.map(Math.log10);
  ptf.assert(ptf.near(Math.log10(100), 2) && ptf.near(Math.log10(1e6), 6) && ptf.near(Math.log10(1e8), 8), "log values in the feedback");
  return [squashed && logs[4] - logs[0] < 6, !squashed, false];
});

check("bin-or-not", () => {
  // Bill = (t − 18)²: no straight line fits, bins or t² do.
  const ts = [-10, 0, 10, 18, 25, 35], bill = ts.map((t) => (t - 18) ** 2);
  const sq = ts.map((t) => t * t - 36 * t + 324);
  const monotone = bill.every((b, i) => i === 0 || b <= bill[i - 1]) || bill.every((b, i) => i === 0 || b >= bill[i - 1]);
  return [!monotone && sq.every((v, i) => ptf.near(v, bill[i])), false, monotone];
});

check("quantile-bins", () => { const s = quantileBins(2000, 5); ptf.assert(s.every((v) => v === s[0]), "equal counts"); return s[0]; });

check("numerical-probe", () => [true, false, false]);

check("profile-college", () => {
  // 3 % sentinel 9,999 and mean 340 → the remaining 97 % average ≈ 41, matching the median.
  const m = (340 - 0.03 * 9999) / 0.97;
  ptf.assert(m > 35 && m < 45, "real ages average about 41");
  return [true, false, false, false];
});

check("conditioning-college", () => {
  // Fit y = 3x + 1 on raw and z-scored x: best MSE (0) reachable in both; min–max squashed by an outlier.
  const xs = [1, 2, 3, 4, 1000];
  const scaled = xs.map((x) => minmax(x, 1, 1000));
  const squashed = scaled.slice(0, 4).every((v) => v < 0.004);
  return [true, true, !squashed, false];
});

check("log-then-z-college", () => z(Math.log10(100000), 4.6, 0.3));

check("bins-vs-poly-college", () => {
  // A quadratic has at most one turning point.
  const turning = (f, xs) => { let c = 0; for (let i = 2; i < xs.length; i++) if (Math.sign(f(xs[i]) - f(xs[i - 1])) !== Math.sign(f(xs[i - 1]) - f(xs[i - 2]))) c++; return c; };
  const xs = Array.from({ length: 101 }, (_, i) => -5 + i / 10);
  const quadTurns = [[1, 0, 2], [-3, 1, 0.5]].map(([a, b, c]) => turning((x) => a * x * x + b * x + c, xs));
  const sizes = quantileBins(1000, 4);
  return [true, sizes.every((v) => v === 250), quadTurns.some((t) => t > 1), false];
});

fact("50 m² → 0.3", () => ptf.near(minmax(50, 20, 120), 0.3));
fact("mean 70, sd 15: 100 → 2.0; 40 → −2.0", () => z(100, 70, 15) === 2 && z(40, 70, 15) === -2);
fact("about 95 % of a normal distribution within ±2", () => {
  // Numerical integration of the standard normal density.
  let s = 0; const h = 1e-3; for (let x = -2; x < 2; x += h) s += Math.exp(-((x + h / 2) ** 2) / 2) * h;
  return ptf.round(s / Math.sqrt(2 * Math.PI) * 100, 0) === 95;
});
fact("views 10, 1,000, 1,000,000 → 1, 3, 6", () => [10, 1000, 1e6].map((v) => ptf.round(Math.log10(v), 6)).join() === "1,3,6");
fact("z = 7 clipped at ±3 → 3", () => Math.min(3, Math.max(-3, 7)) === 3);
fact("1,000 examples, 4 quantile bins → 250 each", () => quantileBins(1000, 4).every((v) => v === 250));
fact("(50 − 20) / 100 = 0.3; mean 70, sd 15: 100 m² → 2", () => ptf.near((50 - 20) / 100, 0.3) && z(100, 70, 15) === 2);
