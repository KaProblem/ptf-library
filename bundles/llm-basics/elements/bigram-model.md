---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/bigram-model
title: A first model that learns
description: The bigram model is a table of scores, one row per token. Training nudges every number a little in the direction that lowers the loss, and generation samples one token at a time from the row of the last token.
lang: en
levels: [highschool, college, expert]
objectives:
  - Explain the bigram model as a table of scores, one row per token.
  - "Describe one training step: loss, gradient, a small step, and what the learning rate does."
  - Explain how the model generates text one token at a time.
tags: [llm, bigram, training-loop, gradient-descent, learning-rate, generation]
about:
  - wikidata: Q2773912
    label: bigram
  - wikidata: Q1199743
    label: gradient descent
  - wikidata: Q65121812
    label: learning rate
requires:
  - ptf:el/llm-basics/cross-entropy
leads_to:
  - ptf:el/llm-basics/causal-mask
duration_min: { highschool: 20, college: 25, expert: 15 }
simulators:
  - ref: ptf:sim/training-loop@^1.0.0
    station: lookup
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner needs to see that the model is just a table lookup
  - ref: ptf:sim/training-loop@^1.0.0
    station: nudge
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner cannot picture what one gradient step changes
  - ref: ptf:sim/training-loop@^1.0.0
    station: train
    levels: [highschool, college, expert]
    role: practice
    use_when: the learner should compare learning rates that are too small, good and too large
  - ref: ptf:sim/training-loop@^1.0.0
    station: generate
    levels: [highschool, college, expert]
    role: practice
    use_when: the learner wants to see text come out of the trained table
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: bigram
    levels: [college, expert]
    note: Run it, compare the loss before training with ln 65, then try a learning rate that is far too large.
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T14:30:00Z }
status: draft
version: 0.2.0
license: CC-BY-SA-4.0
---

# Introduction

- This is the first model that actually learns.
- It is tiny, a table, but training and generating work exactly as in a large model.
- Afterwards the learner can describe a training step and how text is generated.

# Core

The simplest language model is a table: one row per token, and in each row
a score for every token that could come next. Softmax turns a row into
probabilities. Training repeats three moves many times: measure the loss on
a batch of examples, work out for every number in the table which direction
would lower that loss (the gradient), and move every number a small step
that way. To write, the model takes the row of the last token, samples one
token, appends it and repeats.

# Key facts

- Table size: vocabulary × vocabulary. With 65 characters that is 65 × 65 = 4,225 numbers, all the model has. In code it is `nn.Embedding(vocab_size, vocab_size)`: looking up row i gives the logits for "what follows token i".
- If all scores were equal, every token would get 1/65 and the loss would be −ln(1/65) = ln 65 ≈ 4.17. With random initial scores (the default for `nn.Embedding`) the model is confidently wrong in places and starts higher, about 4.7. A trained bigram model on Shakespeare reaches about 2.5.
- One training step: forward pass (logits and loss), backward pass (`loss.backward()` computes the gradient of the loss with respect to every parameter), update (`optimizer.step()`). The optimizer used here is AdamW, a refined version of "subtract learning rate × gradient".
- For softmax with cross-entropy, the gradient on score j is p_j − 1 for the correct token and p_j for every other token: the right answer is pushed up, the others are pushed down in proportion to how much the model believed in them.
- Learning rate: too small and training crawls; too large and the loss jumps around or blows up. Typical values: 1e-2 for the tiny bigram model, 1e-3 to 3e-4 for small transformers.
- The loss is estimated by averaging over many batches (for example 200), because a single batch is noisy. Training and validation loss are reported separately.
- Generation: crop the context, take the logits at the last position, softmax, sample with `torch.multinomial`, append, repeat. Sampling instead of always taking the maximum keeps the text varied.
- A bigram model only ever sees one token. It learns which pairs are common but can never know which word or sentence it is in. Every later step of the path is about looking further back.

# Level: highschool

<!-- ptf:text v1 -->

Before you read on, open the table in the simulator and look up two
characters. Every row says the same thing: 20 % for everything. The model
knows nothing yet.

Now take one example from the text: after "b" comes "a". The model gave
"a" only 20 %, so it was quite surprised; its loss is about 1.6. A training
step nudges the numbers in the row of "b": the score for "a" goes up a bit,
the scores for the others go down a bit. Press the button a few times and
"a" climbs to 50 %, 70 %, 90 %.

Real training does this for all examples at once, again and again. The
step size matters. Tiny steps learn, but painfully slowly. Huge steps
overshoot: the model swings from one extreme to the other and the loss
jumps around. In between, the loss drops quickly and then flattens out.

Where does it flatten? At the point where the table matches how often each
pair really occurs. That is all this model can ever learn. Let it write
and you see why that is not enough: "anana nd ba", pieces that look right,
but no words. It forgets everything except the last character.

# Level: college

<!-- ptf:text v1 -->

Start in the simulator with the nudge station at a larger step size, and
read the score changes under each bar: the correct character gains
step × (1 − p), every other character loses step × p. That is the whole
gradient of softmax plus cross-entropy, and it is why confident wrong
answers are corrected hardest.

In code, the model is `nn.Embedding(65, 65)`. A batch of shape (B, T) is
looked up to give logits (B, T, 65); for the loss you flatten to (B·T, 65)
and (B·T,) and call `F.cross_entropy`. The training loop is four lines:
`logits, loss = model(xb, yb)`, `optimizer.zero_grad()`, `loss.backward()`,
`optimizer.step()`. Before training the loss is about 4.7, a little worse than
uniform guessing (ln 65 ≈ 4.17) because the random initial scores are
confidently wrong in places; after a few thousand steps it settles around 2.5.

Generation reuses the same forward pass: keep only the logits of the last
position, apply softmax, draw with `torch.multinomial`, append. Note that
the bigram model ignores everything except the last token, even though we
feed it the whole sequence. That waste is the starting point for attention.

# Level: expert

<!-- ptf:text v1 -->

The bigram table is the maximum-likelihood estimate of P(x_{t+1} | x_t)
once training has converged: its softmax rows approach the normalised pair
counts, and the loss approaches the conditional entropy of the data given
one token of context. Gradient descent here is convex per row, so with a
sensible learning rate it reaches that optimum; the instability at large
learning rates is plain overshooting of a well-conditioned problem.

The setup is the scaffold for everything that follows: the same data
pipeline, loss, optimizer (AdamW), evaluation (averaged train/val loss) and
sampling loop stay unchanged while the model in the middle grows from a
lookup table into a transformer. Ask the learner to predict which lines of
the training script will change when attention is added: only the model
class.

# Misconceptions

- **training-stores-text**: Training stores the examples so the model can look them up later → training only adjusts numbers (parameters); the text itself is not kept anywhere.
- **one-step-learns**: One training step sets the right answer to 100 % → each step is a small nudge; it takes many steps over many examples.
- **bigger-lr-faster**: A larger learning rate always learns faster → beyond a point, steps overshoot and the loss jumps around or diverges.
- **sampling-is-error**: Sampling is a flaw; the model should always take the most likely token → always taking the maximum makes text repetitive; sampling is deliberate.
- **bigram-sees-context**: Feeding the whole sequence means the bigram model uses it → it only ever looks at the last token.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-training-changes",
  "level": "highschool",
  "purpose": "check",
  "misconception": "training-stores-text",
  "question": "What does one training step change?",
  "options": [
    { "text": "Every number in the table moves a little, in the direction that lowers the loss", "correct": true, "feedback": "Right. Training only ever adjusts the parameters." },
    { "text": "The model stores the example so it can look it up later", "correct": false, "feedback": "No. The model never stores text, only its numbers." },
    { "text": "The right answer is set to 100 %", "correct": false, "feedback": "No. It is a small nudge, not a jump." }
  ],
  "explanation": "A training step is: measure the loss, compute the direction that lowers it, move every parameter a little that way."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "learning-rate",
  "level": "highschool",
  "purpose": "check",
  "misconception": "bigger-lr-faster",
  "question": "With a very large learning rate, the loss goes 1.6, 0.8, 1.4, 1.2, 0.7, 1.3 … What is happening?",
  "options": [
    { "text": "The steps overshoot: the model swings past the good values again and again", "correct": true, "feedback": "Right. Smaller steps would settle." },
    { "text": "The model is learning especially fast", "correct": false, "feedback": "No. A good run falls and flattens; this one jumps." },
    { "text": "The text is too short", "correct": false, "feedback": "No. The same text trains smoothly with a smaller learning rate." }
  ],
  "explanation": "Too large a learning rate makes training unstable; too small makes it slow."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "initial-loss",
  "level": "college",
  "purpose": "check",
  "question": "A freshly initialised bigram model on a vocabulary of 65 characters gives every character roughly the same probability. What loss do you expect before training?",
  "answer": 4.17,
  "tolerance": 0.3,
  "explanation": "−ln(1/65) = ln 65 ≈ 4.17. If your untrained model is far above this, its initial scores are too large and it is confidently wrong."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gradient-sign",
  "level": "college",
  "purpose": "transfer",
  "question": "For one example, the model gives the correct token 30 % and a wrong token 60 %. With learning rate 1, how does the wrong token's score change in one plain gradient step?",
  "options": [
    { "text": "It goes down by 0.6", "correct": true, "feedback": "Right. The gradient on a wrong token is its probability p = 0.6; the step subtracts it." },
    { "text": "It goes down by 0.3", "correct": false, "feedback": "No. 0.3 is the correct token's probability; the wrong token's own probability decides." },
    { "text": "It does not change; only the correct token's score moves", "correct": false, "feedback": "No. Every score in the row moves; the correct one goes up by 1 − 0.3 = 0.7." }
  ],
  "explanation": "∂L/∂z_j = p_j − y_j: wrong tokens are pushed down in proportion to how much the model believed in them."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "bigram-limit",
  "level": "highschool",
  "purpose": "transfer",
  "misconception": "bigram-sees-context",
  "question": "A trained bigram model writes 'anana nd ba'. What keeps it from writing real words?",
  "options": [
    { "text": "It only sees the last character, so it cannot know where in a word it is", "correct": true, "feedback": "Right. Seeing further back is what attention adds." },
    { "text": "It has not been trained long enough", "correct": false, "feedback": "No. Once the loss has flattened, more training does not help this model." },
    { "text": "Sampling adds errors; it should always take the most likely character", "correct": false, "feedback": "No. Always taking the maximum gives endless repetition instead." }
  ],
  "explanation": "The bigram model's whole knowledge is 'what usually follows this one character'."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "loop-cloze",
  "level": "college",
  "purpose": "check",
  "text": "One training step: compute logits and loss, call loss.{{1}}() to get the gradients, then optimizer.{{2}}() to update the parameters.",
  "gaps": [
    { "answer": "backward" },
    { "answer": "step" }
  ],
  "explanation": "Forward, backward, step; zero_grad clears the old gradients before the next backward pass."
}
```

# Examples

The training loop of the bigram model in PyTorch:

```python
model = BigramLanguageModel(vocab_size)          # nn.Embedding(65, 65) inside
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-2)
for step in range(3000):
    xb, yb = get_batch("train")                  # (B, T) inputs and targets
    logits, loss = model(xb, yb)                 # loss starts near 4.7
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    optimizer.step()                             # loss ends near 2.5
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=1320s): building, training and sampling the bigram model in PyTorch (video, 0:22–0:42; college).
- [The spelled-out intro to neural networks and backpropagation](https://www.youtube.com/watch?v=VMj-3S1tku0): what `loss.backward()` computes, built from scratch (video, about 2.5 hours; college).

# Sources

Grounding: bigram model and training loop chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
