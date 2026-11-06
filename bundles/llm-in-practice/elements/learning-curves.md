---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/learning-curves
title: Reading learning curves
description: Training and validation curves tell you whether a fine-tune is healthy, overfitting, underfitting or unstable, and what to change; early stopping keeps the best checkpoint.
lang: en
levels: [highschool, college]
objectives:
  - id: read-curves
    text: Read training and validation loss curves and name the pattern - healthy, overfitting, underfitting or unstable.
  - id: remedies
    text: Choose a fitting remedy for each pattern, including early stopping with patience.
  - id: loss-vs-accuracy
    text: Explain why accuracy curves move in steps and why validation loss and accuracy can disagree.
tags: [llm, training, overfitting, underfitting, early-stopping, learning-curves]
about:
  - wikidata: Q331309
    label: overfitting
  - wikidata: Q5326898
    label: early stopping
requires:
  - ptf:el/llm-in-practice/fine-tuning-workflow
leads_to:
  - ptf:el/llm-in-practice/supervised-fine-tuning
duration_min: { highschool: 15, college: 20 }
simulators:
  - ref: ptf:sim/bigram-lab@^1.1.0
    station: training-curve
    levels: [highschool, college]
    role: explore
    use_when: the learner has never watched a training and a validation curve separate on real data
sources:
  - id: hf-llm-course-3-5
    resource: https://huggingface.co/learn/llm-course/chapter3/5
    title: "Hugging Face LLM Course, chapter 3, section 5: Understanding learning curves"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T23:50:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- A fine-tune prints hundreds of loss values. Two lines drawn from them, one for training and one for validation, tell you more about the run than any single number.
- This step teaches four shapes to recognise (healthy, overfitting, underfitting, unstable) and what to do about each.
- Afterwards the learner can look at a training log, say whether the model is still learning, memorising or stuck, and decide when to stop.

# Core

The training loss shows how well the model fits the examples it learns from;
the validation loss shows how well it does on examples it never trains on.
In a healthy run both fall and level off close together. If the training
loss keeps falling while the validation loss turns up, the model is
memorising the training data (overfitting): stop at the validation minimum
or regularise. If both stay high, the model is not learning enough
(underfitting): train longer, use a bigger model or a better learning rate.
Spikes and divergence point to a learning rate that is too high. Accuracy
changes only when predictions flip, so its curve moves in steps and can stay
flat while the loss already worsens.

# Key facts

- **Training loss**: logged every few steps; noisy because each batch differs, so look at a smoothed curve. **Validation loss**: computed on the whole validation split, usually once per epoch or every N steps.
- **Healthy**: both fall, flatten, and stay close; a small gap is normal.
- **Overfitting**: training loss keeps falling, validation loss reaches a minimum and rises again. The gap grows. Remedies: early stopping, more or more varied data, regularisation (weight decay, dropout), fewer epochs, a smaller learning rate.
- **Underfitting**: both losses stay high or flatten early at a high value. Remedies: more epochs, a larger learning rate or model, check the data and labels, check that the right weights are trainable.
- **Unstable**: spikes, oscillation or a loss that shoots up (divergence, NaN). Remedies: lower learning rate, warm-up, gradient clipping, larger batch, check for bad examples.
- **Early stopping with patience p**: after each evaluation keep the checkpoint if the validation loss is the best so far; stop when it has not improved for p evaluations in a row. Validation losses 0.62, 0.48, 0.41, 0.39, 0.40, 0.43, 0.47 with patience 2: the best is epoch 4 (0.39), training stops after epoch 6.
- **Accuracy moves in steps**: one validation example changes accuracy by 1 / N; for 408 examples that is about 0.25 percentage points. It changes only when a prediction crosses the decision threshold.
- **Loss and accuracy can disagree**: the model can become more confident in its wrong predictions (validation loss rises) while the same predictions stay right or wrong (accuracy flat). Rising validation loss is often the earlier warning.
- In fine-tuning, overfitting often starts after only 2 to 4 epochs because the data sets are small.

# Level: highschool

<!-- ptf:text v1 -->

Think of learning for a test with a practice book. In the first days you
get better at the practice questions and at new questions. After a while
you know the practice answers by heart: your practice score keeps going
up, but on new questions you stop improving and even get worse, because
you remember answers instead of understanding. That is **overfitting**.

A model shows the same thing in two curves. The **training loss** says how
wrong the model is on the examples it practises with. The **validation
loss** says how wrong it is on examples it never practises with. Lower is
better for both.

There are four shapes worth knowing:

1. **Healthy**: both lines go down and flatten out close together.
2. **Overfitting**: the training line keeps going down, but the
   validation line has a lowest point and then climbs. Stop at the lowest
   point; that model is the best one.
3. **Underfitting**: both lines stay high. The model has not learned
   enough: train longer, or give it more capacity.
4. **Unstable**: the lines jump up and down wildly or shoot up. The steps
   the model takes are too big: lower the learning rate.

A simple rule finds the best moment automatically, called **early
stopping**: remember the best validation result so far, and if it has not
improved for, say, two checks in a row, stop and keep the best model.

The accuracy curve, the share of right answers, looks like stairs rather
than a smooth line. With 400 test examples, accuracy can only change in
steps of one example, a quarter of a percent, and only when an answer
actually flips from wrong to right.

# Level: college

<!-- ptf:text v1 -->

Before reading on, sketch training and validation loss against steps for
a model fine-tuned 10 epochs on 2,000 examples. Most people draw both
falling forever; the validation curve almost never does that.

The training loss estimates the empirical risk on data the optimiser
sees; the validation loss estimates the generalisation risk. Their gap is
the generalisation gap. Diagnose by shape:

| Pattern | Training loss | Validation loss | First remedies |
| --- | --- | --- | --- |
| Healthy | falls, flattens | falls, flattens, small gap | none; maybe stop earlier |
| Overfitting | keeps falling | minimum, then rises | early stopping, weight decay, dropout, more data or augmentation, fewer epochs |
| Underfitting | high, flat | high, flat | more steps, higher LR, larger model, check data and frozen layers |
| Unstable | spikes, divergence | erratic | lower LR, warm-up, gradient clipping, larger batch |

Early stopping is a regulariser: with patience p, keep the checkpoint with
the best validation metric and stop after p evaluations without
improvement (Hugging Face: `EarlyStoppingCallback` with
`load_best_model_at_end=True` and `metric_for_best_model`). With
validation losses 0.62, 0.48, 0.41, 0.39, 0.40, 0.43, 0.47 and p = 2,
the best is epoch 4 and training stops after epoch 6.

Accuracy is a step function of the logits: argmax only changes when a
margin crosses zero, so validation accuracy moves in increments of 1 / N
and plateaus. Cross-entropy, by contrast, penalises confidence, so it can
rise while accuracy is flat, typically when the model grows overconfident
on the examples it gets wrong. Treat a rising validation loss as an early
warning and pick the checkpoint by the metric you actually care about.

Noise: per-step training loss varies with batch composition; use an
exponential moving average to read the trend. A sudden drop at an epoch
boundary in the training loss (while validation does not move) is a
classic sign of memorisation: the model sees the same examples again.

# Misconceptions

- **lower-train-better**: The lower the training loss, the better the model → only the validation (and finally test) loss shows how well it generalises; a falling training loss can mean memorising.
- **more-epochs-better**: Training longer always helps → after the validation minimum, more epochs make the model worse on new data.
- **loss-accuracy-same**: Validation loss and accuracy always move together → accuracy can stay flat while loss rises (overconfidence on wrong answers).
- **spikes-normal**: Big spikes and a loss that shoots up are normal noise → they usually mean the learning rate is too high or the data has bad examples.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "practice-book", "level": "highschool", "purpose": "warmup",
  "question": "You study with a practice book until you know every answer by heart. Your practice score is 100 %, but on new questions you do worse than a week ago. What happened?",
  "options": [
    { "text": "You memorised the answers instead of the ideas", "correct": true, "feedback": "Right. Models do exactly this; it is called overfitting." },
    { "text": "The new questions were unfair", "correct": false, "feedback": "Maybe, but you were better at them a week ago." },
    { "text": "Nothing; 100 % means you understood everything", "correct": false, "feedback": "100 % on practised questions says little about new ones." }
  ],
  "explanation": "Doing well on what you practised and doing well on new things are different. Models are judged by the second."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "name-pattern", "level": "highschool", "purpose": "check",
  "objectives": ["read-curves"], "misconception": "lower-train-better",
  "question": "The training loss keeps going down. The validation loss went down for three epochs and has risen for the last two. What is this?",
  "options": [
    { "text": "Overfitting", "correct": true, "feedback": "Right. The model gets better at its practice examples and worse at new ones." },
    { "text": "Underfitting", "correct": false, "feedback": "Underfitting means both losses stay high." },
    { "text": "A healthy run", "correct": false, "feedback": "In a healthy run the validation loss does not climb again." }
  ],
  "explanation": "A rising validation loss while the training loss falls is the signature of overfitting."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "both-high", "level": "highschool", "purpose": "check",
  "objectives": ["read-curves", "remedies"],
  "question": "Both losses stay high and flat from the start. What should you try first?",
  "options": [
    { "text": "Train longer or give the model more capacity, and check the data and the learning rate", "correct": true, "feedback": "Right. The model is underfitting: it has not learned enough." },
    { "text": "Stop training earlier", "correct": false, "feedback": "Stopping earlier helps against overfitting, not underfitting." },
    { "text": "Add more regularisation", "correct": false, "feedback": "That would make learning even harder." }
  ],
  "explanation": "Underfitting needs more learning; overfitting needs less."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "early-stop-epoch", "level": "highschool", "purpose": "check",
  "objectives": ["remedies"], "misconception": "more-epochs-better",
  "question": "Validation losses after epochs 1 to 7: 0.70, 0.55, 0.50, 0.47, 0.49, 0.52, 0.56. Early stopping keeps the best model. Which epoch's model is kept?",
  "answer": 4, "tolerance": 0, "unit": "epoch",
  "explanation": "The lowest validation loss is 0.47 after epoch 4; later epochs only got worse."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "jumpy", "level": "highschool", "purpose": "check",
  "objectives": ["remedies", "read-curves"], "misconception": "spikes-normal",
  "question": "The training loss jumps up and down wildly and suddenly shoots up to a huge value. What is the most likely fix?",
  "options": [
    { "text": "Lower the learning rate", "correct": true, "feedback": "Right. The steps are too big, so the model overshoots." },
    { "text": "Train for more epochs", "correct": false, "feedback": "More of an unstable run does not make it stable." },
    { "text": "Use fewer validation examples", "correct": false, "feedback": "The problem is in training, not in validation." }
  ],
  "explanation": "Unstable curves are usually a learning rate that is too high."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "stairs", "level": "highschool", "purpose": "check",
  "objectives": ["loss-vs-accuracy"], "misconception": "loss-accuracy-same",
  "question": "Why does the accuracy curve look like stairs instead of a smooth line?",
  "options": [
    { "text": "Accuracy changes only when an answer flips from wrong to right or back, one example at a time", "correct": true, "feedback": "Right. Small improvements in confidence do not show up." },
    { "text": "The computer rounds accuracy to whole numbers", "correct": false, "feedback": "It is not rounding; it is counting right answers." },
    { "text": "Accuracy is only measured once at the end", "correct": false, "feedback": "It is measured repeatedly; it just moves in jumps." }
  ],
  "explanation": "Loss sees every change in confidence; accuracy only sees flips."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "patience", "level": "college", "purpose": "check",
  "objectives": ["remedies"], "misconception": "more-epochs-better",
  "title": "Early stopping with patience 2",
  "intro": "Validation losses per epoch: 0.62, 0.48, 0.41, 0.39, 0.40, 0.43, 0.47. After each epoch, write the number of epochs without improvement.",
  "columns": ["Epoch", "Validation loss", "Epochs without improvement"],
  "rows": [
    ["3", "0.41", "0"],
    ["4", "0.39", "0"],
    ["5", "0.40", "1"],
    ["6", "0.43", "2"]
  ],
  "result": { "label": "Epoch of the checkpoint that is kept", "value": "4" },
  "explanation": "The counter reaches the patience of 2 after epoch 6, so training stops there, and the best checkpoint (epoch 4, 0.39) is loaded. Epoch 7 is never run."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "accuracy-step", "level": "college", "purpose": "check",
  "objectives": ["loss-vs-accuracy"],
  "question": "The validation split has 408 examples. By how many percentage points does validation accuracy change when one more example is predicted correctly?",
  "answer": 0.245, "tolerance": 0.01, "unit": "percentage points",
  "explanation": "1 / 408 ≈ 0.00245 = 0.245 percentage points. Differences smaller than a few of these steps between two runs are noise."
}
```

```ptf-question
{
  "kind": "free_text", "id": "loss-up-acc-flat", "level": "college", "purpose": "check",
  "objectives": ["loss-vs-accuracy", "read-curves"], "misconception": "loss-accuracy-same",
  "question": "From epoch 3 to 5, validation accuracy stays at 86.0 % but validation loss rises from 0.33 to 0.41. Explain how both can be true and which checkpoint you would keep.",
  "rubric": [
    "Cross-entropy penalises confidence; the model becomes more confident on the examples it gets wrong (or less confident on right ones near the margin) without flipping predictions.",
    "Accuracy only changes when argmax flips, so it can stay flat.",
    "Rising validation loss is an early sign of overfitting; keep epoch 3 (or the checkpoint best on the metric that matters, and stop soon)."
  ],
  "sample_answer": "The same examples are right and wrong in all three epochs, so accuracy is flat, but the model grows more confident in its mistakes, which cross-entropy punishes heavily. That is the start of overfitting; I would keep epoch 3 and stop.",
  "explanation": "Loss is sensitive to calibration; accuracy is not."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "diagnose-table", "level": "college", "purpose": "check",
  "objectives": ["read-curves", "remedies"], "misconception": "spikes-normal",
  "question": "Which diagnoses and remedies fit? (Several can be right.)",
  "options": [
    { "text": "Training loss drops sharply at each epoch boundary, validation flat → memorisation; consider fewer epochs or more data", "correct": true, "feedback": "Right. The drop appears when the model sees the same examples again." },
    { "text": "Loss becomes NaN after 200 steps → lower the learning rate, add warm-up or gradient clipping", "correct": true, "feedback": "Right. Divergence is an optimisation problem." },
    { "text": "Both losses plateau high from the first epoch → add dropout", "correct": false, "feedback": "That is underfitting; dropout would make it worse." },
    { "text": "Validation loss rises while training loss falls → train for more epochs", "correct": false, "feedback": "That is overfitting; stop earlier instead." }
  ],
  "explanation": "Match the shape to the cause: memorisation, divergence, underfitting, overfitting."
}
```

# Examples

- **Practice book vs. new exam**: training loss vs. validation loss. Breaks down: a model does not "understand" when it generalises; it just fits patterns that also hold outside the training set.
- **Thermostat with a too-strong heater**: an oscillating loss is like a heater that overshoots every time; turning it down (lower learning rate) calms it.

# Tutor notes

- Draw (or describe) the four shapes and let the learner name them before giving the names.
- The bigram-lab `training-curve` station shows a real training and validation curve separating; open it only if the learner has never seen one.
- At college level the loss/accuracy disagreement is the subtle point worth time; at highschool level the stairs explanation suffices.

# Further reading

- [Hugging Face LLM Course, chapter 3.5: Understanding learning curves](https://huggingface.co/learn/llm-course/chapter3/5): typical curves with plots, logging with the `Trainer` and early stopping in code (college).

# Sources

Grounding: [^hf-llm-course-3-5]. Text, examples and questions are original.

[^hf-llm-course-3-5]: Hugging Face, LLM Course, chapter 3, section 5 ("Understanding Learning Curves"), https://huggingface.co/learn/llm-course, Apache License 2.0.
