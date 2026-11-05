// Recomputes the answers of elements/inference-performance.md (ptf-spec SPEC.md §7.1).

const MiB = 1048576, GiB = 1024 * MiB;
const kvBytesPerToken = (layers, kvHeads, headDim, bytes) => 2 * layers * kvHeads * headDim * bytes;

check("cache-chat", () => (0.5 * 4000 * 50) / 1000);

check("kv-size", () => {
  const perTok = kvBytesPerToken(32, 32, 128, 2);
  const perSeq = (perTok * 4096) / GiB;
  const gqa = (kvBytesPerToken(32, 8, 128, 2) * 4096 * 32) / GiB;
  return { rows: [perTok, perTok / MiB, perSeq, perSeq * 32], result: gqa };
});

check("bandwidth-bound", () => 2e12 / (13e9 * 2));
check("latency-total", () => 0.8 + (401 - 1) * 0.025);

fact("2 · 32 · 32 · 128 · 2 = 524,288 bytes = 0.5 MiB per token, 2 GiB for 4,096 tokens", () =>
  kvBytesPerToken(32, 32, 128, 2) === 524288 && kvBytesPerToken(32, 32, 128, 2) / MiB === 0.5 && (kvBytesPerToken(32, 32, 128, 2) * 4096) / GiB === 2);
fact("with 8 instead of 32 KV heads the cache shrinks four-fold (128 KiB per token", () => kvBytesPerToken(32, 8, 128, 2) / 1024 === 128);
fact("7 billion parameters in 16 bits are 14 GB; at 1 TB/s … at least 14 ms per step, so at most about 70 tokens per second", () =>
  (7e9 * 2) / 1e9 === 14 && ptf.round(((7e9 * 2) / 1e12) * 1000, 0) === 14 && ptf.round(1e12 / (7e9 * 2), -1) === 70);
fact("a conversation of 4,000 tokens needs around 2 GB", () => 0.5 * 4000 === 2000);
fact("At 32 concurrent 4k-token conversations a 7B model needs 64 GiB of cache", () => (kvBytesPerToken(32, 32, 128, 2) * 4096 * 32) / GiB === 64);
fact("the weights (about 13 GiB in fp16)", () => ptf.round((7e9 * 2) / GiB, 0) === 13);
fact("0.8 + 400 · 0.025 = 0.8 + 10 = 10.8 s", () => ptf.near(0.8 + 400 * 0.025, 10.8));
fact("26 GB / 2 TB/s = 13 ms", () => ptf.near((26e9 / 2e12) * 1000, 13));
