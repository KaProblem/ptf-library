---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/participles
title: Participles and the ablative absolute
description: Present, perfect and future participles, the participle linked to a noun (participium coniunctum, Pc) and the ablative absolute, with their time relations and the ways to translate them, as tested in every Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: pt-forms
    text: Recognise PPA, PPP and PFA and state the time relation each expresses (simultaneous, prior, subsequent).
  - id: pt-pc
    text: Find the noun a participle belongs to (participium coniunctum) and translate the phrase as a clause, with a preposition or as a main clause.
  - id: pt-abl-abs
    text: Recognise an ablative absolute, state its time relation and render it with a fitting meaning (when, because, although, after).
tags: [latin, matura, austria, ahs, syntax, participle, ablative-absolute]
duration_min: { highschool: 90 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Korrekturhefte (SY checkpoints Pc, Abl. abs.)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *Hostibus victis milites domum redierunt.* Who was defeated, and when did the soldiers return – before or after?
- Latin packs whole clauses into participles. In every Matura so far, at least two of the six syntax checkpoints were a Pc or an ablative absolute.
- Afterwards the learner can spot participle constructions, attach them to the right noun and choose a natural translation.

# Core

Latin has three participles. The present active participle (PPA, *-ns,
-ntis*: *veniens*) shows an action at the same time as the main verb; the
perfect passive participle (PPP, *-tus, -sus*: *victus*) an action before
it, done to the noun; the future active participle (PFA, *-turus*:
*venturus*) an action that is about to happen. Deponents have a perfect
participle with active meaning (*secutus*: having followed). A participle
agrees with a noun in case, number and gender. If that noun is part of the
sentence (subject, object …), the participle is *conjunctum* (Pc): *fugientes
hostes arma abiecerunt* – the enemies, who were fleeing, threw away their
weapons / as they fled, the enemies threw away their weapons. If noun and participle stand in the
ablative and form a unit of their own, it is an ablative absolute: *hostibus
victis* – after the enemies had been defeated. Both are translated as a
subordinate clause (when, after, because, although, while), with a
preposition (after the victory over the enemies) or as a second main clause
(the enemies were defeated, and then …). The relation (time, cause,
concession) comes from the context.

# Key facts

- PPA: ama-ns, ama-ntis; mone-ns; reg-ens; capi-ens; audi-ens → simultaneous.
- PPP: amatus, monitus, rectus, captus, auditus (4th principal part) → prior and passive; PPDep (secutus, hortatus) → prior and active.
- PFA: amaturus, recturus → subsequent ("about to"); often with esse: venturum esse.
- Ablative absolute: noun or pronoun + participle in the ablative, not part of the rest of the sentence. Also without participle: Cicerone consule – when Cicero was consul.
- Relative connection + participle: Quibus positis … = when these had been set up …
- Three ways to translate: clause (after/when/because/although …), prepositional phrase (after the victory …), main clause (… and then).
- Matura notation (German): Pc (participium coniunctum), Abl. abs. (vorzeitig / gleichzeitig), PPA, PPP, PFA.

# Level: highschool

<!-- ptf:text v1 -->

*Hostibus victis milites domum redierunt.* *victis* is a PPP: something
was done before the main action, and it was done to someone. *hostibus*
agrees with it (ablative plural). Is *hostibus victis* part of the rest of
the sentence? The soldiers returned home – no ablative is needed for that.
So it is an ablative absolute: "After the enemies had been defeated, the
soldiers returned home" or "After the victory over the enemies …".

Now compare: *Milites hostes victos in urbem duxerunt.* Here *victos*
agrees with *hostes*, the object: a Pc. "The soldiers led the defeated
enemies into the city" or "The soldiers defeated the enemies and led them
into the city".

The participle's tense gives the time relation. The context gives the
logical relation: *Androclus leonem timens tamen restitit* – although he
was afraid of the lion, Androclus stayed (*tamen* signals the concession).

# Misconceptions

- **ppp-active**: The PPP is translated actively → it is passive (except for deponents): hostibus victis = the enemies having been defeated, not having defeated.
- **ppa-past**: The present participle means present time → it means at the same time as the main verb, which may be in the past: veniens clamavit = as he came, he shouted.
- **abl-abs-subject**: In an ablative absolute the ablative is the subject of the main clause → it is a separate unit; it gets its own subject in the translation.
- **literal-participle**: Translating a participle literally is good German → "the having-been-defeated enemies" costs language points; use a clause or a prepositional phrase.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "abl-abs-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "ppp-active",
  "question": "Hostibus victis milites domum redierunt. What happened first?",
  "options": [
    { "text": "The enemies were defeated, then the soldiers went home", "correct": true, "feedback": "Yes: PPP = prior and passive." },
    { "text": "The enemies defeated the soldiers, then they went home", "correct": false, "feedback": "victis is passive: the enemies were defeated." },
    { "text": "The soldiers went home while defeating the enemies", "correct": false, "feedback": "A PPP shows a prior action." }
  ],
  "explanation": "Ablative absolute with PPP: after the enemies had been defeated."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "time-relations",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pt-forms"],
  "misconception": "ppa-past",
  "text": "Give the time relation to the main verb (simultaneous, prior or subsequent): veniens → {{1}}; captus → {{2}}; venturus → {{3}}; secutus → {{4}}.",
  "gaps": [
    { "answer": "simultaneous", "accepted": ["gleichzeitig"] },
    { "answer": "prior", "accepted": ["vorzeitig"] },
    { "answer": "subsequent", "accepted": ["nachzeitig"] },
    { "answer": "prior", "accepted": ["vorzeitig"] }
  ],
  "explanation": "PPA simultaneous, PPP and deponent perfect participle prior, PFA subsequent."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pc-or-abl-abs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pt-pc", "pt-abl-abs"],
  "misconception": "abl-abs-subject",
  "question": "Which two sentences contain an ablative absolute?",
  "options": [
    { "text": "Urbe capta hostes discesserunt.", "correct": true, "feedback": "Yes: urbe capta – after the city had been taken." },
    { "text": "Signo dato milites impetum fecerunt.", "correct": true, "feedback": "Yes: when the signal had been given." },
    { "text": "Milites urbem captam incenderunt.", "correct": false, "feedback": "captam agrees with urbem, the object: Pc." },
    { "text": "Fugientes hostes arma abiecerunt.", "correct": false, "feedback": "fugientes agrees with the subject hostes: Pc." }
  ],
  "explanation": "Ablative absolute: noun + participle in the ablative, outside the structure of the rest."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "pc-reference",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pt-pc"],
  "text": "Pastores lupo territi in villam fugerunt. The participle territi belongs to {{1}}; lupo is ablative of {{2}} (frightened by the wolf).",
  "gaps": [
    { "answer": "pastores" },
    { "answer": "cause", "accepted": ["means", "Ursache", "Grund"] }
  ],
  "explanation": "The shepherds, frightened by the wolf, fled into the farmhouse: Pc with the subject."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "translate-concessive",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pt-pc"],
  "misconception": "literal-participle",
  "question": "Androclus leonem timens tamen in spelunca mansit. Which rendering fits best?",
  "options": [
    { "text": "Although he was afraid of the lion, Androclus stayed in the cave", "correct": true, "feedback": "Yes: tamen signals a concession." },
    { "text": "Because he was afraid of the lion, Androclus stayed in the cave", "correct": false, "feedback": "tamen (nevertheless) contradicts 'because'." },
    { "text": "Androclus, the fearing-the-lion one, stayed in the cave", "correct": false, "feedback": "Not natural language." }
  ],
  "explanation": "Choose the logical relation from the context."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "relative-connection",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pt-abl-abs"],
  "question": "Milites castra posuerunt. Quibus positis dux consilium convocavit. What is quibus positis?",
  "options": [
    { "text": "An ablative absolute with a relative connection: when this (the camp) had been set up", "correct": true, "feedback": "Yes: quibus = et eis, referring to castra (neuter plural)." },
    { "text": "A relative clause: which were set up", "correct": false, "feedback": "There is no finite verb; quibus + positis form an ablative absolute." },
    { "text": "A dative: for those who set it up", "correct": false, "feedback": "quibus positis agree in the ablative plural." }
  ],
  "explanation": "A relative pronoun at the start of a sentence is translated as a demonstrative (relativer Satzanschluss)."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "three-renderings",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["pt-abl-abs", "pt-forms"],
  "question": "Give three different translations of: Caesare duce Romani multas gentes vicerunt.",
  "rubric": [
    "Recognises an ablative absolute without participle (noun + noun)",
    "Clause: When/Because Caesar was their leader, the Romans defeated many peoples",
    "Prepositional phrase: Under Caesar's leadership …",
    "Main clause: Caesar was the leader, and the Romans …"
  ],
  "sample_answer": "1) When Caesar was their leader, the Romans defeated many peoples. 2) Under Caesar's leadership the Romans defeated many peoples. 3) Caesar led them, and the Romans defeated many peoples.",
  "explanation": "With esse missing, the ablative absolute is simultaneous."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "participles-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["pt-abl-abs", "pt-forms"],
  "question": "Sole orto mercatores forum petiverunt. What does sole orto mean?",
  "options": [
    { "text": "When the sun had risen (at sunrise)", "correct": true, "feedback": "Yes: ablative absolute with a deponent participle, prior." },
    { "text": "When the merchants had risen", "correct": false, "feedback": "orto agrees with sole (ablative singular), not with mercatores." },
    { "text": "While the sun is rising", "correct": false, "feedback": "ortus is a perfect participle: prior." }
  ],
  "explanation": "oriri, ortus sum (deponent): sole orto = when the sun had risen."
}
```

# Tutor notes

- Every practice passage should end with "Which participles did you find, and what do they belong to?"
- Train all three renderings; in the Matura the clause is safest for the SY checkpoint, the prepositional phrase often gives the better German.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with syntax checkpoints.
