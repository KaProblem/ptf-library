// Recomputes the answers of elements/transformer-architectures.md (ptf-spec SPEC.md §7.1).

const allowedPairs = (n, causal) => {
  let count = 0;
  for (let q = 1; q <= n; q++) for (let k = 1; k <= n; k++) if (!causal || k <= q) count++;
  return count;
};

check("allowed-pairs", () => allowedPairs(8, true));

fact("For n = 6: 36 against 21", () => allowedPairs(6, false) === 36 && allowedPairs(6, true) === 21);
fact("An encoder allows all 64", () => allowedPairs(8, false) === 64);
fact("8 · 9 / 2 = 36", () => (8 * 9) / 2 === 36);
