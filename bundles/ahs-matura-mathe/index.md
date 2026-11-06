---
type: Bundle
okf_version: "0.2"
ptf_version: "0.1"
id: ahs-matura-mathe
title: "Mathematics for the Austrian AHS Matura"
description: The 70 basic competences (Grundkompetenzen) tested in the standardised AHS Matura in mathematics, as 17 learning elements in a course order that respects prerequisites, weighted by how often each area was tested from 2014 to 2026.
lang: en
license: CC-BY-SA-4.0
version: 0.4.1
tags: [mathematics, matura, austria, ahs, srp, exam-preparation]
generated: { by: claude/opus, at: 2026-11-06T00:30:00Z }
---

# Contents

A course for learners preparing for the standardised written Matura (SRP) in
mathematics at an Austrian AHS. Each element covers one chapter of the
official catalogue of basic competences; its objectives are the competences
themselves (IDs such as `fa-5-4` for FA 5.4), so progress is tracked per
competence. Questions and examples are original; past Matura tasks are not
part of this bundle (they are published by the BMBWF without an open
licence), but a learner can bring one and be guided through it.

The catalogue of February 2021 applies until the reform planned for the
main exam date 2030/31. AN 1.4, WS 3.4 and WS 4.1 have not been tested since
2022 and are left out.

## Elements

The course order is the learning path [Mathematics Matura (AHS)](paths/matura-course.md).
Every computed answer and every number in Key facts is recomputed by the
matching script in `checks/` (`ptf-check` runs them).

| Element | Competences | Questions |
| --- | --- | --- |
| [Numbers and algebraic terms](elements/numbers-and-algebra.md) | AG 1.1–1.2 | 8 |
| [Terms, equations, inequalities and systems](elements/equations.md) | AG 2.1–2.5 | 12 |
| [Vectors and lines](elements/vectors.md) | AG 3.1–3.5 | 14 |
| [Trigonometry](elements/trigonometry.md) | AG 4.1–4.2 | 9 |
| [Functions and their representations](elements/functions-basics.md) | FA 1.1–1.9 | 12 |
| [Linear functions](elements/linear-functions.md) | FA 2.1–2.6 | 12 |
| [Power functions](elements/power-functions.md) | FA 3.1–3.4 | 8 |
| [Polynomial functions](elements/polynomial-functions.md) | FA 4.1–4.4 | 10 |
| [Exponential functions](elements/exponential-functions.md) | FA 5.1–5.6 | 14 |
| [Sine and cosine functions](elements/sine-functions.md) | FA 6.1–6.6 | 9 |
| [Rates of change](elements/rates-of-change.md) | AN 1.1–1.3 | 13 |
| [Differentiation rules](elements/differentiation-rules.md) | AN 2.1 | 7 |
| [Derivative and antiderivative](elements/derivative-functions.md) | AN 3.1–3.3 | 11 |
| [Summation and the integral](elements/integrals.md) | AN 4.1–4.3 | 11 |
| [Descriptive statistics](elements/descriptive-statistics.md) | WS 1.1–1.4 | 11 |
| [Probability](elements/probability.md) | WS 2.1–2.4 | 15 |
| [Random variables and the 