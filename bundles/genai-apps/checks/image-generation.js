// Recomputes the answers of elements/image-generation.md (PTF SPEC.md §7.1).

const perDay = (variants, price, requests) => variants * price * requests;

check("variant-cost", () => perDay(4, 0.04, 2500));

fact("4 variants per request and 2,500 requests a day cost $400 a day at $0.04 per image", () =>
  ptf.near(perDay(4, 0.04, 2500), 400, 1e-9));
fact("with 2 variants it is $200 a day, saving $200 × 30 = $6,000 a month", () =>
  ptf.near(perDay(2, 0.04, 2500), 200, 1e-9) &&
  ptf.near((perDay(4, 0.04, 2500) - perDay(2, 0.04, 2500)) * 30, 6000, 1e-6));
