---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/integrals
title: Summation and the integral
description: The definite integral as the limit of sums of products, the basic integration rules and definite integrals of polynomials, and the meaning of integrals in contexts such as distance, volume and area, as required for the Austrian AHS Matura (AN 4).
lang: en
levels: [highschool]
objectives:
  - id: an-4-1
    text: Interpret and describe the definite integral as the limit of a sum of products.
  - id: an-4-2
    text: Use the basic rules of integration (power rule, sum rule, constant factor, f(k · x)) and compute definite integrals of polynomials.
  - id: an-4-3
    text: Interpret definite integrals in different contexts and describe situations by integrals.
tags: [mathematics, calculus, integral, area, antiderivative, matura, austria, an-4]
about:
  - wikidata: Q80091
    label: integral
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AN 4"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a car speeds up steadily; its speed is v(t) = 2t + 3 metres per second. If you only know the speed at every moment, how do you find out how far the car went in the first 4 seconds?
- The answer is to cut the time into small pieces, multiply speed by time in each, and add: a sum of products. Making the pieces smaller and smaller gives the integral, and the antiderivative computes it in one step.
- Afterwards the learner can explain the integral as a limit of sums, compute integrals of polynomials, and say what an integral means in a context: distance from speed, water from inflow, area between curves. AN 4 brings more than one Teil-1 task per exam and is frequent in Teil 2.

# Core

If a rate f(x) is known, the total change over [a; b] is found by cutting
the interval into n small pieces of width Δx, multiplying f by Δx in each
piece and adding: Σ f(xᵢ) · Δx. As the pieces get narrower, these sums
approach one number, the definite integral ∫ₐᵇ f(x) dx. Geometrically it is
the area between the graph and the x-axis, counted negative where f is
below the axis. The fundamental theorem says it can be computed with any
antiderivative F: ∫ₐᵇ f(x) dx = F(b) − F(a). In context, the integral of a
rate is a total change: the integral of speed is the distance covered, the
integral of an inflow rate is the amount that flowed in, the integral of
marginal cost is the change in cost.

# Key facts

- Sum of products: lower and upper sums with n strips approach the integral as n grows; for x² on [0; 3] with 100 strips the midpoint sum is 8.999 775, the integral is 9.
- Rules: ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C (n ≠ −1); ∫ (f + g) = ∫ f + ∫ g; ∫ k · f = k · ∫ f; ∫ f(k · x) dx = F(k · x) / k + C.
- Definite integral: ∫ₐᵇ f(x) dx = F(b) − F(a). ∫₀³ x² dx = 27/3 − 0 = 9. ∫₁² (3x² + 2x) dx = (8 + 4) − (1 + 1) = 10.
- Below the axis the integral is negative: ∫₀⁴ (x − 2) dx = 0, although the area enclosed with the x-axis is 2 + 2 = 4. For an area, split at the zeros and add absolute values.
- Area between two curves: ∫ₐᵇ (f(x) − g(x)) dx where f ≥ g. 4 − x² and the x-axis on [0; 2]: 16/3 ≈ 5.33.
- Context: v(t) = 2t + 3 m/s → distance in the first 4 s is ∫₀⁴ (2t + 3) dt = 16 + 12 = 28 m. The unit of an integral is unit of f times unit of x (m/s · s = m).
- ∫ₐᵇ f(x) dx = 0 does not mean f = 0: positive and negative parts can cancel.
- Matura terms (German): bestimmtes Integral, Stammfunktion, Ober- und Untersumme, Integrationsgrenzen, Flächeninhalt, „orientierter“ Flächeninhalt, Hauptsatz der Differenzial- und Integralrechnung. Typical Teil-1 formats: offen (compute an integral or an area), 2 aus 5 (which expression gives an area or a total), Lückentext (meaning in context).

# Level: highschool

<!-- ptf:text v1 -->

Start with the car whose speed is v(t) = 2t + 3 metres per second. In the
first second it drives between 3 and 5 m/s, so roughly 4 metres. In the
next second between 5 and 7, roughly 6 metres. Add up such pieces and you
get the distance. With smaller pieces the estimate gets better, and the
limit is the integral ∫₀⁴ (2t + 3) dt.

You do not have to add up thousands of pieces. Find a function whose
derivative is 2t + 3, for example F(t) = t² + 3t, and compute
F(4) − F(0) = 28. That works because the distance is exactly the function
whose rate of change is the speed.

In a graph, the integral is the area under the curve, with one warning:
parts below the x-axis count negative. If a question asks for an area, cut
at the zeros and add the pieces as positive numbers. If it asks for a total
change, such as the net amount of water, keep the signs.

# Misconceptions

- **integral-always-area**: The integral is always the area → parts below the x-axis count negative; for an area split at the zeros.
- **zero-integral-zero-function**: If ∫ₐᵇ f(x) dx = 0, then f is 0 → positive and negative parts can cancel.
- **forget-lower-limit**: ∫₁² f(x) dx = F(2) → it is F(2) − F(1).
- **power-rule-backwards**: ∫ x² dx = 2x → that is the derivative; the antiderivative is x³/3.
- **integral-unit**: The integral of a speed has the unit of speed → it is speed times time: a distance.
- **rate-vs-amount**: The integral of an inflow rate is the water level → it is the change of the amount; the level also depends on the start.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "car-distance",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "integral-unit",
  "question": "A car's speed is v(t) = 2t + 3 metres per second (t in s). How many metres does it cover in the first 4 seconds? Guess first, for example with rough pieces of one second.",
  "answer": 28,
  "tolerance": 0,
  "unit": "m",
  "explanation": "∫₀⁴ (2t + 3) dt = [t² + 3t]₀⁴ = 16 + 12 = 28 m. Pieces of one second with the middle speed 4, 6, 8, 10 give exactly 28 too, because v is linear."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "sum-of-products",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-1"],
  "question": "The interval [0; 3] is cut into n strips of width Δx = 3/n. Which statement about Σ f(xᵢ) · Δx is true?",
  "options": [
    { "text": "As n grows, the sums approach ∫₀³ f(x) dx", "correct": true, "feedback": "Yes: that is how the definite integral is defined." },
    { "text": "The sum gets larger and larger as n grows, without limit", "correct": false, "feedback": "More strips are also narrower; the sums settle on one number." },
    { "text": "The sum equals f(3) · 3, the last value times the width of the interval", "correct": false, "feedback": "That is one big rectangle; it overestimates a rising f. The strips use the value of f in each strip." },
    { "text": "Each product f(xᵢ) · Δx is the slope of f in the strip", "correct": false, "feedback": "It is the area of a thin rectangle under the graph." }
  ],
  "explanation": "Integral = limit of sums of products f(xᵢ) · Δx."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "integral-x-squared",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-2"],
  "misconception": "power-rule-backwards",
  "question": "Compute ∫₀³ x² dx.",
  "answer": 9,
  "tolerance": 0,
  "explanation": "An antiderivative is x³/3: 27/3 − 0 = 9."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "polynomial-integral",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-2"],
  "misconception": "forget-lower-limit",
  "title": "A definite integral",
  "intro": "Compute ∫₁² (3x² + 2x) dx.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Antiderivative", "F(x) = x³ + x²", ""],
    ["Upper limit", "F(2) = 8 + 4", "12"],
    ["Lower limit", "F(1) = 1 + 1", "2"],
    ["Difference", "F(2) − F(1)", "10"]
  ],
  "result": { "label": "Integral", "value": "10" },
  "explanation": "∫ₐᵇ f(x) dx = F(b) − F(a); forgetting F(1) would give 12."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "integration-rules",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-2"],
  "question": "Which two are antiderivatives of the given function?",
  "options": [
    { "text": "f(x) = 6x² + 1 → F(x) = 2x³ + x", "correct": true, "feedback": "Yes: F′(x) = 6x² + 1." },
    { "text": "f(x) = (2x)³ → F(x) = (2x)⁴ / 8", "correct": true, "feedback": "Yes: F(k · x) / k with F(u) = u⁴/4 and k = 2." },
    { "text": "f(x) = x³ → F(x) = 3x²", "correct": false, "feedback": "That is the derivative; the antiderivative is x⁴/4." },
    { "text": "f(x) = 5 → F(x) = 0", "correct": false, "feedback": "The derivative of 0 is 0; an antiderivative is 5x." },
    { "text": "f(x) = 4x → F(x) = 4x²", "correct": false, "feedback": "Its derivative is 8x; correct is 2x²." }
  ],
  "explanation": "Check every antiderivative by differentiating it."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "signed-area",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-3", "an-4-2"],
  "misconception": "integral-always-area",
  "question": "f(x) = x − 2 on [0; 4]. Which two statements are true?",
  "options": [
    { "text": "∫₀⁴ (x − 2) dx = 0", "correct": true, "feedback": "Yes: the triangle below the axis cancels the one above." },
    { "text": "The area enclosed by the graph and the x-axis on [0; 4] is 4", "correct": true, "feedback": "Yes: two triangles of area 2." },
    { "text": "The area enclosed on [0; 4] is 0", "correct": false, "feedback": "An area is never negative and does not cancel; split at the zero x = 2." },
    { "text": "∫₀⁴ (x − 2) dx = 4", "correct": false, "feedback": "The part below the axis counts negative: −2 + 2 = 0." },
    { "text": "Because the integral is 0, f(x) = 0 on [0; 4]", "correct": false, "feedback": "f is negative on [0; 2) and positive on (2; 4]." }
  ],
  "explanation": "Integral = signed area; area = sum of the absolute values of the pieces."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "area-under-parabola",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-2", "an-4-3"],
  "question": "How large is the area between the graph of f(x) = 4 − x² and the x-axis on [0; 2]? Round to two decimals.",
  "answer": 5.33,
  "tolerance": 0.01,
  "explanation": "∫₀² (4 − x²) dx = 8 − 8/3 = 16/3 ≈ 5.33; f ≥ 0 on [0; 2], so the integral is the area."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "water-context",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-3"],
  "misconception": "rate-vs-amount",
  "question": "z(t) is the rate in litres per minute at which water flows into a tank (t in minutes). What does ∫₁₀²⁰ z(t) dt describe?",
  "options": [
    { "text": "How many litres flow in between minute 10 and minute 20", "correct": true, "feedback": "Yes: rate times time, added up, is an amount." },
    { "text": "How many litres are in the tank at minute 20", "correct": false, "feedback": "That also depends on what was in the tank at minute 10." },
    { "text": "The average inflow rate between minute 10 and 20", "correct": false, "feedback": "The average would be the integral divided by 10 minutes." },
    { "text": "How fast the inflow rate changes between minute 10 and 20", "correct": false, "feedback": "That would be the derivative z′." }
  ],
  "explanation": "The integral of a rate over an interval is the total change in that interval; unit l/min · min = l."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-expression-area",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-4-3"],
  "question": "f(x) = x(x − 3) is negative on (0; 3) and positive for x > 3. Which expression gives the total area enclosed by the graph and the x-axis between x = 0 and x = 4?",
  "options": [
    { "text": "−∫₀³ f(x) dx + ∫₃⁴ f(x) dx", "correct": true, "feedback": "Yes: the part below the axis gets a minus sign so that it counts positive." },
    { "text": "∫₀⁴ f(x) dx", "correct": false, "feedback": "Here the negative part reduces the result; the area would be too small." },
    { "text": "∫₀³ f(x) dx + ∫₃⁴ f(x) dx", "correct": false, "feedback": "That is the same as ∫₀⁴ f(x) dx." },
    { "text": "∫₀³ f(x) dx − ∫₃⁴ f(x) dx", "correct": false, "feedback": "This gives the negative of the area." }
  ],
  "explanation": "Split at the zeros and make every piece positive."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "integral-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["an-4-2"],
  "misconception": "forget-lower-limit",
  "question": "F is an antiderivative of f with F(1) = 4 and F(5) = 10. What is ∫₁⁵ f(x) dx?",
  "options": [
    { "text": "6", "correct": true, "feedback": "Yes: F(5) − F(1) = 10 − 4." },
    { "text": "10", "correct": false, "feedback": "That is only F(5); the lower limit is missing." },
    { "text": "14", "correct": false, "feedback": "The values are subtracted, not added." }
  ],
  "explanation": "∫ₐᵇ f(x) dx = F(b) − F(a)."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-net-change",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["an-4-3", "an-4-1"],
  "misconception": "zero-integral-zero-function",
  "question": "r(t) is the rate in cm per hour at which the water level of a lake changes (positive: rising). Over one day ∫₀²⁴ r(t) dt = 0. Explain what this means, and why the level may still have changed during the day.",
  "rubric": [
    "The integral is the net change of the water level over the day, in cm",
    "Net change 0: the level at the end of the day equals the level at the start",
    "During the day it can rise and fall (r positive and negative) and the changes cancel",
    "So r(t) need not be 0, and the level was not constant"
  ],
  "sample_answer": "The integral adds up all changes: it is the net change of the level in cm over 24 hours. Since it is 0, the lake is as high at the end of the day as at the start. In between it may have risen (r > 0) and fallen (r < 0) by the same amount, so the level changed during the day although the net change is zero.",
  "explanation": "Integral of a rate = net change; positive and negative parts cancel."
}
```

# Tutor notes

- Always ask for the unit of an integral in context (unit of f times unit of x); it decides the interpretation.
- In Teil-1 tasks, area questions are often traps with a part below the axis: let the learner sketch first.
- Past Matura tasks for AN 4: about 50 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AN 4 (summation and integral).
