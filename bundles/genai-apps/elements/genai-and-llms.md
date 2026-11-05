---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/genai-and-llms
title: Generative AI and large language models
description: What generative AI produces, how a large language model writes text one token at a time, how a document completer becomes an assistant, and what these models are good and bad at.
lang: en
levels: [highschool, college]
objectives:
  - id: next-token
    text: Explain how a large language model produces text by predicting one token at a time from patterns it learned in training.
  - id: base-vs-assistant
    text: Tell a base model, which continues documents, from an instruction-tuned assistant, and say what extra training turns one into the other.
  - id: strengths-limits
    text: Name tasks language models do well and their typical failures (invented facts, knowledge cutoff, no access to live data, varying answers), and decide when an output must be checked.
tags: [generative-ai, llm, hallucination, foundations]
about:
  - wikidata: Q117246174
    label: generative artificial intelligence
  - wikidata: Q115305900
    label: large language model
  - wikidata: Q116197048
    label: hallucination
leads_to:
  - ptf:el/genai-apps/tokens-and-context
  - ptf:el/genai-apps/choosing-a-model
duration_min: { highschool: 25, college: 30 }
simulators:
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: document-completer
    levels: [highschool, college]
    role: explore
    use_when: the learner does not believe that a raw language model continues text instead of answering
sources:
  - id: ms-genai-01
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/01-introduction-to-genai
    title: "Microsoft, Generative AI for Beginners, lesson 1: Introduction to Generative AI and Large Language Models (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T22:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: finish the sentence "The capital of France is …". You did not look it up; you completed a pattern. A large language model does exactly that, billions of times faster and over far more text.
- Everything in this course (prompts, chat apps, search, agents) is built on top of this one ability, so it pays to know what it can and cannot do.
- Afterwards the learner can explain how a model writes text, why a chatbot answers instead of rambling, and when its output has to be checked.

# Core

Generative AI produces new content (text, images, code, audio) from a
request called a prompt. A large language model (LLM) is a neural network
trained on huge amounts of text to predict the next piece of text, a
token; it writes an answer by predicting one token, appending it and
predicting again. A model trained only this way (a base model) continues
documents; further training on example conversations and on human
preferences turns it into an assistant that follows instructions. Because
the model produces what is likely rather than what is verified, it can
state false things fluently, it knows nothing after its training data ends
unless the application supplies it, and it can answer the same prompt
differently each time.

# Key facts

- Generative AI: models that create content. Language models (text, code), image models (text → image), speech and music models; multimodal models take or give several kinds.
- LLM: a transformer network with millions to trillions of parameters, trained on text to predict the next token. A token is a word or a piece of a word (see the next element).
- Generation loop: prompt → probabilities for every possible next token → pick one → append it → repeat until a stop token or a length limit.
- Training stages: pretraining on a large text collection gives a base model (document completer); instruction tuning on example dialogues and preference training (for example reinforcement learning from human feedback, RLHF) give an assistant (chat model).
- Hallucination: a fluent, confident output that is false or not supported by any source. It follows from predicting likely text; it is not a rare bug that will simply disappear.
- Knowledge cutoff: the model only knows what was in its training data up to some date. Newer facts, private documents and live data (prices, weather, your calendar) come only from the application: in the prompt, through search (RAG) or through tools.
- Good at: drafting, summarising, rewriting, translating, extracting structure from text, explaining, writing and explaining code, brainstorming. Weak at: exact facts it was not given, counting and arithmetic without a tool, recent events, telling you how sure it really is.
- Rule of thumb: the more an output's correctness matters (medicine, law, money, grades, code that runs), the more it needs a check by a person, a tool or a source.

# Level: highschool

<!-- ptf:text v1 -->

Cover the end of a sentence: "Once upon a …". You know it is "time". A
large language model has read so much text that it can do this for almost
any beginning. It does not look the answer up. For every possible next
word piece (a token) it computes how likely it is, picks one, adds it to
the text and starts again. A whole answer is many such small guesses in a
row.

A model that has only learned this is a document continuer. Ask it "What
is the capital of France?" and it may answer with three more quiz
questions, because quiz sheets on the internet look like that. To make an
assistant, the makers train it further on many example conversations and
let people rate its answers, so it learns to reply helpfully.

Since the model writes what sounds likely, it is great at drafting,
explaining, summarising and translating. But it can make up a quote, a
source or a number in the same confident tone as a true one. It does not
know today's news unless the app gives them to it. And the same question
can get a different answer next time. So: use it as a fast helper, and
check anything that has to be right.

# Level: college

<!-- ptf:text v1 -->

An LLM maps a token sequence to a probability distribution over its
vocabulary for the next token. Generation is autoregressive: sample or
pick a token from that distribution, append it, run again, until an
end-of-sequence token or a token limit. Everything the model "knows" is
encoded in its parameters by pretraining on a large corpus, plus whatever
is in the prompt (its context).

Pretraining yields a base model that continues documents in the style of
its corpus: a question may be followed by more questions, a function
signature by an implementation, an email by a reply. Instruction tuning
(supervised fine-tuning on prompt–response pairs) and preference
optimisation (RLHF or similar) shape it into a chat model that treats the
prompt as a request and follows a conversation format. Applications almost
always use such instruction-tuned models.

The objective explains the failure modes. The model optimises plausibility,
not truth, so unsupported claims (hallucinations) come out as fluently as
supported ones; models are not reliably calibrated about their own
uncertainty. Knowledge stops at the training cutoff and never includes
private data, so applications supply facts at run time: in the prompt,
through retrieval (RAG) or through tool calls. Sampling makes outputs vary
between runs. Design from these properties: use the model where a draft or
a transformation of given text is valuable, and add verification (tests,
sources, human review) where errors are costly.

# Misconceptions

- **looks-it-up**: The model looks answers up in a database or on the internet → a plain LLM computes the next token from patterns in its parameters; it only sees outside information when the application puts it into the prompt or gives it a search tool.
- **fluent-means-true**: A confident, well-written answer is probably correct → fluency comes from predicting likely text; false statements come out just as fluently.
- **knows-current-events**: The model knows what happened yesterday → it knows nothing after its training cutoff unless the application supplies it.
- **thinks-in-whole-answers**: The model plans the whole answer and then writes it down → it produces one token at a time; each token is chosen given the text so far.
- **base-is-assistant**: Every language model answers questions → a base model continues documents; answering helpfully comes from instruction tuning and preference training.
- **same-answer-always**: The same prompt always gives the same answer → sampling picks among likely tokens, so answers vary unless the application fixes the settings.

# Questions

```ptf-question
{
  "kind": "guess_next",
  "id": "finish-the-sentence",
  "level": "highschool",
  "purpose": "warmup",
  "intro": "Be the language model: what is the most likely next word?",
  "prefix": "The capital of France is",
  "answer": "Paris",
  "accepted": ["paris"],
  "hint": "You have read this sentence many times.",
  "explanation": "You did not look it up; you completed a pattern you have seen often. A language model does the same, one token at a time, for any text."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "how-it-writes",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["next-token"],
  "misconception": "looks-it-up",
  "question": "How does a chatbot built on a language model write its answer?",
  "options": [
    { "text": "It predicts a likely next word piece, adds it and repeats", "correct": true, "feedback": "Yes: one token at a time, each chosen from the text so far." },
    { "text": "It finds the matching answer in a big database of answers", "correct": false, "feedback": "There is no table of answers; the model computes the next token from patterns it learned." },
    { "text": "It copies the best web page it finds", "correct": false, "feedback": "A plain model does not search the web; an app can add search, but the writing is still token by token." },
    { "text": "It thinks of the whole answer first and then types it out", "correct": false, "feedback": "It has no finished answer waiting; each token is chosen when it is written." }
  ],
  "explanation": "A language model turns the text so far into probabilities for the next token, picks one, appends it and repeats."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "quiz-sheet",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["base-vs-assistant"],
  "misconception": "base-is-assistant",
  "question": "You type \"What is the capital of France?\" into a model that was only trained to continue internet text. It replies \"What is the capital of Spain? What is the capital of Italy?\". Why?",
  "options": [
    { "text": "It continues the text like a quiz sheet, because it was never trained to answer", "correct": true, "feedback": "Yes: a base model continues documents; answering comes from extra training on conversations." },
    { "text": "It does not know the capital of France", "correct": false, "feedback": "It may well know it; it just was not trained to treat your text as a question to answer." },
    { "text": "The question was too short", "correct": false, "feedback": "Length is not the issue; the model's training is." },
    { "text": "It is broken and should be restarted", "correct": false, "feedback": "This is normal behaviour for a base model." }
  ],
  "explanation": "Pretraining teaches continuing documents. Instruction tuning on example dialogues and training with human ratings make an assistant that replies to requests."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "check-or-trust",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["strengths-limits"],
  "misconception": "fluent-means-true",
  "question": "For which two uses must you check the chatbot's output before relying on it?",
  "options": [
    { "text": "A quotation with author and page number for your school essay", "correct": true, "feedback": "Yes: models invent quotes and page numbers in the same confident tone as real ones." },
    { "text": "Yesterday's opening hours of the swimming pool", "correct": true, "feedback": "Yes: the model has no live data unless the app looks it up." },
    { "text": "Ten ideas for a birthday party", "correct": false, "feedback": "Brainstorming is a strength; nothing breaks if an idea is odd." },
    { "text": "A friendlier rewording of your own message", "correct": false, "feedback": "Rewriting text you gave it is a strength; you can see the result yourself." }
  ],
  "explanation": "Check outputs whose correctness matters and that the model could not know for sure: exact facts, sources, recent or local information."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-to-friend",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["next-token", "strengths-limits"],
  "question": "A friend says: \"The AI said it, so it must be true, it knows everything on the internet.\" Answer in two or three sentences.",
  "rubric": [
    "Says the model predicts likely text token by token instead of looking facts up.",
    "Says it can produce false statements confidently (makes things up).",
    "Mentions that it lacks recent or private information, or that important facts need checking."
  ],
  "sample_answer": "It doesn't look things up; it writes what sounds most likely, word piece by word piece. That's why it can make up facts in a very confident way, and it doesn't know anything newer than its training. For anything important, check a real source.",
  "explanation": "Predicting likely text is not the same as knowing facts."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "generation-loop",
  "level": "college",
  "purpose": "check",
  "objectives": ["next-token"],
  "misconception": "thinks-in-whole-answers",
  "instruction": "Put the steps of generating a reply in order.",
  "items": [
    "Split the prompt into tokens",
    "Compute a probability for every token in the vocabulary",
    "Pick one token according to the sampling settings",
    "Append the token to the sequence",
    "Repeat until an end token or the token limit"
  ],
  "explanation": "Generation is autoregressive: each new token becomes part of the input for the next prediction."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-training",
  "level": "college",
  "purpose": "check",
  "objectives": ["base-vs-assistant"],
  "question": "Which statements about the training stages of a chat model are correct? Choose two.",
  "options": [
    { "text": "Pretraining on a large corpus produces a model that continues documents", "correct": true, "feedback": "Yes: a base model." },
    { "text": "Instruction tuning and preference training teach it to treat the prompt as a request", "correct": true, "feedback": "Yes: they shape behaviour and format, not mainly knowledge." },
    { "text": "Instruction tuning is where the model learns most of its world knowledge", "correct": false, "feedback": "Most knowledge comes from pretraining on far more data; tuning changes behaviour." },
    { "text": "RLHF connects the model to a search engine", "correct": false, "feedback": "RLHF optimises the model towards answers people prefer; retrieval is an application feature." },
    { "text": "A base model and a chat model have different architectures", "correct": false, "feedback": "Usually the same network; the extra training changes its weights." }
  ],
  "explanation": "Base model = pretraining. Assistant = base model plus supervised instruction tuning plus preference optimisation."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "why-hallucinate",
  "level": "college",
  "purpose": "check",
  "objectives": ["strengths-limits"],
  "misconception": "fluent-means-true",
  "question": "Explain from the training objective why LLMs hallucinate, and name two things an application can do about it.",
  "rubric": [
    "The model is trained to produce likely continuations, not verified truth.",
    "Its confidence in the wording does not reliably reflect factual accuracy.",
    "Names at least two mitigations: supply sources in the prompt or via retrieval, tools for facts and arithmetic, ask for citations and check them, human review, tests or validation of outputs."
  ],
  "sample_answer": "Next-token training rewards text that is plausible given the context, so when the model lacks the fact it still produces a plausible-sounding one, and the fluency is the same either way. An application can ground the model with retrieved documents and require citations to them, use tools for lookups and calculations, and have a person or an automatic check verify outputs where errors are costly.",
  "explanation": "Plausibility is the objective; truth has to be supplied and checked by the application."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "app-design",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["strengths-limits"],
  "misconception": "knows-current-events",
  "question": "You build a support bot that must answer questions about your company's current price list. What is the right design?",
  "options": [
    { "text": "Fetch the current price list and put the relevant part into the prompt for each question", "correct": true, "feedback": "Yes: the model only knows prices you give it at run time." },
    { "text": "Ask the model; it was trained on the internet and knows your prices", "correct": false, "feedback": "Your current prices are private and newer than any training cutoff." },
    { "text": "Train it once on the price list and never update it", "correct": false, "feedback": "Prices change; training bakes in a snapshot and is not a reliable way to store exact facts." },
    { "text": "Set the temperature to 0 so it cannot make mistakes", "correct": false, "feedback": "A deterministic wrong answer is still wrong; temperature does not add knowledge." }
  ],
  "explanation": "Facts that are private, exact or changing come from the application at run time (prompt, retrieval, tools)."
}
```

# Examples

- **Autocomplete on a phone** suggests the next word from the words before it. An LLM is the same idea scaled up enormously. Where it breaks down: phone autocomplete looks at a few words; an LLM uses the whole context and has learned grammar, facts and styles.
- **A very well-read improviser**: it can talk about almost anything in the right tone, but when it does not know, it improvises instead of saying so. Where it breaks down: improvisers know when they are making things up; the model has no such reliable signal.
- **Hallucinated source**: ask a model for "three studies on homework and grades with DOI" without giving it sources. It may return realistic-looking citations of studies that do not exist.

# Tutor notes

- Start with the guessing game; it makes "next token" concrete before any term.
- Keep the internals short: this course is about building with models. Learners who want to see how the network works can take the course on how LLMs work (llm-basics) afterwards.
- Do not let the learner leave believing either "it knows everything" or "it is useless": the goal is a calibrated picture.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 1 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/01-introduction-to-genai): the same topics with a running start-up example and code; college.

# Sources

Grounding: [^ms-genai-01]. Text, examples and questions are original.

[^ms-genai-01]: Microsoft, Generative AI for Beginners, lesson 1, MIT License. Used for scope and order only.
