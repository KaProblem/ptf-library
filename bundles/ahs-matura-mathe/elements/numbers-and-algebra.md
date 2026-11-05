---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/numbers-and-algebra
title: Numbers and algebraic terms
description: The number sets ℕ, ℤ, ℚ, ℝ and ℂ and how they nest, and the algebraic vocabulary of variables, terms, formulas, equations, inequalities, equivalence and solvability, as required for the Austrian AHS Matura (AG 1).
lang: en
levels: [highschool]
objectives:
  - id: ag-1-1
    text: Use knowledge of the number sets ℕ, ℤ, ℚ, ℝ and ℂ sensibly, including which numbers belong to which set.
  - id: ag-1-2
    text: Use the algebraic terms variable, term, formula, equation, inequality, system of equations, equivalence, transformation and solvability appropriately.
tags: [mathematics, number-sets, rational-numbers, algebra, equivalence, matura, austria, ag-1]
about:
  - wikidata: Q5783347
    label: number set
  - wikidata: Q1244890
    label: rational number
duration_min: { highschool: 60 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AG 1"
generated: { by: claude/opus, at: 2026-11-05T23:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Think about it: is 0.999… (nines forever) smaller than 1, or equal to 1?
- Every number you calculate with lives in a number set, and the sets grow as you need more: negative numbers to subtract freely, fractions to divide, roots like √2 to measure a diagonal, and complex numbers so that x² = −1 has a solution. The algebra words (term, equation, equivalent) are the grammar that Matura tasks use.
- Afterwards the learner can place numbers in ℕ, ℤ, ℚ, ℝ, ℂ, recognise rational numbers by their decimals, and use the algebraic terms precisely. AG 1 brings almost one Teil-1 task per exam, usually a quick point.

# Core

ℕ = {0, 1, 2, …} are the natural numbers, ℤ adds the negative whole
numbers, ℚ contains all fractions p/q of whole numbers (q ≠ 0), ℝ adds the
irrational numbers such as √2 and π, and ℂ adds numbers like i with
i² = −1. Each set contains the previous one: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ. A number is
rational exactly when its decimal expansion ends or repeats; irrational
numbers have endless, non-repeating decimals. A term is a calculation with
numbers and variables; an equation or inequality compares two terms; a
formula is an equation that connects quantities. Two equations are
equivalent if they have the same solutions; equivalence transformations
keep the solution set. Whether an equation is solvable can depend on the
number set: x² = 2 has no solution in ℚ but two in ℝ, x² = −1 none in ℝ
but two in ℂ.

# Key facts

- ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ. In Austrian schools 0 ∈ ℕ.
- Rational: terminating or repeating decimals. 3/8 = 0.375; 2/11 = 0.1818…; 0.333… = 1/3; 0.999… = 1.
- Irrational: √2, √3, √5, π, e; √n for a natural n is rational only if n is a perfect square (√16 = 4).
- Every whole number is rational (−7 = −7/1); every rational number is real.
- Complex: i² = −1; x² = −4 has the solutions 2i and −2i in ℂ.
- Term: 3a + 2b; equation: 3a + 2b = 12; inequality: 3a + 2b < 12; formula: A = a · b.
- Equivalence transformations: add or subtract the same term, multiply or divide by the same non-zero number. Squaring both sides or multiplying by an expression that can be 0 is not an equivalence transformation: x = 2 → x² = 4 gains the solution −2.
- An identity holds for all values: a(b + c) = ab + ac. A contradiction holds for none: x + 1 = x.
- Matura terms (German): natürliche, ganze, rationale, reelle, komplexe Zahlen; Variable, Term, Formel, (Un-)Gleichung, Gleichungssystem, Äquivalenz, Äquivalenzumformung, Lösbarkeit, Lösungsmenge. Typical Teil-1 formats: 2 aus 5 (which statements about numbers are true), Lückentext.

# Level: highschool

<!-- ptf:text v1 -->

Start with 0.999…. Call it x. Then 10x = 9.999…, and subtracting gives
9x = 9, so x = 1. Repeating decimals are just another way to write
fractions, and every fraction has a decimal that ends or repeats. That is
how you tell rational from irrational numbers.

The number sets nest like boxes inside boxes. A natural number like 5 is
also whole, rational, real and complex. So when a task asks "which sets
contain −3?", the answer is ℤ and every set around it.

The algebra words are precise. A term has no equals sign. An equation has
one and can be true or false depending on the variable. Transforming an
equation is only safe if you can undo every step: that is why you may not
multiply by zero, and why squaring can bring in false solutions.

# Misconceptions

- **repeating-is-irrational**: 0.333… goes on forever, so it is irrational → it repeats, so it is rational (1/3).
- **root-always-irrational**: Every square root is irrational → √16 = 4 and √(9/4) = 3/2 are rational.
- **sets-exclusive**: A number belongs to only one set (5 is natural, not rational) → the sets nest; 5 is in all of them.
- **almost-one**: 0.999… is slightly less than 1 → it equals 1.
- **squaring-equivalent**: Squaring both sides is an equivalence transformation → it can add solutions.
- **negative-root-real**: √(−4) is −2 → it is not real; in ℂ, (2i)² = −4.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "point-nine",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "almost-one",
  "question": "Is 0.999… (nines forever) smaller than 1 or equal to 1? Decide before you calculate.",
  "options": [
    { "text": "Equal to 1", "correct": true, "feedback": "Yes: with x = 0.999…, 10x − x = 9, so x = 1." },
    { "text": "Smaller than 1 by a tiny amount", "correct": false, "feedback": "There is no positive number between 0.999… and 1, so they are the same number." },
    { "text": "It is not a real number", "correct": false, "feedback": "It is a repeating decimal, so even a rational number: 9/9." }
  ],
  "explanation": "0.999… = 3 · 0.333… = 3 · 1/3 = 1."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-rational",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-1-1"],
  "misconception": "repeating-is-irrational",
  "question": "Which two numbers are rational?",
  "options": [
    { "text": "0.1818… (18 repeating)", "correct": true, "feedback": "Yes: a repeating decimal, it is 2/11." },
    { "text": "√16", "correct": true, "feedback": "Yes: √16 = 4." },
    { "text": "√5", "correct": false, "feedback": "5 is not a perfect square, so √5 is irrational." },
    { "text": "π", "correct": false, "feedback": "π is irrational: its decimals never end and never repeat." },
    { "text": "√2 / 2", "correct": false, "feedback": "Half of an irrational number is still irrational." }
  ],
  "explanation": "Rational = fraction of whole numbers = terminating or repeating decimal."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "number-set-statements",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-1-1"],
  "misconception": "sets-exclusive",
  "question": "Which two statements are true?",
  "options": [
    { "text": "Every whole number is a rational number", "correct": true, "feedback": "Yes: z = z/1." },
    { "text": "The equation x² = −9 has solutions in ℂ but not in ℝ", "correct": true, "feedback": "Yes: 3i and −3i." },
    { "text": "−4 is a natural number", "correct": false, "feedback": "ℕ has no negative numbers; −4 ∈ ℤ." },
    { "text": "√2 is a rational number because it can be written as 1.414", "correct": false, "feedback": "1.414 is only an approximation: 1.414² = 1.999 396." },
    { "text": "The quotient of two whole numbers is always a whole number", "correct": false, "feedback": "1 ÷ 2 = 0.5 is not whole; that is why ℚ is needed." }
  ],
  "explanation": "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ; each extension makes more equations solvable."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "fractions-decimals",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-1-1"],
  "text": "As a decimal, 3/8 = {{1}}. The repeating decimal 0.333… equals the fraction 1/{{2}}.",
  "gaps": [
    { "answer": "0.375", "accepted": ["0,375"] },
    { "answer": "3" }
  ],
  "explanation": "3 ÷ 8 = 0.375 terminates; 0.333… = 1/3 repeats. Both are rational."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "not-equivalent",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-1-2"],
  "misconception": "squaring-equivalent",
  "question": "Which step is NOT an equivalence transformation, i.e. it can change the solutions?",
  "options": [
    { "text": "x = 2 → x² = 4 (squaring both sides)", "correct": true, "feedback": "Yes: x² = 4 also has the solution −2." },
    { "text": "3x + 1 = 7 → 3x = 6 (subtracting 1)", "correct": false, "feedback": "Subtracting the same number keeps the solutions." },
    { "text": "3x = 6 → x = 2 (dividing by 3)", "correct": false, "feedback": "Dividing by a non-zero number keeps the solutions." },
    { "text": "x/2 = 5 → x = 10 (multiplying by 2)", "correct": false, "feedback": "Multiplying by a non-zero number keeps the solutions." }
  ],
  "explanation": "Squaring or multiplying by something that can be 0 can add or lose solutions."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "algebra-terms",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ag-1-2"],
  "question": "Which two statements use the terms correctly?",
  "options": [
    { "text": "a(b + c) = ab + ac is true for all values of a, b and c", "correct": true, "feedback": "Yes: an identity (distributive law)." },
    { "text": "x + 1 = x has no solution in ℝ", "correct": true, "feedback": "Yes: subtracting x gives 1 = 0, a false statement." },
    { "text": "3a + 2b is an equation", "correct": false, "feedback": "Without an equals sign it is a term." },
    { "text": "x² = 2 has two solutions in ℚ", "correct": false, "feedback": "±√2 are irrational: no solution in ℚ, two in ℝ." },
    { "text": "2x = 6 and x = 3 are equations with different solutions", "correct": false, "feedback": "Both have the solution 3: they are equivalent." }
  ],
  "explanation": "Term, equation, identity, solvability: precise words for precise statements."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "sets-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ag-1-1"],
  "misconception": "sets-exclusive",
  "question": "In which number sets does −3/1 lie?",
  "options": [
    { "text": "ℤ, ℚ, ℝ and ℂ", "correct": true, "feedback": "Yes: −3/1 = −3 is a whole number, so it is in ℤ and every larger set." },
    { "text": "Only in ℚ, because it is written as a fraction", "correct": false, "feedback": "−3/1 is the whole number −3; the way of writing does not matter." },
    { "text": "ℕ, ℤ, ℚ, ℝ and ℂ", "correct": false, "feedback": "ℕ has no negative numbers." }
  ],
  "explanation": "The sets nest: a number is in its smallest set and in every larger one."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "why-sqrt2-irrational",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ag-1-1"],
  "misconception": "root-always-irrational",
  "question": "Lea says: \"√2 is rational, my calculator shows 1.414213562, and that decimal ends.\" What is wrong with her argument?",
  "rubric": [
    "The calculator shows only a rounded value with a limited number of digits",
    "The decimal expansion of √2 goes on forever and never repeats",
    "Check: 1.414213562² is not exactly 2",
    "So √2 is irrational; a terminating decimal would be a fraction whose square is 2, which does not exist"
  ],
  "sample_answer": "The calculator rounds to ten digits. The real decimal of √2 never ends and never repeats; squaring 1.414213562 does not give exactly 2. A terminating decimal is a fraction, and no fraction has the square 2, so √2 is irrational.",
  "explanation": "A display of finitely many digits says nothing about the full expansion."
}
```

# Tutor notes

- AG 1 tasks are short; use them as quick warm-ups between longer chapters.
- If the learner hesitates on 0.999… = 1, use 1/3 = 0.333… times 3 rather than limits.
- Past Matura tasks for AG 1: about 35 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AG 1 (basic algebraic terms and concepts).
