---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/subword-tokenization
title: Subword tokenizers in practice
description: Why real models cut text into word pieces instead of words or letters, what a tokenizer adds (special tokens, IDs), why it must match its model, and what token counts mean for cost and context.
lang: en
levels: [highschool, college]
objectives:
  - id: compare-approaches
    text: Compare word, character and subword tokenization by vocabulary size, sequence length and how they handle unknown words.
  - id: encode-decode
    text: Follow a text through a real tokenizer (tokens, IDs, special tokens, decoding) and explain why the tokenizer must belong to the checkpoint.
  - id: token-counts
    text: Estimate how many tokens a text has and explain what that means for cost, context length and other languages.
tags: [llm, tokenizer, subword, wordpiece, bpe, special-tokens]
about:
  - wikidata: Q2438971
    label: tokenization
requires:
  - ptf:el/llm-basics/tokenizer
  - ptf:el/llm-in-practice/model-heads
leads_to:
  - ptf:el/llm-in-practice/tokenizer-algorithms
  - ptf:el/llm-in-practice/padding-and-masks
duration_min: { highschool: 15, college: 20 }
simulators:
  - ref: ptf:sim/next-char-basics@^1.0.0
    station: tokenizer
    levels: [highschool, college]
    role: explore
    use_when: the learner has never seen a character-level tokenizer and should first watch their own text become numbers
sources:
  - id: hf-llm-course-2-4
    resource: https://huggingface.co/learn/llm-course/chapter2/4
    title: "Hugging Face LLM Course, chapter 2, section 4: Tokenizers"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T23:10:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Chat services bill by the token and models have a limit of tokens they can read. So what exactly is a token, and how many does your text have?
- This step compares the three ways to cut text (words, characters, word pieces), shows why every modern model uses word pieces, and follows a sentence through a real tokenizer.
- Afterwards the learner can estimate the token count of a text, explain why German or code costs more tokens than English, and avoid the classic bug of pairing a model with the wrong tokenizer.

# Core

A tokenizer splits text into tokens from a fixed vocabulary and maps them to
IDs. Whole words need a huge vocabulary and still miss new words; single
characters need almost no vocabulary but make sequences long and each token
meaningless. Subword tokenizers keep frequent words whole and split rare
words into frequent pieces, which gives a vocabulary of tens of thousands
and no unknown words. The tokenizer also adds special tokens the model was
trained with. A model only understands the IDs of the tokenizer it was
trained with, so tokenizer and checkpoint always travel together.

# Key facts

- **Word-level**: one token per word. English has hundreds of thousands of word forms; any word outside the vocabulary becomes an unknown token (`[UNK]`), and "dog" and "dogs" are unrelated IDs.
- **Character-level**: a vocabulary of a few hundred symbols at most, no unknowns, but sequences about 4 to 5 times longer than with subwords, and one character carries little meaning.
- **Subword-level**: frequent words stay whole, rare words split into pieces: BERT turns "tokenization" into `token` + `##ization` (`##` marks a piece that continues a word). Vocabulary sizes: BERT 30,522; GPT-2 50,257; Llama 3 128,256.
- Byte-level tokenizers (GPT-2 and most current LLMs) start from the 256 possible bytes, so any text, emoji or code can be encoded without unknown tokens.
- **Special tokens** are added by the tokenizer: BERT `[CLS]` at the start, `[SEP]` between and after segments, `[PAD]` for padding, `[MASK]` for masked language modelling; GPT-2 `<|endoftext|>`. They have their own IDs.
- Encoding: text → tokens → IDs (+ special tokens, attention mask). Decoding: IDs → text, optionally skipping special tokens.
- Rule of thumb for English with GPT-style tokenizers: 1 token ≈ 4 characters ≈ 0.75 words, so 1,000 words ≈ 1,300 tokens. Other languages, code and numbers usually need more tokens per word, so the same content costs more and fits less into the context window.
- Numbers are split into pieces that depend on the tokenizer (for example "2026" may be one token or two), one reason why models are clumsy at digit arithmetic and letter counting.
- A tokenizer is saved with its checkpoint (vocabulary, merge rules, special tokens, normalisation). Using another model's tokenizer produces IDs that mean something else to the model: silent garbage, not an error.

# Level: highschool

<!-- ptf:text v1 -->

Try three ways to cut "Unbelievably, the snowboarders won!" into pieces.

**Whole words**: Unbelievably | , | the | snowboarders | won | !. Easy to
read, but the model would need a list of every word that exists, in every
form: win, wins, won, winning… That list never ends, and any word that is
missing, a new name or a typo, becomes a useless "unknown".

**Single letters**: U | n | b | e | l | … That list is tiny and nothing
is ever unknown. But the sentence becomes 35 tokens long, the model has
to rebuild every word from letters, and one letter on its own means
almost nothing.

**Word pieces**, the way real models do it: common words like "the" and
"won" stay whole, rare words are split into common parts, for example
un | believ | ably and snow | board | ers. The list stays manageable (about 30,000 to
130,000 pieces), sentences stay short, and even a word the model has
never seen can be built from pieces.

A real tokenizer also adds **special tokens**: markers like "text starts
here", "text ends here" or "this is just filler". Then every piece is
replaced by its number in the list. The list belongs to the model like a
dictionary belongs to a code: if you use another model's list, the numbers
mean different pieces, and the model reads nonsense without noticing.

Why should you care? Chat services charge per token and models can only
read a limited number of them. In English one token is about four letters,
roughly three quarters of a word. German words are often longer and get
split more, so the same text in German usually costs more tokens.

# Level: college

<!-- ptf:text v1 -->

Load two tokenizers and encode the same German sentence with both; count
the tokens and decode each ID individually. The differences you see are
the design space.

Word-level tokenization has an open vocabulary problem: V grows with the
corpus (Heaps' law), embedding and LM-head matrices grow as V × d, and out
of vocabulary words collapse to `[UNK]`. Morphological variants share no
parameters. Character-level tokenization solves coverage but multiplies
sequence length by roughly 4 to 5, and attention cost grows with the
square of length.

Subword tokenization (BPE, WordPiece, Unigram; algorithms in the next
step) learns a vocabulary of typically 30k to 130k units from a corpus so
that frequent strings are single tokens and rare strings decompose.
Byte-level BPE uses the 256 bytes as base alphabet, which guarantees
lossless encoding of any input.

A `tokenizer(text)` call does more than split: normalisation (for example
lowercasing for uncased BERT), pre-tokenisation (whitespace and
punctuation rules), the subword model, then post-processing that inserts
special tokens (`[CLS] … [SEP]`) and returns `input_ids` and
`attention_mask` (plus `token_type_ids` for sentence pairs in BERT).
`decode` reverses the mapping; `skip_special_tokens=True` drops markers.

Practical consequences:

- **Coupling**: the ID → string mapping is part of the checkpoint. A
  mismatched tokenizer gives in-range IDs with the wrong meaning, so no
  exception is raised.
- **Budgets**: pricing and context limits are in tokens. For English
  ≈ 1.3 tokens per word; for German, code or non-Latin scripts often
  noticeably more, depending on how much of such text the tokenizer was
  trained on.
- **Artefacts**: numbers and rare words split irregularly, and leading
  spaces are part of tokens in byte-level BPE (" the" ≠ "the"), which
  matters when you build prompts or compare token IDs.

# Misconceptions

- **one-token-one-word**: A token is a word, so 1,000 words are 1,000 tokens → tokens are often word pieces; English averages about 1.3 tokens per word, other languages more.
- **unknown-words-break**: A word the model never saw cannot be processed → subword and byte-level tokenizers build any word from known pieces.
- **any-tokenizer-works**: Any tokenizer can be used with any model → the IDs only make sense for the tokenizer the checkpoint was trained with; a mismatch silently produces garbage.
- **bigger-vocab-free**: A larger vocabulary is always better → it shortens sequences but enlarges the embedding and output layers and gives rare tokens few training examples.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "three-ways", "level": "highschool", "purpose": "check",
  "objectives": ["compare-approaches"], "misconception": "unknown-words-break",
  "question": "Why do real language models cut text into word pieces instead of whole words?",
  "options": [
    { "text": "Any word, even a new one, can be built from known pieces, and the list of pieces stays manageable", "correct": true, "feedback": "Right. Common words stay whole, rare ones are split." },
    { "text": "Word pieces make sentences as short as possible", "correct": false, "feedback": "Whole words would give even shorter sentences; pieces are the compromise." },
    { "text": "Letters are not allowed in computers", "correct": false, "feedback": "Letters are fine; they just make sequences very long." }
  ],
  "explanation": "Word pieces sit between words (huge list, unknown words) and letters (long sequences, little meaning)."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "letters-cost", "level": "highschool", "purpose": "check",
  "objectives": ["compare-approaches"], "misconception": "bigger-vocab-free",
  "question": "What is the main drawback of cutting text into single letters?",
  "options": [
    { "text": "Texts become many tokens long and single letters carry little meaning", "correct": true, "feedback": "Right. The model has to rebuild every word from letters." },
    { "text": "Some letters would be unknown", "correct": false, "feedback": "Letters almost never are; that is their advantage." },
    { "text": "The list of tokens becomes too big", "correct": false, "feedback": "The list is tiny with letters; the texts become long." }
  ],
  "explanation": "Small vocabulary, long sequences: the opposite trade-off to whole words."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "wrong-dictionary", "level": "highschool", "purpose": "check",
  "objectives": ["encode-decode"], "misconception": "any-tokenizer-works",
  "question": "Someone uses the tokenizer of model A to feed text into model B. What happens?",
  "options": [
    { "text": "Model B gets numbers that mean different pieces to it and reads nonsense, usually without any error message", "correct": true, "feedback": "Right. Each model's numbers only fit its own list of pieces." },
    { "text": "Nothing; numbers are numbers", "correct": false, "feedback": "Number 500 might be \"cat\" in one list and \"ing\" in another." },
    { "text": "The program refuses to start", "correct": false, "feedback": "Usually it runs and just gives bad answers, which makes the bug hard to find." }
  ],
  "explanation": "Tokenizer and model belong together, like a code and its codebook."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "special-tokens", "level": "highschool", "purpose": "check",
  "objectives": ["encode-decode"],
  "question": "A tokenizer turns \"Hi there\" into 4 numbers, although the text has only 2 words. What is the most likely reason?",
  "options": [
    { "text": "It added special markers for the start and the end of the text", "correct": true, "feedback": "Right. For BERT these are [CLS] and [SEP]." },
    { "text": "It made a mistake", "correct": false, "feedback": "Adding markers is intended; the model was trained with them." },
    { "text": "Every word always becomes two tokens", "correct": false, "feedback": "Common words are usually one token." }
  ],
  "explanation": "Special tokens mark the start, the end, padding or masked positions. They have their own numbers."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "tokens-for-essay", "level": "highschool", "purpose": "check",
  "objectives": ["token-counts"], "misconception": "one-token-one-word",
  "question": "In English, one token is about three quarters of a word. About how many tokens does a 3,000-word English essay have?",
  "answer": 4000, "tolerance": 500, "unit": "tokens",
  "explanation": "3,000 / 0.75 = 4,000 tokens. A German essay of the same length would usually need more."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "german-costs", "level": "highschool", "purpose": "transfer",
  "misconception": "one-token-one-word",
  "question": "The same text costs more tokens in German than in English. Why?",
  "options": [
    { "text": "The tokenizer learned its pieces mostly from English text, so long German words are split into more pieces", "correct": true, "feedback": "Right. What was frequent in training becomes a single token." },
    { "text": "German has more letters in its alphabet", "correct": false, "feedback": "A few umlauts do not explain it; word splitting does." },
    { "text": "Tokens are counted per syllable", "correct": false, "feedback": "Tokens follow the learned pieces, not syllables." }
  ],
  "explanation": "Token counts depend on how well the tokenizer's vocabulary fits the text."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "vocab-trade-off", "level": "college", "purpose": "check",
  "objectives": ["compare-approaches"], "misconception": "bigger-vocab-free",
  "question": "A team doubles the vocabulary from 64k to 128k tokens (hidden size 4,096). Which effects are expected? (Several can be right.)",
  "options": [
    { "text": "Sequences get somewhat shorter, so more text fits into the context window", "correct": true, "feedback": "Right. More frequent strings become single tokens." },
    { "text": "The embedding matrix grows by 64k · 4,096 ≈ 268 million parameters (and the LM head as much again if untied)", "correct": true, "feedback": "Right. Both scale with V × d." },
    { "text": "Rare new tokens get fewer training examples each", "correct": true, "feedback": "Right. The data is spread over more tokens." },
    { "text": "Unknown tokens disappear for the first time", "correct": false, "feedback": "A byte-level vocabulary already has no unknowns at 64k." }
  ],
  "explanation": "Vocabulary size trades sequence length against parameters and per-token data."
}
```

```ptf-question
{
  "kind": "free_text", "id": "pipeline-of-tokenizer", "level": "college", "purpose": "check",
  "objectives": ["encode-decode"], "misconception": "any-tokenizer-works",
  "question": "List the stages a call tokenizer(\"Hello world!\") goes through for an uncased BERT tokenizer and what it returns. Then explain why loading the tokenizer of another checkpoint raises no error but breaks the model.",
  "rubric": [
    "Normalisation (lowercase), pre-tokenisation (split on whitespace and punctuation), subword model (WordPiece), post-processing ([CLS] … [SEP]).",
    "Returns input_ids, attention_mask (and token_type_ids for BERT).",
    "Another tokenizer produces valid-looking IDs that map to different strings in this model's embedding table, so the input is silently wrong."
  ],
  "sample_answer": "It lowercases, splits into 'hello', 'world', '!', looks each up in the WordPiece vocabulary and adds [CLS] and [SEP], returning input_ids, token_type_ids and attention_mask. Another tokenizer's IDs are still integers within range, so the model runs, but each ID selects the embedding of an unrelated token.",
  "explanation": "Tokenizer and checkpoint share the ID space; nothing checks that they match."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "context-words", "level": "college", "purpose": "check",
  "objectives": ["token-counts"], "misconception": "one-token-one-word",
  "question": "A model has a context window of 8,192 tokens. With about 1.3 tokens per English word, roughly how many words of English text fit, leaving 1,000 tokens for the answer?",
  "answer": 5530, "tolerance": 400, "unit": "words",
  "explanation": "(8,192 − 1,000) / 1.3 ≈ 5,530 words. For German or code the number is lower."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "leading-space", "level": "college", "purpose": "check",
  "objectives": ["encode-decode", "token-counts"],
  "question": "With a byte-level BPE tokenizer you look up the ID of \"the\" to check whether a model's next-token prediction is \"the\", but it never matches, although the text clearly continues with \" the\". Why?",
  "options": [
    { "text": "The leading space is part of the token, so \" the\" and \"the\" have different IDs", "correct": true, "feedback": "Right. Byte-level BPE folds the preceding space into the token." },
    { "text": "The model never predicts common words", "correct": false, "feedback": "It predicts \" the\" very often; it is just a different ID." },
    { "text": "Decoding is lossy", "correct": false, "feedback": "Byte-level decoding is exact; the strings differ by a space." }
  ],
  "explanation": "Compare tokens by encoding the exact string including whitespace, or decode the prediction and compare text."
}
```

# Examples

- **Lego bricks**: a few thousand standard bricks build any model; rare shapes are built from common bricks. Breaks down: tokenizers are learned from frequency, not designed for reuse.
- **Phone keyboard suggestions** show whole words for common words and fall back to letters for rare ones.

# Tutor notes

- Let the learner cut the sample sentence in all three ways before naming the approaches.
- If the learner can run Python, a quick experiment with two tokenizers on a German sentence makes the cost argument concrete; otherwise the essay estimate suffices.
- The algorithms (how the pieces are learned) are the next step; here stay with what a tokenizer does, not how it was trained.

# Further reading

- [Hugging Face LLM Course, chapter 2.4: Tokenizers](https://huggingface.co/learn/llm-course/chapter2/4): word, character and subword tokenization with `AutoTokenizer` code for encoding and decoding (college).

# Sources

Grounding: [^hf-llm-course-2-4]. Text, examples and questions are original.

[^hf-llm-course-2-4]: Hugging Face, LLM Course, chapter 2, section 4 ("Tokenizers"), https://huggingface.co/learn/llm-course, Apache License 2.0.
