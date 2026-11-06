// Recomputes the answers of elements/pretraining-and-transfer.md (ptf-spec SPEC.md §7.1).

check("examples-per-sentence", () => {
  const n = 10;
  let examples = 0;
  for (let t = 1; t < n; t++) examples++; // predict token t + 1 from tokens 1..t
  return examples;
});

check("masked-count", () => {
  const chosen = 0.15 * 512;
  return { rows: [chosen, 0.8 * chosen, 0.1 * chosen, 0.1 * chosen], result: Math.round(chosen) };
});

check("gpt3-flops", () => Math.log10(6 * 175e9 * 300e9));

fact("In a 512-token sequence 15 % is about 77 predicted tokens", () => Math.round(0.15 * 512) === 77);
fact("GPT-3 (N = 175 billion, D = 300 billion tokens) ≈ 3.15 · 10²³ FLOPs", () => ptf.round(6 * 175e9 * 300e9 / 1e23, 2) === 3.15);
fact("D is 30,000 times smaller", () => ptf.near(300e9 / 1e7, 30000));
