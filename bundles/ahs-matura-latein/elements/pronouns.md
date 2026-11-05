---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/pronouns
title: Pronouns and what they refer to
description: Personal, reflexive, demonstrative, relative and indefinite pronouns, and the Matura task of stating in German what a pronoun in the text refers to (Bezug).
lang: en
levels: [highschool]
objectives:
  - id: pr-forms
    text: Recognise the forms of is, hic, ille, iste, ipse, qui and the indefinite pronouns (quidam, aliquis, quisquam, quivis, quisque) and translate them fittingly.
  - id: pr-reflexive
    text: Refer se and suus to the subject of their clause, or in an AcI or a dependent subjunctive clause to the subject of the main clause.
  - id: pr-reference
    text: State what a pronoun in a text refers to, using gender, number and context, as in the Matura task "Bezug".
tags: [latin, matura, austria, ahs, pronoun, reflexive, reference]
duration_min: { highschool: 75 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Aufgabenformat Bezug"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *Puella patrem vidit; eum statim salutavit.* Who greets whom? Which word tells you?
- Pronouns stand for persons and things that were named before. In the interpretation part the Matura often asks exactly this: "Geben Sie an, worauf sich … bezieht".
- Afterwards the learner can recognise the pronoun forms, refer reflexives correctly and solve "Bezug" tasks by gender, number and context.

# Core

A pronoun agrees in gender and number with the noun it stands for; its
case comes from its own clause. So the referent is found by gender and
number first, then by context. *is, ea, id* is the plain "he, she, it";
*hic* points to what is near or just mentioned (this), *ille* to what is
far or famous (that, the famous), *iste* often with contempt (that … of
yours), *ipse* stresses (himself, the very). The relative pronoun *qui,
quae, quod* takes gender and number from its antecedent, case from its own
clause. The reflexive *se* and *suus* refer to the subject: in a main
clause to its own subject, in an AcI or a subjunctive clause that expresses
the main subject's thought or wish usually to the main subject. *eius*
and *eorum* refer to someone else. Indefinites: *quidam* a certain,
*aliquis* someone, *quisquam* anyone (after negation), *quivis* any you
like, *quisque* each.

# Key facts

- is: eius (gen sg all genders), ei, eum/eam/id, eo/ea/eo; pl ei/eae/ea, eorum/earum, eis, eos/eas/ea.
- hic, haec, hoc; huius, huic; hunc, hanc, hoc; pl hi, hae, haec. Note: haec = f sg or n pl.
- ille, illa, illud; illius, illi; also iste, ista, istud; ipse, ipsa, ipsum (gen ipsius).
- qui, quae, quod; cuius, cui; quem, quam, quod; quo, qua, quo; pl qui, quae, quae; quorum, quarum; quibus; quos, quas, quae.
- Reflexive: se (acc/abl), sibi (dat), sui (gen); suus, -a, -um. Dicit se venire = he says that he (himself) is coming; dicit eum venire = he says that he (someone else) is coming.
- Indefinite: quidam, quaedam, quoddam (a certain); aliquis, aliquid; quisquam (anyone, in negated sentences); quivis, quaevis, quodvis (any); quisque (each), unusquisque (every single one).
- Matura task (German): "Geben Sie auf Deutsch an, worauf sich die folgenden lateinischen Textzitate inhaltlich beziehen" – answer with a word, a phrase or the situation, in German.

# Level: highschool

<!-- ptf:text v1 -->

In *Puella patrem vidit; eum statim salutavit*, *eum* is masculine
singular. The only masculine singular person around is *patrem*. So the
girl saw her father and greeted him at once. The case of *eum* is
accusative because he is greeted; it does not need to match *patrem*'s
case.

For a reference task, list the nouns of the right gender and number
before the pronoun, then pick the one that makes sense. Sometimes a
neuter pronoun (*id*, *hoc*, *haec*) refers to a whole situation, not to
one noun: then name the situation ("the fact that the slave fled").

*se* and *suus* point back to the subject. *Pater filio dixit se
cras venturum esse*: the father said that he himself would come tomorrow.

# Misconceptions

- **same-case**: A pronoun has the same case as the noun it refers to → it agrees in gender and number only; its case comes from its own clause.
- **haec-feminine**: haec is always feminine singular → it is also neuter plural (these things), often referring to what was said before.
- **reflexive-anyone**: se can refer to any person in the sentence → it refers to the subject (in an AcI to the subject of the verb of saying); someone else is eum/eam/eos.
- **ille-only-that**: ille only means "that" → after a name it can mean "the famous", and illi can be dative singular or nominative plural.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "eum-referent",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "same-case",
  "question": "Puella patrem vidit; eum statim salutavit. Whom does eum refer to?",
  "options": [
    { "text": "patrem (the father)", "correct": true, "feedback": "Yes: the only masculine singular noun." },
    { "text": "puella (the girl)", "correct": false, "feedback": "puella is feminine; that would be eam." },
    { "text": "nobody in the sentence", "correct": false, "feedback": "eum refers to a person named before." }
  ],
  "explanation": "Gender and number lead to the referent; the case (accusative) comes from salutavit."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "reference-task",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pr-reference"],
  "text": "Mercator villam in colle aedificavit. Eam postea filiis dedit; illi eam diu habitaverunt. – eam refers to {{1}} (Latin word), illi to {{2}} (Latin word).",
  "gaps": [
    { "answer": "villam" },
    { "answer": "filiis" }
  ],
  "explanation": "eam: feminine singular → the villa. illi: here masculine plural nominative (subject of habitaverunt) → the sons."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "reflexive-aci",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pr-reflexive"],
  "misconception": "reflexive-anyone",
  "question": "Servus domino dixit se fugere nolle. Who does not want to flee?",
  "options": [
    { "text": "the slave", "correct": true, "feedback": "Yes: se refers to the subject of dixit." },
    { "text": "the master", "correct": false, "feedback": "That would be eum fugere nolle." },
    { "text": "both", "correct": false, "feedback": "se is singular here and points to the subject." }
  ],
  "explanation": "In an AcI, se refers to the subject of the verb of saying."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "haec-readings",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pr-forms"],
  "misconception": "haec-feminine",
  "question": "Which readings are possible for haec?",
  "options": [
    { "text": "feminine nominative singular", "correct": true, "feedback": "Yes: haec femina." },
    { "text": "neuter nominative plural", "correct": true, "feedback": "Yes: haec verba." },
    { "text": "neuter accusative plural", "correct": true, "feedback": "Yes: haec dixit – he said these things." },
    { "text": "feminine accusative singular", "correct": false, "feedback": "That is hanc." },
    { "text": "masculine nominative plural", "correct": false, "feedback": "That is hi." }
  ],
  "explanation": "haec: f nom sg; n nom/acc pl."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "relative-antecedent",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pr-forms", "pr-reference"],
  "question": "Laudo amicos, quorum fides magna est. What does quorum refer to?",
  "options": [
    { "text": "amicos (the friends)", "correct": true, "feedback": "Yes: masculine plural; 'whose loyalty is great'." },
    { "text": "fides (loyalty)", "correct": false, "feedback": "fides is feminine singular; quorum is masculine/neuter plural." },
    { "text": "the speaker", "correct": false, "feedback": "The speaker is singular." }
  ],
  "explanation": "The relative pronoun takes gender and number from its antecedent, case (genitive) from its clause."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "indefinite",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["pr-forms"],
  "question": "Neque quisquam respondit. What does quisquam mean here?",
  "options": [
    { "text": "anyone: 'and nobody answered'", "correct": true, "feedback": "Yes: quisquam stands in negated sentences." },
    { "text": "a certain person", "correct": false, "feedback": "That is quidam." },
    { "text": "each one", "correct": false, "feedback": "That is quisque." }
  ],
  "explanation": "neque quisquam = and not anyone = and nobody."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pronouns-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["pr-reflexive", "pr-reference"],
  "question": "Marcus amicum rogavit, ut librum suum sibi daret. Whose book is it, and who should receive it?",
  "options": [
    { "text": "Marcus's book; Marcus should receive it", "correct": true, "feedback": "Yes: in a request clause, suum and sibi usually refer to the subject of the main clause (Marcus)." },
    { "text": "The friend's book; the friend should keep it", "correct": false, "feedback": "Then the sentence would not make sense with daret (give)." },
    { "text": "Marcus's book; the friend should keep it", "correct": false, "feedback": "daret means he should give it; sibi names who receives it: Marcus." }
  ],
  "explanation": "Indirect reflexive: in a clause that expresses the subject's wish, se/suus refer to that subject."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "situation-reference",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["pr-reference"],
  "question": "Hostes portas urbis clauserunt. Id cives valde terruit. State in your own words what id refers to and why it cannot refer to a single noun.",
  "rubric": [
    "id refers to the whole situation: that the enemies closed the gates of the city",
    "id is neuter singular; portas and urbis are feminine, hostes is masculine plural"
  ],
  "sample_answer": "id refers to the fact that the enemies had closed the city gates. No noun fits, because id is neuter singular, while hostes is masculine plural and portae and urbs are feminine.",
  "explanation": "A neuter pronoun often sums up a whole situation."
}
```

# Tutor notes

- For "Bezug" tasks, the Matura accepts a word, a phrase or the situation, in German; train answering briefly and precisely.
- Reflexives in dependent clauses (indirect reflexive) are a frequent source of errors: always ask "whose thought or wish is this?".

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): interpretation tasks of the type "Bezug".
