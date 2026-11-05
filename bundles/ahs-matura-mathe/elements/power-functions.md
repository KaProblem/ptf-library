---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/power-functions
title: Power functions
description: Power functions f(x) = a · x^z + b with whole-number exponents and the square root, their graphs and parameters, and indirect proportionality f(x) = a / x, as required for the Austrian AHS Matura (FA 3).
lang: en
levels: [highschool]
objectives:
  - id: fa-3-1
    text: Recognise power relationships given in words, tables, graphs or formulas and switch between these representations.
  - id: fa-3-2
    text: Find values and the parameters a and b from tables, graphs and formulas of power functions and interpret them in context.
  - id: fa-3-3
    text: Know the effect of the parameters a and b and interpret them in context.
  - id: fa-3-4
    text: Describe indirect proportionality as a power function f(x) = a / x = a · x⁻¹.
tags: [mathematics, functions, power-function, indirect-proportionality, square-root, matura, austria, fa-3]
about:
  - wikidata: Q1173515
    label: power function
duration_min: { highschool: 60 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich FA 3"
generated: { by: claude/opus, at: 2026-11-06T00:10:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a trip is 120 km long. At 60 km/h it takes 2 hours. How long does it take at 80 km/h, and what happens to the time when you double the speed?
- In a power function the variable is the base and the exponent is fixed: x², x³, 1/x, √x. Area grows with the square of the length, volume with the cube, and travel time with 1 / speed.
- Afterwards the learner can recognise power functions, read and interpret their parameters, and describe indirect proportionality. FA 3 is tested less than once per exam on its own, but power functions appear in many Analysis tasks.

# Core

A power function has the form f(x) = a · x^z + b with a fixed exponent z
(in the Matura: whole numbers and z = ½, the square root). a stretches the
graph vertically and mirrors it for a < 0; b shifts it up or down. Even
positive exponents give U-shaped graphs symmetric about the y-axis, odd
positive exponents S-shaped graphs symmetric about the origin, negative
exponents graphs with the axes as asymptotes. Indirect proportionality
means f(x) = a / x = a · x⁻¹: doubling x halves f(x), and the product
x · f(x) is the constant a.

# Key facts

- Forms: a · x², a · x³, a · x⁻¹ = a / x, a · x⁻², a · √x = a · x^(1/2), each possibly + b.
- Reading a: f(x) = a · x³ through (2 | 4) → 8a = 4 → a = 0.5.
- Even exponent: f(−x) = f(x); odd exponent: f(−x) = −f(x) (for b = 0).
- Negative exponent: no value at x = 0; the axes are asymptotes (for b = 0).
- √x is defined for x ≥ 0 and grows ever more slowly; √(4x) = 2√x.
- Scaling: f(x) = a · x² → f(2x) = 4 f(x); f(x) = a · x³ → f(2x) = 8 f(x); f(x) = a / x → f(2x) = f(x) / 2.
- Indirect proportionality: 6 workers need 10 days → 6 · 10 = 60 worker-days → 4 workers need 15 days. Travel time t(v) = 120 / v: 80 km/h → 1.5 h.
- Matura terms (German): Potenzfunktion, Exponent, indirekte Proportionalität, Hyperbel, Wurzelfunktion. Typical Teil-1 formats: Zuordnung (graphs to formulas), Lückentext (effect of a and b), 2 aus 5 (which situations are indirectly proportional).

# Level: highschool

<!-- ptf:text v1 -->

Start with the trip. Time = distance / speed, so t(v) = 120 / v. At 60 km/h
that is 2 hours, at 80 km/h 1.5 hours, at 120 km/h 1 hour. Doubling the
speed halves the time: that is indirect proportionality, and the product
speed · time stays 120.

Other power functions describe scaling. Double the side of a square and
the area becomes four times as large, because A = s². Double the side of a
cube and the volume becomes eight times as large. The exponent tells you
the factor: 2^z.

In f(x) = a · x^z + b, a stretches (and with a minus sign mirrors) the
graph, and b moves it up or down. To find a from a point, insert the point
and solve.

# Misconceptions

- **double-double**: In a power function doubling x doubles f(x) → it multiplies f(x) by 2^z: by 4 for x², by ½ for 1/x.
- **inverse-is-negative-slope**: Indirectly proportional means "the more, the less" → it means the product stays constant; f(x) = 10 − x also decreases but is not indirect proportionality.
- **power-equals-exponential**: x² and 2^x are the same type → in x² the variable is the base, in 2^x the exponent.
- **hyperbola-zero**: f(x) = 1/x is 0 at x = 0 → it is not defined there; the graph approaches the y-axis.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "trip-time",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "inverse-is-negative-slope",
  "question": "A trip is 120 km long. How many hours does it take at 80 km/h? Guess first how it compares with the 2 hours at 60 km/h.",
  "answer": 1.5,
  "tolerance": 0,
  "unit": "h",
  "explanation": "t(v) = 120 / v = 120 / 80 = 1.5 h; speed · time stays 120."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "indirect-situations",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-3-4", "fa-3-1"],
  "misconception": "inverse-is-negative-slope",
  "question": "Which two relationships are indirectly proportional?",
  "options": [
    { "text": "Number of people sharing a € 600 prize equally → each person's share", "correct": true, "feedback": "Yes: share = 600 / n." },
    { "text": "Speed → time for a fixed distance of 120 km", "correct": true, "feedback": "Yes: t = 120 / v." },
    { "text": "Minutes of a 60-minute film already watched → minutes left", "correct": false, "feedback": "60 − x decreases, but the product is not constant." },
    { "text": "Side length of a square → its area", "correct": false, "feedback": "A = s² grows with s." },
    { "text": "Number of identical books → their total price", "correct": false, "feedback": "That is direct proportionality." }
  ],
  "explanation": "Indirectly proportional: f(x) = a / x, the product x · f(x) is constant."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "parameter-from-point",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-3-2"],
  "text": "The graph of f(x) = a · x³ passes through (2 | 4). Then a = {{1}} and f(4) = {{2}}.",
  "gaps": [
    { "answer": "0.5", "accepted": ["0,5", "1/2"] },
    { "answer": "32" }
  ],
  "explanation": "8a = 4 → a = 0.5; f(4) = 0.5 · 64 = 32 (doubling x multiplies by 2³ = 8)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "scaling-factor",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-3-3"],
  "misconception": "double-double",
  "question": "f(x) = a · x² with a > 0. By which factor does f(x) change when x is tripled?",
  "options": [
    { "text": "9", "correct": true, "feedback": "Yes: (3x)² = 9x²." },
    { "text": "3", "correct": false, "feedback": "That would be true for a linear function." },
    { "text": "6", "correct": false, "feedback": "The exponent is applied to the factor: 3², not 3 · 2." },
    { "text": "It depends on a", "correct": false, "feedback": "a cancels: a · 9x² / (a · x²) = 9." }
  ],
  "explanation": "For a · x^z, multiplying x by k multiplies f(x) by k^z."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "parameter-effect-power",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-3-3", "fa-3-1"],
  "misconception": "hyperbola-zero",
  "question": "Which two statements are true?",
  "options": [
    { "text": "The graph of g(x) = −2x² + 3 is a parabola opening downwards with highest point (0 | 3)", "correct": true, "feedback": "Yes: a = −2 mirrors it, b = 3 moves it up." },
    { "text": "f(x) = 4 / x is not defined at x = 0", "correct": true, "feedback": "Yes: division by 0; the y-axis is an asymptote." },
    { "text": "f(x) = 4 / x has the value 0 at x = 0", "correct": false, "feedback": "4 / 0 is not defined." },
    { "text": "f(x) = x³ is symmetric about the y-axis", "correct": false, "feedback": "Odd exponent: symmetric about the origin, f(−x) = −f(x)." },
    { "text": "f(x) = 2^x is a power function", "correct": false, "feedback": "The variable is in the exponent: exponential." }
  ],
  "explanation": "a stretches and mirrors, b shifts; negative exponents exclude x = 0."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "workers-days",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-3-4"],
  "question": "6 workers need 10 days for a job. How many days do 4 workers need at the same pace?",
  "answer": 15,
  "tolerance": 0,
  "unit": "days",
  "explanation": "The job is 6 · 10 = 60 worker-days; 60 / 4 = 15 days."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "power-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["fa-3-1", "fa-3-3"],
  "misconception": "power-equals-exponential",
  "question": "Which formula describes the area A of a circle as a function of its radius r, and what type is it?",
  "options": [
    { "text": "A(r) = π · r², a power function", "correct": true, "feedback": "Yes: r is the base, the exponent 2 is fixed." },
    { "text": "A(r) = π · 2^r, an exponential function", "correct": false, "feedback": "The radius is squared, not used as an exponent." },
    { "text": "A(r) = 2π · r, a linear function", "correct": false, "feedback": "That is the circumference." }
  ],
  "explanation": "Areas grow with the square of lengths."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-scaling",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["fa-3-3", "fa-3-2"],
  "question": "A pizza with 30 cm diameter costs € 10, one with 40 cm costs € 15. Which one gives more pizza per euro? Use that the area is a power function of the diameter.",
  "rubric": [
    "Area A = π · (d/2)², proportional to d²",
    "The 40 cm pizza has (40/30)² ≈ 1.78 times the area",
    "Its price is only 1.5 times as high",
    "So the 40 cm pizza gives more pizza per euro"
  ],
  "sample_answer": "The area grows with the square of the diameter: (40/30)² ≈ 1.78, so the large pizza has about 78 % more area. It costs only 50 % more, so it gives more pizza per euro (about 84 cm² against 71 cm² per euro).",
  "explanation": "Scaling a length by k scales an area by k²."
}
```

# Tutor notes

- Link to geometry: areas (k²) and volumes (k³) make the exponents tangible.
- Contrast x² with 2^x whenever both appear.
- Past Matura tasks for FA 3: about 12 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area FA 3 (power functions).
