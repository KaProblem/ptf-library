---
type: Bundle
okf_version: "0.2"
ptf_version: "0.1"
id: llm-in-practice
title: Working with large language models
description: Twenty learning elements on using and adapting large language models, from pipelines, tokenizers and fine-tuning to decoding, chat models, LoRA, evaluation, preference training and GRPO, with one learning path.
lang: en
license: CC-BY-SA-4.0
version: 0.1.0
tags: [machine-learning, large-language-models, nlp, transformers, fine-tuning]
generated: { by: claude/opus, at: 2026-11-06T03:00:00Z }
---

# Contents

A course on how today's language models are built, adapted, run and
judged. It follows on from the bundle `llm-basics` (how a GPT works inside)
and looks at the practical side: what a pretrained model is good for, how
text becomes tokens, how fine-tuning and LoRA adapt a model, how decoding
settings change the output, how a base model becomes a chat assistant and a
reasoning model, and how all of this is measured.

Scope and order follow the Hugging Face LLM Course (Apache License 2.0);
all text, questions, examples and figures in this bundle are original.
Each element lists the course chapter it draws on under `sources`.

The bundle teaches the concepts, not the tooling. Parts of that course that
are about using particular libraries and services (the model hub and model
cards, the Datasets library, debugging and asking for help, Gradio demos,
Argilla annotation) and the task-by-task fine-tuning recipes (token
classification, masked language modelling, translation, question answering)
are not covered as separate elements. Where the course and well-established
facts differ (for example how the KV cache grows with context, or the Llama 3
chat format), the elements follow the established facts.

## Elements

The course order is the learning path [Working with large language models](paths/llm-course.md).
Every number in Key facts and every computed answer is recomputed by the
matching script in `checks/` (`ptf-check` runs them). Existing simulators
(babbler-to-assistant, bigram-lab, causal-mask, next-char-basics,
training-loop, loss-lens) are reused only where they fit an objective; most
elements work with examples, figures and questions.

| Element | Phase | Questions |
| --- | --- | --- |
| [What language models can do](elements/language-tasks.md) | How models are built | 10 |
| [Pretraining and transfer learning](elements/pretraining-and-transfer.md) | How models are built | 11 |
| [Encoders, decoders and encoder-decoders](elements/transformer-architectures.md) | How models are built | 10 |
| [Behind the pipeline - base model and heads](elements/model-heads.md) | How models are built | 10 |
| [Subword tokenizers in practice](elements/subword-tokenization.md) | Text in, tensors out | 10 |
| [How tokenizers learn their pieces - BPE, WordPiece, Unigram](elements/tokenizer-algorithms.md) | Text in, tensors out | 11 |
| [Batches, padding and attention masks](elements/padding-and-masks.md) | Text in, tensors out | 11 |
| [Fine-tuning a pretrained model on your task](elements/fine-tuning-workflow.md) | Fine-tuning and using models | 11 |
| [Reading learning curves](elements/learning-curves.md) | Fine-tuning and using models | 10 |
| [Text embeddings and semantic search](elements/embeddings-and-search.md) | Fine-tuning and using models | 10 |
| [Choosing the next token - greedy, sampling, temperature, top-k, top-p, beams](elements/decoding-strategies.md) | Fine-tuning and using models | 11 |
| [Running an LLM - prefill, decode and the KV cache](elements/inference-performance.md) | Fine-tuning and using models | 10 |
| [Measuring generated text - perplexity, BLEU and ROUGE](elements/generation-metrics.md) | Judging output | 10 |
| [Bias, hallucination and other limits](elements/bias-and-limitations.md) | Judging output | 9 |
| [Chat templates - how a conversation becomes text](elements/chat-templates.md) | Modern LLM training | 10 |
| [Supervised fine-tuning of a language model](elements/supervised-fine-tuning.md) | Modern LLM training | 10 |
| [LoRA - fine-tuning with small low-rank adapters](elements/lora.md) | Modern LLM training | 9 |
| [Evaluating large language models](elements/llm-evaluation.md) | Modern LLM training | 10 |
| [Learning from preferences - RLHF and DPO](elements/preference-training.md) | Modern LLM training | 10 |
| [Training reasoning models - verifiable rewards and GRPO](elements/reasoning-with-grpo.md) | Modern LLM training | 10 |

203 questions in total, at the levels highschool and college.

## Figures

| Figure | Used in |
| --- | --- |
| [Encoder and decoder attention](figures/attention-patterns.svg) | transformer-architectures |
| [Top-k and top-p](figures/top-k-top-p.svg) | decoding-strategies |
| [LoRA update](figures/lora-update.svg) | lora |
