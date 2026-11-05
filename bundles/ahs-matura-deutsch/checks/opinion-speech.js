// Checks elements/opinion-speech.md (PTF SPEC.md §7.1).


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

// Survey of the Textbeilage: 400 asked, 268 with a broken device, 52 had something repaired, 300 would use the café.
const asked = 400, broken = 268, repaired = 52, wouldUse = 300;

check("survey-percent", () => (100 * wouldUse) / asked);

check("speech-task", (q) => {
  inRange(q);
  noInventedNumbers(q);
  // „zwei von drei“ and „drei von vier“ in the sample must match the survey.
  ptf.assert(Math.abs(broken / asked - 2 / 3) < 0.01, "268 of 400 is about two in three");
  ptf.assert(wouldUse / asked === 3 / 4, "300 of 400 is three in four");
  ptf.assert(repaired < asked / 4, "only a small part had something repaired");
  ptf.assert(/^Sehr geehrte/.test(q.sample_answer) && /Vielen Dank für Ihre Aufmerksamkeit\.$/.test(q.sample_answer), "address and closing formula");
  return true;
});
