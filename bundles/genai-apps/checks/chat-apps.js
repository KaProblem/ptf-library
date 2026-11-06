// Recomputes the answers of elements/chat-apps.md (PTF SPEC.md §7.1).

const SYSTEM = 500, USER = 50, REPLY = 150;
// Input of turn n: system message, n − 1 earlier exchanges, the new user message.
const inputAt = (n) => SYSTEM + (n - 1) * (USER + REPLY) + USER;
const totalUpTo = (n) => {
  let s = 0;
  for (let k = 1; k <= n; k++) s += inputAt(k);
  return s;
};

check("history-growth", () => ({ rows: [inputAt(1), inputAt(2), inputAt(3), inputAt(10)], result: totalUpTo(10) }));

fact("550 in turn 1, 2,350 in turn 10, and 14,500 input tokens over all 10 turns", () => inputAt(1) === 550 && inputAt(10) === 2350 && totalUpTo(10) === 14500);
fact("10 · 550 + 200 · 45 = 14,500", () => 10 * 550 + 200 * 45 === 14500 && totalUpTo(10) === 14500);
fact("about 26 times the first turn", () => Math.round(totalUpTo(10) / inputAt(1)) === 26);
fact("turn 10 sends 2,350 input tokens and the conversation so far has consumed 14,500", () => inputAt(10) === 2350 && totalUpTo(10) === 14500);
