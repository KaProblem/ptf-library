---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/logistic-regression
title: Logistic regression
description: A linear model followed by the sigmoid function predicts a probability; it is trained with log loss, which punishes confident wrong answers hard, and needs regularization to stay finite.
lang: en
levels: [highschool, college]
objectives:
  - id: sigmoid
    text: Compute the sigmoid of a linear output z = b + w · x and read the result as a probability.
  - id: log-loss
    text: Compute log loss for a few predictions and explain why it, not MSE, is used for probabilities.
  - id: regularize
    text: Explain why logistic regression without regularization can push its weights towards infinity, and how L2 regularization or early stopping prevent it.
tags: [machine-learning, classification, logistic-regression, sigmoid, log-loss, probability]
about:
  - wikidata: Q1132755
    label: logistic regression model
  - wikidata: Q22667762
    label: logarithmic loss
requires:
  - ptf:el/ml-foundations/gradient-descent
leads_to:
  - ptf:el/ml-foundations/classification-metrics
duration_min: { highschool: 30, college: 30 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Logistic regression"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a weather app says "80 % chance of rain". Tomorrow it stays dry. Was the app wrong? And what if it had said "99.9 %"?
- Many questions have a yes/no answer (spam? fraud? rain?), but a good model should say how sure it is. Logistic regression is the standard way to get a probability out of a linear model, and the last layer of many neural networks works the same way.
- Afterwards the learner can turn a linear score into a probability with the sigmoid, compute log loss, and explain why the model needs regularization.

# Core

Logistic regression computes a linear score z = b + w₁x₁ + … (the log-odds)
and passes it through the sigmoid σ(z) = 1 / (1 + e^(−z)), which squeezes
any number into a probability between 0 and 1: z = 0 gives 0.5, large
positive z approaches 1, large negative z approaches 0. It is trained with
log loss, −[y · ln(p) + (1 − y) · ln(1 − p)], which is small when the model
gives a high probability to what actually happened and grows without limit
when it is confidently wrong. Because the loss keeps rewarding more
confidence, weights can grow towards infinity on data that can be
separated perfectly, so logistic regression is trained with L2
regularization or early stopping. Turning the probability into a yes/no
answer needs a threshold, a separate decision.

# Key facts

- Sigmoid: σ(z) = 1 / (1 + e^(−z)); σ(0) = 0.5, σ(2) ≈ 0.88, σ(−2) ≈ 0.12, σ(z) + σ(−z) = 1.
- Spam model z = −2 + 0.8x (x = number of suspicious words): x = 0 → p ≈ 0.12; x = 5 → z = 2, p ≈ 0.88.
- z is the log-odds: z = ln(p / (1 − p)). p = 0.8 ↔ odds 4 : 1 ↔ z = ln 4 ≈ 1.39. Each unit of x multiplies the odds by e^w.
- Log loss for one example: −ln(p) if y = 1, −ln(1 − p) if y = 0. y = 1, p = 0.9 → 0.105; y = 1, p = 0.1 → 2.303; y = 0, p = 0.99 → 4.605.
- Four examples (y, p) = (1, 0.8), (0, 0.3), (1, 0.6), (0, 0.1): mean log loss ≈ 0.299.
- Perfect confidence is infinitely punished when wrong: −ln(0) = ∞. Good models are calibrated: of all cases with p ≈ 0.8, about 80 % are positive.
- MSE on probabilities caps the cost of a confident mistake at 1 per example (and, with the sigmoid, gives a non-convex loss with tiny gradients there); log loss gives a convex loss and strong gradients for confident mistakes.
- Regularization: on separable data log loss keeps falling as |w| → ∞; adding λ · Σw² (L2) or stopping early keeps the weights finite and the probabilities sensible.

# Level: highschool

<!-- ptf:text v1 -->

The weather app said 80 % rain, and it stayed dry. That was not
necessarily wrong: 80 % means it stays dry on 1 day in 5. But if the app
had said 99.9 %, you would be right to be annoyed. A good yes/no model
should give probabilities, and it should be punished more when it was
very sure and wrong.

Logistic regression gets a probability from a linear model in two steps.
First it adds up the features with weights, as before: for a spam filter,
z = −2 + 0.8x, where x counts suspicious words. That z can be any number.
Then the **sigmoid** squeezes it into the range 0 to 1:
σ(z) = 1 / (1 + e^(−z)). An email without suspicious words gets z = −2 and
a probability of about 0.12; with five such words z = 2 and the
probability is about 0.88. z = 0 means 50 : 50.

To train it we need a loss for probabilities: **log loss**. If the email
really was spam, the loss is −ln(p): a confident right answer (p = 0.9)
costs only 0.1, a confident wrong one (p = 0.1) costs 2.3. If it was not
spam, use −ln(1 − p) instead. The more confident the mistake, the steeper
the cost, and p = 0 for something that happened would cost infinitely
much.

That has a side effect. If the training data can be split perfectly, the
model can lower the loss forever by becoming ever more certain: the
weights grow and grow. To stop that we add a penalty for large weights
(**regularization**) or simply stop training early. Finally, a
probability is not yet a decision: "is it spam?" needs a **threshold**,
which the next step is about.

# Level: college

<!-- ptf:text v1 -->

Model the probability of the positive class as p = σ(z), z = b + w · x,
σ(z) = 1 / (1 + e^(−z)). Inverting gives z = ln(p / (1 − p)): the linear
part models the log-odds, so increasing xᵢ by 1 multiplies the odds by
e^(wᵢ). Example: z = −2 + 0.8x gives p(0) ≈ 0.119 and p(5) = σ(2) ≈ 0.881;
each extra suspicious word multiplies the odds by e^0.8 ≈ 2.23.

Training maximizes the likelihood of the labels, equivalently minimizes
the mean log loss (binary cross-entropy)
L = −(1/N) Σ [yᵢ ln pᵢ + (1 − yᵢ) ln(1 − pᵢ)]. For (y, p) = (1, 0.8),
(0, 0.3), (1, 0.6), (0, 0.1), L ≈ 0.299. Its gradient has the same simple
form as for linear regression: ∂L/∂w = (1/N) Σ (pᵢ − yᵢ) xᵢ, and the loss
is convex in (w, b). MSE on σ(z) would be non-convex and, worse, its
gradient vanishes exactly where the model is confidently wrong (σ′(z) ≈ 0
for large |z|), so it would barely correct such mistakes.

If the classes are linearly separable, scaling w by any c > 1 pushes every
pᵢ closer to its label and lowers L, so the minimum is at infinity:
gradient descent never converges and the model becomes overconfident on
everything. L2 regularization, minimizing L + λ Σ wⱼ², gives a finite
optimum where the marginal gain in fit equals the penalty; early stopping
achieves a similar effect. Calibration (predicted p matches observed
frequency) is a property worth checking separately; the threshold that
turns p into a class is chosen afterwards from the costs of errors.

# Misconceptions

- **probability-is-decision**: A predicted probability of 0.7 means the model says "yes" → the model gives a probability; "yes" needs a threshold, chosen from the costs of the two kinds of errors.
- **eighty-percent-wrong-if-dry**: A model that said 80 % rain was wrong when it stayed dry → one outcome cannot show that; across many 80 % days it should rain on about 80 %.
- **sigmoid-is-linear**: The sigmoid output grows evenly with z → it changes fastest around z = 0 and flattens near 0 and 1.
- **mse-for-probabilities**: Any loss works for probabilities, MSE included → MSE barely punishes confident mistakes and gives a non-convex problem with a sigmoid; log loss is the standard.
- **more-training-always-better**: Training longer always improves logistic regression → on separable data it only drives the weights towards infinity and the probabilities to 0 and 1; regularize or stop early.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rain-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "eighty-percent-wrong-if-dry",
  "question": "A weather app said \"80 % chance of rain\" and it stayed dry. What can you conclude?",
  "options": [
    { "text": "Not much from one day: on 1 in 5 such days it should stay dry", "correct": true, "feedback": "Yes: to judge a probability you need many forecasts." },
    { "text": "The app was wrong", "correct": false, "feedback": "80 % is not 100 %; dry days are expected sometimes." },
    { "text": "The app should have said 50 %", "correct": false, "feedback": "One day does not tell us the right number." }
  ],
  "explanation": "A probability is judged over many cases: of all 80 % days, about 80 % should be rainy."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "sigmoid-value",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sigmoid"],
  "question": "A spam filter computes z = −2 + 0.8x, where x is the number of suspicious words, and then p = 1 / (1 + e^(−z)). What probability does it give an email with 5 suspicious words? (two decimals)",
  "answer": 0.88,
  "tolerance": 0.01,
  "explanation": "z = −2 + 4 = 2; p = 1 / (1 + e^(−2)) = 1 / 1.135 ≈ 0.88."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "sigmoid-shape",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sigmoid"],
  "misconception": "sigmoid-is-linear",
  "question": "Which two statements about the sigmoid σ(z) are true?",
  "options": [
    { "text": "σ(0) = 0.5", "correct": true, "feedback": "Yes: 1 / (1 + 1) = 0.5." },
    { "text": "σ(z) is always between 0 and 1, never exactly 0 or 1", "correct": true, "feedback": "Yes: that is why it can be read as a probability." },
    { "text": "Going from z = 0 to z = 2 raises σ by as much as going from z = 4 to z = 6", "correct": false, "feedback": "0.50 → 0.88 is a big change; 0.982 → 0.998 is tiny. The curve flattens." },
    { "text": "σ(−3) is negative", "correct": false, "feedback": "σ(−3) ≈ 0.047: small but positive." }
  ],
  "explanation": "The sigmoid maps any number into (0, 1), steepest at z = 0."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "confident-wrong",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["log-loss"],
  "question": "An email was spam (y = 1). Model A said p = 0.6, model B said p = 0.1. Log loss for spam is −ln(p). Which statement is true?",
  "options": [
    { "text": "B's loss (≈ 2.30) is more than four times A's (≈ 0.51), because B was confidently wrong", "correct": true, "feedback": "Yes: −ln(0.1) ≈ 2.30, −ln(0.6) ≈ 0.51." },
    { "text": "Both are just wrong, so they get the same loss", "correct": false, "feedback": "Log loss looks at how confident the prediction was, not only whether it was over 0.5." },
    { "text": "A gets the larger loss because 0.6 is further from 0 than 0.1", "correct": false, "feedback": "The loss measures distance from the true label 1; 0.1 is much further from 1." }
  ],
  "explanation": "Log loss grows steeply as a wrong prediction gets more confident."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "log-loss-not-spam",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["log-loss"],
  "misconception": "mse-for-probabilities",
  "question": "An email was not spam (y = 0), but the model said p = 0.99 for spam. The loss is −ln(1 − p). How large is it? (two decimals)",
  "answer": 4.61,
  "tolerance": 0.01,
  "explanation": "−ln(0.01) ≈ 4.61. With MSE the same mistake would only cost (0.99 − 0)² ≈ 0.98, so MSE would hardly notice how confident the mistake was."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-regularize",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["regularize"],
  "misconception": "more-training-always-better",
  "question": "In the training data every email with the word \"lottery\" is spam and no other email is. Without regularization, what happens to the weight of \"lottery\" if you train for a very long time?",
  "options": [
    { "text": "It keeps growing, because becoming more certain always lowers the loss a little", "correct": true, "feedback": "Yes: p approaches 1 but never reaches it, so the loss never stops falling. A penalty on large weights or early stopping prevents this." },
    { "text": "It settles at a good value and stays there", "correct": false, "feedback": "There is no best finite value: more certainty always helps on this data." },
    { "text": "It drops to 0, because the word is not needed", "correct": false, "feedback": "The word predicts spam perfectly in the data, so its weight grows." }
  ],
  "explanation": "Perfectly separable data lets log loss fall forever as weights grow; regularization or early stopping keep them finite."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "logreg-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["sigmoid", "log-loss"],
  "misconception": "probability-is-decision",
  "question": "A logistic regression model outputs 0.7 for an email. Which statement is right?",
  "options": [
    { "text": "The model estimates a 70 % chance of spam; whether to mark it as spam depends on a chosen threshold", "correct": true, "feedback": "Yes: the output is a probability, the decision is separate." },
    { "text": "The email is spam, because 0.7 > 0.5", "correct": false, "feedback": "0.5 is only one possible threshold; a careful filter might use 0.9." },
    { "text": "70 % of the email's words are spam words", "correct": false, "feedback": "The output is a probability for the whole email, not a share of its words." }
  ],
  "explanation": "Logistic regression gives probabilities; a threshold turns them into classes."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "odds-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["sigmoid"],
  "question": "A model has z = −2 + 0.8x. Which two statements are correct?",
  "options": [
    { "text": "Each extra unit of x multiplies the odds p / (1 − p) by e^0.8 ≈ 2.23", "correct": true, "feedback": "Yes: z is the log-odds, so +0.8 in z multiplies the odds by e^0.8." },
    { "text": "p = 0.5 is reached at x = 2.5", "correct": true, "feedback": "z = 0 ↔ −2 + 0.8x = 0 ↔ x = 2.5." },
    { "text": "Each extra unit of x adds 0.8 to the probability", "correct": false, "feedback": "It adds 0.8 to the log-odds; the change in p depends on where on the sigmoid you are." },
    { "text": "At x = 0 the probability is −2", "correct": false, "feedback": "z = −2, p = σ(−2) ≈ 0.12." },
    { "text": "p = 0.8 needs z = 0.8", "correct": false, "feedback": "z = ln(0.8 / 0.2) = ln 4 ≈ 1.39." }
  ],
  "explanation": "z = ln(p / (1 − p)): linear in the log-odds, not in p."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "mean-log-loss-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["log-loss"],
  "question": "Labels and predicted probabilities: (y, p) = (1, 0.8), (0, 0.3), (1, 0.6), (0, 0.1). Compute the mean log loss (natural log, three decimals).",
  "answer": 0.299,
  "tolerance": 0.002,
  "explanation": "−[ln 0.8 + ln 0.7 + ln 0.6 + ln 0.9] / 4 = (0.223 + 0.357 + 0.511 + 0.105) / 4 ≈ 0.299."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-not-mse-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["log-loss"],
  "misconception": "mse-for-probabilities",
  "question": "Why is logistic regression trained with log loss rather than MSE on σ(z)?",
  "options": [
    { "text": "With log loss ∂L/∂z = p − y, so a confident mistake gets a large gradient and the loss is convex; with MSE the gradient contains σ′(z), which is nearly 0 exactly for confident mistakes", "correct": true, "feedback": "Yes: MSE + sigmoid barely corrects the worst errors and is non-convex." },
    { "text": "MSE cannot be computed for values between 0 and 1", "correct": false, "feedback": "It can; it just behaves badly for this model." },
    { "text": "Log loss always gives higher accuracy at threshold 0.5", "correct": false, "feedback": "The reason is the shape of the optimization problem, not a guarantee about accuracy." },
    { "text": "Log loss ignores examples that are already right", "correct": false, "feedback": "Every example contributes −ln of the probability given to its label." }
  ],
  "explanation": "Log loss is the negative log-likelihood of a Bernoulli model: convex in (w, b) with gradient (p − y) x."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "separable-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["regularize"],
  "misconception": "more-training-always-better",
  "question": "On linearly separable data, unregularized logistic regression is trained with gradient descent. Which two statements are correct?",
  "options": [
    { "text": "Scaling w and b by c > 1 lowers the log loss, so there is no finite minimum", "correct": true, "feedback": "Yes: every pᵢ moves closer to its label." },
    { "text": "With L + λ Σ w², the optimum is finite for any λ > 0", "correct": true, "feedback": "Yes: the penalty grows like c² while the gain in log loss is bounded." },
    { "text": "Gradient descent converges to the same finite weights as with regularization", "correct": false, "feedback": "Without regularization ‖w‖ keeps growing; the iterates never converge." },
    { "text": "Early stopping makes the weights larger", "correct": false, "feedback": "Stopping early keeps them smaller than continuing would." }
  ],
  "explanation": "Separable data has its log-loss infimum at ‖w‖ → ∞; L2 or early stopping regularize."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "calibration-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["log-loss", "sigmoid", "regularize"],
  "question": "A fraud model trained for many epochs without regularization outputs p > 0.999 or p < 0.001 for almost every transaction. On new data its accuracy is fine, but its log loss is terrible. Explain what is going on and what you would change.",
  "rubric": [
    "The model is overconfident: weights grew large (separable or nearly separable training data)",
    "A few confident mistakes on new data cost −ln(0.001) ≈ 6.9 each and dominate the log loss, while accuracy ignores confidence",
    "Fix: L2 regularization (tuned λ) and/or early stopping on validation log loss; optionally recalibrate",
    "Check calibration: among cases with p ≈ 0.9 about 90 % should be fraud"
  ],
  "sample_answer": "Without regularization the weights grew until the probabilities sit at 0 or 1. Accuracy only checks the side of the threshold, but log loss charges about 6.9 for each confident mistake, so a few of them ruin it. I would add L2 regularization with λ tuned on validation data or stop early when validation log loss is lowest, and then check calibration.",
  "explanation": "Log loss rewards calibrated probabilities; overconfidence from unbounded weights shows up there first."
}
```

# Tutor notes

- Start with the weather forecast question; it opens both "probability, not decision" and "confident mistakes should cost more".
- Highschool learners may not know e or ln: give values (e^(−2) ≈ 0.135, ln 0.1 ≈ −2.30) and focus on the shape.
- The threshold is only mentioned here; the next step (classification) is built on it.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Logistic regression", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
