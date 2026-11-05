// Recomputes the answers of elements/universal-gravitation.md (ptf-spec SPEC.md §7.1).

check("moon-fall-per-second", () => (4.9 / 60 ** 2) * 1000);

check("iss-speed", () => {
  const GM = 3.986e14, r = 6371e3 + 400e3, v = Math.sqrt(GM / r), C = 2 * Math.PI * r, T = C / v;
  ptf.assert(ptf.near((v * v) / r, GM / (r * r), 1e-12), "centripetal acceleration equals gravity");
  return { rows: [r, v / 1000, C / 1000, T / 60], result: v / 1000 };
});

check("g-at-moon", () => (9.81 / 60.3 ** 2) * 1000);

check("geostationary-altitude", () => {
  // G M / r² = ω² r → r = (G M T² / 4π²)^(1/3); altitude in thousands of km.
  const r = Math.cbrt((3.986e14 * 86164 ** 2) / (4 * Math.PI ** 2));
  return (r - 6371e3) / 1e6;
});
