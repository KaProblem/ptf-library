---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/language-models
title: Language models and LLMs
description: A language model gives probabilities for the next token from its context; N-grams and recurrent networks see little context, Transformers with self-attention see a lot, and fine-tuning, distillation and prompting adapt a large model to a task.
lang: en
levels: [highschool, college]
objectives:
  - id: predict-tokens
    text: Explain what a language model estimates, what tokens are, and estimate how many tokens a text has.
  - id: context
    text: Explain why more context gives better predictions, how N-gram models and recurrent networks use context, and why long N-grams run into sparsity.
  - id: transformers
    text: Describe how a large language model is built (Transformer, self-attention, training by predicting hidden tokens) and name its main problems.
  - id: adapt
    text: Choose between fine-tuning, parameter-efficient tuning, distillation, prompt engineering and offline inference to turn a foundation model into an application.
tags: [machine-learning, language-model, llm, tokens, transformer, self-attention, fine-tuning, distillation, prompt-engineering]
about:
  - wikidata: Q3621696
    label: language model
  - wikidata: Q115305900
    label: large language model
  - wikidata: Q85810444
    label: transformer
requires:
  - ptf:el/ml-foundations/embeddings
leads_to:
  - ptf:el/ml-foundations/production-ml
duration_min: { highschool: 35, college: 45 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Intro to Large Language Models"
generated: { by: claude/opus, at: 2026-11-06T09:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: finish the sentence "After the long hike we were hungry, so we ordered a ___". You probably thought of "pizza" or "meal", not "bicycle". You just did what a language model does: you weighed possible next words by how well they fit what came before.
- A language model turns that guessing into numbers: a probability for every possible next piece of text. Chatbots, translators, autocomplete and summarizers are all built on it. This step shows how such models went from counting word pairs to large language models (LLMs), and how a big general model is turned into a useful, affordable application.
- Afterwards the learner can say what a language model predicts and from what, why Transformers beat older models, what can go wrong with LLMs, and which adaptation method fits a given product.

# Core

A language model estimates the probability of a token, or a sequence of
tokens, given the tokens around it. Tokens are the units the model works
with: whole words, pieces of words or single characters; most modern
models use word pieces, and in English one token is about four
characters. The more context a model uses, the better it predicts. An
N-gram model looks only at the previous N − 1 tokens and counts how often
each continuation followed them; longer N-grams carry more context but
most long sequences never occur in the training text (sparsity). Recurrent
neural networks read a sequence token by token and carry a memory, which
gives more context, but the memory fades over long texts. Large language
models use the Transformer architecture: self-attention lets every token
weigh every other token in its context at once, and billions of
parameters store what was learned. An LLM is trained by hiding tokens in
huge amounts of text and predicting them, so the labels come from the
text itself. LLMs can sound confident while being wrong (hallucination),
are expensive to train and run, and repeat biases of their training data.
A general foundation model is adapted to a task by fine-tuning (more
training on task examples, all or only a few parameters), made cheaper by
distillation (a smaller student model learns from it), steered without
training by prompt engineering (instructions and examples in the prompt),
or run ahead of time (offline inference) when answers need not be
instant.

# Key facts

- A language model gives a probability distribution over the next token; generating text means picking a token, appending it and repeating.
- English: 1 token ≈ 4 characters ≈ ¾ of a word, so 400 tokens ≈ 300 words and 1,200 words ≈ 1,600 tokens. Other languages often need more tokens per word.
- N-gram estimate: if "the cat" was followed by "sat" 6 times, "ran" 3 times and "slept" once, P(sat | the cat) = 6/10 = 0.6.
- Sparsity: with a vocabulary of 50,000 words there are 50,000³ = 1.25 · 10¹⁴ possible 3-grams, far more than any training text contains, so most never get a count.
- Self-attention compares every token with every token in the context: 1,000 tokens → 1,000,000 pairs; 4,000 tokens → 16,000,000 pairs (4 × longer, 16 × more work).
- Encoder: turns input text into a representation (embeddings); decoder: generates text from it. Translation uses both; chat models are usually decoder-only.
- Training data for LLMs needs no hand labels: the hidden tokens of the text are the labels (self-supervised).
- Main problems: hallucination (fluent but false text), high compute and energy cost, bias from the training data.
- Fine-tuning keeps the model's size (a fine-tuned 10-billion-parameter model still has 10 billion parameters). Parameter-efficient tuning trains only a small add-on; for one 4,096 × 4,096 weight matrix a rank-8 add-on has 2 · 4,096 · 8 = 65,536 parameters instead of 16,777,216 (0.39 %).
- Distillation: a student with 1 billion parameters needs about 2 GB at 2 bytes per parameter, the 10-billion teacher about 20 GB; the student is faster and cheaper but usually a little worse.
- Prompt engineering changes no parameters: zero-shot (instruction only), one-shot (one example), few-shot (several examples in the prompt).
- Offline inference: compute and store answers in advance (for example summaries of all product reviews each night) when they do not need to be live; it allows a bigger model at lower cost.

# Level: highschool

<!-- ptf:text v1 -->

Your phone's keyboard suggests the next word. To do that it needs a
**language model**: something that, given the text so far, gives every
possible next piece of text a probability. Those pieces are called
**tokens**. A token can be a whole word ("cat"), a part of a word ("un",
"watch", "ed") or a single character. In English, a token is about four
letters, so a 300-word essay is roughly 400 tokens.

The simplest language model just counts. Suppose that in a big pile of
text the words "the cat" were followed 6 times by "sat", 3 times by "ran"
and once by "slept". Then the model says: after "the cat", "sat" has
probability 6/10 = 0.6. Such a model looks at the last few words only;
looking at 2 words before the next one is a 3-gram (three words in a
row). Why not look back 20 words? Because almost every 20-word sequence
is new: the model would never have counted it. Even with just three
words and a vocabulary of 50,000, there are 125 trillion possible
combinations.

But context matters a lot: in "I went to the bank to fish", "bank" means
a river bank, which you only know from "fish" further away. **Large
language models** (LLMs) solve this with a design called the
**Transformer**. Its key idea, **self-attention**, lets each word look at
every other word in the text and decide which ones matter for it, so
"bank" can pay attention to "fish". LLMs have billions of numbers
(parameters) and learn from huge amounts of text by a simple game: hide
a word, predict it, compare, adjust. No one has to label anything; the
text itself is the answer key.

LLMs write fluent text, but they can state false things with complete
confidence (**hallucination**), cost a lot of computing power, and copy
the biases of the text they learned from.

A big general model (a **foundation model**) is turned into a product in
a few ways. **Fine-tuning** trains it a bit more on examples of the
task, such as customer emails and their correct categories. **Distillation**
trains a much smaller model to imitate the big one, so it runs faster on
cheaper hardware. **Prompt engineering** changes nothing in the model:
you write better instructions or put a few examples into the prompt.

# Level: college

<!-- ptf:text v1 -->

A language model defines P(tₖ | context) over a vocabulary of tokens and,
by the chain rule, a probability for whole sequences: P(t₁ … tₙ) =
Πₖ P(tₖ | t₁ … tₖ₋₁). Subword tokenizers (BPE, WordPiece, SentencePiece)
balance vocabulary size against sequence length; in English one token is
about 4 characters, so 1,200 words ≈ 1,600 tokens.

An N-gram model makes the Markov assumption that only the previous N − 1
tokens matter and estimates P from counts, P(sat | the cat) =
c(the cat sat) / c(the cat) = 6/10. Raising N adds context but the number
of possible N-grams grows as |V|^N (50,000³ = 1.25 · 10¹⁴ for trigrams),
so most counts are zero; smoothing only patches this. Recurrent networks
replace counts with a learned hidden state updated token by token, which
in principle carries unlimited context but in practice loses it over long
distances (vanishing gradients) and cannot be parallelized over the
sequence during training.

The Transformer drops recurrence. Each layer applies self-attention: every
position computes query, key and value vectors, weights all positions by
softmax(q · k / √d) and mixes their values, so each token's
representation depends on the whole context at once; feed-forward layers
follow. Cost and memory of attention grow with n² in the context length
(4 × the tokens, 16 × the pairs). Encoders map input to contextual
embeddings, decoders generate token by token with a causal mask; encoder–
decoder models suit translation, decoder-only models generation and
chat, encoder-only models embeddings and classification. Training is
self-supervised: predict masked tokens (encoders) or the next token
(decoders) with cross-entropy over the vocabulary, on hundreds of
billions of tokens.

Known problems: hallucination (the objective rewards plausible text, not
true text), compute and energy cost in training and serving, and social
bias inherited from the corpus. Adapting a foundation model: full
fine-tuning updates every parameter on task data and keeps the model
size; parameter-efficient methods train small add-ons, such as a low-rank
update B·A with B ∈ ℝ^(4096×8), A ∈ ℝ^(8×4096) (65,536 parameters instead of
16.8 million per matrix); distillation trains a student on the teacher's
output distributions (soft labels), trading a little quality for 10 × less
memory and latency; prompt engineering (zero-, one-, few-shot, step-by-step
instructions) changes no weights; offline inference precomputes and
caches results when latency does not matter. Which to use depends on
quality needs, data available, latency and cost.

# Misconceptions

- **llm-looks-up-facts**: An LLM looks answers up in a database → it generates the most plausible continuation from learned parameters, which is why it can be confidently wrong.
- **token-is-word**: A token is always one word → tokens are often word pieces or characters; English averages about 4 characters per token.
- **longer-ngram-always-better**: Longer N-grams are always better because they see more context → most long sequences never occur in training, so their counts are zero (sparsity).
- **llm-needs-labels**: Training an LLM needs millions of hand-labelled examples → pre-training uses the text itself as labels (self-supervised); labelled data is needed only for fine-tuning.
- **fine-tuning-shrinks**: Fine-tuning makes a model smaller and cheaper → it keeps the size; distillation makes it smaller.
- **prompting-retrains**: Few-shot prompting teaches the model permanently → the examples only influence the current answer; no parameter changes.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "next-word-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "objectives": ["predict-tokens"],
  "question": "\"After the long hike we were hungry, so we ordered a ___.\" What does a language model produce for the gap?",
  "options": [
    { "text": "A probability for every possible next token, with words like 'pizza' high and 'bicycle' very low", "correct": true, "feedback": "Yes: a distribution over all candidates; then one is picked." },
    { "text": "The one correct word, looked up in a database of sentences", "correct": false, "feedback": "There is no stored answer; the model scores all candidates." },
    { "text": "A random word from the dictionary", "correct": false, "feedback": "The probabilities depend strongly on the context." }
  ],
  "explanation": "A language model scores every possible next token given the context."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "token-count",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["predict-tokens"],
  "misconception": "token-is-word",
  "question": "An English essay has 1,200 words. Using the rule of thumb that one token is about ¾ of a word, about how many tokens is it?",
  "answer": 1600,
  "tolerance": 50,
  "explanation": "1,200 / 0.75 = 1,600 tokens. A token is often a word piece, not a whole word."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "ngram-probability",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["context"],
  "question": "In a training text, 'the cat' was followed by 'sat' 6 times, 'ran' 3 times and 'slept' once. What probability does a 3-gram model give to 'ran' after 'the cat'?",
  "answer": 0.3,
  "tolerance": 0,
  "explanation": "3 of the 10 continuations were 'ran': 3/10 = 0.3."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "sparsity-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["context"],
  "misconception": "longer-ngram-always-better",
  "question": "Why not simply count 20-word sequences to get lots of context?",
  "options": [
    { "text": "Almost every 20-word sequence is new, so the model would have no count for it", "correct": true, "feedback": "Yes: the possible sequences vastly outnumber the ones in any text." },
    { "text": "Computers cannot store 20 words", "correct": false, "feedback": "Storage is not the problem; missing counts are." },
    { "text": "It would work perfectly, it is just slow", "correct": false, "feedback": "It fails because almost all counts are zero." }
  ],
  "explanation": "Long N-grams suffer from sparsity; LLMs use context without needing exact repeats."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "attention-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["transformers"],
  "question": "In \"I went to the bank to fish\", how does a Transformer figure out that 'bank' means a river bank?",
  "options": [
    { "text": "Self-attention lets 'bank' weigh every other word, and 'fish' gets a high weight", "correct": true, "feedback": "Yes: every token can look at the whole context at once." },
    { "text": "It only looks at the word right before 'bank'", "correct": false, "feedback": "That is what a short N-gram does; 'the' does not help here." },
    { "text": "It looks the sentence up in its training data", "correct": false, "feedback": "It does not store sentences to look up; it computes from learned parameters." }
  ],
  "explanation": "Self-attention connects each token with the tokens that matter for it, near or far."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "llm-problems-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["transformers"],
  "misconception": "llm-looks-up-facts",
  "question": "A chatbot names a book that does not exist, with author and year, in perfect sentences. Which two statements explain this?",
  "options": [
    { "text": "The model generates plausible text; it does not check facts against a source", "correct": true, "feedback": "Yes: this is called hallucination." },
    { "text": "Fluent, confident text is no evidence that it is true", "correct": true, "feedback": "Yes: style and truth are separate." },
    { "text": "Someone must have put the false book into its database", "correct": false, "feedback": "There is no database of answers; the text is generated." },
    { "text": "This only happens with very small models", "correct": false, "feedback": "Large models hallucinate too." }
  ],
  "explanation": "LLMs predict plausible tokens; truth has to be checked separately."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "adapt-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["adapt"],
  "misconception": "fine-tuning-shrinks",
  "question": "A school wants an app that sorts student questions into 'math', 'language' and 'other' on cheap phones without internet. They have a big general model and 2,000 labelled questions. Which plan fits best?",
  "options": [
    { "text": "Fine-tune the big model on the 2,000 questions, then distill it into a small model that runs on the phone", "correct": true, "feedback": "Yes: fine-tuning teaches the task, distillation makes it small." },
    { "text": "Fine-tune only; that also makes the model small enough", "correct": false, "feedback": "Fine-tuning keeps the size of the big model." },
    { "text": "Write a good prompt; then the big model fits on the phone", "correct": false, "feedback": "Prompting changes no parameters and no size." }
  ],
  "explanation": "Fine-tuning → better at the task; distillation → smaller and faster; prompting → no training, same model."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lm-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["predict-tokens", "transformers", "adapt"],
  "misconception": "llm-needs-labels",
  "question": "Which statement about how a large language model learns is correct?",
  "options": [
    { "text": "It hides words in huge amounts of text and learns to predict them, so the text itself provides the answers", "correct": true, "feedback": "Yes: self-supervised training." },
    { "text": "People label millions of sentences as right or wrong for it", "correct": false, "feedback": "Pre-training needs no hand labels; labels matter later for fine-tuning." },
    { "text": "It memorizes a list of questions and answers", "correct": false, "feedback": "It learns patterns in its parameters, not a list." }
  ],
  "explanation": "Pre-training: predict hidden tokens of real text; no manual labelling."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "chain-rule-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["predict-tokens"],
  "question": "A model gives P(the) = 0.05, P(cat | the) = 0.01 and P(sat | the cat) = 0.6. What probability does it give to the sequence 'the cat sat'?",
  "answer": 0.0003,
  "tolerance": 0,
  "explanation": "Chain rule: 0.05 · 0.01 · 0.6 = 0.0003. Generation samples one token at a time from these conditional distributions."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "attention-cost-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["transformers"],
  "title": "Attention cost and context length",
  "intro": "Self-attention scores every pair of positions in the context.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Pairs at 1,000 tokens", "1,000²", "1000000"],
    ["Pairs at 4,000 tokens", "4,000²", "16000000"],
    ["Factor", "16,000,000 / 1,000,000", "16"]
  ],
  "result": { "label": "Factor", "value": "16" },
  "explanation": "Attention is quadratic in context length: 4 × the tokens, 16 × the score computations and memory."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "peft-share-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["adapt"],
  "question": "A low-rank update of rank 8 for one 4,096 × 4,096 weight matrix trains B (4,096 × 8) and A (8 × 4,096). What percentage of that matrix's parameters is trained? (two decimals)",
  "answer": 0.39,
  "tolerance": 0.01,
  "explanation": "2 · 4,096 · 8 = 65,536; 4,096² = 16,777,216; 65,536 / 16,777,216 ≈ 0.39 %."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "architecture-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["context", "transformers"],
  "question": "Which two statements about N-gram models, RNNs and Transformers are correct?",
  "options": [
    { "text": "With |V| = 50,000 there are 1.25 · 10¹⁴ possible trigrams, so most trigram counts are zero", "correct": true, "feedback": "50,000³ = 1.25 · 10¹⁴." },
    { "text": "A Transformer decoder can be trained on all positions of a sequence in parallel thanks to the causal mask", "correct": true, "feedback": "Unlike an RNN, it need not process tokens one after another during training." },
    { "text": "An RNN's hidden state keeps information from 1,000 tokens back as well as from the previous token", "correct": false, "feedback": "In practice information fades over long distances (vanishing gradients)." },
    { "text": "Self-attention cost grows linearly with context length", "correct": false, "feedback": "It grows quadratically: every pair of positions." }
  ],
  "explanation": "N-grams: sparse counts; RNNs: sequential, fading memory; Transformers: parallel, quadratic attention."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "adapt-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["adapt"],
  "misconception": "prompting-retrains",
  "question": "Which two statements about adapting a 10-billion-parameter foundation model are correct?",
  "options": [
    { "text": "A distilled 1-billion-parameter student needs about 2 GB at 2 bytes per parameter, the teacher about 20 GB", "correct": true, "feedback": "10⁹ · 2 B = 2 GB; 10¹⁰ · 2 B = 20 GB." },
    { "text": "Offline inference fits a nightly summary of all new product reviews", "correct": true, "feedback": "Results are not needed instantly, so they can be precomputed with a large model." },
    { "text": "Few-shot examples in the prompt permanently change the weights", "correct": false, "feedback": "They condition one forward pass; nothing is stored." },
    { "text": "Full fine-tuning reduces the number of parameters to those relevant for the task", "correct": false, "feedback": "The fine-tuned model has the same size." }
  ],
  "explanation": "Distillation shrinks, fine-tuning specializes, prompting steers without training, offline inference trades latency for cost."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "support-bot-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["transformers", "adapt"],
  "question": "A bank wants an assistant that answers customer questions about its own fees and products in a chat window. It has a general LLM, 5,000 past chats with correct answers, and strict rules about wrong statements. Propose how to build it, which adaptation methods you would use and why, and how you would deal with hallucination.",
  "rubric": [
    "Starts with prompt engineering (instructions, few-shot examples) as a cheap baseline, evaluated on held-out chats",
    "Fine-tuning (possibly parameter-efficient) on the 5,000 chats if the baseline is not good enough",
    "Considers latency and cost: distillation or a smaller model for live chat",
    "Addresses hallucination: give the model the current fee documents in the prompt and check answers against them, refuse or hand over to a human when unsure, monitor and review samples"
  ],
  "sample_answer": "First a prompted baseline: clear instructions, the bank's tone, a few example chats, tested on 500 held-out chats. If it misses too much, parameter-efficient fine-tuning on the remaining chats. For live chat latency I would distill the result into a smaller model if quality holds. Against hallucination the prompt always includes the current fee and product documents, the assistant must cite them, answers without support are replaced by a hand-over to staff, and a sample of chats is reviewed every week.",
  "explanation": "Combine cheap steering, task training, size reduction and grounding plus monitoring."
}
```

# Tutor notes

- Start with the hike sentence; let the learner name candidates and rough probabilities before any terms.
- Keep this step conceptual. For a hands-on build of a small GPT (tokenizer, bigram model, attention), point to the follow-up course `llm-basics` (path `gpt-from-scratch`).
- Connect back: tokens are embedded as in the embeddings step, and the next-token distribution is a softmax as in multi-class classification.
- Hallucination deserves a concrete example the learner checks themselves; it is the most important practical lesson of the step.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Intro to Large Language Models", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
