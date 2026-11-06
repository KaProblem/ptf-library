---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/linear-regression
title: Linear regression and loss
description: A linear model y′ = b + w₁x₁ + … predicts a number; a loss such as MAE or MSE measures how wrong it is, and the choice of loss decides how much outliers count.
lang: en
levels: [highschool, college]
objectives:
  - id: model-equation
    text: Write a linear model y′ = b + w₁x₁ (+ w₂x₂ …), compute a prediction with it, and explain what the weights and the bias mean in context.
  - id: compute-loss
    text: Compute the L1 loss, MAE, L2 loss and MSE of a model on a few examples.
  - id: choose-loss
    text: Explain how MSE and MAE react to outliers and choose the loss that fits a task.
tags: [machine-learning, regression, linear-model, loss, mse, mae]
about:
  - wikidata: Q10861030
    label: linear regression
  - wikidata: Q1036748
    label: loss function
  - wikidata: Q1940696
    label: mean squared error
requires:
  - ptf:el/ml-foundations/what-is-ml
leads_to:
  - ptf:el/ml-foundations/gradient-descent
duration_min: { highschool: 30, college: 30 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Linear regression"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a pizza service notices that deliveries take about 10 minutes plus 3 minutes per kilometre. How long for 4 km? And if a 4 km delivery actually took 30 minutes, how wrong was the guess?
- Linear regression is the simplest ML model: a straight line (or flat plane) through the data. Every later model in this course is trained the same way, so it is the place to learn the vocabulary: weights, bias, prediction, loss.
- Afterwards the learner can write and use a linear model, compute four common losses by hand, and decide whether a task needs MSE or MAE.

# Core

A linear regression model predicts a number as a weighted sum of the
features plus a constant: y′ = b + w₁x₁ + w₂x₂ + …. Each weight wᵢ says how
much the prediction changes when feature xᵢ grows by 1; the bias b is the
prediction when all features are 0. A loss measures how far predictions
are from the labels: L1 sums the absolute errors |y − y′|, L2 sums the
squared errors; dividing by the number of examples gives the mean absolute
error (MAE) and the mean squared error (MSE). Squaring makes large errors
count much more, so MSE pulls the model towards outliers while MAE is
robust to them. Training means finding the weights and bias with the
lowest loss.

# Key facts

- Model: y′ = b + w₁x₁ + … + wₙxₙ; y′ is the prediction, b the bias, wᵢ the weights, xᵢ the feature values. (In school notation f(x) = k · x + d: k is the weight, d the bias.)
- Delivery model y′ = 10 + 3x (x in km, y′ in minutes): 4 km → 22 minutes; weight 3 minutes per km, bias 10 minutes.
- Two features: y′ = 5 + 2x₁ + 0.5x₂ with x₁ = 3, x₂ = 8 gives y′ = 5 + 6 + 4 = 15.
- Losses for labels 12, 20, 15, 30 and predictions 10, 22, 15, 24: errors 2, −2, 0, 6; L1 = 10, MAE = 2.5; L2 = 4 + 4 + 0 + 36 = 44, MSE = 11.
- RMSE (root of MSE) has the unit of the label again: √11 ≈ 3.32 minutes in the example.
- The one error of 6 makes up 36 of 44 (≈ 82 %) of the L2 loss but only 6 of 10 of the L1 loss: squaring lets large errors dominate.
- MSE: use when large errors are especially bad and outliers are real data. MAE: use when outliers are noise or rare extremes that should not pull the model.
- Losses are always ≥ 0, and 0 only when every prediction equals its label.

# Level: highschool

<!-- ptf:text v1 -->

The pizza rule "10 minutes plus 3 minutes per kilometre" is a linear
model: y′ = 10 + 3x, where x is the distance and y′ the predicted time.
The 3 is the **weight** of the distance: one more kilometre, three more
minutes. The 10 is the **bias**: the time even a zero-kilometre delivery
takes (baking, packing). With more features, each gets its own weight:
y′ = 10 + 3x₁ + 2x₂ could add 2 minutes per pizza in the order.

How good is the model? For each past delivery compare the prediction with
the real time (the label). Say four deliveries took 12, 20, 15 and 30
minutes, and the model said 10, 22, 15 and 24. The errors are 2, 2, 0 and
6 minutes (we ignore whether the guess was too high or too low).

A **loss** turns those errors into one number. Add them up: L1 = 10. Take
the average: the **mean absolute error** MAE = 2.5 minutes. Or square
each error first: 4, 4, 0, 36, sum L2 = 44, average **MSE** = 11.

Squaring changes what matters. The one bad delivery (6 minutes off) gives
36 of the 44 in the squared sum. So a model trained to make MSE small
works hardest to avoid big misses, even if one of them is a strange
outlier (the driver had a flat tyre). With MAE, that outlier counts only
as much as its size, so the model stays closer to the typical deliveries.

# Level: college

<!-- ptf:text v1 -->

Predict delivery time from distance x₁ and number of pizzas x₂ with
y′ = b + w₁x₁ + w₂x₂, or in vector form y′ = b + w · x. Each weight is a
partial effect: ∂y′/∂xᵢ = wᵢ, the change in prediction per unit of xᵢ with
the other features held fixed; b is y′ at x = 0. With b = 10, w = (3, 2)
an order of 4 km and 2 pizzas gives 10 + 12 + 4 = 26 minutes.

Over a dataset of N examples the loss summarizes the residuals
eᵢ = yᵢ − y′ᵢ. L1 = Σ|eᵢ| and MAE = L1 / N; L2 = Σeᵢ² and MSE = L2 / N;
RMSE = √MSE returns to the label's unit. For labels (12, 20, 15, 30) and
predictions (10, 22, 15, 24): MAE = 2.5, MSE = 11, RMSE ≈ 3.32.

The choice is not cosmetic. The gradient of eᵢ² is 2eᵢ, so under MSE each
example pulls on the parameters in proportion to its error and one
outlier with e = 6 pulls three times as hard as a typical error of 2.
Under MAE every example pulls with the same strength (the sign of eᵢ), so
the fit tracks the median-like bulk of the data. MSE is the right loss
when large errors are disproportionately costly and the extremes are
genuine; MAE (or the Huber loss, quadratic for small and linear for large
errors) when outliers are measurement noise. MSE is also smooth at 0,
which makes optimization easier.

For linear regression with MSE the best parameters even have a closed
form (the normal equations), but in practice, and for every model after
this one, they are found iteratively with gradient descent.

# Misconceptions

- **bias-means-prejudice**: The bias b means the model is unfair → in a linear model b is just the constant term (the prediction when all features are 0); fairness bias is a different topic.
- **mse-is-average-error**: An MSE of 11 means predictions are off by 11 on average → MSE is in squared units; the typical error is closer to RMSE ≈ 3.3, and the average absolute error is the MAE.
- **errors-cancel**: Positive and negative errors cancel, so summing raw errors is a fine loss → +2 and −2 would sum to 0 for a model that is wrong twice; losses use absolute values or squares.
- **squared-loss-always-best**: MSE is always the right loss → it lets outliers dominate; with noisy extremes MAE or Huber is better.
- **weight-is-correlation**: A larger weight always means a more important feature → a weight depends on the feature's unit and scale (km vs m changes it 1000-fold); compare weights only for features on the same scale.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "pizza-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "question": "A delivery takes about 10 minutes plus 3 minutes per kilometre. How many minutes for 4 km?",
  "answer": 22,
  "tolerance": 0,
  "unit": "min",
  "explanation": "10 + 3 · 4 = 22 minutes. That rule is a linear model with bias 10 and weight 3."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "weight-and-bias",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["model-equation"],
  "misconception": "bias-means-prejudice",
  "question": "A model predicts a used car's price in € as y′ = 18,000 − 1,500x, where x is the car's age in years. Which two statements are true?",
  "options": [
    { "text": "Each extra year of age lowers the predicted price by € 1,500", "correct": true, "feedback": "Yes: the weight −1,500 is the change per year." },
    { "text": "The bias 18,000 is the predicted price of a brand-new car (age 0)", "correct": true, "feedback": "Yes: with x = 0 the prediction is the bias." },
    { "text": "The bias means the model is unfair to older cars", "correct": false, "feedback": "In a linear model 'bias' is just the constant term." },
    { "text": "A 4-year-old car is predicted at € 6,000", "correct": false, "feedback": "18,000 − 1,500 · 4 = € 12,000." },
    { "text": "The weight is 18,000", "correct": false, "feedback": "18,000 is the bias; the weight is the number multiplied by x, −1,500." }
  ],
  "explanation": "y′ = b + w · x: b is the prediction at x = 0, w the change per unit of x."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "two-features",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["model-equation"],
  "question": "A model predicts minutes of delivery time as y′ = 10 + 3x₁ + 2x₂, where x₁ is the distance in km and x₂ the number of pizzas. Predict the time for 5 km and 3 pizzas.",
  "answer": 31,
  "tolerance": 0,
  "unit": "min",
  "explanation": "10 + 3 · 5 + 2 · 3 = 10 + 15 + 6 = 31 minutes."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "four-losses",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["compute-loss"],
  "misconception": "errors-cancel",
  "title": "Four losses for four deliveries",
  "intro": "Labels (real minutes): 12, 20, 15, 30. Predictions: 10, 22, 15, 24.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Absolute errors", "|12 − 10|, |20 − 22|, |15 − 15|, |30 − 24|", "2, 2, 0, 6"],
    ["L1 loss", "2 + 2 + 0 + 6", "10"],
    ["MAE", "10 / 4", "2.5"],
    ["L2 loss", "4 + 4 + 0 + 36", "44"],
    ["MSE", "44 / 4", "11"]
  ],
  "result": { "label": "MSE", "value": "11" },
  "explanation": "Absolute values or squares stop positive and negative errors from cancelling; the mean divides by the number of examples."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "outlier-effect",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["choose-loss"],
  "misconception": "squared-loss-always-best",
  "question": "One delivery took 60 minutes instead of the usual 20, because the driver had a flat tyre. Which statement is true?",
  "options": [
    { "text": "With MSE this one delivery will pull the model much more than with MAE", "correct": true, "feedback": "Yes: its error is squared, so a 40-minute miss counts 1,600 instead of 40." },
    { "text": "MSE and MAE treat the outlier the same, they only use different units", "correct": false, "feedback": "Squaring makes big errors count disproportionately more." },
    { "text": "MAE ignores the outlier completely", "correct": false, "feedback": "MAE still counts it, but only by its size (40), not its square." }
  ],
  "explanation": "MSE lets large errors dominate; MAE counts every minute of error the same. For a rare accident, MAE keeps the model closer to normal deliveries."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pick-loss-highschool",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["choose-loss"],
  "question": "A model predicts how much medicine to prepare. Being far off once is dangerous; being a little off often is fine. Which loss fits better?",
  "options": [
    { "text": "MSE, because it punishes large errors much more than small ones", "correct": true, "feedback": "Yes: squaring makes the model avoid big misses." },
    { "text": "MAE, because it treats all errors equally", "correct": false, "feedback": "Here big errors are worse than many small ones, so they should count more." },
    { "text": "It does not matter, both give the same model", "correct": false, "feedback": "They weight large errors differently, so they usually give different models." }
  ],
  "explanation": "Choose MSE when large errors are especially costly and real; MAE when extremes are noise."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "linreg-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["compute-loss", "model-equation"],
  "misconception": "mse-is-average-error",
  "question": "A model's predictions for two houses are off by 1 and by 3 (in € 100,000). What is the mean squared error?",
  "options": [
    { "text": "5", "correct": true, "feedback": "Yes: (1² + 3²) / 2 = 10 / 2 = 5." },
    { "text": "2", "correct": false, "feedback": "2 is the mean absolute error (1 + 3) / 2; MSE squares first." },
    { "text": "4", "correct": false, "feedback": "That squares the mean error (2² = 4); MSE averages the squares." }
  ],
  "explanation": "MSE = average of the squared errors: (1 + 9) / 2 = 5."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "partial-effect-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["model-equation"],
  "misconception": "weight-is-correlation",
  "question": "A rent model is y′ = 150 + 11.5 · size_m² + 40 · balcony + 0.02 · dist_m (y′ in €, balcony 0 or 1, dist_m = distance to the station in metres). Which two statements are correct?",
  "options": [
    { "text": "Holding the other features fixed, a flat with a balcony is predicted € 40 more expensive", "correct": true, "feedback": "Yes: the weight is the partial effect of a one-unit change." },
    { "text": "A 60 m² flat with balcony, 500 m from the station, is predicted at € 900", "correct": false, "feedback": "150 + 11.5 · 60 + 40 + 0.02 · 500 = 150 + 690 + 40 + 10 = € 890." },
    { "text": "Distance matters least because its weight 0.02 is the smallest", "correct": false, "feedback": "The weight is per metre; 1 km adds € 20, and distances vary over thousands of metres. Weights depend on units." },
    { "text": "If dist were measured in km, its weight would become 20", "correct": true, "feedback": "Yes: one km is 1,000 m, so the weight per km is 1,000 × 0.02 = 20." },
    { "text": "b = 150 is the predicted rent of a typical flat", "correct": false, "feedback": "b is the prediction at size 0, no balcony, distance 0: not a typical flat." }
  ],
  "explanation": "wᵢ = ∂y′/∂xᵢ with the other features fixed; its size depends on the unit of xᵢ."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "rmse-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["compute-loss"],
  "misconception": "mse-is-average-error",
  "question": "Labels 3, 5, 9, 4 and predictions 4, 5, 6, 6. Compute the RMSE (two decimals).",
  "answer": 1.87,
  "tolerance": 0.01,
  "explanation": "Errors −1, 0, 3, −2; squares 1, 0, 9, 4; MSE = 14 / 4 = 3.5; RMSE = √3.5 ≈ 1.87."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "mae-mse-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["compute-loss"],
  "text": "Residuals of a model on five examples are 1, −1, 2, −2 and 10. The MAE is {{1}} and the MSE is {{2}}.",
  "gaps": [
    { "answer": "3.2" },
    { "answer": "22" }
  ],
  "explanation": "MAE = (1 + 1 + 2 + 2 + 10) / 5 = 3.2; MSE = (1 + 1 + 4 + 4 + 100) / 5 = 22. The outlier contributes 100 of the 110 in the squared sum."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gradient-pull-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["choose-loss"],
  "misconception": "squared-loss-always-best",
  "question": "Why does one outlier with residual e = 20 move an MSE fit more than an MAE fit?",
  "options": [
    { "text": "The derivative of e² is 2e, so its pull grows with the residual; the derivative of |e| is ±1, the same for every example", "correct": true, "feedback": "Yes: under MSE the outlier pulls 10 times harder than an example with e = 2." },
    { "text": "MAE skips examples whose residual exceeds a threshold", "correct": false, "feedback": "MAE uses every example; it just gives each the same pull." },
    { "text": "MSE divides by N and MAE does not", "correct": false, "feedback": "Both are means over N." },
    { "text": "The outlier changes the bias under MSE but only the weights under MAE", "correct": false, "feedback": "Both losses can move all parameters." }
  ],
  "explanation": "Under MSE, an example's influence is proportional to its error; under MAE, it is bounded. Huber combines both."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "choose-loss-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["choose-loss", "compute-loss"],
  "question": "A model forecasts daily ice-cream sales for a café. Sensor glitches occasionally record sales of 0 on busy days. The café cares about being right on normal days. Which loss would you train with, which metric would you report to the owner, and why?",
  "rubric": [
    "Glitches are outliers that are noise, not real sales",
    "MAE (or Huber) keeps them from dominating the fit; MSE would pull the model towards them",
    "Report MAE (or RMSE) in units of ice creams, because it is interpretable; MSE is in squared units",
    "Optionally: clean or remove the glitch rows first"
  ],
  "sample_answer": "The zero readings are sensor noise, so I would train with MAE or Huber so they do not pull the forecast down; with MSE their large squared errors would dominate. To the owner I would report the MAE, e.g. 'off by 12 ice creams on a typical day', since it is in the label's unit. Even better, remove the glitch rows before training.",
  "explanation": "Pick the loss for how errors should count during training, and a metric in label units for people."
}
```

# Examples

- **Ruler on a scatter plot**: training a 1-feature linear model is like laying a ruler on a scatter plot so it passes as close as possible to all points. Breaks down: with many features it is a flat plane in many dimensions, and "close" depends on the loss.

# Tutor notes

- Write all four losses as a small table on the same four deliveries; the learner should compute them before seeing them.
- At college connect weights to partial derivatives; the next step (gradient descent) needs the derivative of the loss.
- Keep "bias" (constant term) and "bias" (fairness, later in the course) apart explicitly.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Linear regression", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
