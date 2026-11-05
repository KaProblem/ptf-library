// Recomputes the answers of elements/free-fall.md (ptf-spec SPEC.md §7.1).

const g = 9.81, h = 56;
const s = (t) => 0.5 * g * t * t;

check("tower-time", () => Math.sqrt((2 * h) / g));

check("tower-fall-calc", () => {
  const t = Math.sqrt((2 * h) / g);
  ptf.assert(ptf.near(s(t), h, 1e-9), "the time brings the ball down 56 m");
  const first = s(1), second = s(2) - s(1);
  return { rows: [t, g * ptf.round(t, 2), first, second], result: `1 : ${ptf.round(second / first, 6)}` };
});
