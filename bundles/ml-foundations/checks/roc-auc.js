// Recomputes the answers of elements/roc-auc.md (PTF SPEC.md §7.1).

const pos8 = [0.95, 0.85, 0.60, 0.40], neg8 = [0.70, 0.45, 0.20, 0.10];
const point = (pos, neg, t) => [neg.filter((s) => s >= t).length / neg.length, pos.filter((s) => s >= t).length / pos.length];
const aucPairs = (pos, neg) => {
  let c = 0;
  for (const p of pos) for (const n of neg) c += p > n ? 1 : p === n ? 0.5 : 0;
  return c / (pos.length * neg.length);
};
// Area under the staircase ROC from all thresholds (trapezoids, handles ties).
const aucCurve = (pos, neg) => {
  const ts = [Infinity, ...[...pos, ...neg].sort((a, b) => b - a), -Infinity];
  const pts = ts.map((t) => point(pos, neg, t));
  let a = 0;
  for (let i = 1; i < pts.length; i++) a += (pts[i][0] - pts[i - 1][0]) * (pts[i][1] + pts[i - 1][1]) / 2;
  return a;
};

check("which-filter-warmup", () => [true, false, false]);

check("roc-point", () => { const [fpr, tpr] = point(pos8, neg8, 0.5); return [tpr, fpr]; });

check("curve-shape", () => {
  const [x0, y0] = point(pos8, neg8, Infinity), [x1, y1] = point(pos8, neg8, -Infinity);
  // Random model: many evenly interleaved scores → AUC near 0.5.
  const rp = [], rn = [];
  for (let i = 0; i < 200; i++) (i % 2 ? rp : rn).push(i / 200);
  const r = aucPairs(rp, rn);
  return [x0 === 0 && y0 === 0 && x1 === 1 && y1 === 1, Math.abs(r - 0.5) < 0.01, r < 0.01, false];
});

check("auc-pairs", () => aucPairs([0.9, 0.7, 0.4], [0.8, 0.3, 0.2]));

check("pick-model", () => [true, false, false]);

check("roc-probe", () => [true, false, false]);

check("auc-eight-college", () => {
  const a = aucPairs(pos8, neg8);
  ptf.assert(ptf.near(a, aucCurve(pos8, neg8)), "pair count equals the area under the staircase");
  return a;
});

check("invariance-college", () => {
  const sq = (xs) => xs.map((x) => x * x);
  const same = ptf.near(aucPairs(pos8, neg8), aucPairs(sq(pos8), sq(neg8)));
  const differs = (0.6 >= 0.5) !== (0.6 * 0.6 >= 0.5);
  return [same, true, aucPairs(sq(pos8), sq(neg8)) > aucPairs(pos8, neg8) + 1e-12, !differs];
});

check("imbalance-college", () => {
  const n = 1e6, P = n * 0.001, N = n - P, tp = 0.8 * P, fp = 0.01 * N, prec = tp / (tp + fp);
  ptf.assert(ptf.near(fp, 9990) && ptf.near(tp, 800) && ptf.round(prec, 3) === 0.074, "9,990 FP, 800 TP, precision 0.074");
  return [true, ptf.near(fp / (tp + fp), 0.01), prec > 0.9];
});

check("crossing-college", () => [true, false, false]);

fact("points t = 0.8, 0.5, 0.3 → (0, 0.5), (0.25, 0.75), (0.5, 1)", () =>
  [[0.8, [0, 0.5]], [0.5, [0.25, 0.75]], [0.3, [0.5, 1]]].every(([t, p]) => point(pos8, neg8, t).join() === p.join()));
fact("13 of 16 pairs → AUC = 0.8125", () => aucPairs(pos8, neg8) * 16 === 13 && aucPairs(pos8, neg8) === 0.8125);
fact("13 / 16 ≈ 0.81", () => ptf.round(13 / 16, 2) === 0.81);
fact("flipping scores gives 1 − AUC", () => ptf.near(aucPairs(pos8.map((s) => -s), neg8.map((s) => -s)), 1 - aucPairs(pos8, neg8)));
