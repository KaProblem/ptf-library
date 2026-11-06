---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/tokens-and-context
title: Tokens, context window and cost
description: Language models read and write tokens, not words; the context window limits how many fit into one request, and providers charge per token, so token counts decide what fits and what it costs.
lang: en
levels: [highschool, college]
objectives:
  - id: what-tokens
    text: Explain what tokens are and estimate how many tokens a text has.
  - id: context-window
    text: Explain what the context window limits (instructions, history, documents and the answer together) and what happens when it is full.
  - id: token-cost
    text: Compute the cost of requests from token counts and per-token prices, and name ways to lower it.
tags: [generative-ai, llm, tokens, context-window, cost]
about:
  - wikidata: Q125619872
    label: context window
  - wikidata: Q2143407
    label: lexical token
requires:
  - ptf:el/genai-apps/genai-and-llms
leads_to:
  - ptf:el/genai-apps/choosing-a-model
  - ptf:el/genai-apps/chat-apps
duration_min: { highschool: 20, college: 25 }
sources:
  - id: ms-genai-02
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/02-exploring-and-comparing-different-llms
    title: "Microsoft, Generative AI for Beginners, lesson 2: Exploring and comparing different LLMs (MIT License)"
  - id: ms-genai-06
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/06-text-generation-apps
    title: "Microsoft, Generative AI for Beginners, lesson 6: Building text generation applications (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T22:40:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess: how many tokens does a 1,500-word English essay have? Not 1,500: about 2,000, because a model reads word pieces, not words.
- Tokens are the unit of everything practical: what fits into one request, how long the answer may be and what you pay.
- Afterwards the learner can estimate token counts, check whether a request fits into the context window and compute what an application costs.

# Core

A language model does not read letters or words but tokens: frequent
words are one token, rare or long words are split into several pieces,
and punctuation and spaces count too. Every request has a context window,
a maximum number of tokens the model can handle at once; the instructions,
the conversation so far, any documents and the answer it writes must all
fit into it, and whatever does not fit is cut off or rejected. Providers
charge per token, usually with a separate, higher price for the tokens the
model writes than for the tokens it reads, so cost grows with prompt
length, answer length and the number of requests.

# Key facts

- Rule of thumb for English: 1 token ≈ 4 characters ≈ 0.75 words, so 100 tokens ≈ 75 words and 1,000 words ≈ 1,333 tokens. Other languages (German, Polish, Japanese) and code usually need more tokens for the same content. Exact counts come from the model's own tokenizer.
- A tokenizer has a fixed vocabulary, typically tens of thousands to a few hundred thousand tokens. Unknown words are always representable as several smaller pieces.
- Context window: the maximum number of tokens per request, input and output together for most models. Current models range from a few thousand to over a million tokens.
- Output limit: a separate maximum for the answer (`max_tokens` or similar). An answer that hits it stops mid-sentence.
- When the context is full the application must leave something out: old messages, parts of documents. The model never sees what was left out; it does not "remember" it.
- Long contexts are not used evenly: models often find information at the beginning and end of a long prompt more reliably than in the middle.
- Pricing: per million tokens, input and output priced separately; output often costs several times as much as input. Example prices used in this course: $2 per million input tokens, $8 per million output tokens.
- Cost of one request = input tokens × input price + output tokens × output price. 3,000 input and 500 output tokens at the example prices: 0.006 + 0.004 = $0.01. At 10,000 such requests a day: $100 a day.
- Chat applications resend the conversation with every message, so input tokens grow with every turn (see the element on chat apps).
- Ways to cut cost: shorter instructions, fewer or shorter documents (retrieve only relevant parts), limit answer length, a smaller model for easy tasks, cache repeated prompt prefixes where the provider supports it.

# Level: highschool

<!-- ptf:text v1 -->

Look at a long word like "unbelievably". A model might see it as three
pieces: "un", "believ", "ably". Those pieces are tokens. Short common
words are usually one token each, and spaces and punctuation count too.
In English a token is about three quarters of a word, so 100 tokens are
about 75 words.

Every model has a limit, the context window: how many tokens it can look
at in one go. Your question, the earlier messages of the chat, any text
you pasted and the answer the model writes all share that space. When a
long chat gets too big, the app has to drop the oldest messages, and then
the model really does not know them anymore. That is why a chatbot can
"forget" what you said an hour ago.

Tokens also cost money. Companies pay per million tokens, and the tokens
the model writes cost more than the tokens it reads. One request is cheap,
a fraction of a cent, but an app with thousands of users sends millions of
requests. Multiply tokens per request by the number of requests and by the
price, and you know what the app costs.

# Level: college

<!-- ptf:text v1 -->

Models operate on token IDs from a fixed vocabulary built by a subword
algorithm such as byte-pair encoding: frequent strings become single
tokens, rare strings decompose into several, and any byte sequence stays
representable. For English prose, about 0.75 words or 4 characters per
token is a usable estimate; other languages and source code typically use
more tokens per unit of content. Use the provider's tokenizer when the
count matters.

The context window bounds the total sequence per request: system prompt,
conversation history, retrieved documents, tool definitions and results,
and the generated output (bounded by `max_tokens`). Budget it explicitly.
When the inputs exceed it, the application must truncate, summarise or
retrieve selectively; anything not in the window does not exist for the
model. Even within the window, recall of details in the middle of long
contexts is often weaker than at the edges, so place key instructions and
facts deliberately.

Cost is linear in tokens: input × p_in + output × p_out, with p_out
typically several times p_in, summed over all requests. Multi-turn chats
resend history, retrieval adds document tokens, and agents add tool
schemas and intermediate steps, so per-task cost can be many times the
size of the user's message. Levers: prompt compression, top-k retrieval
instead of whole documents, output limits, routing easy requests to
smaller models, and prompt caching for shared prefixes.

# Misconceptions

- **token-is-word**: One token is one word → tokens are word pieces; on average a token is about three quarters of an English word, and rare words split into several tokens.
- **model-remembers-everything**: The chatbot remembers everything said in a chat → it only sees what fits into the current context window; older parts that the app drops are gone for the model.
- **window-is-input-only**: The context window only limits what I send → for most models the answer has to fit into the same window.
- **flat-price**: A request costs the same however long it is → cost is proportional to the tokens read and written, and written tokens are usually priced higher.
- **bigger-window-always-better**: If everything fits into the window, the model uses all of it equally well → details in the middle of very long contexts are often missed; selecting relevant parts can work better and costs less.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "essay-tokens",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "token-is-word",
  "question": "About how many tokens does a 1,500-word English essay have? Guess.",
  "answer": 2000,
  "tolerance": 400,
  "unit": "tokens",
  "explanation": "A token is about 0.75 English words: 1,500 / 0.75 = 2,000 tokens."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-is-a-token",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["what-tokens"],
  "misconception": "token-is-word",
  "question": "Which two statements about tokens are true?",
  "options": [
    { "text": "A long, rare word can be split into several tokens", "correct": true, "feedback": "Yes: the tokenizer breaks it into known pieces." },
    { "text": "100 tokens are roughly 75 English words", "correct": true, "feedback": "Yes: about 0.75 words per token." },
    { "text": "Every word is exactly one token", "correct": false, "feedback": "Common short words often are; long or rare words are not." },
    { "text": "Spaces and punctuation are ignored", "correct": false, "feedback": "They are part of tokens or tokens of their own and count towards the limit." }
  ],
  "explanation": "Tokens are word pieces from a fixed vocabulary; in English about 4 characters or 0.75 words each."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "forgotten-name",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["context-window"],
  "misconception": "model-remembers-everything",
  "question": "At the start of a very long chat you told the bot your dog's name. Hours later it does not know it anymore. What is the most likely reason?",
  "options": [
    { "text": "The chat no longer fits into the context window, so the app dropped the oldest messages", "correct": true, "feedback": "Yes: what is not in the window does not exist for the model." },
    { "text": "The model deleted the name on purpose to protect your privacy", "correct": false, "feedback": "Nothing was deleted on purpose; it simply was not sent anymore." },
    { "text": "The model got tired", "correct": false, "feedback": "Models do not tire; each request is computed fresh from what is sent." },
    { "text": "It never reads earlier messages, only the last one", "correct": false, "feedback": "It reads all earlier messages that fit into the window." }
  ],
  "explanation": "Instructions, history, documents and the answer share one context window; when it is full, something has to go."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "class-cost",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["token-cost"],
  "misconception": "flat-price",
  "text": "A class of 30 students each sends one request with 2,000 tokens. Together that is {{1}} tokens. At $1 per million tokens this costs ${{2}}.",
  "gaps": [
    { "answer": "60000", "accepted": ["60,000", "60 000"] },
    { "answer": "0.06", "accepted": ["0.060", ".06"] }
  ],
  "explanation": "30 × 2,000 = 60,000 tokens; 60,000 / 1,000,000 × $1 = $0.06."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "book-tokens",
  "level": "college",
  "purpose": "check",
  "objectives": ["what-tokens"],
  "question": "An English novel has about 90,000 words. Estimate its length in tokens.",
  "answer": 120000,
  "tolerance": 20000,
  "unit": "tokens",
  "scale": "log",
  "explanation": "90,000 / 0.75 = 120,000 tokens. It fits into a 128k window, but leaves little room for instructions and the answer."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "context-budget",
  "level": "college",
  "purpose": "check",
  "objectives": ["context-window"],
  "misconception": "window-is-input-only",
  "title": "Budget a context window of 128,000 tokens",
  "intro": "Your app sends a system prompt, retrieved documents and the chat history, and reserves room for the answer. Fill in the running total.",
  "columns": ["Part", "Tokens", "Running total"],
  "rows": [
    ["System prompt", "1,500", "1500"],
    ["Retrieved documents", "100,000", "101500"],
    ["Chat history", "20,000", "121500"],
    ["Reserved for the answer", "4,000", "125500"]
  ],
  "result": { "label": "Tokens left in the window", "value": "2500" },
  "explanation": "1,500 + 100,000 + 20,000 + 4,000 = 125,500, so 128,000 − 125,500 = 2,500 tokens remain. The next long message will force the app to drop history or documents."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "daily-cost",
  "level": "college",
  "purpose": "check",
  "objectives": ["token-cost"],
  "misconception": "flat-price",
  "title": "Daily cost of a summarising service",
  "intro": "Each request has 3,000 input and 500 output tokens. Prices: $2 per million input tokens, $8 per million output tokens. The service handles 10,000 requests a day. Amounts in dollars.",
  "columns": ["Step", "Computation", "Value"],
  "rows": [
    ["Input cost per request", "3,000 × 2 / 1,000,000", "0.006"],
    ["Output cost per request", "500 × 8 / 1,000,000", "0.004"],
    ["Cost per request", "sum", "0.01"]
  ],
  "result": { "label": "Cost per day (10,000 requests)", "value": "100" },
  "explanation": "Output tokens are only a sixth of the tokens but 40 % of the cost, because they are four times as expensive."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cut-cost",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["token-cost", "context-window"],
  "misconception": "bigger-window-always-better",
  "question": "Your RAG chatbot pastes 40 whole documents into every request and is too expensive. Which two changes lower the cost without making answers worse?",
  "options": [
    { "text": "Retrieve only the few most relevant passages instead of whole documents", "correct": true, "feedback": "Yes: fewer input tokens, and the model is less likely to miss the relevant part." },
    { "text": "Send easy questions to a smaller, cheaper model", "correct": true, "feedback": "Yes: routing by difficulty is a common lever, checked with an evaluation set." },
    { "text": "Raise the temperature", "correct": false, "feedback": "Temperature changes randomness, not the number of tokens." },
    { "text": "Switch to a model with a bigger context window and keep sending everything", "correct": false, "feedback": "You still pay for every token, and middle parts of long contexts are often missed." }
  ],
  "explanation": "Cost scales with tokens; sending less but more relevant text is cheaper and often more accurate."
}
```

# Examples

- **Suitcase**: the context window is a suitcase for one trip; instructions, chat history, documents and the answer all have to fit. Where it breaks down: a suitcase holds things equally well everywhere, while models attend less reliably to the middle of long contexts.
- **Taxi meter**: every token read and written adds to the bill, and written tokens tick faster. Where it breaks down: some providers give discounts for cached repeated prefixes, so identical openings can be cheaper.
- **Worked estimate**: a 10-page report of about 5,000 words is about 6,700 tokens; asking for a 300-word summary adds about 400 output tokens.

# Tutor notes

- If the learner has access to a tokenizer playground of any provider, let them paste a sentence in English and in German and compare the counts; otherwise use the "unbelievably" example.
- Prices change quickly; teach the formula and use the example prices of this element, never quote a provider's current price as fact.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 6 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/06-text-generation-apps): calling a model from Python with token limits; college.

# Sources

Grounding: [^ms-genai-02], [^ms-genai-06]. Text, examples and questions are original.

[^ms-genai-02]: Microsoft, Generative AI for Beginners, lesson 2, MIT License. Used for scope and order only.
[^ms-genai-06]: Microsoft, Generative AI for Beginners, lesson 6, MIT License. Used for scope and order only.
