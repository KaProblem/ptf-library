---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/embeddings-search
title: Embeddings and semantic search
description: An embedding model turns a text into a vector so that texts with similar meaning lie close together; comparing vectors by cosine similarity finds relevant texts even when they share no words with the question.
lang: en
levels: [highschool, college]
objectives:
  - id: what-embeddings
    text: Explain that an embedding turns a text into a list of numbers (a vector) so that texts with similar meaning get similar vectors.
  - id: cosine-similarity
    text: Compute and interpret the cosine similarity of two vectors and rank documents by it.
  - id: semantic-vs-keyword
    text: Tell semantic search from keyword search, describe the steps of a semantic search, and say when keyword or hybrid search works better.
tags: [generative-ai, embeddings, semantic-search, cosine-similarity, vector-search]
about:
  - wikidata: Q1891170
    label: semantic search
  - wikidata: Q29043221
    label: sentence embedding
  - wikidata: Q1784941
    label: cosine similarity
requires:
  - ptf:el/genai-apps/choosing-a-model
leads_to:
  - ptf:el/genai-apps/rag
duration_min: { highschool: 25, college: 30 }
figures:
  - id: embedding-map
    objectives: [what-embeddings, cosine-similarity]
    use_when: before the learner computes a cosine similarity, to see that meaning becomes direction
sources:
  - id: ms-genai-08
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/08-building-search-applications
    title: "Microsoft, Generative AI for Beginners, lesson 8: Building search applications (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T23:40:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: you search your class notes for "why do leaves turn yellow". The right note says "chlorophyll breaks down in autumn". Not one word matches. How could a computer still find it?
- Embeddings make that possible. They are the basis of semantic search, of recommendation, and of retrieval-augmented generation in the next element.
- Afterwards the learner can explain what an embedding is, compute how similar two vectors are, and design a simple semantic search.

# Core

An embedding model turns a piece of text into a vector, a fixed-length
list of numbers, trained so that texts with similar meaning get vectors
pointing in similar directions, even if they use different words. The
similarity of two texts is then measured by comparing their vectors,
usually by cosine similarity: the cosine of the angle between them, 1 for
the same direction, 0 for unrelated directions. Semantic search embeds all
documents once and stores the vectors in an index; for each query it
embeds the query and returns the documents whose vectors are most similar.
Keyword search instead matches the exact words; it is better for names,
codes and rare terms, and many systems combine both (hybrid search).

# Key facts

- Embedding: a vector of a fixed number of dimensions (typically a few hundred to a few thousand) produced by an embedding model. The same model must be used for documents and queries; vectors from different models cannot be compared.
- Cosine similarity: cos(a, b) = (a · b) / (|a| · |b|). Range −1 to 1; for text embeddings values are usually between 0 and 1, and only the ranking matters, not a fixed threshold.
- Examples: [3, 4] and [4, 3]: dot product 24, both lengths 5, cosine 24 / 25 = 0.96. [1, 0] and [0, 1]: cosine 0. [1, 2] and [2, 4]: cosine 1 (same direction, different length).
- Many embedding models return vectors of length 1; then cosine similarity equals the dot product.
- Semantic search steps: split documents into passages → embed each passage → store vectors with the text in an index (a vector database or a library) → embed the query → find the k nearest vectors → return those passages.
- Exact nearest-neighbour search compares the query with every vector; large indexes use approximate nearest-neighbour (ANN) methods that are much faster and occasionally miss a match.
- Keyword search (for example BM25) wins on exact names, product codes, error numbers and rare jargon; semantic search wins on paraphrases and questions in everyday words. Hybrid search merges both rankings.
- Embeddings carry the biases of their training data, and their quality differs by language and domain; test retrieval on real queries.

# Level: highschool

<!-- ptf:text v1 -->

Imagine every sentence gets a spot on a huge map, chosen so that
sentences that mean similar things land close together. "Why do leaves
turn yellow?" and "chlorophyll breaks down in autumn" land near each
other; "how to bake bread" lands far away. An embedding model does
exactly that, only the map has hundreds of directions instead of two.
For each text it gives a list of numbers, a vector: the address on the
map.

To compare two texts, we look at the direction of their arrows from the
centre of the map. Pointing the same way: very similar. At right angles:
unrelated. The number for this is the cosine similarity, 1 for the same
direction and 0 for a right angle. For [3, 4] and [4, 3] it is 0.96, very
close.

A semantic search uses this. First it computes the vector of every note
once and saves them. When you ask a question, it computes the vector of
the question and returns the notes whose vectors point most nearly the
same way. Ordinary keyword search only finds notes with the same words.
That is still better when you search for an exact name or a code like
"E-404", so good search engines use both.

# Level: college

<!-- ptf:text v1 -->

A text-embedding model is an encoder f: text → ℝᵈ trained, typically
with contrastive objectives on pairs of related texts, so that semantic
similarity corresponds to geometric proximity. Queries and documents must
be embedded by the same model (and, for asymmetric models, with the
documented query and document prefixes).

Similarity is measured by cosine similarity, (a · b) / (|a| |b|), or by
the dot product when vectors are normalised to unit length, which most
embedding APIs do. Absolute values depend on the model; use relative
rankings, and calibrate any threshold on labelled data. Example: for the
query q = [1, 2, 2] and document d = [2, 1, 2], a · b = 8 and both norms
are 3, so cos = 8 / 9 ≈ 0.889.

A semantic search index stores (vector, passage, metadata). At query time
it embeds the query and retrieves the top k by similarity; exact search is
O(N · d) per query, so large collections use approximate nearest-neighbour
indexes (graph-based such as HNSW, or quantised inverted files) trading a
little recall for large speedups. Dense retrieval handles paraphrase and
vocabulary mismatch; sparse lexical retrieval (BM25) handles exact
identifiers, rare terms and out-of-domain jargon better. Hybrid retrieval
fuses both rankings (for example reciprocal rank fusion), optionally
followed by a re-ranking model. Evaluate with recall@k on real queries
with known relevant passages.

# Misconceptions

- **embedding-is-summary**: An embedding is a short text summary → it is a vector of numbers; it cannot be read as text.
- **matching-words**: Semantic search finds documents with the same words → it finds similar meaning, even with no shared words; exact word matching is keyword search.
- **longer-vector-more-similar**: Two vectors are more similar the longer they are → cosine similarity depends only on the angle, not the length.
- **any-models-compatible**: Vectors from different embedding models can be compared → each model has its own space; documents and queries need the same model.
- **semantic-always-better**: Semantic search is always better than keyword search → keyword search is better for exact names, codes and rare terms; hybrids combine both.
- **fixed-threshold**: A cosine of 0.8 means "relevant" for every model → values depend on the model; rank by similarity and calibrate thresholds on real data.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "no-shared-words",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "matching-words",
  "question": "Guess: which note should a good search return for \"why do leaves turn yellow\"?",
  "options": [
    { "text": "\"Chlorophyll breaks down in autumn, so other pigments show.\"", "correct": true, "feedback": "Right: it answers the question, although it shares no word with it." },
    { "text": "\"Yellow is a primary colour in painting.\"", "correct": false, "feedback": "It shares the word \"yellow\" but is about something else." },
    { "text": "\"Turn left at the yellow house.\"", "correct": false, "feedback": "Two shared words, no shared meaning." }
  ],
  "explanation": "Keyword search would pick the wrong notes here; semantic search compares meaning."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-is-embedding",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["what-embeddings"],
  "misconception": "embedding-is-summary",
  "question": "What does an embedding model give you for the sentence \"Dogs love to play fetch\"?",
  "options": [
    { "text": "A list of numbers that places the sentence near sentences with similar meaning", "correct": true, "feedback": "Yes: a vector, the sentence's address on a meaning map." },
    { "text": "A shorter version of the sentence", "correct": false, "feedback": "That would be a summary; an embedding is numbers, not text." },
    { "text": "The answer to the sentence", "correct": false, "feedback": "Embedding models do not answer; they represent meaning." },
    { "text": "A list of the words in alphabetical order", "correct": false, "feedback": "Word lists would not capture meaning." }
  ],
  "explanation": "An embedding is a vector; similar meaning means similar direction."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "cosine-34-43",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["cosine-similarity"],
  "misconception": "longer-vector-more-similar",
  "question": "Compute the cosine similarity of [3, 4] and [4, 3]. Hint: dot product divided by the product of the lengths; both have length 5.",
  "answer": 0.96,
  "tolerance": 0.01,
  "explanation": "3·4 + 4·3 = 24, lengths 5 and 5, so 24 / 25 = 0.96: almost the same direction."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "keyword-or-semantic",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["semantic-vs-keyword"],
  "misconception": "semantic-always-better",
  "question": "For which two searches is keyword search the better choice?",
  "options": [
    { "text": "Finding the error code \"E-404-17\" in a manual", "correct": true, "feedback": "Yes: exact codes are best matched as they are." },
    { "text": "Finding all documents that mention the name \"Wenzel-Maier\"", "correct": true, "feedback": "Yes: rare names are what keyword search does best." },
    { "text": "\"How do I calm down before a test?\" in a collection of advice texts", "correct": false, "feedback": "Here the right text may use other words; semantic search fits." },
    { "text": "\"Something cheap to cook for friends\" in a recipe collection", "correct": false, "feedback": "Everyday wording, no exact terms: semantic search fits." }
  ],
  "explanation": "Keyword search for exact names and codes, semantic search for meaning; hybrid search combines both."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "cosine-3d",
  "level": "college",
  "purpose": "check",
  "objectives": ["cosine-similarity"],
  "title": "Cosine similarity of q = [1, 2, 2] and d = [2, 1, 2]",
  "intro": "Compute dot product, norms and cosine. Round the cosine to three decimals.",
  "columns": ["Step", "Value"],
  "rows": [
    ["q · d", "8"],
    ["|q|", "3"],
    ["|d|", "3"]
  ],
  "result": { "label": "cos(q, d)", "value": "0.889" },
  "explanation": "1·2 + 2·1 + 2·2 = 8; both norms are √9 = 3; 8 / 9 ≈ 0.889."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "rank-docs",
  "level": "college",
  "purpose": "check",
  "objectives": ["cosine-similarity", "semantic-vs-keyword"],
  "instruction": "The query vector is q = [0.8, 0.6]. Order the documents from most to least similar by cosine similarity.",
  "items": [
    "A = [0.6, 0.8]",
    "B = [1, 0]",
    "C = [0, 1]",
    "D = [−0.6, 0.8]"
  ],
  "explanation": "All vectors have length 1, so cosine = dot product: A 0.96, B 0.8, C 0.6, D 0.0."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "index-design",
  "level": "college",
  "purpose": "check",
  "objectives": ["what-embeddings", "semantic-vs-keyword"],
  "misconception": "any-models-compatible",
  "question": "Your team switches to a new embedding model for queries to save money, but keeps the old document vectors. Search results become nonsense. Why, and what is the fix?",
  "options": [
    { "text": "Each model has its own vector space; re-embed all documents with the new model", "correct": true, "feedback": "Yes: vectors are only comparable within one model." },
    { "text": "The new model has a bug; switch back and never change models", "correct": false, "feedback": "Model changes are fine if documents are re-embedded." },
    { "text": "Normalise the query vectors to length 1", "correct": false, "feedback": "Normalising does not map one space onto another." },
    { "text": "Lower the similarity threshold", "correct": false, "feedback": "The rankings themselves are meaningless across spaces." }
  ],
  "explanation": "Documents and queries must be embedded with the same model and version."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "shop-search",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["semantic-vs-keyword", "cosine-similarity"],
  "misconception": "fixed-threshold",
  "question": "An online hardware shop wants search that understands \"thing to hang a heavy mirror\" but also finds exact article numbers like \"DX-8812\". Design the retrieval and say how you would test it.",
  "rubric": [
    "Combines semantic (dense) search for descriptions with keyword search for article numbers and names (hybrid), with a way to merge rankings.",
    "Uses the same embedding model for products and queries, and stores metadata (article number, category) with the vectors.",
    "Tests with real queries and known relevant products (for example recall at top 10), rather than a fixed similarity threshold."
  ],
  "sample_answer": "Embed every product's title and description with one embedding model and store the vectors with the article number. At query time, run a vector search and a keyword search in parallel and merge the two rankings, for example by reciprocal rank fusion, so \"DX-8812\" is found exactly and \"heavy mirror\" finds wall plugs and hooks. Build a set of 100 real search queries with the products that should appear, and measure how often they are in the top 10.",
  "explanation": "Hybrid retrieval, one embedding space, evaluation by recall on real queries."
}
```

# Examples

- **Map of meanings**: like a city map where shops of the same kind cluster, embeddings put similar texts in the same neighbourhood. Where it breaks down: the real map has hundreds of dimensions, and "neighbourhoods" overlap in ways no flat map can show.
- **Compass direction**: cosine similarity compares where two arrows point, not how long they are; [1, 2] and [2, 4] point exactly the same way.
- **Notes search**: 300 class notes are embedded once; a question is embedded in a fraction of a second and the 5 closest notes are shown.

# Tutor notes

- Show the figure `embedding-map` before any formula; the angle picture carries the whole idea.
- Highschool learners do not need the formula beyond the 2-D example; the ordering and keyword-vs-semantic questions check the idea.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 8 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/08-building-search-applications): building a search over video transcripts with embeddings; college.

# Sources

Grounding: [^ms-genai-08]. Text, examples, figure and questions are original.

[^ms-genai-08]: Microsoft, Generative AI for Beginners, lesson 8, MIT License. Used for scope and order only.
