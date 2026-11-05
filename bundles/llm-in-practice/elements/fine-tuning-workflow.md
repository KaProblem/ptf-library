---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/fine-tuning-workflow
title: Fine-tuning a pretrained model on your task
description: The full workflow for adapting a pretrained model to a labelled task - prepare and split the data, run the training loop with the right learning rate schedule, and evaluate with accuracy and F1 on data the model has not seen.
lang: en
levels: [highschool, college]
objectives:
  - id: data-prep
    text: Prepare a labelled data set for fine-tuning - tokenize it, keep separate training, validation and test splits, and batch it with dynamic padding.
  - id: training-step
    text: Put the parts of one training step in order and explain what learning rate, schedule, epochs and batch size control.
  - id: evaluate
    text: Evaluate a fine-tuned classifier on held-out data and compute accuracy, precision, recall and F1 from its predictions.
tags: [llm, fine-tuning, training-loop, evaluation, f1, trainer]
about:
  - wikidata: Q3985153
    label: training, validation, and test data sets
  - wikidata: Q6027324
    label: transfer learning
  - wikidata: Q6975395
    label: F1 score
requires:
  - ptf:el/llm-in-practice/pretraining-and-transfer
  - ptf:el/llm-in-practice/model-heads
  - ptf:el/llm-in-practice/padding-and-masks
  - ptf:el/llm-basics/bigram-model
leads_to:
  - ptf:el/llm-in-practice/learning-curves
duration_min: { highschool: 20, college: 30 }
simulators:
  - ref: ptf:sim/training-loop@^1.2.0
    levels: [highschool, college]
    role: explore
    use_when: the learner is unsure what a single training step changes and wants to watch the loss fall step by step
sources:
  - id: hf-llm-course-3
    resource: https://huggingface.co/learn/llm-course/chapter3/2
    title: "Hugging Face LLM Course, chapter 3, sections 2 to 4: processing the data, the Trainer API, a full training loop"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T23:40:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- You have a pretrained model and a few thousand labelled examples, say pairs of sentences marked "same meaning" or "different meaning". How do you turn the model into a reliable judge for exactly that?
- This step goes through the whole recipe: data in, training loop, numbers out. Every serious fine-tune, from a spam filter to a chat model, follows the same skeleton.
- Afterwards the learner can describe each stage, compute how many training steps a run has, and judge a model by accuracy and F1 on data it has never seen.

# Core

Fine-tuning has three stages. Data: tokenize every example, keep a training
split for learning, a validation split for decisions during development and
a test split for the final report, and build batches with dynamic padding.
Training: for each batch, run the model (forward pass), compute the loss,
compute gradients (backward pass), let the optimizer update the weights
with a small learning rate that warms up and then decays, and reset the
gradients; repeat for a few epochs. Evaluation: switch off dropout and
gradient tracking, predict on held-out data and compute metrics such as
accuracy and F1, which balances precision and recall.

# Key facts

- Example data set: MRPC (sentence pairs, "paraphrase or not"): 3,668 training, 408 validation and 1,725 test pairs. Sentence pairs are tokenized together: `[CLS] A [SEP] B [SEP]`, with `token_type_ids` 0 for A and 1 for B in BERT.
- Tokenize the whole data set once with a batched map; pad later, per batch, with a data collator (dynamic padding).
- **One training step**: forward pass → loss → backward pass (gradients) → optimizer step (update weights) → scheduler step (update learning rate) → zero the gradients.
- **Epoch**: one pass over the training data. Steps per epoch = ⌈N / batch size⌉; for MRPC with batch size 8: ⌈3,668 / 8⌉ = 459, so 3 epochs = 1,377 steps.
- **Learning rate**: for fine-tuning BERT-sized models typically 2 · 10⁻⁵ to 5 · 10⁻⁵, far smaller than for training from scratch, so pretrained knowledge is adjusted, not overwritten. A **linear schedule** lowers it from the start value to 0 over all steps, often after a short warm-up.
- **AdamW**: Adam with decoupled weight decay (weight decay is applied directly to the weights, not mixed into the gradient). The standard optimizer for transformers.
- **Gradient accumulation**: add up gradients over k small batches before one optimizer step; effective batch size = batch size · k · number of devices.
- `model.train()` turns dropout on; `model.eval()` turns it off; evaluation runs under `torch.no_grad()` to save memory.
- **Metrics**: accuracy = correct / all. Precision = TP / (TP + FP), recall = TP / (TP + FN), F1 = 2 · P · R / (P + R). With imbalanced classes, accuracy can look good while F1 for the rare class is poor.
- The validation split guides choices (learning rate, epochs); the test split is used once at the end. Tuning on the test split makes the reported score too optimistic.
- The `Trainer` class of the Transformers library runs this loop for you; writing the loop yourself (or with Accelerate for several GPUs) gives full control.

# Level: highschool

<!-- ptf:text v1 -->

Picture a driving instructor who already drives perfectly and now has to
learn the rules of one particular country. She practises on a set of
local road situations (training), you test her on a few others during the
course to decide when she is ready (validation), and the official exam
uses situations neither of you has seen (test). If you practised on the
exam questions, a pass would mean nothing.

Fine-tuning works the same way. First the **data**: every example, for
instance two sentences and the label "same meaning" or not, is turned
into tokens. The examples are split into those three groups. During
training they are served in small batches of, say, 8 examples, padded
only as much as each batch needs.

Then the **training loop**. For each batch: the model makes its
predictions, a number called the loss measures how wrong they were, the
computer works out for every weight in which direction it should move to
make the loss smaller, and all weights take a tiny step in that
direction. The size of that step is the **learning rate**. It is tiny,
about 0.00003, because the model already knows a lot and should only be
adjusted, not retrained. Going through all training examples once is an
**epoch**; usually two to four epochs are enough. With 3,668 examples and
batches of 8 that is 459 steps per epoch.

Finally the **evaluation**: the model answers the test examples and you
count. Accuracy is the share of right answers. But if only 5 % of all
e-mails are spam, a model that never says "spam" is 95 % accurate and
completely useless. So you also check, for the important class: of all
the times the model said "spam", how many were spam (precision), and of
all the spam, how much did it catch (recall)? F1 combines both into one
number.

# Level: college

<!-- ptf:text v1 -->

Sketch the minimal training loop from memory before reading on; then
compare.

```python
model.train()
for epoch in range(num_epochs):
    for batch in train_dataloader:          # collator pads per batch
        outputs = model(**batch)            # forward; loss computed from labels
        outputs.loss.backward()             # gradients
        optimizer.step()                    # AdamW update
        lr_scheduler.step()                 # linear decay
        optimizer.zero_grad()
```

**Data.** `dataset.map(tokenize_fn, batched=True)` tokenizes once (fast,
cached); pairs go in as `tokenizer(a, b, truncation=True)`. Drop raw
string columns, rename the label column to `labels`, and let
`DataCollatorWithPadding` pad each batch to its own maximum. Keep
validation and test splits untouched by any decision made from the test.

**Optimisation.** AdamW with lr around 2–5 · 10⁻⁵, weight decay about
0.01, a linear schedule from lr to 0 over T = epochs · ⌈N / B⌉ steps
(MRPC, B = 8, 3 epochs: T = 1,377), optionally with warm-up. Small
learning rates matter because large updates destroy pretrained features
(catastrophic forgetting) and destabilise the randomly initialised head.
AdamW decouples weight decay from the adaptive gradient scaling, which
plain L2 regularisation inside Adam does not. Gradient accumulation and
mixed precision (fp16/bf16) let large effective batches fit in memory;
effective batch = B · accumulation steps · devices.

**Evaluation.** `model.eval()` disables dropout, `torch.no_grad()` skips
the autograd graph; gather predictions (argmax of logits) across the
split, then compute metrics. For binary tasks report accuracy and F1 of
the positive class; for imbalanced multi-class, macro-F1. A confusion
matrix shows which errors dominate. Accuracy on MRPC around 85 % with a
BERT-sized model is typical; a far higher number on a small split should
make you check for leakage before celebrating.

The `Trainer` wraps exactly this loop with logging, evaluation per epoch,
checkpointing and multi-device support; Accelerate gives the same
portability for a hand-written loop.

# Misconceptions

- **test-for-tuning**: It is fine to pick the best epoch or learning rate by looking at the test set → that is what the validation split is for; the test split is used once, or the score is too optimistic.
- **big-lr-faster**: A larger learning rate just makes fine-tuning faster → it can overwrite pretrained knowledge and make training unstable; fine-tuning uses small rates.
- **accuracy-enough**: High accuracy means a good model → with imbalanced classes a useless model can have high accuracy; check precision, recall and F1.
- **forget-zero-grad**: Gradients are replaced automatically at every step → in PyTorch they accumulate until reset, so forgetting `zero_grad()` adds up gradients of all previous batches.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "three-splits", "level": "highschool", "purpose": "check",
  "objectives": ["data-prep"], "misconception": "test-for-tuning",
  "question": "Why do we keep a test split that is never used during training or for decisions?",
  "options": [
    { "text": "So the final score shows how the model does on truly unseen examples", "correct": true, "feedback": "Right. Like an exam with questions nobody practised." },
    { "text": "To save memory during training", "correct": false, "feedback": "It is about an honest measurement, not memory." },
    { "text": "Because the model cannot read the test examples", "correct": false, "feedback": "It could; we deliberately keep them away." }
  ],
  "explanation": "Training data teaches, validation data guides decisions, test data gives the final, honest grade."
}
```

```ptf-question
{
  "kind": "ordering", "id": "step-order", "level": "highschool", "purpose": "check",
  "objectives": ["training-step"], "misconception": "forget-zero-grad",
  "instruction": "Put one training step in order.",
  "items": [
    "The model makes predictions for the batch",
    "The loss measures how wrong they were",
    "For every weight, work out which direction lowers the loss (gradients)",
    "All weights take a small step in that direction",
    "Clear the gradients for the next batch"
  ],
  "explanation": "Forward, loss, backward, update, reset. Then the next batch."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "steps-per-run", "level": "highschool", "purpose": "check",
  "objectives": ["training-step"],
  "question": "A training set has 2,000 examples. Batches hold 16 examples, and training runs for 3 epochs. How many training steps is that?",
  "answer": 375, "tolerance": 0, "unit": "steps",
  "explanation": "2,000 / 16 = 125 steps per epoch, times 3 epochs = 375 steps."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "small-lr", "level": "highschool", "purpose": "check",
  "objectives": ["training-step"], "misconception": "big-lr-faster",
  "question": "Why is the learning rate for fine-tuning so tiny (about 0.00003)?",
  "options": [
    { "text": "The model already knows a lot; big steps would destroy that knowledge", "correct": true, "feedback": "Right. Fine-tuning should adjust, not rebuild." },
    { "text": "Computers cannot work with larger numbers", "correct": false, "feedback": "They can; it is a deliberate choice." },
    { "text": "A tiny learning rate makes training faster", "correct": false, "feedback": "It makes each step smaller, not faster." }
  ],
  "explanation": "Small steps keep the pretrained knowledge and only tune it to the task."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "spam-accuracy", "level": "highschool", "purpose": "check",
  "objectives": ["evaluate"], "misconception": "accuracy-enough",
  "question": "5 % of all e-mails are spam. A model always answers \"not spam\". What is true?",
  "options": [
    { "text": "Its accuracy is 95 %, but it catches no spam at all, so its recall for spam is 0", "correct": true, "feedback": "Right. Accuracy alone hides this." },
    { "text": "Its accuracy is 5 %", "correct": false, "feedback": "It is right on all the 95 % normal e-mails." },
    { "text": "It is a good model because 95 % is high", "correct": false, "feedback": "It is useless for its purpose: finding spam." }
  ],
  "explanation": "With rare classes, look at precision, recall and F1 of the class you care about."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "precision-simple", "level": "highschool", "purpose": "check",
  "objectives": ["evaluate"],
  "question": "A spam filter marked 50 e-mails as spam; 40 of them really were spam. There were 80 spam e-mails in total. What is its recall in percent?",
  "answer": 50, "tolerance": 0, "unit": "%",
  "explanation": "Recall = caught spam / all spam = 40 / 80 = 50 %. (Precision = 40 / 50 = 80 %.)"
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "dynamic-collator", "level": "college", "purpose": "check",
  "objectives": ["data-prep"],
  "question": "Which preparation steps are right for fine-tuning BERT on sentence pairs? (Several can be right.)",
  "options": [
    { "text": "Tokenize both sentences in one call so they become [CLS] A [SEP] B [SEP] with token_type_ids", "correct": true, "feedback": "Right. The model sees the pair as one sequence with segment IDs." },
    { "text": "Tokenize with dataset.map(…, batched=True) and pad per batch with a data collator", "correct": true, "feedback": "Right. Fast tokenization once, dynamic padding later." },
    { "text": "Pad the whole data set to the longest example before training", "correct": false, "feedback": "Wasteful: dynamic padding pads each batch only to its own maximum." },
    { "text": "Merge validation and test into the training set to have more data", "correct": false, "feedback": "Then there is nothing left to evaluate honestly." }
  ],
  "explanation": "Pairs as one sequence, tokenize once, pad per batch, keep the splits apart."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "schedule", "level": "college", "purpose": "check",
  "objectives": ["training-step"], "misconception": "big-lr-faster",
  "title": "Steps and linear learning-rate decay",
  "intro": "MRPC training set: 3,668 pairs, batch size 8, 3 epochs, start learning rate 5 · 10⁻⁵ decaying linearly to 0 without warm-up. Give the learning rate in units of 10⁻⁵.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Steps per epoch", "⌈3,668 / 8⌉", "459"],
    ["Total steps T", "3 · 459", "1377"],
    ["LR after step 459 (·10⁻⁵)", "5 · (1 − 459 / 1,377)", "3.333"]
  ],
  "result": { "label": "LR after step 1,000 (·10⁻⁵)", "value": "1.369" },
  "explanation": "lr(t) = lr₀ · (1 − t / T). After one epoch two thirds of the rate remain; near the end the updates become very small, which stabilises the final weights."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "effective-batch", "level": "college", "purpose": "check",
  "objectives": ["training-step"],
  "question": "Per-device batch size 4, gradient accumulation over 8 steps, 2 GPUs. What is the effective batch size of one optimizer step?",
  "answer": 64, "tolerance": 0, "unit": "examples",
  "explanation": "4 · 8 · 2 = 64 examples contribute to every weight update."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "f1-from-matrix", "level": "college", "purpose": "check",
  "objectives": ["evaluate"], "misconception": "accuracy-enough",
  "title": "Metrics from a confusion matrix",
  "intro": "A paraphrase classifier on 400 validation pairs: TP = 240, FP = 30, FN = 40, TN = 90 (positive = paraphrase). Round to three decimals.",
  "columns": ["Metric", "Formula", "Value"],
  "rows": [
    ["Accuracy", "(TP + TN) / all", "0.825"],
    ["Precision", "TP / (TP + FP)", "0.889"],
    ["Recall", "TP / (TP + FN)", "0.857"]
  ],
  "result": { "label": "F1", "value": "0.873" },
  "explanation": "F1 = 2 · P · R / (P + R) = 2 · 0.889 · 0.857 / 1.746 ≈ 0.873. F1 is the harmonic mean, so it is pulled towards the weaker of precision and recall."
}
```

```ptf-question
{
  "kind": "free_text", "id": "eval-mode", "level": "college", "purpose": "check",
  "objectives": ["evaluate", "training-step"], "misconception": "forget-zero-grad",
  "question": "A colleague's evaluation numbers change slightly every time they run evaluation on the same checkpoint, and GPU memory runs out during evaluation. Name the two lines most likely missing and what each does.",
  "rubric": [
    "model.eval(): turns off dropout (and other training-only behaviour), so predictions are deterministic.",
    "torch.no_grad() (or inference_mode): no autograd graph is built, saving memory."
  ],
  "sample_answer": "They forgot model.eval(), so dropout is still active and predictions vary from run to run, and they evaluate without torch.no_grad(), so PyTorch stores activations for a backward pass that never comes and memory fills up.",
  "explanation": "Training mode and gradient tracking are for training only."
}
```

# Examples

- **Driving instructor abroad**: an expert driver learns local rules quickly (fine-tuning), practises on training situations, is checked on validation situations and takes an unseen exam (test). Breaks down: a model does not understand rules; it adjusts weights.
- **Fishing net**: precision is how much of the catch is the fish you wanted, recall how many of those fish in the lake you caught.

# Tutor notes

- Learners who did the llm-basics course know the training loop from the bigram model; recall it in one sentence and focus on what is new: pretrained start, tiny learning rate, three splits, metrics.
- Let the learner compute the steps of a run by hand once; afterwards numbers in training logs make sense.
- At highschool level skip AdamW and accumulation; at college level, ask the learner to write the loop from memory before showing it.
- The `training-loop` simulator only helps if the learner is unsure what one update does; otherwise skip it.

# Further reading

- [Hugging Face LLM Course, chapter 3: Fine-tuning a pretrained model](https://huggingface.co/learn/llm-course/chapter3/2): MRPC with `datasets`, the `Trainer` API and a hand-written loop with Accelerate (college).

# Sources

Grounding: [^hf-llm-course-3]. Text, examples and questions are original.

[^hf-llm-course-3]: Hugging Face, LLM Course, chapter 3 ("Fine-tuning a pretrained model"), sections 2 to 4, https://huggingface.co/learn/llm-course, Apache License 2.0.
