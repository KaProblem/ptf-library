---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/datasets-and-splits
title: Datasets, labels and data splits
description: Good models need good data (reliable labels, enough examples of every class) and an honest evaluation on training, validation and test sets that never leak into each other.
lang: en
levels: [highschool, college]
objectives:
  - id: data-quality
    text: Name the common problems in a dataset (missing values, duplicates, bad labels, unrepresentative examples), and tell a direct label from a proxy label.
  - id: imbalance
    text: Handle an imbalanced dataset by downsampling and upweighting, and compute the resulting class shares and weights.
  - id: splits
    text: Split data into training, validation and test sets, say what each is for, and recognise leakage that makes test results too good.
tags: [machine-learning, data, datasets, labels, class-imbalance, validation, test-set, leakage]
about:
  - wikidata: Q3985153
    label: training, validation, and test data sets
  - wikidata: Q5227332
    label: data pre-processing
requires:
  - ptf:el/ml-foundations/categorical-data
leads_to:
  - ptf:el/ml-foundations/overfitting-regularization
duration_min: { highschool: 30, college: 30 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Datasets, generalization, and overfitting: data characteristics, labels, imbalanced datasets, dividing the original dataset"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a student prepares for an exam by memorizing the answers of last year's paper. Then the teacher gives them exactly that paper as the exam. They score 100 %. How well do they know the subject?
- A model is only as good as its data, and its test score is only honest if it is measured on examples it never saw. Most surprising failures of real ML systems are data problems, not model problems.
- Afterwards the learner can spot data and label problems, rebalance a dataset with a rare class, and split data so the final score can be trusted.

# Core

The quality of a model depends first on its data: examples should be
reliable (correct labels, no duplicates or broken values) and
representative of the cases the model will see. The label should be what
we actually care about; when that cannot be measured, a proxy label
(clicks instead of interest) stands in and adds its own errors. When one
class is rare, the model sees too few examples of it per batch; a common
fix is to downsample the majority class during training and upweight the
remaining majority examples by the same factor, so the predicted
probabilities stay correct. Data is split into a training set to fit the
model, a validation set to compare models and tune hyperparameters, and a
test set used once at the end. The sets must not overlap or leak
information into each other, or the test score overstates how well the
model works on new data.

# Key facts

- Reliability problems: omitted values, duplicate examples, bad feature values, wrong or inconsistent labels (two raters disagree). Representativeness problems: data from a different population, season or device than the one the model will serve.
- Direct label: the target itself (did the customer cancel?). Proxy label: something correlated (did they open a complaint email?). A model trained on a proxy optimizes the proxy.
- Imbalance example: 100,000 examples, 1 % positive → 1,000 positives, 99,000 negatives. Downsampling negatives by factor 20 keeps 4,950 negatives; positives are now 1,000 / 5,950 ≈ 16.8 % of the training data. Each kept negative gets weight 20.
- Upweighting by the downsampling factor keeps the model calibrated: 4,950 negatives × 20 count like 99,000.
- Typical split 80 / 10 / 10: 50,000 examples → 40,000 training, 5,000 validation, 5,000 test.
- Training set: fit parameters. Validation set: choose hyperparameters and models, many times. Test set: final estimate, once. Reusing the test set for decisions turns it into a validation set.
- Leakage: duplicates in training and test, features computed with the label or with future information, statistics (mean, vocabulary) computed on all data, random splits of data that is grouped (the same patient, user or day in both sets).
- Time-ordered data (prices, demand) is split by time: train on the past, test on the later period.

# Level: highschool

<!-- ptf:text v1 -->

The student who memorized last year's paper scored 100 % on that same
paper, and that says nothing about what they understood. Models can do
the same. If we test a model on the examples it was trained on, it can
look perfect and still fail on anything new. That is why we split the
data before training:

- **Training set** (often 80 %): the model learns from these.
- **Validation set** (10 %): we use it to compare settings, such as two learning rates, and pick the better one.
- **Test set** (10 %): locked away and used once, at the very end, to see how good the final model really is.

With 50,000 examples that is 40,000, 5,000 and 5,000. The test set only
stays honest if nothing from it sneaks into training. Common sneaks: the
same example appears twice and lands in both sets; a feature secretly
contains the answer (a "refund issued" column in a fraud model); or we
keep checking the test score and changing the model until it looks good.

Before splitting, look at the data itself. Are there empty values,
duplicates, impossible entries? Are the labels right? If two people label
the same photo differently, the model learns their confusion. Is the
label what we really want? "Clicked on the ad" is not the same as "liked
the product", but it is easier to measure: a **proxy label**.

Finally, check how often each class appears. If only 1 in 100 emails is
fraud, a batch of 100 often contains one example or none, and the model
learns to say "not fraud" always. A fix: keep all fraud examples but only
every 20th normal one (**downsampling**). Now fraud is about 17 % of the
training data. To keep the model's probabilities honest, each remaining
normal example counts 20 times (**upweighting**).

# Level: college

<!-- ptf:text v1 -->

Generalization estimates are only as good as the assumption that test
data is drawn from the same distribution as future data and is
independent of training. Data quality work therefore comes first:
profile features (missing, duplicate, invalid values), audit labels
(inter-rater agreement, label noise concentrated in hard classes), and
check coverage: does the sample represent the deployment population,
season and device mix? Label choice matters: a proxy label y′ (click,
watch time, arrest) differs systematically from the target y
(satisfaction, interest, crime), and the model optimizes y′ exactly.

With heavy class imbalance (π = 1 %), mini-batches carry few positives
and the gradient signal for them is weak. Downsampling the majority by
factor k raises the positive share to π / (π + (1 − π) / k): 1 % with
k = 20 gives ≈ 16.8 %. Training on the downsampled data shifts the
model's base rate; giving each kept majority example weight k restores
the original loss in expectation, so probabilities stay calibrated, while
batches are now balanced enough to learn from. Alternatives: class
weights without downsampling, or recalibrating afterwards.

Splits serve different roles: the training set fits θ, the validation set
selects hyperparameters and models (and is therefore slowly overfit by
repeated use), the test set gives one final, unbiased estimate. Leakage
breaks independence: exact or near duplicates across splits (common in
scraped data), group leakage (the same user or patient in several splits;
split by group instead), temporal leakage (random splits of time series;
split by time and features computed only from the past), target leakage
(features derived from the label or recorded after the event), and
preprocessing leakage (scaling or vocabularies fit on all data). A
test score far above validation, or a production score far below test,
are the usual symptoms.

# Misconceptions

- **test-on-training**: Testing on the training data shows how good the model is → it shows how well it memorized; only unseen data measures generalization.
- **tune-on-test**: Using the test set to pick the best model is fine → every decision based on it lets it leak into the model; use the validation set and touch the test set once.
- **more-data-fixes-labels**: More data always helps, even with bad labels → systematic label errors are learned faithfully; more of them does not cancel them.
- **downsample-without-weight**: Downsampling the majority class is enough on its own → without upweighting, the model's probabilities are too high for the minority class.
- **random-split-always-ok**: A random split is always correct → with time series or repeated users/patients it leaks; split by time or by group.
- **proxy-is-target**: A proxy label measures the same thing as the real goal → it is only correlated; the model learns the proxy, including where it differs.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "memorized-exam-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "test-on-training",
  "question": "A student memorizes last year's exam answers and then gets exactly that exam. They score 100 %. What does the score tell you?",
  "options": [
    { "text": "Very little about how well they understand the subject: they may only have memorized", "correct": true, "feedback": "Yes: to measure understanding you need questions they have not seen." },
    { "text": "That they have mastered the subject", "correct": false, "feedback": "They have mastered that paper. A new question might go badly." },
    { "text": "That the exam was too easy", "correct": false, "feedback": "The problem is not difficulty, it is that they saw the questions before." }
  ],
  "explanation": "A model tested on its own training data is the memorizing student. Honest evaluation uses data held back from training."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "label-problems",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["data-quality"],
  "misconception": "proxy-is-target",
  "question": "A video app wants to recommend videos people enjoy. It trains on 'the user watched at least 30 seconds' as the label. Which two statements are true?",
  "options": [
    { "text": "This is a proxy label: watching 30 seconds is related to enjoying, but not the same", "correct": true, "feedback": "Yes: people also watch 30 seconds of things they dislike." },
    { "text": "The model will learn to recommend videos that hold attention for 30 seconds, even if people don't enjoy them", "correct": true, "feedback": "Yes: a model optimizes exactly the label it gets." },
    { "text": "Because there are millions of examples, label errors cancel out", "correct": false, "feedback": "Systematic differences between proxy and goal do not cancel; they are learned." },
    { "text": "The label is fine as long as there are no missing values", "correct": false, "feedback": "Complete data can still measure the wrong thing." }
  ],
  "explanation": "Direct labels measure the goal; proxy labels measure something correlated, and the model learns the proxy."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "downsample-fraud",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["imbalance"],
  "misconception": "downsample-without-weight",
  "title": "Rebalancing a fraud dataset",
  "intro": "100,000 payments, 1 % fraud. Keep all fraud examples and every 20th normal one.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Fraud examples", "1 % of 100,000", "1000"],
    ["Normal examples", "100,000 − 1,000", "99000"],
    ["Normal examples kept", "99,000 / 20", "4950"],
    ["Share of fraud after downsampling", "1,000 / (1,000 + 4,950)", "0.168"],
    ["Weight of each kept normal example", "downsampling factor", "20"]
  ],
  "result": { "label": "Fraud share", "value": "0.168" },
  "explanation": "Fraud rises from 1 % to about 17 % of the training data; weighting each kept normal example 20 times keeps the predicted probabilities honest."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "split-sizes",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["splits"],
  "text": "50,000 examples are split 80 / 10 / 10. The training set has {{1}} examples, the validation set {{2}} and the test set {{3}}.",
  "gaps": [
    { "answer": "40000", "accepted": ["40,000", "40 000"] },
    { "answer": "5000", "accepted": ["5,000", "5 000"] },
    { "answer": "5000", "accepted": ["5,000", "5 000"] }
  ],
  "explanation": "80 % = 40,000; 10 % = 5,000 each."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "role-of-sets",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["splits"],
  "misconception": "tune-on-test",
  "question": "You try 20 learning rates and keep the one with the best score. Which set should that score come from?",
  "options": [
    { "text": "The validation set; the test set is kept for one final check", "correct": true, "feedback": "Yes: choosing with the test set would make it part of training." },
    { "text": "The test set, because it is the most honest", "correct": false, "feedback": "It is honest only until you make decisions with it." },
    { "text": "The training set", "correct": false, "feedback": "The training score rewards memorizing; it would pick the setting that overfits most." }
  ],
  "explanation": "Train on training data, choose on validation data, report on test data once."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "spot-leak",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["splits", "data-quality"],
  "question": "A model predicts whether a customer will cancel their contract. Its test accuracy is 99.8 %, far better than expected. Which feature most likely leaks the answer?",
  "options": [
    { "text": "'Date of final invoice', which is only filled in after a customer has cancelled", "correct": true, "feedback": "Yes: the feature contains the label. In real use it would be empty at prediction time." },
    { "text": "'Number of support calls last month'", "correct": false, "feedback": "Known before the decision, a fair feature." },
    { "text": "'Contract length in months'", "correct": false, "feedback": "Known in advance, a fair feature." }
  ],
  "explanation": "A feature recorded after the event, or computed from the label, leaks it; a too-good test score is the warning sign."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "datasets-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["imbalance", "splits"],
  "question": "Only 1 in 200 images in a dataset shows a defect. A model always says 'no defect'. What is true?",
  "options": [
    { "text": "It is right on 99.5 % of the images and finds no defect at all; the rare class needs rebalancing and other metrics", "correct": true, "feedback": "Yes: imbalance makes the lazy answer look good." },
    { "text": "It is a good model because 99.5 % is very high", "correct": false, "feedback": "It never finds what it is built for." },
    { "text": "The problem disappears if you test on more images", "correct": false, "feedback": "More images have the same share; the model still finds nothing." }
  ],
  "explanation": "With a rare class, downsample and upweight in training and judge with recall and precision."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "downsample-share-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["imbalance"],
  "question": "The positive class is 0.5 % of the data. You downsample the negatives by a factor of 50. What share of the training data is positive afterwards? (three decimals)",
  "answer": 0.201,
  "tolerance": 0.002,
  "explanation": "π / (π + (1 − π) / k) = 0.005 / (0.005 + 0.995 / 50) = 0.005 / 0.0249 ≈ 0.201."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "calibration-weights-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["imbalance"],
  "misconception": "downsample-without-weight",
  "question": "You downsample negatives by factor k and train logistic regression. Which two statements are correct?",
  "options": [
    { "text": "Without weights, the predicted probabilities for the positive class come out too high on real data", "correct": true, "feedback": "Yes: the model learned a base rate that is k times too favourable to positives (in odds)." },
    { "text": "Weighting each kept negative by k makes the expected loss equal to the loss on the full data", "correct": true, "feedback": "Yes: each kept negative stands for k originals." },
    { "text": "Downsampling changes which examples are positive", "correct": false, "feedback": "Labels are unchanged; only the mix of examples changes." },
    { "text": "Weighting by k makes batches imbalanced again, so it cancels the benefit", "correct": false, "feedback": "Batches stay balanced in count; the weights only rescale the loss." }
  ],
  "explanation": "Downsample for better batches, upweight to restore the correct objective and calibration."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "group-leak-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["splits", "data-quality"],
  "misconception": "random-split-always-ok",
  "question": "A dataset has 20 X-ray images per patient from 5,000 patients. A random image-level split gives test AUC 0.97; in a pilot at another hospital AUC is 0.81. Which two explanations are plausible?",
  "options": [
    { "text": "Group leakage: images of the same patient are in training and test, so the model partly recognizes patients", "correct": true, "feedback": "Yes: split by patient." },
    { "text": "The training data does not represent the other hospital (scanners, population)", "correct": true, "feedback": "Yes: a representativeness problem; test data from the same source cannot reveal it." },
    { "text": "The test set was too large", "correct": false, "feedback": "A larger test set gives a more precise estimate, not a biased one." },
    { "text": "AUC is not a valid metric for images", "correct": false, "feedback": "AUC is fine; the evaluation design is the issue." }
  ],
  "explanation": "Split by the unit that will be new in deployment (patient, user, time), and test on the deployment distribution."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "split-plan-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["splits", "imbalance", "data-quality"],
  "question": "You have three years of daily sales for 400 shops and want to predict next week's sales per shop. Some shops opened only last year, and holiday weeks are rare. Design the train / validation / test split and list two leakage risks you would check.",
  "rubric": [
    "Split by time: e.g. years 1–2 training, a later block validation, the most recent weeks test",
    "Features use only information available before the predicted week",
    "Leakage risks: random splits mixing future into training; statistics computed over all data; duplicated rows; features recorded after the sales",
    "Mentions holidays or new shops: ensure validation/test cover them or report them separately"
  ],
  "sample_answer": "Split by time: train on the first two years and a few months, validate on the next block, and keep the last 3 months as the test set. Lags and averages are computed only from earlier weeks, and scaling statistics only from the training period. I would check that no random shuffling mixes future weeks into training and that no feature (like 'items restocked') is recorded after the sales. Holiday weeks and new shops get their own error report, since they are rare.",
  "explanation": "Mirror deployment in the split: the model always predicts the future from the past."
}
```

# Tutor notes

- Start with the memorized exam; learners usually invent the train/test idea themselves.
- Highschool: use numbers for downsampling, but keep the reason for upweighting at the level of "each kept example stands for 20".
- The leakage examples are the most transferable part of this step; ask the learner to invent one for a domain they know.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Datasets, generalization, and overfitting", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
