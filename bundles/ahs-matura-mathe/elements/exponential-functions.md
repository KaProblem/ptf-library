---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/exponential-functions
title: Exponential functions
description: Growth and decay by the same factor in equal steps, read from tables, graphs and formulas, with half-life, doubling time and the limits of the model, as required for the Austrian AHS Matura (FA 5).
lang: en
levels: [highschool]
objectives:
  - id: fa-5-1
    text: Recognise exponential relationships given in words, tables, graphs or formulas, and describe them as exponential functions.
  - id: fa-5-2
    text: Read values and the parameters a and b (or λ) from tables, graphs and formulas, and interpret them in context.
  - id: fa-5-3
    text: Explain what the parameters a and b (or λ) do to the graph and what they mean in a context.
  - id: fa-5-4
    text: Use the key properties f(x + 1) = b · f(x) and (e^x)′ = e^x and interpret them in context.
  - id: fa-5-5
    text: Explain half-life and doubling time, compute them and interpret them in context.
  - id: fa-5-6
    text: Judge whether an exponential model fits a situation, and where it stops fitting.
tags: [mathematics, functions, exponential-function, growth, decay, half-life, matura, austria, fa-5]
about:
  - wikidata: Q168698
    label: exponential function
  - wikidata: Q98690
    label: half-life
duration_min: { highschool: 90 }
figures:
  - id: same-factor
    objectives: [fa-5-1, fa-5-4]
    levels: [highschool]
    use_when: The learner thinks exponential growth adds the same amount each step, or before the property f(x + 1) = b · f(x).
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich FA 5"
generated: { by: claude/opus, at: 2026-11-05T17:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Fold a sheet of paper in half again and again. How thick would it be after 42 folds? Most people guess a few metres; the answer is further than the Moon.
- That surprise is the whole topic: when something is multiplied by the same factor in every step, it grows slowly at first and then explosively. Decay works the same way in reverse.
- Afterwards the learner can spot exponential growth or decay in a table, graph or text, compute with it, work out half-lives and doubling times, and say when the model stops being sensible. This is FA 5 of the Matura catalogue and comes up in about one or two Teil-1 tasks per exam, plus often in Teil 2.

# Core

A linear function adds the same amount for every step in x; an exponential
function multiplies by the same factor. In f(x) = a · b^x the start value is
a = f(0) and the growth factor is b: f(x + 1) = b · f(x). If b > 1 the values
grow, if 0 < b < 1 they shrink. A percentage change p per step means
b = 1 + p/100 (growth) or b = 1 − p/100 (decay). The same functions can be
written as f(x) = a · e^(λx) with λ = ln b. Because each equal step multiplies
by the same factor, it always takes the same time to double (or halve),
no matter where you start: that is the doubling time or half-life.

# Key facts

- Forms: f(x) = a · b^x with a > 0, b > 0, b ≠ 1; or f(x) = a · e^(λx) with λ = ln b ≠ 0. λ > 0 growth, λ < 0 decay.
- a = f(0) is the start value; the graph always passes (0 | a).
- Equal steps, equal factor: f(x + 1) = b · f(x), and more generally f(x + h) = b^h · f(x). The relative change per step is constant: (f(x + 1) − f(x)) / f(x) = b − 1.
- Test a table with equal x-steps: if the quotients of consecutive y-values are equal, it is exponential; if the differences are equal, it is linear.
- Percent: 3 % growth per year → b = 1.03; 20 % decrease per hour → b = 0.8. "Doubles every step" → b = 2.
- The graph of a · b^x (a > 0) lies entirely above the x-axis: no zeros. The x-axis is a horizontal asymptote (for decay as x → ∞, for growth as x → −∞).
- Derivative: (e^x)′ = e^x, so (a · e^(λx))′ = λ · a · e^(λx) = λ · f(x): the rate of change is proportional to the current value. This is the reason exponential models describe growth "in proportion to what is there".
- Half-life: b^T = ½ → T½ = ln(½) / ln b = ln 2 / |λ|. Doubling time: T₂ = ln 2 / ln b = ln 2 / λ. Both are independent of the start value a.
- Worked numbers: b = 0.8 per hour → T½ = ln 2 / ln 1.25 ≈ 3.11 h; 3 % per year → T₂ = ln 2 / ln 1.03 ≈ 23.4 years; after 3 hours at b = 0.8, 0.8³ = 0.512, so 51.2 % is left.
- Paper folding: 0.1 mm · 2^42 ≈ 4.4 · 10^11 mm ≈ 440 000 km (Earth–Moon ≈ 384 000 km).
- Limits of the model: real growth runs into limits (food, space, a market), so exponential models fit only for a while; bounded growth or logistic growth take over. Decay (radioactivity, medication, cooling towards room temperature as the difference) is often exponential over a long range.
- Matura terms (German): Exponentialfunktion, Wachstumsfaktor / Abnahmefaktor (b), Anfangswert (a), Halbwertszeit, Verdoppelungszeit, exponentielles Wachstum / exponentielle Abnahme, "Angemessenheit eines Modells". Typical Teil-1 formats here: 2 aus 5 (which tables or statements fit), Lückentext (parameter meaning), offen (compute a half-life or a value).

# Level: highschool

<!-- ptf:text v1 -->

Start with a guess: a pond plant doubles its area every day and covers the
whole pond on day 30. On which day was half of the pond covered? Most people
first say day 15. But if it doubles every day, it was half one day before the
end: day 29.

That is the idea of exponential growth. Each step does not add the same
amount, it multiplies by the same factor. In f(x) = a · b^x, a is where you
start and b is what you multiply by in every step. 5 % more each year means
"times 1.05", 20 % less each hour means "times 0.8". You can check a table
quickly: divide each value by the one before. If you always get the same
number, that number is b.

Because every step multiplies by the same b, the time it takes to double
(or halve) is the same everywhere on the curve. To find it, ask: how many
steps T turn b^T into 2 (or ½)? Take logarithms: T = ln 2 / ln b. And keep in
mind that no real process can grow like this forever; the model is a good
description only for a while.

# Misconceptions

- **percent-is-linear**: Growing by 5 % a year for 10 years means 50 % more → each year multiplies by 1.05; after 10 years the factor is 1.05^10 ≈ 1.63, so 63 % more.
- **same-increase**: Exponential growth adds the same amount each step → it multiplies by the same factor; the increase itself grows.
- **half-time-half-amount**: Half the half-life gives half the decay (75 % left) → after half a half-life ½^(1/2) ≈ 0.71, so about 71 % is left.
- **decay-reaches-zero**: A decaying quantity reaches zero after a few half-lives → a · b^x is never zero; it only gets arbitrarily small.
- **a-is-factor**: In a · b^x, a is the growth rate → a is the start value f(0); the factor per step is b.
- **halfway-day**: If something doubles daily and is complete on day 30, it was half done on day 15 → one doubling earlier, on day 29.
- **exponential-forever**: An exponential fit to past data predicts the far future → real growth meets limits; exponential models fit only within a range.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "paper-folding",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "same-increase",
  "question": "A sheet of paper is 0.1 mm thick. If you could fold it in half 42 times, how thick would the stack be, in kilometres? Guess first.",
  "answer": 440000,
  "tolerance": 60000,
  "unit": "km",
  "scale": "log",
  "explanation": "Each fold doubles the thickness: 0.1 mm · 2^42 ≈ 4.4 · 10^11 mm ≈ 440 000 km, more than the distance to the Moon (about 384 000 km)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-tables-exponential",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-1"],
  "misconception": "decay-reaches-zero",
  "question": "The x-values are 0, 1, 2, 3 in every table. Which two tables can belong to an exponential function f(x) = a · b^x?",
  "options": [
    { "text": "5, 10, 20, 40", "correct": true, "feedback": "Yes: every value is the previous one times 2." },
    { "text": "100, 90, 81, 72.9", "correct": true, "feedback": "Yes: every value is the previous one times 0.9." },
    { "text": "3, 6, 9, 12", "correct": false, "feedback": "The differences are equal (+3), the quotients are not: that is linear." },
    { "text": "1, 4, 9, 16", "correct": false, "feedback": "These are squares: 4/1 = 4, 9/4 = 2.25, so the factor is not constant." },
    { "text": "8, 4, 2, 0", "correct": false, "feedback": "The first steps halve, but an exponential function never reaches 0." }
  ],
  "explanation": "With equal x-steps, a table is exponential when the quotients of consecutive values are equal."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "value-from-formula",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-2"],
  "question": "A car is bought for € 24 000 and loses 15 % of its value each year. What is it worth after 4 years, in euros?",
  "answer": 12528,
  "tolerance": 50,
  "unit": "€",
  "explanation": "V(t) = 24 000 · 0.85^t, so V(4) = 24 000 · 0.522… ≈ € 12 528."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "parameters-in-context",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-2", "fa-5-3"],
  "misconception": "a-is-factor",
  "text": "A town has 8 000 inhabitants in 2025 and grows by 2 % per year. With t in years since 2025 the model is N(t) = {{1}} · {{2}}^t.",
  "gaps": [
    { "answer": "8000", "accepted": ["8 000", "8.000"] },
    { "answer": "1.02", "accepted": ["1,02"] }
  ],
  "explanation": "The start value a is the size at t = 0; 2 % growth means multiplying by 1.02 each year."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "parameter-effects",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-3"],
  "misconception": "a-is-factor",
  "question": "Compare f(x) = 3 · 1.5^x with g(x) = 6 · 1.5^x. Which statement is true?",
  "options": [
    { "text": "g is f stretched by 2 in the y-direction: every value of g is twice the value of f", "correct": true, "feedback": "Right: doubling a doubles every value, the factor per step stays 1.5." },
    { "text": "g grows twice as fast as f", "correct": false, "feedback": "Both grow by the factor 1.5 per step; only the start value differs." },
    { "text": "g is f shifted 2 units up", "correct": false, "feedback": "A shift would add 3 to every value; here every value is multiplied by 2." }
  ],
  "explanation": "a scales the graph vertically; b (or λ) decides how fast it grows or decays."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "step-property",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-4"],
  "misconception": "same-increase",
  "question": "For f(x) = a · b^x, what is f(x + 3)?",
  "options": [
    { "text": "b³ · f(x)", "correct": true, "feedback": "Yes: three steps, three times the factor b." },
    { "text": "3 · b · f(x)", "correct": false, "feedback": "The factor is applied three times, so it is multiplied, not added up: b · b · b." },
    { "text": "f(x) + b³", "correct": false, "feedback": "Exponential functions multiply per step; they do not add a fixed amount." }
  ],
  "explanation": "a · b^(x + 3) = a · b^x · b³ = b³ · f(x)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "percent-ten-years",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-4"],
  "misconception": "percent-is-linear",
  "question": "Savings grow by 5 % per year with interest on interest. By how much have they grown after 10 years?",
  "options": [
    { "text": "By about 63 %", "correct": true, "feedback": "Right: 1.05^10 ≈ 1.63." },
    { "text": "By exactly 50 %", "correct": false, "feedback": "That would be 5 % of the start value each year. With interest on interest the yearly increase grows." },
    { "text": "By about 105 %", "correct": false, "feedback": "Doubling at 5 % takes about 14 years (ln 2 / ln 1.05 ≈ 14.2)." }
  ],
  "explanation": "Each year multiplies by 1.05; ten years multiply by 1.05^10 ≈ 1.629."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "half-life-steps",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-5"],
  "instruction": "Put the steps for finding the half-life of f(t) = a · b^t in order.",
  "items": [
    "Set the amount to half the start value: a · b^T = a / 2",
    "Divide by a: b^T = 1/2",
    "Take the logarithm of both sides: T · ln b = ln(1/2)",
    "Solve for T: T = ln(1/2) / ln b"
  ],
  "explanation": "The start value a cancels, which is why the half-life does not depend on how much you start with."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "medicine-half-life",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-5"],
  "title": "Medicine in the blood",
  "intro": "The amount of a medicine in the blood decreases by 20 % per hour.",
  "columns": ["Step", "Formula", "Value"],
  "rows": [
    ["Factor per hour", "b = 1 − 0.20", "0.8"],
    ["Condition for half-life", "0.8^T = 0.5", ""],
    ["Solve", "T = ln 0.5 / ln 0.8", "≈ 3.11 h"],
    ["Left after 3 hours", "0.8³", "0.512, so 51.2 %"]
  ],
  "result": { "label": "Half-life", "value": "about 3.1 hours" },
  "explanation": "A constant percentage decrease per hour means exponential decay with b = 0.8; the half-life follows from 0.8^T = ½."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "half-of-half-life",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-5"],
  "misconception": "half-time-half-amount",
  "question": "A substance has a half-life of 10 days. How much of it is left after 5 days?",
  "options": [
    { "text": "About 71 %", "correct": true, "feedback": "Right: (½)^(5/10) = 1/√2 ≈ 0.707." },
    { "text": "75 %", "correct": false, "feedback": "That assumes linear decay within the half-life. Exponential decay loses more at the start than at the end of each half-life." },
    { "text": "50 %", "correct": false, "feedback": "50 % is left after the full 10 days." }
  ],
  "explanation": "After t days the share left is (½)^(t / T½)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "derivative-e",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-4"],
  "question": "f(t) = 50 · e^(0.04 t) describes a population (t in years). What does f′(t) = 0.04 · f(t) say?",
  "options": [
    { "text": "The population grows at any moment by 4 % of its current size per year", "correct": true, "feedback": "Yes: the rate of change is proportional to the current value, with the constant 0.04." },
    { "text": "The population grows by 0.04 individuals per year", "correct": false, "feedback": "0.04 is a relative rate, multiplied by the current size f(t)." },
    { "text": "The population grows by exactly 4 % from one year to the next", "correct": false, "feedback": "Close, but from year to year the factor is e^0.04 ≈ 1.0408, so 4.08 %." }
  ],
  "explanation": "(a · e^(λt))′ = λ · a · e^(λt) = λ · f(t)."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "bacteria-model-fit",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["fa-5-6"],
  "misconception": "exponential-forever",
  "question": "In a Petri dish, the number of bacteria doubles every 30 minutes during the first few hours. Someone uses N(t) = 500 · 2^(2t) (t in hours) to predict the number after 3 days. Is that sensible? Give a reason.",
  "rubric": [
    "For the first hours the model can fit (constant doubling time)",
    "After 3 days the model predicts an absurd number (2^144 times the start)",
    "Food and space in the dish are limited, so growth slows down and stops",
    "A bounded or logistic model would fit better for long times"
  ],
  "sample_answer": "Only for the first hours. The model would predict 500 · 2^144 bacteria after 3 days, far more than could ever fit in a dish. Nutrients and space run out, so growth slows and levels off; for long times a bounded (logistic) model is more appropriate.",
  "explanation": "An exponential model is appropriate only while nothing limits the growth."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pond-day",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["fa-5-1", "fa-5-4"],
  "misconception": "halfway-day",
  "question": "A water plant doubles its area every day. On day 30 it covers the whole pond. On which day did it cover half the pond?",
  "options": [
    { "text": "Day 29", "correct": true, "feedback": "Yes: one doubling before the end." },
    { "text": "Day 15", "correct": false, "feedback": "That would be true for linear growth. Here the area doubles daily, so half is one day before full." },
    { "text": "Day 25", "correct": false, "feedback": "On day 25 it covered only 1/32 of the pond." }
  ],
  "explanation": "Doubling per day means the area on day 29 is half the area on day 30."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-model-fits",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["fa-5-6"],
  "misconception": "exponential-forever",
  "question": "For which situation is an exponential model the most appropriate over the stated time?",
  "options": [
    { "text": "The amount of a radioactive isotope in a sample over 50 years", "correct": true, "feedback": "Yes: each nucleus decays independently, so the same share decays in equal times, for as long as you like." },
    { "text": "The number of users of a new app over its first 10 years", "correct": false, "feedback": "Early growth can look exponential, but the number of possible users is limited, so growth levels off." },
    { "text": "The height of a child from age 2 to 18", "correct": false, "feedback": "Height grows roughly by similar amounts per year and then stops; it does not multiply by a fixed factor." },
    { "text": "The water level in a bathtub filled from a tap", "correct": false, "feedback": "A constant inflow adds the same amount per minute: that is linear." }
  ],
  "explanation": "Exponential models fit when the change is proportional to the current amount and nothing limits it."
}
```

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area FA 5 (exponential function).
