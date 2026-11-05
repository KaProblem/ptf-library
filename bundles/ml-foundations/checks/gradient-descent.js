// Recomputes the answers of elements/gradient-descent.md (PTF SPEC.md §7.1).

const dL = (w) => 2 * (w - 3);             // L(w) = (w − 3)²
const step = (w, a) => w - a * dL(w);
const run = (w, a, n) => { const ws = [w]; for (let i = 0; i < n; i++) ws.push(w = step(w, a)); return ws; };

check("one-step", () => step(0, 0.1));

check("rate-effects", () => {
  const ws = run(0, 1, 6);
  const bounces = ws.every((w, i) => w === (i % 2 ? 6 : 0));
  const big = run(0, 1.5, 6);
  return [
    bounces,
    !ws.some((w) => w > 3), // a too small rate would creep towards 3 and never jump past it
    false,
    Math.abs(big[6] - 3) < Math.abs(ws[6] - 3),
  ];
});

check("read-loss-curve", () => [true, false, false]);

check("epochs-iterations", () => [12000 / 100, 20 * 12000 / 100]);

check("gd-probe", () => { const slope = 4, w = 1; const w2 = w - 0.1 * slope; return [w2 < w, w2 > w, false]; });

check("linreg-gradient-college", () => {
  const xs = [1, 2, 3], ys = [2, 4, 6], w = 0, a = 0.05, N = 3;
  const s = xs.reduce((acc, x, i) => acc + (w * x - ys[i]) * x, 0);
  const g = (2 / N) * s, w1 = w - a * g;
  return { rows: [null, s, g, w1], result: w1 };
});

check("stability-college", () => {
  const factor = (a) => 1 - 2 * a;
  const err = (a, n) => run(0, a, n)[n] - 3;
  return [
    ptf.near(factor(0.25), 0.5) && ptf.near(err(0.25, 1) / err(0.25, 0), 0.5),
    Math.sign(err(0.8, 1)) !== Math.sign(err(0.8, 0)) && Math.abs(err(0.8, 30)) < 1e-3,
    Math.abs(err(0.75, 50)) > 1, // α = 0.75 > 0.5 would have to diverge
    Math.abs(err(1, 2)) < 1e-9,
    Math.abs(err(1, 100)) < Math.abs(err(0.5, 1)) + 1e-12,
  ];
});

check("batch-noise-college", () => [50000 / 50 === 1000, true, false, 50000 / 50 === 50]);

check("diagnose-curves-college", () => [true, false, false]);

fact("α = 0.1: first step to 0.6, factor 0.8", () => ptf.near(step(0, 0.1), 0.6) && ptf.near((step(0.6, 0.1) - 3) / (0.6 - 3), 0.8));
fact("α = 0.5 lands on 3 in one step", () => step(0, 0.5) === 3);
fact("α = 1: 0 → 6 → 0 → 6", () => run(0, 1, 3).join() === "0,6,0,6");
fact("α = 1.1 diverges", () => { const ws = run(0, 1.1, 10).map((w) => Math.abs(w - 3)); return ws.every((d, i) => i === 0 || d > ws[i - 1]); });
fact("distance multiplied by |1 − 2α|, shrinks for 0 < α < 1", () => [0.05, 0.3, 0.7, 0.95].every((a) => ptf.near(Math.abs(step(1, a) - 3) / 2, Math.abs(1 - 2 * a))));
fact("12,000 / 100 = 120 per epoch; 20 epochs → 2,400", () => 12000 / 100 === 120 && 20 * 120 === 2400);
fact("slope at 0 is −6; step 0.1 moves by +0.6", () => dL(0) === -6 && ptf.near(-0.1 * dL(0), 0.6));
