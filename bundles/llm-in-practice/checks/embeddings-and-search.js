// Recomputes the answers of elements/embeddings-and-search.md (ptf-spec SPEC.md §7.1).

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const cos = (a, b) => dot(a, b) / (norm(a) * norm(b));

check("cosine-simple", () => cos([3, 4], [4, 3]));

check("cosine-meaning", () => {
  const sims = { A: 0.91, B: 0.12, C: 0.55 };
  const order = Object.keys(sims).sort((x, y) => sims[y] - sims[x]).join(", ");
  return [order === "A, C, B", order === "B, C, A", order === "A, B, C"];
});

check("cosine-3d", () => {
  const q = [1, 2, 2], A = [2, 1, 2], B = [0, 3, 4];
  const ranks = [cos(q, A), cos(q, B)].sort((x, y) => y - x);
  return { rows: [norm(q), cos(q, A), norm(B), cos(q, B)], result: ranks.indexOf(cos(q, A)) + 1 };
});

check("mean-pool", () => {
  const h = [2, 4, 6, 9], m = [1, 1, 1, 0];
  const pooled = dot(h, m) / m.reduce((a, b) => a + b, 0);
  ptf.assert((2 + 4 + 6 + 9) / 4 === 5.25, "unmasked mean 5.25");
  return pooled;
});

check("index-memory", () => (2e6 * 384 * 4) / 1e9);

fact("a = (1, 2, 2), b = (2, 1, 2): a · b = 8, ‖a‖ = ‖b‖ = 3, cos = 8 / 9 ≈ 0.889", () =>
  dot([1, 2, 2], [2, 1, 2]) === 8 && norm([1, 2, 2]) === 3 && norm([2, 1, 2]) === 3 && ptf.round(cos([1, 2, 2], [2, 1, 2]), 3) === 0.889);
fact("1 million passages × 768 dimensions × 4 bytes (float32) ≈ 3.1 GB", () => ptf.round((1e6 * 768 * 4) / 1e9, 1) === 3.1);
fact("10⁶ · 768 · 4 ≈ 3.1 GB", () => ptf.round((1e6 * 768 * 4) / 1e9, 1) === 3.1);
fact("8 / (3 · 3) ≈ 0.89", () => ptf.round(8 / 9, 2) === 0.89);
fact("‖a − b‖² = 2 − 2 a · b for unit vectors", () => {
  const u = [0.6, 0.8], v = [1, 0];
  const d = [u[0] - v[0], u[1] - v[1]];
  return ptf.near(dot(d, d), 2 - 2 * dot(u, v));
});
