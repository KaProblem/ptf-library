---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/softmax
title: Softmax
description: Turns the model's raw scores (logits) into probabilities that are all positive and add up to 1.
lang: en
levels: [highschool, college, expert]
tags: [llm, probability, softmax, sampling, temperature]
requires:
  - ptf:el/llm-basics/tokenizer
leads_to:
  - ptf:el/llm-basics/cross-entropy
duration_min: { highschool: 10, college: 20, expert: 15 }
simulators:
  - ref: ptf:sim/next-char-lab@^2.0.0
    station: counted-probabilities
    levels: [highschool]
    role: explore
    note: Shows probabilities from counting; good bridge before introducing scores and softmax.
  - ref: ptf:sim/next-char-lab@^2.0.0
    station: temperature
    levels: [college]
    role: explore
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T12:30:00Z }
status: draft
version: 0.1.1
license: CC-BY-SA-4.0
---

# Core

For every possible next token, the model outputs a score (a logit). Softmax
turns these scores into probabilities: bigger score, bigger share, every
share above zero, and all shares together exactly 100 %.

# Key facts

- Formula: p_i = e^(z_i) / Σ_j e^(z_j), where z_i are the logits for all V tokens.
- All p_i > 0 and Σ p_i = 1. Order is preserved: a larger logit always gets a larger probability.
- Adding the same constant to all logits changes nothing (implementations subtract the maximum for numerical stability).
- Equal logits give a uniform distribution: with V = 65, each token gets 1/65 ≈ 1.5 %.
- A bigram model can be seen as a V × V table of logits: row = current token, softmax of that row = distribution over the next token.
- Temperature T: softmax(z / T). T < 1 sharpens (more predictable text), T > 1 flattens (more surprising text), T → 0 approaches always picking the top token.
- Generation **samples** from the distribution; it does not always take the most likely token.

# Level: highschool

<!-- ptf:text v1 -->

Imagine the model has just read "th" and must say how likely each of the 65
characters is next. Internally it first gives every character a score, for
example "e": 3.1, "a": 1.4, "x": −2.0. Scores can be any number, even
negative, so they are not yet probabilities.

Softmax fixes that in two steps. First, take e to the power of each score:
this makes every value positive, and big scores become much bigger. Then
divide each value by the sum of all values, so together they add up to 1.
Now "e" might get 72 %, "a" 13 %, "x" 0.4 %. Nothing is exactly zero, and
the order stays the same.

To write text, the model then rolls a weighted die with these
probabilities. Usually "e" comes up, but sometimes "a". That is why the same
model can give different answers to the same question.

# Level: college

<!-- ptf:text v1 -->

Given logits z ∈ ℝ^V, softmax(z)_i = exp(z_i) / Σ_j exp(z_j). It is the
standard way to parameterise a categorical distribution with an unconstrained
vector, and its gradient combines neatly with cross-entropy:
∂L/∂z = softmax(z) − onehot(target).

Temperature scaling divides the logits by T before the softmax. Sampling at
T = 1 reproduces the model's distribution; lower T trades diversity for
predictability. Greedy decoding (argmax) is the limit T → 0 and tends to get
stuck in repetitive loops.

# Level: expert

<!-- ptf:text v1 -->

Softmax is the gradient of log-sum-exp and the maximum-entropy distribution
for given expected logits. In attention it reappears as a soft, differentiable
lookup: scores q·k/√d are scaled so that their variance stays near 1 and the
softmax does not saturate into a one-hot distribution at initialisation.
Practical issues: numerical stability (subtract max z), the cost of the full
V-way softmax for large vocabularies, and calibration: fine-tuned models are
often over-confident, which temperature can partly correct.

# Misconceptions

- **softmax-makes-zeros**: Low scores become probability 0 → e^z is always positive, so every token keeps some probability.
- **softmax-changes-order**: Softmax can make a lower score more likely than a higher one → softmax is monotonic; the order of the scores is kept.
- **always-picks-top**: The model always outputs the most likely token → generation usually samples from the distribution, so less likely tokens appear too.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "after-softmax",
  "level": "highschool",
  "purpose": "check",
  "misconception": "softmax-makes-zeros",
  "question": "The scores for three characters are [2, 1, 0]. What is true after softmax?",
  "options": [
    { "text": "The three values add up to 1", "correct": true, "feedback": "Yes, softmax normalises so all probabilities add up to 1." },
    { "text": "The character with score 0 gets probability 0", "correct": false, "feedback": "No: e^0 = 1, so it keeps a share (about 9 %)." },
    { "text": "The order of the characters can change", "correct": false, "feedback": "No: a higher score always gives a higher probability." }
  ],
  "explanation": "e^2 ≈ 7.39, e^1 ≈ 2.72, e^0 = 1; sum ≈ 11.1; probabilities ≈ 67 %, 24 %, 9 %."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "compute-softmax",
  "level": "highschool",
  "purpose": "transfer",
  "title": "Softmax by hand",
  "intro": "Logits for three characters: e = 2, a = 1, x = 0.",
  "columns": ["Character", "Logit z", "e^z", "Probability"],
  "rows": [["e", "2", "7.39", "7.39 / 11.11 = 0.665"], ["a", "1", "2.72", "2.72 / 11.11 = 0.245"], ["x", "0", "1.00", "1.00 / 11.11 = 0.090"]],
  "result": { "label": "Sum of probabilities", "value": "1.000" },
  "explanation": "Exponentiate, add up, divide. The biggest logit gets the biggest share, the smallest still gets 9 %."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "same-prompt",
  "level": "highschool",
  "purpose": "check",
  "misconception": "always-picks-top",
  "question": "You ask a language model the same question twice and get two different answers. Why?",
  "options": [
    { "text": "It samples the next token from a probability distribution", "correct": true, "feedback": "Right. A weighted random choice at every step leads to different texts." },
    { "text": "It learned something new between the two questions", "correct": false, "feedback": "No. The model's parameters do not change while you use it." },
    { "text": "It is broken", "correct": false, "feedback": "No, this is intended behaviour." }
  ],
  "explanation": "With temperature 0 (always the top token) the answers would be identical."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "temperature-order",
  "level": "college",
  "purpose": "transfer",
  "instruction": "Order these sampling temperatures from most predictable to most surprising text.",
  "items": ["T = 0.2", "T = 0.7", "T = 1.0", "T = 1.5"],
  "explanation": "Dividing logits by a small T exaggerates differences (sharper distribution); a large T shrinks them (flatter distribution)."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "attention-scaling",
  "level": "expert",
  "purpose": "transfer",
  "question": "Why do transformers divide attention scores by √d before the softmax?",
  "rubric": ["Dot products of d-dimensional vectors have variance growing with d", "Large scores saturate the softmax towards one-hot", "Saturation gives tiny gradients and attends to one token only", "Scaling keeps variance near 1 at initialisation"],
  "sample_answer": "q·k sums d products, so its variance grows with d. Without scaling, the softmax becomes nearly one-hot, gradients vanish and each query attends to a single key. Dividing by √d keeps the scores' variance around 1.",
  "explanation": "This is the same temperature effect: √d acts as a temperature that keeps the softmax soft."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=1320s): a bigram model in PyTorch: logits, softmax, sampling and generation (video, 0:22–0:42; college).

# Sources

Grounding: bigram and attention chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
