// Recomputes the answers of elements/cross-entropy.md (ptf-spec SPEC.md §7.1).

check("uniform-loss", () => -Math.log(1 / 65));

check("loss-cloze", () => {
  const atZero = -Math.log(0);
  return [-Math.log(1) + 0, Number.isFinite(atZero) ? atZero : "infinite"];
});
