---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/language-accuracy
title: Language accuracy
description: The error types that cost the most in the dimension normative Sprachrichtigkeit of the German Matura (das and dass, commas, capitalisation of nominalised words, frequent confusions) and the Konjunktiv I for reported speech, with a proofreading routine.
lang: en
levels: [highschool]
objectives:
  - id: das-dass
    text: Decide between "das" and "dass" with the replacement test.
  - id: commas
    text: Set the commas that are required in German (subordinate clauses, enumerations, infinitive groups with um/ohne/statt, inserted clauses).
  - id: capitals
    text: Capitalise nouns and nominalised words (das Lesen, etwas Neues, beim Schreiben) and keep frequent confusions apart (seit/seid, wieder/wider, tot/Tod).
  - id: reported-speech
    text: Report what a text says in Konjunktiv I, with the Konjunktiv II form where Konjunktiv I looks like the indicative, and quote exactly.
requires:
  - ptf:el/ahs-matura-deutsch/assessment-grid
tags: [german, matura, spelling, punctuation, grammar, subjunctive]
duration_min: { highschool: 60 }
sources:
  - id: rechtschreibrat
    resource: https://www.rechtschreibrat.com/regeln-und-woerterverzeichnis/
    title: "Rat für deutsche Rechtschreibung: Amtliches Regelwerk (Groß- und Kleinschreibung §§ 55–65, Zeichensetzung §§ 71–79)"
  - id: srdp-deutsch-raster
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Beurteilungsraster zur SRDP in der Unterrichtssprache (normative Sprachrichtigkeit)"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: how many errors are in this sentence? „Ich glaube das, das Wichtigste beim lesen ist das man sich Zeit nimmt.“
- Language accuracy is one of the four dimensions, and it is the easiest to improve quickly: most errors in Matura texts come from a handful of rules.
- Afterwards the learner avoids the frequent error types and reports what a text says in correct indirect speech.

# Core

Most accuracy errors in Matura texts belong to a few types: "das" and
"dass" (the replacement test decides), missing commas before subordinate
clauses and around inserted clauses, lower-case nominalised words (das
Lesen, etwas Neues) and a few confusions (seit/seid, wieder/wider). When a
text reports what a source says, it uses Konjunktiv I („Die Autorin meint,
die Schule sei zu streng“), and the Konjunktiv II form where Konjunktiv I
would look like the indicative (sie hätten, sie bräuchten). Knowing one's
own typical errors and proofreading for them at the end is the most
effective habit.

# Key facts

- das/dass: if „dieses“, „jenes“ or „welches“ fits, write „das“ (article or pronoun); otherwise „dass“ (conjunction). „Ich hoffe, dass das Buch, das du hast, spannend ist.“
- Comma before subordinate clauses (dass, weil, ob, wenn, obwohl, relative clauses) and after them when the main clause continues: „Das Buch, das ich lese, ist spannend.“
- Comma in enumerations, but not before „und“/„oder“ joining two items: „Äpfel, Birnen und Pflaumen“.
- Infinitive groups: comma required after um, ohne, statt, anstatt, außer, als („Sie lernt, um zu bestehen.“), when they depend on a noun („die Idee, früher anzufangen“) or a referring word („Er dachte daran, früher anzufangen.“); otherwise optional, and setting it is never wrong.
- Comma before contrasting conjunctions: aber, sondern, doch, jedoch (when joining clauses or parts).
- Nominalised words are capitalised: das Lesen, beim Schreiben, zum Nachdenken, etwas Neues, nichts Gutes, das Wichtigste, im Allgemeinen.
- Frequent confusions: seit (since) / seid (you are); wieder (again) / wider (against: widersprechen); tot (dead, adjective) / Tod (death, noun); often misspelt: Standpunkt, Rhythmus, Reflexion, Tendenz, nämlich, Maßnahme.
- Konjunktiv I: er/sie/es sei, habe, könne, müsse, werde, gehe; sie (plural) seien. Where Konjunktiv I equals the indicative (sie haben, sie brauchen), use Konjunktiv II (sie hätten, sie bräuchten) or „würde“ + infinitive (sie würden brauchen).
- Tense of reported speech follows the original: present → sei; past → sei gewesen, habe gemacht; future → werde machen.
- Quotations: exact, in „…“, omissions marked with […], with a reference (line or title): Die Autorin spricht von einer „Generation ohne Pause“ (Z. 12).

# Level: highschool

<!-- ptf:text v1 -->

The sentence from the introduction has four errors: „Ich glaube, dass das
Wichtigste beim Lesen ist, dass man sich Zeit nimmt.“ A comma before the
dass clause, "dass" instead of "das" (twice the test: "dieses" does not
fit), a capital L in "beim Lesen" (a verb used as a noun), and a comma
after "ist" before the second dass clause.

These are the most frequent error types in Matura texts, so learn their
tests. Das or dass: if "dieses" or "welches" fits, write das. Comma: before
every subordinate clause (dass, weil, ob, obwohl, wenn, relative clauses)
and after it if the main clause goes on. Capitals: after "das", "beim",
"zum", "etwas", "nichts" a verb or adjective becomes a noun.

When you report what a text says, use Konjunktiv I: „Die Autorin schreibt,
die Schule sei zu streng.“ Where Konjunktiv I looks like the indicative,
take Konjunktiv II: „Sie meint, Kinder bräuchten mehr Pausen.“

At the end of the exam, proofread once only for your own two or three
typical errors. That finds more than a general reading.

# Misconceptions

- **dass-after-comma**: After a comma, "dass" is always right → only the replacement test decides: „Das Buch, das ich lese“ needs "das".
- **comma-by-breath**: Commas go where you would pause when speaking → German commas follow grammar: subordinate clauses, enumerations, certain infinitive groups.
- **verbs-small**: Verbs are always lower case → a verb used as a noun (beim Lesen, das Schreiben) is capitalised.
- **indicative-reporting**: Reported statements can stay in the indicative → a text that reports what an author says uses Konjunktiv I, so the reader sees that it is the author's view.
- **konjunktiv-two-wrong**: Konjunktiv II is wrong in reported speech → it is the correct replacement where Konjunktiv I equals the indicative (sie hätten, sie bräuchten).

# Questions

```ptf-question
{
  "kind": "cloze",
  "id": "das-dass-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["das-dass"],
  "misconception": "dass-after-comma",
  "text": "Ich hoffe, {{1}} du das Buch, {{2}} ich dir geliehen habe, bald zurückgibst. Mir ist klar, {{3}} es spannend ist.",
  "gaps": [
    { "answer": "dass" },
    { "answer": "das" },
    { "answer": "dass" }
  ],
  "explanation": "Replacement test: \"welches\" fits only in gap 2 (relative pronoun); gaps 1 and 3 introduce a clause (conjunction dass)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "comma-rules",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["commas"],
  "misconception": "comma-by-breath",
  "question": "Which two sentences are punctuated correctly?",
  "options": [
    { "text": "Ich weiß nicht, ob sie heute kommt.", "correct": true, "feedback": "Yes: comma before the ob clause." },
    { "text": "Sie lernte jeden Abend, um die Prüfung zu bestehen.", "correct": true, "feedback": "Yes: infinitive group with um needs a comma." },
    { "text": "Er sagte dass er später kommt.", "correct": false, "feedback": "Comma before dass: „Er sagte, dass …“" },
    { "text": "Das Buch das ich lese ist spannend.", "correct": false, "feedback": "The relative clause is enclosed: „Das Buch, das ich lese, ist spannend.“" },
    { "text": "Ich kaufte Äpfel, und Birnen.", "correct": false, "feedback": "No comma before und joining two items." }
  ],
  "explanation": "Commas mark subordinate clauses (both sides) and infinitive groups with um/ohne/statt; not before und between two items."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "capitals",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["capitals"],
  "misconception": "verbs-small",
  "text": "Beim {{1}} (lesen) des Artikels fiel mir etwas {{2}} (neues) auf: Das {{3}} (wichtigste) steht erst am Schluss.",
  "gaps": [
    { "answer": "Lesen" },
    { "answer": "Neues" },
    { "answer": "Wichtigste" }
  ],
  "explanation": "After beim, etwas and das the verb or adjective is used as a noun and is capitalised."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "confusions",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["capitals"],
  "question": "Which two sentences are spelled correctly?",
  "options": [
    { "text": "Ihr seid seit Montag in Wien.", "correct": true, "feedback": "Yes: seid (you are), seit (since)." },
    { "text": "Die Autorin widerspricht dem Bürgermeister.", "correct": true, "feedback": "Yes: wider = against." },
    { "text": "Ihr seit schon wieder zu spät.", "correct": false, "feedback": "„Ihr seid“: the verb sein." },
    { "text": "Der Vorschlag ist nach der Abstimmung Tod.", "correct": false, "feedback": "Adjective: „tot“; „der Tod“ is the noun." },
    { "text": "Er kommt immer wider zu spät.", "correct": false, "feedback": "„wieder“ = again." }
  ],
  "explanation": "seit/seid, wieder/wider, tot/Tod are among the most frequent confusions."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "konjunktiv",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["reported-speech"],
  "misconception": "konjunktiv-two-wrong",
  "text": "Die Autorin schreibt, die Schule {{1}} (sein) zu streng. Kinder {{2}} (brauchen) mehr Pausen, und man {{3}} (müssen) den Stundenplan ändern.",
  "gaps": [
    { "answer": "sei" },
    { "answer": "bräuchten", "accepted": ["würden brauchen", "würden mehr Pausen brauchen"] },
    { "answer": "müsse" }
  ],
  "explanation": "Konjunktiv I: sei, müsse. „Sie brauchen“ would look like the indicative, so Konjunktiv II (bräuchten) or würde-form."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "report-correctly",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["reported-speech"],
  "misconception": "indicative-reporting",
  "question": "The source says: „Wir haben die Kosten unterschätzt.“ (Bürgermeisterin Huber). Which sentence reports it correctly?",
  "options": [
    { "text": "Bürgermeisterin Huber räumt ein, man habe die Kosten unterschätzt.", "correct": true, "feedback": "Yes: Konjunktiv I perfect, precise reporting verb." },
    { "text": "Bürgermeisterin Huber räumt ein, wir haben die Kosten unterschätzt.", "correct": false, "feedback": "Indicative and the wrong person (\"wir\")." },
    { "text": "Bürgermeisterin Huber räumt ein, man hatte die Kosten unterschätzt.", "correct": false, "feedback": "Indicative past perfect; reported speech takes Konjunktiv I." }
  ],
  "explanation": "Change the person (wir → man/sie) and use Konjunktiv I; past events take the perfect form (habe … unterschätzt)."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "spot-four",
  "level": "highschool",
  "purpose": "warmup",
  "objectives": ["das-dass", "commas", "capitals"],
  "text": "Correct version of „Ich glaube das, das Wichtigste beim lesen ist das man sich Zeit nimmt.“: Ich glaube{{1}} {{2}} das Wichtigste beim {{3}} ist, {{4}} man sich Zeit nimmt.",
  "gaps": [
    { "answer": "," },
    { "answer": "dass" },
    { "answer": "Lesen" },
    { "answer": "dass" }
  ],
  "explanation": "Comma before the dass clause, dass (twice), beim Lesen, comma before the second dass clause."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "proofread",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["das-dass", "commas", "capitals", "reported-speech"],
  "question": "Dieser Absatz aus einer Zusammenfassung enthält acht Fehler. Finde und korrigiere sie und nenne jeweils die Regel.\n\n„Die Autorin behauptet das Jugendliche zu wenig schlafen. Sie meint, das liegt vor allem am Handy, dass viele bis spät in die Nacht benutzen. Beim einschlafen störe das blaue Licht. Sie fordert dass Schulen später beginnen, und schlägt vor den Unterricht um neun Uhr anfangen zu lassen. Dadurch würden die Schüler seit dem ersten Tag etwas positives erleben.“",
  "rubric": [
    "1 „behauptet, dass“: comma + dass (conjunction)",
    "2 „das liege“: reported speech in Konjunktiv I",
    "3 „Handy, das“: relative pronoun (welches fits)",
    "4 „Beim Einschlafen“: nominalised verb capitalised",
    "5 „fordert, dass“: comma before the subordinate clause",
    "6 „schlägt vor, den Unterricht …“: comma for the infinitive group (optional by rule, but recommended; accept the learner noticing it)",
    "7 „ab dem ersten Tag“ / „vom ersten Tag an“: seit is wrong with a future event",
    "8 „etwas Positives“: nominalised adjective capitalised"
  ],
  "sample_answer": "1 „behauptet, dass Jugendliche“ (Komma, Konjunktion dass). 2 „das liege vor allem am Handy“ (Konjunktiv I in der indirekten Rede). 3 „am Handy, das viele …“ (Relativpronomen, „welches“ passt). 4 „Beim Einschlafen“ (nominalisiertes Verb). 5 „Sie fordert, dass“ (Komma vor dem Nebensatz). 6 „schlägt vor, den Unterricht um neun Uhr anfangen zu lassen“ (Komma bei der Infinitivgruppe). 7 „vom ersten Tag an“ statt „seit dem ersten Tag“ (seit passt nicht zu etwas Künftigem). 8 „etwas Positives“ (nominalisiertes Adjektiv).",
  "explanation": "Most errors fall into four types: das/dass, comma before subordinate clauses, nominalisations, Konjunktiv I."
}
```

# Tutor notes

- Keep a short list of the learner's own typical errors across all texts and practise exactly those.
- Do not correct every error in a draft: name the type and let the learner find the instances.
- At the end of every full writing task, have the learner proofread once only for their two or three error types.
- Austrian standard German is correct in the Matura (Jänner, heuer, Paradeiser, die Matura); do not mark it as an error.

# Sources

Grounding: [^rechtschreibrat], [^srdp-deutsch-raster]. Text, examples and questions are original.

[^rechtschreibrat]: Rat für deutsche Rechtschreibung, Deutsche Rechtschreibung: Regeln und Wörterverzeichnis (amtliches Regelwerk).
[^srdp-deutsch-raster]: Bundesministerium für Bildung, Wissenschaft und Forschung, Beurteilungsraster zur SRDP in der Unterrichtssprache, matura.gv.at.
