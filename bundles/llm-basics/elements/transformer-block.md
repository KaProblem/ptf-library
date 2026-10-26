---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/transformer-block
title: "The transformer block: multi-head attention and feed-forward"
description: A block first lets tokens exchange information through several attention heads in parallel, then lets each token process what it gathered on its own in a feed-forward layer.
lang: en
levels: [highschool, college, expert]
tags: [llm, transformer, multi-head-attention, feed-forward, mlp]
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
  - ref: ptf:sim/transformer-block@^1.0.0
    station: feed-forward
    levels: [highschool, college]
    role: explore
    note: The key observation is that changing one token's input changes only that token's output.
  - ref: ptf:sim/transformer-block@^1.0.0
    station: stack
    levels: [highschool, college, expert]
    role: practice
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
version: 0.2.0
license: CC-BY-SA-4.0
---

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

<!-- ptf:text v1 -->

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

# Level: college

<!-- ptf:text v1 -->

MultiHead(X) = concat(head_1, …, head_h) W_O, with head_i = Attention(X W_Q^i,
X W_K^i, X W_V^i) and head size d_model / h, so the cost is about that of one
full-width head. Several smaller heads beat one large head because each
softmax can select different tokens; one head has to average everything it
wants into a single distribution. The position-wise feed-forward network
FF(x) = act(x W1 + b1) W2 + b2 with W1 ∈ ℝ^(d×4d) is applied to each position
independently, so it is equivalent to a 1 × 1 convolution over the sequence.
A block is then x ← x + MHA(LN(x)); x ← x + FF(LN(x)) (residuals and layer
norm are the next element).

# Level: expert

<!-- ptf:text v1 -->

Mechanistically, attention moves information between residual-stream
positions and the MLP reads and writes features at each position; the MLPs
behave like key-value memories that store much of the model's factual
knowledge. Heads are partially redundant and can often be pruned after
training. Modern variants use SwiGLU feed-forwards (with width about 8/3 d
to keep parameters constant), grouped-query attention, parallel attention
and MLP branches (GPT-J, PaLM), and mixture-of-experts feed-forwards that
route each token to a few of many expert MLPs, decoupling parameter count
from compute per token.

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

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=4860s): multi-head attention, the feed-forward layer and the block structure, with the loss after each step (video, 1:21–1:27; college).

# Sources

Grounding: multi-head attention, feed-forward and block chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
