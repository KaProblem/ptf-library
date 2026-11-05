// Recomputes the answers of elements/classification-metrics.md (PTF SPEC.md §7.1).

const emails = [[0.95, 1], [0.85, 1], [0.70, 0], [0.60, 1], [0.45, 0], [0.40, 1], [0.20, 0], [0.10, 0]];
const cm = (data, t) => {
  const c = { tp: 0, fp: 0, tn: 0, fn: 0 };
  for (const [s, y] of data) { const p = s >= t; c[p ? (y ? "tp" : "fp") : (y ? "fn" : "tn")]++; }
  return c;
};
const acc = (c) => (c.tp + c.tn) / (c.tp + c.fp + c.tn + c.fn);
const prec = (c) => c.tp / (c.tp + c.fp);
const rec = (c) => c.tp / (c.tp + c.fn);
const fpr = (c) => c.fp / (c.fp + c.tn);
const f1 = (c) => 2 * prec(c) * rec(c) / (prec(c) + rec(c));
const spam = { tp: 80, fn: 20, fp: 30, tn: 870 };
// Build a population with prevalence pi, TPR and FPR (per 10,000).
const pop = (pi, tpr, fprv, n = 10000) => { const P = pi * n, N = n - P; return { tp: tpr * P, fn: (1 - tpr) * P, fp: fprv * N, tn: (1 - fprv) * N }; };

check("lazy-test-warmup", () => {
  const c = { tp: 0, fn: 1, fp: 0, tn: 99 };
  return [acc(c) === 0.99 && rec(c) === 0, acc(c) === 0.5, acc(c) === 0.01];
});

check("count-outcomes", () => { const c = cm(emails, 0.5); return [c.tp, c.fp, c.tn, c.fn]; });

check("spam-metrics", () => ({ rows: [acc(spam), prec(spam), rec(spam), fpr(spam)], result: rec(spam) }));

check("lower-threshold", () => {
  const a = cm(emails, 0.5), b = cm(emails, 0.3);
  return [
    rec(a) === 0.75 && rec(b) === 1,
    prec(a) === 0.75 && ptf.round(prec(b), 2) === 0.67,
    prec(b) > prec(a) && rec(b) > rec(a),
    JSON.stringify(a) === JSON.stringify(b),
  ];
});

check("which-metric", () => [true, false, false]);

check("metrics-probe", () => {
  const c = { tp: 30, fp: 10, fn: 20, tn: 10000 - 50 - 10 };
  ptf.assert(ptf.round(acc(c), 3) === 0.997, "accuracy ≈ 0.997");
  return [rec(c) === 0.6, rec(c) === 0.75, ptf.near(rec(c), 0.997)];
});

check("prevalence-college", () => {
  const a = pop(0.01, 0.9, 0.05), b = pop(0.1, 0.9, 0.05);
  return [
    ptf.round(prec(a), 2) === 0.15,
    ptf.round(prec(b), 2) === 0.67,
    ptf.near(prec(a), 1 - 0.05),
    rec(a) < rec(b) - 1e-9,
  ];
});

check("f1-college", () => f1(spam));

check("monotone-college", () => {
  // Brute force: all label patterns for 6 sorted scores and all thresholds.
  let tpfp = true, recall = true, precNoUp = true, accNoDown = true;
  for (let m = 1; m < 63; m++) {
    const data = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4].map((s, i) => [s, (m >> i) & 1]);
    if (!data.some(([, y]) => y) || data.every(([, y]) => y)) continue;
    const ts = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35];
    for (let i = 1; i < ts.length; i++) {
      const hi = cm(data, ts[i - 1]), lo = cm(data, ts[i]);
      if (lo.tp < hi.tp || lo.fp < hi.fp) tpfp = false;
      if (rec(lo) < rec(hi)) recall = false;
      if (hi.tp + hi.fp > 0 && prec(lo) > prec(hi) + 1e-12) precNoUp = false;
      if (acc(lo) < acc(hi) - 1e-12) accNoDown = false;
    }
  }
  return [tpfp, recall, precNoUp, accNoDown];
});

check("cost-threshold-college", () => {
  // Smallest p (in steps of 0.001) where blocking is cheaper than letting through.
  for (let k = 0; k <= 1000; k++) { const p = k / 1000; if (95 * p > 5 * (1 - p)) return (k - 0.5) / 1000; }
  return NaN;
});

fact("spam example: accuracy 0.95, precision ≈ 0.727, recall 0.80, FPR ≈ 0.033, F1 ≈ 0.762", () =>
  acc(spam) === 0.95 && ptf.round(prec(spam), 3) === 0.727 && rec(spam) === 0.8 && ptf.round(fpr(spam), 3) === 0.033 && ptf.round(f1(spam), 3) === 0.762);
fact("always not spam: accuracy 0.90, recall 0", () => { const c = { tp: 0, fn: 100, fp: 0, tn: 900 }; return acc(c) === 0.9 && rec(c) === 0; });
fact("threshold 0.5: TP 3, FP 1, TN 3, FN 1; precision = recall = 0.75", () => { const c = cm(emails, 0.5); return c.tp === 3 && c.fp === 1 && c.tn === 3 && c.fn === 1 && prec(c) === 0.75 && rec(c) === 0.75; });
fact("threshold 0.3: TP 4, FP 2, TN 2, FN 0; precision ≈ 0.67, recall 1", () => { const c = cm(emails, 0.3); return c.tp === 4 && c.fp === 2 && c.tn === 2 && c.fn === 0 && ptf.round(prec(c), 2) === 0.67 && rec(c) === 1; });
fact("TPR 0.9, FPR 0.05: precision ≈ 0.15 at 1 %, ≈ 0.67 at 10 %", () => ptf.round(prec(pop(0.01, 0.9, 0.05)), 2) === 0.15 && ptf.round(prec(pop(0.1, 0.9, 0.05)), 2) === 0.67);
fact("110 flagged, 80 spam: 0.73", () => ptf.round(80 / 110, 2) === 0.73);
