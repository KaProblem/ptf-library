---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/text-comprehension
title: Working with the interpretation text
description: The closed and half-open interpretation tasks of the Austrian AHS Latin Matura – supporting statements with a Latin quotation, completing sentences that paraphrase the text, choosing the right translation, structuring the text and collecting words – practised on an original short Latin text.
lang: en
levels: [highschool]
objectives:
  - id: tc-cite
    text: Support a statement about the text with one precise Latin quotation (Belegen) that contains the decisive words and nothing that contradicts the statement.
  - id: tc-paraphrase
    text: Render the content of a passage precisely in German (complete a sentence, choose the right translation, summarise) without quoting the introduction or the task.
  - id: tc-structure
    text: Divide a text into sections, give them headings and collect words or phrases of a theme from the text.
tags: [latin, matura, austria, ahs, interpretation, reading-comprehension, quotation]
duration_min: { highschool: 75 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Aufgabenformate zum Interpretationstext"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: read the text below once and say in one sentence what the philosopher asks the king for.
- The interpretation part (IT) gives 24 points for ten tasks on a second, shorter text that is not translated as a whole. About half of the tasks are closed or half-open: quote, complete, choose, structure.
- Afterwards the learner answers these tasks precisely and in the form the marking guide expects.

Text used in this element (written for this course; *dolium*: barrel, Diogenes' home):

> 1 Alexander rex, cum Corinthum venisset, Diogenem philosophum visitavit.
> 2 Ille ante dolium suum in sole iacebat. Rex eum benigne salutavit et
> 3 „Pete a me", inquit, „quidquid vis; omnia tibi dabo." Diogenes autem nihil
> 4 petivit nisi hoc: „Paulum a sole discede! Umbra tua solem mihi eripit."
> 5 Comites regis philosophum riserunt; sed Alexander dixit: „Nisi Alexander
> 6 essem, Diogenes esse vellem."

# Core

The interpretation tasks test whether the text was understood, without a
full translation. To support a statement (Belegen), quote the Latin words
that say exactly that – one quotation per row, short but complete enough
to carry the meaning; a second, unfitting quotation in the same row makes
it wrong. To complete a sentence or summarise, render the content of the
passage precisely in German and in your own words; quotations from the
introduction, the notes or the task are to be avoided. For a choice of
translations, check every option against the forms (case, tense, person)
and the context – only one is correct. To structure a text, look for
changes of speaker, place, time or topic and give each section a heading
that names its content; when collecting words of a theme (Sachfeld),
quote the exact forms of the text. Line numbers are not required. Answer
exactly the number of items asked for.

# Key facts

- Formats (German task words): Belegen Sie … mit einem Zitat; Ergänzen Sie … zu einem vollständigen deutschen Satz; Wählen Sie die passende Übersetzung (only one correct); Gliedern Sie den Text und geben Sie Überschriften; Sammeln Sie aus dem Text …; Fassen Sie zusammen.
- Belegen: one fitting quotation per row; quotations that are too short to carry the statement, or an extra unfitting one, cost the point.
- Ergänzen / Zusammenfassen: precise content, own words, complete German sentence; vague answers ("he says something about the sun") score nothing.
- Choice of translation: test each option against grammar and context; distractors usually have one wrong case, tense or reference.
- Points: usually 1 per row or item; the IT has 24 points in 10 tasks and needs at least 12 for a positive result.

# Level: highschool

<!-- ptf:text v1 -->

Read the whole text first, with the introduction. Then read the tasks:
they tell you which lines matter.

Statement: "Diogenes wants nothing from the king but a little sun." The
quotation must contain the decisive words: *nihil petivit nisi hoc:
Paulum a sole discede* – he asked for nothing but this: move a little
out of the sun. *nihil petivit* alone is not enough (it says nothing
about the sun); the whole text would be too much.

Complete: "Alexander says that, if he were not Alexander, …" – "he would
like to be Diogenes." The subjunctives *essem* and *vellem* make it
unreal: he is Alexander, so this is a wish he cannot have.

Structure: the text has three steps – the visit (lines 1–2), the offer
and the answer (lines 2–4), the reactions (lines 5–6). A heading names
the content: "The king's offer and the philosopher's request".

# Misconceptions

- **long-quote**: A longer quotation is safer → an extra unfitting part can make it wrong; quote exactly the words that prove the statement.
- **quote-intro**: The answer may repeat the introduction or the task → open answers should use your own words and content from the text itself.
- **vague-paraphrase**: Roughly right is right → the completion must render the passage precisely (who, what, how).
- **many-answers**: Writing more answers than asked increases the chance → only the requested number is marked; extra wrong ones cost points.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gist",
  "level": "highschool",
  "purpose": "warmup",
  "question": "What does Diogenes ask the king for?",
  "options": [
    { "text": "To step out of his sunlight", "correct": true, "feedback": "Yes: Paulum a sole discede." },
    { "text": "For money and a house", "correct": false, "feedback": "He asks for nothing except this." },
    { "text": "To become his teacher", "correct": false, "feedback": "Nothing in the text says so." }
  ],
  "explanation": "nihil petivit nisi hoc: Paulum a sole discede."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cite-offer",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tc-cite"],
  "misconception": "long-quote",
  "question": "Which quotation supports the statement 'The king offers Diogenes anything he wants'?",
  "options": [
    { "text": "Pete a me, inquit, quidquid vis", "correct": true, "feedback": "Yes: ask me for whatever you want." },
    { "text": "Rex eum benigne salutavit", "correct": false, "feedback": "This proves the friendly greeting, not the offer." },
    { "text": "Diogenes autem nihil petivit", "correct": false, "feedback": "This is the philosopher's answer." },
    { "text": "Pete a me, inquit, quidquid volo", "correct": false, "feedback": "This is not in the text (it says vis)." }
  ],
  "explanation": "Quote the words that say exactly what the statement says."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cite-mockery",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tc-cite"],
  "question": "Which quotation supports 'The king's companions make fun of the philosopher'?",
  "options": [
    { "text": "Comites regis philosophum riserunt", "correct": true, "feedback": "Yes." },
    { "text": "Umbra tua solem mihi eripit", "correct": false, "feedback": "These are Diogenes' words." },
    { "text": "sed Alexander dixit", "correct": false, "feedback": "This introduces Alexander's reaction." }
  ],
  "explanation": "ridere + accusative = laugh at someone."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "choose-translation",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tc-paraphrase"],
  "question": "Nisi Alexander essem, Diogenes esse vellem (line 5–6) means:",
  "options": [
    { "text": "If I were not Alexander, I would like to be Diogenes", "correct": true, "feedback": "Yes: unreal condition in the present." },
    { "text": "If I had not been Alexander, I would have wanted to be Diogenes", "correct": false, "feedback": "That would need the pluperfect subjunctive." },
    { "text": "Since I am not Alexander, I want to be Diogenes", "correct": false, "feedback": "nisi = if not; he is Alexander." },
    { "text": "If Alexander were not here, Diogenes would want to be", "correct": false, "feedback": "essem and vellem are first person: Alexander speaks about himself." }
  ],
  "explanation": "Imperfect subjunctive in both clauses: unreal in the present."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "complete-sentences",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tc-paraphrase"],
  "misconception": "vague-paraphrase",
  "question": "Complete precisely: (1) When the king had come to Corinth, … (2) Diogenes tells the king that his shadow … (3) Alexander says that, if he were not Alexander, …",
  "rubric": [
    "(1) he visited the philosopher Diogenes",
    "(2) takes the sun away from him",
    "(3) he would like to be Diogenes"
  ],
  "sample_answer": "(1) … he visited the philosopher Diogenes. (2) … takes the sun away from him. (3) … he would like to be Diogenes.",
  "explanation": "Each completion renders one passage exactly."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "structure-headings",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tc-structure"],
  "instruction": "Put the headings in the order of the text.",
  "items": [
    "The king visits the philosopher",
    "A generous offer",
    "A modest request",
    "Laughter and a royal compliment"
  ],
  "explanation": "Lines 1–2 visit, 2–3 offer, 3–4 request, 5–6 reactions."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "collect-persons",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tc-structure", "tc-cite"],
  "misconception": "many-answers",
  "question": "Collect three Latin nouns from the text that name or describe persons (quote the forms of the text).",
  "options": [
    { "text": "rex, philosophum, comites", "correct": true, "feedback": "Yes: exact forms from the text." },
    { "text": "rex, philosophus, comes", "correct": false, "feedback": "Quote the forms as they stand: philosophum, comites." },
    { "text": "rex, dolium, umbra", "correct": false, "feedback": "dolium and umbra are things." }
  ],
  "explanation": "Collecting tasks: exact forms, exactly as many as asked."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "comprehension-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["tc-cite", "tc-paraphrase"],
  "question": "Which quotation supports 'Diogenes lives in great simplicity'?",
  "options": [
    { "text": "ante dolium suum in sole iacebat", "correct": true, "feedback": "Yes: he lies in the sun in front of his barrel." },
    { "text": "Alexander rex, cum Corinthum venisset", "correct": false, "feedback": "This is about the king's arrival." },
    { "text": "omnia tibi dabo", "correct": false, "feedback": "This is the king's offer." }
  ],
  "explanation": "The barrel as a home shows his simple life."
}
```

# Tutor notes

- Use the learner's own reading texts as well: for any text, invent three statements and let the learner find the Latin proof.
- When the learner gives a long quotation, ask which words actually prove the statement and cut the rest.

# Sources

Grounding: [^bmbwf-srp-latein]. The Latin text is written for this course
after the anecdote of Alexander and Diogenes, which ancient authors tell in
several versions; text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): interpretation tasks.
