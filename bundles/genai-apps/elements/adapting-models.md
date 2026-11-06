---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/adapting-models
title: "Prompt, RAG or fine-tune?"
description: The ways to adapt a model to a task, from better prompts through retrieval to fine-tuning, what each one changes, what it costs, and how to choose; fine-tuning shapes behaviour and format but is a poor way to add facts.
lang: en
levels: [highschool, college]
objectives:
  - id: adaptation-ladder
    text: Order the ways to adapt a model by effort (prompting, few-shot examples, retrieval, fine-tuning, training from scratch) and say what each one changes.
  - id: what-fine-tuning-does
    text: Explain what fine-tuning changes (behaviour, format, style, narrow skills), what it needs (many high-quality examples, evaluation) and its limits (unreliable for adding facts, can weaken other abilities, must be repeated for new base models).
  - id: choose-approach
    text: Choose an approach for a scenario and justify it with quality, data, cost and maintenance.
tags: [generative-ai, fine-tuning, rag, prompt-engineering, model-adaptation]
about:
  - wikidata: Q117286419
    label: fine-tuning
  - wikidata: Q130145067
    label: low-rank adaptation
requires:
  - ptf:el/genai-apps/prompt-techniques
  - ptf:el/genai-apps/rag
leads_to:
  - ptf:el/genai-apps/genai-lifecycle
duration_min: { highschool: 20, college: 30 }
sources:
  - id: ms-genai-18
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/18-fine-tuning
    title: "Microsoft, Generative AI for Beginners, lesson 18: Fine-tuning your LLM (MIT License)"
  - id: ms-genai-07
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/07-building-chat-applications
    title: "Microsoft, Generative AI for Beginners, lesson 7: Building generative AI-powered chat applications (MIT License)"
generated: { by: claude/opus, at: 2026-11-06T00:25:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- A question to think about: to make a model know your school's timetable, should you train it on the timetable? Most people say yes. Usually the answer is no: give it the timetable when it is needed.
- "Should we fine-tune?" is one of the most common and most expensive questions in AI projects; the cheaper options usually come first.
- Afterwards the learner can order the ways to adapt a model, say what fine-tuning is good and bad for, and choose an approach for a real case.

# Core

There is a ladder of ways to make a model fit a task, from cheap and
quick to expensive and slow: better instructions, examples in the
prompt, retrieval of documents at question time (RAG), fine-tuning (more
training of an existing model on your examples), and training a model
from scratch. Prompts and retrieval change only what the model sees;
fine-tuning changes the model's weights. Fine-tuning is good at shaping
behaviour: a consistent format or tone, a narrow task done reliably, or
a small model doing what otherwise needs a large one, and it can save the
tokens of long instructions. It needs hundreds or more good examples and
an evaluation, is a poor way to add or update facts, can weaken abilities
the training data did not cover, and must be repeated when the base model
changes. Climb the ladder only as far as an evaluation shows you need.

# Key facts

- Ladder: (1) prompt engineering → (2) few-shot examples → (3) RAG → (4) fine-tuning → (5) pretraining a model from scratch. Effort, cost and time grow with every rung.
- What changes: prompting and RAG change the input; fine-tuning changes weights; pretraining creates the weights.
- Fine-tuning fits: fixed output format or style, classification or extraction with many labelled examples, domain jargon in phrasing, distilling a large model's behaviour into a smaller, cheaper one, and shortening prompts that repeat long instructions.
- Fine-tuning does not fit: knowledge that changes (prices, rules, news), facts that must be cited, or tasks with little or noisy data.
- Data: typically hundreds to thousands of high-quality input/output pairs, plus a held-out evaluation set; quality matters more than quantity.
- Parameter-efficient fine-tuning (for example LoRA) trains small added matrices instead of all weights, which makes fine-tuning cheaper and lets several adaptations share one base model.
- Risks: overfitting to the training examples, forgetting general abilities, baking in errors or biases from the data, and maintenance (redo when the base model is updated or retired).
- Cost example: a 2,000-token few-shot block sent with 500,000 requests a month at $2 per million input tokens costs $2,000 a month; a one-off fine-tuning cost of $3,000 that removes it pays off after 1.5 months, if quality holds.
- RAG and fine-tuning combine: fine-tune for the answer style, retrieve for the facts.

# Level: highschool

<!-- ptf:text v1 -->

Say you want an AI helper for your school. There are several ways to
make a general model fit, like rungs on a ladder.

Rung 1: write better instructions. Rung 2: add a few examples of good
answers to the prompt. Rung 3: look up the right documents (the
timetable, the rule book) for each question and put them into the prompt;
that is RAG. Rung 4: fine-tuning, which means training the model some
more on hundreds of your own examples, so its weights change. Rung 5:
train a whole new model, which only big companies do.

Each rung costs more time and money than the one below, so start at the
bottom and only climb when you have tested that the lower rung is not
good enough.

What is fine-tuning good for? Teaching a style or a fixed format, like
always answering as a friendly school helper in three short sentences, or
doing one narrow job very reliably. What is it bad for? Facts. If you
fine-tune on this year's timetable, the model may still mix up times, and
next term you would have to train again. For facts, look them up (RAG).
Fine-tuning also needs lots of good examples, and the model can get worse
at things you did not train.

# Level: college

<!-- ptf:text v1 -->

Adaptation options differ in what they modify. Prompting and in-context
examples condition the frozen model per request. RAG conditions it on
retrieved evidence. Fine-tuning (supervised, on input/output pairs, or by
preference optimisation) updates weights, either all of them or, with
parameter-efficient methods such as LoRA, low-rank adapters added to some
layers; adapters are small, cheap to train and swappable on a shared base
model. Pretraining from scratch is out of reach for most teams.

Fine-tuning is effective for behaviour: output schemas and style,
consistent task framing, domain phrasing, and distillation of a large
model's outputs into a small model for cost and latency. It amortises
long prompts into weights. It is ineffective as a knowledge store: facts
learned this way are recalled unreliably, cannot be cited, go stale, and
updating them means retraining, while narrow fine-tuning can degrade
general capabilities (catastrophic forgetting) and amplify artefacts of
the dataset.

Decide empirically. Build an evaluation set first; push prompting and
few-shot as far as they go; add retrieval for missing knowledge; fine-tune
only when a measured gap remains in behaviour or cost, with hundreds to
thousands of curated examples and a held-out test. Count the full cost:
data creation, training runs, evaluation, hosting of the tuned model,
and retraining when the base model is deprecated.

# Misconceptions

- **fine-tune-to-teach-facts**: To make a model know my documents, fine-tune it on them → fine-tuning recalls facts unreliably and goes stale; retrieve facts with RAG instead.
- **fine-tune-first**: Fine-tuning is the first thing to try → start with prompting, examples and retrieval; fine-tune only when an evaluation shows a remaining gap.
- **few-examples-enough**: A dozen examples are enough to fine-tune well → it usually takes hundreds to thousands of good examples, plus a test set.
- **fine-tuning-only-improves**: Fine-tuning can only make a model better → it can weaken abilities outside the training data and copy errors from the data.
- **rag-or-fine-tune**: You must choose either RAG or fine-tuning → they combine: fine-tune for style and format, retrieve for facts.
- **tune-once**: A fine-tuned model is done forever → when the base model is updated or retired, the tuning must be redone and re-evaluated.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "timetable",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "fine-tune-to-teach-facts",
  "question": "Guess: you want a school helper to answer questions about this term's timetable. What is the best way?",
  "options": [
    { "text": "Look up the timetable for each question and give it to the model (RAG)", "correct": true, "feedback": "Right: facts that change are best looked up, not trained in." },
    { "text": "Fine-tune the model on the timetable", "correct": false, "feedback": "It may still mix up times, and you would retrain every term." },
    { "text": "Train a brand-new model", "correct": false, "feedback": "Far too expensive, with the same problem." }
  ],
  "explanation": "Facts that change belong in retrieval; training shapes behaviour."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "ladder",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["adaptation-ladder"],
  "misconception": "fine-tune-first",
  "instruction": "Order the ways to adapt a model from least to most effort.",
  "items": [
    "Write clearer instructions",
    "Add a few examples to the prompt",
    "Look up documents for each question (RAG)",
    "Fine-tune the model on your examples",
    "Train a new model from scratch"
  ],
  "explanation": "Climb only as far as tests show you need."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "fine-tune-good-for",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["what-fine-tuning-does"],
  "misconception": "fine-tuning-only-improves",
  "question": "Which two statements about fine-tuning are true?",
  "options": [
    { "text": "It is good for teaching a fixed style or answer format", "correct": true, "feedback": "Yes: behaviour and format are its strength." },
    { "text": "It needs many good examples, often hundreds or more", "correct": true, "feedback": "Yes: a handful is not enough." },
    { "text": "It is the best way to keep a model up to date with news", "correct": false, "feedback": "News changes daily; retrieval fits." },
    { "text": "It can only make the model better at everything", "correct": false, "feedback": "It can make the model worse at things outside the training examples." }
  ],
  "explanation": "Fine-tuning changes weights to shape behaviour; it needs data and has side effects."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pick-for-case",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["choose-approach"],
  "misconception": "rag-or-fine-tune",
  "question": "A library app should answer questions about its 20,000 books and always reply in the same friendly three-sentence style. Which plan fits?",
  "options": [
    { "text": "Look up book information for each question (RAG), and get the style with clear instructions and examples, or fine-tuning if tests show it is needed", "correct": true, "feedback": "Yes: facts by retrieval, style by prompt or tuning." },
    { "text": "Fine-tune on all 20,000 book descriptions and hope it remembers them", "correct": false, "feedback": "Recall would be unreliable, and every new book would need retraining." },
    { "text": "Only write a better prompt and paste all 20,000 descriptions into it", "correct": false, "feedback": "That does not fit into a context window and would be very expensive." }
  ],
  "explanation": "Combine: retrieval for knowledge, prompting or fine-tuning for behaviour."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lora-and-forgetting",
  "level": "college",
  "purpose": "check",
  "objectives": ["adaptation-ladder", "what-fine-tuning-does"],
  "misconception": "tune-once",
  "question": "Which two statements are correct?",
  "options": [
    { "text": "LoRA trains small low-rank adapter matrices while the base weights stay frozen, so several adapters can share one base model", "correct": true, "feedback": "Yes: parameter-efficient and swappable." },
    { "text": "Narrow fine-tuning can degrade abilities that the training data did not cover", "correct": true, "feedback": "Yes: catastrophic forgetting and dataset artefacts are real risks." },
    { "text": "A fine-tuned adapter keeps working unchanged when the provider replaces the base model", "correct": false, "feedback": "Adapters are tied to the base weights; a new base needs new tuning and evaluation." },
    { "text": "RAG modifies the model's weights at query time", "correct": false, "feedback": "RAG only changes the input." }
  ],
  "explanation": "Know what each method modifies: input, adapters, or all weights."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "break-even",
  "level": "college",
  "purpose": "check",
  "objectives": ["choose-approach"],
  "title": "When does fine-tuning pay off?",
  "intro": "A few-shot block of 2,000 tokens is sent with each of 500,000 requests a month, at $2 per million input tokens. Fine-tuning would remove it and costs $3,000 once (data, training, evaluation). Assume the tuned model costs the same per token.",
  "columns": ["Quantity", "Value"],
  "rows": [
    ["Extra tokens per month (millions)", "1000"],
    ["Cost of the few-shot block per month ($)", "2000"]
  ],
  "result": { "label": "Months until the fine-tuning has paid off", "value": "1.5" },
  "explanation": "500,000 × 2,000 = 10⁹ tokens = 1,000 million; × $2 = $2,000 a month; 3,000 / 2,000 = 1.5 months. Only worth it if the tuned model reaches the same quality on the evaluation set, and the cost of redoing it for the next base model has to be counted too."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "legal-assistant",
  "level": "college",
  "purpose": "check",
  "objectives": ["what-fine-tuning-does", "choose-approach"],
  "misconception": "fine-tune-to-teach-facts",
  "question": "A law firm wants an assistant that drafts answers to clients in the firm's house style and cites the current versions of 3,000 internal guidelines, which change monthly. A colleague proposes fine-tuning on the guidelines. Evaluate the proposal and suggest a design.",
  "rubric": [
    "Rejects fine-tuning as the way to store the guidelines: unreliable recall, no citations, stale after monthly changes, costly retraining.",
    "Proposes RAG over the current guidelines with citations and access control.",
    "Treats house style as behaviour: prompt and examples first, fine-tuning only if an evaluation shows a gap; mentions an evaluation set."
  ],
  "sample_answer": "Fine-tuning would blur the guidelines into the weights: the model could not cite them, would recall details unreliably and be outdated within a month. Instead index the guidelines and retrieve the relevant passages with their IDs and dates for every draft. Get the house style with a system prompt and a few example letters; if an evaluation on 50 real cases still shows style problems, fine-tune on a few hundred approved letters for style only, and keep retrieval for the content.",
  "explanation": "Facts by retrieval, behaviour by prompting or fine-tuning, decisions by evaluation."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "distill-small",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["choose-approach", "what-fine-tuning-does"],
  "question": "A large model classifies support tickets very well but is too slow and expensive at 2 million tickets a month. What is a sound next step?",
  "options": [
    { "text": "Label a few thousand tickets with the large model, check a sample by hand, fine-tune a small model on them and compare both on a held-out set", "correct": true, "feedback": "Yes: distillation into a small model, validated by evaluation." },
    { "text": "Fine-tune the large model on a dozen tickets", "correct": false, "feedback": "Too little data, and the large model stays slow and expensive." },
    { "text": "Switch to the small model without testing", "correct": false, "feedback": "Without an evaluation you do not know what quality you lose." },
    { "text": "Add RAG with the ticket history", "correct": false, "feedback": "The problem is cost and speed of a narrow task, not missing knowledge." }
  ],
  "explanation": "Fine-tuning a small model for a narrow task is a classic way to cut cost and latency."
}
```

# Examples

- **Ladder**: instructions, examples, a reference book, extra training, a new education. Where it breaks down: in people, training also builds knowledge reliably; in models, fine-tuned facts are recalled unreliably.
- **Uniform vs. textbook**: fine-tuning gives the model a uniform (how it looks and talks); RAG gives it the textbook (what it knows today).
- **Prompt cost amortised**: a 2,000-token style guide repeated in every request can be replaced by a style fine-tune, cutting input tokens, once the evaluation confirms the style is kept.

# Tutor notes

- Start with the timetable question; the belief that training is how you add facts is the most important misconception here.
- This element is about choosing. How fine-tuning works inside (loss, learning rate, data formats) belongs to courses on training models.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 18 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/18-fine-tuning): fine-tuning concepts and provider workflows; college.

# Sources

Grounding: [^ms-genai-18], [^ms-genai-07]. Text, examples and questions are original.

[^ms-genai-18]: Microsoft, Generative AI for Beginners, lesson 18, MIT License. Used for scope and order only.
[^ms-genai-07]: Microsoft, Generative AI for Beginners, lesson 7, MIT License. Used for scope and order only.
