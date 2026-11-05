---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/vectors
title: Vectors and lines
description: Vectors as lists of numbers and as arrows, addition, scalar multiples and the dot product, lines in parameter form and as equations, their relative positions and normal vectors, as required for the Austrian AHS Matura (AG 3).
lang: en
levels: [highschool]
objectives:
  - id: ag-3-1
    text: Use vectors as lists of numbers (tuples) and interpret them and calculations with them in a context such as prices and quantities.
  - id: ag-3-2
    text: Read vectors geometrically as points or arrows, and use the vector from A to B, lengths and midpoints.
  - id: ag-3-3
    text: Add vectors, multiply them by a number and form the dot product, and interpret each geometrically, including right angles and the angle between vectors.
  - id: ag-3-4
    text: Describe lines in the plane by parameter form and equation, in space by parameter form, decide how two lines or a point and a line lie, and find intersection points.
  - id: ag-3-5
    text: Set up normal vectors in the plane and use them, for example to write the equation of a line.
tags: [mathematics, vectors, analytic-geometry, lines, dot-product, matura, austria, ag-3]
about:
  - wikidata: Q44528
    label: Euclidean vector
duration_min: { highschool: 180 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AG 3"
generated: { by: claude/opus, at: 2026-11-05T18:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: you walk 3 km east and then 4 km north. How far are you from where you started, as the crow flies? Not 7 km, but 5 km.
- A vector is a list of numbers that can be read two ways: as data (prices, stock, scores) or as an arrow in the plane or in space. The same few operations work for both.
- Afterwards the learner can compute with vectors, read them as arrows, use the dot product for totals and right angles, and describe, compare and intersect lines. AG 3 brings about two and a half Teil-1 tasks per exam.

# Core

A vector is an ordered list of numbers, such as a = (3, 4). As data it
lists quantities side by side; as geometry it is an arrow that moves 3 to
the right and 4 up. Vectors are added and multiplied by numbers entry by
entry. The arrow from point A to point B is AB = B − A. The length is
|a| = √(a₁² + a₂²) (in space with a third term). The dot product
a · b = a₁b₁ + a₂b₂ (+ a₃b₃) is a number: in context it is a total such as
price times quantity, in geometry it is 0 exactly when the vectors are at a
right angle, and in general cos φ = a · b / (|a| |b|). A line is a point
plus all multiples of a direction vector: X = P + t · v. In the plane it
can also be written as an equation n · X = n · P with a normal vector n,
which is perpendicular to the line.

# Key facts

- Entry by entry: (1, 2) + (3, −1) = (4, 1); 3 · (2, −1) = (6, −3).
- AB = B − A ("end minus start"). A(1|2), B(4|6): AB = (3, 4), |AB| = √(9 + 16) = 5.
- Midpoint M = (A + B) / 2; point C = A + AB / 2 reaches the same point.
- Dot product in context: prices p = (2.50, 1.20, 0.80) € per item, quantities q = (10, 20, 5) → p · q = 25 + 24 + 4 = € 53 in total.
- Right angle: a · b = 0. In the plane, a normal vector of (a₁, a₂) is (−a₂, a₁) or (a₂, −a₁): (2, 3) ⟂ (3, −2).
- Angle: a = (1, 2, 2), b = (2, −1, 2): a · b = 4, |a| = |b| = 3, cos φ = 4/9, φ ≈ 63.6°.
- Lines: X = P + t · v. A point Q lies on the line if one value of t works for every coordinate at once.
- In the plane: direction v = (3, −1) → normal n = (1, 3); through P(1|2): x + 3y = 1 + 6 = 7. From an equation 2x − 5y = 3 read n = (2, −5) and a direction (5, 2).
- Two lines: directions multiples of each other → parallel (identical if a point of one lies on the other); otherwise they intersect, or in space they can also be skew (neither parallel nor meeting). In the plane, lines are never skew.
- Intersection: set the two parameter forms equal and solve for t and s; insert to get the point.
- Matura terms (German): Vektor, Pfeil, Ortsvektor, Betrag (Länge), Skalarprodukt, Normalvektor, Richtungsvektor, Parameterdarstellung, Normalvektordarstellung / allgemeine Geradengleichung, Lagebeziehung (schneidend, parallel, identisch, windschief). Typical Teil-1 formats: 2 aus 5 (which vectors or statements fit), offen (compute a vector or a point), Konstruktion (draw an arrow).

# Level: highschool

<!-- ptf:text v1 -->

Start with a shop: three items cost 2.50 €, 1.20 € and 0.80 €, and you buy
10, 20 and 5 of them. Write prices and quantities as two vectors and
multiply entry by entry, then add: 25 + 24 + 4 = 53 €. That is the dot
product, and in context it is always some kind of total.

Now draw. The vector (3, 4) is an arrow: 3 right, 4 up. To get from A to B
you go B − A, end minus start. Its length is Pythagoras: √(3² + 4²) = 5.

The dot product has a second meaning: if it is 0, the arrows stand at a
right angle. That is why swapping the entries and changing one sign,
(a₁, a₂) → (−a₂, a₁), gives a perpendicular vector, a normal vector.

A line is "start somewhere and walk along a direction": X = P + t · v.
To test a point, find t from one coordinate and check whether the same t
works for the others. In the plane you can turn this into an equation with
the normal vector: n · X = n · P.

# Misconceptions

- **ab-is-a-minus-b**: The vector from A to B is A − B → it is B − A, end minus start.
- **length-adds**: |a + b| = |a| + |b| → only when a and b point the same way; in general |a + b| ≤ |a| + |b| (3 east and 4 north give 5, not 7).
- **dot-is-vector**: The dot product of two vectors is a vector → it is a number.
- **normal-is-direction**: In 2x − 5y = 3 the vector (2, −5) points along the line → it is perpendicular to the line; a direction is (5, 2).
- **parallel-means-identical**: Lines with proportional directions are the same line → they are identical only if they share a point; otherwise parallel and distinct.
- **one-coordinate-enough**: A point lies on a line if one coordinate fits for some t → the same t must fit all coordinates.
- **skew-in-plane**: Two lines in the plane can be skew → in the plane they are parallel or intersect; skew lines exist only in space.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "walk-distance",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "length-adds",
  "question": "You walk 3 km east and then 4 km north. How far are you from the start, as the crow flies, in km? Guess first.",
  "answer": 5,
  "tolerance": 0,
  "unit": "km",
  "explanation": "The two walks add to the vector (3, 4); its length is √(3² + 4²) = 5 km."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "price-times-quantity",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-1", "ag-3-3"],
  "misconception": "dot-is-vector",
  "question": "A bakery sells rolls, pretzels and croissants. Prices per item: p = (0.80, 1.20, 2.50) €. One day it sells q = (120, 45, 30) items. What is p · q, and so the day's revenue, in €?",
  "answer": 225,
  "tolerance": 0,
  "unit": "€",
  "explanation": "p · q = 0.80 · 120 + 1.20 · 45 + 2.50 · 30 = 96 + 54 + 75 = € 225."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "stock-vectors",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-1"],
  "question": "A shop lists its stock of four products as vectors: M = stock on Monday, F = stock on Friday, with no deliveries in between. Which statement is true?",
  "options": [
    { "text": "M − F lists how many items of each product were sold during the week", "correct": true, "feedback": "Yes: entry by entry, start minus end is what left the shop." },
    { "text": "F − M lists how many items of each product were sold during the week", "correct": false, "feedback": "F − M is negative where items were sold; it is the change, not the sales." },
    { "text": "M · F is the total number of items sold", "correct": false, "feedback": "The dot product multiplies the stocks entry by entry; that has no meaning here." },
    { "text": "2 · M lists the stock after a second week", "correct": false, "feedback": "2 · M doubles the Monday stock; it says nothing about another week." }
  ],
  "explanation": "Differences of data vectors are changes per entry; the sign tells the direction."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "arrow-a-to-b",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-2"],
  "misconception": "ab-is-a-minus-b",
  "text": "A = (1|2) and B = (4|6). The vector from A to B is AB = ({{1}}, {{2}}); its length is {{3}}, and the midpoint of AB is M = ({{4}}|{{5}}).",
  "gaps": [
    { "answer": "3" },
    { "answer": "4" },
    { "answer": "5" },
    { "answer": "2.5", "accepted": ["2,5"] },
    { "answer": "4" }
  ],
  "explanation": "AB = B − A = (3, 4), |AB| = √(9 + 16) = 5, M = (A + B)/2 = (2.5|4)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "orthogonal-vectors",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-3", "ag-3-5"],
  "question": "Which two vectors are perpendicular to a = (2, 3)?",
  "options": [
    { "text": "(3, −2)", "correct": true, "feedback": "Yes: 2 · 3 + 3 · (−2) = 0." },
    { "text": "(−6, 4)", "correct": true, "feedback": "Yes: 2 · (−6) + 3 · 4 = 0; it is −2 · (3, −2)." },
    { "text": "(3, 2)", "correct": false, "feedback": "2 · 3 + 3 · 2 = 12, not 0. Swap and change one sign." },
    { "text": "(−2, −3)", "correct": false, "feedback": "That is −a, pointing the opposite way: parallel, not perpendicular." },
    { "text": "(2, −3)", "correct": false, "feedback": "2 · 2 + 3 · (−3) = −5, not 0." }
  ],
  "explanation": "Perpendicular means a · b = 0; in the plane (−a₂, a₁) and its multiples work."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "angle-between",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-3"],
  "question": "What is the angle between a = (1, 2, 2) and b = (2, −1, 2), in degrees?",
  "answer": 63.6,
  "tolerance": 0.1,
  "unit": "°",
  "explanation": "a · b = 2 − 2 + 4 = 4, |a| = |b| = 3, cos φ = 4/9, φ ≈ 63.6°."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "length-of-sum",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-3"],
  "misconception": "length-adds",
  "question": "Which statement about the vectors a and b is always true?",
  "options": [
    { "text": "|a + b| ≤ |a| + |b|", "correct": true, "feedback": "Yes: the direct way is never longer than the detour (triangle inequality)." },
    { "text": "|a + b| = |a| + |b|", "correct": false, "feedback": "Only if a and b point the same way: (3, 0) + (0, 4) has length 5, not 7." },
    { "text": "|2a| = 4|a|", "correct": false, "feedback": "Doubling a vector doubles its length: |2a| = 2|a|." },
    { "text": "a · b = 0 means a or b is the zero vector", "correct": false, "feedback": "It also happens for perpendicular vectors, e.g. (1, 0) and (0, 1)." }
  ],
  "explanation": "Lengths do not add unless the vectors are parallel and point the same way."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "point-on-line",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-4"],
  "misconception": "one-coordinate-enough",
  "question": "g: X = (1|2) + t · (3, −1). Which two points lie on g?",
  "options": [
    { "text": "(7|0)", "correct": true, "feedback": "Yes: t = 2 gives (1 + 6 | 2 − 2)." },
    { "text": "(−2|3)", "correct": true, "feedback": "Yes: t = −1 gives (1 − 3 | 2 + 1)." },
    { "text": "(4|3)", "correct": false, "feedback": "x = 4 needs t = 1, but then y = 1, not 3." },
    { "text": "(3|−1)", "correct": false, "feedback": "That is the direction vector, not a point of g." },
    { "text": "(10|0)", "correct": false, "feedback": "x = 10 needs t = 3, but then y = −1." }
  ],
  "explanation": "Find t from one coordinate and check that the same t gives the other."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "parameter-to-equation",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-4", "ag-3-5"],
  "misconception": "normal-is-direction",
  "text": "g: X = (1|2) + t · (3, −1). A normal vector of g is n = (1, {{1}}), and the equation of g is x + 3y = {{2}}.",
  "gaps": [
    { "answer": "3" },
    { "answer": "7" }
  ],
  "explanation": "(3, −1) → (1, 3) by swapping and changing a sign; n · X = n · P gives x + 3y = 1 + 6 = 7."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "normal-from-equation",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-5"],
  "misconception": "normal-is-direction",
  "question": "The line h has the equation 2x − 5y = 3. Which statement is true?",
  "options": [
    { "text": "(5, 2) is a direction vector of h", "correct": true, "feedback": "Yes: it is perpendicular to the normal vector (2, −5)." },
    { "text": "(2, −5) is a direction vector of h", "correct": false, "feedback": "The coefficients form the normal vector, which is perpendicular to h." },
    { "text": "(0|3) lies on h", "correct": false, "feedback": "2 · 0 − 5 · 3 = −15, not 3." },
    { "text": "h is parallel to the line 5x + 2y = 1", "correct": false, "feedback": "Their normal vectors (2, −5) and (5, 2) are perpendicular, so the lines are perpendicular." }
  ],
  "explanation": "In ax + by = c, (a, b) is a normal vector and (b, −a) or (−b, a) a direction vector."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "lines-in-space",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-4"],
  "misconception": "parallel-means-identical",
  "question": "g: X = (1, 0, 2) + t · (1, 2, −1) and h: X = (3, 4, 0) + s · (2, 4, −2). How do g and h lie?",
  "options": [
    { "text": "Identical", "correct": true, "feedback": "Yes: the directions are multiples, and (3, 4, 0) lies on g for t = 2." },
    { "text": "Parallel and distinct", "correct": false, "feedback": "The directions are parallel, but check the point: (3, 4, 0) = (1, 0, 2) + 2 · (1, 2, −1)." },
    { "text": "Intersecting in one point", "correct": false, "feedback": "Lines with parallel directions cannot meet in exactly one point." },
    { "text": "Skew", "correct": false, "feedback": "Skew lines have directions that are not multiples of each other." }
  ],
  "explanation": "First compare directions, then test a point of one line on the other."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "intersection",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-3-4"],
  "title": "Intersection of two lines",
  "intro": "g: X = (0|1) + t · (2, 1) and h: X = (4|0) + s · (−1, 2).",
  "columns": ["Step", "Equation", "Value"],
  "rows": [
    ["x-coordinates equal", "2t = 4 − s", ""],
    ["y-coordinates equal", "1 + t = 2s", ""],
    ["Solve for t", "s = (1 + t)/2 in the first: 5t = 7", "1.4"],
    ["Parameter s", "s = (1 + 1.4)/2", "1.2"],
    ["x of the intersection", "2 · 1.4", "2.8"],
    ["y of the intersection", "1 + 1.4", "2.4"]
  ],
  "result": { "label": "Intersection", "value": "S = (2.8|2.4)" },
  "explanation": "Setting the parameter forms equal gives two equations for t and s; check: h at s = 1.2 is (4 − 1.2 | 2.4)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "vector-a-to-b-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ag-3-2", "ag-3-4"],
  "misconception": "ab-is-a-minus-b",
  "question": "A = (5|1), B = (2|3). Which vector is a direction vector of the line through A and B, written as AB?",
  "options": [
    { "text": "(−3, 2)", "correct": true, "feedback": "Yes: B − A = (2 − 5, 3 − 1)." },
    { "text": "(3, −2)", "correct": false, "feedback": "That is A − B, the arrow from B to A. It is a direction of the same line, but not AB." },
    { "text": "(7, 4)", "correct": false, "feedback": "That is A + B, which is not an arrow between the points." }
  ],
  "explanation": "AB = B − A: end minus start."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "lines-in-plane-skew",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ag-3-4"],
  "misconception": "skew-in-plane",
  "question": "Two lines in the plane have direction vectors (2, 1) and (4, 3). Without computing the intersection: do they meet? And could they be skew? Explain.",
  "rubric": [
    "The directions are not multiples of each other (2 · 3 ≠ 1 · 4)",
    "So the lines are not parallel and meet in exactly one point",
    "Skew lines exist only in space; in the plane two lines are parallel or intersect"
  ],
  "sample_answer": "(4, 3) is not a multiple of (2, 1), because 4/2 = 2 but 3/1 = 3. So the lines are not parallel, and in the plane non-parallel lines always meet in exactly one point. Skew is impossible in the plane; it needs a third dimension.",
  "explanation": "In ℝ²: parallel (or identical) or exactly one intersection."
}
```

# Tutor notes

- Ask for a sketch first: most sign errors disappear when the learner draws A, B and the arrow.
- Use the price–quantity reading of the dot product before the geometric one; many Teil-1 tasks (AG 3.1) are about interpreting vector calculations in a context.
- Past Matura tasks for AG 3: about 80 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AG 3 (vectors).
