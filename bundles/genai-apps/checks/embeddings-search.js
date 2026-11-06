// Recomputes the answers of elements/embeddings-search.md (PTF SPEC.md §7.1).

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const cos = (a, b) => dot(a, b) / (norm(a) * norm(b));

check("cosine-34-43", () => cos([3, 4], [4, 3]));

check("cosine-3d", () => {
  const q = [1, 2, 2], d = [2, 1, 2];
  return { rows: [dot(q, d), norm(q), norm(d)], result: cos(q, d) };
});

check("rank-docs", () => {
  const q = [0.8, 0.6];
  const docs = { "A = [0.6, 0.8]": [0.6, 0.8], "B = [1, 0]": [1, 0], "C = [0, 1]": [0, 1], "D = [−0.6, 0.8]": [-0.6, 0.8] };
  const sims = Object.entries(docs).map(([k, v]) => [k, cos(q, v)]);
  const order = [...sims].sort((a, b) => b[1] - a[1]).map(([k]) => k);
  ptf.assert(JSON.stringify(order) === JSON.stringify(Object.keys(docs)), "items are listed in the correct order");
  const want = [0.96, 0.8, 0.6, 0];
  sims.forEach(([, s], i) => ptf.assert(ptf.near(s, want[i], 1e-9), `cosine of item ${i + 1} is ${want[i]}`));
  return true;
});

fact("[3, 4] and [4, 3]: dot product 24, both lengths 5, cosine 24 / 25 = 0.96", () => dot([3, 4], [4, 3]) === 24 && norm([3, 4]) === 5 && ptf.near(cos([3, 4], [4, 3]), 0.96));
fact("[1, 0] and [0, 1]: cosine 0", () => cos([1, 0], [0, 1]) === 0);
fact("[1, 2] and [2, 4]: cosine 1", () => ptf.near(cos([1, 2], [2, 4]), 1, 1e-12));
fact("a · b = 8 and both norms are 3, so cos = 8 / 9 ≈ 0.889", () => dot([1, 2, 2], [2, 1, 2]) === 8 && norm([1, 2, 2]) === 3 && norm([2, 1, 2]) === 3 && ptf.round(cos([1, 2, 2], [2, 1, 2]), 3) === 0.889);
fact("unit vectors: cosine equals the dot product", () => ptf.near(cos([0.8, 0.6], [0.6, 0.8]), dot([0.8, 0.6], [0.6, 0.8]), 1e-12));
