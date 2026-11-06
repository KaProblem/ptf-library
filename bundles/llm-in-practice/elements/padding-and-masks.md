---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/padding-and-masks
title: Batches, padding and attention masks
description: Models process many texts at once as a rectangular block of numbers, so short texts are padded; the attention mask tells the model to ignore the padding, and truncation and dynamic padding keep the block small.
lang: en
levels: [highschool, college]
objectives:
  - id: why-pad
    text: Explain why the texts of a batch must have the same length and how padding makes them equal.
  - id: attention-mask
    text: Explain what the attention mask does and predict what goes wrong without it.
  - id: pad-strategy
    text: Choose a padding and truncation strategy (fixed length, dynamic padding, left or right) and compute how many padding tokens it costs.
tags: [llm, batching, padding, attention-mask, truncation]
requires:
  - ptf:el/llm-in-practice/subword-tokenization
  - ptf:el/llm-basics/causal-mask
leads_to:
  - ptf:el/llm-in-practice/fine-tuning-workflow
duration_min: { highschool: 15, college: 20 }
sources:
  - id: hf-llm-course-2-5
    resource: https://huggingface.co/learn/llm-course/chapter2/5
    title: "Hugging Face LLM Course, chapter 2, section 5: Handling multiple sequences; chapter 3, section 2: dynamic padding"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T23:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Graphics cards are fast because they compute on whole blocks of numbers at once. But sentences have different lengths, and a block has to be rectangular.
- This step shows the fix (fill short texts with padding), the trap that comes with it (the model must not read the padding) and how to waste as little computing as possible.
- Afterwards the learner can explain the `attention_mask` that every tokenizer returns, predict what happens without it, and pick padding settings for training and for generation.

# Core

A batch is a rectangular tensor, so all its sequences need the same length.
Shorter sequences are filled up with a padding token, longer ones are cut
(truncated) to a maximum length. Because attention mixes information
between positions, real tokens would also mix in the padding, so the
tokenizer returns an attention mask: 1 for real tokens, 0 for padding, and
the model gives padded positions zero attention weight. Padding to the
longest sequence of each batch (dynamic padding) instead of a fixed
maximum saves most of the wasted computation. Generating with a
decoder-only model pads on the left, so that every sequence ends where the
next token is written.

# Key facts

- Models expect a batch dimension: shape [batch, sequence length]. A list of IDs of different lengths cannot be turned into a tensor.
- **Padding**: append a special pad token (BERT: `[PAD]`, ID 0) until all sequences have the length of the longest one. Many decoder-only models have no pad token; the end-of-sequence token is then often reused for padding.
- **Attention mask**: same shape as `input_ids`, 1 = real token, 0 = padding. Inside attention, masked positions get a score of −∞ (in practice a very large negative number) before softmax, so their weight is exactly 0.
- Without the mask the real tokens' outputs change, because they attend to the padding: the same sentence gives different logits alone and in a padded batch.
- **Truncation**: sequences longer than the model's maximum (BERT: 512 tokens) must be cut, or split into overlapping windows when nothing may be lost.
- **Fixed padding** to the maximum length wastes compute; **dynamic padding** pads each batch only to its own longest sequence (a data collator does this when batches are built). Grouping texts of similar length into the same batch saves even more.
- Example: lengths 5, 12, 7 and 30 in one batch. Dynamic padding: 4 · 30 = 120 slots, 54 real tokens, 66 padding tokens. Fixed padding to 128: 512 slots, 458 padding tokens.
- **Padding side**: for training and encoders right padding is usual. For batched generation with decoder-only models use left padding, so the last position of every row is a real token and new tokens are appended directly after it.
- The padding mask and the causal mask combine: in a decoder a position may attend only to earlier positions that are not padding.

# Level: highschool

<!-- ptf:text v1 -->

Imagine an egg carton: every row has exactly six places. You want to put
three rows of eggs in, but one row has six eggs, one has four and one has
only two. The carton still needs a full rectangle, so you fill the empty
places with paper balls. A graphics card is like that carton: it computes
fastest on rectangular blocks of numbers, so every text in a batch needs
the same number of tokens.

The paper balls are the **padding**: a special "nothing here" token added
to the short texts until they are as long as the longest one. Texts that
are far too long are cut off at a maximum length (**truncation**).

Now the trap. In a transformer every token looks at the other tokens
(attention). A real word would also look at the paper balls and mix them
into its meaning. Then the same sentence would get a slightly different
answer depending on how much padding happened to be next to it. So the
tokenizer also hands over an **attention mask**: a row of 1s for real
tokens and 0s for padding. The model uses it to give the padding exactly
zero attention, as if it were not there.

Padding is wasted work, so it pays to waste little. Instead of making
every text 512 tokens long, pad each batch only up to its own longest
text. With four texts of 5, 12, 7 and 30 tokens that is 4 × 30 = 120
places, of which 66 are padding; padding all of them to 128 would mean
458 padding places.

# Level: college

<!-- ptf:text v1 -->

Tokenize "I loved it." and "This was by far the best course I have ever
taken." together and inspect the output: `input_ids` is now a 2 × 15
matrix (say) whose first row ends in `[PAD]` IDs, and `attention_mask`
has zeros exactly there.

Attention computes softmax(QKᵀ / √d + M) V, where M is an additive mask
with 0 for allowed and −∞ (in practice the dtype's minimum) for forbidden
key positions. The padding mask sets the columns of padded keys to −∞,
so every query assigns them zero weight. Padded query rows still produce
outputs, but they are ignored by the loss (label −100 in Hugging Face) and
by pooling. In a decoder the padding mask is combined with the causal
mask by taking the elementwise minimum (allowed only if both allow).
Without the mask, real tokens attend to pad embeddings and the logits of
a sentence depend on its batch neighbours, a classic source of
train/inference mismatch.

Cost: attention is O(T²) and the rest O(T) per sequence, so padding to a
fixed 512 when most inputs have 40 tokens wastes over 90 % of compute.
Dynamic padding (pad in the collator to the batch maximum) plus length
grouping (sample batches from buckets of similar length) removes most of
it. TPUs and compiled graphs prefer few fixed shapes, so there one pads to
a small set of lengths (for example multiples of 64).

Truncation strategy matters for pairs (`only_second` to cut the context,
not the question, in QA) and for long documents (sliding windows with a
stride, aggregating predictions over windows).

For batched generation in decoder-only models, pad on the left: with
right padding the last position of a short row is a pad token and the
model would continue from it. Position IDs must then skip the padding,
which the generation utilities derive from the attention mask.

# Misconceptions

- **padding-harmless**: Padding is just filler and cannot change results → without the attention mask, real tokens attend to padding and their outputs change.
- **mask-is-causal**: The attention mask from the tokenizer is the causal mask → it marks padding; the causal mask (no looking ahead) is built into decoder models and combined with it.
- **pad-to-max**: Always pad to the model's maximum length → dynamic padding to the longest sequence in each batch saves most of the computation.
- **right-pad-generation**: Right padding is fine for batched generation → decoder-only models must be padded on the left so each row ends with a real token.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "why-same-length", "level": "highschool", "purpose": "check",
  "objectives": ["why-pad"], "misconception": "pad-to-max",
  "question": "Why are short texts filled up with padding tokens before they go into a model together?",
  "options": [
    { "text": "The batch has to be a rectangular block of numbers, so every row needs the same length", "correct": true, "feedback": "Right. Like an egg carton, every row needs the same number of places." },
    { "text": "Short texts are harder to understand, so they get extra words", "correct": false, "feedback": "Padding adds no information; it only fills space." },
    { "text": "Every model needs exactly 512 tokens", "correct": false, "feedback": "512 is a maximum, not a required length." }
  ],
  "explanation": "Graphics cards compute on rectangular tensors; padding makes the rows equal."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "what-mask-does", "level": "highschool", "purpose": "check",
  "objectives": ["attention-mask"], "misconception": "padding-harmless",
  "question": "A tokenizer returns the attention mask [1, 1, 1, 1, 0, 0]. What does it tell the model?",
  "options": [
    { "text": "The first four tokens are real; the last two are padding and must be ignored", "correct": true, "feedback": "Right. Padded positions get zero attention." },
    { "text": "The last two tokens are especially important", "correct": false, "feedback": "0 means ignore, not important." },
    { "text": "The model may only look at the last two tokens", "correct": false, "feedback": "It is the other way round." }
  ],
  "explanation": "1 = real token, 0 = padding."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "without-mask", "level": "highschool", "purpose": "check",
  "objectives": ["attention-mask"], "misconception": "padding-harmless",
  "question": "A sentence gives 96 % positive when processed alone, but 91 % when processed in a batch with a much longer sentence. What is the most likely bug?",
  "options": [
    { "text": "The attention mask was not passed, so the real words also looked at the padding", "correct": true, "feedback": "Right. With the mask, alone and in a batch would give the same result." },
    { "text": "Batches always make models less sure", "correct": false, "feedback": "With a correct mask, batching does not change the result." },
    { "text": "The longer sentence was secretly mixed into the short one", "correct": false, "feedback": "Texts in a batch do not see each other; only the padding leaks in." }
  ],
  "explanation": "Missing attention masks make results depend on batch neighbours."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "dynamic-waste", "level": "highschool", "purpose": "check",
  "objectives": ["pad-strategy"], "misconception": "pad-to-max",
  "question": "A batch holds four texts with 8, 20, 11 and 25 tokens. Each batch is padded to its own longest text. How many padding tokens are added?",
  "answer": 36, "tolerance": 0, "unit": "padding tokens",
  "explanation": "4 · 25 = 100 places, 8 + 20 + 11 + 25 = 64 real tokens, so 36 padding tokens."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "too-long", "level": "highschool", "purpose": "check",
  "objectives": ["why-pad", "pad-strategy"],
  "question": "A model can read at most 512 tokens, and one text has 900. What happens with truncation switched on?",
  "options": [
    { "text": "The text is cut to 512 tokens and the rest is not seen", "correct": true, "feedback": "Right. If the rest matters, split the text into several windows." },
    { "text": "The model reads all 900 tokens anyway", "correct": false, "feedback": "It cannot; its position limit is 512." },
    { "text": "The other texts in the batch are padded to 900", "correct": false, "feedback": "No row may exceed the maximum; long ones are cut." }
  ],
  "explanation": "Padding fills short texts, truncation cuts long ones."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "ragged-tensor", "level": "college", "purpose": "check",
  "objectives": ["why-pad"], "misconception": "padding-harmless",
  "question": "torch.tensor([[101, 1045, 2293, 102], [101, 2023, 102]]) raises an error. What is the cleanest fix before calling the model?",
  "options": [
    { "text": "Let the tokenizer pad the batch (padding=True) and pass the returned attention_mask together with input_ids", "correct": true, "feedback": "Right. Equal lengths make the tensor rectangular, and the mask keeps the padding invisible." },
    { "text": "Append zeros to the short row by hand and pass only input_ids", "correct": false, "feedback": "The tensor works, but without a mask the real tokens attend to the padding." },
    { "text": "Run the two sentences through the model in one call as a Python list", "correct": false, "feedback": "Models take tensors with a batch dimension, not ragged lists." }
  ],
  "explanation": "Rows of a tensor must have equal length; padding plus attention mask is the standard way to batch texts of different lengths."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "fixed-vs-dynamic", "level": "college", "purpose": "check",
  "objectives": ["pad-strategy"], "misconception": "pad-to-max",
  "title": "Fixed vs. dynamic padding",
  "intro": "One batch has sequences of 5, 12, 7 and 30 tokens.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Real tokens", "5 + 12 + 7 + 30", "54"],
    ["Slots with dynamic padding", "4 · 30", "120"],
    ["Padding tokens, dynamic", "120 − 54", "66"],
    ["Slots with fixed padding to 128", "4 · 128", "512"],
    ["Padding tokens, fixed", "512 − 54", "458"]
  ],
  "result": { "label": "Share of slots that are padding with fixed padding (%)", "value": "89.5" },
  "explanation": "458 / 512 ≈ 89.5 % of the slots are padding with a fixed length, 55 % with dynamic padding. Attention cost grows with the square of the length, so the saving in compute is even larger."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "masked-softmax", "level": "college", "purpose": "check",
  "objectives": ["attention-mask"],
  "question": "A query has attention scores [2, 1, 3, 3] over four keys; the last two keys are padding. After applying the padding mask and softmax, what weight (in %) does the first key get?",
  "answer": 73.1, "tolerance": 1, "unit": "%",
  "explanation": "The padded scores become −∞, so softmax runs over [2, 1]: e² / (e² + e¹) ≈ 0.731. Without the mask the high padding scores would take most of the weight."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "left-padding", "level": "college", "purpose": "check",
  "objectives": ["pad-strategy"], "misconception": "right-pad-generation",
  "question": "You generate continuations for a batch of prompts with a decoder-only model and right padding. Short prompts produce nonsense. Why, and what fixes it?",
  "options": [
    { "text": "The last position of a short row is a pad token, so generation continues after padding; pad on the left instead", "correct": true, "feedback": "Right. With left padding every row ends with its last real token." },
    { "text": "Short prompts are always worse; make prompts longer", "correct": false, "feedback": "The same prompt works fine when generated alone." },
    { "text": "The attention mask must be removed for generation", "correct": false, "feedback": "The mask is still needed; the padding side is the problem." }
  ],
  "explanation": "Decoders append after the last position. Left padding puts the real text next to where new tokens go."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "two-masks", "level": "college", "purpose": "check",
  "objectives": ["attention-mask"], "misconception": "mask-is-causal",
  "question": "In a decoder-only model, a batch row is [PAD, PAD, The, cat, sat] with left padding. Which keys may the query at \"cat\" attend to?",
  "options": [
    { "text": "\"The\" and \"cat\"", "correct": true, "feedback": "Right. Causal mask: positions up to itself; padding mask: not the PADs." },
    { "text": "All five positions", "correct": false, "feedback": "\"sat\" is in the future and the PADs are masked." },
    { "text": "Both PADs, \"The\" and \"cat\"", "correct": false, "feedback": "The padding mask removes the PADs." }
  ],
  "explanation": "Allowed = causal AND not padding."
}
```

```ptf-question
{
  "kind": "free_text", "id": "long-docs", "level": "college", "purpose": "transfer",
  "question": "You fine-tune an encoder with a 512-token limit for extractive question answering on contracts of up to 6,000 tokens. Describe how to handle the length, and why plain truncation is a bad idea here.",
  "rubric": [
    "Truncation would drop most of the contract, and the answer is often in the dropped part.",
    "Split the context into overlapping windows (stride) with the question repeated in each.",
    "Truncate only the context (only_second), never the question.",
    "Aggregate span predictions over windows (best score; map back with offsets)."
  ],
  "sample_answer": "Plain truncation keeps the first 512 tokens and loses the answer whenever it is later. Instead I split each contract into windows of 512 tokens with an overlap of, say, 128, put the question in front of each window, truncate only the context, and take the best-scoring span over all windows, mapping it back to the original text with the offsets.",
  "explanation": "Sliding windows with a stride are the standard way to apply fixed-length encoders to long inputs."
}
```

# Examples

- **Egg carton**: a batch is a carton with equal rows; padding are paper balls; the mask is a sticker on each empty place saying "do not count". Breaks down: a carton has a fixed size, dynamic padding changes the carton per batch.
- **Exam seating**: empty chairs in a row of a lecture hall do not take part in a group discussion.

# Tutor notes

- Lead with the egg carton at highschool level; the mask makes sense only after the learner sees that attention lets tokens look at padding.
- If the learner did llm-basics, connect the −∞ trick to the causal mask they already know: same mechanism, different cells.
- Learners who code: comparing logits for one sentence alone and in a padded batch, with and without `attention_mask`, is a two-minute experiment that makes the point stick.

# Further reading

- [Hugging Face LLM Course, chapter 2.5: Handling multiple sequences](https://huggingface.co/learn/llm-course/chapter2/5): padding, attention masks and truncation in code; dynamic padding with `DataCollatorWithPadding` in chapter 3.2 (college).

# Sources

Grounding: [^hf-llm-course-2-5]. Text, examples and questions are original.

[^hf-llm-course-2-5]: Hugging Face, LLM Course, chapter 2, section 5 ("Handling multiple sequences") and chapter 3, section 2 ("Processing the data"), https://huggingface.co/learn/llm-course, Apache License 2.0.
