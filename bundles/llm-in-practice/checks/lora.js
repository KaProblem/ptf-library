// Recomputes the answers of elements/lora.md (ptf-spec SPEC.md §7.1).

const loraParams = (d, k, r) => r * (d + k);

check("count-hs", () => loraParams(1000, 1000, 4));

check("model-adapter", () => {
  const full = 4096 * 4096, per = loraParams(4096, 4096, 8), model = 32 * 2 * per;
  return { rows: [full, per, (per / full) * 100, model], result: (model / 7e9) * 100 };
});

check("full-ft-memory", () => (7e9 * 16) / 1e9);

check("b-zero", () => {
  // With B = 0 the product B·A is the zero matrix whatever A is.
  const A = [[0.3, -1.2], [0.7, 0.1]], B = [[0, 0], [0, 0], [0, 0]];
  const BA = B.map((row) => A[0].map((_, j) => row.reduce((s, b, t) => s + b * A[t][j], 0)));
  return [BA.flat().every((x) => x === 0), false, false];
});

fact("d = k = 4,096, r = 8: 8 · 8,192 = 65,536 trainable parameters instead of 16,777,216, about 0.39 %", () =>
  loraParams(4096, 4096, 8) === 65536 && 4096 * 4096 === 16777216 && ptf.round((65536 / 16777216) * 100, 2) === 0.39);
fact("32 · 2 · 65,536 = 4,194,304 ≈ 4.2 million parameters, about 0.06 % of 7 billion", () =>
  32 * 2 * 65536 === 4194304 && ptf.round((4194304 / 7e9) * 100, 2) === 0.06);
fact("about 112 GB for 7 billion parameters", () => (7e9 * 16) / 1e9 === 112);
fact("16-bit weights (14 GB)", () => (7e9 * 2) / 1e9 === 14);
fact("about 0.5 bytes per parameter, 3.5 GB for 7 billion", () => (7e9 * 0.5) / 1e9 === 3.5);
fact("8 × 4,096 + 4,096 × 8 = 65,536 numbers together, less than half a percent", () => 8 * 4096 + 4096 * 8 === 65536 && 65536 / (4096 * 4096) < 0.005);
fact("4,096 rows and 4,096 columns: almost 17 million numbers", () => ptf.round((4096 * 4096) / 1e6, 0) === 17);
fact("The adapter file in 16-bit is about 8 MB", () => ptf.round((4194304 * 2) / 1e6, 0) === 8);
fact("instead of 1,000,000 for the full table: 0.8 %", () => (8000 / 1e6) * 100 === 0.8);
