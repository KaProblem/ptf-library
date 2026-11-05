---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/differentiation-rules
title: Differentiation rules
description: The power rule, sum rule, constant factor rule and the rule for f(k · x), applied to polynomials, roots, reciprocals, exponential and sine functions, as required for the Austrian AHS Matura (AN 2).
lang: en
levels: [highschool]
objectives:
  - id: an-2-1
    text: Know and apply the simple rules of differentiation, power rule, sum rule, (k · f(x))′ and (f(k · x))′.
tags: [mathematics, calculus, derivative, differentiation-rules, matura, austria, an-2]
about:
  - wikidata: Q90011163
    label: differentiation rule
duration_min: { highschool: 60 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich AN 2"
generated: { by: claude/opus, at: 2026-11-06T00:20:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: f(x) = x². Compute the difference quotient (f(3 + h) − f(3)) / h for h = 0.1 and h = 0.01. Which number do the results approach? Can you guess a rule for f′(x)?
- Computing every derivative as a limit would be slow. Four rules cover almost everything the Matura needs, and each one can be checked with a difference quotient.
- Afterwards the learner can differentiate polynomials, roots, reciprocals, e^(kx) and sin(kx) quickly and safely. AN 2 is rarely a task of its own, but it is needed in almost every Analysis task.

# Core

The power rule says (xⁿ)′ = n · xⁿ⁻¹ for every real exponent n; it also
covers roots (√x = x^(1/2)) and reciprocals (1/x = x⁻¹). Constants drop out:
(c)′ = 0. A constant factor stays: (k · f(x))′ = k · f′(x). Sums are
differentiated term by term: (f + g)′ = f′ + g′. If x is multiplied by a
constant inside the function, the derivative gets that factor:
(f(k · x))′ = k · f′(k · x). Together with (eˣ)′ = eˣ, (sin x)′ = cos x and
(cos x)′ = −sin x this gives, for example, (e^(2x))′ = 2e^(2x) and
(sin(3x))′ = 3 cos(3x).

# Key facts

- (xⁿ)′ = n · xⁿ⁻¹: (x⁵)′ = 5x⁴; (x)′ = 1; (5)′ = 0.
- (√x)′ = (x^(1/2))′ = ½ x^(−1/2) = 1 / (2√x); (1/x)′ = (x⁻¹)′ = −x⁻² = −1/x².
- (3x⁴ − 2x + 5)′ = 12x³ − 2; at x = 2: 12 · 8 − 2 = 94.
- (k · f)′ = k · f′: (7 sin x)′ = 7 cos x.
- (f(k · x))′ = k · f′(k · x): (e^(2x))′ = 2e^(2x); (sin(3x))′ = 3 cos(3x); ((2x)³)′ = 3 · (2x)² · 2 = 24x².
- Check any rule with a difference quotient: for x² at 3, h = 0.01 gives 6.01, close to f′(3) = 6.
- Matura terms (German): Ableitungsregeln, Potenzregel, Summenregel, Faktorregel, Regel für f(k · x). Typical Teil-1 formats: 2 aus 5 (which derivative is correct), offen (compute f′(x₀)).

# Level: highschool

<!-- ptf:text v1 -->

Start with x² at x = 3: h = 0.1 gives 6.1, h = 0.01 gives 6.01. The slope is
6, which is 2 · 3. For x³ the same experiment at 2 gives about 12 = 3 · 2².
That is the power rule: bring the exponent down as a factor and lower it
by one.

The other rules say that derivatives respect the simple operations: a
factor in front stays, a sum is differentiated piece by piece, a constant
term disappears because it does not change anything. Write roots and
fractions as powers first, then apply the power rule.

If x is scaled inside, as in e^(2x) or sin(3x), the function runs that many
times faster, so its slope is that many times larger: multiply by the
inner factor.

# Misconceptions

- **constant-stays**: (x² + 5)′ = 2x + 5 → constants drop out: 2x.
- **exponent-not-lowered**: (x³)′ = 3x³ → lower the exponent: 3x².
- **root-rule**: (√x)′ = √x / 2 or 1/√x → (√x)′ = 1 / (2√x).
- **reciprocal-rule**: (1/x)′ = 1 → (1/x)′ = −1/x².
- **inner-factor-missing**: (e^(2x))′ = e^(2x) → 2e^(2x).

# Questions

```ptf-question
{
  "kind": "calculation_steps",
  "id": "guess-the-rule",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "exponent-not-lowered",
  "title": "Difference quotients of x²",
  "intro": "f(x) = x². Compute (f(3 + h) − f(3)) / h for smaller h.",
  "columns": ["h", "Difference quotient", "Value"],
  "rows": [
    ["0.1", "(9.61 − 9) / 0.1", "6.1"],
    ["0.01", "(9.0601 − 9) / 0.01", "6.01"],
    ["0.001", "(9.006001 − 9) / 0.001", "6.001"]
  ],
  "result": { "label": "f′(3)", "value": "6" },
  "explanation": "(3 + h)² − 9 = 6h + h², so the quotient is 6 + h → 6. In general (x²)′ = 2x."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "polynomial-derivative",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-2-1"],
  "misconception": "constant-stays",
  "question": "f(x) = 3x⁴ − 2x + 5. Compute f′(2).",
  "answer": 94,
  "tolerance": 0,
  "explanation": "f′(x) = 12x³ − 2, f′(2) = 96 − 2 = 94."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-derivatives",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-2-1"],
  "misconception": "root-rule",
  "question": "Which two derivatives are correct?",
  "options": [
    { "text": "(√x)′ = 1 / (2√x)", "correct": true, "feedback": "Yes: (x^(1/2))′ = ½ x^(−1/2)." },
    { "text": "(4 / x)′ = −4 / x²", "correct": true, "feedback": "Yes: 4 · (x⁻¹)′ = −4x⁻²." },
    { "text": "(x³ + 7)′ = 3x² + 7", "correct": false, "feedback": "The constant 7 drops out." },
    { "text": "(1 / x)′ = 1", "correct": false, "feedback": "1/x = x⁻¹, so the derivative is −x⁻²." },
    { "text": "(x⁵)′ = 5x⁵", "correct": false, "feedback": "The exponent goes down by one: 5x⁴." }
  ],
  "explanation": "Write roots and fractions as powers, then use (xⁿ)′ = n · xⁿ⁻¹."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "inner-factor",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-2-1"],
  "misconception": "inner-factor-missing",
  "question": "Which two derivatives are correct?",
  "options": [
    { "text": "(e^(2x))′ = 2e^(2x)", "correct": true, "feedback": "Yes: rule for f(k · x) with k = 2." },
    { "text": "(5 sin(3x))′ = 15 cos(3x)", "correct": true, "feedback": "Yes: factor 5 stays, inner factor 3 comes out." },
    { "text": "(e^(2x))′ = e^(2x)", "correct": false, "feedback": "The inner factor 2 is missing." },
    { "text": "(cos(2x))′ = 2 sin(2x)", "correct": false, "feedback": "(cos u)′ = −sin u: the result is −2 sin(2x)." },
    { "text": "((2x)³)′ = 3(2x)²", "correct": false, "feedback": "The inner factor 2 is missing: 6(2x)² = 24x²." }
  ],
  "explanation": "(f(k · x))′ = k · f′(k · x)."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "root-slope",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["an-2-1"],
  "misconception": "root-rule",
  "question": "f(x) = 6√x. What is the slope of the graph at x = 9?",
  "answer": 1,
  "tolerance": 0,
  "explanation": "f′(x) = 6 · 1 / (2√x) = 3 / √x; f′(9) = 3 / 3 = 1."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rules-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["an-2-1"],
  "misconception": "constant-stays",
  "question": "What is the derivative of f(x) = 2x³ − 4x + 1?",
  "options": [
    { "text": "6x² − 4", "correct": true, "feedback": "Yes: power rule term by term; the constant drops out." },
    { "text": "6x² − 4 + 1", "correct": false, "feedback": "The constant 1 does not change anything, its derivative is 0." },
    { "text": "6x³ − 4x", "correct": false, "feedback": "The exponents must go down by one." }
  ],
  "explanation": "(2x³)′ = 6x², (−4x)′ = −4, (1)′ = 0."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "why-constant-drops",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["an-2-1"],
  "question": "Explain, using the graph or a difference quotient, why f(x) and f(x) + 5 have the same derivative.",
  "rubric": [
    "f(x) + 5 is the graph of f shifted 5 units up",
    "Shifting up does not change the steepness at any point",
    "In the difference quotient the 5 cancels: ((f(x+h) + 5) − (f(x) + 5)) / h = (f(x+h) − f(x)) / h"
  ],
  "sample_answer": "Adding 5 moves the whole graph up by 5 without tilting it, so every tangent has the same slope. In the difference quotient the 5 appears twice and cancels, so the limit is the same: (f + 5)′ = f′.",
  "explanation": "Constants drop out when differentiating."
}
```

# Tutor notes

- When the learner is unsure, check a rule with a difference quotient on the calculator; it builds trust in the rules.
- AN 2 is mostly a tool for AN 3 and Teil 2: practise it inside those tasks rather than in isolation.
- Past Matura tasks for AN 2: about 8 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area AN 2 (differentiation rules).
