// Checks elements/assessment-grid.md (PTF SPEC.md §7.1): the grading rule as a small model.

const LEVELS = [
  "nicht erfüllt",
  "das Wesentliche überwiegend erfüllt",
  "das Wesentliche zur Gänze erfüllt",
  "über das Wesentliche hinausgehend erfüllt",
  "weit über das Wesentliche hinausgehend erfüllt",
];
// exam = { k1: [inhalt, struktur], k2: [inhalt, struktur], k31: [stil, normen], k32: [stil, normen] }, levels 0..4.
const areaOk = (dims) => dims.every((l) => l >= 1);
// K3: one text may be negative if the other is clearly positive (here: both of its dimensions at least level 3).
const k3Ok = (a, b) => (areaOk(a) && areaOk(b)) || (areaOk(a) && a.every((l) => l >= 3)) || (areaOk(b) && b.every((l) => l >= 3));
const positive = (e) => areaOk(e.k1) && areaOk(e.k2) && k3Ok(e.k31, e.k32);

fact("Five levels, from nicht erfüllt to weit über das Wesentliche", () => LEVELS.length === 5);
fact("One dimension nicht erfüllt in K1 or K2 makes the exam negative", () =>
  !positive({ k1: [0, 4], k2: [4, 4], k31: [4, 4], k32: [4, 4] }) && positive({ k1: [1, 1], k2: [1, 1], k31: [1, 1], k32: [1, 1] }));
fact("In K3 one negative text can be balanced by a clearly positive other", () =>
  positive({ k1: [2, 2], k2: [2, 2], k31: [2, 0], k32: [3, 3] }) && !positive({ k1: [2, 2], k2: [2, 2], k31: [2, 0], k32: [1, 1] }));
fact("Ranges are target ± 10 %", () => [[300, 270, 330], [450, 405, 495], [600, 540, 660]].every(([t, lo, hi]) => ptf.near(t * 0.9, lo) && ptf.near(t * 1.1, hi)));

check("levels-order", (q) => {
  ptf.assert(q.items.length === LEVELS.length && q.items.every((t, i) => t === LEVELS[i]), "items in grid order");
  return true;
});

check("negative-area", (q) => {
  const negative = !positive({ k1: [0, 4], k2: [4, 4], k31: [4, 4], k32: [4, 4] });
  return q.options.map((o) => o.text.startsWith("The exam is negative") === negative);
});

check("k3-balance", (q) => {
  const ok = positive({ k1: [2, 2], k2: [2, 2], k31: [2, 0], k32: [3, 3] });
  return q.options.map((o) => o.text.startsWith("K3 can still be positive") === ok);
});
