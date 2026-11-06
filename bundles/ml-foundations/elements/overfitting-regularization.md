---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/overfitting-regularization
title: Overfitting and regularization
description: A model that fits its training data too closely fails on new data; loss curves for training and validation data reveal it, and L2 regularization, early stopping and simpler models prevent it.
lang: en
levels: [highschool, college]
objectives:
  - id: generalization
    text: Explain overfitting and underfitting, and recognise each by comparing training and validation loss.
  - id: loss-curves
    text: Read training and validation loss curves over time and decide when to stop training.
  - id: regularize
    text: Compute an L2 penalty, predict how the regularization rate λ changes the weights and the fit, and name other ways to reduce overfitting.
tags: [machine-learning, overfitting, generalization, regularization, l2, early-stopping, loss-curves]
about:
  - wikidata: Q331309
    label: overfitting
  - wikidata: Q2061913
    label: regularization
requires:
  - ptf:el/ml-foundations/datasets-and-splits
leads_to:
  - ptf:el/ml-foundations/neural-networks
duration_min: { highschool: 30, college: 35 }
figures:
  - id: overfitting-curves
    objectives: [generalization, loss-curves]
    use_when: after the learner has predicted what happens to validation loss when a model trains too long
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Datasets, generalization, and overfitting: overfitting, L2 regularization, interpreting loss curves"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: 10 points that lie roughly on a line. One person draws a straight line through them; another draws a wiggly curve that hits every single point exactly. A new, eleventh point arrives. Whose prediction do you trust?
- Every flexible model can learn its training data too well: the noise and the accidents along with the pattern. The whole art of ML is to learn the pattern and not the noise, and to notice when that goes wrong.
- Afterwards the learner can diagnose overfitting and underfitting from loss values and curves, decide when to stop training, and use L2 regularization and other remedies.

# Core

A model generalizes when it does well on new data, not just on the data
it was trained on. Overfitting means the model has learned details and
noise of the training set: training loss is low but validation loss is
clearly higher, and in loss curves the validation loss starts rising
while the training loss keeps falling. Underfitting means the model is
too simple or not trained enough: both losses stay high. Regularization
trades a little training fit for better generalization. L2 regularization
adds λ times the sum of the squared weights to the loss, pulling weights
towards 0 (a larger regularization rate λ means smaller weights and a
simpler model; too large and the model underfits). Early stopping ends
training where validation loss is lowest. More and more varied data,
fewer features or a simpler model also reduce overfitting.

# Key facts

- Overfitting: training loss low, validation loss much higher (a growing gap). Underfitting: both high and close together. Good fit: both low and close.
- Loss curves: training loss usually keeps falling; validation loss falls, reaches a minimum, then rises when overfitting starts. Example validation losses per epoch: 0.90, 0.60, 0.45, 0.41, 0.43, 0.48 → best at epoch 4; early stopping keeps that model.
- L2 penalty = λ · Σ wᵢ². Weights 0.2, −0.5, 5, 1 → Σw² = 0.04 + 0.25 + 25 + 1 = 26.29; with λ = 0.1 the penalty is 2.629. The one large weight contributes 25 of 26.29.
- Total loss = data loss + λ · Σw². Model A: data loss 0.40, weights (1, 2); model B: data loss 0.35, weights (3, 4). λ = 0.01: A 0.45 < B 0.60, A wins; λ = 0.001: A 0.405 > B 0.375, B wins.
- λ = 0: no regularization. Larger λ: weights shrink towards 0 (but rarely exactly 0), training loss rises, validation loss first falls then rises. λ is tuned on the validation set.
- L1 regularization (λ · Σ|wᵢ|) pushes many weights to exactly 0 and so also removes features.
- Other remedies: more training data, data augmentation, fewer or better features, a smaller model, dropout (for neural networks).
- Strange curves are clues: training loss jumping up and down → learning rate too high or bad examples; validation loss far below training loss → leakage or a too-easy validation set.

# Level: highschool

<!-- ptf:text v1 -->

The wiggly curve through all ten points has learned every bump, including
the bumps that were only measuring errors or chance. That is
**overfitting**: excellent on the examples it saw, poor on new ones. The
straight line ignores the small bumps and catches the trend; on the
eleventh point it is likely closer.

You cannot see overfitting on the training data, because there it looks
perfect. You see it on data the model has not seen, the **validation
set**. Compare two numbers: the loss on the training set and the loss on
the validation set. Both low and close: good. Training low, validation
much higher: overfitting. Both high: **underfitting**, the model is too
simple or has not learned enough yet.

Watch both losses during training, epoch by epoch. At first both fall.
At some point the validation loss stops falling and starts to rise again,
while the training loss keeps going down: from there on, the model is
memorizing. If the validation losses are 0.90, 0.60, 0.45, 0.41, 0.43,
0.48, the best model is the one after epoch 4. Stopping there is called
**early stopping**.

Another way is to make large weights expensive. **L2 regularization**
adds a penalty to the loss: the sum of the squared weights, times a
number λ. With weights 0.2, −0.5, 5 and 1 the squares add up to 26.29,
and almost all of it comes from the 5. So the model is pushed to keep
its weights small, unless a large weight really pays off in the data. A
larger λ means a simpler, smoother model; too large and it underfits. You
find a good λ by trying a few and comparing the validation loss. More
training data helps too: it is harder to memorize a lot of examples.

# Level: college

<!-- ptf:text v1 -->

Generalization error is what matters, and it is estimated on held-out
data. Two regimes are visible from the losses: high bias (underfitting:
training and validation loss both high) and high variance (overfitting:
low training loss, a large gap to validation). Capacity (number of
parameters, feature crosses, polynomial degree, training time) moves a
model from the first regime to the second; the sweet spot is the
minimum of the validation loss.

Loss curves over iterations make this dynamic. Training loss is
non-increasing in expectation; validation loss typically has a minimum
after which it rises as the model fits noise. Early stopping returns the
parameters at that minimum (with some patience to ignore noise); it acts
like a regularizer because gradient descent from small initial weights
explores simple solutions first. Other curve shapes diagnose other
problems: oscillation (α too large), sudden spikes (bad batches or
outliers), validation consistently below training (leakage, or
regularization such as dropout active only in training).

L2 regularization minimizes L_data(w) + λ ‖w‖² (the bias is usually not
penalized). Its gradient adds 2λw, so each step multiplies the weights by
(1 − 2αλ) before the data update: weight decay. Large weights are
penalized quadratically: weights (0.2, −0.5, 5, 1) give ‖w‖² = 26.29,
dominated by the 5. The optimum balances fit and size, so the choice of
λ shifts the ranking of models: with λ = 0.01, (L = 0.40, w = (1, 2))
scores 0.45 and beats (L = 0.35, w = (3, 4)) at 0.60; with λ = 0.001 the
order flips. λ is a hyperparameter chosen on validation data, and
features must be on comparable scales for the penalty to treat them
fairly. L1 (λ Σ|wᵢ|) yields sparse solutions with many exact zeros, useful
for large feature crosses. Data remedies (more data, augmentation) reduce
variance without restricting the model.

# Misconceptions

- **low-training-loss-is-good**: A low training loss means a good model → only the validation (or test) loss shows generalization; a very low training loss with a large gap is overfitting.
- **train-until-converged**: Train until the training loss stops falling → for a flexible model, validation loss often starts rising long before; stop at its minimum.
- **regularization-improves-training-fit**: Regularization makes the model fit the training data better → it makes training loss slightly worse in exchange for better validation loss.
- **bigger-lambda-better**: More regularization is always safer → too large λ forces weights towards 0 and the model underfits.
- **l2-removes-features**: L2 sets unimportant weights exactly to 0 → L2 shrinks them; L1 produces exact zeros.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "wiggly-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "question": "Ten points lie roughly on a line. A straight line misses most points a little; a wiggly curve hits every point exactly. Which one will probably predict a new point better?",
  "options": [
    { "text": "The straight line, because the wiggles mostly follow chance bumps in these ten points", "correct": true, "feedback": "Yes: the curve learned the noise too." },
    { "text": "The wiggly curve, because it has no error on the data", "correct": false, "feedback": "No error on known points says little about new ones." },
    { "text": "Both equally", "correct": false, "feedback": "The curve swings wildly between the points, so new points are often far off." }
  ],
  "explanation": "Fitting the training data perfectly is not the goal; predicting new data is."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "diagnose-fit",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["generalization"],
  "misconception": "low-training-loss-is-good",
  "question": "Three models, losses as (training, validation): A (0.05, 0.60), B (0.55, 0.58), C (0.18, 0.21). Which statement is right?",
  "options": [
    { "text": "A overfits, B underfits, C fits well", "correct": true, "feedback": "Yes: A has a big gap, B is high on both, C is low on both." },
    { "text": "A is best because its training loss is lowest", "correct": false, "feedback": "Its validation loss is the worst: it memorized." },
    { "text": "B is best because its two losses are closest", "correct": false, "feedback": "Close, but both high: the model is too simple." }
  ],
  "explanation": "Overfitting: big gap. Underfitting: both high. Good: both low and close."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "early-stop-epoch",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["loss-curves"],
  "misconception": "train-until-converged",
  "question": "Validation loss after epochs 1 to 7: 0.92, 0.66, 0.50, 0.44, 0.43, 0.47, 0.55. The training loss keeps falling all the time. After which epoch should you keep the model?",
  "answer": 5,
  "tolerance": 0,
  "explanation": "The validation loss is lowest (0.43) after epoch 5 and rises afterwards: overfitting begins."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "curve-reading",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["loss-curves", "generalization"],
  "question": "During training, the training loss falls steadily while the validation loss falls at first and then rises. What is happening from the point where they part?",
  "options": [
    { "text": "The model starts memorizing the training data: it overfits", "correct": true, "feedback": "Yes: it still gets better on known data, worse on new data." },
    { "text": "The learning rate is too small", "correct": false, "feedback": "A too-small rate makes both curves fall slowly; it does not make validation rise." },
    { "text": "The model underfits", "correct": false, "feedback": "Underfitting keeps both losses high; here training loss is low." }
  ],
  "explanation": "Diverging curves = overfitting. Stop at the validation minimum or regularize."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "l2-penalty",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["regularize"],
  "title": "An L2 penalty",
  "intro": "A model has weights 0.2, −0.5, 5 and 1. The regularization rate is λ = 0.1.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Squares", "0.2², (−0.5)², 5², 1²", "0.04, 0.25, 25, 1"],
    ["Sum of squares", "0.04 + 0.25 + 25 + 1", "26.29"],
    ["Penalty", "0.1 · 26.29", "2.629"]
  ],
  "result": { "label": "L2 penalty", "value": "2.629" },
  "explanation": "The weight 5 contributes 25 of 26.29: L2 punishes large weights much more than small ones."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lambda-effect",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["regularize"],
  "misconception": "bigger-lambda-better",
  "question": "You raise the regularization rate λ a lot. What happens?",
  "options": [
    { "text": "The weights shrink towards 0; if λ is too large the model becomes too simple and underfits", "correct": true, "feedback": "Yes: good λ is found on the validation set." },
    { "text": "The training loss goes down", "correct": false, "feedback": "Regularization trades some training fit for simplicity: training loss goes up." },
    { "text": "The model always gets better on new data", "correct": false, "feedback": "Only up to a point; too much regularization hurts." }
  ],
  "explanation": "λ controls the balance between fitting the data and keeping weights small."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "overfit-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["generalization", "regularize"],
  "misconception": "regularization-improves-training-fit",
  "question": "A model has training loss 0.02 and validation loss 0.80. Which change is most likely to help?",
  "options": [
    { "text": "Add regularization (or stop earlier, or get more data)", "correct": true, "feedback": "Yes: the model overfits; these make it generalize better." },
    { "text": "Train for more epochs", "correct": false, "feedback": "That makes the memorizing worse." },
    { "text": "Add more features and feature crosses", "correct": false, "feedback": "More capacity usually increases overfitting." }
  ],
  "explanation": "Large gap → reduce variance: regularize, stop early, simplify, or add data."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lambda-ranking-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["regularize"],
  "question": "Model A: data loss 0.40, w = (1, 2). Model B: data loss 0.35, w = (3, 4). The objective is L_data + λ ‖w‖². Which two statements are correct?",
  "options": [
    { "text": "With λ = 0.01, A has the lower objective (0.45 vs 0.60)", "correct": true, "feedback": "A: 0.40 + 0.01 · 5; B: 0.35 + 0.01 · 25." },
    { "text": "With λ = 0.001, B has the lower objective", "correct": true, "feedback": "A: 0.405, B: 0.375." },
    { "text": "The two objectives are equal at λ = 0.005", "correct": false, "feedback": "0.40 + 5λ = 0.35 + 25λ ↔ λ = 0.0025." },
    { "text": "With λ = 0 the objective prefers A", "correct": false, "feedback": "Without the penalty only the data loss counts, and B's is lower." }
  ],
  "explanation": "λ sets the exchange rate between fit and weight size; the preferred model flips at λ = 0.0025."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "weight-decay-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["regularize"],
  "misconception": "l2-removes-features",
  "question": "With L2 regularization the gradient gets the extra term 2λw. Ignoring the data gradient, a weight w = 2 is updated with α = 0.1 and λ = 0.05. What is it after 10 steps? (three decimals)",
  "answer": 1.809,
  "tolerance": 0.002,
  "explanation": "Each step multiplies w by 1 − 2αλ = 1 − 0.01 = 0.99; 0.99^10 ≈ 0.904, so w ≈ 2 · 0.904 ≈ 1.809. The weight shrinks towards 0 but never reaches it exactly."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "curve-diagnosis-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["loss-curves", "generalization"],
  "question": "Which two curve patterns are diagnosed correctly?",
  "options": [
    { "text": "Validation loss stays clearly below training loss for the whole run, with dropout on → expected, dropout is only active in training", "correct": true, "feedback": "Yes: training loss is measured with units dropped, validation without." },
    { "text": "Validation loss reaches its minimum at epoch 12 and rises after → keep the epoch-12 parameters (early stopping)", "correct": true, "feedback": "Yes." },
    { "text": "Both losses plateau at a high value early → overfitting, increase λ", "correct": false, "feedback": "Both high is underfitting: reduce λ or add capacity." },
    { "text": "Training loss oscillates strongly from step to step → overfitting", "correct": false, "feedback": "Oscillation points to a learning rate that is too large or to noisy batches." }
  ],
  "explanation": "Gap and its trend → variance; level of both → bias; jaggedness → optimization."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "plan-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["generalization", "loss-curves", "regularize"],
  "question": "A model with many feature crosses reaches training loss 0.08 and validation loss 0.41 after 50 epochs; the validation loss was lowest (0.33) at epoch 18. You have budget for about 10 more training runs. What would you try, in what order, and how would you decide?",
  "rubric": [
    "Diagnosis: overfitting (large gap, validation minimum at epoch 18)",
    "Early stopping at the validation minimum (with patience) as a first, cheap fix",
    "Tune λ for L2 (or L1 for the sparse crosses) on a log grid using validation loss",
    "Consider fewer crosses / simpler model and more data or augmentation",
    "Decide by validation loss; touch the test set once at the end"
  ],
  "sample_answer": "It overfits. First, early stopping: keep the epoch-18 parameters, that alone gives 0.33. Then spend runs on a λ grid such as 1e-4, 1e-3, 1e-2, 1e-1 with L2, and try L1 since the crosses are sparse and many may be useless. If the gap stays large, remove the least useful crosses. Each run is judged on validation loss; the test set is used once for the final model.",
  "explanation": "Overfitting: stop early, regularize with a tuned λ, reduce capacity; decide on validation data."
}
```

# Tutor notes

- Let the learner predict what validation loss does when training goes on "too long" before showing the overfitting figure.
- At highschool keep λ concrete: compute one penalty, then ask what a bigger λ would do to the weight 5.
- This step closes the first half of the course (linear models and data). A short recap question mixing gradient descent, metrics and splits is a good review before neural networks.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Datasets, generalization, and overfitting", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
