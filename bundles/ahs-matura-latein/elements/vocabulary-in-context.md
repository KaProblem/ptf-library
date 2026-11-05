---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/vocabulary-in-context
title: Vocabulary in context and the dictionary
description: Choosing the meaning of a word that fits the context, using the dictionary efficiently from an inflected form, and collecting the words of a word field, as tested by the vocabulary checkpoints (LE) and the collecting tasks of the Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: vc-polysemy
    text: Choose for a word with several meanings the one that fits the context, and reject meanings that make the sentence absurd.
  - id: vc-dictionary
    text: Find the dictionary entry of an inflected form quickly and read the entry (principal parts, gender, constructions, phrases).
  - id: vc-word-field
    text: Collect the words of a text that belong to a word field (Sachfeld) and quote them correctly.
tags: [latin, matura, austria, ahs, vocabulary, dictionary, polysemy]
duration_min: { highschool: 60 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Korrekturhefte (LE checkpoints)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *petere* can mean to attack, to ask for, to aim at, to go to. What does it mean in *Leo pedem ostendit, quasi auxilium peteret*?
- The six vocabulary checkpoints (LE) of the Matura are words whose first dictionary meaning is wrong in context. The marking guide lists accepted meanings and typical wrong ones.
- Afterwards the learner reads a dictionary entry to the end, picks the meaning that fits, and can collect the words of a word field.

# Core

Many Latin words cover a wide field of meaning that German or English
splits into several words. *petere* is "to try to reach": with a person
as object to attack, with *auxilium* to ask for, with a place to head for.
The dictionary lists these meanings with their constructions and set
phrases; the right one is the one that fits subject, object and the
situation of the text. Read the whole entry, look for the construction
that matches (with the accusative, with *ut*, with *ab* + ablative), and
check the meaning against the introduction and the surrounding sentences.
To look up a form, reduce it to its dictionary form: nominative singular
for nouns and adjectives, first person present for verbs (and check the
list of principal parts for perfect stems). A word field (Sachfeld) is a
group of words of one theme in the text, such as sea voyage (*navis,
nauta, velum, tempestas, litus*) or law (*iudex, sponsio, pronuntiare*).

# Key facts

- Typical wide words: petere (attack / ask for / head for), consulere (ask for advice + acc.; care for + dat.), res (thing, matter, event, state, property), ducere (lead, consider, think), tollere (lift, remove, take away), proprius (own, characteristic), valere (be strong, be able, be worth), ferre (carry, bear, report, endure; ferri: be driven).
- Set phrases: res publica (the state), res secundae / adversae (good / bad fortune), vela dare (set sail), animum advertere (notice), gratias agere (thank).
- From form to entry: cepit → capio; tulit → fero; sublatum → tollo; viribus → vis; iter → iter, itineris; rebus → res.
- LE answers are judged against an expectation: a synonym that fits counts, a meaning from another context does not.
- Matura tasks: LE checkpoint in the translation; "Sammeln und Auflisten": quote Latin words of a word field from the text.

# Level: highschool

<!-- ptf:text v1 -->

The lion shows its paw *quasi auxilium peteret*. The object is
*auxilium* (help), so *peteret* cannot be "attack": it means "as if it
were asking for help". In *Hostes oppidum petunt* the same verb means
"the enemies attack the town", and in *Naves portum petunt* "the ships
head for the harbour".

So read the whole dictionary entry. Look at what stands next to the verb:
a person, a thing, a place, an *ut* clause? The entry shows which meaning
goes with which construction.

For collecting tasks, quote the Latin words exactly as they stand in the
text, one word per line unless the task asks for phrases.

# Misconceptions

- **first-meaning**: The first meaning in the dictionary is the main one → the order is not a ranking for your text; the context decides.
- **modern-meaning**: A Latin word means what its loanword means today (proprius = proper, civilis = civil) → check the meaning in the dictionary and the context (proprius = characteristic, civilis = political, of the community).
- **lookup-form**: You can look up the form as it stands → the dictionary lists the basic form; perfect stems are in the principal parts.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "petere",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "first-meaning",
  "question": "Leo pedem ostendit, quasi auxilium peteret. What does peteret mean here?",
  "options": [
    { "text": "were asking for", "correct": true, "feedback": "Yes: auxilium petere = ask for help." },
    { "text": "were attacking", "correct": false, "feedback": "With auxilium as object that makes no sense." },
    { "text": "were heading for", "correct": false, "feedback": "That fits places, not help." }
  ],
  "explanation": "The object decides the meaning."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "le-choices",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vc-polysemy"],
  "misconception": "modern-meaning",
  "question": "Which renderings fit the context?",
  "options": [
    { "text": "Senatus Ciceronem consulem creavit. – creavit: elected", "correct": true, "feedback": "Yes: creare with a double accusative = elect." },
    { "text": "Hunc virum bonum ducimus. – ducimus: consider", "correct": true, "feedback": "Yes: ducere with a double accusative = consider." },
    { "text": "Res adversae amicos probant. – res adversae: bad fortune", "correct": true, "feedback": "Yes: misfortune tests friends." },
    { "text": "Consulem consuluit. – consuluit: cared for", "correct": false, "feedback": "With the accusative: asked for advice." },
    { "text": "Bellum civile – civile: polite", "correct": false, "feedback": "civilis: of the citizens; bellum civile = civil war." }
  ],
  "explanation": "Constructions and context decide the meaning."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "lookup",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vc-dictionary"],
  "misconception": "lookup-form",
  "text": "Under which dictionary entry do you find: rebus → {{1}}; tulit → {{2}}; cepit → {{3}}?",
  "gaps": [
    { "answer": "res" },
    { "answer": "fero", "accepted": ["ferre"] },
    { "answer": "capio", "accepted": ["capere"] }
  ],
  "explanation": "res, rei (5th declension); fero, tuli, latum; capio, cepi, captum."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "word-field",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vc-word-field"],
  "question": "Text: Nautae vela dederunt; sed tempestas navem ad litus ignotum pepulit, ubi incolae eos benigne receperunt. Which words belong to the word field 'sea voyage'?",
  "options": [
    { "text": "nautae, vela, tempestas, navem, litus", "correct": true, "feedback": "Yes: five nouns of the sea voyage." },
    { "text": "nautae, incolae, benigne", "correct": false, "feedback": "incolae and benigne do not belong to the sea voyage." },
    { "text": "navis, litora, ventus", "correct": false, "feedback": "Quote the forms as they stand in the text; ventus does not occur." }
  ],
  "explanation": "Collect and quote the exact forms from the text."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "vocab-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["vc-polysemy", "vc-dictionary"],
  "question": "Post cenam mensa sublata est. What happened to the table?",
  "options": [
    { "text": "It was cleared away", "correct": true, "feedback": "Yes: sublata from tollere (lift, remove)." },
    { "text": "It was laid for dinner", "correct": false, "feedback": "post cenam = after dinner; tollere = remove." },
    { "text": "It was put under something", "correct": false, "feedback": "sublata belongs to tollere (lift, remove); it does not mean under." }
  ],
  "explanation": "tollo, sustuli, sublatum: lift, remove."
}
```

# Tutor notes

- When the learner looks up a word, ask them to read the whole entry aloud and choose; never accept the first meaning without a reason.
- Practise with the dictionary the learner will use in the exam; if it is an electronic one, practise its search for forms.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with vocabulary checkpoints.
