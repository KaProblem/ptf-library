// Recomputes the answers of elements/causal-mask.md (ptf-spec SPEC.md §7.1).

check("triangle-row-3", (q) => {
  const scores = [0, 0, 0, 0].map((s, j) => (j <= 2 ? s : -Infinity));   // row 3 sees columns 1 to 3
  const e = scores.map(Math.exp), sum = e.reduce((a, b) => a + b, 0), w = e.map((x) => x / sum);
  const frac = (t) => (t.includes("/") ? t.split("/").map(Number).reduce((a, b) => a / b) : Number(t));
  q.rows.forEach((row, i) => {
    ptf.assert(ptf.near(Number(row[3]), e[i]), `e^score in row ${i + 1}`);
    ptf.assert(ptf.near(frac(row[4]), w[i]), `weight in row ${i + 1}`);
  });
  return true;
});
