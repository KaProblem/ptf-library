---
type: Learning Path
ptf_version: "0.1"
id: ptf:path/gravity/pisa-to-einstein
title: Gravity, from the leaning tower to curved spacetime
description: Six steps from dropping balls off a tower to clocks on GPS satellites, each one guessed first and then tried in a simulator.
lang: en
goal: Explain why everything falls alike, what air, ramps and rolling change, how one law holds apples and moons, and what Einstein's curved spacetime adds that can be measured.
objectives:
  - Explain why everything falls alike without air, and what air, ramps and rolling change.
  - Explain how one law holds apples and moons, and what Einstein's curved spacetime adds that can be measured.
audience: [child, highschool, college]
steps:
  - element: ptf:el/gravity/free-fall
  - element: ptf:el/gravity/air-resistance
  - element: ptf:el/gravity/inclined-plane
  - element: ptf:el/gravity/rolling
  - element: ptf:el/gravity/universal-gravitation
  - element: ptf:el/gravity/curved-spacetime
status: draft
version: 0.3.0
license: CC-BY-SA-4.0
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
sources:
  - id: feynman-i-7
    resource: https://www.feynmanlectures.caltech.edu/I_07.html
    title: "The Feynman Lectures on Physics, Vol. I, ch. 7: The Theory of Gravitation"
---

# Introduction

Gravity looks like a simple pull, but every step here starts with a
question most people get wrong at first: does heavy fall faster, why does a
ring lose a race, why do astronauts float, why do satellite clocks run fast?
The path moves from the tower (falling and air) over the ramp (slowing a fall
down, rolling) to Newton's law for the sky and Einstein's replacement of the
pull by curved spacetime.

By the end the learner can explain why everything falls alike without air,
what air, ramps and rolling change, how one law holds apples and moons, and
what Einstein added that GPS clocks measure every day. Two sessions of about
an hour at highschool level.

# Steps

| # | Goal | Element | Simulator |
| --- | --- | --- | --- |
| 1 | Without air everything falls alike; distance grows with t² | [Free fall](../elements/free-fall.md) | falling-tower: guess, vacuum |
| 2 | Drag grows with v², terminal speed; how a simulation computes it | [Air resistance](../elements/air-resistance.md) | falling-tower: drag, model |
| 3 | A ramp passes on g sin θ; hearing the t² law | [Inclined plane](../elements/inclined-plane.md) | inclined-plane: bells, angle |
| 4 | Rolling costs spin; shape, not mass, decides the race | [Rolling](../elements/rolling.md) | inclined-plane: race, rolling |
| 5 | One inverse-square law for apples, the Moon and orbits | [Universal gravitation](../elements/universal-gravitation.md) | newton-einstein: cannon, moon |
| 6 | Spacetime curvature, GPS clocks, Mercury | [Curved spacetime](../elements/curved-spacetime.md) | newton-einstein: spacetime, clocks, mercury |

# Tutor notes

- Open the course with its introduction and the question "does heavy fall faster?"; in later sessions, say where the learner is in the course first.
- Open a simulator station when its `use_when` fits the learner, one station at a time in focus mode (SIMULATOR-SPEC.md §4.7); the progress row lets the learner jump between stations. Every experiment is locked until the learner has picked a prediction in the simulator, and only the result reveals whether it was right (predict, observe, explain). Do not give the answer before; afterwards, ask the learner to explain what they saw.
- For a child, a short path works on its own: free fall (guess, vacuum) → rolling (race) → universal gravitation (cannon, moon) → curved spacetime (spacetime, clocks). Skip formulas; keep the "lazier heavy ball" and "falling around the Earth" pictures.
- Levels are depths, not parts (ptf-spec SPEC.md §5.2): stay at the learner's level for the whole course. Every element covers its objectives at every level, and so do the simulator stations listed for that level, so a learner never has to repeat a step at another level to get the whole idea. "Go deeper" means the same step again one level up (more terms, formulas and harder questions); offer it, never require it. Stations listed only for higher levels are optional deepening.
- At highschool level steps 1 to 4 fit one session of about 60 minutes, steps 5 and 6 a second one.
- The numbers in the simulators are computed (RK4 or closed form) and checked in their self-tests; use them as facts: iron vs. wood from 56 m is 0.17 s and about 5 m apart, not "a hand's width".
- In step 2 at college level, let the learner break the simulation (large Δt with Euler) before trusting it; this is the bridge to "how do we know a simulation is right".
- In step 6, discuss the trampoline's flaw right after showing it; the clocks station is the strongest evidence, because it is measured every day.
- Offer `# Further reading` after a step, never before.
