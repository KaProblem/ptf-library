---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/causal-mask
title: "Looking back: the causal mask"
description: Each position may gather information from itself and earlier positions only; a lower-triangular weight matrix does this in one matrix multiplication.
lang: en
levels: [highschool, college, expert]
tags: [llm, attention, causal-mask, matrix-multiplication]
requires:
  - ptf:el/llm-basics/training-examples
  - ptf:el/llm-basics/softmax
leads_to:
  - ptf:el/llm-basics/self-attention
duration_min: { highschool: 15, college: 20, expert: 10 }
simulators:
  - ref: ptf:sim/causal-mask@^1.0.0
    station: average-past
    levels: [highschool, college]
    role: explore
    note: Start here; the guess question makes the "no future" rule tangible.
  - ref: ptf:sim/causal-mask@^1.0.0
    station: triangle
    levels: [highschool, college, expert]
    role: explore
    note: Let the learner open a future cell and see the leak before explaining why the mask exists.
  - ref: ptf:sim/causal-mask@^1.0.0
    station: softmax-mask
    levels: [college, expert]
    role: practice
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T13:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Core

To predict what comes next, every position needs information from the text
before it, but never from the text after it, because that is the answer it
is supposed to predict. The simplest way to gather the past is to average
it. Written as a table of weights, the allowed entries form a lower triangle:
the causal mask.

# Key facts

- Position t may read positions 1…t (itself and the past), never t+1…T.
- Uniform averaging: row t of the weight matrix has t entries of 1/t; everything above the diagonal is 0.
- Weights (T × T) times values (T × C) gives all T averages in one matrix multiplication.
- Masked softmax gives the same matrix: start with scores (all 0), set the future to −∞, apply softmax per row. e^(−∞) = 0, so masked cells get exactly zero weight.
- With non-zero scores the weights stop being uniform: that is the step to self-attention, where the scores come from query · key.
- Code: `wei = wei.masked_fill(tril == 0, float("-inf")); wei = softmax(wei, dim=-1); out = wei @ x`.
- Without the mask the training loss collapses towards 0 because each position can read its own target, but the model is useless for generation, where the future does not exist yet.

# Level: highschool

<!-- ptf:text v1 -->

Here are eight numbers in a row: 3, 1, 4, 1, 5, 9, 2, 6. Each one stands for
something about a character in a sentence. Now every position may collect
information, but only from itself and from the positions before it. What
does position 5 get if it simply takes the average?

It sees 3, 1, 4, 1 and 5, so the average is 14 / 5 = 2.8. It must not use
the 9, 2 and 6 that come later: when the model writes text, those characters
do not exist yet, and during training they are exactly the answers it is
supposed to guess.

If you write down how much each position takes from each other position,
you get a table. Row 1 takes 100 % from itself. Row 2 takes 50 % from 1 and
50 % from itself. Row 8 takes one eighth from everyone. Everything above the
diagonal stays empty, so the filled part looks like a triangle. That triangle
is called the causal mask: it is a rule that the future is off limits.

# Level: college

<!-- ptf:text v1 -->

Let x ∈ ℝ^(T×C). The causal average is out_t = (1/t) Σ_{s≤t} x_s. Build
W = row-normalised tril(ones(T, T)); then out = W x computes every out_t at
once, and with a batch dimension (B, T, T) @ (B, T, C) runs per sequence.
Equivalently, start from a score matrix S = 0, set S_ts = −∞ for s > t, and
take softmax over each row. The second form matters because S does not have
to stay zero: if S is computed from the data, each position can weight its
past unevenly while the mask still guarantees causality. That is exactly a
self-attention head without the query/key/value parametrisation.

# Level: expert

<!-- ptf:text v1 -->

The mask defines the attention graph: a decoder uses the causal (lower-
triangular) graph so the factorisation p(x) = Π_t p(x_t | x_<t) holds and all
T next-token losses can be computed in one parallel pass (teacher forcing).
Encoders drop the mask; prefix-LM variants allow full attention within a
prompt and causal attention afterwards; document packing adds block-diagonal
masks. Implementations fuse the mask into the attention kernel
(FlashAttention's causal flag) instead of materialising a T × T matrix, and
masked logits are set to a large negative number or −∞ before the softmax,
never multiplied by zero after it, which would break normalisation.

# Misconceptions

- **attention-sees-future**: Each position can look at the whole sentence → in a decoder it sees only itself and earlier positions; the future is masked.
- **only-current-token**: Each position only uses its own token → it aggregates over all earlier positions (in the simplest form, an average).
- **mask-by-zero-scores**: Setting a score to 0 removes a position → after softmax a score of 0 still gives weight e^0 = 1 (before normalising); only −∞ gives exactly zero.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "average-position-5",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "attention-sees-future",
  "question": "The values at positions 1 to 8 are 3, 1, 4, 1, 5, 9, 2, 6. Each position takes the average of itself and the positions before it. What does position 5 get?",
  "options": [
    { "text": "2.8", "correct": true, "feedback": "Yes: (3 + 1 + 4 + 1 + 5) / 5 = 2.8." },
    { "text": "3.875", "correct": false, "feedback": "That is the average of all eight; position 5 must not see positions 6 to 8." },
    { "text": "5", "correct": false, "feedback": "That is only its own value; the average includes the past." }
  ],
  "explanation": "Only the past and the position itself count, so the average runs over the first five values."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "no-mask-loss",
  "level": "highschool",
  "purpose": "transfer",
  "misconception": "attention-sees-future",
  "question": "Someone trains a model without the mask. Its training loss drops almost to 0. What is going on?",
  "options": [
    { "text": "Each position can read the very token it should predict", "correct": true, "feedback": "Right. It copies the answer from the future." },
    { "text": "The model has become excellent", "correct": false, "feedback": "No. It cheats, and when it has to write new text, there is no future to copy from." },
    { "text": "The training text is too short", "correct": false, "feedback": "A short text can cause memorising, but the near-zero loss here comes from seeing the answers." }
  ],
  "explanation": "The mask is what makes next-token prediction a real prediction."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "triangle-row-3",
  "level": "college",
  "purpose": "check",
  "title": "Masked softmax for row 3",
  "intro": "T = 4. Row 3 (position 3) has scores [0, 0, 0, 0] before masking.",
  "columns": ["Column", "Score", "After mask", "e^score", "Weight"],
  "rows": [["1", "0", "0", "1", "1/3"], ["2", "0", "0", "1", "1/3"], ["3", "0", "0", "1", "1/3"], ["4", "0", "−∞", "0", "0"]],
  "result": { "label": "Row 3 of the weight matrix", "value": "[1/3, 1/3, 1/3, 0]" },
  "explanation": "With all scores equal, masked softmax reproduces the uniform causal average."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-minus-infinity",
  "level": "college",
  "purpose": "check",
  "misconception": "mask-by-zero-scores",
  "question": "Why are future scores set to −∞ rather than 0 before the softmax?",
  "options": [
    { "text": "Only e^(−∞) = 0 gives a future position exactly zero weight", "correct": true, "feedback": "Right. A score of 0 would still get weight e^0 = 1 before normalising." },
    { "text": "0 would make the softmax undefined", "correct": false, "feedback": "No, softmax is defined for 0; it just would not remove the position." },
    { "text": "It makes the computation faster", "correct": false, "feedback": "No, it is about correctness, not speed." }
  ],
  "explanation": "Masking must happen on the scores, before normalisation."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "matmul-trick",
  "level": "expert",
  "purpose": "transfer",
  "question": "Why do decoder-only models compute the loss for all T positions of a sequence in one forward pass, and what guarantees that this is equivalent to T separate predictions?",
  "rubric": ["Teacher forcing: the true prefix is the input", "The causal mask makes output t depend only on tokens ≤ t", "Hence all T conditionals p(x_t | x_<t) are computed in parallel", "Efficiency: one pass instead of T"],
  "sample_answer": "Training uses the true text as input (teacher forcing). The causal mask ensures that the representation at position t depends only on tokens up to t, so the logits at each position are exactly the conditional p(x_t+1 | x_≤t). All T of them come out of one parallel pass instead of T sequential ones.",
  "explanation": "The triangular mask is what makes next-token training parallel."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=2520s): the "mathematical trick" of self-attention: averaging the past with a triangular matrix and masked softmax (video, 0:42–0:58; college).

# Sources

Grounding: "the mathematical trick in self-attention" chapter of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
