---
type: Bundle
okf_version: "0.2"
ptf_version: "0.1"
id: llm-basics
title: How large language models work
description: From "guess the next character" to the transformer, built up step by step with hands-on simulators.
lang: en
license: CC-BY-SA-4.0
version: 0.3.1
tags: [llm, machine-learning, gpt]
generated: { by: claude/opus, at: 2026-10-26T12:30:00Z }
---

# Contents

This bundle explains how a GPT-style language model works, without assuming any
prior knowledge. It started as a pilot for the Personal Tutor Format and now
covers the whole path from next-character prediction to an assistant like
ChatGPT, in eleven elements with a simulator for each step. Learners who want
to build it themselves get the code lab `gpt-from-scratch`: one runnable
Python file per step, from the tokenizer to a trained GPT that writes text.

## Paths

- [How GPT works, from scratch](paths/gpt-from-scratch.md)

## Elements

| Element | Levels | Simulator |
| --- | --- | --- |
| [Tokenizer](elements/tokenizer.md) | child, highschool, college | next-char-lab |
| [Training examples, context and batches](elements/training-examples.md) | highschool, college, expert | next-char-lab |
| [Softmax](elements/softmax.md) | highschool, college, expert | next-char-lab |
| [Cross-entropy loss](elements/cross-entropy.md) | highschool, college, expert | loss-lens, next-char-lab |
| [A first model that learns](elements/bigram-model.md) | highschool, college, expert | training-loop |
| [Looking back: the causal mask](elements/causal-mask.md) | highschool, college, expert | causal-mask |
| [Self-attention](elements/self-attention.md) | child, highschool, college, expert | attention-lab |
| [The transformer block](elements/transformer-block.md) | highschool, college, expert | transformer-block |
| [Making depth trainable](elements/residual-stream.md) | highschool, college, expert | residual-stream |
| [The whole machine](elements/gpt-end-to-end.md) | highschool, college, expert | gpt-pipeline |
| [From babbler to assistant](elements/from-babbler-to-assistant.md) | child, highschool, college, expert | babbler-to-assistant |

## Code

| Code lab | Steps | Needs |
| --- | --- | --- |
| [gpt-from-scratch](../../code/gpt-from-scratch/1.0.0/README.md) | tokenizer, batches, bigram, averaging, self-attention, transformer-block, gpt, generate | Python 3.10+, PyTorch; runs on a laptop CPU |
