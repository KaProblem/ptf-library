---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/gravity/free-fall
title: "Free fall: heavy and light together"
description: Without air, every object falls with the same acceleration g, whatever its mass; the distance grows with the square of the time.
lang: en
levels: [child, highschool, college, expert]
objectives:
  - Predict that a heavy and a light object fall equally fast without air, and explain why.
  - Explain that the speed grows by about 9.8 m/s every second and the distance with the square of the time.
tags: [physics, mechanics, gravity, free-fall, acceleration]
about:
  - wikidata: Q140028
    label: free fall
  - wikidata: Q30006
    label: gravitational acceleration
leads_to:
  - ptf:el/gravity/air-resistance
  - ptf:el/gravity/inclined-plane
duration_min: { child: 10, highschool: 15, college: 15, expert: 10 }
simulators:
  - ref: ptf:sim/falling-tower@^1.1.0
    station: guess
    levels: [child, highschool, college, expert]
    role: explore
    note: Ask for the guess before anything else; most learners expect the heavy ball to win clearly.
    use_when: the learner should commit to a guess about heavy versus light before any explanation
  - ref: ptf:sim/falling-tower@^1.1.0
    station: vacuum
    levels: [child, highschool, college, expert]
    role: explore
    note: Let the learner drop feather and hammer with air first, then without; the "aha" is that the difference disappears.
    use_when: the learner suspects air is behind the difference and wants to see it removed
sources:
  - id: galileo-two-new-sciences
    resource: https://oll.libertyfund.org/titles/galilei-dialogues-concerning-two-new-sciences
    title: "Galileo Galilei: Dialogues Concerning Two New Sciences (1638)"
  - id: feynman-i-9
    resource: https://www.feynmanlectures.caltech.edu/I_09.html
    title: "The Feynman Lectures on Physics, Vol. I, ch. 9: Newton's Laws of Dynamics"
  - id: apollo-15-feather
    resource: https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html
    title: "NASA NSSDCA: The Apollo 15 Hammer-Feather Drop"
generated: { by: claude/opus, at: 2026-10-26T14:00:00Z }
status: draft
version: 0.2.0
license: CC-BY-SA-4.0
---

# Introduction

- Almost everyone expects the heavier ball to land first. This step checks that belief.
- Falling is the simplest motion in physics and the starting point for everything else about gravity.
- Afterwards the learner can say why weight does not decide how fast things fall, and how far something falls in a given time.

# Core

Gravity pulls harder on a heavier object, but a heavier object is also
harder to get moving, by exactly the same factor. So without air everything
falls with the same, steadily growing speed: on Earth it gains about
9.8 m/s every second.

# Key facts

- Gravitational acceleration near the Earth's surface: g ≈ 9.81 m/s² (9.78 at the equator to 9.83 at the poles). On the Moon g ≈ 1.62 m/s².
- Weight F = m g; Newton's second law a = F / m = g: the mass cancels. That the mass in F = m g (gravitational mass) equals the mass in F = m a (inertial mass) is the equivalence principle, tested to about 1 part in 10¹⁵.
- From rest: v = g t, s = ½ g t². Distances in successive equal time steps grow like 1 : 3 : 5 : 7.
- Fall time from h: t = √(2h / g). From 56 m (the leaning tower's top gallery): 3.38 s, landing at 33 m/s (about 120 km/h) without air.
- Aristotle taught that heavier bodies fall faster in proportion to their weight; this stood for almost 2000 years. Simon Stevin dropped two lead balls (one ten times heavier) from a church tower in Delft in 1586 and heard them land together. Galileo argued the same in 1638; whether he really dropped balls from the tower of Pisa is only reported by his student Viviani and is doubted by historians.
- Galileo's thought experiment: tie a heavy and a light stone together. If heavy fell faster, the light one would slow the pair down, but the pair is heavier than either, so it should fall faster. The contradiction disappears only if all fall alike.
- On the Moon in 1971 an astronaut dropped a 1.32 kg hammer and a 0.03 kg falcon feather; they landed together.
- With air, two equal-sized balls of iron (4.1 kg) and wood (0.37 kg) from 56 m land 0.17 s apart: the wooden one is still about 5 m up when the iron one lands. Ten times the weight does not mean anything like ten times the speed.

# Level: child

<!-- ptf:text v1 -->

Hold a heavy ball and a light ball, the same size, high up and let go at the
same moment. Which one hits the floor first? Try it, or try it in the tower.

They land together, or almost. The Earth pulls harder on the heavy ball, but
the heavy ball is also lazier: it is harder to get moving. Both things are
bigger by the same amount, so they cancel out. Only the air can make a
difference: a feather floats down slowly because the air pushes against it.
Where there is no air, like on the Moon, a feather and a hammer fall side by
side.

# Level: highschool

<!-- ptf:text v1 -->

Guess first: from the top of a 56-metre tower you drop an iron ball and a
wooden ball of the same size. The iron ball is ten times heavier. Where is
the wooden ball when the iron ball lands?

Not near the top, as "ten times heavier, ten times faster" would predict, but
only about five metres behind. And if you pump the air away, the gap
vanishes completely. The reason: gravity pulls with a force proportional to
the mass (weight = m · g), and accelerating a mass takes a force
proportional to the mass (F = m · a). Divide one by the other and the mass
drops out: every object falls with the same acceleration g ≈ 9.81 m/s².
Its speed grows by about 9.8 m/s each second, and the distance grows with the
square of the time: s = ½ g t². From the tower that takes 3.4 seconds.

# Level: college

<!-- ptf:text v1 -->

Before calculating, decide: is it obvious that the two masses in
m_g g = m_i a are the same quantity? It is not. One measures how strongly a
body is pulled (gravitational mass), the other how strongly it resists being
accelerated (inertial mass). Free fall at equal rates is the experimental
statement m_g / m_i = const for all materials, which Eötvös-type torsion
balances and the MICROSCOPE satellite have confirmed to about 10⁻¹⁵. With
units chosen so the constant is 1, a = g for every body, and integrating
twice gives v = g t, s = ½ g t². Real drops deviate only through air
resistance (next element) and, at the 10⁻³ level, through the latitude
dependence of g.

# Level: expert

<!-- ptf:text v1 -->

The universality of free fall (weak equivalence principle) is the empirical
root of general relativity: if all test bodies follow the same trajectory
independent of composition, the trajectory is a property of spacetime, not
of the body, and gravity can be geometrised. Current bounds on the Eötvös
parameter η = 2|a₁ − a₂| / (a₁ + a₂) are about 10⁻¹⁵ (MICROSCOPE, 2022),
from lunar laser ranging about 10⁻¹³ for the Earth-Moon system including
gravitational self-energy (strong equivalence principle). Pedagogically,
the historically decisive steps were Stevin's and Galileo's arguments
against Aristotle and Galileo's inclined-plane measurements of s ∝ t².

# Misconceptions

- **heavier-falls-faster**: A heavier object falls faster, roughly in proportion to its weight → without air all objects fall equally fast; with air the heavier of two equal-sized objects is slightly ahead, far less than its weight ratio suggests.
- **light-falls-faster**: Lighter things are quicker → gravity gives every object the same acceleration; air slows light objects down, it never speeds them up.
- **no-gravity-on-moon**: There is no gravity on the Moon, so things float → the Moon's gravity is about one sixth of the Earth's; things fall slowly, and all together because there is no air.
- **constant-fall-speed**: A falling object falls at a constant speed → without air it speeds up by about 9.8 m/s every second; a constant speed is only reached with air resistance.
- **gravity-depends-on-shape**: Gravity pulls differently on objects of different shape → gravity depends only on mass; shape matters only for air resistance.
- **no-gravity-without-air**: Without air nothing holds a feather down, so it floats → gravity does not need air; in a vacuum a feather falls exactly like a hammer.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "tower-guess",
  "level": "child",
  "purpose": "warmup",
  "misconception": "heavier-falls-faster",
  "question": "A heavy iron ball and a light wooden ball of the same size are dropped together from a tall tower. What happens?",
  "options": [
    { "text": "They land almost together", "correct": true, "feedback": "Yes. The air holds the wooden ball back a little, but only a little." },
    { "text": "The iron ball lands long before the wooden ball", "correct": false, "feedback": "That is what most people guess. The Earth pulls harder on the iron ball, but it is also harder to get moving." },
    { "text": "The wooden ball lands first", "correct": false, "feedback": "Light things are not pulled faster. The air even slows the wooden ball a little." }
  ],
  "explanation": "More pull and more inertia cancel; only the air makes a small difference."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "moon-drop",
  "level": "child",
  "purpose": "check",
  "misconception": "no-gravity-on-moon",
  "question": "On the Moon, someone drops a hammer and a feather at the same moment. What happens?",
  "options": [
    { "text": "Both land at the same moment", "correct": true, "feedback": "Right. No air, so nothing slows the feather." },
    { "text": "The hammer lands first", "correct": false, "feedback": "On Earth, yes, because of the air. The Moon has no air." },
    { "text": "Both float away", "correct": false, "feedback": "The Moon has gravity, about one sixth of the Earth's. Things fall, just more slowly." }
  ],
  "explanation": "Without air, everything falls together, on the Moon as on Earth."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "tower-time",
  "level": "highschool",
  "purpose": "check",
  "misconception": "constant-fall-speed",
  "question": "How many seconds does a ball take to fall 56 m without air resistance (g = 9.81 m/s²)?",
  "answer": 3.38,
  "tolerance": 0.15,
  "unit": "s",
  "explanation": "t = √(2h / g) = √(112 / 9.81) ≈ 3.38 s."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "speed-after-two-seconds",
  "level": "highschool",
  "purpose": "check",
  "misconception": "constant-fall-speed",
  "question": "A stone falls freely from rest. After 1 s it moves at about 9.8 m/s. How fast is it after 2 s?",
  "options": [
    { "text": "About 19.6 m/s", "correct": true, "feedback": "Yes: it gains 9.8 m/s every second." },
    { "text": "About 9.8 m/s", "correct": false, "feedback": "That would be a constant speed. In free fall the speed keeps growing." },
    { "text": "About 39 m/s", "correct": false, "feedback": "The distance grows with the square of time, the speed only linearly." }
  ],
  "explanation": "v = g t: twice the time, twice the speed; the distance (½ g t²) is four times as large."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "distances-per-step",
  "level": "highschool",
  "purpose": "transfer",
  "instruction": "A ball falls from rest. Order the distances it covers in the 1st, 2nd, 3rd and 4th second, from smallest to largest (g ≈ 10 m/s²).",
  "items": ["5 m (1st second)", "15 m (2nd second)", "25 m (3rd second)", "35 m (4th second)"],
  "explanation": "The distances per second grow like the odd numbers 1 : 3 : 5 : 7, so the total after n seconds is 5 · n² m."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "two-masses",
  "level": "college",
  "purpose": "transfer",
  "question": "Why is it not a mathematical necessity, but an experimental fact, that all bodies fall with the same acceleration?",
  "rubric": ["Distinguishes gravitational mass (in F = m g) from inertial mass (in F = m a)", "Equal acceleration requires their ratio to be the same for all bodies", "This ratio is measured (torsion balances, MICROSCOPE), not derived", "Links to the equivalence principle"],
  "sample_answer": "The force of gravity is proportional to a body's gravitational mass, its resistance to acceleration to its inertial mass. a = g only if the two are proportional with the same constant for every material. Nothing in Newton's laws demands that; it is measured, today to about one part in 10^15, and Einstein made it the starting point of general relativity.",
  "explanation": "The equivalence of the two masses is the experimental heart of free fall."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "galileo-argument",
  "level": "expert",
  "purpose": "transfer",
  "question": "Reconstruct Galileo's thought experiment against 'heavier falls faster' and explain what exactly it refutes.",
  "rubric": ["Tie a heavy and a light body together", "Aristotle predicts both slower (light one drags) and faster (combined is heavier)", "Contradiction refutes speed depending on weight alone", "It does not by itself rule out dependence on material; that needs experiment"],
  "sample_answer": "If speed grew with weight, a light stone tied to a heavy one would hold it back, so the pair falls slower than the heavy stone alone; but the pair is heavier, so it should fall faster. Both cannot hold, so fall speed cannot depend on weight alone. The argument assumes speed is a function of weight only; whether bodies of different composition fall alike is an empirical question, answered by experiments up to MICROSCOPE.",
  "explanation": "A logical argument rules out weight dependence; the material independence is experimental."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [The Apollo 15 hammer-feather drop](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html): the experiment on the Moon, with a short film (all levels).
- [The Feynman Lectures on Physics, Vol. I, ch. 9](https://www.feynmanlectures.caltech.edu/I_09.html): Newton's laws and how motion is computed step by step (college).
- [Galileo, Dialogues Concerning Two New Sciences](https://oll.libertyfund.org/titles/galilei-dialogues-concerning-two-new-sciences): the original argument, Third Day, "naturally accelerated motion" (expert).

# Sources

Grounding: [^galileo-two-new-sciences], [^feynman-i-9], [^apollo-15-feather].

[^galileo-two-new-sciences]: Galileo Galilei, Dialogues Concerning Two New Sciences, 1638.
[^feynman-i-9]: R. P. Feynman, R. B. Leighton, M. Sands, The Feynman Lectures on Physics, Vol. I, ch. 9.
[^apollo-15-feather]: NASA Space Science Data Coordinated Archive, The Apollo 15 Hammer-Feather Drop.
