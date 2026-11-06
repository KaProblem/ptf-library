// Recomputes the answers of elements/subword-tokenization.md (ptf-spec SPEC.md §7.1).

check("tokens-for-essay", () => 3000 / 0.75);
check("context-words", () => (8192 - 1000) / 1.3);
check("vocab-trade-off", () => {
  const added = (128 - 64) * 1024 * 4096;
  ptf.assert(ptf.round(added / 1e6, 0) === 268, "64k · 4,096 ≈ 268 million");
  return [true, true, true, false];
});

fact("But the sentence becomes 35 tokens long", () => [..."Unbelievably, the snowboarders won!"].length === 35);
fact("1,000 words ≈ 1,300 tokens", () => ptf.round(1000 / 0.75, -2) === 1300);
