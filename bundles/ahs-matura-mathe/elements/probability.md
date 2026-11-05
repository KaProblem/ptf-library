---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/probability
title: Probability
description: Sample spaces and events, relative frequency as an estimate, Laplace probability, the addition and multiplication rules with tree diagrams, and binomial coefficients, as required for the Austrian AHS Matura (WS 2).
lang: en
levels: [highschool]
objectives:
  - id: ws-2-1
    text: Write down the sample space and events of a random experiment in words and as sets, including the complementary event.
  - id: ws-2-2
    text: Use a relative frequency from many trials as an estimate of a probability, and say how reliable it is.
  - id: ws-2-3
    text: Compute and interpret probabilities with the Laplace rule, the addition rule and the multiplication rule, also along a tree diagram.
  - id: ws-2-4
    text: Compute binomial coefficients and interpret them as the number of ways to choose k out of n.
tags: [mathematics, probability, laplace, tree-diagram, binomial-coefficient, matura, austria, ws-2]
about:
  - wikidata: Q9492
    label: probability
duration_min: { highschool: 120 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich WS 2"
generated: { by: claude/opus, at: 2026-11-05T18:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess first: in a class of 23 students, how likely is it that two of them share a birthday? Most people say about 5 %. It is just over 50 %.
- Probability is counting done carefully: what can happen, which of it counts, and how the steps combine. The surprises come from counting the wrong thing.
- Afterwards the learner can write down sample spaces and events, estimate probabilities from data, compute them with the Laplace, addition and multiplication rules and a tree diagram, and count choices with binomial coefficients. This is WS 2 of the Matura catalogue, the area with the most Teil-1 tasks: almost three per exam.

# Core

A random experiment has a set of possible outcomes, the sample space Ω. An
event is a subset of Ω; its complement contains every outcome not in it.
If all outcomes are equally likely, P(E) = favourable / possible (Laplace).
Otherwise a probability can be estimated by the relative frequency in many
trials. Probabilities combine by two rules: along one path of a tree
diagram you multiply ("and", one step after the other), across different
paths that lead to the event you add ("or", outcomes that cannot happen
together). "At least one" is usually easiest through the complement:
P(at least one) = 1 − P(none). The number of ways to choose k objects out
of n, ignoring order, is the binomial coefficient C(n, k) = n! / (k! (n − k)!).

# Key facts

- Ω for one die: {1, 2, 3, 4, 5, 6}; for two dice: 36 ordered pairs (1|1) … (6|6); for three coin tosses: 8 sequences HHH … TTT.
- 0 ≤ P(E) ≤ 1; P(Ω) = 1; P(not E) = 1 − P(E).
- Laplace only when every outcome is equally likely: sum of two dice = 8 → pairs (2|6), (3|5), (4|4), (5|3), (6|2) → 5/36 ≈ 13.9 %. The sums 2 … 12 themselves are not equally likely.
- Relative frequency h = k / n estimates P(E); it scatters less the larger n is (law of large numbers). 37 defective in 10 000 → P ≈ 0.37 %.
- Addition rule: P(A or B) = P(A) + P(B) − P(A and B); for events that cannot happen together, P(A and B) = 0.
- Multiplication rule: P(A and then B) = P(A) · P(B | A). Without replacement the second factor changes: 4 red and 6 blue balls, draw two → both red 4/10 · 3/9 = 2/15 ≈ 13.3 %. Independent steps (coin, die, with replacement) keep the same factor.
- Tree diagram: multiply along a path, add the paths that belong to the event; the branches leaving each node add to 1.
- At least one six in four throws: 1 − (5/6)^4 ≈ 51.8 %.
- Birthday: P(all 23 different) = 365/365 · 364/365 · … · 343/365 ≈ 49.3 %, so P(a shared birthday) ≈ 50.7 %.
- Binomial coefficient: C(20, 3) = 1140 ways to choose 3 out of 20; C(n, k) = C(n, n − k); C(n, 0) = C(n, n) = 1; C(45, 6) = 8 145 060 (Austrian Lotto "6 aus 45").
- Matura terms (German): Grundraum, Ereignis, Gegenereignis, relative Häufigkeit, Laplace-Wahrscheinlichkeit, Additionsregel, Multiplikationsregel, Baumdiagramm, „mit/ohne Zurücklegen“, Binomialkoeffizient. Typical Teil-1 formats: offen (compute a probability), 2 aus 5 (which events or expressions fit), Lückentext.

# Level: highschool

<!-- ptf:text v1 -->

Start with two dice. Which sum comes up more often, 7 or 12? Write down all
36 ordered pairs and count: 7 can be made in six ways, 12 only as (6|6). So
P(7) = 6/36 and P(12) = 1/36. The trick of the Laplace rule is to count
outcomes that are really equally likely, here the ordered pairs, not the
sums.

When an experiment has several steps, draw a tree. On each branch write the
probability of that step given everything before it. A path is "this and
then that", so you multiply along it. An event usually consists of several
paths, and you add them. If you draw without putting things back, the
numbers on the second level change.

Many Matura tasks ask for "at least one". Instead of adding up all the ways
to get one, two, three … successes, compute the single case "none" and
subtract it from 1.

Choosing a team of 3 out of 20 people, where order does not matter, gives
C(20, 3) = 1140 possibilities; calculators and GeoGebra call it nCr.

# Misconceptions

- **sums-equally-likely**: With two dice every sum from 2 to 12 has the same chance → the sums are not equally likely; count the 36 ordered pairs.
- **gamblers-fallacy**: After five reds in a row, black is now more likely → each spin is independent; the probability stays the same.
- **add-for-and**: "A and B" means adding the probabilities → for "and then" multiply along the path; add only across paths for "or".
- **at-least-one-by-multiplying**: P(at least one six in four throws) = 4 · 1/6 → that counts overlapping cases twice and can exceed 1; use 1 − (5/6)^4.
- **without-replacement-same**: Drawing without replacement keeps the same probabilities on the second draw → the second draw has one ball fewer, so the fractions change.
- **small-sample-reliable**: A relative frequency from 20 trials is as good an estimate as one from 2 000 → small samples scatter much more.
- **birthday-intuition**: With 23 people a shared birthday is very unlikely → about 253 pairs of people could match, so it is about 50 %.
- **order-in-choose**: C(n, k) counts ordered arrangements → it counts unordered selections; ordered ones are C(n, k) · k!.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "birthday",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "birthday-intuition",
  "question": "A class has 23 students (ignore 29 February, all birthdays equally likely). How likely is it, in percent, that at least two share a birthday? Guess first.",
  "answer": 50.7,
  "tolerance": 10,
  "unit": "%",
  "explanation": "P(all different) = 365/365 · 364/365 · … · 343/365 ≈ 0.493, so P(a shared birthday) ≈ 1 − 0.493 = 50.7 %."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "sample-space-coins",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-1"],
  "question": "A coin is tossed three times; H is heads, T is tails. Which two statements are true?",
  "options": [
    { "text": "The sample space has 8 outcomes", "correct": true, "feedback": "Yes: 2 · 2 · 2 sequences, from HHH to TTT." },
    { "text": "The complement of \"at least one H\" is \"no H at all\", that is {TTT}", "correct": true, "feedback": "Right: every outcome that is not in the event, and that is only TTT." },
    { "text": "The complement of \"exactly two H\" is \"exactly two T\"", "correct": false, "feedback": "The complement also contains HHH and TTT; \"exactly two T\" has only 3 outcomes." },
    { "text": "The event \"exactly one H\" has 1 outcome", "correct": false, "feedback": "HTT, THT and TTH: 3 outcomes, because the order of the tosses counts." },
    { "text": "The sample space is {0 H, 1 H, 2 H, 3 H} with equally likely outcomes", "correct": false, "feedback": "You can describe the results by the number of heads, but these four are not equally likely (1, 3, 3, 1 sequences)." }
  ],
  "explanation": "Writing all 8 sequences makes complements and counts easy to read off."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "two-dice-events",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-1", "ws-2-3"],
  "misconception": "sums-equally-likely",
  "text": "Two fair dice are thrown. The sample space of ordered pairs has {{1}} outcomes. The event \"at least one six\" contains {{2}} of them.",
  "gaps": [
    { "answer": "36" },
    { "answer": "11" }
  ],
  "explanation": "6 · 6 = 36 ordered pairs; at least one six: 36 − 25 = 11 (the 25 pairs without a six are the complement)."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "relative-frequency",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-2"],
  "question": "A factory tests 10 000 phones and finds 37 defective. Estimate the probability that a phone from this production is defective, in percent.",
  "answer": 0.37,
  "tolerance": 0.01,
  "unit": "%",
  "explanation": "The relative frequency 37 / 10 000 = 0.0037 = 0.37 % is the estimate."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "reliable-estimate",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-2"],
  "misconception": "small-sample-reliable",
  "question": "Ana throws a drawing pin 20 times and it lands point up 13 times. Ben throws the same kind of pin 2 000 times: point up 1 160 times. Which statement is true?",
  "options": [
    { "text": "Ben's estimate of 58 % is more reliable than Ana's 65 %", "correct": true, "feedback": "Yes: with more trials the relative frequency scatters less around the true probability." },
    { "text": "Both estimates are equally reliable because they use the same pin", "correct": false, "feedback": "The pin is the same, but 20 trials leave much more room for chance." },
    { "text": "The true probability must be exactly 58 %", "correct": false, "feedback": "A relative frequency is only an estimate, even after 2 000 trials." },
    { "text": "Ana's estimate is better because it is higher", "correct": false, "feedback": "Being higher says nothing about reliability." }
  ],
  "explanation": "Relative frequencies stabilise as the number of trials grows (law of large numbers)."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "laplace-sum-eight",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-3"],
  "misconception": "sums-equally-likely",
  "question": "Two fair dice are thrown. What is the probability that the sum is 8, in percent?",
  "answer": 13.9,
  "tolerance": 0.1,
  "unit": "%",
  "explanation": "Favourable pairs: (2|6), (3|5), (4|4), (5|3), (6|2), so 5/36 ≈ 13.9 %."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "without-replacement",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-3"],
  "misconception": "without-replacement-same",
  "title": "Two balls without replacement",
  "intro": "A bag holds 4 red and 6 blue balls. Two balls are drawn one after the other without putting the first one back.",
  "columns": ["Step", "Formula", "Value"],
  "rows": [
    ["First ball red", "4/10", "0.4"],
    ["Second ball red, given the first was red", "3/9", "0.333"],
    ["Both red (multiply along the path)", "4/10 · 3/9", "0.133"],
    ["One red and one blue (add two paths)", "4/10 · 6/9 + 6/10 · 4/9", "0.533"]
  ],
  "result": { "label": "P(both red)", "value": "2/15 ≈ 13.3 %" },
  "explanation": "Without replacement the bag has 9 balls and one red fewer after the first red draw."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "at-least-one-six",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-3"],
  "misconception": "at-least-one-by-multiplying",
  "question": "A fair die is thrown four times. Which expression gives the probability of at least one six?",
  "options": [
    { "text": "1 − (5/6)^4", "correct": true, "feedback": "Yes: one minus the probability of no six in four throws, about 51.8 %." },
    { "text": "4 · 1/6", "correct": false, "feedback": "That counts throws with two or more sixes several times; with seven throws it would exceed 1." },
    { "text": "(1/6)^4", "correct": false, "feedback": "That is the probability of four sixes in a row." },
    { "text": "1 − (1/6)^4", "correct": false, "feedback": "That is the probability of not throwing four sixes." }
  ],
  "explanation": "\"At least one\" is the complement of \"none\": P = 1 − (5/6)^4 ≈ 0.518."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "tree-two-stages",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-3"],
  "misconception": "add-for-and",
  "question": "A driving test starts with a theory exam. 70 % pass it at the first attempt, and 80 % of them then pass the practical exam. The other 30 % repeat the theory exam; 60 % of them then pass both parts. What share of all candidates passes the whole test this way, in percent?",
  "answer": 74,
  "tolerance": 0.5,
  "unit": "%",
  "explanation": "Path 1: 0.7 · 0.8 = 0.56. Path 2: 0.3 · 0.6 = 0.18. The paths cannot happen together, so add: 0.56 + 0.18 = 0.74 = 74 %."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "addition-rule",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-3"],
  "question": "In a class, 40 % play football, 30 % play tennis and 10 % play both. What percentage plays at least one of the two?",
  "options": [
    { "text": "60 %", "correct": true, "feedback": "Right: 40 % + 30 % − 10 %, because the 10 % who play both were counted twice." },
    { "text": "70 %", "correct": false, "feedback": "This counts the students who play both twice." },
    { "text": "12 %", "correct": false, "feedback": "0.4 · 0.3 would be the share playing both if the sports were independent; it is not the share playing at least one." },
    { "text": "80 %", "correct": false, "feedback": "The overlap is subtracted, not added." }
  ],
  "explanation": "P(A or B) = P(A) + P(B) − P(A and B) = 0.4 + 0.3 − 0.1 = 0.6."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "roulette-streak",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-3"],
  "misconception": "gamblers-fallacy",
  "question": "On a fair roulette wheel (18 red, 18 black, 1 green) red came up five times in a row. What is the probability that the next spin is black?",
  "options": [
    { "text": "18/37, as always", "correct": true, "feedback": "Yes: the wheel has no memory." },
    { "text": "More than 18/37, because black is due", "correct": false, "feedback": "Each spin is independent of the previous ones." },
    { "text": "Less than 18/37, because red is on a streak", "correct": false, "feedback": "A fair wheel has no streaks; the probability stays the same." }
  ],
  "explanation": "Independent spins: the probability of black is 18/37 ≈ 48.6 % every time."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "binomial-coefficient-meaning",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-4"],
  "misconception": "order-in-choose",
  "question": "Which two statements about C(20, 3) are true?",
  "options": [
    { "text": "It is the number of ways to pick a team of 3 out of 20 people", "correct": true, "feedback": "Yes: unordered selections of 3 out of 20." },
    { "text": "It equals C(20, 17)", "correct": true, "feedback": "Right: choosing the 3 who play is the same as choosing the 17 who do not." },
    { "text": "It is the number of ways to award gold, silver and bronze among 20 runners", "correct": false, "feedback": "There order matters: that is C(20, 3) · 3! = 6840." },
    { "text": "It equals 20 · 3 = 60", "correct": false, "feedback": "C(20, 3) = 20 · 19 · 18 / (3 · 2 · 1) = 1140." },
    { "text": "It equals 3^20", "correct": false, "feedback": "3^20 would count sequences of 20 choices with 3 options each." }
  ],
  "explanation": "C(n, k) counts unordered selections of k out of n and is symmetric: C(n, k) = C(n, n − k)."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "lotto",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-2-4", "ws-2-3"],
  "question": "In Lotto \"6 aus 45\", how many different tips (sets of 6 numbers out of 45) are there?",
  "answer": 8145060,
  "tolerance": 0,
  "explanation": "C(45, 6) = 45 · 44 · 43 · 42 · 41 · 40 / 6! = 8 145 060; one tip wins with probability 1 / 8 145 060."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "dice-seven-or-twelve",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ws-2-1", "ws-2-3"],
  "misconception": "sums-equally-likely",
  "question": "Two fair dice are thrown. Which is true?",
  "options": [
    { "text": "A sum of 7 is six times as likely as a sum of 12", "correct": true, "feedback": "Yes: 6 ordered pairs give 7, only (6|6) gives 12." },
    { "text": "Every sum from 2 to 12 has probability 1/11", "correct": false, "feedback": "The 11 sums are not equally likely; count the 36 ordered pairs." },
    { "text": "A sum of 7 is twice as likely as a sum of 12", "correct": false, "feedback": "Count the pairs: (1|6), (2|5), (3|4), (4|3), (5|2), (6|1) against (6|6)." }
  ],
  "explanation": "P(7) = 6/36, P(12) = 1/36."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "why-complement",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ws-2-3"],
  "misconception": "at-least-one-by-multiplying",
  "question": "A smoke detector raises the alarm in a fire with probability 0.9, independently of the others. Three are installed. Explain how to compute the probability that at least one of them raises the alarm, and give the value.",
  "rubric": [
    "Uses the complement: no detector raises the alarm",
    "P(none) = 0.1^3 = 0.001 by the multiplication rule for independent detectors",
    "P(at least one) = 1 − 0.001 = 0.999",
    "Says why adding 0.9 three times is wrong (can exceed 1, overlaps)"
  ],
  "sample_answer": "The complement of \"at least one alarm\" is \"no alarm at all\". Each detector stays silent with probability 0.1, independently, so P(none) = 0.1 · 0.1 · 0.1 = 0.001 and P(at least one) = 0.999. Adding 0.9 + 0.9 + 0.9 = 2.7 is impossible for a probability because it counts the overlaps several times.",
  "explanation": "P(at least one) = 1 − P(none)."
}
```

# Tutor notes

- Let the learner list outcomes before using any formula; most errors come from counting non-equally-likely outcomes.
- Past Matura tasks for WS 2: WS 2.3 alone has about 70 Teil-1 tasks since 2014; when the learner brings one, guide them through it step by step; WS 2.3 tasks often also need WS 3 (distributions).
- Technology is allowed in the exam: show nCr on the calculator or in GeoGebra, but ask for the setup (tree, complement) first.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area WS 2 (probability).
