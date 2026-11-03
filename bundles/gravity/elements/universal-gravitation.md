---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/gravity/universal-gravitation
title: Universal gravitation
description: Every mass attracts every other mass with a force that falls off with the square of the distance; the same law makes apples fall and keeps the Moon and satellites in orbit, which is falling around the Earth.
lang: en
levels: [child, highschool, college, expert]
objectives:
  - id: same-law
    text: Explain that the same law makes an apple fall and keeps the Moon in orbit.
  - id: orbit-is-falling
    text: Describe an orbit as falling while the ground curves away, and why gravity weakens with the square of the distance.
tags: [physics, gravity, newton, orbit, inverse-square-law, weightlessness]
about:
  - wikidata: Q134465
    label: "Newton's law of universal gravitation"
requires:
  - ptf:el/gravity/free-fall
leads_to:
  - ptf:el/gravity/curved-spacetime
duration_min: { child: 10, highschool: 20, college: 20, expert: 15 }
simulators:
  - ref: ptf:sim/newton-einstein@^1.2.0
    station: cannon
    levels: [child, highschool, college, expert]
    role: explore
    note: Fire at 4 km/s first, then let the learner find the speed that never lands; ask what this says about astronauts.
    use_when: the learner cannot picture an orbit as falling around the Earth
  - ref: ptf:sim/newton-einstein@^1.2.0
    station: moon
    levels: [child, highschool, college, expert]
    role: explore
    note: Ask the learner to predict how much weaker gravity is at 60 Earth radii before they move the slider.
    use_when: the learner should predict how much weaker gravity is at the Moon's distance
sources:
  - id: newton-principia
    resource: https://en.wikisource.org/wiki/The_Mathematical_Principles_of_Natural_Philosophy_(1846)
    title: "Isaac Newton: Philosophiae Naturalis Principia Mathematica (1687), Motte's translation"
  - id: feynman-i-7
    resource: https://www.feynmanlectures.caltech.edu/I_07.html
    title: "The Feynman Lectures on Physics, Vol. I, ch. 7: The Theory of Gravitation"
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
status: draft
version: 0.4.0
license: CC-BY-SA-4.0
---

# Introduction

- Why does the Moon not fall onto the Earth, and why do astronauts float?
- One law answers both, and it is the same law that pulls an apple down.
- Afterwards the learner can explain orbits as a kind of fall and estimate how gravity weakens with distance.

# Core

Every mass pulls on every other mass, and the pull gets weaker with the
square of the distance. One law covers a falling apple and the Moon: an
orbit is a fall in which the ground keeps curving away beneath the falling
body, so it never lands.

# Key facts

- F = G m₁ m₂ / r², G = 6.674 · 10⁻¹¹ N m² / kg². Near the Earth's surface this gives g = G M / R² ≈ 9.81 m/s² (M = 5.97 · 10²⁴ kg, R = 6371 km, G M = 3.986 · 10¹⁴ m³/s²).
- Moon test: the Moon at r ≈ 60.3 R needs a centripetal acceleration v² / r = (2π r / T)² / r = 2.72 mm/s² (r = 384 400 km, T = 27.32 days). Gravity weakened by 60.3² gives 9.81 / 3636 = 2.70 mm/s². The Moon falls about 1.4 mm towards the Earth every second.
- Circular orbit speed v = √(G M / r): 7.9 km/s at the surface (ignoring air), 7.67 km/s at 400 km (space station, one orbit in about 92 min), 3.07 km/s for geostationary orbit (35 786 km up, 24 h).
- Escape speed v = √(2 G M / r): 11.2 km/s from the surface, 10.85 km/s from 400 km.
- Newton's cannon (from the Principia's "System of the World"): fired horizontally from a mountain above the air, faster shots land farther away until one falls all the way round.
- At 400 km gravity is still about 89 % of its surface value. Astronauts are weightless because they and the station fall together (free fall), not because gravity is missing.
- Henry Cavendish measured the attraction between lead spheres in 1798 (torsion balance), which fixed G and thereby the Earth's mass.

# Level: child

<!-- ptf:text v2 -->

Imagine you throw a ball sideways from a very, very high mountain. A slow
throw lands nearby. A faster throw lands farther away. What if you could
throw it so fast that it lands... never?

The Earth is round. While the ball falls, the ground curves away under it.
If it is fast enough, about 8 kilometres every second, it falls and falls but
the ground keeps curving away, and the ball goes all the way round the
Earth. That is what the Moon does, and the space station, and every
satellite: they are all falling around the Earth. Astronauts float in the
space station not because there is no gravity up there, but because they and
the station are falling together.

The same pull that makes an apple fall from a tree reaches all the way to the
Moon, only weaker. The farther away, the weaker it gets, and fast: twice as
far away, only a quarter of the pull. The Moon is so far away that the
Earth's pull there is thousands of times weaker than at the apple tree, just
enough to keep bending the Moon's path round us.

# Level: highschool

<!-- ptf:text v1 -->

Start with a guess: the Moon is about 60 times farther from the Earth's
centre than an apple on a tree. How much weaker is the Earth's pull out
there?

Newton's answer: 60 × 60 = 3600 times weaker, because the pull falls with
the square of the distance. An apple falls 4.9 m in its first second; at the
Moon's distance it would fall 4.9 m / 3600 ≈ 1.4 mm. And that is exactly how
much the Moon has to fall towards us every second to stay on its circle
instead of flying off in a straight line. The same law, F = G m₁ m₂ / r²,
holds for the apple and the sky. An orbit is just a fall that keeps missing:
fired sideways at about 7.7 km/s from 400 km up, a body falls around the
whole Earth in 92 minutes. Faster than about 11 km/s it escapes for good.

# Level: college

<!-- ptf:text v1 -->

Before computing: what speed makes the centripetal acceleration equal to
local gravity at radius r? Setting v² / r = G M / r² gives v = √(G M / r),
7.67 km/s at 400 km. With energy E = ½ v² − G M / r per unit mass, E < 0 is
bound (ellipse, circle as a special case), E = 0 is the parabolic escape
threshold v_esc = √2 · v_circ, E > 0 hyperbolic. Kepler's laws follow: the
inverse-square force conserves angular momentum (equal areas) and the
Laplace-Runge-Lenz vector, which is why Newtonian orbits are closed
ellipses that do not turn, a fact that becomes important for Mercury.
Weightlessness is the statement that in free fall all parts of a system share
the same acceleration, so no internal forces are needed to support them.

# Level: expert

<!-- ptf:text v2 -->

Before reading: Newton's Moon test compares two numbers, the Moon's
centripetal acceleration and g / 60². Compute both (2.7 · 10⁻³ m/s² each) and
say what assumption about the Earth makes the second one legitimate.

One inverse-square law, F = G m₁ m₂ / r², governs the apple and the Moon:
at 60 Earth radii g drops by 3600, matching the Moon's v² / r. (Using the
centre distance relies on the shell theorem: a spherically symmetric body
attracts like a point mass.) An orbit is free fall with enough tangential
speed that the trajectory misses the surface: v_circ = √(G M / r), bound for
E < 0, escape at √2 · v_circ.

Newton's law is the weak-field, slow-motion limit of general relativity:
with Φ = −G M / r, geodesics of g₀₀ ≈ −(1 + 2Φ/c²) reproduce r̈ = −∇Φ. Closed
orbits are special to the 1/r and r² potentials (Bertrand's theorem); any
perturbation makes the ellipse precess. In the solar system, other planets
account for most of Mercury's perihelion advance (about 532″ per century);
the residual 43″ per century is the first relativistic correction. G is the
least precisely known fundamental constant (relative uncertainty about
2 · 10⁻⁵), while G M of the Earth is known to 10⁻⁹ from satellite tracking.

# Misconceptions

- **no-gravity-in-orbit**: There is no gravity in space or in orbit, that is why astronauts float → gravity at 400 km is still about 89 % of the surface value; astronauts float because they and the station fall together.
- **fast-escapes-gravity**: A fast enough object simply flies straight off → below escape speed gravity bends the path into an ellipse; only above about 11 km/s does it escape, and even then the path is curved.
- **orbit-needs-engine**: Satellites need their engines to stay up → in a vacuum nothing slows them; they coast in free fall (engines are only for changing or correcting orbits, e.g. against thin air drag).
- **moon-not-falling**: The Moon is not falling, it just floats there → it falls towards the Earth about 1.4 mm every second; without that fall it would move off in a straight line.
- **gravity-linear-distance**: Twice the distance means half the gravity → the pull falls with the square: twice the distance, a quarter of the pull.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "astronauts-float",
  "level": "child",
  "purpose": "check",
  "objectives": ["orbit-is-falling"],
  "misconception": "no-gravity-in-orbit",
  "question": "Why do astronauts float in the space station?",
  "options": [
    { "text": "They and the station are falling around the Earth together", "correct": true, "feedback": "Yes. Everything falls together, so nothing presses them onto the floor." },
    { "text": "There is no gravity in space", "correct": false, "feedback": "Up there gravity is almost as strong as on the ground. Without it the station would fly away." },
    { "text": "The space station has a machine that switches gravity off", "correct": false, "feedback": "No machine can switch gravity off. Falling together is what makes them float." }
  ],
  "explanation": "Weightlessness is free fall, not missing gravity."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "double-distance",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["orbit-is-falling"],
  "misconception": "gravity-linear-distance",
  "question": "A satellite moves from 1 to 2 Earth radii from the Earth's centre. How does the Earth's pull on it change?",
  "options": [
    { "text": "It becomes a quarter", "correct": true, "feedback": "Right: 1 / 2² = 1/4." },
    { "text": "It halves", "correct": false, "feedback": "That would be a 1/r law. Gravity falls with the square of the distance." },
    { "text": "It stays the same, there is no air up there", "correct": false, "feedback": "Air has nothing to do with gravity; distance does." }
  ],
  "explanation": "F ∝ 1 / r²."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "moon-fall-per-second",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["same-law"],
  "misconception": "moon-not-falling",
  "question": "An apple falls 4.9 m in its first second. The Moon is about 60 Earth radii from the Earth's centre. How many millimetres does the Moon fall towards the Earth in one second?",
  "answer": 1.36,
  "tolerance": 0.2,
  "unit": "mm",
  "explanation": "4.9 m / 60² ≈ 1.36 mm, which matches the curvature of the Moon's orbit."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "iss-speed",
  "level": "college",
  "purpose": "check",
  "objectives": ["orbit-is-falling"],
  "title": "Speed and period of the space station",
  "intro": "Altitude 400 km, R = 6371 km, G M = 3.986 · 10¹⁴ m³/s².",
  "columns": ["Step", "Expression", "Value"],
  "rows": [["Orbit radius", "r = R + h", "6.771 · 10⁶ m"], ["Circular speed", "v = √(G M / r)", "7.67 km/s"], ["Circumference", "2π r", "42 543 km"], ["Period", "T = 2π r / v", "about 92 min"]],
  "result": { "label": "Speed and period", "value": "7.67 km/s, 92 min" },
  "explanation": "Centripetal acceleration equals local gravity: v² / r = G M / r²."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "cannon-speeds",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["orbit-is-falling"],
  "misconception": "fast-escapes-gravity",
  "question": "Newton's cannon fires from 400 km altitude at 4, 7.7, 9.5 and 11 km/s. Describe the four paths and the energy criterion that separates them.",
  "rubric": ["4 km/s: falls back and lands (ellipse cut by the Earth)", "7.7 km/s: close to circular orbit", "9.5 km/s: elongated ellipse, still bound (E < 0)", "11 km/s: escapes, E > 0, above √2 · v_circ ≈ 10.85 km/s"],
  "sample_answer": "All paths are conic sections with the Earth's centre at a focus. At 4 km/s the ellipse intersects the Earth, so it lands. 7.7 km/s is about the circular speed √(GM/r). 9.5 km/s gives a bound ellipse reaching about 3.5 Earth radii. 11 km/s exceeds the escape speed √(2GM/r) ≈ 10.85 km/s, so the specific energy ½v² − GM/r is positive and the path is a hyperbola.",
  "explanation": "The sign of the orbital energy decides bound versus escaping."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "closed-orbits",
  "level": "expert",
  "purpose": "transfer",
  "question": "Why are Newtonian Kepler orbits closed, and what does a small additional 1/r⁴ term in the force do?",
  "rubric": ["Inverse-square force conserves the Laplace-Runge-Lenz vector", "Bertrand's theorem: only 1/r² and linear forces give closed bound orbits for all initial conditions", "A perturbation breaks the conservation, the perihelion direction rotates", "1/r⁴ term (as in the relativistic correction) gives a prograde precession proportional to its strength"],
  "sample_answer": "For an inverse-square force the Laplace-Runge-Lenz vector is conserved; it points to the perihelion, so the ellipse does not turn. By Bertrand's theorem only inverse-square and harmonic forces have all bound orbits closed. An extra attractive 1/r⁴ term breaks the symmetry: the radial and angular periods differ slightly and the perihelion advances each orbit, by Δφ ≈ 6πGM/(c²a(1−e²)) for the relativistic form.",
  "explanation": "Precession is the fingerprint of a deviation from the pure inverse-square law."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "quarter-pull",
  "level": "child",
  "purpose": "check",
  "objectives": ["orbit-is-falling"],
  "misconception": "gravity-linear-distance",
  "question": "A rocket flies so far that it is twice as far from the middle of the Earth as before. How strong is the Earth's pull on it now?",
  "options": [
    {
      "text": "A quarter as strong",
      "correct": true,
      "feedback": "Yes! Twice as far means only a quarter of the pull."
    },
    {
      "text": "Half as strong",
      "correct": false,
      "feedback": "Good guess, but the pull gets weaker faster than that: twice as far, a quarter of the pull."
    },
    {
      "text": "Zero, there is no gravity in space",
      "correct": false,
      "feedback": "No. The pull reaches very far, even to the Moon; it only gets weaker."
    }
  ],
  "explanation": "Gravity weakens with the square of the distance: 2 × 2 = 4, so a quarter."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "moon-test",
  "level": "expert",
  "purpose": "check",
  "objectives": ["same-law"],
  "misconception": "moon-not-falling",
  "question": "Reproduce Newton's Moon test with r_Moon ≈ 60 R_E and a period of 27.3 days, and say why using the Earth's centre distance is justified.",
  "rubric": [
    "Centripetal acceleration a = 4π² r / T² ≈ 2.7 · 10⁻³ m/s²",
    "g / 60² = 9.81 / 3600 ≈ 2.7 · 10⁻³ m/s²",
    "Agreement shows the same inverse-square law acts on apple and Moon",
    "Shell theorem: a spherically symmetric Earth attracts like a point mass at its centre"
  ],
  "sample_answer": "r = 60 · 6.37 · 10⁶ m ≈ 3.8 · 10⁸ m, T = 2.36 · 10⁶ s, so a = 4π² r / T² ≈ 2.7 · 10⁻³ m/s², which equals g / 3600. The Moon falls towards the Earth exactly as an inverse-square law predicts. The centre distance is legitimate because a spherically symmetric mass acts like a point mass outside it (shell theorem).",
  "explanation": "This calculation unified terrestrial and celestial mechanics."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "moon-stays",
  "level": "child",
  "purpose": "check",
  "objectives": [
    "same-law"
  ],
  "misconception": "moon-not-falling",
  "question": "Why does the Moon not fly off into space?",
  "options": [
    {
      "text": "The Earth pulls on it, the same pull that makes an apple fall from a tree",
      "correct": true,
      "feedback": "Yes! One pull for both: the apple falls down, and the Moon keeps falling around the Earth."
    },
    {
      "text": "The Moon is glued to the sky",
      "correct": false,
      "feedback": "No, there is nothing to hold it except the Earth's pull."
    },
    {
      "text": "There is no gravity up there, so it just stays where it is",
      "correct": false,
      "feedback": "There is gravity up there; without it the Moon would fly off in a straight line."
    }
  ],
  "explanation": "Newton's big idea: the same gravity works on the ground and in the sky."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "apple-and-moon",
  "level": "highschool",
  "purpose": "check",
  "objectives": [
    "same-law"
  ],
  "misconception": "gravity-linear-distance",
  "question": "Newton compared a falling apple with the Moon, which is 60 times farther from the Earth's centre. What did he find?",
  "options": [
    {
      "text": "The Moon falls towards the Earth with about 1/3600 of g, exactly what one law weakened with the square of the distance predicts",
      "correct": true,
      "feedback": "Right. 60² = 3600, and the Moon's measured fall matches."
    },
    {
      "text": "The Moon does not fall at all; it is held by a different force",
      "correct": false,
      "feedback": "No. It falls about 1.4 mm every second, and that fall matches the apple's law."
    },
    {
      "text": "The Moon falls with the same g as the apple",
      "correct": false,
      "feedback": "No. The pull is 3600 times weaker at 60 Earth radii."
    }
  ],
  "explanation": "9.81 m/s² / 3600 ≈ 2.7 mm/s², and that is exactly the acceleration the Moon needs to stay on its orbit."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "g-at-moon",
  "level": "college",
  "purpose": "check",
  "objectives": [
    "same-law"
  ],
  "misconception": "gravity-linear-distance",
  "question": "Using g = 9.81 m/s² at the Earth's surface and the inverse-square law, what is the Earth's gravitational acceleration at the Moon's distance of 60.3 Earth radii, in mm/s²?",
  "answer": 2.7,
  "tolerance": 0.1,
  "unit": "mm/s²",
  "explanation": "9.81 / 60.3² = 9.81 / 3636 = 2.70 · 10⁻³ m/s². The Moon's centripetal acceleration from its orbit is 2.72 mm/s²: one law for both."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "geostationary-altitude",
  "level": "expert",
  "purpose": "check",
  "objectives": [
    "orbit-is-falling"
  ],
  "question": "A geostationary satellite falls around the Earth once per sidereal day (86 164 s). With G M = 3.986 · 10¹⁴ m³/s² and R = 6371 km, at what altitude does it orbit, in thousands of km?",
  "answer": 35.8,
  "tolerance": 0.5,
  "unit": "thousand km",
  "explanation": "G M / r² = ω² r gives r = (G M T² / 4π²)^(1/3) = 42 164 km, so the altitude is 42 164 − 6371 ≈ 35 790 km. The inverse-square law fixes the radius for each period (Kepler's third law)."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [The Feynman Lectures on Physics, Vol. I, ch. 7](https://www.feynmanlectures.caltech.edu/I_07.html): the theory of gravitation from Kepler to Cavendish, including the Moon's fall per second (highschool, college).
- [Newton's Principia, Motte's translation](https://en.wikisource.org/wiki/The_Mathematical_Principles_of_Natural_Philosophy_(1846)): Book III and the "System of the World" with the cannon on the mountain (expert).

# Sources

Grounding: [^newton-principia], [^feynman-i-7].

[^newton-principia]: Isaac Newton, Philosophiae Naturalis Principia Mathematica, 1687, Book III.
[^feynman-i-7]: R. P. Feynman, R. B. Leighton, M. Sands, The Feynman Lectures on Physics, Vol. I, ch. 7.
