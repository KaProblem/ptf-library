---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/bias-and-limitations
title: Bias, hallucination and other limits
description: Language models reproduce the patterns of their training text, including stereotypes, and they produce fluent text whether or not it is true. Where this comes from, how to measure it and which safeguards fit which use.
lang: en
levels: [highschool, college]
objectives:
  - id: where-bias
    text: Explain where biases in language models come from and give an example of how one shows up.
  - id: hallucination
    text: Explain why language models state false things fluently (hallucinate) and what reduces it.
  - id: safeguards
    text: Choose safeguards for a given use, including measuring outcomes across groups, grounding answers in sources and keeping people in the loop.
tags: [llm, bias, fairness, hallucination, limitations, responsible-ai]
about:
  - wikidata: Q45253460
    label: algorithmic bias
  - wikidata: Q116197048
    label: hallucination
requires:
  - ptf:el/llm-in-practice/pretraining-and-transfer
leads_to:
  - ptf:el/llm-in-practice/llm-evaluation
duration_min: { highschool: 15, college: 20 }
sources:
  - id: hf-llm-course-1-9
    resource: https://huggingface.co/learn/llm-course/chapter1/9
    title: "Hugging Face LLM Course, chapter 1, section 9: Bias and limitations"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-06T01:40:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- A model trained on a large part of the internet has learned how people write, including their prejudices. And it has learned to sound convincing, whether or not it knows the answer.
- This step looks at both problems: where biases come from and how they show up, and why fluent false statements (hallucinations) happen.
- Afterwards the learner can spot these failure modes, measure a simple form of bias in a system's decisions, and choose safeguards before using a model for something that matters.

# Core

A language model learns the statistics of its training text. Where that
text over- or under-represents groups or links them to stereotypes, the
model reproduces those associations, and fine-tuning on a small clean set
does not remove them. Separately, the model is trained to produce plausible
continuations, not true ones: when it lacks the knowledge, it still
produces fluent text, which can be false (hallucination). Neither problem
is fully solved. They are reduced by measuring outcomes across groups,
grounding answers in retrieved sources, letting the model say "I don't
know", testing on the actual use case, and keeping humans responsible for
decisions that affect people.

# Key facts

- **Sources of bias**: what is written on the internet (over-representation of some languages, regions and viewpoints), historical patterns (who held which jobs), how data was filtered, and the preferences of the people who rated answers during fine-tuning.
- **How bias shows up**: associations (completing "the nurse said that …" with "she" far more often than "he"), different quality for different languages or dialects, and different outcomes for groups when a model is used to score or select people.
- **Measuring**: compare outcomes for groups on otherwise matched inputs (swap only a name or pronoun). One simple rule from hiring practice: if one group's selection rate is below four fifths (80 %) of the highest group's rate, look closer. Selection rates 60 % vs 80 % give a ratio of 0.75.
- **Hallucination**: a fluent, confident statement that is false or unsupported, for example invented citations, wrong numbers, or details about people. Causes: next-token training rewards plausible text; knowledge is stored imperfectly; rare facts are learned poorly; training and evaluation often reward guessing over admitting uncertainty.
- **What helps against hallucination**: retrieval with citations (answer from given sources), asking the model to say when it does not know, lower temperature for factual tasks, verification steps (checking numbers, running code), and evaluation on the real task.
- **Other limits**: a knowledge cut-off date (no knowledge of later events unless given), a limited context window, sensitivity to prompt wording, weak exact arithmetic and character-level tasks (tokens are not letters), and no inherent notion of truth.
- Models must not be the sole decision-maker for decisions with legal or similarly significant effects on people (hiring, credit, medical, legal); regulations such as the EU AI Act classify many such uses as high-risk.

# Level: highschool

<!-- ptf:text v1 -->

Try this in your head: "The nurse said that ___ would be back soon."
Which word came to mind first, he or she? Most people think "she",
because they have read and heard that pairing far more often. A language
model has read billions of sentences, so it picks up the same patterns,
the fair ones and the unfair ones. If most texts it saw describe
engineers as men, it will tend to write about engineers as men.

That is what **bias** in a model means: it repeats the slants of the text
it learned from. It also shows up in quieter ways: a model might work
very well in English and noticeably worse in a language with less text
online. And it becomes serious when a model helps make decisions about
people, for example sorting job applications. Then you have to check:
does it treat applications differently when only the name changes?

The second big limit is **hallucination**. A language model is trained
to write text that sounds right, not text that is right. If it does not
know an answer, it does not stay silent; it writes something that looks
like an answer, in the same confident tone. That is how models invent
book titles, quotes or numbers that do not exist.

What helps? Give the model the facts in the prompt (for example search
results or your documents) and ask it to answer only from them, with
sources. Let it say "I don't know". Check numbers and quotes. And for
anything important about real people, such as grades, jobs or health, a
person must stay responsible for the decision.

# Level: college

<!-- ptf:text v1 -->

Run a quick probe before reading on: give a model 20 job descriptions and
ask for a one-line reference letter, once with a male and once with a
female name. Compare adjectives. Paired probes like this are the simplest
bias measurement.

**Bias** enters at every stage. Pretraining corpora skew towards some
languages, regions and demographics and encode historical associations;
filtering for "quality" can remove dialects; SFT and preference data
encode the norms of the annotators. Representations learned in
pretraining persist through fine-tuning, so a small debiasing set has
limited effect. Bias shows up as associational bias (pronoun and
occupation co-occurrence), quality-of-service gaps (higher error rates for
some languages or dialects) and allocational harm when outputs drive
decisions. Measurement uses counterfactual pairs (swap only the group
attribute), group-wise error rates, and selection-rate ratios
(the four-fifths heuristic: 0.60 / 0.80 = 0.75 < 0.8 flags a disparity).
No single fairness metric captures everything, and some are mutually
incompatible.

**Hallucination** follows from the objective: maximum likelihood rewards
plausible continuations; there is no explicit truth signal. Rare facts
are poorly memorised, and evaluation schemes that grade only accuracy
reward guessing over abstaining, so models learn to guess confidently.
Mitigations: retrieval-augmented generation with required citations and
answer-only-from-context instructions, training and prompting for
calibrated abstention, low-temperature decoding for factual tasks, tool
use for computation, verification passes, and task-specific evaluation
with factuality checks.

**Other structural limits**: knowledge cut-off, finite context, prompt
sensitivity, token-level blind spots (counting letters, exact digits),
and susceptibility to instructions hidden in retrieved content (prompt
injection) once a model reads external data.

Deployment consequence: decide by use case. Low-stakes drafting needs
light checks; decisions about people need group-wise evaluation,
documentation (model cards), human accountability and compliance with
regulation that treats them as high-risk.

# Misconceptions

- **model-is-neutral**: A model is a neutral machine without opinions → it reproduces patterns of its training data and annotators, including stereotypes.
- **finetune-fixes-bias**: A short fine-tune on balanced data removes bias → associations from pretraining largely persist.
- **confident-means-true**: A confident, detailed answer is probably correct → models sound equally confident when they hallucinate.
- **hallucination-solved-by-size**: Bigger models no longer hallucinate → larger models hallucinate less on common facts but still do on rare or unknown ones.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "where-from", "level": "highschool", "purpose": "check",
  "objectives": ["where-bias"], "misconception": "model-is-neutral",
  "question": "A model mostly writes about engineers as men. Where does this come from?",
  "options": [
    { "text": "From patterns in the texts it learned from, where engineers were mostly described as men", "correct": true, "feedback": "Right. The model repeats what was frequent in its data." },
    { "text": "The programmers wrote a rule that engineers are men", "correct": false, "feedback": "No such rule exists; the pattern is learned from text." },
    { "text": "It is random and means nothing", "correct": false, "feedback": "It is systematic: it reflects the training data." }
  ],
  "explanation": "Models learn statistics of their text, including unfair ones."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "name-swap", "level": "highschool", "purpose": "check",
  "objectives": ["safeguards", "where-bias"],
  "question": "A company wants a model to pre-sort job applications. What is a good first check for bias?",
  "options": [
    { "text": "Give it pairs of identical applications that differ only in the name, and compare the results", "correct": true, "feedback": "Right. If only the name changed, the result should not change." },
    { "text": "Ask the model whether it is biased", "correct": false, "feedback": "Its answer about itself is not a measurement." },
    { "text": "Check that it answers quickly", "correct": false, "feedback": "Speed says nothing about fairness." }
  ],
  "explanation": "Matched pairs that differ only in a group attribute are the simplest bias test."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "why-hallucinate", "level": "highschool", "purpose": "check",
  "objectives": ["hallucination"], "misconception": "confident-means-true",
  "question": "A model names a book with author, year and title, but the book does not exist. Why does this happen?",
  "options": [
    { "text": "It was trained to write text that sounds right, so it produces something that looks like an answer even when it does not know", "correct": true, "feedback": "Right. That is a hallucination." },
    { "text": "It is lying on purpose", "correct": false, "feedback": "It has no intention; it continues text plausibly." },
    { "text": "The book was deleted from the internet", "correct": false, "feedback": "It never existed; the model made it up." }
  ],
  "explanation": "Plausible is not the same as true, and the tone does not reveal the difference."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "reduce-hallucination", "level": "highschool", "purpose": "check",
  "objectives": ["hallucination", "safeguards"], "misconception": "confident-means-true",
  "question": "Which step reduces made-up facts the most when a model answers questions about your school's rules?",
  "options": [
    { "text": "Put the rule documents into the prompt and ask it to answer only from them, with the source", "correct": true, "feedback": "Right. Grounding in given sources is the strongest everyday safeguard." },
    { "text": "Ask it to sound more confident", "correct": false, "feedback": "Confidence is not accuracy." },
    { "text": "Use a higher temperature", "correct": false, "feedback": "That makes outputs more random, not more accurate." }
  ],
  "explanation": "Answer from sources, allow \"I don't know\", check important details."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "letters", "level": "highschool", "purpose": "transfer",
  "question": "A model miscounts how many times the letter r appears in \"strawberry\". Which limit does that show?",
  "options": [
    { "text": "It sees tokens (pieces of words), not single letters", "correct": true, "feedback": "Right. Counting letters is hard when the word arrives as one or two tokens." },
    { "text": "It is biased against the letter r", "correct": false, "feedback": "Not bias; tokenization." },
    { "text": "Its knowledge cut-off date is too early", "correct": false, "feedback": "Spelling did not change recently." }
  ],
  "explanation": "Some errors come from how text is represented, not from missing knowledge."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "four-fifths", "level": "college", "purpose": "check",
  "objectives": ["safeguards", "where-bias"],
  "question": "A screening model advances 72 of 120 applicants from group A and 45 of 100 from group B. What is the ratio of group B's selection rate to group A's?",
  "answer": 0.75, "tolerance": 0.005,
  "explanation": "A: 72 / 120 = 0.60; B: 45 / 100 = 0.45; 0.45 / 0.60 = 0.75, below the four-fifths (0.8) threshold, so the disparity needs investigation."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "bias-persists", "level": "college", "purpose": "check",
  "objectives": ["where-bias"], "misconception": "finetune-fixes-bias",
  "question": "Which statements about bias in LLMs are right? (Several can be right.)",
  "options": [
    { "text": "Associations learned in pretraining largely survive a small fine-tune on balanced data", "correct": true, "feedback": "Right. The pretrained representations dominate." },
    { "text": "Quality-of-service gaps (worse results for some languages or dialects) are a form of bias", "correct": true, "feedback": "Right." },
    { "text": "Preference data from annotators can add its own biases", "correct": true, "feedback": "Right. The raters' norms are learned too." },
    { "text": "Removing the gender attribute from inputs guarantees fair outputs", "correct": false, "feedback": "Proxies (names, hobbies, word choice) carry the same information." }
  ],
  "explanation": "Bias comes from data at every stage and from proxies; measure outcomes, do not assume."
}
```

```ptf-question
{
  "kind": "free_text", "id": "why-guessing", "level": "college", "purpose": "check",
  "objectives": ["hallucination"], "misconception": "hallucination-solved-by-size",
  "question": "Explain two reasons in the training and evaluation of LLMs that make hallucinations likely, and two mitigations for a question-answering product.",
  "rubric": [
    "Maximum-likelihood objective rewards plausible continuations, not truth.",
    "Rare facts are poorly learned; knowledge is stored imperfectly.",
    "Accuracy-only grading rewards guessing over abstaining.",
    "Mitigations: retrieval with citations, abstention ('I don't know'), low temperature, verification/tool use, task-specific factuality evaluation."
  ],
  "sample_answer": "The model is trained to predict likely text, so a plausible but false continuation is not penalised unless it was in the data, and benchmarks that only count correct answers reward guessing over saying 'I don't know'. For a product I would answer only from retrieved documents with citations and allow and reward abstention, and check numbers with a tool.",
  "explanation": "Hallucination is built into the objective; mitigations add grounding and checks."
}
```

```ptf-question
{
  "kind": "free_text", "id": "deployment-plan", "level": "college", "purpose": "check",
  "objectives": ["safeguards"], "misconception": "model-is-neutral",
  "question": "A bank wants to use an LLM to summarise customer files and recommend whether to grant small loans. List four safeguards you would require before deployment.",
  "rubric": [
    "Human makes and is accountable for the decision; model only assists.",
    "Group-wise evaluation with counterfactual pairs and selection-rate/error-rate comparisons; regular monitoring.",
    "Grounding: summaries must cite the file; checks for hallucinated facts.",
    "Documentation and compliance (high-risk use under regulation), logging, an appeal process for customers."
  ],
  "sample_answer": "A loan officer decides and signs off, the model only drafts. Before launch and then monthly, counterfactual tests and selection-rate ratios across protected groups. Every statement in a summary must cite a passage of the customer file, with an automatic check for unsupported numbers. Documentation of the model and its tests for the regulator, and a way for customers to contest a decision.",
  "explanation": "High-stakes uses need human accountability, measured fairness, grounding and documentation."
}
```

# Examples

- **A parrot in a library**: it repeats what it heard most often, sounds confident, and does not know whether it is true. Breaks down: models generalise and combine far beyond repetition.
- **Name-swap test**: the same CV with two different names is the classic audit used for human hiring too.

# Tutor notes

- Start with the nurse sentence and let the learner notice their own first guess; bias in models then feels familiar rather than accusatory.
- Keep it factual and calm; this is not a step about blame but about knowing the tool's limits.
- If the learner builds something with an LLM, end by deciding together which safeguards their project needs.

# Further reading

- [Hugging Face LLM Course, chapter 1.9: Bias and limitations](https://huggingface.co/learn/llm-course/chapter1/9): a short demonstration of biased completions from a pretrained model (highschool, college).

# Sources

Grounding: [^hf-llm-course-1-9]. Text, examples and questions are original.

[^hf-llm-course-1-9]: Hugging Face, LLM Course, chapter 1, section 9 ("Bias and limitations"), https://huggingface.co/learn/llm-course, Apache License 2.0.
