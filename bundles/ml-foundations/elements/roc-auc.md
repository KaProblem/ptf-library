---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/roc-auc
title: ROC curve and AUC
description: The ROC curve shows true positive rate against false positive rate for every threshold at once; the area under it (AUC) measures how well a model ranks positives above negatives.
lang: en
levels: [highschool, college]
objectives:
  - id: roc-points
    text: Compute the true positive rate and false positive rate at several thresholds and place them as points of a ROC curve.
  - id: auc-meaning
    text: Interpret AUC as the chance that a random positive gets a higher score than a random negative, compute it for a small example, and know what 0.5 and 1.0 mean.
  - id: compare-models
    text: Compare models with ROC curves and AUC, pick an operating point for a task, and say when AUC alone is not enough.
tags: [machine-learning, classification, roc, auc, evaluation, threshold]
about:
  - wikidata: Q327120
    label: receiver operating characteristic
requires:
  - ptf:el/ml-foundations/classification-metrics
leads_to:
  - ptf:el/ml-foundations/numerical-data
duration_min: { highschool: 30, college: 30 }
figures:
  - id: roc-curve
    objectives: [roc-points, auc-meaning]
    use_when: after the learner has computed a few (FPR, TPR) points by hand, to see them joined into a curve
simulators:
  - ref: ptf:sim/threshold-lab@^1.0.0
    station: roc
    levels: [highschool, college]
    role: explore
    use_when: the learner should watch the ROC point move as the threshold slides, and see the area grow when the classes separate better
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Classification: ROC and AUC"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: two spam filters. At threshold 0.5 filter A has higher precision, at 0.3 filter B does. Which filter is better? You cannot tell from one threshold.
- The ROC curve looks at all thresholds at once. It answers a simpler question: does the model put the positives above the negatives? Its area, AUC, is one of the most used numbers in ML.
- Afterwards the learner can draw a ROC curve from a handful of scores, compute and interpret AUC, and use both to compare models and pick a threshold.

# Core

For every threshold a classifier has a true positive rate
TPR = TP / (TP + FN) and a false positive rate FPR = FP / (FP + TN).
Plotting TPR against FPR for all thresholds gives the ROC curve: it starts
at (0, 0), where nothing is flagged, and ends at (1, 1), where everything
is. A perfect model goes straight up to (0, 1); a model that guesses at
random lies on the diagonal. The area under the curve (AUC) is the
probability that a randomly chosen positive example gets a higher score
than a randomly chosen negative one: 1.0 is a perfect ranking, 0.5 is
chance. AUC compares models independently of the threshold, but choosing
the threshold (a point on the curve) still depends on the costs of errors,
and when positives are very rare, a precision-recall curve shows the
difference between models more clearly.

# Key facts

- ROC point at a threshold: x = FPR, y = TPR. Lowering the threshold moves the point up and/or to the right.
- Eight emails (S = spam): 0.95 S, 0.85 S, 0.70 not, 0.60 S, 0.45 not, 0.40 S, 0.20 not, 0.10 not; 4 positives, 4 negatives.
- Points: t = 0.8 → (0, 0.5); t = 0.5 → (0.25, 0.75); t = 0.3 → (0.5, 1); plus the corners (0, 0) and (1, 1).
- AUC there: of the 4 · 4 = 16 (spam, normal) pairs, 13 have the spam email scored higher → AUC = 13 / 16 = 0.8125.
- AUC = 1: every positive outscores every negative. AUC = 0.5: no better than random. AUC < 0.5: the ranking is reversed (flipping the scores would give 1 − AUC).
- AUC depends only on the order of the scores, not on their values: squaring all scores leaves it unchanged. It says nothing about calibration.
- Operating point: the point on the curve that fits the task, e.g. the highest TPR with FPR ≤ 0.05, or the lowest expected cost.
- With very rare positives a small FPR can still mean many false alarms; precision-recall curves (and their area) then separate models better than ROC.

# Level: highschool

<!-- ptf:text v1 -->

Take the eight emails again, sorted by score: 0.95 spam, 0.85 spam,
0.70 normal, 0.60 spam, 0.45 normal, 0.40 spam, 0.20 normal, 0.10 normal.
Now slide the threshold from the top down and write down two numbers each
time: how many of the 4 spam emails are caught (**true positive rate**)
and how many of the 4 normal emails are wrongly flagged (**false positive
rate**).

Above everything nothing is flagged: (0, 0). At 0.8 the two top spam
emails are caught, no false alarm: (0, 0.5). At 0.5: three spam, one
normal: (0.25, 0.75). At 0.3: all four spam, two normal: (0.5, 1). At the
bottom everything is flagged: (1, 1). Join these points with FPR along the
bottom and TPR up the side, and you have the **ROC curve**.

A great model shoots up first (catches spam before any false alarm) and
then runs along the top. A model that guesses runs along the diagonal.
The **area under the curve**, AUC, measures this in one number from 0.5
(guessing) to 1 (perfect).

There is a neat way to compute it: take every pair of one spam email and
one normal email. In how many pairs is the spam email scored higher? Here
13 of the 16 pairs, so AUC = 13 / 16 ≈ 0.81. That is also what AUC means:
pick a random spam email and a random normal one; with probability 0.81
the model ranks the spam higher.

AUC helps to compare two models without choosing a threshold first. But
to use a model you still pick one point on its curve, for example "catch
as much spam as possible while flagging at most 1 in 20 normal emails".

# Level: college

<!-- ptf:text v1 -->

Fix scores sᵢ and labels yᵢ. As the threshold t falls from +∞ to −∞, the
classifier's (FPR(t), TPR(t)) moves from (0, 0) to (1, 1) in steps: up by
1/P for each positive passed, right by 1/N for each negative (diagonally
for ties). For the eight emails, t = 0.8, 0.5, 0.3 give (0, 0.5),
(0.25, 0.75) and (0.5, 1).

The area under this staircase equals the Mann–Whitney statistic
AUC = P(s⁺ > s⁻) + ½ P(s⁺ = s⁻) for a random positive–negative pair: each
step right by 1/N adds a column whose height is the share of positives
already ranked above that negative. Here 13 of 16 pairs are ordered
correctly, AUC = 0.8125. Two consequences: AUC is invariant under any
strictly increasing transform of the scores (it is a pure ranking
measure, blind to calibration), and it averages over all thresholds,
including ones nobody would use.

A model dominates another if its curve is above everywhere; curves that
cross can have equal AUC and still suit different tasks (one better at
low FPR, one at high TPR). Operating points come from constraints or
costs: the slope of the iso-cost line, c_FP · N / (c_FN · P), touches the
curve at the cost-optimal threshold. Because FPR divides by the
negatives, under extreme imbalance (π = 0.1 %) a FPR of 0.01 can mean ten
false alarms per true positive; precision-recall curves expose this, and
average precision is then the better summary. Partial AUC over the
relevant FPR range is another option.

# Misconceptions

- **auc-is-accuracy**: AUC 0.9 means 90 % of predictions are right → AUC is about ranking pairs across all thresholds, not about decisions at one threshold.
- **diagonal-is-zero**: A model on the diagonal has AUC 0 → the diagonal is random guessing, AUC 0.5; AUC near 0 is a reversed ranking.
- **auc-picks-threshold**: A high AUC tells you which threshold to use → AUC summarizes all thresholds; the operating point is chosen from costs or constraints.
- **auc-measures-calibration**: High AUC means the probabilities are right → AUC only depends on the order of scores; a model can rank perfectly with badly calibrated probabilities.
- **roc-always-enough**: ROC is always the best comparison → with very rare positives, precision-recall curves show differences ROC hides.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-filter-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "auc-picks-threshold",
  "question": "At threshold 0.5 filter A has higher precision, at threshold 0.3 filter B does. What would help you decide which filter is better in general?",
  "options": [
    { "text": "Look at how both do over all thresholds at once", "correct": true, "feedback": "Yes: that is what the ROC curve does." },
    { "text": "Always compare at 0.5", "correct": false, "feedback": "0.5 is just one choice; the comparison might flip elsewhere." },
    { "text": "Compare the average of their scores", "correct": false, "feedback": "The average score says nothing about whether spam is ranked above normal email." }
  ],
  "explanation": "A comparison that does not depend on one threshold looks at the whole curve of TPR against FPR."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "roc-point",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["roc-points"],
  "text": "Scores: 0.95 spam, 0.85 spam, 0.70 normal, 0.60 spam, 0.45 normal, 0.40 spam, 0.20 normal, 0.10 normal. At threshold 0.5 the true positive rate is {{1}} and the false positive rate is {{2}}.",
  "gaps": [
    { "answer": "0.75", "accepted": ["3/4"] },
    { "answer": "0.25", "accepted": ["1/4"] }
  ],
  "explanation": "3 of 4 spam emails are above 0.5 (TPR 0.75); 1 of 4 normal emails is (FPR 0.25)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "curve-shape",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["roc-points", "auc-meaning"],
  "misconception": "diagonal-is-zero",
  "question": "Which two statements about ROC curves are true?",
  "options": [
    { "text": "Every ROC curve starts at (0, 0) and ends at (1, 1)", "correct": true, "feedback": "Yes: at the highest threshold nothing is flagged, at the lowest everything." },
    { "text": "A model that guesses at random gives a curve near the diagonal, AUC about 0.5", "correct": true, "feedback": "Yes: it catches positives and false alarms at the same rate." },
    { "text": "A random model has AUC 0", "correct": false, "feedback": "The area under the diagonal is half the square: 0.5." },
    { "text": "A perfect model runs along the diagonal", "correct": false, "feedback": "A perfect model goes straight up to (0, 1) first: all positives caught before any false alarm." }
  ],
  "explanation": "ROC runs from (0, 0) to (1, 1); the higher and further left, the better."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "auc-pairs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["auc-meaning"],
  "misconception": "auc-is-accuracy",
  "question": "Spam scores: 0.9, 0.7, 0.4. Normal scores: 0.8, 0.3, 0.2. In what share of the 9 (spam, normal) pairs is the spam email scored higher? Give AUC as a decimal (two decimals).",
  "answer": 0.78,
  "tolerance": 0.01,
  "explanation": "0.9 beats all 3, 0.7 beats 2 (0.3, 0.2), 0.4 beats 2: 7 of 9 pairs, AUC = 7 / 9 ≈ 0.78."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pick-model",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["compare-models"],
  "question": "Model A has AUC 0.92, model B has AUC 0.75 on the same test emails. Which statement is the best conclusion?",
  "options": [
    { "text": "A is better at ranking spam above normal emails; you still have to choose A's threshold for the job", "correct": true, "feedback": "Yes: AUC compares rankings, the threshold is a separate choice." },
    { "text": "A gets 92 % of emails right", "correct": false, "feedback": "AUC is not accuracy; it is the chance that a random spam is ranked above a random normal email." },
    { "text": "With A, any threshold will do", "correct": false, "feedback": "Different thresholds still trade false alarms against misses." }
  ],
  "explanation": "AUC: how well a model ranks. Threshold: where to cut that ranking for a task."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "roc-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["auc-meaning", "roc-points"],
  "misconception": "auc-is-accuracy",
  "question": "A model has AUC = 0.5. What does that mean?",
  "options": [
    { "text": "It ranks positives above negatives no better than a coin flip", "correct": true, "feedback": "Yes: its curve lies on the diagonal." },
    { "text": "It is right on half of the examples", "correct": false, "feedback": "AUC is about ranking pairs, not about decisions at one threshold." },
    { "text": "It catches half of the positives", "correct": false, "feedback": "That is a TPR of 0.5 at some threshold, a single point on the curve." }
  ],
  "explanation": "AUC = 0.5 is chance level; 1.0 is a perfect ranking."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "auc-eight-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["auc-meaning", "roc-points"],
  "question": "Scores of positives: 0.95, 0.85, 0.60, 0.40. Scores of negatives: 0.70, 0.45, 0.20, 0.10. Compute the AUC (four decimals).",
  "answer": 0.8125,
  "tolerance": 0,
  "explanation": "Correctly ordered pairs: 4 + 4 + 3 + 2 = 13 of 16 → 0.8125. The same area results from the staircase through (0, 0.5), (0.25, 0.5), (0.25, 0.75), (0.5, 0.75), (0.5, 1)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "invariance-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["auc-meaning", "compare-models"],
  "misconception": "auc-measures-calibration",
  "question": "Model B outputs the square of model A's scores (all scores in (0, 1)). Which two statements are correct?",
  "options": [
    { "text": "A and B have exactly the same ROC curve and AUC", "correct": true, "feedback": "Squaring is strictly increasing on (0, 1), so the order of the scores is unchanged." },
    { "text": "If A is well calibrated, B is not", "correct": true, "feedback": "B's numbers are systematically lower; same ranking, different probabilities." },
    { "text": "B has the higher AUC because its scores are more spread out", "correct": false, "feedback": "AUC only depends on the order." },
    { "text": "At threshold 0.5 both make the same predictions", "correct": false, "feedback": "A score of 0.6 stays above 0.5 for A but becomes 0.36 for B." }
  ],
  "explanation": "AUC is a ranking statistic, invariant to monotone transforms and blind to calibration."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "imbalance-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["compare-models"],
  "misconception": "roc-always-enough",
  "question": "Fraud makes up 0.1 % of 1,000,000 transactions. A model operates at TPR 0.8 and FPR 0.01. Which statement is correct?",
  "options": [
    { "text": "It raises about 9,990 false alarms for 800 caught frauds, so precision is only about 0.074 although the ROC point looks excellent", "correct": true, "feedback": "Yes: 0.01 · 999,000 = 9,990 FP; 800 / 10,790 ≈ 0.074." },
    { "text": "An FPR of 0.01 means 1 % of its alarms are false", "correct": false, "feedback": "FPR is the share of legitimate transactions flagged, not the share of alarms that are false." },
    { "text": "With AUC above 0.9, precision is always above 0.9", "correct": false, "feedback": "Precision also depends on prevalence; at 0.1 % it can be very low." }
  ],
  "explanation": "Under heavy imbalance, compare models with precision-recall curves or report precision at the operating point."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "crossing-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["compare-models"],
  "misconception": "auc-picks-threshold",
  "question": "Two ROC curves cross: A is higher for FPR < 0.1, B is higher for FPR > 0.1; both have AUC 0.88. A bank can tolerate at most 2 % false alarms. Which model, and why?",
  "options": [
    { "text": "A, because only the region FPR ≤ 0.02 matters and A has the higher TPR there", "correct": true, "feedback": "Yes: equal AUC does not mean equal usefulness at the operating point." },
    { "text": "Either, because their AUCs are equal", "correct": false, "feedback": "AUC averages over all thresholds, including ones the bank will never use." },
    { "text": "B, because it is better over most of the FPR range", "correct": false, "feedback": "Most of the range is irrelevant under the 2 % constraint." }
  ],
  "explanation": "Choose models at the operating region; partial AUC formalizes this."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "report-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["compare-models", "auc-meaning", "roc-points"],
  "question": "A hospital compares two sepsis-warning models. A colleague reports only \"model X has AUC 0.86, model Y 0.83, so X is better\". Write what else you would want to see before deciding, and why.",
  "rubric": [
    "The ROC curves themselves, to see whether they cross",
    "TPR (and precision or alarms per day) at the operating point the hospital can handle, e.g. a maximum number of alarms",
    "Prevalence: with rare sepsis, precision / PR curves matter for alarm fatigue",
    "Calibration of the probabilities if doctors read them as risks; confidence intervals or test-set size for a 0.03 difference"
  ],
  "sample_answer": "I would want the ROC curves to see whether they cross, and TPR and alarms per day at the alarm rate the ward can handle, since that is where the model will run. Sepsis is rare, so a precision-recall curve shows alarm fatigue better. If doctors read the output as a risk, calibration matters, which AUC ignores. Finally, is 0.86 vs 0.83 more than noise on this test set?",
  "explanation": "AUC is a good first summary of ranking, not a decision: look at the operating point, imbalance and calibration."
}
```

# Tutor notes

- Build the curve from the eight emails by hand before showing the figure or the simulator; the staircase is the insight.
- The pair-counting view of AUC is the one learners remember; use it at both levels.
- Keep in mind for later: ROC/AUC reappear in the fairness step, where TPR is compared between groups.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Classification" (ROC and AUC), https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
