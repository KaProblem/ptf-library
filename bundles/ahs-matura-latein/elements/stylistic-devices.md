---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/stylistic-devices
title: Stylistic devices
description: The stylistic devices most often asked in the Austrian AHS Latin Matura (alliteration, anaphora, antithesis, asyndeton, polysyndeton, chiasmus, parallelism, climax, tricolon, hyperbaton, litotes, rhetorical question, metaphor, personification), how to quote them and how to explain their effect.
lang: en
levels: [highschool]
objectives:
  - id: sd-identify
    text: Find a named stylistic device in a Latin text and quote it completely (all words that make up the device).
  - id: sd-function
    text: Explain in one sentence what a stylistic device does in its context (stresses, contrasts, intensifies, involves the reader).
tags: [latin, matura, austria, ahs, interpretation, stylistic-devices, rhetoric]
duration_min: { highschool: 60 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Aufgabenformat Stilmittel"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *Veni, vidi, vici.* Find at least three things that make these three words memorable.
- Latin authors shape their sentences with sound, order and repetition. Matura tasks ask to find a device and quote it ("Weisen Sie im Text … nach") or to explain what it does.
- Afterwards the learner recognises the common devices, quotes them completely and says what they achieve.

# Core

A stylistic device is a deliberate shape of words. Sound: alliteration
(neighbouring words with the same initial sound: *veni, vidi, vici*).
Repetition: anaphora (the same word at the start of successive phrases:
*te amici laudant, te cives amant*), polysyndeton (many *et*) and its
opposite asyndeton (no conjunctions). Order: parallelism (same order of
parts: A B, A B), chiasmus (crossed order: A B, B A: *fortes laudamus,
contemnimus timidos*), hyperbaton (words that belong together are
separated: *magnam … pecuniam*), climax (rising steps), tricolon (three
members). Meaning: antithesis (opposites: *non scholae, sed vitae*),
litotes (understatement by negating the opposite: *non ignarus* = well
aware), rhetorical question (a question that needs no answer),
metaphor, personification. When you quote a device, include every word
that makes it up (for a chiasmus all four members); when you explain it,
name its effect in context: it stresses, contrasts, intensifies, makes
memorable or involves the reader.

# Key facts

- Alliteration: at least two neighbouring words with the same initial sound: veni, vidi, vici; fortes fortuna adiuvat.
- Anaphora: same word at the start of successive phrases: te … te … te.
- Asyndeton: members without conjunction (veni, vidi, vici); polysyndeton: et … et … et.
- Parallelism: A B / A B; chiasmus: A B / B A (fortes laudamus, contemnimus timidos: adjective verb / verb adjective).
- Hyperbaton: separated agreeing words: magnam mercator in urbe pecuniam amisit.
- Climax: three or more members rising in strength: dubitavit, restitit, fugit … ; tricolon: three members.
- Antithesis: non scholae, sed vitae discimus. Litotes: non ignarus (well aware), non nulli (some).
- Quote rule: every word that forms the device; a device named without a fitting quotation gets no point.
- Matura terms (German): Alliteration, Anapher, Antithese, Asyndeton, Polysyndeton, Chiasmus, Parallelismus, Hyperbaton, Klimax, Trikolon, Litotes, rhetorische Frage, Metapher, Personifikation.

# Level: highschool

<!-- ptf:text v1 -->

*Veni, vidi, vici* has three verbs (tricolon), all beginning with *v*
(alliteration), without *et* (asyndeton), each one step further (a
small climax: came, saw, conquered). The effect: speed and ease – the
victory sounds as quick as the sentence.

When a task asks you to find a chiasmus, look for two pairs of words with
the same functions in crossed order: *fortes laudamus, contemnimus
timidos* – adjective, verb | verb, adjective. Quote all four words. The
effect is a sharp contrast between the brave and the cowards.

Always add the effect in context: "The anaphora *te … te … te* puts the
person addressed at the centre and stresses how much he is honoured."

# Misconceptions

- **name-only**: Naming the device is enough → the Matura wants a quotation with all its words, and often its effect.
- **any-repetition**: Any repeated word is an anaphora → anaphora is repetition at the start of successive phrases.
- **chiasmus-any-order**: Any unusual order is a chiasmus → chiasmus needs two pairs in crossed order (A B / B A); separated agreeing words are a hyperbaton.
- **effect-generic**: "It makes the text more interesting" explains the effect → name what is stressed or contrasted in this text.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "veni-vidi-vici",
  "level": "highschool",
  "purpose": "warmup",
  "question": "Veni, vidi, vici. Which three devices are there?",
  "options": [
    { "text": "alliteration", "correct": true, "feedback": "Yes: v – v – v." },
    { "text": "asyndeton", "correct": true, "feedback": "Yes: no et." },
    { "text": "tricolon", "correct": true, "feedback": "Yes: three members." },
    { "text": "chiasmus", "correct": false, "feedback": "There are no crossed pairs." },
    { "text": "litotes", "correct": false, "feedback": "There is no negated opposite." }
  ],
  "explanation": "Three verbs, same sound, no conjunction: fast and effortless."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "identify-devices",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sd-identify"],
  "misconception": "any-repetition",
  "question": "Which pairs of quotation and device are right?",
  "options": [
    { "text": "Te amici laudant, te cives amant, te omnes colunt – anaphora", "correct": true, "feedback": "Yes: te at the start of each phrase." },
    { "text": "Fortes laudamus, contemnimus timidos – chiasmus", "correct": true, "feedback": "Yes: adjective verb / verb adjective." },
    { "text": "Magnam mercator in urbe pecuniam amisit – hyperbaton", "correct": true, "feedback": "Yes: magnam … pecuniam separated." },
    { "text": "Et pater et mater et filii fugerunt – asyndeton", "correct": false, "feedback": "Many et: polysyndeton." },
    { "text": "Amicus amicum amat – anaphora", "correct": false, "feedback": "Repetition of a stem in different forms (polyptoton), not at the start of phrases." }
  ],
  "explanation": "Check the definition against the exact words."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "name-devices",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sd-identify"],
  "text": "Name the device: Non scholae, sed vitae discimus → {{1}}; Ille non ignarus periculi erat → {{2}}; Quis hoc negare potest? → {{3}}.",
  "gaps": [
    { "answer": "antithesis", "accepted": ["Antithese"] },
    { "answer": "litotes", "accepted": ["Litotes"] },
    { "answer": "rhetorical question", "accepted": ["rhetorische Frage"] }
  ],
  "explanation": "Opposites; negated opposite = well aware; a question that expects 'nobody'."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "quote-complete",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sd-identify"],
  "misconception": "name-only",
  "question": "Text: Fortes laudamus, contemnimus timidos. Which answer to 'quote the chiasmus' scores?",
  "options": [
    { "text": "fortes laudamus, contemnimus timidos", "correct": true, "feedback": "Yes: all four members." },
    { "text": "fortes … timidos", "correct": false, "feedback": "Two members are missing; that only shows an antithesis." },
    { "text": "Chiasmus", "correct": false, "feedback": "A name without quotation gets no point." }
  ],
  "explanation": "Quote every word that makes up the device."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-effect",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["sd-function"],
  "misconception": "effect-generic",
  "question": "A speaker says: Te amici laudant, te cives amant, te omnes colunt. Name the devices and explain their effect in this context.",
  "rubric": [
    "Anaphora (te … te … te)",
    "Tricolon / climax (friends – citizens – everyone)",
    "Effect: the person addressed is put at the centre",
    "Effect: the circle of admirers grows step by step, so the praise is intensified"
  ],
  "sample_answer": "The anaphora te … te … te puts the person addressed at the centre of each phrase. The three members form a rising tricolon from friends to citizens to everyone, so the praise grows step by step.",
  "explanation": "Device + quotation + effect in context."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "devices-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["sd-identify", "sd-function"],
  "misconception": "chiasmus-any-order",
  "question": "Magnam mercator in urbe pecuniam amisit. What is the device and its effect?",
  "options": [
    { "text": "Hyperbaton: magnam and pecuniam frame the sentence and stress the large sum", "correct": true, "feedback": "Yes." },
    { "text": "Chiasmus: the word order is crossed", "correct": false, "feedback": "There are no two crossed pairs; agreeing words are separated." },
    { "text": "Alliteration of m", "correct": false, "feedback": "magnam and mercator are not the device asked here; the frame is the point." }
  ],
  "explanation": "Separated agreeing words = hyperbaton."
}
```

# Tutor notes

- Collect devices from every text the learner reads; the same dozen appear again and again.
- Insist on the effect in context; "it makes the text livelier" never scores.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original;
*veni, vidi, vici* and *non scholae, sed vitae discimus* are proverbial
Latin sayings.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): interpretation tasks on stylistic devices.
