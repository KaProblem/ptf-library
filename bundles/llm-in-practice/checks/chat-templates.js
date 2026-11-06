// Recomputes the answers of elements/chat-templates.md (ptf-spec SPEC.md §7.1).

const SYS = 200, USER = 60, REPLY = 140;
const contextAfter = (turns) => SYS + turns * (USER + REPLY);
const promptAtTurn = (k) => SYS + (k - 1) * (USER + REPLY) + USER;

check("context-after-turns", () => contextAfter(10));


check("prompt-tokens-total", () => {
  let total = 0;
  for (let k = 1; k <= 10; k++) total += promptAtTurn(k);
  ptf.assert(total === 10 * 260 + 200 * 45, "10 · 260 + 200 · 45");
  return total;
});

fact("the context after 10 turns is 200 + 10 · 200 = 2,200 tokens", () => contextAfter(10) === 2200);
fact("ten turns send 11,600 prompt tokens in total", () => {
  let total = 0;
  for (let k = 1; k <= 10; k++) total += promptAtTurn(k);
  return total === 11600;
});
