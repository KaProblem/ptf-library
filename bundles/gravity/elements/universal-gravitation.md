---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/gravity/universal-gravitation
title: Universal gravitation
description: Every mass attracts every other mass with a force that falls off with the square of the distance; the same law makes apples fall and keeps the Moon and satellites in orbit, which is falling around the Earth.
lang: en
levels: [child, highschool, college, expert]
tags: [physics, gravity, newton, orbit, inverse-square-law, weightlessness]
requires:
  - ptf:el/gravity/free-fall
leads_to:
  - ptf:el/gravity/curved-spacetime
duration_min: { child: 10, highschool: 20, college: 20, expert: 15 }
simulators:
  - ref: ptf:sim/newton-einstein@^1.0.0
    station: cannon
    levels: [child, highschool, college, expert]
    role: explore
    note: Fire at 4 km/s first, then let the learner find the speed that never lands; ask what this says about astronauts.
  - ref: ptf:sim/newton-einstein@^1.0.0
    station: moon
    levels: [highschool, college, expert]
    role: explore
    note: Ask the learner to predict how much weaker gravity is at 60 Earth radii before they move the slider.
sources:
  - id: newton-principia
    resource: https://en.wikisource.org/wiki/The_Mathematical_Principles_of_Natural_Philosophy_(1846)
    title: "Isaac Newton: Philosophiae Naturalis Principia Mathematica (1687), Motte's translation"
  - id: feynman-i-7
    resource: https://www.feynmanlectures.caltech.edu/I_07.html
    title: "The Feynman Lectures on Physics, Vol. I, ch. 7: The Theory of Gravitation"
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

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

<!-- ptf:text v1 -->

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

<!-- ptf:text v1 -->

Newton's law is the weak-field, slow-motion limit of general relativity:
with potential Φ = −G M / r, geodesics of the metric g₀₀ ≈ −(1 + 2Φ/c²)
reproduce r̈ = −∇Φ. Closed orbits are special to the 1/r and r² potentials
(Bertrand's theorem); any perturbation makes the ellipse precess. In the
solar system, perturbations by other planets account for most of Mercury's
perihelion advance (about 532″ per century); the residual 43″ per century is
the first relativistic correction. G is the least precisely known fundamental
constant (relative uncertainty about 2 · 10⁻⁵), while G M of the Earth is
known to 10⁻⁹ from satellite tracking.

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

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [The Feynman Lectures on Physics, Vol. I, ch. 7](https://www.feynmanlectures.caltech.edu/I_07.html): the theory of gravitation from Kepler to Cavendish, including the Moon's fall per second (highschool, college).
- [Newton's Principia, Motte's translation](https://en.wikisource.org/wiki/The_Mathematical_Principles_of_Natural_Philosophy_(1846)): Book III and the "System of the World" with the cannon on the mountain (expert).

# Sources

Grounding: [^newton-principia], [^feynman-i-7].

[^newton-principia]: Isaac Newton, Philosophiae Naturalis Principia Mathematica, 1687, Book III.
[^feynman-i-7]: R. P. Feynman, R. B. Leighton, M. Sands, The Feynman Lectures on Physics, Vol. I, ch. 7.
