// Recomputes the answers of elements/llm-evaluation.md (ptf-spec SPEC.md §7.1).

const C = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };
const passAtK = (n, c, k) => 1 - C(n - c, k) / C(n, k);
const elo = (diff) => 1 / (1 + 10 ** (-diff / 400));

check("chance-level", () => {
  const chance = 1 / 4;
  return [27 / 100 - chance < 0.05, false, false];
});

check("random-score", () => 200 / 5);

check("is-it-noise", () => {
  const se = Math.sqrt((0.7 * 0.3) / 1319) * 100, half = 1.96 * se, diff = 71.2 - 69.8;
  return { rows: [se, half, diff], result: diff > half ? 1 : 0 };
});

check("pass-at-k", () => ({ rows: [1, 2, 5].map((k) => passAtK(10, 3, k)), result: passAtK(10, 3, 8) }));

check("elo-win", () => elo(150) * 100);

fact("57 subjects … four options each, so chance level is 25 %", () => 1 / 4 === 0.25);
fact("n = 10, c = 3 gives pass@1 = 0.3 and pass@5 ≈ 0.917", () => ptf.near(passAtK(10, 3, 1), 0.3) && ptf.round(passAtK(10, 3, 5), 3) === 0.917);
fact("For p = 0.7 on GSM8K's 1,319 questions: about 1.3 percentage points, so a 95 % interval of about ± 2.5 points", () => {
  const se = Math.sqrt((0.7 * 0.3) / 1319) * 100;
  return ptf.round(se, 1) === 1.3 && ptf.round(1.96 * se, 1) === 2.5;
});
fact("100 points ahead ≈ 64 %", () => ptf.round(elo(100) * 100, 0) === 64);
fact("SE ≈ 1.26 pp, 95 % interval ± 2.5 pp", () => ptf.round(Math.sqrt((0.7 * 0.3) / 1319) * 100, 2) === 1.26);
fact("10^(−0.375) ≈ 0.422; 1 / 1.422 ≈ 0.703", () => ptf.round(10 ** -0.375, 3) === 0.422 && ptf.round(1 / 1.422, 3) === 0.703);
