// Recomputes the answers of elements/language-tasks.md (ptf-spec SPEC.md §7.1).

check("size-ratio", () => 175e9 / 110e6);
fact("BERT-base about 110 million, GPT-3 175 billion", () => 175e9 / 110e6 > 1000);
