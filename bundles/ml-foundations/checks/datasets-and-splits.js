// Recomputes the answers of elements/datasets-and-splits.md (PTF SPEC.md §7.1).

const share = (pi, k) => pi / (pi + (1 - pi) / k);

check("memorized-exam-warmup", () => [true, false, false]);
check("label-problems", () => [true, true, false, false]);

check("downsample-fraud", () => {
  const n = 100000, pos = 0.01 * n, neg = n - pos, kept = neg / 20;
  return { rows: [pos, neg, kept, pos / (pos + kept), 20], result: pos / (pos + kept) };
});

check("split-sizes", () => { const n = 50000; return [0.8 * n, 0.1 * n, 0.1 * n]; });
check("role-of-sets", () => [true, false, false]);
check("spot-leak", () => [true, false, false]);

check("datasets-probe", () => {
  const acc = 199 / 200;
  ptf.assert(ptf.near(acc, 0.995), "always 'no defect' is right on 99.5 %");
  return [true, false, false];
});

check("downsample-share-college", () => share(0.005, 50));

check("calibration-weights-college", () => {
  // Odds of the positive class after downsampling by k: multiplied by k.
  const pi = 0.01, k = 20, oddsFull = pi / (1 - pi), oddsDown = pi / ((1 - pi) / k);
  const tooHigh = ptf.near(oddsDown / oddsFull, k);
  // Weighted count of kept negatives equals the original count.
  const restored = ptf.near(((1 - pi) * 100000 / k) * k, (1 - pi) * 100000);
  return [tooHigh, restored, false, false];
});

check("group-leak-college", () => [true, true, false, false]);

fact("1,000 positives, 99,000 negatives; 4,950 kept; ≈ 16.8 %", () => 99000 / 20 === 4950 && ptf.round(1000 / 5950 * 100, 1) === 16.8 && ptf.near(share(0.01, 20), 1000 / 5950));
fact("4,950 × 20 = 99,000", () => 4950 * 20 === 99000);
fact("50,000 → 40,000 / 5,000 / 5,000", () => 0.8 * 50000 === 40000 && 0.1 * 50000 === 5000);
fact("fraud about 17 %", () => ptf.round(share(0.01, 20) * 100, 0) === 17);
