---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/subjunctive-clauses
title: Subordinate clauses with the subjunctive
description: ut and ne clauses (purpose, result, request), cum clauses, indirect questions, conditional sentences and the sequence of tenses (consecutio temporum), as tested by the syntax checkpoints of the Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: sc-ut-ne
    text: Tell apart ut/ne clauses of purpose, result and request (and ut with the indicative) by signal words in the main clause and translate them.
  - id: sc-cum
    text: Translate cum with the subjunctive as when, because or although from the context, and cum with the indicative as when/whenever.
  - id: sc-indirect
    text: Recognise indirect questions and use the sequence of tenses to find the time relation of a subjunctive clause.
  - id: sc-conditional
    text: Tell real, possible and unreal conditions (si, nisi) apart by their moods and tenses and translate them.
tags: [latin, matura, austria, ahs, syntax, subjunctive, ut, cum, consecutio-temporum, conditional]
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Korrekturhefte (SY checkpoints GS)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: *Tantus clamor in foro erat, ut nemo oratorem audiret.* Was the noise there *so that* nobody would hear the speaker (a purpose), or *so great that* nobody heard him (a result)? Which word decides?
- Most Latin subordinate clauses have a subjunctive. The Matura asks for their kind, for example "GS (konsekutiv)" or "GS (temporal, gleichzeitig)".
- Afterwards the learner can name and translate the clause types and derive the time relation from the tenses.

# Core

*ut* with the subjunctive is a purpose clause (in order that; negative
*ne*), a result clause (so that, after *tam, tantus, ita, sic, adeo*;
negative *ut non*) or a request clause after verbs of asking, urging and
commanding (*rogare, hortari, petere, imperare*: to …). *ut* with the
indicative means "as" or "when". *cum* with the subjunctive is narrative
(when, as), causal (because, since) or concessive (although; often with
*tamen* in the main clause); *cum* with the indicative is temporal (when,
whenever). Indirect questions depend on verbs of asking, knowing and
wondering and are introduced by question words (*quis, quid, cur, unde,
quo, num, -ne*). The tense of the subjunctive follows the main verb
(consecutio temporum): after a present or future main verb, present
subjunctive = simultaneous, perfect subjunctive = prior; after a past main
verb, imperfect subjunctive = simultaneous, pluperfect subjunctive =
prior. Conditions with *si/nisi*: indicative = real (if … then);
present/perfect subjunctive = possible (if … should, would); imperfect
subjunctive = unreal in the present, pluperfect subjunctive = unreal in
the past.

# Key facts

- Purpose: Venit, ut amicum videret – he came to see his friend. Negative: ne.
- Result: tantus … ut, ita … ut, sic … ut, tam … ut, adeo … ut – so (great) that. Negative: ut non.
- Request: Rogavit, ut veniret – he asked him to come; hortari, ut; petere, ut; imperare, ut.
- Fear: timeo, ne veniat – I fear that he comes; timeo, ut veniat – I fear that he does not come.
- Sequence of tenses: main present/future → subj. present (simultaneous), perfect (prior); main past → subj. imperfect (simultaneous), pluperfect (prior). Subsequent: -urus sim / -urus essem.
- Conditions: Si venis, gaudeo (real); si venias, gaudeam (possible); si venires, gauderem (unreal present); si venisses, gavisus essem (unreal past).
- Indirect question: Nescio, unde veniat – I do not know where he comes from; quaerebant, unde sonus veniret – they asked where the sound came from.
- Matura notation (German): GS (final / konsekutiv / Begehrssatz / temporal / kausal / konzessiv / indirekter Fragesatz / konditional), gleichzeitig / vorzeitig / nachzeitig.

# Level: highschool

<!-- ptf:text v1 -->

In *Tantus clamor in foro erat, ut nemo oratorem audiret*, the main
clause contains *tantus* (so great). That is the signal for a result
clause: "The noise in the forum was so great that nobody heard the
speaker." Without a
signal word, *ut* + subjunctive after a verb of motion is usually a
purpose: *Venit, ut nos adiuvaret* – he came to help us.

For *cum* + subjunctive, read the main clause: *Cum fessus esset, tamen
laboravit* – although he was tired, he still worked (*tamen* shows the
concession). *Cum hostes appropinquarent, cives fugerunt* – when / because
the enemies were approaching, the citizens fled.

The sequence of tenses tells you the time: *fugerunt* is past, so the
imperfect subjunctive *appropinquarent* is simultaneous; a pluperfect
subjunctive (*appropinquavissent*) would be prior.

# Misconceptions

- **ut-always-purpose**: ut + subjunctive always means "in order to" → after tantus/ita/sic it is a result, after verbs of asking a request, with the indicative "as".
- **cum-with**: cum always means "with" → as a conjunction (with a verb in the clause) it means when, because or although; the preposition cum takes an ablative.
- **subjunctive-is-would**: Every subjunctive is translated with "would" or "may" → in most subordinate clauses it is translated as an ordinary indicative.
- **tense-is-time**: The tense of the subjunctive is its time → it shows the time relation to the main verb (consecutio temporum).

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "tantus-ut",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "ut-always-purpose",
  "question": "Tantus clamor in foro erat, ut nemo oratorem audiret. What kind of ut clause is it?",
  "options": [
    { "text": "Result (konsekutiv): so great that nobody heard the speaker", "correct": true, "feedback": "Yes: tantus in the main clause." },
    { "text": "Purpose (final): in order that nobody would hear the speaker", "correct": false, "feedback": "tantus in the main clause signals a result." },
    { "text": "Request: asking nobody to listen", "correct": false, "feedback": "There is no verb of asking." }
  ],
  "explanation": "tantus … ut = so great … that."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "ut-types",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sc-ut-ne"],
  "question": "Which pairs of sentence and clause type are right?",
  "options": [
    { "text": "Filia patrem rogavit, ut sibi librum emeret. – request", "correct": true, "feedback": "Yes: rogare, ut – she asked her father to buy her a book." },
    { "text": "Ad urbem venit, ut amicum videret. – purpose", "correct": true, "feedback": "Yes: he came to see his friend." },
    { "text": "Ita clamavit, ut omnes audirent. – purpose", "correct": false, "feedback": "ita … ut: result – so loudly that everyone heard." },
    { "text": "Ut audivi, statim veni. – request", "correct": false, "feedback": "ut + indicative: when / as soon as I heard." }
  ],
  "explanation": "Look for the signal: verb of asking (request), tam/ita/tantus (result), indicative (as/when)."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "consecutio",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sc-indirect"],
  "misconception": "tense-is-time",
  "text": "Give the time relation to the main verb: Rogo, quid facias → {{1}}; Rogavi, quid fecisses → {{2}}; Rogavi, quid faceres → {{3}}; Rogo, quid feceris → {{4}}.",
  "gaps": [
    { "answer": "simultaneous", "accepted": ["gleichzeitig"] },
    { "answer": "prior", "accepted": ["vorzeitig"] },
    { "answer": "simultaneous", "accepted": ["gleichzeitig"] },
    { "answer": "prior", "accepted": ["vorzeitig"] }
  ],
  "explanation": "Present main verb: present/perfect subjunctive; past main verb: imperfect/pluperfect subjunctive."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cum-meaning",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sc-cum"],
  "misconception": "cum-with",
  "question": "Cum servus fessus esset, tamen laborare non desiit. What does cum mean here?",
  "options": [
    { "text": "although", "correct": true, "feedback": "Yes: tamen (nevertheless) shows the concession." },
    { "text": "because", "correct": false, "feedback": "Because he was tired, he still worked? tamen contradicts that." },
    { "text": "with", "correct": false, "feedback": "cum with a verb in its clause is a conjunction." }
  ],
  "explanation": "cum concessivum: although the slave was tired, he did not stop working."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "conditionals",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sc-conditional"],
  "misconception": "subjunctive-is-would",
  "question": "Si hoc scivissem, non venissem. Which kind of condition is it?",
  "options": [
    { "text": "Unreal in the past: If I had known this, I would not have come", "correct": true, "feedback": "Yes: pluperfect subjunctive in both clauses." },
    { "text": "Real: If I know this, I do not come", "correct": false, "feedback": "Real conditions have the indicative." },
    { "text": "Unreal in the present: If I knew this, I would not come", "correct": false, "feedback": "That needs the imperfect subjunctive (scirem, venirem)." }
  ],
  "explanation": "Pluperfect subjunctive = unreal past."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "indirect-question",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["sc-indirect"],
  "question": "Viator nesciebat, ubi esset. What is ubi esset?",
  "options": [
    { "text": "An indirect question, simultaneous: the traveller did not know where he was", "correct": true, "feedback": "Yes: ubi (where) after nescire; imperfect subjunctive after a past verb." },
    { "text": "A relative clause: the place in which he was", "correct": false, "feedback": "There is no antecedent; ubi depends on nesciebat." },
    { "text": "A temporal clause: when he was there", "correct": false, "feedback": "ubi + indicative can mean when; here it asks where, with the subjunctive." }
  ],
  "explanation": "Indirect questions: question word + subjunctive after a verb of knowing or asking."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "translate-clauses",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["sc-ut-ne", "sc-cum"],
  "question": "Translate and name both clause types: Cum nox esset, dux milites hortatus est, ne hostes timerent.",
  "rubric": [
    "cum + subjunctive: temporal/causal (since/when it was night)",
    "hortatus est: deponent perfect, he encouraged",
    "ne + subjunctive after hortari: request (negative), not to fear",
    "Natural translation"
  ],
  "sample_answer": "Since it was night, the leader encouraged the soldiers not to be afraid of the enemies. (cum clause: causal or temporal; ne clause: request clause after hortari.)",
  "explanation": "hortari, ne = urge not to."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "subjunctive-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["sc-ut-ne", "sc-indirect"],
  "question": "Pueri quaerebant, unde tantus sonus veniret. Which translation is right?",
  "options": [
    { "text": "The boys asked where such a loud sound came from", "correct": true, "feedback": "Yes: indirect question, simultaneous." },
    { "text": "The boys asked so that such a sound would come", "correct": false, "feedback": "unde is a question word (where from)." },
    { "text": "The boys would ask where the sound had come from", "correct": false, "feedback": "quaerebant is indicative; veniret is simultaneous." }
  ],
  "explanation": "unde + subjunctive after quaerere: indirect question."
}
```

# Tutor notes

- Make the learner underline the signal word (tantus, ita, rogare, tamen, a question word) before naming the clause type.
- The consecutio table is small; practise it until it is automatic, it decides many SY checkpoints.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): marking guides with syntax checkpoints.
