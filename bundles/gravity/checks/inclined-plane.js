// Recomputes the answers of elements/inclined-plane.md (ptf-spec SPEC.md §7.1).

check("odd-numbers", () => {
  // Distance grows with t²; 10 cm after the first second fixes the factor.
  const s = (t) => 10 * t * t;
  return [s(2) - s(1), s(3) - s(2), s(3)];
});

check("distance-after-two-seconds", () => {
  const a = 9.81 * Math.sin(Math.PI / 6);
  return 0.5 * a * 2 * 2;
});

check("friction-acceleration", () => {
  const th = Math.PI / 6;
  return 9.81 * (Math.sin(th) - 0.2 * Math.cos(th));
});
