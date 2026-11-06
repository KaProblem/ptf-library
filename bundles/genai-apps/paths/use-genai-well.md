---
type: Learning Path
ptf_version: "0.1"
id: ptf:path/genai-apps/use-genai-well
title: Using AI chatbots well
description: A short course for everyone who uses AI chatbots; what they do, how to ask so the answers help, where they fail, and how to use them responsibly.
lang: en
goal: Use AI chatbots effectively and safely for school, work and everyday tasks, knowing when to trust an answer and when to check it.
objectives:
  - Explain how a chatbot produces an answer and why it can be confidently wrong.
  - Write prompts with the right parts and techniques for a task, and improve them by testing.
  - Recognise harms and risks (false facts, bias, privacy, manipulated content) and decide when an answer needs checking.
audience: [highschool]
steps:
  - element: ptf:el/genai-apps/genai-and-llms
  - { element: ptf:el/genai-apps/tokens-and-context, optional: true }
  - element: ptf:el/genai-apps/prompt-basics
  - element: ptf:el/genai-apps/prompt-techniques
  - { element: ptf:el/genai-apps/sampling-parameters, optional: true }
  - { element: ptf:el/genai-apps/image-generation, optional: true }
  - element: ptf:el/genai-apps/responsible-genai
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

A short course for anyone who uses chatbots for homework, work or
everyday questions and wants better and safer results. It explains what
the chatbot actually does, how to write requests that get useful answers,
and where the answers can go wrong, from invented facts to unfair or
harmful content. At the end the learner writes good prompts, improves them
by testing, and knows when an answer has to be checked.

It takes about two hours, or three with the optional steps on tokens,
settings and images. No programming is needed. Having a chatbot to try things in
helps.

# Steps

| # | Element | Note |
| --- | --- | --- |
| 1 | [Generative AI and large language models](../elements/genai-and-llms.md) | |
| 2 | [Tokens, context window and cost](../elements/tokens-and-context.md) | optional: why chats forget |
| 3 | [Writing a good prompt](../elements/prompt-basics.md) | |
| 4 | [Prompting techniques](../elements/prompt-techniques.md) | |
| 5 | [Temperature, top-p and output limits](../elements/sampling-parameters.md) | optional: why answers vary |
| 6 | [Generating and editing images](../elements/image-generation.md) | optional: image prompts and fake pictures |
| 7 | [Using generative AI responsibly](../elements/responsible-genai.md) | |

The full course [Building applications with generative AI](build-genai-apps.md)
continues from here for learners who want to build their own AI applications.

# Prior knowledge

Most learners already use chatbots; ask the `probe` question of each step
before skipping it. Frequent users often overrate what they know about
step 1 (the model does not look things up) and step 3.

# Tutor notes

- Stay at highschool level and use the learner's own tasks (homework, emails, hobbies) as examples; let them try prompts in their own chatbot if they have one.
- In step 7, focus on the user's side: checking facts, recognising bias, not pasting private data, and being careful with content from unknown sources.
