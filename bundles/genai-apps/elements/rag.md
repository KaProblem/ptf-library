---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/rag
title: Retrieval-augmented generation (RAG)
description: Give a model your own, current documents at question time; split them into chunks, embed and index them, retrieve the most relevant chunks for each question and let the model answer from them with citations.
lang: en
levels: [highschool, college]
objectives:
  - id: rag-steps
    text: Describe the steps of a RAG system, ahead of time (split, embed, index) and for each question (embed, retrieve the top k, build the prompt, generate with citations).
  - id: grounding
    text: Explain why answering from retrieved sources reduces invented facts and keeps answers current, and write a prompt that keeps the model to its sources.
  - id: rag-failures
    text: Find the cause of a bad RAG answer (chunk not retrieved, poor chunking, stale index, model ignoring the sources) and choose between RAG, a long context and fine-tuning.
tags: [generative-ai, rag, retrieval, vector-database, grounding]
about:
  - wikidata: Q121362277
    label: retrieval-augmented generation
  - wikidata: Q118396004
    label: vector database
requires:
  - ptf:el/genai-apps/embeddings-search
  - ptf:el/genai-apps/prompt-basics
leads_to:
  - ptf:el/genai-apps/adapting-models
  - ptf:el/genai-apps/ai-agents
duration_min: { highschool: 30, college: 40 }
figures:
  - id: rag-pipeline
    objectives: [rag-steps, rag-failures]
    use_when: when the learner first meets the RAG steps, or to locate where a bad answer went wrong
sources:
  - id: ms-genai-15
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/15-rag-and-vector-databases
    title: "Microsoft, Generative AI for Beginners, lesson 15: Retrieval augmented generation (RAG) and vector databases (MIT License)"
  - id: ms-genai-08
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/08-building-search-applications
    title: "Microsoft, Generative AI for Beginners, lesson 8: Building search applications (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T23:55:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Picture an open-book exam: a student who may look things up in the right pages answers better than one who must remember everything. RAG gives a model an open book.
- It is the most common way to make a model answer from your own documents (class notes, a company wiki, product manuals) without retraining it.
- Afterwards the learner can describe a RAG system step by step, write a prompt that keeps the model to its sources, and find out why a RAG answer went wrong.

# Core

Retrieval-augmented generation answers a question in two parts. Ahead of
time, the documents are split into chunks, each chunk is turned into an
embedding and stored in a vector index. For each question, the question
is embedded with the same model, the most similar chunks are retrieved,
and the prompt is built from instructions, those chunks and the question,
so the model answers from them and can cite them. Because the facts come
from the documents at question time, answers can be current and private
and are less often invented; updating knowledge means updating the index,
not the model. RAG is only as good as its retrieval: a chunk that is not
retrieved does not exist for the model, and a model can still ignore or
misread the chunks it gets, so answers need citations and testing.

# Key facts

- Indexing (offline): load documents → clean → split into chunks (typically a few hundred tokens, often with some overlap so sentences at the borders are not cut apart) → embed each chunk → store vector, text and metadata (source, page, date) in a vector index.
- Query (online): embed the question → retrieve the top k chunks (k typically 3 to 10) → optionally re-rank them → build the prompt → generate → show the answer with citations.
- Chunk count with overlap: a document of 10,000 tokens, chunks of 500 tokens and 100 tokens overlap (a new chunk every 400 tokens) gives 25 chunks.
- Prompt size: 5 chunks of 500 tokens + 300 tokens of instructions + a 50-token question = 2,850 input tokens.
- Grounded prompt: "Answer only from the sources below. Cite the source ID after each statement. If the sources do not contain the answer, say so." Plus clearly delimited sources.
- Typical failures: the relevant chunk is not retrieved (poor embedding match, query uses other words, chunk too big or too small), the index is stale, sources contradict each other, the answer is spread over many chunks, or the model mixes in its own knowledge.
- Evaluate the two halves separately: retrieval (is the right chunk among the top k? recall at k) and generation (is the answer correct, complete and supported by the cited chunks, often called groundedness).
- Improvements: hybrid search (keywords plus embeddings), better chunking along headings, metadata filters (date, product), re-ranking, rewriting the question before searching.
- No good match: retrieval always returns the k nearest chunks, even when none is relevant. A minimum similarity (or a re-ranker score threshold) lets the app say "not in the documents" instead of answering from weak matches.
- RAG vs. alternatives: RAG for knowledge that is large, private, changing or must be cited; a long context window when the material is small enough to send whole; fine-tuning for style, format or narrow behaviour, not for adding facts reliably.

# Level: highschool

<!-- ptf:text v1 -->

Imagine you build a helper that answers questions about your school's
rules. The model has never seen your school's rule book. You could paste
the whole book into every question, but it is long and expensive. RAG is
smarter: it finds the few right pages and gives only those to the model.

It works in two parts. Once, ahead of time: cut the rule book into small
pieces (chunks), compute an embedding for each piece, and store them in a
search index. Then for every question: compute the question's embedding,
find the pieces that are most similar, and build a prompt like "Answer
only from these pieces and say which piece you used. If the answer is not
there, say so." plus the pieces and the question. The model writes the
answer from what it was given.

That helps twice. The model makes up fewer facts, because the facts are
right in front of it and you can check its source. And when the rules
change, you only update the index; the model itself stays the same.

But RAG has a weak point: the search. If the right piece is not among the
ones found, the model cannot use it and may guess. So when a RAG answer is
wrong, first check: was the right piece found at all?

# Level: college

<!-- ptf:text v1 -->

RAG conditions generation on retrieved evidence: p(answer | question,
retrieved chunks). The offline pipeline parses and cleans documents,
chunks them (fixed size with overlap, or structure-aware along headings
and paragraphs), embeds each chunk and stores vector, text and metadata
in a vector index. Online, the system embeds the (possibly rewritten)
query, retrieves the top k by similarity, optionally applies metadata
filters, hybrid lexical scoring and a cross-encoder re-ranker, and
assembles a prompt with delimited, ID-tagged chunks and instructions to
answer only from them, cite IDs and abstain when evidence is missing.

Chunking is a trade-off: small chunks retrieve precisely but lose
context; large ones keep context but dilute the embedding and cost
tokens. Overlap prevents splitting a fact across a border. With size s and
overlap o, chunks start every s − o tokens; a 10,000-token document at
s = 500, o = 100 yields 25 chunks.

Grounding lowers hallucination and makes answers auditable, current and
access-controlled (filter by the user's permissions at retrieval). It does
not guarantee faithfulness: models can ignore context, blend in parametric
knowledge, or follow instructions planted in documents (a security issue).
Evaluate retrieval (recall@k, MRR on questions with known relevant chunks)
separately from generation (correctness, completeness, groundedness of
each claim in the cited chunks); most RAG failures turn out to be
retrieval failures. Prefer RAG for large, private, changing or citable
knowledge, long-context prompting for small static corpora, and fine-tuning
for behaviour and format rather than facts.

# Misconceptions

- **rag-trains-model**: RAG teaches the model my documents → the model is unchanged; the documents are looked up and put into the prompt for each question.
- **rag-no-hallucination**: With RAG the model cannot make things up → it hallucinates less, but it can still ignore, misread or go beyond the sources; citations must be checkable.
- **model-searches-itself**: The model searches the documents itself → the application retrieves the chunks with embeddings; the model only sees what is put into the prompt.
- **more-chunks-better**: Retrieving more chunks always helps → more chunks cost tokens and can bury the relevant one; quality of retrieval beats quantity.
- **blame-the-model**: A wrong RAG answer means the model is bad → most failures are retrieval failures; check first whether the right chunk was retrieved.
- **fine-tune-for-facts**: To make a model know my documents, fine-tune it → fine-tuning is unreliable for adding facts and must be redone for every change; RAG keeps facts current and citable.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "open-book",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "rag-trains-model",
  "question": "Guess: a helper must answer questions about this year's school rules, which the model has never seen. What is the most practical way?",
  "options": [
    { "text": "Find the right pages of the rule book for each question and give them to the model with the question", "correct": true, "feedback": "Right: that is RAG, an open-book exam for the model." },
    { "text": "Hope the model guesses the rules", "correct": false, "feedback": "It would invent plausible rules." },
    { "text": "Train a new model on the rule book every time a rule changes", "correct": false, "feedback": "Slow, expensive, and the model may still not recall the exact rule." }
  ],
  "explanation": "RAG retrieves the relevant text at question time and puts it into the prompt."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "rag-order",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["rag-steps"],
  "instruction": "Put the steps of a RAG helper in order, from preparing the documents to answering.",
  "items": [
    "Cut the documents into small pieces",
    "Compute an embedding for each piece and store it",
    "Compute the embedding of the question",
    "Find the most similar pieces",
    "Let the model answer from these pieces and name them"
  ],
  "explanation": "The first two steps happen once, ahead of time; the last three for every question."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "why-grounding",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["grounding"],
  "misconception": "rag-no-hallucination",
  "question": "Which two things improve when a model answers from retrieved pieces of the rule book?",
  "options": [
    { "text": "It invents fewer rules, because the real text is in front of it", "correct": true, "feedback": "Yes: the facts are in the prompt." },
    { "text": "When a rule changes, updating the index is enough", "correct": true, "feedback": "Yes: no retraining needed." },
    { "text": "It can never make a mistake again", "correct": false, "feedback": "It can still misread or ignore the pieces, or get the wrong ones." },
    { "text": "The model learns the rule book for good", "correct": false, "feedback": "The model does not change; the pieces are looked up each time." }
  ],
  "explanation": "Grounding reduces invented facts and keeps answers current, but answers still need sources you can check."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "wrong-answer-first-check",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["rag-failures"],
  "misconception": "blame-the-model",
  "question": "Your rule-book helper says there is no rule about phones, but there is one. What should you check first?",
  "options": [
    { "text": "Whether the piece with the phone rule was among the pieces found for this question", "correct": true, "feedback": "Yes: if it was not found, the model never saw it." },
    { "text": "Whether the model is old", "correct": false, "feedback": "Possible, but most RAG mistakes come from the search step." },
    { "text": "Whether the temperature is too high", "correct": false, "feedback": "Temperature cannot make the model see a rule it was not given." }
  ],
  "explanation": "A chunk that is not retrieved does not exist for the model. Check retrieval first."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "chunk-count",
  "level": "college",
  "purpose": "check",
  "objectives": ["rag-steps"],
  "title": "Chunks and prompt size",
  "intro": "A manual has 10,000 tokens. It is split into chunks of 500 tokens with 100 tokens overlap. At query time the top 5 chunks are put into a prompt with 300 tokens of instructions and a 50-token question.",
  "columns": ["Quantity", "Value"],
  "rows": [
    ["Distance between chunk starts (tokens)", "400"],
    ["Start of the last chunk (token position)", "9600"],
    ["Number of chunks", "25"]
  ],
  "result": { "label": "Input tokens of the prompt", "value": "2850" },
  "explanation": "Chunks start at 0, 400, …, 9,600 (the chunk from 9,600 covers the end), so 9,600 / 400 + 1 = 25 chunks. Prompt: 5 · 500 + 300 + 50 = 2,850 tokens."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "grounded-prompt",
  "level": "college",
  "purpose": "check",
  "objectives": ["grounding"],
  "misconception": "rag-no-hallucination",
  "question": "Write the instruction part of a RAG prompt for an HR policy assistant. The retrieved chunks arrive with IDs such as [P12].",
  "rubric": [
    "Restricts answers to the provided sources and forbids using other knowledge for policy facts.",
    "Requires citing the chunk IDs for each statement.",
    "Defines behaviour when the sources are missing, unclear or contradictory (say so, point to HR), and delimits the sources clearly."
  ],
  "sample_answer": "You answer employees' questions about company policy. Use only the policy excerpts inside <sources>; do not use outside knowledge for policy facts. After each statement, cite the excerpt ID in brackets, e.g. [P12]. If the excerpts do not answer the question, say \"I could not find this in the policies\" and suggest contacting HR. If excerpts contradict each other, quote both with their IDs and say which is newer if dates are given. <sources>…</sources>",
  "explanation": "Restrict, cite, abstain: these three rules make RAG answers checkable."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "recall-at-5",
  "level": "college",
  "purpose": "check",
  "objectives": ["rag-failures"],
  "misconception": "blame-the-model",
  "question": "On 20 test questions with known relevant chunks, the relevant chunk was among the top 5 retrieved for 17 questions. What is recall@5, in percent?",
  "answer": 85,
  "tolerance": 0,
  "unit": "%",
  "explanation": "17 / 20 = 85 %. For the other 3 questions the generator never saw the evidence, so no prompt change can fix them; improve retrieval first."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rag-or-not",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["rag-failures", "grounding"],
  "misconception": "fine-tune-for-facts",
  "question": "Match the situation to the approach. Which two choices are sound?",
  "options": [
    { "text": "50,000 support articles that change weekly, answers must cite the article: RAG", "correct": true, "feedback": "Yes: large, changing, citable knowledge is the classic RAG case." },
    { "text": "One 8-page contract to be questioned in a single session: put it whole into a long-context prompt", "correct": true, "feedback": "Yes: small and static; retrieval would only add a way to miss parts." },
    { "text": "Product prices that change daily: fine-tune the model every night", "correct": false, "feedback": "Fine-tuning is unreliable for exact facts and slow to update; retrieve the price instead." },
    { "text": "Make answers follow the company's tone of voice: build a bigger vector index", "correct": false, "feedback": "Tone is behaviour; prompting or fine-tuning shapes it, retrieval does not." }
  ],
  "explanation": "RAG for large, changing, private or citable knowledge; long context for small static material; fine-tuning for behaviour and format."
}
```

# Examples

- **Open-book exam**: the student (model) answers with the right pages open. Where it breaks down: if the librarian (retriever) brings the wrong pages, the student answers from the wrong pages or from memory.
- **Class-notes helper**: 300 pages of notes of about 500 tokens each become 375 chunks of 400 tokens; a question about the Calvin cycle retrieves the 4 chunks from the photosynthesis chapter, and the answer cites them as [Bio-7] and [Bio-8].
- **Stale index**: the cafeteria menu was updated on Monday, but the index was rebuilt last month; the helper confidently cites the old menu. Fix: re-index on change and show source dates.

# Tutor notes

- Walk through the figure `rag-pipeline` step by step before the details; its last step (retrieval is the weak point) is the most useful debugging habit.
- If the learner did not take the embeddings element, explain embeddings in two sentences (text becomes a vector, similar meaning, similar direction) and move on.
- Connect to security later: retrieved documents are untrusted input and can contain instructions.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 15 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/15-rag-and-vector-databases): building a RAG app with a vector database; college.

# Sources

Grounding: [^ms-genai-15], [^ms-genai-08]. Text, examples, figure and questions are original.

[^ms-genai-15]: Microsoft, Generative AI for Beginners, lesson 15, MIT License. Used for scope and order only.
[^ms-genai-08]: Microsoft, Generative AI for Beginners, lesson 8, MIT License. Used for scope and order only.
