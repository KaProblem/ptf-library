// Recomputes the answers of elements/choosing-a-model.md (PTF SPEC.md §7.1).

check("monthly-volume-cost", () => {
  const tokens = 1e6 * 1000;
  const L = (tokens / 1e6) * 5, S = (tokens / 1e6) * 0.25;
  return { rows: [tokens, L, S], result: L / S };
});

fact("1 million requests of 1,000 tokens each are 1 billion tokens", () => 1e6 * 1000 === 1e9);
fact("At $5 per million tokens that is $5,000", () => (1e9 / 1e6) * 5 === 5000);
fact("at $0.25 per million, $250", () => (1e9 / 1e6) * 0.25 === 250);
