// Recomputes the answers of elements/air-resistance.md (ptf-spec SPEC.md §7.1).

check("terminal-speed-paper-ball", () => {
  const m = 0.005, r = 0.03, cd = 0.5, rho = 1.2, g = 9.81;
  const A = Math.PI * r * r, k = 0.5 * rho * cd * A, W = m * g, vt = Math.sqrt(W / k);
  // Cross-check: at v_t the drag k v² equals the weight.
  ptf.assert(ptf.near(k * vt * vt, W, 1e-12), "drag equals weight at terminal speed");
  return { rows: [A, k, W, vt], result: vt };
});
