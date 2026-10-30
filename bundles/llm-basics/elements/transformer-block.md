---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/transformer-block
title: "The transformer block: multi-head attention and feed-forward"
description: A block first lets tokens exchange information through several attention heads in parallel, then lets each token process what it gathered on its own in a feed-forward layer.
lang: en
levels: [highschool, college, expert]
objectives:
  - "Describe the two halves of a block: communication (attention heads) and computation (feed-forward)."
  - Explain why several heads run in parallel and why blocks are stacked.
tags: [llm, transformer, multi-head-attention, feed-forward, mlp]
about:
  - wikidata: Q85810444
    label: transformer
  - wikidata: Q2991667
    label: multilayer perceptron
requires:
  - ptf:el/llm-basics/self-attention
leads_to:
  - ptf:el/llm-basics/residual-stream
duration_min: { highschool: 15, college: 25, expert: 15 }
simulators:
  - ref: ptf:sim/transformer-block@^1.0.0
    station: heads
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner wants to see different heads ask different questions
  - ref: ptf:sim/transformer-block@^1.0.0
    station: feed-forward
    levels: [highschool, college, expert]
    role: explore
    note: The key observation is that changing one token's input changes only that token's output.
    use_when: the learner should see that the feed-forward part works on each token alone
  - ref: ptf:sim/transformer-block@^1.0.0
    station: stack
    levels: [highschool, college, expert]
    role: practice
    use_when: the learner wants to see what stacking blocks changes
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: transformer-block
    levels: [college, expert]
    note: Compare --n-head 1, 4 and 8; then --n-layer 4 without residuals.
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

- Attention alone lets tokens talk; a block adds time for each token to think about what it heard.
- Stacking such blocks is the transformer.
- Afterwards the learner can sketch a block and say what each half does.

# Core

A transformer block has two halves. First comes communication: several
attention heads run in parallel, each asking its own kind of question, and
their results are joined. Then comes computation: a small feed-forward
network processes every token separately. Stacking many such blocks gives
the transformer.

# Key facts

- Multi-head attention: h heads of size d_model / h run in parallel; their outputs are concatenated (back to d_model) and passed through a linear projection. Example: 4 heads × 8 = 32; 6 heads × 64 = 384.
- Different heads learn different patterns, e.g. attend to the previous token, to the subject of the sentence, or to the last verb.
- Feed-forward (MLP) per token: FF(x) = ReLU(x W1 + b1) W2 + b2 (GPT-2 and later use GELU), inner width 4 × d_model.
- The feed-forward layer never mixes positions: the same weights are applied to every token independently.
- Roughly two thirds of a transformer's block parameters are in the feed-forward layers (8 d² of the 12 d² per block).
- Measured on a small character model trained on about 1 million characters of Shakespeare (validation loss, lower is better): bigram 2.5; one head 2.4; 4 heads of 8: 2.28; + feed-forward 2.24; 3 blocks with residual connections and 4× feed-forward 2.08; + layer norm 2.06; scaled to 6 blocks, 6 heads, width 384, dropout 0.2: 1.48.

# Level: highschool

<!-- ptf:text v2 -->

Think of a group project. First everybody talks: each person asks around
and collects what they need from the others. Then everybody goes back to
their desk and thinks it through alone. A transformer block works the same
way.

The talking part is attention, and it happens several times in parallel. One
head might ask "what was the word just before me?", another "who is doing
something here?", a third "which verb belongs to me?". Each head collects
its own answer, and the answers are put side by side.

The thinking part is the feed-forward layer: a small neural network that
every word runs through on its own, with the same weights for all words.
Here no information moves between words; each word just works with what it
collected. Then the next block starts with another round of talking and
thinking.

Why several heads instead of one? One head can only make one weighted mix,
so it would have to blur "the word before me" and "who is doing something"
together. Several heads ask several questions at once. And why stack blocks?
Each round builds on what the earlier rounds found: first simple things such
as neighbouring letters, later combinations such as words and who does what.
Each addition lowers the loss a bit in a small Shakespeare model: from about
2.4 with one head to about 2.24 with several heads and a feed-forward layer.

# Level: college

<!-- ptf:text v2 -->

Predict first: with d_model = 384 and 6 heads, what is the head size, and is
6 heads × 64 more expensive than one head of 384? (64; about the same cost.)

A block has two halves. Communication: multi-head attention,
MultiHead(X) = concat(head_1, …, head_h) W_O with head_i = Attention(X W_Q^i,
X W_K^i, X W_V^i) and head size d_model / h. Several smaller heads beat one
large head because each softmax can select different tokens; one head has to
average everything it wants into a single distribution. Computation: the
position-wise feed-forward network FF(x) = act(x W1 + b1) W2 + b2 with
W1 ∈ ℝ^(d×4d), applied to each position independently (equivalent to a
1 × 1 convolution over the sequence), so no information moves between tokens
there. A block is then x ← x + MHA(LN(x)); x ← x + FF(LN(x)) (residuals and
layer norm are the next element).

Blocks are stacked because each one composes the features of the previous
one: early layers find local patterns, later layers combine them. On a
character-level Shakespeare model one head gives a validation loss of about
2.4, multi-head 2.28, plus feed-forward 2.24; deeper stacks then need the
residual stream to train.

# Level: expert

<!-- ptf:text v2 -->

Before reading: why can a single head not implement "copy the token after
the previous occurrence of the current token", while two heads in two
stacked blocks can? (An induction head needs a previous-token head first.)

A block alternates communication and computation: multi-head attention,
concat(head_1 … head_h) W_O with head size d_model / h, moves information
between positions, each head with its own softmax and therefore its own
selection; the position-wise MLP (typically 4d wide) transforms features at
each position independently. Stacking composes them, so later heads can
attend based on features earlier layers wrote, as in induction circuits.

Mechanistically, attention reads and writes residual-stream subspaces and
the MLPs behave like key-value memories that store much of the model's
factual knowledge. Heads are partially redundant and can often be pruned
after training. Modern variants use SwiGLU feed-forwards (with width about
8/3 d to keep parameters constant), grouped-query attention, parallel
attention and MLP branches (GPT-J, PaLM), and mixture-of-experts
feed-forwards that route each token to a few of many expert MLPs, decoupling
parameter count from compute per token.

# Misconceptions

- **one-head-is-enough**: One big attention head can do everything several heads do → a single softmax must choose one mix of tokens; several heads can attend to different tokens for different purposes.
- **feed-forward-mixes-tokens**: The feed-forward layer combines information from different words → it is applied to each position separately; only attention moves information between positions.
- **more-heads-more-width**: Each additional head adds a full-width set of parameters → heads split the model width (d_model / h each).

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-part-communicates",
  "level": "highschool",
  "purpose": "check",
  "misconception": "feed-forward-mixes-tokens",
  "question": "Which part of a transformer block lets words exchange information?",
  "options": [
    { "text": "The attention heads", "correct": true, "feedback": "Right. Only attention connects positions." },
    { "text": "The feed-forward layer", "correct": false, "feedback": "No. It processes each word on its own." },
    { "text": "Both equally", "correct": false, "feedback": "No. Communication happens only in attention; feed-forward is per word." }
  ],
  "explanation": "Communication (attention), then computation (feed-forward)."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "loss-ladder",
  "level": "highschool",
  "purpose": "transfer",
  "instruction": "A small model learns to write Shakespeare-like text. Order these versions from highest (worst) to lowest (best) validation loss.",
  "items": ["Bigram model (only the last character)", "One attention head", "Four attention heads", "Four heads plus feed-forward", "Several blocks with residual connections", "Scaled up: 6 blocks, 6 heads, width 384"],
  "explanation": "Measured losses: 2.5, 2.4, 2.28, 2.24, 2.08, 1.48. Every component helps; scaling up helps most once the model can be trained deep."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "head-size",
  "level": "college",
  "purpose": "check",
  "misconception": "more-heads-more-width",
  "question": "A model has width d_model = 384 and 6 heads. What is the head size?",
  "answer": 64,
  "tolerance": 0,
  "unit": "dimensions",
  "explanation": "384 / 6 = 64. Concatenating six heads of 64 gives 384 again."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "ff-params",
  "level": "college",
  "purpose": "check",
  "question": "A block has width d and a feed-forward inner width of 4d. Roughly what share of the block's weights is in the feed-forward layer?",
  "options": [
    { "text": "About two thirds", "correct": true, "feedback": "Right: attention has 4d² (Q, K, V, output), feed-forward 8d² (d×4d and 4d×d)." },
    { "text": "About one tenth", "correct": false, "feedback": "No, the feed-forward layer is the larger part." },
    { "text": "About half", "correct": false, "feedback": "Close, but 8d² out of 12d² is two thirds." }
  ],
  "explanation": "This is where the 12 · layers · d² rule of thumb for parameter count comes from."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "why-multi-head",
  "level": "expert",
  "purpose": "transfer",
  "question": "Why does multi-head attention with h heads of size d/h usually beat a single head of size d at the same cost?",
  "rubric": ["One softmax yields one convex combination of values per position", "Different heads can select different tokens simultaneously", "Each head has its own subspace for queries, keys, values", "Cost is about the same because the total width is unchanged"],
  "sample_answer": "A single head produces one attention distribution per position, so it must blend everything it needs into one weighted average. With h heads, each has its own projections and softmax, so one head can track the previous token while another tracks the subject. Total width and compute stay about the same because each head is d/h wide.",
  "explanation": "Multiple heads trade width per head for multiple independent selection patterns."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-stack",
  "level": "expert",
  "purpose": "check",
  "misconception": "feed-forward-mixes-tokens",
  "question": "An induction head (\"after A … B … A, predict B\") needs at least two attention layers. Why?",
  "options": [
    {
      "text": "A first head must write \"which token came before me\" into each position, so a later head can match on it",
      "correct": true,
      "feedback": "Right. Composition across layers is what stacking buys; the feed-forward layer cannot move that information between positions."
    },
    {
      "text": "The feed-forward layer of the first block copies the previous token over",
      "correct": false,
      "feedback": "No. The feed-forward network works on each position alone; only attention moves information between positions."
    },
    {
      "text": "A single head could do it, two layers only add capacity",
      "correct": false,
      "feedback": "No. One head can only match on what is already at each position, and before the first layer that is just the token and its position."
    }
  ],
  "explanation": "Previous-token head in layer 1, then a head in layer 2 whose query matches keys that now contain \"my predecessor was A\"."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=4860s): multi-head attention, the feed-forward layer and the block structure, with the loss after each step (video, 1:21–1:27; college).

# Sources

Grounding: multi-head attention, feed-forward and block chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
