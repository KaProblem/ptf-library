// Recomputes the answers of elements/categorical-data.md (PTF SPEC.md §7.1).

const vocab = ["red", "blue", "black", "white", "silver"];
const oneHot = (v) => { const x = Array(vocab.length + 1).fill(0); const i = vocab.indexOf(v); x[i < 0 ? vocab.length : i] = 1; return x; };
const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

check("colour-numbers-warmup", () => { const w = 300; return [ptf.near(w * 5, 5 * (w * 1)), false, false]; });

check("encode-black", () => [
  same(oneHot("black"), [0, 0, 1, 0, 0, 0]),
  same(oneHot("green"), [0, 0, 0, 0, 0, 1]),
  vocab.indexOf("black") === 3,
  same(oneHot("silver"), [0, 0, 0, 0, 1]),
  false,
]);

check("postcode-size", () => 2500 + 1);

check("rare-categories", () => [true, 50000 / 1000 > 1, 50000 <= 1000, false]);

check("cross-size", () => {
  const types = ["sedan", "convertible", "SUV"], seasons = ["spring", "summer", "autumn", "winter"];
  return new Set(types.flatMap((t) => seasons.map((s) => `${t}×${s}`))).size;
});

check("why-cross", () => {
  // Additive model cannot fit: only convertible-in-summer is +5, everything else 0.
  const y = (t, s) => (t === 1 && s === 1 ? 5 : 0);
  // Best additive fit leaves error: check y(1,1) − y(1,0) − y(0,1) + y(0,0) ≠ 0 (interaction).
  return [y(1, 1) - y(1, 0) - y(0, 1) + y(0, 0) !== 0, false, false];
});

check("categorical-probe", () => [true, false, false]);

check("lookup-college", () => {
  const w = [1.5, -2, 0.3, 4, 0, 7];
  const picks = vocab.every((v, i) => ptf.near(oneHot(v).reduce((s, xi, j) => s + xi * w[j], 0), w[i]));
  const sumsToOne = [...vocab, "green"].every((v) => oneHot(v).reduce((a, b) => a + b, 0) === 1);
  return [picks, sumsToOne, false, false];
});

check("hash-collisions-college", () => 1000 * (1 - 1 / 1000) ** 3000);

check("embed-or-hash-college", () => [true, false, false]);

check("grid-cross-college", () => [50 * 50 === 2500, 100000 / 2500 < 50, false, false]);

fact("one-hot length 6; black = [0,0,1,0,0,0]; green = [0,0,0,0,0,1]", () => oneHot("black").length === 6 && same(oneHot("black"), [0, 0, 1, 0, 0, 0]) && same(oneHot("green"), [0, 0, 0, 0, 0, 1]));
fact("40,000 postcodes → 40,001", () => 40000 + 1 === 40001);
fact("3 × 4 = 12; 10 × 10 = 100", () => 3 * 4 === 12 && 10 * 10 === 100);
fact("e^(−3) ≈ 0.0498", () => ptf.round(Math.exp(-3), 4) === 0.0498);
