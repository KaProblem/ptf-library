// Recomputes the answers of elements/bigram-model.md (ptf-spec SPEC.md §7.1).

check("initial-loss", () => -Math.log(1 / 65));

check("parameter-count", () => 65 * 65);
