---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/language-tasks
title: What language models can do
description: The classic language tasks (classification, finding names, answering from a text, summarising, translating, generating), what goes in and comes out of each, and why one large model can now do most of them.
lang: en
levels: [highschool, college]
objectives:
  - id: match-task
    text: Name the language task behind a concrete problem and say what goes into the model and what comes out.
  - id: one-model-many-tasks
    text: Explain how one large generative model can do many tasks through its prompt, and when a small specialised model is still the better choice.
  - id: why-hard
    text: Explain with an example why language is hard for a computer (ambiguity, context, world knowledge).
tags: [llm, nlp, tasks, transformers]
about:
  - wikidata: Q30642
    label: natural language processing
  - wikidata: Q115305900
    label: large language model
requires:
  - ptf:el/llm-basics/tokenizer
leads_to:
  - ptf:el/llm-in-practice/pretraining-and-transfer
  - ptf:el/llm-in-practice/transformer-architectures
duration_min: { highschool: 15, college: 20 }
sources:
  - id: hf-llm-course-1
    resource: https://huggingface.co/learn/llm-course/chapter1/2
    title: "Hugging Face LLM Course, chapter 1, sections 2 and 3"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T22:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Spam filters, autocorrect, translation apps and chat assistants all process language, but they do very different jobs.
- This step sorts those jobs into a handful of tasks, each with a clear input and output, and shows why a single large model can now handle most of them.
- Afterwards the learner can look at a problem ("find all company names in these contracts") and say which task it is, what the model gets and what it returns, and whether a chat model or a small specialised model fits better.

# Core

Natural language processing (NLP) turns language into something a program can
act on. Most practical problems are one of a few tasks: classify a whole text,
label every token, extract an answer from a given text, rewrite a text into
another one (summary, translation), or continue a text. Large language models
are generative: they continue text, so a well-written prompt can turn almost
any task into "continue this text". Small models trained for one task are
still cheaper, faster and easier to run privately when the task is fixed.

# Key facts

- **Text classification**: one label per text (spam / not spam, positive / negative review, topic). Input: a text; output: a label with a score.
- **Token classification**: one label per token, for example named-entity recognition (NER): person, organisation, location. Input: a text; output: labelled spans ("Ada Lovelace" → person).
- **Extractive question answering**: the answer is a span copied from a given context. Input: question + context; output: start and end position of the answer in the context.
- **Text-to-text (sequence-to-sequence)**: summarisation and translation. Input: a text; output: a new text of a different length.
- **Text generation**: continue a prompt, one token after another. Chat assistants are text generation with a conversation as the prompt.
- **Zero-shot classification**: the labels are given only at run time ("is this about sport, politics or cooking?"), without training examples for them.
- Beyond text the same architectures handle speech (speech recognition: audio → text), images (classification, captioning) and mixtures of them (multimodal models).
- Sizes for comparison: BERT-base about 110 million parameters (2018), DistilBERT about 66 million, GPT-2 1.5 billion (2019), GPT-3 175 billion (2020).
- Language is hard for programs because words are ambiguous ("bank"), meaning depends on context and on world knowledge ("The trophy did not fit in the suitcase because it was too big": what was too big?), and the same meaning has many forms.

# Level: highschool

<!-- ptf:text v1 -->

Think of three apps on a phone: the mail app sorts out spam, the photo app
reads a street sign aloud in English, and a chat assistant writes a birthday
poem. All three "understand" language, but what they return is very
different: a yes/no label, a translated sentence, a whole new text.

Language programs are easiest to understand by their input and output.
Some give **one label for a whole text** (spam or not, happy or angry
review). Some give **a label for every word**, for example marking which
words are names of people, companies or places. Some **find an answer in a
text** you give them: "When was the bridge built?" plus a paragraph about
the bridge gives back the exact words "in 1932". Some **rewrite a text**
into a shorter one or into another language. And some **continue a text**,
word piece after word piece, which is what chat assistants do.

A large language model is trained to continue text. That sounds like only
the last task, but it can do the others too if you ask in the prompt:
"Is this review positive or negative? Review: …. Answer:". The model simply
continues with "positive". That is why one chat assistant can translate,
summarise and sort.

Still, a small model trained only to detect spam is often the better tool for
a mail server: it answers in milliseconds, costs almost nothing and runs on
the company's own computer, so no mail leaves the building.

Why is all this hard? Read "I saw her duck." Did she own a duck, or did
she bend down? You decide from the story around it and from what you know
about the world. A program has to learn all of that from text.

# Level: college

<!-- ptf:text v1 -->

Before any definitions: for each of these, what should a model return?
"Flag toxic comments", "pull the invoice number out of an e-mail",
"which clause in this contract mentions liability?", "write a German
version of this manual". Sorting by output type gives the standard NLP
tasks.

| Task | Input | Output | Typical model |
| --- | --- | --- | --- |
| Sequence classification | text | one label + score | encoder + classification head |
| Token classification (NER, POS) | text | one label per token | encoder + per-token head |
| Extractive QA | question + context | start/end indices of a span | encoder + span head |
| Seq2seq (summarisation, translation) | text | new text | encoder-decoder |
| Causal generation | prompt | continuation | decoder |

Zero-shot classification turns the label set into an input: the model scores
how well each candidate label fits (for example via natural-language
inference or via a prompt), so new labels need no training data.

A decoder-only LLM is trained only to continue text, yet the table collapses
into one interface: every task can be phrased as a prompt whose most
probable continuation is the answer. That generality costs compute. A
110-million-parameter encoder that classifies support tickets runs on a CPU
at thousands of requests per second; a 70-billion-parameter generalist needs
GPUs, adds latency and may send data to a provider. For a fixed task with
enough labelled data, a fine-tuned small model is often as accurate and far
cheaper; for open-ended or rapidly changing tasks the prompted LLM wins.

What makes the problem hard is not grammar but resolution of meaning:
lexical ambiguity ("bank"), structural ambiguity ("I saw the man with the
telescope"), coreference that needs world knowledge (the trophy and the
suitcase), and many surface forms for one meaning. Models learn these
regularities statistically, which is also why they can fail on unusual
cases.

# Misconceptions

- **llm-only-chats**: A large language model can only chat → it continues text, and any task that can be written as "continue this text" (classification, extraction, translation) can be posed to it in the prompt.
- **bigger-always-better**: The biggest model is always the right choice → for a fixed, narrow task a small fine-tuned model is often as accurate and much cheaper, faster and easier to keep private.
- **qa-invents-answer**: Extractive question answering writes an answer in its own words → it returns a span (start and end position) copied from the given context; generative QA is a different setup.
- **language-is-grammar**: Language is hard for computers because of grammar rules → the hard part is meaning: ambiguity, context and world knowledge.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "warmup-apps", "level": "highschool", "purpose": "warmup",
  "question": "A spam filter, a translation app and a chat assistant all work with language. What is the biggest difference between them?",
  "options": [
    { "text": "What they give back: a label, a translated text, a new text", "correct": true, "feedback": "Yes. Sorting language programs by their output is the key idea of this step." },
    { "text": "Only the chat assistant uses a model; the others are fixed rules", "correct": false, "feedback": "Modern spam filters and translators are learned models too." },
    { "text": "Nothing; they all do the same thing", "correct": false, "feedback": "Their inputs are similar, but their outputs are very different." }
  ],
  "explanation": "A spam filter returns one label for a whole text, a translator a new text in another language, a chat assistant a continuation of the conversation."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "task-names", "level": "highschool", "purpose": "check",
  "objectives": ["match-task"], "misconception": "qa-invents-answer",
  "question": "A program gets a news article and has to mark every person, company and city mentioned in it. Which task is that?",
  "options": [
    { "text": "A label for every word (named-entity recognition)", "correct": true, "feedback": "Right. Every word gets a label such as person, organisation, place or none." },
    { "text": "One label for the whole text", "correct": false, "feedback": "That would give the article one label, such as 'sport', not mark the names in it." },
    { "text": "Translation", "correct": false, "feedback": "Nothing is rewritten; the article stays as it is, with labels added." },
    { "text": "Summarisation", "correct": false, "feedback": "A summary is a new, shorter text; here the program only marks words." }
  ],
  "explanation": "Marking names is token classification, usually called named-entity recognition (NER)."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "qa-span", "level": "highschool", "purpose": "check",
  "objectives": ["match-task"], "misconception": "qa-invents-answer",
  "question": "A question-answering program gets the question \"When was the bridge built?\" and a paragraph about the bridge. What does an extractive model give back?",
  "options": [
    { "text": "The exact words from the paragraph, such as \"in 1932\"", "correct": true, "feedback": "Yes. It points to the start and end of the answer inside the given text." },
    { "text": "A new sentence in its own words", "correct": false, "feedback": "That is generative question answering. An extractive model only copies a piece of the text." },
    { "text": "Yes or no", "correct": false, "feedback": "The question asks for a date, and the model finds it in the text." }
  ],
  "explanation": "Extractive question answering returns a span of the context. If the answer is not in the text, it cannot produce it."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "prompt-any-task", "level": "highschool", "purpose": "check",
  "objectives": ["one-model-many-tasks"], "misconception": "llm-only-chats",
  "question": "A large language model was only trained to continue text. How can it sort reviews into positive and negative?",
  "options": [
    { "text": "You write the review into a prompt that ends with \"This review is\", and the model continues with \"positive\" or \"negative\"", "correct": true, "feedback": "Right. The task becomes a text to continue." },
    { "text": "It cannot; it needs a new model for that", "correct": false, "feedback": "It can: almost any task can be written as a text to continue." },
    { "text": "It counts happy and sad words", "correct": false, "feedback": "It does not use word lists; it continues the prompt with the most likely words." }
  ],
  "explanation": "Because the model continues text, the prompt can turn classification, translation or summarising into \"continue this text\"."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "small-model-choice", "level": "highschool", "purpose": "check",
  "objectives": ["one-model-many-tasks"], "misconception": "bigger-always-better",
  "question": "A hospital wants to sort millions of internal e-mails into five departments, and the e-mails must not leave the hospital. What is the best choice?",
  "options": [
    { "text": "A small model trained only for this sorting, running on the hospital's own computers", "correct": true, "feedback": "Yes. It is fast, cheap and keeps the e-mails inside." },
    { "text": "Send every e-mail to the biggest chat assistant on the internet", "correct": false, "feedback": "It would work, but it is slow, expensive for millions of e-mails and sends private data outside." },
    { "text": "It does not matter; all models are the same", "correct": false, "feedback": "Size changes cost, speed and where the model can run." }
  ],
  "explanation": "For a fixed task with many requests and private data, a small specialised model is usually the better tool."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "duck", "level": "highschool", "purpose": "check",
  "objectives": ["why-hard"], "misconception": "language-is-grammar",
  "question": "\"I saw her duck.\" Why is a sentence like this hard for a program?",
  "options": [
    { "text": "It can mean two things, and only the context decides which", "correct": true, "feedback": "Right. Duck can be an animal or a movement; you need the story around it." },
    { "text": "The grammar is wrong", "correct": false, "feedback": "The grammar is fine. The meaning is unclear." },
    { "text": "The words are too rare", "correct": false, "feedback": "All four words are common; the problem is ambiguity." }
  ],
  "explanation": "Ambiguity is everywhere in language. People resolve it from context and world knowledge; a model has to learn that from text."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "task-table", "level": "college", "purpose": "check",
  "objectives": ["match-task"], "misconception": "qa-invents-answer",
  "question": "Which pairs of problem and task are right? (Several can be right.)",
  "options": [
    { "text": "Pull the invoice number out of an e-mail → token classification or extractive QA", "correct": true, "feedback": "Right. The number is a span of the input, so labelling tokens or extracting a span both work." },
    { "text": "Flag toxic comments → sequence classification", "correct": true, "feedback": "Right. One label per comment." },
    { "text": "Write a German version of a manual → sequence-to-sequence", "correct": true, "feedback": "Right. Translation maps a text to a new text." },
    { "text": "Extractive QA → the model writes a free-form answer", "correct": false, "feedback": "Extractive QA returns start and end indices into the context." }
  ],
  "explanation": "Classify by output type: one label, one label per token, a span, a new text, or a continuation."
}
```

```ptf-question
{
  "kind": "free_text", "id": "llm-vs-specialist", "level": "college", "purpose": "check",
  "objectives": ["one-model-many-tasks"], "misconception": "bigger-always-better",
  "question": "A team classifies 20 million support tickets per day into 12 fixed categories and has 50,000 labelled examples. They consider replacing their fine-tuned 110-million-parameter encoder with a prompted 70-billion-parameter LLM. Give two arguments against it and one situation in which the LLM would be the better choice.",
  "rubric": [
    "Cost or throughput: the LLM needs far more compute per ticket (GPUs, latency).",
    "With 50,000 labels and fixed classes the small fine-tuned model is usually as accurate.",
    "Privacy or deployment: the small model runs in-house.",
    "LLM better when categories change often, labels are scarce, or the task needs open-ended output or reasoning."
  ],
  "sample_answer": "The LLM costs hundreds of times more compute per ticket and adds latency, and with 50,000 labelled examples for 12 stable classes the fine-tuned encoder is usually just as accurate. The LLM would win if the categories changed every week or there were no labels, since a prompt can define new labels without training.",
  "explanation": "Generality has a price. For fixed, high-volume tasks with labels, specialised models dominate; prompting shines when tasks change or labels are missing."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "size-ratio", "level": "college", "purpose": "transfer",
  "question": "BERT-base has about 110 million parameters, GPT-3 about 175 billion. About how many times larger is GPT-3?",
  "answer": 1590, "tolerance": 400, "unit": "times", "scale": "log",
  "explanation": "175,000,000,000 / 110,000,000 ≈ 1590. Three orders of magnitude separate a typical task model from a frontier LLM, which is why the choice matters for cost."
}
```

```ptf-question
{
  "kind": "free_text", "id": "trophy", "level": "college", "purpose": "check",
  "objectives": ["why-hard"], "misconception": "language-is-grammar",
  "question": "\"The trophy did not fit in the suitcase because it was too big.\" and \"… because it was too small.\" Explain what \"it\" refers to in each sentence and why this is hard for a program.",
  "rubric": [
    "Too big → the trophy; too small → the suitcase.",
    "The grammar of both sentences is identical; only one word changes.",
    "Resolving 'it' needs world knowledge about objects and containers (coreference)."
  ],
  "sample_answer": "In the first sentence 'it' is the trophy, in the second the suitcase. The sentences have the same structure, so no grammar rule decides; you need to know that things fit into containers only if they are smaller. A model has to pick this up from patterns in text.",
  "explanation": "Coreference that depends on world knowledge (Winograd schemas) is a classic test of language understanding."
}
```

# Examples

- **Spam filter**: sequence classification, two labels. Breaks down as an analogy for chat models: a filter never writes text.
- **Highlighter pen**: named-entity recognition is like highlighting names in three colours; nothing is added or rewritten.
- **"Find it in the text"** exam questions are extractive QA: the answer is underlined in the text, not written new.

# Tutor notes

- Start with the warm-up and let the learner sort three apps they use by what they return before naming any task.
- This step is orientation for the course: keep it short and come back to the task table later, when the architectures step explains which model type fits which task.
- Learners who have used chat assistants often think a chat model is the only kind of language model. The small-model questions are the corrective; do not skip them.

# Further reading

- [Hugging Face LLM Course, chapter 1: NLP and LLMs; Transformers, what can they do?](https://huggingface.co/learn/llm-course/chapter1/2): the same tasks with runnable `pipeline()` examples in Python (highschool, college).

# Sources

Grounding: [^hf-llm-course-1]. Text, examples and questions are original.

[^hf-llm-course-1]: Hugging Face, LLM Course, chapter 1 ("Transformer models"), sections 2 and 3, https://huggingface.co/learn/llm-course, Apache License 2.0.
