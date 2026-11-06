---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/choosing-a-model
title: Choosing a model
description: Kinds of models (base and instruction-tuned, small and large, reasoning, embedding and multimodal, open-weight and API-only) and how to pick one for a task by quality on your own test cases, cost, speed, context, privacy and license.
lang: en
levels: [highschool, college]
objectives:
  - id: model-kinds
    text: Describe the main kinds of models (instruction-tuned chat, reasoning, small, embedding, image and speech, open-weight or API-only) and what each is for.
  - id: selection-criteria
    text: Choose a model for a task by weighing quality, cost, speed, context window, privacy and hosting, and license.
  - id: evaluate-own-task
    text: Compare candidate models on test cases from the actual task instead of relying on general benchmarks or reputation.
tags: [generative-ai, llm, model-selection, open-weights, small-language-model, evaluation]
about:
  - wikidata: Q112702082
    label: foundation model
  - wikidata: Q123759530
    label: small language model
  - wikidata: Q140928105
    label: open weights
requires:
  - ptf:el/genai-apps/genai-and-llms
  - ptf:el/genai-apps/tokens-and-context
leads_to:
  - ptf:el/genai-apps/genai-lifecycle
duration_min: { highschool: 20, college: 30 }
sources:
  - id: ms-genai-02
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/02-exploring-and-comparing-different-llms
    title: "Microsoft, Generative AI for Beginners, lesson 2: Exploring and comparing different LLMs (MIT License)"
  - id: ms-genai-16
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/16-open-source-models
    title: "Microsoft, Generative AI for Beginners, lesson 16: Open source models (MIT License)"
  - id: ms-genai-19
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/19-slm
    title: "Microsoft, Generative AI for Beginners, lesson 19: Small language models (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T22:50:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Think about it: would you hire a professor to sort your mail? Large models can do almost anything, but for many jobs a small, fast, cheap one does just as well.
- There are hundreds of models; picking one by reputation alone wastes money or quality.
- Afterwards the learner can name the kinds of models, list what to weigh and test candidates on their own task.

# Core

Models differ in what they take and give (text, images, speech, or
vectors for search), in how they were trained (base model, instruction-
tuned chat model, reasoning model that works through a problem before
answering), in size (large models are more capable, small ones faster and
cheaper and can run on a laptop or phone), and in access (API-only, or
open weights that anyone may download and run). There is no best model in
general, only a best fit for a task: weigh quality on that task against
cost, speed, context window, where the data may go, and the license. The
reliable way to decide is to run the candidates on a set of real examples
from the task and compare the results, because general benchmarks and
reputation do not predict performance on a specific job well.

# Key facts

- Instruction-tuned chat models: the default for applications; follow instructions in a conversation format.
- Reasoning models: spend extra output tokens working through a problem before the final answer; better at multi-step maths, code and planning, slower and more expensive per answer.
- Small language models (definitions vary, roughly up to ten billion parameters): fast, cheap, can run locally or on a device; good at narrow tasks such as classification, extraction and simple rewriting; weaker at broad knowledge and long reasoning.
- Embedding models: return a vector instead of text; used for search, clustering and retrieval (see the element on embeddings). Image, speech and multimodal models: generate or understand images and audio.
- Architecture families: decoder-only models (the GPT, Llama, Claude and Gemini families) generate text token by token and are what chat apps use; encoder-only models (BERT and its descendants) read a whole text at once and are used for classification and embeddings, not for writing; encoder-decoder models (T5, BART) read an input and write a new output, a classic design for translation and summarising.
- Foundation model: a large model trained on broad data without hand labels, meant as the base that other models and applications build on (by prompting, RAG or fine-tuning).
- Model vs. service: the model is the trained network (weights, tokenizer, configuration); a service wraps one or more models with hosting, scaling, safety filters, logging and billing. Self-hosting an open-weight model gives you the model, and you must build or buy the service part.
- Open weights: the trained parameters can be downloaded and run on your own hardware; the license decides what you may do (some forbid commercial use or set conditions). "Open source" in the full sense would also need the training data and code, which few models publish. API-only (closed) models run only on the provider's servers.
- Criteria: quality on the task, cost per request, latency (time to first token and total time), context window, data privacy and hosting (may the data leave your servers or the EU?), license, and availability or deprecation of the model version.
- Example: 1 million requests of 1,000 tokens each are 1 billion tokens. At $5 per million tokens that is $5,000; at $0.25 per million, $250.
- Benchmarks measure general tasks under fixed conditions; scores can be inflated when test questions leaked into training data. Your own evaluation set of 30 to 100 real, labelled examples tells you more for your task.
- Pin the model version in production; providers update and retire models, and a new version can behave differently on the same prompt.

# Level: highschool

<!-- ptf:text v1 -->

Imagine three helpers. One is a professor: knows a lot, thinks
carefully, but is slow and expensive. One is a quick student: not as
deep, but fast and cheap. One cannot talk at all but is brilliant at
sorting things by similarity. Models are like that. Big chat models can
do almost anything. Small models are fast and cheap and can even run on a
phone. Reasoning models think through a hard problem step by step before
they answer, which takes longer. Embedding models do not write text; they
turn text into lists of numbers so an app can find similar texts. And
some models make pictures or speech.

Some models you can only use over the internet from the company that
made them. Others have open weights: you can download them and run them
on your own computer, so your data never leaves it.

So which one? It depends on the job. Sorting support emails into five
folders does not need a professor. To decide, do not trust rankings or
what everyone uses: take twenty real examples of your job, try two or
three models, and compare the results, the speed and the price.

# Level: college

<!-- ptf:text v1 -->

Classify models along four axes. Modality: text, code, image, audio,
multimodal, or embeddings (vectors for retrieval). Training: base,
instruction-tuned chat, reasoning models trained to produce extended
intermediate reasoning before answering. Size: from small models with a
few billion parameters or less, which can run on a CPU or device, to
frontier models served on GPU clusters. Access: hosted APIs, or open-
weight checkpoints you deploy yourself under the terms of their license
(which may restrict commercial use); few models are open source in the
sense of releasing data and training code too.

Selection is a constrained optimisation. Quality on your task is the
objective; constraints are cost (tokens × price × volume), latency (time
to first token, tokens per second, plus reasoning tokens for reasoning
models), context length, data residency and privacy, license, and the
operational burden of self-hosting. A common pattern is routing: a small
model handles the easy majority, a large one the hard rest.

Measure, do not assume. Public benchmarks test generic skills, are
sensitive to prompting and can be contaminated by training data. Build an
evaluation set from real inputs with expected outputs or a grading
rubric, run every candidate with the same prompt, and compare pass rate,
cost and latency. Pin model versions and rerun the set before upgrading.

# Misconceptions

- **biggest-is-best**: The biggest, most famous model is the best choice for every task → for narrow tasks smaller models are often as good, much cheaper and faster; the best model is the one that fits the task and constraints.
- **benchmark-predicts-task**: A higher benchmark score means it will be better on my task → benchmarks measure general skills and can be contaminated; only tests on your own examples show what works for you.
- **open-weights-no-rules**: Open-weight models can be used for anything → the license decides; some restrict commercial use or require conditions.
- **open-weights-is-open-source**: Downloadable weights make a model open source → full openness would include training data and code, which most open-weight models do not publish.
- **embedding-model-chats**: An embedding model is a chat model → it returns a vector that represents the meaning of the text, used for search, not an answer.
- **model-never-changes**: A model name always means the same behaviour → providers update and retire versions; pin the version and retest.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "mail-sorter",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "biggest-is-best",
  "question": "A school wants to sort incoming emails into five folders (sick notes, events, parents, invoices, other). Which model would you try first?",
  "options": [
    { "text": "A small, cheap model, tested on real emails", "correct": true, "feedback": "Good instinct: sorting into a few categories is a narrow task; test whether a small model is good enough." },
    { "text": "The largest reasoning model available", "correct": false, "feedback": "It would work, but slowly and expensively for a job that does not need deep reasoning." },
    { "text": "An image generation model", "correct": false, "feedback": "The input and output are text labels, not pictures." }
  ],
  "explanation": "Match the model to the job and check with real examples."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-kind",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["model-kinds"],
  "misconception": "embedding-model-chats",
  "question": "Match job and model kind. Which two pairs are right?",
  "options": [
    { "text": "Find the notes most similar to a question: embedding model", "correct": true, "feedback": "Yes: embeddings turn texts into vectors that can be compared." },
    { "text": "Run a helper on a phone without internet: small language model", "correct": true, "feedback": "Yes: small models can run on the device." },
    { "text": "Chat with a user: embedding model", "correct": false, "feedback": "An embedding model returns numbers, not replies." },
    { "text": "Draw a poster: reasoning model", "correct": false, "feedback": "Reasoning models write text; pictures need an image model." }
  ],
  "explanation": "Chat models answer, reasoning models think longer first, small models are fast and local, embedding models represent meaning as vectors, image models make pictures."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "hospital-data",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["selection-criteria"],
  "misconception": "open-weights-no-rules",
  "question": "A hospital wants to summarise patient letters, and the data must not leave its own servers. What fits best?",
  "options": [
    { "text": "An open-weight model whose license allows this use, run on the hospital's own servers", "correct": true, "feedback": "Yes: the data stays inside, and the license has to permit the use." },
    { "text": "The most popular chat app on the internet", "correct": false, "feedback": "The letters would be sent to an outside company's servers." },
    { "text": "Any open-weight model, the license does not matter", "correct": false, "feedback": "Open weights come with a license that may restrict use." },
    { "text": "No model at all: AI cannot summarise", "correct": false, "feedback": "Summarising is a strength; the constraint here is where the data goes." }
  ],
  "explanation": "Privacy and hosting can rule out whole groups of models before quality is even compared."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "how-to-decide",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["evaluate-own-task"],
  "misconception": "benchmark-predicts-task",
  "question": "You must choose between two models for checking the grammar of German homework. What is the best way to decide?",
  "options": [
    { "text": "Try both on 20 real homework texts and compare the corrections, speed and price", "correct": true, "feedback": "Yes: your own examples show what works for your job." },
    { "text": "Take the one with the higher score in an online ranking", "correct": false, "feedback": "Rankings test general tasks, often in English; they may not match yours." },
    { "text": "Take the one most people use", "correct": false, "feedback": "Popularity says nothing about German grammar correction." },
    { "text": "Ask each model which of them is better", "correct": false, "feedback": "Models do not know how well they do on your task." }
  ],
  "explanation": "A small set of real examples is the most reliable test."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "reasoning-tradeoff",
  "level": "college",
  "purpose": "check",
  "objectives": ["model-kinds"],
  "misconception": "open-weights-is-open-source",
  "question": "Which two statements are correct?",
  "options": [
    { "text": "Reasoning models generate extra tokens before answering, which costs time and money but helps on multi-step problems", "correct": true, "feedback": "Yes: the reasoning tokens are billed and add latency." },
    { "text": "An open-weight model can be self-hosted, but its license may still restrict commercial use", "correct": true, "feedback": "Yes: weights and license come together." },
    { "text": "Open-weight models always publish their training data", "correct": false, "feedback": "Few do; weights alone are not full open source." },
    { "text": "Small models cannot be fine-tuned", "correct": false, "feedback": "They are often the easiest to fine-tune because they are cheap to train." },
    { "text": "Embedding models are just chat models with a short output limit", "correct": false, "feedback": "They output vectors, not text." }
  ],
  "explanation": "Know the kind before comparing: reasoning trades latency for multi-step accuracy; open weights trade operational effort for control."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "monthly-volume-cost",
  "level": "college",
  "purpose": "check",
  "objectives": ["selection-criteria"],
  "misconception": "biggest-is-best",
  "title": "Monthly cost of a classifier with two models",
  "intro": "The service handles 1,000,000 requests a month, about 1,000 tokens each (input and output together). Model L costs $5 per million tokens, model S $0.25. Amounts in dollars.",
  "columns": ["Step", "Value"],
  "rows": [
    ["Tokens per month", "1000000000"],
    ["Cost with model L", "5000"],
    ["Cost with model S", "250"]
  ],
  "result": { "label": "Model L costs how many times as much?", "value": "20" },
  "explanation": "10⁶ × 1,000 = 10⁹ tokens = 1,000 million; × $5 = $5,000, × $0.25 = $250. If S reaches the required quality, L's extra cost buys nothing."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "evaluation-procedure",
  "level": "college",
  "purpose": "check",
  "objectives": ["evaluate-own-task"],
  "instruction": "Put the steps of a fair model comparison in order.",
  "items": [
    "Collect real inputs from the task",
    "Write the expected output or a grading rubric for each",
    "Run every candidate model with the same prompt and settings",
    "Score the outputs and record cost and latency",
    "Choose the cheapest model that meets the quality bar, and pin its version"
  ],
  "explanation": "Same inputs, same prompt, same scoring: otherwise the comparison measures the setup, not the model."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "routing-design",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["selection-criteria", "evaluate-own-task"],
  "question": "On your evaluation set a small model solves 85 % of support questions correctly and costs 1/20 of a large model that solves 95 %. Propose a design and say how you would check it.",
  "rubric": [
    "Proposes routing: small model by default, large model for hard or uncertain cases (or a fallback when the small model's answer fails a check).",
    "Says how hard cases are detected (classifier, confidence signal, failed validation, user escalation).",
    "Checks the combined system on the evaluation set for quality and total cost before shipping."
  ],
  "sample_answer": "Send every question to the small model first and route to the large one when a cheap classifier marks the question as complex or when the small model's answer fails validation. Then run the whole router on the evaluation set: if it reaches about the large model's accuracy at a fraction of its cost, ship it, and keep monitoring the share of escalations.",
  "explanation": "Routing combines the cost of small models with the quality of large ones; the evaluation set tells whether it works."
}
```

# Examples

- **Hiring for a job**: you would not hire a surgeon to put plasters on knees, nor a first-aider for surgery. Where it breaks down: models can be swapped in minutes, so testing several candidates is cheap.
- **Open weights as a recipe with a licence**: you may cook it in your own kitchen, but the licence says whether you may sell the dish. Where it breaks down: the recipe (weights) does not tell you how the ingredients (training data) were sourced.
- **A 30-example evaluation set** for a homework grammar checker: 30 real student texts, each with the corrections a teacher would make, scored per text as "all errors found, no new ones introduced".

# Tutor notes

- Do not name specific models as recommendations: names and rankings change monthly. Teach the axes and the procedure.
- At highschool level, keep the cost calculation optional; the decision procedure (test on real examples) is the core.

# Further reading

- Microsoft, Generative AI for Beginners, lessons 2, 16 and 19 (https://github.com/microsoft/generative-ai-for-beginners): comparing model families, open models and small language models; college.

# Sources

Grounding: [^ms-genai-02], [^ms-genai-16], [^ms-genai-19]. Text, examples and questions are original.

[^ms-genai-02]: Microsoft, Generative AI for Beginners, lesson 2, MIT License. Used for scope and order only.
[^ms-genai-16]: Microsoft, Generative AI for Beginners, lesson 16, MIT License. Used for scope and order only.
[^ms-genai-19]: Microsoft, Generative AI for Beginners, lesson 19, MIT License. Used for scope and order only.
