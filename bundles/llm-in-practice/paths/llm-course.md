---
type: Learning Path
ptf_version: "0.1"
id: ptf:path/llm-in-practice/llm-course
title: Working with large language models, from pipeline to reasoning model
description: Twenty steps from what language models can do, through tokenizers, fine-tuning and decoding, to chat models, LoRA, evaluation, preference training and GRPO.
lang: en
goal: Understand how today's language models are built, adapted and judged well enough to choose a model, fine-tune it for a task and read the numbers that come out.
objectives:
  - Explain how pretraining, fine-tuning, instruction tuning, preference training and reinforcement learning with verifiable rewards each change a model.
  - Follow a text through tokenizer, model and decoding, and name the settings that change the result.
  - Read learning curves, metrics and benchmark results critically, including their limits.
audience: [highschool, college]
steps:
  - element: ptf:el/llm-in-practice/language-tasks
  - element: ptf:el/llm-in-practice/pretraining-and-transfer
  - element: ptf:el/llm-in-practice/transformer-architectures
  - element: ptf:el/llm-in-practice/model-heads
  - element: ptf:el/llm-in-practice/subword-tokenization
  - element: ptf:el/llm-in-practice/tokenizer-algorithms
  - element: ptf:el/llm-in-practice/padding-and-masks
  - element: ptf:el/llm-in-practice/fine-tuning-workflow
  - element: ptf:el/llm-in-practice/learning-curves
  - element: ptf:el/llm-in-practice/embeddings-and-search
  - element: ptf:el/llm-in-practice/decoding-strategies
  - element: ptf:el/llm-in-practice/inference-performance
  - element: ptf:el/llm-in-practice/generation-metrics
  - element: ptf:el/llm-in-practice/bias-and-limitations
  - element: ptf:el/llm-in-practice/chat-templates
  - element: ptf:el/llm-in-practice/supervised-fine-tuning
  - element: ptf:el/llm-in-practice/lora
  - element: ptf:el/llm-in-practice/llm-evaluation
  - element: ptf:el/llm-in-practice/preference-training
  - element: ptf:el/llm-in-practice/reasoning-with-grpo
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
generated: { by: claude/opus, at: 2026-11-06T03:00:00Z }
sources:
  - id: hf-llm-course
    resource: https://huggingface.co/learn/llm-course
    title: "Hugging Face LLM Course"
    author: Hugging Face
    license: Apache-2.0
---

# Introduction

This course is about using and adapting large language models, not about
building one from scratch. The learner starts with what language models can
do and how pretraining and transfer learning made them cheap to adapt. Then
they follow a sentence through the tokenizer and the model, fine-tune a model
and read its learning curves, search by meaning with embeddings, and choose
how the next token is picked. The last part covers how a pretrained model
becomes a chat assistant: chat templates, supervised fine-tuning, LoRA,
evaluation, preference training and reasoning training with GRPO.

No programming is required, but learners who can read short Python snippets
get more out of the examples. Learners who have not met tokens, next-token
prediction or attention should do the course
[How GPT works, from scratch](../../llm-basics/paths/gpt-from-scratch.md)
first, or at least its element on tokenizers.

It takes about 5 hours at highschool level and about
8 hours at college level.

# Steps

| # | Phase | Element | Time (highschool / college) |
| --- | --- | --- | --- |
| 1 | A How models are built | [What language models can do](../elements/language-tasks.md) | 15 / 20 min |
| 2 | A How models are built | [Pretraining and transfer learning](../elements/pretraining-and-transfer.md) | 15 / 20 min |
| 3 | A How models are built | [Encoders, decoders and encoder-decoders](../elements/transformer-architectures.md) | 15 / 25 min |
| 4 | A How models are built | [Behind the pipeline - base model and heads](../elements/model-heads.md) | 15 / 25 min |
| 5 | B Text in, tensors out | [Subword tokenizers in practice](../elements/subword-tokenization.md) | 15 / 20 min |
| 6 | B Text in, tensors out | [How tokenizers learn their pieces - BPE, WordPiece, Unigram](../elements/tokenizer-algorithms.md) | 20 / 30 min |
| 7 | B Text in, tensors out | [Batches, padding and attention masks](../elements/padding-and-masks.md) | 15 / 20 min |
| 8 | C Fine-tuning and using models | [Fine-tuning a pretrained model on your task](../elements/fine-tuning-workflow.md) | 20 / 30 min |
| 9 | C Fine-tuning and using models | [Reading learning curves](../elements/learning-curves.md) | 15 / 20 min |
| 10 | C Fine-tuning and using models | [Text embeddings and semantic search](../elements/embeddings-and-search.md) | 15 / 25 min |
| 11 | C Fine-tuning and using models | [Choosing the next token - greedy, sampling, temperature, top-k, top-p, beams](../elements/decoding-strategies.md) | 20 / 25 min |
| 12 | C Fine-tuning and using models | [Running an LLM - prefill, decode and the KV cache](../elements/inference-performance.md) | 15 / 25 min |
| 13 | D Judging output | [Measuring generated text - perplexity, BLEU and ROUGE](../elements/generation-metrics.md) | 15 / 25 min |
| 14 | D Judging output | [Bias, hallucination and other limits](../elements/bias-and-limitations.md) | 15 / 20 min |
| 15 | E Modern LLM training | [Chat templates - how a conversation becomes text](../elements/chat-templates.md) | 15 / 20 min |
| 16 | E Modern LLM training | [Supervised fine-tuning of a language model](../elements/supervised-fine-tuning.md) | 15 / 25 min |
| 17 | E Modern LLM training | [LoRA - fine-tuning with small low-rank adapters](../elements/lora.md) | 15 / 25 min |
| 18 | E Modern LLM training | [Evaluating large language models](../elements/llm-evaluation.md) | 15 / 25 min |
| 19 | E Modern LLM training | [Learning from preferences - RLHF and DPO](../elements/preference-training.md) | 20 / 30 min |
| 20 | E Modern LLM training | [Training reasoning models - verifiable rewards and GRPO](../elements/reasoning-with-grpo.md) | 20 / 30 min |

# Tutor notes

- Phases A and B are the foundation. A learner who already uses a model library
  every day can go through them as a quick diagnosis: ask the check questions
  first and skip the elements whose objectives they already master.
- Phase C can be split: a learner who only wants to use models (search,
  generation) can take embeddings-and-search, decoding-strategies and
  inference-performance and skip fine-tuning-workflow and learning-curves.
- bias-and-limitations comes before phase E on purpose: the learner should
  know what models get wrong before learning how preference training tries
  to fix part of it. Return to it at the end and ask what changed.
- The elements describe tools and methods, not a fixed library version.
  If the learner works with a library, let them look up the current
  function names rather than memorising the ones in the examples.
