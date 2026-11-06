// Recomputes the answers of elements/reasoning-with-grpo.md (ptf-spec SPEC.md §7.1).

const mean = (r) => r.reduce((a, b) => a + b, 0) / r.length;
const std = (r) => { const m = mean(r); return Math.sqrt(r.reduce((s, x) => s + (x - m) ** 2, 0) / r.length); };
const advantages = (r) => { const m = mean(r), s = std(r); return r.map((x) => (s === 0 ? 0 : (x - m) / s)); };
const clipObjective = (rho, A, eps) => Math.min(rho * A, Math.min(Math.max(rho, 1 - eps), 1 + eps) * A);

check("group-hs", () => {
  const a = advantages([1, 0, 0, 1]);
  return [a[0] > 0 && a[3] > 0 && a[1] < 0 && a[2] < 0, a.every((x) => x > 0), a.every((x) => x === 0)];
});

check("all-right", () => {
  const a = advantages([1, 1, 1, 1]);
  return [a.every((x) => x === 0), false, false];
});

check("advantage-hs", () => advantages([1, 0, 0, 1])[0]);

check("advantages-college", () => {
  const r = [1.2, 0.2, 0.0, 0.2], a = advantages(r);
  ptf.assert(ptf.near(a[1], a[3]), "answers 2 and 4 equal");
  return { rows: [mean(r), std(r), a[0], a[2]], result: a[1] };
});

check("clip-ratio", () => clipObjective(1.5, 2, 0.2));

fact("Rewards [1, 0, 0, 1]: mean 0.5, std 0.5 → advantages [1, −1, −1, 1]", () =>
  mean([1, 0, 0, 1]) === 0.5 && std([1, 0, 0, 1]) === 0.5 && advantages([1, 0, 0, 1]).join() === "1,-1,-1,1");
fact("Rewards [1, 0, 0, 0]: mean 0.25, std ≈ 0.433 → [1.732, −0.577, −0.577, −0.577]", () => {
  const a = advantages([1, 0, 0, 0]).map((x) => ptf.round(x, 3));
  return ptf.round(std([1, 0, 0, 0]), 3) === 0.433 && a.join() === "1.732,-0.577,-0.577,-0.577";
});
fact("Ratio 1.5 with a positive advantage and ε = 0.2 counts as 1.2", () => clipObjective(1.5, 1, 0.2) === 1.2);
fact("(1 − 0.5) / 0.5 = 1; a wrong attempt gets (0 − 0.5) / 0.5 = −1", () => (1 - 0.5) / 0.5 === 1 && (0 - 0.5) / 0.5 === -1);
fact("ρ Â = 3.0, clip(1.5) = 1.2 → 2.4", () => 1.5 * 2 === 3 && ptf.near(1.2 * 2, 2.4));
const stdSample = (r) => { const m = mean(r); return Math.sqrt(r.reduce((s, x) => s + (x - m) ** 2, 0) / (r.length - 1)); };
fact("for [1, 0, 0, 1] that gives std ≈ 0.577 and advantages ±0.866", () => {
  const s = stdSample([1, 0, 0, 1]);
  return ptf.round(s, 3) === 0.577 && ptf.round(0.5 / s, 3) === 0.866;
});
