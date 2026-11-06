---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/argumentation
title: Arguing
description: How to build a complete argument from claim, reason and evidence, answer a counter-argument, use a source text correctly and spot weak arguments, as needed in every argumentative text type of the German Matura.
lang: en
levels: [highschool]
objectives:
  - id: build
    text: Build a complete argument from claim (Behauptung), reason (Begründung) and evidence or example (Beleg, Beispiel), and close it with a conclusion.
  - id: counter
    text: Take up a counter-argument fairly and answer it (concede, weigh, refute).
  - id: source
    text: Use a source text in an argument by paraphrase or quotation with a clear reference, without copying it.
  - id: weak
    text: Recognise weak arguments (mere opinion, generalisation, appeal to the majority, attack on the person) and replace them.
requires:
  - ptf:el/ahs-matura-deutsch/assessment-grid
tags: [german, matura, argumentation, writing]
duration_min: { highschool: 60 }
sources:
  - id: srdp-deutsch
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: SRDP Unterrichtssprache (Deutsch), Textsortenkatalog"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: which sentence convinces you more? (a) „Ein Handyverbot an Schulen ist gut, weil das alle so sehen.“ (b) „Ein Handyverbot kann die Konzentration verbessern, denn jede Benachrichtigung unterbricht die Aufmerksamkeit; viele Lehrkräfte berichten, dass Schülerinnen und Schüler nach einer Unterbrechung Minuten brauchen, um wieder in eine Aufgabe zu finden.“ Why?
- Five of the seven text types (Erörterung, Kommentar, Leserbrief, Meinungsrede, and the Stellungnahme parts of the others) live on arguments. A complete argument is the unit of content that the grid rewards.
- Afterwards the learner builds complete arguments, deals with the other side and uses source texts correctly.

# Core

An argument supports a claim (Behauptung) with a reason (Begründung) and
makes the reason concrete with evidence or an example (Beleg, Beispiel);
a conclusion (Folgerung) connects it back to the question. A convincing
text also takes up the strongest counter-argument fairly and answers it,
by conceding part of it, weighing it or refuting it. Source texts serve as
evidence: their ideas are paraphrased in one's own words or quoted
exactly, always with a reference, never copied without saying so. Mere
opinion, sweeping generalisations, "everybody thinks so" and attacks on a
person are not arguments.

# Key facts

- The argument chain: Behauptung → Begründung → Beleg/Beispiel → Folgerung. Signal words: „weil“, „denn“, „da“ (reason); „zum Beispiel“, „etwa“, „wie … zeigt“ (example); „deshalb“, „daher“, „somit“ (conclusion).
- Kinds of evidence: facts and figures, expert statements, examples from experience, consequences, norms and values. In the exam, a Textbeilage is the usual source of evidence.
- Counter-argument patterns: „Zwar …, aber …“ (concede and limit); „Man könnte einwenden, dass … Doch …“ (anticipate and refute); „Das gilt jedoch nur, wenn …“ (restrict).
- Order: in a linear argument the strongest argument comes last (climax); a counter-argument is answered before one's own strongest argument.
- Source reference: „Wie die Autorin in ihrem Kommentar ‚Titel‘ schreibt, …“; quotations exactly and in quotation marks; reported statements in Konjunktiv I („Der Autor meint, Schulen seien …“).
- Weak arguments: bare opinion („Ich finde das einfach falsch.“), generalisation („Alle Jugendlichen sind handysüchtig.“), appeal to the majority („Das sehen alle so.“), attack on the person („Der Autor ist ja selbst zu alt, um das zu verstehen.“), false dilemma („Entweder Verbot oder Chaos.“).

# Level: highschool

<!-- ptf:text v1 -->

Compare the two sentences from the introduction. The first one gives a
claim and calls it a reason: "everybody thinks so" says nothing about
whether a ban is good. The second one has a claim (a ban can improve
concentration), a reason (every notification interrupts attention) and
evidence (teachers report minutes of lost focus). That is the chain the
grid rewards: Behauptung, Begründung, Beleg.

Build every argument in your texts this way and finish it with a short
conclusion that returns to the question: „Deshalb …“.

The other side is part of a good argument. Pick the strongest
counter-argument, state it fairly, and answer it: „Zwar kann ein Handy im
Unterricht für Recherchen nützlich sein, doch dafür reichen die Geräte der
Schule.“ This shows that you have thought the question through.

When a task gives you a Textbeilage, use it as evidence, not as a text to
copy. Say whose idea it is, put it in your own words (with Konjunktiv I:
„Die Autorin meint, ein Verbot sei …“), or quote a short phrase exactly.

# Misconceptions

- **opinion-is-argument**: Saying firmly what I think is an argument → an opinion becomes an argument only with a reason and evidence.
- **more-arguments-better**: Many short arguments convince more than a few developed ones → two or three complete argument chains with evidence beat a list of bare claims.
- **ignore-other-side**: Mentioning the other side weakens my position → answering the strongest counter-argument makes the position more convincing.
- **copy-as-evidence**: Copying sentences from the Textbeilage is using it as evidence → evidence is named, paraphrased or quoted with a reference, and then connected to one's own claim.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "argument-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["build"],
  "misconception": "opinion-is-argument",
  "question": "Which statement is a complete argument (claim, reason, evidence)?",
  "options": [
    { "text": "„Schuluniformen sollten eingeführt werden, weil sie den Druck durch Markenkleidung senken; an Schulen mit Uniform berichten Schülerinnen und Schüler seltener von Hänseleien wegen ihrer Kleidung.“", "correct": true, "feedback": "Yes: claim, reason (less pressure), evidence (reports)." },
    { "text": "„Schuluniformen sollten unbedingt eingeführt werden, das ist einfach so.“", "correct": false, "feedback": "Only a claim; \"das ist einfach so\" is no reason." },
    { "text": "„Schuluniformen sind gut, weil sie gut sind.“", "correct": false, "feedback": "Circular: the reason repeats the claim." },
    { "text": "„In England tragen viele Schülerinnen und Schüler Uniformen.“", "correct": false, "feedback": "A fact without a claim it supports." }
  ],
  "explanation": "Behauptung + Begründung + Beleg: only the first option has all three."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "argument-chain",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["build"],
  "instruction": "Order the sentences into one argument.",
  "items": [
    "Gemeinden sollten mehr Trinkbrunnen aufstellen.",
    "Denn wer unterwegs gratis Wasser bekommt, kauft seltener Getränke in Plastikflaschen.",
    "Wien etwa betreibt Hunderte Trinkbrunnen, die im Sommer stark genutzt werden.",
    "Trinkbrunnen sind also ein einfacher Beitrag dazu, weniger Müll zu erzeugen."
  ],
  "explanation": "Behauptung, Begründung (denn), Beleg (etwa), Folgerung (also)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "spot-weak",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["weak"],
  "question": "Which two statements are weak arguments?",
  "options": [
    { "text": "„Der Autor ist Politiker, also hat er sicher Hintergedanken.“", "correct": true, "feedback": "Yes: an attack on the person instead of on the claim." },
    { "text": "„Alle Jugendlichen verbringen ihre Freizeit nur am Handy.“", "correct": true, "feedback": "Yes: a sweeping generalisation." },
    { "text": "„Ein Tempolimit senkt den Verbrauch, weil der Luftwiderstand mit der Geschwindigkeit stark steigt.“", "correct": false, "feedback": "A claim with a factual reason." },
    { "text": "„Zwar kosten Radwege Geld, doch sie sparen langfristig Kosten im Gesundheitswesen.“", "correct": false, "feedback": "A counter-argument conceded and weighed." }
  ],
  "explanation": "Attacks on the person and generalisations do not support a claim; replace them with reasons and evidence."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "counter-move",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["counter"],
  "misconception": "ignore-other-side",
  "question": "You argue for a four-day school week. Which sentence takes up a counter-argument and answers it?",
  "options": [
    { "text": "„Zwar wären die vier Schultage länger, doch ein freier Tag gäbe Zeit für Erholung, Projekte und Nachhilfe.“", "correct": true, "feedback": "Yes: concedes (longer days) and weighs it." },
    { "text": "„Gegner einer Vier-Tage-Woche haben einfach keine Ahnung.“", "correct": false, "feedback": "An attack, not an answer." },
    { "text": "„Eine Vier-Tage-Woche ist modern und deshalb richtig.“", "correct": false, "feedback": "No counter-argument is taken up; \"modern\" is no reason." }
  ],
  "explanation": "Pattern: Zwar (concede) …, doch (weigh) …."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "connectors",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["build", "counter"],
  "text": "Viele fordern ein Verbot von Kurzstreckenflügen. {{1}} sind Bahnreisen oft teurer, {{2}} verursachen sie nur einen Bruchteil der Emissionen. {{3}} sollte der Staat die Bahn fördern, statt nur zu verbieten.",
  "gaps": [
    { "answer": "Zwar" },
    { "answer": "doch", "accepted": ["aber", "jedoch"] },
    { "answer": "Deshalb", "accepted": ["Daher", "Darum", "Folglich"] }
  ],
  "explanation": "Zwar … doch concedes and weighs; deshalb draws the conclusion."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "use-source",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["source"],
  "misconception": "copy-as-evidence",
  "question": "A Textbeilage (Kommentar „Mehr Mut zur Langeweile“ by Eva Berger) says: \"Kinder, die sich langweilen, erfinden eigene Spiele.\" Which sentence uses it correctly as evidence in your own text?",
  "options": [
    { "text": "Wie Eva Berger in ihrem Kommentar „Mehr Mut zur Langeweile“ schreibt, erfänden Kinder, die sich langweilen, eigene Spiele; Langeweile kann also kreativ machen.", "correct": true, "feedback": "Yes: source named, Konjunktiv I, connected to the claim." },
    { "text": "Kinder, die sich langweilen, erfinden eigene Spiele.", "correct": false, "feedback": "Copied without reference, and not connected to a claim." },
    { "text": "Irgendwo habe ich gelesen, dass Langeweile gut ist.", "correct": false, "feedback": "No exact source, and the statement is vaguer than the text." }
  ],
  "explanation": "Name the source, paraphrase (Konjunktiv I) or quote exactly, and say what it proves."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "write-argument",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["build", "counter"],
  "misconception": "more-arguments-better",
  "question": "Schreib einen Absatz (80–120 Wörter) zur Frage „Sollen Hausübungen abgeschafft werden?“. Er soll ein vollständiges Argument für deine Position enthalten und das stärkste Gegenargument aufgreifen und beantworten.",
  "rubric": [
    "Inhalt: a clear claim answering the question",
    "Inhalt: a reason and concrete evidence or example for it",
    "Inhalt: the strongest counter-argument stated fairly and answered (concede, weigh or refute)",
    "Textstruktur: a short conclusion that returns to the question; sentences linked with connectors",
    "Stil und Ausdruck / Sprachrichtigkeit: factual register, correct commas before weil/dass/denn clauses"
  ],
  "sample_answer": "Hausübungen sollten nicht abgeschafft, sondern verändert werden. Wer eine neue Rechenart nur in der Stunde übt, vergisst sie schnell; erst das selbstständige Üben zu Hause zeigt, ob man sie wirklich beherrscht. Wenn ich bei einer Mathematik-Hausübung hängen bleibe, weiß ich genau, was ich in der nächsten Stunde fragen muss. Zwar kosten Hausübungen Freizeit und belasten jene, die zu Hause keine Hilfe bekommen. Doch dieses Problem lässt sich lösen, indem Schulen kurze, gezielte Aufgaben geben und Lernzeiten am Nachmittag anbieten. Deshalb ist nicht die Hausübung das Problem, sondern ihre Menge und ihre Form.",
  "explanation": "One developed argument with evidence and an answered counter-argument convinces more than five bare claims."
}
```

# Tutor notes

- Have the learner label the parts of their own arguments (B, Be, Bel, F) for the first few texts.
- When a learner gives an opinion, ask "Warum?" and "Woran sieht man das?" until reason and evidence are there.
- The learner may take any position; judge only how well it is argued.

# Sources

Grounding: [^srdp-deutsch]. Text, examples and questions are original.

[^srdp-deutsch]: Bundesministerium für Bildung, Wissenschaft und Forschung, Textsortenkatalog zur SRDP in der Unterrichtssprache, matura.gv.at.
