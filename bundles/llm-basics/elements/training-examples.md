---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/training-examples
title: Training examples, context and batches
description: One chunk of text holds many training examples at once; the context length limits how far back the model can look, and batches process independent chunks in parallel.
lang: en
levels: [highschool, college, expert]
objectives:
  - Explain how one chunk of text contains many training examples at once.
  - Describe what the context length limits and why batches do not influence each other.
tags: [llm, training, context-window, block-size, batch]
about:
  - wikidata: Q125619872
    label: context window
  - wikidata: Q7617819
    label: stochastic gradient descent
requires:
  - ptf:el/llm-basics/tokenizer
leads_to:
  - ptf:el/llm-basics/softmax
duration_min: { highschool: 10, college: 15, expert: 10 }
simulators:
  - ref: ptf:sim/next-char-basics@^1.0.0
    station: context-window
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner should see the examples in a chunk rather than count them in their head
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: batches
    levels: [college, expert]
    note: Change --block-size and count the examples per chunk.
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T13:30:00Z }
status: draft
version: 0.3.1
license: CC-BY-SA-4.0
---

# Introduction

- A model learns from pairs of "text so far" and "next token".
- This step shows how a single piece of text yields many such pairs, and why there is a limit on how far back the model looks.
- Afterwards the learner can count the examples in a chunk and explain the context window.

# Core

A model learns from pairs "text so far → next token". A chunk of T + 1
tokens contains T such pairs at once: after the first token, after the first
two, and so on up to T tokens of context. T is the context length (block
size): the model never looks further back than that. Many chunks are
processed side by side in a batch, but they never influence each other.

# Key facts

- The text is split into a training part (about 90 %) and a held-out validation part (about 10 %).
- A chunk of block_size + 1 tokens gives block_size examples: inputs x = tokens 0…T−1, targets y = tokens 1…T. Example t has context x[0..t] and target y[t].
- Training on all context lengths from 1 to T means the model can later start generating from a single token.
- At generation time the context is cropped to the last T tokens; anything earlier is invisible to the model.
- A batch has shape (B, T): B random chunks of T tokens. Batching exists for speed on GPUs; the chunks are completely independent.
- Example sizes: block_size 8 and batch 4 for a toy model; block_size 256 and batch 64 for a small Shakespeare model; GPT-3 used a context of 2048 tokens.

# Level: highschool

<!-- ptf:text v1 -->

Take the word "hello" and play the game "guess what comes next". After "h"
the answer is "e". After "he" it is "l". After "hel" it is "l" again, after
"hell" it is "o". One word of five letters gave you four practice questions,
each with a longer piece of context.

A language model is trained exactly like this, just with huge amounts of
text. It cuts the text into chunks of a fixed length, for example 8
characters, and turns each chunk into 8 practice questions. This fixed
length is its context window: when the model writes, it only ever looks at
the last 8 (or 256, or 2,048) tokens, never further back.

To be fast, the computer works on many chunks at the same time, a batch.
Think of a class where 64 pupils each solve their own worksheet: they work
at the same time, but nobody copies from anybody else.

# Level: college

<!-- ptf:text v1 -->

Sample B random offsets into the token stream, take block_size + 1 tokens
from each, and stack them into x (B × T) and y (B × T), where y is x shifted
by one. The model outputs logits of shape (B, T, V) and the loss is the mean
cross-entropy over all B·T positions, so each batch carries B·T supervised
predictions. Because the targets for every prefix length are present, one
forward pass trains all context lengths 1…T together; the causal mask (later
in this path) is what keeps position t from seeing tokens after t. The held-out
validation split is evaluated the same way, averaged over several batches to
reduce noise.

# Level: expert

<!-- ptf:text v1 -->

Context length is a hard architectural limit for learned absolute position
embeddings (positions beyond block_size have no embedding) and a cost limit
for attention, which is O(T²) in time and memory per layer. Longer contexts
use relative or rotary position encodings, sparse or linear attention
variants, and KV caching at inference. Random-offset sampling means epochs
are only approximate; production pipelines pack documents with separator
tokens and mask attention across document boundaries.

# Misconceptions

- **one-example-per-chunk**: A chunk of text is one training example → a chunk of T + 1 tokens contains T examples, one for each prefix length.
- **unlimited-memory**: The model remembers everything said earlier in a long conversation → it only sees the last block_size tokens; everything before is gone unless it is repeated.
- **batch-elements-interact**: Chunks in the same batch learn from each other → they are processed in parallel but completely independently.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "examples-per-chunk",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "one-example-per-chunk",
  "question": "A chunk of 9 characters is taken from the training text. How many 'guess the next character' examples does it contain?",
  "answer": 8,
  "tolerance": 0,
  "unit": "examples",
  "explanation": "Context of 1, 2, … 8 characters, each with the following character as the target: 8 examples."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "long-chat",
  "level": "highschool",
  "purpose": "transfer",
  "misconception": "unlimited-memory",
  "question": "A model has a context window of 256 characters. In a long chat you mentioned your name 2,000 characters ago. What happens when it writes its next reply?",
  "options": [
    { "text": "It cannot see your name any more", "correct": true, "feedback": "Right. Only the last 256 characters go into the model." },
    { "text": "It remembers, because it learned your name", "correct": false, "feedback": "No. The model does not learn while you chat; it only sees what is in the window." },
    { "text": "It sees a summary of everything earlier", "correct": false, "feedback": "Not by itself. Some apps add summaries, but the model only sees what is put into the window." }
  ],
  "explanation": "The context window is a hard limit: tokens outside it do not exist for the model."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "batch-independence",
  "level": "college",
  "purpose": "check",
  "misconception": "batch-elements-interact",
  "question": "A batch has shape (4, 8). How many independent sequences are processed, and can a token in sequence 1 attend to sequence 3?",
  "options": [
    { "text": "4 sequences; no", "correct": true, "feedback": "Right: 4 sequences of 8 tokens, each a separate pool." },
    { "text": "32 tokens in one sequence; yes", "correct": false, "feedback": "No. The batch dimension only stacks independent examples." },
    { "text": "8 sequences; only within the same column", "correct": false, "feedback": "No. Shape (B, T) = (4, 8) means 4 sequences of length 8." }
  ],
  "explanation": "Batched matrix multiplications run the same computation for each of the B sequences separately."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "x-and-y",
  "level": "college",
  "purpose": "check",
  "text": "For a chunk [18, 47, 56, 57, 58], the inputs are x = [18, 47, 56, 57] and the targets are y = {{1}}. The example at position 2 has context {{2}} and target {{3}}.",
  "gaps": [
    { "answer": "[47, 56, 57, 58]", "accepted": ["47, 56, 57, 58"] },
    { "answer": "[18, 47, 56]", "accepted": ["18, 47, 56"] },
    { "answer": "57" }
  ],
  "explanation": "y is x shifted by one. Position t (counting from 0) sees x[0..t] and must predict y[t]."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=780s): splitting train and validation data, block size and batches, shown in code (video, 0:13–0:22; college).
- [nanoGPT](https://github.com/karpathy/nanoGPT): a compact GPT implementation whose data loader works exactly like this (code; college, expert).

# Sources

Grounding: data loading and batching chapter of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
