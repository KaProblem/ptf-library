---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/gradient-descent
title: Gradient descent and hyperparameters
description: How a model finds good weights by repeatedly stepping downhill on the loss, and how the learning rate, batch size and number of epochs control that process.
lang: en
levels: [highschool, college]
objectives:
  - id: algorithm
    text: Describe the training loop of gradient descent (predict, compute the loss, compute the gradient, step against it, repeat) and say when it has converged.
  - id: update-step
    text: Compute one update w ← w − α · ∂L/∂w and predict the direction of the change.
  - id: learning-rate
    text: Predict what a too small, a good and a too large learning rate do, and recognise each in a loss curve.
  - id: batches-epochs
    text: Explain batch size, iterations and epochs, compute how many iterations a training run takes, and compare full-batch, stochastic and mini-batch gradient descent.
tags: [machine-learning, optimization, gradient-descent, learning-rate, hyperparameters, sgd]
about:
  - wikidata: Q1199743
    label: gradient descent
  - wikidata: Q65121812
    label: learning rate
  - wikidata: Q28374376
    label: hyperparameter
requires:
  - ptf:el/ml-foundations/linear-regression
leads_to:
  - ptf:el/ml-foundations/logistic-regression
duration_min: { highschool: 40, college: 40 }
figures:
  - id: learning-rates
    objectives: [learning-rate]
    use_when: after the learner has predicted what a large learning rate does, to compare the three cases side by side
simulators:
  - ref: ptf:sim/gradient-descent-lab@^1.0.0
    station: downhill
    levels: [highschool, college]
    role: explore
    use_when: the learner should feel what a gradient step is by walking down a loss curve one step at a time
  - ref: ptf:sim/gradient-descent-lab@^1.0.0
    station: learning-rate
    levels: [highschool, college]
    role: explore
    use_when: the learner has predicted what a large or small learning rate does and wants to test it
  - ref: ptf:sim/gradient-descent-lab@^1.0.0
    station: fit-line
    levels: [highschool, college]
    role: practice
    use_when: the learner should watch a line fit itself to data and the loss curve flatten
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Linear regression: gradient descent, hyperparameters"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: you stand on a foggy hillside and want to reach the valley. You can only feel the slope under your feet. What do you do? And what goes wrong if your steps are huge?
- That is how almost every ML model is trained, from a straight line to a large language model: the loss is the landscape, the weights are your position, and the gradient is the slope.
- Afterwards the learner can describe the training loop, compute an update step, choose a sensible learning rate from loss curves, and plan batches and epochs.

# Core

Gradient descent finds weights with a low loss by repeating one step:
compute the loss on some training examples, compute its gradient (the
slope of the loss with respect to each weight), and move every weight a
small step in the opposite direction, w ← w − α · ∂L/∂w. The step size α
is the learning rate: too small and training takes forever, too large and
the weights overshoot the minimum, oscillate or diverge. A model has
converged when further steps no longer lower the loss, which shows as a
flat loss curve. Hyperparameters such as the learning rate, the batch size
(examples per step) and the number of epochs (passes through the whole
training set) are set by people before training; parameters (weights and
bias) are what training learns.

# Key facts

- Update rule: w_new = w − α · ∂L/∂w (for every weight and the bias). Negative slope → w grows; positive slope → w shrinks.
- Example loss L(w) = (w − 3)², gradient 2(w − 3), start at w = 0: with α = 0.1 the first step goes to w = 0.6 (and the distance to 3 shrinks by a factor 0.8 per step); with α = 0.5 it lands on 3 in one step; with α = 1 it jumps 0 → 6 → 0 → 6 forever; with α = 1.1 it moves further away each step (diverges).
- For this loss the distance to the minimum is multiplied by |1 − 2α| per step: it shrinks for 0 < α < 1.
- Loss curve (loss vs iteration): steadily falling then flat = converged; barely falling = α too small; zig-zagging or rising = α too large.
- Batch size: full-batch uses all examples per step; stochastic gradient descent (SGD) uses 1; mini-batch uses e.g. 32 to 1,000. Smaller batches give noisier but cheaper steps.
- Iterations per epoch = number of examples / batch size. 12,000 examples with batch size 100 → 120 iterations per epoch; 20 epochs → 2,400 iterations.
- For linear regression with MSE the loss surface is a bowl (convex): there is one minimum and gradient descent with a suitable α finds it. Neural networks have more complex loss surfaces.

# Level: highschool

<!-- ptf:text v1 -->

Imagine the loss as a valley and your weight as a position on its slope.
You cannot see the bottom, but you can feel which way the ground tilts.
Gradient descent says: take a step downhill, feel again, take another
step. The **gradient** is the tilt; a step goes the opposite way.

Try it with a simple loss, L(w) = (w − 3)². Its lowest point is at w = 3,
but pretend you do not know that. At w = 0 the slope is 2 · (0 − 3) = −6:
the ground falls towards larger w. With a step size of 0.1 you move by
−0.1 · (−6) = +0.6, to w = 0.6. Repeat, and you creep towards 3, quickly
at first and then more slowly as the slope flattens.

The step size is called the **learning rate**. Make it 1 and the first
step jumps from 0 to 6, overshooting the valley; the next jumps back to 0.
You bounce forever. Make it larger still and every jump lands higher up:
training blows up. Make it tiny and you need thousands of steps. Watch a
**loss curve** (loss after each step): a good learning rate gives a curve
that drops and then flattens out. Flat means **converged**.

Real models compute the slope on a handful of examples at a time, a
**batch**, not on all of them. One pass through all the training
examples is an **epoch**. With 12,000 examples in batches of 100 you need
120 steps per epoch; 20 epochs make 2,400 steps. Learning rate, batch size
and number of epochs are **hyperparameters**: you choose them before
training, while the weights are what training finds.

# Level: college

<!-- ptf:text v1 -->

Take L(w) = (w − 3)² and start at w₀ = 0. The derivative is
L′(w) = 2(w − 3), so the update is w ← w − α · 2(w − 3), and the error
eₜ = wₜ − 3 obeys eₜ₊₁ = (1 − 2α) eₜ. For α = 0.1 the error shrinks by 0.8
per step; α = 0.5 solves it in one step; α = 1 flips the sign forever
(0, 6, 0, …); α > 1 makes |1 − 2α| > 1 and the iterates diverge. Real loss
surfaces are not this simple, but the picture holds locally: the
largest stable learning rate is set by the curvature, which is why
features on very different scales (a long, narrow valley) force a small
α and slow training.

For a model with many parameters θ the update is θ ← θ − α ∇L(θ), where the
gradient collects the partial derivatives. For linear regression with
MSE, ∂L/∂w = (2/N) Σ (y′ᵢ − yᵢ) xᵢ and ∂L/∂b = (2/N) Σ (y′ᵢ − yᵢ): each
example pushes the weights in proportion to its error and its feature
value. MSE for a linear model is convex, so gradient descent converges to
the global minimum for a small enough α.

Computing ∇L on all N examples (full batch) is exact but expensive.
Stochastic gradient descent estimates it from one example per step,
mini-batch SGD from B examples: an unbiased but noisy estimate whose
variance falls like 1/B. Noise makes the loss curve jagged and keeps the
iterates jittering near the minimum, which a decaying learning rate
reduces; it can also help escape poor regions in non-convex problems. An
epoch is N / B iterations. Hyperparameters (α, B, epochs) are tuned on
validation data; the loss curve is the main diagnostic: flat early →
α too small; oscillating or exploding (NaN) → α too large; falling then
flat → converged.

# Misconceptions

- **step-towards-gradient**: You move in the direction of the gradient → the gradient points uphill; gradient descent steps against it (minus sign).
- **bigger-rate-faster**: A larger learning rate always trains faster → beyond a point it overshoots, oscillates or diverges; the best rate is large but stable.
- **converged-means-zero-loss**: Converged means the loss is 0 → it means the loss stopped falling; it can stay well above 0.
- **epoch-is-step**: An epoch is one update step → an epoch is one pass through all training examples, which takes N / batch size steps.
- **hyperparameters-are-learned**: The learning rate is learned during training like the weights → hyperparameters are set before training (and tuned by comparing runs); parameters are learned.
- **sgd-noise-is-a-bug**: The jagged loss curve of mini-batch training means something is broken → noise is expected because each batch is a sample; the trend is what matters.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "foggy-hill",
  "level": "highschool",
  "purpose": "warmup",
  "question": "You stand on a foggy hill and want to get to the valley. You can only feel the slope under your feet. What is a good strategy?",
  "options": [
    { "text": "Take a small step in the direction that goes down most steeply, then feel again", "correct": true, "feedback": "Yes: that is gradient descent." },
    { "text": "Take one giant step in any direction", "correct": false, "feedback": "You might land on another hill: big steps can overshoot." },
    { "text": "Walk in the direction where the ground rises", "correct": false, "feedback": "That goes uphill, away from the valley." }
  ],
  "explanation": "Feel the slope, step against it, repeat: the loss is the hill, the weights are your position."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "training-loop",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["algorithm"],
  "instruction": "Put one step of gradient descent in order.",
  "items": [
    "Make predictions for a batch of examples with the current weights",
    "Compute the loss by comparing predictions with the labels",
    "Compute the gradient: which way each weight should move to lower the loss",
    "Move each weight a small step against its gradient",
    "Repeat with the next batch until the loss stops falling"
  ],
  "explanation": "Predict, measure, find the slope, step, repeat. When the loss stops falling, training has converged."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "one-step",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["update-step"],
  "misconception": "step-towards-gradient",
  "question": "The loss is L(w) = (w − 3)². At w = 0 its slope is −6. With learning rate 0.1, where is w after one step w ← w − 0.1 · slope?",
  "answer": 0.6,
  "tolerance": 0,
  "explanation": "w = 0 − 0.1 · (−6) = 0.6. The slope is negative (the loss falls to the right), so w moves right, towards 3."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rate-effects",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["learning-rate"],
  "misconception": "bigger-rate-faster",
  "question": "Same loss L(w) = (w − 3)², start at w = 0. With learning rate 1, the first step goes to w = 6 and the second back to w = 0. What does that tell you?",
  "options": [
    { "text": "The learning rate is too large: the steps overshoot the valley and bounce forever", "correct": true, "feedback": "Yes: the loss never goes down. A smaller rate would settle at 3." },
    { "text": "The learning rate is too small", "correct": false, "feedback": "Too small would creep slowly towards 3, not jump past it." },
    { "text": "Training converged after two steps", "correct": false, "feedback": "Converged means the loss stopped falling at a low point; here it never falls." },
    { "text": "A larger learning rate would fix it by reaching 3 faster", "correct": false, "feedback": "Larger steps overshoot even more and the weight runs away." }
  ],
  "explanation": "Too large: overshoot, oscillation or divergence. Too small: slow. Good: falls fast, then flattens."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "read-loss-curve",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["learning-rate", "algorithm"],
  "misconception": "converged-means-zero-loss",
  "question": "A loss curve falls quickly for 200 steps and then stays flat at 4.1 for another 800 steps. What is the best reading?",
  "options": [
    { "text": "The model has converged; more steps with this setup will not help", "correct": true, "feedback": "Yes: flat means converged, even though the loss is not 0." },
    { "text": "The learning rate is far too large", "correct": false, "feedback": "Too large would zig-zag or rise, not fall smoothly and settle." },
    { "text": "Training has not started yet because the loss is not 0", "correct": false, "feedback": "Most models never reach a loss of 0; flat is what converged looks like." }
  ],
  "explanation": "Convergence = the loss stops improving. To get lower, change the model or data, not the number of steps."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "epochs-iterations",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["batches-epochs"],
  "misconception": "epoch-is-step",
  "text": "A training set has 12,000 examples and the batch size is 100. One epoch takes {{1}} update steps, and 20 epochs take {{2}} steps.",
  "gaps": [
    { "answer": "120" },
    { "answer": "2400", "accepted": ["2,400", "2 400"] }
  ],
  "explanation": "Steps per epoch = 12,000 / 100 = 120; 20 epochs = 2,400 steps."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "hyper-or-param",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["batches-epochs"],
  "misconception": "hyperparameters-are-learned",
  "question": "Which of these is learned during training, rather than chosen before it?",
  "options": [
    { "text": "The weight of the feature 'distance' in a delivery-time model", "correct": true, "feedback": "Yes: weights and bias are the parameters training finds." },
    { "text": "The learning rate", "correct": false, "feedback": "It is a hyperparameter: chosen before training." },
    { "text": "The batch size", "correct": false, "feedback": "A hyperparameter: how many examples per step." },
    { "text": "The number of epochs", "correct": false, "feedback": "A hyperparameter: how many passes through the data." }
  ],
  "explanation": "Parameters are learned; hyperparameters steer the learning."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gd-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["update-step", "learning-rate"],
  "misconception": "step-towards-gradient",
  "question": "At the current weight the loss rises when the weight gets larger (the slope is positive). What does gradient descent do with the weight?",
  "options": [
    { "text": "Makes it a little smaller", "correct": true, "feedback": "Yes: it steps against the slope, so the loss falls." },
    { "text": "Makes it a little larger", "correct": false, "feedback": "That follows the slope uphill, so the loss would rise." },
    { "text": "Leaves it unchanged until the slope is negative", "correct": false, "feedback": "Any non-zero slope gives a step; only a slope of 0 means stay." }
  ],
  "explanation": "w ← w − α · slope: positive slope → w decreases."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "linreg-gradient-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["update-step", "algorithm"],
  "title": "One gradient step for y′ = w · x",
  "intro": "Data (x, y): (1, 2), (2, 4), (3, 6). Model y′ = w · x without bias, loss MSE, start w = 0, learning rate α = 0.05. ∂L/∂w = (2/N) Σ (y′ᵢ − yᵢ) xᵢ.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Predictions", "w · x for x = 1, 2, 3", "0, 0, 0"],
    ["Σ (y′ − y) · x", "(−2) · 1 + (−4) · 2 + (−6) · 3", "-28"],
    ["Gradient", "(2 / 3) · (−28)", "-18.67"],
    ["New w", "0 − 0.05 · (−18.67)", "0.93"]
  ],
  "result": { "label": "w after one step", "value": "0.93" },
  "explanation": "The gradient is negative (larger w lowers the loss), so w increases towards the true value 2."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "stability-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["learning-rate"],
  "misconception": "bigger-rate-faster",
  "question": "For L(w) = (w − 3)² the error after a step is eₜ₊₁ = (1 − 2α) eₜ. Which two statements are correct?",
  "options": [
    { "text": "For α = 0.25 the error halves every step", "correct": true, "feedback": "1 − 2 · 0.25 = 0.5." },
    { "text": "For α = 0.8 the iterates alternate around 3 but still converge", "correct": true, "feedback": "1 − 1.6 = −0.6: the sign flips, |−0.6| < 1, so the error still shrinks." },
    { "text": "Any α > 0.5 diverges", "correct": false, "feedback": "Divergence needs |1 − 2α| > 1, i.e. α > 1." },
    { "text": "α = 1 converges in two steps", "correct": false, "feedback": "1 − 2 = −1: the error keeps its size and flips sign forever." },
    { "text": "The fastest α is the largest one that does not diverge, α = 1", "correct": false, "feedback": "α = 0.5 gives factor 0 (one step); α = 1 never converges." }
  ],
  "explanation": "Convergence needs |1 − 2α| < 1, i.e. 0 < α < 1; fastest at α = 0.5. In general the stable range shrinks as the curvature grows."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "batch-noise-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["batches-epochs"],
  "misconception": "sgd-noise-is-a-bug",
  "question": "You switch from full-batch gradient descent (N = 50,000) to mini-batches of B = 50. Which two statements are correct?",
  "options": [
    { "text": "Each step is about 1,000 times cheaper, and an epoch now has 1,000 steps", "correct": true, "feedback": "Yes: 50,000 / 50 = 1,000." },
    { "text": "The loss curve per step becomes noisier, because each gradient is an estimate from 50 examples", "correct": true, "feedback": "Yes: an unbiased but noisy estimate." },
    { "text": "The gradient estimate is now biased, so training converges to a wrong minimum", "correct": false, "feedback": "A random mini-batch gives an unbiased estimate; noise, not bias." },
    { "text": "One epoch now takes 50 steps", "correct": false, "feedback": "Steps per epoch = N / B = 1,000." }
  ],
  "explanation": "Mini-batches trade exactness for many cheap steps; noise falls with larger B and can be reduced by lowering α over time."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "diagnose-curves-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["learning-rate", "algorithm"],
  "question": "Three runs differ only in the learning rate. A: loss falls from 9.0 to 8.7 in 5,000 steps. B: loss turns into NaN after 40 steps. C: loss falls to 1.2 in 800 steps and stays there. Which assignment is right?",
  "options": [
    { "text": "A: α too small; B: α too large; C: converged with a good α", "correct": true, "feedback": "Yes." },
    { "text": "A: converged; B: too small; C: too large", "correct": false, "feedback": "A is still falling slowly: too small. NaN is the sign of divergence (too large)." },
    { "text": "A: too large; B: converged; C: too small", "correct": false, "feedback": "A NaN loss means the weights exploded." }
  ],
  "explanation": "Barely moving → too small; exploding/NaN or oscillating → too large; fast fall then flat → converged."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "tune-plan-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["learning-rate", "batches-epochs"],
  "question": "A model takes 3 hours per epoch, and with α = 0.001 the validation loss is still falling slowly after 10 epochs. Training with α = 0.1 produced NaN. Propose a plan to find a better setting without wasting days, and say what you would look at.",
  "rubric": [
    "Try learning rates between the two on a log scale (e.g. 0.003, 0.01, 0.03)",
    "Run short trials (a fraction of an epoch or a subset) and compare the early loss curves",
    "Pick the largest rate whose loss falls smoothly; optionally decay it later",
    "Check feature scaling if only tiny rates are stable"
  ],
  "sample_answer": "Try α = 0.003, 0.01 and 0.03 for a few hundred steps each on a subset and compare loss curves. Keep the largest rate that falls smoothly without spikes, then train fully, perhaps lowering α when the loss flattens. If only tiny rates are stable, check that the features are on similar scales.",
  "explanation": "Learning rates are searched on a log scale using short runs; the loss curve tells too small from too large."
}
```

# Examples

- **Foggy hillside**: the loss is the height, the weights are your position, the gradient is the slope you feel. Breaks down: real models have millions of weights, so the "hill" has millions of directions, and you never see it.
- **Volume knob**: the learning rate is how far you turn the knob each time you hear it is too quiet or too loud. Small turns: slow; huge turns: you swing from silent to deafening.

# Tutor notes

- Let the learner predict what α = 1 does on L(w) = (w − 3)² before showing it; the bouncing is the moment that makes the learning rate stick.
- Draw or show the three loss curves (too small, good, too large) only after the prediction.
- College: the derivative of MSE is worth deriving once; later steps (logistic regression, backpropagation) reuse the idea.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Linear regression" (gradient descent, hyperparameters), https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
