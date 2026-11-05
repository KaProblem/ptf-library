---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/chat-apps
title: Building a chat application
description: The model behind a chat remembers nothing; the app resends the system message and the conversation on every turn, keeps it inside the context window, and adds what users need around the model (role and boundaries, streaming, monitoring, feedback).
lang: en
levels: [highschool, college]
objectives:
  - id: stateless-history
    text: Explain that the model keeps no memory between requests and that the app sends the system message and the conversation so far with every turn.
  - id: manage-history
    text: Keep a growing conversation inside the context window (drop old turns, summarise them, look up earlier facts) and compute how input tokens grow per turn.
  - id: quality-and-ux
    text: Name what a good chat app needs besides the model (a system message with role and boundaries, streaming, monitoring of quality, cost and latency, user feedback, transparency that it is an AI).
tags: [generative-ai, chatbot, chat-application, conversation-memory]
about:
  - wikidata: Q870780
    label: chatbot
requires:
  - ptf:el/genai-apps/tokens-and-context
  - ptf:el/genai-apps/prompt-basics
leads_to:
  - ptf:el/genai-apps/embeddings-search
  - ptf:el/genai-apps/function-calling
duration_min: { highschool: 20, college: 30 }
sources:
  - id: ms-genai-07
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/07-building-chat-applications
    title: "Microsoft, Generative AI for Beginners, lesson 7: Building generative AI-powered chat applications (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T23:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- A surprise: the model behind a chatbot forgets you completely after every message. The chat only feels like a conversation because the app sends the whole conversation again each time.
- That one fact explains why long chats get slow and expensive, why bots "forget", and how memory features really work.
- Afterwards the learner can explain how a chat app works on every turn, keep its history under control, and list what the app needs besides the model.

# Core

A language model is stateless: each request is computed only from what
is sent with it. A chat app therefore sends, on every turn, the system
message (the app's lasting instructions), the earlier user and assistant
messages and the new user message, and appends the reply to its stored
history. Because the history grows with every turn, input tokens, cost
and latency grow too, and eventually the conversation no longer fits the
context window; the app must then drop, summarise or selectively recall
older parts. A good chat app is more than the model: a system message
that sets role, tone and boundaries, streaming so users see the answer
appear, monitoring of quality, cost, latency and failures, a way for
users to give feedback, and honesty that they are talking to an AI.

# Key facts

- A chat API request is a list of messages with roles (system, user, assistant, and tool results where tools are used). The reply is one assistant message.
- The app stores the conversation, not the model. "Memory" features (remembering a user's name across chats) are app features that store facts and put them back into the prompt.
- Input tokens per turn grow roughly linearly with the number of turns; total input tokens over a conversation grow roughly quadratically.
- Example: system message 500 tokens, each user message 50 and each reply 150 tokens. Turn n sends 500 + 200 · (n − 1) + 50 input tokens: 550 in turn 1, 2,350 in turn 10, and 14,500 input tokens over all 10 turns.
- History strategies: sliding window (keep the last k turns), summarisation (replace old turns with a running summary), retrieval (store old turns or facts and pull back the relevant ones), plus pinning the system message and key facts.
- System message: role ("You are the homework helper of …"), audience, tone, scope (what to do with off-topic requests), rules (do not give full solutions; say when unsure), format.
- Streaming sends tokens as they are generated; the total time is the same, but the time until the user sees something (time to first token) drops a lot.
- Monitor: latency (time to first token, total), tokens and cost per conversation, error and refusal rates, user feedback (thumbs up/down, corrections), conversation length, and samples of real conversations for review (with privacy rules).
- Responsible basics: tell users it is an AI, filter or decline harmful requests, offer a route to a human where it matters, be accessible (screen readers, clear language).
- Chatbot vs. chat application: a chatbot answers within one domain; a chat application wraps one or more models with the product's data, tools, user accounts and safety layers.

# Level: highschool

<!-- ptf:text v1 -->

Try this thought experiment. Every time you send a message to a chatbot,
someone hands a stranger the whole printed conversation, including a page
of house rules on top, and asks: "What would you reply next?" The
stranger reads everything, writes one reply, and forgets it all. For the
next message, a new printout, a new stranger. That is how chat apps work:
the model remembers nothing, the app keeps the conversation and sends it
again every time.

This explains a few things. Long chats get slower and cost more, because
the printout gets longer with every message. And at some point it does
not fit anymore; the app then has to leave out old messages or replace
them with a short summary. Anything left out is truly forgotten. Some apps
also save facts about you ("likes short answers") and add them to the
printout, which feels like memory.

The page of house rules is the system message. The app's makers use it to
say who the bot is, what it should and should not help with, and how it
should talk. Good chat apps also show the answer word by word as it is
written (streaming), let you rate answers, say clearly that you are
talking to an AI, and their makers keep an eye on how well, how fast and
how expensively it works.

# Level: college

<!-- ptf:text v1 -->

Each chat completion request is a pure function of the messages sent:
system message, prior user and assistant (and tool) messages, and the new
user message. The application owns state. On each turn it builds the
message list, calls the model, streams the reply to the client, and
appends both turns to its store. Cross-session memory is an application
feature: extract durable facts, store them, and inject them into future
system or user messages.

Since history is resent, input tokens per turn grow linearly in the
number of turns and cumulative input grows quadratically: with a 500-token
system message and 200 tokens per exchange, turn 10 sends 2,350 input
tokens and the conversation so far has consumed 14,500. Before the window
fills, apply a history policy: a sliding window over recent turns, a
rolling summary of older turns, or retrieval of relevant earlier turns and
stored facts; always keep the system message and pinned facts. Provider
prompt caching makes a stable prefix (system message, early turns)
cheaper and faster to resend.

Product quality lives around the model. The system message defines role,
scope, refusal and escalation behaviour, and output conventions. Stream
for perceived latency. Instrument time to first token, total latency,
tokens and cost per conversation, error, refusal and truncation rates,
and explicit and implicit user feedback; review sampled conversations
under a privacy policy and feed failures into your evaluation set.
Disclose that the user talks to an AI, provide a human fallback for
high-stakes topics, and meet accessibility requirements.

# Misconceptions

- **model-has-memory**: The model remembers our conversation → the model is stateless; the app resends the conversation every turn.
- **memory-is-model**: When a bot remembers my name next week, the model has learned it → the app stored the fact and puts it back into the prompt.
- **constant-cost-per-turn**: Every message in a chat costs about the same → the input grows with the history, so later turns cost more.
- **streaming-is-faster**: Streaming makes the model generate faster → the total time is the same; users just see the first words much sooner.
- **system-message-enough**: A good system message is all a chat app needs → it also needs history management, monitoring, feedback, safety and a fallback for when the model fails.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "who-remembers",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "model-has-memory",
  "question": "Guess: you tell a chatbot your name, and three messages later it still uses it. Who remembered your name?",
  "options": [
    { "text": "The app, which sends the whole conversation to the model again with every message", "correct": true, "feedback": "Yes: the model forgets after each reply; the app keeps the conversation." },
    { "text": "The model, which stores it in its brain", "correct": false, "feedback": "The model's weights do not change while you chat." },
    { "text": "Nobody, it guessed your name", "correct": false, "feedback": "It read your name in the conversation the app sent along." }
  ],
  "explanation": "The model is stateless; the app provides the conversation each time."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-is-sent",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["stateless-history"],
  "misconception": "model-has-memory",
  "question": "You send the 5th message in a chat. What does the app send to the model?",
  "options": [
    { "text": "The system message, the first four messages and replies, and your new message", "correct": true, "feedback": "Yes: the model needs the whole conversation every time." },
    { "text": "Only your new message", "correct": false, "feedback": "Then the model would not know what you talked about." },
    { "text": "Only the system message", "correct": false, "feedback": "It would not even see your question." }
  ],
  "explanation": "Every turn is a fresh request built from the stored conversation."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "too-long-chat",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["manage-history"],
  "misconception": "constant-cost-per-turn",
  "question": "A study-buddy chat has become so long that it no longer fits into the model's context window. Which two things can the app do?",
  "options": [
    { "text": "Replace the oldest messages with a short summary", "correct": true, "feedback": "Yes: the gist stays, the tokens shrink." },
    { "text": "Keep only the last messages and the system message", "correct": true, "feedback": "Yes: a sliding window; older details are then forgotten." },
    { "text": "Nothing, the model will remember the old messages anyway", "correct": false, "feedback": "What is not sent does not exist for the model." },
    { "text": "Send the conversation twice", "correct": false, "feedback": "That makes it even longer." }
  ],
  "explanation": "Drop, summarise or look up older parts; always keep the system message."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "good-chat-app",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["quality-and-ux"],
  "misconception": "streaming-is-faster",
  "question": "Which two features make a homework chat app better for its users?",
  "options": [
    { "text": "It says clearly that you are talking to an AI that can make mistakes", "correct": true, "feedback": "Yes: users can then judge the answers." },
    { "text": "Users can rate answers, so the makers find and fix bad ones", "correct": true, "feedback": "Yes: feedback shows where it fails." },
    { "text": "It hides that it is an AI, so it seems more trustworthy", "correct": false, "feedback": "Honesty matters; users should know." },
    { "text": "It shows answers word by word, so the model computes them faster", "correct": false, "feedback": "Streaming shows the first words sooner; it does not make the model faster." }
  ],
  "explanation": "Transparency and feedback loops are part of a good chat app."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "one-turn",
  "level": "college",
  "purpose": "check",
  "objectives": ["stateless-history"],
  "instruction": "Order what a chat backend does on one turn.",
  "items": [
    "Load the stored conversation for this session",
    "Apply the history policy so the request fits the token budget",
    "Build the message list: system message, history, new user message",
    "Call the model and stream the reply to the client",
    "Append the user message and the reply to the stored conversation"
  ],
  "explanation": "The backend owns the state; the model sees only the list it is given."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "history-growth",
  "level": "college",
  "purpose": "check",
  "objectives": ["manage-history"],
  "misconception": "constant-cost-per-turn",
  "title": "Input tokens of a growing chat",
  "intro": "System message 500 tokens, each user message 50 tokens, each reply 150 tokens. The whole history is resent on every turn.",
  "columns": ["Turn", "Input tokens sent"],
  "rows": [
    ["1", "550"],
    ["2", "750"],
    ["3", "950"],
    ["10", "2350"]
  ],
  "result": { "label": "Input tokens over all 10 turns", "value": "14500" },
  "explanation": "Turn n sends 500 + 200 · (n − 1) + 50. Summed over 10 turns: 10 · 550 + 200 · 45 = 14,500, about 26 times the first turn."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-to-monitor",
  "level": "college",
  "purpose": "check",
  "objectives": ["quality-and-ux"],
  "misconception": "system-message-enough",
  "question": "Your chat app is live. Which signals help you find problems? Choose all that are useful.",
  "options": [
    { "text": "Time to first token and total latency per reply", "correct": true, "feedback": "Yes: slow answers drive users away." },
    { "text": "Tokens and cost per conversation", "correct": true, "feedback": "Yes: long histories and retrieval can make costs explode." },
    { "text": "Thumbs-down rate and samples of rated conversations", "correct": true, "feedback": "Yes: they point to concrete failures for the evaluation set." },
    { "text": "The model's own rating of how well it did", "correct": false, "feedback": "Self-assessment is unreliable; measure behaviour and feedback." }
  ],
  "explanation": "Measure latency, cost, failures and real user feedback, and review samples under a privacy policy."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "tutor-system-message",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["quality-and-ux", "manage-history"],
  "question": "Write the key points of a system message and a history policy for a maths homework helper for 14-year-olds that should guide, not solve.",
  "rubric": [
    "Role, audience and tone (helper for 14-year-olds, encouraging, simple words).",
    "Behaviour rules: give hints and ask questions instead of full solutions; check the student's steps; say when unsure; scope for off-topic and unsafe requests, with a route to a teacher or adult.",
    "History policy: keep the system message and the current problem pinned, summarise or drop older problems, and stay within a token budget."
  ],
  "sample_answer": "System: You are a patient maths helper for 14-year-olds. Use short sentences and everyday words. Never give the full solution; give one hint at a time and ask what the student would do next. Check their steps and point to the first mistake. If you are unsure, say so. For off-topic or personal-safety topics, say you can only help with maths and suggest talking to a teacher or parent. History: keep the system message and the current problem with the student's steps; replace finished problems with a one-line summary; cap input at 6,000 tokens.",
  "explanation": "Role, behaviour, scope and a history policy together define the app's behaviour over a long session."
}
```

# Examples

- **The stranger with the printout**: every turn a new reader gets the whole conversation and writes one reply. Where it breaks down: real providers can cache the unchanged beginning of the printout, so resending it is cheaper than reading it fresh.
- **Running summary**: after 20 turns about a biology project, the app replaces turns 1 to 15 with "The student is preparing a talk on photosynthesis; they understood light reactions; open question: the Calvin cycle."
- **Memory feature**: the app saves "prefers answers in German" in the user's profile and adds it to the system message of every new chat.

# Tutor notes

- Use the printout picture early; most learners believe the model remembers.
- At college level let the learner do the token-growth calculation before stating the quadratic growth.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 7 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/07-building-chat-applications): chat applications, system message frameworks, metrics; college.

# Sources

Grounding: [^ms-genai-07]. Text, examples and questions are original.

[^ms-genai-07]: Microsoft, Generative AI for Beginners, lesson 7, MIT License. Used for scope and order only.
