---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/gpt-end-to-end
title: The whole machine
description: All parts of a GPT in one picture, from text to the next token, what training changes, and how generation repeats the whole pipeline once per token inside a fixed context window.
lang: en
levels: [highschool, college, expert]
objectives:
  - Trace one prediction through all parts of a GPT, from text to the next token.
  - Say which parts are learned in training and which are fixed, and what the context window limits.
tags: [llm, gpt, transformer, generation, context-window, parameters, summary]
about:
  - wikidata: Q116777014
    label: generative pre-trained transformer
  - wikidata: Q125619872
    label: context window
requires:
  - ptf:el/llm-basics/residual-stream
leads_to:
  - ptf:el/llm-basics/from-babbler-to-assistant
duration_min: { highschool: 20, college: 25, expert: 15 }
simulators:
  - ref: ptf:sim/gpt-pipeline@^1.0.0
    station: order
    levels: [highschool, college, expert]
    role: check
    use_when: the learner should check whether they can put the parts in order
  - ref: ptf:sim/gpt-pipeline@^1.0.0
    station: trace
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner needs to follow one familiar sentence through the pipeline
  - ref: ptf:sim/gpt-pipeline@^1.0.0
    station: shapes
    levels: [college, expert]
    role: practice
    use_when: the learner wants the exact sizes of the numbers at each stage (college level and above)
  - ref: ptf:sim/gpt-pipeline@^1.0.0
    station: window
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner asks why a model forgets the beginning of a long text
  - ref: ptf:sim/gpt-pipeline@^1.0.0
    station: learned
    levels: [highschool, college, expert]
    role: check
    use_when: the learner should check which parts training changes
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: gpt
    levels: [college, expert]
    note: Train the laptop preset and keep out/gpt.pt.
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: generate
    levels: [college, expert]
    note: Use --explain to watch the probabilities for each new character.
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

- All the pieces are in place; this step puts them into one picture.
- It is the moment to check that the whole pipeline makes sense.
- Afterwards the learner can explain how a GPT produces text, end to end.

# Core

A GPT is one pipeline that runs once per new token: the tokenizer turns
text into ids; token and position embeddings turn ids into vectors; a stack
of transformer blocks lets every position gather what it needs from earlier
positions and process it; a final layer turns the last position's vector
into a score for every token; softmax makes probabilities; one token is
sampled and appended. Training changes only the numbers inside the
embeddings, blocks and final layer, using the loss on the real next token.
The model never sees more than its context window.

# Key facts

- Pipeline and shapes for a batch of B sequences of T tokens, width C, vocabulary V: ids (B, T) → embeddings (B, T, C) → N blocks, shape unchanged (B, T, C) → final layer norm and linear layer → logits (B, T, V) → for generation only the last position (B, V) → softmax → sample (B, 1).
- Inside one block (pre-norm): x = x + MultiHeadAttention(LayerNorm(x)); x = x + FeedForward(LayerNorm(x)). Attention weights per head have shape (B, T, T); each head outputs (B, T, C / heads); the heads are concatenated back to C.
- Learned parameters: token embedding table, position embedding table, query/key/value and projection matrices, feed-forward layers, layer norm scale and shift, final linear layer. Fixed rules: tokenizer, causal mask, softmax, sampling (temperature and top-k are settings, not learned).
- Training predicts all T next tokens of every sequence in parallel (the mask makes that honest); generation produces one token per full forward pass.
- Context window (block_size): the input is cropped to the last block_size tokens because there are only that many position embeddings. Anything earlier has no influence on the next token.
- The small Shakespeare model: 6 blocks, 6 heads, C = 384, context 256, dropout 0.2, about 10.8 million parameters, validation loss about 1.48. A laptop-sized version (4 blocks, C = 128, context 64, 0.8 million parameters) trains on a 4-core CPU in about 7 minutes and reaches about 1.68.
- Temperature divides the logits before softmax: below 1 sharpens the distribution (safer, more repetitive), above 1 flattens it (more varied, more mistakes). Top-k samples only among the k most likely tokens.

# Level: highschool

<!-- ptf:text v1 -->

Start by putting the parts in order in the simulator, without help. If you
get stuck, ask yourself what each part needs as input.

Here is the journey of one prediction. The model has read "to be or no".
First every character becomes a number. Each number is swapped for a list
of numbers, a vector, that says what the character is and where it stands.
Then the blocks do their work: in each one, every position looks back at
the earlier ones and takes what it needs, then thinks about it on its own.
After all blocks, the vector at the last position, the "o", knows a lot
about "to be or n". A last layer turns it into a score for every possible
character, softmax turns the scores into probabilities, and "t" comes out
on top. A weighted die picks one. It is appended, and everything starts
again from the beginning for the next character.

Two things to keep. First, the model writes one character per full run,
never a whole sentence at once. Second, it only sees a fixed number of
recent characters. What falls out of that window is gone.

And what did training change? Only the numbers in the tables and layers.
The rules, like the mask or the die, stay the same forever.

# Level: college

<!-- ptf:text v1 -->

Let the learner step through the trace station with shapes switched on and
name each shape before revealing it; then do the shapes quiz for a batch.
The invariant worth noticing: B and T never change inside the model; only
the last dimension does, from ids to C, to C / heads inside each head, back
to C, and finally to V.

Then connect the code. `GPT.forward` is: embeddings, `self.blocks(x)`,
`self.ln_f`, `self.lm_head`, loss on all positions. `generate` is a loop
around the same forward pass: crop to `block_size`, keep `logits[:, -1, :]`,
divide by temperature, softmax, `torch.multinomial`, `torch.cat`. Training
computes T predictions per sequence in one pass; generation throws away all
but the last one, which is why it is so much slower per token. (Real
systems cache keys and values of earlier positions to avoid recomputing
them; that is an optimisation, not a change to the model.)

# Level: expert

<!-- ptf:text v1 -->

A useful exercise is a parameter budget: for the 6 × 384 model, each block
holds about 12 · 384² ≈ 1.77 M weights (4 · C² in attention, 8 · C² in the
feed-forward layer), six blocks about 10.6 M, plus embeddings and head;
compare with the printed count of 10.8 M. Then ask where compute goes per
generated token: the blocks dominate, attention adds a term linear in the
context length per token (quadratic over a whole sequence).

Discuss what this architecture cannot do by itself: it has no memory beyond
the window, no notion of truth beyond the training distribution, and no
goal other than continuing the document. Those gaps are what tokenisation
at scale, fine-tuning and reinforcement learning from human feedback
address in the next element.

# Misconceptions

- **generates-all-at-once**: The model writes a whole answer in one go → it predicts one token per forward pass and repeats.
- **model-remembers-everything**: The model remembers the whole conversation → it only sees the last block_size tokens; anything earlier has no effect.
- **mask-is-learned**: The causal mask is learned during training → it is a fixed rule; only the attention scores inside it are learned.
- **softmax-before-blocks**: Probabilities are computed early and then refined → softmax comes once, at the very end, after the final linear layer.
- **attention-weights-shape**: Attention weights have one number per position and channel → they have one number per pair of positions, (T, T) per head.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "passes",
  "level": "highschool",
  "purpose": "check",
  "misconception": "generates-all-at-once",
  "question": "To write 100 characters, how often does the model run through all its blocks?",
  "options": [
    { "text": "100 times, once per character", "correct": true, "feedback": "Right. One next token per pass." },
    { "text": "Once; it writes all 100 at the same time", "correct": false, "feedback": "No. It never plans the whole text in one go." },
    { "text": "As often as it has blocks", "correct": false, "feedback": "No. The number of passes depends on the length of the output." }
  ],
  "explanation": "Generation is a loop around the whole pipeline: predict, append, repeat."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "window",
  "level": "highschool",
  "purpose": "check",
  "misconception": "model-remembers-everything",
  "question": "A model with a context of 8 characters has written 'to be or not to be'. Which characters does it use to predict the next one?",
  "options": [
    { "text": "Only the last 8: 'ot to be'", "correct": true, "feedback": "Right. Everything before the window is invisible." },
    { "text": "All 18 characters", "correct": false, "feedback": "No. Only the last 8 go in." },
    { "text": "A summary of the beginning plus the last 8", "correct": false, "feedback": "No. Nothing is summarised; the rest is simply cut off." }
  ],
  "explanation": "The input is cropped to the last block_size tokens."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "learned-parts",
  "level": "highschool",
  "purpose": "check",
  "misconception": "mask-is-learned",
  "question": "Which of these does training change?",
  "options": [
    { "text": "The embedding tables and the weights in the blocks", "correct": true, "feedback": "Right. Those are the parameters." },
    { "text": "The causal mask", "correct": false, "feedback": "No. The mask is a fixed rule." },
    { "text": "The softmax formula", "correct": false, "feedback": "No. Softmax is fixed; it has no parameters." }
  ],
  "explanation": "Training adjusts parameters: embeddings, attention and feed-forward weights, layer norm scale and shift, the final linear layer."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "logits-shape",
  "level": "college",
  "purpose": "check",
  "misconception": "attention-weights-shape",
  "question": "Batch B = 4, context T = 8, width C = 32, vocabulary V = 65. What is the shape of the logits that the model returns in training?",
  "options": [
    { "text": "(4, 8, 65)", "correct": true, "feedback": "Right. One score per vocabulary entry, at every position of every sequence." },
    { "text": "(4, 65)", "correct": false, "feedback": "That is what generation keeps (last position only); training uses all positions." },
    { "text": "(4, 8, 32)", "correct": false, "feedback": "That is the shape before the final linear layer." }
  ],
  "explanation": "Training predicts the next token at every position; generation keeps only logits[:, -1, :]."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "pipeline-cloze",
  "level": "college",
  "purpose": "check",
  "misconception": "softmax-before-blocks",
  "text": "ids → token + position {{1}} → transformer {{2}} → final linear layer → {{3}} → sample.",
  "gaps": [
    { "answer": "embeddings", "accepted": ["embedding"] },
    { "answer": "blocks", "accepted": ["block"] },
    { "answer": "softmax" }
  ],
  "explanation": "Softmax comes once, at the very end."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "block-params",
  "level": "expert",
  "purpose": "transfer",
  "question": "About how many weights (in millions) does one transformer block with width C = 384 hold, using 12 · C²?",
  "answer": 1.77,
  "tolerance": 0.2,
  "explanation": "12 · 384² ≈ 1.77 million: 4 · C² in attention (query, key, value, projection) and 8 · C² in the feed-forward layer with inner width 4C."
}
```

# Examples

The generation loop of the finished model:

```python
@torch.no_grad()
def generate(model, idx, max_new_tokens, temperature=1.0):
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -block_size:]           # crop to the context window
        logits = model(idx_cond)[:, -1, :]        # (B, V): only the last position
        probs = F.softmax(logits / temperature, dim=-1)
        idx_next = torch.multinomial(probs, num_samples=1)
        idx = torch.cat((idx, idx_next), dim=1)   # append and run again
    return idx
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=5220s): scaling up the model, the final code and a walk through nanoGPT (video, 1:27–1:42; college).
- [nanoGPT](https://github.com/karpathy/nanoGPT): a compact GPT implementation that can train GPT-2-sized models (code; expert).

# Sources

Grounding: final model and generation chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
