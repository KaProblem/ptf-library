// Recomputes the answers of elements/ml-fairness.md (PTF SPEC.md §7.1).

const A = { n: 200, q: 120, accQ: 100, accU: 10 }, B = { n: 100, q: 40, accQ: 24, accU: 6 };
const rate = (g) => (g.accQ + g.accU) / g.n;
const tpr = (g) => g.accQ / g.q;
const fpr = (g) => g.accU / (g.n - g.q);
const prec = (g) => g.accQ / (g.accQ + g.accU);

check("hiring-warmup", () => [true, false, false]);
check("name-the-bias", () => [true, false, false]);
check("more-bias-types", () => [true, true, false, false]);

check("group-rates", () => ({ rows: [rate(A), rate(B), tpr(A), tpr(B)], result: tpr(B) }));

check("which-criterion", () => {
  const g1 = { n: 100, q: 60, accQ: 60, accU: 0 }, g2 = { n: 100, q: 40, accQ: 40, accU: 0 };
  return [tpr(g1) === tpr(g2) && rate(g1) !== rate(g2), rate(g1) === rate(g2), tpr(g1) < 1];
});

check("mitigation-hs", () => [true, true, false, false]);
check("fairness-probe", () => [true, false, false]);

check("criteria-college", () => [
  ptf.near(fpr(A), 0.125) && ptf.near(fpr(B), 0.1),
  !ptf.near(tpr(A), tpr(B)),
  ptf.near(prec(A), prec(B)),
  ptf.near(rate(A), rate(B)),
]);

check("parity-threshold-college", () => {
  const accepted = Math.round(rate(A) * B.n), accQ = Math.min(B.q, accepted), accU = accepted - accQ;
  ptf.assert(accepted === 55 && accU === 15 && ptf.near(accU / (B.n - B.q), 0.25), "55 accepted, 15 unqualified, FPR 0.25");
  return accQ / B.q;
});

check("impossibility-college", () => [true, false, false]);
check("pipeline-college", () => [true, true, false, false]);

fact("A: 55 %, TPR ≈ 83.3 %; B: 30 %, TPR 60 %", () => rate(A) === 0.55 && ptf.round(tpr(A) * 100, 1) === 83.3 && rate(B) === 0.3 && tpr(B) === 0.6);
fact("precision A ≈ 0.91, B = 0.80", () => ptf.round(prec(A), 2) === 0.91 && prec(B) === 0.8);
fact("base rates 60 % and 40 %", () => A.q / A.n === 0.6 && B.q / B.n === 0.4);
fact("110 of 200 and 30 of 100; 100 of 120 (83 %) and 24 of 40 (60 %)", () => ptf.round(tpr(A) * 100, 0) === 83 && A.accQ + A.accU === 110 && B.accQ + B.accU === 30);
