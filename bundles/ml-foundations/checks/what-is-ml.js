// Recomputes the answers of elements/what-is-ml.md (PTF SPEC.md §7.1).

const houses = [[50, 200000], [80, 320000], [100, 400000]];

check("house-guess", () => {
  const perM2 = houses.map(([m2, p]) => p / m2);
  ptf.assert(perM2.every((v) => v === perM2[0]), "all houses share one price per m²");
  return perM2[0] * 70;
});

fact("€ 4,000 per m² × 70 m² = € 280,000", () => houses.every(([m2, p]) => p / m2 === 4000) && 4000 * 70 === 280000);
