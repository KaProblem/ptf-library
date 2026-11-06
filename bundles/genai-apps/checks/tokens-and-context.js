// Recomputes the answers of elements/tokens-and-context.md (PTF SPEC.md §7.1).

const WORDS_PER_TOKEN = 0.75;
const tokensForWords = (w) => w / WORDS_PER_TOKEN;
const PRICE_IN = 2 / 1e6, PRICE_OUT = 8 / 1e6; // example prices, dollars per token
const cost = (inTok, outTok) => inTok * PRICE_IN + outTok * PRICE_OUT;

check("essay-tokens", () => tokensForWords(1500));

check("class-cost", () => {
  const tokens = 30 * 2000;
  return [tokens, (tokens / 1e6) * 1];
});

check("book-tokens", () => tokensForWords(90000));

check("context-budget", () => {
  const parts = [1500, 100000, 20000, 4000];
  const rows = [];
  let sum = 0;
  for (const p of parts) rows.push((sum += p));
  return { rows, result: 128000 - sum };
});

check("daily-cost", () => {
  const i = 3000 * PRICE_IN, o = 500 * PRICE_OUT;
  ptf.assert(ptf.near(o / (i + o), 0.4), "output is 40 % of the cost");
  ptf.assert(500 / 3500 < 1 / 6 + 1e-9 && 500 / 3500 > 1 / 7 - 1e-9, "output is about a sixth to a seventh of the tokens");
  return { rows: [i, o, i + o], result: (i + o) * 10000 };
});

fact("100 tokens ≈ 75 words", () => ptf.near(100 * WORDS_PER_TOKEN, 75));
fact("1,000 words ≈ 1,333 tokens", () => Math.floor(tokensForWords(1000)) === 1333);
fact("3,000 input and 500 output tokens: 0.006 + 0.004 = $0.01", () => ptf.near(cost(3000, 500), 0.01) && ptf.near(3000 * PRICE_IN, 0.006));
fact("10,000 such requests a day: $100", () => ptf.near(cost(3000, 500) * 10000, 100));
fact("1,500 / 0.75 = 2,000 tokens", () => tokensForWords(1500) === 2000);
fact("90,000 / 0.75 = 120,000 tokens", () => tokensForWords(90000) === 120000);
fact("5,000 words is about 6,700 tokens", () => Math.abs(tokensForWords(5000) - 6700) < 50);
fact("a 300-word summary adds about 400 output tokens", () => tokensForWords(300) === 400);
