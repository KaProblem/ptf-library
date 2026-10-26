---
type: Bundle
okf_version: "0.2"
ptf_version: "0.1"
id: llm-basics
title: How large language models work
description: From "guess the next character" to the transformer, built up step by step with hands-on simulators.
lang: en
license: CC-BY-SA-4.0
version: 0.2.0
tags: [llm, machine-learning, gpt]
generated: { by: claude/opus, at: 2026-10-26T12:30:00Z }
---

# Contents

This bundle explains how a GPT-style language model works, without assuming any
prior knowledge. It started as a pilot for the Personal Tutor Format and now
covers the whole path from next-character prediction to an assistant like
ChatGPT, in nine elements with a simulator for each step.

## Paths

- [How GPT works, from scratch](paths/gpt-from-scratch.md)

## Elements

| Element | Levels | Simulator |
| --- | --- | --- |
| [Tokenizer](elements/tokenizer.md) | child, highschool, college | next-char-lab |
| [Training examples, context and batches](elements/training-examples.md) | highschool, college, expert | next-char-lab |
| [Softmax](elements/softmax.md) | highschool, college, expert | next-char-lab |
| [Cross-entropy loss](elements/cross-entropy.md) | highschool, college, expert | loss-lens, next-char-lab |
| [Looking back: the causal mask](elements/causal-mask.md) | highschool, college, expert | causal-mask |
| [Self-attention](elements/self-attention.md) | child, highschool, college, expert | attention-lab |
| [The transformer block](elements/transformer-block.md) | highschool, college, expert | transformer-block |
| [Making depth trainable](elements/residual-stream.md) | highschool, college, expert | residual-stream |
| [From babbler to assistant](elements/from-babbler-to-assistant.md) | child, highschool, college, expert | babbler-to-assistant |
