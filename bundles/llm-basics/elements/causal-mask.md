---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/causal-mask
title: "Looking back: the causal mask"
description: Each position may gather information from itself and earlier positions only; a lower-triangular weight matrix does this in one matrix multiplication.
lang: en
levels: [highschool, college, expert]
objectives:
  - Explain why a position may only use earlier positions, never later ones.
  - Describe how a lower-triangular weight matrix gathers the past in one step.
tags: [llm, attention, causal-mask, matrix-multiplication]
requires:
  - ptf:el/llm-basics/training-examples
  - ptf:el/llm-basics/bigram-model
leads_to:
  - ptf:el/llm-basics/self-attention
duration_min: { highschool: 15, college: 20, expert: 10 }
simulators:
  - ref: ptf:sim/causal-mask@^1.1.0
    station: average-past
    levels: [highschool, college, expert]
    role: explore
    note: Start here; the guess question makes the "no future" rule tangible.
    use_when: the learner should feel the "no future" rule with a simple average
  - ref: ptf:sim/causal-mask@^1.1.0
    station: triangle
    levels: [highschool, college, expert]
    role: explore
    note: Let the learner open a future cell and see the leak before explaining why the mask exists.
    use_when: the learner should see what leaks when the mask is broken
  - ref: ptf:sim/causal-mask@^1.1.0
    station: softmax-mask
    levels: [highschool, college, expert]
    role: practice
    use_when: the learner should see that masked softmax over equal scores gives the same triangle, the bridge to self-attention
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: averaging
    levels: [college, expert]
    note: The three versions of the average, and data-dependent weights at the end.
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T13:30:00Z }
status: draft
version: 0.4.0
license: CC-BY-SA-4.0
---

# Introduction

- When the model learns to predict the next token, the answer is right there in the text.
- The causal mask stops it from peeking.
- Afterwards the learner can explain the mask and read a lower-triangular weight table.

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

<!-- ptf:text v2 -->

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

There is a second way to fill the same triangle, and the next step needs it.
Give every allowed cell a score of 0 and every forbidden cell "minus
infinity", then run softmax on each row. Equal scores give equal shares, and
minus infinity gives exactly 0 %, so you get the same averages. The point:
later the scores will not all be 0, and then a position can take more from
the earlier characters that matter to it, while the future still stays at 0 %.

# Level: college

<!-- ptf:text v2 -->

Compute first: x = (3, 1, 4, 1, 5, 9, 2, 6). What is the causal average at
position 5, and which entries must it ignore? (14 / 5 = 2.8; positions 6 to 8.)

A position must not read later tokens: during training they are its own
target and the targets of the following positions, and at generation time
they do not exist yet. Without the mask the training loss collapses towards
0 and the model is useless for generation.

Let x ∈ ℝ^(T×C). The causal average is out_t = (1/t) Σ_{s≤t} x_s. Build
W = row-normalised tril(ones(T, T)); then out = W x computes every out_t in
one matrix multiplication, and with a batch dimension (B, T, T) @ (B, T, C)
runs per sequence. Equivalently, start from a score matrix S = 0, set
S_ts = −∞ for s > t, and take softmax over each row (setting the score to 0
would not remove a position, since e^0 = 1). The second form matters because
S does not have to stay zero: if S is computed from the data, each position
can weight its past unevenly while the mask still guarantees causality. That
is exactly a self-attention head without the query/key/value parametrisation.

# Level: expert

<!-- ptf:text v2 -->

Predict: what happens to the training loss and to sampled text if the mask
is removed from a decoder? (The loss collapses because positions read their
targets; generation degrades because the future is not available at inference.)

Position t may aggregate only x_≤t, so the factorisation
p(x) = Π_t p(x_t | x_<t) holds and all T next-token losses can be computed in
one parallel pass (teacher forcing). The simplest aggregator is the uniform
causal average W x with W the row-normalised lower-triangular matrix; the
same W arises as softmax(S + M) with S = 0 and M_ts = −∞ for s > t, and any
data-dependent S turns it into attention while M keeps causality.

The mask defines the attention graph: encoders drop it; prefix-LM variants
allow full attention within a prompt and causal attention afterwards;
document packing adds block-diagonal masks. Implementations fuse the mask
into the attention kernel (FlashAttention's causal flag) instead of
materialising a T × T matrix, and masked logits are set to a large negative
number or −∞ before the softmax, never multiplied by zero after it, which
would break normalisation.

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

```ptf-question
{
  "kind": "multiple_choice",
  "id": "triangle-check",
  "level": "highschool",
  "purpose": "check",
  "misconception": "attention-sees-future",
  "question": "In the table of weights for 4 positions, which cells of row 2 can be filled?",
  "options": [
    {
      "text": "Columns 1 and 2: itself and the position before it",
      "correct": true,
      "feedback": "Right. Each takes 50 %; columns 3 and 4 lie in the future."
    },
    {
      "text": "All four columns, 25 % each",
      "correct": false,
      "feedback": "No. Columns 3 and 4 are later characters, the answers it is supposed to guess."
    },
    {
      "text": "Only column 2, its own position",
      "correct": false,
      "feedback": "It may also use the past: column 1 is allowed."
    }
  ],
  "explanation": "Row t has t filled cells, each 1/t. Everything above the diagonal stays 0, which gives the triangle."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "mask-placement",
  "level": "expert",
  "purpose": "check",
  "misconception": "mask-by-zero-scores",
  "question": "Why must the causal mask be applied to the logits before the softmax, and not by zeroing weights after it?",
  "rubric": [
    "Zeroing after softmax leaves rows that no longer sum to 1",
    "Renormalising after zeroing would work but costs an extra pass; −∞ before softmax gives exact zeros and correct normalisation in one step",
    "A score of 0 is not a removal: e^0 = 1",
    "The masked positions must get exactly zero gradient and weight to keep causality"
  ],
  "sample_answer": "Softmax normalises over all entries, so zeroing afterwards breaks the row sums (or needs renormalising). Adding −∞ before the softmax gives e^(−∞) = 0, so future positions get exactly zero weight and the rest are normalised correctly; a 0 score would still give weight.",
  "explanation": "masked_fill(tril == 0, −inf) followed by softmax is the standard, numerically clean form."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=2520s): the "mathematical trick" of self-attention: averaging the past with a triangular matrix and masked softmax (video, 0:42–0:58; college).

# Sources

Grounding: "the mathematical trick in self-attention" chapter of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
