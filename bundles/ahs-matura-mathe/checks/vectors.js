// Recomputes the answers of elements/vectors.md (PTF SPEC.md §7.1).

// All numbers in a text such as "(3, −2)" or "(7|0)".
const vec = (text) => (String(text).match(/[−-]?\d+(?:[.,]\d+)?/g) || []).map(ptf.num);
const add = (a, b) => a.map((x, i) => x + b[i]);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const mul = (k, a) => a.map((x) => k * x);
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const len = (a) => Math.sqrt(dot(a, a));
const parallel = (a, b) => (a.length === 2 ? ptf.near(a[0] * b[1] - a[1] * b[0], 0)
  : [[0, 1], [1, 2], [0, 2]].every(([i, j]) => ptf.near(a[i] * b[j] - a[j] * b[i], 0)));
// Parameter t with P + t·v = Q, or null if Q is not on the line.
const paramOf = (P, v, Q) => {
  const i = v.findIndex((x) => x !== 0);
  const t = (Q[i] - P[i]) / v[i];
  return P.every((p, k) => ptf.near(p + t * v[k], Q[k])) ? t : null;
};

check("walk-distance", () => len(add([3, 0], [0, 4])));

check("price-times-quantity", () => dot([0.8, 1.2, 2.5], [120, 45, 30]));

check("stock-vectors", () => {
  // A made-up example week: sold = M − F.
  const M = [40, 25, 10, 8], F = [31, 25, 4, 8], sold = [9, 0, 6, 0];
  const eq = (a, b) => a.every((x, i) => ptf.near(x, b[i]));
  return [eq(sub(M, F), sold), eq(sub(F, M), sold), ptf.near(dot(M, F), sold.reduce((s, x) => s + x, 0)), false];
});

check("arrow-a-to-b", () => {
  const A = [1, 2], B = [4, 6], AB = sub(B, A), M = mul(0.5, add(A, B));
  return [AB[0], AB[1], len(AB), M[0], M[1]];
});

check("orthogonal-vectors", (q) => q.options.map((o) => ptf.near(dot([2, 3], vec(o.text)), 0)));

check("angle-between", () => {
  const a = [1, 2, 2], b = [2, -1, 2];
  return (Math.acos(dot(a, b) / (len(a) * len(b))) * 180) / Math.PI;
});

check("length-of-sum", () => {
  // Test each claim on many random vectors; a claim is "always true" if it never fails.
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 10 - 5;
  const cases = Array.from({ length: 200 }, () => [[rnd(), rnd()], [rnd(), rnd()]]);
  cases.push([[1, 0], [0, 1]]);
  const claims = [
    ([a, b]) => len(add(a, b)) <= len(a) + len(b) + 1e-12,
    ([a, b]) => ptf.near(len(add(a, b)), len(a) + len(b)),
    ([a]) => ptf.near(len(mul(2, a)), 4 * len(a)),
    ([a, b]) => !ptf.near(dot(a, b), 0) || len(a) === 0 || len(b) === 0,
  ];
  return claims.map((c) => cases.every(c));
});

check("point-on-line", (q) => q.options.map((o) => paramOf([1, 2], [3, -1], vec(o.text)) !== null));

check("parameter-to-equation", () => {
  const v = [3, -1], n = [-v[1], v[0]], P = [1, 2];
  ptf.assert(n[0] === 1 && ptf.near(dot(n, v), 0), "n = (1, 3) is perpendicular to v");
  return [n[1], dot(n, P)];
});

check("normal-from-equation", () => {
  const n = [2, -5], c = 3;
  return [
    ptf.near(dot(n, [5, 2]), 0),
    ptf.near(dot(n, [2, -5]), 0),
    ptf.near(dot(n, [0, 3]), c),
    parallel(n, [5, 2]),
  ];
});

check("lines-in-space", () => {
  const P = [1, 0, 2], v = [1, 2, -1], Q = [3, 4, 0], w = [2, 4, -2];
  const par = parallel(v, w), onG = paramOf(P, v, Q) !== null;
  return [par && onG, par && !onG, !par, false];
});

check("intersection", () => {
  // Solve 2t + s = 4 and t − 2s = −1 (Cramer).
  const det = 2 * -2 - 1 * 1;
  const t = (4 * -2 - 1 * -1) / det, s = (2 * -1 - 1 * 4) / det;
  const S = add([0, 1], mul(t, [2, 1]));
  ptf.assert(ptf.near(add([4, 0], mul(s, [-1, 2]))[0], S[0]) && ptf.near(add([4, 0], mul(s, [-1, 2]))[1], S[1]), "h gives the same point");
  ptf.assert(ptf.near(S[0], 2.8) && ptf.near(S[1], 2.4), "result text S = (2.8|2.4)");
  return [null, null, t, s, S[0], S[1]];
});

check("vector-a-to-b-probe", (q) => q.options.map((o) => {
  const AB = sub([2, 3], [5, 1]), v = vec(o.text);
  return ptf.near(v[0], AB[0]) && ptf.near(v[1], AB[1]);
}));

check("lines-in-plane-skew", () => {
  ptf.assert(!parallel([2, 1], [4, 3]), "directions are not parallel");
  return true;
});

// Numbers in Key facts.
fact("(1, 2) + (3, −1) = (4, 1); 3 · (2, −1) = (6, −3)", () => add([1, 2], [3, -1]).join() === "4,1" && mul(3, [2, -1]).join() === "6,-3");
fact("A(1|2), B(4|6): AB = (3, 4), |AB| = 5", () => sub([4, 6], [1, 2]).join() === "3,4" && len([3, 4]) === 5);
fact("p · q = 25 + 24 + 4 = 53", () => ptf.near(dot([2.5, 1.2, 0.8], [10, 20, 5]), 53));
fact("(2, 3) ⟂ (3, −2)", () => dot([2, 3], [3, -2]) === 0);
fact("x + 3y = 7 through (1|2) with n = (1, 3)", () => dot([1, 3], [1, 2]) === 7);
