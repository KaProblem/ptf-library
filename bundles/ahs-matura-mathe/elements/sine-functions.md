---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/sine-functions
title: Sine and cosine functions
description: General sine functions f(x) = a · sin(b · x), the effect of the parameters a and b, periodicity in contexts, cos x = sin(x + π/2) and the derivatives of sine and cosine, as required for the Austrian AHS Matura (FA 6).
lang: en
levels: [highschool]
objectives:
  - id: fa-6-1
    text: Recognise relationships of the form f(x) = a · sin(b · x) in graphs and formulas as general sine functions and switch between these representations.
  - id: fa-6-2
    text: Find values and value pairs from graphs and formulas of general sine functions and interpret them in context.
  - id: fa-6-3
    text: Know the effect of the parameters a and b and interpret them in context.
  - id: fa-6-4
    text: Know periodicity as the characteristic property and interpret it in context.
  - id: fa-6-5
    text: Know that cos(x) = sin(x + π/2).
  - id: fa-6-6
    text: Know that (sin x)′ = cos x and (cos x)′ = −sin x.
tags: [mathematics, functions, sine, cosine, periodic-function, matura, austria, fa-6]
about:
  - wikidata: Q13647261
    label: sine and cosine
duration_min: { highschool: 75 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich FA 6"
generated: { by: claude/opus, at: 2026-11-05T23:55:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Think of a seat on a Ferris wheel: up, down, up, down, always in the same rhythm. What would a graph of its height over time look like?
- Anything that repeats regularly, tides, sound, alternating current, the seasons, is described by sine and cosine. Two numbers set the shape: how far it swings (amplitude) and how fast it repeats (period).
- Afterwards the learner can read amplitude and period from a graph or formula, interpret them in context, and use cos x = sin(x + π/2) and the derivatives of sine and cosine. FA 6 brings almost one Teil-1 task per exam.

# Core

The general sine function is f(x) = a · sin(b · x) with x in radians. a is
the amplitude: the graph swings between −a and a (for a > 0). b sets the
speed: the period, the length after which the graph repeats, is
p = 2π / b, so a larger b means faster repetition. The function is
periodic: f(x + p) = f(x) for every x. The cosine is the sine shifted to
the left by π/2: cos x = sin(x + π/2). The derivatives are
(sin x)′ = cos x and (cos x)′ = −sin x; with the rule for f(k · x),
(a · sin(b · x))′ = a · b · cos(b · x).

# Key facts

- sin x: zeros at 0, π, 2π, …; maximum 1 at π/2, minimum −1 at 3π/2; period 2π.
- f(x) = 2 · sin(3x): amplitude 2, period 2π/3 ≈ 2.09; f(π/6) = 2 · sin(π/2) = 2.
- Effect of a: stretches vertically (a = 3 → values between −3 and 3); a < 0 mirrors the graph at the x-axis.
- Effect of b: compresses horizontally; sin(2x) has period π, sin(x/2) has period 4π.
- Frequency = 1 / period (repetitions per unit). A tide with period 12.4 h: h(t) = 1.5 · sin(2π t / 12.4), so b = 2π / 12.4 ≈ 0.507.
- cos x = sin(x + π/2); cos 0 = 1.
- Derivatives: (sin x)′ = cos x, (cos x)′ = −sin x, (sin(3x))′ = 3 cos(3x).
- Degrees and radians: 180° = π, so 90° = π/2; calculators must be in RAD for these functions.
- Matura terms (German): allgemeine Sinusfunktion, Amplitude, (kleinste) Periode, Frequenz, Bogenmaß, periodisch. Typical Teil-1 formats: Zuordnung (graphs to formulas), Lückentext (effect of a and b), offen (read a, b or the period).

# Level: highschool

<!-- ptf:text v1 -->

Start with the Ferris wheel. The seat goes up and down around the height
of the axle, as far above as below, and it takes the same time for every
turn. Plot the height above the axle over time and you get a sine curve:
the radius is the amplitude, the time for one turn is the period.

In f(x) = a · sin(b · x), a says how far the curve swings, b how fast.
Read b backwards from the period: one full wave takes 2π / b. If a wave
takes π units, then b = 2; if it takes 12.4 hours, then b = 2π / 12.4.

The cosine is the same wave started a quarter period earlier: it begins at
its maximum instead of at 0. That is why the derivative of sine is cosine:
the sine is steepest at 0, exactly where the cosine is largest.

# Misconceptions

- **b-is-period**: In sin(b · x), b is the period → the period is 2π / b; larger b means a shorter period.
- **amplitude-is-height**: The amplitude is the distance from the maximum to the minimum → it is half of that, from the middle to the maximum.
- **degrees-in-formula**: sin(x) with x in degrees → in calculus x is in radians; set the calculator to RAD.
- **cos-derivative-sign**: (cos x)′ = sin x → (cos x)′ = −sin x.
- **inner-factor-ignored**: (sin(3x))′ = cos(3x) → (sin(3x))′ = 3 cos(3x).

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "ferris-wheel",
  "level": "highschool",
  "purpose": "warmup",
  "question": "A Ferris wheel with radius 20 m turns once every 8 minutes. The height of a seat above the axle is modelled by h(t) = 20 · sin(b · t), t in minutes. What is b?",
  "options": [
    { "text": "2π/8 = π/4", "correct": true, "feedback": "Yes: one period of 8 minutes means 2π / b = 8." },
    { "text": "8", "correct": false, "feedback": "8 is the period; b is 2π divided by it." },
    { "text": "20", "correct": false, "feedback": "20 m is the amplitude a." }
  ],
  "explanation": "Period p = 2π / b, so b = 2π / p."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "amplitude-period",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-6-1", "fa-6-3"],
  "misconception": "b-is-period",
  "text": "f(x) = 2 · sin(3x) has the amplitude {{1}} and the period {{2}} (rounded to two decimals).",
  "gaps": [
    { "answer": "2" },
    { "answer": "2.09", "accepted": ["2,09", "2π/3"] }
  ],
  "explanation": "a = 2; p = 2π / 3 ≈ 2.09."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "sine-value",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-6-2"],
  "misconception": "degrees-in-formula",
  "question": "f(x) = 2 · sin(3x) with x in radians. Compute f(π/6).",
  "answer": 2,
  "tolerance": 0,
  "explanation": "3 · π/6 = π/2 and sin(π/2) = 1, so f(π/6) = 2."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "parameter-effects-sine",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-6-3"],
  "misconception": "amplitude-is-height",
  "question": "Compare g(x) = 3 · sin(2x) with f(x) = sin x. Which two statements are true?",
  "options": [
    { "text": "g swings between −3 and 3", "correct": true, "feedback": "Yes: amplitude 3." },
    { "text": "g repeats twice as often as f", "correct": true, "feedback": "Yes: period π instead of 2π." },
    { "text": "g has the period 2", "correct": false, "feedback": "The period is 2π / 2 = π." },
    { "text": "The distance between maximum and minimum of g is 3", "correct": false, "feedback": "It is 6; the amplitude is half of it." },
    { "text": "g has the same zeros as f", "correct": false, "feedback": "g also has zeros at π/2, 3π/2, … where f does not." }
  ],
  "explanation": "a stretches vertically, b compresses horizontally."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "tide",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-6-4", "fa-6-2"],
  "question": "The tide at a harbour is modelled by h(t) = 1.5 · sin(0.507 t) (h in m relative to mean sea level, t in hours). After how many hours does the pattern repeat? Round to one decimal.",
  "answer": 12.4,
  "tolerance": 0.05,
  "unit": "h",
  "explanation": "Period = 2π / 0.507 ≈ 12.4 hours: high tide comes about every 12 hours and 24 minutes."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cos-shift",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-6-5"],
  "question": "Which identity is true for every x?",
  "options": [
    { "text": "cos x = sin(x + π/2)", "correct": true, "feedback": "Yes: the cosine is the sine shifted π/2 to the left." },
    { "text": "cos x = sin(x − π/2)", "correct": false, "feedback": "At x = 0 the right side is sin(−π/2) = −1, but cos 0 = 1." },
    { "text": "cos x = sin x + π/2", "correct": false, "feedback": "Adding π/2 to the values shifts the graph up, not sideways." },
    { "text": "cos x = −sin x", "correct": false, "feedback": "At x = 0: cos 0 = 1, −sin 0 = 0." }
  ],
  "explanation": "cos x = sin(x + π/2)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "derivatives-sine",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-6-6"],
  "misconception": "cos-derivative-sign",
  "question": "Which two derivatives are correct?",
  "options": [
    { "text": "(sin x)′ = cos x", "correct": true, "feedback": "Yes." },
    { "text": "(cos x)′ = −sin x", "correct": true, "feedback": "Yes: just after 0 the cosine falls while sin x is positive." },
    { "text": "(cos x)′ = sin x", "correct": false, "feedback": "The sign is wrong: at x = π/2 the cosine falls with slope −1." },
    { "text": "(sin(3x))′ = cos(3x)", "correct": false, "feedback": "The inner factor 3 is missing: 3 cos(3x)." },
    { "text": "(sin x)′ = −cos x", "correct": false, "feedback": "At 0 the sine rises with slope 1 = cos 0." }
  ],
  "explanation": "(sin x)′ = cos x, (cos x)′ = −sin x, (sin(kx))′ = k cos(kx)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "period-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["fa-6-3", "fa-6-4"],
  "misconception": "b-is-period",
  "question": "What is the (smallest) period of f(x) = sin(2x)?",
  "options": [
    { "text": "π", "correct": true, "feedback": "Yes: 2π / 2." },
    { "text": "2", "correct": false, "feedback": "b = 2 is not the period; the period is 2π / b." },
    { "text": "4π", "correct": false, "feedback": "That would be the period of sin(x/2)." }
  ],
  "explanation": "Period = 2π / b."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-model",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["fa-6-3", "fa-6-4"],
  "question": "The voltage of a household socket is modelled by U(t) = 325 · sin(100π · t) (U in volts, t in seconds). Explain what 325 and 100π mean, and how often per second the voltage repeats.",
  "rubric": [
    "325 V is the amplitude: the voltage swings between −325 V and 325 V",
    "The period is 2π / (100π) = 0.02 s",
    "So the voltage repeats 50 times per second (50 Hz)",
    "Uses units"
  ],
  "sample_answer": "325 is the amplitude: the voltage goes up to 325 V and down to −325 V. The period is 2π / (100π) = 0.02 s, so one cycle takes 0.02 seconds and the voltage repeats 50 times per second, the 50 Hz of the power grid.",
  "explanation": "Amplitude a, period 2π / b, frequency b / (2π)."
}
```

# Tutor notes

- Insist on radians in formulas and on the RAD mode of the calculator.
- Zuordnung tasks pairing graphs and formulas are solved by reading amplitude and one period from the graph.
- Past Matura tasks for FA 6: about 25 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area FA 6 (sine and cosine functions).
