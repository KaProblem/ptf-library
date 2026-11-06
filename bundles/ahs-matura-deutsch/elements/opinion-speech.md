---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/opinion-speech
title: Opinion speech (Meinungsrede)
description: The Meinungsrede of the German Matura, the written version of a speech that wins a named audience over to a position, with address, arguments, rhetorical means and an appeal, with an original practice task, rubric and sample speech.
lang: en
levels: [highschool]
objectives:
  - id: features
    text: Name the features of a Meinungsrede (named audience and occasion, address, attention-getting opening, arguments, rhetorical means, appeal, closing formula).
  - id: rhetoric
    text: Recognise and use rhetorical means purposefully (rhetorical question, anaphora, tricolon, contrast, inclusive "wir", direct address).
  - id: write
    text: Write a complete Meinungsrede within a given word range that uses figures from a source and ends with an appeal.
requires:
  - ptf:el/ahs-matura-deutsch/argumentation
  - ptf:el/ahs-matura-deutsch/structure-and-style
tags: [german, matura, text-type, speech, meinungsrede, rhetoric]
duration_min: { highschool: 90 }
sources:
  - id: srdp-textsorten
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Textsortenkatalog zur SRDP in der Unterrichtssprache (2020), Meinungsrede"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: imagine you stand in front of teachers, parents and students and have ten seconds before they stop listening. What is your first sentence?
- The Meinungsrede is the only text type written to be heard. It must win over a concrete audience, so it addresses people, uses rhetoric and ends with an appeal.
- Afterwards the learner can write a speech that a real audience would follow and that asks it for something.

# Core

A Meinungsrede is the written version of a speech in which the speaker
wants to win a named audience over to a position on a specific occasion.
It opens with an address and an opening that catches attention, develops
a few strong arguments that matter to this audience, uses rhetorical means
purposefully (questions, repetition, contrast, "wir"), and ends with an
appeal that says what the audience should do, followed by a closing
formula. Its language is vivid and spoken, but still well formed; its
arguments must convince, not only its sound.

# Key facts

- Situation: the task names the occasion and the audience (Schulforum, Gemeinderat, Abschlussfeier); the speech is written for them, not for a newspaper.
- Purpose: the printed version of a speech that wants to convince a named audience of the speaker's position on a current issue. The own position comes first; information and explanation only as far as they support the argument.
- Opening: address („Sehr geehrte Frau Direktorin, liebe Eltern, liebe Mitschülerinnen und Mitschüler!“), then a way in: the current occasion, a surprising fact, a quotation, a direct question, or the speaker's own role or concern.
- Occasion: say early why you speak now and how it relates to the Textbeilage.
- Main part: two or three arguments chosen for this audience, each with concrete examples and checkable facts and figures, made vivid („zwei von drei von uns“); ordered in a clear sequence (rising in weight, thesis and antithesis, question and answer, or problem and solution).
- Rhetorical means: rhetorical question; anaphora (repeated beginning); tricolon (three-part list); contrast (antithesis); inclusive „wir“; direct address („Sie“, „ihr“); concrete image or example.
- Conclusion: summary, outlook or appeal (what should the audience do?), often a return to the opening, then a closing formula („Vielen Dank für Ihre Aufmerksamkeit.“).
- Style: written for listeners, so simple sentences and deliberate repetition (redundancy) are features, not faults; rhetorical and argumentative means; direct, but not colloquial; exclamations sparingly.
- Length in the exam: 405–495 or 540–660 words; the task always names occasion and audience. Too short a speech usually lacks the arguments it needs.

# Level: highschool

<!-- ptf:text v1 -->

Ten seconds: a speech is lost if its first sentence is "Ich möchte heute
über ein Thema sprechen". A question, a scene or a figure works better:
„Wie viele von Ihnen haben zu Hause eine Lade voller kaputter Kopfhörer?“

Write for the people in the room. A speech at the Schulforum speaks to
teachers, parents and students, and its arguments should matter to them:
cost, learning, the environment, the school's reputation. Address them
(„Sie“, „ihr“) and draw them in („wir“).

Rhetorical means help listeners follow and remember: a repeated beginning
(„Wir reparieren … Wir lernen … Wir sparen …“), three-part lists, a
contrast. Use them where they carry an argument, not as decoration.

End with an appeal that asks for something concrete: a vote, a signature,
a helping hand. Return to the opening image if you can, and thank the
audience.

# Misconceptions

- **speech-is-essay**: A Meinungsrede is an Erörterung with an address → it is written for listeners: hook, few strong arguments, rhetoric and an appeal.
- **rhetoric-replaces-arguments**: Rhetorical means are enough to convince → they carry arguments; without reasons a speech is empty.
- **no-concrete-appeal**: A speech ends with a general wish („Denkt mal darüber nach“) → it asks the audience for something concrete.
- **any-audience**: A speech can speak to everyone → it speaks to the audience the task names, with arguments that matter to them.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "speech-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["features"],
  "misconception": "speech-is-essay",
  "question": "Which two features belong to a Meinungsrede but not to an Erörterung?",
  "options": [
    { "text": "An address of the audience at the start", "correct": true, "feedback": "Yes: the speech speaks to people in the room." },
    { "text": "An appeal to the audience at the end", "correct": true, "feedback": "Yes: the speech asks for something." },
    { "text": "Arguments with reasons and examples", "correct": false, "feedback": "Both text types need them." },
    { "text": "A structure with introduction, main part and conclusion", "correct": false, "feedback": "Both text types have it." }
  ],
  "explanation": "Address, rhetoric for listeners and an appeal make a speech."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "name-the-device",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["rhetoric"],
  "question": "„Wir reparieren Kopfhörer. Wir reparieren Fahrräder. Wir reparieren unser Verhältnis zu den Dingen.“ Which rhetorical means are used?",
  "options": [
    { "text": "Anaphora and tricolon", "correct": true, "feedback": "Yes: the same beginning three times, in three parts." },
    { "text": "Rhetorical question", "correct": false, "feedback": "There is no question." },
    { "text": "Irony", "correct": false, "feedback": "It means what it says." }
  ],
  "explanation": "Anaphora repeats the beginning; tricolon groups in three; the last part brings a turn."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "survey-percent",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["write"],
  "question": "A survey at your school asked 400 students; 300 of them would use a free repair café. What percentage is that? (Speeches make figures vivid: „drei von vier“.)",
  "answer": 75,
  "tolerance": 0,
  "unit": "%",
  "explanation": "300 / 400 = 0.75 = 75 %, three out of four."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "appeal",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["features"],
  "misconception": "no-concrete-appeal",
  "question": "Which ending is the best appeal to the Schulforum?",
  "options": [
    { "text": "„Ich bitte Sie deshalb: Stimmen Sie heute dafür, dass wir den Werkraum einmal im Monat für ein Reparaturcafé öffnen. Vielen Dank für Ihre Aufmerksamkeit.“", "correct": true, "feedback": "Yes: concrete request, addressed, with closing formula." },
    { "text": "„Denken Sie einmal darüber nach.“", "correct": false, "feedback": "Too vague: what should the audience do?" },
    { "text": "„Das war meine Rede.“", "correct": false, "feedback": "No appeal, no closing formula." }
  ],
  "explanation": "An appeal names what the audience should do, now."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "audience-fit",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["features", "rhetoric"],
  "misconception": "any-audience",
  "question": "Your audience is the Schulforum (teachers, parents, student representatives), which decides on the school's money. Which argument is chosen best for it?",
  "options": [
    { "text": "„Ein Reparaturcafé kostet die Schule fast nichts: Werkraum und Werkzeug sind da, und Freiwillige haben ihre Hilfe angeboten.“", "correct": true, "feedback": "Yes: answers the audience's main concern, cost." },
    { "text": "„Reparieren ist einfach cool.“", "correct": false, "feedback": "No reason, and not aimed at this audience." },
    { "text": "„In anderen Ländern gibt es auch Reparaturcafés.“", "correct": false, "feedback": "A fact without a link to what this audience decides." }
  ],
  "explanation": "Choose arguments that answer what this audience cares about."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "speech-task",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["write", "rhetoric", "features"],
  "misconception": "rhetoric-replaces-arguments",
  "question": "Schreibauftrag\nThema: Konsum und Verantwortung\nVerfassen Sie eine Meinungsrede (405–495 Wörter), die Sie als Schulsprecherin bzw. Schulsprecher bei der nächsten Sitzung des Schulforums halten. Lesen Sie die Umfrageergebnisse „Reparieren statt wegwerfen“ (Textbeilage, für diesen Kurs verfasst).\nAufgabenstellung:\n• Stellen Sie die wichtigsten Ergebnisse der Umfrage dar.\n• Begründen Sie, warum ein Reparaturcafé der Schule und der Umwelt nützen würde.\n• Appellieren Sie an das Schulforum, das Projekt zu unterstützen.\n\nTextbeilage: „Reparieren statt wegwerfen“, Umfrage der Schülervertretung, Oktober 2026\n\nDie Schülervertretung hat im Oktober 400 Schülerinnen und Schüler befragt. 268 von ihnen besitzen ein Elektrogerät, das kaputt in einer Lade liegt, am häufigsten Kopfhörer, Handys und Ladegeräte. Nur 52 haben schon einmal etwas reparieren lassen; als Gründe nennen die anderen vor allem, dass sie nicht wissen, wo, und dass eine Reparatur zu teuer sei. 300 Befragte würden ein kostenloses Reparaturcafé an der Schule nutzen, bei dem Freiwillige gemeinsam mit Schülerinnen und Schülern Geräte, Fahrräder und Kleidung reparieren. Der Werklehrer und zwei Elternvertreter haben angeboten, einmal im Monat einen Nachmittag lang mitzuhelfen. Offen ist, wer für Werkzeug und Ersatzteile zahlt und wo das Café stattfinden kann.",
  "rubric": [
    "Inhalt, writing acts: a Meinungsrede that argues and appeals to this audience, not a report on the survey",
    "Inhalt, bullet 1: the key results reproduced correctly and vividly (400 asked; 268 with a broken device; only 52 ever had something repaired; 300 would use the café; offer of help)",
    "Inhalt, bullet 2: reasons why it helps the school and the environment (less waste, saving money, learning practical skills, community), with answers to the open questions (room, tools, parts)",
    "Inhalt, bullet 3: a concrete appeal to the Schulforum",
    "Inhalt: figures from the survey correct, none invented; a clear own position",
    "Textstruktur: address, way in (question, occasion, own role), occasion linked to the survey, main part with two or three arguments in a clear order, appeal, closing formula",
    "Stil und Ausdruck: written for listeners: simple sentences and deliberate repetition allowed; rhetorical means used purposefully (question, anaphora, tricolon, wir, Sie); not colloquial; own formulations",
    "Sprachnormen: punctuation (commas, the address), spelling (capitals in Sie/Ihnen), grammar; figures written correctly",
    "Length 405–495 words; much shorter lacks the arguments a speech needs"
  ],
  "sample_answer": "Sehr geehrte Frau Direktorin, sehr geehrte Lehrerinnen und Lehrer, liebe Eltern, liebe Kolleginnen und Kollegen aus der Schülervertretung!\n\nWie viele von Ihnen haben zu Hause eine Lade, in der kaputte Kopfhörer, alte Ladekabel oder ein Handy mit gesprungenem Display liegen? Bei uns Schülerinnen und Schülern ist die Antwort eindeutig. Wir haben im Oktober 400 von uns befragt, und 268 besitzen ein solches Gerät. Das sind zwei von drei.\n\nDie Umfrage zeigt aber noch etwas. Nur 52 von 400 haben jemals etwas reparieren lassen. Nicht, weil es ihnen egal wäre, sondern weil sie nicht wissen, wohin, und weil eine Reparatur zu teuer scheint. Und 300 von uns, also drei von vier, würden ein kostenloses Reparaturcafé an unserer Schule nutzen. Der Wille ist da. Was fehlt, ist ein Ort.\n\nWarum sollte die Schule dieser Ort sein? Erstens, weil wir hier lernen sollen, was wir im Leben brauchen. Wer einmal ein Kabel gelötet oder einen Reißverschluss ersetzt hat, schaut Dinge anders an. Er fragt nicht zuerst, was Neues kostet, sondern ob das Alte noch zu retten ist.\n\nZweitens, weil es um unsere Umwelt geht. Jedes Gerät, das wir reparieren, muss nicht neu gebaut, verpackt und quer durch die Welt transportiert werden. Wir reden in Biologie und Geografie viel über Ressourcen. Hier könnten wir einmal im Monat etwas dafür tun, und zwar nicht auf einem Arbeitsblatt, sondern mit den eigenen Händen. Und ganz nebenbei spart jede Familie Geld, wenn das Handy noch ein Jahr länger hält.\n\nDrittens, weil es uns zusammenbringt. Im Reparaturcafé sitzen Schülerinnen und Schüler neben Eltern und Lehrkräften, die Älteren zeigen den Jüngeren, wie es geht, und manchmal ist es umgekehrt. Ich kenne kaum einen anderen Ort an unserer Schule, an dem das so selbstverständlich passieren könnte.\n\nSie fragen zu Recht, was das kostet. Die gute Nachricht: fast nichts. Unser Werklehrer und zwei Elternvertreter haben angeboten, einmal im Monat einen Nachmittag lang mitzuhelfen. Den Werkraum haben wir schon, das meiste Werkzeug auch. Für Ersatzteile schlagen wir eine Spendenbox vor, in die jeder gibt, was ihm die Reparatur wert war. Und um Ordnung und Sicherheit kümmert sich die Schülervertretung: Wir räumen auf, wir führen eine Liste, und kein Gerät wird ohne Aufsicht geöffnet.\n\nWir reparieren Kopfhörer. Wir reparieren Fahrräder. Und vielleicht reparieren wir ein bisschen unser Verhältnis zu den Dingen, die wir besitzen.\n\nIch bitte Sie deshalb: Stimmen Sie heute dafür, dass wir den Werkraum ab dem nächsten Monat einmal im Monat für ein Reparaturcafé öffnen. Geben Sie uns ein Semester Zeit, und wir zeigen Ihnen, wie viele Laden danach leerer sind.\n\nVielen Dank für Ihre Aufmerksamkeit.",
  "explanation": "The sample addresses the Schulforum, opens with a question, makes the figures vivid, gives three arguments (learning, environment, community), answers the cost concern and ends with a concrete appeal and closing formula."
}
```

# Tutor notes

- Have the learner read the speech aloud; sentences that are hard to say are hard to follow.
- Rhetorical means are a bonus, arguments are the basis: if the speech convinces only by sound, say so.
- The survey, its figures and the school are invented for this course; tell the learner if they ask.

## Blueprint for new tasks

Rules for all tasks: exam-format element, "Making new writing tasks".

- **Word range:** 405–495 or 540–660.
- **Situation (required):** a named occasion and audience that decides or acts: Schulforum, Gemeinderat, school assembly, graduation, a youth conference, a club's annual meeting.
- **Textbeilage:** material with facts the speech can use: survey results, a short report, an info sheet, a graphic; 150–500 words.
- **Operators:** bullet 1 „Stellen Sie … dar“ / „Beschreiben Sie …“; bullet 2 „Begründen Sie …“ / „Erläutern Sie …“ / „Setzen Sie sich mit Einwänden auseinander“; bullet 3 „Appellieren Sie an …“ / „Fordern Sie …“.
- **Rubric template:** follow the rubric of the task above. Inhalt: writing acts of a speech; one line per bullet; material correct and vivid, none invented; clear own position. Textstruktur: address, way in, occasion, ordered arguments, appeal, closing formula. Stil: for listeners, rhetorical means with purpose, own formulations. Sprachnormen. Range.

# Sources

Grounding: [^srdp-textsorten]. Text, Textbeilage, examples and questions are original.

[^srdp-textsorten]: Bundesministerium für Bildung, Wissenschaft und Forschung, Textsortenkatalog zur SRDP in der Unterrichtssprache (Stand 2020), Meinungsrede, matura.gv.at.
