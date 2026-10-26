---
type: Learning Path
ptf_version: "0.1"
id: ptf:path/llm-basics/gpt-from-scratch
title: How GPT works, from scratch
description: Eleven steps from "predict the next character" to a small transformer that writes Shakespeare-like text, with runnable code for every step.
lang: en
goal: Understand how a GPT-style model is trained and how it generates text, well enough to explain it to someone else.
audience: [highschool, college]
steps:
  - element: ptf:el/llm-basics/tokenizer
  - element: ptf:el/llm-basics/training-examples
  - element: ptf:el/llm-basics/softmax
  - element: ptf:el/llm-basics/cross-entropy
  - element: ptf:el/llm-basics/bigram-model
  - element: ptf:el/llm-basics/causal-mask
  - element: ptf:el/llm-basics/self-attention
  - element: ptf:el/llm-basics/transformer-block
  - element: ptf:el/llm-basics/residual-stream
  - element: ptf:el/llm-basics/gpt-end-to-end
  - element: ptf:el/llm-basics/from-babbler-to-assistant
status: draft
version: 0.3.0
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

| # | Goal | Element | Simulator | Code step |
| --- | --- | --- | --- | --- |
| 1 | A language model predicts the next token; text becomes numbers | [Tokenizer](../elements/tokenizer.md) | next-char-lab: guess, tokenizer | tokenizer |
| 2 | One chunk of text holds many examples; context length and batches | [Training examples](../elements/training-examples.md) | next-char-lab: context-window | batches |
| 3 | Scores become probabilities; sampling and temperature | [Softmax](../elements/softmax.md) | next-char-lab: counted-probabilities, temperature | bigram |
| 4 | Measuring how good a prediction is | [Cross-entropy loss](../elements/cross-entropy.md) | loss-lens; next-char-lab: loss, training-curve | bigram |
| 5 | How a model learns: gradient steps, learning rate, the training loop, generation | [A first model that learns](../elements/bigram-model.md) | training-loop | bigram |
| 6 | Averaging over the past with a triangular mask | [Causal mask](../elements/causal-mask.md) | causal-mask | averaging |
| 7 | Self-attention: query, key, value, masking, scaling by 1/√d | [Self-attention](../elements/self-attention.md) | attention-lab | self-attention |
| 8 | Multi-head attention plus feed-forward make a block | [Transformer block](../elements/transformer-block.md) | transformer-block | transformer-block |
| 9 | Making depth trainable: residual connections, layer norm, dropout; scaling up | [Residual stream](../elements/residual-stream.md) | residual-stream | gpt |
| 10 | The whole machine: from text to the next token, what learns, the context window | [The whole machine](../elements/gpt-end-to-end.md) | gpt-pipeline | gpt, generate |
| 11 | Decoder-only vs. encoder-decoder; pretraining vs. fine-tuning and RLHF | [From babbler to assistant](../elements/from-babbler-to-assistant.md) | babbler-to-assistant | |

# Tutor notes

- Show simulators one station at a time (focus mode, SIMULATOR-SPEC.md §4.7): open the station named in the element's `simulators` entry with focus, let the learner try it, talk about it, then move on with Next. Show the whole simulator only for review.
- Every element has an optional `# Further reading` section with the matching part of the source video and papers. Offer it after the step, as a deep dive, never as a prerequisite.
- Start every session with step 1's guessing game, even for advanced learners: it anchors everything that follows.
- Typical pace at highschool level: steps 1 to 5 in one session of about an hour, steps 6 and 7 in a second session (self-attention is the core and deserves time), steps 8 to 11 in a third.
- Code (college and above, or whenever the learner wants to program): steps 1 to 10 list a step of the code lab `ptf:code/gpt-from-scratch` under `code`. Offer it after the simulator, never before. Copy the lab once (MCP `copy_code_lab`) and keep working in that copy, so the learner's changes carry over from step to step. Let the learner run the code themselves; suggest one of the step's `try` ideas, and compare their numbers with the reference losses below. The code for steps 1 to 6 runs within a minute on a laptop; steps 7 to 10 take a few minutes each, so start the run, then talk while it trains.
- Step 5 is where "learning" stops being magic: insist that the learner sees one nudge in the simulator before the full training loop. Learners who already program can skip the highschool text and go straight to the code step.
- Step 6 is the bridge: make sure the learner has seen that masked softmax over all-zero scores reproduces the plain average, because self-attention only replaces those zeros with query · key.
- In step 7, let the learner guess who "she" refers to before showing any weights; most pick the nearest noun first, which is the hook for "attention is learned, not distance".
- Child level is available for tokenizer, self-attention and from-babbler-to-assistant; for a young learner, a short path tokenizer → self-attention → from-babbler-to-assistant works on its own.
- Step 10 is the review: let the learner order the parts without help first. Whatever they get wrong points to the step to revisit. At the end of the path the learner should be able to explain, in their own words, one full prediction and one training step; ask for both.
- Learners who struggle with step 4 usually need the loss-lens simulator before the training curve.
- Reference numbers for later steps (from training a small model on about 1 million characters of Shakespeare, vocabulary 65): bigram loss about 2.5; one attention head 2.4; multi-head 2.28; with feed-forward 2.24; with residual blocks 2.08; with layer norm 2.06; scaled up (6 layers, 6 heads, 384 dimensions, about 10 million parameters) 1.48. GPT-3 for comparison: 175 billion parameters, trained on 300 billion tokens.
