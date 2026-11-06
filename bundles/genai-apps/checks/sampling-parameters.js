// Recomputes the answers of elements/sampling-parameters.md (PTF SPEC.md §7.1).

const softmaxT = (z, T) => {
  const e = z.map((x) => Math.exp(x / T));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / s);
};
const nucleus = (p, top) => {
  const sorted = [...p].sort((a, b) => b - a);
  const kept = [];
  let sum = 0;
  for (const x of sorted) {
    kept.push(x);
    sum += x;
    if (sum >= top - 1e-12) break;
  }
  return kept.map((x) => x / sum);
};
const pct = (p) => p.map((x) => ptf.round(x * 100, 1));
const same = (a, b) => a.length === b.length && a.every((x, i) => ptf.near(x, b[i], 1e-9));

check("temperature-half", () => {
  const e = [2, 1, 0].map((x) => Math.exp(x / 0.5));
  const s = e[0] + e[1] + e[2];
  return { rows: [e[0], e[1], e[2], s, e[1] / s], result: e[0] / s };
});

check("nucleus", () => {
  const kept = nucleus([0.5, 0.25, 0.15, 0.06, 0.04], 0.9);
  return [kept.length, kept[0] * 100];
});

check("turn-down", () => {
  // Lowering T keeps the order and widens the gap between favourite and tail.
  const z = [0.6, 0.25, 0.1].map(Math.log);
  const hot = softmaxT(z, 1), cold = softmaxT(z, 0.5);
  return [cold[0] > hot[0] && cold[2] < hot[2], ptf.near(cold[0], cold[1]), false, cold[2] > cold[0]];
});

fact("at T = 1 the probabilities are 66.5 %, 24.5 %, 9.0 %", () => same(pct(softmaxT([2, 1, 0], 1)), [66.5, 24.5, 9.0]));
fact("at T = 0.5 they are 86.7 %, 11.7 %, 1.6 %", () => same(pct(softmaxT([2, 1, 0], 0.5)), [86.7, 11.7, 1.6]));
fact("at T = 2 they are 50.6 %, 30.7 %, 18.6 %", () => same(pct(softmaxT([2, 1, 0], 2)), [50.6, 30.7, 18.6]));
fact("three tokens remain (50 + 25 + 15 = 90 %), and the first now has 50 / 90 ≈ 55.6 %", () => {
  const kept = nucleus([0.5, 0.25, 0.15, 0.06, 0.04], 0.9);
  return kept.length === 3 && ptf.round(kept[0] * 100, 1) === 55.6;
});
fact("halving the temperature squares the ratios between token probabilities", () => {
  const a = softmaxT([2, 1, 0], 1), b = softmaxT([2, 1, 0], 0.5);
  return ptf.near(b[0] / b[1], (a[0] / a[1]) ** 2, 1e-9) && ptf.near(b[1] / b[2], (a[1] / a[2]) ** 2, 1e-9);
});
