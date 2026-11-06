// Recomputes the answers of elements/language-models.md (PTF SPEC.md §7.1).

const counts = { sat: 6, ran: 3, slept: 1 };
const total = Object.values(counts).reduce((a, b) => a + b, 0);
const pairs = (n) => n * n;
const lora = 2 * 4096 * 8, full = 4096 * 4096;

check("next-word-warmup", () => [true, false, false]);

check("token-count", () => 1200 / 0.75);

check("ngram-probability", () => counts.ran / total);

check("sparsity-hs", () => [50000 ** 3 > 1e12, false, false]);

check("attention-hs", () => [true, false, false]);

check("llm-problems-hs", () => [true, true, false, false]);

check("adapt-hs", () => [true, false, false]);

check("lm-probe", () => [true, false, false]);

check("chain-rule-college", () => 0.05 * 0.01 * 0.6);

check("attention-cost-college", () => ({ rows: [pairs(1000), pairs(4000), pairs(4000) / pairs(1000)], result: pairs(4000) / pairs(1000) }));

check("peft-share-college", () => 100 * lora / full);

check("architecture-college", () => [50000 ** 3 === 1.25e14, true, false, pairs(2000) / pairs(1000) === 2]);

check("adapt-college", () => [1e9 * 2 / 1e9 === 2 && 1e10 * 2 / 1e9 === 20, true, false, false]);

fact("P(sat | the cat) = 6/10 = 0.6", () => counts.sat / total === 0.6);
fact("400 tokens ≈ 300 words; 1,200 words ≈ 1,600 tokens", () => 400 * 0.75 === 300 && 1200 / 0.75 === 1600);
fact("50,000³ = 1.25 · 10¹⁴", () => 50000 ** 3 === 1.25e14);
fact("1,000 tokens → 1,000,000 pairs; 4,000 → 16,000,000 (× 16)", () => pairs(1000) === 1e6 && pairs(4000) === 16e6);
fact("rank-8 add-on 65,536 of 16,777,216 parameters (0.39 %)", () => lora === 65536 && full === 16777216 && ptf.round(100 * lora / full, 2) === 0.39);
fact("1 billion parameters ≈ 2 GB, 10 billion ≈ 20 GB at 2 bytes each", () => 1e9 * 2 === 2e9 && 1e10 * 2 === 2e10);
