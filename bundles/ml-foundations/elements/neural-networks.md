---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/neural-networks
title: Neural networks
description: Layers of nodes, each a weighted sum followed by a non-linear activation such as ReLU, let a model learn non-linear patterns and feature combinations by itself.
lang: en
levels: [highschool, college]
objectives:
  - id: why-nonlinear
    text: Explain why stacking linear layers without activation functions is still a linear model, and what activation functions add.
  - id: forward-pass
    text: Compute the output of a tiny network with ReLU for given inputs, weights and biases.
  - id: architecture
    text: Describe a network's input, hidden and output layers and the common activations (ReLU, sigmoid, tanh), and count its weights and biases.
tags: [machine-learning, neural-networks, deep-learning, activation-function, relu, hidden-layer]
about:
  - wikidata: Q192776
    label: artificial neural network
  - wikidata: Q4677469
    label: activation function
  - wikidata: Q7303176
    label: rectifier
requires:
  - ptf:el/ml-foundations/overfitting-regularization
leads_to:
  - ptf:el/ml-foundations/backpropagation
duration_min: { highschool: 35, college: 35 }
figures:
  - id: tiny-network
    objectives: [forward-pass, architecture]
    use_when: when the learner computes the forward pass of the 2-2-1 network, to see which weight sits where
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Neural networks: nodes and hidden layers, activation functions"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a plant grows well when it gets enough water, but not too much: both too little and too much harm it. Can one straight line "more water → more growth" describe that? How would you describe it with two simple rules instead?
- Linear models only add up their features. Real patterns bend, have thresholds and depend on combinations. Before, a human had to add bins or feature crosses by hand. A neural network learns such features on its own, which is why it can read images, speech and text.
- Afterwards the learner can explain why networks need activation functions, compute a forward pass by hand, and describe and size a simple network.

# Core

A neural network is built from nodes (neurons) arranged in layers. Each
node computes a weighted sum of its inputs plus a bias and passes the
result through an activation function; its output feeds the next layer.
The input layer holds the features, one or more hidden layers compute
intermediate features, and the output layer gives the prediction. Without
activation functions, any stack of layers collapses to a single linear
function, no matter how many layers it has. A non-linear activation such
as ReLU (max(0, z)), sigmoid or tanh lets each layer bend and combine its
inputs, so a network with enough hidden nodes can approximate almost any
pattern. The weights and biases of all layers are learned by gradient
descent, just like the weights of a linear model; their number grows with
the width and depth of the network, and so do the risk of overfitting and
the cost of training.

# Key facts

- One node: a = activation(b + w₁x₁ + w₂x₂ + …).
- ReLU(z) = max(0, z): 0 for negative z, z otherwise. Sigmoid: σ(z) = 1 / (1 + e^(−z)), range (0, 1). tanh: range (−1, 1). ReLU is the usual default for hidden layers; it is cheap and its gradient does not shrink for positive z.
- Two linear layers collapse: y = W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂), again linear. Activations prevent this.
- Tiny network, inputs x = (2, −1): hidden node 1 = ReLU(1 · 2 + 1 · (−1) + 0) = 1; hidden node 2 = ReLU(−1 · 2 + 2 · (−1) + 1) = ReLU(−3) = 0; output = 3 · 1 + 2 · 0 − 1 = 2.
- Counting parameters of a fully connected layer: inputs × outputs weights + outputs biases. Network 3 → 4 → 2: (3 · 4 + 4) + (4 · 2 + 2) = 16 + 10 = 26 parameters.
- Network 784 → 128 → 10 (a classic digit classifier): 784 · 128 + 128 + 128 · 10 + 10 = 101,770 parameters.
- Output layer: no activation (or identity) for regression; sigmoid for binary classification; softmax for multi-class.
- Two ReLU nodes can build a bump: ReLU(x) − 2 · ReLU(x − 1) + ReLU(x − 2) is 0 left of 0, rises to 1 at x = 1, falls back to 0 at x = 2. Many such pieces approximate curves.
- More hidden nodes and layers = more capacity: they fit more complex patterns but need more data, compute and regularization.

# Level: highschool

<!-- ptf:text v1 -->

The plant needs "enough water, but not too much". A straight line can only
say "more water, more growth" or "more water, less growth". But two simple
rules can describe it: "growth rises as long as water is below the right
amount" and "growth falls when there is more". A neural network builds
predictions from many such small pieces.

Each piece is a **node**. It does what a linear model does, a weighted sum
plus a bias, and then one more thing: it passes the result through an
**activation function**. The most common one, **ReLU**, simply turns
negative numbers into 0 and leaves positive numbers alone. That small
"cut off below zero" is what lets a node act like a switch or a bend.

Try a tiny network with two inputs x₁ = 2 and x₂ = −1. Hidden node 1
computes 1 · 2 + 1 · (−1) + 0 = 1, and ReLU leaves 1. Hidden node 2
computes −1 · 2 + 2 · (−1) + 1 = −3, and ReLU makes it 0: this node is
"off" for this input. The output node combines them: 3 · 1 + 2 · 0 − 1 = 2.
That is a **forward pass**.

Why the ReLU? Without it, every node is just a weighted sum of weighted
sums, and that is still one big weighted sum: a linear model, however
many layers you stack. The activation is what makes extra layers worth
having. The nodes between input and output are the **hidden layer**; the
network invents its own intermediate features there, instead of a human
adding bins or crosses by hand.

Every arrow in the network is a weight and every node has a bias, all
learned by gradient descent. A network with 3 inputs, 4 hidden nodes and
2 outputs has 3 · 4 + 4 + 4 · 2 + 2 = 26 of them. Bigger networks can
learn more complex patterns, but they also need more data and can
overfit more easily.

# Level: college

<!-- ptf:text v1 -->

A fully connected layer maps h ↦ φ(Wh + b), with weight matrix W, bias
vector b and an element-wise activation φ. A network composes such layers:
for one hidden layer, y′ = W₂ φ(W₁x + b₁) + b₂. If φ is the identity, the
composition is W₂W₁x + (W₂b₁ + b₂), a single affine map: depth adds
nothing. With a non-linear φ, a single hidden layer of sufficient width
can approximate any continuous function on a bounded domain (universal
approximation); depth makes many functions far cheaper to represent, by
reusing intermediate features.

ReLU, φ(z) = max(0, z), makes the network piecewise linear: each hidden
unit adds a hinge, and combinations of hinges form bumps and ramps, e.g.
ReLU(x) − 2 ReLU(x − 1) + ReLU(x − 2) is a triangle of height 1 on [0, 2].
Its derivative is 1 for z > 0 and 0 for z < 0, so gradients pass through
active units undiminished, unlike sigmoid (σ′ ≤ 0.25) and tanh, which
saturate for large |z|. Units whose pre-activation is negative for every
input get no gradient and can "die". Variants (leaky ReLU, GELU) keep a
small gradient below 0.

Worked example: W₁ = [[1, 1], [−1, 2]], b₁ = (0, 1), W₂ = (3, 2), b₂ = −1,
x = (2, −1): W₁x + b₁ = (1, −3), ReLU → (1, 0), y′ = 3 − 1 = 2. Parameter
count of a layer with n_in inputs and n_out outputs is n_in · n_out + n_out;
784 → 128 → 10 has 101,770. The output layer's activation follows the
task: identity for regression, sigmoid for a binary probability, softmax
for a distribution over classes. Training uses the same losses as before
(MSE, log loss, cross-entropy) and gradient descent, with gradients
computed by backpropagation; capacity grows with width and depth, so the
regularization tools of the previous step (early stopping, L2, plus
dropout) matter more.

# Misconceptions

- **more-layers-without-activation**: Adding linear layers makes a model more powerful → without non-linear activations, any number of layers equals one linear layer.
- **neurons-like-brain**: Artificial neurons work like brain cells → they are a loose inspiration; a node is a weighted sum and a simple function.
- **relu-throws-away**: ReLU destroys information, so it should be avoided → setting negatives to 0 is exactly what lets nodes act as switches and bends; other nodes carry the rest.
- **bigger-network-always-better**: A larger network always gives better predictions → more capacity also means more overfitting and cost; size is chosen on validation data.
- **network-needs-no-features**: Networks make feature preparation unnecessary → they learn combinations, but still need clean, scaled inputs and sensible encodings for categories.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "plant-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "question": "A plant grows best with a medium amount of water; too little or too much harms it. Can a linear model growth = b + w · water describe this?",
  "options": [
    { "text": "No: a straight line can only go up or only go down, not up and then down", "correct": true, "feedback": "Yes: the pattern bends, so we need something that can bend." },
    { "text": "Yes, if the weight is chosen well", "correct": false, "feedback": "Any single weight gives a straight line, rising or falling everywhere." },
    { "text": "Yes, with a negative bias", "correct": false, "feedback": "The bias only moves the line up or down." }
  ],
  "explanation": "Patterns with bends need non-linear models: bins, polynomial features, or a neural network that learns the bends."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-activation",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["why-nonlinear"],
  "misconception": "more-layers-without-activation",
  "question": "A network has three hidden layers, but its nodes have no activation function (they only compute weighted sums). What can it learn?",
  "options": [
    { "text": "Only what a single linear model can learn: weighted sums of weighted sums are still a weighted sum", "correct": true, "feedback": "Yes: the layers collapse into one." },
    { "text": "More than a linear model, because it has more layers", "correct": false, "feedback": "Without non-linearity, extra layers add nothing new." },
    { "text": "Anything, because three layers are enough", "correct": false, "feedback": "Only with non-linear activations." }
  ],
  "explanation": "The activation function is what makes depth useful."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "forward-pass-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["forward-pass"],
  "title": "A forward pass",
  "intro": "Inputs x₁ = 2, x₂ = −1. Hidden node 1: weights 1, 1, bias 0. Hidden node 2: weights −1, 2, bias 1. Both use ReLU. Output: 3 · h₁ + 2 · h₂ − 1.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Node 1 sum", "1 · 2 + 1 · (−1) + 0", "1"],
    ["Node 1 after ReLU", "max(0, 1)", "1"],
    ["Node 2 sum", "−1 · 2 + 2 · (−1) + 1", "-3"],
    ["Node 2 after ReLU", "max(0, −3)", "0"],
    ["Output", "3 · 1 + 2 · 0 − 1", "2"]
  ],
  "result": { "label": "Output", "value": "2" },
  "explanation": "ReLU switched node 2 off for this input; the output only uses node 1."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "relu-values",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["forward-pass", "architecture"],
  "misconception": "relu-throws-away",
  "question": "What is ReLU(−4) + ReLU(0.5) + ReLU(3)?",
  "answer": 3.5,
  "tolerance": 0,
  "explanation": "ReLU(z) = max(0, z): 0 + 0.5 + 3 = 3.5."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "count-params-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["architecture"],
  "misconception": "bigger-network-always-better",
  "question": "A network has 4 inputs, one hidden layer of 5 nodes and 1 output node. Every node is connected to every node of the previous layer and has a bias. How many weights and biases does it have in total?",
  "answer": 31,
  "tolerance": 0,
  "explanation": "Hidden layer: 4 · 5 weights + 5 biases = 25. Output: 5 weights + 1 bias = 6. Total 31."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "layers-roles",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["architecture", "why-nonlinear"],
  "misconception": "network-needs-no-features",
  "question": "Which two statements about the layers of a neural network are true?",
  "options": [
    { "text": "The hidden layers compute intermediate features that the network learns itself", "correct": true, "feedback": "Yes: this replaces some hand-made bins and crosses." },
    { "text": "For a yes/no question the output node often uses the sigmoid, to give a probability", "correct": true, "feedback": "Yes: just like logistic regression." },
    { "text": "The input layer learns which features to collect", "correct": false, "feedback": "The input layer just holds the feature values you give it." },
    { "text": "Because the network learns its own features, the inputs no longer need cleaning or scaling", "correct": false, "feedback": "Bad or badly scaled inputs still hurt; networks need prepared data too." }
  ],
  "explanation": "Input = given features; hidden = learned features; output = prediction in the form the task needs."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "nn-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["why-nonlinear", "forward-pass"],
  "question": "A node computes 0.5 · x − 2 and then applies ReLU. For which input is its output 0?",
  "options": [
    { "text": "x = 3", "correct": true, "feedback": "0.5 · 3 − 2 = −0.5, and ReLU turns negatives into 0." },
    { "text": "x = 6", "correct": false, "feedback": "0.5 · 6 − 2 = 1, which ReLU keeps." },
    { "text": "x = 10", "correct": false, "feedback": "0.5 · 10 − 2 = 3." }
  ],
  "explanation": "The node is 'off' below x = 4 and rises linearly above: a bend at x = 4."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "collapse-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["why-nonlinear"],
  "misconception": "more-layers-without-activation",
  "question": "Two layers without activation: h = W₁x + b₁, y = W₂h + b₂ with W₁ = [[1, 2], [0, 1]], b₁ = (1, 0), W₂ = (2, −1), b₂ = 3. Which single linear model y = w · x + b is it equivalent to?",
  "options": [
    { "text": "w = (2, 3), b = 5", "correct": true, "feedback": "W₂W₁ = (2 · 1 − 0, 2 · 2 − 1) = (2, 3); W₂b₁ + b₂ = 2 + 3 = 5." },
    { "text": "w = (2, 3), b = 3", "correct": false, "feedback": "The first layer's bias also passes through: W₂b₁ = 2." },
    { "text": "It is not equivalent to any linear model", "correct": false, "feedback": "Without activations, the composition is always affine." }
  ],
  "explanation": "W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂)."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "count-params-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["architecture"],
  "question": "How many parameters does a fully connected network 784 → 256 → 64 → 10 have (all layers with biases)?",
  "answer": 218058,
  "tolerance": 0,
  "explanation": "784 · 256 + 256 = 200,960; 256 · 64 + 64 = 16,448; 64 · 10 + 10 = 650; total 218,058."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "hinge-bump-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["forward-pass", "why-nonlinear"],
  "question": "f(x) = ReLU(x) − 2 · ReLU(x − 1) + ReLU(x − 2). Compute f(1.5).",
  "answer": 0.5,
  "tolerance": 0,
  "explanation": "1.5 − 2 · 0.5 + 0 = 0.5. f is a triangle: 0 for x ≤ 0, peak 1 at x = 1, 0 again from x = 2."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "activation-choice-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["architecture"],
  "question": "Which two choices are standard?",
  "options": [
    { "text": "ReLU in hidden layers, because its gradient is 1 for active units and it is cheap to compute", "correct": true, "feedback": "Yes: it avoids the saturation of sigmoid and tanh." },
    { "text": "Identity output with MSE for predicting a house price", "correct": true, "feedback": "Yes: regression needs an unbounded output." },
    { "text": "Sigmoid output for predicting a temperature in °C", "correct": false, "feedback": "Sigmoid is limited to (0, 1); a temperature is unbounded." },
    { "text": "No activation in hidden layers, to keep gradients large", "correct": false, "feedback": "Then the network collapses to a linear model." }
  ],
  "explanation": "Hidden: non-linear (ReLU family). Output: matches the target (identity, sigmoid, softmax)."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "xor-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["why-nonlinear", "forward-pass", "architecture"],
  "question": "The label is 1 when exactly one of two binary inputs is 1 (XOR) and 0 otherwise. Explain why logistic regression on (x₁, x₂) cannot learn it, and give a network with one hidden ReLU layer that computes it (weights and biases), checking all four inputs.",
  "rubric": [
    "XOR is not linearly separable: no line separates (0,1), (1,0) from (0,0), (1,1)",
    "A hidden layer with a non-linear activation creates features in which it becomes separable",
    "A concrete construction, e.g. h₁ = ReLU(x₁ + x₂), h₂ = ReLU(x₁ + x₂ − 1), y = h₁ − 2h₂",
    "Checks all four inputs: (0,0) → 0, (0,1) → 1, (1,0) → 1, (1,1) → 0"
  ],
  "sample_answer": "Logistic regression draws one straight decision boundary, but the two positive points (0,1), (1,0) lie diagonally between the negatives (0,0), (1,1), so no line separates them. With h₁ = ReLU(x₁ + x₂) and h₂ = ReLU(x₁ + x₂ − 1), output y = h₁ − 2h₂: (0,0) → 0 − 0 = 0; (0,1) → 1 − 0 = 1; (1,0) → 1; (1,1) → 2 − 2 · 1 = 0.",
  "explanation": "Hidden non-linear units build features (here 'at least one' and 'both') that make the problem linear for the output."
}
```

# Examples

- **Light switches and dimmers**: each ReLU node is a dimmer that stays off until its input passes a threshold, then turns up linearly. A room's lighting pattern is the sum of many such dimmers. Breaks down: in a network the "thresholds" and "wiring" are learned, and there are thousands of them.

# Tutor notes

- Let the learner compute the forward pass before seeing the figure of the network; the figure then confirms where each weight sits.
- The collapse argument (linear of linear is linear) is the key idea; at highschool show it with numbers: y = 2(3x + 1) + 4 = 6x + 6.
- Do not go into training yet beyond "gradient descent as before"; backpropagation is the next step.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Neural networks", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
