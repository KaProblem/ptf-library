---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/distributions
title: Random variables and the binomial distribution
description: Random variables, probability distributions, expected value and standard deviation, and the binomial distribution with its formula, expected value, standard deviation and the conditions under which it is a sensible model, as required for the Austrian AHS Matura (WS 3).
lang: en
levels: [highschool]
objectives:
  - id: ws-3-1
    text: Understand and use the terms random variable, probability distribution, expected value and standard deviation.
  - id: ws-3-2
    text: Know the binomial distribution as a model of a discrete distribution, give its probabilities, and compute its expected value and standard deviation.
  - id: ws-3-3
    text: Recognise and describe situations that can be modelled with a binomial distribution.
tags: [mathematics, probability, random-variable, expected-value, binomial-distribution, matura, austria, ws-3]
about:
  - wikidata: Q185547
    label: binomial distribution
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich WS 3"
generated: { by: claude/opus, at: 2026-11-05T22:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess: at a school fair you pay € 1 for a ticket. With probability 0.1 you win € 5, with 0.3 you win € 1 back, otherwise nothing. Is the game fair, good for you, or good for the school?
- A random variable puts a number on every outcome: the winnings, the number of defective parts, the number of correct guesses. Its distribution says how likely each number is, and the expected value says what you get on average in the long run.
- Afterwards the learner can work with distributions, compute expected values and standard deviations, recognise binomial situations and compute binomial probabilities. WS 3 brings about one Teil-1 task per exam and is common in Teil 2.

# Core

A random variable X assigns a number to every outcome of a random
experiment. Its probability distribution lists the possible values with
their probabilities, which add up to 1. The expected value
E(X) = Σ xᵢ · P(X = xᵢ) is the long-run average; the standard deviation
σ = √(Σ (xᵢ − E(X))² · P(X = xᵢ)) measures how far the values typically
scatter around it. A binomial distribution describes the number of
successes in n independent trials, each with the same success probability
p: P(X = k) = C(n, k) · p^k · (1 − p)^(n − k), with E(X) = n · p and
σ = √(n · p · (1 − p)). It fits only if the number of trials is fixed, each
trial has just two outcomes, p stays the same and the trials do not
influence each other.

# Key facts

- Distribution: values xᵢ with P(X = xᵢ) ≥ 0 and Σ P(X = xᵢ) = 1.
- School fair: winnings 5, 1, 0 with probabilities 0.1, 0.3, 0.6 → E = 0.5 + 0.3 = € 0.80; after paying € 1 the expected gain is −€ 0.20 per game (good for the school). σ ≈ € 1.47.
- Binomial: X ~ B(n, p). P(X = k) = C(n, k) · p^k · (1 − p)^(n − k).
- n = 10, p = 0.3: P(X = 3) ≈ 0.267; P(X ≤ 2) ≈ 0.383; P(X ≥ 1) = 1 − 0.7^10 ≈ 0.972; E = 3; σ = √2.1 ≈ 1.45.
- n = 20, p = 0.05 (defective parts): P(X = 0) ≈ 0.358, P(X ≥ 1) ≈ 0.642.
- "At least" via the complement: P(X ≥ 1) = 1 − P(X = 0); P(X ≥ 3) = 1 − P(X ≤ 2).
- Binomial conditions: fixed n; two outcomes per trial; constant p; independent trials. Drawing without replacement from a small group violates constant p (then the binomial is at best an approximation).
- Technology: GeoGebra and calculators give binomial probabilities (binompdf, binomcdf); state n, p and k.
- Matura terms (German): Zufallsvariable (Zufallsgröße), Wahrscheinlichkeitsverteilung, Erwartungswert, Varianz, Standardabweichung, binomialverteilt, Trefferwahrscheinlichkeit, „höchstens“, „mindestens“, „genau“. Typical Teil-1 formats: 2 aus 5 (which situations are binomial), offen (compute a probability or E), Lückentext (meaning of n · p).

# Level: highschool

<!-- ptf:text v1 -->

Start with the school fair. Imagine 100 games: about 10 win € 5, 30 win
€ 1 and 60 win nothing. That is 50 + 30 = € 80 paid out for € 100 taken in,
so on average € 0.80 per game. That average is the expected value. Because
a ticket costs € 1, a player loses € 0.20 per game in the long run.

Many questions count successes: how many of 10 free throws go in, how many
of 20 parts are defective. If every trial has the same chance p and the
trials do not affect each other, the count is binomially distributed. The
formula has three parts: C(n, k) counts in which trials the k successes
happen, p^k is the chance of these successes and (1 − p)^(n − k) the chance
of the failures in the others.

On average you expect n · p successes. With 10 trials and p = 0.3 that is 3,
but exactly 3 happens only about a quarter of the time. The standard
deviation, here about 1.45, says how far the count usually strays from 3.

# Misconceptions

- **expected-value-happens**: The expected value is the most likely outcome or must occur → it is the long-run average; it may not even be a possible value.
- **expected-equals-mode**: E(X) = 3 means P(X = 3) is large → P(X = 3) ≈ 0.27 for B(10, 0.3); the other values together are much more likely.
- **forget-binomial-coefficient**: P(X = 3) = 0.3³ · 0.7⁷ → this is one particular order; multiply by C(10, 3) = 120 orders.
- **binomial-without-replacement**: Drawing 5 cards from a small deck is binomial → without replacement p changes from draw to draw.
- **at-least-complement-wrong**: P(X ≥ 3) = 1 − P(X ≤ 3) → it is 1 − P(X ≤ 2).
- **probabilities-dont-sum**: Any list of probabilities is a distribution → they must add up to 1.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "fair-expected",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "expected-value-happens",
  "question": "A ticket costs € 1. You win € 5 with probability 0.1, € 1 with probability 0.3, otherwise nothing. What is the expected payout per game in €? Guess whether it is above or below the ticket price first.",
  "answer": 0.8,
  "tolerance": 0,
  "unit": "€",
  "explanation": "E = 5 · 0.1 + 1 · 0.3 + 0 · 0.6 = 0.80 €; with the ticket the expected gain is −0.20 € per game."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "valid-distribution",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-3-1"],
  "misconception": "probabilities-dont-sum",
  "question": "A random variable X takes the values 0, 1, 2, 3. Which two lists can be its probability distribution (P(X = 0), …, P(X = 3))?",
  "options": [
    { "text": "0.1, 0.2, 0.3, 0.4", "correct": true, "feedback": "Yes: all between 0 and 1, sum 1." },
    { "text": "0.25, 0.25, 0.25, 0.25", "correct": true, "feedback": "Yes: equal probabilities that add up to 1." },
    { "text": "0.2, 0.3, 0.4, 0.5", "correct": false, "feedback": "The sum is 1.4." },
    { "text": "0.5, 0.6, −0.2, 0.1", "correct": false, "feedback": "A probability cannot be negative, even if the sum is 1." },
    { "text": "0.1, 0.1, 0.1, 0.1", "correct": false, "feedback": "The sum is only 0.4." }
  ],
  "explanation": "A distribution needs probabilities between 0 and 1 that add up to 1."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "expected-meaning",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-3-1"],
  "misconception": "expected-value-happens",
  "question": "X is the number of heads when a fair coin is tossed 3 times, E(X) = 1.5. Which statement is true?",
  "options": [
    { "text": "In many series of 3 tosses, the average number of heads is about 1.5", "correct": true, "feedback": "Yes: the expected value is the long-run average." },
    { "text": "Most series give exactly 1.5 heads", "correct": false, "feedback": "1.5 heads is impossible; X takes only whole numbers." },
    { "text": "1.5 is the most likely value of X", "correct": false, "feedback": "1 and 2 are the most likely values, each with 3/8." },
    { "text": "In every series of 3 tosses there are 1 or 2 heads", "correct": false, "feedback": "0 or 3 heads happen with 1/8 each." }
  ],
  "explanation": "The expected value describes the average over many repetitions, not a single result."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "binomial-exactly",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-3-2"],
  "misconception": "forget-binomial-coefficient",
  "question": "A basketball player hits a free throw with probability 0.3, independently. She takes 10 free throws. How likely is it that she hits exactly 3? Give the probability rounded to three decimals.",
  "answer": 0.267,
  "tolerance": 0.001,
  "explanation": "P(X = 3) = C(10, 3) · 0.3³ · 0.7⁷ = 120 · 0.027 · 0.0824 ≈ 0.267."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "binomial-at-least",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-3-2"],
  "misconception": "at-least-complement-wrong",
  "title": "At least one defective part",
  "intro": "5 % of the parts from a machine are defective, independently. A box holds 20 parts; X is the number of defective parts.",
  "columns": ["Step", "Calculation", "Value"],
  "rows": [
    ["Expected number of defective parts", "E(X) = 20 · 0.05", "1"],
    ["No defective part", "P(X = 0) = 0.95²⁰", "0.358"],
    ["At least one defective part", "1 − P(X = 0)", "0.642"],
    ["At most one defective part", "P(X = 0) + 20 · 0.05 · 0.95¹⁹", "0.736"]
  ],
  "result": { "label": "P(X ≥ 1)", "value": "≈ 0.642" },
  "explanation": "\"At least one\" is the complement of \"none\"."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "binomial-parameters",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-3-2"],
  "text": "X is binomially distributed with n = 10 and p = 0.3. The expected value is E(X) = {{1}} and the variance is {{2}}.",
  "gaps": [
    { "answer": "3" },
    { "answer": "2.1", "accepted": ["2,1"] }
  ],
  "explanation": "E = n · p = 3, Var = n · p · (1 − p) = 10 · 0.3 · 0.7 = 2.1, σ ≈ 1.45."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "is-it-binomial",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-3-3"],
  "misconception": "binomial-without-replacement",
  "question": "In which two situations is X binomially distributed?",
  "options": [
    { "text": "X = number of sixes in 12 throws of a fair die", "correct": true, "feedback": "Yes: n = 12 independent throws, p = 1/6 each time." },
    { "text": "X = number of correct answers when guessing 8 questions with 4 options each, one of them right", "correct": true, "feedback": "Yes: n = 8, p = 1/4, guesses independent." },
    { "text": "X = number of red cards when drawing 5 cards without replacement from 10 cards, 4 of them red", "correct": false, "feedback": "Without replacement p changes after each draw." },
    { "text": "X = number of throws until the first six", "correct": false, "feedback": "The number of trials is not fixed." },
    { "text": "X = sum of the numbers shown by two dice", "correct": false, "feedback": "This is not a count of successes in repeated yes/no trials." }
  ],
  "explanation": "Binomial: fixed n, two outcomes per trial, constant p, independent trials."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "formula-meaning",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-3-2", "ws-3-3"],
  "misconception": "forget-binomial-coefficient",
  "question": "In a quiz with 8 questions, each with 4 options, someone guesses every answer. What does 1 − 0.75⁸ describe?",
  "options": [
    { "text": "The probability of at least one correct answer", "correct": true, "feedback": "Yes: 0.75⁸ is the probability of no correct answer." },
    { "text": "The probability of exactly one correct answer", "correct": false, "feedback": "That would be 8 · 0.25 · 0.75⁷." },
    { "text": "The probability of all answers correct", "correct": false, "feedback": "That would be 0.25⁸." },
    { "text": "The expected number of correct answers", "correct": false, "feedback": "That would be 8 · 0.25 = 2." }
  ],
  "explanation": "1 − P(X = 0) = P(X ≥ 1)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "expected-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ws-3-1", "ws-3-2"],
  "misconception": "expected-equals-mode",
  "question": "X ~ B(10, 0.3), so E(X) = 3. Which is true?",
  "options": [
    { "text": "P(X = 3) is about 0.27, so X ≠ 3 is more likely than X = 3", "correct": true, "feedback": "Yes: the expected value is the average, not a likely single result." },
    { "text": "P(X = 3) is about 0.9, because 3 is expected", "correct": false, "feedback": "Compute it: C(10, 3) · 0.3³ · 0.7⁷ ≈ 0.27." },
    { "text": "P(X = 3) = 0.3, because p = 0.3", "correct": false, "feedback": "p is the chance per trial, not of exactly 3 successes." }
  ],
  "explanation": "E(X) = n · p is the long-run average count."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "model-check",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ws-3-3"],
  "misconception": "binomial-without-replacement",
  "question": "A class of 24 students has 6 left-handers. 4 students are chosen at random for a project. Someone models the number of left-handers chosen with B(4, 0.25). Is that correct? Explain.",
  "rubric": [
    "The students are chosen without replacement, so the probability changes after each pick",
    "For example, after one left-hander is picked the chance for the next is 5/23, not 6/24",
    "So the trials are not independent with constant p: not exactly binomial",
    "The binomial model would be only a rough approximation here, because the group is small"
  ],
  "sample_answer": "Not exactly. Each student can be chosen only once, so after a left-hander is picked only 5 of the remaining 23 are left-handed: p changes from 6/24 to 5/23. The trials are not independent with a constant p, so B(4, 0.25) is only an approximation, and a rough one for such a small class.",
  "explanation": "Without replacement from a small group, p is not constant."
}
```

# Tutor notes

- Before any formula, ask for n, p and what counts as a success; most errors come from a wrong model.
- Let the learner compute with technology (binompdf, binomcdf), but have them say the event in words: "exactly", "at most", "at least".
- Past Matura tasks for WS 3: about 40 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them; several tasks listed under WS 2.3 ("Wahrscheinlichkeitsverteilung") also belong here.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area WS 3 (random variables and binomial distribution).
