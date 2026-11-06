// Recomputes the answers of elements/embeddings.md (PTF SPEC.md §7.1).

const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const cos = (a, b) => dot(a, b) / (norm(a) * norm(b));
const dist = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));

check("films-warmup", () => {
  const oh = (i) => Array.from({ length: 5 }, (_, j) => (j === i ? 1 : 0));
  const d01 = dist(oh(0), oh(1)), d02 = dist(oh(0), oh(2));
  return [ptf.near(d01, d02), d01 < d02, d02 < d01];
});

check("what-layer-does", () => [true, false, false]);

check("cosine-hs", () => cos([1, 2, 2], [2, 1, 2]));

check("closest-film", () => {
  const c = [0.9, 0.1], films = [[0.8, 0.2], [0.2, 0.7], [0.1, 0.9]], d = films.map((f) => dist(c, f));
  ptf.assert(ptf.round(d[0], 2) === 0.14 && ptf.round(d[1], 2) === 0.92 && ptf.round(d[2], 2) === 1.13, "distances in the feedback");
  return d.map((v) => v === Math.min(...d));
});

check("how-learned", () => [true, false, false]);

check("table-size-hs", () => 20000 * 50);

check("embed-probe", () => [true, false, false]);

check("gather-college", () => {
  const E = [[0.1, 0.2], [0.3, -0.4], [1.5, 0.6]];
  const oh = [0, 1, 0], viaMatmul = [0, 1].map((j) => oh.reduce((s, v, i) => s + v * E[i][j], 0));
  return [viaMatmul.every((v, j) => v === E[1][j]), true, false, false];
});

check("cosine-vs-dot-college", () => {
  const a = [3, 0], b = [1, 0.1], c = [0.6, 0.8], q = [1, 0];
  const dots = [a, b, c].map((v) => dot(q, v)), coss = [a, b, c].map((v) => cos(q, v));
  const rankDot = [0, 1, 2].sort((i, j) => dots[j] - dots[i]).join(), rankCos = [0, 1, 2].sort((i, j) => coss[j] - coss[i]).join();
  return [dots[0] === 3 && dots[0] === Math.max(...dots), ptf.round(cos(a, b), 3) === 0.995, ptf.near(cos(a, b), 3), rankDot === rankCos && false];
});

check("fourth-root-college", () => 160000 ** 0.25);

check("pretrained-college", () => [true, true, false, false]);

fact("50,000 × 64 = 3,200,000", () => 50000 * 64 === 3200000);
fact("a · b = 8, |a| = |b| = 3, cos ≈ 0.889; distance ≈ 1.414", () =>
  dot([1, 2, 2], [2, 1, 2]) === 8 && norm([1, 2, 2]) === 3 && norm([2, 1, 2]) === 3 && ptf.round(cos([1, 2, 2], [2, 1, 2]), 3) === 0.889 && ptf.round(dist([1, 2, 2], [2, 1, 2]), 3) === 1.414);
fact("50,000^(1/4) ≈ 15", () => Math.round(50000 ** 0.25) === 15);
fact("8 / 9 ≈ 0.89", () => ptf.round(8 / 9, 2) === 0.89);
