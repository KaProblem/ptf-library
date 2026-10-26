---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/gravity/curved-spacetime
title: Curved spacetime
description: In Einstein's theory gravity is not a force but the curvature of spacetime; it agrees with Newton for everyday cases and differs measurably in clocks (GPS), light bending and Mercury's orbit.
lang: en
levels: [child, highschool, college, expert]
tags: [physics, gravity, general-relativity, einstein, time-dilation, gps, equivalence-principle]
requires:
  - ptf:el/gravity/universal-gravitation
duration_min: { child: 10, highschool: 20, college: 25, expert: 20 }
simulators:
  - ref: ptf:sim/newton-einstein@^1.1.0
    station: spacetime
    levels: [child, highschool, college, expert]
    role: explore
    note: Use the funnel as a picture, then discuss right away why the trampoline analogy is circular (station text).
  - ref: ptf:sim/newton-einstein@^1.1.0
    station: clocks
    levels: [highschool, college, expert]
    role: explore
    note: Ask first whether a clock on a satellite should run faster or slower; most learners only know the speed effect.
  - ref: ptf:sim/newton-einstein@^1.1.0
    station: mercury
    levels: [college, expert]
    role: practice
    note: Run with relativity × 0 first (closed ellipse), then × 100 000; point out that the real value is shown next to it.
sources:
  - id: ashby-gps
    resource: https://link.springer.com/article/10.12942/lrr-2003-1
    title: "Neil Ashby: Relativity in the Global Positioning System, Living Reviews in Relativity 6, 1 (2003)"
  - id: will-confrontation
    resource: https://link.springer.com/article/10.12942/lrr-2014-4
    title: "Clifford M. Will: The Confrontation between General Relativity and Experiment, Living Reviews in Relativity 17, 4 (2014)"
  - id: einstein-1916
    resource: https://en.wikisource.org/wiki/The_Foundation_of_the_Generalised_Theory_of_Relativity
    title: "Albert Einstein: The Foundation of the General Theory of Relativity (1916), English translation"
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
status: draft
version: 0.1.1
license: CC-BY-SA-4.0
---

# Core

Einstein replaced the pull with geometry: mass and energy curve spacetime,
and a freely falling body follows the straightest possible path through it.
For apples and planets this gives almost exactly Newton's answers; the
differences show up in precise measurements, and every GPS receiver depends
on them.

# Key facts

- Equivalence principle: in a small, freely falling lab no experiment can detect gravity (weightlessness), and a lab accelerating at g is indistinguishable from one resting in gravity g. Because all bodies fall alike, falling can be described as a property of spacetime.
- Weak field: clocks run slower deeper in a gravitational potential. Rate difference Δf / f ≈ ΔΦ / c², with Φ = −G M / r. Between the ground and GPS orbit (20 200 km up): +45.7 µs per day for the satellite clock.
- Moving clocks run slow (special relativity): about v² / (2 c²); for GPS (3.87 km/s) −7.2 µs per day. Net: +38.5 µs per day. Uncorrected, ranging errors would grow by about 11 km per day. GPS satellite clocks are set 4.465 parts in 10¹⁰ slow before launch.
- For a circular orbit both effects cancel at r = 1.5 R (about 3 200 km up); the space station's clock (400 km) loses about 25 µs per day net.
- Mercury's perihelion advances 574″ per century; planetary perturbations explain about 532″; general relativity predicts the remaining 43″: Δφ = 6π G M / (c² a (1 − e²)) = 5.0 · 10⁻⁷ rad per orbit, 415 orbits per century.
- Light grazing the Sun is deflected by 1.75″, twice the value one gets from a Newtonian corpuscle argument; confirmed by the 1919 eclipse expeditions and today to 10⁻⁴ by radio interferometry.
- Gravitational time dilation was measured in a 22.5 m tower (Pound and Rebka, 1959) and with optical clocks over a height difference of 33 cm (2010).
- The rubber-sheet picture is a picture of the potential (mostly the time part of the metric), not a mechanism: a marble on a real trampoline rolls inward because the Earth pulls it down.

# Level: child

<!-- ptf:text v1 -->

Put a heavy ball in the middle of a trampoline and roll a marble past it.
What does the marble do?

It curves towards the heavy ball, or even circles it. Einstein had an idea
a bit like that: heavy things like the Sun or the Earth bend space and time
around them, and everything that moves past follows the bend. Nothing has to
pull. It is only a picture, because a real trampoline needs the Earth's
gravity to work. But one thing is real and measured every day: clocks high
above the Earth tick a tiny bit faster than clocks on the ground. The
satellites that tell your phone where it is have to correct for that, or
the map would be wrong by kilometres after a single day.

# Level: highschool

<!-- ptf:text v1 -->

A guess first: a clock on a GPS satellite, 20 000 km up and moving at almost
4 km/s. Does it run faster or slower than a clock on the ground?

Both, in a way. Its speed makes it run slow, by about 7 microseconds a day:
that is special relativity. But being higher up, farther from the Earth's
mass, makes it run fast, by about 46 microseconds a day: that is gravity
bending time. Net, it gains 38 microseconds a day, and since light travels
300 m per microsecond, positions would drift by about 11 km per day if
nobody corrected for it. Newton's theory has no such effect: for Newton, time
ticks the same everywhere. Einstein's general relativity says mass bends
spacetime, and bodies in free fall follow the straightest paths through it.
Mostly it is time that is bent, and that is enough to make paths curve
towards a mass. For everyday speeds and masses, the result looks exactly like
Newton's pull.

# Level: college

<!-- ptf:text v1 -->

Start from the equivalence principle: in an elevator accelerating at g, a
light pulse sent from floor to ceiling arrives redshifted by g h / c², because
the ceiling has moved away during the travel time. If acceleration and
gravity are indistinguishable, the same redshift must appear between floors
of a building at rest on Earth: clocks lower down run slower by ΔΦ / c². For
GPS, ΔΦ / c² between the ground and orbit is 5.3 · 10⁻¹⁰, i.e. 45.7 µs per day,
minus 7.2 µs per day of velocity time dilation. In the weak-field limit the
metric is ds² ≈ −(1 + 2Φ/c²) c² dt² + (1 − 2Φ/c²) dx², and slow geodesics
reproduce Newton's r̈ = −∇Φ from the time part alone; the space part doubles
light deflection and, together with the next order in Φ, produces Mercury's
43″ per century.

# Level: expert

<!-- ptf:text v1 -->

For a test mass in the Schwarzschild field the orbit equation is
u'' + u = G M / h² + 3 G M u² / c² (u = 1/r), equivalent to adding an
attractive −3 G M h² / (c² r⁴) term to the Newtonian radial acceleration.
Treating it perturbatively gives the perihelion advance 6π G M / (c² a
(1 − e²)) per orbit. The simulator integrates exactly this correction and
exaggerates the coupling by up to 10⁶; from about 10⁵ on, second-order effects
make the measured value drift from the first-order formula. In the PPN
framework the advance is (2 + 2γ − β)/3 times the GR value, light deflection
(1 + γ)/2 times; Cassini bounds |γ − 1| < 2.3 · 10⁻⁵. GPS operationally
uses a clock-rate offset of −4.4647 · 10⁻¹⁰ plus a per-satellite eccentricity
correction of up to about 46 ns.

# Misconceptions

- **rubber-sheet-literal**: Spacetime is a sheet, and things roll into the dip → the sheet is a picture of the potential; on a real trampoline the Earth's gravity does the pulling, so the picture explains gravity with gravity. In general relativity free bodies follow geodesics, and mostly time is curved.
- **newton-clocks-absolute**: Time runs the same everywhere, only clocks could be imprecise → clock rates depend on the gravitational potential (and on speed); this is measured with atomic clocks and corrected in GPS every day.
- **relativity-only-for-extremes**: General relativity matters only near black holes → it changes GPS clocks by 38 µs per day, which would be an 11 km daily error, and it explains Mercury's orbit.
- **newton-wrong**: Einstein proved Newton wrong, so Newton's law is useless → Newton's law is the weak-field, slow-motion limit of general relativity and is accurate enough for almost all engineering and spaceflight.
- **satellite-clocks-slower-only**: A fast satellite's clock only runs slow → speed slows it, height speeds it up; for GPS the height effect wins, so the clock runs fast overall.
- **gravity-needs-contact**: A body only feels a mass it touches → a marble passing at a distance is steered by the curved space (in Newton's picture, pulled), so its path bends.
- **mass-repels**: Paths can bend away from a mass → gravity only attracts; free paths always bend towards the mass.
- **newton-orbits-turn**: Every orbit slowly turns, even with Newton's law alone → for a single planet Newton's law gives a closed ellipse; turning comes from other planets or from relativity.
- **orbits-decay**: Planets slowly spiral into the Sun → without friction nothing takes energy away; the ellipse keeps its size.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "trampoline-limit",
  "level": "child",
  "purpose": "check",
  "misconception": "rubber-sheet-literal",
  "question": "Why is the trampoline only a picture of Einstein's idea, not the real thing?",
  "options": [
    { "text": "On a trampoline, the Earth's gravity pulls the marble into the dip", "correct": true, "feedback": "Yes. The picture needs gravity to explain gravity, so it is only a helpful image." },
    { "text": "Because space is made of rubber", "correct": false, "feedback": "Space is not made of any material. The trampoline is only a picture." },
    { "text": "Because the marble is too small", "correct": false, "feedback": "The size of the marble is not the problem; the hidden pull of the Earth is." }
  ],
  "explanation": "A useful picture with a built-in cheat."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "gps-net",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "satellite-clocks-slower-only",
  "question": "Compared with a clock on the ground, a GPS satellite clock (20 200 km up, 3.9 km/s) runs...",
  "options": [
    { "text": "fast, by about 38 µs per day", "correct": true, "feedback": "Right: +46 µs from being higher up, −7 µs from its speed." },
    { "text": "slow, because it moves fast", "correct": false, "feedback": "The speed effect is real, but the height effect is six times larger." },
    { "text": "exactly in step, time is the same everywhere", "correct": false, "feedback": "That is Newton's view. Atomic clocks show the difference every day." }
  ],
  "explanation": "Gravitational and velocity time dilation have opposite signs; for GPS gravity wins."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "gps-error-km",
  "level": "highschool",
  "purpose": "transfer",
  "misconception": "relativity-only-for-extremes",
  "question": "Light travels about 300 m per microsecond. If GPS ignored the 38 µs per day clock offset, how many kilometres would positions drift in one day?",
  "answer": 11.5,
  "tolerance": 2,
  "unit": "km",
  "explanation": "38 µs × 300 m/µs ≈ 11.5 km per day."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "gps-gravity-shift",
  "level": "college",
  "purpose": "check",
  "title": "Height effect on a GPS clock",
  "intro": "G M = 3.986 · 10¹⁴ m³/s², c = 2.998 · 10⁸ m/s, R = 6371 km, r = 26 571 km.",
  "columns": ["Step", "Expression", "Value"],
  "rows": [["Potential difference", "G M (1/R − 1/r)", "4.757 · 10⁷ m²/s²"], ["Fractional rate", "ΔΦ / c²", "5.29 · 10⁻¹⁰"], ["Per day", "× 86 400 s", "45.7 µs"], ["Speed effect", "v² / (2c²) × 86 400 s, v = √(GM/r)", "−7.2 µs"]],
  "result": { "label": "Net offset per day", "value": "+38.5 µs" },
  "explanation": "Weak-field time dilation plus special-relativistic time dilation."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "equivalence-redshift",
  "level": "college",
  "purpose": "transfer",
  "misconception": "newton-clocks-absolute",
  "question": "Use the equivalence principle to argue that a clock at the top of a tower runs faster than one at the bottom.",
  "rubric": ["A lab accelerating upward at g is equivalent to one resting in gravity", "A signal sent upward arrives Doppler-shifted (receiver moving away during transit)", "Frequency shift Δf/f = g h / c²", "Therefore in gravity the upper clock is measured to run faster by g h / c²"],
  "sample_answer": "In a rocket accelerating at g, a pulse sent from the floor reaches the ceiling after about h/c, when the ceiling moves g h / c faster; the receiver sees a redshift Δf/f = g h / c². By the equivalence principle the same holds in a tower at rest on Earth: the top clock sees the bottom clock tick slower, i.e. the top clock runs faster by g h / c² (Pound and Rebka measured this over 22.5 m).",
  "explanation": "Gravitational time dilation follows from equivalence and the Doppler effect."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "mercury-residual",
  "level": "expert",
  "purpose": "transfer",
  "question": "Mercury's perihelion advances 574″ per century. Explain how 43″ of it is attributed to general relativity, and why an exaggerated simulation is still a valid illustration.",
  "rubric": ["About 532″ from perturbations by other planets (Newtonian)", "Residual 43″ matches 6πGM/(c²a(1−e²)) × 415 orbits", "The correction is an extra −3GMh²/(c²r⁴) radial term", "Scaling the coupling keeps the mechanism; the precession grows linearly while the correction stays small; at large factors higher orders appear and must be named"],
  "sample_answer": "Newtonian perturbation theory with all planets accounts for about 532″ per century. The remaining 43″ equals 6πGM/(c²a(1−e²)) ≈ 5.0e-7 rad per orbit times 415 orbits. In the orbit equation this corresponds to an extra attractive term 3GMh²/(c²r⁴). Multiplying its strength in a simulation makes the same mechanism visible; as long as the term stays a small perturbation, the precession scales linearly and matches the formula; at very large factors the second order shows, so the display has to show the true value next to the boosted one.",
  "explanation": "A residual after all Newtonian effects is what made the precession a test of the theory."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Neil Ashby, Relativity in the Global Positioning System](https://link.springer.com/article/10.12942/lrr-2003-1): how GPS handles both clock effects, with numbers (college, expert).
- [Clifford M. Will, The Confrontation between General Relativity and Experiment](https://link.springer.com/article/10.12942/lrr-2014-4): all classic and modern tests, including Mercury, light bending and the equivalence principle (expert).
- [Einstein, The Foundation of the General Theory of Relativity (1916)](https://en.wikisource.org/wiki/The_Foundation_of_the_Generalised_Theory_of_Relativity): the original paper, including the perihelion and light-bending predictions (expert).

# Sources

Grounding: [^ashby-gps], [^will-confrontation], [^einstein-1916].

[^ashby-gps]: N. Ashby, Relativity in the Global Positioning System, Living Reviews in Relativity 6 (2003).
[^will-confrontation]: C. M. Will, The Confrontation between General Relativity and Experiment, Living Reviews in Relativity 17 (2014).
[^einstein-1916]: A. Einstein, Die Grundlage der allgemeinen Relativitätstheorie, Annalen der Physik 49 (1916).
