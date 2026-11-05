// Recomputes the answers of elements/gpt-end-to-end.md (ptf-spec SPEC.md §7.1).

check("block-params", () => {
  const C = 384, attention = 4 * C * C, ffn = 2 * C * (4 * C);   // q, k, v, projection; two layers C → 4C → C
  ptf.assert(attention + ffn === 12 * C * C, "4C² + 8C² = 12C²");
  return (12 * C * C) / 1e6;
});
