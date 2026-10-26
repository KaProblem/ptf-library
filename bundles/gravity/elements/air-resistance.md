---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/gravity/air-resistance
title: Air resistance and terminal speed
description: Air pushes back harder the faster an object moves; a falling object speeds up until drag equals its weight and then falls at its terminal speed.
lang: en
levels: [highschool, college, expert]
tags: [physics, mechanics, drag, terminal-velocity, numerical-integration]
about:
  - wikidata: Q206621
    label: drag
  - wikidata: Q614981
    label: terminal velocity
requires:
  - ptf:el/gravity/free-fall
leads_to:
  - ptf:el/gravity/universal-gravitation
duration_min: { highschool: 15, college: 20, expert: 15 }
simulators:
  - ref: ptf:sim/falling-tower@^1.1.0
    station: drag
    levels: [highschool, college, expert]
    role: explore
    note: Start with the flat and the crumpled sheet of paper (same mass); ask which lands first before dropping.
  - ref: ptf:sim/falling-tower@^1.1.0
    station: model
    levels: [college, expert]
    role: practice
    note: Let the learner make Δt large until Euler is visibly wrong, then compare RK4.
sources:
  - id: openstax-drag
    resource: https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed
    title: "OpenStax University Physics Volume 1, 6.4 Drag Force and Terminal Speed"
  - id: feynman-i-9
    resource: https://www.feynmanlectures.caltech.edu/I_09.html
    title: "The Feynman Lectures on Physics, Vol. I, ch. 9: Newton's Laws of Dynamics"
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
status: draft
version: 0.1.2
license: CC-BY-SA-4.0
---

# Core

Air pushes against anything that moves through it, and the push grows with
the square of the speed. A falling object speeds up until the push of the air
equals its weight; from then on it falls at a constant terminal speed. Light
objects with a large surface reach it quickly and at a low speed.

# Key facts

- Drag at everyday speeds: F = ½ ρ c_d A v², with air density ρ ≈ 1.2 kg/m³ (sea level, 20 °C), cross-section A and drag coefficient c_d (sphere ≈ 0.47, flat plate across the flow ≈ 1.1 to 1.3, skydiver belly-down ≈ 1.0).
- Terminal speed: m g = ½ ρ c_d A v_t² → v_t = √(2 m g / (ρ c_d A)). Heavier at the same size or smaller at the same mass means faster.
- Equation of motion (down positive): m dv/dt = m g − ½ ρ c_d A v |v|. From rest: v(t) = v_t tanh(g t / v_t), distance y(t) = (v_t² / g) ln cosh(g t / v_t).
- Reference values used in the simulator (c_d constant): iron ball 10 cm, 4.1 kg: v_t ≈ 135 m/s; wooden ball 10 cm, 0.37 kg: 40 m/s; crumpled sheet of paper (5 g, 6 cm): 7.6 m/s; flat sheet (A4, 5 g): about 1 m/s; skydiver about 55 m/s (200 km/h).
- From 56 m: iron 3.40 s, wood 3.57 s, crumpled paper 7.9 s, flat sheet (if it fell flat) about 54 s. In reality a flat sheet tumbles and glides, which no constant c_d describes.
- c_d of a sphere is about 0.47 only for Reynolds numbers Re = ρ v d / μ of roughly 10³ to 2 · 10⁵; at higher Re the boundary layer turns turbulent and c_d drops sharply (drag crisis), which is why golf balls have dimples. At very low Re (dust, fog droplets) drag is linear in v (Stokes: F = 6π μ r v).
- Numerically, explicit Euler has a global error proportional to Δt, RK4 proportional to Δt⁴. Simulations must use a fixed time step, independent of the screen's frame rate.

# Level: highschool

<!-- ptf:text v1 -->

Take two sheets of paper. Crumple one into a ball, leave the other flat, and
drop both from the same height. Same paper, same mass: which lands first?

The ball, by far. Gravity pulls both equally, but the air pushes back, and
it pushes harder the more surface meets it and the faster you go: twice the
speed, four times the push. So every falling thing speeds up until the push
of the air is as strong as its weight. Then the forces balance and the speed
stops growing: that is the terminal speed. For the flat sheet it is about
1 m/s, reached almost at once; for the crumpled ball about 7.6 m/s; for a
skydiver about 200 km/h; for a small iron ball over 400 km/h, which is why
over a short drop the air barely matters for it. This is also why the wooden
ball from the tower arrives a few metres behind the iron one: same size,
same push of the air, but ten times less weight to push through it.

# Level: college

<!-- ptf:text v1 -->

Predict the shape of v(t) before plotting it: linear at first, then flatter,
approaching a horizontal line. With quadratic drag the equation
m v̇ = m g − k v², k = ½ ρ c_d A, separates and gives v(t) = v_t tanh(t / τ)
with v_t = √(m g / k) and τ = v_t / g. After t = 2τ the object has 96 % of
v_t. A dimensionless check: when the drop height h is small compared with
v_t² / g, air hardly matters (iron ball: h / (v_t² / g) ≈ 0.03); when it is
large, the object spends most of the fall at terminal speed (flat paper:
≈ 500). The simulator integrates the same equation numerically; comparing
Euler and RK4 against the closed form shows why the choice of method and
step size decides whether a simulation is trustworthy.

# Level: expert

<!-- ptf:text v1 -->

The quadratic drag law is an approximation valid in the inertial regime
(Re ≈ 10³ to 2 · 10⁵ for a smooth sphere), where c_d is roughly constant. In
the Stokes regime (Re ≪ 1) drag is linear, F = 6π μ r v, and v_t = 2 r² Δρ g
/ (9 μ). At the drag crisis (Re ≈ 3 · 10⁵) c_d falls from about 0.47 to 0.1.
For a full model, c_d(Re) is tabulated and the ODE becomes non-autonomous in
speed only, still a one-line RK4 update. Plates and sheets add rotational
degrees of freedom: fluttering and tumbling (studied as falling-paper
dynamics) couple lift and drag and are chaotic. A simulation that keeps c_d
fixed must say so; ours does, and treats the flat sheet as a falling plate.

# Misconceptions

- **air-only-slows-light-things**: Air only matters for feathers and paper → air pushes on everything; it just matters less when the weight is large compared with the drag at the speeds reached.
- **terminal-speed-means-no-gravity**: At terminal speed gravity has stopped acting → gravity still pulls with the full weight; drag balances it, so the net force and the acceleration are zero.
- **drag-proportional-to-speed**: Twice as fast means twice the air resistance → at everyday speeds drag grows with the square of the speed; twice as fast means four times the drag.
- **heavier-falls-faster**: A heavier object falls faster, in proportion to its weight → with air, at equal size, the heavier is ahead, but its terminal speed grows only with the square root of its mass, and without air there is no difference at all.
- **euler-is-exact**: A computer simulation gives the exact answer → it approximates in steps; the error depends on the method and the time step and must be checked.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "paper-race",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "heavier-falls-faster",
  "question": "A flat sheet of paper and an identical sheet crumpled into a ball are dropped together. Why does the ball land first?",
  "options": [
    { "text": "Same weight, but much less surface for the air to push against", "correct": true, "feedback": "Exactly. The drag at a given speed is far smaller, so it falls much faster before drag and weight balance." },
    { "text": "Crumpling makes it heavier", "correct": false, "feedback": "It is the same sheet: the mass does not change." },
    { "text": "Gravity pulls harder on round things", "correct": false, "feedback": "Gravity depends only on mass, not on shape." }
  ],
  "explanation": "Terminal speed v_t = √(2 m g / (ρ c_d A)) depends on the area A."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "terminal-forces",
  "level": "highschool",
  "purpose": "check",
  "misconception": "terminal-speed-means-no-gravity",
  "question": "A skydiver falls at a constant 55 m/s. Which statement is true?",
  "options": [
    { "text": "Weight and air resistance are equally large, so the speed stays the same", "correct": true, "feedback": "Right. Zero net force means zero acceleration, not zero speed." },
    { "text": "Gravity has stopped acting on her", "correct": false, "feedback": "Her weight is as large as ever; the air balances it." },
    { "text": "The air resistance is larger than her weight", "correct": false, "feedback": "Then she would slow down, as after opening the parachute." }
  ],
  "explanation": "Constant speed means the forces balance."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "double-speed-drag",
  "level": "highschool",
  "purpose": "check",
  "misconception": "drag-proportional-to-speed",
  "question": "A cyclist doubles her speed from 15 to 30 km/h. Roughly how does the air resistance change?",
  "options": [
    { "text": "It becomes about four times as large", "correct": true, "feedback": "Yes, drag grows with the square of the speed." },
    { "text": "It doubles", "correct": false, "feedback": "That would be a linear law, true only for very small, slow objects." },
    { "text": "It stays the same", "correct": false, "feedback": "Air resistance depends strongly on speed." }
  ],
  "explanation": "F = ½ ρ c_d A v²: twice v, four times F."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "terminal-speed-paper-ball",
  "level": "college",
  "purpose": "check",
  "title": "Terminal speed of a crumpled sheet of paper",
  "intro": "m = 5 g, diameter 6 cm (A = π · 0.03² m²), c_d = 0.5, ρ = 1.2 kg/m³, g = 9.81 m/s².",
  "columns": ["Step", "Expression", "Value"],
  "rows": [["Cross-section", "A = π r²", "2.83 · 10⁻³ m²"], ["Drag constant", "k = ½ ρ c_d A", "8.48 · 10⁻⁴ kg/m"], ["Weight", "m g", "0.049 N"], ["Terminal speed", "v_t = √(m g / k)", "7.6 m/s"]],
  "result": { "label": "Terminal speed", "value": "about 7.6 m/s" },
  "explanation": "Set drag equal to weight and solve for v."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "euler-step",
  "level": "college",
  "purpose": "transfer",
  "misconception": "euler-is-exact",
  "question": "A simulation of the falling paper ball uses explicit Euler with Δt = 0.5 s and gets a fall time 0.2 s off from the exact value. What would you change, and how do you expect the error to scale?",
  "rubric": ["Smaller time step", "Euler error roughly proportional to Δt (halving Δt halves the error)", "Higher-order method such as RK4, error ∝ Δt⁴", "Check against the closed-form solution"],
  "sample_answer": "Reduce Δt or switch to RK4. Explicit Euler is first order, so halving Δt roughly halves the error; RK4 is fourth order, so halving Δt divides it by about 16. With the closed form v_t tanh(g t / v_t) I can verify the result.",
  "explanation": "Accuracy is a property of method and step size, and should be checked against a known answer."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "drag-crisis",
  "level": "expert",
  "purpose": "transfer",
  "question": "Why can a smooth ball experience less drag at higher speed over a certain range, and why do golf balls have dimples?",
  "rubric": ["Reynolds number dependence of c_d", "Transition of the boundary layer to turbulence (around Re ≈ 3 · 10⁵ for a smooth sphere)", "Turbulent boundary layer separates later, smaller wake, c_d drops sharply", "Dimples trigger the transition at lower Re, within the range of a golf drive"],
  "sample_answer": "c_d depends on the Reynolds number. Near Re ≈ 3 · 10⁵ the boundary layer of a smooth sphere becomes turbulent, stays attached longer and the wake shrinks, so c_d drops from about 0.47 to 0.1: the drag crisis. Dimples make the boundary layer turbulent at lower Re, so a golf ball gets the low drag at the speeds it actually flies.",
  "explanation": "A constant c_d is a model choice that fails across the drag crisis."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [OpenStax University Physics Volume 1, 6.4 Drag Force and Terminal Speed](https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed): the drag law, worked examples with skydivers and Stokes' law (highschool, college).
- [The Feynman Lectures on Physics, Vol. I, ch. 9](https://www.feynmanlectures.caltech.edu/I_09.html): how to compute motion step by step by hand, the idea behind every simulation (college).

# Sources

Grounding: [^openstax-drag], [^feynman-i-9].

[^openstax-drag]: OpenStax, University Physics Volume 1, section 6.4.
[^feynman-i-9]: R. P. Feynman, R. B. Leighton, M. Sands, The Feynman Lectures on Physics, Vol. I, ch. 9.
