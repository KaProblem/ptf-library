---
type: Learning Path
ptf_version: "0.1"
id: ptf:path/ml-foundations/crash-course
title: Machine learning crash course
description: The foundations of machine learning in 16 steps, from what a model is through linear and logistic regression, evaluation, data preparation and overfitting to neural networks, embeddings, production systems and fairness.
lang: en
goal: Understand how supervised machine learning models are built, trained, evaluated and deployed well enough to read about them critically and to train a first model yourself.
objectives:
  - Explain how a model learns from labeled examples by minimizing a loss with gradient descent, from linear regression up to neural networks.
  - Evaluate a classifier with the right metric and prepare data and splits so that the evaluation can be trusted.
  - Recognize overfitting, training-serving skew and unfair outcomes, and name what to do about each.
audience: [highschool, college]
steps:
  - element: ptf:el/ml-foundations/what-is-ml
  - element: ptf:el/ml-foundations/linear-regression
  - element: ptf:el/ml-foundations/gradient-descent
  - element: ptf:el/ml-foundations/logistic-regression
  - element: ptf:el/ml-foundations/classification-metrics
  - element: ptf:el/ml-foundations/roc-auc
  - element: ptf:el/ml-foundations/numerical-data
  - element: ptf:el/ml-foundations/categorical-data
  - element: ptf:el/ml-foundations/datasets-and-splits
  - element: ptf:el/ml-foundations/overfitting-regularization
  - element: ptf:el/ml-foundations/neural-networks
  - element: ptf:el/ml-foundations/backpropagation
  - element: ptf:el/ml-foundations/multiclass-classification
  - element: ptf:el/ml-foundations/embeddings
  - element: ptf:el/ml-foundations/production-ml
  - element: ptf:el/ml-foundations/ml-fairness
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0)"
---

# Introduction

Machine learning lets a computer find a rule from examples instead of being
programmed with it. This course starts with the simplest model, a straight
line fitted to data, and shows how it learns by reducing its error step by
step. The same idea then carries a spam filter, a neural network and the
embeddings behind recommendations and language models. Along the way the
learner meets the questions that decide whether a model is any good: which
metric to trust, how to prepare data, how to tell learning from memorizing,
and what can go wrong once a model is used by real people.

At the end the learner can explain a training step, judge a classifier by
its confusion matrix and ROC curve, spot overfitting in loss curves and name
the main risks of a deployed model. It takes about 12 to 15 hours at
highschool level, a little more at college level.

# Steps

| # | Phase | Element |
| --- | --- | --- |
| 1 | A Models and training | [What machine learning is](../elements/what-is-ml.md) |
| 2 | A Models and training | [Linear regression and loss](../elements/linear-regression.md) |
| 3 | A Models and training | [Gradient descent and hyperparameters](../elements/gradient-descent.md) |
| 4 | B Classification | [Logistic regression](../elements/logistic-regression.md) |
| 5 | B Classification | [Thresholds, the confusion matrix and its metrics](../elements/classification-metrics.md) |
| 6 | B Classification | [ROC curve and AUC](../elements/roc-auc.md) |
| 7 | C Data | [Preparing numerical features](../elements/numerical-data.md) |
| 8 | C Data | [Encoding categorical features](../elements/categorical-data.md) |
| 9 | C Data | [Datasets, labels and data splits](../elements/datasets-and-splits.md) |
| 10 | C Data | [Overfitting and regularization](../elements/overfitting-regularization.md) |
| 11 | D Neural networks | [Neural networks](../elements/neural-networks.md) |
| 12 | D Neural networks | [Training neural networks with backpropagation](../elements/backpropagation.md) |
| 13 | D Neural networks | [Multi-class classification and softmax](../elements/multiclass-classification.md) |
| 14 | D Neural networks | [Embeddings](../elements/embeddings.md) |
| 15 | E Real-world ML | [Machine learning in production](../elements/production-ml.md) |
| 16 | E Real-world ML | [Fairness in machine learning](../elements/ml-fairness.md) |

# Prior knowledge

Highschool level needs fractions, percentages, reading graphs and the idea
of a function y = f(x); slopes help for step 3. College level also uses
derivatives (steps 3 and 12), vectors and dot products (steps 11 and 14)
and the logarithm (steps 4 and 13). Start with the `probe` question of each
element: steps where every objective is shown can be completed as placement.
Phase C hardly depends on phase B and can come first for a learner who
wants to work with data right away.

# Tutor notes

- Open the course with its introduction and the plan of five phases. In later sessions, say where the learner is before the next step.
- Stay at the learner's level for the whole course (levels are depths, ptf-spec SPEC.md §5.2). "Go deeper" means the same step again one level up; offer it, never require it.
- Simulators and figures are aids, not the lesson: only steps 3, 5 and 6 have a simulator station, and steps 3, 6, 10 and 11 a figure. Say what to look for before and talk about what the learner saw after.
- Step 3 is where "learning" stops being magic: let the learner take a few gradient steps by hand (or in the `downhill` station) before talking about learning rates.
- Steps 5 and 6 belong together: the learner should compute one confusion matrix by hand before moving the threshold in the simulator.
- Interleave: after each step of phases C to E, mix in one question from an earlier step, preferably on metrics or overfitting.
- Typical pace at highschool level: phase A in one session, phase B in one, phase C in two, phase D in two, phase E in one.
- Follow-up course: `llm-basics` (path `gpt-from-scratch`) builds a small GPT from the same ideas: loss, gradient descent, softmax and embeddings.
