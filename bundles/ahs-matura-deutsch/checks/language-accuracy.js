// Checks elements/language-accuracy.md (PTF SPEC.md §7.1).

const words = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
// The word range a Schreibauftrag asks for, e.g. "(270–330 Wörter)".
const rangeOf = (text) => { const m = text.match(/(\d+)[–-](\d+) Wörter/); return m ? [Number(m[1]), Number(m[2])] : null; };
const inRange = (q) => {
  const r = rangeOf(q.question), n = words(q.sample_answer);
  ptf.assert(r, "task states a word range");
  ptf.assert(n >= r[0] && n <= r[1], `sample answer has ${n} words, task asks for ${r[0]}–${r[1]}`);
  return true;
};

// The proofreading task promises eight errors; the rubric and the sample answer list eight corrections.
check("proofread", (q) => {
  ptf.assert(q.rubric.length === 8, `rubric lists ${q.rubric.length} corrections`);
  ptf.assert((q.sample_answer.match(/(?:^|\. )\d /g) ?? []).length === 8, "sample answer lists eight corrections");
  return true;
});
