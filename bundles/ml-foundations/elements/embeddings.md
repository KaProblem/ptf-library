---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/embeddings
title: Embeddings
description: An embedding maps each category, such as a word, a film or a user, to a short dense vector learned in training, so that similar items end up close together and a model can generalize between them.
lang: en
levels: [highschool, college]
objectives:
  - id: why-embed
    text: Explain why one-hot vectors are a poor input for large vocabularies and how an embedding layer replaces them with a lookup of dense vectors.
  - id: similarity
    text: Compute and interpret the distance and cosine similarity between embedding vectors.
  - id: learned
    text: Explain how embeddings are learned as part of training a model, count the parameters of an embedding layer, and tell static from contextual embeddings.
tags: [machine-learning, embeddings, representation-learning, word-embedding, similarity, neural-networks]
about:
  - wikidata: Q133284072
    label: embedding
  - wikidata: Q18395344
    label: word embedding
requires:
  - ptf:el/ml-foundations/multiclass-classification
leads_to:
  - ptf:el/ml-foundations/language-models
duration_min: { highschool: 30, college: 35 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Embeddings"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: place these films on a sheet of paper so that similar films are close: a cartoon for small children, a scary horror film, an animated family adventure, a slasher film, a romantic comedy. What do the two directions of your sheet mean?
- With one-hot encoding every film is equally different from every other one: the model learns nothing about a new cartoon from all the cartoons it has seen. Embeddings give each item a position in a space of meaning, and they are how recommenders, search engines and language models represent the world.
- Afterwards the learner can explain what an embedding layer does, measure similarity between embeddings, and say how embeddings are learned and how large they are.

# Core

An embedding represents each item of a categorical feature (a word, a
film, a user, a product) as a short vector of real numbers, typically 8 to
a few thousand long, instead of a one-hot vector with one position per
item. The embedding layer is a table with one row per item; looking up an
item's row is the same as multiplying its one-hot vector by the table.
The numbers are not designed by hand: they are parameters learned by
gradient descent together with the rest of the model, so items that play
similar roles in the training task end up with similar vectors. Similarity
is measured with distances or with cosine similarity, which compares
directions. Because similar items share structure, a model can generalize
from frequent items to rare ones. Classic word embeddings give each word
one fixed vector (static); language models compute contextual embeddings
that depend on the surrounding words.

# Key facts

- One-hot over 50,000 words: 50,000 numbers per word, all zero but one, and every pair of words equally far apart.
- Embedding table: one row per item, d columns. 50,000 words × 64 dimensions = 3,200,000 learned parameters.
- Lookup = one-hot × table: the one-hot vector selects one row.
- Cosine similarity cos(a, b) = a · b / (|a| · |b|), from −1 to 1. a = (1, 2, 2), b = (2, 1, 2): a · b = 8, |a| = |b| = 3, cos = 8 / 9 ≈ 0.889. Euclidean distance √((1 − 2)² + (2 − 1)² + 0²) = √2 ≈ 1.414.
- Embeddings are learned for a task: as the first layer of a model trained on ratings, clicks or next-word prediction, or with a separate method such as word2vec (predict a word from its neighbours).
- Dimensions are not designed meanings; some directions may roughly align with properties (age group, genre), most are mixtures.
- A common rule of thumb for the size: d ≈ (number of categories)^(1/4) as a starting point, e.g. 50,000^(1/4) ≈ 15; then tune.
- Static embedding: one vector per word ("bank" the same in "river bank" and "bank account"). Contextual embedding: the vector depends on the sentence; transformers produce these.
- Embeddings learn the patterns of their data, including stereotypes; similarity in embedding space reflects the training data, not truth.

# Level: highschool

<!-- ptf:text v1 -->

If you placed the films on your sheet, you probably put the children's
cartoon next to the family adventure and the horror film next to the
slasher. Maybe one direction became "for kids ↔ for adults" and the other
"funny ↔ scary". Now each film has two numbers: its position. That is an
**embedding** with two dimensions.

Compare that with one-hot encoding. There, each of 10,000 films is a list
of 10,000 numbers with a single 1, and every film is exactly as different
from every other film. A model that learned "children who liked this
cartoon liked that one" cannot use it for a new cartoon, because to the
model the new cartoon looks like nothing it knows.

An embedding gives every film a short list of numbers, say 32. The model
keeps a table with one row per film. When a film comes in, it just looks
up its row. And here is the trick: nobody fills the table by hand. Its
numbers are weights like any other, learned with gradient descent while
the model learns its task, for example predicting which films a user will
watch. Films watched by the same people get pushed towards similar rows.
In the end, similar films are close together, and the model can use
everything it knows about one film for its neighbours.

How close are two embeddings? You can measure the straight-line distance,
or compare the directions with **cosine similarity**: 1 means same
direction, 0 unrelated, −1 opposite. For (1, 2, 2) and (2, 1, 2) the
cosine is 8 / 9 ≈ 0.89: very similar.

Words work the same way. A model that reads lots of text gives each word
a vector; words used in similar sentences ("cat", "dog") end up close.
Modern language models go one step further: the vector for "bank"
changes depending on whether the sentence is about a river or about
money.

# Level: college

<!-- ptf:text v1 -->

Let a categorical feature have vocabulary size V. An embedding layer is a
matrix E ∈ ℝ^(V×d); the embedding of item i is the row Eᵢ = onehot(i)ᵀE.
Implemented as a gather, it costs O(d) per item instead of a V-wide
multiplication, and its V · d parameters (50,000 × 64 = 3.2 million) are
trained by backpropagation: only the rows of items present in a batch
receive gradient. Multi-hot inputs (a bag of words, a user's watch list)
are embedded as the sum or mean of their rows.

What the space encodes is determined by the training objective. In a
recommender trained to predict user–item interactions (e.g. a dot product
of user and item embeddings), items consumed by similar users converge
to similar vectors; in word2vec, words predicting similar contexts do
(distributional hypothesis). Similarity is measured by Euclidean
distance, dot product (sensitive to vector length, which often correlates
with frequency or popularity) or cosine similarity (direction only):
for a = (1, 2, 2), b = (2, 1, 2), cos = 8/9 ≈ 0.889. Linear structure can
emerge (relations as approximate offsets), but individual coordinates
have no fixed meaning and any rotation of the space is equally valid.

The dimension d trades expressiveness against overfitting and cost; the
fourth-root heuristic (V^(1/4)) is a starting point for tuning.
Pre-trained embeddings transfer knowledge from a large corpus to a task
with little data, and can be fine-tuned or frozen. Static embeddings
assign one vector per type and so conflate senses; contextual embeddings
(the hidden states of a transformer) are functions of the whole input
sequence, so "bank" gets different vectors in different sentences. Since
embeddings absorb the statistics of their training data, they also
absorb its biases, which matters wherever similarity drives decisions.

# Misconceptions

- **embedding-hand-designed**: Someone decides what each embedding dimension means → the values are learned; dimensions are usually mixtures without a clean meaning.
- **one-hot-has-similarity**: One-hot vectors already show which items are similar → all one-hot vectors are equally far apart; similarity must be learned.
- **embedding-universal**: An embedding captures the true meaning of an item → it captures what was useful for its training task and data, including the data's biases.
- **bigger-d-better**: Larger embeddings are always better → more dimensions mean more parameters and more overfitting, especially for rare items.
- **one-vector-per-word-enough**: One vector per word is enough for language → words with several senses need context; contextual embeddings provide it.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "films-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "one-hot-has-similarity",
  "question": "With one-hot encoding, how similar is a children's cartoon to an animated family film, compared with how similar it is to a horror film?",
  "options": [
    { "text": "Exactly as similar: every pair of one-hot vectors is equally far apart", "correct": true, "feedback": "Yes: one-hot vectors carry no similarity at all." },
    { "text": "More similar to the family film", "correct": false, "feedback": "That is what we would like, but one-hot cannot express it." },
    { "text": "More similar to the horror film", "correct": false, "feedback": "One-hot vectors have no notion of similarity in any direction." }
  ],
  "explanation": "Embeddings give items positions so that similar ones can be close."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-layer-does",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["why-embed"],
  "question": "A model uses an embedding layer for 10,000 films with 32 numbers per film. What happens when the film with number 4,711 comes in?",
  "options": [
    { "text": "The model looks up row 4,711 of its table and uses those 32 numbers", "correct": true, "feedback": "Yes: an embedding layer is a lookup table." },
    { "text": "The model builds a list of 10,000 numbers with a 1 at position 4,711 and uses that", "correct": false, "feedback": "That is one-hot; the embedding replaces it with a short dense vector." },
    { "text": "The model computes the 32 numbers from the film's title", "correct": false, "feedback": "The numbers are stored per film and learned in training, not computed from the title." }
  ],
  "explanation": "Embedding layer = table with one learned row per item."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "cosine-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["similarity"],
  "question": "Two film embeddings are a = (1, 2, 2) and b = (2, 1, 2). Their cosine similarity is a · b / (|a| · |b|). Compute it (two decimals).",
  "answer": 0.89,
  "tolerance": 0.01,
  "explanation": "a · b = 2 + 2 + 4 = 8; |a| = |b| = √9 = 3; 8 / 9 ≈ 0.89. Very similar directions."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "closest-film",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["similarity"],
  "question": "In a 2-dimensional embedding, a cartoon sits at (0.9, 0.1). Which film is closest to it?",
  "options": [
    { "text": "A family adventure at (0.8, 0.2)", "correct": true, "feedback": "Distance √(0.01 + 0.01) ≈ 0.14." },
    { "text": "A thriller at (0.2, 0.7)", "correct": false, "feedback": "Distance √(0.49 + 0.36) ≈ 0.92." },
    { "text": "A horror film at (0.1, 0.9)", "correct": false, "feedback": "Distance √(0.64 + 0.64) ≈ 1.13." }
  ],
  "explanation": "Close vectors = items the model treats as similar."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "how-learned",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["learned"],
  "misconception": "embedding-hand-designed",
  "question": "How do the numbers in a film-embedding table get their values?",
  "options": [
    { "text": "They start random and are adjusted by gradient descent while the model learns its task, e.g. predicting what users watch", "correct": true, "feedback": "Yes: they are weights like any other." },
    { "text": "Film experts score each film on 32 properties", "correct": false, "feedback": "No one designs them; the dimensions usually have no clean meaning." },
    { "text": "They are the film's one-hot vector, shortened", "correct": false, "feedback": "There is no way to shorten one-hot without losing which film it is; embeddings are learned." }
  ],
  "explanation": "Embeddings are learned parameters; their meaning comes from the training task."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "table-size-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["learned", "why-embed"],
  "misconception": "bigger-d-better",
  "question": "An embedding table has 20,000 words and 50 numbers per word. How many learned parameters does it have?",
  "answer": 1000000,
  "tolerance": 0,
  "explanation": "20,000 · 50 = 1,000,000. Doubling the dimensions doubles that, and rare words get many parameters for few examples."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "embed-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["learned", "similarity"],
  "misconception": "one-vector-per-word-enough",
  "question": "In 'I sat on the bank of the river' and 'I took money from the bank', what does a modern language model do with the word 'bank'?",
  "options": [
    { "text": "It gives it a different vector in each sentence, depending on the words around it", "correct": true, "feedback": "Yes: contextual embeddings." },
    { "text": "It always uses the same vector, so it cannot tell the meanings apart", "correct": false, "feedback": "That is how older, static word embeddings work." },
    { "text": "It skips the word because it is ambiguous", "correct": false, "feedback": "It uses the context to work out the meaning." }
  ],
  "explanation": "Static: one vector per word. Contextual: the vector depends on the sentence."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gather-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["why-embed", "learned"],
  "question": "An embedding layer E ∈ ℝ^(V×d) is trained by backpropagation. Which two statements are correct?",
  "options": [
    { "text": "onehot(i)ᵀE equals row i of E, so the layer is implemented as a lookup", "correct": true, "feedback": "Yes: a gather of row i." },
    { "text": "In a batch, only the rows of items that occur receive a non-zero gradient", "correct": true, "feedback": "Yes: other rows did not influence the loss." },
    { "text": "Every row is updated in every step", "correct": false, "feedback": "Rows of absent items get zero gradient (unless regularization touches them)." },
    { "text": "An embedding layer is mathematically different from a linear layer on one-hot inputs", "correct": false, "feedback": "It is the same map, only computed efficiently." }
  ],
  "explanation": "Embedding = linear layer on one-hot input, computed as a lookup; sparse gradient updates."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cosine-vs-dot-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["similarity"],
  "question": "Item vectors: a = (3, 0), b = (1, 0.1), c = (0.6, 0.8). Which two statements are correct?",
  "options": [
    { "text": "By dot product with q = (1, 0), a scores highest (3)", "correct": true, "feedback": "q · a = 3, q · b = 1, q · c = 0.6." },
    { "text": "By cosine similarity, a and b point in almost the same direction (cos ≈ 0.995)", "correct": true, "feedback": "a · b = 3; |a| = 3; |b| ≈ 1.005; cos ≈ 0.995." },
    { "text": "Cosine similarity of a and b is 3, the dot product", "correct": false, "feedback": "Cosine divides by the lengths and lies in [−1, 1]." },
    { "text": "Dot product and cosine always rank items the same way", "correct": false, "feedback": "Dot product also rewards long vectors (often popular items); cosine ignores length." }
  ],
  "explanation": "Dot product mixes direction and length; cosine compares direction only."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "fourth-root-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["learned"],
  "question": "With the rule of thumb d ≈ V^(1/4), what embedding size would you start with for V = 160,000 categories?",
  "answer": 20,
  "tolerance": 0,
  "explanation": "160,000 = 20⁴, so d ≈ 20. It is only a starting point; tune d on validation data."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pretrained-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["learned"],
  "misconception": "embedding-universal",
  "question": "You have 2,000 labelled support tickets and want to classify them by topic. Which two statements about embeddings are correct?",
  "options": [
    { "text": "Pre-trained text embeddings bring knowledge from a large corpus, which helps with little labelled data", "correct": true, "feedback": "Yes: transfer learning." },
    { "text": "Pre-trained embeddings reflect their training corpus, including its biases and its vocabulary gaps (your product names may be missing)", "correct": true, "feedback": "Yes: they encode what was useful in their data, not universal meaning." },
    { "text": "Embeddings learned from scratch on 2,000 tickets will be as good as pre-trained ones", "correct": false, "feedback": "With so little data, most words are rare and their vectors poorly learned." },
    { "text": "Static word embeddings separate the senses of ambiguous words like 'charge'", "correct": false, "feedback": "Static embeddings have one vector per word; contextual ones separate senses." }
  ],
  "explanation": "Embeddings transfer what their training data taught them, good and bad."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "recsys-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["why-embed", "similarity", "learned"],
  "question": "A music app wants to recommend songs. It has 5 million songs and 20 million users, and knows which songs each user played. Sketch a model that learns song embeddings, explain how the embeddings get meaning, and how you would find songs similar to a given one.",
  "rubric": [
    "One-hot over 5 million songs is impractical and carries no similarity; use an embedding table (e.g. d of a few dozen)",
    "Learn user and song embeddings so that a score (e.g. dot product) predicts plays; train with gradient descent on observed plays and sampled non-plays",
    "Songs played by similar users get similar vectors: meaning comes from the training task",
    "Similar songs: nearest neighbours by cosine similarity (approximate search at this scale); note popularity effects with dot products and cold-start for new songs"
  ],
  "sample_answer": "Give each user and each song a learned embedding of, say, 64 numbers, and score a pair with their dot product. Train on observed plays as positives and sampled unplayed songs as negatives. Songs that the same users play get pushed together, so the space ends up organized by listening behaviour. For 'similar songs' I would take the nearest neighbours by cosine similarity, using an approximate nearest-neighbour index for 5 million songs. New songs have no plays yet, so they need content features or a fallback.",
  "explanation": "Embeddings are learned from the task; similarity search in the learned space powers recommendations."
}
```

# Examples

- **Seating plan**: an embedding is like a seating plan at a big party, where people who talk to each other a lot end up at nearby tables. Nobody assigns themes to the tables; they emerge. Breaks down: real embeddings have dozens or hundreds of dimensions, not two.

# Tutor notes

- Let the learner place the five films on a 2-D sheet first; that is a hand-made embedding, and its axes motivate "learned dimensions".
- Connect back to the categorical-data step (one-hot, hashing) and forward to language models: tokens are embedded the same way.
- Mention bias in embeddings briefly here; the fairness step returns to it.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Embeddings", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
