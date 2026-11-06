---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/inference-performance
title: Running an LLM - prefill, decode and the KV cache
description: Generating text has two phases with different bottlenecks - reading the prompt all at once (prefill) and writing one token at a time (decode). The KV cache avoids recomputation but costs memory, which is why long contexts and many users are expensive.
lang: en
levels: [highschool, college]
objectives:
  - id: two-phases
    text: Explain the prefill and decode phases of generation and connect them to time to first token and time per output token.
  - id: kv-cache
    text: Explain what the KV cache stores, why it speeds up decoding, and compute its memory size for a model.
  - id: long-context-cost
    text: Explain why long prompts and long outputs cost time and memory, and how batching trades latency against throughput.
tags: [llm, inference, kv-cache, latency, throughput, context-window]
about:
  - wikidata: Q115305900
    label: large language model
requires:
  - ptf:el/llm-in-practice/decoding-strategies
  - ptf:el/llm-basics/self-attention
duration_min: { highschool: 15, college: 25 }
sources:
  - id: hf-llm-course-1-8
    resource: https://huggingface.co/learn/llm-course/chapter1/8
    title: "Hugging Face LLM Course, chapter 1, section 8: Inference with LLMs (prefill, decode, KV cache); chapter 2, section 8: Optimized inference deployment"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-06T00:20:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- When you paste a long document into a chat assistant, there is a pause before the first word appears, then the answer streams out word by word at a steady pace. Those are two different machines at work.
- This step explains both phases, the memory trick that makes the second one fast (the KV cache), and the price of long contexts.
- Afterwards the learner can explain why the first token takes longest, estimate how much memory a conversation occupies on the server, and why providers charge for input and output tokens separately.

# Core

Generation runs in two phases. In prefill the model processes all prompt
tokens in parallel, which keeps the hardware busy computing and determines
the time to the first token. In decode it produces one token per step,
each step depending on the previous one. To avoid recomputing the whole
past at every step, each layer stores the keys and values of all earlier
tokens: the KV cache. Decoding then only computes the new token, but must
read all model weights and the growing cache from memory for every token,
so it is limited by memory bandwidth. The cache grows linearly with
context length and number of parallel requests, which is why long
contexts and many users cost memory; serving many requests in one batch
raises total throughput at some cost in per-request speed.

# Key facts

- **Prefill**: tokenize and run all n prompt tokens through the model at once; attention over the prompt costs about n² operations per layer. Dominates **time to first token (TTFT)**.
- **Decode**: one forward pass per new token, which attends to all earlier tokens. Speed is measured as **time per output token (TPOT)** or tokens per second. Total latency ≈ TTFT + (output tokens − 1) · TPOT.
- **KV cache**: for every layer and every past token, the key and value vectors. Because a decoder is causal, these never change once computed, so they can be stored and reused.
- **KV cache size** = 2 (K and V) · layers · KV heads · head dimension · bytes per value · tokens · sequences. A 7-billion-parameter model with 32 layers, 32 heads of dimension 128 in 16-bit (2 bytes): 2 · 32 · 32 · 128 · 2 = 524,288 bytes = 0.5 MiB per token, 2 GiB for 4,096 tokens.
- **Grouped-query attention** shares keys and values across query heads: with 8 instead of 32 KV heads the cache shrinks four-fold (128 KiB per token for the same layers and head size).
- **Decode is memory-bound**: each step reads all weights. 7 billion parameters in 16 bits are 14 GB; at 1 TB/s memory bandwidth that is at least 14 ms per step, so at most about 70 tokens per second for a single sequence. Batching many sequences reuses each weight read, raising throughput.
- **Prefill is compute-bound**: many tokens per weight read; a long prompt mainly delays the first token.
- Longer contexts cost twice: quadratic attention in prefill and a linearly growing KV cache in memory (and per decode step). This is one reason input and output tokens are priced separately and why context windows have limits.
- Common serving techniques: continuous batching (new requests join a running batch), paged KV cache memory, quantised weights (8 or 4 bits), prompt caching (reuse the KV cache of a shared prefix), speculative decoding (a small model drafts tokens, the large one checks several at once).

# Level: highschool

<!-- ptf:text v1 -->

Imagine you hand a long letter to a friend and ask for a reply. First
your friend reads the whole letter; that takes a moment, and nothing is
written yet. Then they write the reply word by word, and each word
depends on what they wrote before. A language model works in the same
two phases.

**Phase 1, reading (prefill).** The model takes in all the tokens of
your prompt at once. Graphics cards are great at doing lots of work in
parallel, so this goes fast per token, but a very long prompt still
means a noticeable pause before the first word. That pause is called the
**time to first token**.

**Phase 2, writing (decode).** Now the model can only produce one token
at a time, because each new token needs the one before it. If the model
reread the whole conversation for every single new token, it would be
painfully slow. So it keeps notes: for every token it has already
processed, every layer stores two small vectors (called key and value),
and for each new token it only computes the new notes and looks up the
old ones. This notebook is the **KV cache**.

The notebook costs memory. For a mid-size model it can be about half a
megabyte per token, so a conversation of 4,000 tokens needs around 2 GB,
and a server that talks to a hundred people at once needs that a hundred
times. That is why very long conversations are expensive, and why chat
services limit how much text a model can keep in mind (the context
window).

Writing is slow for another reason: for every single token the
graphics card has to read all the model's billions of numbers from its
memory. Servers therefore write for many users at once; one read of the
numbers then serves the next token of all of them.

# Level: college

<!-- ptf:text v1 -->

Measure it yourself, or picture the log: a 6,000-token prompt shows a
TTFT of 1.2 s, then tokens stream at 40 ms each. Why is reading 6,000
tokens barely slower than writing 30?

Prefill runs the full causal forward pass over n prompt tokens as one
matrix multiplication per layer: arithmetic intensity is high (each
weight is used n times), so it is compute-bound, and attention adds
O(n²) work. It produces the first token's logits and, as a by-product,
the keys and values of every prompt position.

Decode generates token t + 1 from token t. Without caching it would redo
attention over all t positions in every layer, O(t²) per step. Because
the mask is causal, past K and V never change, so each layer caches them
and the step computes only the new query, key and value, then attends
over the cache: O(t) per step. The cost moves from compute to memory:
each step multiplies one vector by every weight matrix, so the GPU must
stream all weights (and the cache) from HBM for a handful of FLOPs per
byte. With 14 GB of fp16 weights and 1 TB/s bandwidth, a single sequence
cannot exceed about 70 tokens/s. Batching B sequences shares the weight
reads, so throughput grows nearly B-fold until compute or memory for
the caches runs out; per-request latency rises slightly.

Cache memory per token = 2 · L · H_kv · d_head · bytes. For L = 32,
H_kv = 32, d_head = 128, fp16: 0.5 MiB/token, 2 GiB per 4k-token
sequence; with grouped-query attention (H_kv = 8) 128 KiB/token. At
32 concurrent 4k-token conversations a 7B model needs 64 GiB of cache
without GQA: more than its weights. This is why paged KV memory,
GQA/MQA, cache quantisation and prompt caching matter, and why long
contexts are priced and limited.

Latency model: total ≈ TTFT + (m − 1) · TPOT for m output tokens.
Optimisations target one term: prompt caching and chunked prefill cut
TTFT; quantisation and speculative decoding (a draft model proposes k
tokens, the target model verifies them in one parallel pass) cut TPOT;
continuous batching raises throughput.

# Misconceptions

- **reads-word-by-word**: The model reads the prompt word by word like it writes → the prompt is processed in parallel in one pass (prefill); only the output is generated token by token.
- **cache-free**: The KV cache is free speed → it trades memory for compute and grows with every token and every concurrent request.
- **rereads-everything**: For each new token the model recomputes everything from scratch → with a KV cache only the new token's computations are done; earlier keys and values are looked up.
- **gpu-compute-limits-decode**: Decoding is slow because the GPU cannot compute fast enough → single-sequence decoding is limited by how fast weights can be read from memory.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "first-token-pause", "level": "highschool", "purpose": "check",
  "objectives": ["two-phases"], "misconception": "reads-word-by-word",
  "question": "You paste a very long document into a chat assistant. Why is there a pause before the first word of the answer appears?",
  "options": [
    { "text": "The model first processes all tokens of the prompt (prefill) before it can write the first token", "correct": true, "feedback": "Right. A longer prompt means more reading before writing starts." },
    { "text": "The model writes the whole answer secretly first and then shows it", "correct": false, "feedback": "It streams tokens as it produces them; the pause is the reading phase." },
    { "text": "The server is always slow at the start", "correct": false, "feedback": "The pause grows with the prompt length; it is the prefill." }
  ],
  "explanation": "Time to first token is mostly prefill; after that, tokens stream at a steady pace."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "one-at-a-time", "level": "highschool", "purpose": "check",
  "objectives": ["two-phases"],
  "question": "Why can the model read the prompt all at once, but must write the answer one token at a time?",
  "options": [
    { "text": "The prompt is already known; each new answer token depends on the tokens before it", "correct": true, "feedback": "Right. You cannot write word 5 before word 4 exists." },
    { "text": "Writing uses a different, slower model", "correct": false, "feedback": "It is the same model in both phases." },
    { "text": "Reading is done by the tokenizer, not the model", "correct": false, "feedback": "The model processes the prompt; the tokenizer only turns it into IDs." }
  ],
  "explanation": "Prefill is parallel because the input is given; decode is sequential because the output is built step by step."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "what-cache", "level": "highschool", "purpose": "check",
  "objectives": ["kv-cache"], "misconception": "rereads-everything",
  "question": "What does the KV cache do?",
  "options": [
    { "text": "It keeps notes (keys and values) for tokens already processed, so each new token only needs its own new notes", "correct": true, "feedback": "Right. No rereading of the whole conversation for every token." },
    { "text": "It stores the final answers of earlier users", "correct": false, "feedback": "It stores intermediate vectors of the current conversation." },
    { "text": "It makes the model smarter", "correct": false, "feedback": "It only makes generation faster; the result is the same." }
  ],
  "explanation": "Caching keys and values avoids recomputing the past at every step."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "cache-chat", "level": "highschool", "purpose": "check",
  "objectives": ["kv-cache", "long-context-cost"], "misconception": "cache-free",
  "question": "A model needs 0.5 MB of KV cache per token. A server holds 50 conversations of 4,000 tokens each. About how many GB of cache is that?",
  "answer": 100, "tolerance": 5, "unit": "GB",
  "explanation": "0.5 MB · 4,000 = 2,000 MB = 2 GB per conversation; 50 conversations need about 100 GB."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "many-users", "level": "highschool", "purpose": "check",
  "objectives": ["long-context-cost"], "misconception": "gpu-compute-limits-decode",
  "question": "Why do servers generate the next token for many users at once?",
  "options": [
    { "text": "For every token the model's numbers must be read from memory; one read can serve many users at once", "correct": true, "feedback": "Right. Batching shares the expensive memory reads." },
    { "text": "Users share their answers", "correct": false, "feedback": "Each user gets their own answer; only the work is shared." },
    { "text": "It makes each single answer faster", "correct": false, "feedback": "Each single answer gets slightly slower; the total output rises." }
  ],
  "explanation": "Batching raises total throughput at a small cost in speed per user."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "kv-size", "level": "college", "purpose": "check",
  "objectives": ["kv-cache"], "misconception": "cache-free",
  "title": "KV cache of a 7B model",
  "intro": "32 layers, 32 KV heads of dimension 128, 16-bit values (2 bytes), context 4,096 tokens. 1 MiB = 1,048,576 bytes, 1 GiB = 1,024 MiB.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Bytes per token", "2 · 32 · 32 · 128 · 2", "524288"],
    ["MiB per token", "524,288 / 1,048,576", "0.5"],
    ["GiB per sequence", "0.5 · 4,096 / 1,024", "2"],
    ["GiB for 32 sequences", "2 · 32", "64"]
  ],
  "result": { "label": "GiB for 32 sequences with 8 KV heads (grouped-query attention)", "value": "16" },
  "explanation": "The cache can exceed the weights (about 13 GiB in fp16) once many long conversations run in parallel. Grouped-query attention divides it by the ratio of query heads to KV heads."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "bandwidth-bound", "level": "college", "purpose": "check",
  "objectives": ["two-phases", "long-context-cost"], "misconception": "gpu-compute-limits-decode",
  "question": "A 13-billion-parameter model in 16-bit precision runs on a GPU with 2 TB/s memory bandwidth. Ignoring the cache, what is the upper bound for decode speed of a single sequence, in tokens per second?",
  "answer": 77, "tolerance": 5, "unit": "tokens/s",
  "explanation": "Weights: 13 · 10⁹ · 2 bytes = 26 GB. Each token reads them once: 26 GB / 2 TB/s = 13 ms, so at most about 77 tokens/s. Batching does not speed up one sequence but serves many at almost the same pace."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "latency-total", "level": "college", "purpose": "check",
  "objectives": ["two-phases"],
  "question": "TTFT is 0.8 s and TPOT is 25 ms. How long until a 401-token answer is complete, in seconds?",
  "answer": 10.8, "tolerance": 0.1, "unit": "s",
  "explanation": "0.8 + 400 · 0.025 = 0.8 + 10 = 10.8 s. For long answers the decode term dominates; for long prompts with short answers, TTFT does."
}
```

```ptf-question
{
  "kind": "free_text", "id": "why-cache-valid", "level": "college", "purpose": "check",
  "objectives": ["kv-cache", "long-context-cost"], "misconception": "rereads-everything",
  "question": "Explain why caching keys and values is exact (gives the same output as recomputing) in a decoder, why it would not work the same way in a bidirectional encoder, and what the cache changes about the cost of one decode step.",
  "rubric": [
    "Causal mask: the keys/values of position i depend only on tokens ≤ i, so they never change when later tokens are added.",
    "In a bidirectional encoder every position's representation depends on all tokens, so adding a token changes all earlier K/V; caching would be wrong.",
    "Per-step cost goes from recomputing all t positions (O(t²) attention) to computing one new position and attending over t cached ones (O(t)), at the price of O(t) memory."
  ],
  "sample_answer": "In a decoder position i only sees tokens 1 … i, so its keys and values in every layer are fixed once computed; appending tokens never changes them, and reusing them gives identical results. In an encoder each position attends to all others, so a new token changes every earlier representation. With the cache, one decode step computes only the new token's projections and one attention row over t keys, linear in t instead of quadratic, but the cache uses memory proportional to t.",
  "explanation": "The causal mask is what makes the KV cache possible."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "which-optimisation", "level": "college", "purpose": "transfer",
  "question": "A support bot sends the same 3,000-token system prompt with every short user question. Users complain about the delay before the first word. Which optimisation targets exactly that?",
  "options": [
    { "text": "Prompt (prefix) caching: reuse the KV cache of the shared system prompt", "correct": true, "feedback": "Right. The shared prefix is prefilled once and reused, cutting TTFT." },
    { "text": "Speculative decoding", "correct": false, "feedback": "That speeds up decode (TPOT), not the prefill of a long prompt." },
    { "text": "A higher temperature", "correct": false, "feedback": "Temperature changes which token is picked, not the speed." }
  ],
  "explanation": "Identify which latency term dominates, then pick the optimisation for that term."
}
```

# Examples

- **Reading a letter, then writing a reply**: prefill and decode. Breaks down: the model reads all words simultaneously, not quickly in sequence.
- **Notebook while writing**: the KV cache is the notes you keep so you never reread the whole letter for each new word; the notebook grows with every word and takes up desk space (memory).

# Tutor notes

- Start from the experience of a chat UI: the pause, then streaming. Let the learner guess why before explaining.
- If the learner did llm-basics, connect the cache to the causal mask: "position 5 can never see the future, so its keys never change".
- At highschool level the memory numbers can stay rough (half a megabyte per token). At college level let the learner derive the formula from the shapes of K and V.

# Further reading

- [Hugging Face LLM Course, chapter 1.8: Inference with LLMs](https://huggingface.co/learn/llm-course/chapter1/8): prefill and decode, metrics and the KV cache; [chapter 2.8: Optimized inference deployment](https://huggingface.co/learn/llm-course/chapter2/8) compares serving frameworks (college).

# Sources

Grounding: [^hf-llm-course-1-8]. Text, examples and questions are original.

[^hf-llm-course-1-8]: Hugging Face, LLM Course, chapter 1, section 8 ("Inference with LLMs") and chapter 2, section 8 ("Optimized Inference Deployment"), https://huggingface.co/learn/llm-course, Apache License 2.0.
