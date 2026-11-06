// Recomputes the answers of elements/generation-metrics.md (ptf-spec SPEC.md §7.1).

const words = (s) => s.toLowerCase().replace(/[.,!?]/g, "").split(/\s+/).filter(Boolean);
const ngrams = (w, n) => w.slice(0, w.length - n + 1).map((_, i) => w.slice(i, i + n).join(" "));
const counts = (arr) => arr.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
function rouge(candidate, reference, n = 1) {
  const c = counts(ngrams(words(candidate), n)), r = counts(ngrams(words(reference), n));
  let overlap = 0;
  for (const [g, k] of c) overlap += Math.min(k, r.get(g) || 0);
  const cn = [...c.values()].reduce((a, b) => a + b, 0), rn = [...r.values()].reduce((a, b) => a + b, 0);
  const p = overlap / cn, rec = overlap / rn;
  return { overlap, p, r: rec, f1: overlap ? (2 * p * rec) / (p + rec) : 0 };
}
const REF = "the train was late because of snow";

check("rain-vs-snow", () => {
  const a = rouge("Snow made the train late.", REF).overlap, b = rouge("The train was late because of rain.", REF).overlap;
  ptf.assert(a === 4 && b === 6, "A shares 4, B shares 6");
  return [b > a, a > b, a === b];
});

check("ppl-from-loss", () => Math.exp(2.0));
check("rouge-recall-hs", () => rouge("the bridge closed after rain", "heavy rain closed the old bridge").r * 100);
check("rouge1-f1", () => {
  const s = rouge("snow made the train late", REF);
  return { rows: [s.overlap, s.r, s.p], result: s.f1 };
});
check("brevity-penalty", () => Math.exp(1 - 16 / 12));
check("uniform-ppl", () => Math.log(32000));

fact("Loss 2.5 → perplexity e^2.5 ≈ 12.2", () => ptf.round(Math.exp(2.5), 1) === 12.2);
fact("ROUGE-1 recall 4 / 7 ≈ 0.571, precision 4 / 5 = 0.8, F1 ≈ 0.667", () => {
  const s = rouge("snow made the train late", REF);
  return ptf.round(s.r, 3) === 0.571 && s.p === 0.8 && ptf.round(s.f1, 3) === 0.667;
});
fact("For c = 5, r = 7: BP = e^(−0.4) ≈ 0.670", () => ptf.round(Math.exp(1 - 7 / 5), 3) === 0.67);
fact("would have recall 6/7 and precision 6/7: F1 0.857", () => ptf.round(rouge("the train was late because of rain", REF).f1, 3) === 0.857);
fact("4 of the reference's 7 words appear, so recall is 4/7 ≈ 57 %", () => ptf.round((4 / 7) * 100, 0) === 57);
fact("an F1 of about 0.67", () => ptf.round(rouge("snow made the train late", REF).f1, 2) === 0.67);
fact("e^10.37 ≈ 32,000", () => ptf.round(Math.exp(10.37), -3) === 32000);
