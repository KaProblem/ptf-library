---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/trigonometry
title: Trigonometry
description: Sine, cosine and tangent in the right triangle and their use to find sides and angles, and sine and cosine for angles up to 180° and beyond via the unit circle, as required for the Austrian AHS Matura (AG 4).
lang: en
levels: [highschool]
objectives:
  - id: ag-4-1
    text: Know the definitions of sine, cosine and tangent in a right triangle and use them to find missing sides and angles.
  - id: ag-4-2
    text: Know and use the definitions of sine and cosine for angles greater than 90° (unit circle).
tags: [mathematics, trigonometry, right-triangle, unit-circle, matura, austria, ag-4]
about:
  - wikidata: Q8084
    label: trigonometry
duration_min: { highschool: 75 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AG 4"
generated: { by: claude/opus, at: 2026-11-05T23:45:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a 5 m ladder leans against a wall at 70° to the ground. How high up the wall does it reach? More or less than 4.5 m?
- In a right triangle, the angles fix the ratios of the sides. Sine, cosine and tangent are these ratios, and with them you can measure heights, slopes and distances you cannot reach.
- Afterwards the learner can find sides and angles in right triangles, convert gradients to angles, and use the unit circle for angles beyond 90°. AG 4 brings almost one Teil-1 task per exam and is used in many Teil-2 contexts.

# Core

In a right triangle, for an acute angle α: sin α = opposite / hypotenuse,
cos α = adjacent / hypotenuse, tan α = opposite / adjacent. Given an angle
and a side, these ratios give the other sides; given two sides, the inverse
functions (sin⁻¹, cos⁻¹, tan⁻¹) give the angle. A gradient of p % means
tan α = p / 100. For any angle, sine and cosine are defined on the unit
circle: the point at angle α from the positive x-axis has the coordinates
(cos α | sin α). So for 90° < α < 180° the sine is positive and the cosine
negative, and sin(180° − α) = sin α, cos(180° − α) = −cos α. Because of
this, sin α = c has two solutions between 0° and 180° when 0 < c < 1.

# Key facts

- Triangle with legs 3 (opposite α), 4 (adjacent) and hypotenuse 5: sin α = 0.6, cos α = 0.8, tan α = 0.75, α ≈ 36.87°.
- Ladder: height = 5 · sin 70° ≈ 4.70 m.
- Hypotenuse 10, α = 30°: opposite 10 · sin 30° = 5, adjacent 10 · cos 30° ≈ 8.66.
- Gradient: 12 % → tan α = 0.12 → α ≈ 6.84°. 100 % is 45°, not 90°.
- sin² α + cos² α = 1; tan α = sin α / cos α.
- Unit circle: sin 150° = sin 30° = 0.5; cos 150° = −cos 30° ≈ −0.866. sin 90° = 1, cos 90° = 0, cos 180° = −1.
- sin α = 0.5 for α ∈ [0°; 180°]: α = 30° or α = 150°.
- Calculators must be in degree mode (DEG) for angles in degrees.
- Matura terms (German): Sinus, Cosinus, Tangens, Gegenkathete, Ankathete, Hypotenuse, Steigungswinkel, Steigung in Prozent, Einheitskreis. Typical Teil-1 formats: offen (compute a side or angle), 2 aus 5 (which expressions give a side), Lückentext.

# Level: highschool

<!-- ptf:text v1 -->

Start with the ladder. The ladder is the hypotenuse, the wall height is the
side opposite the 70° angle. Opposite over hypotenuse is the sine, so the
height is 5 · sin 70° ≈ 4.70 m. Whenever you work in a right triangle, first
mark the angle you know, then name the three sides from its point of view:
opposite, adjacent, hypotenuse.

Road signs show gradients in percent: 12 % means 12 m up for 100 m
horizontally. That is opposite over adjacent, the tangent, so the angle is
tan⁻¹(0.12) ≈ 6.84°. A 100 % gradient is a 45° slope.

For angles beyond 90° there is no right triangle any more, so the unit
circle takes over: walk around a circle of radius 1, and the height of the
point is the sine, its sideways position the cosine. Past 90° the point is
on the left, so the cosine is negative, while the sine stays positive until
180°.

# Misconceptions

- **wrong-side-names**: The adjacent side is always the bottom side → it depends on the angle: it is the leg next to that angle.
- **percent-is-degrees**: A 12 % gradient is a 12° angle → tan α = 0.12, α ≈ 6.84°; 100 % is 45°.
- **sine-on-any-triangle**: sin α = opposite / hypotenuse works in every triangle → only in right triangles.
- **one-solution-only**: sin α = 0.5 has only the solution 30° → between 0° and 180° also 150°.
- **cosine-always-positive**: Cosine values are always positive → for angles between 90° and 270° the cosine is negative.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "ladder-height",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "wrong-side-names",
  "question": "A 5 m ladder leans against a wall at 70° to the ground. How high up the wall does it reach, in m? Guess first: more or less than 4.5 m?",
  "answer": 4.70,
  "tolerance": 0.01,
  "unit": "m",
  "explanation": "The height is opposite the 70° angle and the ladder is the hypotenuse: 5 · sin 70° ≈ 4.70 m."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "ratios-345",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-4-1"],
  "misconception": "wrong-side-names",
  "text": "A right triangle has the legs 3 (opposite α) and 4 (adjacent to α) and the hypotenuse 5. Then sin α = {{1}}, cos α = {{2}} and tan α = {{3}}.",
  "gaps": [
    { "answer": "0.6", "accepted": ["0,6", "3/5"] },
    { "answer": "0.8", "accepted": ["0,8", "4/5"] },
    { "answer": "0.75", "accepted": ["0,75", "3/4"] }
  ],
  "explanation": "sin = 3/5, cos = 4/5, tan = 3/4."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "angle-from-sides",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-4-1"],
  "question": "In the same triangle (opposite 3, adjacent 4), how large is α, in degrees? Round to two decimals.",
  "answer": 36.87,
  "tolerance": 0.01,
  "unit": "°",
  "explanation": "α = tan⁻¹(3/4) ≈ 36.87°."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "gradient-angle",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-4-1"],
  "misconception": "percent-is-degrees",
  "question": "A road sign shows a gradient of 12 %. What is the angle of the road to the horizontal, in degrees? Round to two decimals.",
  "answer": 6.84,
  "tolerance": 0.01,
  "unit": "°",
  "explanation": "12 % means 12 m up per 100 m horizontally: tan α = 0.12, α ≈ 6.84°."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "solve-triangle",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-4-1"],
  "title": "Solving a right triangle",
  "intro": "A right triangle has the hypotenuse 10 and the angle α = 30°.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Side opposite α", "10 · sin 30°", "5"],
    ["Side adjacent to α", "10 · cos 30°", "8.66"],
    ["Other acute angle", "90° − 30°", "60"],
    ["Check with Pythagoras", "5² + 8.66²", "100"]
  ],
  "result": { "label": "Sides", "value": "5 and 8.66" },
  "explanation": "Opposite = hypotenuse · sin α, adjacent = hypotenuse · cos α."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "unit-circle",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-4-2"],
  "misconception": "cosine-always-positive",
  "question": "Which two statements are true?",
  "options": [
    { "text": "sin 150° = sin 30°", "correct": true, "feedback": "Yes: sin(180° − α) = sin α." },
    { "text": "cos 150° = −cos 30°", "correct": true, "feedback": "Yes: on the left half of the unit circle the cosine is negative." },
    { "text": "cos 120° > 0", "correct": false, "feedback": "cos 120° = −0.5." },
    { "text": "sin 100° < 0", "correct": false, "feedback": "Between 0° and 180° the sine is positive." },
    { "text": "sin 90° = 0", "correct": false, "feedback": "At 90° the point is at the top of the circle: sin 90° = 1." }
  ],
  "explanation": "On the unit circle the point at angle α is (cos α | sin α)."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "two-angles",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-4-2"],
  "misconception": "one-solution-only",
  "text": "Between 0° and 180°, sin α = 0.5 has the two solutions α = {{1}}° and α = {{2}}°.",
  "gaps": [
    { "answer": "30" },
    { "answer": "150" }
  ],
  "explanation": "sin 30° = 0.5 and sin(180° − 30°) = sin 150° = 0.5."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "side-names-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ag-4-1"],
  "misconception": "wrong-side-names",
  "question": "In a right triangle, the angle β lies between the hypotenuse c and the leg a; the other leg is b. Which is true?",
  "options": [
    { "text": "cos β = a / c", "correct": true, "feedback": "Yes: a is the leg next to β (adjacent)." },
    { "text": "sin β = a / c", "correct": false, "feedback": "a is adjacent to β; the opposite leg is b, so sin β = b / c." },
    { "text": "tan β = a / b", "correct": false, "feedback": "tan β = opposite / adjacent = b / a." }
  ],
  "explanation": "Name the sides from the angle you work with."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "why-sine-below-one",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ag-4-1", "ag-4-2"],
  "question": "Explain why sin α can never be larger than 1, both in a right triangle and on the unit circle.",
  "rubric": [
    "In a right triangle the hypotenuse is the longest side",
    "So opposite / hypotenuse is at most 1",
    "On the unit circle sin α is the height of a point on a circle of radius 1",
    "That height lies between −1 and 1"
  ],
  "sample_answer": "In a right triangle the hypotenuse is longer than each leg, so opposite divided by hypotenuse is less than 1. On the unit circle the sine is the y-coordinate of a point on a circle of radius 1, which can never be above 1 or below −1.",
  "explanation": "−1 ≤ sin α ≤ 1 and −1 ≤ cos α ≤ 1."
}
```

# Tutor notes

- Have the learner mark the angle and label opposite, adjacent and hypotenuse before choosing a ratio.
- Check the calculator's degree mode at the start of each session.
- Past Matura tasks for AG 4: about 35 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AG 4 (trigonometry).
