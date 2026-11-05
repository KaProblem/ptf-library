---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/pretraining-and-transfer
title: Pretraining and transfer learning
description: Models first learn language from huge amounts of raw text, where the text itself supplies the answers; a short second training on a small labelled set then adapts them to a task.
lang: en
levels: [highschool, college]
objectives:
  - id: self-supervised
    text: Explain how pretraining gets its training labels from raw text itself, for next-token and for masked-token prediction.
  - id: transfer
    text: Explain why fine-tuning a pretrained model needs far less data, time and energy than training the same model from scratch.
  - id: checkpoint
    text: Tell an architecture from a checkpoint, and a pretrained from a fine-tuned model.
tags: [llm, pretraining, fine-tuning, transfer-learning, self-supervised]
about:
  - wikidata: Q6027324
    label: transfer learning
  - wikidata: Q77562367
    label: self-supervised learning
  - wikidata: Q112702082
    label: foundation model
requires:
  - ptf:el/llm-basics/training-examples
leads_to:
  - ptf:el/llm-in-practice/transformer-architectures
  - ptf:el/llm-in-practice/fine-tuning-workflow
duration_min: { highschool: 15, college: 20 }
simulators:
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: stages
    levels: [highschool, college]
    role: explore
    use_when: the learner wants to see what a model can do after pretraining alone and after each later training stage
sources:
  - id: hf-llm-course-1-4
    resource: https://huggingface.co/learn/llm-course/chapter1/4
    title: "Hugging Face LLM Course, chapter 1, section 4: How do Transformers work?"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T22:40:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Nobody labelled the trillions of words a large model learned from. So where did the "right answers" for its training come from?
- This step shows the trick (the text is its own answer key) and the two-stage recipe almost every language model follows: pretrain once at great cost, then adapt cheaply many times.
- Afterwards the learner can explain why you should almost never train a language model from scratch, and what exactly you download when you "download a model".

# Core

Pretraining teaches a model language from raw text without human labels:
hide part of a text and let the model predict it, so the text itself provides
the answer. A causal model predicts the next token, a masked model predicts
tokens hidden in the middle. This is expensive and done once. Fine-tuning
then continues training the pretrained weights on a small labelled set for
one task; because the model already knows the language, this needs a tiny
fraction of the data and compute. An architecture is the blueprint, a
checkpoint is one set of trained weights for it.

# Key facts

- **Causal language modelling** (GPT family): predict token t + 1 from tokens 1 … t. A sequence of n tokens yields n − 1 training examples.
- **Masked language modelling** (BERT family): hide about 15 % of the tokens and predict them from both sides. In BERT, of the chosen tokens 80 % become `[MASK]`, 10 % a random token and 10 % stay unchanged, so the model cannot rely on seeing `[MASK]`. In a 512-token sequence 15 % is about 77 predicted tokens.
- Both are **self-supervised**: the labels are part of the input, so any text on the web can be training data.
- **Transfer learning**: the pretrained weights are the starting point for a new task. Fine-tuning data sets are often thousands of examples (the MRPC paraphrase data set has 3,668 training pairs), against hundreds of billions of tokens for pretraining.
- Rule of thumb for training compute: about 6 · N · D floating-point operations for N parameters and D training tokens. GPT-3 (N = 175 billion, D = 300 billion tokens) ≈ 3.15 · 10²³ FLOPs.
- Fine-tuning a model that was pretrained on a related kind of text works best; a model pretrained on English web text adapts less well to, say, source code or Finnish legal text.
- **Architecture**: the layer structure (for example "BERT", "Llama"). **Checkpoint**: trained weights for an architecture (for example `bert-base-uncased`). "Model" can mean either.
- A pretrained model also inherits what is in its data, including biases; fine-tuning on a small set does not remove them.
- Sharing pretrained checkpoints means the large cost and its carbon footprint are paid once instead of by every team.

# Level: highschool

<!-- ptf:text v1 -->

Cover the last word of this sentence with your finger: "The cat sat on
the …". You know the answer, and you can check yourself by lifting your
finger. A language model is trained exactly like that. Take any text,
hide a word, let the model guess, then show it the real word. No teacher is
needed to write the answers, because the text already contains them. That
is why models can learn from billions of web pages.

There are two ways to hide words. GPT-style models always hide **the next
word** and only look back. BERT-style models hide **words in the middle**
(about one in seven) and may look at both sides. Either way the model
slowly learns spelling, grammar, facts and style. This first stage is
called **pretraining**. It runs for weeks on thousands of graphics cards
and costs millions, so only a few organisations do it.

Then comes the cheap part. Say you want a model that sorts customer
complaints. Instead of starting from zero, you take the pretrained model
and train it a little more on a few thousand sorted complaints. This is
**fine-tuning**. It works with so little data because the model already
knows the language; it only has to learn your task. Learning a new card
game is quick for someone who already knows many card games, and that
is the whole idea of **transfer learning**.

When you "download a model", you download a **checkpoint**: the trained
numbers (weights) for a certain blueprint (the **architecture**). The same
blueprint can have many checkpoints: one pretrained on English, one on
German, one fine-tuned for complaints.

# Level: college

<!-- ptf:text v1 -->

Supervised learning needs labels, and labels are expensive. Pretraining
sidesteps that: given a sequence x₁ … xₙ, a causal model is trained to
maximise ∑ log p(x_{t+1} | x₁ … x_t), so every position yields an example
(n − 1 per sequence). A masked model replaces a random 15 % of positions
(BERT: 80 % `[MASK]`, 10 % random token, 10 % unchanged) and predicts the
originals from bidirectional context. Both objectives are
self-supervised: the target is a deterministic function of the input, so
web-scale text becomes training data.

The price is compute. With the estimate C ≈ 6 · N · D, GPT-3 (175 billion
parameters, 300 billion tokens) needed about 3 · 10²³ FLOPs, weeks on
thousands of accelerators. Fine-tuning reuses those weights: you add a
task head if needed and continue gradient descent on a labelled set of
perhaps 10³ to 10⁵ examples for a few epochs, typically with a small
learning rate so the pretrained representations are adjusted rather than
overwritten. The statistical argument is that the pretrained weights are
a strong prior; the downstream set only has to select among features
the model already computes.

Transfer works best when the pretraining distribution covers the target
domain. Domain-adaptive pretraining (continuing the language-modelling
objective on unlabelled in-domain text before fine-tuning) helps when it
does not. And transfer moves everything: biases and gaps of the pretraining
corpus survive a small fine-tune.

Vocabulary: the architecture (`BertModel`, `LlamaForCausalLM`) is code
and a config; a checkpoint is a set of weights compatible with it,
identified by a name on a model hub. Loading a checkpoint for a different
head (for example a classification head on a pretrained base) initialises
the new head randomly, which is why such a model must be fine-tuned before
its predictions mean anything.

# Misconceptions

- **needs-human-labels**: Pretraining needs people to label the training text → the labels come from the text itself (the hidden next or masked token).
- **finetune-from-scratch**: Fine-tuning trains a new model from zero on the task data → it continues training the pretrained weights, which is why little data suffices.
- **model-is-architecture**: A model name always means one fixed thing → the same architecture can have many checkpoints (weights) for different languages and tasks.
- **finetune-removes-bias**: A short fine-tune on clean data removes the biases learned in pretraining → biases from the pretraining data largely survive.

# Questions

```ptf-question
{
  "kind": "guess_next", "id": "cover-word", "level": "highschool", "purpose": "warmup",
  "intro": "Cover the last word and guess it. Then think: who wrote the 'right answer' for you?",
  "prefix": "The cat sat on the",
  "answer": "mat", "accepted": ["floor", "sofa", "chair", "bed", "roof"],
  "hint": "A short word for something on the floor.",
  "explanation": "Any of these is plausible; the real text contains one of them, and that word is the label. Nobody had to write the answer key."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "where-labels", "level": "highschool", "purpose": "check",
  "objectives": ["self-supervised"], "misconception": "needs-human-labels",
  "question": "Pretraining uses billions of web pages. Where do the right answers for training come from?",
  "options": [
    { "text": "From the text itself: a hidden word is the answer", "correct": true, "feedback": "Right. Hide a word, let the model guess, compare with the real word." },
    { "text": "Thousands of people label every sentence", "correct": false, "feedback": "That would be far too slow and expensive for billions of pages." },
    { "text": "There are no right answers in pretraining", "correct": false, "feedback": "There are: every hidden word is a right answer." }
  ],
  "explanation": "Pretraining is self-supervised: the text provides its own labels."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "examples-per-sentence", "level": "highschool", "purpose": "check",
  "objectives": ["self-supervised"],
  "question": "A GPT-style model is trained on a text of 10 tokens by always guessing the next token from the ones before. How many guesses (training examples) does this one text give?",
  "answer": 9, "tolerance": 0, "unit": "examples",
  "explanation": "Token 2 from token 1, token 3 from tokens 1–2, …, token 10 from tokens 1–9: 9 examples. There is nothing to predict after the last token."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "why-finetune-cheap", "level": "highschool", "purpose": "check",
  "objectives": ["transfer"], "misconception": "finetune-from-scratch",
  "question": "Why does a model need only a few thousand examples to learn to sort complaints, after pretraining?",
  "options": [
    { "text": "It already knows the language and only has to learn the sorting", "correct": true, "feedback": "Yes. Fine-tuning builds on what pretraining learned." },
    { "text": "Sorting complaints is easier than anything the model did before", "correct": false, "feedback": "Not the reason: a model trained from zero would need far more examples for the same task." },
    { "text": "Fine-tuning starts a new, empty model that learns faster", "correct": false, "feedback": "No. Fine-tuning continues from the pretrained weights; that is the point." }
  ],
  "explanation": "Transfer learning: what was learned on lots of general text carries over to the new task."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "what-download", "level": "highschool", "purpose": "check",
  "objectives": ["checkpoint"], "misconception": "model-is-architecture",
  "question": "You download a model called \"german-bert-complaints\". What did you download?",
  "options": [
    { "text": "Trained weights (a checkpoint) for the BERT blueprint, fine-tuned on German complaints", "correct": true, "feedback": "Right. Same blueprint as other BERT models, different numbers." },
    { "text": "A new kind of model that only exists for complaints", "correct": false, "feedback": "The blueprint is ordinary BERT; only its weights are special." },
    { "text": "All the German texts it was trained on", "correct": false, "feedback": "Training data is not part of a checkpoint; only the learned weights are." }
  ],
  "explanation": "Architecture = blueprint; checkpoint = one set of learned weights for it."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "finetune-bias", "level": "highschool", "purpose": "transfer",
  "misconception": "finetune-removes-bias",
  "question": "A pretrained model often links \"nurse\" with \"she\". It is fine-tuned on 2,000 neutral hospital notes. What is most likely?",
  "options": [
    { "text": "Much of the link is still there", "correct": true, "feedback": "Yes. A small fine-tune barely touches what was learned from billions of words." },
    { "text": "The link is gone", "correct": false, "feedback": "2,000 notes are too few to undo patterns learned from a huge corpus." },
    { "text": "The model forgets all German and English", "correct": false, "feedback": "Fine-tuning changes the weights only a little." }
  ],
  "explanation": "Transfer carries everything over, including biases."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "masked-count", "level": "college", "purpose": "check",
  "objectives": ["self-supervised"],
  "title": "Masked tokens in one BERT sequence",
  "intro": "BERT picks 15 % of the 512 positions of a sequence for prediction and treats them 80 / 10 / 10. Round to whole tokens at the end.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Positions chosen for prediction", "0.15 · 512", "76.8"],
    ["… replaced by [MASK]", "0.8 · 76.8", "61.44"],
    ["… replaced by a random token", "0.1 · 76.8", "7.68"],
    ["… left unchanged but still predicted", "0.1 · 76.8", "7.68"]
  ],
  "result": { "label": "Predicted tokens per sequence (rounded)", "value": "77" },
  "explanation": "About 77 of 512 positions carry a loss. Because some chosen tokens are left unchanged or randomised, the model must build good representations for every position, not only for [MASK]."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "gpt3-flops", "level": "college", "purpose": "check",
  "objectives": ["transfer"],
  "question": "With the rule of thumb C ≈ 6 · N · D, about how many floating-point operations did training GPT-3 take (N = 175 billion parameters, D = 300 billion tokens)? Give the power of ten (for 3 · 10²³ answer 23.5).",
  "answer": 23.5, "tolerance": 0.3, "unit": "log₁₀ FLOPs",
  "explanation": "6 · 1.75 · 10¹¹ · 3 · 10¹¹ = 3.15 · 10²³, so log₁₀ ≈ 23.5. Fine-tuning the same model on 10⁷ tokens costs 30,000 times less per pass over the data, which is why everyone reuses pretrained checkpoints."
}
```

```ptf-question
{
  "kind": "free_text", "id": "head-random", "level": "college", "purpose": "check",
  "objectives": ["checkpoint", "transfer"], "misconception": "finetune-from-scratch",
  "question": "You load the checkpoint bert-base-uncased into a sequence-classification class with 3 labels and get a warning that some weights were newly initialised. Which weights, why, and what must you do before using the predictions?",
  "rubric": [
    "The classification head (final linear layer) is new and randomly initialised.",
    "The checkpoint only contains the pretrained encoder (and its pretraining heads), not a head for this 3-class task.",
    "The model must be fine-tuned on labelled data; until then its predictions are random."
  ],
  "sample_answer": "The new 3-way classification layer on top of the encoder is random, because the checkpoint was pretrained with masked language modelling and has no such head. The encoder weights are reused (transfer); I need to fine-tune on labelled examples before the outputs mean anything.",
  "explanation": "Architecture plus task head plus checkpoint: the base transfers, the head starts from scratch."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "domain-shift", "level": "college", "purpose": "check",
  "objectives": ["transfer"], "misconception": "finetune-removes-bias",
  "question": "A model pretrained on English web text is fine-tuned on 5,000 labelled Finnish legal documents and performs poorly. What is the most promising next step?",
  "options": [
    { "text": "Start from a checkpoint pretrained on Finnish (or continue pretraining on unlabelled Finnish legal text), then fine-tune", "correct": true, "feedback": "Right. Transfer works when pretraining covers the target domain." },
    { "text": "Train the same architecture from scratch on the 5,000 documents", "correct": false, "feedback": "5,000 documents are far too few to learn a language from scratch." },
    { "text": "Increase the learning rate a lot so the model forgets English", "correct": false, "feedback": "That destroys useful representations and destabilises training." }
  ],
  "explanation": "Domain-adaptive pretraining or a better-matched checkpoint is the standard fix for domain shift."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "architecture-vs-checkpoint", "level": "college", "purpose": "check",
  "objectives": ["checkpoint"], "misconception": "model-is-architecture",
  "question": "Which statements are true? (Several can be right.)",
  "options": [
    { "text": "Two checkpoints of the same architecture can give completely different predictions", "correct": true, "feedback": "Right. Same layers, different weights." },
    { "text": "A checkpoint is useless without code and a config for its architecture", "correct": true, "feedback": "Right. Weights are numbers; the architecture says how to compute with them." },
    { "text": "Fine-tuning changes the architecture", "correct": false, "feedback": "It changes weights (and may add a head); the blueprint of the base stays." },
    { "text": "A checkpoint contains the training data", "correct": false, "feedback": "Only weights (and usually tokenizer files and config)." }
  ],
  "explanation": "Keep the two words apart: architecture = structure, checkpoint = learned parameters."
}
```

# Examples

- **Cloze test**: a fill-in-the-blank worksheet is masked language modelling; the answer sheet is the original text. Breaks down: a model gets no hints and sees billions of sheets.
- **Driving lessons for a pilot**: someone who flies planes learns to drive a truck quickly because much transfers (traffic sense, controls). Breaks down: models transfer statistical features, not skills in a human sense.
- **Recipe vs. cake**: the architecture is the recipe, a checkpoint is one particular cake baked with specific ingredients (data).

# Tutor notes

- Start with the cover-the-word warm-up. The aha moment is "nobody wrote the answers"; let the learner say it before you do.
- If the learner did the llm-basics course, recall "one chunk of text holds many examples" in one sentence; the n − 1 count is the same idea.
- The `stages` station of the babbler-to-assistant simulator shows what a model can and cannot do after pretraining alone; open it only if the learner is curious about the later stages, which have their own steps in this course.

# Further reading

- [Hugging Face LLM Course, chapter 1.4: How do Transformers work?](https://huggingface.co/learn/llm-course/chapter1/4): history of transformer models, transfer learning and the cost of pretraining (highschool, college).

# Sources

Grounding: [^hf-llm-course-1-4]. Text, examples and questions are original.

[^hf-llm-course-1-4]: Hugging Face, LLM Course, chapter 1, section 4 ("How do Transformers work?"), https://huggingface.co/learn/llm-course, Apache License 2.0.
