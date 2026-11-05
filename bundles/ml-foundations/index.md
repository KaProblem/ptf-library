---
type: Bundle
okf_version: "0.2"
ptf_version: "0.1"
id: ml-foundations
title: Machine learning foundations
description: The foundations of supervised machine learning in 16 learning elements, from linear regression and gradient descent through classification metrics, data preparation and overfitting to neural networks, embeddings, production systems and fairness, at highschool and college level.
lang: en
license: CC-BY-SA-4.0
version: 0.1.0
tags: [machine-learning, linear-regression, gradient-descent, classification, neural-networks, embeddings, fairness]
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
---

# Contents

A course on the foundations of machine learning for learners without prior
experience, at highschool and college level. Its scope and order follow
Google's Machine Learning Crash Course (Google for Developers, text licensed
CC BY 4.0, code samples Apache 2.0), which is credited in the `sources` of
every element. All texts, questions, examples, figures and simulators in
this bundle are original; nothing was copied from the course.

Two simulators belong to the bundle: `gradient-descent-lab` (step downhill
by hand, compare learning rates, fit a line) and `threshold-lab` (confusion
matrix, precision against recall, ROC curve and AUC). Both have an English
and a German interface.

## Elements

The course order is the learning path [Machine learning crash course](paths/crash-course.md).
Every computed answer and every number in Key facts is recomputed by the
matching script in `checks/` (`ptf-check` runs them).

| Element | Simulator or figure | Questions |
| --- | --- | --- |
| [What machine learning is](elements/what-is-ml.md) | | 10 |
| [Linear regression and loss](elements/linear-regression.md) | | 12 |
| [Gradient descent and hyperparameters](elements/gradient-descent.md) | `gradient-descent-lab`, figure `learning-rates` | 13 |
| [Logistic regression](elements/logistic-regression.md) | | 12 |
| [Thresholds, the confusion matrix and its metrics](elements/classification-metrics.md) | `threshold-lab` | 11 |
| [ROC curve and AUC](elements/roc-auc.md) | `threshold-lab`, figure `roc-curve` | 11 |
| [Preparing numerical features](elements/numerical-data.md) | | 12 |
| [Encoding categorical features](elements/categorical-data.md) | | 12 |
| [Datasets, labels and data splits](elements/datasets-and-splits.md) | | 11 |
| [Overfitting and regularization](elements/overfitting-regularization.md) | figure `overfitting-curves` | 11 |
| [Neural networks](elements/neural-networks.md) | figure `tiny-network` | 12 |
| [Training neural networks with backpropagation](elements/backpropagation.md) | | 12 |
| [Multi-class classification and softmax](elements/multiclass-classification.md) | | 12 |
| [Embeddings](elements/embeddings.md) | | 12 |
| [Machine learning in production](elements/production-ml.md) | | 12 |
| [Fairness in machine learning](elements/ml-fairness.md) | | 12 |

The follow-up course is `llm-basics`, which builds a small GPT from the same
ideas.
