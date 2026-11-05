// Recomputes the answers of elements/bias-and-limitations.md (ptf-spec SPEC.md §7.1).

check("four-fifths", () => (45 / 100) / (72 / 120));

check("letters", () => {
  const count = [..."strawberry"].filter((c) => c === "r").length;
  ptf.assert(count === 3, "strawberry has three r");
  return [true, false, false];
});

fact("Selection rates 60 % vs 80 % give a ratio of 0.75", () => 0.6 / 0.8 === 0.75);
fact("0.60 / 0.80 = 0.75 < 0.8 flags a disparity", () => 0.6 / 0.8 < 0.8);
fact("A: 72 / 120 = 0.60; B: 45 / 100 = 0.45", () => 72 / 120 === 0.6 && 45 / 100 === 0.45);
