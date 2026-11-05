// Recomputes the answers of elements/rag.md (PTF SPEC.md §7.1).

// Chunk starts for a document of n tokens, chunk size s, overlap o: 0, s − o, … until a chunk reaches the end.
const chunkStarts = (n, s, o) => {
  const starts = [];
  for (let start = 0; ; start += s - o) {
    starts.push(start);
    if (start + s >= n) break;
  }
  return starts;
};

check("chunk-count", () => {
  const starts = chunkStarts(10000, 500, 100);
  return { rows: [500 - 100, starts[starts.length - 1], starts.length], result: 5 * 500 + 300 + 50 };
});

check("recall-at-5", () => (17 / 20) * 100);

fact("10,000 tokens, chunks of 500 tokens and 100 tokens overlap gives 25 chunks", () => chunkStarts(10000, 500, 100).length === 25);
fact("5 chunks of 500 tokens + 300 tokens of instructions + a 50-token question = 2,850 input tokens", () => 5 * 500 + 300 + 50 === 2850);
fact("9,600 / 400 + 1 = 25 chunks", () => 9600 / 400 + 1 === 25);
fact("300 pages of notes of about 500 tokens each become 375 chunks of 400 tokens", () => chunkStarts(300 * 500, 400, 0).length === 375);
