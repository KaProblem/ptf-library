---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/equations
title: Terms, equations, inequalities and systems
description: Setting up and rearranging terms and formulas, linear and quadratic equations with their cases of solutions, linear inequalities and linear systems in two variables, solved and interpreted in context and geometrically, as required for the Austrian AHS Matura (AG 2).
lang: en
levels: [highschool]
objectives:
  - id: ag-2-1
    text: Set up simple terms and formulas, rearrange them and interpret them in context.
  - id: ag-2-2
    text: Set up, rearrange and solve linear equations and interpret the solution in context.
  - id: ag-2-3
    text: Solve quadratic equations in one variable, know the cases of solutions and interpret them, also geometrically.
  - id: ag-2-4
    text: Set up, solve and interpret linear inequalities, also geometrically.
  - id: ag-2-5
    text: Set up, solve and interpret linear systems in two variables, know their cases of solutions and interpret them geometrically.
tags: [mathematics, algebra, equations, quadratic-equation, inequalities, linear-systems, matura, austria, ag-2]
about:
  - wikidata: Q11345
    label: equation
  - wikidata: Q11203
    label: system of linear equations
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AG 2"
generated: { by: claude/opus, at: 2026-11-05T20:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Answer fast: a bat and a ball cost € 1.10 together. The bat costs € 1 more than the ball. How much is the ball? The quick answer, 10 cent, is wrong.
- An equation turns a question into something you can solve step by step, so you do not have to trust your gut. The skill is to write the right equation, keep it balanced while you rearrange, and say what the solution means.
- Afterwards the learner can set up and rearrange formulas, solve linear and quadratic equations and inequalities, solve systems of two equations and explain how many solutions there are and why. AG 2 brings about two Teil-1 tasks per exam; the same skills are needed in every Teil-2 task.

# Core

A term is a calculation with variables; an equation says that two terms
are equal. Equivalence transformations keep the solutions: add or
subtract the same term on both sides, multiply or divide by the same
number that is not zero. A linear equation has one solution, none or
infinitely many. A quadratic equation ax² + bx + c = 0 is solved by
x = (−b ± √D) / (2a) with the discriminant D = b² − 4ac: two solutions if
D > 0, one if D = 0, none in ℝ if D < 0; geometrically these are the points
where a parabola meets the x-axis. Inequalities are solved like equations,
except that multiplying or dividing by a negative number reverses the sign.
A linear system in two variables describes two lines; its solution is
their intersection: one point, none (parallel) or infinitely many
(identical).

# Key facts

- Setting up: adult tickets € a, child tickets € c → 2 adults and 3 children cost 2a + 3c.
- Rearranging a formula: A = (a + c) / 2 · h → c = 2A / h − a.
- Linear: 3(x − 2) = 2x + 5 → 3x − 6 = 2x + 5 → x = 11. Cases: 2x + 1 = 2x + 3 has no solution; 2(x + 1) = 2x + 2 has every x as a solution.
- Quadratic: x² − 6x + 5 = 0 → D = 36 − 20 = 16 → x = (6 ± 4)/2 = 5 or 1. Small formula for x² + px + q = 0: x = −p/2 ± √((p/2)² − q).
- Cases: x² + 4x + c = 0 has two solutions for c < 4, one for c = 4, none for c > 4 (D = 16 − 4c).
- Never divide by a term that can be zero: x² = 3x → x² − 3x = 0 → x(x − 3) = 0 → x = 0 or x = 3 (dividing by x loses 0). x² = 9 has the solutions 3 and −3.
- Inequality: 3 − 2x > 7 → −2x > 4 → x < −2 (sign flips when dividing by −2). On the number line: all numbers left of −2.
- System: a + c = 16 and 2a + 3c = 41 → a = 16 − c → 32 + c = 41 → c = 9, a = 7. Cases by the lines: different slopes → one solution; same slope, different intercept → none; same line → infinitely many.
- Matura terms (German): Term, Formel, Gleichung, Äquivalenzumformung, Lösungsmenge, Diskriminante, Lösungsfälle, Ungleichung, Gleichungssystem, „keine / genau eine / unendlich viele Lösungen“. Typical Teil-1 formats: Lückentext (cases of solutions), 2 aus 5 (which equation fits a context), offen (solve and interpret).

# Level: highschool

<!-- ptf:text v1 -->

Start with the bat and ball. Call the ball x. The bat is x + 1. Together
x + (x + 1) = 1.10, so 2x = 0.10 and x = 0.05: the ball costs 5 cent. Your
gut said 10 cent; the equation did not need a gut.

Solving means keeping the balance: whatever you do on one side you do on
the other. Two things break the balance without you noticing. Dividing by
something that can be zero throws solutions away. And with inequalities,
multiplying or dividing by a negative number turns the sign around:
−2x > 4 means x < −2.

For quadratic equations, bring everything to one side and use the formula.
The discriminant tells you in advance how many solutions to expect: think
of a parabola that cuts the x-axis twice, just touches it, or floats above
it.

Two equations with two unknowns are two lines. Solve one equation for one
variable and put it into the other. If the variable vanishes completely,
the lines are parallel (no solution) or the same (infinitely many).

# Misconceptions

- **gut-answer**: The ball costs 10 cent → then the bat would cost € 1.10 and both € 1.20; set up the equation.
- **lost-negative-root**: x² = 9 means x = 3 → also x = −3.
- **divide-by-variable**: In x² = 3x you can divide by x → this loses the solution x = 0; factor instead.
- **inequality-no-flip**: −2x > 4 gives x > −2 → dividing by a negative number reverses the sign: x < −2.
- **no-solution-means-error**: If the variable disappears, you made a mistake → it means no solution (false statement) or every x (true statement).
- **discriminant-sign**: D < 0 means two negative solutions → D < 0 means no real solution at all.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "bat-and-ball",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "gut-answer",
  "question": "A bat and a ball cost € 1.10 together. The bat costs € 1.00 more than the ball. What does the ball cost, in cent? Answer quickly, then check.",
  "answer": 5,
  "tolerance": 0,
  "unit": "cent",
  "explanation": "x + (x + 1.00) = 1.10 → 2x = 0.10 → x = 0.05 € = 5 cent."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rearrange-formula",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-1"],
  "question": "The area of a trapezoid is A = (a + c) / 2 · h. Which two formulas are correct rearrangements?",
  "options": [
    { "text": "c = 2A / h − a", "correct": true, "feedback": "Yes: multiply by 2, divide by h, subtract a." },
    { "text": "h = 2A / (a + c)", "correct": true, "feedback": "Yes: multiply by 2 and divide by (a + c)." },
    { "text": "c = 2A − a / h", "correct": false, "feedback": "The division by h must apply to 2A, not only to a." },
    { "text": "h = A / (a + c) · 2 − 1", "correct": false, "feedback": "There is no − 1 anywhere in the formula." },
    { "text": "a = 2A · h − c", "correct": false, "feedback": "You must divide by h, not multiply." }
  ],
  "explanation": "Undo the operations in reverse order and on both sides."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "term-in-context",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-1", "ag-2-2"],
  "question": "A cinema charges € a for adults and € c for children. A family of 2 adults and 3 children pays € 41. Which equation describes this?",
  "options": [
    { "text": "2a + 3c = 41", "correct": true, "feedback": "Yes: two adult tickets plus three child tickets." },
    { "text": "2c + 3a = 41", "correct": false, "feedback": "The numbers belong to the wrong ticket types." },
    { "text": "5(a + c) = 41", "correct": false, "feedback": "That would be five adult and five child tickets." },
    { "text": "(2 + 3)(a + c) / 2 = 41", "correct": false, "feedback": "There is no reason to average here." }
  ],
  "explanation": "Number of tickets times price, added up."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "linear-equation",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-2"],
  "text": "3(x − 2) = 2x + 5 has the solution x = {{1}}. The equation 2(x + 1) = 2x + 3 has {{2}} solutions.",
  "gaps": [
    { "answer": "11" },
    { "answer": "0", "accepted": ["no", "none", "zero", "keine"] }
  ],
  "explanation": "3x − 6 = 2x + 5 → x = 11. 2x + 2 = 2x + 3 → 2 = 3 is false for every x: no solution."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "quadratic-solve",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-3"],
  "misconception": "lost-negative-root",
  "text": "x² − 6x + 5 = 0 has the solutions x = {{1}} and x = {{2}} (smaller first).",
  "gaps": [
    { "answer": "1" },
    { "answer": "5" }
  ],
  "explanation": "D = 36 − 20 = 16, x = (6 ± 4) / 2, so 1 and 5. Check: 1 − 6 + 5 = 0, 25 − 30 + 5 = 0."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "quadratic-cases",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-3"],
  "misconception": "discriminant-sign",
  "question": "For which value of c does x² + 4x + c = 0 have exactly one real solution?",
  "options": [
    { "text": "c = 4", "correct": true, "feedback": "Yes: D = 16 − 4c = 0; the parabola touches the x-axis at x = −2." },
    { "text": "c = 0", "correct": false, "feedback": "x² + 4x = 0 has two solutions, 0 and −4." },
    { "text": "c = 5", "correct": false, "feedback": "D = 16 − 20 < 0: no real solution." },
    { "text": "c = −4", "correct": false, "feedback": "D = 32 > 0: two solutions." }
  ],
  "explanation": "One solution exactly when the discriminant is 0."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "inequality",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-4"],
  "misconception": "inequality-no-flip",
  "question": "Which set of numbers solves 3 − 2x > 7?",
  "options": [
    { "text": "All x < −2", "correct": true, "feedback": "Yes: −2x > 4, dividing by −2 reverses the sign." },
    { "text": "All x > −2", "correct": false, "feedback": "The sign must flip when you divide by −2. Test x = 0: 3 > 7 is false." },
    { "text": "All x < 2", "correct": false, "feedback": "Test x = 1: 3 − 2 = 1 > 7 is false." },
    { "text": "All x > 5", "correct": false, "feedback": "Test x = 6: 3 − 12 = −9 > 7 is false." }
  ],
  "explanation": "Solve like an equation, but flip the sign when multiplying or dividing by a negative number."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "inequality-context",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-4"],
  "question": "A gym costs € 30 per month plus € 2 per visit; a second gym charges € 8 per visit and no monthly fee. For how many visits v per month is the first gym cheaper?",
  "options": [
    { "text": "For more than 5 visits", "correct": true, "feedback": "Yes: 30 + 2v < 8v → 30 < 6v → v > 5." },
    { "text": "For fewer than 5 visits", "correct": false, "feedback": "With few visits the monthly fee makes the first gym more expensive." },
    { "text": "For more than 3 visits", "correct": false, "feedback": "At 4 visits: 38 against 32, the first is still more expensive." },
    { "text": "Never", "correct": false, "feedback": "At 6 visits: 42 against 48." }
  ],
  "explanation": "Set up the inequality cost₁ < cost₂ and solve for v."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "ticket-system",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-5"],
  "title": "Two equations, two unknowns",
  "intro": "16 people pay € 41 in total for tickets; adults pay € 2, children € 3 (a = adults, c = children).",
  "columns": ["Step", "Equation", "Value"],
  "rows": [
    ["Number of people", "a + c = 16", ""],
    ["Total price", "2a + 3c = 41", ""],
    ["Insert a = 16 − c", "32 − 2c + 3c = 41, so c =", "9"],
    ["Adults", "a = 16 − 9", "7"]
  ],
  "result": { "label": "Solution", "value": "7 adults, 9 children" },
  "explanation": "Substitution turns the system into one equation in one unknown; check: 14 + 27 = 41."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "system-cases",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-2-5"],
  "misconception": "no-solution-means-error",
  "question": "Which system has infinitely many solutions?",
  "options": [
    { "text": "x + 2y = 4 and 3x + 6y = 12", "correct": true, "feedback": "Yes: the second is 3 times the first; both describe the same line." },
    { "text": "x + 2y = 4 and 3x + 6y = 10", "correct": false, "feedback": "Same direction, but 3 · 4 ≠ 10: parallel lines, no solution." },
    { "text": "x + 2y = 4 and x − 2y = 0", "correct": false, "feedback": "Different slopes: exactly one solution, (2|1)." },
    { "text": "x + 2y = 4 and 2x + y = 4", "correct": false, "feedback": "Different slopes: one solution, (4/3|4/3)." }
  ],
  "explanation": "Same line → infinitely many; parallel → none; crossing → one."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "square-root-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ag-2-3"],
  "misconception": "divide-by-variable",
  "question": "What are all real solutions of x² = 3x?",
  "options": [
    { "text": "x = 0 and x = 3", "correct": true, "feedback": "Yes: x(x − 3) = 0." },
    { "text": "x = 3 only", "correct": false, "feedback": "Dividing by x loses x = 0, which also solves the equation." },
    { "text": "x = √3", "correct": false, "feedback": "Check: (√3)² = 3 but 3√3 ≈ 5.2." }
  ],
  "explanation": "Bring everything to one side and factor; never divide by a term that can be 0."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-cases",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ag-2-3", "ag-2-5"],
  "question": "Explain with a picture in words why a quadratic equation can have 0, 1 or 2 solutions, while a system of two linear equations in two variables can have 0, 1 or infinitely many, but never exactly 2.",
  "rubric": [
    "Quadratic: solutions are where a parabola meets the x-axis; it can miss it, touch it or cut it twice",
    "The discriminant decides which case occurs",
    "Linear system: two lines either cross once, are parallel or are identical",
    "Two different straight lines cannot meet in exactly two points"
  ],
  "sample_answer": "The solutions of ax² + bx + c = 0 are the x-axis crossings of a parabola: it can stay above the axis (0), touch it (1) or cross it twice (2), depending on the discriminant. A system of two linear equations describes two lines. Two lines meet once, never (parallel) or everywhere (same line); if they shared two points they would be the same line.",
  "explanation": "Cases of solutions are intersections, read geometrically."
}
```

# Tutor notes

- Ask for a check by inserting the solution; it catches most sign errors and builds trust in the method.
- Lückentext tasks on cases of solutions are frequent; practise saying which case occurs before computing.
- Past Matura tasks for AG 2: about 75 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AG 2 (terms, equations, inequalities, systems).
