---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-deutsch/discussion-essay
title: Discussion essay (Erörterung)
description: The Erörterung of the German Matura, a structured, factual weighing of a debatable question with arguments on both sides and a justified judgement, usually based on source texts, with an original practice task, rubric and sample text.
lang: en
levels: [highschool]
objectives:
  - id: features
    text: Name the features of an Erörterung (debatable question, several perspectives, factual style, structured weighing, justified judgement) and choose one of its argument patterns (thesis, question or problem first) and a dialectical or linear order.
  - id: outline
    text: Turn a question into an outline with introduction, ordered arguments on both sides and a conclusion that weighs them.
  - id: write
    text: Write a complete Erörterung within a given word range, using the Textbeilage as a source of positions and evidence.
requires:
  - ptf:el/ahs-matura-deutsch/argumentation
  - ptf:el/ahs-matura-deutsch/structure-and-style
tags: [german, matura, text-type, discussion-essay, eroerterung]
duration_min: { highschool: 120 }
sources:
  - id: srdp-textsorten
    resource: https://www.matura.gv.at/srdp/unterrichtssprache
    title: "BMBWF: Textsortenkatalog zur SRDP in der Unterrichtssprache (2020), Erörterung"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: should 14-year-olds be allowed to vote? Give one reason for and one against in a sentence each, before deciding.
- The Erörterung is the classic school text for weighing a question: it shows that the writer can see both sides, order arguments and reach a judgement that follows from them.
- Afterwards the learner can outline and write a complete Erörterung of 540–660 words.

# Core

An Erörterung examines a debatable question in a structured, factual way.
The introduction leads to the question and states it; the main part
develops arguments for and against it in a deliberate order (dialectical:
first one side, then the other, ending with the side the writer favours;
linear: arguments for one answer, increasing in weight); the conclusion
weighs them and reaches a justified judgement, which may be a
differentiated one. In the Matura it usually draws on a Textbeilage whose
positions it reproduces, extends or refutes, taking as many perspectives
of those involved into account as possible. It is a school text type: it
has no situation beyond the exam (no medium, no addressee). The style is
factual; the writer's own view appears in the judgement, not in emotional
language.

# Key facts

- Introduction: present the problem on the basis of the Textbeilage (lead in with an occasion, example or figure if useful), then state the question or thesis explicitly.
- Three argument patterns for the main part: (1) thesis, arguments with evidence or restriction, conclusion; (2) open question, weighing, answer; (3) problem, weighing of the arguments, attempted solution that returns to the problem. The dialectical and linear orders below fit into these patterns.
- Several perspectives: consider the views of all groups involved (here: young people, politics, schools, parents), not only the two authors.
- Dialectical build (pro and contra): arguments of the side you do not favour first (weakest to strongest), transition, arguments of the side you favour (weakest to strongest), weighing conclusion. Alternatively alternating (pro 1, contra 1, …) for close questions.
- Linear build: only when the task asks for one direction („Erörtern Sie, welche Gründe für … sprechen“); arguments in increasing weight.
- Each argument: Behauptung, Begründung, Beleg or Beispiel, link to the question; one paragraph per argument. Arguments stand out one by one but are linked (contrast, support, restriction).
- Own thought: continue the Textbeilage by adding, extending or refuting its arguments; take counter-arguments seriously.
- Transitions: „Gegen diese Sichtweise spricht jedoch …“, „Ein weiteres Argument …“, „Schwerer wiegt allerdings …“.
- Conclusion: weigh (which arguments weigh more and why), judgement (yes, no, or under which conditions), place the question in a larger context and possibly give an outlook; no new arguments.
- Language: verbs of stating an opinion (behaupten, einwenden, bezweifeln), particles that soften or stress (wohl, durchaus, allerdings), conjunctions and other connectors.
- Style: factual, present tense, „ich“ only in the judgement if at all; no address of the reader, no rhetorical exaggeration.
- Length in the exam: 405–495 or 540–660 words. No situation is given. Too short an Erörterung usually lacks the depth the weighing needs.
- Related text types (Kommentar, Leserbrief, offener Brief, Empfehlung) can use the same argument patterns, but they are written for a medium or an addressee.

# Level: highschool

<!-- ptf:text v1 -->

Your two sentences from the try-it task are the raw material of an
Erörterung: one argument for, one against. The Erörterung puts several of
them in order and then decides.

Start with an introduction that leads to the question and states it
plainly: „Sollen Jugendliche bereits mit 14 Jahren wählen dürfen?“ If
there is a Textbeilage, name its positions here or in the first part.

In the main part, give each argument its own paragraph with claim, reason
and example. The usual order: first the side you will not follow, from the
weaker to the stronger argument, then the side you favour, again ending
with the strongest. So your strongest argument stands right before the
conclusion.

In the conclusion, weigh: why do the arguments of one side weigh more? Then
judge. A judgement can be differentiated („nicht mit 14, aber mit mehr
Mitbestimmung in Schule und Gemeinde“). No new arguments here.

Keep the tone factual: the Erörterung convinces by order and reasons, not
by exclamation marks.

# Misconceptions

- **list-not-weigh**: An Erörterung lists pros and cons → it develops and orders them and weighs them in the conclusion.
- **no-judgement**: An Erörterung must stay neutral to the end → it ends with a justified judgement, which may be differentiated.
- **strongest-first**: The strongest argument goes first to win the reader → in a dialectical build it stands last, right before the conclusion.
- **emotional-style**: Strong feelings make an Erörterung convincing → it convinces by factual reasons; emotional language belongs in a speech or commentary.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "eroerterung-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["features"],
  "misconception": "list-not-weigh",
  "question": "Which two statements about the Erörterung are true?",
  "options": [
    { "text": "It ends with a judgement that follows from weighing the arguments.", "correct": true, "feedback": "Yes: the conclusion weighs and judges." },
    { "text": "In a dialectical build, the side the writer favours comes second.", "correct": true, "feedback": "Yes: so the strongest argument stands before the conclusion." },
    { "text": "It addresses the reader directly to win them over.", "correct": false, "feedback": "That is the Meinungsrede; the Erörterung is factual." },
    { "text": "It lists as many arguments as possible in bullet points.", "correct": false, "feedback": "Few developed arguments in paragraphs, not a list." },
    { "text": "It must stay neutral and leave the decision to the reader.", "correct": false, "feedback": "It ends with a justified judgement." }
  ],
  "explanation": "Structured weighing, factual style, justified judgement."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "dialectical-order",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["outline"],
  "misconception": "strongest-first",
  "instruction": "A writer favours keeping the voting age at 16. Order the parts of their dialectical Erörterung.",
  "items": [
    "Introduction: occasion and the question „Wählen mit 14?“",
    "Weaker argument for 14: young people use social media for politics",
    "Strongest argument for 14: decisions on climate and pensions affect the young longest",
    "Transition: „Schwerer wiegen jedoch die Einwände …“",
    "Weaker argument against: few 14-year-olds have had civic education yet",
    "Strongest argument against: rights and duties should mature together",
    "Conclusion: weighing and judgement"
  ],
  "explanation": "The side not followed first, each side from weaker to stronger, the favoured side's strongest argument right before the conclusion."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "state-question",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["outline", "features"],
  "question": "Which introduction leads to the question best?",
  "options": [
    { "text": "„Seit 2007 dürfen in Österreich bereits 16-Jährige wählen. Nun fordern Schülervertretungen, noch weiter zu gehen. Sollen Jugendliche schon mit 14 Jahren wählen dürfen?“", "correct": true, "feedback": "Yes: occasion, development, the question stated." },
    { "text": "„Ich bin klar dafür, dass 14-Jährige wählen dürfen, und das werde ich jetzt beweisen.“", "correct": false, "feedback": "Judgement first, no lead-in, emotional." },
    { "text": "„Wählen ist wichtig. Demokratie ist auch wichtig.“", "correct": false, "feedback": "Empty; no question." }
  ],
  "explanation": "Lead-in, then the question explicitly."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "conclusion-weigh",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["features", "outline"],
  "misconception": "no-judgement",
  "question": "Which conclusion fits an Erörterung?",
  "options": [
    { "text": "„Beide Seiten haben gewichtige Gründe. Schwerer wiegt aber, dass Rechte und Pflichten zusammenpassen sollten. Statt das Wahlalter zu senken, sollte man Jugendlichen deshalb mehr Mitbestimmung in Schule und Gemeinde geben.“", "correct": true, "feedback": "Yes: weighs, judges, proposes." },
    { "text": "„Es gibt also Argumente dafür und dagegen. Jeder muss selbst entscheiden.“", "correct": false, "feedback": "No judgement." },
    { "text": "„Außerdem ist noch zu sagen, dass Jugendliche oft gut informiert sind.“", "correct": false, "feedback": "A new argument in the conclusion." }
  ],
  "explanation": "The conclusion weighs, judges and may propose; it adds no new arguments."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "factual-style",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["features"],
  "misconception": "emotional-style",
  "question": "Which sentence has the style of an Erörterung?",
  "options": [
    { "text": "„Gegen eine Senkung des Wahlalters spricht, dass viele 14-Jährige noch keinen Unterricht in politischer Bildung hatten.“", "correct": true, "feedback": "Yes: factual and impersonal." },
    { "text": "„Liebe Freundinnen und Freunde, wollt ihr wirklich, dass Kinder wählen?!“", "correct": false, "feedback": "Address and exclamation belong in a speech." },
    { "text": "„Das ist doch absoluter Wahnsinn!“", "correct": false, "feedback": "Emotional, no argument." }
  ],
  "explanation": "Factual, impersonal, argumentative."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "eroerterung-task",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["write", "outline", "features"],
  "misconception": "list-not-weigh",
  "question": "Schreibauftrag\nThema: Politik und Jugend\nVerfassen Sie eine Erörterung (540–660 Wörter). Lesen Sie die beiden Stellungnahmen „Wählen mit 14?“ (Textbeilage, für diesen Kurs verfasst).\nAufgabenstellung:\n• Geben Sie die Positionen der beiden Stellungnahmen wieder.\n• Erörtern Sie Argumente für und gegen ein Wahlalter von 14 Jahren.\n• Beurteilen Sie, ob das Wahlalter auf 14 Jahre gesenkt werden sollte.\n\nTextbeilage: „Wählen mit 14? Zwei Stellungnahmen“, Jugendmagazin Kompass, Mai 2026\n\nSeit 2007 dürfen in Österreich bereits 16-Jährige wählen. Soll das Wahlalter weiter sinken?\n\nMira Novak, Schulsprecherin: „Mit 14 sind Jugendliche in Österreich strafmündig, viele beginnen eine Lehre, und alle müssen mit den Entscheidungen leben, die heute über Klima, Pensionen und Schule getroffen werden, und zwar länger als jede andere Generation. Trotzdem dürfen wir nicht mitentscheiden. Viele von uns informieren sich über soziale Medien und Schulprojekte sehr genau über Politik. Wer früh wählen darf, fühlt sich ernst genommen und bleibt eher dabei. Ein Wahlalter von 14 wäre ein Zeichen, dass die Demokratie die Jungen braucht.“\n\nPaul Rainer, Politikwissenschafter: „Das Anliegen ist verständlich, aber 14 ist zu früh. Politische Bildung beginnt in vielen Schulen erst später, und gerade jüngere Jugendliche sind leichter von Eltern, Lehrkräften oder Kampagnen in sozialen Medien zu beeinflussen. Außerdem sollten Rechte und Pflichten zusammenpassen: Volljährig ist man erst mit 18. Mehr Wirkung hätte es, Jugendliche dort mitbestimmen zu lassen, wo sie die Folgen direkt erleben, in der Schule und in der Gemeinde, etwa in Jugendparlamenten mit echtem Budget.“",
  "rubric": [
    "Inhalt, writing acts: an Erörterung (reproducing, explaining, arguing, evaluating), not a Kommentar or a speech",
    "Inhalt, bullet 1: both positions reproduced correctly and briefly, in reported speech (Novak: criminal responsibility, apprenticeship, long-term consequences, informed, feeling taken seriously; Rainer: civic education later, easier to influence, rights and duties, participation in school and municipality)",
    "Inhalt, bullet 2: arguments on both sides developed (claim, reason, example) and ordered, not just listed; several perspectives; own arguments beyond the Textbeilage, which is extended or refuted",
    "Inhalt, bullet 3: a justified judgement that follows from the weighing (may be differentiated)",
    "Inhalt: facts correct (e.g. voting age 16 since 2007), none invented",
    "Textstruktur: introduction presenting the problem from the Textbeilage and the question; one argument pattern followed (here question, weighing, answer) with a dialectical or alternating order and linked arguments; one paragraph per argument; conclusion without new arguments, with larger context or outlook; the authors named",
    "Stil und Ausdruck: factual, present tense, verbs of opinion and connectors varied; no address of the reader; own formulations, not the Textbeilage's",
    "Sprachnormen: grammar (Konjunktiv I in reported positions), punctuation (commas), spelling (das/dass)",
    "Length 540–660 words; much shorter lacks the depth the weighing needs"
  ],
  "sample_answer": "Wählen mit 14?\n\nSeit 2007 dürfen in Österreich bereits 16-Jährige wählen. Nun fordern manche Schülervertretungen, noch einen Schritt weiterzugehen. Im Jugendmagazin Kompass vertreten die Schulsprecherin Mira Novak und der Politikwissenschafter Paul Rainer dazu gegensätzliche Positionen. Sollen Jugendliche bereits mit 14 Jahren wählen dürfen?\n\nNovak spricht sich für ein Wahlalter von 14 aus. Jugendliche seien in diesem Alter strafmündig, viele begännen eine Lehre, und sie müssten am längsten mit den heutigen Entscheidungen über Klima, Pensionen und Schule leben. Viele informierten sich zudem genau über Politik, und wer früh wählen dürfe, fühle sich ernst genommen. Rainer hält dagegen, 14 sei zu früh. Politische Bildung beginne oft erst später, jüngere Jugendliche seien leichter zu beeinflussen, und Rechte und Pflichten sollten zusammenpassen. Wirksamer sei es, Jugendliche in Schule und Gemeinde mitbestimmen zu lassen.\n\nFür ein Wahlalter von 14 spricht zunächst, dass sich viele Jugendliche heute früh mit Politik beschäftigen. Klimastreiks, Debatten in sozialen Medien und Schulprojekte zeigen, dass Interesse vorhanden ist. Dieses Argument hat allerdings eine Schwäche: Interesse haben viele, gründliches Wissen über Parteien, Programme und Institutionen dagegen weniger.\n\nSchwerer wiegt das Argument der Betroffenheit. Entscheidungen über Klimaschutz oder Pensionen wirken Jahrzehnte nach, und die Jüngsten tragen ihre Folgen am längsten. Wer betroffen ist, sollte nach demokratischem Grundverständnis auch mitbestimmen dürfen. Zudem zeigt die Erfahrung mit dem Wahlalter 16, dass eine Senkung die Demokratie nicht beschädigt hat.\n\nEin drittes Argument betrifft die Gewohnheit. Wer bei der ersten Gelegenheit wählen geht, bleibt dem Wählen oft treu, und wer mit 14 beginnt, erlebt die erste Wahl noch in der Schule. Dort könnte man sie im Unterricht vorbereiten, Programme vergleichen und das Ergebnis gemeinsam besprechen. Gerade Jugendliche aus Familien, in denen kaum über Politik gesprochen wird, würden davon profitieren. Dieses Argument zeigt allerdings auch, dass ein niedrigeres Wahlalter nur gemeinsam mit mehr politischer Bildung sinnvoll wäre.\n\nGegen eine weitere Senkung spricht jedoch, dass viele 14-Jährige noch kaum politische Bildung erhalten haben. Wer zum ersten Mal wählt, sollte wissen, wie ein Parlament arbeitet und was eine Partei von einer Bürgerinitiative unterscheidet. Ohne dieses Wissen wäre die Stimme leichter zu lenken, etwa durch zugespitzte Videos in sozialen Medien, die gerade Jüngere stark nutzen. Auch der Einfluss von Eltern ist in diesem Alter größer als mit 16 oder 18, weil Jugendliche noch stärker von ihrer Familie abhängen.\n\nNoch schwerer wiegt der Einwand, dass Rechte und Pflichten zusammenpassen sollten. Mit 14 dürfen Jugendliche etwa einen Handyvertrag nicht ohne Zustimmung der Eltern abschließen und sind in vielen Lebensbereichen noch nicht allein für sich verantwortlich. Die Rechtsordnung geht also davon aus, dass Urteilsvermögen und Verantwortung in diesen Jahren erst wachsen. Es wäre widersprüchlich, ihnen die Mitentscheidung über ein ganzes Land zuzutrauen, nicht aber über einen Handyvertrag. Die Strafmündigkeit, auf die Novak verweist, ist kein Gegenargument, denn sie schützt die Gesellschaft, statt Jugendlichen Mitsprache zu geben.\n\nWägt man die Argumente ab, so überzeugt das Anliegen, junge Menschen stärker zu beteiligen. Die Betroffenheit der Jungen ist ein ernstes Argument, und ihr Interesse ist echt. Das Wahlalter von 14 ist dafür aber nicht das richtige Mittel, weil Wissen und Verantwortung in diesem Alter erst wachsen. Sinnvoller ist es, Rainers Vorschlag aufzugreifen: Jugendparlamente mit eigenem Budget, Mitbestimmung bei Schulregeln und politische Bildung, die früher beginnt. So lernen Jugendliche Demokratie dort, wo sie die Folgen ihrer Entscheidungen selbst erleben, und gehen mit 16 besser vorbereitet zur ersten Wahl. Sollte politische Bildung eines Tages an allen Schulen deutlich früher beginnen, könnte man die Frage nach dem Wahlalter erneut stellen, dann allerdings auf einer anderen Grundlage als heute.",
  "explanation": "The sample reproduces both positions, develops three arguments for and two against in increasing weight, answers one of Novak's arguments directly and ends with a differentiated judgement."
}
```

# Tutor notes

- Before the learner writes, ask for a one-line outline: question, order of arguments, judgement. Most weak Erörterungen fail in the outline, not in the sentences.
- The learner may reach any judgement; check that it follows from the weighing.
- „Seit 2007 dürfen in Österreich 16-Jährige wählen“ is a real fact; the two positions in the Textbeilage and the magazine are invented for this course.

## Blueprint for new tasks

Rules for all tasks: exam-format element, "Making new writing tasks".

- **Word range:** 405–495 or 540–660.
- **Situation:** none beyond the exam; the Erörterung is a school text type. A task that names a medium or addressee asks for a related text type (Kommentar, Empfehlung, offener Brief) instead.
- **Textbeilage:** one or two texts or a graphic that present positions and facts on a general, debatable question (should …? is …?): two statements, a pro and contra piece, a report with figures; 300–900 words in total.
- **Operators:** bullet 1 „Geben Sie … wieder“ / „Beschreiben Sie …“ / „Stellen Sie … dar“; bullet 2 „Erörtern Sie …“ / „Setzen Sie sich mit … auseinander“ / „Vergleichen Sie …“; bullet 3 „Beurteilen Sie, ob …“ / „Nehmen Sie Stellung …“ / „Entwerfen Sie …“ (a concept or solution).
- **Rubric template:** follow the rubric of the task above. Inhalt: writing acts of an Erörterung; one line per bullet; positions of the Textbeilage reproduced correctly; several perspectives and own arguments beyond the source; judgement follows from weighing. Textstruktur: problem and question, one argument pattern, linked arguments, conclusion with context. Stil: factual, own formulations. Sprachnormen. Range (too short hurts here).

# Sources

Grounding: [^srdp-textsorten]. Text, Textbeilage, examples and questions are original.

[^srdp-textsorten]: Bundesministerium für Bildung, Wissenschaft und Forschung, Textsortenkatalog zur SRDP in der Unterrichtssprache (Stand 2020), Erörterung, matura.gv.at.
