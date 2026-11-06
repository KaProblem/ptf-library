---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/production-ml
title: Machine learning in production
description: A trained model is a small part of a working ML system; static or dynamic training and inference, training-serving skew, data drift, monitoring and tests decide whether it keeps working after launch, and AutoML can automate part of building it.
lang: en
levels: [highschool, college]
objectives:
  - id: system-choices
    text: Explain that the model is a small part of a production ML system, and choose between static and dynamic training and between static (batch) and dynamic (online) inference for a use case.
  - id: skew-drift
    text: Recognise training-serving skew and data or concept drift, measure a feature shift, and say what to monitor.
  - id: pipeline-checks
    text: Name the checks a pipeline needs before and after deploying a model (data validation, quality gates against the current model, reproducibility, rollback).
  - id: automl
    text: Say what AutoML automates, name its benefits and limits, and decide whether it fits a project.
tags: [machine-learning, mlops, production, deployment, monitoring, data-drift, automl]
about:
  - wikidata: Q60753505
    label: MLOps
  - wikidata: Q3045002
    label: concept drift
requires:
  - ptf:el/ml-foundations/embeddings
leads_to:
  - ptf:el/ml-foundations/ml-fairness
duration_min: { highschool: 30, college: 30 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), modules Production ML systems and AutoML"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a model that predicts how busy a café will be worked great in testing in autumn. In spring it is suddenly often wrong, though nobody changed the code. What could have happened?
- Training a good model is perhaps a tenth of the work. The rest is getting data in reliably, serving predictions fast enough, noticing when the world changes, and replacing the model safely. Most ML failures in practice happen here, not in the maths.
- Afterwards the learner can design the training and serving setup for a use case, explain skew and drift and how to monitor them, and list the checks that keep a pipeline safe.

# Core

In a production ML system the model code is a small part next to data
collection, validation, feature computation, serving, monitoring and the
infrastructure around them. A model can be trained once and used as is
(static training) or retrained regularly on new data (dynamic training),
and predictions can be computed in advance for all known inputs (static or
batch inference) or on request (dynamic or online inference): static is
simpler and cheaper but goes stale, dynamic adapts but needs more
engineering and monitoring. Training-serving skew means the model sees
different data at serving time than in training, often because features
are computed by different code. Data drift (the inputs change) and concept
drift (the relation between inputs and label changes) make a model worse
over time. A pipeline therefore validates its data, compares every new
model with the current one before deploying it, keeps training
reproducible, monitors inputs and prediction quality, and can roll back.

# Key facts

- Static training: train once, simple to test, goes stale. Dynamic training: retrain on a schedule or continuously, adapts, needs automated validation.
- Static inference: precompute predictions (e.g. nightly), fast lookup, no prediction for unseen inputs; 2 million users × 50 recommendations = 100 million stored predictions. Dynamic inference: compute on request, handles new inputs, must meet latency limits (e.g. under 100 ms) and needs serving infrastructure.
- Training-serving skew: e.g. training computes "average order value" over 90 days, serving over 30; or a feature is in € in training and in cents at serving. Fix: share the feature code, log serving features and compare.
- Data drift: the input distribution changes (new user groups, a new camera). Concept drift: the input–label relation changes (spring changes café visits at the same weather; fraudsters change tactics).
- Measuring a shift: training mean 30, sd 5; serving mean 38 → the mean moved 1.6 training standard deviations. Monitor such statistics, missing-value rates and prediction distributions per feature.
- Quality gates before deploying: the new model must beat (or match) the current one on a fixed evaluation set and on important slices; sanity checks (no NaN, prediction range) and a canary or shadow launch before full rollout.
- Reproducibility: fixed data snapshot, code version, random seeds and dependency versions, so a model can be rebuilt and compared. Keep the previous model for rollback.
- Ask whether ML is needed and whether it is worth maintaining: a simple rule or heuristic is a valid baseline.
- AutoML tools automate feature engineering and selection, the choice of model type and the hyperparameter search, and report evaluation metrics.
- AutoML benefits: saves expert time, needs fewer specialist skills, gives a quick baseline ("is there any signal in this dataset?"), shows which features matter, applies good practice by default.
- AutoML limits: an expert with time can often build a better model; the search is hard to see into and the result hard to reproduce by hand; repeated runs can end at noticeably different models; little room to customize training; it still needs plenty of good data. Data, problem framing and monitoring stay the team's job.

# Level: highschool

<!-- ptf:text v1 -->

The café model learned from autumn data. In spring people behave
differently: at the same temperature, more of them sit outside elsewhere.
The code did not change, the **world** did. That is called **drift**,
and it happens to every model sooner or later.

A model in real use is part of a bigger system. Data has to come in
every day, be checked, be turned into features, go into the model, and
the prediction has to reach the app quickly. Someone has to notice when
something breaks. The model itself is a small part of all that.

Two choices shape the system:

- **When to train**: once, and then keep the model (**static training**), or again and again with new data (**dynamic training**). Static is simpler; dynamic keeps up with change but needs automatic checks, because nobody looks at every new version.
- **When to predict**: in advance for everything, for example every night for every user (**static inference**), or the moment someone asks (**dynamic inference**). Precomputed answers are fast to look up but cannot handle someone new. Answering on request handles anything, but has to be quick.

A sneaky problem is **training-serving skew**: the model gets slightly
different data in the app than it got in training. Maybe in training a
price was in euros and in the app in cents. The model has no way to know
and silently gives nonsense. That is why the same code should compute the
features in both places, and why the data coming in is compared with the
training data: if the average of a feature suddenly moves far from what
it was in training, an alarm should go off.

Before a new model replaces the old one, it has to prove itself on the
same test data and should first run quietly next to the old one. If
something goes wrong anyway, you switch back. And sometimes the honest
answer is that a simple rule does the job and no ML is needed at all.

Building the model itself can be partly automated. **AutoML** tools try
many model types, feature transformations and settings for you and report
the best one. That saves time and lets a team without ML specialists get
a working model, and even experts use it for a quick first answer to "is
there anything to learn in this data at all?". The price: you see little
of how the tool decided, two runs can give different models, you cannot
tweak the training much, and a skilled person with time often does
better. And AutoML cannot fix bad data or a badly framed question.

# Level: college

<!-- ptf:text v1 -->

A production ML system is mostly not model code: data ingestion and
validation, feature pipelines, training orchestration, a model registry,
serving, monitoring and the configuration that ties them together.
Design starts from requirements: freshness (how fast must predictions
reflect new data?), latency, input coverage, cost and how often the world
changes.

Training: static (train once on a snapshot) is easy to validate offline
but degrades as the data drifts; dynamic (retrain daily or continuously)
tracks change but every automatically produced model must pass automated
validation, since bad data in means a bad model out. Inference: static
(batch) precomputes predictions for a known set of inputs (2 million users
× 50 items = 10⁸ rows), with cheap lookups, offline verification and no
answer for unseen inputs; dynamic (online) computes per request, covers
the long tail and fresh features, but needs latency budgets, scaling and
online monitoring. Hybrids are common (batch candidates, online re-ranking).

Skew is a difference between training and serving data for the same
example, caused by divergent feature code, different data sources,
or time-travel (training features computed with information not yet
available at serving time). Shared feature code, logging serving features
and periodic comparison catch it. Drift is a change over time: covariate
drift in p(x) (measure per-feature statistics, e.g. a mean shift of
(38 − 30) / 5 = 1.6 training sd, or population stability and KS
statistics), label drift in p(y), and concept drift in p(y | x), visible
only once labels arrive, so delayed-label monitoring and proxy metrics
(prediction distribution, business KPIs) are needed.

Pipeline checks: schema and range validation of inputs (fail loudly),
evaluation of every candidate against the serving model on a fixed set and
on critical slices, sanity tests (no NaN, sensible output ranges, latency),
reproducible training (data versions, code, seeds, dependencies), staged
rollout (shadow or canary) and rollback. AutoML automates model and
hyperparameter search within this loop; it does not remove the need for
problem framing, data quality or monitoring. Its search is a large
hyperparameter optimization over feature transforms, model families and
settings, so it can overfit the validation set, its runs vary, and its
result is hard to inspect or reproduce; it pays off for baselines, for
"is there signal?" smoke tests, for ranking features and for teams without
ML specialists, less where model quality or custom training matter most.

# Misconceptions

- **done-at-launch**: Once a model is deployed, the work is done → data and the world change; models need monitoring, retraining and maintenance.
- **model-is-the-system**: Most of an ML system is the model → the model is a small part next to data, features, serving and monitoring.
- **same-code-same-data**: If the model code is unchanged, its predictions stay good → drift and skew change what the model sees or what is true.
- **newer-model-better**: A freshly retrained model is automatically better → bad data or bugs produce worse models; every candidate must pass checks against the current one.
- **automl-replaces-thinking**: AutoML makes ML expertise unnecessary → it searches models and hyperparameters; framing, data quality, evaluation and monitoring remain.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cafe-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "same-code-same-data",
  "question": "A café model predicted visitors well in autumn. In spring it is often wrong, though nobody changed its code. What is the most likely reason?",
  "options": [
    { "text": "People behave differently in spring, so the patterns the model learned no longer fit", "correct": true, "feedback": "Yes: the world changed, not the code. That is drift." },
    { "text": "The model forgot what it learned", "correct": false, "feedback": "A deployed model's weights do not change on their own." },
    { "text": "The computer got slower", "correct": false, "feedback": "Speed affects how fast predictions come, not whether they are right." }
  ],
  "explanation": "Models learn the world as it was in their training data; when it changes, they need new data."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "static-or-dynamic",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["system-choices"],
  "question": "Which two pairings of use case and setup are sensible?",
  "options": [
    { "text": "Weekly 'songs for you' list for each user → compute all lists in advance every night (static inference)", "correct": true, "feedback": "Yes: the users are known, the list can be prepared, a lookup is fast." },
    { "text": "Checking a card payment for fraud while the customer waits → predict on request (dynamic inference)", "correct": true, "feedback": "Yes: each payment is new and must be judged at that moment." },
    { "text": "Translating text a user just typed → precompute all translations in advance", "correct": false, "feedback": "The possible texts are endless; this needs dynamic inference." },
    { "text": "Spam filter facing new spam tricks every week → train once and never retrain", "correct": false, "feedback": "Spammers change tactics: this needs dynamic (regular) training." }
  ],
  "explanation": "Known inputs and no hurry → static inference. New inputs or fresh decisions → dynamic. A changing world → dynamic training."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "precompute-count",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["system-choices"],
  "question": "A shop precomputes 50 product recommendations for each of its 2 million users every night. How many predictions does it store?",
  "answer": 100000000,
  "tolerance": 0,
  "explanation": "2,000,000 · 50 = 100,000,000. Static inference trades storage and staleness for fast lookups."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "skew-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["skew-drift"],
  "question": "In training, the feature 'basket value' was in euros (e.g. 24.90). In the app it is sent in cents (2490). What happens, and what is this called?",
  "options": [
    { "text": "The model sees values 100 times too large and gives wrong predictions without any error message: training-serving skew", "correct": true, "feedback": "Yes: the model cannot know the unit changed." },
    { "text": "The model notices the unit and converts it: no problem", "correct": false, "feedback": "Models see only numbers; they do not know units." },
    { "text": "The app crashes, so the problem is found at once: concept drift", "correct": false, "feedback": "Nothing crashes, which is what makes skew dangerous; and the world did not change, the data pipeline did." }
  ],
  "explanation": "Skew: training and serving data differ for the same example. Share the feature code and compare the incoming data with the training data."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "drift-shift",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["skew-drift"],
  "question": "In the training data a feature had mean 30 and standard deviation 5. This week the incoming data has mean 38. By how many training standard deviations has the mean moved?",
  "answer": 1.6,
  "tolerance": 0,
  "explanation": "(38 − 30) / 5 = 1.6. A shift that large should trigger an alarm and a look at what changed."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "deploy-checks-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pipeline-checks"],
  "misconception": "newer-model-better",
  "question": "Every night a model is retrained automatically on the newest data. Which check matters most before it replaces the current model?",
  "options": [
    { "text": "It must do at least as well as the current model on the same test data, and its predictions must look sane", "correct": true, "feedback": "Yes: a broken data day can produce a broken model." },
    { "text": "None: newer data always makes a better model", "correct": false, "feedback": "Bad or missing data produces worse models; only a comparison shows it." },
    { "text": "It must have more weights than the current model", "correct": false, "feedback": "Size says nothing about quality." }
  ],
  "explanation": "Automatic retraining needs automatic quality gates and a way to roll back."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "production-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["system-choices", "skew-drift"],
  "misconception": "done-at-launch",
  "question": "A team says: \"The model reached 95 % on the test set, we deployed it, the project is finished.\" What is missing?",
  "options": [
    { "text": "Monitoring of the incoming data and the model's quality over time, and a plan to retrain or roll back", "correct": true, "feedback": "Yes: performance after launch is not guaranteed." },
    { "text": "Nothing: test accuracy shows how it will work forever", "correct": false, "feedback": "It shows how it worked on data from the past." },
    { "text": "A larger test set", "correct": false, "feedback": "A larger test set from the past still cannot show future changes." }
  ],
  "explanation": "Deployment starts the model's life; monitoring and maintenance follow."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "drift-types-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["skew-drift"],
  "question": "Which two situations are classified correctly?",
  "options": [
    { "text": "A bank's app gains many young users; the share of age < 25 doubles, while default behaviour per age is unchanged → covariate (data) drift in p(x)", "correct": true, "feedback": "Yes: inputs changed, the relation did not." },
    { "text": "Fraudsters switch to small payments, so the same features now mean fraud more often → concept drift in p(y | x)", "correct": true, "feedback": "Yes: the input–label relation changed." },
    { "text": "Training features use the 'final delivery date', which is unknown at prediction time → concept drift", "correct": false, "feedback": "This is training-serving skew (time-travel / leakage), not a change in the world." },
    { "text": "Concept drift can be detected immediately from input statistics alone", "correct": false, "feedback": "p(y | x) changes need labels, which often arrive late." }
  ],
  "explanation": "Covariate drift: p(x); concept drift: p(y | x), visible only with labels; skew: training ≠ serving for the same example."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "architecture-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["system-choices"],
  "question": "A news app wants personalized article rankings. New articles appear every few minutes and must be rankable within seconds; there are 5 million users. Which design fits best?",
  "options": [
    { "text": "Precompute candidate sets per user in batch, then re-rank online with fresh article features at request time, and retrain the ranker regularly", "correct": true, "feedback": "Yes: a hybrid covers scale and freshness." },
    { "text": "Pure static inference: rank all articles for all users once a day", "correct": false, "feedback": "Articles from the last hours would never appear." },
    { "text": "Static training once at launch with dynamic inference", "correct": false, "feedback": "Interests and article mix change; the ranker would go stale." }
  ],
  "explanation": "Freshness requirements drive dynamic inference; changing behaviour drives dynamic training; scale motivates hybrids."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "rollout-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["pipeline-checks"],
  "misconception": "newer-model-better",
  "instruction": "Order the steps for safely replacing a production model with a retrained one.",
  "items": [
    "Validate the new training data against the expected schema and ranges",
    "Train the candidate reproducibly (versioned data, code, seed)",
    "Compare the candidate with the serving model on a fixed evaluation set and key slices",
    "Run it in shadow mode or as a small canary on live traffic",
    "Roll out fully, keeping the previous model ready for rollback"
  ],
  "explanation": "Bad data, bad training and bad behaviour on live data are caught at three different gates; rollback is the last safety net."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "automl-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["automl"],
  "misconception": "automl-replaces-thinking",
  "question": "A small bakery chain without data scientists wants to predict tomorrow's bread demand from two years of sales records. A friend suggests an AutoML tool. Which two statements are true?",
  "options": [
    { "text": "AutoML can try many model types and settings and give them a working model without a specialist", "correct": true, "feedback": "Yes: that is its main benefit." },
    { "text": "They still have to check that the sales records are complete and correct", "correct": true, "feedback": "Yes: AutoML cannot fix bad data." },
    { "text": "AutoML always finds a better model than an expert would", "correct": false, "feedback": "An expert with time can often do better; AutoML is fast, not always best." },
    { "text": "Running AutoML twice always gives exactly the same model", "correct": false, "feedback": "Different runs can search differently and end at different models." }
  ],
  "explanation": "AutoML automates the model search; data quality and judging the result stay human work."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "automl-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["automl", "pipeline-checks"],
  "misconception": "automl-replaces-thinking",
  "question": "A team uses AutoML to build a churn model. Which statement is correct?",
  "options": [
    { "text": "AutoML can search model families and hyperparameters, but the label definition, leakage checks, evaluation design and monitoring remain the team's job", "correct": true, "feedback": "Yes." },
    { "text": "AutoML guarantees the model cannot overfit", "correct": false, "feedback": "It can overfit the validation data like any search." },
    { "text": "AutoML removes the need for training-serving consistency", "correct": false, "feedback": "Features must still be computed the same way at serving time." }
  ],
  "explanation": "AutoML automates search, not judgement."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "monitoring-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["skew-drift", "pipeline-checks", "system-choices"],
  "question": "Design the monitoring for a model that predicts delivery times for a food app. Labels (actual delivery times) arrive about an hour after each prediction. Name at least four things you would monitor, how you would detect skew, and what would trigger retraining or rollback.",
  "rubric": [
    "Input monitoring: per-feature statistics, missing rates, out-of-range values vs training",
    "Output monitoring: distribution of predicted times; latency and errors of the service",
    "Label-based monitoring once labels arrive: MAE overall and by slice (city, time of day, restaurant type)",
    "Skew: log serving features and compare with the same examples' training-pipeline features; shared feature code",
    "Triggers: sustained MAE degradation or large input shift → investigate/retrain; sudden breakage after deploy → rollback"
  ],
  "sample_answer": "Inputs: mean, sd and missing rate per feature compared with training, with alerts on large shifts (e.g. over 1.5 sd). Outputs: distribution of predicted minutes, plus latency and error rate of the service. Labels: MAE per hour once deliveries complete, split by city and time of day. Skew: log the features used at serving and recompute them offline with the training pipeline for a sample; any difference is a bug. A gradual MAE rise or input drift triggers retraining; a sudden jump right after a deployment triggers rollback.",
  "explanation": "Monitor inputs, outputs and quality; compare serving with training features; define triggers in advance."
}
```

# Tutor notes

- This step is about judgement, not formulas: ask the learner to design for one concrete use case (their own if they have one).
- Highschool: static vs dynamic and "the world changes" are the core; skew with the euro/cent example is memorable.
- AutoML: keep it short; the point is what it automates and what it cannot do (bad data, framing, monitoring).

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, modules "Production ML systems" and "AutoML", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
