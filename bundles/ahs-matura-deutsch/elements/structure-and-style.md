---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/structure-and-style
title: Structure and style
description: How to build a Matura text from introduction, paragraphs and conclusion, link sentences and paragraphs, and choose a register, words and sentences that fit the text type and the readers (dimensions Textstruktur and Stil und Ausdruck).
lang: en
levels: [highschool]
objectives:
  - id: frame
    text: Write an introduction that leads to the question and a conclusion that rounds the text off, without empty phrases.
  - id: paragraphs
    text: Divide a text into paragraphs with one function each and link them with connectors and references (Kohärenz, Kohäsion).
  - id: register
    text: Choose a register that fits text type and readers (factual, personal, appealing) and keep it.
  - id: expression
    text: Improve sentences by precise verbs and nouns, varied sentence structure and fewer fillers and repetitions.
requires:
  - ptf:el/ahs-matura-deutsch/argumentation
tags: [german, matura, writing, structure, style, cohesion]
duration_min: { highschool: 60 }
sources:
  - id: srdp-deutsch-raster
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Beurteilungsraster and Textsortenkatalog zur SRDP in der Unterrichtssprache"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: here are two first sentences of a Kommentar on a smartphone ban. (a) „In diesem Text geht es um das Thema Handyverbot, das ein sehr wichtiges Thema ist.“ (b) „Seit September liegen die Handys der 1B in einem Holzkästchen neben der Tafel, und niemand vermisst sie.“ Which one makes you read on, and why?
- Two of the four dimensions of the grid, Textstruktur and Stil und Ausdruck, are about how a text is built and written, not about what it says.
- Afterwards the learner can frame a text, build and link paragraphs and write in a register that fits.

# Core

A Matura text has a recognisable build: an introduction that leads into
the question (with a concrete case, a figure, a question or a statement,
not with "In diesem Text geht es um"), a main part in paragraphs that each
do one job, and a conclusion that rounds off (summary of the position, a
demand, an outlook). Paragraphs and sentences are linked by connectors
(„deshalb“, „hingegen“, „außerdem“) and references („diese Entwicklung“),
so the reader can follow the line of thought. The register follows the
text type and readers, and precise verbs, varied sentences and the absence
of fillers make a text clear.

# Key facts

- Introductions that work: a concrete case or scene, a striking figure, a question to the reader, a quotation, a current occasion. Avoid: „In diesem Text geht es um …“, „Heutzutage …“ without content, „Seit Anbeginn der Menschheit …“.
- Conclusions that work: the position in one sentence, a demand or appeal, an outlook, a return to the opening case (frame). Avoid: new arguments, „Das wars“, a mere repetition of the introduction.
- One paragraph = one function (one argument, one aspect of an analysis); a blank line or indent marks it; the first sentence (topic sentence) says what it is about.
- Connectors by relation: addition („außerdem“, „zudem“, „darüber hinaus“), contrast („hingegen“, „jedoch“, „dennoch“), cause („denn“, „da“, „weil“), consequence („deshalb“, „folglich“, „daher“), concession („zwar … aber“, „obwohl“), example („etwa“, „zum Beispiel“), order („zunächst“, „schließlich“).
- Register: factual and impersonal in Zusammenfassung and Textanalyse; personal and pointed in Kommentar and Leserbrief; addressing and appealing in the Meinungsrede. „Ich“ is fine where an opinion is asked, never in a Zusammenfassung.
- Expression: a precise verb instead of „machen“, „tun“, „geben“ („Die Autorin kritisiert …“ instead of „Die Autorin macht Kritik …“); vary sentence openings; cut fillers („eigentlich“, „halt“, „irgendwie“); avoid colloquial words („voll“, „mega“).
- Verbs for writing about texts: „behauptet“, „fordert“, „kritisiert“, „veranschaulicht“, „belegt“, „räumt ein“, „widerspricht“, „schlussfolgert“.

# Level: highschool

<!-- ptf:text v1 -->

Sentence (b) from the introduction puts you into a classroom: the phones in
a wooden box, and nobody misses them. That is a concrete case, and it leads
straight into the question whether a ban works. Sentence (a) only announces
a topic and calls it important, which says nothing. Start with something
concrete.

Then build the main part in paragraphs. Each paragraph does one job, for
example one argument, and its first sentence says which. Between
paragraphs, show the relation: „Außerdem …“ for one more argument,
„Dagegen spricht …“ for the other side, „Deshalb …“ for a consequence.

End by rounding off: state your position in one sentence, make a demand, or
return to the opening case: „Vielleicht bleibt das Holzkästchen also auch
im nächsten Jahr neben der Tafel.“ No new arguments in the conclusion.

Fit the register to the text: neutral and without „ich“ in a summary,
personal and pointed in a comment, addressing the audience in a speech.
And choose precise words: „Die Autorin kritisiert“ says more than „Die
Autorin sagt“.

# Misconceptions

- **announce-topic**: An introduction announces the topic („In diesem Text geht es um …“) → it leads into the question with something concrete and makes the reader want to go on.
- **conclusion-new-argument**: The strongest argument fits best into the conclusion → the conclusion rounds off; arguments belong in the main part.
- **long-is-elaborate**: Long sentences and rare words make a text sound better → clarity counts; precise words and varied but clear sentences are rewarded.
- **one-register**: Every Matura text is written in the same formal style → the register depends on text type and readers.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "intro-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["frame"],
  "misconception": "announce-topic",
  "question": "Which is the best first sentence for a Leserbrief on a planned car-free town centre?",
  "options": [
    { "text": "„Am Samstagvormittag habe ich für zweihundert Meter Hauptplatz zwanzig Minuten im Auto gebraucht.“", "correct": true, "feedback": "Yes: a concrete case that leads to the question." },
    { "text": "„In diesem Leserbrief geht es um das Thema autofreie Innenstadt.“", "correct": false, "feedback": "Announces only; says nothing." },
    { "text": "„Seit es Menschen gibt, haben sie sich fortbewegt.“", "correct": false, "feedback": "Far too general, no link to the question." },
    { "text": "„Autos sind ein wichtiges Thema heutzutage.“", "correct": false, "feedback": "Empty: no case, no position." }
  ],
  "explanation": "A good introduction is concrete and leads to the question."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "good-conclusion",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["frame"],
  "misconception": "conclusion-new-argument",
  "question": "Which two sentences are good conclusions for a Kommentar arguing for more drinking fountains?",
  "options": [
    { "text": "„Ein Trinkbrunnen kostet weniger als ein Parkplatz, und er nützt allen. Die Stadt sollte also nicht länger warten.“", "correct": true, "feedback": "Yes: position in short and a demand." },
    { "text": "„Wer im nächsten Sommer am Hauptplatz Durst hat, sollte nicht zum Kiosk müssen, sondern zum Brunnen.“", "correct": true, "feedback": "Yes: rounds off with an outlook." },
    { "text": "„Außerdem gibt es ein weiteres Argument: Brunnen kühlen die Luft.“", "correct": false, "feedback": "A new argument belongs in the main part." },
    { "text": "„Das wars zum Thema Trinkbrunnen.“", "correct": false, "feedback": "Colloquial and empty." }
  ],
  "explanation": "A conclusion rounds off: position, demand or outlook, no new arguments."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "link-sentences",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["paragraphs"],
  "text": "Das Gratisticket hat viele neue Fahrgäste gebracht. {{1}} sind die Busse am Morgen überfüllt. {{2}} fordern Eltern zusätzliche Verbindungen. Die Gemeinde verweist {{3}} auf leere Kassen.",
  "gaps": [
    { "answer": "Deshalb", "accepted": ["Daher", "Folglich", "Darum"] },
    { "answer": "Zudem", "accepted": ["Außerdem", "Darüber hinaus", "Deswegen", "Deshalb", "Daher"] },
    { "answer": "jedoch", "accepted": ["hingegen", "allerdings", "aber"] }
  ],
  "explanation": "Consequence (deshalb), addition or consequence (zudem / deshalb), contrast (jedoch)."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "paragraph-order",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["paragraphs", "frame"],
  "instruction": "Order the paragraph openings of a Kommentar on a four-day school week.",
  "items": [
    "Montag, 7.45 Uhr: Die halbe Klasse gähnt, die andere Hälfte fehlt.",
    "Für eine Vier-Tage-Woche spricht vor allem, dass ein freier Tag Zeit für Erholung schafft.",
    "Zudem könnten Schulen den fünften Tag für Projekte und Förderkurse öffnen.",
    "Dagegen wenden Eltern ein, dass sie an diesem Tag Betreuung brauchen.",
    "Ein Versuch an einigen Schulen wäre deshalb der richtige nächste Schritt."
  ],
  "explanation": "Concrete opening, first argument, further argument (zudem), counter-argument (dagegen), conclusion (deshalb)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "register-fit",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["register"],
  "misconception": "one-register",
  "question": "Which sentence fits a Zusammenfassung?",
  "options": [
    { "text": "„Die Autorin fordert, Schulhöfe am Nachmittag für alle Kinder des Viertels zu öffnen.“", "correct": true, "feedback": "Yes: neutral, present tense, no own opinion." },
    { "text": "„Ich finde die Idee der Autorin, Schulhöfe zu öffnen, super.“", "correct": false, "feedback": "A Zusammenfassung contains no own opinion." },
    { "text": "„Liebe Leute, öffnet endlich die Schulhöfe!“", "correct": false, "feedback": "Appeal and address belong in a speech or letter." }
  ],
  "explanation": "Zusammenfassung: factual, impersonal, present tense; opinion and appeals belong in other text types."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "better-expression",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["expression"],
  "misconception": "long-is-elaborate",
  "question": "Which version of the sentence is best expressed?",
  "options": [
    { "text": "„Der Autor kritisiert, dass die Stadt die Radwege vernachlässigt.“", "correct": true, "feedback": "Yes: precise verb, clear sentence." },
    { "text": "„Der Autor macht Kritik daran, dass die Stadt bei den Radwegen eigentlich irgendwie nichts tut.“", "correct": false, "feedback": "\"Kritik machen\", fillers (\"eigentlich\", \"irgendwie\"), vague \"nichts tut\"." },
    { "text": "„Seitens des Autors erfolgt eine Kritisierung hinsichtlich der seitens der Stadt erfolgenden Vernachlässigung der Radwege.“", "correct": false, "feedback": "Nominal style: long, but less clear." }
  ],
  "explanation": "Precise verbs and clear sentences; neither colloquial fillers nor bloated nominal style."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "revise-paragraph",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["expression", "paragraphs", "register"],
  "question": "Überarbeite diesen Absatz aus einem Kommentar für eine Tageszeitung: präzise Verben, keine Füllwörter, verknüpfte Sätze, passender Ton. Der Inhalt bleibt gleich.\n\n„Also das Problem ist halt, dass es in unserer Stadt voll wenig Radwege gibt. Es gibt viele Autos. Es gibt wenig Platz. Die Stadt macht da irgendwie nichts. Das ist schlecht. Man sollte da mal was tun.“",
  "rubric": [
    "Content unchanged: few cycle lanes, many cars, little space, the city does not act, demand to act",
    "Fillers and colloquial words removed (\"also\", \"halt\", \"voll\", \"irgendwie\", \"mal was\")",
    "Precise verbs and nouns instead of \"es gibt\", \"macht nichts\", \"was tun\"",
    "Sentences linked with connectors (weil, deshalb, obwohl …) instead of a row of main clauses",
    "Register of a newspaper commentary: personal opinion allowed, but not colloquial; a concrete demand at the end"
  ],
  "sample_answer": "Unsere Stadt hat zu wenige Radwege. Weil sich immer mehr Autos die schmalen Straßen teilen müssen, bleibt für Radfahrerinnen und Radfahrer kaum Platz. Obwohl das Problem seit Jahren bekannt ist, hat der Gemeinderat keinen einzigen neuen Radweg beschlossen. Er sollte deshalb noch in diesem Jahr ein Radwegenetz planen, das die Schulen mit dem Bahnhof verbindet.",
  "explanation": "Linked sentences and precise words make the same content clearer and more convincing."
}
```

# Tutor notes

- Work on the learner's own drafts where possible: one introduction, one paragraph, one conclusion at a time.
- Point out repeated sentence openings and fillers by type and let the learner rewrite; do not rewrite for them.
- Praise concrete openings and clear topic sentences explicitly; they are easy to copy into every text.

# Sources

Grounding: [^srdp-deutsch-raster]. Text, examples and questions are original.

[^srdp-deutsch-raster]: Bundesministerium für Bildung, Wissenschaft und Forschung, Beurteilungsraster and Textsortenkatalog zur SRDP in der Unterrichtssprache, matura.gv.at.
