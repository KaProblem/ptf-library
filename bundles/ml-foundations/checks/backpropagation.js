// Recomputes the answers of elements/backpropagation.md (PTF SPEC.md §7.1).

const relu = (z) => Math.max(0, z), drelu = (z) => (z > 0 ? 1 : 0);
const chain = (w1, w2, x = 2, y = 0) => {
  const z = w1 * x, h = relu(z), yp = w2 * h, L = (yp - y) ** 2;
  const dyp = 2 * (yp - y), dw2 = dyp * h, dh = dyp * w2, dw1 = dh * drelu(z) * x;
  return { h, yp, L, dyp, dw2, dh, dw1 };
};
const c0 = chain(1.5, -2);
// Finite-difference check of the backward pass.
const fd = (f, w, eps = 1e-6) => (f(w + eps) - f(w - eps)) / (2 * eps);
ptf.assert(ptf.near(fd((w) => chain(w, -2).L, 1.5), c0.dw1, 1e-4) && ptf.near(fd((w) => chain(1.5, w).L, -2), c0.dw2, 1e-4), "backprop matches finite differences");

check("parcel-warmup", () => [true, false, false]);

check("backprop-chain", () => ({ rows: [c0.h, c0.yp, c0.dyp, c0.dw2, c0.dh, c0.dw1], result: c0.dw1 }));

check("after-step", () => -2 - 0.01 * c0.dw2);

check("vanishing-hs", () => [0.25 ** 10 < 1e-6, false, false]);

check("symptoms-hs", () => [true, false, false]);

check("dropout-count", () => 250 * (1 - 0.2));

check("backprop-probe", () => [true, false, false]);

check("layer-grads-college", () => {
  // Numeric check on a 2→2 tanh layer with loss L = sum(a_out · c).
  const W = [[0.3, -0.7], [1.1, 0.2]], b = [0.1, -0.2], a = [0.5, -1.5], cvec = [1.3, -0.4];
  const fwd = (W, b, a) => W.map((r, i) => Math.tanh(r[0] * a[0] + r[1] * a[1] + b[i]));
  const L = (W, b, a) => fwd(W, b, a).reduce((s, v, i) => s + v * cvec[i], 0);
  const z = W.map((r, i) => r[0] * a[0] + r[1] * a[1] + b[i]);
  const dz = z.map((zi, i) => cvec[i] * (1 - Math.tanh(zi) ** 2));
  const eps = 1e-6;
  const okW = [0, 1].every((i) => [0, 1].every((j) => {
    const Wp = W.map((r) => r.slice()), Wm = W.map((r) => r.slice());
    Wp[i][j] += eps; Wm[i][j] -= eps;
    return ptf.near((L(Wp, b, a) - L(Wm, b, a)) / (2 * eps), dz[i] * a[j], 1e-5);
  }));
  const okA = [0, 1].every((j) => {
    const ap = a.slice(), am = a.slice(); ap[j] += eps; am[j] -= eps;
    return ptf.near((L(W, b, ap) - L(W, b, am)) / (2 * eps), W[0][j] * dz[0] + W[1][j] * dz[1], 1e-5);
  });
  const okB = [0, 1].every((i) => { const bp = b.slice(), bm = b.slice(); bp[i] += eps; bm[i] -= eps; return ptf.near((L(W, bp, a) - L(W, bm, a)) / (2 * eps), dz[i], 1e-5); });
  return [okW, okA, false, !okB];
});

check("loss-after-step-college", () => chain(1.5 - 0.01 * c0.dw1, -2 - 0.01 * c0.dw2).L);

check("fixes-college", () => [true, true, false, false]);

check("inverted-dropout-college", () => {
  const p = 0.2, scale = 1 / (1 - p);
  return [ptf.near(scale, 1.25) && ptf.near((1 - p) * scale, 1), true, false, false];
});

fact("h = 3, y′ = −6, L = 36", () => c0.h === 3 && c0.yp === -6 && c0.L === 36);
fact("gradients −12, −36, 24, 48", () => c0.dyp === -12 && c0.dw2 === -36 && c0.dh === 24 && c0.dw1 === 48);
fact("step: w₁ = 1.02, w₂ = −1.64; prediction ≈ −3.35, loss ≈ 11.2", () => {
  const w1 = 1.5 - 0.01 * 48, w2 = -2 + 0.01 * 36, c = chain(w1, w2);
  return ptf.near(w1, 1.02) && ptf.near(w2, -1.64) && ptf.round(c.yp, 2) === -3.35 && ptf.round(c.L, 1) === 11.2;
});
fact("0.25¹⁰ ≈ 9.5 · 10⁻⁷", () => ptf.round(0.25 ** 10 * 1e7, 1) === 9.5);
fact("1.5²⁰ ≈ 3,325", () => Math.round(1.5 ** 20) === 3325);
fact("dropout 0.2 on 100 units: 80 active, scale 1.25", () => 100 * 0.8 === 80 && 1 / 0.8 === 1.25);
fact("y′ ≈ −3.346 with h = 2.04", () => ptf.near(1.02 * 2, 2.04) && ptf.round(-1.64 * 2.04, 3) === -3.346);
