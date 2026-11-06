---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/genai-lifecycle
title: Evaluating and running a generative AI application
description: The lifecycle of a generative AI application, from idea to production; evaluation sets and metrics (including model-graded ones and their limits), versioning of prompts and models, regression tests, monitoring and gradual rollout.
lang: en
levels: [highschool, college]
objectives:
  - id: lifecycle-stages
    text: Describe the lifecycle of a generative AI application (explore, build, evaluate, deploy, monitor, improve) and what is different from ordinary software (prompts and model versions are part of the product, outputs vary).
  - id: evaluation
    text: Build an evaluation set with metrics (correctness, groundedness, relevance, format, safety), compute and compare pass rates, and know the limits of automatic grading by a model.
  - id: operate
    text: Run the application safely in production (versioned prompts and models, regression tests before every change, monitoring of quality, latency, cost and safety, gradual rollout and rollback).
tags: [generative-ai, llmops, evaluation, monitoring, mlops]
about:
  - wikidata: Q60753505
    label: MLOps
  - wikidata: Q112158420
    label: software evaluation
requires:
  - ptf:el/genai-apps/choosing-a-model
  - ptf:el/genai-apps/rag
duration_min: { highschool: 25, college: 35 }
sources:
  - id: ms-genai-14
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/14-the-generative-ai-application-lifecycle
    title: "Microsoft, Generative AI for Beginners, lesson 14: The generative AI application lifecycle (MIT License)"
generated: { by: claude/opus, at: 2026-11-06T01:05:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- A question: you improve a prompt so that one annoying wrong answer disappears. Is the app now better? You cannot know until you check that the other answers did not get worse.
- With generative AI, small changes (a word in the prompt, a new model version) can silently change many answers. Professional teams therefore test, version and monitor everything around the model.
- Afterwards the learner can describe the lifecycle of an AI app, build and use an evaluation set, and run the app safely in production.

# Core

A generative AI application goes through a cycle: explore whether a
model can do the task at all, build the application around it (prompts,
retrieval, tools), evaluate it on a fixed set of realistic test cases,
deploy it, monitor it in use, and feed what goes wrong back into the next
round. Unlike ordinary software, the prompts, the model version and the
retrieved data are part of the product, and outputs vary, so quality must
be measured statistically on many cases rather than assumed from a few
tries. An evaluation set with clear criteria (correct, grounded in the
sources, relevant, in the right format, safe) is the backbone: every
change is run against it before release, and versions are compared by
their pass rates. Automatic grading by a model scales evaluation but must
itself be checked against human judgement. In production, prompts and
model versions are pinned and versioned, changes roll out gradually with
a way back, and quality, latency, cost and safety are monitored.

# Key facts

- Lifecycle: explore (prototype prompts, try models) → build (prompts, retrieval, tools, guardrails) → evaluate (offline test set) → deploy (gradual rollout) → monitor (online metrics, feedback, incidents) → improve (new cases into the test set) → evaluate again.
- LLMOps: the practice of running this lifecycle for LLM applications. Compared with classic MLOps the team usually consumes a model as a service rather than training one, and the main work moves to prompts, retrieval, evaluation and safety. A simple scorecard: quality, harm, honesty (groundedness), cost and latency. Around the whole cycle runs governance: security, compliance and data protection.
- Artefacts to version: prompts and templates, model name and version, sampling settings, tool definitions, retrieval index and chunking settings, evaluation sets.
- Evaluation set: realistic inputs from real users (anonymised), edge cases, adversarial cases, and every bug found so far, each with an expected answer or a rubric. Typical sizes: tens of cases to start, hundreds for confident comparisons.
- Metrics: correctness (matches reference), groundedness or faithfulness (every claim supported by the provided sources), relevance (answers the question), completeness, format validity (parses, schema), safety (no harmful content), plus latency and cost per request.
- Pass rate = passed cases / all cases. Example: version A passes 41 of 50 cases (82 %), version B 45 of 50 (90 %).
- Small sets are noisy: with 50 cases and a pass rate of 90 %, the standard error is about √(0.9 · 0.1 / 50) ≈ 4.2 percentage points, so a difference of a few points may be chance. Compare on the same cases and look at which cases changed.
- Model-graded evaluation (LLM as a judge): a model scores outputs against a rubric. Fast and scalable, but biased (towards longer answers, its own style, the first option shown) and fallible; check its agreement with human ratings on a sample, for example 92 of 100 (92 %).
- Regression testing: run the whole set before every prompt, model, retrieval or setting change; block the release if important cases get worse.
- Monitoring: quality signals (feedback, sampled reviews, groundedness checks), latency (time to first token, p95), cost (tokens per request, per user), safety (filter hits, reports), errors and timeouts, retrieval misses.
- Release: pinned model versions, gradual rollout (a share of users first, or A/B test), quick rollback; re-run the evaluation when the provider announces a model update or retirement.

# Level: highschool

<!-- ptf:text v1 -->

Imagine you run a homework helper. A student complains about one wrong
answer, so you change a word in the prompt, and that answer is now right.
Great? Maybe. But the change could have broken ten other answers you did
not look at. With AI this happens all the time, because one prompt
affects every answer.

So professionals keep a test set: say 50 real questions with what a good
answer must contain. Before any change goes live, they run all 50 and
count how many pass. Old version: 41 of 50. New version: 45 of 50. Now you
know it is better, and you can look at exactly which questions changed.
Every new bug a student reports becomes a new test question, so it can
never come back unnoticed.

Checking 50 answers by hand takes time, so teams often let another AI
grade answers against a checklist. That is fast, but the grading AI makes
mistakes too, so people regularly check a sample of its grades.

And the work goes on after launch. The team watches: are users rating
answers well? Are answers fast? How much does it cost? Are there reports
of harmful answers? Changes are given to a few users first, and if
something goes wrong, they switch back. That loop (build, test, launch,
watch, improve) is the lifecycle of an AI app.

# Level: college

<!-- ptf:text v1 -->

Generative AI operations (often called LLMOps) extend MLOps with new
artefacts and failure modes. The system's behaviour is a function of
prompt templates, model identifier and version, decoding parameters, tool
schemas, retrieval corpus and chunking, so all of these are versioned and
released together. Outputs are stochastic and open-ended, so quality is a
distribution measured on an evaluation suite rather than a property shown
by a demo.

Build the suite early and grow it: sampled production traffic
(anonymised), stratified by intent; edge and adversarial cases; and every
confirmed failure as a regression case. Score with the cheapest reliable
method per criterion: exact or programmatic checks for format and
extractable facts; reference-based or rubric-based judgements for open
answers; groundedness checks of each claim against retrieved context; and
safety classifiers. Model-graded evaluation scales rubric scoring but has
known biases (verbosity, position, self-preference) and must be calibrated
against human labels; report its agreement rate. Treat pass rates as
estimates: at n = 50 and p = 0.9 the standard error is ≈ 4.2 points, so
compare versions on the same items (paired), inspect flipped cases, and
grow n for decisions that matter.

In production, gate every change on the suite, roll out progressively
(canary or A/B on online metrics such as task success, feedback and edit
rates), and keep instant rollback. Monitor quality proxies, latency
percentiles, tokens and cost per request and per tenant, safety events,
tool errors and retrieval hit rates; alert on drift. Provider model
updates are releases you did not make: pin versions and re-evaluate before
migrating.

# Misconceptions

- **demo-is-evaluation**: If it works in a few tries, it works → outputs vary and inputs differ; quality is measured on many fixed cases.
- **fix-one-break-none**: Fixing one bad answer with a prompt change cannot hurt → one prompt affects all answers; run the whole test set after every change.
- **judge-is-truth**: A model grading the outputs gives the true quality → model judges are biased and fallible; check them against human ratings.
- **small-difference-real**: 88 % vs. 90 % on 50 cases proves the new version is better → with 50 cases such differences are within chance; compare case by case and use more cases.
- **launch-is-done**: After launch the work is done → models, users and data change; monitoring and new test cases continue.
- **model-version-stable**: The model behind a name never changes → providers update and retire models; pin versions and re-evaluate before switching.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "one-fix",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "fix-one-break-none",
  "question": "Guess: you change one word in your helper's prompt and a wrong answer becomes right. What do you know now?",
  "options": [
    { "text": "Only that this answer is right; other answers may have changed too", "correct": true, "feedback": "Right: one prompt affects every answer, so you need to test them all." },
    { "text": "The app is now better overall", "correct": false, "feedback": "Not yet known; other answers might be worse." },
    { "text": "Nothing else can have changed", "correct": false, "feedback": "The prompt is part of every request." }
  ],
  "explanation": "Measure changes on a fixed test set, not on one example."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "cycle",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["lifecycle-stages"],
  "misconception": "launch-is-done",
  "instruction": "Order the stages of an AI app's lifecycle.",
  "items": [
    "Try whether a model can do the task at all",
    "Build the app: prompts, documents, tools",
    "Test it on a fixed set of real questions",
    "Launch it, first to some users",
    "Watch ratings, speed, cost and problems",
    "Turn new problems into test questions and improve"
  ],
  "explanation": "The last stage leads back to testing: it is a cycle."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "compare-versions",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["evaluation"],
  "misconception": "demo-is-evaluation",
  "text": "On the same 50 test questions, the old version passes 41 ({{1}} %) and the new version passes 45 ({{2}} %).",
  "gaps": [
    { "answer": "82" },
    { "answer": "90" }
  ],
  "explanation": "41 / 50 = 82 %, 45 / 50 = 90 %. Also look at which questions flipped: the new version may fail some the old one passed."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "after-launch",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["operate"],
  "misconception": "model-version-stable",
  "question": "Which two practices keep a launched AI app safe?",
  "options": [
    { "text": "Give a new version to a few users first and be able to switch back quickly", "correct": true, "feedback": "Yes: gradual rollout and rollback limit the damage of a bad change." },
    { "text": "Run the test set again when the model provider announces a new model version", "correct": true, "feedback": "Yes: a new model can change many answers." },
    { "text": "Always use the newest model automatically, without testing", "correct": false, "feedback": "Untested changes can break answers that worked." },
    { "text": "Stop collecting feedback once ratings are good", "correct": false, "feedback": "Problems appear over time; keep watching." }
  ],
  "explanation": "Pin versions, test before switching, roll out gradually, keep monitoring."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "metrics-match",
  "level": "college",
  "purpose": "check",
  "objectives": ["evaluation"],
  "question": "Match criterion and check. Which two pairs are appropriate?",
  "options": [
    { "text": "Format validity of JSON output: parse it and validate against the schema in code", "correct": true, "feedback": "Yes: cheap, exact, no model needed." },
    { "text": "Groundedness of a RAG answer: check each claim against the retrieved chunks", "correct": true, "feedback": "Yes: with a rubric-based judge or human review, per claim." },
    { "text": "Correctness of a factual answer: ask the same model whether it was right", "correct": false, "feedback": "Self-grading is unreliable; use references or an independent check." },
    { "text": "Safety: count how polite the answers sound", "correct": false, "feedback": "Politeness is not safety; use safety classifiers and red-team cases." }
  ],
  "explanation": "Use the cheapest reliable method per criterion."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "noise",
  "level": "college",
  "purpose": "check",
  "objectives": ["evaluation"],
  "misconception": "small-difference-real",
  "title": "How noisy is a pass rate on 50 cases?",
  "intro": "The new version passes 45 of 50 cases. Compute the pass rate p and its standard error √(p(1 − p)/n), in percentage points, rounded to one decimal.",
  "columns": ["Quantity", "Value"],
  "rows": [
    ["n", "50"],
    ["p", "0.9"],
    ["p(1 − p) / n", "0.0018"]
  ],
  "result": { "label": "Standard error (percentage points)", "value": "4.2" },
  "explanation": "√0.0018 ≈ 0.0424, so about ±4.2 points. An 82 % vs. 90 % difference is suggestive, 88 % vs. 90 % is not; compare paired on the same cases and grow the set for decisions that matter."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "judge-calibration",
  "level": "college",
  "purpose": "check",
  "objectives": ["evaluation", "operate"],
  "misconception": "judge-is-truth",
  "question": "A team grades 2,000 answers a day with a model judge. Which two practices make that trustworthy?",
  "options": [
    { "text": "Have humans grade a random sample regularly and report how often the judge agrees, for example 92 of 100", "correct": true, "feedback": "Yes: calibrate the judge against people." },
    { "text": "Control known biases: shuffle answer order, cap length effects, and use a precise rubric", "correct": true, "feedback": "Yes: judges prefer longer answers and the first option shown." },
    { "text": "Use the judge's scores as ground truth once it has been set up", "correct": false, "feedback": "Judges drift and err; keep checking." },
    { "text": "Let the model being evaluated grade itself to save cost", "correct": false, "feedback": "Self-preference bias makes this unreliable." }
  ],
  "explanation": "Model judges scale evaluation; human agreement checks keep them honest."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "release-plan",
  "level": "college",
  "purpose": "check",
  "objectives": ["operate", "lifecycle-stages", "evaluation"],
  "misconception": "model-version-stable",
  "question": "Your provider will retire the model version your RAG assistant uses in 60 days. Describe how you migrate safely.",
  "rubric": [
    "Runs the full evaluation set (quality, groundedness, format, safety, latency, cost) on the new version with the current prompt, and inspects flipped cases.",
    "Adapts prompts or settings if needed, versions everything, and re-runs the set until release criteria are met.",
    "Rolls out gradually with monitoring and a rollback path, and adds any new failures to the evaluation set."
  ],
  "sample_answer": "Pin the new model version in a branch, run the 300-case evaluation suite and compare per case with the current version, including latency and cost. Fix regressions by adjusting the prompt or retrieval settings, versioning each change, until the release criteria are met. Then route 10 % of traffic to the new version, watch feedback, groundedness samples, errors and cost for a week, roll out fully if stable and keep the old version ready for rollback until the retirement date. Add any new failure to the suite.",
  "explanation": "A model change is a release: evaluate, adapt, roll out gradually, monitor."
}
```

# Examples

- **Recipe testing**: a restaurant changing one ingredient tastes all dishes that use the sauce, not just the one a guest complained about. Where it breaks down: a model's "dishes" number in the thousands, so tests must be automated and sampled.
- **Regression case**: a student reported that the helper said the Battle of Hastings was in 1067; the question and the expected answer, 1066, became test case 51 and run before every release.
- **Silent update**: a provider's new model version writes longer answers; the format checks catch that summaries now exceed the 120-word limit before users see it.

# Tutor notes

- At highschool level the idea of a fixed test set and "every bug becomes a test" is the core; the statistics are optional.
- Connect back to choosing a model (evaluation set) and RAG (evaluate retrieval and generation separately); this element ties the course together.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 14 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/14-the-generative-ai-application-lifecycle): from MLOps to LLMOps and lifecycle tooling; college.

# Sources

Grounding: [^ms-genai-14]. Text, examples and questions are original.

[^ms-genai-14]: Microsoft, Generative AI for Beginners, lesson 14, MIT License. Used for scope and order only.
