---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/gravity/rolling
title: Rolling down a slope
description: A rolling body has to spin up as well as speed up, so it is slower than a sliding one; how much slower depends only on how its mass is spread, not on mass or size.
lang: en
levels: [child, highschool, college, expert]
tags: [physics, mechanics, rolling, moment-of-inertia, energy, friction]
requires:
  - ptf:el/gravity/inclined-plane
duration_min: { child: 10, highschool: 15, college: 20, expert: 15 }
simulators:
  - ref: ptf:sim/inclined-plane@^1.1.0
    station: race
    levels: [child, highschool, college, expert]
    role: explore
    note: Ball against ring first; add the ice block and the hollow ball afterwards for a full ranking.
  - ref: ptf:sim/inclined-plane@^1.1.0
    station: rolling
    levels: [college, expert]
    role: practice
    note: Compare ball and ring at the same angle, then lower μ until the ball slips and heat appears.
sources:
  - id: openstax-rolling
    resource: https://openstax.org/books/university-physics-volume-1/pages/11-1-rolling-motion
    title: "OpenStax University Physics Volume 1, 11.1 Rolling Motion"
  - id: feynman-i-19
    resource: https://www.feynmanlectures.caltech.edu/I_19.html
    title: "The Feynman Lectures on Physics, Vol. I, ch. 19: Center of Mass; Moment of Inertia"
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
status: draft
version: 0.1.1
license: CC-BY-SA-4.0
---

# Core

A rolling body must speed up its forward motion and its spin at the same
time, and the drop in height pays for both. The more of its mass sits far
from the axis, the more energy the spin takes, and the slower it rolls. Mass
and size cancel out; only the shape counts.

# Key facts

- Moment of inertia I = k m r², with k depending only on shape: solid sphere 2/5, solid cylinder 1/2, thin hollow sphere 2/3, thin ring or hoop 1. A sliding block (no spin) has effectively k = 0.
- Rolling without slipping: v = ω r, kinetic energy ½ m v² (1 + k). Acceleration down a slope: a = g sin θ / (1 + k).
- Share of energy in the spin: k / (1 + k): sphere 29 %, cylinder 33 %, hollow sphere 40 %, ring 50 %.
- Race order on any ramp (no slipping): sliding block on ice (a = g sin θ) > solid sphere (5/7) > solid cylinder (2/3) > hollow sphere (3/5) > ring (1/2). At 10° over 4 m: 2.17 s, 2.56 s, 2.65 s, 2.80 s, 3.06 s.
- Rolling needs static friction f = k / (1 + k) · m g sin θ. If μ_s m g cos θ is smaller, i.e. μ_s < k / (1 + k) · tan θ, the body slips: it slides with a = g (sin θ − μ cos θ) while friction spins it up, and energy is lost as heat. Pure rolling loses no energy: the contact point is momentarily at rest.
- A 2D physics engine treats a "ball" as a disc (k = 1/2), so it predicts 2/3 g sin θ instead of 5/7 g sin θ for a real sphere: 7 % too slow.

# Level: child

<!-- ptf:text v1 -->

Get a ball and a ring (a bangle or a roll of tape) that are about the same
size, and let them roll down a slope side by side. Which one wins?

The ball wins, every time. Rolling means two jobs at once: moving forward and
spinning. The ring has all its weight far out at the edge, and that makes it
hard to spin, so a lot of its effort goes into turning and less is left for
moving forward. In a ball, much of the weight is close to the middle, so it
spins up easily and runs ahead. A big heavy ball and a small marble roll
equally fast: only the shape matters.

# Level: highschool

<!-- ptf:text v1 -->

Guess the ranking before you race: a block sliding on ice, a solid ball, a
hollow ball and a ring, all down the same ramp. Same mass, same size.

The block on ice wins: it does not spin at all, so all the energy from the
drop goes into forward speed. Every rolling body splits the energy between
moving and spinning. How much goes into spinning depends on where the mass
is: in a solid ball 29 %, in a hollow ball 40 %, in a ring half of it. So
the order is block, solid ball, hollow ball, ring, on any slope. Surprisingly,
mass and size do not matter: a bowling ball and a marble arrive together,
because a bigger or heavier ball needs more energy to spin but also gets more
energy from the drop, in the same proportion.

# Level: college

<!-- ptf:text v1 -->

Predict the ratio of the ring's to the sphere's acceleration before
computing it. Energy: m g h = ½ m v² + ½ I ω² with ω = v / r and I = k m r²,
so v² = 2 g h / (1 + k) and, differentiating along the slope,
a = g sin θ / (1 + k). Ring (k = 1) over sphere (k = 2/5): (1 + 2/5) / 2 =
0.7. Mass and radius cancel because both terms scale as m r² ω². The
friction force that makes rolling possible does no work (the contact point
does not slide), which is why energy is conserved even though friction acts.
If the required f = k m g sin θ / (1 + k) exceeds μ_s m g cos θ, the body
slips and the simple formula fails; lower μ in the simulator to see it.

# Level: expert

<!-- ptf:text v1 -->

In the slipping regime the dynamics split: the centre accelerates with
g (sin θ − μ_k cos θ) and the spin with α = μ_k g cos θ / (k r); slip
velocity v − ω r grows when the spin cannot keep up, and the dissipated power
is μ_k m g cos θ · (v − ω r). Real rolling also loses energy through rolling
resistance (deformation hysteresis, c_rr ≈ 0.001 for steel on steel), which
the ideal model ignores. For simulations this is a cautionary case: game
engines model contact with impulses, position correction and (in 2D) discs,
so a "ball" rolls with k = 1/2 and may creep or slip at contact transitions.
A closed-form or tailored integrator is both simpler and right; an engine is
worth it only when the interaction between many bodies is the point.

# Misconceptions

- **all-roll-equally**: Like in free fall, all bodies roll down a ramp equally fast → rolling bodies differ: the more mass far from the axis, the slower (ball before cylinder before hollow ball before ring).
- **ring-faster**: A ring rolls more easily because it is light in the middle → the mass at the rim makes it hardest to spin up, so it is the slowest.
- **heavier-falls-faster**: The heavier ball rolls faster → mass cancels; only the distribution of mass (k) matters.
- **small-rolls-faster**: A small ball rolls faster because it spins faster → it spins faster, but its forward speed v = ω r is the same as that of a large ball of the same shape.
- **friction-always-wastes-energy**: Friction always turns energy into heat → static friction during pure rolling does no work; only slipping (and rolling resistance) dissipates energy.
- **spin-costs-nothing**: Rolling is free, all the energy goes into moving forward → a rolling body must also be spun up; a solid ball puts 2/7 (29 %) of its energy into spin, a ring half.
- **spin-takes-half**: Every rolling body puts half its energy into spin → the share is k/(1+k) and depends on how the mass is spread: 29 % for a solid ball, 50 % only for a ring.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "ball-vs-ring",
  "level": "child",
  "purpose": "warmup",
  "misconception": "ring-faster",
  "question": "A ball and a ring of the same size and weight roll down the same slope side by side. Which one is first at the bottom?",
  "options": [
    { "text": "The ball", "correct": true, "feedback": "Yes. The ring's weight is far out at the edge, which makes it harder to spin." },
    { "text": "The ring", "correct": false, "feedback": "It seems light and easy, but the ring is the hardest to get spinning." },
    { "text": "Both together", "correct": false, "feedback": "That is true for falling, but rolling also needs spinning, and that differs." }
  ],
  "explanation": "The more mass far from the axis, the more energy goes into spinning."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "race-ranking",
  "level": "highschool",
  "purpose": "check",
  "misconception": "all-roll-equally",
  "instruction": "Order these from first to last at the bottom of the same ramp (same mass and radius, no slipping):",
  "items": ["Block sliding on ice", "Solid ball", "Solid cylinder", "Hollow ball", "Ring"],
  "explanation": "a = g sin θ / (1 + k) with k = 0, 2/5, 1/2, 2/3, 1."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "bowling-marble",
  "level": "highschool",
  "purpose": "check",
  "misconception": "small-rolls-faster",
  "question": "A bowling ball and a glass marble, both solid balls, roll down the same ramp. Which is first?",
  "options": [
    { "text": "They arrive together", "correct": true, "feedback": "Right. Same shape, same share of energy in the spin." },
    { "text": "The marble, because it spins faster", "correct": false, "feedback": "It spins faster, but its radius is smaller; its forward speed is the same." },
    { "text": "The bowling ball, because it is heavier", "correct": false, "feedback": "More mass needs more energy, and gets more from the drop, in the same proportion." }
  ],
  "explanation": "Neither mass nor radius appears in a = g sin θ / (1 + k)."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "sphere-acceleration",
  "level": "college",
  "purpose": "check",
  "title": "A solid sphere on a 30° ramp",
  "intro": "Rolling without slipping, g = 9.81 m/s², k = 2/5.",
  "columns": ["Step", "Expression", "Value"],
  "rows": [["Along the slope", "g sin 30°", "4.905 m/s²"], ["Rolling factor", "1 / (1 + k)", "5/7"], ["Acceleration", "a = g sin θ / (1 + k)", "3.504 m/s²"], ["Friction needed", "μ ≥ k / (1 + k) · tan θ", "0.165"]],
  "result": { "label": "Acceleration", "value": "3.50 m/s²; rolls if μ ≥ 0.165" },
  "explanation": "Energy split gives the factor 1 / (1 + k); the friction condition follows from the torque equation."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "rolling-friction-work",
  "level": "college",
  "purpose": "transfer",
  "misconception": "friction-always-wastes-energy",
  "question": "A ball rolls without slipping down a ramp. Friction acts at the contact point. How much energy does it turn into heat?",
  "options": [
    { "text": "None: the contact point does not slide, so friction does no work", "correct": true, "feedback": "Right. Static friction only redistributes energy into spin." },
    { "text": "About 29 %, the share that goes into spin", "correct": false, "feedback": "That share goes into rotation, not heat; it comes back if the ball rolls up again." },
    { "text": "All of the potential energy", "correct": false, "feedback": "Then the ball would arrive at rest." }
  ],
  "explanation": "Work needs displacement at the point of application; in pure rolling the contact point is momentarily at rest."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "engine-disc",
  "level": "expert",
  "purpose": "transfer",
  "question": "A 2D physics engine simulates a ball rolling down a 20° ramp and reports a = 2.24 m/s². A student says the engine is wrong. Who is right, and what would you change?",
  "rubric": ["2/3 · 9.81 · sin 20° ≈ 2.24: the engine models a disc (k = 1/2)", "A solid sphere gives 5/7 · g sin θ ≈ 2.40 m/s²", "Both are right for their model: disc vs. sphere", "Fix: set the rotational inertia to 2/5 m r² or use an analytic model; state the assumption"],
  "sample_answer": "2.24 m/s² is exactly 2/3 g sin 20°, the result for a solid disc. A real ball (solid sphere) gives 5/7 g sin 20° ≈ 2.40 m/s². The engine is correct for a disc; to model a sphere, override the body's moment of inertia to 2/5 m r², or skip the engine and use a = g sin θ / (1 + k). Either way, the simulation should say which body it models.",
  "explanation": "Simulation results are only as right as the model's assumptions."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [OpenStax University Physics Volume 1, 11.1 Rolling Motion](https://openstax.org/books/university-physics-volume-1/pages/11-1-rolling-motion): rolling with and without slipping, worked examples (highschool, college).
- [The Feynman Lectures on Physics, Vol. I, ch. 19](https://www.feynmanlectures.caltech.edu/I_19.html): centre of mass and moments of inertia of common shapes (college, expert).

# Sources

Grounding: [^openstax-rolling], [^feynman-i-19].

[^openstax-rolling]: OpenStax, University Physics Volume 1, section 11.1.
[^feynman-i-19]: R. P. Feynman, R. B. Leighton, M. Sands, The Feynman Lectures on Physics, Vol. I, ch. 19.
