---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/gravity/inclined-plane
title: The inclined plane
description: A ramp passes on only the part g sin θ of gravity along the slope, which slows free fall down enough to measure that distance grows with the square of time.
lang: en
levels: [highschool, college, expert]
objectives:
  - Explain why a ramp slows a fall down and how the angle changes it (g sin θ).
  - Show that the distance on a ramp still grows with the square of the time.
tags: [physics, mechanics, inclined-plane, force-components, uniform-acceleration]
about:
  - wikidata: Q161462
    label: inclined plane
requires:
  - ptf:el/gravity/free-fall
leads_to:
  - ptf:el/gravity/rolling
duration_min: { highschool: 15, college: 15, expert: 10 }
simulators:
  - ref: ptf:sim/inclined-plane@^1.1.0
    station: bells
    levels: [highschool, college, expert]
    role: explore
    note: Play equal spacing first and ask what the learner hears; then let them find the spacing that gives an even rhythm.
    use_when: the learner should hear that equal distances do not take equal times
  - ref: ptf:sim/inclined-plane@^1.1.0
    station: angle
    levels: [highschool, college, expert]
    role: explore
    note: Ask what happens at 90° before they move the slider there.
    use_when: the learner wants to see the link between a flat ramp, a steep ramp and free fall
sources:
  - id: galileo-two-new-sciences
    resource: https://oll.libertyfund.org/titles/galilei-dialogues-concerning-two-new-sciences
    title: "Galileo Galilei: Dialogues Concerning Two New Sciences (1638)"
  - id: openstax-inclined
    resource: https://openstax.org/books/university-physics-volume-1/pages/6-2-solving-problems-with-newtons-laws
    title: "OpenStax University Physics Volume 1, 6.2 Solving Problems with Newton's Laws"
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
status: draft
version: 0.2.0
license: CC-BY-SA-4.0
---

# Introduction

- A free fall is too fast to measure by eye; a ramp turns it into slow motion.
- That is how the law of falling was first measured, long before stopwatches.
- Afterwards the learner can say which part of gravity acts along a slope and what stays the same as in free fall.

# Core

On a ramp, gravity still pulls straight down, but the ramp holds part of the
pull. Only the part along the slope, g · sin θ, speeds the object up. The
motion is the same kind as free fall, just slower: the distance still grows
with the square of the time.

# Key facts

- Split the weight m g into a part along the slope, m g sin θ, and a part into the ramp, m g cos θ; the normal force cancels the second.
- Without friction a sliding block accelerates with a = g sin θ: 0 at 0°, ½ g at 30°, g at 90° (free fall).
- With sliding friction μ: a = g (sin θ − μ cos θ); the block only starts sliding when tan θ > μ_static.
- From rest: s = ½ a t². Equal time steps cover distances in the ratio 1 : 3 : 5 : 7 (odd numbers); the totals after 1, 2, 3, 4 steps are 1 : 4 : 9 : 16.
- Speed at the bottom depends only on the height dropped (no friction, no rolling): v = √(2 g h), whatever the angle; a steeper ramp only gets there sooner.
- Galileo used grooved ramps of about 12 braccia (roughly 6.5 m) and a water clock; the slow motion made times measurable. Bells or frets along the ramp, placed to sound at even intervals, are a classic reconstruction of how the t² law can be heard.
- In the simulator: 4 m ramp; at 3° a solid ball needs 4.67 s, at 90° a block falls the 4 m in 0.90 s.

# Level: highschool

<!-- ptf:text v1 -->

Here is a puzzle Galileo had: free fall is over in a blink, so how do you
measure how it speeds up? Imagine little bells hung along a gentle ramp, and
a ball rolling past rings each one. If the bells hang at equal distances,
what do you hear?

The rings come faster and faster, because the ball keeps speeding up. To
hear an even beat, the gaps must grow like 1, 3, 5, 7: the distance from the
start then goes 1, 4, 9, 16, the square of the time. The ramp did not change
the law of falling, it only slowed it down. That works because gravity
pulls straight down, while the ball can only move along the slope. The part
of the pull along the slope is g · sin θ: small for a gentle ramp, the full
g when the ramp stands vertical. At 30° it is exactly half of g.

# Level: college

<!-- ptf:text v1 -->

Before drawing a free-body diagram, predict: at which angle is the block's
acceleration half of g? The decomposition gives a = g sin θ for a
frictionless block, so 30°. With kinetic friction μ_k, a = g (sin θ −
μ_k cos θ), and a block at rest stays put while tan θ ≤ μ_s, which is how a
static friction coefficient is measured. Energy gives the speed at the
bottom without the time: m g h = ½ m v², independent of θ. The ramp is
Galileo's "diluted gravity": it scales a by sin θ but keeps the kinematics
s = ½ a t², which is why measurements on gentle slopes could establish the
t² law for free fall.

# Level: expert

<!-- ptf:text v1 -->

The inclined plane is the simplest constrained system: the normal force is a
constraint force that enforces motion on a one-dimensional manifold, and the
generalized coordinate s along the slope has Lagrangian L = ½ m ṡ² + m g s
sin θ, giving s̈ = g sin θ directly. Friction enters as a non-holonomic,
dissipative force. Historically the point is methodological: Galileo traded
the unmeasurable short time of free fall for a slower process with the same
functional form and inferred the limit θ → 90°. The extrapolation is valid
for sliding without friction; for rolling bodies the factor 1 / (1 + k)
(next element) must be divided out.

# Misconceptions

- **constant-speed-on-slope**: On a ramp an object rolls or slides at a constant speed → it keeps speeding up with a = g sin θ (less friction); only the rate depends on the angle.
- **steeper-faster-at-bottom**: A steeper ramp gives a higher speed at the bottom → without friction the speed at the bottom depends only on the height dropped; the steeper ramp only gets there sooner.
- **equal-distances-equal-times**: Equal distances take equal times → while speeding up, each equal stretch takes less time; equal times need growing distances (1 : 3 : 5 : 7).
- **ramp-changes-gravity**: The ramp makes gravity weaker → gravity is unchanged; the ramp takes up the part m g cos θ, only m g sin θ is left along the slope.
- **steeper-than-free-fall**: A steep ramp can make something faster than falling → the ramp only passes on the part g sin θ of gravity; at 90° that is g itself, never more.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "bells-equal-spacing",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "equal-distances-equal-times",
  "question": "Bells hang at equal distances along a ramp. A ball rolls down from rest and rings each bell. What do you hear?",
  "options": [
    { "text": "The rings come faster and faster", "correct": true, "feedback": "Yes, the ball keeps speeding up, so each equal stretch takes less time." },
    { "text": "An even rhythm", "correct": false, "feedback": "That would need a constant speed. The ball speeds up all the way." },
    { "text": "The rings come slower and slower", "correct": false, "feedback": "That would mean the ball slows down, but gravity keeps speeding it up." }
  ],
  "explanation": "Accelerated motion: equal distances take shorter and shorter times."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "half-g-angle",
  "level": "highschool",
  "purpose": "check",
  "misconception": "ramp-changes-gravity",
  "question": "At which ramp angle does a frictionless block accelerate with half of g?",
  "options": [
    { "text": "30°", "correct": true, "feedback": "Right: sin 30° = 0.5." },
    { "text": "45°", "correct": false, "feedback": "sin 45° ≈ 0.71, so a ≈ 0.71 g." },
    { "text": "60°", "correct": false, "feedback": "sin 60° ≈ 0.87, so a ≈ 0.87 g." }
  ],
  "explanation": "a = g sin θ, and sin θ = ½ at 30°."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "odd-numbers",
  "level": "highschool",
  "purpose": "check",
  "text": "A ball starts from rest on a ramp. In the first second it rolls 10 cm, in the second second {{1}} cm, in the third second {{2}} cm. After three seconds it has rolled {{3}} cm in total.",
  "gaps": [
    { "answer": "30" },
    { "answer": "50" },
    { "answer": "90" }
  ],
  "explanation": "Distances per equal time step grow like 1 : 3 : 5; the total grows like t²: 10 · 3² = 90 cm."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "speed-at-bottom",
  "level": "college",
  "purpose": "check",
  "misconception": "steeper-faster-at-bottom",
  "question": "Two frictionless ramps start at the same height of 2 m, one at 20°, one at 60°. Compare the blocks' speeds at the bottom.",
  "options": [
    { "text": "Equal, about 6.3 m/s", "correct": true, "feedback": "Yes: v = √(2 g h) depends only on the height." },
    { "text": "The steep one is faster", "correct": false, "feedback": "It arrives sooner, but with the same speed: the same energy m g h has turned into motion." },
    { "text": "The gentle one is faster, because its path is longer", "correct": false, "feedback": "A longer path at a smaller acceleration gives the same final speed." }
  ],
  "explanation": "Energy conservation m g h = ½ m v² is independent of the angle."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "measure-mu",
  "level": "college",
  "purpose": "transfer",
  "question": "How can you measure the static friction coefficient between a book and a board with nothing but the board and a protractor?",
  "rubric": ["Tilt the board slowly until the book starts to slide", "At that angle m g sin θ = μ_s m g cos θ", "μ_s = tan θ at the onset of sliding"],
  "sample_answer": "Raise one end of the board slowly. Just before the book slips, the force along the slope equals the maximum static friction: m g sin θ = μ_s m g cos θ, so μ_s = tan θ. Reading the angle gives μ_s.",
  "explanation": "The angle of repose measures static friction directly."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "galileo-extrapolation",
  "level": "expert",
  "purpose": "transfer",
  "question": "Galileo measured rolling balls on gentle ramps and concluded that free fall obeys s ∝ t². Which step of this inference holds exactly, and which needs a correction?",
  "rubric": ["The t² law (constant acceleration) holds for any fixed angle", "The value of the acceleration does not extrapolate as g sin θ for a rolling ball", "Rolling adds the factor 1 / (1 + k), k = 2/5 for a solid sphere", "Fine for the form of the law, wrong by 5/7 for the value of g"],
  "sample_answer": "Any fixed slope gives constant acceleration, so s ∝ t² is established exactly, and it carries over to the vertical. But a rolling ball's acceleration is g sin θ / (1 + k) = 5/7 g sin θ for a solid sphere, so using rolling balls to infer the value of g underestimates it by the factor 5/7 unless rotation is accounted for.",
  "explanation": "Functional form transfers; the numerical value needs the rolling correction."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [OpenStax University Physics Volume 1, 6.2](https://openstax.org/books/university-physics-volume-1/pages/6-2-solving-problems-with-newtons-laws): free-body diagrams and worked inclined-plane problems (highschool, college).
- [Galileo, Dialogues Concerning Two New Sciences](https://oll.libertyfund.org/titles/galilei-dialogues-concerning-two-new-sciences): Third Day, the inclined-plane experiment in Galileo's own words (expert).

# Sources

Grounding: [^galileo-two-new-sciences], [^openstax-inclined].

[^galileo-two-new-sciences]: Galileo Galilei, Dialogues Concerning Two New Sciences, 1638, Third Day.
[^openstax-inclined]: OpenStax, University Physics Volume 1, section 6.2.
