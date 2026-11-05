---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/nouns-and-adjectives
title: Nouns, adjectives and agreement
description: The five declensions, adjectives of all classes with comparison and adverbs, and agreement in case, number and gender (KNG), as tested by the morphology checkpoints of the Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: na-forms
    text: Determine case, number and gender of noun forms of all five declensions, listing every reading an ambiguous ending allows.
  - id: na-adjectives
    text: Recognise adjectives of the a/o and the third declension, their comparative and superlative and the adverbs formed from them.
  - id: na-agreement
    text: Find the noun an adjective or participle belongs to by agreement in case, number and gender, also when the two are far apart.
tags: [latin, matura, austria, ahs, morphology, declension, adjective, agreement]
duration_min: { highschool: 90 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Korrekturhefte (MO checkpoints)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: in *magna voce senator orationem habuit*, which word does *magna* belong to, and how can you tell when *magna* could also be feminine nominative or neuter plural?
- Latin shows who does what with endings, not with word order. Many endings have several readings (-is, -i, -a, -us), so the reading has to be narrowed down by the other words.
- Afterwards the learner can analyse noun and adjective forms the way the Matura's MO checkpoints ask ("K. N. G.", "kongruent zu …", "Superlativ") and can match adjectives to their nouns.

# Core

Every noun belongs to one of five declensions, recognisable from the
genitive singular in the dictionary: -ae (1st), -i (2nd), -is (3rd), -us
(4th), -ei (5th). A form is described by case (K), number (N) and gender
(G); many endings fit several slots, so list every reading and let the
sentence decide. Adjectives follow either the a/o declension (bonus, bona,
bonum) or the third declension (omnis, omne; felix; acer, acris, acre).
An adjective agrees with its noun in case, number and gender (KNG), not
necessarily in ending: *bonus poeta*, *magna voce*. Comparatives end in
-ior/-ius, superlatives in -issimus (also -errimus, -illimus); adverbs end
in -e (a/o adjectives) or -(i)ter (third declension), and the comparative
adverb is the neuter -ius. In poetry and artistic prose an adjective and
its noun are often separated (hyperbaton); agreement is the thread that
joins them.

# Key facts

- Genitive singular decides the declension: rosa, -ae (1); dominus, -i (2); rex, regis (3); manus, -us (4); res, rei (5).
- -is can be: gen sg (3rd), dat/abl pl (1st/2nd), nom sg (omnis), 2nd person verb (amas is a verb!). omnibus is dative or ablative plural, any gender.
- -a can be: nom/abl sg (1st) or nom/acc pl neuter (verba, corpora, omnia).
- -us can be: nom sg (2nd, 4th), gen sg and nom/acc pl (4th: manus), or a neuter of the 3rd (tempus, corpus, genus).
- Masculine nouns of the 1st declension: poeta, nauta, agricola → bonus poeta, nautae fessi.
- Comparison: velox → velocior → velocissimus; acer → acrior → acerrimus; facilis → facilior → facillimus; bonus → melior → optimus; magnus → maior → maximus; multum → plus → plurimum.
- Adverbs: velociter (velox), bene (bonus), celeriter (celer), facile (facilis), diu, saepe; comparative adverb = neuter comparative (celerius).
- Superlative can mean "very" (Elativ): velocissimo equo = on a very fast horse.
- Matura notation (German): K. N. G. = Kasus, Numerus, Genus; "kongruent zu" = agrees with; Positiv, Komparativ, Superlativ/Elativ.

# Level: highschool

<!-- ptf:text v1 -->

An ending is a clue, not an answer. *voce* can only be ablative singular
(vox, vocis, third declension). *magna* could be feminine nominative or
ablative singular or neuter plural. The only noun it can agree with is
*voce*: feminine, singular, ablative. So *magna voce* means "with a loud
voice", and *senator* is the subject.

When you meet a form, ask three questions: Which word is it from (the
dictionary entry with genitive and gender)? Which slots fit the ending?
Which slot fits the sentence? Write all readings at first; the sentence
removes the wrong ones.

Adjectives agree in KNG, not in ending. *Bonus poeta* is correct, because
*poeta* is masculine although it ends in -a. *Omnibus nautis* agrees too:
one is third declension, one first, both dative or ablative plural.

# Misconceptions

- **is-genitive**: -is is the genitive singular → it is also dative/ablative plural of the 1st and 2nd declension (nautis, servis) and the nominative of omnis-type adjectives.
- **us-masculine**: Every -us word is 2nd declension masculine → manus (4th, feminine), tempus, corpus, genus (3rd, neuter).
- **same-ending**: Adjective and noun must have the same ending → they agree in case, number and gender: bonus poeta, magna voce, omnibus servis.
- **a-singular**: -a is always feminine singular → neuter plurals end in -a: verba, corpora, omnia.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "magna-voce",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "same-ending",
  "question": "Magna voce senator orationem habuit. Which word does magna agree with?",
  "options": [
    { "text": "voce", "correct": true, "feedback": "Yes: both feminine ablative singular – with a loud voice." },
    { "text": "senator", "correct": false, "feedback": "senator is masculine; magna cannot be masculine." },
    { "text": "orationem", "correct": false, "feedback": "orationem is accusative singular; magna cannot be accusative." }
  ],
  "explanation": "magna voce: ablative of manner, 'in a loud voice'."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "omnibus-readings",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["na-forms"],
  "misconception": "is-genitive",
  "question": "Which two readings are possible for the form omnibus (from omnis, omne)?",
  "options": [
    { "text": "dative plural", "correct": true, "feedback": "Yes." },
    { "text": "ablative plural", "correct": true, "feedback": "Yes." },
    { "text": "genitive singular", "correct": false, "feedback": "That is omnis." },
    { "text": "nominative plural", "correct": false, "feedback": "That is omnes (m/f) or omnia (n)." },
    { "text": "accusative singular", "correct": false, "feedback": "That is omnem or omne." }
  ],
  "explanation": "-ibus is always dative or ablative plural; the gender comes from the noun."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "genitive-singular",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["na-forms"],
  "misconception": "us-masculine",
  "question": "Which forms can be genitive singular? (rex, regis m.; res, rei f.; manus, -us f.; dominus, -i m.; consul, -is m.)",
  "options": [
    { "text": "regis", "correct": true, "feedback": "Yes: 3rd declension." },
    { "text": "rei", "correct": true, "feedback": "Yes: 5th declension (also dative)." },
    { "text": "manus", "correct": true, "feedback": "Yes: 4th declension, also nominative singular and nominative/accusative plural." },
    { "text": "dominos", "correct": false, "feedback": "Accusative plural." },
    { "text": "consuli", "correct": false, "feedback": "Dative singular." }
  ],
  "explanation": "Know the genitive of each declension: -ae, -i, -is, -us, -ei."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "poeta-agreement",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["na-agreement"],
  "misconception": "same-ending",
  "question": "Which two phrases are grammatically correct?",
  "options": [
    { "text": "poeta clarus", "correct": true, "feedback": "Yes: poeta is masculine." },
    { "text": "nautis fessis", "correct": true, "feedback": "Yes: dative/ablative plural masculine." },
    { "text": "poeta clara", "correct": false, "feedback": "poeta is masculine, so the adjective is masculine: clarus." },
    { "text": "rosam pulchrum", "correct": false, "feedback": "rosam is feminine accusative: rosam pulchram." },
    { "text": "regem bonus", "correct": false, "feedback": "regem is accusative, bonus nominative." }
  ],
  "explanation": "Agreement is in case, number and gender."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "analyse-velocissimo",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["na-adjectives", "na-agreement"],
  "text": "Nuntius velocissimo equo Romam venit. velocissimo is the {{1}} (degree) of velox and agrees with the noun {{2}}; the adverb of velox in the positive is {{3}}.",
  "gaps": [
    { "answer": "superlative", "accepted": ["Superlativ", "elative", "Elativ"] },
    { "answer": "equo" },
    { "answer": "velociter" }
  ],
  "explanation": "velox, velocior, velocissimus; equo (ablative singular m.) – the messenger came to Rome on a very fast horse."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "neuter-plural",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["na-forms", "na-agreement"],
  "misconception": "a-singular",
  "question": "Haec verba omnia audivi. Which statement about verba and omnia is true?",
  "options": [
    { "text": "Both are neuter accusative plural and agree", "correct": true, "feedback": "Yes: 'I heard all these words.'" },
    { "text": "Both are feminine nominative singular", "correct": false, "feedback": "verbum is neuter; -a is the neuter plural." },
    { "text": "omnia is singular, verba plural", "correct": false, "feedback": "omnia is the neuter plural of omnis." }
  ],
  "explanation": "Neuter plural nominative and accusative end in -a (-ia in i-stems)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "hyperbaton-agreement",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["na-agreement"],
  "question": "Magnam mercator in urbe pecuniam amisit. Which noun does magnam belong to?",
  "options": [
    { "text": "pecuniam", "correct": true, "feedback": "Yes: feminine accusative singular – he lost a large sum of money." },
    { "text": "urbe", "correct": false, "feedback": "urbe is ablative." },
    { "text": "mercator", "correct": false, "feedback": "mercator is masculine nominative." }
  ],
  "explanation": "Hyperbaton: adjective and noun frame the sentence; KNG joins them."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "morphology-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["na-forms", "na-adjectives"],
  "misconception": "is-genitive",
  "question": "Ducem fortem cives laudaverunt. What is fortem?",
  "options": [
    { "text": "Accusative singular, agreeing with ducem", "correct": true, "feedback": "Yes: 'The citizens praised the brave leader.'" },
    { "text": "Nominative singular, agreeing with cives", "correct": false, "feedback": "cives is plural; fortem is accusative singular." },
    { "text": "An adverb", "correct": false, "feedback": "The adverb is fortiter." }
  ],
  "explanation": "fortis, forte (3rd declension): fortem = accusative singular m/f."
}
```

# Tutor notes

- Practise with the learner's own reading texts: pick six forms and have them write "K. N. G." or "kongruent zu …" as in the Matura.
- When a form is ambiguous, insist on listing all readings first; this is the habit that prevents most translation errors.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with morphology checkpoints.
