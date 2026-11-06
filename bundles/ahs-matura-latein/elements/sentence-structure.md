---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/sentence-structure
title: Sentence structure and relative clauses
description: Relative clauses, the relative connection, the common subordinating conjunctions and the Matura task of dividing a sentence into main clause (HS), subordinate clauses (GS) and clause-like constructions (sK) with complete Latin quotations.
lang: en
levels: [highschool]
objectives:
  - id: ss-relative
    text: Translate relative clauses (also with a relative pronoun whose antecedent is a demonstrative or missing) and the relative connection at the start of a sentence.
  - id: ss-conjunctions
    text: Recognise the common subordinating conjunctions (quod, quia, quoniam, si, nisi, dum, postquam, ubi, quamquam, etsi, antequam) and the clause they open.
  - id: ss-analysis
    text: Divide a Latin sentence into HS, GS and sK and quote each part so that every word of the sentence is cited, as the Matura task demands.
tags: [latin, matura, austria, ahs, syntax, relative-clause, sentence-analysis]
duration_min: { highschool: 90 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Aufgabenformat Gliedern in HS, GS und sK"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *Sapiens ea, quae habet, non ea, quae cupit, numerare solet.* How many clauses are there, and which one carries the sentence?
- Every Matura so far contained a task "Gliedern Sie den folgenden Satz in Hauptsatz (HS), Gliedsätze (GS) und satzwertige Konstruktionen (sK)". It is worth 3 or 4 points and can be learned as a routine.
- Afterwards the learner can analyse a sentence into its clauses, quote each part correctly and translate relative clauses and the relative connection.

# Core

A main clause (HS) has a finite verb and can stand alone. A subordinate
clause (GS) has its own finite verb and is opened by a conjunction, a
relative pronoun or a question word. A clause-like construction (sK) has
no finite verb but its own "subject" and predicate: AcI, NcI, participium
coniunctum, ablative absolute, and (in some exams) the gerundive. The
Matura task asks for the type and the Latin words of each part; every
word of the sentence must be quoted in at least one row, and a part that
interrupts another is quoted without it (the HS of the example above is
*sapiens ea, non ea numerare solet*). A relative pronoun takes gender
and number from its antecedent; *ea, quae* is "the things that", *is,
qui* "the one who", and a missing antecedent is supplied (*qui tacet,
consentire videtur* – he who is silent …). A relative pronoun at the start
of a new sentence is a relative connection: translate it as a
demonstrative (*Quae cum audivisset* – when he had heard this).

# Key facts

- HS: finite verb, not introduced by a subordinating word. GS: finite verb + conjunction, relative or question word. sK: AcI, NcI, Pc, Abl. abs. (no finite verb).
- Quoting rule: every word of the sentence appears in at least one row; doubles between sK and HS/GS are allowed; the order of rows is free.
- An interrupted clause is quoted with its parts only: HS sapiens ea, non ea numerare solet; GS quae habet; GS quae cupit.
- Conjunctions with the indicative: quod/quia/quoniam (because), postquam (after), ubi (when, as soon as), dum (while), si/nisi (if/unless, real), quamquam (although).
- Relative connection: Qui cum … = when he …; Quibus positis = when these had been set up; Quod ubi audivit = when he heard this.
- Matura task (German): "Gliedern Sie den folgenden Satz in HS, GS und sK und zitieren Sie die jeweilige lateinische Passage". Points: one per correct component.

# Level: highschool

<!-- ptf:text v1 -->

Count the finite verbs first. In *Sapiens ea, quae habet, non ea,
quae cupit, numerare solet* ("The wise count what they have, not what
they desire") they are *habet*, *cupit* and
*solet*. So there are three clauses. *solet* has no introducing word:
that is the main clause. *quae habet* and *quae cupit* open with a
relative pronoun: two subordinate clauses.

Now quote. The main clause is everything that is not inside a subordinate
clause: *sapiens ea, non ea numerare solet*. Then each relative
clause. Check that every word appears once: the commas show where the
relative clauses begin and end.

An sK row is only needed when the sentence contains a construction
without a finite verb, for example an ablative absolute: in *Hostibus
victis milites, qui fessi erant, domum redierunt* the rows are HS *milites
domum redierunt*, GS *qui fessi erant*, sK *hostibus victis*.

# Misconceptions

- **comma-clause**: Every comma starts a new clause → commas also mark interruptions; the main clause often continues after a relative clause.
- **forget-words**: Quoting only the start of a clause is enough → every word must be cited somewhere, or the row is marked wrong.
- **sk-gs**: An ablative absolute or AcI is a GS → without a finite verb it is a satzwertige Konstruktion (sK).
- **relative-connection-clause**: A relative pronoun at the start of a sentence opens a relative clause → it connects to the previous sentence; translate it as "this/he/they".

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "count-clauses",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "comma-clause",
  "question": "Sapiens ea, quae habet, non ea, quae cupit, numerare solet. How many clauses with a finite verb does the sentence have?",
  "options": [
    { "text": "3: one main clause and two relative clauses", "correct": true, "feedback": "Yes: habet, cupit, solet." },
    { "text": "5, one per comma-separated piece", "correct": false, "feedback": "Commas mark interruptions; count the finite verbs." },
    { "text": "1: the main clause with solet", "correct": false, "feedback": "habet and cupit are finite verbs of their own clauses." }
  ],
  "explanation": "Count finite verbs; each has its own clause."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "hs-quote",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ss-analysis"],
  "misconception": "forget-words",
  "question": "Sapiens ea, quae habet, non ea, quae cupit, numerare solet. Which quotation is the complete main clause (HS)?",
  "options": [
    { "text": "sapiens ea, non ea numerare solet", "correct": true, "feedback": "Yes: all words outside the two relative clauses." },
    { "text": "numerare solet", "correct": false, "feedback": "sapiens ea, non ea are missing." },
    { "text": "sapiens ea, quae habet", "correct": false, "feedback": "quae habet is a GS, and the predicate is missing." }
  ],
  "explanation": "The HS is everything outside GS and sK."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "analysis-routine",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ss-analysis"],
  "instruction": "Order the steps of the HS/GS/sK routine.",
  "items": [
    "Underline every finite verb",
    "Circle every word that opens a subordinate clause (conjunction, relative, question word)",
    "Mark constructions without a finite verb (AcI, Pc, Abl. abs.)",
    "Assign each word to HS, GS or sK",
    "Check that every word of the sentence appears in a row"
  ],
  "explanation": "Verbs first, then openers, then constructions, then the completeness check."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "abl-abs-row",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ss-analysis"],
  "misconception": "sk-gs",
  "question": "Hostibus victis milites, qui fessi erant, domum redierunt. Which analysis is right?",
  "options": [
    { "text": "HS milites domum redierunt; GS qui fessi erant; sK hostibus victis", "correct": true, "feedback": "Yes: every word is quoted once." },
    { "text": "HS milites domum redierunt; GS hostibus victis; GS qui fessi erant", "correct": false, "feedback": "hostibus victis has no finite verb: sK." },
    { "text": "HS hostibus victis milites domum redierunt; GS qui fessi erant", "correct": false, "feedback": "The ablative absolute must get its own sK row." }
  ],
  "explanation": "Ablative absolute = sK."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "relative-connection-meaning",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ss-relative"],
  "misconception": "relative-connection-clause",
  "question": "Nuntius victoriam nuntiavit. Quod ubi cives audiverunt, gaudebant. What does Quod ubi … audiverunt mean?",
  "options": [
    { "text": "When the citizens heard this", "correct": true, "feedback": "Yes: quod = et id (this news), ubi = when." },
    { "text": "Which the citizens heard where", "correct": false, "feedback": "A relative at the start of a sentence connects to the previous sentence." },
    { "text": "Because the citizens heard", "correct": false, "feedback": "quod is the relative pronoun here (object of audiverunt), not the conjunction because." }
  ],
  "explanation": "Relative connection: translate as a demonstrative."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "conjunctions",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ss-conjunctions"],
  "question": "Which pairs of conjunction and meaning are right?",
  "options": [
    { "text": "postquam – after", "correct": true, "feedback": "Yes." },
    { "text": "quamquam – although", "correct": true, "feedback": "Yes." },
    { "text": "dum – while", "correct": true, "feedback": "Yes (also: until, as long as)." },
    { "text": "nisi – because", "correct": false, "feedback": "nisi = if not, unless." },
    { "text": "ubi – where only", "correct": false, "feedback": "As a conjunction ubi means when / as soon as." }
  ],
  "explanation": "Learn the dozen subordinating conjunctions by heart."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "analyse-sentence",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ss-analysis", "ss-relative"],
  "question": "Divide into HS, GS and sK and quote every part: Mercator, qui navem amiserat, dixit se pauperem esse.",
  "rubric": [
    "HS: mercator dixit",
    "GS (relative clause): qui navem amiserat",
    "sK (AcI): se pauperem esse",
    "Every word quoted"
  ],
  "sample_answer": "HS: mercator dixit – GS: qui navem amiserat – sK: se pauperem esse",
  "explanation": "The relative clause interrupts the main clause; the AcI depends on dixit."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "structure-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ss-analysis", "ss-relative"],
  "question": "Qui tacet, consentire videtur. What is the structure?",
  "options": [
    { "text": "GS qui tacet (relative clause without antecedent) + HS consentire videtur (NcI)", "correct": true, "feedback": "Yes: he who is silent seems to agree." },
    { "text": "HS qui tacet + GS consentire videtur", "correct": false, "feedback": "qui opens a subordinate clause." },
    { "text": "One main clause: who is silent agrees?", "correct": false, "feedback": "It is a statement, not a question; videtur is the main verb." }
  ],
  "explanation": "The antecedent is (is) understood: is, qui tacet."
}
```

# Tutor notes

- Always finish an analysis with the completeness check; it is the most frequent way to lose this point.
- Use sentences from the learner's own texts; the routine is the same for every sentence.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): interpretation tasks of the type "Gliedern in HS, GS und sK".
