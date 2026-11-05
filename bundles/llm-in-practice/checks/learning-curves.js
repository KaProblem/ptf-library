// Recomputes the answers of elements/learning-curves.md (ptf-spec SPEC.md §7.1).

// Early stopping: returns { best (1-based epoch), stoppedAfter, counters }.
function earlyStop(losses, patience) {
  let best = Infinity, bestEpoch = 0, wait = 0;
  const counters = [];
  for (let e = 0; e < losses.length; e++) {
    if (losses[e] < best) { best = losses[e]; bestEpoch = e + 1; wait = 0; } else wait++;
    counters.push(wait);
    if (wait >= patience) return { best: bestEpoch, stoppedAfter: e + 1, counters };
  }
  return { best: bestEpoch, stoppedAfter: losses.length, counters };
}

check("early-stop-epoch", () => earlyStop([0.7, 0.55, 0.5, 0.47, 0.49, 0.52, 0.56], 99).best);

check("patience", () => {
  const r = earlyStop([0.62, 0.48, 0.41, 0.39, 0.4, 0.43, 0.47], 2);
  ptf.assert(r.stoppedAfter === 6, "stops after epoch 6");
  return { rows: r.counters.slice(2, 6), result: r.best };
});

check("accuracy-step", () => (1 / 408) * 100);

fact("patience 2: the best is epoch 4 (0.39), training stops after epoch 6", () => {
  const r = earlyStop([0.62, 0.48, 0.41, 0.39, 0.4, 0.43, 0.47], 2);
  return r.best === 4 && r.stoppedAfter === 6;
});
fact("for 408 examples that is about 0.25 percentage points", () => ptf.round(100 / 408, 2) === 0.25);
fact("With 400 test examples … a quarter of a percent", () => 100 / 400 === 0.25);
