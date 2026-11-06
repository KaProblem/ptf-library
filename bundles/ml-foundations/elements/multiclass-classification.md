---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/multiclass-classification
title: Multi-class classification and softmax
description: When there are more than two classes, one-vs-all classifiers or a softmax output give a probability per class; softmax for exactly one correct class, independent sigmoids when several labels can apply.
lang: en
levels: [highschool, college]
objectives:
  - id: one-vs-all
    text: Explain how one-vs-all turns a multi-class problem into binary classifiers, and why their outputs need not sum to 1.
  - id: softmax
    text: Compute softmax probabilities and the cross-entropy loss for a few scores, and predict how changing one score changes the distribution.
  - id: multi-label
    text: Tell multi-class problems (exactly one class) from multi-label problems (any number of labels), and choose softmax or independent sigmoid outputs accordingly.
tags: [machine-learning, classification, multi-class, softmax, cross-entropy, multi-label]
about:
  - wikidata: Q6934605
    label: multiclass classification
  - wikidata: Q7554146
    label: softmax function
requires:
  - ptf:el/ml-foundations/backpropagation
leads_to:
  - ptf:el/ml-foundations/embeddings
duration_min: { highschool: 25, college: 30 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Neural networks: multi-class classification"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a fruit-sorting machine must decide between apple, pear and orange. Its three detectors say "apple: quite likely", "pear: quite likely", "orange: unlikely". How should it turn that into one answer with honest probabilities? And what changes if a photo can show several fruits at once?
- Most real classification tasks have more than two classes: which digit, which animal, which language, which next word. The ideas from logistic regression carry over with one new tool, softmax, which is also the last step of every language model.
- Afterwards the learner can set up a multi-class model, compute softmax and cross-entropy by hand, and choose the right output layer for single-label and multi-label tasks.

# Core

A multi-class problem has more than two classes, of which each example
belongs to exactly one. One-vs-all trains one binary classifier per class
("this class or not"); their outputs are separate probabilities that need
not add up to 1. Softmax instead turns a vector of scores (logits), one per
class, into a probability distribution: each score is exponentiated and
divided by the sum of all exponentials, so all probabilities are positive
and sum to 1, and a higher score always means a higher probability. It is
trained with cross-entropy, the negative log of the probability given to
the correct class. When an example can carry several labels at once
(multi-label, such as the tags of a photo), the labels are not exclusive,
so the right output is one independent sigmoid per label, trained with
binary log loss each.

# Key facts

- One-vs-all with N classes: N binary classifiers (or one network with N sigmoid outputs). Prediction: the class with the highest score. Outputs such as 0.7, 0.6, 0.1 are possible (sum 1.4).
- Softmax: pᵢ = e^(zᵢ) / Σⱼ e^(zⱼ). Scores (2, 1, 0): e² ≈ 7.389, e¹ ≈ 2.718, e⁰ = 1, sum ≈ 11.107 → p ≈ (0.665, 0.245, 0.090).
- Adding the same constant to every score does not change softmax: (12, 11, 10) gives the same p as (2, 1, 0). Only differences matter.
- Raising one score raises its probability and lowers all others; the order of probabilities is the order of scores.
- Cross-entropy for one example: −ln(p_correct). Correct class has p = 0.665 → loss ≈ 0.408; correct class has p = 0.090 → loss ≈ 2.408. Uniform over 3 classes: ln 3 ≈ 1.099.
- With 2 classes, softmax over (z, 0) equals the sigmoid of z: logistic regression is the two-class case.
- Multi-label (photo tags beach, dog, sunset): one sigmoid per tag, each its own yes/no probability; outputs such as (0.9, 0.8, 0.1) are fine.
- Very many classes (100,000 products): full softmax is expensive per step; candidate sampling computes it for the correct class and a sample of others during training.

# Level: highschool

<!-- ptf:text v1 -->

The fruit machine could use three separate detectors, one per fruit:
"apple or not?", "pear or not?", "orange or not?". This is
**one-vs-all**. It works: pick the fruit whose detector is most
confident. But the three answers come from separate models, so they can
say 0.7 apple and 0.6 pear at once, which adds up to more than 1. As
probabilities for "which one fruit is it?" they are not honest.

**Softmax** fixes that. The model gives one score per class, say apple 2,
pear 1, orange 0. Softmax makes each score positive by raising e to it
(e² ≈ 7.39, e¹ ≈ 2.72, e⁰ = 1), then divides each by the total (11.11).
Result: apple 0.665, pear 0.245, orange 0.090. They add up to 1, the
highest score gets the highest probability, and every class keeps a
little chance. Only the differences between the scores matter: 12, 11
and 10 give exactly the same probabilities.

To train it, we look at the probability the model gave to the right
answer and take −ln of it: the **cross-entropy** loss. If it was an apple,
the loss is −ln 0.665 ≈ 0.41. If it was an orange, −ln 0.090 ≈ 2.41: much
worse, because the model gave the truth only 9 %.

Now a different task: a photo app adds tags like "beach", "dog",
"sunset". One photo can have all three, or none. That is
**multi-label**, and softmax is the wrong tool, because it forces the
tags to share 100 %. Instead each tag gets its own yes/no probability
with a sigmoid, as in logistic regression.

# Level: college

<!-- ptf:text v1 -->

For K mutually exclusive classes, a network's last layer outputs logits
z ∈ ℝ^K and softmax maps them to the simplex: pᵢ = e^(zᵢ) / Σⱼ e^(zⱼ).
Softmax is invariant to adding a constant c to all logits (the factor e^c
cancels), which implementations use for numerical stability by
subtracting max(z). For K = 2 with logits (z, 0) it reduces to σ(z), so
multinomial logistic regression generalizes the binary case. Trained
with cross-entropy L = −ln p_y, the gradient with respect to the logits is
p − onehot(y): every wrong class is pushed down in proportion to its
probability, the correct one up by 1 − p_y.

Worked example: z = (2, 1, 0) → p ≈ (0.665, 0.245, 0.090);
L = 0.408 if y = 0, 2.408 if y = 2, and the gradient for y = 0 is
(−0.335, 0.245, 0.090). A uniform predictor has L = ln K, a useful
baseline (ln 3 ≈ 1.099; ln 10 ≈ 2.303 for digits).

One-vs-all trains K independent binary models (or K sigmoid outputs).
It is simple and parallel, but the scores are not calibrated against each
other, classes with few examples face heavy imbalance, and the outputs
need not sum to 1. Multi-label problems are different in kind: the labels
are not exclusive, so the correct model is K independent Bernoulli
outputs, sigmoid per label with binary cross-entropy summed over labels,
and each label gets its own threshold. With very large K (vocabularies,
catalogues) the softmax normalizer costs O(K) per example; candidate or
negative sampling estimate the loss from the correct class plus a sample
of others during training, while inference still ranks all classes.

# Misconceptions

- **softmax-makes-zeros**: Softmax sets unlikely classes to 0 → e^z is always positive, so every class keeps some probability.
- **scores-are-probabilities**: The raw scores (logits) are already probabilities → they can be any real numbers; only after softmax are they positive and summing to 1.
- **ova-sums-to-one**: The outputs of one-vs-all classifiers add up to 1 → each is a separate model; their outputs can sum to more or less than 1.
- **softmax-for-tags**: Softmax is right for any task with several classes → if several labels can be true at once, use one sigmoid per label.
- **absolute-scores-matter**: Adding 10 to every score makes the model more confident → softmax depends only on differences between scores.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "fruit-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "ova-sums-to-one",
  "question": "Three separate detectors say: apple 0.7, pear 0.6, orange 0.1. The fruit is exactly one of the three. What is odd about these numbers?",
  "options": [
    { "text": "They add up to 1.4, so they cannot all be probabilities for 'which one fruit is it'", "correct": true, "feedback": "Yes: probabilities of exclusive options must sum to 1." },
    { "text": "Nothing, they are fine probabilities", "correct": false, "feedback": "Apple and pear cannot both be likely at 70 % and 60 % if only one is true." },
    { "text": "The orange detector must be broken", "correct": false, "feedback": "Its value is plausible; the problem is the sum." }
  ],
  "explanation": "Separate yes/no detectors are not coordinated; softmax makes the probabilities share 100 %."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "ova-setup",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["one-vs-all"],
  "question": "You use one-vs-all to recognise the digits 0 to 9 in images. Which two statements are true?",
  "options": [
    { "text": "You train 10 yes/no classifiers, one per digit", "correct": true, "feedback": "Yes: 'is it a 7 or not?' and so on." },
    { "text": "The prediction is the digit whose classifier gives the highest probability", "correct": true, "feedback": "Yes." },
    { "text": "The 10 outputs always add up to 1", "correct": false, "feedback": "They come from separate classifiers; nothing forces them to sum to 1." },
    { "text": "You need 45 classifiers, one per pair of digits", "correct": false, "feedback": "That is the one-vs-one method; one-vs-all needs one per class." }
  ],
  "explanation": "One-vs-all: one binary model per class, pick the most confident."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "softmax-by-hand",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["softmax"],
  "misconception": "softmax-makes-zeros",
  "title": "Softmax for three fruits",
  "intro": "Scores: apple 2, pear 1, orange 0. Use e² ≈ 7.389 and e ≈ 2.718.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Sum of e^score", "7.389 + 2.718 + 1", "11.107"],
    ["Apple", "7.389 / 11.107", "0.665"],
    ["Pear", "2.718 / 11.107", "0.245"],
    ["Orange", "1 / 11.107", "0.090"]
  ],
  "result": { "label": "Apple", "value": "0.665" },
  "explanation": "All three are positive and sum to 1; orange keeps 9 % even with the lowest score."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "cross-entropy-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["softmax"],
  "question": "The model gave probabilities apple 0.665, pear 0.245, orange 0.090. The fruit was a pear. What is the cross-entropy loss −ln(p of the right class)? (two decimals)",
  "answer": 1.41,
  "tolerance": 0.01,
  "explanation": "−ln 0.245 ≈ 1.41. For apple it would be 0.41, for orange 2.41."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "shift-scores",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["softmax"],
  "misconception": "absolute-scores-matter",
  "question": "Scores (2, 1, 0) give probabilities (0.665, 0.245, 0.090). What do the scores (12, 11, 10) give?",
  "options": [
    { "text": "Exactly the same probabilities, because only the differences between scores matter", "correct": true, "feedback": "Yes: multiplying every e^score by e^10 cancels in the division." },
    { "text": "Apple close to 1, because its score is now much bigger", "correct": false, "feedback": "Pear and orange grew just as much." },
    { "text": "All three about equal", "correct": false, "feedback": "The gaps of 1 between the scores are unchanged." }
  ],
  "explanation": "Softmax is unchanged when the same number is added to every score."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "tags-or-classes",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["multi-label"],
  "misconception": "softmax-for-tags",
  "question": "Which task needs one sigmoid per label instead of a softmax?",
  "options": [
    { "text": "Tagging a recipe with any of 'vegetarian', 'quick', 'spicy', 'cheap'", "correct": true, "feedback": "Yes: a recipe can be quick and cheap and spicy at once." },
    { "text": "Deciding which of 26 letters a handwritten character is", "correct": false, "feedback": "Exactly one letter is correct: softmax." },
    { "text": "Deciding which of 5 languages a sentence is written in", "correct": false, "feedback": "One language per sentence: softmax." }
  ],
  "explanation": "Exactly one class → softmax. Any number of labels → independent sigmoids."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "multiclass-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["softmax", "multi-label"],
  "misconception": "scores-are-probabilities",
  "question": "A model's last layer outputs the scores 3.2, −1.0 and 0.4 for three classes. What are these numbers?",
  "options": [
    { "text": "Raw scores; softmax turns them into probabilities, with the first class most likely", "correct": true, "feedback": "Yes: scores can be negative; softmax keeps their order." },
    { "text": "Probabilities, with the first class certain", "correct": false, "feedback": "Probabilities cannot be negative or larger than 1." },
    { "text": "Three independent tags, of which the first is true", "correct": false, "feedback": "Whether they are tags depends on the task; as raw numbers they still need softmax or sigmoids." }
  ],
  "explanation": "Logits are unconstrained; softmax or sigmoid turns them into probabilities."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "softmax-grad-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["softmax"],
  "question": "For logits z = (2, 1, 0) and correct class 0, softmax with cross-entropy gives ∂L/∂z = p − onehot(y). Which two statements are correct?",
  "options": [
    { "text": "∂L/∂z ≈ (−0.335, 0.245, 0.090)", "correct": true, "feedback": "p − (1, 0, 0)." },
    { "text": "A gradient descent step raises z₀ and lowers z₁ and z₂", "correct": true, "feedback": "Each moves against its gradient." },
    { "text": "The wrong classes are pushed down equally, regardless of their probability", "correct": false, "feedback": "Each wrong class is pushed in proportion to its own probability." },
    { "text": "The gradient components sum to 1", "correct": false, "feedback": "Σp − 1 = 0: they sum to 0." }
  ],
  "explanation": "Softmax cross-entropy: gradient p − y, which sums to zero and weights mistakes by their probability."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "baseline-loss-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["softmax"],
  "question": "A freshly initialized digit classifier (10 classes) outputs nearly equal logits. What cross-entropy loss should you expect at step 0? (three decimals)",
  "answer": 2.303,
  "tolerance": 0.002,
  "explanation": "Uniform p = 0.1 → −ln 0.1 = ln 10 ≈ 2.303. A much higher initial loss points to a bug or bad initialization."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "two-class-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["one-vs-all", "softmax"],
  "misconception": "ova-sums-to-one",
  "question": "Which two statements about softmax and sigmoid are correct?",
  "options": [
    { "text": "Softmax over the two logits (z, 0) gives σ(z) for the first class", "correct": true, "feedback": "e^z / (e^z + 1) = 1 / (1 + e^(−z))." },
    { "text": "A one-vs-all model with K sigmoid outputs can give probabilities that sum to more than 1", "correct": true, "feedback": "Each output is an independent Bernoulli probability." },
    { "text": "Softmax over K classes equals applying a sigmoid to each logit separately", "correct": false, "feedback": "Softmax couples the outputs through the shared normalizer." },
    { "text": "One-vs-all and softmax always produce the same ranking of classes", "correct": false, "feedback": "Independently trained binary models need not agree with a jointly trained softmax." }
  ],
  "explanation": "Binary logistic regression is two-class softmax; one-vs-all is K separate binary problems."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "output-design-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["multi-label", "one-vs-all"],
  "misconception": "softmax-for-tags",
  "question": "A news classifier assigns articles to topics; 30 % of articles have two or three topics. Which output layer and loss fit, and how are predictions made?",
  "options": [
    { "text": "K sigmoid outputs with binary cross-entropy summed over topics; predict every topic above its own threshold", "correct": true, "feedback": "Yes: topics are not exclusive." },
    { "text": "Softmax with cross-entropy; predict the top topic", "correct": false, "feedback": "Softmax forces topics to compete and can only express one correct class." },
    { "text": "Softmax; predict all topics with p > 0.5", "correct": false, "feedback": "With softmax, at most one class can exceed 0.5." }
  ],
  "explanation": "Multi-label: independent Bernoulli outputs, per-label thresholds."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "shop-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["softmax", "multi-label", "one-vs-all"],
  "question": "An online shop wants (a) to predict which of its 80,000 products a user will buy next and (b) to tag each product photo with any of 200 attributes (colour, material, style). Choose output layers and losses for both, and say what you would do about the cost of (a).",
  "rubric": [
    "(a) exactly one next product: softmax over products with cross-entropy",
    "(a) 80,000 classes make full softmax expensive per step: candidate/negative sampling in training (full ranking at inference)",
    "(b) attributes are not exclusive: 200 sigmoid outputs with binary cross-entropy",
    "(b) per-attribute thresholds, possibly handling rare attributes (imbalance)"
  ],
  "sample_answer": "(a) The next purchase is one product, so softmax with cross-entropy; with 80,000 classes I would train with sampled softmax (the true product plus a few thousand sampled negatives) and rank all products at inference. (b) A photo can have many attributes, so 200 independent sigmoids with binary cross-entropy, each with a threshold tuned on validation data; rare attributes may need upweighting.",
  "explanation": "Exclusive classes → softmax (sampled when K is huge); non-exclusive labels → sigmoids."
}
```

# Tutor notes

- Learners who did the llm-basics course have met softmax as the last step of a language model; ask what they remember before computing.
- Compute one softmax by hand with three scores; then let the learner predict what (12, 11, 10) gives.
- The multi-label case is the one learners get wrong in practice: always ask "can two labels be true at once?".

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Neural networks" (multi-class classification), https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
