// Recomputes the answers of elements/production-ml.md (PTF SPEC.md §7.1).

check("cafe-warmup", () => [true, false, false]);
check("static-or-dynamic", () => [true, true, false, false]);
check("precompute-count", () => 2e6 * 50);
check("skew-hs", () => { ptf.assert(2490 / 24.9 === 100, "cents are 100 times euros"); return [true, false, false]; });
check("drift-shift", () => (38 - 30) / 5);
check("deploy-checks-hs", () => [true, false, false]);
check("production-probe", () => [true, false, false]);
check("drift-types-college", () => [true, true, false, false]);
check("architecture-college", () => [true, false, false]);
check("automl-hs", () => [true, true, false, false]);

check("automl-college", () => [true, false, false]);

fact("2 million × 50 = 100 million", () => 2e6 * 50 === 1e8);
fact("(38 − 30) / 5 = 1.6", () => (38 - 30) / 5 === 1.6);
