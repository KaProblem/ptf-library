// Recomputes the answers of elements/trigonometry.md (PTF SPEC.md §7.1).

const rad = (deg) => (deg * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const sin = (a) => Math.sin(rad(a)), cos = (a) => Math.cos(rad(a));
// Point on the unit circle at angle a, by rotating (1, 0) in 1° steps (independent of sin/cos tables).
const circle = (a) => { let x = 1, y = 0; const c = Math.cos(rad(1)), s = Math.sin(rad(1)); for (let i = 0; i < a; i++) [x, y] = [c * x - s * y, s * x + c * y]; return [x, y]; };

fact("100 % gradient is 45°", () => ptf.near(deg(Math.atan(1)), 45));
fact("sin² + cos² = 1", () => [10, 75, 130, 200].every((a) => ptf.near(sin(a) ** 2 + cos(a) ** 2, 1)));
fact("cos 150° ≈ −0.866", () => ptf.near(cos(150), -0.866, 0.0005));

check("ladder-height", () => 5 * sin(70));

check("ratios-345", () => { ptf.assert(3 * 3 + 4 * 4 === 5 * 5, "right triangle"); return [3 / 5, 4 / 5, 3 / 4]; });

check("angle-from-sides", () => deg(Math.atan2(3, 4)));

check("gradient-angle", () => deg(Math.atan(12 / 100)));

check("solve-triangle", () => {
  const o = 10 * sin(30), a = 10 * cos(30);
  return { rows: [o, a, 90 - 30, o * o + ptf.round(a, 2) ** 2], result: null };
});

check("unit-circle", () => {
  const P = (a) => circle(a);
  return [
    ptf.near(P(150)[1], P(30)[1], 1e-9),
    ptf.near(P(150)[0], -P(30)[0], 1e-9),
    P(120)[0] > 0,
    P(100)[1] < 0,
    ptf.near(P(90)[1], 0, 1e-9),
  ];
});

check("two-angles", () => {
  const sols = Array.from({ length: 181 }, (_, a) => a).filter((a) => ptf.near(circle(a)[1], 0.5, 1e-9));
  return sols;
});

check("side-names-probe", () => {
  // Concrete triangle: β between c and a, with a = 4, b = 3, c = 5. β is opposite b.
  const a = 4, b = 3, c = 5, beta = Math.atan2(b, a);
  return [ptf.near(Math.cos(beta), a / c), ptf.near(Math.sin(beta), a / c), ptf.near(Math.tan(beta), a / b)];
});

check("why-sine-below-one", () => {
  ptf.assert(Array.from({ length: 360 }, (_, a) => circle(a)[1]).every((y) => Math.abs(y) <= 1 + 1e-12), "|sin| ≤ 1");
  return true;
});
