// Recomputes the answers of elements/model-heads.md (ptf-spec SPEC.md §7.1).

const softmax = (z) => {
  const m = Math.max(...z);
  const e = z.map((x) => Math.exp(x - m));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / s);
};

check("softmax-two", () => softmax([0, 2])[1] * 100);

check("shapes", () => {
  const batch = 4, tokens = 32, hidden = 768, labels = 3;
  ptf.assert(batch === 4, "batch");
  return [String(tokens), String(hidden), String(labels)];
});

check("softmax-three", () => {
  const z = [2.0, 1.0, -1.0];
  const e = z.map(Math.exp);
  const sum = e.reduce((a, b) => a + b, 0);
  return { rows: [e[0], e[1], e[2], sum, e[0] / sum], result: e[2] / sum };
});

check("qa-span-logits", (q) => {
  const start = [0.1, 3.0, 0.2, 0.5], end = [0.0, 0.4, 0.3, 2.5];
  let best = { s: 0, e: 0, v: -Infinity };
  for (let i = 0; i < 4; i++) for (let j = i; j < 4; j++) if (start[i] + end[j] > best.v) best = { s: i + 1, e: j + 1, v: start[i] + end[j] };
  ptf.assert(ptf.near(best.v, 5.5), "best score 5.5");
  ptf.assert(ptf.near(start[1] + end[1], 3.4), "token 2 only scores 3.4");
  return [best.s === 2 && best.e === 4, best.s === 2 && best.e === 2, false];
});

check("lm-head-size", () => (768 * 50257) / 1e6);

fact("Logits [−1.6, 1.6] give probabilities 0.039 and 0.961", () => {
  const p = softmax([-1.6, 1.6]);
  return ptf.round(p[0], 3) === 0.039 && ptf.round(p[1], 3) === 0.961;
});
fact("p = 1 / (1 + e^{3.2}) ≈ 0.039", () => ptf.round(1 / (1 + Math.exp(3.2)), 3) === 0.039);
fact("768 · 50,257 ≈ 38.6 million", () => ptf.round(768 * 50257 / 1e6, 1) === 38.6);
fact("almost a third of a 124-million-parameter GPT-2 small", () => (768 * 50257) / 124e6 > 0.3);
