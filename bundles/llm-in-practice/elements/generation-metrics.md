---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/generation-metrics
title: Measuring generated text - perplexity, BLEU and ROUGE
description: Perplexity measures how surprised a language model is by real text; BLEU and ROUGE score a generated translation or summary by its word overlap with a reference. All three are cheap and useful, and all three miss things people care about.
lang: en
levels: [highschool, college]
objectives:
  - id: perplexity
    text: Compute perplexity from an average cross-entropy loss and interpret it as an effective number of choices per token.
  - id: overlap
    text: Compute ROUGE-1 precision, recall and F1 for a short summary, and explain how BLEU combines n-gram precision with a brevity penalty.
  - id: metric-limits
    text: Explain what overlap metrics and perplexity miss, and when other evaluation is needed.
tags: [llm, evaluation, perplexity, bleu, rouge, summarisation, translation]
about:
  - wikidata: Q372193
    label: perplexity
  - wikidata: Q7277427
    label: ROUGE
requires:
  - ptf:el/llm-basics/cross-entropy
  - ptf:el/llm-in-practice/fine-tuning-workflow
leads_to:
  - ptf:el/llm-in-practice/llm-evaluation
duration_min: { highschool: 15, college: 25 }
simulators:
  - ref: ptf:sim/loss-lens@^1.3.0
    levels: [highschool]
    role: explore
    use_when: the learner is not sure what an average cross-entropy loss means before turning it into perplexity
sources:
  - id: hf-llm-course-7
    resource: https://huggingface.co/learn/llm-course/chapter7/5
    title: "Hugging Face LLM Course, chapter 7, sections 3 to 5: perplexity, translation (BLEU), summarisation (ROUGE)"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-06T00:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- How do you put a number on "this summary is good" or "this model writes natural English"? Reading thousands of outputs yourself does not scale.
- This step covers the three classic automatic scores: perplexity for language models, BLEU for translation and ROUGE for summaries, how to compute them, and where they fail.
- Afterwards the learner can turn a training loss into perplexity, score a summary by hand with ROUGE-1, and say why a summary with a high ROUGE score can still be wrong.

# Core

Perplexity is the exponential of the average cross-entropy loss on real
text: if a model has perplexity 12, it is on average as unsure as if it
had to choose uniformly among 12 tokens; lower is better. BLEU and ROUGE
compare a generated text with one or more human references by counting
shared words or word sequences (n-grams): BLEU, used for translation,
looks at precision (how much of the output appears in the reference) with
a penalty for outputs that are too short; ROUGE, used for summarisation,
looks mainly at recall (how much of the reference the output covers).
They are fast and reproducible but reward wording, not meaning or truth,
so they need to be complemented by other checks.

# Key facts

- **Perplexity** = exp(average negative log-likelihood per token, in nats) = exp(loss). Loss 2.5 → perplexity e^2.5 ≈ 12.2. A model guessing uniformly over V tokens has perplexity V.
- Perplexity depends on the tokenizer and the test text: models with different vocabularies cannot be compared directly by perplexity. It applies to causal (and, as pseudo-perplexity, masked) language models, not to classifiers.
- **n-gram**: a sequence of n consecutive tokens. Unigrams are single words, bigrams pairs.
- **ROUGE-N recall** = overlapping n-grams / n-grams in the reference; **precision** = overlapping n-grams / n-grams in the candidate; F1 combines them. Counts are clipped: a word counts at most as often as it occurs in the other text. **ROUGE-L** uses the longest common subsequence.
- Worked example: reference "the train was late because of snow" (7 words), candidate "snow made the train late" (5 words). Overlap: the, train, late, snow = 4. ROUGE-1 recall 4 / 7 ≈ 0.571, precision 4 / 5 = 0.8, F1 ≈ 0.667.
- **BLEU** = BP · exp(average of log pₙ for n = 1 … 4), where pₙ is the clipped n-gram precision and the brevity penalty BP = exp(1 − r / c) if the candidate length c is shorter than the reference length r, else 1. For c = 5, r = 7: BP = e^(−0.4) ≈ 0.670. Reported as 0 to 100; SacreBLEU fixes tokenisation so scores are comparable.
- A useful baseline for news summarisation is "lead-3", the first three sentences of the article; a model should beat it.
- Overlap metrics miss paraphrases (same meaning, other words), factual errors (one wrong number barely changes the score) and fluency; a high score on one reference does not mean other good answers would score high.
- Open-ended chat answers have no single reference; they are evaluated by benchmarks with checkable answers, by human ratings or by a strong model acting as judge (next steps).

# Level: highschool

<!-- ptf:text v1 -->

Try to judge two summaries of "The train was late because of snow."
Summary A: "Snow made the train late." Summary B: "The train was late
because of rain." Which is better? A, obviously: B is wrong. Now count
shared words with the original: A shares 4 words (the, train, late,
snow), B shares 6. A word-counting score likes B more. Keep that in mind;
it is the weakness of everything in this step.

**ROUGE** (for summaries) asks: how much of the human reference summary
did the computer's summary cover? For A: 4 of the reference's 7 words
appear, so recall is 4/7 ≈ 57 %. And how much of A appears in the
reference? 4 of its 5 words, so precision is 80 %. The two together give
an F1 of about 0.67.

**BLEU** (for translations) is built the other way round: it checks how
many of the translation's words and word pairs, triples and quadruples
also appear in a human translation. Because a two-word translation could
score perfectly by only saying safe words, BLEU punishes translations
that are much shorter than the reference.

**Perplexity** measures something else: how surprised a language model
is by real text. If, on average, the model is as unsure as someone
picking among 12 equally likely tokens, its perplexity is 12. Lower is
better. It comes straight from the training loss: perplexity = e to the
power of the loss.

These numbers are cheap, fast and always give the same result, which is
why everyone reports them. But they count words, not meaning or truth.
For a final judgement, people (or careful tests) still have to look.

# Level: college

<!-- ptf:text v1 -->

Compute ROUGE-1 for candidate "snow made the train late" against
reference "the train was late because of snow" before reading on: 4
overlapping unigrams, R = 4/7, P = 4/5, F1 = 2PR / (P + R) ≈ 0.667.

**Perplexity.** For a causal LM with mean token-level negative
log-likelihood ℓ (nats), PPL = e^ℓ. It is the geometric-mean inverse
probability of the test tokens, i.e. the size of a uniform distribution
with the same entropy. Evaluating a model fine-tuned with masked
language modelling uses pseudo-perplexity from the masked losses. PPL is
only comparable for the same tokenizer and test set: a tokenizer with
longer tokens assigns lower per-token probabilities to harder units.
Lower perplexity correlates with better downstream quality within a
model family, but says nothing about instruction following or truth.

**ROUGE.** ROUGE-N recall = ∑ clipped n-gram matches / n-grams in the
reference; ROUGE-L uses the longest common subsequence (in-order, not
necessarily contiguous) and rewards preserved word order; ROUGE-Lsum
applies it per sentence. Libraries report F-measures by default.
Preprocessing (lowercasing, stemming) changes scores, so report it.

**BLEU.** Corpus-level geometric mean of clipped n-gram precisions
p₁ … p₄ times a brevity penalty BP = min(1, e^{1 − r/c}). With c = 5,
r = 7, BP ≈ 0.670. Clipping stops "the the the the" from scoring; BP stops
short, high-precision outputs from scoring. BLEU is noisy on single
sentences (any zero pₙ zeroes the score without smoothing) and depends
heavily on tokenisation, hence SacreBLEU. chrF (character n-gram F-score)
is more robust for morphologically rich languages.

**Limits.** Overlap metrics measure surface similarity to specific
references. They underrate valid paraphrases and overrate fluent,
on-topic but wrong outputs: changing "snow" to "rain" costs one unigram.
Hence summarisation work adds factual-consistency checks, and modern LLM
evaluation relies on task benchmarks with verifiable answers, human
preference and model-based judging.

# Misconceptions

- **high-rouge-correct**: A high ROUGE or BLEU score means the output is correct → they count shared words; a fluent output with one wrong fact can score higher than a correct paraphrase.
- **perplexity-comparable**: Perplexities of any two models can be compared → only with the same tokenizer and test text.
- **lower-perplexity-better-assistant**: The model with the lowest perplexity is the best assistant → perplexity measures prediction of text, not helpfulness, instruction following or truth.
- **bleu-recall**: BLEU measures how much of the reference the output covers → BLEU is precision-based with a brevity penalty; ROUGE is the recall-oriented one.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "rain-vs-snow", "level": "highschool", "purpose": "warmup",
  "misconception": "high-rouge-correct",
  "question": "Original: \"The train was late because of snow.\" Which summary shares more words with it: A \"Snow made the train late.\" or B \"The train was late because of rain.\"?",
  "options": [
    { "text": "B, although it is wrong", "correct": true, "feedback": "Right. B shares 6 words, A only 4. Word counting cannot see that B changed the fact." },
    { "text": "A, because it is right", "correct": false, "feedback": "A is right, but it shares only 4 words: the, train, late, snow." },
    { "text": "Both share the same number", "correct": false, "feedback": "Count again: B has 6 of the 7 words." }
  ],
  "explanation": "Overlap scores reward wording, not truth."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "ppl-from-loss", "level": "highschool", "purpose": "check",
  "objectives": ["perplexity"],
  "question": "A language model has an average loss of 2.0 on test text. Its perplexity is e^loss. About what is it?",
  "answer": 7.4, "tolerance": 0.2,
  "explanation": "e² ≈ 7.39: on average the model is as unsure as if it had to choose among about 7 equally likely tokens."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "ppl-meaning", "level": "highschool", "purpose": "check",
  "objectives": ["perplexity"], "misconception": "lower-perplexity-better-assistant",
  "question": "Model X has perplexity 8 on a news text, model Y (same tokenizer) has 20. What does that tell you?",
  "options": [
    { "text": "X predicts this kind of text better: it is less surprised by the real next tokens", "correct": true, "feedback": "Right. Lower perplexity, better prediction of this text." },
    { "text": "X gives more helpful answers in a chat", "correct": false, "feedback": "Perplexity says nothing about helpfulness." },
    { "text": "Y knows 20 words, X only 8", "correct": false, "feedback": "Perplexity is about uncertainty, not vocabulary size." }
  ],
  "explanation": "Perplexity is a measure of prediction on a given text, nothing more."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "rouge-recall-hs", "level": "highschool", "purpose": "check",
  "objectives": ["overlap"],
  "question": "Reference summary: \"heavy rain closed the old bridge\" (6 words). Computer summary: \"the bridge closed after rain\" (5 words). What is the ROUGE-1 recall in percent (shared words / words in the reference)?",
  "answer": 66.7, "tolerance": 1, "unit": "%",
  "explanation": "Shared: the, bridge, closed, rain = 4. 4 / 6 ≈ 66.7 %."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "bleu-short", "level": "highschool", "purpose": "check",
  "objectives": ["overlap"], "misconception": "bleu-recall",
  "question": "Why does BLEU punish translations that are much shorter than the human translation?",
  "options": [
    { "text": "Otherwise a translation could score well by saying only a few safe words that surely appear in the reference", "correct": true, "feedback": "Right. BLEU checks precision, so short outputs need a penalty." },
    { "text": "Because short sentences are always wrong", "correct": false, "feedback": "Short can be fine; the penalty only stops gaming the score." },
    { "text": "BLEU does not care about length", "correct": false, "feedback": "It does: the brevity penalty." }
  ],
  "explanation": "BLEU = n-gram precision × brevity penalty."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "what-missed", "level": "highschool", "purpose": "check",
  "objectives": ["metric-limits"], "misconception": "high-rouge-correct",
  "question": "Which problem do word-overlap scores like ROUGE and BLEU miss most easily?",
  "options": [
    { "text": "A wrong fact in an otherwise similar sentence", "correct": true, "feedback": "Right. Changing one word changes the score only a little." },
    { "text": "A completely empty output", "correct": false, "feedback": "An empty output shares nothing and scores 0." },
    { "text": "An output in a different language", "correct": false, "feedback": "That shares almost no words and scores low." }
  ],
  "explanation": "Overlap scores see words, not truth. Facts need other checks."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "rouge1-f1", "level": "college", "purpose": "check",
  "objectives": ["overlap"],
  "title": "ROUGE-1 by hand",
  "intro": "Reference: \"the train was late because of snow\". Candidate: \"snow made the train late\". Round to three decimals.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Overlapping unigrams", "the, train, late, snow", "4"],
    ["Recall", "4 / 7", "0.571"],
    ["Precision", "4 / 5", "0.8"]
  ],
  "result": { "label": "F1", "value": "0.667" },
  "explanation": "F1 = 2 · 0.8 · 0.571 / (0.8 + 0.571) ≈ 0.667. The wrong summary \"the train was late because of rain\" would have recall 6/7 and precision 6/7: F1 0.857."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "brevity-penalty", "level": "college", "purpose": "check",
  "objectives": ["overlap"], "misconception": "bleu-recall",
  "question": "A candidate translation has 12 tokens, the reference 16. What is BLEU's brevity penalty exp(1 − r/c)?",
  "answer": 0.717, "tolerance": 0.005,
  "explanation": "r / c = 16 / 12 = 1.333; exp(1 − 1.333) = exp(−0.333) ≈ 0.717. The whole BLEU score is multiplied by this factor."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "uniform-ppl", "level": "college", "purpose": "check",
  "objectives": ["perplexity"], "misconception": "perplexity-comparable",
  "question": "An untrained model assigns equal probability to all 32,000 tokens of its vocabulary. What is its loss (in nats) on any text? (Its perplexity is 32,000.)",
  "answer": 10.37, "tolerance": 0.02, "unit": "nats",
  "explanation": "loss = −ln(1 / 32,000) = ln 32,000 ≈ 10.37, and e^10.37 ≈ 32,000. A freshly initialised model starts near this value; with another vocabulary size the starting point differs, one reason perplexities across tokenizers are not comparable."
}
```

```ptf-question
{
  "kind": "free_text", "id": "eval-plan", "level": "college", "purpose": "check",
  "objectives": ["metric-limits", "perplexity"], "misconception": "lower-perplexity-better-assistant",
  "question": "Your team fine-tuned a summariser for medical discharge letters. It improves ROUGE-L from 38 to 44, and its perplexity on letters dropped. Explain why this is not enough to deploy it and propose two additional checks.",
  "rubric": [
    "ROUGE measures overlap with reference wording; it barely penalises factual errors (wrong dose, wrong side) and penalises valid paraphrases.",
    "Perplexity measures how well it predicts letter text, not whether summaries are faithful.",
    "Additional checks: factual consistency against the source (automatic or by clinicians), human expert review of a sample, targeted tests (numbers, negations, medications), comparison against a baseline such as lead sentences."
  ],
  "sample_answer": "A higher ROUGE-L only shows more shared wording with the references; a summary that swaps 'left' and 'right' or doubles a dose loses almost nothing. Perplexity says the model predicts letter language well, not that it is faithful. I would have clinicians rate a random sample for errors and run an automatic check that every number and medication in the summary appears in the source letter.",
  "explanation": "Cheap metrics guide development; deployment decisions need checks of what matters."
}
```

# Examples

- **Spelling bee scored by letters**: counting correct letters would give partial credit to a misspelled word; ROUGE gives partial credit to a summary with a wrong fact. Breaks down: ROUGE also gives no credit to correct synonyms.
- **Perplexity as a die**: perplexity 6 means "as unsure as rolling a fair die each token".

# Tutor notes

- Start with the rain/snow pair; the learner should discover the weakness of overlap metrics before learning the formulas.
- If the learner did llm-basics, perplexity is one line on top of cross-entropy; the `loss-lens` simulator is only for a learner who has forgotten what the loss means.
- At highschool level BLEU needs only the idea (precision plus a length penalty), no formula.

# Further reading

- [Hugging Face LLM Course, chapter 7: Classical NLP tasks](https://huggingface.co/learn/llm-course/chapter7/5): perplexity for masked language models (7.3), BLEU and SacreBLEU for translation (7.4) and ROUGE with a lead-3 baseline for summarisation (7.5), with code (college).

# Sources

Grounding: [^hf-llm-course-7]. Text, examples and questions are original.

[^hf-llm-course-7]: Hugging Face, LLM Course, chapter 7 ("Classical NLP tasks"), sections 3 to 5, https://huggingface.co/learn/llm-course, Apache License 2.0.
