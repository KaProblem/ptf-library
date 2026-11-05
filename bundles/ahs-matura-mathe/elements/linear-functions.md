---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/linear-functions
title: Linear functions
description: Linear relationships f(x) = k · x + d in words, tables, graphs and formulas, the meaning of slope k and intercept d, the constant change per step, direct proportionality and when a linear model fits, as required for the Austrian AHS Matura (FA 2).
lang: en
levels: [highschool]
objectives:
  - id: fa-2-1
    text: Recognise linear relationships given in words, tables, graphs or formulas, and switch between these representations.
  - id: fa-2-2
    text: Read values and the parameters k and d from tables, graphs and formulas, and interpret them in context.
  - id: fa-2-3
    text: Explain what k and d do to the graph and what they mean in different contexts.
  - id: fa-2-4
    text: Use the key properties f(x + 1) = f(x) + k and k = (f(x₂) − f(x₁)) / (x₂ − x₁), and interpret them in context.
  - id: fa-2-5
    text: Judge whether a linear function is an appropriate description of a situation.
  - id: fa-2-6
    text: Describe direct proportionality as a linear function f(x) = k · x.
tags: [mathematics, functions, linear-function, slope, proportionality, matura, austria, fa-2]
about:
  - wikidata: Q188597
    label: linear function
duration_min: { highschool: 90 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich FA 2"
generated: { by: claude/opus, at: 2026-11-05T19:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a taxi charges € 4 to start and € 2.20 per kilometre. What does a 10 km ride cost? And if you know a ride cost € 26, how long was it?
- Anything that changes by the same amount for every equal step is linear: fixed fee plus price per unit, a tank draining at a steady rate, a candle burning down. Two numbers describe it completely.
- Afterwards the learner can read k and d from any representation, explain them in context, compute slopes from two points, tell proportional from merely linear, and judge whether a straight line is a sensible model. FA 2 brings about two Teil-1 tasks per exam.

# Core

A linear function has the form f(x) = k · x + d. d = f(0) is where the
graph crosses the y-axis; in context it is the start value or the fixed
part. k is the slope: every step of 1 in x changes f by k, so
f(x + 1) = f(x) + k, and for any two points
k = (f(x₂) − f(x₁)) / (x₂ − x₁). k > 0 means rising, k < 0 falling, k = 0
constant. The graph is a straight line. If d = 0, f(x) = k · x is direct
proportionality: doubling x doubles f(x), and the line passes through the
origin. A linear model fits a situation when equal steps really produce
equal changes; outside that range it can give nonsense.

# Key facts

- f(x) = k · x + d; d = f(0) (y-intercept), k = slope = change of f per unit of x.
- From two points: (1|5) and (4|11) → k = (11 − 5) / (4 − 1) = 2, d = 5 − 2 · 1 = 3, f(x) = 2x + 3.
- Reading a graph: go 1 to the right, read how far up (k > 0) or down (k < 0); or use a slope triangle with any two grid points.
- Table test: equal x-steps and equal differences in f → linear. Equal quotients would be exponential instead.
- Units: k has the unit of f per unit of x (€ per km, litres per minute); d has the unit of f.
- Taxi: f(x) = 2.2x + 4 (x in km, f in €); f(10) = € 26; € 26 ↔ x = 10 km.
- Zero (Nullstelle): f(x) = 0 at x = −d / k (for k ≠ 0). A 60-litre tank losing 7.5 l per hour is empty after 60 / 7.5 = 8 hours.
- Parallel lines have the same k; changing d shifts the line up or down; changing k turns it around (0 | d).
- Direct proportionality: f(x) = k · x, through (0|0); the quotient f(x) / x is constant. 3 kg cost € 7.50 → k = € 2.50 per kg.
- Matura terms (German): lineare Funktion, Steigung k, Achsenabschnitt d, Steigungsdreieck, direkte Proportionalität, Nullstelle, „Angemessenheit“ eines linearen Modells. Typical Teil-1 formats: Zuordnung (graphs to formulas), 2 aus 5, Lückentext (k and d in context), offen.

# Level: highschool

<!-- ptf:text v1 -->

Start with the taxi: € 4 to start, € 2.20 per kilometre. After 0 km you pay
4, after 1 km 6.20, after 2 km 8.40: each kilometre adds the same 2.20. That
is all a linear function is. The fixed part is d, the amount per step is k:
f(x) = 2.2x + 4.

On the graph, d is where the line crosses the y-axis, and k tells you how
much it goes up when you move 1 to the right. If you only have two points,
divide the change in height by the change in width: that is k. Then put
one point in to find d.

Proportional is the special case d = 0: no fixed part, so twice as much x
gives twice as much f. The taxi is linear but not proportional: 20 km do
not cost twice as much as 10 km.

Before you use a straight line as a model, ask whether every step really
adds the same amount. A child's height, a population or a cooling cup of
tea usually do not.

# Misconceptions

- **linear-is-proportional**: Every linear function is proportional (twice x gives twice f) → only if d = 0; the taxi with a € 4 start fee is linear but not proportional.
- **k-from-one-point**: k = f(x) / x → that only works when d = 0; in general k = (f(x₂) − f(x₁)) / (x₂ − x₁).
- **d-is-zero-of-f**: d is where the graph crosses the x-axis → d is where it crosses the y-axis; the zero is at x = −d / k.
- **steeper-means-larger-d**: A larger d makes the line steeper → d shifts the line; only k changes the steepness.
- **negative-k-means-negative-values**: k < 0 means f(x) is negative → it means f decreases; the values can still be positive.
- **linear-forever**: A linear trend can be extended without limit → many real processes stop or bend (a tank cannot go below empty).

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "taxi-distance",
  "level": "highschool",
  "purpose": "warmup",
  "question": "A taxi charges € 4 to start and € 2.20 per km. A ride cost € 26. How many km was it?",
  "answer": 10,
  "tolerance": 0,
  "unit": "km",
  "explanation": "26 = 2.2x + 4 → 2.2x = 22 → x = 10 km."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-are-linear",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-1"],
  "question": "The x-values are 0, 1, 2, 3 in every table. Which two tables can belong to a linear function?",
  "options": [
    { "text": "7, 4, 1, −2", "correct": true, "feedback": "Yes: the values go down by 3 each step." },
    { "text": "2.5, 2.5, 2.5, 2.5", "correct": true, "feedback": "Yes: k = 0, a constant function is linear." },
    { "text": "1, 2, 4, 8", "correct": false, "feedback": "The differences are 1, 2, 4: not constant. The values double, so this is exponential." },
    { "text": "0, 1, 4, 9", "correct": false, "feedback": "Differences 1, 3, 5: these are squares." },
    { "text": "3, 5, 8, 12", "correct": false, "feedback": "Differences 2, 3, 4: not constant." }
  ],
  "explanation": "With equal x-steps, a table is linear when the differences of consecutive values are equal."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "two-points",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-2", "fa-2-4"],
  "misconception": "k-from-one-point",
  "text": "The graph of the linear function f passes through (1|5) and (4|11). Then k = {{1}} and d = {{2}}.",
  "gaps": [
    { "answer": "2" },
    { "answer": "3" }
  ],
  "explanation": "k = (11 − 5) / (4 − 1) = 2; 5 = 2 · 1 + d → d = 3."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "tank-context",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-2", "fa-2-3"],
  "misconception": "negative-k-means-negative-values",
  "question": "V(t) = 60 − 7.5t is the fuel in a generator's tank in litres, t hours after it starts. Which two statements are true?",
  "options": [
    { "text": "The tank holds 60 litres at the start", "correct": true, "feedback": "Yes: d = V(0) = 60." },
    { "text": "The generator uses 7.5 litres per hour", "correct": true, "feedback": "Yes: k = −7.5 litres per hour, the minus says the fuel decreases." },
    { "text": "After 10 hours the tank holds −15 litres", "correct": false, "feedback": "The model only holds until the tank is empty after 8 hours." },
    { "text": "The tank is empty after 7.5 hours", "correct": false, "feedback": "V(t) = 0 at t = 60 / 7.5 = 8 hours." },
    { "text": "Because k is negative, the tank holds a negative amount", "correct": false, "feedback": "k < 0 means the amount decreases; it stays positive until t = 8." }
  ],
  "explanation": "d is the start value, k the change per hour; the model is valid for 0 ≤ t ≤ 8."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "parameter-effect",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-3"],
  "misconception": "steeper-means-larger-d",
  "question": "f(x) = 2x + 1. How does the graph of g(x) = 2x + 4 differ from that of f?",
  "options": [
    { "text": "It is f shifted 3 units up, parallel to f", "correct": true, "feedback": "Yes: same k, d larger by 3." },
    { "text": "It is steeper than f", "correct": false, "feedback": "The steepness is k, and k is 2 for both." },
    { "text": "It crosses f at x = 3", "correct": false, "feedback": "Parallel lines never cross: 2x + 1 = 2x + 4 has no solution." },
    { "text": "It is f shifted 3 units to the right", "correct": false, "feedback": "Shifting to the right would lower the line; here every value is 3 higher." }
  ],
  "explanation": "d moves the line up or down; k decides how steep it is."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "slope-from-change",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-4"],
  "question": "A linear function satisfies f(2) = 9 and f(7) = −1. What is f(8)?",
  "answer": -3,
  "tolerance": 0,
  "explanation": "k = (−1 − 9) / (7 − 2) = −2; f(8) = f(7) + k = −1 − 2 = −3."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "constant-change",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-4"],
  "question": "For a linear function f(x) = k · x + d, which statement holds for every x?",
  "options": [
    { "text": "f(x + 1) − f(x) = k", "correct": true, "feedback": "Yes: one step to the right changes f by k." },
    { "text": "f(x + 1) = k · f(x)", "correct": false, "feedback": "That is the property of exponential functions." },
    { "text": "f(2x) = 2 · f(x)", "correct": false, "feedback": "Only for d = 0 (proportional)." },
    { "text": "f(x + 1) − f(x) = d", "correct": false, "feedback": "d is the value at 0; the change per step is k." }
  ],
  "explanation": "Equal steps in x, equal change k in f."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "proportional",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-6"],
  "misconception": "linear-is-proportional",
  "question": "Which two situations are directly proportional?",
  "options": [
    { "text": "Price of apples at € 2.50 per kg and their mass", "correct": true, "feedback": "Yes: P(m) = 2.5 · m, no fixed part." },
    { "text": "Distance covered at a constant 90 km/h and the driving time", "correct": true, "feedback": "Yes: s(t) = 90 · t." },
    { "text": "Taxi fare with € 4 start fee and the distance", "correct": false, "feedback": "Linear, but the start fee means 0 km already cost € 4." },
    { "text": "Phone bill of € 10 per month plus € 0.05 per minute and the minutes", "correct": false, "feedback": "Linear with d = 10, so not proportional." },
    { "text": "The side length of a square and its area", "correct": false, "feedback": "A = s² is not linear at all." }
  ],
  "explanation": "Proportional means f(x) = k · x: the line passes through the origin."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "linear-model-fit",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-5"],
  "misconception": "linear-forever",
  "question": "For which situation is a linear model the most appropriate?",
  "options": [
    { "text": "The height of a burning candle that loses 1.2 cm per hour, until it is used up", "correct": true, "feedback": "Yes: the same amount per hour, and the range is limited to the burning time." },
    { "text": "The number of bacteria in a dish that doubles every hour", "correct": false, "feedback": "Doubling multiplies: exponential." },
    { "text": "The height of a ball thrown upwards over time", "correct": false, "feedback": "It slows down and comes back: quadratic." },
    { "text": "The temperature of hot tea left in a room over several hours", "correct": false, "feedback": "It cools fast at first and then slowly: not equal changes per hour." }
  ],
  "explanation": "Linear fits when equal steps bring equal changes, within a stated range."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "zero-of-line",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-2-2"],
  "misconception": "d-is-zero-of-f",
  "question": "Where does the graph of f(x) = −0.5x + 3 cross the x-axis? Give x.",
  "answer": 6,
  "tolerance": 0,
  "explanation": "−0.5x + 3 = 0 → x = 6. The y-axis is crossed at d = 3."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "graph-reading-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["fa-2-1", "fa-2-2"],
  "misconception": "k-from-one-point",
  "question": "A line passes through (0|−2) and (3|4). Which formula belongs to it?",
  "options": [
    { "text": "f(x) = 2x − 2", "correct": true, "feedback": "Yes: k = (4 − (−2)) / 3 = 2, d = −2." },
    { "text": "f(x) = −2x + 2", "correct": false, "feedback": "The line rises from −2 to 4, so k is positive, and d = f(0) = −2." },
    { "text": "f(x) = (4/3)x − 2", "correct": false, "feedback": "4/3 divides the end height by the width; the change in height is 4 − (−2) = 6." }
  ],
  "explanation": "k = change in height / change in width; d = f(0)."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "phone-plans",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["fa-2-3", "fa-2-2"],
  "question": "Plan A costs € 12 per month and € 0.02 per minute; plan B costs € 5 per month and € 0.09 per minute. Write both as linear functions, say what k and d mean, and find from how many minutes plan A is cheaper.",
  "rubric": [
    "A(x) = 0.02x + 12 and B(x) = 0.09x + 5 with x in minutes, values in €",
    "d is the monthly fee, k the price per minute",
    "Equal at 0.07x = 7 → x = 100 minutes",
    "Above 100 minutes per month plan A is cheaper"
  ],
  "sample_answer": "A(x) = 0.02x + 12, B(x) = 0.09x + 5 (x minutes, € per month). d is the fixed monthly fee, k the price per minute. They are equal when 0.02x + 12 = 0.09x + 5, so 0.07x = 7 and x = 100. With more than 100 minutes a month, A is cheaper.",
  "explanation": "Intersections of two linear functions answer \"from when is one cheaper?\"."
}
```

# Tutor notes

- Ask for the unit of k in every context question; it turns a number into an interpretation ("€ per km").
- Matura tasks often show graphs on a grid: train slope triangles with integer grid points.
- Past Matura tasks for FA 2: about 75 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area FA 2 (linear functions).
