---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/llm-evaluation
title: Evaluating large language models
description: How LLMs are compared - automatic benchmarks with checkable answers, their pitfalls (chance level, noise, contamination, saturation), models judging models, human arenas, and a small custom evaluation for your own use case.
lang: en
levels: [highschool, college]
objectives:
  - id: benchmarks
    text: Explain how automatic benchmarks score a model (accuracy on multiple choice, exact match, pass@k for code) and what well-known benchmarks measure.
  - id: benchmark-limits
    text: Judge a benchmark result by its chance level, statistical noise, possible contamination and saturation.
  - id: judges-and-custom
    text: Describe LLM-as-a-judge and arena rankings with their biases, and design a small custom evaluation for a concrete use case.
tags: [llm, evaluation, benchmarks, mmlu, llm-as-a-judge, arena]
about:
  - wikidata: Q816747
    label: benchmark
  - wikidata: Q123721276
    label: Massive Multitask Language Understanding
  - wikidata: Q134468621
    label: LLM-as-a-Judge
requires:
  - ptf:el/llm-in-practice/generation-metrics
leads_to:
  - ptf:el/llm-in-practice/preference-training
duration_min: { highschool: 15, college: 25 }
sources:
  - id: hf-llm-course-11-5
    resource: https://huggingface.co/learn/llm-course/chapter11/5
    title: "Hugging Face LLM Course, chapter 11, section 5: Evaluation"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-06T01:10:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Every new model is announced with a table of scores: 86 on this, 92 on that. What do those numbers measure, and when should you believe them?
- This step looks at the three ways models are compared (benchmarks with known answers, a strong model as judge, and human votes) and at what each can and cannot tell you.
- Afterwards the learner can read a benchmark table critically, compute whether a difference is more than noise, and set up a small test set that measures what matters for their own application.

# Core

Automatic benchmarks ask a model many questions with known answers and
report the share it gets right: multiple-choice knowledge tests, maths
word problems with a final number, programming tasks checked by unit tests.
They are cheap and reproducible, but a score must be compared with the
chance level and with its statistical uncertainty, and it can be inflated
when test questions leaked into the training data or when the benchmark is
saturated. Open-ended answers have no single right answer; they are judged
by a strong model following a rubric (LLM-as-a-judge) or by people
comparing two answers side by side, aggregated into a ranking. Each has
biases. For a real application, the most informative evaluation is a small
set of your own representative tasks with clear pass criteria.

# Key facts

- **MMLU**: multiple-choice questions from 57 subjects (law, medicine, mathematics …), four options each, so chance level is 25 %. About 14,000 test questions.
- **GSM8K**: about 8,500 grade-school maths word problems (1,319 in the test set); scored by exact match of the final number.
- **HumanEval**: 164 Python programming problems with unit tests; scored by **pass@k**, the probability that at least one of k generated solutions passes. With n samples of which c pass, pass@k = 1 − C(n − c, k) / C(n, k); n = 10, c = 3 gives pass@1 = 0.3 and pass@5 ≈ 0.917.
- Others: MATH (12,500 competition mathematics problems), BIG-Bench Hard (BBH, multi-step reasoning tasks), HellaSwag (commonsense sentence completion), ARC (science exam questions), TruthfulQA (817 questions that tempt models into common misconceptions), AlpacaEval (instruction following, judged by a strong model). Frameworks such as HELM and lighteval run many benchmarks the same way.
- **Noise**: an accuracy p measured on n questions has a standard error √(p (1 − p) / n). For p = 0.7 on GSM8K's 1,319 questions: about 1.3 percentage points, so a 95 % interval of about ± 2.5 points. Smaller differences are not meaningful.
- **Prompt sensitivity**: few-shot examples, answer format and the exact prompt can move scores by several points; compare only results produced the same way.
- **Contamination**: if test questions (or their solutions) were in the training data, the score measures memory, not ability. **Saturation**: when top models all score near the maximum, the benchmark no longer separates them.
- **LLM-as-a-judge**: a strong model scores or compares answers using a rubric. Known biases: position (prefers the first or second answer), verbosity (prefers longer answers), self-preference (prefers its own style). Mitigate with swapped order, length control, clear rubrics and checks against human ratings.
- **Arenas**: people compare two anonymous answers to their own prompt and vote; votes are aggregated into Elo-style ratings. With ratings Rₐ and R_b, A's expected win rate is 1 / (1 + 10^((R_b − Rₐ) / 400)): 100 points ahead ≈ 64 %.
- **Custom evaluation**: collect real tasks from the application (with edge cases), define pass criteria (exact checks where possible, a rubric otherwise), keep the set fixed and versioned, and run it on every model or prompt change.

# Level: highschool

<!-- ptf:text v1 -->

Imagine comparing two students by one test with 4-option multiple-choice
questions. Student A scores 26 %, student B 71 %. B is clearly better.
But was A actually trying? Guessing alone gives about 25 %. A score only
means something compared with guessing.

Language models are compared the same way, with **benchmarks**: big
fixed tests with known answers. One famous test has multiple-choice
questions from 57 school and university subjects. Another has maths word
problems where only the final number counts. For programming, the
model's code is run against tests, and it passes or fails.

Three things can make a benchmark score misleading:

1. **Luck.** On a test with 1,300 questions, scores of 70 % and 71 % are
   practically a tie; the next test run could flip them.
2. **Leaked questions.** Models learn from huge amounts of internet text.
   If the test questions were online, the model may have seen them, like a
   student who saw the exam beforehand. The score then shows memory, not
   skill.
3. **Too easy.** When every top model scores 95 %, the test cannot tell
   them apart any more.

Many tasks have no single right answer: "write a friendly reply to this
complaint". Here two other methods are used. A strong model is asked to
grade answers with a checklist (**LLM-as-a-judge**). It is fast, but it
has habits, for example preferring longer answers. Or many people compare
two anonymous answers side by side and vote; the votes become a ranking,
like a chess rating.

For your own project, the most useful test is often your own: 50 to 100
real examples of what your users will ask, each with a clear rule for
what counts as a good answer.

# Level: college

<!-- ptf:text v1 -->

Before reading on: model X reports 71.2 % on a 1,319-question maths
benchmark, model Y 69.8 %. Is X better? Estimate the standard error.

**Benchmark scoring.** Multiple-choice benchmarks are scored either by
comparing the log-likelihoods of the options or by parsing a generated
letter; the two can disagree, which is one source of irreproducible
numbers. Generative tasks use exact match after normalisation (GSM8K
final number) or execution (HumanEval, pass@k with the unbiased
estimator 1 − C(n − c, k) / C(n, k)). Few-shot count, chain-of-thought
prompting and answer extraction are part of the result; compare only
under identical harnesses (for example lighteval or lm-evaluation-harness).

**Uncertainty.** Treat accuracy as a binomial proportion: SE = √(p(1 − p)/n).
At p ≈ 0.7, n = 1,319: SE ≈ 1.26 pp, 95 % interval ± 2.5 pp, so 71.2 vs
69.8 is not a significant difference. For paired comparisons on the same
questions, a paired test (McNemar) is sharper.

**Validity threats.** Contamination (n-gram overlap of test items with
pretraining data, or deliberate tuning on test-like data), saturation
(ceiling effects; successors like harder variants), chance level (25 %
on 4-way multiple choice), and construct validity: a knowledge quiz is
not a measure of helpfulness or safety.

**Model-based judging.** A judge model scores single answers against a
rubric or picks the better of two. Its agreement with humans is good on
style and coarse quality and weaker on factual correctness the judge
itself cannot verify. Mitigate position bias by evaluating both orders,
verbosity bias with length-controlled comparisons, and calibrate on a
human-labelled subset.

**Arenas** aggregate pairwise human preferences with a Bradley–Terry or
Elo model; P(A beats B) = 1 / (1 + 10^((R_B − R_A)/400)). They reflect
the prompts and tastes of their voters.

**Custom suites** are what decide deployment: sample real inputs,
include known failure cases, write programmatic checks (schema validity,
exact fields, unit tests) where possible and rubric-based judging
elsewhere, version the set, and track it per model and prompt change.

# Misconceptions

- **score-is-ability**: A higher benchmark score always means a more capable model → differences within the noise, contamination and different prompts can explain score gaps.
- **ignore-chance**: 30 % on a four-option multiple-choice test is a weak but real ability → chance alone gives 25 %; only the margin above chance counts.
- **judge-is-objective**: An LLM judge gives objective grades → judges have position, length and self-preference biases and need checks against human ratings.
- **leaderboard-fits-my-task**: The top model on a public leaderboard is the best for my application → only an evaluation on your own representative tasks shows that.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "chance-level", "level": "highschool", "purpose": "check",
  "objectives": ["benchmark-limits"], "misconception": "ignore-chance",
  "question": "A model scores 27 % on a test where every question has four options. What does this mean?",
  "options": [
    { "text": "Barely better than guessing, which gives about 25 %", "correct": true, "feedback": "Right. Always compare with the chance level." },
    { "text": "It knows about a quarter of the subject", "correct": false, "feedback": "Random guessing alone gets 25 %, so 27 % shows almost no knowledge." },
    { "text": "It is a decent result", "correct": false, "feedback": "Not on a four-option test." }
  ],
  "explanation": "With k options, chance level is 1 / k."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "how-scored", "level": "highschool", "purpose": "check",
  "objectives": ["benchmarks"],
  "question": "How is a programming benchmark usually scored?",
  "options": [
    { "text": "The model's code is run against tests; it counts as solved if the tests pass", "correct": true, "feedback": "Right. Code can be checked automatically by running it." },
    { "text": "A person reads the code and gives a grade", "correct": false, "feedback": "Too slow for hundreds of problems and many models; tests are automatic." },
    { "text": "By counting how many lines of code the model writes", "correct": false, "feedback": "Length says nothing about correctness." }
  ],
  "explanation": "Benchmarks need answers a program can check: options, final numbers, passing tests."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "leaked", "level": "highschool", "purpose": "check",
  "objectives": ["benchmark-limits"], "misconception": "score-is-ability",
  "question": "A new model suddenly scores 98 % on an old, well-known test that was published online years ago. What should you check first?",
  "options": [
    { "text": "Whether the test questions were in its training data", "correct": true, "feedback": "Right. Then the score shows memory, like a student who saw the exam." },
    { "text": "Nothing; 98 % proves it is the best model", "correct": false, "feedback": "Not if it has seen the questions before." },
    { "text": "Whether the test is too long", "correct": false, "feedback": "Length is not the issue; leaking is." }
  ],
  "explanation": "Contamination makes benchmark scores look better than the real ability."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "judge-bias", "level": "highschool", "purpose": "check",
  "objectives": ["judges-and-custom"], "misconception": "judge-is-objective",
  "question": "A strong model grades answers of other models. Which habit is it known to have?",
  "options": [
    { "text": "It tends to prefer longer answers, even when they are not better", "correct": true, "feedback": "Right. Length bias is one of several judge biases." },
    { "text": "It always grades perfectly fairly", "correct": false, "feedback": "Model judges have biases, such as preferring longer or first-shown answers." },
    { "text": "It cannot grade answers in English", "correct": false, "feedback": "It can; the problem is bias, not language." }
  ],
  "explanation": "LLM judges are useful but need checks: swap the order, control length, compare with human ratings."
}
```

```ptf-question
{
  "kind": "free_text", "id": "own-test", "level": "highschool", "purpose": "check",
  "objectives": ["judges-and-custom"], "misconception": "leaderboard-fits-my-task",
  "question": "You want to use a language model to answer students' questions about your school's timetable rules. How would you test which model is best for this? Describe your test in two or three sentences.",
  "rubric": [
    "Collect real or realistic student questions about the timetable rules (including tricky ones).",
    "Write down the correct answer or what a good answer must contain for each.",
    "Run every model on the same questions and count how many answers are correct; do not rely only on public leaderboards."
  ],
  "sample_answer": "I would collect 50 real questions students asked, including tricky ones like room changes, and write the right answer next to each. Then I would give the same questions to each model and count the correct answers, instead of trusting a general leaderboard.",
  "explanation": "A small, realistic, fixed test set beats general benchmarks for a specific use."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "random-score", "level": "highschool", "purpose": "transfer",
  "misconception": "ignore-chance",
  "question": "A test has 200 questions with 5 options each. About how many questions does pure guessing get right?",
  "answer": 40, "tolerance": 0, "unit": "questions",
  "explanation": "200 · 1/5 = 40, so a score of 20 % is the chance level."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "is-it-noise", "level": "college", "purpose": "check",
  "objectives": ["benchmark-limits"], "misconception": "score-is-ability",
  "title": "Is a 1.4-point lead significant?",
  "intro": "Model X: 71.2 %, model Y: 69.8 %, both on the 1,319 test problems. Use p = 0.7. Round to two decimals, in percentage points.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Standard error", "√(0.7 · 0.3 / 1,319) · 100", "1.26"],
    ["95 % half-width", "1.96 · 1.26", "2.47"],
    ["Observed difference", "71.2 − 69.8", "1.4"]
  ],
  "result": { "label": "Is the difference larger than the 95 % half-width? (1 = yes, 0 = no)", "value": "0" },
  "explanation": "1.4 points is well inside the noise of a single score; a paired test on the same items would be sharper, but this difference alone does not show X is better."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "pass-at-k", "level": "college", "purpose": "check",
  "objectives": ["benchmarks"],
  "title": "pass@k for one problem",
  "intro": "A model generated n = 10 solutions to one problem; c = 3 pass the tests. pass@k = 1 − C(n − c, k) / C(n, k). Round to three decimals.",
  "columns": ["k", "C(7, k) / C(10, k)", "pass@k"],
  "rows": [
    ["1", "7 / 10", "0.3"],
    ["2", "21 / 45", "0.533"],
    ["5", "21 / 252", "0.917"]
  ],
  "result": { "label": "pass@8", "value": "1" },
  "explanation": "With 8 tries out of 10 and only 7 failing solutions, at least one of any 8 must pass, so pass@8 = 1. pass@k rewards getting it right in one of k attempts."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "elo-win", "level": "college", "purpose": "check",
  "objectives": ["judges-and-custom"],
  "question": "In an arena, model A has a rating 150 points above model B. What share of head-to-head votes should A win, in percent, according to 1 / (1 + 10^(−150/400))?",
  "answer": 70.3, "tolerance": 0.5, "unit": "%",
  "explanation": "10^(−0.375) ≈ 0.422; 1 / 1.422 ≈ 0.703. Even a clear rating lead means B still wins about 3 votes in 10."
}
```

```ptf-question
{
  "kind": "free_text", "id": "eval-design", "level": "college", "purpose": "check",
  "objectives": ["judges-and-custom", "benchmark-limits"], "misconception": "judge-is-objective",
  "question": "Design an evaluation to choose between two models for a support bot that answers from your product documentation. Include what data you use, which checks are programmatic, how you use an LLM judge safely, and how you decide if a difference is real.",
  "rubric": [
    "Data: a fixed, versioned set of real (anonymised) support questions including edge cases, with reference answers or required facts.",
    "Programmatic checks: correct product facts present, links/IDs valid, format, refusal on out-of-scope questions.",
    "LLM judge with a rubric for tone and helpfulness; both answer orders evaluated; length controlled; calibrated against a human-labelled subset.",
    "Paired comparison on the same items with uncertainty (confidence interval or paired test); no tuning on the test set."
  ],
  "sample_answer": "I take 300 anonymised real tickets, each annotated with the facts a correct answer must contain. Scripts check those facts, link validity and refusals for out-of-scope questions. A judge model rates helpfulness and tone with a rubric, run in both orders and spot-checked against 50 human ratings. I compare the models pairwise on the same tickets with a bootstrap confidence interval and keep the set fixed for future comparisons.",
  "explanation": "Combine exact checks, careful judging and statistics on your own data."
}
```

# Examples

- **School exams**: benchmarks are standardised tests; contamination is seeing the exam in advance; saturation is a test everyone aces. Breaks down: models can be evaluated on thousands of questions in minutes.
- **Chess ratings**: arena rankings work like Elo ratings in chess, built from many pairwise games.

# Tutor notes

- Start with the chance-level example; it is the most common misreading of benchmark tables.
- At college level let the learner estimate the standard error before computing it; most overestimate the precision of a single benchmark score.
- If the learner has an application in mind, end the step by sketching their own ten-question test set together.

# Further reading

- [Hugging Face LLM Course, chapter 11.5: Evaluation](https://huggingface.co/learn/llm-course/chapter11/5): common benchmarks, LLM-as-judge, arenas and building a custom evaluation with lighteval (college).

# Sources

Grounding: [^hf-llm-course-11-5]. Text, examples and questions are original.

[^hf-llm-course-11-5]: Hugging Face, LLM Course, chapter 11, section 5 ("Evaluation"), https://huggingface.co/learn/llm-course, Apache License 2.0.
