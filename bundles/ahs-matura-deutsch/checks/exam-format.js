// Recomputes the answers of elements/exam-format.md (PTF SPEC.md §7.1).

const range = (target) => [target * 0.9, target * 1.1];
const words = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

fact("270–330 (300), 405–495 (450) or 540–660 (600) words", () =>
  [[300, 270, 330], [450, 405, 495], [600, 540, 660]].every(([t, lo, hi]) => ptf.near(range(t)[0], lo) && ptf.near(range(t)[1], hi)));
fact("270–330 + 540–660, or 405–495 + 405–495 add up to about 900", () => 300 + 600 === 900 && 450 + 450 === 900);
fact("With 300 + 600 words that is 90 and 180 minutes", () => {
  const writing = 300 - 15 - 15;
  return ptf.near((writing * 300) / 900, 90) && ptf.near((writing * 600) / 900, 180);
});

check("range-target", () => {
  const [lo, hi] = [405, 495], t = (lo + hi) / 2;
  ptf.assert(ptf.near(t * 0.9, lo) && ptf.near(t * 1.1, hi), "range is target ± 10 %");
  return t;
});

check("time-plan", () => {
  const writing = 300 - 15 - 15, short = (270 + 330) / 2, long = (540 + 660) / 2;
  return (writing * long) / (short + long);
});

check("take-task-apart", (q) => {
  // The plan in the sample answer adds up to the target of the Kommentar.
  const parts = [...q.sample_answer.matchAll(/etwa (\d+) Wörter/g)].map((m) => Number(m[1]));
  const total = parts.reduce((a, b) => a + b, 0);
  ptf.assert(parts.length === 3 && total >= 270 && total <= 330, `plan sums to ${total}`);
  ptf.assert(words(q.sample_answer) > 0, "sample answer present");
  return true;
});
