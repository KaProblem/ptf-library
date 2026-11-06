---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/open-tasks
title: Open interpretation tasks
description: The open writing tasks of the Austrian AHS Latin Matura – comparing with a second text, taking a personal position, answering guiding questions and creative writing (dialogue, letter, story) – with their word limits and how they are marked.
lang: en
levels: [highschool]
objectives:
  - id: ot-compare
    text: Compare the Latin text with a comparison text or picture and state the required number of essential similarities or differences in full sentences.
  - id: ot-position
    text: Take a personal position on a quotation from the text, rendering its content correctly and giving a reasoned opinion.
  - id: ot-creative
    text: Write a creative text (dialogue, letter, diary, story) that uses the required number of contents of the Latin text correctly and fits the text type.
  - id: ot-format
    text: "Keep the formal rules of open tasks: full sentences, word limit (no more than 10 % over), no quotations from the introduction or the task, exactly the requested number of points."
tags: [latin, matura, austria, ahs, interpretation, writing, reception]
duration_min: { highschool: 75 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), offene Aufgabenformate und Korrekturhinweise"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: in 60 words, would you rather be Alexander or Diogenes? Count your words afterwards.
- The last four or five interpretation tasks are open: compare, take a position, answer guiding questions, write creatively. Together they bring 9 to 11 of the 24 IT points.
- Afterwards the learner writes short, precise answers that hit the expected contents and keep the formal rules.

# Core

Open tasks are marked with an expectation (Erwartungshorizont): a list
of contents that earn one point each. A comparison asks for a set number
of essential similarities or differences between the Latin text and a
modern or ancient comparison text (or a picture); each must be true for
both texts and stated in a full sentence. A position (Stellungnahme) has
two parts: one point for rendering the content of the quotation
correctly, one for a reasoned personal opinion. Guiding questions
(Leitfragen) each earn a point when answered according to the text. A
creative task (dialogue, letter, diary entry, speech, story) earns a point
for each correctly used content of the Latin text and must respect the
text type (in a dialogue each person speaks at least twice). Formal
rules apply to all: full sentences, word limit (more than 10 % over costs
a point), no quotations from the introduction, notes or task, and not more
points than asked – every extra point that does not fit the text costs
one.

# Key facts

- Typical limits: comparison max. 60–90 words, position max. 60, guiding questions max. 60, creative text max. 100–120 words.
- 10 % rule: with a limit of 60 words, 66 are still accepted, 67 cost a point; with 100, 110 are accepted.
- Comparison: name the point and show it in both texts ("In both texts …"). Differences need both sides.
- Position: (1) what the quotation says, in your words; (2) your opinion + a reason ("I agree, because …").
- Creative text: count the contents from the Latin text you use (usually 3) and make them recognisable; keep the text type (salutation for a letter, speaker names for a dialogue).
- Deductions: wrong extra information (−1 each, in comparisons and positions); a false addition to a correct answer makes it 0; form violations −1.

# Level: highschool

<!-- ptf:text v1 -->

Plan before you write: list the points you want to make (two for a
comparison, three for a creative task), check each against the Latin
text, then write one or two sentences per point.

Position on *Nisi Alexander essem, Diogenes esse vellem*: first the
content – Alexander admires Diogenes because he needs nothing and is
free. Then your view with a reason: "I think freedom from needs is
admirable, but a ruler who lived like Diogenes could not help his
people."

Count your words at the end. Contractions and numbers count as words; the
limit is a strict frame.

# Misconceptions

- **more-is-better**: Writing more points than asked earns extra points → only the asked number counts, and wrong extras cost points.
- **opinion-only**: A position is just my opinion → it also needs the content of the quotation, rendered correctly.
- **creative-free**: In a creative task anything goes → points come only for contents of the Latin text used correctly.
- **limit-soft**: The word limit is a guideline → more than 10 % over costs a point.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "word-limit",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ot-format"],
  "misconception": "limit-soft",
  "question": "The task says 'max. 60 words'. Which answers lose a point for length?",
  "options": [
    { "text": "An answer of 68 words", "correct": true, "feedback": "Yes: more than 66 (60 + 10 %)." },
    { "text": "An answer of 72 words", "correct": true, "feedback": "Yes." },
    { "text": "An answer of 66 words", "correct": false, "feedback": "Exactly 10 % over is still accepted." },
    { "text": "An answer of 45 words", "correct": false, "feedback": "Shorter is fine if the contents are there." }
  ],
  "explanation": "Up to 10 % over the limit is tolerated."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "position-parts",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ot-position"],
  "misconception": "opinion-only",
  "question": "Task: take a position on 'Nisi Alexander essem, Diogenes esse vellem' (max. 60 words, 2 points). Which answer earns both points?",
  "options": [
    { "text": "Alexander says that he would like to be Diogenes if he were not king, because he admires his freedom from all needs. I agree only partly: being content with little is admirable, but someone has to rule and care for others.", "correct": true, "feedback": "Yes: content + reasoned opinion, under 60 words." },
    { "text": "I think Diogenes is cool and I would also like to lie in the sun all day.", "correct": false, "feedback": "No content of the quotation, and the opinion is not about it." },
    { "text": "Alexander says that he would like to be Diogenes if he were not king.", "correct": false, "feedback": "Content only, no opinion: 1 point." }
  ],
  "explanation": "One point for the content, one for the reasoned opinion."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "compare-texts",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ot-compare", "ot-format"],
  "question": "Comparison text (modern): 'A billionaire once said in an interview that his happiest days were a summer spent with a tent and a bicycle, when he owned almost nothing.' Name two essential similarities with the Diogenes text (full sentences, max. 60 words).",
  "rubric": [
    "Both texts present a simple life with few possessions as happy or desirable",
    "In both, someone with great wealth or power admires (or recalls) a life without wealth",
    "Full sentences, at most 66 words, no extra wrong points"
  ],
  "sample_answer": "In both texts a simple life with very few possessions appears happy and desirable. In both, a man with great wealth or power values such a life: Alexander admires Diogenes, and the billionaire remembers his time with almost nothing as his happiest.",
  "explanation": "Each similarity must hold for both texts."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "creative-dialogue",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ot-creative", "ot-format"],
  "question": "Write a dialogue between two of Alexander's companions on the way back from Diogenes. Use three contents of the text; each speaks at least twice (max. 100 words).",
  "rubric": [
    "Content 1: the king offered Diogenes anything he wanted",
    "Content 2: Diogenes only asked the king to move out of his sun",
    "Content 3: Alexander said he would like to be Diogenes if he were not Alexander",
    "Dialogue form, each speaker at least twice, at most 110 words"
  ],
  "sample_answer": "Lucius: Did you see that? The king offered him anything he wanted! Gaius: And the fool only asked him to step out of his sun. Lucius: We laughed, but Alexander did not. Gaius: No. He said that if he were not Alexander, he would want to be Diogenes. Lucius: Maybe the old man is richer than all of us. Gaius: Richer? He lives in a barrel!",
  "explanation": "Three recognisable contents, correct text type, within the limit."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "extra-points",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ot-format", "ot-compare"],
  "misconception": "more-is-better",
  "question": "A comparison task asks for two similarities. A candidate writes three: two correct, one that does not fit the texts. How many of the 2 points are given?",
  "options": [
    { "text": "1", "correct": true, "feedback": "Yes: 2 correct, minus 1 for the wrong extra." },
    { "text": "2", "correct": false, "feedback": "Extra wrong similarities are deducted." },
    { "text": "3", "correct": false, "feedback": "The task gives at most 2 points." },
    { "text": "0", "correct": false, "feedback": "Only one point is deducted per wrong extra." }
  ],
  "explanation": "Write exactly the number of points asked."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "open-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ot-creative", "ot-format"],
  "misconception": "creative-free",
  "question": "In a creative letter from Diogenes to a friend (3 points for contents), what earns the points?",
  "options": [
    { "text": "Three contents of the Latin text used correctly, in letter form", "correct": true, "feedback": "Yes." },
    { "text": "An original, funny story about Diogenes, whatever happens in it", "correct": false, "feedback": "Points come from contents of the Latin text." },
    { "text": "Long quotations from the introduction", "correct": false, "feedback": "Quotations from the introduction should be avoided." }
  ],
  "explanation": "Creative tasks are marked by text contents and text type."
}
```

# Tutor notes

- Train with a timer and a word counter; the learner should know how 60 words feel.
- After each open answer, mark it with the expectation list: which points were made, which were wrong extras?

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original;
the modern comparison text is invented for this course.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): open interpretation tasks and marking notes.
