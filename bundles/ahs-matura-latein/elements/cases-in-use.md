---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/cases-in-use
title: What the cases do
description: The main functions of genitive, dative and ablative, the predicative (Prädikativum) and the double accusative, as asked by the syntax checkpoints of the Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: cs-genitive
    text: Recognise and translate the genitive of possession, the partitive genitive, the objective and subjective genitive and the genitive of quality.
  - id: cs-dative-ablative
    text: Recognise and translate the dative of possession, of purpose and of advantage and the ablative of means, cause, separation, time, comparison and manner.
  - id: cs-predicative
    text: Recognise a predicative (solus, primus, laetus, invitus, a noun like consul or puer) and the double accusative, and translate them as "as", "when" or with an adverb.
tags: [latin, matura, austria, ahs, syntax, cases, genitive, ablative, predicative]
duration_min: { highschool: 75 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Korrekturhefte (SY checkpoints)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *quis vestrum* – does *vestrum* mean "your"? What would "who your" even mean?
- An ablative or genitive alone does not say what it does; its meaning comes from the words around it. Several SY checkpoints of each Matura test exactly that, for example "Gen. part." or "Prädikativum".
- Afterwards the learner can name the function of a genitive, dative or ablative and render it with the right preposition.

# Core

The cases carry relations that English and German express with
prepositions. The genitive marks possession (*domus patris*), a part of a
whole (partitive: *quis vestrum*, which of you; *satis pecuniae*,
enough money), the object or subject of an action noun (*amor patriae*,
love for the country) and a quality (*vir magni ingenii*, a man of great
talent). The dative marks the person concerned (advantage: *non scholae,
sed vitae discimus*), the owner with esse (*mihi liber est*, I have a
book) and a purpose (*auxilio venire*, to come to help). The ablative
answers with what? (means), why? (cause), from where? (separation),
when? (time), than whom? (comparison) and how? (manner, often with an
adjective: *magna voce*). A predicative is a noun or adjective that agrees
with a noun but says something about the action: *solus venit* – he came
alone; *Cicero consul* – Cicero as consul. A double accusative marks an
object and what it becomes: *eum consulem creaverunt*, they elected him
consul.

# Key facts

- nostrum / vestrum = partitive genitive (of us / of you): multi nostrum, quis vestrum; nostri / vestri = objective genitive (memoria nostri, the memory of us).
- Partitive genitive after quantities: satis, nihil, multum, quid, pars, nemo, superlatives (optimus omnium).
- Dative of possession: est + dative = to have: Leoni soli tanta vis est – only the lion has such strength.
- Double dative: auxilio esse alicui = to be a help to someone.
- Ablative of comparison: luce clarior – clearer than light (= quam lux).
- Ablative of time: nocte (at night), paucis diebus (within a few days); duration uses the accusative (multos annos).
- Predicatives: solus, primus, ultimus, totus, laetus, invitus, and nouns of role or age: puer, senex, consul, comes. Translate: as, when he was, or with an adverb (gladly, unwillingly).
- Matura notation (German): Gen. part., Gen. obj., Dat. poss., Abl. instr., Abl. comp., Prädikativum, doppelter Akkusativ.

# Level: highschool

<!-- ptf:text v1 -->

*Quis vestrum* cannot be "who your", because *vestrum* is not the
possessive adjective (that would be *vester*, agreeing with a noun). It is
the genitive plural of *vos*, used as a partitive: which of you.

Ask the case its question. For an ablative: with what? why? from where?
when? than whom? how? *Gladio vulneratus est*: with what? – with a sword
(means). *Fame mortuus est*: why? – of hunger (cause). *Urbe expulsus
est*: from where? – from the city (separation).

A predicative agrees with a noun like an attribute, but belongs to the
verb. *Solus Marcus restitit* – Marcus alone stayed (not: the lonely
Marcus). *Laeti domum redierunt* – they returned home happily.

# Misconceptions

- **nostrum-possessive**: nostrum means "our" → after a word of quantity or a question word it is the genitive of nos: multi nostrum = many of us.
- **ablative-with**: The ablative is always "with" → it answers different questions: by, because of, from, at, than.
- **predicative-attribute**: An adjective that agrees with a noun is always an attribute → solus, primus, laetus and role nouns often say how or as what someone acts.
- **esse-dative**: Mihi est means "it is to me" → with esse the dative names the owner: I have.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "nostrum",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "nostrum-possessive",
  "question": "Quis vestrum hoc vidit? What does quis vestrum mean?",
  "options": [
    { "text": "which of you", "correct": true, "feedback": "Yes: partitive genitive of vos." },
    { "text": "whose (is) your", "correct": false, "feedback": "vestrum is not the adjective vester here." },
    { "text": "you who", "correct": false, "feedback": "quis asks, vestrum names the group: which of you." }
  ],
  "explanation": "Which of you saw this?"
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "ablative-functions",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["cs-dative-ablative"],
  "misconception": "ablative-with",
  "question": "Which pairs of ablative and function are right?",
  "options": [
    { "text": "Gladio vulneratus est – ablative of means", "correct": true, "feedback": "Yes: wounded with a sword." },
    { "text": "Fame mortui sunt – ablative of cause", "correct": true, "feedback": "Yes: they died of hunger." },
    { "text": "Luce clarior – ablative of comparison", "correct": true, "feedback": "Yes: clearer than light." },
    { "text": "Nocte venit – ablative of separation", "correct": false, "feedback": "Ablative of time: he came at night." },
    { "text": "Urbe expulsus est – ablative of manner", "correct": false, "feedback": "Separation: expelled from the city." }
  ],
  "explanation": "Ask the ablative its question: with what, why, from where, when, than whom, how?"
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "dative-possession",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["cs-dative-ablative"],
  "misconception": "esse-dative",
  "question": "Leoni soli tanta vis est. What does the sentence say?",
  "options": [
    { "text": "Only the lion has such strength", "correct": true, "feedback": "Yes: est + dative = to have; soli agrees with leoni." },
    { "text": "Such strength is lonely for the lion", "correct": false, "feedback": "soli agrees with leoni (dative) and means 'only'." },
    { "text": "The lion is alone with its strength", "correct": false, "feedback": "The dative names the owner." }
  ],
  "explanation": "Dative of possession with esse."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "predicative",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["cs-predicative"],
  "misconception": "predicative-attribute",
  "question": "Milites laeti domum redierunt. What is laeti?",
  "options": [
    { "text": "A predicative: the soldiers returned home happily", "correct": true, "feedback": "Yes: it describes them during the action." },
    { "text": "An attribute: the happy soldiers returned home", "correct": false, "feedback": "laeti does not pick out a group of happy soldiers; it says in what mood they returned." },
    { "text": "An adverb", "correct": false, "feedback": "laeti is an adjective agreeing with milites; the adverb is laete." }
  ],
  "explanation": "Predicatives are translated with an adverb, 'as' or 'when'."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "genitive-types",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["cs-genitive"],
  "question": "Which two genitives are objective genitives (the genitive names the object of the feeling or action)?",
  "options": [
    { "text": "amor patriae – love for the homeland", "correct": true, "feedback": "Yes: the homeland is loved." },
    { "text": "metus hostium – fear of the enemy (the enemy is feared)", "correct": true, "feedback": "Yes, in this sense: the enemy is feared." },
    { "text": "domus patris – the father's house", "correct": false, "feedback": "Possession." },
    { "text": "vir magni ingenii – a man of great talent", "correct": false, "feedback": "Genitive of quality." },
    { "text": "satis pecuniae – enough money", "correct": false, "feedback": "Partitive genitive." }
  ],
  "explanation": "With nouns of feeling or action, the genitive can name the object (or the subject: metus hostium = the enemies' fear)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "double-accusative",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["cs-predicative"],
  "question": "Populus Ciceronem consulem creavit. How is it translated?",
  "options": [
    { "text": "The people elected Cicero consul", "correct": true, "feedback": "Yes: double accusative, object + what he becomes." },
    { "text": "The people elected Cicero and the consul", "correct": false, "feedback": "There is no 'and'; consulem says what Cicero becomes." },
    { "text": "The consul elected Cicero for the people", "correct": false, "feedback": "populus is the subject (nominative)." }
  ],
  "explanation": "creare, facere, appellare, putare + double accusative."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cases-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["cs-genitive", "cs-predicative"],
  "question": "Primus omnium Caesar flumen transiit. Which statement is right?",
  "options": [
    { "text": "primus is a predicative and omnium a partitive genitive: Caesar crossed the river first of all", "correct": true, "feedback": "Yes." },
    { "text": "primus is an attribute: the first Caesar of all", "correct": false, "feedback": "primus says something about the crossing." },
    { "text": "omnium is a genitive of possession: everyone's Caesar", "correct": false, "feedback": "It names the group Caesar is the first of." }
  ],
  "explanation": "Predicative + partitive genitive."
}
```

# Tutor notes

- When a sentence contains a predicative or a partitive genitive, ask for the Matura label (Prädikativum, Gen. part.) as well as the translation.
- Do not drill the full list of case functions; teach the questions to ask the case and the handful that the Matura names most often.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with syntax checkpoints.
