---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/derivative-functions
title: Derivative and antiderivative
description: The derivative function and antiderivatives, how the graphs of f, f′ and F are connected, and how f′ and f″ describe monotonicity, extrema, curvature and inflection points, as required for the Austrian AHS Matura (AN 3).
lang: en
levels: [highschool]
objectives:
  - id: an-3-1
    text: Know the terms derivative function and antiderivative and use them to describe functions, also in context.
  - id: an-3-2
    text: Recognise and describe how the graphs of a function and its derivative (or a function and an antiderivative) are connected.
  - id: an-3-3
    text: Describe monotonicity, local extrema, curvature and inflection points with the help of the first and second derivative.
tags: [mathematics, calculus, derivative, antiderivative, extrema, curvature, matura, austria, an-3]
about:
  - wikidata: Q29175
    label: derivative
  - wikidata: Q114326
    label: antiderivative
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AN 3"
generated: { by: claude/opus, at: 2026-11-05T21:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Picture a mountain road. Where on the road is it flat for a moment? At the tops and at the bottoms of the valleys, and sometimes on a shoulder where it climbs again afterwards.
- The derivative f′ is a new function that tells, for every x, how steep f is. Reading one graph from the other is the core skill of AN 3: where f′ is positive f rises, where f′ is zero f is flat, where f′ is largest f is steepest.
- Afterwards the learner can find and classify extrema and inflection points, decide curvature, connect the graphs of f, f′ and an antiderivative F, and interpret them in context. AN 3 brings about one and a half Teil-1 tasks per exam and is central in Teil 2.

# Core

The derivative function f′ assigns to every x the slope of f at x. Where
f′(x) > 0, f is increasing; where f′(x) < 0, f is decreasing. A local
extremum can only be where f′(x) = 0 (for a smooth f): if f′ changes from
+ to −, it is a maximum, from − to +, a minimum; if it does not change
sign, it is a saddle point. The second derivative f″ tells how the slope
changes: f″ > 0 means the graph curves to the left (convex, like a cup),
f″ < 0 to the right; where f″ changes sign is an inflection point, where f
is steepest or least steep locally. An antiderivative F of f is a function
with F′ = f; F rises where f is positive. Antiderivatives differ only by a
constant: F + C. In context, if s is a position, s′ = v is the speed and
v′ = a the acceleration; going back, s is an antiderivative of v.

# Key facts

- f′(x) > 0 on an interval → f strictly increasing there; f′(x) < 0 → decreasing.
- Extremum test: f′(x₀) = 0 and f″(x₀) < 0 → local maximum; f″(x₀) > 0 → local minimum; or check the sign change of f′.
- f′(x₀) = 0 does not guarantee an extremum: f(x) = x³ has f′(0) = 0 but rises on both sides (saddle point).
- Inflection point: f″ changes sign; f′ has a local extremum there.
- Worked example f(x) = x³ − 6x² + 9x + 1: f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3); f″(x) = 6x − 12. Maximum (1 | 5), minimum (3 | 1), inflection point (2 | 3); right-curved for x < 2, left-curved for x > 2; f′(4) = 9.
- Graph of f′ from f: zeros of f′ at the extrema of f; f′ is highest where f is steepest upwards; extrema of f′ at the inflection points of f.
- Antiderivatives: F′ = f. Of f(x) = 2x: x², x² + 5, x² − 3, … Power rule backwards: ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C (n ≠ −1).
- Graph of F from f: F increases where f > 0, has an extremum where f changes sign, an inflection point where f has an extremum.
- Context: s(t) position → s′(t) = v(t) speed → v′(t) = a(t) acceleration. K(x) cost → K′(x) marginal cost.
- Matura terms (German): Ableitungsfunktion, Stammfunktion, streng monoton steigend / fallend, lokales Maximum / Minimum, Sattelpunkt, Linkskrümmung (positiv gekrümmt), Rechtskrümmung (negativ gekrümmt), Wendestelle, Wendepunkt. Typical Teil-1 formats: Zuordnung (graphs of f to graphs of f′), 2 aus 5 (statements about f from f′), Lückentext.

# Level: highschool

<!-- ptf:text v1 -->

Start with a picture of f and walk along it from left to right. Write down
for every part whether you go uphill (f′ positive), downhill (f′ negative)
or are on a flat spot (f′ = 0). That list is already the sign pattern of the
derivative, and from it you can sketch f′.

To find extrema, solve f′(x) = 0 and look at what f′ does around each
solution. If it goes from + to −, you went up and then down: a maximum.
From − to +: a minimum. If it keeps its sign, you only paused on a shoulder.

The second derivative tells you how the road bends. Cup-shaped is left
curvature (f″ > 0), cap-shaped is right curvature (f″ < 0). The inflection
point is where the bend changes; there the road is locally steepest.

An antiderivative goes the other way: you know how steep something is and
want the thing itself. If v(t) is a speed, any function s with s′ = v is a
possible position; they differ only by where you started.

# Misconceptions

- **zero-derivative-extremum**: f′(x₀) = 0 always means an extremum → also check the sign change; x³ has a saddle point at 0.
- **f-prime-follows-f**: The graph of f′ looks like the graph of f, just lower → f′ shows slopes: where f has a maximum, f′ crosses zero.
- **positive-f-rising**: f is increasing where f(x) > 0 → f increases where f′(x) > 0; the values themselves can be negative.
- **curvature-is-direction**: Left curvature means the graph goes to the left / decreases → it means the slope increases (cup shape), whether f rises or falls.
- **one-antiderivative**: An antiderivative is unique → F + C is an antiderivative for every constant C.
- **inflection-is-flat**: At an inflection point the graph is flat → it is where the curvature changes; the slope there is usually not 0.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "road-flat",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "zero-derivative-extremum",
  "question": "f(x) = x³. At x = 0 the slope is 0. What is there?",
  "options": [
    { "text": "A saddle point: f rises before and after it", "correct": true, "feedback": "Yes: f′(x) = 3x² is never negative, so f never falls." },
    { "text": "A local minimum", "correct": false, "feedback": "Left of 0 the values are negative, so f(0) = 0 is not the smallest nearby." },
    { "text": "A local maximum", "correct": false, "feedback": "Right of 0 the values are positive, so f(0) is not the largest nearby." }
  ],
  "explanation": "A zero of f′ without sign change is not an extremum."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-antiderivatives",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-1"],
  "misconception": "one-antiderivative",
  "question": "Which two functions are antiderivatives of f(x) = 2x?",
  "options": [
    { "text": "F(x) = x²", "correct": true, "feedback": "Yes: F′(x) = 2x." },
    { "text": "F(x) = x² + 5", "correct": true, "feedback": "Yes: a constant disappears when you differentiate." },
    { "text": "F(x) = 2", "correct": false, "feedback": "That is the derivative of f, not an antiderivative." },
    { "text": "F(x) = 2x²", "correct": false, "feedback": "Its derivative is 4x." },
    { "text": "F(x) = x² + x", "correct": false, "feedback": "Its derivative is 2x + 1." }
  ],
  "explanation": "F is an antiderivative of f if F′ = f; all antiderivatives differ by a constant."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "motion-context",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-1"],
  "question": "s(t) is the distance in m a train has travelled after t s. Which statement is true?",
  "options": [
    { "text": "s′ is the speed in m/s, and s is an antiderivative of the speed", "correct": true, "feedback": "Yes: the derivative of position is speed, so position is an antiderivative of speed." },
    { "text": "s′ is the acceleration in m/s²", "correct": false, "feedback": "The acceleration is the derivative of the speed, s″." },
    { "text": "The speed is an antiderivative of s", "correct": false, "feedback": "It is the other way round: s is an antiderivative of the speed." },
    { "text": "s′(t) = 0 means the train is at the start", "correct": false, "feedback": "It means the train stands still at that moment, wherever it is." }
  ],
  "explanation": "s′ = v, v′ = a; going backwards, s is an antiderivative of v."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "extrema-from-derivative",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-2", "an-3-3"],
  "misconception": "f-prime-follows-f",
  "text": "The derivative of a function f is f′(x) = (x − 1)(x − 4). Then f has a local maximum at x = {{1}} and a local minimum at x = {{2}}.",
  "gaps": [
    { "answer": "1" },
    { "answer": "4" }
  ],
  "explanation": "f′ is positive for x < 1, negative between 1 and 4, positive for x > 4: + to − at 1 (max), − to + at 4 (min)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "graph-of-antiderivative",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-2"],
  "misconception": "positive-f-rising",
  "question": "f(x) = 4 − x² and F is an antiderivative of f. Which two statements are true?",
  "options": [
    { "text": "F is increasing on [−2; 2]", "correct": true, "feedback": "Yes: there f(x) ≥ 0, and f is the slope of F." },
    { "text": "F has a local maximum at x = 2", "correct": true, "feedback": "Yes: f changes from positive to negative at 2." },
    { "text": "F has a local maximum at x = 0", "correct": false, "feedback": "At 0, f is largest, so F is steepest there: an inflection point of F." },
    { "text": "F is decreasing on [−2; 2] because f decreases on [0; 2]", "correct": false, "feedback": "F decreases where f is negative, not where f decreases." },
    { "text": "F(x) = −2x for every antiderivative", "correct": false, "feedback": "−2x is the derivative of f. An antiderivative is 4x − x³/3 + C." }
  ],
  "explanation": "f is the slope of F: F rises where f > 0 and has extrema where f changes sign."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "curve-sketch",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-3"],
  "title": "Extrema and inflection point",
  "intro": "f(x) = x³ − 6x² + 9x + 1.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Zeros of f′", "3x² − 12x + 9 = 0, smaller solution", "1"],
    ["Zeros of f′", "larger solution", "3"],
    ["f″ at x = 1", "6 · 1 − 12", "−6"],
    ["Maximum value", "f(1)", "5"],
    ["Minimum value", "f(3)", "1"],
    ["Inflection point", "f″(x) = 6x − 12 = 0", "2"]
  ],
  "result": { "label": "Inflection point", "value": "(2 | 3)" },
  "explanation": "f″(1) < 0 → maximum at (1 | 5); f″(3) = 6 > 0 → minimum at (3 | 1); f″ changes sign at 2."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "curvature",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-3"],
  "misconception": "curvature-is-direction",
  "question": "For a function f, f′(x) < 0 and f″(x) > 0 on the interval [2; 5]. What does the graph do there?",
  "options": [
    { "text": "It falls, and less and less steeply (left curvature)", "correct": true, "feedback": "Yes: negative slope that increases towards 0." },
    { "text": "It falls more and more steeply", "correct": false, "feedback": "That would need f″ < 0: the slope getting more negative." },
    { "text": "It rises with left curvature", "correct": false, "feedback": "f′ < 0 means it falls." },
    { "text": "It has an inflection point in [2; 5]", "correct": false, "feedback": "f″ keeps its sign, so the curvature does not change." }
  ],
  "explanation": "f′ gives the direction, f″ the curvature."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "tangent-slope",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-1", "an-3-3"],
  "question": "f(x) = x³ − 6x² + 9x + 1. What is the slope of the tangent at x = 4?",
  "answer": 9,
  "tolerance": 0,
  "explanation": "f′(4) = 3 · 16 − 12 · 4 + 9 = 9."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "derivative-graph-reading",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-3-2"],
  "misconception": "inflection-is-flat",
  "question": "The derivative f′ of a function has a local maximum at x = 2, and f′(2) = 3. What does that mean for f?",
  "options": [
    { "text": "f has an inflection point at x = 2 and rises there with slope 3", "correct": true, "feedback": "Yes: where f′ is extreme, the curvature of f changes; f′(2) = 3 is the slope there." },
    { "text": "f has a local maximum at x = 2", "correct": false, "feedback": "A maximum of f would need f′(2) = 0 with a sign change." },
    { "text": "f(2) = 3", "correct": false, "feedback": "3 is the slope of f at 2, not its value." },
    { "text": "f is flat at x = 2", "correct": false, "feedback": "The slope there is 3, the steepest in the neighbourhood." }
  ],
  "explanation": "Extrema of f′ are inflection points of f."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "extremum-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["an-3-3"],
  "misconception": "zero-derivative-extremum",
  "question": "For a function f, f′(5) = 0 and f″(5) = −2. What follows?",
  "options": [
    { "text": "f has a local maximum at x = 5", "correct": true, "feedback": "Yes: flat and curved to the right, like the top of a hill." },
    { "text": "f has a local minimum at x = 5", "correct": false, "feedback": "A minimum needs f″(5) > 0 (cup shape)." },
    { "text": "f has an inflection point at x = 5", "correct": false, "feedback": "An inflection point needs f″ to change sign, typically f″ = 0." }
  ],
  "explanation": "f′(x₀) = 0 and f″(x₀) < 0 → local maximum."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "describe-from-derivative",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["an-3-2", "an-3-3"],
  "question": "The water level of a reservoir is W(t) (in m, t in days). Its derivative W′ is positive from day 0 to day 12, zero on day 12, negative from day 12 to day 30, and has its smallest value on day 20. Describe what happens to the water level, using the words increasing, maximum and inflection point.",
  "rubric": [
    "The water level rises until day 12 and falls afterwards until day 30",
    "On day 12 the water level has a (local) maximum",
    "On day 20 it falls fastest: an inflection point of W",
    "Units: W in m, W′ in m per day"
  ],
  "sample_answer": "W increases from day 0 to day 12, reaches its highest level on day 12 and decreases from day 12 to day 30. On day 20 the level falls fastest (W′ is smallest), so W has an inflection point there. W′ is measured in metres per day.",
  "explanation": "Sign of W′ → rising or falling; zeros with sign change → extrema; extrema of W′ → inflection points."
}
```

# Tutor notes

- Matching graphs of f and f′ is the most frequent Teil-1 format here: have the learner describe the sign pattern of f′ aloud before choosing.
- Distinguish "f is negative" from "f is decreasing" every time it comes up.
- Past Matura tasks for AN 3: about 55 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AN 3 (derivative and antiderivative).
