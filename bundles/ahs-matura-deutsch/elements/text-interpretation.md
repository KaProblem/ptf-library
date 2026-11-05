---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/text-interpretation
title: Text interpretation (Textinterpretation)
description: The Textinterpretation of the German Matura, which analyses the form of a literary text (narrator, time, space, figures, language, symbols) and interprets its meaning with evidence, practised on Franz Kafka's parable "Gibs auf!", with rubric and sample interpretation.
lang: en
levels: [highschool]
objectives:
  - id: tools
    text: Use the tools for describing literary texts (narrator and perspective, time, space, figures, sentence structure, imagery and symbols; for poems also rhyme, metre and lyrical I).
  - id: hypothesis
    text: Form an interpretation hypothesis and support it with analysed passages, keeping it open where the text allows several readings.
  - id: write
    text: Write a complete Textinterpretation within a given word range with introduction, brief content, analysis, interpretation and conclusion.
requires:
  - ptf:el/ahs-matura-deutsch/text-analysis
tags: [german, matura, text-type, literature, interpretation, textinterpretation, kafka]
duration_min: { highschool: 120 }
sources:
  - id: srdp-textsorten
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Textsortenkatalog zur SRDP in der Unterrichtssprache, Textinterpretation"
  - id: kafka-gibs-auf
    resource: https://de.wikisource.org/wiki/Franz_Kafka
    title: "Franz Kafka, „Gibs auf!“ (written around 1922, first published 1936), public domain"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: someone in a strange city is late for a train and asks a policeman the way. The policeman laughs and says „Gibs auf, gibs auf“. What could this be about, beyond a lost tourist?
- A Textinterpretation asks what a literary text means and shows how its form produces that meaning. It is the one text type in the exam that works with literature.
- Afterwards the learner can analyse and interpret a short prose text and knows the tools for poems and drama scenes.

# Core

A Textinterpretation analyses the form of a literary text and interprets
its meaning. It names the text (author, title, genre, time), states an
interpretation hypothesis, summarises the content briefly, and then
analyses how narrator, time, space, figures, language and imagery work,
always with quotations and references. From the analysis it develops an
interpretation: what the text says about people, society or existence,
which may include several readings where the text is open. The conclusion
sums up the result and may connect it to the author, the period or the
present. Interpretation is backed by the text, not by guessing.

# Key facts

- Introduction: author, title, genre (parable, short story, poem, drama scene), time of writing, topic; an interpretation hypothesis in one sentence.
- Prose tools: narrator (first-person, third-person; inside or outside view), time (narrated time vs time of narration, tempo, sudden change), space (city, road, open/closed), figures (relation, power, dialogue), sentence structure (parataxis, hypotaxis, long sentences that reflect breathlessness), symbols (clock, way, station).
- Poem tools: lyrical I, stanza and line, rhyme scheme, metre, enjambment, images and metaphors, sound.
- Drama tools: dialogue and monologue, stage directions, conflict, the scene's place in the plot.
- Evidence: quotation with line or paragraph, then interpretation: „Das Ich ‚fragte ihn atemlos nach dem Weg‘, was …“.
- Openness: a parable or modern poem often allows several readings (existential, religious, social); name them and say which the text supports best.
- Context (author, period) is used only to support a reading, not instead of analysis.
- "Gibs auf!": written around 1922 by Franz Kafka (1883–1924), published after his death; a very short first-person parable; it ends without resolution. Quotations keep the original spelling (daß, mußte).
- Usual length in the exam: 540–660 words.

# Level: highschool

<!-- ptf:text v1 -->

On the surface, „Gibs auf!“ is about a man who is late and lost. But
nobody in the text has a name, the city has no name, the station is never
reached, and the policeman, whose job is to help, laughs and turns away.
When a text leaves out what a realistic story would tell, it invites you
to read it as a parable: about being lost in a world one does not
understand.

A Textinterpretation turns such an idea into a hypothesis and tests it on
the text. Look at the form: the first-person narrator only knows what he
sees; the time jumps from „sehr früh“ to „schon viel später“; one long
sentence of clauses joined by commas mirrors the rising panic. Each
observation gets a quotation and a meaning.

Then interpret: what does the policeman's answer mean? Maybe that the way
cannot be found by asking others; maybe that authority refuses help; maybe
that there is no way at all. A good interpretation names such readings and
says which the text supports best.

End with the result and, if it helps, a link to Kafka's other texts or to
today.

# Misconceptions

- **one-true-meaning**: A literary text has exactly one correct meaning that you must find → open texts allow several readings; what counts is how well each is supported by the text.
- **retell-plot**: Retelling the plot in detail is interpreting → the content is brief; the work is analysing form and explaining meaning.
- **biography-instead**: Knowing the author's life explains the text → context can support a reading, but the analysis of the text comes first.
- **form-without-meaning**: Naming devices and features is enough → each observation of form is connected to what it means.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "interpretation-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["hypothesis"],
  "misconception": "one-true-meaning",
  "question": "Which sentence is a good interpretation hypothesis for Kafka's „Gibs auf!“?",
  "options": [
    { "text": "„Kafkas Parabel zeigt einen Menschen, der in einer fremd gewordenen Welt die Orientierung verliert und bei der Instanz, die ihm helfen sollte, keine Hilfe findet.“", "correct": true, "feedback": "Yes: a claim about meaning that can be tested on the text." },
    { "text": "„In dem Text geht es um einen Mann, der zum Bahnhof geht.“", "correct": false, "feedback": "Only the surface plot, no meaning." },
    { "text": "„Kafka hatte selbst oft Angst, deshalb ist der Text traurig.“", "correct": false, "feedback": "Biography instead of a claim about the text." }
  ],
  "explanation": "A hypothesis states a meaning that the analysis can support."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "narrative-tools",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tools"],
  "misconception": "form-without-meaning",
  "question": "The second sentence of „Gibs auf!“ is a single long sentence of clauses joined by commas (from the clock to the policeman). Which two interpretations of this form are plausible?",
  "options": [
    { "text": "The rushed, breathless syntax mirrors the narrator's growing panic.", "correct": true, "feedback": "Yes: form reflects state of mind." },
    { "text": "Without full stops there is no pause; events and fears tumble into each other.", "correct": true, "feedback": "Yes: the parataxis creates pressure." },
    { "text": "Kafka did not know German punctuation rules.", "correct": false, "feedback": "The form is deliberate." },
    { "text": "The long sentence shows that the narrator is calm and thoughtful.", "correct": false, "feedback": "The content (Schrecken, unsicher, atemlos) contradicts it." }
  ],
  "explanation": "Observation of form (one long sentence) → meaning (panic, pressure)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "time-break",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tools", "hypothesis"],
  "question": "„Als ich eine Turmuhr mit meiner Uhr verglich, sah ich, daß es schon viel später war, als ich geglaubt hatte“. What does the comparison of the two clocks suggest?",
  "options": [
    { "text": "The narrator's own time no longer agrees with the time of the world around him; his orientation breaks.", "correct": true, "feedback": "Yes: the turning point of the text." },
    { "text": "The tower clock is broken, so the narrator is not late.", "correct": false, "feedback": "The narrator believes the tower clock, and the text never says it is wrong." },
    { "text": "It only explains why he goes to the station.", "correct": false, "feedback": "He was already going there; the clocks change his state." }
  ],
  "explanation": "Two clocks that disagree: private and public order diverge; certainty turns into fear."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "interpretation-structure",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["write"],
  "misconception": "retell-plot",
  "instruction": "Order the parts of a Textinterpretation.",
  "items": [
    "Introduction: author, title, genre, time, topic and interpretation hypothesis",
    "Brief content",
    "Analysis of form (narrator, time, space, figures, language) with quotations",
    "Interpretation: meaning of key passages and the ending, possibly several readings",
    "Conclusion: result, possibly context or link to the present"
  ],
  "explanation": "Hypothesis first, then content, analysis, interpretation and result."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "poem-tools",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["tools"],
  "question": "A poem's sentence runs on from one line into the next without a pause. What is this called?",
  "options": [
    { "text": "Enjambement", "correct": true, "feedback": "Yes: Zeilensprung." },
    { "text": "Anapher", "correct": false, "feedback": "A repeated beginning." },
    { "text": "Kreuzreim", "correct": false, "feedback": "A rhyme scheme (abab)." },
    { "text": "Metapher", "correct": false, "feedback": "A figurative expression." }
  ],
  "explanation": "Enjambement (Zeilensprung) carries a sentence across the line break; it can create tension or emphasis."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "interpretation-task",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["write", "hypothesis", "tools"],
  "misconception": "form-without-meaning",
  "question": "Schreibauftrag\nThema: Orientierung\nVerfassen Sie eine Textinterpretation (540–660 Wörter). Lesen Sie Franz Kafkas Text „Gibs auf!“ (Textbeilage; entstanden um 1922, nach Kafkas Tod veröffentlicht; Rechtschreibung des Originals).\nAufgabenstellung:\n• Fassen Sie den Inhalt des Textes kurz zusammen.\n• Analysieren Sie, wie die zunehmende Verunsicherung des Ich-Erzählers dargestellt wird.\n• Deuten Sie die Antwort des Schutzmanns und das Ende des Textes.\n\nTextbeilage: Franz Kafka, „Gibs auf!“\n\nEs war sehr früh am Morgen, die Straßen rein und leer, ich ging zum Bahnhof. Als ich eine Turmuhr mit meiner Uhr verglich, sah ich, daß es schon viel später war, als ich geglaubt hatte, ich mußte mich sehr beeilen, der Schrecken über diese Entdeckung ließ mich im Weg unsicher werden, ich kannte mich in dieser Stadt noch nicht sehr gut aus, glücklicherweise war ein Schutzmann in der Nähe, ich lief zu ihm und fragte ihn atemlos nach dem Weg. Er lächelte und sagte: »Von mir willst du den Weg erfahren?« »Ja«, sagte ich, »da ich ihn selbst nicht finden kann.« »Gibs auf, gibs auf«, sagte er und wandte sich mit einem großen Schwunge ab, so wie Leute, die mit ihrem Lachen allein sein wollen.",
  "rubric": [
    "Inhalt, bullet 1: content brief and correct (early morning, way to the station, clocks show it is later, panic and uncertainty in an unfamiliar city, asks a policeman, who laughs, says give it up and turns away)",
    "Inhalt, bullet 2: the growing uncertainty analysed with quotations: order at the start („rein und leer“), break through the clocks, the long breathless sentence, „unsicher“, „atemlos“, the unfamiliar city, the reversal of the policeman's role, the short dialogue",
    "Inhalt, bullet 3: the answer and the ending interpreted, with at least two readings (e.g. existential: no way can be shown from outside; criticism of authority: the institution refuses help and mocks; religious or metaphysical: no guidance from above) and a justified preference",
    "Inhalt: interpretation hypothesis in the introduction; observations connected to meaning; no biography instead of analysis",
    "Textstruktur: introduction with author, title, genre, time, hypothesis; brief content; analysis; interpretation; conclusion",
    "Stil und Ausdruck: factual, present tense, precise terms (Ich-Erzähler, Parabel, Parataxe), quotations integrated",
    "Sprachrichtigkeit: quotations exact (including the original spelling), commas, Konjunktiv",
    "Length 540–660 words"
  ],
  "sample_answer": "Franz Kafkas kurzer Prosatext „Gibs auf!“, entstanden um 1922 und erst nach dem Tod des Autors veröffentlicht, erzählt von einem Mann, der sich auf dem Weg zum Bahnhof verirrt. Der Text lässt sich als Parabel lesen: Er zeigt einen Menschen, der in einer fremd gewordenen Welt die Orientierung verliert und dort, wo er Hilfe erwartet, Spott und Abweisung erfährt.\n\nDer Ich-Erzähler geht früh am Morgen durch leere Straßen zum Bahnhof. Als er seine Uhr mit einer Turmuhr vergleicht, merkt er, dass es viel später ist, als er dachte. Erschrocken und in der fremden Stadt unsicher, fragt er einen Schutzmann nach dem Weg. Dieser lächelt, fragt zurück, ob er den Weg wirklich von ihm erfahren wolle, rät ihm „Gibs auf, gibs auf“ und wendet sich lachend ab.\n\nZu Beginn herrscht Ordnung. Die Straßen sind „rein und leer“, der Satz ist ruhig, das Ziel klar: „ich ging zum Bahnhof“. Diese Sicherheit bricht mit dem Blick auf die Turmuhr. Die eigene Uhr und die öffentliche Zeit stimmen nicht mehr überein, und der Erzähler vertraut nicht sich, sondern der Turmuhr. Von diesem Moment an verändert sich die Sprache. Der zweite Satz ist eine einzige Kette von Hauptsätzen, die nur durch Kommas getrennt sind, vom „Schrecken über diese Entdeckung“ bis zum „atemlos“ gestellten Fragen. Die Parataxe ohne Punkt bildet die Hast und die wachsende Panik ab: Ein Gedanke stolpert über den nächsten. Begriffe wie „unsicher“ und „atemlos“ und der Hinweis, er kenne sich „in dieser Stadt noch nicht sehr gut aus“, verstärken den Eindruck der Fremdheit. Auffällig ist auch, was fehlt: Weder der Erzähler noch die Stadt noch der Schutzmann haben einen Namen, und den Bahnhof erreicht der Text nie. Diese Leerstellen lösen die Geschichte von einem konkreten Ort und machen sie allgemein. Auch die Ich-Perspektive verstärkt die Wirkung, denn die Leserinnen und Leser wissen nie mehr als der Erzähler und teilen seine Verwirrung.\n\nDer Schutzmann ist die einzige weitere Figur. Er verkörpert eine Ordnungsmacht, deren Aufgabe es wäre, Auskunft zu geben. Seine Gegenfrage „Von mir willst du den Weg erfahren?“ stellt diese Rolle jedoch in Frage, und das Duzen wirkt herablassend. Der Erzähler antwortet ehrlich, er könne den Weg „selbst nicht finden“. Statt einer Wegbeschreibung folgt der doppelte Rat „Gibs auf, gibs auf“, und der Schutzmann wendet sich „mit einem großen Schwunge ab, so wie Leute, die mit ihrem Lachen allein sein wollen“. Der Text endet hier, ohne Auflösung.\n\nDie Antwort lässt mehrere Deutungen zu. Existenziell gelesen sagt sie, dass es für den Einzelnen keinen Weg gibt, den ein anderer ihm zeigen könnte; wer seinen Weg nicht selbst findet, findet ihn auch durch Fragen nicht. Gesellschaftskritisch gelesen zeigt die Szene eine Autorität, die ihre Aufgabe verweigert und den Hilfesuchenden verspottet. Eine dritte, religiöse Lesart sieht im Schutzmann eine höhere Instanz, die keine Führung mehr bietet. Am stärksten stützt der Text die erste Deutung, weil alles auf die Orientierungslosigkeit des Ich zuläuft und der Schutzmann ihm nicht einmal widerspricht, sondern das Suchen selbst für sinnlos erklärt. Das Lachen am Ende macht diese Einsicht grausam, denn der Verlorene bleibt allein zurück.\n\nKafkas Parabel verdichtet in wenigen Sätzen die Erfahrung, in einer Welt zu leben, deren Ordnung man nicht mehr versteht. Ähnlich wie in Kafkas Romanen sucht hier eine Figur vergeblich nach einer Instanz, die ihr Orientierung gibt, und gerade die Institution, die helfen sollte, bleibt unzugänglich. Für heutige Leserinnen und Leser lässt sich die Parabel auf jede Situation übertragen, in der man sich zwischen Regeln, Ämtern oder Lebensentscheidungen verloren fühlt. Gerade weil sie offen endet, bleibt sie bis heute verstörend aktuell.",
  "explanation": "The sample states a hypothesis, summarises briefly, analyses order and its break, syntax, word choice, gaps and the figure of the policeman with quotations, offers three readings of the ending and argues for one."
}
```

# Tutor notes

- Let the learner read the text twice and write down their first idea before any analysis; then test it on the text together.
- Accept every reading that is supported by quotations; push back on readings that ignore parts of the text.
- For practice with poems and drama scenes, use public-domain texts (for example by Goethe, Heine, Trakl, Rilke or Schnitzler) or texts the learner brings from school.
- "Gibs auf!" is in the public domain (Kafka died in 1924); the quotations keep its original spelling.

## Blueprint for new tasks

Rules for all tasks: exam-format element, "Making new writing tasks".

- **Word range:** 540–660.
- **Situation:** usually none.
- **Textbeilage:** a literary text the learner has in front of them or that you download from a public-domain source below: a short prose text, a passage from a novel or story with a short introduction to the context, a poem (two poems for a comparison), or a drama scene. Never reproduce a literary text from memory; copy it from the source and name the source and edition.
- **Public-domain sources:** in Austria a text is free 70 years after the author's death (in 2026: authors who died before 1956; Brecht, who died in 1956, from 1 January 2027). Texts by living or recently deceased authors (Bachmann, Bernhard, Handke, Jelinek …) come only from the learner's school reader.
  - Wikisource (de.wikisource.org): checked transcriptions with the printed source; the raw text of a page via `https://de.wikisource.org/w/index.php?title=<Seite>&action=raw`.
  - Deutsches Textarchiv (deutschestextarchiv.de): first editions, CC BY-SA, plain text download per work.
  - Project Gutenberg (gutenberg.org): many German works as plain text (`https://www.gutenberg.org/ebooks/<id>.txt.utf-8`).
  - Zeno.org: large collection of German literature in reading editions.
- **Short texts that suit a practice interpretation** (look them up there; the Matura has no reading list, so any period can come): poems by Goethe („Prometheus“, „Erlkönig“), Heine („Die Lorelei“), Eichendorff („Mondnacht“), Rilke („Der Panther“), Trakl („Grodek“); prose by Hebel („Unverhofftes Wiedersehen“), Kleist (anecdotes), Kafka („Vor dem Gesetz“, „Kleine Fabel“, „Eine kaiserliche Botschaft“), Schnitzler (a passage from „Leutnant Gustl“), Zweig (a passage from „Schachnovelle“); drama scenes from Büchner („Woyzeck“) or Schiller („Kabale und Liebe“).
- **Operators:** bullet 1 „Fassen Sie … zusammen“ / „Beschreiben Sie die Situation …“; bullet 2 „Analysieren Sie …“ / „Untersuchen Sie …“ (Figur, Erzählweise, sprachliche Gestaltung, Aufbau des Gedichts); bullet 3 „Interpretieren Sie …“ / „Deuten Sie …“ (Ende, Titel, Verhalten einer Figur) or „Setzen Sie … in Beziehung zu …“.
- **Rubric template:** Inhalt: content brief; form analysed with quotations and connected to meaning; interpretation of the asked passage with readings supported by the text; hypothesis in the introduction; Textstruktur: introduction, content, analysis, interpretation, conclusion; Stil: factual, literary terms; Sprachrichtigkeit: exact quotations; range.

# Sources

Grounding: [^srdp-textsorten]; text: [^kafka-gibs-auf]. Explanations, examples, questions and the sample interpretation are original.

[^srdp-textsorten]: Bundesministerium für Bildung, Wissenschaft und Forschung, Textsortenkatalog zur SRDP in der Unterrichtssprache, Textinterpretation, matura.gv.at.
[^kafka-gibs-auf]: Franz Kafka, „Gibs auf!“, written around 1922, first published 1936 in „Beschreibung eines Kampfes“; public domain.
