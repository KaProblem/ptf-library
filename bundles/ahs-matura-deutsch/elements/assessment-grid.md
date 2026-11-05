---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/assessment-grid
title: The assessment grid
description: How the texts of the German Matura are assessed with the official grid (Beurteilungsraster) in four dimensions and four levels, how the grade follows from it, and how to use it to judge and improve one's own text.
lang: en
levels: [highschool]
objectives:
  - id: dimensions
    text: Name the four dimensions of the grid (Inhalt, Textstruktur, Stil und Ausdruck, normative Sprachrichtigkeit) and sort a strength or weakness of a text into the right one.
  - id: grading
    text: Explain how the grade follows from the dimensions, in particular why a single dimension that is not fulfilled makes the whole exam negative.
  - id: self-assess
    text: Assess a short text along the four dimensions and name the change that would raise it most.
requires:
  - ptf:el/ahs-matura-deutsch/exam-format
tags: [german, matura, assessment, rubric, writing]
duration_min: { highschool: 45 }
sources:
  - id: srdp-deutsch-raster
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Beurteilungsraster, Handreichung zum Beurteilungsraster and Korrektur- und Beurteilungsanleitung zur SRDP in der Unterrichtssprache"
  - id: lbvo
    resource: https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10009375
    title: "Leistungsbeurteilungsverordnung (LBVO), § 14 Beurteilungsstufen"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a Leserbrief has a brilliant style and no spelling mistakes, but it never says what the newspaper article it answers was about, although the task asked for that. Guess: can it still get a good grade?
- Matura texts are not graded by overall impression but with a grid of four dimensions. Knowing the grid tells you where points come from and where a text can fail.
- Afterwards the learner can sort any comment on a text into a dimension, knows how the grade follows and uses the grid on their own drafts.

# Core

Each Matura text is assessed in four dimensions: Inhalt (does it carry out
every instruction in the named text type, correctly and with substance),
Textstruktur (is it built as the text type requires, in clear and linked
paragraphs), Stil und Ausdruck (does the language fit the text type and the
readers, with precise words and varied sentences) and normative
Sprachrichtigkeit (spelling, grammar, punctuation). Each dimension is
placed on one of four levels, from "nicht erfüllt" to "über das Wesentliche
hinausgehend erfüllt". Every part must reach at least the level "in den
wesentlichen Bereichen überwiegend erfüllt" for a positive grade; strong
language cannot make up for a task that was not carried out.

# Key facts

- Four dimensions: 1 Inhalt, 2 Textstruktur, 3 Stil und Ausdruck, 4 normative Sprachrichtigkeit; the grid describes 15 criteria in these dimensions with descriptors for each level.
- Inhalt: every Arbeitsauftrag carried out with the writing act its operator demands; features of the text type; factual correctness; reference to the Textbeilage where asked; substance and own thought (arguments with reasons and examples).
- Textstruktur: structure of the text type (for example headline, introduction, main part, conclusion, salutation in a speech); paragraphs that each have one function; a recognisable line of thought; links between sentences and paragraphs (Kohärenz, Kohäsionsmittel).
- Stil und Ausdruck: register suited to text type and readers; precise, varied vocabulary; varied and correctly linked sentences.
- Normative Sprachrichtigkeit: spelling (Rechtschreibung), grammar (Grammatik), punctuation (Zeichensetzung).
- Four levels: nicht erfüllt; in den wesentlichen Bereichen überwiegend erfüllt; in den wesentlichen Bereichen zur Gänze erfüllt; über das Wesentliche hinausgehend erfüllt.
- Three areas of competence (Kompetenzbereiche): Inhalt and Textstruktur of text 1, Inhalt and Textstruktur of text 2, and Stil und Ausdruck plus Sprachrichtigkeit of both texts together. Each area must be positive; one negative area makes the exam "Nicht genügend".
- Grades follow LBVO § 14: Genügend = the essentials mostly fulfilled; Befriedigend = the essentials fully fulfilled; Gut = beyond the essentials, with signs of independence; Sehr gut = well beyond the essentials, with clear independence.
- Typical reasons for "nicht erfüllt": a bullet point missing, another text type written, content mostly copied from the Textbeilage, a jumpy line of thought without structure, errors so frequent that reading is hard.

# Level: highschool

<!-- ptf:text v1 -->

Back to the Leserbrief with the brilliant style. The task asked for three
things, and one of them, saying what the article was about, is missing.
That is a gap in the dimension Inhalt, and the grid has no way to fill it
with good style: Inhalt and Textstruktur are judged for each text on its
own, and each of them has to be at least "mostly fulfilled".

The grid has four dimensions. Inhalt asks: did you do what each
instruction asks, in the right text type, with correct facts and real
arguments? Textstruktur asks: is the text built as this text type is built,
in paragraphs that each do one job, with a line the reader can follow?
Stil und Ausdruck asks: does the language suit the readers and the text
type, are the words precise and the sentences varied? Sprachrichtigkeit
counts spelling, grammar and punctuation.

Each dimension gets one of four levels: not fulfilled, mostly fulfilled,
fully fulfilled, beyond the essentials. "Mostly" is enough for Genügend,
"fully" for Befriedigend, and Gut and Sehr gut need more: own ideas, a
convincing structure, a style that fits exactly.

Use the grid on your own drafts: first check every bullet point (Inhalt),
then the paragraphs (Textstruktur), then read aloud for style, and last
proofread for your typical errors.

# Misconceptions

- **style-compensates**: A brilliant style makes up for a missing bullet point → Inhalt and Textstruktur of each text must be positive on their own; style cannot replace a missing part of the task.
- **errors-only**: The grade is mainly the number of mistakes → spelling, grammar and punctuation are one of four dimensions; most points are decided by Inhalt and Textstruktur.
- **average-grade**: The grade is the average of the four dimensions → a positive grade needs every area positive; a single "nicht erfüllt" area makes the exam negative.
- **copying-is-content**: Copying many sentences from the Textbeilage fills the Inhalt → reproduced or copied text is not the writing act asked for; content is judged by what you do with the source.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "grid-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["dimensions"],
  "misconception": "errors-only",
  "question": "Which are the four dimensions of the assessment grid for German Matura texts?",
  "options": [
    { "text": "Inhalt, Textstruktur, Stil und Ausdruck, normative Sprachrichtigkeit", "correct": true, "feedback": "Yes: content, structure, style, accuracy." },
    { "text": "Rechtschreibung, Grammatik, Zeichensetzung, Schrift", "correct": false, "feedback": "These are parts of one dimension (Sprachrichtigkeit); handwriting is not a dimension." },
    { "text": "Einleitung, Hauptteil, Schluss, Überschrift", "correct": false, "feedback": "These are parts of a text, judged under Textstruktur." },
    { "text": "Erfüllung der Aufgabenstellung, Aufbau und Layout, Spektrum sprachlicher Mittel, Sprachrichtigkeit", "correct": false, "feedback": "That is the grid of the foreign-language Matura (English, French …)." }
  ],
  "explanation": "The grid for German (Unterrichtssprache) has the four dimensions Inhalt, Textstruktur, Stil und Ausdruck and normative Sprachrichtigkeit."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "sort-comments",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["dimensions"],
  "question": "Which two teacher comments belong to the dimension Textstruktur?",
  "options": [
    { "text": "„Der dritte Absatz springt ohne Überleitung zu einem neuen Gedanken.“", "correct": true, "feedback": "Yes: links between paragraphs." },
    { "text": "„Die Rede hat keine Anrede und keinen Schluss.“", "correct": true, "feedback": "Yes: the structure of the text type." },
    { "text": "„Der zweite Arbeitsauftrag fehlt.“", "correct": false, "feedback": "A missing instruction is Inhalt." },
    { "text": "„Viele Wiederholungen von ‚sehr‘ und ‚Sache‘.“", "correct": false, "feedback": "Vocabulary is Stil und Ausdruck." },
    { "text": "„Kommafehler vor ‚dass‘.“", "correct": false, "feedback": "Punctuation is normative Sprachrichtigkeit." }
  ],
  "explanation": "Textstruktur covers the build of the text type, paragraphs, line of thought and links."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "negative-area",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["grading"],
  "misconception": "average-grade",
  "question": "Text 1 leaves out one of the three instructions entirely, so its Inhalt is \"nicht erfüllt\". Text 2 and the language of both texts are excellent. What follows?",
  "options": [
    { "text": "The exam is negative, because the area Inhalt and Textstruktur of text 1 is not positive.", "correct": true, "feedback": "Yes: every area must be positive." },
    { "text": "About Befriedigend, as the average of excellent and failed parts.", "correct": false, "feedback": "The grid does not average across areas." },
    { "text": "Gut, because style and accuracy cover both texts.", "correct": false, "feedback": "Language cannot make up for a missing part of the task." },
    { "text": "Only text 2 counts, because text 1 is incomplete.", "correct": false, "feedback": "Both texts are part of the exam." }
  ],
  "explanation": "Each of the three areas (text 1, text 2, language of both) must be at least \"mostly fulfilled\"; otherwise the exam is Nicht genügend."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "levels-order",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["grading"],
  "instruction": "Order the levels of the grid from lowest to highest.",
  "items": [
    "nicht erfüllt",
    "in den wesentlichen Bereichen überwiegend erfüllt",
    "in den wesentlichen Bereichen zur Gänze erfüllt",
    "über das Wesentliche hinausgehend erfüllt"
  ],
  "explanation": "\"Überwiegend\" is enough for Genügend, \"zur Gänze\" for Befriedigend, \"darüber hinaus\" for Gut and Sehr gut."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "copied-content",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["dimensions", "grading"],
  "misconception": "copying-is-content",
  "question": "A Kommentar of 300 words consists to two thirds of sentences copied from the Textbeilage; the own opinion is one sentence at the end. Where is the main problem?",
  "options": [
    { "text": "Inhalt: the writing act (comment with a justified opinion) is hardly carried out.", "correct": true, "feedback": "Yes: copying is not commenting." },
    { "text": "Sprachrichtigkeit: copied sentences count as errors.", "correct": false, "feedback": "They are not errors; they are simply not the asked achievement." },
    { "text": "None: the copied sentences are correct, so the text is fine.", "correct": false, "feedback": "Correct sentences from someone else do not carry out the task." }
  ],
  "explanation": "Content is judged by what the writer does with the source: reproduce briefly where asked, but argue, analyse or judge in their own words."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "assess-paragraph",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["self-assess", "dimensions"],
  "misconception": "errors-only",
  "question": "Beurteile diesen Schluss eines Leserbriefs nach den vier Dimensionen des Rasters und nenne die eine Änderung, die ihn am meisten verbessern würde. Der Arbeitsauftrag lautete: „Appellieren Sie an die Gemeinde, das Jugendzentrum zu erhalten.“\n\n„Also ich finde das Jugendzentrum ist voll wichtig, weil da sind viele Jugendliche. Es gibt dort viele Sachen und man kann viele Sachen machen. Deshalb finde ich das man das nicht schließen sollte. Das wars von meiner Seite.“",
  "rubric": [
    "Inhalt: the appeal to the municipality is missing (no request addressed to it); the reason is vague (no concrete activities, no consequence of closing)",
    "Textstruktur: the conclusion repeats instead of rounding off; no link back to the article; closing phrase unsuited to a letter",
    "Stil und Ausdruck: colloquial (\"voll wichtig\", \"Das wars\"), repetitions (\"viele Sachen\" twice), \"weil\" with main-clause word order",
    "Sprachrichtigkeit: missing commas (\"finde, das Jugendzentrum\"), \"das\" instead of \"dass\", \"wars\" instead of \"war's\"",
    "Names one main improvement: turn it into a real appeal to the municipality with a concrete reason"
  ],
  "sample_answer": "Inhalt: Der Arbeitsauftrag verlangt einen Appell an die Gemeinde, der fehlt. Es gibt nur eine vage Begründung („viele Sachen“), keine konkreten Angebote und keine Folgen einer Schließung. Textstruktur: Der Schluss wiederholt nur und rundet nicht ab; „Das wars von meiner Seite“ passt nicht zu einem Leserbrief. Stil und Ausdruck: umgangssprachlich („voll wichtig“), Wiederholungen („viele Sachen“), „weil“ mit Hauptsatzstellung. Sprachrichtigkeit: Kommas fehlen („Ich finde, das Jugendzentrum …“), „das“ statt „dass“, „wars“ statt „war’s“. Wichtigste Änderung: ein echter Appell mit konkretem Grund, z. B. „Ich bitte den Gemeinderat daher, das Jugendzentrum zu erhalten, denn für über hundert Jugendliche ist es der einzige Ort, an dem sie sich am Abend ohne Konsumzwang treffen können.“",
  "explanation": "The biggest loss is in Inhalt: the operator \"appellieren\" was not carried out. Style and errors matter too, but fixing them would not fill that gap."
}
```

# Tutor notes

- When the learner hands in a text, give feedback in the order of the grid: Inhalt (each bullet point), Textstruktur, Stil und Ausdruck, Sprachrichtigkeit, each with the level and one concrete example from the text.
- Do not mark every error: group errors by type (das/dass, commas, capitals) and name the two or three most frequent; let the learner find the instances.
- Say which single change would raise the text most; usually it is in Inhalt.
- Be honest about the level, but do not predict an exam grade from one text.
- The exact wording of the official grid and its 15 descriptors is published by the BMBWF; when the learner has it from school, use it alongside this element.

# Sources

Grounding: [^srdp-deutsch-raster], [^lbvo]. Text, examples and questions are original.

[^srdp-deutsch-raster]: Bundesministerium für Bildung, Wissenschaft und Forschung, Beurteilungsraster zur SRDP in der Unterrichtssprache, Handreichung zum Beurteilungsraster and Korrektur- und Beurteilungsanleitung, matura.gv.at.
[^lbvo]: Leistungsbeurteilungsverordnung, § 14 (Beurteilungsstufen).
