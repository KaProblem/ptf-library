// Recomputes the answers of elements/genai-lifecycle.md (PTF SPEC.md §7.1).

const se = (p, n) => Math.sqrt((p * (1 - p)) / n);

check("compare-versions", () => [(41 / 50) * 100, (45 / 50) * 100]);

check("noise", () => {
  const n = 50, p = 45 / n;
  return { rows: [n, p, (p * (1 - p)) / n], result: se(p, n) * 100 };
});

fact("version A passes 41 of 50 cases (82 %), version B 45 of 50 (90 %)", () => (41 / 50) * 100 === 82 && (45 / 50) * 100 === 90);
fact("√(0.9 · 0.1 / 50) ≈ 4.2 percentage points", () => ptf.round(se(0.9, 50) * 100, 1) === 4.2);
fact("for example 92 of 100 (92 %)", () => (92 / 100) * 100 === 92);
fact("√0.0018 ≈ 0.0424", () => ptf.round(Math.sqrt(0.0018), 4) === 0.0424);
fact("82 % vs. 90 % is suggestive, 88 % vs. 90 % is not", () => {
  // Difference of two independent rates on 50 cases each, in standard errors.
  const z = (a, b) => (b - a) / Math.sqrt(se(a, 50) ** 2 + se(b, 50) ** 2);
  return z(0.82, 0.9) > 1 && z(0.88, 0.9) < 0.5;
});
