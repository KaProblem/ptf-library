---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/infinitives
title: Accusative and nominative with infinitive
description: The accusative with infinitive (AcI) and the nominative with infinitive (NcI), the time relations of the infinitives and the reflexive pronoun in them, as tested by the syntax checkpoints of the Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: in-aci
    text: Recognise an AcI after verbs of saying, thinking, perceiving and feeling and after impersonal expressions, and translate it as a that-clause.
  - id: in-time
    text: Derive the time relation from the infinitive (present simultaneous, perfect prior, future subsequent) and choose the tense of the translation.
  - id: in-nci
    text: Recognise the NcI with dicitur, videtur, iubetur and translate it ("he is said to …", "it seems that he …").
tags: [latin, matura, austria, ahs, syntax, aci, nci, infinitive]
duration_min: { highschool: 75 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Korrekturhefte (SY checkpoints AcI)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *Terram esse rotundam constat.* What is known, and which word is the subject of it?
- Latin reports what someone says, thinks or sees with an accusative and an infinitive instead of a that-clause. The AcI is one of the most frequent syntax checkpoints.
- Afterwards the learner can find the AcI, translate it with the right tense and handle the NcI.

# Core

After verbs of saying, thinking, knowing, perceiving and feeling (dicere,
putare, scire, videre, audire, gaudere …) and after impersonal expressions
(constat, apparet, perspicuum est, necesse est), Latin uses an
accusative as the subject and an infinitive as the predicate of the
reported content: *Dicit amicum venire* – he says that his friend is
coming. In the translation the accusative becomes the subject of a
that-clause. The infinitive's tense gives the time relation to the
introducing verb: present = simultaneous, perfect = prior, future
(-urum esse) = subsequent. The reflexive *se* in an AcI refers to the
subject of the introducing verb. When the introducing verb is passive
(dicitur, videtur, iubetur, putatur), the subject stays in the
nominative: NcI, *Homerus caecus fuisse dicitur* – Homer is said to have
been blind.

# Key facts

- AcI signal: an introducing verb + accusative + infinitive; the accusative is the subject of the that-clause.
- Infinitives: present amare / amari (simultaneous), perfect amavisse / amatum esse (prior), future amaturum esse (subsequent).
- Tense in translation: Dixit amicum venire – He said that his friend was coming; Dixit amicum venisse – … had come; Dixit amicum venturum esse – … would come.
- Reflexive: Dixit se venturum esse – he said that he (himself) would come; Dixit eum venturum esse – … that he (someone else) would come.
- Impersonal: perspicuum est / constat / apparet + AcI: it is clear / known / evident that …
- NcI: videtur esse (he seems to be), dicitur fuisse (he is said to have been), iubetur venire (he is ordered to come).
- Matura notation (German): AcI (gleichzeitig / vorzeitig / nachzeitig), NcI.

# Level: highschool

<!-- ptf:text v1 -->

*Terram esse rotundam constat.* The finite verb is *constat* (it is
known). What is known? *terram esse rotundam*: an accusative (*terram*)
and an infinitive (*esse*). That is an AcI: "It is known that the earth
is round."

Check the infinitive's tense. *esse* is present: simultaneous. *fuisse*
would be prior ("that the earth was"), *futuram esse* subsequent ("that
the earth will be").

If there are two accusatives, decide by sense which is the subject:
*Dicunt Romanos Gallos vicisse* – they say the Romans defeated the Gauls
(normally the first accusative is the subject).

# Misconceptions

- **acc-is-object**: The accusative is the object of the main verb → in an AcI it is the subject of the reported clause: Video puerum currere – I see that the boy is running.
- **infinitive-present-tense**: The present infinitive means present time → it means simultaneous with the main verb; after a past main verb it becomes a past tense in the translation.
- **se-anyone**: se in the AcI can be anyone → it points to the subject of the introducing verb.
- **nci-passive**: dicitur + infinitive must be translated passively "it is said by" → "he is said to …" or "it is said that he …".

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "find-aci",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "acc-is-object",
  "question": "Terram esse rotundam constat. What is known?",
  "options": [
    { "text": "That the earth is round", "correct": true, "feedback": "Yes: AcI after constat." },
    { "text": "That something round is on the earth", "correct": false, "feedback": "terram is the subject accusative, rotundam the predicate adjective." },
    { "text": "The earth knows that it is round", "correct": false, "feedback": "constat is impersonal (it is known) and introduces the AcI." }
  ],
  "explanation": "Impersonal expression + AcI."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "aci-time",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["in-time"],
  "misconception": "infinitive-present-tense",
  "text": "Give the time relation of the infinitive: Nuntius dixit hostes appropinquare → {{1}}; … hostes urbem cepisse → {{2}}; … hostes mox venturos esse → {{3}}.",
  "gaps": [
    { "answer": "simultaneous", "accepted": ["gleichzeitig"] },
    { "answer": "prior", "accepted": ["vorzeitig"] },
    { "answer": "subsequent", "accepted": ["nachzeitig"] }
  ],
  "explanation": "The messenger said that the enemies were approaching / had taken the city / would come soon."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "aci-reflexive",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["in-aci"],
  "misconception": "se-anyone",
  "question": "Legati Caesari dixerunt se pacem petere. Who asks for peace?",
  "options": [
    { "text": "the envoys", "correct": true, "feedback": "Yes: se refers to the subject of dixerunt." },
    { "text": "Caesar", "correct": false, "feedback": "Caesar is the dative (to Caesar)." },
    { "text": "unknown people", "correct": false, "feedback": "That would be eos." }
  ],
  "explanation": "The envoys told Caesar that they were asking for peace."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "aci-triggers",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["in-aci"],
  "question": "Which two sentences contain an AcI?",
  "options": [
    { "text": "Video amicum venire.", "correct": true, "feedback": "Yes: I see that my friend is coming." },
    { "text": "Constat Romam magnam urbem fuisse.", "correct": true, "feedback": "Yes: it is known that Rome was a great city." },
    { "text": "Amicus venire vult.", "correct": false, "feedback": "velle + infinitive is a plain infinitive; there is no subject accusative." },
    { "text": "Amicus Romam venit.", "correct": false, "feedback": "No infinitive at all." }
  ],
  "explanation": "AcI = introducing verb + accusative + infinitive."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "nci",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["in-nci"],
  "misconception": "nci-passive",
  "question": "Homerus caecus fuisse dicitur. How is it translated?",
  "options": [
    { "text": "Homer is said to have been blind", "correct": true, "feedback": "Yes: NcI, perfect infinitive = prior." },
    { "text": "Homer is said to be blind", "correct": false, "feedback": "fuisse is a perfect infinitive." },
    { "text": "Blind Homer is said by someone", "correct": false, "feedback": "dicitur + infinitive: he is said to …" }
  ],
  "explanation": "NcI: the subject stays nominative; translate 'is said to have …' or 'it is said that …'."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "translate-aci",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["in-aci", "in-time"],
  "question": "Translate: Multi putabant deos omnia videre et hominibus leges datas esse.",
  "rubric": [
    "putabant introduces two AcIs (deos … videre; leges datas esse)",
    "First AcI simultaneous: that the gods saw everything",
    "Second AcI prior and passive: that laws had been given",
    "hominibus: to people (dative)"
  ],
  "sample_answer": "Many believed that the gods saw everything and that laws had been given to people.",
  "explanation": "Two AcIs joined by et; datas esse = perfect passive infinitive (prior)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "infinitives-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["in-aci", "in-time"],
  "question": "Marcus scripsit se Romam venisse. What did Marcus write?",
  "options": [
    { "text": "That he had come to Rome", "correct": true, "feedback": "Yes: perfect infinitive (prior), se = Marcus." },
    { "text": "That he would come to Rome", "correct": false, "feedback": "That would be venturum esse." },
    { "text": "That someone else had come to Rome", "correct": false, "feedback": "se refers to Marcus." }
  ],
  "explanation": "AcI with the reflexive and a perfect infinitive."
}
```

# Tutor notes

- When the learner finds an infinitive, ask: who does it? If the answer is an accusative, it is an AcI.
- German needs the subjunctive of indirect speech in good style (er sagte, er komme); accept the indicative in practice but point it out for the language points.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with syntax checkpoints.
