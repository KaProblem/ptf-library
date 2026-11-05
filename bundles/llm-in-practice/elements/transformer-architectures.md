---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/transformer-architectures
title: Encoders, decoders and encoder-decoders
description: The three transformer families differ in what each token may look at; that decides whether a model is built for understanding a text, for writing one, or for turning one text into another.
lang: en
levels: [highschool, college]
objectives:
  - id: what-tokens-see
    text: Say for encoder, decoder and encoder-decoder models which tokens each position may look at, and what follows for reading versus writing text.
  - id: task-fit
    text: Pick an architecture family for a given task and justify the choice.
  - id: family-members
    text: Name typical members of each family and explain why most current chat models are decoder-only.
tags: [llm, transformer, encoder, decoder, bert, gpt, t5]
about:
  - wikidata: Q85810444
    label: transformer
  - wikidata: Q61726893
    label: bidirectional encoder representations from transformers
requires:
  - ptf:el/llm-basics/self-attention
  - ptf:el/llm-basics/causal-mask
  - ptf:el/llm-in-practice/language-tasks
leads_to:
  - ptf:el/llm-in-practice/model-heads
duration_min: { highschool: 15, college: 25 }
simulators:
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: architectures
    levels: [highschool, college]
    role: explore
    use_when: the learner wants to see the three families side by side and which tokens each position sees
  - ref: ptf:sim/causal-mask@^1.1.0
    levels: [highschool, college]
    role: explore
    use_when: the learner has not seen a causal mask yet or has forgotten why a decoder may not look ahead
sources:
  - id: hf-llm-course-1-6
    resource: https://huggingface.co/learn/llm-course/chapter1/6
    title: "Hugging Face LLM Course, chapter 1, sections 4 to 6: transformer architectures"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T22:50:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Reading a whole sentence before judging it and writing a sentence word by word are different jobs. Transformers come in three families that are built for one or the other, or both.
- The only real difference between them is which other tokens each token is allowed to look at.
- Afterwards the learner can say which family suits a task (search, classification, translation, chat) and why nearly all chat assistants today use just one of them.

# Core

All three families stack the same attention blocks. An **encoder** lets every
token look at every other token, before and after it, so it builds the best
possible representation of a given text: good for understanding tasks. A
**decoder** lets each token look only at itself and the tokens before it, so
it can generate text one token at a time. An **encoder-decoder** first reads
the input with an encoder, then a decoder writes the output while looking at
its own earlier tokens and, through cross-attention, at the whole encoded
input: good for turning one text into another. Most current LLMs are
decoder-only, because generation covers almost every task and the design
scales simply.

# Key facts

- The original transformer (2017) was an encoder-decoder for machine translation.
- **Encoder-only** (bidirectional): BERT (2018), RoBERTa, DistilBERT, ModernBERT. Pretrained with masked language modelling. Used for classification, named-entity recognition, extractive question answering and text embeddings for search.
- **Decoder-only** (causal, autoregressive): GPT series, Llama, Mistral, Gemma, Qwen. Pretrained by next-token prediction. Used for text generation and, through prompting, almost any task.
- **Encoder-decoder** (sequence-to-sequence): original transformer, T5, BART, mBART, Whisper (speech → text). Used for translation, summarisation, speech recognition.
- Attention pattern for a sequence of n tokens: an encoder allows all n · n query-key pairs; a causal decoder allows n · (n + 1) / 2 (token i sees tokens 1 … i). For n = 6: 36 against 21.
- **Cross-attention**: in an encoder-decoder, the decoder's queries attend to keys and values computed from the encoder output, so every output token can consult the whole input.
- An encoder cannot generate text freely: it produces one vector per input token, not a next token.
- A decoder reads its prompt causally too: the representation of an early prompt token cannot use later prompt tokens.
- Why decoder-only dominates: one objective (next token) on any text, one model for every task via prompting, and simpler scaling and serving.

# Level: highschool

<!-- ptf:text v1 -->

Picture two jobs. In the first you get a finished letter and must say
whether it is a complaint. You read the whole letter, jump back and forth,
and only then decide. In the second you must write a letter yourself. You
write word by word, and when you write word five, words six to twenty do
not exist yet.

Transformers come in three families that match these jobs. An **encoder**
does the reading job: every word may look at every other word, before and
after it. "Bank" can look ahead to "river" and know it means the riverside.
That makes encoders great at understanding a given text: sorting it,
marking names in it, finding an answer in it, or turning it into numbers
for a search engine. BERT is the famous example.

A **decoder** does the writing job: each word may only look back at the
words before it. That is exactly what you need to write one word after
another, which is why all GPT models and nearly all chat assistants are
decoders.

An **encoder-decoder** combines both, like an interpreter: first listen to
the whole sentence (encoder), then speak the translation word by word
(decoder), glancing back at what was heard whenever needed. Translation,
summaries and turning speech into text work this way.

Why are chat assistants all decoders, then? Because writing is the most
general job. If a model can continue any text, you can ask it to sort,
translate or summarise just by how you start the text.

# Level: college

<!-- ptf:text v1 -->

Write down a 6 × 6 grid of query positions (rows) against key positions
(columns) and shade the cells a token may attend to. Fully shaded is an
encoder, the lower triangle including the diagonal is a decoder: 36
against 21 cells. That mask is the entire architectural difference between
the first two families; the blocks (attention, feed-forward, residuals,
layer norm) are the same.

**Encoders** compute contextual embeddings with bidirectional attention.
They are pretrained with masked language modelling (BERT, RoBERTa) or
replaced-token detection (ELECTRA) and fine-tuned with task heads:
sequence classification on a pooled vector, token classification on every
position, span extraction with start/end logits. They are also the
standard backbone for embedding models in retrieval. They do not define a
distribution p(x_{t+1} | x_{≤t}), so they are not generators.

**Decoders** use the causal mask and are trained on next-token prediction,
which factorises p(x) = ∏ p(x_t | x_{<t}) and makes sampling trivial. The
same mask applies to the prompt: prompt token 3 is encoded without seeing
token 7. In exchange, keys and values of earlier positions never change
during generation, which is what makes the KV cache possible.

**Encoder-decoders** (T5, BART, Whisper) encode the source bidirectionally
once, then a causal decoder generates the target; each decoder block has
an extra cross-attention sublayer whose queries come from the decoder and
whose keys and values come from the encoder output. This suits tasks with
a clear source and target (translation, summarisation, speech recognition)
and lets the encoder use full context on the source.

Decoder-only won for general-purpose LLMs because a single objective
applies to all text, any task can be cast as a prompt, and training and
serving pipelines are simpler; at large scale the bidirectional advantage
on the prompt matters little. Encoders remain the efficient choice for
classification and embeddings at high volume.

# Misconceptions

- **encoder-generates**: BERT-style encoders can write text like GPT → they output one vector per input token; without a decoder they cannot generate free text.
- **decoder-sees-future**: A decoder sees the whole prompt at once in both directions → each position, prompt tokens included, attends only to itself and earlier positions.
- **different-blocks**: The three families use completely different building blocks → they share the same blocks; the attention mask (and cross-attention in encoder-decoders) makes the difference.
- **decoder-only-cant-understand**: Decoder-only models cannot do understanding tasks → they do them by prompting; encoders are just more efficient for them.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "reading-writing", "level": "highschool", "purpose": "warmup",
  "question": "You write an essay word by word. When you write the fifth word, what can you look at?",
  "options": [
    { "text": "Only the four words you already wrote", "correct": true, "feedback": "Right. The later words do not exist yet. A decoder works under the same rule." },
    { "text": "The whole essay", "correct": false, "feedback": "The rest is not written yet." },
    { "text": "Nothing", "correct": false, "feedback": "You can reread what you already wrote." }
  ],
  "explanation": "Writing can only look back; reading a finished text can look everywhere. That is the difference between decoder and encoder."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "who-sees-what", "level": "highschool", "purpose": "check",
  "objectives": ["what-tokens-see"], "misconception": "decoder-sees-future",
  "question": "In the sentence \"I sat by the bank of the river\", which model lets \"bank\" look at \"river\"?",
  "options": [
    { "text": "An encoder", "correct": true, "feedback": "Right. In an encoder every word sees all words, also the later ones." },
    { "text": "A decoder", "correct": false, "feedback": "In a decoder \"bank\" only sees the words before it, and \"river\" comes after." },
    { "text": "Both", "correct": false, "feedback": "A decoder never looks ahead, not even inside the prompt." }
  ],
  "explanation": "Encoders look both ways, decoders only back."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "why-decoder-writes", "level": "highschool", "purpose": "check",
  "objectives": ["what-tokens-see"], "misconception": "encoder-generates",
  "question": "Why can a decoder write text, but an encoder like BERT cannot?",
  "options": [
    { "text": "The decoder is trained to guess the next word from the words before, which is exactly what writing needs", "correct": true, "feedback": "Yes. Guess, append, guess again." },
    { "text": "The decoder knows more words", "correct": false, "feedback": "Vocabulary size is not the difference." },
    { "text": "BERT is too small", "correct": false, "feedback": "Even a huge encoder only describes a given text; it does not continue it." }
  ],
  "explanation": "Generation needs a model of 'what comes next'. Encoders describe each word of a finished text instead."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "pick-family", "level": "highschool", "purpose": "check",
  "objectives": ["task-fit"], "misconception": "decoder-only-cant-understand",
  "question": "Which family fits translating a German manual into English best, if you train a model only for that?",
  "options": [
    { "text": "Encoder-decoder: read the whole German sentence, then write English word by word", "correct": true, "feedback": "Right. Like an interpreter: listen first, then speak." },
    { "text": "Encoder only", "correct": false, "feedback": "An encoder understands the German but cannot write the English." },
    { "text": "None; translation needs a dictionary, not a model", "correct": false, "feedback": "Word-by-word dictionaries give bad translations; models learn whole sentences." }
  ],
  "explanation": "A clear input text and a new output text is the classic encoder-decoder job. A large decoder-only chat model can also translate when prompted."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "name-members", "level": "highschool", "purpose": "check",
  "objectives": ["family-members"], "misconception": "decoder-only-cant-understand",
  "question": "Almost all chat assistants are decoders. Why does that one family cover so much?",
  "options": [
    { "text": "A model that can continue any text can be asked to sort, translate or summarise in the prompt", "correct": true, "feedback": "Right. Writing is the most general job." },
    { "text": "Decoders are the only family that understands language", "correct": false, "feedback": "Encoders understand text very well; they just cannot write." },
    { "text": "Encoders and encoder-decoders are no longer allowed", "correct": false, "feedback": "They are still widely used, for example BERT in search and Whisper for speech." }
  ],
  "explanation": "GPT, Llama and most chat models are decoder-only; BERT is the typical encoder; T5 and Whisper are encoder-decoders."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "allowed-pairs", "level": "college", "purpose": "check",
  "objectives": ["what-tokens-see"],
  "question": "A sequence has 8 tokens. How many (query, key) pairs may attend to each other in a causal decoder?",
  "answer": 36, "tolerance": 0, "unit": "pairs",
  "explanation": "Token i sees tokens 1 … i, so 1 + 2 + … + 8 = 8 · 9 / 2 = 36. An encoder allows all 64."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "cross-attention", "level": "college", "purpose": "check",
  "objectives": ["what-tokens-see"], "misconception": "different-blocks",
  "question": "In an encoder-decoder, where do the queries, keys and values of cross-attention come from?",
  "options": [
    { "text": "Queries from the decoder, keys and values from the encoder output", "correct": true, "feedback": "Right. Each output position asks the encoded input for what it needs." },
    { "text": "Queries from the encoder, keys and values from the decoder", "correct": false, "feedback": "Reversed: the decoder is the one asking." },
    { "text": "All three from the decoder, masked causally", "correct": false, "feedback": "That is the decoder's self-attention, the sublayer before cross-attention." }
  ],
  "explanation": "Self-attention (causal) over the output so far, then cross-attention into the full source, then feed-forward."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "choose-arch", "level": "college", "purpose": "check",
  "objectives": ["task-fit"], "misconception": "decoder-only-cant-understand",
  "question": "Which choices are well justified? (Several can be right.)",
  "options": [
    { "text": "Embedding 100 million documents for semantic search with a fine-tuned encoder", "correct": true, "feedback": "Right. Bidirectional context and one pass per document make encoders efficient embedders." },
    { "text": "A speech-to-text system as an encoder-decoder", "correct": true, "feedback": "Right. Clear source (audio) and target (text), like Whisper." },
    { "text": "An open-ended assistant as a decoder-only model", "correct": true, "feedback": "Right. Generation covers every task through the prompt." },
    { "text": "A story generator built on an encoder-only model with a classification head", "correct": false, "feedback": "An encoder plus classifier outputs labels, not continuations." }
  ],
  "explanation": "Match the attention pattern to the job: understand (encoder), map source to target (encoder-decoder), generate anything (decoder)."
}
```

```ptf-question
{
  "kind": "free_text", "id": "why-decoder-only", "level": "college", "purpose": "check",
  "objectives": ["family-members"], "misconception": "decoder-only-cant-understand",
  "question": "Name one model of each family and give two reasons why general-purpose LLMs converged on decoder-only designs.",
  "rubric": [
    "Encoder e.g. BERT/RoBERTa; decoder e.g. GPT/Llama; encoder-decoder e.g. T5/BART/Whisper.",
    "One objective (next token) applies to any raw text.",
    "Any task can be cast as a prompt, so one model serves all.",
    "Simpler training/serving (one stack, KV cache), and scaling works well."
  ],
  "sample_answer": "BERT is an encoder, Llama a decoder, T5 an encoder-decoder. Decoder-only models train on plain next-token prediction over any text, and every task can be posed as a prompt, so one model and one serving stack cover everything.",
  "explanation": "Generality and simplicity at scale beat the bidirectional advantage on the prompt."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "prompt-is-causal", "level": "college", "purpose": "transfer",
  "misconception": "decoder-sees-future",
  "question": "In a decoder-only model, the prompt is \"Is the following review positive? Review: …\". How is the first token of the prompt represented?",
  "options": [
    { "text": "Using only itself; later prompt tokens cannot influence it", "correct": true, "feedback": "Right. The causal mask applies to the prompt too. Later positions carry the information instead." },
    { "text": "Using the whole prompt, because the prompt is given in full", "correct": false, "feedback": "The mask does not distinguish prompt and output." },
    { "text": "Using the whole prompt and the future answer", "correct": false, "feedback": "The answer does not exist yet." }
  ],
  "explanation": "Causal masking is why prompt order matters: put the instruction before the material it refers to, or repeat it at the end."
}
```

# Examples

- **Reader, writer, interpreter**: an encoder reads a finished text, a decoder writes, an encoder-decoder interprets (listens fully, then speaks). Breaks down: a decoder also "reads" its prompt, just strictly left to right.
- **6 × 6 grid**: shading the allowed attention cells shows the whole difference between encoder (full grid) and decoder (lower triangle).

# Tutor notes

- If the learner took llm-basics, recall the causal mask in one sentence and build on it: the encoder is simply "no mask".
- Let the learner draw (or describe) the 6 × 6 grid before naming the families at college level.
- Keep the family names and model names as a table the learner can refer back to in the following steps.

# Further reading

- [Hugging Face LLM Course, chapter 1.6: Transformer architectures](https://huggingface.co/learn/llm-course/chapter1/6): encoder, decoder and sequence-to-sequence models with examples, and efficient attention variants (college, expert).

# Sources

Grounding: [^hf-llm-course-1-6]. Text, examples and questions are original.

[^hf-llm-course-1-6]: Hugging Face, LLM Course, chapter 1, sections 4 to 6 ("How do Transformers work?", "How 🤗 Transformers solve tasks", "Transformer Architectures"), https://huggingface.co/learn/llm-course, Apache License 2.0.
