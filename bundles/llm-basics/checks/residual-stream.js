// Recomputes the answers of elements/residual-stream.md (ptf-spec SPEC.md §7.1).

check("telephone", () => 0.8 ** 40 * 100);

check("layernorm-by-hand", (q) => {
  const x = [2, 4, 6, 8], n = x.length;
  const mu = x.reduce((a, b) => a + b, 0) / n;
  const v = x.reduce((a, b) => a + (b - mu) ** 2, 0) / n;
  const y = x.map((xi) => (xi - mu) / Math.sqrt(v));
  const shown = q.rows[3][1].match(/[−-]?\d+\.\d+/g).map(ptf.num);
  ptf.assert(shown.every((s, i) => ptf.near(s, y[i], 0.005)), "normalised vector");
  ptf.assert(ptf.near(y.reduce((a, b) => a + b, 0), 0) && ptf.near(y.reduce((a, b) => a + b * b, 0) / n, 1), "mean 0, variance 1");
  return { rows: [mu, v, Math.sqrt(v), null] };
});

check("param-count", () => {
  ptf.assert(ptf.near((50257 * 768 + 1024 * 768) / 1e6, 39, 0.5), "embeddings ≈ 39 M");
  return (12 * 12 * 768 ** 2) / 1e6;
});
