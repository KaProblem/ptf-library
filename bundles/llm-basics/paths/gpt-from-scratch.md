---
type: Learning Path
ptf_version: "0.1"
id: ptf:path/llm-basics/gpt-from-scratch
title: How GPT works, from scratch
description: Eight steps from "predict the next character" to a small transformer that writes Shakespeare-like text.
lang: en
goal: Understand how a GPT-style model is trained and how it generates text, well enough to explain it to someone else.
audience: [highschool, college]
steps:
  - element: ptf:el/llm-basics/tokenizer
  - element: ptf:el/llm-basics/softmax
  - element: ptf:el/llm-basics/cross-entropy
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
generated: { by: claude/opus, at: 2026-10-26T12:30:00Z }
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
---

# Overview

A language model does one thing over and over: given the text so far, estimate
what comes next, pick something, append it, repeat. The path builds this up
from the simplest possible model (it only looks at the last character) to a
transformer that looks at the whole context.

# Steps

| # | Goal | Element | Simulator |
| --- | --- | --- | --- |
| 1 | A language model predicts the next token; text becomes numbers | [Tokenizer](../elements/tokenizer.md) | next-char-lab: guess, tokenizer |
| 2 | Scores become probabilities; sampling and temperature | [Softmax](../elements/softmax.md) | next-char-lab: counted-probabilities, temperature |
| 3 | Measuring how good a prediction is | [Cross-entropy loss](../elements/cross-entropy.md) | loss-lens; next-char-lab: loss, training-curve |
| 4 | Averaging over the past with a triangular mask | planned: causal-mask | planned: causal-mask |
| 5 | Self-attention: query, key, value, masking, scaling by 1/√d | planned: self-attention | planned: attention-lab |
| 6 | Multi-head attention plus feed-forward make a block | planned: transformer-block | planned |
| 7 | Making depth trainable: residual connections, layer norm, dropout | planned: residual-stream | planned |
| 8 | Decoder-only vs. encoder-decoder; pretraining vs. fine-tuning | planned: from-babbler-to-assistant | planned |

# Tutor notes

- Start every session with step 1's guessing game, even for advanced learners: it anchors everything that follows.
- Typical pace: steps 1 to 3 in one session of 45 to 60 minutes at highschool level.
- Learners who struggle with step 3 usually need the loss-lens simulator before the training curve.
- Reference numbers for later steps (from training a small model on about 1 million characters of Shakespeare, vocabulary 65): bigram loss about 2.5; one attention head 2.4; multi-head 2.28; with feed-forward 2.24; with residual blocks 2.08; with layer norm 2.06; scaled up (6 layers, 6 heads, 384 dimensions, about 10 million parameters) 1.48. GPT-3 for comparison: 175 billion parameters, trained on 300 billion tokens.
