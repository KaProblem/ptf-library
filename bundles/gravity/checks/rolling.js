// Recomputes the answers of elements/rolling.md (ptf-spec SPEC.md §7.1).

check("sphere-acceleration", () => {
  const g = 9.81, th = Math.PI / 6, k = 2 / 5;
  const along = g * Math.sin(th), a = along / (1 + k), mu = (k / (1 + k)) * Math.tan(th);
  ptf.assert(ptf.near(1 / (1 + k), 5 / 7), "rolling factor 5/7");
  return { rows: [along, null, a, mu], result: a };
});
