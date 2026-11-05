// Checks elements/assessment-grid.md (PTF SPEC.md §7.1): the grading rule as a small model.

const LEVELS = ["nicht erfüllt", "in den wesentlichen Bereichen überwiegend erfüllt", "in den wesentlichen Bereichen zur Gänze erfüllt", "über das Wesentliche hinausgehend erfüllt"];
// Three areas: text 1 (Inhalt, Textstruktur), text 2 (Inhalt, Textstruktur), language of both texts.
const positive = (areas) => areas.every((a) => a.every((lvl) => lvl >= 1));

fact("Each area must be positive; one negative area makes the exam Nicht genügend", () =>
  !positive([[0, 3], [3, 3], [3, 3]]) && positive([[1, 1], [1, 1], [1, 1]]));

check("levels-order", (q) => {
  ptf.assert(q.items.length === LEVELS.length && q.items.every((t, i) => t === LEVELS[i]), "items in grid order");
  return true;
});

check("negative-area", (q) => {
  const exam = [[0, 3], [3, 3], [3, 3]]; // Inhalt of text 1 not fulfilled, everything else excellent
  const negative = !positive(exam);
  return q.options.map((o) => o.text.startsWith("The exam is negative") === negative);
});
