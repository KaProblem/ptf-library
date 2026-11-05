---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/rates-of-change
title: Rates of change
description: Absolute and relative change, the average rate of change (difference quotient) and the instantaneous rate (derivative) as its limit, with their meaning and units in contexts, as required for the Austrian AHS Matura (AN 1).
lang: en
levels: [highschool]
objectives:
  - id: an-1-1
    text: Tell absolute and relative (percentage) change apart and use the one that fits.
  - id: an-1-2
    text: Explain how the average rate of change (difference quotient) leads to the instantaneous rate (derivative) as the interval shrinks, in words and in formulas.
  - id: an-1-3
    text: Interpret difference and differential quotients in contexts such as speed, costs or growth, with units, and describe situations with them.
tags: [mathematics, calculus, rate-of-change, difference-quotient, derivative, matura, austria, an-1]
about:
  - wikidata: Q3930464
    label: rate of change
  - wikidata: Q1224446
    label: difference quotient
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AN 1"
generated: { by: claude/opus, at: 2026-11-05T19:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess: you drive 120 km to your grandmother at 60 km/h and the same 120 km back at 40 km/h. What is your average speed for the whole trip? Most people say 50 km/h. It is 48 km/h.
- Calculus starts with one question: how fast does something change? Over an interval that is a simple division; at a single moment it needs a limit, and that limit is the derivative.
- Afterwards the learner can compute and interpret absolute and relative changes, average and instantaneous rates, with the right units. AN 1 brings more than two Teil-1 tasks per exam and appears in almost every Teil-2 task.

# Core

For a quantity f(x), the change from a to b can be given absolutely,
f(b) − f(a), or relative to the start, (f(b) − f(a)) / f(a), often in
percent. The average rate of change, or difference quotient,
(f(b) − f(a)) / (b − a), is the change per unit of x; in the graph it is
the slope of the secant through (a | f(a)) and (b | f(b)). Letting b move
towards a makes the interval shrink and the secant turn into the tangent;
the limit of the difference quotient is the instantaneous rate of change,
or differential quotient, f′(a). Its unit is always "unit of f per unit of
x": metres per second, euros per item, litres per minute.

# Key facts

- Absolute change f(b) − f(a); relative change (f(b) − f(a)) / f(a). A price from € 80 to € 92: + € 12, + 15 %.
- Percent vs. percentage points: an interest rate from 2 % to 3 % rises by 1 percentage point, but by 50 %.
- Large absolute and small relative change can go together: 50 000 → 51 000 is + 1 000 but + 2 %; 1 000 → 1 200 is + 200 but + 20 %.
- Difference quotient (mittlere Änderungsrate): (f(b) − f(a)) / (b − a), the slope of the secant. f(x) = x² on [1; 3]: (9 − 1) / 2 = 4.
- Differential quotient (momentane / lokale Änderungsrate): f′(a) = lim_{b → a} (f(b) − f(a)) / (b − a) = lim_{h → 0} (f(a + h) − f(a)) / h, the slope of the tangent. For x² at 2: h = 0.1 gives 4.1, h = 0.01 gives 4.01, limit 4.
- Contexts: s(t) position → average speed (s(t₂) − s(t₁)) / (t₂ − t₁), instantaneous speed s′(t); v(t) → acceleration; K(x) cost → K′(x) approximate cost of one more item (Grenzkosten); V(t) volume → inflow rate V′(t).
- Units: unit of f divided by unit of x. V in litres, t in minutes → V′ in l/min.
- Average speed over a trip is total distance / total time, not the mean of the speeds: 240 km in 2 h + 3 h = 48 km/h.
- f′(a) is a rate, not a value: f′(a) = 0 means f is momentarily not changing, not that f(a) = 0.
- Matura terms (German): absolute / relative Änderung, Änderungsfaktor, Differenzenquotient (mittlere Änderungsrate), Differenzialquotient (momentane / lokale Änderungsrate), Sekante, Tangente, Prozentpunkte. Typical Teil-1 formats: 2 aus 5 (which statements fit a context), Lückentext, offen (compute and interpret a rate with unit).

# Level: highschool

<!-- ptf:text v1 -->

Start with a table: at 6 o'clock it is 4 °C, at 14 o'clock it is 16 °C. The
temperature rose by 12 °C in 8 hours, on average 1.5 °C per hour. That is
the whole idea of an average rate: change divided by the length of the
interval, with the unit "°C per hour".

But the temperature did not rise by exactly 1.5 °C every hour. To know how
fast it rose at 10 o'clock, look at shorter and shorter intervals around 10 o'clock.
The averages over those small intervals settle on one number: the
instantaneous rate, written f′(10). In the graph, the secant through two
points turns into the tangent at one point.

Relative change answers a different question: not "how much more?" but
"how much more compared with before?". 12 € more is a lot on a 20 € item and
little on a 2 000 € item. Choose the one the question is about, and keep
percent and percentage points apart.

# Misconceptions

- **absolute-vs-relative**: The larger absolute increase is always the larger percentage increase → percentages compare with the start value; a small start value can give a large percentage.
- **percent-points**: From 2 % to 3 % is an increase of 1 % → it is 1 percentage point, an increase of 50 %.
- **mean-of-speeds**: The average speed is the mean of the speeds → it is total distance divided by total time; slower parts take longer and weigh more.
- **average-is-instantaneous**: An average speed of 80 km/h means the car always drove 80 km/h → it says nothing about any single moment.
- **derivative-is-value**: f′(a) is the value of f at a → it is the rate at which f changes there.
- **rate-without-unit**: A rate is just a number → its unit is the unit of f per unit of x, and it is part of the interpretation.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "round-trip-speed",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "mean-of-speeds",
  "question": "You drive 120 km at 60 km/h and the same 120 km back at 40 km/h. What is the average speed for the whole trip, in km/h? Guess first.",
  "answer": 48,
  "tolerance": 0,
  "unit": "km/h",
  "explanation": "There 2 h, back 3 h: 240 km in 5 h is 48 km/h. The slow part takes longer and so weighs more."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "price-change",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-1"],
  "text": "A jacket costs € 80 and later € 92. The absolute change is {{1}} €, the relative change is {{2}} %.",
  "gaps": [
    { "answer": "12" },
    { "answer": "15" }
  ],
  "explanation": "92 − 80 = 12; 12 / 80 = 0.15 = 15 %."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "two-towns",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-1"],
  "misconception": "absolute-vs-relative",
  "question": "Town A grew from 1 000 to 1 200 inhabitants, town B from 50 000 to 51 000 in the same time. Which two statements are true?",
  "options": [
    { "text": "B grew more in absolute terms", "correct": true, "feedback": "Yes: + 1 000 against + 200." },
    { "text": "A grew more in relative terms", "correct": true, "feedback": "Yes: + 20 % against + 2 %." },
    { "text": "Both grew by the same percentage", "correct": false, "feedback": "20 % and 2 %: the start values are very different." },
    { "text": "A grew more in absolute terms", "correct": false, "feedback": "200 more people in A, 1 000 more in B." },
    { "text": "B grew by 1 000 %", "correct": false, "feedback": "1 000 is the absolute change; relative to 50 000 it is 2 %." }
  ],
  "explanation": "Absolute: f(b) − f(a). Relative: (f(b) − f(a)) / f(a)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "percentage-points",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-1"],
  "misconception": "percent-points",
  "question": "A savings rate goes up from 2 % to 3 % per year. Which statement is correct?",
  "options": [
    { "text": "The rate rose by 1 percentage point, that is by 50 %", "correct": true, "feedback": "Right: + 1 point on a base of 2 points is + 50 %." },
    { "text": "The rate rose by 1 %", "correct": false, "feedback": "1 % of 2 % would be 0.02 %; the rate rose by 1 percentage point." },
    { "text": "The rate rose by 150 %", "correct": false, "feedback": "3 % is 150 % of 2 %, so the increase is 50 %." }
  ],
  "explanation": "Differences of percentages are percentage points; the relative change is (3 − 2) / 2 = 50 %."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "secant-slope",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-2"],
  "question": "f(x) = x². What is the average rate of change of f on the interval [1; 3]?",
  "answer": 4,
  "tolerance": 0,
  "explanation": "(f(3) − f(1)) / (3 − 1) = (9 − 1) / 2 = 4, the slope of the secant through (1|1) and (3|9)."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "secant-to-tangent",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-2"],
  "title": "From secant to tangent",
  "intro": "f(x) = x². Work out the difference quotient (f(2 + h) − f(2)) / h for smaller and smaller h.",
  "columns": ["h", "Difference quotient", "Value"],
  "rows": [
    ["1", "(9 − 4) / 1", "5"],
    ["0.1", "(4.41 − 4) / 0.1", "4.1"],
    ["0.01", "(4.0401 − 4) / 0.01", "4.01"],
    ["0.001", "(4.004001 − 4) / 0.001", "4.001"]
  ],
  "result": { "label": "f′(2)", "value": "4" },
  "explanation": "(2 + h)² − 4 = 4h + h², divided by h gives 4 + h, which tends to 4."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-is-instantaneous",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-2"],
  "question": "Which expression describes the instantaneous rate of change of f at x = a?",
  "options": [
    { "text": "lim_{h → 0} (f(a + h) − f(a)) / h", "correct": true, "feedback": "Yes: the limit of the difference quotient, f′(a)." },
    { "text": "(f(a + 1) − f(a)) / 1", "correct": false, "feedback": "That is the average rate over an interval of length 1." },
    { "text": "f(a) / a", "correct": false, "feedback": "That compares the value with x; it is not a rate of change." },
    { "text": "lim_{h → 0} (f(a + h) − f(a))", "correct": false, "feedback": "For a continuous f this limit is 0; the division by h is missing." }
  ],
  "explanation": "f′(a) = lim_{h → 0} (f(a + h) − f(a)) / h."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "position-interpretation",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-3"],
  "misconception": "average-is-instantaneous",
  "question": "s(t) is the distance in metres that a cyclist has covered after t seconds. Which two statements are true?",
  "options": [
    { "text": "(s(5) − s(2)) / 3 is the average speed between second 2 and second 5, in m/s", "correct": true, "feedback": "Yes: distance covered divided by time taken." },
    { "text": "s′(5) is the speed at the moment t = 5, in m/s", "correct": true, "feedback": "Yes: the instantaneous rate of change of the distance." },
    { "text": "s(5) − s(2) is the speed between second 2 and second 5", "correct": false, "feedback": "That is the distance covered in that time, in metres." },
    { "text": "s′(5) is the distance covered after 5 seconds", "correct": false, "feedback": "That is s(5); s′(5) is how fast it grows." },
    { "text": "(s(5) − s(2)) / 3 is the speed at t = 3.5", "correct": false, "feedback": "An average over an interval says nothing exact about a single moment." }
  ],
  "explanation": "Difference quotient = average rate over an interval; derivative = rate at a moment."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "marginal-cost",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-3"],
  "misconception": "derivative-is-value",
  "question": "K(x) is the cost in euros of producing x items, and K′(100) = 3.5. What does this mean?",
  "options": [
    { "text": "At 100 items, one more item costs about € 3.50 extra", "correct": true, "feedback": "Yes: the rate of change of the cost at x = 100, in € per item." },
    { "text": "100 items cost € 3.50", "correct": false, "feedback": "That would be K(100) = 3.5." },
    { "text": "One item costs € 3.50 on average when 100 are made", "correct": false, "feedback": "The average cost per item is K(100) / 100, which is something else." },
    { "text": "The cost rises by 3.5 % per item", "correct": false, "feedback": "K′ is an absolute rate in € per item, not a percentage." }
  ],
  "explanation": "K′(x) has the unit € per item; it approximates the extra cost of the next item."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rate-unit",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-3"],
  "misconception": "rate-without-unit",
  "question": "V(t) is the volume of water in a tank in litres, t the time in minutes. In which unit is V′(t) measured?",
  "options": [
    { "text": "Litres per minute", "correct": true, "feedback": "Yes: unit of V divided by unit of t." },
    { "text": "Litres", "correct": false, "feedback": "That is the unit of V itself." },
    { "text": "Minutes per litre", "correct": false, "feedback": "The rate divides the change of V by the change of t, not the other way round." }
  ],
  "explanation": "The unit of a rate of change is (unit of f) / (unit of x)."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "temperature-rate",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-1-2", "an-1-3"],
  "question": "At 6 o'clock the temperature is 4 °C, at 14 o'clock it is 16 °C. What is the average rate of change in °C per hour?",
  "answer": 1.5,
  "tolerance": 0,
  "unit": "°C/h",
  "explanation": "(16 − 4) / (14 − 6) = 12 / 8 = 1.5 °C per hour."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "average-speed-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["an-1-2", "an-1-3"],
  "misconception": "average-is-instantaneous",
  "question": "A train covers 240 km in 3 hours. Which statement follows for sure?",
  "options": [
    { "text": "Its average speed was 80 km/h", "correct": true, "feedback": "Yes: 240 km / 3 h." },
    { "text": "It drove at 80 km/h the whole time", "correct": false, "feedback": "It may have stopped and then driven faster; the average hides that." },
    { "text": "It never drove faster than 80 km/h", "correct": false, "feedback": "If it was ever slower, it must also have been faster than 80 km/h." }
  ],
  "explanation": "An average rate is a property of the interval, not of each moment."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-derivative",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["an-1-2", "an-1-3"],
  "misconception": "average-is-instantaneous",
  "question": "A speed camera measures how long a car takes for the 20 m between two lines. Explain why that gives an average speed and how you would get closer to the speed at one moment.",
  "rubric": [
    "Distance 20 m divided by the time is an average speed over that stretch (difference quotient)",
    "Shorter stretches give averages over shorter time intervals",
    "As the interval shrinks, the averages approach the instantaneous speed (limit, derivative)"
  ],
  "sample_answer": "20 m divided by the time needed is the average speed over those 20 m, a difference quotient. If the lines were closer, the average would cover a shorter time and be closer to the speed at that moment. The speed at one instant is the limit of these averages as the stretch shrinks to zero, the derivative s′(t).",
  "explanation": "The instantaneous rate is the limit of average rates over shrinking intervals."
}
```

# Tutor notes

- Insist on units in every answer; many Matura points are lost for interpreting a rate without them.
- In AN 1.3 tasks the hard part is the sentence, not the number: ask the learner to say "per" aloud ("euros per item").
- Past Matura tasks for AN 1: about 75 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AN 1 (rates of change).
