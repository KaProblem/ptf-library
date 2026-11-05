---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/functions-basics
title: Functions and their representations
description: What makes a relationship a function, formulas, tables and graphs as representations, reading values, properties such as monotonicity, extrema, symmetry and zeros, intersections, functions as models and with several variables, and an overview of the function types, as required for the Austrian AHS Matura (FA 1).
lang: en
levels: [highschool]
objectives:
  - id: fa-1-1
    text: Decide whether a given relationship can be seen as a function.
  - id: fa-1-2
    text: Read formulas as representations of functions and name the function type.
  - id: fa-1-3
    text: Switch between tables and graphs of a relationship.
  - id: fa-1-4
    text: Find values and value pairs from tables, graphs and formulas and interpret them in context.
  - id: fa-1-5
    text: Recognise, name and interpret properties of functions (monotonicity, local extrema, inflection points, periodicity, symmetry, asymptotes, intercepts) and use them to sketch graphs.
  - id: fa-1-6
    text: Find intersection points of two graphs graphically and by calculation and interpret them in context.
  - id: fa-1-7
    text: Understand functions as mathematical models and work with them sensibly, including their domain.
  - id: fa-1-8
    text: Interpret functions of several variables given by formulas in context and compute their values.
  - id: fa-1-9
    text: Give an overview of the main function types and compare their properties.
tags: [mathematics, functions, graphs, monotonicity, extrema, matura, austria, fa-1]
about:
  - wikidata: Q11348
    label: function
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich FA 1"
generated: { by: claude/opus, at: 2026-11-05T20:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Think about it: every person has exactly one birthday. Is "birthday → person" just as good a rule as "person → birthday"? No: many people share a birthday, so the reverse is not a function.
- A function is a rule that gives every input exactly one output. Formulas, tables, graphs and sentences are just different ways to show the same rule, and the Matura constantly asks you to move between them.
- Afterwards the learner can decide what is a function, read values and properties from any representation, find intersections, work with models and formulas with several variables, and tell the main function types apart. FA 1 brings about two Teil-1 tasks per exam and is the basis for all other function chapters.

# Core

A function f assigns to every x in its domain exactly one value f(x). The
same function can be given as a formula, a table, a graph or in words; the
graph is the set of all points (x | f(x)). A graph belongs to a function if
every vertical line meets it at most once. From any representation you can
read values and properties: where f rises or falls (monotonicity), local
maxima and minima, inflection points where the curvature changes,
symmetry, zeros and the y-intercept, asymptotes and periodicity.
Intersections of two graphs are the solutions of f(x) = g(x). In
applications a function is a model: its variables have units, and it is
valid only on a sensible domain. Formulas with several variables, such as
V = r²πh, are functions of several variables; fixing all but one gives a
function of one variable.

# Key facts

- Function: each input has exactly one output; different inputs may share an output. Vertical line test for graphs.
- Function types in the catalogue (overview, FA 1.9): linear k · x + d; power a · x^z (e.g. a / x, a · √x); polynomial (degree n: up to n zeros, up to n − 1 extrema); exponential a · b^x; sine and cosine (periodic). Read the type from where x stands: as a base with a fixed exponent (power), as the exponent (exponential), inside sin (periodic).
- Values in context: h(t) = −5t² + 20t + 1.5 (height in m after t s) → h(2) = 21.5 m; solving h(t) = 16.5 gives t = 1 and t = 3 (on the way up and down).
- Properties of f(x) = x³ − 3x: zeros 0 and ±√3 ≈ ±1.73; local maximum (−1 | 2), local minimum (1 | −2); point-symmetric about the origin (f(−x) = −f(x)); inflection point (0 | 0).
- Symmetry: f(−x) = f(x) → symmetric about the y-axis (e.g. x², cos x); f(−x) = −f(x) → symmetric about the origin (e.g. x³, sin x).
- Intersections: f(x) = x² and g(x) = x + 2 → x² − x − 2 = 0 → x = −1 or 2, points (−1 | 1) and (2 | 4).
- Several variables: V(r, h) = r²πh. Doubling r multiplies V by 4; doubling h multiplies V by 2.
- Models: state the domain (time ≥ 0, a tank not below empty, numbers of items whole) and check results against reality.
- Matura terms (German): Funktion, Definitionsmenge, Wertemenge, Graph, Wertetabelle, monoton steigend / fallend, lokales Maximum / Minimum (Extremstelle), Wendestelle, Nullstelle, achsensymmetrisch, punktsymmetrisch, Asymptote, Periode, Schnittpunkt, Modell. Typical Teil-1 formats: 2 aus 5 (properties of a graph), Zuordnung (formulas to graphs or types), offen (read values).

# Level: highschool

<!-- ptf:text v1 -->

Start with the test: a function never has two answers for the same input.
"Person → height" is a function. "Height → person" is not, because two
people can be equally tall. On a graph that means: no vertical line may hit
it twice. A circle fails, a parabola passes.

A table is a few points of the graph, and a graph is all of them. When you
read a graph, say aloud what you see: "From x = −1 to 1 the curve falls,
so f is decreasing there; at x = −1 it turns from rising to falling, a
local maximum." These sentences are exactly what Matura tasks ask for.

Where two graphs cross, both functions have the same value. To compute it,
set the formulas equal and solve. In a context, say what that means: the
moment two tanks hold the same amount, the number of minutes at which two
phone plans cost the same.

Formulas from geometry or physics often have several variables. Keep all
but one fixed and you have an ordinary function again, which tells you
what happens when you change just that one.

# Misconceptions

- **output-unique-both-ways**: A function must give different outputs for different inputs → only each input needs exactly one output; outputs may repeat (x² gives 4 for 2 and −2).
- **extremum-is-largest-value**: A local maximum is the largest value of the whole function → it is larger than the values nearby; elsewhere f can be larger.
- **zero-is-y-intercept**: The zero of f is f(0) → a zero is an x with f(x) = 0; f(0) is the y-intercept.
- **intersection-x-only**: An intersection point is just the x-value → it is a point (x | y); find y by inserting x.
- **model-valid-everywhere**: A model formula holds for every x → it holds only on a sensible domain (e.g. until the ball hits the ground).
- **double-input-double-output**: Doubling a variable doubles the result → it depends on the power: doubling r in r²πh gives four times the volume.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "is-it-a-function",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-1"],
  "misconception": "output-unique-both-ways",
  "question": "Which two of these relationships are functions (each input has exactly one output)?",
  "options": [
    { "text": "Each student of a class → their date of birth", "correct": true, "feedback": "Yes: every student has exactly one date of birth, even if two share it." },
    { "text": "Each real number x → x²", "correct": true, "feedback": "Yes: one square for every x; that 2 and −2 share the value 4 is allowed." },
    { "text": "Each date → the students of the class born on that date", "correct": false, "feedback": "A date can belong to several students or to none." },
    { "text": "Each x between −1 and 1 → the y-values on the circle x² + y² = 1", "correct": false, "feedback": "x = 0 gives y = 1 and y = −1: two outputs." },
    { "text": "Each positive number → its square roots", "correct": false, "feedback": "4 has the square roots 2 and −2: two outputs." }
  ],
  "explanation": "Function: one output per input. Repeated outputs are fine, several outputs for one input are not."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "function-types",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-2", "fa-1-9"],
  "question": "Which two of these are exponential functions?",
  "options": [
    { "text": "f(x) = 3 · 2^x", "correct": true, "feedback": "Yes: x is in the exponent." },
    { "text": "f(x) = 0.5^x − 0.5^x / 2", "correct": true, "feedback": "Yes: it simplifies to 0.5 · 0.5^x." },
    { "text": "f(x) = 3 · x²", "correct": false, "feedback": "Here x is the base and the exponent is fixed: a power function." },
    { "text": "f(x) = 2 / x", "correct": false, "feedback": "2 · x^(−1) is a power function." },
    { "text": "f(x) = 2x + 3", "correct": false, "feedback": "A linear function." }
  ],
  "explanation": "Exponential: the variable is in the exponent; power: the variable is the base."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "table-to-graph",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-3", "fa-1-4"],
  "question": "A function has the table x = 0, 1, 2, 3 → f(x) = 1, 3, 7, 13. Which two statements about its graph fit the table?",
  "options": [
    { "text": "The graph passes the point (2|7)", "correct": true, "feedback": "Yes: read straight from the table." },
    { "text": "Between x = 0 and x = 3 the graph rises more and more steeply", "correct": true, "feedback": "Yes: the increases are 2, 4, 6." },
    { "text": "The graph is a straight line", "correct": false, "feedback": "A straight line would have equal increases." },
    { "text": "The graph crosses the y-axis at 0", "correct": false, "feedback": "f(0) = 1, so it crosses at y = 1." },
    { "text": "The graph passes the point (7|2)", "correct": false, "feedback": "x and y are swapped: the point is (2|7)." }
  ],
  "explanation": "Each table row is a point (x | f(x)); the differences tell how steep the graph is in each step."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "ball-height",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-4", "fa-1-7"],
  "question": "A ball is thrown upwards; its height in metres after t seconds is h(t) = −5t² + 20t + 1.5. How high is it after 2 seconds, in m?",
  "answer": 21.5,
  "tolerance": 0,
  "unit": "m",
  "explanation": "h(2) = −20 + 40 + 1.5 = 21.5 m."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cubic-properties",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-5"],
  "misconception": "extremum-is-largest-value",
  "question": "f(x) = x³ − 3x. Which two statements are true?",
  "options": [
    { "text": "f has a local maximum at x = −1", "correct": true, "feedback": "Yes: f rises up to x = −1 (value 2) and falls afterwards." },
    { "text": "The graph is point-symmetric about the origin", "correct": true, "feedback": "Yes: f(−x) = −x³ + 3x = −f(x)." },
    { "text": "2 is the largest value of f", "correct": false, "feedback": "Only locally: f(3) = 18 is larger. A local maximum compares with nearby values." },
    { "text": "f is increasing on the whole interval [−1; 1]", "correct": false, "feedback": "Between the extrema at −1 and 1 it falls from 2 to −2." },
    { "text": "f has exactly one zero", "correct": false, "feedback": "x(x² − 3) = 0 gives three zeros: 0 and ±√3." }
  ],
  "explanation": "f′(x) = 3x² − 3 = 0 at x = ±1; f(−1) = 2 (max), f(1) = −2 (min)."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "intersection-parabola-line",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-6"],
  "misconception": "intersection-x-only",
  "text": "The graphs of f(x) = x² and g(x) = x + 2 intersect in (−1|{{1}}) and ({{2}}|4).",
  "gaps": [
    { "answer": "1" },
    { "answer": "2" }
  ],
  "explanation": "x² = x + 2 → x² − x − 2 = 0 → x = −1 or x = 2; then y = f(x) gives 1 and 4."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "model-domain",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-7"],
  "misconception": "model-valid-everywhere",
  "question": "h(t) = −5t² + 20t + 1.5 describes the height in m of a ball until it lands. Which statement is sensible?",
  "options": [
    { "text": "The model is valid from t = 0 until h(t) = 0, at about t = 4.07 s", "correct": true, "feedback": "Yes: before the throw and after landing the formula says nothing about the ball." },
    { "text": "h(5) = −23.5 m means the ball is 23.5 m under the ground after 5 s", "correct": false, "feedback": "The ball has landed; the model is no longer valid." },
    { "text": "h(−1) = −23.5 m is the height one second before the throw", "correct": false, "feedback": "Before the throw the ball was in the hand; negative t is outside the model." },
    { "text": "The model is valid for all real t", "correct": false, "feedback": "Only for 0 ≤ t ≤ about 4.07." }
  ],
  "explanation": "A model has a domain set by the situation: here from the throw until the landing."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cylinder-volume",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-8"],
  "misconception": "double-input-double-output",
  "question": "The volume of a cylinder is V = r² · π · h. Which two statements are true?",
  "options": [
    { "text": "Doubling the radius r (same h) makes the volume four times as large", "correct": true, "feedback": "Yes: (2r)² = 4r²." },
    { "text": "Doubling the height h (same r) makes the volume twice as large", "correct": true, "feedback": "Yes: V is proportional to h." },
    { "text": "Doubling r and halving h leaves the volume unchanged", "correct": false, "feedback": "4 · ½ = 2: the volume doubles." },
    { "text": "Doubling the radius doubles the volume", "correct": false, "feedback": "r appears squared, so the factor is 4." },
    { "text": "For a fixed volume, a larger r needs a larger h", "correct": false, "feedback": "h = V / (r²π): a larger r needs a smaller h." }
  ],
  "explanation": "Keep all but one variable fixed: V is quadratic in r and linear in h."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "types-overview",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-9", "fa-1-5"],
  "question": "Which statement about the main function types is true?",
  "options": [
    { "text": "f(x) = 2 · 0.5^x has the x-axis as a horizontal asymptote and no zero", "correct": true, "feedback": "Yes: the values approach 0 but never reach it." },
    { "text": "Every polynomial of degree 3 has exactly two local extrema", "correct": false, "feedback": "At most two: x³ has none." },
    { "text": "f(x) = sin x has period π", "correct": false, "feedback": "The period of sin x is 2π." },
    { "text": "Every linear function has exactly one zero", "correct": false, "feedback": "A constant f(x) = 3 has none." }
  ],
  "explanation": "Know for each type: zeros, extrema, asymptotes, period, symmetry."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "vertical-line-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["fa-1-1", "fa-1-5"],
  "misconception": "zero-is-y-intercept",
  "question": "For g(x) = x² − 4, which statement is true?",
  "options": [
    { "text": "g has the zeros −2 and 2, and its graph crosses the y-axis at −4", "correct": true, "feedback": "Yes: g(x) = 0 at x = ±2, g(0) = −4." },
    { "text": "g has the zero −4", "correct": false, "feedback": "−4 is g(0), the y-intercept; zeros are x-values with g(x) = 0." },
    { "text": "g is not a function, because g(2) = g(−2)", "correct": false, "feedback": "Two inputs may share an output; each input still has one output." }
  ],
  "explanation": "Zero: g(x) = 0. y-intercept: g(0)."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "ball-times",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-1-4", "fa-1-6"],
  "question": "For the same ball, h(t) = −5t² + 20t + 1.5: at which later time t (in s) is it at 16.5 m on the way down?",
  "answer": 3,
  "tolerance": 0,
  "unit": "s",
  "explanation": "−5t² + 20t + 1.5 = 16.5 → t² − 4t + 3 = 0 → t = 1 (up) or t = 3 (down)."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "describe-graph",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["fa-1-5", "fa-1-7"],
  "question": "The temperature in a room over one day is modelled by T(t) (t in hours from midnight). It falls until 5 o'clock to 16 °C, rises until 15 o'clock to 23 °C and then falls again. Describe these facts using the words monotonicity, local minimum and local maximum, with units.",
  "rubric": [
    "T is decreasing on [0; 5] and increasing on [5; 15], decreasing afterwards",
    "Local minimum at t = 5 h with T = 16 °C",
    "Local maximum at t = 15 h with T = 23 °C",
    "Uses units (hours, °C) and says these are local, not necessarily global, extrema of the model"
  ],
  "sample_answer": "T is strictly decreasing from 0 to 5 h, increasing from 5 to 15 h and decreasing afterwards. At t = 5 h there is a local minimum of 16 °C, at t = 15 h a local maximum of 23 °C.",
  "explanation": "Properties of a graph are named with the interval or point where they hold and interpreted with units."
}
```

# Tutor notes

- Most FA 1 tasks are reading tasks. Let the learner describe a graph in words before any calculation.
- Use technology (GeoGebra) for sketches and intersections, but always ask for the meaning in the context.
- Past Matura tasks for FA 1: about 65 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area FA 1 (function concept).
