// Recomputes the answers of elements/ai-agents.md (PTF SPEC.md §7.1).

const run = (p, n) => p ** n;
const firstBelowHalf = (p) => {
  let n = 1;
  while (run(p, n) >= 0.5) n++;
  return n;
};
const stepCost = (inTok, outTok) => inTok * 2e-6 + outTok * 8e-6;

check("ten-steps", () => run(0.95, 10) * 100);

check("compounding", () => ({ rows: [run(0.95, 10), run(0.95, 20), run(0.99, 20)], result: firstBelowHalf(0.95) }));

check("agent-run-cost", () => 8 * stepCost(6000, 300));

fact("0.95¹⁰ ≈ 0.60, 0.95²⁰ ≈ 0.36, 0.99²⁰ ≈ 0.82", () => ptf.round(run(0.95, 10), 2) === 0.6 && ptf.round(run(0.95, 20), 2) === 0.36 && ptf.round(run(0.99, 20), 2) === 0.82);
fact("With p = 0.95 the chance drops below 50 % from step 14 on", () => firstBelowHalf(0.95) === 14);
fact("0.95¹³ ≈ 0.513 and 0.95¹⁴ ≈ 0.488", () => ptf.round(run(0.95, 13), 3) === 0.513 && ptf.round(run(0.95, 14), 3) === 0.488);
fact("more than doubles the 20-step success rate", () => run(0.99, 20) > 2 * run(0.95, 20));
fact("8 steps with 6,000 input and 300 output tokens each cost 8 × (0.012 + 0.0024) ≈ $0.12", () => ptf.near(stepCost(6000, 0), 0.012) && ptf.near(stepCost(0, 300), 0.0024) && ptf.round(8 * stepCost(6000, 300), 2) === 0.12);
fact("At 10,000 runs a day that is about $1,150", () => Math.abs(10000 * 8 * stepCost(6000, 300) - 1150) < 5);
fact("a 10-step task is completely right only about 60 % of the time", () => Math.round(run(0.95, 10) * 100) === 60);
