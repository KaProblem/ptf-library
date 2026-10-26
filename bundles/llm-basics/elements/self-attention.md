---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/self-attention
title: Self-attention
description: Each token sends a query, offers a key and hands over a value; query-key dot products decide how much of each earlier token's value it collects.
lang: en
levels: [child, highschool, college, expert]
tags: [llm, attention, transformer, query, key, value]
requires:
  - ptf:el/llm-basics/causal-mask
leads_to:
  - ptf:el/llm-basics/transformer-block
duration_min: { child: 10, highschool: 20, college: 30, expert: 20 }
simulators:
  - ref: ptf:sim/attention-lab@^1.0.0
    station: who-listens
    levels: [highschool, college]
    role: explore
    note: Guess first. Most learners pick the nearest noun; that is the hook for "attention is learned, not distance".
  - ref: ptf:sim/attention-lab@^1.0.0
    station: query-key
    levels: [highschool, college, expert]
    role: practice
  - ref: ptf:sim/attention-lab@^1.0.0
    station: value
    levels: [college, expert]
    role: explore
  - ref: ptf:sim/attention-lab@^1.0.0
    station: positions
    levels: [college, expert]
    role: explore
  - ref: ptf:sim/attention-lab@^1.0.0
    station: scaling
    levels: [expert]
    role: explore
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: self-attention
    levels: [college, expert]
    note: Try --no-mask and explain why the loss drops while the text gets worse.
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
  - id: vaswani
    resource: https://arxiv.org/abs/1706.03762
    title: "Vaswani et al.: Attention Is All You Need"
generated: { by: claude/opus, at: 2026-10-26T13:30:00Z }
status: draft
version: 0.2.0
license: CC-BY-SA-4.0
---

# Core

Every token produces three vectors from its own content: a query ("what am I
looking for?"), a key ("what do I offer?") and a value ("what I pass on if
chosen"). A token's query is compared with the keys of itself and all
earlier tokens; the better they match, the more of that token's value it
collects. The weights are learned, so the model decides from data which
tokens matter to which.

# Key facts

- Per head: q = x W_Q, k = x W_K, v = x W_V, with x the token's vector (token embedding + position embedding) and head size d (e.g. 16).
- Scores = q · k for every pair; shape (T × T) per sequence. Then causal mask (−∞ for the future), softmax per row, output = weights · V.
- Full formula: Attention(Q, K, V) = softmax(Q Kᵀ / √d + mask) V.
- Scaling by 1/√d: for random unit-variance q and k the dot product has variance d; dividing by √d brings it back to 1, so the softmax stays soft at initialisation instead of becoming one-hot.
- Attention is a communication mechanism on a directed graph: in a decoder, token t receives from tokens 1…t.
- Attention acts on a set: it has no built-in notion of order. Position embeddings added to x give the tokens their positions.
- Batch elements never communicate; attention runs inside each sequence.
- Self-attention: Q, K, V all come from the same tokens. Cross-attention: Q from one sequence, K and V from another (e.g. the encoder in translation).
- Measured effect in a small character model on Shakespeare: one attention head lowers the validation loss from about 2.5 (bigram) to about 2.4.

# Level: child

<!-- ptf:text v1 -->

Read this: "The cat drinks milk because she is thirsty." Who is "she"? You
knew at once: the cat, not the milk. To understand "she", you looked back
and picked the word that helps most.

A language model has to do the same thing, but nobody tells it which word
to look at. So every word gets to ask a little question, like "Who is the
one doing something here?", and every earlier word holds up a little sign
saying what it is, like "I am an animal" or "I am a drink". When a question
and a sign fit together well, the word listens closely to that word and
takes over some of its information. "She" listens mostly to "cat", and now
knows it is about an animal.

# Level: highschool

<!-- ptf:text v1 -->

Before reading on, guess: in "The cat drinks milk because she is thirsty",
which earlier word should "she" pay most attention to? Most people say
"cat", and a trained model does the same, even though "milk" is closer.

Here is how the model does it. Each word turns into three short lists of
numbers (vectors). The query says what the word is looking for, the key says
what it has to offer, and the value is what it hands over. For "she", the
model multiplies its query with the key of every earlier word and adds up
the products (a dot product). A big result means a good match. Softmax turns
these scores into percentages, for example 62 % "cat", 14 % "milk", and a
little for the rest. Finally "she" collects a weighted mix of the values:
62 % of what "cat" hands over, 14 % of what "milk" hands over, and so on.

Nobody programs these vectors. They come from learned numbers, and training
adjusts them until the predictions of the next word get better.

# Level: college

<!-- ptf:text v1 -->

For a sequence X ∈ ℝ^(T×C), a head computes Q = X W_Q, K = X W_K,
V = X W_V ∈ ℝ^(T×d). The affinity matrix Q Kᵀ (T × T) replaces the zero
scores of the causal average; after scaling by 1/√d, masking s > t with −∞
and a row-wise softmax, the output is A V. In PyTorch:
`wei = q @ k.transpose(-2, -1) * d**-0.5`, mask, softmax, `out = wei @ v`.

Three properties are worth stating. First, attention has no notion of
position: permuting the visible tokens permutes nothing in the aggregate, so
position embeddings are added to the token embeddings. Second, the sequences
in a batch are independent pools; batched matmuls just run them in parallel.
Third, removing the mask gives an encoder head (every token attends to every
token), and taking K and V from another sequence gives cross-attention.

# Level: expert

<!-- ptf:text v1 -->

Self-attention is a content-addressed soft lookup whose cost is O(T² d) per
head. The 1/√d factor keeps the logit variance near 1 under unit-variance
initialisation; without it the softmax saturates, gradients vanish and heads
collapse to attending to a single token. Variants change each ingredient:
relative and rotary position encodings replace absolute embeddings; multi-
query and grouped-query attention share K and V across heads to shrink the
KV cache; FlashAttention fuses masking and softmax into a tiled kernel to
avoid materialising T × T; sparse, sliding-window and linear attention trade
expressivity for sub-quadratic cost. Interpretability work finds recurring
head types such as previous-token heads and induction heads, which together
implement in-context copying.

# Misconceptions

- **attention-is-nearest**: A word mostly attends to the words right next to it → attention weights depend on learned query-key matches, not on distance.
- **attention-is-programmed**: People write rules telling the model which word relates to which → W_Q, W_K and W_V are learned from data like every other parameter.
- **attention-sees-future**: Attention can look at later words → in a decoder the causal mask blocks them.
- **attention-knows-order**: Attention automatically knows where each token is → it works on a set; order comes only from added position embeddings.
- **batch-elements-interact**: Tokens from different sequences in a batch attend to each other → each sequence is a separate pool.
- **key-equals-value**: The key is what gets passed on → the key only determines the match; the value is what is aggregated.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "who-is-she",
  "level": "child",
  "purpose": "warmup",
  "misconception": "attention-is-nearest",
  "question": "\"The cat drinks milk because she is thirsty.\" Which word should \"she\" listen to most?",
  "options": [
    { "text": "cat", "correct": true, "feedback": "Yes! The cat is thirsty, so \"she\" means the cat." },
    { "text": "milk", "correct": false, "feedback": "Milk is close by, but milk is not thirsty." },
    { "text": "because", "correct": false, "feedback": "\"because\" connects the parts, but it does not tell us who \"she\" is." }
  ],
  "explanation": "The closest word is not always the most important one. Attention lets each word pick the words that help it most."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "qkv-roles",
  "level": "highschool",
  "purpose": "check",
  "misconception": "key-equals-value",
  "text": "The {{1}} says what a token is looking for, the {{2}} says what a token offers, and the {{3}} is what it passes on when it is chosen.",
  "gaps": [
    { "answer": "query", "accepted": ["Query", "q"] },
    { "answer": "key", "accepted": ["Key", "k"] },
    { "answer": "value", "accepted": ["Value", "v"] }
  ],
  "explanation": "Query and key decide how much attention; the value is the content that flows."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "tiny-attention",
  "level": "highschool",
  "purpose": "transfer",
  "title": "One attention step by hand",
  "intro": "The query of the current token is q = (1, 0). Three visible tokens have keys k1 = (2, 0), k2 = (0, 1), k3 = (1, 1).",
  "columns": ["Token", "q · k", "e^(q·k)", "Weight"],
  "rows": [["1", "2", "7.39", "7.39 / 11.11 = 0.665"], ["2", "0", "1.00", "1.00 / 11.11 = 0.090"], ["3", "1", "2.72", "2.72 / 11.11 = 0.245"]],
  "result": { "label": "Most attention goes to", "value": "token 1 (66.5 %)" },
  "explanation": "Dot product, softmax, done. The output is then 0.665·v1 + 0.090·v2 + 0.245·v3."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "dog-bites-man",
  "level": "college",
  "purpose": "check",
  "misconception": "attention-knows-order",
  "question": "Without position embeddings, what does the final token of \"dog bites man .\" receive compared with \"man bites dog .\"?",
  "options": [
    { "text": "Exactly the same vector", "correct": true, "feedback": "Right. The visible set of tokens is identical, and attention is a weighted sum over a set." },
    { "text": "A different vector, because the order differs", "correct": false, "feedback": "Only if position information is added. Attention alone ignores order." },
    { "text": "Nothing, the final token cannot attend", "correct": false, "feedback": "It attends to itself and all earlier tokens." }
  ],
  "explanation": "This is why transformers add a position embedding to every token embedding."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "score-variance",
  "level": "expert",
  "purpose": "check",
  "question": "q and k each have 64 independent entries with mean 0 and variance 1. What is the variance of q · k before scaling?",
  "answer": 64,
  "tolerance": 4,
  "unit": "",
  "explanation": "A sum of 64 independent products, each with variance 1, has variance 64. Dividing by √64 = 8 brings it back to 1."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "self-vs-cross",
  "level": "expert",
  "purpose": "transfer",
  "question": "Explain the difference between self-attention, cross-attention and an encoder (unmasked) head, and give one use for each.",
  "rubric": ["Self-attention: Q, K, V from the same sequence", "Cross-attention: Q from one sequence, K and V from another", "Masking is independent of self/cross: decoder masks, encoder does not", "Uses: GPT decoder, translation decoder attending to encoder, classification/BERT encoder"],
  "sample_answer": "In self-attention, queries, keys and values all come from the same tokens (GPT). In cross-attention the queries come from one sequence and keys and values from another, e.g. a translation decoder reading the encoded source sentence. Whether a head is masked is a separate choice: decoder heads use the causal mask to allow generation, encoder heads let every token see every token, which suits classification.",
  "explanation": "Attention is a general mechanism; the source of K, V and the mask define its role."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=3720s): a single self-attention head built from queries, keys and values, with the notes on positions, batches, encoders and scaling (video, 1:02–1:20; college, expert).
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762): the 2017 paper that introduced the transformer (paper; expert).

# Sources

Grounding: self-attention chapter of [^karpathy-gpt] and the original transformer paper [^vaswani].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
[^vaswani]: Vaswani et al., "Attention Is All You Need", 2017.
