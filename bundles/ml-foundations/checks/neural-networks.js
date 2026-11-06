// Recomputes the answers of elements/neural-networks.md (PTF SPEC.md §7.1).

const relu = (z) => Math.max(0, z);
const dense = (W, b, x, act = (z) => z) => W.map((row, i) => act(row.reduce((s, w, j) => s + w * x[j], b[i])));
const params = (sizes) => sizes.slice(1).reduce((s, n, i) => s + sizes[i] * n + n, 0);
const W1 = [[1, 1], [-1, 2]], b1 = [0, 1], W2 = [[3, 2]], b2 = [-1];
const tiny = (x) => { const pre = dense(W1, b1, x), h = pre.map(relu); return { pre, h, y: dense(W2, b2, h)[0] }; };

check("plant-warmup", () => {
  // Growth = −(water − 5)²: no single line is monotone like it.
  const g = (w) => -((w - 5) ** 2), ws = [0, 2, 5, 8, 10];
  const vals = ws.map(g);
  const monotone = vals.every((v, i) => i === 0 || v >= vals[i - 1]) || vals.every((v, i) => i === 0 || v <= vals[i - 1]);
  return [!monotone, monotone, false];
});

check("why-activation", () => {
  // Three linear layers collapse: test linearity f(a + b) − f(0) = (f(a) − f(0)) + (f(b) − f(0)).
  const L = [[[1, -2], [0.5, 1]], [[2, 1], [-1, 3]], [[1, 1]]], B = [[1, 0], [0, -2], [0.5]];
  const f = (x) => L.reduce((h, W, i) => dense(W, B[i], h), x)[0];
  const a = [1, 2], c = [-3, 0.5], z = [0, 0];
  const linear = ptf.near(f([a[0] + c[0], a[1] + c[1]]) - f(z), (f(a) - f(z)) + (f(c) - f(z)));
  return [linear, !linear, false];
});

check("forward-pass-hs", () => { const t = tiny([2, -1]); return { rows: [t.pre[0], t.h[0], t.pre[1], t.h[1], t.y], result: t.y }; });

check("relu-values", () => relu(-4) + relu(0.5) + relu(3));

check("count-params-hs", () => params([4, 5, 1]));

check("layers-roles", () => [true, true, false, false]);

check("nn-probe", () => [3, 6, 10].map((x) => relu(0.5 * x - 2) === 0));

check("collapse-college", () => {
  const Wa = [[1, 2], [0, 1]], ba = [1, 0], Wb = [[2, -1]], bb = [3];
  const f = (x) => dense(Wb, bb, dense(Wa, ba, x))[0];
  const b = f([0, 0]), w = [f([1, 0]) - b, f([0, 1]) - b];
  const linearEverywhere = [[2, 5], [-1, 3]].every((x) => ptf.near(f(x), w[0] * x[0] + w[1] * x[1] + b));
  return [w.join() === "2,3" && b === 5 && linearEverywhere, w.join() === "2,3" && b === 3, !linearEverywhere];
});

check("count-params-college", () => params([784, 256, 64, 10]));

check("hinge-bump-college", () => { const f = (x) => relu(x) - 2 * relu(x - 1) + relu(x - 2); return f(1.5); });

check("activation-choice-college", () => [true, true, false, false]);

check("xor-transfer", () => {
  const net = ([a, b]) => relu(a + b) - 2 * relu(a + b - 1);
  ptf.assert([[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]].every(([a, b, y]) => net([a, b]) === y), "XOR construction");
  return true;
});

fact("tiny network: hidden 1 and 0, output 2", () => { const t = tiny([2, -1]); return t.h.join() === "1,0" && t.pre[1] === -3 && t.y === 2; });
fact("3 → 4 → 2: 16 + 10 = 26", () => params([3, 4]) === 16 && params([4, 2]) === 10 && params([3, 4, 2]) === 26);
fact("784 → 128 → 10: 101,770", () => params([784, 128, 10]) === 101770);
fact("bump: 0 at 0, 1 at 1, 0 at 2 and beyond", () => { const f = (x) => relu(x) - 2 * relu(x - 1) + relu(x - 2); return f(-1) === 0 && f(0) === 0 && f(1) === 1 && f(2) === 0 && f(5) === 0; });
fact("y = 2(3x + 1) + 4 = 6x + 6", () => [0, 1, -2.5].every((x) => 2 * (3 * x + 1) + 4 === 6 * x + 6));
fact("sigmoid derivative ≤ 0.25", () => { let m = 0; for (let z = -10; z <= 10; z += 0.01) { const s = 1 / (1 + Math.exp(-z)); m = Math.max(m, s * (1 - s)); } return m <= 0.25 + 1e-12 && m > 0.2499; });
