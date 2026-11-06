---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/classification-metrics
title: Thresholds, the confusion matrix and its metrics
description: A threshold turns probabilities into yes/no answers; the confusion matrix counts the four outcomes, accuracy, precision, recall and the false positive rate summarize them for different purposes, and prediction bias is a quick check that the model's average matches reality.
lang: en
levels: [highschool, college]
objectives:
  - id: confusion-matrix
    text: Apply a threshold to predicted probabilities and count true positives, false positives, true negatives and false negatives.
  - id: metrics
    text: Compute accuracy, precision, recall (true positive rate) and false positive rate from a confusion matrix.
  - id: choose-metric
    text: Choose the metric that matters for a task, explain why accuracy misleads on imbalanced data, and predict how moving the threshold trades precision against recall.
  - id: prediction-bias
    text: Compute prediction bias (average prediction minus average label), and name what a large bias points to.
tags: [machine-learning, classification, threshold, confusion-matrix, precision, recall, accuracy]
about:
  - wikidata: Q2359161
    label: precision and recall
  - wikidata: Q2709591
    label: confusion matrix
  - wikidata: Q17005494
    label: binary classification
requires:
  - ptf:el/ml-foundations/logistic-regression
leads_to:
  - ptf:el/ml-foundations/roc-auc
duration_min: { highschool: 35, college: 35 }
simulators:
  - ref: ptf:sim/threshold-lab@^1.0.0
    station: sort
    levels: [highschool, college]
    role: explore
    use_when: the learner should place a threshold by hand and count the four outcomes before any formula
  - ref: ptf:sim/threshold-lab@^1.0.0
    station: trade-off
    levels: [highschool, college]
    role: explore
    use_when: the learner has predicted what raising the threshold does to precision and recall and wants to test it
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Classification: thresholds, confusion matrix, accuracy, precision and recall, prediction bias"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a test for a rare disease is "99 % accurate". Only 1 in 100 people has the disease. A lazy test that always says "healthy" is right for 99 of 100 people too. Is the real test any good?
- A classifier makes two kinds of mistakes: false alarms and misses. Which one hurts more depends on the task: a spam filter that deletes a job offer is worse than one that lets an advert through. One number like accuracy hides that.
- Afterwards the learner can fill a confusion matrix, compute the four standard metrics, and choose a metric and a threshold that fit the task.

# Core

A classification threshold turns a predicted probability into a class:
above it the prediction is positive, otherwise negative. Comparing
predictions with labels gives four counts, the confusion matrix: true
positives (TP), false positives (FP, false alarms), true negatives (TN) and
false negatives (FN, misses). Accuracy (TP + TN) / all counts every error
the same and is misleading when one class is rare. Precision TP / (TP + FP)
says how often a positive prediction is right; recall, also called true
positive rate, TP / (TP + FN) says how many actual positives were found;
the false positive rate FP / (FP + TN) says how many actual negatives were
falsely flagged. Raising the threshold usually raises precision and lowers
recall; the right choice depends on what each kind of error costs. A quick
sanity check before any of these metrics is prediction bias: the average
of the predicted probabilities minus the share of actual positives. It
should be close to zero; a large gap points to a problem in the data, the
features, the training code or too strong regularization.

# Key facts

- Confusion matrix: rows actual positive / negative, columns predicted positive / negative: TP, FN in the first row, FP, TN in the second.
- Accuracy = (TP + TN) / (TP + FP + TN + FN). Precision = TP / (TP + FP). Recall = TPR = TP / (TP + FN). FPR = FP / (FP + TN). F1 = 2 · precision · recall / (precision + recall).
- Spam example, 1,000 emails, 100 spam: TP = 80, FN = 20, FP = 30, TN = 870 → accuracy 0.95, precision 80 / 110 ≈ 0.727, recall 0.80, FPR 30 / 900 ≈ 0.033, F1 ≈ 0.762.
- A model that always says "not spam" on the same emails has accuracy 0.90 but recall 0 and finds no spam at all: accuracy misleads on imbalanced data.
- Eight emails with scores and labels (S = spam): 0.95 S, 0.85 S, 0.70 not, 0.60 S, 0.45 not, 0.40 S, 0.20 not, 0.10 not. Threshold 0.5 → TP 3, FP 1, TN 3, FN 1, precision 0.75, recall 0.75. Threshold 0.3 → TP 4, FP 2, TN 2, FN 0, precision ≈ 0.67, recall 1.
- Lower threshold → more positives predicted → recall rises (or stays), FPR rises (or stays), precision usually falls. Higher threshold → the reverse.
- Prediction bias = mean of predictions − mean of labels. Spam is 5 % of the emails but the average predicted spam probability is 0.20 → prediction bias 0.15: something is wrong (sampling, missing features, a pipeline bug, too much regularization). Zero prediction bias alone does not make a model good.
- Choose by cost: misses are expensive (disease screening, fraud) → favour recall; false alarms are expensive (deleting real email, accusing someone) → favour precision; balanced classes and similar costs → accuracy is acceptable.

# Level: highschool

<!-- ptf:text v1 -->

Back to the disease test. If 1 in 100 people is ill, a "test" that always
says "healthy" is right 99 % of the time and finds nobody who is ill. So
"right 99 % of the time" (accuracy) cannot be the whole story. We need to
look at the two kinds of mistakes separately.

A model like logistic regression gives each case a probability. To get a
yes/no answer we pick a **threshold**, say 0.5: above it we say "spam".
Now compare with the truth. Four things can happen: spam called spam
(**true positive**), a normal email called spam (**false positive**, a
false alarm), a normal email let through (**true negative**), spam let
through (**false negative**, a miss). Counting them gives the
**confusion matrix**.

Say 1,000 emails, 100 of them spam. The filter catches 80 spam emails,
misses 20, and wrongly flags 30 normal ones. Then:

- **Precision**: of the 110 emails it flagged, 80 were spam: 0.73. "When it says spam, how often is it right?"
- **Recall**: of the 100 spam emails, it found 80: 0.80. "How much of the spam did it catch?"
- **False positive rate**: of the 900 normal emails, 30 were flagged: 0.033.
- **Accuracy**: 80 + 870 right out of 1,000: 0.95.

Moving the threshold changes the balance. Lower it and the filter flags
more: it catches more spam (recall up) but also more normal emails
(precision down). Raise it and the reverse happens. Which way to go
depends on which mistake hurts more: losing a job offer to the spam folder
is worse than seeing one more advert, so a spam filter usually favours
precision. A screening test for a serious disease favours recall, because
missing someone is worse than a second check.

One more check comes before all of these: does the model's average match
reality? If 5 % of all emails are spam, the model's spam probabilities
should average about 0.05 too. If they average 0.20, the model has a
**prediction bias** of 0.15, and something is broken: maybe the training
emails were not a fair sample, maybe a useful feature is missing, or the
training code has a bug. A bias near 0 does not prove the model is good,
but a large one proves something is wrong.

# Level: college

<!-- ptf:text v1 -->

Given scores sᵢ = P(y = 1 | xᵢ) and a threshold t, the classifier predicts
ŷ = 1 if s ≥ t. Against labels this yields the confusion matrix
(TP, FN; FP, TN). Four rates matter: accuracy (TP + TN) / N; precision
(positive predictive value) TP / (TP + FP); recall or TPR (sensitivity)
TP / (TP + FN); and FPR = FP / (FP + TN) = 1 − specificity. F1,
the harmonic mean of precision and recall, is one number that is only
high if both are.

With prevalence π (share of positives), accuracy = π · TPR + (1 − π) · TNR:
for small π it is dominated by the negatives, which is why the
always-negative classifier scores 1 − π. Precision also depends on π:
precision = π · TPR / (π · TPR + (1 − π) · FPR), so the same test (TPR 0.9,
FPR 0.05) has precision ≈ 0.15 at π = 1 % but ≈ 0.67 at π = 10 %. Recall
and FPR are rates within one actual class and do not depend on π.

Moving t sweeps through a family of confusion matrices. Lowering t can only
add predicted positives, so TP and FP are non-decreasing: recall and FPR
are monotone, precision is not necessarily (it usually falls, but can
rise locally). In the eight-email example t = 0.5 gives precision =
recall = 0.75; t = 0.3 gives recall 1 and precision 0.67. Choosing t is a
decision problem: with cost c_FP per false alarm and c_FN per miss,
pick the t that minimizes c_FP · FP + c_FN · FN on validation data (for
calibrated scores, predict positive when s > c_FP / (c_FP + c_FN)). The
next step, ROC and AUC, evaluates the ranking across all thresholds at
once.

Before reading any threshold metric, compare the mean prediction with the
base rate: prediction bias = (1/N) Σ sᵢ − (1/N) Σ yᵢ. A calibrated model
has bias near zero overall (and, ideally, within slices); a large bias
flags biased sampling or label noise, insufficient features, overly strong
regularization, or a bug in the training or serving pipeline. Zero bias is
necessary, not sufficient: predicting the base rate for every example has
zero bias and no discrimination. Checking the bias per slice (e.g. per
language or region) catches problems the overall mean hides.

# Misconceptions

- **accuracy-is-enough**: High accuracy means a good classifier → on imbalanced data a useless "always negative" model has high accuracy; look at precision and recall.
- **precision-recall-same**: Precision and recall are two names for "how often it is right" → precision is about the predicted positives, recall about the actual positives.
- **threshold-always-half**: The threshold is always 0.5 → it is a choice; 0.5 is only a default, and the right value depends on costs and class balance.
- **raise-both**: A better threshold raises precision and recall together → for a fixed model, moving the threshold trades one against the other; raising both needs a better model.
- **zero-bias-means-good**: A model with zero prediction bias is a good model → predicting the base rate for every example has zero bias and is useless; prediction bias only detects certain problems.
- **fpr-is-one-minus-precision**: The false positive rate is 1 − precision → FPR divides by the actual negatives, precision by the predicted positives.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lazy-test-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "accuracy-is-enough",
  "question": "1 in 100 people has a rare disease. A \"test\" always answers \"healthy\". How often is it right?",
  "options": [
    { "text": "99 % of the time, and it never finds anyone who is ill", "correct": true, "feedback": "Yes: high accuracy, useless test." },
    { "text": "50 % of the time, because it ignores the patient", "correct": false, "feedback": "It is right for all 99 healthy people out of 100." },
    { "text": "1 % of the time", "correct": false, "feedback": "It is wrong only for the 1 ill person." }
  ],
  "explanation": "When one class is rare, accuracy hides the misses. We need metrics that look at each kind of error."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "count-outcomes",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["confusion-matrix"],
  "text": "Eight emails, scores and truth: 0.95 spam, 0.85 spam, 0.70 normal, 0.60 spam, 0.45 normal, 0.40 spam, 0.20 normal, 0.10 normal. With threshold 0.5 there are {{1}} true positives, {{2}} false positives, {{3}} true negatives and {{4}} false negatives.",
  "gaps": [
    { "answer": "3" },
    { "answer": "1" },
    { "answer": "3" },
    { "answer": "1" }
  ],
  "explanation": "Above 0.5: 0.95, 0.85, 0.60 are spam (TP), 0.70 is normal (FP). Below: 0.40 is spam (FN), 0.45, 0.20, 0.10 are normal (TN)."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "spam-metrics",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["metrics"],
  "misconception": "precision-recall-same",
  "title": "Metrics of a spam filter",
  "intro": "1,000 emails, 100 of them spam. TP = 80, FN = 20, FP = 30, TN = 870.",
  "columns": ["Metric", "Calculation", "Value"],
  "rows": [
    ["Accuracy", "(80 + 870) / 1000", "0.95"],
    ["Precision", "80 / (80 + 30)", "0.73"],
    ["Recall", "80 / (80 + 20)", "0.8"],
    ["False positive rate", "30 / (30 + 870)", "0.033"]
  ],
  "result": { "label": "Recall", "value": "0.8" },
  "explanation": "Precision looks at the 110 flagged emails, recall at the 100 actual spam emails, FPR at the 900 normal ones."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lower-threshold",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["choose-metric", "confusion-matrix"],
  "misconception": "raise-both",
  "question": "In the eight-email example you lower the threshold from 0.5 to 0.3. Which two things happen?",
  "options": [
    { "text": "Recall rises from 0.75 to 1: the spam email at 0.40 is now caught", "correct": true, "feedback": "Yes: all 4 spam emails are above 0.3." },
    { "text": "Precision falls from 0.75 to about 0.67: the normal email at 0.45 is now flagged too", "correct": true, "feedback": "Yes: 4 right out of 6 flagged." },
    { "text": "Precision and recall both rise", "correct": false, "feedback": "For a fixed model, moving the threshold trades one against the other." },
    { "text": "Nothing changes, because the model is the same", "correct": false, "feedback": "The model's scores stay, but the decisions change." }
  ],
  "explanation": "Lower threshold → more positive predictions → more caught, more false alarms."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-metric",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["choose-metric"],
  "misconception": "threshold-always-half",
  "question": "A model screens X-ray images for a dangerous illness. Flagged images are checked again by a doctor. Which metric should be very high, and how should the threshold move?",
  "options": [
    { "text": "Recall; set the threshold low so that almost no ill patient is missed", "correct": true, "feedback": "Yes: a miss is dangerous, a false alarm only costs a second look." },
    { "text": "Precision; set the threshold high so the doctor checks few images", "correct": false, "feedback": "That saves doctor time but misses ill patients." },
    { "text": "Accuracy; keep the threshold at 0.5", "correct": false, "feedback": "If the illness is rare, accuracy hides the misses, and 0.5 is only a default." }
  ],
  "explanation": "Pick the metric from the cost of each error: misses expensive → recall; false alarms expensive → precision."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "metrics-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["metrics", "choose-metric"],
  "misconception": "accuracy-is-enough",
  "question": "A fraud detector looks at 10,000 payments, 50 of them fraud. It flags 40 payments, 30 of which are fraud. What is its recall?",
  "options": [
    { "text": "0.6", "correct": true, "feedback": "Yes: it found 30 of the 50 frauds." },
    { "text": "0.75", "correct": false, "feedback": "That is precision: 30 of the 40 flagged payments were fraud." },
    { "text": "0.997", "correct": false, "feedback": "That is roughly the accuracy, (30 + 9,940) / 10,000; it hides the 20 missed frauds." }
  ],
  "explanation": "Recall = found positives / all actual positives = 30 / 50."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "prevalence-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["metrics", "choose-metric"],
  "misconception": "fpr-is-one-minus-precision",
  "question": "A test has TPR 0.9 and FPR 0.05. It is used on a population where 1 % have the condition. Which two statements are correct?",
  "options": [
    { "text": "Precision is about 0.15: most positive results are false alarms", "correct": true, "feedback": "Per 10,000: TP = 90, FP = 0.05 · 9,900 = 495 → 90 / 585 ≈ 0.15." },
    { "text": "In a population with 10 % prevalence the same test would have precision about 0.67", "correct": true, "feedback": "TP = 900, FP = 450 → 900 / 1,350 ≈ 0.67." },
    { "text": "Precision = 1 − FPR = 0.95", "correct": false, "feedback": "FPR is conditioned on actual negatives, precision on predicted positives." },
    { "text": "Recall drops at lower prevalence", "correct": false, "feedback": "Recall is a rate within the actual positives; it does not depend on prevalence." }
  ],
  "explanation": "precision = π · TPR / (π · TPR + (1 − π) · FPR): rare conditions make positives mostly false alarms."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "f1-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["metrics"],
  "question": "From TP = 80, FN = 20, FP = 30, TN = 870, compute F1 (three decimals).",
  "answer": 0.762,
  "tolerance": 0.002,
  "explanation": "precision = 80 / 110 ≈ 0.727, recall = 0.8; F1 = 2 · 0.727 · 0.8 / 1.527 ≈ 0.762 (equivalently 2TP / (2TP + FP + FN) = 160 / 210)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "monotone-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["confusion-matrix", "choose-metric"],
  "misconception": "raise-both",
  "question": "You lower the threshold t of a fixed model step by step. Which two statements always hold?",
  "options": [
    { "text": "TP and FP never decrease", "correct": true, "feedback": "Lowering t can only add predicted positives." },
    { "text": "Recall never decreases", "correct": true, "feedback": "TP never decreases while TP + FN is fixed." },
    { "text": "Precision never increases", "correct": false, "feedback": "Usually it falls, but if the newly added example is a positive, precision can rise." },
    { "text": "Accuracy never decreases", "correct": false, "feedback": "Each added false positive lowers accuracy." }
  ],
  "explanation": "Recall and FPR are monotone in t; precision and accuracy are not."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "cost-threshold-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["choose-metric"],
  "misconception": "threshold-always-half",
  "question": "A calibrated fraud model gives p = P(fraud). Blocking a legitimate payment costs € 5 (false positive); letting a fraud through costs € 95 (false negative). Above which p should you block a payment?",
  "answer": 0.05,
  "tolerance": 0,
  "explanation": "Block when the expected cost of letting it pass exceeds that of blocking: 95 · p > 5 · (1 − p) ↔ p > 5 / 100 = 0.05."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "prediction-bias-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["prediction-bias"],
  "question": "In a test set, 5 % of the emails are spam. The model's predicted spam probabilities average 0.20. What is the prediction bias (average prediction minus average label)?",
  "answer": 0.15,
  "tolerance": 0,
  "explanation": "0.20 − 0.05 = 0.15. Such a large gap means something is wrong with the data, the features or the training."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "prediction-bias-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["prediction-bias"],
  "misconception": "zero-bias-means-good",
  "question": "Labels of 10 examples: 1, 0, 0, 1, 0, 0, 0, 0, 1, 0. Predictions: 0.6, 0.2, 0.1, 0.5, 0.3, 0.2, 0.1, 0.4, 0.4, 0.2. Which two statements are correct?",
  "options": [
    { "text": "The prediction bias is 0.0, because the mean prediction 0.30 equals the base rate 0.30", "correct": true, "feedback": "Sum of predictions 3.0 / 10 = 0.30; three positives / 10 = 0.30." },
    { "text": "A model predicting 0.30 for every example would also have prediction bias 0 but could not separate the classes", "correct": true, "feedback": "Zero bias is necessary, not sufficient." },
    { "text": "Zero prediction bias proves the model is well calibrated in every region of the input space", "correct": false, "feedback": "Biases in different slices can cancel; check per slice." },
    { "text": "Stronger L2 regularization always reduces prediction bias", "correct": false, "feedback": "Too strong regularization is one of the causes of prediction bias." }
  ],
  "explanation": "Prediction bias compares means; it catches gross problems but says nothing about ranking quality."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "moderation-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["choose-metric", "metrics"],
  "question": "A platform uses a classifier to remove hateful comments automatically, and another setting of the same classifier to send comments to human moderators for review. 2 % of comments are hateful. Which metric would you optimize for each use, roughly where would the two thresholds sit, and which number would you report to management instead of accuracy?",
  "rubric": [
    "Automatic removal: false positives (removing legitimate speech) are costly → high precision, high threshold",
    "Review queue: misses are costly, humans catch false alarms → high recall, lower threshold, limited by moderator capacity",
    "Accuracy is misleading at 2 % prevalence (always 'fine' gives 98 %)",
    "Report precision and recall (or the share of hateful comments caught and the false-removal rate) per setting"
  ],
  "sample_answer": "For automatic removal I want very high precision, so the threshold is high: wrongly deleting normal comments is the expensive error. For the review queue I want high recall with a lower threshold, because moderators filter out false alarms; the queue size limits how low it can go. At 2 % prevalence accuracy is useless (98 % for doing nothing), so I would report recall and precision for both settings.",
  "explanation": "One model can serve two decisions with two thresholds chosen from the cost of each error."
}
```

# Examples

- **Fishing net**: a fine net (low threshold) catches every fish but also lots of junk; a coarse net (high threshold) brings up almost only fish but lets many escape. Recall is the share of fish caught, precision the share of the catch that is fish.

# Tutor notes

- Let the learner sort the eight emails at threshold 0.5 by hand before naming TP, FP, TN, FN.
- Always ask "out of what?" for a metric: precision divides by what the model flagged, recall by what was really there.
- Use the threshold-lab simulator only after the learner has predicted what raising the threshold does.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Classification" (thresholds and the confusion matrix; accuracy, recall, precision; prediction bias), https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
