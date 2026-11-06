// Recomputes the answers of elements/padding-and-masks.md (ptf-spec SPEC.md §7.1).

const padCount = (lengths, to) => lengths.length * (to ?? Math.max(...lengths)) - lengths.reduce((a, b) => a + b, 0);
const maskedSoftmax = (scores, mask) => {
  const e = scores.map((s, i) => (mask[i] ? Math.exp(s) : 0));
  const sum = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / sum);
};

check("dynamic-waste", () => padCount([8, 20, 11, 25]));

check("fixed-vs-dynamic", () => {
  const L = [5, 12, 7, 30], real = L.reduce((a, b) => a + b, 0);
  return { rows: [real, 4 * 30, padCount(L), 4 * 128, padCount(L, 128)], result: (padCount(L, 128) / 512) * 100 };
});

check("masked-softmax", () => maskedSoftmax([2, 1, 3, 3], [1, 1, 0, 0])[0] * 100);

check("two-masks", () => {
  const row = ["PAD", "PAD", "The", "cat", "sat"], q = 3;
  const allowed = row.map((t, k) => k <= q && t !== "PAD").map((ok, k) => (ok ? row[k] : null)).filter(Boolean);
  const a = allowed.join(",");
  return [a === "The,cat", a === row.join(","), a === "PAD,PAD,The,cat"];
});

fact("Dynamic padding: 4 · 30 = 120 slots, 54 real tokens, 66 padding tokens. Fixed padding to 128: 512 slots, 458 padding tokens.", () =>
  padCount([5, 12, 7, 30]) === 66 && padCount([5, 12, 7, 30], 128) === 458);
fact("of which 66 are padding; … would mean 458 padding places", () => padCount([5, 12, 7, 30]) === 66);
fact("55 % with dynamic padding", () => ptf.round((66 / 120) * 100, 0) === 55);
fact("padding to a fixed 512 when most inputs have 40 tokens wastes over 90 % of compute", () => (512 - 40) / 512 > 0.9);
