// Recomputes the answers of elements/sine-functions.md (PTF SPEC.md §7.1).

const H = 1e-6;
const d = (f) => (x) => (f(x + H) - f(x - H)) / (2 * H);
const xs = Array.from({ length: 200 }, (_, i) => -6 + i * 0.061);
const same = (f, g, tol = 1e-6) => xs.every((x) => ptf.near(f(x), g(x), tol));
// Smallest period: first p > 0 on a fine grid with f(x + p) = f(x) for all test x.
// Start at 0.05: tiny shifts change the values by less than any tolerance and would look periodic.
const period = (f) => { for (let p = 0.05; p < 30; p += 0.001) if (xs.every((x) => ptf.near(f(x + p), f(x), 5e-3))) return p; return null; };
const refine = (f, p0) => { let best = p0, err = Infinity; for (let p = p0 - 0.002; p <= p0 + 0.002; p += 1e-6) { const e = xs.reduce((s, x) => s + Math.abs(f(x + p) - f(x)), 0); if (e < err) { err = e; best = p; } } return best; };

fact("2π/3 ≈ 2.09 and 2π/12.4 ≈ 0.507", () => ptf.near((2 * Math.PI) / 3, 2.09, 0.005) && ptf.near((2 * Math.PI) / 12.4, 0.507, 0.0005));

check("ferris-wheel", () => {
  const b = (2 * Math.PI) / 8, h = (t) => 20 * Math.sin(b * t);
  ptf.assert(ptf.near(refine(h, period(h)), 8, 1e-4), "period 8 min");
  return [ptf.near(b, Math.PI / 4), ptf.near(b, 8), ptf.near(b, 20)];
});

check("amplitude-period", () => {
  const f = (x) => 2 * Math.sin(3 * x);
  const amp = Math.max(...Array.from({ length: 10000 }, (_, i) => f(i * 0.001)));
  return [ptf.round(amp, 6), refine(f, period(f))];
});

check("sine-value", () => 2 * Math.sin(3 * (Math.PI / 6)));

check("parameter-effects-sine", () => {
  const f = Math.sin, g = (x) => 3 * Math.sin(2 * x), grid = Array.from({ length: 20000 }, (_, i) => i * 0.001);
  const max = Math.max(...grid.map(g)), min = Math.min(...grid.map(g));
  const pf = refine(f, period(f)), pg = refine(g, period(g));
  const zerosEqual = [Math.PI / 2, (3 * Math.PI) / 2].every((z) => ptf.near(g(z), 0, 1e-9) === ptf.near(f(z), 0, 1e-9));
  return [ptf.near(max, 3, 1e-6) && ptf.near(min, -3, 1e-6), ptf.near(pf / pg, 2, 1e-3), ptf.near(pg, 2, 1e-3), ptf.near(max - min, 3, 1e-6), zerosEqual];
});

check("tide", () => (2 * Math.PI) / 0.507);

check("cos-shift", () => [
  same(Math.cos, (x) => Math.sin(x + Math.PI / 2)),
  same(Math.cos, (x) => Math.sin(x - Math.PI / 2)),
  same(Math.cos, (x) => Math.sin(x) + Math.PI / 2),
  same(Math.cos, (x) => -Math.sin(x)),
]);

check("derivatives-sine", () => [
  same(d(Math.sin), Math.cos),
  same(d(Math.cos), (x) => -Math.sin(x)),
  same(d(Math.cos), Math.sin),
  same(d((x) => Math.sin(3 * x)), (x) => Math.cos(3 * x)),
  same(d(Math.sin), (x) => -Math.cos(x)),
]);

check("period-probe", (q) => {
  const f = (x) => Math.sin(2 * x), p = refine(f, period(f));
  return [ptf.near(p, Math.PI, 1e-4), ptf.near(p, 2, 1e-4), ptf.near(p, 4 * Math.PI, 1e-4)];
});

check("explain-model", () => {
  const p = (2 * Math.PI) / (100 * Math.PI);
  ptf.assert(ptf.near(p, 0.02) && ptf.near(1 / p, 50), "0.02 s, 50 Hz");
  return true;
});
