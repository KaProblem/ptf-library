// Recomputes the answers of elements/curved-spacetime.md (ptf-spec SPEC.md §7.1).

const GM = 3.986e14, c = 2.998e8, R = 6371e3, r = 26571e3, day = 86400;

check("gps-error-km", () => (38 * 300) / 1000);

check("gps-gravity-shift", () => {
  const dPhi = GM * (1 / R - 1 / r);
  const gravity = (dPhi / (c * c)) * day * 1e6;           // µs per day, clock runs fast
  const v = Math.sqrt(GM / r);
  const speed = -((v * v) / (2 * c * c)) * day * 1e6;      // µs per day, clock runs slow
  return { rows: [dPhi, dPhi / (c * c), gravity, speed], result: gravity + speed };
});
