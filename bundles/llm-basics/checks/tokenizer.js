// Recomputes the answers of elements/tokenizer.md (ptf-spec SPEC.md §7.1).

check("vocab-size", () => {
  // 65 is the measured character set of the tiny-Shakespeare text; it cannot be recomputed
  // without the text. Check the explanation's count: 52 letters + space + newline + 11 others.
  ptf.assert(26 * 2 + 2 + 11 === 65, "52 letters, space, newline and 11 punctuation marks and digits");
  return true;
});
