// Recomputes the answers of elements/supervised-fine-tuning.md (ptf-spec SPEC.md §7.1).

const IGNORE = -100;
const labelsFor = (parts) => parts.flatMap(([n, trained]) => Array.from({ length: n }, (_, i) => (trained ? i : IGNORE)));

check("graded-tokens", () => labelsFor([[220, false], [80, true]]).filter((l) => l !== IGNORE).length);

check("labels-mask", () => {
  const parts = [[180, false], [5, false], [95, true]];
  const labels = labelsFor(parts);
  const trained = labels.filter((l) => l !== IGNORE).length;
  return { rows: parts.map(([n, t]) => (t ? n : 0)), result: (trained / labels.length) * 100 };
});

check("packing-rows", () => 12000 / Math.floor(2048 / 300));

fact("In a 300-token example with a 220-token prompt, 80 tokens carry the loss", () => 300 - 220 === 80);
fact("With 2,048-token sequences and 300-token examples, 6 whole examples fit in one sequence", () => Math.floor(2048 / 300) === 6);
fact("about six examples per row instead of one", () => Math.floor(2048 / 300) === 6);
