---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/embeddings-and-search
title: Text embeddings and semantic search
description: An encoder turns a whole text into one vector so that texts with similar meaning lie close together; cosine similarity and a vector index then find the most relevant documents for a question, even without shared words.
lang: en
levels: [highschool, college]
objectives:
  - id: embed-text
    text: Explain how a text becomes one embedding vector (token vectors plus pooling) and why texts with similar meaning end up close together.
  - id: cosine
    text: Compute the cosine similarity of two vectors and rank documents for a query by it.
  - id: search-pipeline
    text: Describe a semantic search pipeline (embed the documents once, index, embed the query, nearest neighbours) and compare it with keyword search.
tags: [llm, embeddings, semantic-search, cosine-similarity, faiss, retrieval]
about:
  - wikidata: Q1891170
    label: semantic search
  - wikidata: Q29043221
    label: sentence embedding
  - wikidata: Q1784941
    label: cosine similarity
  - wikidata: Q113481551
    label: Faiss
requires:
  - ptf:el/llm-in-practice/model-heads
  - ptf:el/llm-in-practice/padding-and-masks
leads_to:
  - ptf:el/llm-in-practice/llm-evaluation
duration_min: { highschool: 15, college: 25 }
sources:
  - id: hf-llm-course-5-6
    resource: https://huggingface.co/learn/llm-course/chapter5/6
    title: "Hugging Face LLM Course, chapter 5, section 6: Semantic search with FAISS"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-06T00:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Search "my car will not start in the cold" in a help forum, and the best answer may be titled "Automobile battery fails at low temperatures": not a single word in common.
- This step shows how a model turns every text into a point in space so that texts with similar meaning lie close together, and how a search engine then finds the nearest points.
- Afterwards the learner can explain what an embedding is, compute cosine similarity, and describe the search step that chat assistants use to look things up in your documents (retrieval-augmented generation).

# Core

An embedding model, usually a fine-tuned encoder, turns a text into one
vector of a few hundred numbers: it computes a vector per token and pools
them, for example by averaging over the real tokens. The model is trained
so that texts with similar meaning get vectors pointing in similar
directions. Cosine similarity, the cosine of the angle between two vectors,
measures that closeness from −1 to 1. Semantic search embeds all documents
once, stores the vectors in an index, embeds each query the same way and
returns the documents with the highest similarity. It finds matches by
meaning where keyword search needs shared words, but can miss exact codes
and names, so practical systems often combine both.

# Key facts

- Embedding sizes: 384 dimensions for small sentence-embedding models (for example all-MiniLM-L6-v2), 768 for base-size models (all-mpnet-base-v2), 1,024 and more for large ones.
- **Pooling**: mean pooling averages the token vectors of the real tokens (padding excluded with the attention mask); CLS pooling takes the vector of the first token. The model must be used with the pooling it was trained with.
- **Cosine similarity**: cos(a, b) = a · b / (‖a‖ · ‖b‖), from −1 (opposite) over 0 (unrelated) to 1 (same direction). For vectors normalised to length 1, cosine similarity equals the dot product.
- Example: a = (1, 2, 2), b = (2, 1, 2): a · b = 8, ‖a‖ = ‖b‖ = 3, cos = 8 / 9 ≈ 0.889.
- Raw hidden states of a model that was not trained for similarity (for example plain BERT) give poor sentence embeddings; sentence-embedding models are fine-tuned on pairs of similar and dissimilar texts (contrastive learning).
- **Search pipeline**: split documents into passages → embed all passages once → store in an index → embed the query → k nearest neighbours by similarity → (optionally) rerank.
- **FAISS** is a library for similarity search over vectors. A flat index compares the query with every vector (exact); approximate indexes (for example IVF, HNSW) look at a fraction and trade a little accuracy for large speed-ups.
- Memory: 1 million passages × 768 dimensions × 4 bytes (float32) ≈ 3.1 GB.
- Keyword search (for example BM25) is strong for exact terms, names, product codes; embeddings for paraphrases and synonyms. **Hybrid search** combines both.
- Query and documents must be embedded with the same model; vectors of different models live in different spaces.
- **Symmetric vs asymmetric search**: finding near-duplicates (question ↔ similar question) is symmetric; a short query against longer passages is asymmetric and works best with models trained on question–passage pairs (for example the multi-qa models of the sentence-transformers library). Models trained for dot-product scoring give unnormalised scores (for example 22.9), not values between −1 and 1; use the score function the model was trained with.
- Retrieval-augmented generation (RAG): the retrieved passages are put into an LLM's prompt so it can answer from them.

# Level: highschool

<!-- ptf:text v1 -->

Imagine a big map where every sentence gets a spot. Sentences about cats
and dogs sit in one corner, sentences about football in another, and "my
car will not start in the cold" sits right next to "automobile battery
fails at low temperatures", because they mean almost the same thing, even
though they share no words.

That map is what an **embedding** model makes, only with hundreds of
directions instead of two. It reads a sentence, gives every token a
vector, and then averages them into one vector for the whole sentence:
the sentence's spot. During its training it was shown pairs of sentences
that mean the same and pairs that do not, and it learned to put the
first kind close together and the second kind far apart.

How do we measure "close"? We look at the angle between two vectors, like
two arrows starting at the same point. If they point the same way, the
**cosine similarity** is 1; if they are at a right angle, it is 0. For
the arrows (1, 2, 2) and (2, 1, 2): multiply matching entries and add,
1·2 + 2·1 + 2·2 = 8; each arrow has length 3; so the similarity is
8 / (3 · 3) ≈ 0.89, quite similar.

A search engine built on this does two things. Once, ahead of time, it
puts every document of a help forum on the map. Then, for each question,
it puts the question on the map too and returns the documents whose spots
are nearest. That finds the battery article for the car question. It is
weaker for exact things like an order number, where an old-fashioned word
search is better, so good systems use both.

# Level: college

<!-- ptf:text v1 -->

Compute cos((1, 2, 2), (2, 1, 2)) by hand first: 8 / 9 ≈ 0.889. Now
imagine doing that against a million 768-dimensional vectors per query;
that is the whole engineering problem of semantic search.

**From tokens to one vector.** An encoder returns hidden states
[T, d]. Mean pooling computes ∑ₜ mₜ hₜ / ∑ₜ mₜ with the attention mask m,
so padding does not dilute the average; CLS pooling takes h₁. Which one
is right depends on how the embedding model was trained. Plain
pretrained encoders produce anisotropic, poorly separated sentence
vectors; sentence-embedding models are fine-tuned contrastively (in-batch
negatives, InfoNCE-style losses) on paraphrase or question-answer pairs,
so cosine similarity reflects semantic relatedness.

**Similarity.** cos(a, b) = a · b / (‖a‖ ‖b‖). After L2 normalisation,
ranking by dot product, by cosine and by Euclidean distance coincide,
because ‖a − b‖² = 2 − 2 a · b for unit vectors. Hence indexes usually
store normalised vectors and use inner product.

**Index.** A flat FAISS index computes N dot products per query: exact,
O(N · d). Approximate nearest-neighbour indexes cut that: IVF clusters
the vectors and probes only a few clusters; HNSW walks a proximity graph;
product quantisation compresses vectors to a few bytes each. Memory for
the raw float32 matrix is N · d · 4 bytes: 10⁶ · 768 · 4 ≈ 3.1 GB.

**Pipeline and limits.** Chunk documents (embeddings of very long texts
blur), embed offline, embed queries online with the same model (some
models need prefixes like "query:" and "passage:"), retrieve top-k,
optionally rerank with a cross-encoder that reads query and passage
together. Dense retrieval excels at paraphrase and fails on rare exact
strings (part numbers, names) that BM25 handles; hybrid scoring fuses
both. In RAG, retrieval quality bounds answer quality: the LLM cannot use
what was not retrieved.

# Misconceptions

- **embedding-is-keywords**: Semantic search finds documents that share words with the query → it compares meaning vectors and can match texts with no words in common.
- **any-model-embeds**: Any pretrained model's hidden states make good sentence embeddings → models trained for similarity work far better than raw hidden states.
- **mix-models**: Query and documents can be embedded with different models → each model has its own vector space; both must use the same model (and pooling).
- **dense-always-better**: Embedding search always beats keyword search → for exact codes and names keyword search is often better; hybrid search combines both.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "no-shared-words", "level": "highschool", "purpose": "check",
  "objectives": ["embed-text"], "misconception": "embedding-is-keywords",
  "question": "Why does semantic search find \"Automobile battery fails at low temperatures\" for the question \"My car will not start in the cold\"?",
  "options": [
    { "text": "The model puts sentences with similar meaning at nearby spots, even without shared words", "correct": true, "feedback": "Right. Car and automobile, cold and low temperatures land close together." },
    { "text": "Because both sentences contain the word \"car\"", "correct": false, "feedback": "Look again: the article says \"automobile\", not \"car\"." },
    { "text": "Because both sentences are about the same length", "correct": false, "feedback": "Length does not decide; meaning does." }
  ],
  "explanation": "Embeddings capture meaning, so paraphrases are near each other."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "how-one-vector", "level": "highschool", "purpose": "check",
  "objectives": ["embed-text"], "misconception": "any-model-embeds",
  "question": "The model gives each of the 10 tokens of a sentence its own vector. How does the sentence get one vector?",
  "options": [
    { "text": "The token vectors are averaged (or the first token's vector is used)", "correct": true, "feedback": "Right. This step is called pooling." },
    { "text": "The longest word's vector is used", "correct": false, "feedback": "Word length plays no role." },
    { "text": "The ten vectors are written one after another", "correct": false, "feedback": "Then sentences of different length would have vectors of different size and could not be compared." }
  ],
  "explanation": "Pooling turns many token vectors into one fixed-size sentence vector."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "cosine-simple", "level": "highschool", "purpose": "check",
  "objectives": ["cosine"],
  "question": "Two arrows are a = (3, 4) and b = (4, 3). Both have length 5. What is their cosine similarity? (a · b = 3·4 + 4·3)",
  "answer": 0.96, "tolerance": 0.01,
  "explanation": "a · b = 12 + 12 = 24, divided by 5 · 5 = 25: 0.96. They point in almost the same direction."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "cosine-meaning", "level": "highschool", "purpose": "check",
  "objectives": ["cosine"],
  "question": "A query has cosine similarity 0.91 with document A, 0.12 with B and 0.55 with C. In which order does semantic search return them?",
  "options": [
    { "text": "A, C, B", "correct": true, "feedback": "Right. Higher similarity first." },
    { "text": "B, C, A", "correct": false, "feedback": "That is lowest first; search returns the most similar first." },
    { "text": "A, B, C", "correct": false, "feedback": "C (0.55) is more similar than B (0.12)." }
  ],
  "explanation": "Rank by similarity, highest first; 1 means same direction, 0 unrelated."
}
```

```ptf-question
{
  "kind": "ordering", "id": "pipeline-order", "level": "highschool", "purpose": "check",
  "objectives": ["search-pipeline"],
  "instruction": "Put the steps of a semantic search engine in order.",
  "items": [
    "Split the documents into short passages",
    "Turn every passage into a vector, once, ahead of time",
    "Store the vectors in an index",
    "Turn the user's question into a vector with the same model",
    "Return the passages whose vectors are most similar"
  ],
  "explanation": "The expensive embedding of all documents happens once; each query needs only one embedding and a nearest-neighbour lookup."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "order-number", "level": "highschool", "purpose": "check",
  "objectives": ["search-pipeline"], "misconception": "dense-always-better",
  "question": "A customer searches for the order number \"A-77314\". Which search is likely to work best?",
  "options": [
    { "text": "A keyword search, or a mix of keyword and semantic search", "correct": true, "feedback": "Right. Exact codes have no 'meaning' to match; exact word search finds them." },
    { "text": "Semantic search alone, because it understands meaning", "correct": false, "feedback": "An order number's meaning is just its exact characters; embeddings can blur them." },
    { "text": "Neither can find order numbers", "correct": false, "feedback": "Keyword search finds them easily." }
  ],
  "explanation": "Dense search for meaning, keyword search for exact strings; hybrid systems use both."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "cosine-3d", "level": "college", "purpose": "check",
  "objectives": ["cosine"],
  "title": "Rank two documents by cosine similarity",
  "intro": "Query q = (1, 2, 2), document A = (2, 1, 2), document B = (0, 3, 4). Round to three decimals.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["‖q‖", "√(1 + 4 + 4)", "3"],
    ["cos(q, A)", "(2 + 2 + 4) / (3 · 3)", "0.889"],
    ["‖B‖", "√(0 + 9 + 16)", "5"],
    ["cos(q, B)", "(0 + 6 + 8) / (3 · 5)", "0.933"]
  ],
  "result": { "label": "Rank of document A (1 = most similar)", "value": "2" },
  "explanation": "B is closer in direction (0.933 > 0.889) although its vector is longer; cosine ignores length."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "mean-pool", "level": "college", "purpose": "check",
  "objectives": ["embed-text"],
  "question": "Hidden states (1 dimension shown) for 4 positions: [2.0, 4.0, 6.0, 9.0]; attention mask [1, 1, 1, 0]. What is the correctly mean-pooled value?",
  "answer": 4, "tolerance": 0,
  "explanation": "Average only the masked-in positions: (2 + 4 + 6) / 3 = 4. Including the padding would give 5.25 and make the embedding depend on padding."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "index-memory", "level": "college", "purpose": "check",
  "objectives": ["search-pipeline"],
  "question": "A flat index stores 2 million passage embeddings with 384 dimensions in float32 (4 bytes). About how many GB is the raw vector matrix?",
  "answer": 3.07, "tolerance": 0.1, "unit": "GB",
  "explanation": "2 · 10⁶ · 384 · 4 bytes = 3.072 · 10⁹ bytes ≈ 3.07 GB. Quantised approximate indexes can shrink this by an order of magnitude."
}
```

```ptf-question
{
  "kind": "free_text", "id": "normalise", "level": "college", "purpose": "check",
  "objectives": ["cosine", "search-pipeline"], "misconception": "mix-models",
  "question": "Why do many vector indexes store L2-normalised embeddings and search by inner product? And what goes wrong if the documents were embedded with model X and queries with model Y?",
  "rubric": [
    "For unit vectors the dot product equals cosine similarity, and Euclidean ranking is equivalent (‖a − b‖² = 2 − 2 a·b).",
    "Inner product is cheap and well supported by indexes.",
    "Different models have unrelated vector spaces (different axes, often different dimensions), so similarities between them are meaningless."
  ],
  "sample_answer": "Normalised vectors make the dot product equal to the cosine, and nearest by Euclidean distance becomes the same ranking, so a fast inner-product index gives cosine search. Mixing models compares coordinates of two unrelated spaces: even with the same dimension, the numbers mean different things, so results are random.",
  "explanation": "Normalise once, search by inner product; keep one model per index."
}
```

# Examples

- **Map of sentences**: similar meanings at nearby spots. Breaks down: the real space has hundreds of dimensions and distances are measured by angle.
- **Library shelves sorted by topic** instead of alphabet: you find related books by looking nearby, not by matching the title.

# Tutor notes

- Start with the car and automobile example and let the learner guess why a keyword search would fail.
- Cosine similarity at highschool level: two-dimensional arrows are enough. Connect to the dot product only as "multiply matching entries and add".
- If the learner wants to build something, a semantic search over their own notes with a small embedding model is a satisfying first project and the basis of retrieval-augmented generation.

# Further reading

- [Hugging Face LLM Course, chapter 5.6: Semantic search with FAISS](https://huggingface.co/learn/llm-course/chapter5/6): embedding GitHub issues with a sentence-embedding model and searching them with a FAISS index (college).

# Sources

Grounding: [^hf-llm-course-5-6]. Text, examples and questions are original.

[^hf-llm-course-5-6]: Hugging Face, LLM Course, chapter 5, section 6 ("Semantic search with FAISS"), https://huggingface.co/learn/llm-course, Apache License 2.0.
