---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/model-heads
title: Behind the pipeline - base model and heads
description: What happens between a sentence and the answer "positive, 96 %" - tokenizer, a base model that turns every token into a vector, and a small task head whose scores (logits) become probabilities.
lang: en
levels: [highschool, college]
objectives:
  - id: pipeline-stages
    text: Name the three stages between input text and answer (tokenizer, model, post-processing) and what passes from one to the next.
  - id: hidden-states
    text: Describe what the base model outputs (one vector per token, shape batch × tokens × hidden size) and what a task head does with it.
  - id: logits-to-answer
    text: Turn logits into probabilities and an answer for classification, token classification, extractive question answering and next-token prediction.
tags: [llm, transformers, logits, softmax, heads, pipeline]
about:
  - wikidata: Q7554146
    label: softmax function
requires:
  - ptf:el/llm-basics/softmax
  - ptf:el/llm-in-practice/transformer-architectures
leads_to:
  - ptf:el/llm-in-practice/subword-tokenization
  - ptf:el/llm-in-practice/fine-tuning-workflow
duration_min: { highschool: 15, college: 25 }
sources:
  - id: hf-llm-course-2
    resource: https://huggingface.co/learn/llm-course/chapter2/2
    title: "Hugging Face LLM Course, chapter 2, sections 2 and 3: Behind the pipeline, Models"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T23:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- One line of code takes "I love this course!" and returns "POSITIVE, 0.9998". This step opens that box.
- Inside are three stations: text becomes numbers, a large base model turns every token into a long vector, and a tiny task head turns vectors into scores that become the answer.
- Afterwards the learner can follow a sentence through all three stations, read the shapes of the numbers in between, and say why the same base model can answer completely different tasks.

# Core

A pipeline has three stages. The tokenizer turns text into token IDs. The
model runs them through a base transformer, which outputs one vector per
token (the hidden states, shape batch × tokens × hidden size), and then
through a small head that turns those vectors into raw scores called
logits. Post-processing turns logits into an answer, usually with softmax
for probabilities and argmax for the label. The base model is shared; the
head decides the task: one score per label for the whole text, per token,
for span starts and ends, or for every token in the vocabulary.

# Key facts

- Tokenizer output: `input_ids` (token IDs) plus an `attention_mask`; special tokens are added, for BERT `[CLS]` at the start and `[SEP]` at the end.
- Base model output (hidden states): shape [batch size, sequence length, hidden size]. BERT-base and DistilBERT have hidden size 768; BERT-base has 12 layers, DistilBERT 6. Two sentences of 16 tokens give [2, 16, 768].
- **Logits** are raw, unnormalised scores. Softmax turns them into probabilities: pᵢ = e^{zᵢ} / ∑ⱼ e^{zⱼ}. Logits [−1.6, 1.6] give probabilities 0.039 and 0.961.
- **Sequence-classification head**: a linear layer from one vector per text (BERT: the `[CLS]` position) to one logit per label; output [batch, labels], for example [2, 2].
- **Token-classification head**: the same linear layer applied at every position; output [batch, tokens, labels].
- **Extractive QA head**: two logits per token, one for "answer starts here" and one for "answer ends here"; the answer is the span with the best start + end score where start ≤ end.
- **Language-modelling head**: a linear layer from the hidden size to the vocabulary size at every position; output [batch, tokens, V]. For hidden size 768 and V = 50,257 that layer has 768 · 50,257 ≈ 38.6 million weights (often shared with the input embedding).
- The label names (`0 → NEGATIVE`, `1 → POSITIVE`) live in the model's config (`id2label`), not in the logits.
- The same checkpoint can be loaded with different heads; a head that was not trained is random.

# Level: highschool

<!-- ptf:text v1 -->

Follow one sentence through a sentiment program: "I love this course!"

**Station 1, the tokenizer.** The sentence is cut into pieces and every
piece gets its number. A start marker and an end marker are added, so the
model knows where the text begins and ends. Out comes a short list of
whole numbers.

**Station 2, the model.** This is the big part. It turns every token into
a long list of numbers, a vector with 768 entries, and every layer
improves these vectors by letting the tokens look at each other. In the
end each token's vector describes what it means in this sentence. Then a
very small part on top, the **head**, takes the vector of the start
marker and turns it into two scores, one for "negative" and one for
"positive", for example −1.6 and 1.6. These raw scores are called
**logits**.

**Station 3, post-processing.** Logits are not percentages; they can be
any number, even negative. Softmax turns them into probabilities that add
up to 1: here 4 % negative and 96 % positive. The program reports the
larger one: POSITIVE.

The clever part: the big model in station 2 is the same for many tasks.
Swap the small head and you get a different program. A head that scores
every token marks names; a head that scores "the answer starts here" and
"the answer ends here" finds answers in a text; a head with one score for
every token in the vocabulary predicts the next word.

# Level: college

<!-- ptf:text v1 -->

Run two sentences of different length through a classification
checkpoint and print every intermediate tensor; the shapes tell the whole
story.

1. **Tokenizer** → `input_ids` [2, 16] (padded to the longer sentence)
   and `attention_mask` [2, 16].
2. **Base model** → `last_hidden_state` [2, 16, 768]: one contextual
   embedding per token after the last block (hidden size 768 for
   BERT-base / DistilBERT).
3. **Head** → for sequence classification a linear map W ∈ ℝ^{768 × 2}
   applied to the first position (or a pooled vector): logits [2, 2].
4. **Post-processing** → softmax over the last axis, argmax, then
   `id2label` from the config.

Logits are log-probabilities up to an additive constant: softmax is
invariant to adding c to every logit, and the cross-entropy loss used in
training is computed on logits directly for numerical stability. Logits
[−1.6, 1.6] give p = 1 / (1 + e^{3.2}) ≈ 0.039 for the first class.

Heads differ only in where the linear map is applied and to what size:

| Head | Applied to | Output shape |
| --- | --- | --- |
| Sequence classification | first / pooled position | [B, labels] |
| Token classification | every position | [B, T, labels] |
| Extractive QA | every position, 2 outputs | start [B, T], end [B, T] |
| Causal LM | every position | [B, T, V] |

For QA, the predicted span maximises start_logit[i] + end_logit[j]
subject to i ≤ j (and a maximum length), restricted to context tokens.
The LM head is the largest by far: 768 · 50,257 ≈ 38.6 million weights,
which is why many models tie it to the input embedding matrix.
`AutoModel` gives you the base model only; `AutoModelFor…` classes add
the matching head, randomly initialised if the checkpoint lacks it.

# Misconceptions

- **logits-are-probabilities**: Logits are probabilities or percentages → they are unnormalised scores; softmax turns them into probabilities that sum to 1.
- **model-outputs-label**: The model itself outputs the word "POSITIVE" → it outputs numbers; the label name is looked up in the config during post-processing.
- **one-model-per-task**: Every task needs a completely different model → the base model is shared; a small head on top decides the task.
- **one-vector-per-text**: The base model outputs one vector for the whole text → it outputs one vector per token; classification heads pick or pool one of them.

# Questions

```ptf-question
{
  "kind": "ordering", "id": "order-stations", "level": "highschool", "purpose": "check",
  "objectives": ["pipeline-stages"],
  "instruction": "Put the stations of a sentiment program in order, from the sentence to the answer.",
  "items": [
    "The tokenizer cuts the sentence into tokens and gives each a number",
    "The base model turns every token into a vector",
    "The head turns a vector into one score per label (logits)",
    "Softmax turns the scores into probabilities",
    "The label with the highest probability is reported"
  ],
  "explanation": "Tokenizer → base model → head → softmax → label. Only the first and last steps deal with text."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "what-are-logits", "level": "highschool", "purpose": "check",
  "objectives": ["logits-to-answer"], "misconception": "logits-are-probabilities",
  "question": "The head outputs −1.6 for \"negative\" and 1.6 for \"positive\". What are these numbers?",
  "options": [
    { "text": "Raw scores (logits) that still have to be turned into probabilities", "correct": true, "feedback": "Right. Softmax makes them about 4 % and 96 %." },
    { "text": "Percentages: −1.6 % and 1.6 %", "correct": false, "feedback": "Percentages cannot be negative, and these do not add up to 100." },
    { "text": "The final answer: the model is 1.6 times sure", "correct": false, "feedback": "Logits have no such meaning on their own; only after softmax do they become probabilities." }
  ],
  "explanation": "Logits can be any real number. Softmax turns them into probabilities that add up to 1."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "softmax-two", "level": "highschool", "purpose": "check",
  "objectives": ["logits-to-answer"],
  "question": "The logits are 0 for \"negative\" and 2 for \"positive\". What probability (in percent) does softmax give \"positive\"?",
  "answer": 88.1, "tolerance": 2, "unit": "%",
  "explanation": "e² / (e⁰ + e²) = 7.39 / 8.39 ≈ 0.881, so about 88 %."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "swap-head", "level": "highschool", "purpose": "check",
  "objectives": ["hidden-states"], "misconception": "one-model-per-task",
  "question": "The same big base model is used for a sentiment program and a program that marks names. What is different?",
  "options": [
    { "text": "Only the small head on top: one gives a score per text, the other a score per word", "correct": true, "feedback": "Right. The base model produces a vector for every token; the head decides what to do with them." },
    { "text": "Nothing at all", "correct": false, "feedback": "Something must differ, since the outputs are different." },
    { "text": "They need two completely different big models", "correct": false, "feedback": "The expensive part is shared; only the head changes." }
  ],
  "explanation": "Base model = general understanding, head = task."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "vector-per-token", "level": "highschool", "purpose": "check",
  "objectives": ["hidden-states"], "misconception": "one-vector-per-text",
  "question": "A sentence of 8 tokens goes through a base model with vectors of length 768. What comes out?",
  "options": [
    { "text": "8 vectors of 768 numbers, one per token", "correct": true, "feedback": "Right. Every token gets its own vector." },
    { "text": "One vector of 768 numbers for the whole sentence", "correct": false, "feedback": "The base model keeps one vector per token; a classification head picks or averages them later." },
    { "text": "768 tokens", "correct": false, "feedback": "768 is the length of each vector, not a number of tokens." }
  ],
  "explanation": "Hidden states have the shape tokens × hidden size, here 8 × 768."
}
```

```ptf-question
{
  "kind": "cloze", "id": "shapes", "level": "college", "purpose": "check",
  "objectives": ["hidden-states", "pipeline-stages"],
  "text": "A batch of 4 texts, padded to 32 tokens, goes through DistilBERT (hidden size 768) with a 3-label classification head. input_ids has shape [4, {{1}}], the last hidden state [4, 32, {{2}}], and the logits [4, {{3}}].",
  "gaps": [ { "answer": "32" }, { "answer": "768" }, { "answer": "3" } ],
  "explanation": "Batch and length come from the tokenizer, hidden size from the base model, the last dimension of the logits from the head."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "softmax-three", "level": "college", "purpose": "check",
  "objectives": ["logits-to-answer"], "misconception": "logits-are-probabilities",
  "title": "Softmax over three labels",
  "intro": "A head outputs the logits [2.0, 1.0, −1.0] for the labels negative, neutral, positive. Round to three decimals.",
  "columns": ["Step", "Computation", "Value"],
  "rows": [
    ["e^2.0", "", "7.389"],
    ["e^1.0", "", "2.718"],
    ["e^−1.0", "", "0.368"],
    ["Sum", "7.389 + 2.718 + 0.368", "10.475"],
    ["p(negative)", "7.389 / 10.475", "0.705"]
  ],
  "result": { "label": "p(positive)", "value": "0.035" },
  "explanation": "The largest logit wins (negative, 70.5 %), and even a negative logit keeps a small positive probability. Adding the same number to all logits would not change the result."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "qa-span-logits", "level": "college", "purpose": "check",
  "objectives": ["logits-to-answer", "hidden-states"],
  "question": "A QA head gives start logits [0.1, 3.0, 0.2, 0.5] and end logits [0.0, 0.4, 0.3, 2.5] over 4 context tokens. Which span is predicted (positions counted from 1)?",
  "options": [
    { "text": "Tokens 2 to 4", "correct": true, "feedback": "Right. start 3.0 + end 2.5 = 5.5 is the best pair with start ≤ end." },
    { "text": "Token 2 only", "correct": false, "feedback": "3.0 + 0.4 = 3.4, less than 5.5." },
    { "text": "Tokens 4 to 2", "correct": false, "feedback": "A span cannot end before it starts." }
  ],
  "explanation": "Maximise start[i] + end[j] with i ≤ j. Taking the two argmaxes separately happens to work here, but not in general."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "lm-head-size", "level": "college", "purpose": "check",
  "objectives": ["hidden-states"],
  "question": "A causal LM head maps hidden size 768 to a vocabulary of 50,257 tokens (no bias). How many millions of weights does it have?",
  "answer": 38.6, "tolerance": 0.5, "unit": "million weights",
  "explanation": "768 · 50,257 = 38,597,376 ≈ 38.6 million, almost a third of a 124-million-parameter GPT-2 small, which is why it is usually tied to the input embedding."
}
```

```ptf-question
{
  "kind": "free_text", "id": "label-lookup", "level": "college", "purpose": "transfer",
  "misconception": "model-outputs-label",
  "question": "After fine-tuning, your classifier prints LABEL_0 and LABEL_1 instead of NEGATIVE and POSITIVE. What is missing and where would you fix it?",
  "rubric": [
    "The model outputs logits only; label names come from config id2label / label2id.",
    "Set id2label and label2id when creating the model (or in the config) before saving."
  ],
  "sample_answer": "The model only outputs two logits; names come from id2label in the config, which defaulted to LABEL_0/LABEL_1. I would pass id2label={0: 'NEGATIVE', 1: 'POSITIVE'} and the inverse label2id when loading the model for fine-tuning.",
  "explanation": "Post-processing maps indices to names; that mapping is metadata, not something the network learns."
}
```

# Examples

- **Factory line**: cutting (tokenizer), the big machine (base model), a small attachment that sorts finished parts (head), the label printer (post-processing). Breaks down: the big machine's output is not a finished product but a description of every token.
- **Swiss army knife**: one handle (base model), many blades (heads).

# Tutor notes

- Let the learner predict the shape of the hidden states before telling them; most say one vector per sentence.
- At highschool level skip the QA span arithmetic; the idea "two scores per word, start and end" is enough.
- Learners who code: suggest printing `outputs.last_hidden_state.shape` and `outputs.logits` themselves.

# Further reading

- [Hugging Face LLM Course, chapter 2.2: Behind the pipeline](https://huggingface.co/learn/llm-course/chapter2/2): the same three stages in PyTorch code, with `AutoTokenizer` and `AutoModelForSequenceClassification` (college).

# Sources

Grounding: [^hf-llm-course-2]. Text, examples and questions are original.

[^hf-llm-course-2]: Hugging Face, LLM Course, chapter 2 ("Using 🤗 Transformers"), sections 2 and 3, https://huggingface.co/learn/llm-course, Apache License 2.0.
