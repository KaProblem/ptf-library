// Recomputes the answers of elements/securing-genai-apps.md (PTF SPEC.md §7.1).

const inputCost = (tokens) => tokens * 2e-6;

check("denial-of-wallet", () => inputCost(1000 * 100000));

fact("a bot sending 1,000 requests of 100,000 input tokens each costs $200 at $2 per million tokens", () => ptf.near(inputCost(1000 * 100000), 200));
fact("1,000 × 100,000 = 10⁸ tokens = 100 million", () => 1000 * 100000 === 1e8);
