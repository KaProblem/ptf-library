---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/tokenizer
title: Tokenizer
description: A language model never sees letters or words, only numbers; the tokenizer turns text into those numbers and back.
lang: en
levels: [child, highschool, college]
tags: [llm, tokenizer, vocabulary]
about:
  - wikidata: Q2438971
    label: tokenization
  - wikidata: Q2143407
    label: lexical token
leads_to:
  - ptf:el/llm-basics/training-examples
  - ptf:el/llm-basics/softmax
duration_min: { child: 5, highschool: 10, college: 15 }
simulators:
  - ref: ptf:sim/next-char-lab@^2.0.0
    station: guess
    levels: [highschool]
    role: explore
    note: Let the learner be the model first, before any terminology.
  - ref: ptf:sim/next-char-lab@^2.0.0
    station: tokenizer
    levels: [highschool, college]
    role: explore
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: tokenizer
    levels: [college, expert]
    note: Run it on the learner's own text and compare vocabulary sizes.
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T12:30:00Z }
status: draft
version: 0.2.1
license: CC-BY-SA-4.0
---

# Core

A language model predicts what comes next in a text. It cannot work with
letters directly, so a tokenizer cuts the text into pieces (tokens) and gives
every possible piece a number. The model only ever sees and produces these
numbers.

# Key facts

- The set of all tokens is the **vocabulary**; its size is written V.
- Character-level tokenizer: every distinct character is a token. A text of about 1 million characters of Shakespeare has V = 65 (letters, digits, punctuation, space, newline).
- Real models use subword tokenizers such as byte-pair encoding (BPE). GPT-2's vocabulary has 50,257 tokens; a common English word is often one token, a rare word several.
- Trade-off: a small vocabulary means long sequences of tokens; a large vocabulary means short sequences but more to learn per token.
- Encoding (text → numbers) and decoding (numbers → text) must be exact inverses.
- The numbers are arbitrary labels. Token 46 is not "more" than token 45.

# Level: child

<!-- ptf:text v1 -->

Let's play a game. I write the start of a sentence and stop: "Once upon a ti…".
What letter comes next? You knew it, because you have heard many stories.

A computer program can learn the same game. But it cannot read letters like
you do. So first we give every letter a number, like a secret code: a = 1,
b = 2, and so on, and even the space gets a number. Now the sentence is a row
of numbers, and the program learns which number usually comes next.

# Level: highschool

<!-- ptf:text v1 -->

Before any explanation, try being the model yourself: look at a piece of text
that stops in the middle of a word and guess the next character. You will be
right surprisingly often, because you know spelling, grammar and meaning.

A language model plays exactly this game, but it only sees numbers. A
**tokenizer** makes the translation. The simplest tokenizer gives every
character that occurs in the training text its own number: for a large
Shakespeare text that is 65 different characters, so the numbers run from 0
to 64. "Hi!" might become [20, 47, 2]. These 65 characters are the model's
whole **vocabulary**.

Big models like ChatGPT cut text into larger pieces, often whole words or
parts of words. That makes texts shorter in tokens, but the model needs to
know about 50,000 or more different pieces.

# Level: college

<!-- ptf:text v1 -->

A tokenizer is a pair of functions encode: string → list of ints and
decode: list of ints → string with decode(encode(s)) = s. A character-level
tokenizer builds a lookup table from the sorted set of characters in the
corpus (`stoi`, `itos`). Subword tokenizers such as BPE start from bytes and
repeatedly merge the most frequent adjacent pair into a new token until the
vocabulary reaches a target size (50,257 for GPT-2).

The choice matters for everything downstream: the model's input and output
layers have one row per token (V × d parameters each), and sequence length
in tokens limits how much text fits into the context window.

# Misconceptions

- **model-sees-words**: The model reads words like we do → it only receives token IDs, numbers without built-in meaning.
- **tokens-are-words**: A token is always a word → tokens can be single characters, word pieces, whole words or even several words, depending on the tokenizer.
- **ids-carry-meaning**: Token 46 is close in meaning to token 45 → IDs are arbitrary labels; any meaning has to be learned later (in embeddings).

# Questions

```ptf-question
{
  "kind": "guess_next",
  "id": "guess-1",
  "level": "child",
  "purpose": "warmup",
  "intro": "Be the language model: which letter comes next?",
  "prefix": "Once upon a ti",
  "answer": "m",
  "hint": "Fairy tales often start like this.",
  "explanation": "\"Once upon a time\": you knew it from many stories. A language model learns such patterns from lots of text."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-model-sees",
  "level": "highschool",
  "purpose": "check",
  "misconception": "model-sees-words",
  "question": "What does a language model actually receive as input?",
  "options": [
    { "text": "A list of numbers, one per token", "correct": true, "feedback": "Right. The tokenizer turns text into numbers before the model sees it." },
    { "text": "The words, like a person reading", "correct": false, "feedback": "No. The model has no access to letters or words, only to token IDs." },
    { "text": "A picture of the text", "correct": false, "feedback": "No. Text models get token IDs, not images." }
  ],
  "explanation": "Text → tokenizer → token IDs → model. The model's answer is also a token ID, which the tokenizer turns back into text."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "vocab-size",
  "level": "highschool",
  "purpose": "check",
  "question": "A character-level tokenizer reads 1 million characters of Shakespeare. About how many different tokens will its vocabulary have?",
  "answer": 65,
  "tolerance": 20,
  "unit": "tokens",
  "explanation": "65: upper- and lowercase letters (52), punctuation, digits that occur, space and newline. Even a huge text uses only a small set of characters."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "id-meaning",
  "level": "college",
  "purpose": "check",
  "misconception": "ids-carry-meaning",
  "question": "In a character-level vocabulary, 'a' has ID 39 and 'b' has ID 40. What can the model conclude from this?",
  "options": [
    { "text": "Nothing; the IDs are arbitrary labels", "correct": true, "feedback": "Right. Similarity has to be learned, e.g. in embedding vectors." },
    { "text": "'a' and 'b' are similar because their IDs are close", "correct": false, "feedback": "No. Sorting the characters is a convenience, not information." },
    { "text": "'b' is more important than 'a'", "correct": false, "feedback": "No. A larger ID carries no weight." }
  ],
  "explanation": "IDs index rows in a table. All structure the model uses is learned from data."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=0s): Andrej Karpathy introduces next-token prediction, the Tiny Shakespeare dataset and character-level vs. sub-word tokenizers (video, 0:00–0:13; highschool, college).

# Sources

Grounding: the first chapters of [^karpathy-gpt]. Learner-facing text does not refer to it.

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
