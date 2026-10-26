---
type: Bundle
okf_version: "0.2"
ptf_version: "0.1"
id: llm-basics
title: How large language models work
description: From "guess the next character" to the transformer, built up step by step with hands-on simulators.
lang: en
license: CC-BY-SA-4.0
version: 0.1.0
tags: [llm, machine-learning, gpt]
generated: { by: claude/opus, at: 2026-10-26T12:30:00Z }
---

# Contents

This bundle explains how a GPT-style language model works, without assuming any
prior knowledge. It started as a pilot for the Personal Tutor Format: the
first three steps exist, the rest are planned in the path.

## Paths

- [How GPT works, from scratch](paths/gpt-from-scratch.md)

## Elements

| Element | Levels | Simulator |
| --- | --- | --- |
| [Tokenizer](elements/tokenizer.md) | child, highschool, college | next-char-lab |
| [Softmax](elements/softmax.md) | highschool, college, expert | next-char-lab |
| [Cross-entropy loss](elements/cross-entropy.md) | highschool, college, expert | loss-lens, next-char-lab |
