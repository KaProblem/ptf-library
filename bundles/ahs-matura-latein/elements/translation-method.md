---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/translation-method
title: Translating a Matura text
description: How the translation part of the Austrian AHS Latin Matura is marked (sense units, vocabulary, morphology and syntax checkpoints, language points) and a step-by-step method to decode and translate an unseen text with a dictionary.
lang: en
levels: [highschool]
objectives:
  - id: tm-sense-units
    text: Render the content of every sense unit of an unseen text so that a reader understands what happens, even where details are still unclear.
  - id: tm-decode
    text: Decode a long sentence step by step (predicates, subordinate clauses, constructions, then the main clause) before writing the translation.
  - id: tm-aids
    text: Use the introduction, footnotes, notes on content, construction aids and the dictionary as the exam intends.
  - id: tm-target-language
    text: Write a translation in correct, natural German that keeps the meaning of the Latin, and know how it is marked.
tags: [latin, matura, austria, ahs, srp, translation, exam-preparation]
duration_min: { highschool: 90 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Aufgaben- und Korrekturhefte"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: read this sentence and say in one plain sentence what happens, before translating a single word: *Androclus servus, cum a domino crudeli fugisset, in speluncam quandam se abdidit.*
- The translation part of the Latin Matura is worth 36 of 60 points. Most of them are not given for a perfect sentence but for *checkpoints*: did the reader get the content of each sense unit, the meaning of a few tricky words, a few forms and a few constructions?
- Afterwards the learner can work through an unseen text of about 110 to 130 words in a fixed order, knows where the points are, and writes a translation that reads like German.

# Core

The exam text (Übersetzungstext, ÜT) is marked with 30 checkpoints of one
point each plus up to 6 points for language. The text is split into 12
sense units (SE): a unit scores when its content is rendered correctly in
substance, even if a form is wrong. Six vocabulary checkpoints (LE) ask
for a meaning that fits the context, six morphology checkpoints (MO) for
a correctly rendered form (case, number, tense, comparison), and six syntax
checkpoints (SY) for a correctly rendered construction (AcI, participle,
ablative absolute, subordinate clause). Language (Sprache) gives 2, 4 or 6
points for correct and natural German. A translation therefore starts with
understanding: read the introduction and the whole text first, then decode
sentence by sentence (find every predicate, bracket subordinate clauses
and constructions, solve the main clause, then fit the rest in), and only
then write. The dictionary and the official prefix/suffix list are allowed;
footnotes and construction aids are part of the task, not a hint to skip.

# Key facts

- Points: ÜT 36 = 12 SE + 6 LE + 6 MO + 6 SY + 6 Sprache; interpretation part (IT) 24; total 60.
- A positive result needs at least 18 points in the ÜT and at least 12 in the IT (so at least 30 in total); the grade bands are 60–53 Sehr gut, 52–45 Gut, 44–37 Befriedigend, 36–30 Genügend, 29–0 Nicht genügend.
- Working time: 270 minutes for both parts together. Allowed: a (possibly electronic) dictionary without communication and the BMB prefix/suffix list; no AI tools.
- Text length (4-year Latin): the two texts together are at most about 210 words, the ÜT about 110–130, the IT about 80–100. The 2026 texts had 117 + 92 (4-year) and 126 + 83 (6-year) words.
- Each text comes with an introduction (Einleitung), numbered footnotes for words and constructions and lettered notes on content (Sachangaben). A "Konstruktionshilfe" rewrites a hard phrase in plain word order.
- Decoding order: 1 mark predicates (finite verbs), 2 bracket subordinate clauses by their conjunction or relative pronoun, 3 mark constructions (AcI, participles, ablative absolute, gerundive), 4 solve the main clause (predicate, subject, objects), 5 attach the rest, 6 write the German.
- Matura terms (German): Übersetzungstext, Interpretationstext, Sinneinheit (SE), Lexik (LE), Morphologie (MO), Syntax (SY), Checkpoint, Sachangabe, Konstruktionshilfe, Erwartungshorizont.

# Level: highschool

<!-- ptf:text v1 -->

Before translating, find out what happens. The introduction tells you who
is who and where you are; the notes under the text tell you what a strange
word or name means. Then read the whole text once and say in your own
words what it is about. In the sentence about Androclus: a slave runs away
from a cruel master and hides in a cave.

Now decode. In *Androclus servus, cum a domino crudeli fugisset, in
speluncam quandam se abdidit* there are two predicates: *fugisset*
(subjunctive, inside a *cum* clause) and *abdidit* (the main verb). Bracket
the *cum* clause, solve the main clause (Androclus the slave hid himself in
a cave) and then fit the clause in: "When the slave Androclus had fled from
his cruel master, he hid in a cave."

Points come from content first. If one form goes wrong, the sense unit can
still score; if the whole sentence is guessed from single words, it
cannot. Write German that sounds like German: an ablative absolute becomes
a clause, a long Latin sentence may become two German sentences.

# Misconceptions

- **word-by-word**: Translating means replacing every Latin word in order → you first find the structure (predicates, clauses, constructions) and then write the content in German word order.
- **first-meaning**: The first meaning in the dictionary is the right one → the entry lists many meanings; the context decides (LE checkpoints test exactly this).
- **perfect-or-nothing**: One mistake ruins the sentence's points → sense units are scored for content; a single wrong form costs at most its MO or SY checkpoint.
- **skip-notes**: Footnotes and the introduction are optional extras → they often contain the key to a sense unit; the Konstruktionshilfe shows the intended structure.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gist-first",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "word-by-word",
  "question": "Androclus servus, cum a domino crudeli fugisset, in speluncam quandam se abdidit. What happens in this sentence?",
  "options": [
    { "text": "A slave who has run away from a cruel master hides in a cave", "correct": true, "feedback": "Yes: that is the content of the sense unit." },
    { "text": "A cruel master hides his slave in a cave", "correct": false, "feedback": "The master is in the ablative after a (from): the slave flees from him." },
    { "text": "A slave flees into a cave with his master", "correct": false, "feedback": "a domino means away from the master, not with him." }
  ],
  "explanation": "servus is the subject of both verbs; a domino crudeli is from the cruel master."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "points-split",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tm-sense-units", "tm-target-language"],
  "text": "The translation part is worth {{1}} points: 12 sense units, 6 vocabulary, 6 morphology and 6 syntax checkpoints, plus up to {{2}} points for language. To pass, you need at least {{3}} points in it.",
  "gaps": [
    { "answer": "36" },
    { "answer": "6" },
    { "answer": "18" }
  ],
  "explanation": "12 + 6 + 6 + 6 = 30 checkpoints of one point, plus 2, 4 or 6 language points; the minimum is half of 36."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pass-or-fail",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tm-sense-units"],
  "question": "A candidate scores 20 points in the translation part and 11 in the interpretation part (31 in total). Which statement is true?",
  "options": [
    { "text": "The exam is negative because the interpretation part is below 12 points", "correct": true, "feedback": "Yes: both parts need their minimum (18 and 12)." },
    { "text": "The exam is positive (Genügend) because 31 ≥ 30", "correct": false, "feedback": "The total alone is not enough; each part has a minimum." },
    { "text": "The exam is positive because the translation part has at least 18", "correct": false, "feedback": "The interpretation part also needs at least 12." }
  ],
  "explanation": "Positive only with ÜT ≥ 18, IT ≥ 12 and a total of at least 30."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "decode-order",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tm-decode"],
  "misconception": "word-by-word",
  "instruction": "Put the steps for decoding a long Latin sentence in a good order.",
  "items": [
    "Read the introduction and the whole text for the gist",
    "Mark every finite verb (predicate)",
    "Bracket subordinate clauses and constructions (AcI, participles, ablative absolute)",
    "Solve the main clause: predicate, subject, objects",
    "Attach the brackets to the main clause",
    "Write the translation in natural German"
  ],
  "explanation": "Structure before words: the predicates show how many clauses there are, the main clause carries the sentence."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "construction-aid",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tm-aids"],
  "misconception": "skip-notes",
  "question": "Under a text you find: 'Konstruktionshilfe: servus timebat, ne dominus se inveniret'. What is it for?",
  "options": [
    { "text": "It puts the words of a hard passage in an easier order, so you can see which words belong together", "correct": true, "feedback": "Yes: translate the text, using the aid to understand its structure." },
    { "text": "It is the translation you should copy", "correct": false, "feedback": "It is still Latin; you translate the passage yourself." },
    { "text": "It is an alternative text you may translate instead", "correct": false, "feedback": "You translate the original passage; the aid only explains it." },
    { "text": "It marks a passage that is not marked and can be skipped", "correct": false, "feedback": "Passages with aids usually hold sense units and SY checkpoints." }
  ],
  "explanation": "Footnotes, Sachangaben and construction aids are part of the task."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "natural-german",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tm-target-language"],
  "question": "Leo pede vulnerato gemens ad speluncam venit. Which rendering keeps the meaning and reads naturally (as it would in German)?",
  "options": [
    { "text": "The lion came to the cave groaning, because its paw was wounded", "correct": true, "feedback": "Yes: the ablative absolute becomes a clause, the participle gemens an adverbial." },
    { "text": "The lion, with the paw having been wounded, groaning, came to the cave", "correct": false, "feedback": "Correct forms, but not natural language: costs language points." },
    { "text": "The lion wounded its paw and came groaning to the cave", "correct": false, "feedback": "pede vulnerato is passive and not done by the lion in the sentence; the meaning changes." },
    { "text": "The groaning cave came to the wounded lion", "correct": false, "feedback": "Wrong relations: leo is the subject, gemens agrees with leo." }
  ],
  "explanation": "Keep the Latin relations, then choose the German structure that sounds natural."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "translate-androclus",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["tm-decode", "tm-target-language", "tm-sense-units"],
  "question": "Translate: Servus primo valde timuit; sed leo mitis appropinquavit et pedem ei ostendit, quasi auxilium peteret. Androclus spinam ingentem e pede eius extraxit. (mitis: gentle; spina: thorn)",
  "rubric": [
    "The slave is afraid at first",
    "The lion comes closer gently and shows him its paw",
    "quasi + subjunctive rendered as 'as if it were asking for help'",
    "Androclus pulls a huge thorn out of its paw",
    "Natural target-language sentences"
  ],
  "sample_answer": "At first the slave was very afraid; but the lion came closer gently and showed him its paw, as if it were asking for help. Androclus pulled a huge thorn out of its paw.",
  "explanation": "Two sense units: the slave's fear and the lion's gesture; the thorn removed. LE candidate: peteret (ask for, not attack)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "method-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["tm-decode", "tm-sense-units"],
  "misconception": "perfect-or-nothing",
  "question": "You have 20 minutes left and two sentences untranslated. What gains the most points?",
  "options": [
    { "text": "Get the content of both sentences down in clear German, even if some forms stay uncertain", "correct": true, "feedback": "Yes: sense units score for content." },
    { "text": "Perfect the first sentence and leave the second empty", "correct": false, "feedback": "The empty sentence loses its sense units and checkpoints." },
    { "text": "Write a list of word meanings for both sentences", "correct": false, "feedback": "Single words do not render the content of a sense unit." }
  ],
  "explanation": "12 of the 36 points are for content of sense units."
}
```

# Tutor notes

- The exam asks for a translation into the language of instruction (German). Work in the learner's language; when the learner writes German, judge the language points as a Matura marker would.
- Practise with short unseen passages under time: about 90 minutes for the translation part is a good target, leaving the rest for the interpretation part.
- After each practice translation, mark it like the Matura: list 12 sense units with one line of expected content, then pick 6 LE, 6 MO and 6 SY checkpoints. This shows the learner where points are lost.
- Past Matura papers are not part of this course; when the learner brings one (photo or PDF), guide them through it step by step instead of translating it for them.

# Sources

Grounding: [^bmbwf-srp-latein]. The Latin sentences are written for this
course after the story of Androclus and the lion (Aulus Gellius, Noctes
Atticae 5.14); text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): structure of the exam papers and marking guides.
