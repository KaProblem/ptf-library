---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/tokenizer-algorithms
title: How tokenizers learn their pieces - BPE, WordPiece, Unigram
description: Byte-pair encoding learns its vocabulary by repeatedly merging the most frequent neighbouring pair; WordPiece and Unigram choose pieces by other scores. Done by hand on a five-word corpus.
lang: en
levels: [highschool, college]
objectives:
  - id: bpe-train
    text: Carry out the first merges of byte-pair encoding (BPE) on a small corpus with word counts.
  - id: bpe-apply
    text: Tokenize a new word with a list of learned merges, applying them in the order they were learned.
  - id: compare-algorithms
    text: Explain how WordPiece and Unigram choose their pieces differently from BPE, and which well-known models use which.
tags: [llm, tokenizer, bpe, wordpiece, unigram, sentencepiece]
about:
  - wikidata: Q860962
    label: byte-pair encoding
requires:
  - ptf:el/llm-in-practice/subword-tokenization
leads_to:
  - ptf:el/llm-in-practice/padding-and-masks
duration_min: { highschool: 20, college: 30 }
sources:
  - id: hf-llm-course-6
    resource: https://huggingface.co/learn/llm-course/chapter6/5
    title: "Hugging Face LLM Course, chapter 6, sections 4 to 8: normalisation, BPE, WordPiece, Unigram"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-05T23:20:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Nobody hand-picks the 50,000 word pieces of a tokenizer. They are learned from text by a short, almost childishly simple procedure.
- This step runs that procedure by hand on five words, then compares it with the two other common methods.
- Afterwards the learner can carry out BPE merges on paper, tokenize a new word with them, and say what WordPiece and Unigram do differently.

# Core

Byte-pair encoding (BPE) starts with single characters (or bytes) as the
vocabulary, counts how often every pair of neighbouring symbols occurs in
the training corpus, and merges the most frequent pair into a new symbol.
It repeats until the vocabulary has the target size; the ordered list of
merges is the tokenizer. To tokenize new text, split it into characters and
apply the merges in the learned order. WordPiece also merges pairs, but
picks the pair whose frequency is highest relative to the frequencies of its
parts. Unigram goes the other way: it starts with a large vocabulary, removes
the pieces whose loss hurts the corpus likelihood least, and segments a word
into the most probable sequence of pieces.

# Key facts

- Before learning, text is **normalised** (for example Unicode clean-up, lowercasing for uncased models) and **pre-tokenised** into words (on spaces and punctuation); merges never cross word boundaries.
- BPE training loop: count all adjacent symbol pairs, weighted by word frequency → merge the most frequent pair everywhere → add the merged symbol to the vocabulary → repeat. Vocabulary size = base symbols + number of merges.
- Worked corpus (word: count): snow 7, now 4, no 5, know 3, snowy 2. Base vocabulary k, n, o, s, w, y (6 symbols). Merges in order: n + o → no (21 times), no + w → now (16), s + now → snow (9), k + now → know (3), snow + y → snowy (2).
- Applying merges in order to a new word: "snows" → s n o w s → s no w s → s now s → snow s, giving [snow, s]. "nosy" → [no, s, y].
- **Byte-level BPE** (GPT-2, RoBERTa, Llama 3 and most current LLMs) uses the 256 byte values as base symbols, so no input is ever unknown. GPT-2: 256 bytes + 50,000 merges + 1 special token = 50,257.
- **WordPiece** (BERT, DistilBERT): merges the pair with the highest score count(ab) / (count(a) · count(b)), which favours pairs whose parts rarely occur apart. Continuation pieces carry `##`. To tokenize, it takes the longest vocabulary entry that matches from the start of the word, then continues with the rest.
- **Unigram** (T5, ALBERT, XLNet, via the SentencePiece library): starts with many candidate pieces, each with a probability; repeatedly drops the pieces whose removal lowers the corpus likelihood least; segments a word into the sequence of pieces with the highest product of probabilities. It can also sample alternative segmentations during training.
- SentencePiece treats the input as a raw character stream with spaces encoded as "▁", so it needs no language-specific pre-tokenisation (useful for Japanese or Chinese).

# Level: highschool

<!-- ptf:text v1 -->

Take a tiny "book" that only contains five words, each a number of times:
snow 7 times, now 4 times, no 5 times, know 3 times, snowy 2 times. We
want to learn good word pieces from it.

Start with letters only: k, n, o, s, w, y. Now look at every pair of
neighbouring letters and count how often it appears in the book. "n o"
appears in every word: 7 + 4 + 5 + 3 + 2 = 21 times. No other pair is
that frequent, so we glue it into a new piece "no" everywhere. That was
merge number 1.

Count again with the new piece. "no w" now appears in snow, now, know and
snowy: 7 + 4 + 3 + 2 = 16 times, the winner, so merge 2 makes "now".
Merge 3: "s now" appears 7 + 2 = 9 times and becomes "snow". Merge 4 makes
"know", merge 5 "snowy". After five merges every word of the book is a
single piece. A real tokenizer does the same on billions of words and
stops after, say, 50,000 merges.

To cut a new word, use the merges in the same order. "snows": start with
s n o w s, merge 1 gives s no w s, merge 2 s now s, merge 3 snow s. So
"snows" becomes two pieces, snow and s, although the book never
contained it.

There are two other recipes. **WordPiece** (used by BERT) also glues
pairs together, but prefers pairs whose parts almost always appear
together, even if the pair itself is not the most frequent. **Unigram**
works backwards: it starts with far too many pieces and keeps throwing out
the least useful ones, and it cuts a word in the way that is most likely
overall.

# Level: college

<!-- ptf:text v1 -->

Run BPE on the corpus {snow: 7, now: 4, no: 5, know: 3, snowy: 2}
yourself before reading on; count pairs weighted by word frequency.

Base vocabulary {k, n, o, s, w, y}. Pair counts: (n, o) 21, (o, w) 16,
(s, n) 9, (k, n) 3, (w, y) 2, so merge 1 is n + o. Recounting with the
new symbol: (no, w) 16, (s, no) 9, (k, no) 3, (w, y) 2 → merge 2 is
no + w. Then (s, now) 9 → snow, (k, now) 3 → know, (snow, y) 2 → snowy.
The tokenizer is the ordered merge list; encoding replays it, which is why
order matters: applying a later merge first can produce a different
segmentation. Production implementations update pair counts
incrementally instead of recounting and use the byte alphabet, so the
vocabulary is 256 + merges (+ specials).

WordPiece changes the selection criterion to
score(a, b) = c(ab) / (c(a) · c(b)), a pointwise-mutual-information-like
ratio: a pair whose parts are rare on their own wins over a frequent pair
of common parts. At inference WordPiece does not replay merges; it
greedily takes the longest prefix that is in the vocabulary, then the
longest `##` continuation, and falls back to `[UNK]` for the whole word if
it gets stuck.

Unigram is a probabilistic model: the probability of a segmentation is
the product of its pieces' probabilities, and tokenization is the Viterbi
(maximum-probability) segmentation. Training starts from a large seed
vocabulary, fits piece probabilities with EM, and prunes the pieces whose
removal increases the corpus negative log-likelihood least (keeping single
characters so everything stays encodable), typically 10 to 20 % per round.
Because it defines a distribution over segmentations, it supports
subword regularisation (sampling segmentations during training).

All three produce vocabularies of similar size and quality; the practical
choice is usually inherited from the model family.

# Misconceptions

- **merges-any-order**: The learned merges can be applied in any order → BPE replays them in the order they were learned; another order can give another segmentation.
- **vocab-hand-made**: The pieces of a tokenizer are chosen by linguists (syllables, morphemes) → they are learned from frequencies in a corpus and often do not match morphemes.
- **merge-crosses-words**: BPE can merge across the space between two words → text is pre-tokenised into words first; merges stay within a word (the space is usually attached to the following word).
- **all-algorithms-same**: WordPiece and Unigram are just BPE under another name → WordPiece selects pairs by a frequency ratio and tokenizes by longest match; Unigram prunes a large vocabulary and picks the most probable segmentation.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "first-merge", "level": "highschool", "purpose": "check",
  "objectives": ["bpe-train"],
  "question": "A book contains: snow 7 times, now 4, no 5, know 3, snowy 2. Starting from single letters, which pair does BPE merge first?",
  "options": [
    { "text": "n + o, which appears 21 times", "correct": true, "feedback": "Right. Every word contains \"no\": 7 + 4 + 5 + 3 + 2 = 21." },
    { "text": "o + w, which appears 16 times", "correct": false, "feedback": "Frequent, but \"no\" (without w) adds 5 more for n + o." },
    { "text": "s + n, because snow is the most frequent word", "correct": false, "feedback": "BPE counts pairs over all words: s + n appears only 9 times." }
  ],
  "explanation": "BPE always merges the most frequent neighbouring pair, counted over the whole corpus with word frequencies."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "merge-table", "level": "highschool", "purpose": "check",
  "objectives": ["bpe-train"],
  "title": "The first three merges",
  "intro": "Corpus: snow 7, now 4, no 5, know 3, snowy 2. Fill in how often the winning pair appears in each round.",
  "columns": ["Round", "Winning pair", "Count"],
  "rows": [
    ["1", "n + o", "21"],
    ["2", "no + w", "16"],
    ["3", "s + now", "9"]
  ],
  "result": { "label": "Vocabulary size after three merges", "value": "9" },
  "explanation": "Round 2: no + w in snow, now, know, snowy (7 + 4 + 3 + 2). Round 3: s + now in snow and snowy (7 + 2). Six letters plus three new pieces make 9 entries."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "apply-snows", "level": "highschool", "purpose": "check",
  "objectives": ["bpe-apply"], "misconception": "merges-any-order",
  "question": "The learned merges are, in order: n+o → no, no+w → now, s+now → snow, k+now → know. How is the new word \"snows\" cut?",
  "options": [
    { "text": "snow | s", "correct": true, "feedback": "Right: s n o w s → s no w s → s now s → snow s." },
    { "text": "s | n | o | w | s", "correct": false, "feedback": "The merges apply to new words too." },
    { "text": "s | now | s", "correct": false, "feedback": "Merge 3 (s + now) still applies to the first two pieces." }
  ],
  "explanation": "Split into letters, then replay the merges in their learned order."
}
```

```ptf-question
{
  "kind": "cloze", "id": "apply-nosy", "level": "highschool", "purpose": "check",
  "objectives": ["bpe-apply"],
  "text": "With the merges n+o → no, no+w → now, s+now → snow, the word \"nosy\" becomes {{1}} pieces, and the word \"known\" becomes the pieces k, now and {{2}}.",
  "gaps": [ { "answer": "3", "accepted": ["three"] }, { "answer": "n" } ],
  "explanation": "nosy: n o s y → no s y (3 pieces). known: k n o w n → k no w n → k now n; there is no merge for k + now in this list, and none for now + n."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "other-recipes", "level": "highschool", "purpose": "check",
  "objectives": ["compare-algorithms"], "misconception": "all-algorithms-same",
  "question": "Which description of Unigram tokenization is right?",
  "options": [
    { "text": "It starts with far too many pieces and keeps removing the least useful ones", "correct": true, "feedback": "Right. It works backwards compared with BPE." },
    { "text": "It is BPE with a different name", "correct": false, "feedback": "BPE builds up by merging; Unigram cuts down a big vocabulary." },
    { "text": "It uses only one piece per word", "correct": false, "feedback": "Like the others, it splits rare words into several pieces." }
  ],
  "explanation": "BPE and WordPiece grow a vocabulary by merging; Unigram shrinks one by pruning."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "learned-not-syllables", "level": "highschool", "purpose": "transfer",
  "misconception": "vocab-hand-made",
  "question": "A tokenizer splits \"unbelievably\" into \"unbel\" and \"ievably\". Is that a bug?",
  "options": [
    { "text": "No. Pieces are learned from frequencies, not from syllables or word parts", "correct": true, "feedback": "Right. They often look odd to people." },
    { "text": "Yes, a tokenizer must split at syllables", "correct": false, "feedback": "No rule says so; the pieces come from counting." },
    { "text": "Yes, words must never be split", "correct": false, "feedback": "Splitting rare words is the whole point of subword tokenizers." }
  ],
  "explanation": "BPE and its relatives optimise frequency, not linguistics."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "gpt2-merges", "level": "college", "purpose": "check",
  "objectives": ["bpe-train"],
  "question": "GPT-2's byte-level BPE has a vocabulary of 50,257 tokens: 256 byte tokens and one special token <|endoftext|>. How many merges were learned?",
  "answer": 50000, "tolerance": 0, "unit": "merges",
  "explanation": "50,257 − 256 − 1 = 50,000. Each merge adds exactly one token."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "order-matters", "level": "college", "purpose": "check",
  "objectives": ["bpe-apply"], "misconception": "merges-any-order",
  "question": "Merges in learned order: (1) a + b → ab, (2) b + c → bc, (3) ab + c → abc. How is \"abc\" encoded, and what would happen if merge (2) were applied first?",
  "options": [
    { "text": "In order: abc (one token). With (2) first: a | bc, and neither (1) nor (3) applies any more", "correct": true, "feedback": "Right. The order of merges is part of the tokenizer." },
    { "text": "Both orders give abc", "correct": false, "feedback": "After b + c → bc, the pair a + b no longer exists." },
    { "text": "In order: ab | c", "correct": false, "feedback": "Merge (3) then joins ab and c." }
  ],
  "explanation": "BPE encoding replays merges by rank; the merge list is ordered for that reason."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "wordpiece-score", "level": "college", "purpose": "check",
  "objectives": ["compare-algorithms"], "misconception": "all-algorithms-same",
  "question": "Pair counts: (t, h) occurs 50 times, t alone 100 times, h 60 times. (q, u) occurs 10 times, q 10 times, u 80 times. Which pair does WordPiece merge first, and which would BPE merge?",
  "options": [
    { "text": "WordPiece merges q + u (score 0.0125 > 0.0083); BPE merges t + h (50 > 10)", "correct": true, "feedback": "Right. WordPiece rewards parts that rarely appear apart: q is always followed by u." },
    { "text": "Both merge t + h", "correct": false, "feedback": "WordPiece divides by the parts' counts: 50 / 6000 ≈ 0.0083 against 10 / 800 = 0.0125." },
    { "text": "Both merge q + u", "correct": false, "feedback": "BPE only looks at pair frequency, and t + h is more frequent." }
  ],
  "explanation": "score = c(ab) / (c(a) · c(b)). It is high when a and b almost always occur together."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "unigram-best", "level": "college", "purpose": "check",
  "objectives": ["compare-algorithms"],
  "question": "A Unigram vocabulary has the probabilities snow 0.08, sno 0.02, s 0.10, now 0.10, no 0.10, n 0.10, o 0.10, w 0.10, y 0.05. What is the probability of the best segmentation of \"snowy\" (give it in thousandths, so 0.004 → 4)?",
  "answer": 4, "tolerance": 0, "unit": "thousandths",
  "explanation": "snow | y = 0.08 · 0.05 = 0.004 beats s | now | y = 0.0005, sno | w | y = 0.0001 and every longer split. Fewer, likelier pieces win."
}
```

```ptf-question
{
  "kind": "free_text", "id": "which-model-which", "level": "college", "purpose": "check",
  "objectives": ["compare-algorithms"], "misconception": "merge-crosses-words",
  "question": "Name a model family that uses each of byte-level BPE, WordPiece and Unigram, and explain one practical advantage of byte-level BPE and one of SentencePiece-Unigram.",
  "rubric": [
    "Byte-level BPE: GPT-2, RoBERTa, Llama 3 (or most current LLMs). WordPiece: BERT, DistilBERT. Unigram: T5, ALBERT, XLNet.",
    "Byte-level BPE: no unknown tokens, any input encodable.",
    "SentencePiece-Unigram: works on raw text without language-specific pre-tokenisation (spaces as ▁) and allows sampling segmentations (subword regularisation)."
  ],
  "sample_answer": "GPT-2 uses byte-level BPE, BERT WordPiece and T5 Unigram via SentencePiece. Byte-level BPE can encode any byte sequence, so emoji and code never become [UNK]. SentencePiece treats spaces as a normal symbol, so it works for languages without spaces, and Unigram can sample several segmentations as regularisation.",
  "explanation": "The algorithm usually comes with the model family; know which one you are dealing with when you inspect tokens."
}
```

# Examples

- **Abbreviations in a notebook**: someone taking notes starts writing frequent letter combinations as one symbol, then combines symbols again. Breaks down: BPE follows counts strictly, people follow meaning.
- **Text compression**: BPE was invented in 1994 as a compression algorithm, replacing frequent byte pairs with an unused byte.

# Tutor notes

- Do the merges on paper together with the learner. Let them count round 1 themselves; most guess s + n because snow is the most frequent word, which is the hook for "pairs are counted over the whole corpus".
- At highschool level BPE by hand is the core; WordPiece and Unigram need only the one-sentence contrast.
- Learners who code can implement the BPE loop in about 20 lines of Python on their own corpus.

# Further reading

- [Hugging Face LLM Course, chapter 6: The 🤗 Tokenizers library](https://huggingface.co/learn/llm-course/chapter6/5): implementations of BPE, WordPiece and Unigram from scratch and how to train a new tokenizer from an existing one (college, expert).

# Sources

Grounding: [^hf-llm-course-6]. Text, the worked corpus, examples and questions are original.

[^hf-llm-course-6]: Hugging Face, LLM Course, chapter 6 ("The 🤗 Tokenizers library"), sections 4 to 8, https://huggingface.co/learn/llm-course, Apache License 2.0.
