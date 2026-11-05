---
type: Bundle
okf_version: "0.2"
ptf_version: "0.1"
id: ahs-matura-latein
title: "Latin for the Austrian AHS Matura"
description: Preparation for the standardised written Matura in Latin at an Austrian AHS (4-year and 6-year Latin) – translation method and the grammar behind every checkpoint type, the interpretation task formats, and two complete practice exams written for this course.
lang: en
license: CC-BY-SA-4.0
version: 0.1.0
tags: [latin, matura, austria, ahs, srp, exam-preparation]
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
---

# Contents

A course for learners preparing for the standardised written Matura (SRP)
in Latin at an Austrian AHS. The exam has a translation text (36 points:
12 sense units, 6 vocabulary, 6 morphology and 6 syntax checkpoints, up to
6 language points) and an interpretation text with ten tasks (24 points).
Each element teaches what one group of checkpoints or task formats asks
for. 4-year and 6-year Latin share the format and the marking; the two
learning paths differ in pace and in their practice exam.

Questions, examples and both practice exams are original. Latin passages
are written for this course after well-known ancient stories, or adapted
from public-domain classical texts; past Matura papers are not part of
this bundle (they are published by the BMBWF without an open licence), but
a learner can bring one and be guided through it.

Every answer that can be checked objectively is recomputed by the
matching script in `checks/`: noun, adjective, pronoun and verb forms are
generated from their dictionary entries, quotations must occur in the
text, sentence analyses must cite every word, word counts must keep their
limits. The shared Latin helpers live in `checks/lib/latin.js` and are
copied into each script with `node checks/lib/inline.mjs`.

## Learning paths

- [Latin Matura, 4-year Latin](paths/latin-4.md)
- [Latin Matura, 6-year Latin](paths/latin-6.md)

## Elements

| Element | Exam part | Questions |
| --- | --- | --- |
| [Translating a Matura text](elements/translation-method.md) | Translation: method and marking | 8 |
| [Nouns, adjectives and agreement](elements/nouns-and-adjectives.md) | Translation: MO | 8 |
| [Verb forms](elements/verbs.md) | Translation: MO | 8 |
| [Pronouns and what they refer to](elements/pronouns.md) | Translation: MO; interpretation: reference | 8 |
| [What the cases do](elements/cases-in-use.md) | Translation: SY | 7 |
| [Participles and the ablative absolute](elements/participles.md) | Translation: SY | 8 |
| [Accusative and nominative with infinitive](elements/infinitives.md) | Translation: SY | 7 |
| [Subordinate clauses with the subjunctive](elements/subjunctive-clauses.md) | Translation: SY | 8 |
| [Sentence structure and relative clauses](elements/sentence-structure.md) | Translation: SY; interpretation: HS/GS/sK | 8 |
| [Gerund and gerundive](elements/gerund-gerundive.md) | Translation: SY | 6 |
| [Vocabulary in context and the dictionary](elements/vocabulary-in-context.md) | Translation: LE; interpretation: collecting | 5 |
| [Word formation and loanwords](elements/word-formation.md) | Interpretation: tasks 1–3 | 6 |
| [Working with the interpretation text](elements/text-comprehension.md) | Interpretation: closed tasks | 8 |
| [Stylistic devices](elements/stylistic-devices.md) | Interpretation: style | 6 |
| [Open interpretation tasks](elements/open-tasks.md) | Interpretation: open tasks | 6 |
| [Practice exam (4-year Latin)](elements/practice-exam-4.md) | Whole paper | 11 |
| [Practice exam (6-year Latin)](elements/practice-exam-6.md) | Whole paper | 11 |
