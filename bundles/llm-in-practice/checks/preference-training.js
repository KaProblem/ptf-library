// Recomputes the answers of elements/preference-training.md (ptf-spec SPEC.md §7.1).

const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const dpoLoss = (beta, dW, dL) => -Math.log(sigmoid(beta * (dW - dL)));

check("reward-prob", () => sigmoid(2.0 - 0.0) * 100);

check("dpo-loss", () => {
  const margin = 0.1 * (2.0 - -1.0);
  return { rows: [margin, sigmoid(margin), dpoLoss(0.1, 0, 0)], result: dpoLoss(0.1, 2.0, -1.0) };
});

fact("Scores 1.5 vs 0.5 → σ(1) ≈ 0.731", () => ptf.round(sigmoid(1.5 - 0.5), 3) === 0.731);
fact("At the start (π = π_ref) the loss is log 2 ≈ 0.693", () => ptf.round(dpoLoss(0.1, 0, 0), 3) === 0.693 && ptf.near(dpoLoss(0.1, 0, 0), Math.log(2)));
fact("With β = 0.1 and log-ratios +2.0 (chosen) and −1.0 (rejected) the loss is −log σ(0.3) ≈ 0.554", () => ptf.round(dpoLoss(0.1, 2, -1), 3) === 0.554);
fact("L = −log σ(0.3) ≈ 0.554", () => ptf.round(-Math.log(sigmoid(0.3)), 3) === 0.554);
fact("1 / (1 + e^−2) = 1 / 1.135 ≈ 0.881", () => ptf.round(1 + Math.exp(-2), 3) === 1.135 && ptf.round(sigmoid(2), 3) === 0.881);
