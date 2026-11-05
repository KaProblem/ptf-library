---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/polynomial-functions
title: Polynomial functions
description: Typical shapes of polynomial graphs by degree, switching between tables and graphs, finding values and arguments, and how the degree limits the number of zeros, extrema and inflection points, as required for the Austrian AHS Matura (FA 4).
lang: en
levels: [highschool]
objectives:
  - id: fa-4-1
    text: Recognise typical shapes of polynomial graphs depending on the degree.
  - id: fa-4-2
    text: Switch between tables and graphs of polynomial relationships.
  - id: fa-4-3
    text: Find function values from tables, graphs and formulas, and arguments from tables, graphs and quadratic formulas.
  - id: fa-4-4
    text: Know how the degree of a polynomial limits the possible numbers of zeros, extrema and inflection points.
tags: [mathematics, functions, polynomial, quadratic-function, zeros, matura, austria, fa-4]
about:
  - wikidata: Q1244652
    label: polynomial function
duration_min: { highschool: 90 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich FA 4"
generated: { by: claude/opus, at: 2026-11-05T23:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess: how often can the graph of a polynomial of degree 3 cross the x-axis at most? And how often must it cross at least?
- Polynomial functions are sums of powers, f(x) = aₙxⁿ + … + a₁x + a₀. Their graphs are smooth curves with a few turns, and the degree n tells a lot about their shape before you compute anything.
- Afterwards the learner can recognise graphs by degree and leading coefficient, read and compute values and arguments, and know the possible numbers of zeros, extrema and inflection points. FA 4 brings about one Teil-1 task per exam and the profit and trajectory models of Teil 2.

# Core

A polynomial function of degree n is f(x) = aₙxⁿ + … + a₁x + a₀ with
aₙ ≠ 0. For large |x| the highest term dominates: with even degree both
ends of the graph point the same way (up if aₙ > 0), with odd degree in
opposite directions. A polynomial of degree n has at most n zeros, at most
n − 1 local extrema and at most n − 2 inflection points. A polynomial of
odd degree has at least one zero, and one of degree 3 has exactly one
inflection point. Values f(x) are computed by inserting; arguments x with
f(x) = c are read from a table or graph, or, for quadratics, found by
solving a quadratic equation. In factored form f(x) = a(x − x₁)(x − x₂)… the
zeros can be read off; a squared factor means the graph touches the axis
there.

# Key facts

- Degree 1: line; degree 2: parabola with one extremum (vertex); degree 3: S-shape with 0 or 2 extrema and exactly one inflection point; degree 4: W- or M-shape with 1 or 3 extrema.
- End behaviour: even degree and aₙ > 0 → both ends up; odd degree and aₙ > 0 → left down, right up.
- Maximum numbers for degree n: n zeros, n − 1 extrema, n − 2 inflection points. Degree 4: up to 4, 3, 2.
- Odd degree: at least one zero (the ends point in opposite directions); degree 3: exactly one inflection point.
- f(x) = x³ − 4x: table for x = −2, −1, 0, 1, 2 → 0, 3, 0, −3, 0; zeros −2, 0, 2.
- f(x) = 0.5x² − 2x + 1: f(3) = −0.5; f(x) = 1 ↔ 0.5x² − 2x = 0 ↔ x = 0 or 4.
- Factored form: f(x) = 2(x + 1)(x − 3)² has the zeros −1 (crosses) and 3 (touches: double zero).
- Profit model G(x) = −x² + 12x − 20 (x in hundreds of items, G in € 1 000): break-even at x = 2 and x = 10, maximum profit 16 at x = 6.
- Matura terms (German): Polynomfunktion, Grad, Leitkoeffizient, Nullstelle (einfache, doppelte), Extremstelle, Wendestelle, Scheitelpunkt, quadratische Funktion. Typical Teil-1 formats: 2 aus 5 (properties by degree), Zuordnung (graphs to formulas), offen (read values or arguments).

# Level: highschool

<!-- ptf:text v1 -->

Start with the ends of the graph. Far to the right and far to the left only
the highest power matters. x² is huge and positive on both sides, so a
parabola with a positive leading coefficient opens upwards. x³ is
negative on the left and positive on the right, so a cubic with a
positive leading coefficient comes from below and goes up.

Between the ends the graph can turn. Each turn is a local extremum, and a
polynomial of degree n can turn at most n − 1 times, because its
derivative has degree n − 1 and so at most n − 1 zeros. That is why a cubic
has at most two turns and at most three zeros.

To read values, insert. To find where f takes a value, set f(x) equal to
it. For quadratics you can always solve exactly; for higher degrees read
from the graph or use technology.

# Misconceptions

- **degree-equals-zeros**: A polynomial of degree n always has n zeros → at most n; x² + 1 has none.
- **extrema-equal-degree**: Degree 3 means 3 extrema → at most n − 1 = 2, and possibly none (x³).
- **even-has-zero**: Every polynomial has at least one zero → only odd degrees guarantee one.
- **double-zero-crosses**: At a double zero the graph crosses the axis → it touches the axis and turns back.
- **leading-coefficient-ignored**: All parabolas open upwards → a negative leading coefficient opens downwards.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cubic-zeros",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "degree-equals-zeros",
  "question": "How many zeros can a polynomial of degree 3 have? Guess first.",
  "options": [
    { "text": "1, 2 or 3", "correct": true, "feedback": "Yes: at least one because the ends point in opposite directions, at most three." },
    { "text": "Always exactly 3", "correct": false, "feedback": "x³ + x has only the zero 0." },
    { "text": "0, 1, 2 or 3", "correct": false, "feedback": "An odd degree always has at least one zero." }
  ],
  "explanation": "Degree n: at most n zeros; odd degree: at least one."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "end-behaviour",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-4-1"],
  "misconception": "leading-coefficient-ignored",
  "question": "Which two statements about the shape of the graph are true?",
  "options": [
    { "text": "f(x) = −2x⁴ + x: both ends of the graph point downwards", "correct": true, "feedback": "Yes: even degree, negative leading coefficient." },
    { "text": "f(x) = x³ − 5x: the graph comes from below on the left and goes up on the right", "correct": true, "feedback": "Yes: odd degree, positive leading coefficient." },
    { "text": "f(x) = −x² + 4: the parabola opens upwards", "correct": false, "feedback": "The leading coefficient −1 makes it open downwards." },
    { "text": "f(x) = x⁴ − 3x²: both ends point downwards", "correct": false, "feedback": "x⁴ dominates and is positive on both sides: both ends up." },
    { "text": "f(x) = −x³: the graph goes up on the right", "correct": false, "feedback": "For large x, −x³ is very negative: it goes down on the right." }
  ],
  "explanation": "For large |x| the term with the highest power decides."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "table-values",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-4-2", "fa-4-3"],
  "text": "f(x) = x³ − 4x. In the table for x = −2, −1, 0, 1, 2 the values are 0, {{1}}, 0, {{2}}, 0.",
  "gaps": [
    { "answer": "3" },
    { "answer": "-3", "accepted": ["−3"] }
  ],
  "explanation": "f(−1) = −1 + 4 = 3, f(1) = 1 − 4 = −3; the zeros −2, 0, 2 are visible in the table."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "value-of-quadratic",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-4-3"],
  "question": "f(x) = 0.5x² − 2x + 1. Compute f(3).",
  "answer": -0.5,
  "tolerance": 0,
  "explanation": "0.5 · 9 − 6 + 1 = −0.5."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "argument-of-quadratic",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-4-3"],
  "text": "f(x) = 0.5x² − 2x + 1 takes the value 1 at x = {{1}} and x = {{2}} (smaller first).",
  "gaps": [
    { "answer": "0" },
    { "answer": "4" }
  ],
  "explanation": "0.5x² − 2x + 1 = 1 → 0.5x² − 2x = 0 → x(0.5x − 2) = 0 → x = 0 or 4."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "degree-four-counts",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-4-4"],
  "misconception": "extrema-equal-degree",
  "question": "f is a polynomial function of degree 4. Which two statements are certainly true?",
  "options": [
    { "text": "f has at most 3 local extrema", "correct": true, "feedback": "Yes: f′ has degree 3 and so at most 3 zeros." },
    { "text": "f has at most 2 inflection points", "correct": true, "feedback": "Yes: f″ has degree 2." },
    { "text": "f has exactly 4 zeros", "correct": false, "feedback": "At most 4; x⁴ + 1 has none." },
    { "text": "f has at least one zero", "correct": false, "feedback": "Even degree: x⁴ + 1 never reaches 0." },
    { "text": "f has exactly 3 local extrema", "correct": false, "feedback": "x⁴ has only one." }
  ],
  "explanation": "Degree n: at most n zeros, n − 1 extrema, n − 2 inflection points."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "factored-form",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-4-1", "fa-4-4"],
  "misconception": "double-zero-crosses",
  "question": "f(x) = 2(x + 1)(x − 3)². Which statement is true?",
  "options": [
    { "text": "The graph crosses the x-axis at −1 and touches it at 3", "correct": true, "feedback": "Yes: (x − 3)² does not change sign, so the graph turns back at 3." },
    { "text": "The zeros are 1 and −3", "correct": false, "feedback": "x + 1 = 0 gives −1, x − 3 = 0 gives 3." },
    { "text": "The graph crosses the x-axis three times", "correct": false, "feedback": "There are only two different zeros; at 3 it only touches." },
    { "text": "f has degree 2", "correct": false, "feedback": "Multiplied out, the highest power is 2x³." }
  ],
  "explanation": "A squared factor gives a double zero, where the graph touches the axis."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "profit-model",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-4-3"],
  "title": "A profit model",
  "intro": "G(x) = −x² + 12x − 20 is the profit in € 1 000 for x hundred items sold.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Break-even (smaller)", "−x² + 12x − 20 = 0, smaller solution", "2"],
    ["Break-even (larger)", "larger solution", "10"],
    ["Vertex", "x = 12 / 2", "6"],
    ["Maximum profit", "G(6) = −36 + 72 − 20", "16"]
  ],
  "result": { "label": "Maximum profit", "value": "€ 16 000 at 600 items" },
  "explanation": "x² − 12x + 20 = 0 → x = 2 or 10; the vertex lies halfway between the zeros."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "parabola-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["fa-4-1", "fa-4-4"],
  "misconception": "even-has-zero",
  "question": "Which statement is true for every quadratic function f(x) = ax² + bx + c (a ≠ 0)?",
  "options": [
    { "text": "It has exactly one local extremum", "correct": true, "feedback": "Yes: the vertex of the parabola." },
    { "text": "It has at least one zero", "correct": false, "feedback": "x² + 1 has none." },
    { "text": "It has an inflection point", "correct": false, "feedback": "f″ = 2a never changes sign." }
  ],
  "explanation": "A parabola has one vertex, no inflection point and 0, 1 or 2 zeros."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "odd-degree-zero",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["fa-4-1", "fa-4-4"],
  "question": "Explain why every polynomial function of degree 5 has at least one zero, but a polynomial function of degree 4 need not have one.",
  "rubric": [
    "For degree 5 the ends of the graph point in opposite directions (one up, one down)",
    "The graph is unbroken, so it must cross the x-axis somewhere",
    "For degree 4 both ends point the same way, so the graph can stay above (or below) the axis",
    "An example such as x⁴ + 1"
  ],
  "sample_answer": "With odd degree, x⁵ dominates for large |x|: the graph goes to −∞ on one side and to +∞ on the other. Since it has no gaps, it must cross the x-axis. With degree 4 both ends go the same way, so the graph can stay entirely above the axis, like x⁴ + 1.",
  "explanation": "End behaviour plus an unbroken graph."
}
```

# Tutor notes

- Train the habit of looking at the ends of the graph first; many Zuordnung tasks are solved by degree and leading coefficient alone.
- Let the learner check counts (zeros, extrema) against the maxima n, n − 1, n − 2 before trusting a sketch.
- Past Matura tasks for FA 4: about 40 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area FA 4 (polynomial functions).
