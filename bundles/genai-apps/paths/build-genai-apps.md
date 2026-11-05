---
type: Learning Path
ptf_version: "0.1"
id: ptf:path/genai-apps/build-genai-apps
title: Building applications with generative AI
description: Sixteen steps from what a language model does to a chat app with search, tools and agents that is evaluated, secured and run responsibly.
lang: en
goal: Design, build and run an application on top of a large language model that is useful, grounded in the right data, safe and measurably good.
objectives:
  - Choose a model and write prompts and settings that make it do a task reliably.
  - Build a chat application that answers from your own documents (RAG) and uses tools, and decide when an agent is worth it.
  - Decide between prompting, retrieval and fine-tuning, and evaluate, secure and monitor the application before and after launch.
audience: [highschool, college]
steps:
  - element: ptf:el/genai-apps/genai-and-llms
  - element: ptf:el/genai-apps/tokens-and-context
  - element: ptf:el/genai-apps/choosing-a-model
  - element: ptf:el/genai-apps/prompt-basics
  - element: ptf:el/genai-apps/prompt-techniques
  - element: ptf:el/genai-apps/sampling-parameters
  - element: ptf:el/genai-apps/chat-apps
  - element: ptf:el/genai-apps/embeddings-search
  - element: ptf:el/genai-apps/rag
  - element: ptf:el/genai-apps/function-calling
  - element: ptf:el/genai-apps/ai-agents
  - element: ptf:el/genai-apps/adapting-models
  - element: ptf:el/genai-apps/responsible-genai
  - element: ptf:el/genai-apps/securing-genai-apps
  - element: ptf:el/genai-apps/ux-for-ai
  - element: ptf:el/genai-apps/genai-lifecycle
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
generated: { by: claude/opus, at: 2026-11-06T01:15:00Z }
sources:
  - id: ms-genai
    resource: https://github.com/microsoft/generative-ai-for-beginners
    title: "Microsoft, Generative AI for Beginners, 21 lessons (MIT License)"
---

# Introduction

This course is about building with large language models, not about how
they work inside. It starts with what a model does and what it costs,
moves through prompts and settings to a chat application, gives that
application your own documents (embeddings and retrieval) and tools
(function calling and agents), and ends with what it takes to ship it:
choosing between prompting, retrieval and fine-tuning, responsible use,
security, user experience, and evaluation and operations.

At the end the learner can design such an application, explain each part
and its failure modes, and plan how to test and run it. It takes about
eight hours at highschool level and ten at college level. No programming
is needed at highschool level; at college level the learner should be able
to read simple code and JSON. A chatbot account helps for trying prompts
but is not required.

# Steps

| # | Phase | Element |
| --- | --- | --- |
| 1 | A Foundations | [Generative AI and large language models](../elements/genai-and-llms.md) |
| 2 | A Foundations | [Tokens, context window and cost](../elements/tokens-and-context.md) |
| 3 | A Foundations | [Choosing a model](../elements/choosing-a-model.md) |
| 4 | B Prompting | [Writing a good prompt](../elements/prompt-basics.md) |
| 5 | B Prompting | [Prompting techniques](../elements/prompt-techniques.md) |
| 6 | B Prompting | [Temperature, top-p and output limits](../elements/sampling-parameters.md) |
| 7 | C Building apps | [Building a chat application](../elements/chat-apps.md) |
| 8 | C Building apps | [Embeddings and semantic search](../elements/embeddings-search.md) |
| 9 | C Building apps | [Retrieval-augmented generation (RAG)](../elements/rag.md) |
| 10 | C Building apps | [Function calling (tool use)](../elements/function-calling.md) |
| 11 | C Building apps | [AI agents](../elements/ai-agents.md) |
| 12 | D Customising | [Prompt, RAG or fine-tune?](../elements/adapting-models.md) |
| 13 | E Shipping | [Using generative AI responsibly](../elements/responsible-genai.md) |
| 14 | E Shipping | [Securing generative AI applications](../elements/securing-genai-apps.md) |
| 15 | E Shipping | [Designing the user experience of AI features](../elements/ux-for-ai.md) |
| 16 | E Shipping | [Evaluating and running a generative AI application](../elements/genai-lifecycle.md) |

# Prior knowledge

Many learners use chatbots daily and believe they know steps 1, 4 and 6.
Ask the `probe` question of these elements before skipping them: the
beliefs that the model looks facts up, remembers the conversation, or
becomes correct at temperature 0 are common even among regular users.
Developers who have built a chat app before can often show steps 2 and 7
quickly. Learners who took the course on how LLMs work (llm-basics) can
skip the internals in step 1 and the softmax part of step 6, but not the
rest of those steps.

# Tutor notes

- This is an application course: when the learner asks how the network works inside, answer briefly and point to the course on how LLMs work instead of going deep.
- Do not recommend specific models, providers or frameworks as current best choices; names and prices change monthly. Teach the criteria and procedures, and use the example prices in the elements.
- Steps 8 to 11 build on each other: embeddings before RAG, function calling before agents. Phase E can be taken in any order.
- Keep one running example through the course if the learner has none of their own, for example a study helper for a school class: it needs prompts, a chat, the class notes (RAG), a calendar tool, responsible behaviour, security, good UX and evaluation.
- At highschool level, keep the calculations short and focus on the decisions; at college level, let the learner do every calculation.
