// Recomputes the answers of elements/inclined-plane.md (ptf-spec SPEC.md §7.1).

check("odd-numbers", () => {
  // Distance grows with t²; 10 cm after the first second fixes the factor.
  const s = (t) => 10 * t * t;
  return [s(2) - s(1), s(3) - s(2), s(3)];
});
