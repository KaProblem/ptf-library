---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/gerund-gerundive
title: Gerund and gerundive
description: The gerund (the verb as a noun), the attributive gerundive (ad + gerundive, causa + gerundive) and the predicative gerundive with esse (must, need to), as tested by the syntax checkpoints of the Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: gg-gerund
    text: Recognise the gerund (-ndi, -ndo, ad -ndum) and translate it as a verbal noun or an infinitive with "to" or "by".
  - id: gg-attributive
    text: Recognise an attributive gerundive agreeing with a noun and translate it actively (ad urbem defendendam – to defend the city).
  - id: gg-predicative
    text: Translate the gerundive with esse as necessity (must, has to be) and its dative of the agent.
tags: [latin, matura, austria, ahs, syntax, gerund, gerundive]
duration_min: { highschool: 60 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Korrekturhefte (SY checkpoints Gerundium, Gerundiv)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *Carthago delenda est* – what has to happen to Carthage, and who must do it?
- Forms with -nd- are short but dense. The gerund is the verb used as a noun; the gerundive is an adjective that agrees with a noun. Both appear regularly as syntax checkpoints, often with a construction aid.
- Afterwards the learner can tell gerund from gerundive and translate both naturally.

# Core

The gerund is a neuter verbal noun with the forms *-ndi, -ndo, ad -ndum*
(no nominative; the infinitive serves as nominative): *ars scribendi* –
the art of writing; *legendo discimus* – we learn by reading; *paratus ad
pugnandum* – ready to fight. When the verb has an object, Latin usually
turns the phrase around: instead of *ad defendendum urbem* it writes *ad
urbem defendendam* – the gerundive agrees with the noun (attributive
gerundive). It is still translated actively: to defend the city.
*ad*, *causa* (after the genitive) and the dative express purpose. With
*esse* the gerundive expresses necessity (predicative gerundive): *Carthago
delenda est* – Carthage must be destroyed; the person who must act stands
in the dative (*nobis* – by us = we must). With a negation it often means
"may not": *non neglegendum est*.

# Key facts

- Gerund: gen -ndi (cupidus discendi – eager to learn), dat -ndo, acc ad -ndum (ad pugnandum – to fight), abl -ndo (legendo – by reading).
- Gerundive: -ndus, -nda, -ndum, declined like bonus, agreeing with a noun: ad urbem defendendam, urbis defendendae causa, in urbe defendenda.
- Purpose: ad + acc. gerund(ive), gen. + causa, (rarely) dative.
- Necessity: gerundive + esse: Hoc faciendum est – this must be done; Mihi hoc faciendum est – I must do this (dativus auctoris).
- Impersonal: Eundum est – one must go; Nobis pugnandum est – we have to fight.
- Matura notation (German): Gerundium, attributives Gerundiv (final), prädikatives Gerundiv, dativus auctoris.

# Level: highschool

<!-- ptf:text v1 -->

*Carthago delenda est.* *delenda* agrees with *Carthago* and stands with
*est*: necessity. Carthage must be destroyed. If you want to say who must
do it, add a dative: *Romanis Carthago delenda est* – the Romans must
destroy Carthage.

*Milites ad urbem defendendam venerunt.* *defendendam* agrees with
*urbem*; with *ad* it shows the purpose: they came to defend the city.
Do not translate it passively ("to the city to be defended") – that costs
the SY point and sounds wrong.

The gerund has no noun to agree with: *Legendo multa discimus* – we learn
a lot by reading.

# Misconceptions

- **gerundive-passive**: An attributive gerundive is translated passively → ad urbem defendendam = to defend the city (active).
- **delenda-will**: delenda est means "will be destroyed" → it means "must be destroyed" (necessity).
- **dative-to**: In mihi faciendum est the dative means "to me" → it names who must act: I must do it.
- **gerund-gerundive**: Gerund and gerundive are the same → the gerund is a noun without agreement; the gerundive agrees with a noun.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "delenda",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "delenda-will",
  "question": "Carthago delenda est. What does it say?",
  "options": [
    { "text": "Carthage must be destroyed", "correct": true, "feedback": "Yes: gerundive with esse = necessity." },
    { "text": "Carthage will be destroyed", "correct": false, "feedback": "That would be delebitur." },
    { "text": "Carthage has been destroyed", "correct": false, "feedback": "That would be deleta est." }
  ],
  "explanation": "Predicative gerundive: must."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "attributive-gerundive",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["gg-attributive"],
  "misconception": "gerundive-passive",
  "question": "Milites ad urbem defendendam venerunt. Which translation is right?",
  "options": [
    { "text": "The soldiers came to defend the city", "correct": true, "feedback": "Yes: ad + gerundive = purpose, translated actively." },
    { "text": "The soldiers came to the city that had to be defended", "correct": false, "feedback": "ad here marks the purpose, not the direction." },
    { "text": "The soldiers came to the defended city", "correct": false, "feedback": "defendendam is a gerundive, not a PPP (defensam)." }
  ],
  "explanation": "defendendam agrees with urbem (feminine accusative singular)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gerund-or-gerundive",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["gg-gerund", "gg-attributive"],
  "misconception": "gerund-gerundive",
  "question": "Which two contain a gerund (no noun agreeing)?",
  "options": [
    { "text": "Legendo multa discimus.", "correct": true, "feedback": "Yes: by reading." },
    { "text": "Cupidus discendi erat.", "correct": true, "feedback": "Yes: eager to learn." },
    { "text": "Libri legendi causa veni.", "correct": false, "feedback": "legendi agrees with libri: gerundive." },
    { "text": "In urbe defendenda multi ceciderunt.", "correct": false, "feedback": "defendenda agrees with urbe: gerundive." }
  ],
  "explanation": "Gerund = verbal noun; gerundive = adjective agreeing with a noun."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "dativus-auctoris",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["gg-predicative"],
  "misconception": "dative-to",
  "question": "Nobis hoc consilium capiendum est. What does it mean?",
  "options": [
    { "text": "We must make this decision", "correct": true, "feedback": "Yes: nobis names who must act." },
    { "text": "This decision must be taken to us", "correct": false, "feedback": "The dative with the gerundive names the agent." },
    { "text": "We have taken this decision", "correct": false, "feedback": "That would be cepimus." }
  ],
  "explanation": "Gerundive + esse + dative of the agent = someone must."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "gerundive-agreement",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["gg-attributive"],
  "text": "Complete with the gerundive of servare (to save) agreeing with the noun: ad patriam {{1}}; libertatis {{2}} causa.",
  "gaps": [
    { "answer": "servandam" },
    { "answer": "servandae" }
  ],
  "explanation": "patriam: f acc sg → servandam; libertatis: f gen sg → servandae."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gerundive-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["gg-predicative", "gg-gerund"],
  "question": "Lingua valet ad sententias declarandas. What does ad sententias declarandas express?",
  "options": [
    { "text": "A purpose: language serves to express opinions", "correct": true, "feedback": "Yes: ad + gerundive agreeing with sententias." },
    { "text": "A necessity: opinions must be expressed", "correct": false, "feedback": "Necessity needs esse." },
    { "text": "A direction: language goes towards opinions", "correct": false, "feedback": "ad + gerundive marks a purpose." }
  ],
  "explanation": "Attributive gerundive with ad: final."
}
```

# Tutor notes

- Train the three questions: is there -nd-? does it agree with a noun? is there esse? They decide gerund, attributive or predicative gerundive.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with syntax checkpoints.
