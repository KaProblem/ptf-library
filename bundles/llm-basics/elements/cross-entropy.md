---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/cross-entropy
title: Cross-entropy loss
description: The loss measures how surprised the model is by the real next token; training means making that surprise smaller on average.
lang: en
levels: [highschool, college, expert]
tags: [llm, loss, cross-entropy, training]
about:
  - wikidata: Q1685498
    label: cross entropy
requires:
  - ptf:el/llm-basics/softmax
leads_to:
  - ptf:el/llm-basics/bigram-model
duration_min: { highschool: 15, college: 20, expert: 15 }
simulators:
  - ref: ptf:sim/loss-lens@^1.0.0
    station: surprise
    levels: [highschool]
    role: explore
    note: Use when the learner did not get the loss from bigram-lab ("explain differently").
  - ref: ptf:sim/bigram-lab@^1.0.0
    station: loss
    levels: [college, expert]
    role: explore
  - ref: ptf:sim/bigram-lab@^1.0.0
    station: training-curve
    levels: [college, expert]
    role: practice
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: bigram
    levels: [college, expert]
    note: Compare the printed loss before training with ln 65.
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T12:30:00Z }
status: draft
version: 0.2.2
license: CC-BY-SA-4.0
---

# Core

For each position in the training text, look at the probability the model
gave to the token that really came next. The loss is −ln of that
probability: 0 if the model was sure and right, large if it thought the real
token was unlikely. The overall loss is the average over all positions.

# Key facts

- Per position: loss = −ln p(correct token).
- p = 1 → 0; p = 0.5 → 0.69; p = 0.1 → 2.30; p = 0.01 → 4.61; p → 0 → infinity.
- Guessing uniformly over V = 65 characters gives −ln(1/65) = ln 65 ≈ 4.17. A freshly initialised bigram model starts slightly worse, about 4.87, because its random scores are not exactly uniform.
- A trained character bigram model on Shakespeare reaches about 2.5; a small transformer about 1.5.
- Loss is measured on training data and separately on held-out **validation** data; if only the training loss falls, the model is memorising (overfitting).
- e^loss is the **perplexity**: the effective number of tokens the model is choosing between. Loss 2.5 ≈ perplexity 12.

# Level: highschool

<!-- ptf:text v1 -->

How do you tell whether a model's guesses are good? Counting right and wrong
answers is too crude: a model that gives the right character 49 % is much
better than one that gives it 2 %, even if both picked something else as
their top guess.

So we ask a different question: **how surprised was the model** by what
really came next? If it gave the right character 100 %, there is no surprise
at all: loss 0. If it gave it 50 %, a little surprise: 0.69. If it gave it
only 1 %, big surprise: 4.6. The formula behind these numbers is −ln(p), and
p = 0 would mean infinite surprise.

To judge a whole text, we take the average surprise over all characters.
Training a model means nudging its numbers again and again so that this
average gets smaller.

# Level: college

<!-- ptf:text v1 -->

With logits z_t at position t and target token y_t, the loss is
L = −(1/N) Σ_t ln softmax(z_t)[y_t]. This is the cross-entropy between the
one-hot data distribution and the model's distribution, and it equals the
negative log-likelihood of the data under the model. Minimising it by
gradient descent is maximum-likelihood training.

Benchmarks: ln V is the loss of a uniform guess; anything above it at the
start indicates a badly scaled initialisation. Track training and validation
loss together; diverging curves mean overfitting.

# Level: expert

<!-- ptf:text v1 -->

Cross-entropy decomposes as H(p, q) = H(p) + KL(p ‖ q): the irreducible
entropy of the data plus the model's excess. Reported in bits per character
(divide by ln 2) or as perplexity, it makes models with the same tokenizer
comparable; across tokenizers, normalise per byte. Scaling laws describe
loss as a power law in parameters, data and compute, with the data entropy
as the floor. Note that low loss does not imply calibrated or truthful
outputs after fine-tuning.

# Misconceptions

- **loss-counts-errors**: Loss is the share of wrong guesses → it measures the probability given to the right answer, so "almost right" is rewarded and confident mistakes are punished hard.
- **zero-probability-ok**: Giving a real outcome 0 % costs only a little → −ln(0) is infinite; a model must keep some probability for everything that can happen.
- **training-loss-enough**: A falling training loss proves the model gets better → only the validation loss on unseen text shows whether it generalises.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "loss-meaning",
  "level": "highschool",
  "purpose": "check",
  "misconception": "loss-counts-errors",
  "question": "Two models predict the next character. The right character is 'e'. Model A gives 'e' 45 % (but 'a' 50 %), model B gives 'e' 2 %. Which has the lower loss on this character?",
  "options": [
    { "text": "Model A", "correct": true, "feedback": "Right: −ln(0.45) ≈ 0.80 versus −ln(0.02) ≈ 3.91." },
    { "text": "Model B", "correct": false, "feedback": "No. B was far more surprised by the real 'e'." },
    { "text": "Both the same, because both picked the wrong top character", "correct": false, "feedback": "No. The loss looks at the probability of the right answer, not at the top pick." }
  ],
  "explanation": "Cross-entropy rewards giving the right answer a high probability, even if something else was ranked first."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "uniform-loss",
  "level": "highschool",
  "purpose": "transfer",
  "question": "A model that knows nothing gives each of 65 characters the same probability. What is its loss per character (−ln of 1/65)?",
  "answer": 4.17,
  "tolerance": 0.3,
  "explanation": "ln 65 ≈ 4.17. This is the baseline every trained model has to beat."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "loss-cloze",
  "level": "highschool",
  "purpose": "check",
  "misconception": "zero-probability-ok",
  "text": "If the model gives the right token 100 %, the loss is {{1}}. If it gives the right token 0 %, the loss is {{2}}.",
  "gaps": [
    { "answer": "0", "accepted": ["zero", "0.0"] },
    { "answer": "infinite", "accepted": ["infinity", "∞", "infinitely large"] }
  ],
  "explanation": "−ln(1) = 0 and −ln(p) grows without bound as p approaches 0."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "overfitting",
  "level": "college",
  "purpose": "transfer",
  "misconception": "training-loss-enough",
  "question": "Training loss keeps falling to 0.9 while validation loss rises from 1.6 to 1.9. What is happening?",
  "options": [
    { "text": "The model is memorising the training text (overfitting)", "correct": true, "feedback": "Right. Stop earlier, add dropout or use more data." },
    { "text": "The model is improving; validation loss lags behind", "correct": false, "feedback": "No. Rising validation loss means it gets worse on unseen text." },
    { "text": "The learning rate is too low", "correct": false, "feedback": "A low learning rate slows both curves; it does not make them diverge." }
  ],
  "explanation": "Only held-out data tells you whether the model generalises."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=1320s): the loss of a bigram model before and after training, with the expected value ln 65 (video, 0:22–0:42; college).

# Sources

Grounding: loss and training chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
