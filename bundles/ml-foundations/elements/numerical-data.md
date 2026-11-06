---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/numerical-data
title: Preparing numerical features
description: Before numbers go into a model, look at them, then scale them (linear scaling, Z-score, log, clipping) and, when the relation is not linear, bin or transform them.
lang: en
levels: [highschool, college]
objectives:
  - id: inspect
    text: Inspect a numerical feature before training (summary statistics, a plot, outliers, missing or impossible values) and say what to fix.
  - id: normalize
    text: Apply linear scaling, Z-score scaling, log scaling and clipping, and choose one from the shape of the feature's distribution.
  - id: bin-transform
    text: Explain when to bin a feature or add a polynomial term, and build equal-width or quantile bins.
tags: [machine-learning, data, features, normalization, scaling, binning, feature-engineering]
about:
  - wikidata: Q5439686
    label: feature scaling
  - wikidata: Q22245680
    label: feature engineering
requires:
  - ptf:el/ml-foundations/gradient-descent
leads_to:
  - ptf:el/ml-foundations/categorical-data
duration_min: { highschool: 30, college: 30 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Working with numerical data"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a flat-price model gets two features, the size in m² (20 to 120) and the price of the last sale in € (100,000 to 900,000). Which feature will dominate the gradient steps, and is that a good thing?
- Models only see numbers, and they are easily confused by numbers on very different scales, by a few extreme values or by relations that are not straight lines. Preparing features is often more work than training, and it often matters more.
- Afterwards the learner can check a feature for problems, pick and apply a scaling method, and decide when binning or a squared term helps a linear model.

# Core

A numerical feature should be inspected before training: summary
statistics and a histogram show its range, its shape and outliers, and
reveal missing, duplicated or impossible values that must be fixed or
removed. Features on very different scales slow gradient descent and can
make it unstable, so they are normalized. Linear scaling maps a known
range to [0, 1] and suits roughly uniform features; Z-score scaling
subtracts the mean and divides by the standard deviation and suits
roughly bell-shaped ones; log scaling compresses features that span
several orders of magnitude (a few huge values, many small ones); clipping
caps extreme outliers. When a feature's effect on the label is not linear,
a linear model can still use it after binning (one indicator per range of
values) or after adding a transformed version such as x². The same
transformation, with the statistics from the training data, must be
applied at inference.

# Key facts

- Linear scaling: x′ = (x − min) / (max − min). Size 20 to 120 m²: 50 m² → 0.3.
- Z-score: z = (x − mean) / standard deviation. Mean 70, sd 15: 100 → 2.0; 40 → −2.0. About 95 % of a normal distribution lies within z = ±2.
- Log scaling: x′ = log(x) (log₁₀ or ln). Video views 10, 1,000, 1,000,000 → log₁₀ = 1, 3, 6: equal ratios become equal steps.
- Clipping: cap values at a limit, e.g. z-scores at ±3; a value with z = 7 becomes 3. Use for a few extreme outliers you do not want to drop.
- Why normalize: gradient descent converges faster on features of similar scale (no long, narrow loss valley), avoids overflow (NaN), and weights of scaled features become comparable.
- Use the training set's min, max, mean and sd for validation, test and serving data too; recomputing them on new data shifts the feature.
- Binning: replace one number by indicators for ranges. Equal-width bins have the same width; quantile bins hold the same number of examples (1,000 examples, 4 quantile bins → 250 each). Bins let a linear model learn a different weight per range.
- Polynomial transform: adding x² as a feature lets a linear model fit a parabola, e.g. y′ = b + w₁x + w₂x².
- Typical data problems: omitted values, duplicated examples, impossible values (age −3, a house of 0 m²), wrong units mixed in one column (m and cm).

# Level: highschool

<!-- ptf:text v1 -->

Before you train anything, look at your numbers. Take a column with the
sizes of 1,000 flats. What is the smallest and largest value, the average?
Draw a histogram. You might find a flat of 0 m² (a typing error), a flat
of 6,500 m² (someone entered cm instead of m), and a few empty cells. A
model would happily learn from all of them. Fix, remove or fill those
first.

Next, scale. Imagine a model with two features: size (20 to 120) and the
last sale price (100,000 to 900,000). The price numbers are thousands of
times larger, so they dominate every gradient step, and training needs a
tiny learning rate to stay stable. Putting both on a similar scale fixes
that. Three common ways:

- **Linear scaling** squeezes a range into 0 to 1: (x − min) / (max − min). 50 m² becomes (50 − 20) / 100 = 0.3. Good when values are spread fairly evenly.
- **Z-score** says how many standard deviations a value is from the average: (x − mean) / sd. With mean 70 and sd 15, 100 m² becomes 2. Good for bell-shaped data.
- **Log scaling** helps when a few values are huge: video views of 10, 1,000 and 1,000,000 become 1, 3 and 6.

A few extreme values can also be **clipped**: anything above a limit is
set to the limit.

Last, ask whether the feature affects the label in a straight line. Flat
prices often fall with distance from the city centre quickly at first,
then slowly; a heating bill rises when it is cold and when it is very
hot (air conditioning). A straight line cannot do that. You can cut the
feature into **bins** (0–2 km, 2–5 km, 5–10 km, …) so the model learns one
weight per bin, or add a squared feature like x² so the model can bend.

# Level: college

<!-- ptf:text v1 -->

Start with profiling: count, missing values, min/max, mean, median,
standard deviation, quantiles and a histogram per feature, plus checks
against domain constraints (non-negative areas, ages under 120) and for
duplicates. Mixed units and sentinel values (−1 or 9999 for "unknown") show
up as separate clusters or spikes. Decide per problem: correct, drop,
impute (with a missing-indicator feature), or keep.

Scaling matters because gradient descent's stable learning rate is
limited by the largest curvature of the loss, while progress along flat
directions is slow: features on scales 10² and 10⁶ give an ill-conditioned
problem. Choose by distribution: min–max to [0, 1] for bounded, roughly
uniform features (sensitive to outliers, which squash the rest);
Z-score (x − μ) / σ for roughly normal features; log or log(1 + x) for
heavy-tailed, positive features (power laws: views, incomes, city sizes),
often followed by Z-score; clipping (winsorizing) to cap rare extremes.
Fit all statistics on the training split only and apply the same function
to validation, test and serving data, or you leak information and create
training–serving skew.

A linear model is linear in its features, so non-linear effects must be
built into the features. Binning replaces x by one-hot indicators of
intervals: equal-width bins are simple but can be nearly empty for skewed
data; quantile bins have equal counts (1,000 examples, 4 bins → 250 each)
and adapt to the distribution. Bins learn a step function and lose
resolution within a bin. Polynomial features (x², x₁x₂) let the model fit
curves and interactions smoothly but extrapolate badly and need scaling.
Trees and neural networks learn such shapes themselves, though they still
benefit from sensible scaling.

# Misconceptions

- **scaling-changes-information**: Scaling destroys information in the data → linear scaling and Z-score are reversible and keep the order and relative distances; they only change units.
- **normalize-each-set-separately**: Validation and test data should be normalized with their own mean and sd → use the training statistics everywhere, or the same raw value gets different scaled values.
- **outliers-always-errors**: Outliers are always mistakes to delete → some are real (a mansion), some are errors (cm instead of m); inspect before deciding, and consider clipping.
- **linear-model-cannot-curve**: A linear model can only learn straight-line effects → it is linear in its features; with bins or x² as features it can fit curved effects.
- **log-for-everything**: Log scaling is always best → it suits heavy-tailed positive data; on roughly uniform or normal data it distorts, and it fails for 0 or negative values without a shift.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "scales-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "question": "A model gets two features: flat size (20 to 120) and last sale price in € (100,000 to 900,000). What do you expect during training with gradient descent?",
  "options": [
    { "text": "The price dominates the gradient steps, so a learning rate small enough for it makes the size weight learn very slowly", "correct": true, "feedback": "Yes: features on very different scales make training slow or unstable." },
    { "text": "Nothing special: the model will figure out the scales on its own", "correct": false, "feedback": "Gradient descent sees raw numbers; huge values give huge gradients." },
    { "text": "The size dominates because it is listed first", "correct": false, "feedback": "Order does not matter; size of the numbers does." }
  ],
  "explanation": "Scaling features to similar ranges lets one learning rate work for all of them."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "find-problems",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["inspect"],
  "misconception": "outliers-always-errors",
  "question": "A column of flat sizes in m² has: min 0, max 6,500, mean 81, and 12 empty cells. Most values are between 25 and 150. Which two conclusions are reasonable?",
  "options": [
    { "text": "0 m² is impossible and must be fixed or removed", "correct": true, "feedback": "Yes: a typing error or a placeholder." },
    { "text": "6,500 should be checked: it might be a size entered in a different unit, or a very unusual building", "correct": true, "feedback": "Yes: inspect before deleting; an outlier is not automatically an error." },
    { "text": "Empty cells can be left as they are; the model will skip them", "correct": false, "feedback": "Most models cannot take empty values; fill, drop or flag them." },
    { "text": "The mean of 81 shows that the data is clean", "correct": false, "feedback": "A mean hides individual problems; look at the minimum, maximum and a histogram." }
  ],
  "explanation": "Look at min, max, missing values and a histogram before training; decide per problem."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "scale-values",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["normalize"],
  "text": "Sizes range from 20 to 120 m². With linear scaling, 50 m² becomes {{1}}. With mean 70 and standard deviation 15, its Z-score is {{2}}.",
  "gaps": [
    { "answer": "0.3" },
    { "answer": "-1.33", "accepted": ["−1.33", "-1.3", "−1.3"] }
  ],
  "explanation": "(50 − 20) / (120 − 20) = 0.3; (50 − 70) / 15 ≈ −1.33."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-scaling",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["normalize"],
  "misconception": "log-for-everything",
  "question": "Most songs on a platform have a few hundred plays, a handful have hundreds of millions. Which scaling fits the number of plays best?",
  "options": [
    { "text": "Log scaling, because the values span many orders of magnitude", "correct": true, "feedback": "Yes: 100 → 2, 1,000,000 → 6, 100,000,000 → 8 (log₁₀)." },
    { "text": "Linear scaling to 0 to 1", "correct": false, "feedback": "The few giant values would squash almost every song to about 0." },
    { "text": "No scaling, because the model needs the exact numbers", "correct": false, "feedback": "Huge values make training unstable and hide differences among normal songs." }
  ],
  "explanation": "Heavy-tailed positive numbers → log; bell-shaped → Z-score; evenly spread with a known range → linear."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "bin-or-not",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["bin-transform"],
  "misconception": "linear-model-cannot-curve",
  "question": "A heating-and-cooling bill is high on very cold days and on very hot days, and low in between. A linear model gets the temperature as a feature. What helps it most?",
  "options": [
    { "text": "Cut the temperature into bins (or add temperature² as a feature) so the model can give cold and hot ranges their own effect", "correct": true, "feedback": "Yes: one straight line cannot go down and up again; bins or a squared term can." },
    { "text": "Scale the temperature with a Z-score", "correct": false, "feedback": "Scaling changes the units, not the straight-line shape the model can learn." },
    { "text": "Nothing: a linear model can learn any shape", "correct": false, "feedback": "With temperature alone it can only learn a straight line." }
  ],
  "explanation": "Binning or polynomial features let a linear model learn non-linear effects."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "quantile-bins",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["bin-transform"],
  "question": "You split the incomes of 2,000 people into 5 quantile bins. How many people are in each bin?",
  "answer": 400,
  "tolerance": 0,
  "explanation": "Quantile bins hold the same number of examples: 2,000 / 5 = 400. Equal-width bins would hold very different numbers for skewed incomes."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "numerical-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["normalize", "inspect"],
  "misconception": "normalize-each-set-separately",
  "question": "You Z-scored a feature using the training data (mean 70, sd 15). Now new data arrives for prediction. How do you scale it?",
  "options": [
    { "text": "With the same mean 70 and sd 15 from training", "correct": true, "feedback": "Yes: the model learned what z = 2 means under those numbers." },
    { "text": "With the mean and sd of the new data", "correct": false, "feedback": "Then the same flat would get a different value depending on the batch." },
    { "text": "Not at all, the model can handle raw values now", "correct": false, "feedback": "It was trained on scaled values and expects them." }
  ],
  "explanation": "Fit scaling on training data, apply it unchanged everywhere."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "profile-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["inspect"],
  "question": "A feature 'age' has median 41, mean 340, max 9,999 and 3 % of values equal to 9,999. What is the most likely explanation and fix?",
  "options": [
    { "text": "9,999 is a sentinel for 'unknown': replace it by a missing value, impute, and add a missing-indicator feature", "correct": true, "feedback": "Yes: a spike at a round impossible value is a placeholder." },
    { "text": "A few very old customers: apply log scaling", "correct": false, "feedback": "Nobody is 9,999 years old; scaling would hide an encoding problem." },
    { "text": "The mean is the right summary; use it to fill the 9,999 values", "correct": false, "feedback": "The mean is inflated by the sentinel itself; and the values first need to be marked as missing." },
    { "text": "Clip at the 99th percentile and keep the rest", "correct": false, "feedback": "3 % of rows would still carry a meaningless value at the clip limit." }
  ],
  "explanation": "Check spikes and round extremes against domain constraints; treat sentinels as missing."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "conditioning-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["normalize"],
  "misconception": "scaling-changes-information",
  "question": "Which two statements about scaling features for a linear model trained with gradient descent are correct?",
  "options": [
    { "text": "Z-scoring each feature makes the loss surface less elongated, so a larger learning rate is stable and convergence is faster", "correct": true, "feedback": "Yes: similar scales mean similar curvature in every direction." },
    { "text": "The best achievable MSE on the training set is the same with or without linear or Z-score scaling", "correct": true, "feedback": "Yes: an affine change of a feature can be undone by the weight and bias; only the optimization changes." },
    { "text": "Min–max scaling is robust to outliers", "correct": false, "feedback": "One extreme value sets max and squashes everything else into a small range." },
    { "text": "Log scaling is reversible for all real values", "correct": false, "feedback": "log is undefined for 0 and negative values without a shift." }
  ],
  "explanation": "Affine scaling changes conditioning, not expressiveness; log and clipping change the shape."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "log-then-z-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["normalize"],
  "question": "Incomes are log₁₀-transformed, and the transformed training values have mean 4.6 and standard deviation 0.3. What is the final scaled value of an income of € 100,000? (two decimals)",
  "answer": 1.33,
  "tolerance": 0.01,
  "explanation": "log₁₀(100,000) = 5; (5 − 4.6) / 0.3 ≈ 1.33."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "bins-vs-poly-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["bin-transform"],
  "question": "House prices depend on latitude in a bumpy way (expensive coast, cheap valley, expensive hills). Which two statements are correct?",
  "options": [
    { "text": "Binning latitude gives a linear model one weight per band, so it can follow the bumps as a step function", "correct": true, "feedback": "Yes: each bin's indicator gets its own weight." },
    { "text": "Quantile bins adapt to where the houses are, so no bin is nearly empty", "correct": true, "feedback": "Yes: each holds the same share of examples." },
    { "text": "Adding latitude² lets the model fit any number of bumps", "correct": false, "feedback": "A quadratic has one bend; several bumps need more terms or bins." },
    { "text": "Equal-width bins always contain equal numbers of houses", "correct": false, "feedback": "That is what quantile bins do; equal-width bins follow the range, not the data." }
  ],
  "explanation": "Bins give piecewise-constant effects; polynomials give smooth ones with a limited number of bends."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "pipeline-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["inspect", "normalize", "bin-transform"],
  "question": "You prepare three features for a model that predicts delivery time: distance in km (0.2 to 40, roughly uniform), order value in € (most 10 to 60, a few up to 5,000) and hour of the day (0 to 23, busiest at 12 and 19). Describe what you would check and how you would transform each feature, and which statistics you store for serving.",
  "rubric": [
    "Checks: missing and impossible values, units, duplicates, a histogram per feature",
    "Distance: linear (min–max) or Z-score scaling",
    "Order value: clip or log-transform the heavy tail, then scale",
    "Hour: not linear with time; bin it (or use indicators / cyclic encoding) so the peaks at 12 and 19 can be learned",
    "Store training min/max, mean/sd, clip limits and bin edges and reuse them at serving"
  ],
  "sample_answer": "First histograms, missing values and impossible entries (negative distances, wrong units). Distance is roughly uniform: min–max or Z-score. Order value is heavy-tailed: log(1 + x), maybe clip at a high percentile, then Z-score. Hour has two peaks, so a straight line cannot capture it: I would bin it into hours or ranges (or use a cyclic encoding). All statistics and bin edges come from the training split and are saved and reused for serving.",
  "explanation": "Inspect, scale by distribution, encode non-linear effects, and reuse the training statistics."
}
```

# Tutor notes

- Start with a real-looking column (sizes with a 0 and a 6,500) and let the learner find the problems.
- Highschool: the three scalings with one number each are enough; the point is choosing by the shape of the histogram.
- The rule "fit statistics on training data only" returns in the dataset step (leakage) and in production (training–serving skew); name it here.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Working with numerical data", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
