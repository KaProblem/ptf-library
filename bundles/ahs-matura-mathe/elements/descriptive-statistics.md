---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-mathe/descriptive-statistics
title: Descriptive statistics
description: Reading and building tables and charts, absolute and relative frequencies, mean, median, mode, quartiles, range and standard deviation, their properties and when to use which, as required for the Austrian AHS Matura (WS 1).
lang: en
levels: [highschool]
objectives:
  - id: ws-1-1
    text: Read values from tables and simple charts, compute further figures from them and interpret them in context.
  - id: ws-1-2
    text: Make tables and simple statistical charts and switch between representations.
  - id: ws-1-3
    text: Compute and interpret statistical measures (absolute and relative frequencies, mean, median, mode, quartiles, range, standard deviation) for simple data sets.
  - id: ws-1-4
    text: State and use the definition and key properties of mean and median, determine and interpret quartiles, and justify the choice of a measure.
tags: [mathematics, statistics, mean, median, quartiles, boxplot, matura, austria, ws-1]
about:
  - wikidata: Q380344
    label: descriptive statistics
duration_min: { highschool: 90 }
sources:
  - id: bmbwf-gk-2021
    resource: https://www.matura.gv.at/
    title: "BMBWF: Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), Stand Februar 2021, Inhaltsbereich WS 1"
generated: { by: claude/opus, at: 2026-11-05T21:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess: nine people in a café earn € 2 000 a month each. A tenth person who earns € 52 000 walks in. What is the average income now?
- Statistics turns a pile of numbers into a few that tell the story, and the art is choosing the right few. The mean jumps to € 7 000 in the café, the median stays at € 2 000: which describes the people better?
- Afterwards the learner can read and draw tables, bar charts, pie charts and boxplots, compute mean, median, mode, quartiles, range and standard deviation, and say which measure fits a question. WS 1 brings about one and a half Teil-1 tasks per exam.

# Core

Data are summarised by frequencies: the absolute frequency counts how
often a value occurs, the relative frequency divides by the number of
values. Measures of the centre are the mean (sum divided by the number of
values), the median (the middle value of the sorted list) and the mode
(the most frequent value). The mean reacts strongly to outliers, the
median hardly. Spread is described by the range (largest minus smallest),
the quartiles (Q1 and Q3 cut off the lowest and the highest quarter; the
box of a boxplot holds the middle half) and the standard deviation, a kind
of average distance from the mean. Adding the same number to every value
shifts the centre but not the spread; multiplying every value by a number
multiplies both.

# Key facts

- Mean x̄ = (x₁ + … + xₙ) / n; from a frequency table: Σ value · frequency / n.
- Median: sort; odd n → the middle value; even n → mean of the two middle values. Mode: most frequent value.
- Example 3, 5, 5, 6, 7, 8, 8, 8, 13: mean 63 / 9 = 7, median 7, mode 8, range 10.
- Outliers: café incomes 9 × 2 000 and 52 000 → mean 7 000, median 2 000.
- Quartiles: at least 25 % of the values are ≤ Q1 and at least 75 % are ≤ Q3; the interquartile range Q3 − Q1 contains the middle half. A boxplot shows minimum, Q1, median, Q3, maximum.
- Standard deviation (empirische Standardabweichung) s = √(Σ(xᵢ − x̄)² / n) (the formula sheet also lists the version with n − 1 for samples). It is 0 only if all values are equal; larger means more spread.
- Shifting every value by c: mean and median + c, range and s unchanged. Multiplying every value by k > 0: mean, median, range and s all × k.
- Combined mean of two groups is weighted by their sizes: 20 students with mean 3.0 and 10 with mean 2.4 → (60 + 24) / 30 = 2.8, not 2.7.
- Pie chart: angle = relative frequency · 360°. 8 of 20 → 144°.
- Matura terms (German): absolute / relative Häufigkeit, arithmetisches Mittel, Median, Modus, Quartil, Spannweite, Interquartilsabstand, empirische Varianz / Standardabweichung, Boxplot, Säulen-, Balken-, Kreisdiagramm, Ausreißer. Typical Teil-1 formats: 2 aus 5 (statements about a boxplot), offen (compute a measure), Lückentext.

# Level: highschool

<!-- ptf:text v1 -->

Start with the café. Before the rich guest, everybody earns € 2 000, so mean
and median are both 2 000. Add one person with € 52 000: nine times 2 000 is
18 000, plus 52 000 gives 70 000 for 10 people, a mean of € 7 000. The
median, the middle of the sorted list, is still 2 000. One extreme value
pulls the mean, not the median.

Sorting is the first step for most measures. In the sorted list, the median
splits the data in half, and the quartiles split each half again. A boxplot
draws exactly these five numbers, so you can read "at least half of the
values are below the median" straight from it.

To compare spread, look at the width of the box or at the standard
deviation. Two classes can have the same mean grade and still be very
different: one where everybody gets a 3, one with many 1s and many 5s.

# Misconceptions

- **mean-is-typical**: The mean is always the typical value → with outliers or skewed data the median describes the typical case better.
- **median-unsorted**: The median is the middle value of the list as given → sort first.
- **combined-mean-unweighted**: The mean of two groups is the mean of their means → weight by the group sizes.
- **shift-changes-spread**: Adding 2 points to every result increases the standard deviation → the spread stays the same; only the centre moves.
- **quartile-quarter-of-range**: Q1 lies a quarter of the way from minimum to maximum → it is a value from the data with a quarter of the values below it.
- **boxplot-shows-count**: A longer whisker or box part contains more values → each of the four parts contains about a quarter of the values, whatever its length.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "cafe-mean",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "mean-is-typical",
  "question": "Nine people in a café earn € 2 000 a month each. A tenth who earns € 52 000 joins them. What is the mean monthly income of the ten, in €? Guess first.",
  "answer": 7000,
  "tolerance": 0,
  "unit": "€",
  "explanation": "(9 · 2 000 + 52 000) / 10 = 70 000 / 10 = € 7 000. The median stays € 2 000."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "grade-table-mean",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-1", "ws-1-3"],
  "question": "In a class test (grades 1 to 5) the frequencies were: grade 1: 3, grade 2: 5, grade 3: 8, grade 4: 3, grade 5: 1. What is the mean grade?",
  "answer": 2.7,
  "tolerance": 0,
  "explanation": "(1 · 3 + 2 · 5 + 3 · 8 + 4 · 3 + 5 · 1) / 20 = 54 / 20 = 2.7."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "pie-angle",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-2"],
  "question": "The same results are drawn as a pie chart. How large is the angle of the sector for grade 3 (8 of 20 students), in degrees?",
  "answer": 144,
  "tolerance": 0,
  "unit": "°",
  "explanation": "Relative frequency 8 / 20 = 0.4; 0.4 · 360° = 144°."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "measures",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-3"],
  "misconception": "median-unsorted",
  "text": "Data: 8, 3, 13, 5, 8, 7, 5, 8, 6. The mean is {{1}}, the median is {{2}}, the mode is {{3}} and the range is {{4}}.",
  "gaps": [
    { "answer": "7" },
    { "answer": "7" },
    { "answer": "8" },
    { "answer": "10" }
  ],
  "explanation": "Sorted: 3, 5, 5, 6, 7, 8, 8, 8, 13. Sum 63, mean 7; the fifth value 7 is the median; 8 occurs three times; 13 − 3 = 10."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "boxplot-reading",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-1", "ws-1-4"],
  "misconception": "boxplot-shows-count",
  "question": "A boxplot of the travel times (in minutes) of 200 commuters shows: minimum 5, Q1 = 12, median 15, Q3 = 20, maximum 45. Which two statements are true?",
  "options": [
    { "text": "At least half of the commuters travel 15 minutes or less", "correct": true, "feedback": "Yes: that is what the median says." },
    { "text": "The middle half of the travel times lies between 12 and 20 minutes", "correct": true, "feedback": "Yes: the box from Q1 to Q3." },
    { "text": "More commuters travel between 20 and 45 minutes than between 12 and 15 minutes", "correct": false, "feedback": "Both parts hold about a quarter of the commuters; length shows spread, not count." },
    { "text": "The mean travel time is 15 minutes", "correct": false, "feedback": "The boxplot shows the median; the mean cannot be read from it." },
    { "text": "The interquartile range is 40 minutes", "correct": false, "feedback": "Q3 − Q1 = 8 minutes; 40 is the range." }
  ],
  "explanation": "Each of the four parts of a boxplot holds about a quarter of the data."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "spread-comparison",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-3"],
  "question": "Which data set has the largest standard deviation?",
  "options": [
    { "text": "1, 1, 5, 5", "correct": true, "feedback": "Yes: every value is 2 away from the mean 3." },
    { "text": "3, 3, 3, 3", "correct": false, "feedback": "All values are equal: s = 0." },
    { "text": "2, 3, 3, 4", "correct": false, "feedback": "The values are close to the mean 3: s ≈ 0.71." },
    { "text": "2, 2, 4, 4", "correct": false, "feedback": "Every value is 1 away from 3: s = 1." }
  ],
  "explanation": "All four sets have mean 3; the standard deviation measures how far the values lie from it."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "shift-and-scale",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-4"],
  "misconception": "shift-changes-spread",
  "question": "A teacher adds 2 points to every student's test score. Which two statements are true?",
  "options": [
    { "text": "The mean increases by 2", "correct": true, "feedback": "Yes: every value is 2 larger, so their mean is too." },
    { "text": "The standard deviation stays the same", "correct": true, "feedback": "Yes: the distances from the mean do not change." },
    { "text": "The median stays the same", "correct": false, "feedback": "The middle value is also 2 larger." },
    { "text": "The range increases by 2", "correct": false, "feedback": "Largest and smallest both move by 2; their difference stays." },
    { "text": "The standard deviation increases by 2", "correct": false, "feedback": "Shifting moves the data, it does not spread it." }
  ],
  "explanation": "Shifting by c moves the centre by c and leaves the spread unchanged."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "combined-mean",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-4"],
  "misconception": "combined-mean-unweighted",
  "question": "Class A (20 students) has a mean grade of 3.0, class B (10 students) has 2.4. What is the mean grade of all 30 students?",
  "answer": 2.8,
  "tolerance": 0,
  "explanation": "(20 · 3.0 + 10 · 2.4) / 30 = 84 / 30 = 2.8. The simple mean of the means, 2.7, ignores that A is twice as large."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-measure",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["ws-1-4"],
  "misconception": "mean-is-typical",
  "question": "A newspaper wants to report the typical price of flats sold in a town. A few luxury flats cost ten times as much as the others. Which measure fits best?",
  "options": [
    { "text": "The median, because a few very expensive flats hardly change it", "correct": true, "feedback": "Yes: it shows the price of the flat in the middle." },
    { "text": "The mean, because it uses all prices", "correct": false, "feedback": "Using all prices is exactly why the luxury flats pull it up." },
    { "text": "The range, because it shows the prices", "correct": false, "feedback": "The range is a measure of spread, not of the typical price." },
    { "text": "The maximum", "correct": false, "feedback": "That is the most expensive flat, not a typical one." }
  ],
  "explanation": "With outliers or skewed data the median is the better typical value."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "median-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["ws-1-3"],
  "misconception": "median-unsorted",
  "question": "What is the median of 9, 2, 7, 3?",
  "options": [
    { "text": "5", "correct": true, "feedback": "Yes: sorted 2, 3, 7, 9; the mean of the two middle values is (3 + 7) / 2." },
    { "text": "4.5", "correct": false, "feedback": "That takes the middle values 2 and 7 of the unsorted list. Sort first." },
    { "text": "5.25", "correct": false, "feedback": "That is the mean, (9 + 2 + 7 + 3) / 4." }
  ],
  "explanation": "Sort, then take the middle value or the mean of the two middle values."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "two-classes",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["ws-1-3", "ws-1-4"],
  "question": "Two classes wrote the same test. Both have a mean of 3.0, but class A has a standard deviation of 0.4 and class B of 1.4. Describe how the results of the classes differ, and say what a teacher could conclude.",
  "rubric": [
    "Same centre: on average the classes did equally well",
    "Class A: results close together, most students near 3",
    "Class B: results widely spread, many good and many weak results",
    "A sensible conclusion, e.g. class B needs more differentiated support"
  ],
  "sample_answer": "On average both classes did equally well. In class A almost everybody scored close to a 3, while in class B the results are spread widely: there are probably many 1s and 2s and many 4s and 5s. A teacher might give class B more differentiated tasks and extra help for the weaker students.",
  "explanation": "Centre and spread answer different questions; report both."
}
```

# Tutor notes

- Most WS 1 tasks are reading tasks with a chart; let the learner state what each part of a boxplot means before answering.
- Calculators and GeoGebra compute mean, median and standard deviation; check which version of s (n or n − 1) a tool uses.
- Past Matura tasks for WS 1: about 55 Teil-1 tasks since 2014. When the learner brings one (photo or PDF), guide them through it step by step instead of solving it for them.

# Sources

Grounding: [^bmbwf-gk-2021]. Text, examples and questions are original.

[^bmbwf-gk-2021]: Bundesministerium für Bildung, Wissenschaft und Forschung, Mathematische Grundkompetenzen für die SRP in Mathematik (AHS), February 2021, content area WS 1 (descriptive statistics).
