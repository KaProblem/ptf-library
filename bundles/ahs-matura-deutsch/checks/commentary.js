// Checks elements/commentary.md (PTF SPEC.md §7.1).


const words = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
// The word range a Schreibauftrag asks for, e.g. "(270–330 Wörter)".
const rangeOf = (text) => { const m = text.match(/(\d+)[–-](\d+) Wörter/); return m ? [Number(m[1]), Number(m[2])] : null; };
const inRange = (q) => {
  const r = rangeOf(q.question), n = words(q.sample_answer);
  ptf.assert(r, "task states a word range");
  ptf.assert(n >= r[0] && n <= r[1], `sample answer has ${n} words, task asks for ${r[0]}–${r[1]}`);
  return true;
};
// Every number in the sample text must come from the task or its Textbeilage (no invented figures).
const numbers = (s) => s.match(/\d[\d.,]*\d|\d/g) ?? [];
const noInventedNumbers = (q) => {
  for (const n of numbers(q.sample_answer)) ptf.assert(q.question.includes(n), `number ${n} is not in the task or Textbeilage`);
  return true;
};
// Every quotation „…“ in the sample text must occur in the Textbeilage word for word ([…] or … marks an omission).
const quotesExact = (q, source) => {
  for (const [, quote] of q.sample_answer.matchAll(/„([^“]+)“/g)) {
    const parts = quote.split(/\[…\]|…/).map((p) => p.trim().replace(/[.,]$/, "")).filter(Boolean);
    for (const p of parts) ptf.assert(source.includes(p), `quotation not in the Textbeilage: „${p}“`);
  }
  return true;
};

check("commentary-task", (q) => {
  quotesExact(q, q.question.split("Textbeilage: ")[1]);
  inRange(q);
  noInventedNumbers(q);
  ptf.assert(!q.sample_answer.split("\n")[0].endsWith("."), "starts with a headline");
  return true;
});
