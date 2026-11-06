---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/verbs
title: Verb forms
description: Person, number, tense, mood and voice of Latin verb forms, deponents, the irregular verbs and how to find the dictionary entry from a perfect form, as tested by the morphology checkpoints of the Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: vb-forms
    text: Determine person, number, tense, mood and voice (P. N. T. M. D.) of a finite verb form and render the tense correctly.
  - id: vb-deponents
    text: Recognise deponent verbs and translate their passive forms actively.
  - id: vb-lemma
    text: Find the dictionary entry of a form, including perfect forms with a changed stem and the irregular verbs esse, posse, ire, ferre, velle and fieri.
tags: [latin, matura, austria, ahs, morphology, verb, conjugation, deponent]
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

- Try it: *amet* and *monet* look alike. One of them is a subjunctive. Which one, and why?
- A Latin verb form packs five pieces of information into its ending: person, number, tense, mood and voice. The Matura asks for them as "P. N. T. M. D." (D = genus verbi, Diathese).
- Afterwards the learner can analyse any regular verb form, recognise deponents and irregular verbs, and look up a perfect form like *cepit* or *pervenerant* in the dictionary.

# Core

A finite verb form is built from stem, tense/mood sign and personal ending.
The personal endings show person and number (-o/-m, -s, -t, -mus, -tis,
-nt; passive -r, -ris, -tur, -mur, -mini, -ntur). Tense and mood signs
sit between stem and ending: -ba- imperfect, -b- or -a-/-e- future (1st/2nd
versus 3rd/4th conjugation), -e- or -a- present subjunctive (1st versus
the others), -re- imperfect subjunctive, -era- pluperfect, -isse-
pluperfect subjunctive; the perfect has its own stem (amav-, cep-, venit).
The same vowel means different things in different conjugations: *amet*
is subjunctive (ama-), *monet* indicative (mone-), *reget* future (reg-).
So determine the conjugation from the dictionary first. Deponents have
passive forms with active meaning (*hortatur*: he encourages). The perfect
passive and deponent perfect are two words: participle + form of esse
(*progressa est*: she has advanced). Irregular verbs must be known by
heart.

# Key facts

- Conjugations (infinitive): 1 amare, 2 monere, 3 regere, mixed capere (capio), 4 audire.
- Present subjunctive: 1st with -e- (amem, amet), all others with -a- (moneat, regat, capiat, audiat).
- Future: 1st/2nd with -b- (amabit, monebit), 3rd/4th with -a-/-e- (regam, reget; audiam, audiet).
- Imperfect subjunctive = infinitive + ending: amaret, regeret, esset, posset, iret, ferret, vellet, fieret.
- Pluperfect: indicative perfect stem + -era- (pervenerant = they had arrived), subjunctive perfect stem + -isse- (potuisset).
- Deponents: hortari (1), vereri (2), sequi (3), pati (mixed), oriri (4); perfect hortatus/-a/-um est, secutus est, progressus est.
- Perfect stems to know: capere – cepi; facere – feci; venire – veni; agere – egi; ferre – tuli, latum; tollere – sustuli, sublatum; ire – ii (iit, ierunt).
- Short imperatives: dic, duc, fac, fer; plural with -te / -ite (dicite, sinite).
- Matura notation (German): P. N. T. M. D. = Person, Numerus, Tempus, Modus, Diathese; "Dep." for deponent; "T." when only the tense is asked.

# Level: highschool

<!-- ptf:text v1 -->

Start with the dictionary entry, because it tells you the conjugation.
*amare* has the stem ama-, so *amet* with -e- is a different form: the
present subjunctive. *monere* has the stem mone-, so the -e- in *monet*
belongs to the stem: present indicative. *regere* has no long vowel stem,
so *reget* is the future ("he will rule").

Read the ending from the back: -t is third person singular, -ntur third
person plural passive. Then look at what comes before the ending: -ba-,
-re-, -era-, -isse-? That gives tense and mood.

If a form looks passive but the dictionary entry ends in -ri or -i
(*hortari*, *sequi*), the verb is a deponent: translate actively.
*Hortabatur* = "he was encouraging", not "he was being encouraged".

# Misconceptions

- **e-subjunctive**: An -e- before the ending marks the subjunctive → only in the 1st conjugation; in the 2nd it belongs to the stem (monet), in the 3rd it marks the future (reget).
- **passive-means-passive**: Every passive form is translated passively → deponents have active meaning: secutus est = he followed.
- **perfect-unknown**: A form not found in the dictionary does not exist → perfect forms often have another stem; look up the perfect in the list of principal parts (cepit → capere).
- **pluperfect-as-past**: The pluperfect is just another past tense → it shows that something happened before another past event: pervenerant = they had arrived.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "subjunctive-spotting",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vb-forms"],
  "misconception": "e-subjunctive",
  "question": "Which forms are present subjunctive? (amare, monere, regere, audire)",
  "options": [
    { "text": "amet", "correct": true, "feedback": "Yes: 1st conjugation subjunctive with -e-." },
    { "text": "monet", "correct": false, "feedback": "The -e- belongs to the stem mone-: indicative." },
    { "text": "regat", "correct": true, "feedback": "Yes: 3rd conjugation subjunctive with -a-." },
    { "text": "reget", "correct": false, "feedback": "Future indicative: he will rule." },
    { "text": "audiat", "correct": true, "feedback": "Yes: 4th conjugation subjunctive with -a-." }
  ],
  "explanation": "1st conjugation: -e-; all others: -a-."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "analyse-pervenerant",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vb-forms", "vb-lemma"],
  "misconception": "pluperfect-as-past",
  "text": "Mercatores, qui Romam pervenerant, … : pervenerant comes from the infinitive {{1}} and is third person plural {{2}} indicative active.",
  "gaps": [
    { "answer": "pervenire" },
    { "answer": "pluperfect", "accepted": ["Plusquamperfekt"] }
  ],
  "explanation": "perveni- (perfect stem) + -era- + -nt: they had arrived."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "passive-forms",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vb-forms"],
  "question": "Which forms are passive? (amare, capere, regere, monere)",
  "options": [
    { "text": "amabatur", "correct": true, "feedback": "Yes: imperfect passive, he was loved." },
    { "text": "capiuntur", "correct": true, "feedback": "Yes: present passive, they are taken." },
    { "text": "amaverunt", "correct": false, "feedback": "Perfect active: they loved." },
    { "text": "monent", "correct": false, "feedback": "Present active: they warn." }
  ],
  "explanation": "Passive endings: -r, -ris, -tur, -mur, -mini, -ntur."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "deponent",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vb-deponents", "vb-forms"],
  "misconception": "passive-means-passive",
  "question": "Dux milites hortabatur, ut fortiter pugnarent. (hortari: to encourage) How is hortabatur translated?",
  "options": [
    { "text": "was encouraging", "correct": true, "feedback": "Yes: deponent, imperfect, active meaning." },
    { "text": "was being encouraged", "correct": false, "feedback": "hortari is a deponent: passive form, active meaning." },
    { "text": "has encouraged", "correct": false, "feedback": "-ba- marks the imperfect." }
  ],
  "explanation": "The leader was encouraging the soldiers to fight bravely."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "find-lemma",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vb-lemma"],
  "misconception": "perfect-unknown",
  "text": "Look up the infinitive: cepit → {{1}}; potuisset → {{2}}; progressa est → {{3}}.",
  "gaps": [
    { "answer": "capere" },
    { "answer": "posse" },
    { "answer": "progredi" }
  ],
  "explanation": "capio, cepi; possum, potui; progredior, progressus sum (deponent)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "imperfect-subjunctive",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["vb-forms", "vb-lemma"],
  "question": "Which two forms are imperfect subjunctive?",
  "options": [
    { "text": "regeret (regere)", "correct": true, "feedback": "Yes: infinitive regere + t." },
    { "text": "possent (posse)", "correct": true, "feedback": "Yes: posse + nt." },
    { "text": "regebat (regere)", "correct": false, "feedback": "Imperfect indicative." },
    { "text": "amabunt (amare)", "correct": false, "feedback": "Future indicative." }
  ],
  "explanation": "Imperfect subjunctive = present infinitive active + personal ending."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "verbs-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["vb-forms", "vb-deponents"],
  "question": "Milites ducem secuti sunt. What does secuti sunt mean? (sequi, sequor, secutus sum)",
  "options": [
    { "text": "followed", "correct": true, "feedback": "Yes: perfect of a deponent, active meaning." },
    { "text": "were followed", "correct": false, "feedback": "sequi is a deponent." },
    { "text": "will follow", "correct": false, "feedback": "Participle + sunt is the perfect." }
  ],
  "explanation": "The soldiers followed the leader."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-analysis",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["vb-forms", "vb-lemma"],
  "question": "A classmate analyses 'reget' as present subjunctive because of the -e-. Explain the mistake and give the correct analysis (regere, rego, rexi, rectum).",
  "rubric": [
    "Conjugation decides: regere is 3rd conjugation",
    "In the 3rd conjugation -e- (with -a- in the 1st person) marks the future",
    "reget: 3rd person singular future indicative active",
    "Subjunctive would be regat"
  ],
  "sample_answer": "regere belongs to the 3rd conjugation. There the future is formed with -a- in the first person and -e- in the others (regam, reges, reget), while the present subjunctive uses -a- (regat). So reget is 3rd person singular future indicative active: he will rule.",
  "explanation": "Always fix the conjugation before reading tense and mood signs."
}
```

# Tutor notes

- Drill with forms from the learner's reading, not from tables: pick the six MO-like forms of a passage and analyse them together.
- Irregular verbs (esse, posse, ire, ferre, velle, fieri) and the common changed perfect stems must simply be learned; give a short daily review.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with morphology checkpoints.
