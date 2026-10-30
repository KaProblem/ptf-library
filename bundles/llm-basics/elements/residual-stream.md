---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/residual-stream
title: "Making depth trainable: residual connections, layer norm, dropout"
description: Deep stacks of blocks only train well with residual connections (a highway for the learning signal), layer norm (keeps numbers in range) and dropout (against memorising); then the model can be scaled up.
lang: en
levels: [highschool, college, expert]
objectives:
  - Explain why deep stacks are hard to train and how residual connections help.
  - Say in one sentence each what layer norm and dropout do.
tags: [llm, residual, layer-norm, dropout, scaling, optimisation]
about:
  - wikidata: Q43744058
    label: residual neural network
  - wikidata: Q140587694
    label: Layer normalization
  - wikidata: Q25339462
    label: dropout
requires:
  - ptf:el/llm-basics/transformer-block
leads_to:
  - ptf:el/llm-basics/gpt-end-to-end
duration_min: { highschool: 15, college: 25, expert: 15 }
simulators:
  - ref: ptf:sim/residual-stream@^1.2.0
    station: deep-signal
    levels: [highschool, college, expert]
    role: explore
    note: Have the learner set 40 layers with factor 0.8 before explaining; the collapse to almost nothing is the hook.
    use_when: the learner should see a signal fade through many layers before hearing the fix
  - ref: ptf:sim/residual-stream@^1.2.0
    station: layer-norm
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner wants to see numbers kept in range
  - ref: ptf:sim/residual-stream@^1.2.0
    station: dropout
    levels: [highschool, college, expert]
    role: explore
    use_when: the learner asks how a model avoids memorising
  - ref: ptf:sim/residual-stream@^1.2.0
    station: scale-up
    levels: [highschool, college, expert]
    role: practice
    use_when: the learner wants to compare model sizes
code:
  - ref: ptf:code/gpt-from-scratch@^1.0.0
    step: gpt
    levels: [college, expert]
    note: Run --preset tiny with and without --no-residual.
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T13:30:00Z }
status: draft
version: 0.4.0
license: CC-BY-SA-4.0
---

# Introduction

- More layers should mean a smarter model, but naive deep stacks stop learning.
- Three small tricks fix that and make large models possible.
- Afterwards the learner can explain residual connections, layer norm and dropout.

# Core

Stacking many blocks makes a model more capable but harder to train,
because the learning signal fades or explodes on its way back through all
the layers. Residual connections let each block add to a running stream
instead of replacing it, so the signal has a direct path. Layer norm keeps
each token's numbers in a stable range, and dropout stops the model from
memorising. With these, the model can be made deep and wide.

# Key facts

- Residual connection: x ← x + Block(x). The gradient of x + f(x) is 1 + f′(x), so a direct path with factor 1 runs from the loss to every layer ("gradient superhighway").
- Without residuals the gradient is a product over layers: 0.8^40 ≈ 0.0001, 1.2^40 ≈ 1,500.
- Blocks are initialised so that their contribution starts small; at the beginning the network behaves almost like the identity, and blocks "come online" during training.
- Each residual branch ends with a projection back to the model width (the attention output projection and the feed-forward's second matrix).
- Layer norm normalises each token's vector over its features to mean 0 and variance 1, then applies a learned scale γ and shift β. Unlike batch norm it does not depend on other examples in the batch.
- GPT-style models use pre-norm: x + Attn(LN(x)), x + FF(LN(x)), plus a final layer norm before the output layer (the original 2017 transformer applied it after the addition).
- Dropout randomly zeroes a fraction p of activations during training only (e.g. p = 0.2); at inference it is switched off. It reduces the gap between training and validation loss.
- Measured on a small Shakespeare character model: residual blocks 2.08, + layer norm 2.06; scaled to 6 layers, 6 heads, width 384, context 256, dropout 0.2: validation loss 1.48, about 10 million parameters, about 15 minutes on one A100 GPU.
- Parameter count ≈ 12 · n_layers · d² (plus embeddings): 6 × 384 → about 10.7 M; GPT-2 small (12 × 768) → 124 M; GPT-3 (96 × 12,288) → 175 B.

# Level: highschool

<!-- ptf:text v1 -->

Play "telephone" with 40 people: each one passes the message on a little
worse, say at 80 % of its strength. After 40 people, how much is left? 0.8
multiplied by itself 40 times is about 0.0001: practically nothing. That is
what happens to the learning signal in a deep model without help. It
travels backwards from the output through every layer, gets weaker at each
one, and the lower layers learn almost nothing.

The fix is a highway. Each block does not replace the information, it only
adds something to it: new = old + block(old). The original information, and
with it the learning signal, can travel straight through on the highway, and
each block just adds its small contribution.

Two more helpers keep things stable. Layer norm rescales each word's
numbers so they do not drift to huge or tiny values. Dropout switches off a
random part of the network at every training step, so the model cannot rely
on memorising the training text. With these tricks a small model with 6
layers learns to write surprisingly Shakespeare-like text, and the very
same recipe, made thousands of times bigger, gives models like GPT-3.

# Level: college

<!-- ptf:text v2 -->

Compute first: if each of 40 layers scales the gradient by 0.8, what reaches
the bottom layer? (0.8^40 ≈ 0.0001.) And with 1.2 per layer? (About 1,500.)

Backpropagation through L plain layers multiplies L Jacobians; their norms
compound, so gradients vanish or explode exponentially in depth and deep
stacks without help train worse than shallow ones. Residual connections
change each block to x ← x + Block(x), so ∂x_L/∂x_l = Π (I + J_k), which
always contains the identity term: the loss gradient reaches x_l
undiminished regardless of what the blocks do, and blocks initialised small
start out close to the identity. They add no parameters, only a path.

Layer norm, LN(x) = γ ⊙ (x − μ)/√(σ² + ε) + β with μ, σ over the feature
dimension of each token (not over the batch), keeps the scale of the
activations entering each sub-layer stable; pre-norm placement,
x + Attn(LN(x)), keeps the residual stream itself un-normalised, which
trains more stably. Dropout zeroes a random fraction p of activations
(attention weights and residual-branch outputs) during training only, as a
regulariser that narrows the gap between training and validation loss; at
inference it is off. Together they let a 6-layer, 384-wide model (about
10 M parameters, ≈ 12 · L · d²) reach a validation loss of 1.48.

# Level: expert

<!-- ptf:text v2 -->

Before reading: in a pre-norm transformer of L blocks, why does GPT-2 scale
the residual-branch output weights by 1/√(2L) at initialisation?

Depth multiplies Jacobians, so plain stacks suffer vanishing or exploding
gradients. Residual connections x ← x + f(x) give ∂x_L/∂x_l = Π (I + J_k),
an identity path from the loss to every layer, and make the network
approximately a sum of paths of different lengths. Layer norm (or RMSNorm)
normalises each token's features before every sub-layer, keeping inputs well
scaled while the stream itself accumulates; dropout on attention weights
and branch outputs regularises during training and is switched off at
inference.

The residual stream view treats the d-dimensional stream as a shared
communication channel that every attention head and MLP reads from (via LN
and an input projection) and writes to (via an output projection); it is the
basis of circuit-level interpretability. Because 2L branches add to the
stream, its variance grows with depth, hence the 1/√(2L) initialisation.
Other practical details: RMSNorm instead of LayerNorm in many recent models,
no dropout for large pretraining runs where data is not repeated, and width,
depth and token count chosen with compute-optimal scaling laws (roughly 20
tokens per parameter in the Chinchilla analysis).

# Misconceptions

- **residual-adds-capacity**: Residual connections make the model bigger → they add no parameters; they make deep models trainable.
- **depth-always-helps**: Adding layers always improves a model → without residuals and normalisation, deeper models often train worse.
- **dropout-at-inference**: Dropout is also active when the model is used → it is only used during training.
- **layernorm-across-batch**: Layer norm normalises over the batch → it normalises each token's features separately; batch norm is the one that uses the batch.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "telephone",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "depth-always-helps",
  "question": "A signal loses 20 % at each of 40 layers (it is multiplied by 0.8 each time). Roughly what fraction is left at the bottom? Give your answer in percent.",
  "answer": 0.013,
  "tolerance": 0.05,
  "unit": "%",
  "explanation": "0.8^40 ≈ 0.00013, about 0.01 %. Practically nothing arrives, which is why deep models need residual connections."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-residual",
  "level": "highschool",
  "purpose": "check",
  "misconception": "residual-adds-capacity",
  "question": "Why do residual connections help train deep models?",
  "options": [
    { "text": "The learning signal gets a direct path through all layers", "correct": true, "feedback": "Right. Each block only adds to the stream, so the signal can pass straight through." },
    { "text": "They add many extra parameters", "correct": false, "feedback": "No. A residual connection is just an addition and has no parameters." },
    { "text": "They skip useless blocks permanently", "correct": false, "feedback": "No. Every block is still used; it adds its output to the stream." }
  ],
  "explanation": "x + Block(x) has derivative 1 + Block′(x): the 1 is the highway."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "dropout-when",
  "level": "college",
  "purpose": "check",
  "misconception": "dropout-at-inference",
  "question": "When is dropout active?",
  "options": [
    { "text": "Only during training", "correct": true, "feedback": "Right. At inference every unit is used." },
    { "text": "During training and inference", "correct": false, "feedback": "No. Random zeroing at inference would only make outputs noisier." },
    { "text": "Only at inference", "correct": false, "feedback": "No, the point is to regularise training." }
  ],
  "explanation": "model.train() enables dropout; model.eval() disables it."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "layernorm-by-hand",
  "level": "college",
  "purpose": "transfer",
  "title": "Layer norm by hand",
  "intro": "One token's vector is x = (2, 4, 6, 8). γ = 1, β = 0, ε ignored.",
  "columns": ["Step", "Value"],
  "rows": [["Mean μ", "5"], ["Variance σ²", "(9 + 1 + 1 + 9) / 4 = 5"], ["σ", "√5 ≈ 2.236"], ["(x − μ) / σ", "(−1.34, −0.45, 0.45, 1.34)"]],
  "result": { "label": "Normalised vector", "value": "(−1.34, −0.45, 0.45, 1.34)" },
  "explanation": "Mean 0, variance 1, order of the features kept. γ and β then let the model rescale and shift if useful."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "param-count",
  "level": "college",
  "purpose": "transfer",
  "question": "Using params ≈ 12 · layers · width², estimate the parameters of a model with 12 layers and width 768, in millions.",
  "answer": 85,
  "tolerance": 10,
  "unit": "million",
  "explanation": "12 · 12 · 768² ≈ 84.9 M. With token and position embeddings (50,257 × 768 + 1,024 × 768 ≈ 39 M) you get GPT-2 small's 124 M."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "pre-norm",
  "level": "expert",
  "purpose": "transfer",
  "question": "Why do GPT-style models put layer norm before each sub-layer (pre-norm) rather than after the residual addition (post-norm)?",
  "rubric": ["Pre-norm keeps an un-normalised identity path in the residual stream", "Gradients flow through the identity path unchanged", "Post-norm puts LN on the main path, rescaling gradients at every layer", "Pre-norm trains deep models stably with less warm-up"],
  "sample_answer": "With pre-norm, x + f(LN(x)), the residual stream itself is never normalised, so there is a clean identity path from the loss to every layer. Post-norm, LN(x + f(x)), places the normalisation on that path, which rescales gradients at each layer and makes deep models unstable without careful learning-rate warm-up.",
  "explanation": "Pre-norm preserves the gradient highway that residual connections create; a final LN before the output layer is then needed."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "dropout-once",
  "level": "highschool",
  "purpose": "check",
  "misconception": "dropout-at-inference",
  "question": "Which sentence describes dropout correctly?",
  "options": [
    {
      "text": "During training, random parts of the network are switched off at every step, so the model cannot just memorise the text",
      "correct": true,
      "feedback": "Right. When the model is used later, nothing is switched off."
    },
    {
      "text": "It switches off random parts every time you chat with the model, to make answers creative",
      "correct": false,
      "feedback": "No. Dropout is only used during training; creativity comes from sampling (temperature)."
    },
    {
      "text": "It removes the layers that are not needed, to make the model smaller",
      "correct": false,
      "feedback": "No. All layers stay; dropout only skips random parts during individual training steps."
    }
  ],
  "explanation": "Dropout fights memorising during training. Layer norm, the other helper, keeps the numbers in a stable range."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "residual-init",
  "level": "expert",
  "purpose": "check",
  "misconception": "residual-adds-capacity",
  "question": "Explain why residual connections make depth trainable and why GPT-2 scales residual-branch output weights by 1/√(2L) at initialisation.",
  "rubric": [
    "The Jacobian of x + f(x) contains the identity, so gradients have a direct path to every layer",
    "Residuals add no parameters",
    "Each of the 2L branches adds to the stream, so its variance grows linearly with depth",
    "Scaling by 1/√(2L) keeps the stream's variance roughly constant at initialisation"
  ],
  "sample_answer": "∂x_L/∂x_l = Π (I + J_k) always contains I, so the signal does not vanish however deep the stack is. But 2L branches (attention and MLP per block) each add a random contribution, so the stream variance grows with L; scaling their output weights by 1/√(2L) keeps it near 1 at the start.",
  "explanation": "The highway keeps gradients alive; the initialisation keeps the highway from overflowing."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=5220s): residual connections, layer norm, dropout and scaling the model up to a validation loss of 1.48 (video, 1:27–1:42; college).
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385): the paper that introduced residual connections (paper; expert).
- [Layer Normalization](https://arxiv.org/abs/1607.06450): the original layer norm paper (paper; expert).

# Sources

Grounding: residual connections, layer norm, dropout and scaling-up chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
