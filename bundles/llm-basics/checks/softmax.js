// Recomputes the answers of elements/softmax.md (ptf-spec SPEC.md §7.1).

check("compute-softmax", (q) => {
  const z = [2, 1, 0], e = z.map(Math.exp), s = e.reduce((a, b) => a + b, 0), p = e.map((x) => x / s);
  q.rows.forEach((row, i) => ptf.assert(ptf.near(ptf.num(row[2]), e[i], 0.005), `e^z in row ${i + 1}`));
  ptf.assert(ptf.near(s, 11.11, 0.005), "sum 11.11");
  return { rows: p, result: p.reduce((a, b) => a + b, 0) };
});
