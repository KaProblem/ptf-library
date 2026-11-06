// Recomputes the answers of elements/adapting-models.md (PTF SPEC.md §7.1).

const monthlyTokensM = (500000 * 2000) / 1e6;
const monthlyCost = monthlyTokensM * 2;

check("break-even", () => ({ rows: [monthlyTokensM, monthlyCost], result: 3000 / monthlyCost }));

fact("costs $2,000 a month; a one-off fine-tuning cost of $3,000 that removes it pays off after 1.5 months", () => monthlyCost === 2000 && 3000 / monthlyCost === 1.5);
fact("500,000 × 2,000 = 10⁹ tokens = 1,000 million", () => 500000 * 2000 === 1e9 && monthlyTokensM === 1000);
