---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/categorical-data
title: Encoding categorical features
description: Categories such as colours, cities or words become numbers through a vocabulary and one-hot vectors, stored sparsely; many categories call for hashing or embeddings, and feature crosses let a linear model learn combinations.
lang: en
levels: [highschool, college]
objectives:
  - id: one-hot
    text: Build a vocabulary with an out-of-vocabulary entry and encode categories as one-hot or multi-hot vectors, and explain why plain category numbers are a bad encoding.
  - id: high-cardinality
    text: Explain sparse representation, and decide when a feature with very many categories needs hashing or an embedding; compute the vector sizes involved.
  - id: feature-crosses
    text: Build a feature cross, count its size, and explain which combinations it lets a linear model learn and what it costs.
tags: [machine-learning, data, features, categorical, one-hot, feature-cross, hashing]
about:
  - wikidata: Q110856614
    label: one-hot encoding
requires:
  - ptf:el/ml-foundations/numerical-data
leads_to:
  - ptf:el/ml-foundations/datasets-and-splits
duration_min: { highschool: 30, college: 30 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Working with categorical data"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a car-price model has a feature "colour" with values red, blue, black, white, silver. Someone writes them as 1, 2, 3, 4, 5. What does the model now believe about silver compared with red?
- Much of the world's data is categories, not quantities: countries, product types, words, postcodes. Encoding them badly quietly breaks a model; encoding them well is what lets a linear model handle "a black car in Vienna" differently from "a black car in Graz".
- Afterwards the learner can one-hot encode a feature with a vocabulary, size the result, decide when to hash or embed, and build feature crosses.

# Core

A categorical feature takes values from a set of categories. To feed it
to a model, build a vocabulary that gives each category an index, plus an
out-of-vocabulary (OOV) entry for categories not seen in training, and
encode each value as a one-hot vector: all zeros except a 1 at its index
(multi-hot when an example can have several categories). Encoding
categories as plain numbers 1, 2, 3 is wrong, because it invents an order
and distances that do not exist. One-hot vectors are mostly zeros, so they
are stored sparsely as the list of indices that are 1. When a feature has
very many categories (postcodes, words, user IDs), the vectors get huge
and rare categories have too few examples; hashing into a fixed number of
buckets or learning a dense embedding solves this. A feature cross
combines two categorical features into one with a category per pair, so a
linear model can learn effects that only appear in combination, at the
price of many more, sparser categories.

# Key facts

- Vocabulary for colour: red 0, blue 1, black 2, white 3, silver 4, OOV 5 → one-hot length 6; "black" = [0, 0, 1, 0, 0, 0]; "green" (unseen) = [0, 0, 0, 0, 0, 1].
- Sparse representation: store only the positions of the 1s. "black" → [2]. A multi-hot "ingredients" vector with 3 of 10,000 ingredients → 3 indices instead of 10,000 numbers.
- Integer codes 1 to 5 tell a linear model that silver (5) is "5 times red" and that blue lies between red and black: nonsense for colours. One-hot gives each category its own weight.
- Ordinal categories (small < medium < large) may be encoded as ordered numbers if the steps are meaningful; otherwise one-hot.
- High cardinality: 40,000 postcodes → one-hot length 40,001 with OOV. Hashing: bucket = hash(value) mod 1,000 → length 1,000, with collisions (different values share a bucket). Embedding: each category maps to a dense vector of, say, 16 numbers learned in training.
- Rare categories: categories with very few examples get unreliable weights; group them into OOV or a "rare" bucket.
- Feature cross: size = product of the sizes. Car type (3) × region (4) → 12 combined categories; 10 latitude bins × 10 longitude bins → 100 grid cells.
- A linear model without crosses gives a weight to "sports car" and one to "city centre", and adds them; with a cross it can learn that "sports car in the city centre" behaves differently from the sum.

# Level: highschool

<!-- ptf:text v1 -->

If colours are written as red = 1, blue = 2, black = 3, white = 4,
silver = 5, the model treats them as amounts. Its weight for "colour"
then says something like "each step from red towards silver adds € 300",
as if silver were "five reds". That makes no sense: colours have no
order.

The fix is **one-hot encoding**. First make a **vocabulary**, a list of
all categories with a position each: red 0, blue 1, black 2, white 3,
silver 4. Add one extra position for colours we have never seen (call it
"other", or **out-of-vocabulary**): 5. A black car now becomes a list of
six numbers with a single 1 at position 2: [0, 0, 1, 0, 0, 0]. The model
gets one weight per position, so it can learn a separate price effect for
every colour.

These lists are mostly zeros, so computers store only where the 1s are
(**sparse** storage): black is just "position 2". That matters when there
are many categories. A feature like postcode can have tens of thousands of
values. One-hot still works, but most postcodes have only a few examples,
so their weights are guesses. Two ways out: put the values into a fixed
number of buckets with a hash function (**hashing**), accepting that
different postcodes sometimes share a bucket, or let the model learn a
short list of numbers for each value (an **embedding**, a later step).

Sometimes two categories matter only together. A convertible sells well
in the south in summer, not just "a convertible" or "the south". A
**feature cross** makes one new category per pair: car type × region. With
3 car types and 4 regions that is 12 combinations, and the model learns a
weight for each. Crosses are powerful but multiply the number of
categories, and each combination needs enough examples.

# Level: college

<!-- ptf:text v1 -->

A categorical feature with vocabulary V (plus OOV) maps to a vector in
{0, 1}^(|V| + 1): one-hot for single-valued, multi-hot for set-valued
features. A linear model then has one weight per category, w_c, which is
equivalent to a lookup table; integer codes instead impose a linear
structure w · code that treats categories as equally spaced points on a
line. Only genuinely ordinal features with meaningful spacing justify an
ordered numeric encoding. With a bias term, one-hot columns are
collinear (they sum to 1); regularization or dropping one category
handles this.

One-hot vectors are stored and multiplied sparsely: a dot product w · x
costs O(number of active indices), not O(|V|). The problem with large |V|
is statistical as much as computational: categories with few examples
get high-variance weights, and new categories at serving time fall into
OOV. Remedies: a minimum count to enter the vocabulary (rest → OOV);
feature hashing, index = h(value) mod B, which fixes the size at B and
needs no vocabulary but causes collisions (expected share of colliding
pairs about 1 / B); and embeddings, a learned dense matrix E ∈ ℝ^(|V|×d)
whose row for a category is its representation, so similar categories
can share statistical strength.

A feature cross of features with n₁ and n₂ categories is a categorical
feature with n₁ · n₂ categories, the indicator of each pair. It lets a
linear model represent interactions (w_(type, region)) that the additive
model w_type + w_region cannot; crossing binned latitude and longitude
gives a grid of cells, each with its own weight. The cost is sparsity:
the number of crossed categories grows multiplicatively, most cells have
few examples, so crosses are combined with regularization (L1 drives
useless cross weights to 0), hashing, or replaced by models that learn
interactions themselves (trees, neural networks).

# Misconceptions

- **integer-codes-fine**: Numbering the categories 1, 2, 3 is a fine encoding → it invents an order and equal distances; a linear model then treats category 3 as "three times" category 1.
- **one-hot-wastes-memory**: One-hot vectors are too big to use → stored sparsely they cost only the active indices.
- **no-oov-needed**: The vocabulary from training covers everything → serving data brings new categories; without an OOV entry the pipeline fails or misuses an index.
- **hashing-is-lossless**: Hashing keeps every category distinct → different categories can land in the same bucket (collisions); the model then cannot tell them apart.
- **crosses-free**: Crossing more features always helps → each cross multiplies the number of categories and leaves most with few examples; it needs data and regularization.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "colour-numbers-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "integer-codes-fine",
  "question": "Car colours are written as red = 1, blue = 2, black = 3, white = 4, silver = 5 and used as one number in a linear price model. What does the model assume?",
  "options": [
    { "text": "That colours lie on a scale, so the effect of silver is 5 times the step from nothing to red", "correct": true, "feedback": "Yes: one weight times the code means equal steps between neighbouring numbers." },
    { "text": "Nothing: the numbers are just names", "correct": false, "feedback": "To the model they are amounts; it multiplies them by a weight." },
    { "text": "That silver cars are more popular", "correct": false, "feedback": "It assumes an order, not popularity; and the order is made up." }
  ],
  "explanation": "Numbers carry order and distance. Categories without them need one-hot encoding."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "encode-black",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["one-hot"],
  "misconception": "no-oov-needed",
  "question": "Vocabulary: red 0, blue 1, black 2, white 3, silver 4, out-of-vocabulary 5. Which two encodings are correct?",
  "options": [
    { "text": "black → [0, 0, 1, 0, 0, 0]", "correct": true, "feedback": "Yes: a 1 at position 2." },
    { "text": "green (never seen in training) → [0, 0, 0, 0, 0, 1]", "correct": true, "feedback": "Yes: unknown colours go to the out-of-vocabulary position." },
    { "text": "black → [3]", "correct": false, "feedback": "Black has index 2; and a single number would bring back the fake order." },
    { "text": "silver → [0, 0, 0, 0, 1]", "correct": false, "feedback": "The vector has 6 positions, including the out-of-vocabulary one: [0, 0, 0, 0, 1, 0]." },
    { "text": "green → an error, because it is not in the vocabulary", "correct": false, "feedback": "That is what the out-of-vocabulary entry prevents." }
  ],
  "explanation": "One position per category plus one for unknown values; a single 1 marks the category."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "postcode-size",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["high-cardinality"],
  "question": "A feature has 2,500 different postcodes in the training data. With one out-of-vocabulary entry, how long is each one-hot vector?",
  "answer": 2501,
  "tolerance": 0,
  "explanation": "One position per postcode plus one for unknown postcodes: 2,501. Stored sparsely, each example still needs only one index."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rare-categories",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["high-cardinality"],
  "misconception": "hashing-is-lossless",
  "question": "A shop has 50,000 product IDs, most bought only once or twice. Which two statements are true?",
  "options": [
    { "text": "With one-hot encoding, most product weights are learned from one or two examples, so they are unreliable", "correct": true, "feedback": "Yes: too few examples per category." },
    { "text": "Hashing the IDs into 1,000 buckets keeps the vector short, but some different products will share a bucket", "correct": true, "feedback": "Yes: that is a collision; the model cannot tell those products apart." },
    { "text": "Hashing guarantees that every product keeps its own bucket", "correct": false, "feedback": "50,000 products in 1,000 buckets: on average 50 per bucket." },
    { "text": "The only option is to drop the feature", "correct": false, "feedback": "Grouping rare IDs, hashing or an embedding are common solutions." }
  ],
  "explanation": "Many categories: few examples each. Hashing fixes the size with collisions; embeddings learn compact vectors."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "cross-size",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["feature-crosses"],
  "misconception": "crosses-free",
  "question": "You cross 'car type' (sedan, convertible, SUV) with 'season' (spring, summer, autumn, winter). How many categories does the cross have?",
  "answer": 12,
  "tolerance": 0,
  "explanation": "One category per pair: 3 · 4 = 12, e.g. 'convertible in summer'."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-cross",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["feature-crosses"],
  "question": "Convertibles sell for much more in summer, but only convertibles. Why does a linear model with separate one-hot features for car type and season miss this?",
  "options": [
    { "text": "It can only add a 'convertible' effect and a 'summer' effect, which then also applies to SUVs in summer; a cross gives 'convertible in summer' its own weight", "correct": true, "feedback": "Yes: without the cross the model cannot express a combination effect." },
    { "text": "One-hot features cannot represent seasons", "correct": false, "feedback": "They can; the problem is the combination." },
    { "text": "It needs a larger learning rate", "correct": false, "feedback": "No learning rate gives a linear model an effect it has no feature for." }
  ],
  "explanation": "A linear model adds effects; feature crosses let it learn effects of combinations."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "categorical-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["one-hot", "high-cardinality"],
  "misconception": "one-hot-wastes-memory",
  "question": "A feature 'country' has 195 categories. How is a one-hot vector for one example usually stored?",
  "options": [
    { "text": "As the position of its single 1, because all other entries are 0", "correct": true, "feedback": "Yes: sparse storage." },
    { "text": "As 195 numbers, which is why one-hot is avoided", "correct": false, "feedback": "Libraries store only the non-zero positions." },
    { "text": "As the country's population", "correct": false, "feedback": "That would be a different, numerical feature." }
  ],
  "explanation": "One-hot vectors are sparse: storing the active index is enough."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lookup-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["one-hot"],
  "misconception": "integer-codes-fine",
  "question": "Which two statements about a linear model with a one-hot encoded feature are correct?",
  "options": [
    { "text": "w · x for a one-hot x picks out one weight, so the encoding acts as a lookup table of per-category effects", "correct": true, "feedback": "Yes: only the active index contributes." },
    { "text": "With a bias term and all |V| + 1 one-hot columns, the columns are collinear, so the weights are not unique without regularization or a dropped category", "correct": true, "feedback": "Yes: the columns sum to 1, like the bias column." },
    { "text": "An integer code can represent the same per-category effects as one-hot", "correct": false, "feedback": "w · code forces the effects onto a line through equally spaced points." },
    { "text": "Sizes S < M < L must always be one-hot encoded", "correct": false, "feedback": "Ordinal features with meaningful steps may be encoded as ordered numbers." }
  ],
  "explanation": "One-hot = one free weight per category; integer codes impose linear structure."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "hash-collisions-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["high-cardinality"],
  "misconception": "hashing-is-lossless",
  "question": "You hash 3,000 distinct values uniformly into 1,000 buckets. What is the expected number of empty buckets? (round to a whole number)",
  "answer": 50,
  "tolerance": 1,
  "explanation": "Each bucket stays empty with probability (1 − 1/1000)^3000 ≈ e^(−3) ≈ 0.0498, so about 50 buckets are empty; the other 950 share 3,000 values."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "embed-or-hash-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["high-cardinality"],
  "question": "A recommender has 2 million user IDs and new users every day. Which approach is the most reasonable for this feature, and why?",
  "options": [
    { "text": "A learned embedding per user (or per hashed bucket of IDs), so similar users share structure and new users fall back to an OOV or hashed vector", "correct": true, "feedback": "Yes: dense vectors share statistical strength; hashing or OOV handles new IDs." },
    { "text": "One-hot with a vocabulary of the 2 million training IDs and no OOV entry", "correct": false, "feedback": "New users break it, and most weights rest on very few examples." },
    { "text": "Integer-code the IDs and scale them with a Z-score", "correct": false, "feedback": "IDs have no order; the model would learn nonsense from their numeric value." }
  ],
  "explanation": "Large, growing vocabularies: embeddings (often with hashing) instead of one weight per ID."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "grid-cross-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["feature-crosses"],
  "misconception": "crosses-free",
  "question": "You bin latitude and longitude into 50 bins each and cross them. Which two statements are correct?",
  "options": [
    { "text": "The cross has 2,500 cells, each with its own weight in a linear model", "correct": true, "feedback": "50 · 50 = 2,500." },
    { "text": "With 100,000 examples spread unevenly, many cells have very few examples, so regularization (for example L1) is needed", "correct": true, "feedback": "Yes: crosses are sparse; L1 also zeroes weights of useless cells." },
    { "text": "The cross needs no more data than the two binned features alone", "correct": false, "feedback": "Each of the 2,500 cells must be learned separately; the two features alone need only 100 weights." },
    { "text": "Without the cross, the model can still learn a separate price for every cell", "correct": false, "feedback": "Without it, a cell's effect is forced to be the sum of a latitude effect and a longitude effect." }
  ],
  "explanation": "Crosses make interactions learnable at a multiplicative cost in categories."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "taxi-features-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["one-hot", "high-cardinality", "feature-crosses"],
  "question": "You build a linear model for taxi tips with the features payment type (cash, card, app), pickup zone (260 zones, some with only a handful of trips) and hour of day. Describe how you would encode each feature, which cross you would try first and why, and how you would handle new zones.",
  "rubric": [
    "Payment type: one-hot with OOV",
    "Zone: one-hot with a minimum count (rare zones → OOV/rare bucket) or hashing; embedding as an option",
    "Hour: binned / one-hot, not a raw number (non-linear, cyclic)",
    "A plausible cross with a reason (e.g. payment type × hour, or zone × hour bin), noting sparsity and regularization",
    "New zones map to OOV (or their hash bucket)"
  ],
  "sample_answer": "Payment type one-hot with an OOV entry. Zones one-hot, but only zones with at least, say, 50 trips get their own index; rare and new zones go to OOV. Hour of day binned into ranges and one-hot encoded. First cross: payment type × hour bin, since card and app tipping habits may differ between late night and daytime; zone × hour would be more expressive but has thousands of sparse cells, so it needs strong regularization.",
  "explanation": "One-hot with OOV for small vocabularies, frequency cut-offs or hashing for large ones, crosses where combinations plausibly matter."
}
```

# Tutor notes

- Let the learner say what the integer-coded colour model "believes" before introducing one-hot.
- Embeddings are only named here; the embeddings step explains them, so keep the college remark short at highschool level.
- Feature crosses are a good place to ask "what does a linear model add up?": it prepares the neural network step, where hidden layers learn such combinations themselves.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Working with categorical data", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
