---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/summary
title: Summary (Zusammenfassung)
description: The Zusammenfassung of the German Matura, a neutral, condensed reproduction of a non-fiction text in the present tense and in one's own words, with an original practice task, rubric and sample text.
lang: en
levels: [highschool]
objectives:
  - id: features
    text: Name and apply the features of a Zusammenfassung (neutral, present tense, own words, reported speech in Konjunktiv I, no own opinion).
  - id: intro-sentence
    text: Write an introductory sentence with author, title, text type, source, date and the core statement of the text.
  - id: condense
    text: Find the main statements of each section and condense them, leaving out examples and details.
  - id: write
    text: Write a complete Zusammenfassung of a non-fiction text within a given word range.
requires:
  - ptf:el/ahs-matura-deutsch/language-accuracy
tags: [german, matura, text-type, summary, zusammenfassung]
duration_min: { highschool: 90 }
sources:
  - id: srdp-textsorten
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Textsortenkatalog zur SRDP in der Unterrichtssprache, Zusammenfassung"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: tell a friend in three sentences what the last article you read was about, without saying what you think of it. Harder than it sounds?
- The Zusammenfassung is the most clearly defined text type of the Matura: the reader should learn what a text says without having read it, neutrally and in a fraction of its length.
- Afterwards the learner can write a complete Zusammenfassung within a word range.

# Core

A Zusammenfassung reproduces the main statements of a non-fiction text in
a fraction of its length, so that someone who has not read the text knows
what it says. It starts with an introductory sentence (author, title, text
type, source, date, core statement), follows the line of thought of the
text in its own words, stays neutral and in the present tense, marks the
author's views with reporting verbs and Konjunktiv I, and leaves out
examples, details and the writer's own opinion.

# Key facts

- Introductory sentence: „In ihrem Zeitungsbericht ‚Titel‘ (Quelle, Datum) befasst sich [Autorin] mit … und zeigt, dass …“
- Tense: present; earlier events in the perfect. Reported views: Konjunktiv I („Die Autorin meint, Bäume seien …“) or reporting verbs with dass and indicative is acceptable in places; the attribution must stay clear.
- Own words: no copied sentences; at most a short quotation for a key term, in „…“.
- Condensing: one main statement per section; generalise (several examples → one generic term), leave out examples, figures that only illustrate, repetitions and direct speech.
- No own opinion, no evaluation, no „ich“, unless an Arbeitsauftrag asks for a short assessment at the end.
- Reporting verbs: erklärt, beschreibt, betont, kritisiert, fordert, weist darauf hin, räumt ein, schlägt vor, kommt zu dem Schluss.
- Typical operators: wiedergeben, zusammenfassen, beschreiben (Anforderungsbereich I); in the exam usually 270–330 words for a source text of one to two pages.

# Level: highschool

<!-- ptf:text v1 -->

Telling a friend what an article said, without your own opinion, is exactly
the job. The reader of a Zusammenfassung has not read the text and wants
to know what it says, in a fraction of the length.

Start with one sentence that names everything: who wrote what, where and
when, and what the core statement is. „In ihrem Zeitungsbericht ‚Schatten
ist das neue Gold‘ (Wiener Morgenblatt, 12. Juni 2026) befasst sich Lena
Moser mit der Frage, wie Städte sich gegen Hitze schützen können.“

Then go through the text section by section. Write one main statement per
section in your own words, and generalise: instead of "Sonnensegel,
Trinkbrunnen, Sprühnebel" write "rasch umsetzbare Maßnahmen" if the details
do not matter. Leave out examples and quotations.

Stay neutral: no "ich", no "zum Glück", no judgement. Write in the present
tense and make clear that the views are the author's: „Die Autorin betont,
…“, „Laut Moser brauche ein Baum …“.

# Misconceptions

- **retell-everything**: A good summary keeps as many details as possible → it keeps the main statements and leaves out examples and details.
- **copy-key-sentences**: Copying the key sentences is summarising → the main statements are put in one's own words and condensed.
- **opinion-at-end**: A summary ends with one's own opinion → it stays neutral unless an Arbeitsauftrag explicitly asks for an assessment.
- **past-tense-retelling**: A summary is told in the past tense like a story → it is written in the present tense.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "summary-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["features"],
  "misconception": "opinion-at-end",
  "question": "Which two sentences may stand in a Zusammenfassung?",
  "options": [
    { "text": "„Die Autorin weist darauf hin, dass junge Bäume regelmäßig gegossen werden müssen.“", "correct": true, "feedback": "Yes: neutral, present tense, attributed." },
    { "text": "„Laut Moser brauche ein junger Baum zehn bis zwanzig Jahre, bis er spürbar Schatten spendet.“", "correct": true, "feedback": "Yes: reported speech in Konjunktiv I." },
    { "text": "„Ich finde, die Stadt sollte sofort mehr Bäume pflanzen.“", "correct": false, "feedback": "Own opinion has no place in a Zusammenfassung." },
    { "text": "„Die Autorin schrieb einen sehr spannenden Bericht.“", "correct": false, "feedback": "Evaluation, and past tense." },
    { "text": "„Wer an einem Julinachmittag über einen asphaltierten Platz geht, spürt es sofort.“", "correct": false, "feedback": "Copied sentence from the text, and an illustrating scene, not a main statement." }
  ],
  "explanation": "Neutral, present tense, own words, attributed to the author."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "intro-sentence",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["intro-sentence"],
  "question": "Which introductory sentence is complete?",
  "options": [
    { "text": "„In ihrem Zeitungsbericht ‚Schatten ist das neue Gold‘ (Wiener Morgenblatt, 12. Juni 2026) befasst sich Lena Moser mit der Frage, wie Städte sich gegen Sommerhitze schützen können, und zeigt, dass Bäume dabei Zeit, Pflege und Platz brauchen.“", "correct": true, "feedback": "Yes: text type, title, source, date, author, topic and core statement." },
    { "text": "„Der Text handelt von Bäumen.“", "correct": false, "feedback": "Author, title, source, date and core statement are missing." },
    { "text": "„Lena Moser hat einen interessanten Text über Hitze geschrieben.“", "correct": false, "feedback": "Evaluation instead of core statement; title and source missing." }
  ],
  "explanation": "The introductory sentence names text type, title, source, date, author and the core statement."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "condense-section",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["condense"],
  "misconception": "retell-everything",
  "question": "A section of the text lists sun sails over playgrounds, drinking fountains, mist sprayers, green facades and lighter pavements, which are quick to install but do not replace a grown tree. Which sentence condenses it best?",
  "options": [
    { "text": "„Als rasch umsetzbare Ergänzungen nennt die Autorin technische und bauliche Maßnahmen, die einen ausgewachsenen Baum jedoch nicht ersetzen.“", "correct": true, "feedback": "Yes: generalised, with the main point (no replacement)." },
    { "text": "„Es gibt Sonnensegel über Spielplätzen, Trinkbrunnen, Sprühnebelanlagen, begrünte Fassaden und hellere Beläge.“", "correct": false, "feedback": "A list of details, and the main point (no replacement) is missing." },
    { "text": "„Sonnensegel sind eine gute Idee.“", "correct": false, "feedback": "One detail, and an evaluation." }
  ],
  "explanation": "Generalise details into a generic term and keep the statement the section makes."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "summary-steps",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["condense", "write"],
  "misconception": "copy-key-sentences",
  "instruction": "Order the steps for writing a Zusammenfassung.",
  "items": [
    "Read the Arbeitsaufträge and the whole text once",
    "Divide the text into sections and note one main statement per section in your own words",
    "Write the introductory sentence with author, title, text type, source, date and core statement",
    "Write the summary along the sections, with reporting verbs and Konjunktiv I",
    "Check length, tense, neutrality and the Arbeitsaufträge"
  ],
  "explanation": "Understand first, condense in your own words, then write and check."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "tense-check",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["features"],
  "misconception": "past-tense-retelling",
  "question": "Which sentence has the right tense and form for a Zusammenfassung?",
  "options": [
    { "text": "„Moser betont, dass die Bäume für die Zukunft heute gepflanzt werden müssten.“", "correct": true, "feedback": "Yes: present tense reporting verb, reported content in Konjunktiv." },
    { "text": "„Moser betonte, dass man die Bäume heute pflanzen musste.“", "correct": false, "feedback": "Past tense: a Zusammenfassung is written in the present." },
    { "text": "„Zum Schluss hat sie dann noch gesagt, man muss jetzt pflanzen.“", "correct": false, "feedback": "Spoken narrative style, perfect tense, no Konjunktiv." }
  ],
  "explanation": "Present tense for the summary itself, Konjunktiv for reported views."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "summary-task",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["write", "intro-sentence", "condense", "features"],
  "misconception": "retell-everything",
  "question": "Schreibauftrag (Übungsformat, kürzer als in der Klausur)\nThema: Hitze in der Stadt\nVerfassen Sie eine Zusammenfassung für die Umweltseite Ihrer Schulwebsite (130–160 Wörter). Lesen Sie den Zeitungsbericht „Schatten ist das neue Gold“ (Textbeilage, für diesen Kurs verfasst).\nAufgabenstellung:\n• Geben Sie wieder, warum Städte sich im Sommer stark aufheizen.\n• Beschreiben Sie, welche Rolle die Autorin Bäumen zuschreibt und welche Schwierigkeiten sie nennt.\n• Geben Sie die weiteren Maßnahmen und das Fazit der Autorin wieder.\n\nTextbeilage: Lena Moser, „Schatten ist das neue Gold“, Wiener Morgenblatt, 12. Juni 2026\n\nWer an einem Julinachmittag über einen asphaltierten Platz geht, spürt es sofort: Die Hitze kommt nicht nur von oben, sie strahlt auch vom Boden zurück. Messungen in mehreren europäischen Städten zeigen, dass dicht bebaute Viertel nachts um mehrere Grad wärmer bleiben als das Umland. Fachleute sprechen vom Wärmeinsel-Effekt. Stein, Beton und Asphalt speichern tagsüber Wärme und geben sie nachts wieder ab; gleichzeitig fehlt in engen Straßen der Wind, der die Luft abkühlen könnte.\n\nFür die Gesundheit ist das kein Detail. Vor allem ältere Menschen, kleine Kinder und chronisch Kranke leiden unter Nächten, in denen die Temperatur nicht unter zwanzig Grad sinkt. Ärztinnen und Ärzte berichten in Hitzeperioden von mehr Kreislaufproblemen. Wer in einer kleinen Dachgeschoßwohnung ohne Klimaanlage lebt, hat kaum eine Möglichkeit, der Hitze auszuweichen.\n\nAls wirksamste Gegenmaßnahme gelten Bäume. Ein großer Stadtbaum spendet nicht nur Schatten, er verdunstet an heißen Tagen auch viel Wasser und kühlt damit seine Umgebung. Unter einer dichten Baumkrone ist es spürbar kühler als auf einem Platz ohne Schatten. Viele Städte haben deshalb angekündigt, Tausende neue Bäume zu pflanzen.\n\nDoch Stadtgärtnerinnen und -gärtner warnen vor zu einfachen Rechnungen. Ein junger Baum braucht zehn bis zwanzig Jahre, bis seine Krone groß genug ist, um spürbar Schatten zu spenden. In dieser Zeit muss er regelmäßig gegossen werden, besonders in trockenen Sommern. Unter vielen Straßen liegen zudem Leitungen für Strom, Gas und Fernwärme, sodass für Wurzeln wenig Platz bleibt. Ein Baum, der in einer zu kleinen Baumscheibe steht, wächst kaum und stirbt oft nach wenigen Jahren. „Ein gepflanzter Baum ist noch kein Schattenbaum“, sagt eine Stadtgärtnerin.\n\nHinzu kommt die Frage der Arten. Manche Baumarten, die heute viele Alleen prägen, vertragen Hitze und Trockenheit schlecht. Städte setzen deshalb zunehmend auf Arten aus wärmeren Regionen. Ob sich diese langfristig bewähren, weiß man allerdings noch nicht.\n\nWeil Bäume Zeit brauchen, kombinieren manche Städte sie mit schnelleren Lösungen: Sonnensegel über Spielplätzen, Trinkbrunnen, Sprühnebelanlagen und begrünte Fassaden. Auch hellere Beläge, die weniger Sonnenlicht aufnehmen, können Plätze kühler machen. Solche Maßnahmen sind rasch umgesetzt, ersetzen aber nicht die Wirkung eines ausgewachsenen Baumes.\n\nAm Ende ist es auch eine Frage des Platzes. Wo ein Baum stehen soll, kann kein Auto parken. In vielen Bezirken führt das zu Konflikten zwischen Anrainerinnen und Anrainern, die ihren Parkplatz behalten wollen, und jenen, die sich mehr Grün wünschen. Stadtplanerinnen und Stadtplaner betonen, dass sich solche Entscheidungen nicht aufschieben lassen: Die Bäume, die in zwanzig Jahren Schatten spenden sollen, müssen heute gepflanzt werden.",
  "rubric": [
    "Inhalt, bullet 1: heat island explained (built surfaces store heat and release it at night, little wind), consequences for vulnerable people",
    "Inhalt, bullet 2: trees as the most effective measure (shade, evaporation) and the difficulties: years until they work, watering, little room for roots, species that suffer from heat",
    "Inhalt, bullet 3: quick additional measures that do not replace trees, conflict over parking, conclusion that trees must be planted now",
    "Inhalt: no own opinion, no invented content, no copied sentences",
    "Textstruktur: introductory sentence with author, title, text type, source, date and core statement; follows the line of thought of the text; paragraphs",
    "Stil und Ausdruck: neutral, present tense, varied reporting verbs, Konjunktiv I for the author's views; generic terms instead of lists",
    "Sprachrichtigkeit: commas before subordinate clauses, Konjunktiv forms",
    "Length 130–160 words"
  ],
  "sample_answer": "In ihrem Zeitungsbericht „Schatten ist das neue Gold“ (Wiener Morgenblatt, 12. Juni 2026) befasst sich Lena Moser mit der Frage, wie Städte sich gegen Sommerhitze schützen können, und zeigt, dass Bäume dabei Zeit, Pflege und Platz brauchen.\n\nBebaute Flächen speichern laut der Autorin tagsüber Wärme und geben sie nachts ab, sodass dicht bebaute Viertel wärmer bleiben als das Umland. Das gefährde vor allem ältere Menschen, Kinder und Kranke.\n\nAls wirksamste Gegenmaßnahme gelten Bäume, weil sie Schatten spenden und durch Verdunstung kühlen. Allerdings wirke ein junger Baum erst nach Jahren und nur mit Pflege, unter Straßen fehle oft Platz für Wurzeln, und manche Arten vertrügen Hitze schlecht.\n\nRasch umsetzbare bauliche Maßnahmen ergänzen Bäume laut Moser, ersetzen sie aber nicht. Abschließend weist die Autorin auf Konflikte um Parkplätze hin und betont, dass die Bäume für die Zukunft schon heute gepflanzt werden müssten.",
  "explanation": "The sample follows the line of the text (cause, trees, their limits, other measures, conclusion) in about a third of its length, generalises the details and stays neutral."
}
```

# Tutor notes

- Use the practice task first with the given length; then, when the learner is ready, ask for 270–330 words on a longer text of their choice (a newspaper report or feature of one to two pages).
- Before the learner writes, ask them to state the core statement of the whole text in one sentence; if they cannot, they have not understood the text yet.
- The Textbeilage and its newspaper are invented for this course; tell the learner if they ask.

# Sources

Grounding: [^srdp-textsorten]. Text, Textbeilage, examples and questions are original.

[^srdp-textsorten]: Bundesministerium für Bildung, Wissenschaft und Forschung, Textsortenkatalog zur SRDP in der Unterrichtssprache, Zusammenfassung, matura.gv.at.
