// Recomputes the answers of elements/training-examples.md (ptf-spec SPEC.md §7.1).

const examples = (chunk) => chunk.slice(0, -1).map((_, t) => ({ context: chunk.slice(0, t + 1), target: chunk[t + 1] }));
const list = (xs) => `[${xs.join(", ")}]`;

check("examples-per-chunk", () => examples([..."ABCDEFGHI"]).length);

check("x-and-y", () => {
  const chunk = [18, 47, 56, 57, 58], y = chunk.slice(1), ex = examples(chunk)[2];
  return [list(y), list(ex.context), ex.target];
});

check("predictions-per-step", () => 64 * 256);
