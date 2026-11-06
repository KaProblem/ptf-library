---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/letter-to-the-editor
title: Letter to the editor (Leserbrief)
description: The Leserbrief of the German Matura, a reader's reply to a newspaper text that refers to it, takes up its arguments and states a justified position, with an original practice task, rubric and sample text.
lang: en
levels: [highschool]
objectives:
  - id: features
    text: Name the features of a Leserbrief (direct address in letter form, reference to a published text with its basic data, reader's perspective, own position, closing with name and, where relevant, age and place).
  - id: engage
    text: Reproduce the position of the text referred to briefly and take up its arguments by agreeing, limiting or refuting them.
  - id: write
    text: Write a complete Leserbrief within a given word range.
requires:
  - ptf:el/ahs-matura-deutsch/argumentation
  - ptf:el/ahs-matura-deutsch/structure-and-style
tags: [german, matura, text-type, letter-to-the-editor, leserbrief]
duration_min: { highschool: 90 }
sources:
  - id: srdp-textsorten
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Textsortenkatalog zur SRDP in der Unterrichtssprache (2020), Leserbrief"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a newspaper demands that phones be locked away at every school, including the breaks. You have one minute: what would you write back to the paper?
- The Leserbrief is a reply. Its readers have read (or skimmed) the article it answers; they want to know what a reader thinks of it and why.
- Afterwards the learner can write a complete Leserbrief that engages with a text instead of only giving an opinion on its topic.

# Core

A Leserbrief answers a text that a newspaper or magazine has published.
It names that text (title, author, medium, date), reproduces its position
briefly, takes up its arguments by agreeing, limiting or refuting them,
and states the writer's own justified position, often with a demand. It is
written from the writer's perspective (an "ich" with a role, such as
student, parent, resident). As a letter it opens with a direct address (to
the editors, the author or the readers) and closes with the writer's name,
and age and place where they matter. The style can range from factual to
sharply critical or polemical, but never insulting, and never colloquial.

# Key facts

- Opening formula (Eröffnungsformel): required. A direct address to the editors („Sehr geehrte Redaktion“), the author („Sehr geehrter Herr Weber“) or the readers. A letterhead with addresses is not needed in the Matura.
- Reference: the introduction names the occasion and the text answered with its basic data (text type, title, author, medium, date); a line „Betrifft: …“ above the address is a common way to start.
- Headline: optional; a short headline that states the position can help („Handyfreie Stunden ja, handyfreie Schule nein“).
- Perspective: say who is writing and why it concerns you („Als Schülerin einer achten Klasse …“).
- Engagement: reproduce the position in one or two sentences (Konjunktiv), then answer specific arguments of the text, not only the topic.
- Structure: opening formula; introduction with occasion, reference and own role; main part with the own position as agreement, rejection, addition or contradiction on the text's arguments; conclusion with appeal, evaluation, summary or outlook tied to the occasion; closing formula with name (age and place if relevant).
- Style: compressed; from factual to subjective-critical or polemical and provocative, but no insults; not colloquial.
- Length in the exam: always 270–330 words, with a situation (the medium). A much longer letter loses the compression the text type needs.
- Leserbrief vs offener Brief: an open letter addresses the general public, not a medium whose article it answers.

# Level: highschool

<!-- ptf:text v1 -->

Your one-minute reply probably started with "I think …". A Leserbrief
starts one step earlier: it says which text it answers and what that text
claims. „In seinem Kommentar ‚Weg mit den Handys!‘ (Tagesblick, 3. März
2026) fordert Martin Weber, …“. Readers of the paper need that context.

Then say who you are, if it matters: a student, a teacher, a parent. That
gives your view weight.

The heart of the letter is the reply to the text's arguments. Pick two of
them and answer each: agree where the author is right, limit where he goes
too far, refute where he is wrong. That shows you have read the text, not
only its headline.

Remember it is a letter: open with an address („Sehr geehrte
Redaktion,“) and finish with your own proposal or demand and your name, and
your place or age if they matter. You may be sharp, even polemical, but
never insulting.

# Misconceptions

- **topic-not-text**: A Leserbrief gives my opinion on the topic → it answers a specific text and takes up its arguments.
- **must-disagree**: A Leserbrief must contradict the article → it may agree, limit or contradict; what counts is a justified position.
- **letter-format**: A Leserbrief is a private letter with "Liebe …" and "Liebe Grüße" → it is a published letter: a formal address (Redaktion, author or readers) and a closing with name, personal but not private or colloquial.
- **no-address**: A Leserbrief can start straight with the argument, like a Kommentar → the opening formula and the closing formula with name are part of the text type; leaving them out costs in Textstruktur.
- **no-reference**: The readers know which article is meant → the text referred to is named with title, author, medium and date.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "letter-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["features"],
  "misconception": "no-reference",
  "question": "Which opening fits a Leserbrief best?",
  "options": [
    { "text": "„In seinem Kommentar ‚Weg mit den Handys!‘ (Tagesblick, 3. März 2026) fordert Martin Weber ein Handyverbot an allen Schulen. Als Schülerin sehe ich das differenzierter.“", "correct": true, "feedback": "Yes: reference, position of the text, own role." },
    { "text": "„Liebe Leute, ich will euch heute mal was über Handys erzählen.“", "correct": false, "feedback": "No reference, colloquial address." },
    { "text": "„Handys sind ein großes Thema unserer Zeit.“", "correct": false, "feedback": "An empty opening without reference to the text." }
  ],
  "explanation": "A Leserbrief names the text it answers, its position and the writer's role."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "engage-argument",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["engage"],
  "misconception": "topic-not-text",
  "question": "The article argues that a phone ban at school protects students from bullying chats. Which two sentences engage with this argument?",
  "options": [
    { "text": "„Beleidigende Nachrichten verschwinden nicht, weil das Handy sechs Stunden in einem Kasten liegt; sie werden dann eben am Nachmittag verschickt.“", "correct": true, "feedback": "Yes: limits the argument with a reason." },
    { "text": "„Weber hat recht, dass Gruppenchats verletzen können, doch gegen Mobbing helfen Ansprechpersonen mehr als ein Verbot.“", "correct": true, "feedback": "Yes: concedes and weighs." },
    { "text": "„Handys sind praktisch, weil man damit Fotos machen kann.“", "correct": false, "feedback": "On the topic, but not on this argument." },
    { "text": "„Ich habe selbst drei Handys gehabt.“", "correct": false, "feedback": "Personal, but not related to the argument." }
  ],
  "explanation": "Engaging means answering the specific argument: agree, limit or refute, with a reason."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "letter-structure",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["features"],
  "misconception": "letter-format",
  "instruction": "Order the parts of a Leserbrief.",
  "items": [
    "Opening formula: „Sehr geehrte Redaktion,“",
    "Introduction: occasion, title, author, medium and date of the text, its position and own role",
    "Main part: answers to two arguments of the text",
    "Conclusion: own proposal or demand",
    "Closing formula: name, and place or age if relevant"
  ],
  "explanation": "Opening formula, introduction with reference, main part, conclusion, closing formula."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "letter-agree",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["engage", "features"],
  "misconception": "must-disagree",
  "question": "You agree completely with the article you answer. What should your Leserbrief do?",
  "options": [
    { "text": "Support the position with own experience or further arguments the article does not mention, and draw a conclusion or demand.", "correct": true, "feedback": "Yes: agreement is fine when it adds something." },
    { "text": "Contradict anyway, because a Leserbrief must criticise.", "correct": false, "feedback": "A Leserbrief may agree; it must be justified." },
    { "text": "Repeat the article's arguments in other words.", "correct": false, "feedback": "Repetition adds nothing for the readers." }
  ],
  "explanation": "Agreement, limitation or contradiction are all possible; a Leserbrief adds a reader's justified view."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "letter-reference",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["engage"],
  "misconception": "no-reference",
  "question": "Schreib die ersten zwei Sätze eines Leserbriefs zu diesem Kommentar: Martin Weber, „Weg mit den Handys!“, Tagesblick, 3. März 2026. Weber fordert, Handys an allen Schulen vom Unterrichtsbeginn bis zum Unterrichtsende wegzusperren, auch in den Pausen, weil sie die Konzentration störten und Mobbing förderten. Nenne den Text, gib seine Position wieder und sag, aus welcher Rolle du schreibst.",
  "rubric": [
    "Names title, author, medium and date",
    "Reproduces the demand (ban including breaks) and at least one reason, in reported speech",
    "States the own role and hints at the own position",
    "Personal, not colloquial"
  ],
  "sample_answer": "Martin Weber fordert in seinem Kommentar „Weg mit den Handys!“ (Tagesblick, 3. März 2026), Handys an allen Schulen bis zum Unterrichtsende wegzusperren, auch in den Pausen, weil sie die Konzentration störten und Mobbing förderten. Als Schülerin, an deren Schule die Handys im Unterricht schon jetzt in einer Box liegen, halte ich die erste Hälfte dieser Forderung für richtig, die zweite aber nicht.",
  "explanation": "Reference, position of the text and own role: the reader knows what is answered and by whom."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "letter-task",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["write", "engage", "features"],
  "misconception": "topic-not-text",
  "question": "Schreibauftrag\nThema: Digitale Schule\nVerfassen Sie einen Leserbrief an die Zeitung Tagesblick (270–330 Wörter). Lesen Sie den Kommentar „Weg mit den Handys!“ (Textbeilage, für diesen Kurs verfasst).\nAufgabenstellung:\n• Geben Sie die Position, die der Autor in seinem Kommentar vertritt, kurz wieder.\n• Setzen Sie sich mit zwei Argumenten des Autors auseinander.\n• Machen Sie einen eigenen Vorschlag, wie Schulen mit privaten Handys umgehen sollten.\n\nTextbeilage: Martin Weber, „Weg mit den Handys!“, Kommentar, Tagesblick, 3. März 2026\n\nIn vielen Schulen herrscht in der Pause eine seltsame Stille. Statt zu reden, zu streiten oder Fußball zu spielen, starren Jugendliche auf ihre Bildschirme. Es ist Zeit, diesen Zustand zu beenden: Handys sollten an allen Schulen ab der ersten Stunde bis zum Unterrichtsende weggesperrt werden, auch in den Pausen.\n\nDie Gründe liegen auf der Hand. Wer ständig Nachrichten bekommt, kann sich nicht konzentrieren. Jede Benachrichtigung reißt aus dem Gedanken, und es dauert, bis man wieder bei der Sache ist. Lehrerinnen und Lehrer berichten seit Jahren, dass die Aufmerksamkeit ihrer Klassen nachlässt.\n\nDazu kommt das soziale Klima. Beleidigende Nachrichten, heimlich gefilmte Videos und Gruppenchats, aus denen einzelne ausgeschlossen werden, machen vielen Jugendlichen das Leben schwer. Ohne Handy in der Schule hätten sie wenigstens sechs Stunden am Tag Ruhe davor.\n\nKritikerinnen und Kritiker wenden ein, Jugendliche müssten den verantwortungsvollen Umgang mit digitalen Medien lernen. Das stimmt, aber man lernt Schwimmen auch nicht, indem man ins tiefe Becken geworfen wird. Medienkompetenz kann man im Unterricht mit Schulgeräten üben, dafür braucht es nicht das private Handy in jeder Pause.\n\nEinige Schulen haben das Verbot bereits eingeführt. Die Erfahrungen sind gut: In den Pausen wird wieder geredet und gespielt, und Konflikte im Netz sind seltener geworden. Die Politik sollte nicht länger zögern und ein Verbot für alle Schulen beschließen. Unsere Kinder werden es uns danken.",
  "rubric": [
    "Inhalt, writing acts: a Leserbrief that answers the commentary (reporting, arguing, evaluating), not a Kommentar on the topic",
    "Inhalt, bullet 1: refers to the commentary and reproduces its demand (ban including breaks) briefly and correctly",
    "Inhalt, bullet 2: takes up two specific arguments of the text (concentration, social climate/bullying, the swimming comparison, good experiences) and agrees, limits or refutes each with a reason",
    "Inhalt, bullet 3: a concrete own proposal for dealing with private phones",
    "Inhalt, quality: own thought beyond the text (experience from the own school, a counter-example), no invented facts",
    "Textstruktur: opening formula (address), introduction with occasion, title, author, medium, date and own role, one paragraph per argument, conclusion tied to the occasion, closing formula with name and place; the author's views marked as reported speech",
    "Stil und Ausdruck: personal and pointed, possibly polemical but not insulting, not colloquial; addressed to the paper and its readers; own formulations",
    "Sprachnormen: spelling (das/dass), punctuation (commas before subordinate clauses), grammar (Konjunktiv)",
    "Length 270–330 words; much longer loses the compression a Leserbrief needs"
  ],
  "sample_answer": "Betrifft: „Weg mit den Handys!“ von Martin Weber, Tagesblick, 3. März 2026\n\nHandyfreie Stunden ja, handyfreie Schule nein\n\nSehr geehrte Redaktion,\n\nals Schüler einer achten Klasse habe ich Martin Webers Kommentar mit Interesse gelesen. Weber fordert, Handys an allen Schulen bis zum Unterrichtsende wegzusperren, auch in den Pausen, weil sie die Konzentration störten und Mobbing förderten.\n\nBeim ersten Argument stimme ich ihm zu. Wer im Unterricht auf jede Nachricht reagiert, verliert den Faden, und Konzentration ist die Voraussetzung für jedes Lernen. An meiner Schule liegen die Handys deshalb während der Stunden in einer Box, und niemand vermisst sie. Für den Unterricht braucht es also kein neues Gesetz, sondern klare Regeln, die viele Schulen längst haben.\n\nBeim zweiten Argument macht es sich Weber jedoch zu leicht. Beleidigende Nachrichten verschwinden nicht, weil das Handy sechs Stunden in einem Kasten liegt. Sie werden dann eben am Nachmittag verschickt, und die Schule bekommt davon noch weniger mit. Gegen Mobbing im Netz helfen Ansprechpersonen, Workshops und Lehrkräfte, die eingreifen, nicht ein Verbot, das das Problem nur in den Nachmittag verschiebt.\n\nAuch sein Vergleich mit dem Schwimmen überzeugt mich nicht. Gerade wer schwimmen lernt, braucht irgendwann echtes Wasser. Den Umgang mit dem eigenen Handy lernt man nicht mit einem Schulgerät, sondern im Alltag, und die Pause ist ein Teil davon.\n\nIch schlage deshalb einen Mittelweg vor: Handys bleiben im Unterricht weggesperrt, in den Pausen aber gelten Regeln, die Schülervertretung und Lehrkräfte gemeinsam festlegen, etwa handyfreie Zonen im Hof und ein Filmverbot im ganzen Haus. Regeln, die wir selbst mitbestimmen, halten wir eher ein als ein Verbot von oben.\n\nDie Politik sollte den Schulen also kein Verbot vorschreiben, sondern ihnen Zeit und Fachleute geben, damit sie gemeinsam mit uns gute Regeln finden. Dann wird es in den Pausen vielleicht wieder lauter, ganz ohne Kasten.\n\nJonas Berger, Linz",
  "explanation": "The sample names the text, reproduces its demand, answers two (here three) of its arguments with reasons and ends with a concrete proposal."
}
```

# Tutor notes

- The learner may take any position on the article; judge how well they engage with its arguments.
- If the learner only writes about the topic, ask: "Which sentence of the article does this answer?"
- The Textbeilage and its newspaper are invented for this course; tell the learner if they ask.

## Blueprint for new tasks

Rules for all tasks: exam-format element, "Making new writing tasks".

- **Word range:** 270–330 (the only range the catalogue allows for a Leserbrief).
- **Situation (required):** a named newspaper, magazine or online medium that published the text; the learner writes as a reader with a role (student, young person, resident).
- **Textbeilage:** one opinionated text the letter answers: commentary, column, interview or report with a clear demand, about 250–600 words; a current article is ideal.
- **Operators:** bullet 1 „Geben Sie die Position … kurz wieder“ / „Fassen Sie … kurz zusammen“; bullet 2 „Setzen Sie sich mit … auseinander“ / „Nehmen Sie Stellung zu …“ / „Bewerten Sie …“; bullet 3 „Machen Sie Vorschläge …“ / „Appellieren Sie an …“ / „Formulieren Sie eine Forderung …“.
- **Rubric template:** follow the rubric of the task above. Inhalt: writing acts of a Leserbrief; one line per bullet; Textbeilage grasped and reproduced correctly; own thought beyond it. Textstruktur: opening formula, introduction with reference and role, paragraphs per argument, conclusion tied to the occasion, closing formula. Stil: personal, compressed, possibly polemical but not insulting, own formulations. Sprachnormen. Range (too long hurts here).

# Sources

Grounding: [^srdp-textsorten]. Text, Textbeilage, examples and questions are original.

[^srdp-textsorten]: Bundesministerium für Bildung, Wissenschaft und Forschung, Textsortenkatalog zur SRDP in der Unterrichtssprache (Stand 2020), Leserbrief, matura.gv.at.
