// Recomputes the answers of elements/fine-tuning-workflow.md (ptf-spec SPEC.md §7.1).

const steps = (n, batch, epochs) => Math.ceil(n / batch) * epochs;
const metrics = ({ tp, fp, fn, tn }) => {
  const p = tp / (tp + fp), r = tp / (tp + fn);
  return { acc: (tp + tn) / (tp + fp + fn + tn), p, r, f1: (2 * p * r) / (p + r) };
};

check("steps-per-run", () => steps(2000, 16, 3));

check("precision-simple", () => {
  const tp = 40, marked = 50, spam = 80;
  ptf.assert(tp / marked === 0.8, "precision 80 %");
  return (tp / spam) * 100;
});

check("spam-accuracy", () => {
  const spam = 5, ham = 95, predictedSpam = 0;
  const acc = ham / (spam + ham), recall = predictedSpam / spam;
  return [acc === 0.95 && recall === 0, acc === 0.05, false];
});

check("schedule", () => {
  const T = steps(3668, 8, 3), lr = (t) => 5 * (1 - t / T);
  return { rows: [Math.ceil(3668 / 8), T, lr(459)], result: lr(1000) };
});

check("effective-batch", () => 4 * 8 * 2);

check("f1-from-matrix", () => {
  const m = metrics({ tp: 240, fp: 30, fn: 40, tn: 90 });
  return { rows: [m.acc, m.p, m.r], result: m.f1 };
});

fact("⌈3,668 / 8⌉ = 459, so 3 epochs = 1,377 steps", () => Math.ceil(3668 / 8) === 459 && steps(3668, 8, 3) === 1377);
fact("With 3,668 examples and batches of 8 that is 459 steps per epoch", () => Math.ceil(3668 / 8) === 459);
fact("F1 = 2 · 0.889 · 0.857 / 1.746 ≈ 0.873", () => ptf.round(0.889 + 0.857, 3) === 1.746 && ptf.round(metrics({ tp: 240, fp: 30, fn: 40, tn: 90 }).f1, 3) === 0.873);
