---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/backpropagation
title: Training neural networks with backpropagation
description: Backpropagation passes the error backwards through the network with the chain rule to get every weight's gradient; vanishing and exploding gradients, dead ReLUs and dropout are what matters in practice.
lang: en
levels: [highschool, college]
objectives:
  - id: chain-rule
    text: Explain how backpropagation passes the error backwards layer by layer, and compute the gradients of a two-weight chain.
  - id: gradient-problems
    text: Recognise vanishing gradients, exploding gradients and dead ReLU units, and name a fix for each.
  - id: dropout
    text: Explain how dropout regularizes a network, and compute how many units are active and how outputs are scaled.
tags: [machine-learning, neural-networks, backpropagation, chain-rule, vanishing-gradient, dropout]
about:
  - wikidata: Q798503
    label: backpropagation
  - wikidata: Q18358230
    label: vanishing gradient problem
  - wikidata: Q25339462
    label: dropout
requires:
  - ptf:el/ml-foundations/neural-networks
leads_to:
  - ptf:el/ml-foundations/multiclass-classification
duration_min: { highschool: 35, college: 40 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Neural networks: training using backpropagation"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a team of three passes a parcel down a line, and it arrives 6 minutes late. The last person says "I lost 1 minute", the middle one "I lost 2", the first "I lost 3". To improve next time, everyone needs to know their own share of the delay. How do you find it when each person's delay also slowed down the next?
- A network has thousands or billions of weights. Gradient descent needs to know, for each of them, how much the loss would change if it moved. Backpropagation computes all of those shares in one backward sweep, and it is the reason deep learning is practical at all.
- Afterwards the learner can follow the error backwards through a small network, compute its gradients, and recognise and fix the typical ways training a deep network goes wrong.

# Core

Training a neural network is gradient descent: every weight moves against
its gradient ∂L/∂w. Backpropagation computes all these gradients
efficiently. A forward pass computes and stores each layer's values; then
the error signal ∂L/∂(output) is passed backwards, and at every layer the
chain rule multiplies it by that layer's local derivative to get the
gradients of the layer's weights and the signal for the layer below.
Because the backward signal is a product of many local derivatives, it
can shrink towards zero in deep networks (vanishing gradients, typical
with sigmoid or tanh) or grow without bound (exploding gradients); ReLU,
careful weight initialization, normalization and gradient clipping help.
A ReLU unit whose input is negative for every example gets zero gradient
and stops learning (a dead unit), often after too large a learning rate.
Dropout regularizes a network by switching off a random share of units at
every training step, so no unit can rely on specific others; at inference
all units are used.

# Key facts

- Chain: h = ReLU(w₁x), y′ = w₂h, loss L = (y′ − y)². With x = 2, w₁ = 1.5, w₂ = −2, y = 0: h = 3, y′ = −6, L = 36.
- Backward: ∂L/∂y′ = 2(y′ − y) = −12; ∂L/∂w₂ = ∂L/∂y′ · h = −36; ∂L/∂h = ∂L/∂y′ · w₂ = 24; ∂L/∂w₁ = ∂L/∂h · ReLU′ · x = 24 · 1 · 2 = 48.
- One step with α = 0.01: w₁ = 1.5 − 0.48 = 1.02, w₂ = −2 + 0.36 = −1.64. New prediction: ReLU(1.02 · 2) · (−1.64) ≈ −3.35, loss ≈ 11.2 (down from 36).
- Cost: one backward pass costs about as much as one to two forward passes, for all weights at once, which is why gradient descent on millions of weights is feasible.
- Vanishing: sigmoid′ ≤ 0.25; a product of 10 such factors is at most 0.25¹⁰ ≈ 9.5 · 10⁻⁷. Early layers then barely learn.
- Exploding: a factor of 1.5 per layer over 20 layers gives 1.5²⁰ ≈ 3,325. Symptoms: loss spikes or NaN. Fixes: gradient clipping, lower learning rate, normalization, better initialization.
- Dead ReLU: if b + w · x < 0 for every input, ReLU′ = 0 everywhere and the unit never recovers. Fixes: lower learning rate, leaky ReLU.
- Dropout rate 0.2 on a layer of 100 units: on average 80 are active per step; with inverted dropout the active outputs are multiplied by 1 / (1 − 0.2) = 1.25 so the expected sum stays the same, and nothing is dropped at inference.

# Level: highschool

<!-- ptf:text v1 -->

Think of a tiny network with just two weights: the input x goes through
the first weight and a ReLU to a hidden value h, and h goes through the
second weight to the prediction. Take x = 2, w₁ = 1.5, w₂ = −2, and say
the right answer is 0. Forward: h = ReLU(1.5 · 2) = 3, prediction
= −2 · 3 = −6. The loss (−6 − 0)² is 36.

To improve, each weight needs to know: "if I change a little, how much
does the loss change?" Start at the end. The prediction is 6 too low, so
the loss would fall if the prediction went up; the strength of that pull
is 2 · (−6 − 0) = −12. Now go back one step at a time:

- w₂ was multiplied by h = 3, so its share is −12 · 3 = −36.
- The signal reaching h is −12 times w₂ = −2, which is 24.
- w₁ was multiplied by x = 2 (and ReLU let the value through), so its share is 24 · 2 = 48.

That backward walk is **backpropagation**: the error is passed from the
output back to the input, and each layer multiplies it by its own local
effect. Then gradient descent moves each weight a little against its
share. With step size 0.01, w₁ becomes 1.02 and w₂ becomes −1.64, and the
loss drops from 36 to about 11.

In a deep network the backward signal is multiplied many times. If the
factors are small (as with the sigmoid, never more than 0.25), it shrinks
to almost nothing before reaching the first layers: they stop learning
(**vanishing gradients**). If the factors are larger than 1, it can grow
huge and training blows up (**exploding gradients**). ReLU helps against
vanishing, and clipping the gradient helps against exploding. A ReLU node
that only ever gets negative inputs outputs 0 and passes no signal back:
it is **dead**.

A clever trick against overfitting is **dropout**: during each training
step, switch off a random share of the nodes, say 20 %. The network
cannot rely on any single node and learns more robust features. When it
is used for real, all nodes are on.

# Level: college

<!-- ptf:text v1 -->

For a computation graph, the chain rule gives ∂L/∂θ as a sum over paths
of products of local derivatives. Reverse-mode differentiation
(backpropagation) evaluates it efficiently: the forward pass stores each
intermediate value, and the backward pass propagates the adjoint
δ = ∂L/∂(node) from the output to the inputs. For a layer
z = Wa_prev + b, a = φ(z): δ_z = δ_a ⊙ φ′(z), ∂L/∂W = δ_z a_prevᵀ,
∂L/∂b = δ_z, and δ_(a_prev) = Wᵀ δ_z. The whole gradient costs a small
constant times a forward pass, independent of the number of parameters.

Worked chain: x = 2, w₁ = 1.5, w₂ = −2, target 0, h = ReLU(w₁x) = 3,
y′ = −6, L = 36. δ_y′ = 2(y′ − y) = −12; ∂L/∂w₂ = δ_y′ · h = −36;
δ_h = δ_y′ · w₂ = 24; ReLU′(3) = 1; ∂L/∂w₁ = δ_h · x = 48. With α = 0.01
the loss falls from 36 to ≈ 11.2 after one step.

Deep networks multiply many Jacobians: δ at layer 1 is a product of L
factors Wₗᵀ diag(φ′(zₗ)). If their norms are below 1 the signal decays
geometrically (sigmoid′ ≤ 0.25 gives ≤ 0.25¹⁰ ≈ 10⁻⁶ after ten layers);
above 1 it grows (1.5²⁰ ≈ 3,325). Remedies target the factors: ReLU-type
activations (φ′ = 1 on the active side), variance-preserving
initialization (He, Glorot), normalization layers (batch or layer norm),
residual connections that add an identity path, and for explosion
gradient clipping and a smaller α. ReLU's zero gradient on the negative
side can kill units whose pre-activations go negative for all inputs,
often after a large update; leaky ReLU or a smaller α prevents it.

Dropout with rate p samples a mask m ~ Bernoulli(1 − p) per unit and step,
uses a ⊙ m / (1 − p) in training (inverted dropout keeps E[output]
unchanged) and the full network at inference. It approximates averaging
an ensemble of exponentially many thinned networks and prevents
co-adaptation; typical p is 0.1 to 0.5, and because it is only active in
training, training loss is usually above validation loss with dropout on.

# Misconceptions

- **backprop-is-training**: Backpropagation is the training algorithm → backpropagation only computes the gradients; gradient descent (or a variant) uses them to update the weights.
- **backprop-one-weight-at-a-time**: Each weight's gradient needs its own pass through the network → one backward pass gives all gradients at once.
- **vanishing-means-converged**: Tiny gradients in early layers mean those layers are done → they may simply not receive a signal; the network is stuck, not finished.
- **dropout-at-inference**: Dropout also switches units off when the model is used → it is only active during training.
- **deeper-always-trains**: A deeper network always trains as easily as a shallow one → without suitable activations, initialization, normalization or residual paths, deep networks suffer from vanishing or exploding gradients.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "parcel-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "question": "Three people pass a parcel along a line, and it arrives late. To improve, each person needs to know how much their own part affected the final delay. Where is the best place to start working that out?",
  "options": [
    { "text": "At the end, where the delay is measured, then go back person by person", "correct": true, "feedback": "Yes: each person's effect passes through everyone after them, so you work backwards." },
    { "text": "At the first person, because they started it", "correct": false, "feedback": "The first person's effect depends on everyone after them, which you do not know yet." },
    { "text": "Give everyone the same share", "correct": false, "feedback": "Then nobody knows what to change." }
  ],
  "explanation": "Backpropagation does exactly this: it starts at the loss and passes each layer's share of the error backwards."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "backprop-chain",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["chain-rule"],
  "misconception": "backprop-one-weight-at-a-time",
  "title": "Backpropagation through two weights",
  "intro": "x = 2, w₁ = 1.5, w₂ = −2, target 0. h = ReLU(w₁ · x), prediction = w₂ · h, loss = (prediction − 0)².",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Hidden value h", "ReLU(1.5 · 2)", "3"],
    ["Prediction", "−2 · 3", "-6"],
    ["Pull at the output", "2 · (−6 − 0)", "-12"],
    ["Gradient of w₂", "−12 · h", "-36"],
    ["Signal at h", "−12 · w₂", "24"],
    ["Gradient of w₁", "24 · x", "48"]
  ],
  "result": { "label": "Gradient of w₁", "value": "48" },
  "explanation": "The error signal is multiplied by each layer's local factor on the way back; one backward sweep gives both gradients."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "after-step",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["chain-rule"],
  "misconception": "backprop-is-training",
  "question": "In the same example the gradients are 48 for w₁ = 1.5 and −36 for w₂ = −2. With learning rate 0.01, what is w₂ after one gradient descent step?",
  "answer": -1.64,
  "tolerance": 0,
  "explanation": "w₂ = −2 − 0.01 · (−36) = −1.64. Backpropagation gave the gradient; gradient descent made the step."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "vanishing-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["gradient-problems"],
  "misconception": "vanishing-means-converged",
  "question": "In a network with 10 sigmoid layers, the backward signal is multiplied by at most 0.25 at every layer. What happens to the first layers?",
  "options": [
    { "text": "They get a signal of less than one millionth of the original and barely learn", "correct": true, "feedback": "Yes: 0.25¹⁰ ≈ 0.00000095. That is the vanishing gradient problem." },
    { "text": "They learn fastest, because they are closest to the input", "correct": false, "feedback": "Being far from the loss means the signal has been shrunk many times." },
    { "text": "They have finished learning", "correct": false, "feedback": "A tiny gradient here means no signal arrives, not that the layer is done." }
  ],
  "explanation": "Products of many small factors vanish. ReLU (factor 1 when active) helps."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "symptoms-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["gradient-problems"],
  "question": "Which pairing of symptom and cause is right?",
  "options": [
    { "text": "The loss suddenly becomes NaN → exploding gradients; clip gradients or lower the learning rate", "correct": true, "feedback": "Yes: weights blew up to infinity." },
    { "text": "A ReLU node outputs 0 for every example → it is learning very well", "correct": false, "feedback": "That node is dead: no output, no gradient, no learning." },
    { "text": "The last layer learns but the first layers hardly change → exploding gradients", "correct": false, "feedback": "Signals that shrink on the way back are vanishing gradients." }
  ],
  "explanation": "NaN/spikes → exploding; first layers stuck → vanishing; always-zero ReLU → dead unit."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "dropout-count",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["dropout"],
  "misconception": "dropout-at-inference",
  "question": "A layer has 250 nodes and uses dropout with rate 0.2 during training. On average, how many nodes are active in one training step?",
  "answer": 200,
  "tolerance": 0,
  "explanation": "80 % of 250 = 200 stay on. When the trained model is used, all 250 are on."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "backprop-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["chain-rule", "dropout"],
  "misconception": "backprop-is-training",
  "question": "What does backpropagation compute?",
  "options": [
    { "text": "For every weight, how much the loss would change if that weight changed slightly (its gradient)", "correct": true, "feedback": "Yes: the update itself is gradient descent." },
    { "text": "The network's prediction for an input", "correct": false, "feedback": "That is the forward pass." },
    { "text": "Which nodes to switch off during training", "correct": false, "feedback": "That is dropout, chosen at random." }
  ],
  "explanation": "Forward pass → prediction and loss; backward pass → all gradients; gradient descent → update."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "layer-grads-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["chain-rule"],
  "question": "For a layer z = W a + b, a_out = φ(z), the backward pass receives δ_out = ∂L/∂a_out. Which two expressions are correct?",
  "options": [
    { "text": "∂L/∂W = (δ_out ⊙ φ′(z)) aᵀ", "correct": true, "feedback": "Yes: the local gradient times the layer's input." },
    { "text": "∂L/∂a = Wᵀ (δ_out ⊙ φ′(z))", "correct": true, "feedback": "Yes: this is the signal passed to the layer below." },
    { "text": "∂L/∂W = δ_out · W", "correct": false, "feedback": "The gradient of W involves the layer's input a, not W itself." },
    { "text": "∂L/∂b = 0, because biases do not depend on the input", "correct": false, "feedback": "∂L/∂b = δ_out ⊙ φ′(z)." }
  ],
  "explanation": "Backprop per layer: multiply by φ′, take the outer product with the input for W, multiply by Wᵀ for the layer below."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "loss-after-step-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["chain-rule"],
  "question": "After the step w₁ = 1.02, w₂ = −1.64 (from x = 2, target 0, h = ReLU(w₁x), y′ = w₂h, L = y′²), what is the new loss? (one decimal)",
  "answer": 11.2,
  "tolerance": 0.1,
  "explanation": "h = 2.04, y′ = −1.64 · 2.04 ≈ −3.346, L ≈ 11.2 (from 36)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "fixes-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["gradient-problems"],
  "misconception": "deeper-always-trains",
  "question": "A 40-layer network with tanh activations trains: the loss falls slowly, and gradient norms in the first layers are about 10⁻⁸ of those in the last. Which two changes address the cause?",
  "options": [
    { "text": "Switch to ReLU-type activations with He initialization", "correct": true, "feedback": "Yes: factors near 1 on the active side and variance-preserving weights." },
    { "text": "Add residual connections (or normalization layers)", "correct": true, "feedback": "Yes: an identity path lets gradients reach early layers directly." },
    { "text": "Apply gradient clipping", "correct": false, "feedback": "Clipping caps large gradients; it does not enlarge vanishing ones." },
    { "text": "Increase dropout to 0.5", "correct": false, "feedback": "Dropout regularizes; it does not fix gradient flow." }
  ],
  "explanation": "Vanishing gradients: fix the per-layer factors (activation, init, normalization) or bypass them (residuals)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "inverted-dropout-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["dropout"],
  "misconception": "dropout-at-inference",
  "question": "A layer uses inverted dropout with p = 0.2. Which two statements are correct?",
  "options": [
    { "text": "In training, kept activations are multiplied by 1.25, so each activation's expected value is unchanged", "correct": true, "feedback": "1 / (1 − 0.2) = 1.25; E[a · m / 0.8] = a." },
    { "text": "At inference the layer uses all units with no scaling", "correct": true, "feedback": "Yes: the scaling was already done in training." },
    { "text": "At inference 20 % of units are dropped at random to stay consistent with training", "correct": false, "feedback": "That would add noise to every prediction; dropout is training-only." },
    { "text": "Dropout makes the training loss lower than it would be without it", "correct": false, "feedback": "Training with dropout is harder: training loss is higher." }
  ],
  "explanation": "Inverted dropout: scale in training, do nothing at inference."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "debug-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["gradient-problems", "dropout", "chain-rule"],
  "question": "You train a deep ReLU network. After a few hundred steps with a high learning rate the loss stops improving, and you find that 60 % of the units in the second layer output 0 for every training example. Later, after you lower the learning rate, training works but validation loss is much worse than training loss. Explain both problems and what you would do.",
  "rubric": [
    "First problem: dead ReLUs; large updates pushed pre-activations negative for all inputs, so ReLU′ = 0 and they never recover",
    "Fixes: lower learning rate (or warm-up), leaky ReLU/GELU, re-initialize, normalization",
    "Second problem: overfitting (gap between training and validation loss)",
    "Fixes: dropout, L2/weight decay, early stopping, more data or augmentation"
  ],
  "sample_answer": "The high learning rate made large updates that pushed the second layer's pre-activations below 0 for every input. Those ReLUs output 0, their gradient is 0, and they cannot recover: dead units. I would restart with a lower rate or a warm-up, maybe use leaky ReLU and normalization. The later gap is overfitting: add dropout (say 0.2 to 0.3), weight decay and early stopping on validation loss, and get more data if possible.",
  "explanation": "Optimization problems (dead units) and generalization problems (overfitting) look different and need different fixes."
}
```

# Tutor notes

- Do the two-weight chain by hand, on paper, before any formula; then point out that the same "multiply on the way back" works for any number of layers.
- Highschool learners do not need the word "derivative" for this step; "how much the loss changes if this weight changes a little" is enough.
- College: connect δ_(a_prev) = Wᵀ δ_z to the vanishing-gradient argument; the product of factors is the whole story.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Neural networks" (training using backpropagation), https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
