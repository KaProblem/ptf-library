---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/responsible-genai
title: Using generative AI responsibly
description: The harms a generative AI application can cause (false or ungrounded output, harmful content, unfairness, privacy breaches, overreliance), the principles of responsible AI, and how to measure and reduce harms in layers before and after launch.
lang: en
levels: [highschool, college]
objectives:
  - id: harms
    text: Name the main harms of generative AI applications (false or ungrounded output, harmful content, unfair or biased output, privacy breaches, overreliance) with an example of each.
  - id: principles
    text: Apply the principles of responsible AI (fairness, reliability and safety, privacy and security, inclusiveness, transparency, accountability) to a concrete product.
  - id: mitigation-layers
    text: Describe the cycle of measuring, mitigating and operating, and plan mitigations on several layers (model, safety system, system message and grounding, user experience).
tags: [generative-ai, responsible-ai, ai-ethics, bias, safety]
about:
  - wikidata: Q105606338
    label: responsible AI
  - wikidata: Q45253460
    label: algorithmic bias
requires:
  - ptf:el/genai-apps/genai-and-llms
leads_to:
  - ptf:el/genai-apps/securing-genai-apps
  - ptf:el/genai-apps/ux-for-ai
duration_min: { highschool: 25, college: 30 }
sources:
  - id: ms-genai-03
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/03-using-generative-ai-responsibly
    title: "Microsoft, Generative AI for Beginners, lesson 3: Using generative AI responsibly (MIT License)"
generated: { by: claude/opus, at: 2026-11-06T00:35:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Imagine an AI homework helper that is right 97 % of the time and used by 10,000 students a day. How many wrong answers is that a day? 300, delivered in a confident tone.
- Every generative AI product will sometimes say something false, unfair or harmful. Responsible AI is the practice of finding out how often, for whom and how badly, and reducing it before and after launch.
- Afterwards the learner can name the typical harms, apply the principles to a product and plan how to measure and reduce harms.

# Core

Generative AI applications can harm people in predictable ways: they
state false or unsupported things (hallucinations), produce harmful
content (hate, violence, self-harm, dangerous instructions), treat groups
of people unfairly by repeating biases from their training data, leak
private data, and invite people to rely on them more than their accuracy
deserves. Responsible AI turns principles (fairness, reliability and
safety, privacy and security, inclusiveness, transparency, accountability)
into a practice: identify the harms that matter for this product, measure
how often they occur with test prompts, reduce them on several layers
(choice of model, safety filters, system message and grounding, and the
user experience), and keep monitoring after launch. No single layer is
enough, and small error rates become many harmed people at scale.

# Key facts

- Harms: ungrounded or false output; harmful content (hate, harassment, violence, sexual content, self-harm, dangerous instructions); unfairness (stereotypes, unequal quality across languages, dialects or groups); privacy (personal data in outputs, in prompts, or memorised from training); overreliance (users trusting output they should check); misuse (deception, spam).
- Principles (as commonly used in industry frameworks): fairness, reliability and safety, privacy and security, inclusiveness, transparency, accountability.
- Scale: an error rate of 3 % at 10,000 uses a day is 300 bad outputs a day.
- Cycle: (1) identify harms for this use case and its users, (2) measure them with a test set of normal and adversarial prompts (red teaming), (3) mitigate, (4) operate: monitor, respond to incidents, re-measure after every change.
- Mitigation layers: model (choose a model with suitable safety training), safety system (input and output filters, abuse detection), system message and grounding (scope, rules, retrieval with citations), user experience (disclose AI, show sources, limit inputs and outputs to the use case, make reporting easy, keep humans in decisions that matter).
- Harm rate = harmful outputs / test prompts. Example: 12 of 400 red-team prompts give harmful output: 3 %; after mitigation 2 of 400: 0.5 %.
- Fairness checks compare quality across groups: the same prompts with only a name, gender or language changed should give equally good results.
- Accountability: a named person or team owns the system, decisions about launch, and the response to incidents.
- High-stakes decisions about people (grades, hiring, credit, medical) need a human decision-maker and, in many places, are regulated (for example by the EU AI Act).

# Level: highschool

<!-- ptf:text v1 -->

Picture a homework helper app used by 10,000 students a day. Even if it
is right 97 % of the time, that is 300 wrong answers every day, said in a
confident voice. Being responsible with AI means taking that seriously.

What can go wrong? It can say false things. It can say harmful things,
like insults or dangerous tips. It can be unfair: for example, describe
nurses always as women and engineers as men, or work worse in some
languages, because it learned from biased texts. It can reveal private
information. And people may trust it too much and stop checking.

Companies that build AI responsibly follow a few principles: be fair to
everyone, be reliable and safe, protect privacy, work for all kinds of
users, be honest that it is an AI and how it works, and have real people
who are responsible when something goes wrong.

In practice they work in a cycle. First, think about what could go wrong
for these users. Second, test it: try hundreds of normal and nasty
questions and count the bad answers. Third, fix it in several layers: pick
a suitable model, add filters that block harmful content, write clear
rules in the system message, give it real sources to answer from, and
design the app so users see that it is an AI and can report problems.
Fourth, keep watching after launch, because new problems show up.

# Level: college

<!-- ptf:text v1 -->

Harms of generative systems are probabilistic and scale with usage. A
taxonomy useful for products: (1) quality harms, ungrounded or
fabricated output; (2) content harms, toxic, violent, sexual, self-harm or
dangerous-capability content; (3) allocative and representational harms,
unequal quality of service and stereotyping across demographic, language
or dialect groups; (4) privacy harms, leakage of personal data from
prompts, retrieval sources or training data; (5) interaction harms,
overreliance, manipulation and misuse.

Principles (fairness, reliability and safety, privacy and security,
inclusiveness, transparency, accountability) become operational through a
measure–mitigate–operate cycle. Identify harms per use case and
stakeholder; build evaluation sets with benign, edge and adversarial
inputs (red teaming), including counterfactual pairs that vary only a
protected attribute; measure harm rates (for example 12/400 = 3 %) and
group gaps; mitigate in defence-in-depth layers: model selection and
safety-tuned variants, classifiers on inputs and outputs, system messages
with scope and refusal behaviour, grounding with citations, and UX that
discloses AI use, shows sources, constrains inputs and outputs, and
supports reporting and human review. Re-measure after each change and in
production (sampling, incident response), with a named owner accountable
for launch decisions.

Regulation increasingly codifies this: the EU AI Act sets transparency
obligations for generative AI and strict requirements for high-risk uses
such as education, employment and credit, where decisions about people
must stay under meaningful human oversight.

# Misconceptions

- **filter-solves-all**: A content filter makes an AI app safe → filters catch some harmful content; false output, unfairness, privacy and overreliance need other layers.
- **rare-is-fine**: An error rate of 1 % is negligible → at scale it means many harmed people a day; what matters is how many and how badly.
- **model-is-neutral**: The model is neutral because it is a machine → it reflects patterns, including biases, of its training data.
- **test-once**: Testing once before launch is enough → models, prompts, users and attacks change; measure again after every change and monitor in production.
- **disclaimer-enough**: A disclaimer "AI may make mistakes" makes the product responsible → transparency helps, but harms still need to be measured and reduced, and someone must be accountable.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "errors-per-day",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "rare-is-fine",
  "question": "A homework helper is right 97 % of the time and gets 10,000 questions a day. Guess: how many wrong answers is that per day?",
  "answer": 300,
  "tolerance": 30,
  "unit": "answers",
  "explanation": "3 % of 10,000 = 300 wrong answers a day. Small rates become many people at scale."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "name-the-harm",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["harms"],
  "misconception": "model-is-neutral",
  "question": "An AI writes job ads and always describes the nurse as \"she\" and the engineer as \"he\". Which harm is this?",
  "options": [
    { "text": "Unfairness: it repeats a stereotype from its training texts", "correct": true, "feedback": "Yes: the model reflects biases in the data it learned from." },
    { "text": "A privacy problem", "correct": false, "feedback": "No personal data is involved." },
    { "text": "A hallucination", "correct": false, "feedback": "It does not state a false fact; it reinforces a stereotype." },
    { "text": "No harm, the model is neutral", "correct": false, "feedback": "Models are not neutral; they learn patterns, including biased ones." }
  ],
  "explanation": "Harms include false output, harmful content, unfairness, privacy breaches and overreliance."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-principle",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["principles"],
  "question": "A school AI helper tells every student at the start: \"I am an AI. I can make mistakes. Check important answers with your teacher.\" Which principle does this follow most directly?",
  "options": [
    { "text": "Transparency", "correct": true, "feedback": "Yes: users know what they are dealing with and its limits." },
    { "text": "Fairness", "correct": false, "feedback": "Fairness is about treating groups equally well." },
    { "text": "Privacy", "correct": false, "feedback": "Privacy is about protecting personal data." }
  ],
  "explanation": "Transparency: say that it is an AI, what it can do and where its limits are."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "responsible-cycle",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["mitigation-layers"],
  "misconception": "test-once",
  "instruction": "Order the steps of building an AI app responsibly.",
  "items": [
    "Think about what could go wrong for these users",
    "Test with many normal and nasty questions and count bad answers",
    "Fix problems with filters, rules, sources and app design",
    "Keep watching after launch and test again after changes"
  ],
  "explanation": "Identify, measure, mitigate, operate; and the cycle repeats."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "layers",
  "level": "college",
  "purpose": "check",
  "objectives": ["mitigation-layers"],
  "misconception": "filter-solves-all",
  "question": "Match mitigation and layer. Which two pairs are correct?",
  "options": [
    { "text": "Classifiers that block hateful inputs and outputs: safety system", "correct": true, "feedback": "Yes: filters sit around the model." },
    { "text": "Showing sources next to every answer and a report button: user experience", "correct": true, "feedback": "Yes: UX helps users calibrate trust and report harms." },
    { "text": "Retrieval with citations: model layer", "correct": false, "feedback": "Grounding belongs to the system message and grounding layer, not to the model's weights." },
    { "text": "A content filter fixes hallucinations: safety system", "correct": false, "feedback": "Filters catch harmful content, not false facts." }
  ],
  "explanation": "Model, safety system, system message and grounding, user experience: each catches different failures."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "harm-rate",
  "level": "college",
  "purpose": "check",
  "objectives": ["mitigation-layers", "harms"],
  "text": "In red teaming, 12 of 400 prompts produced harmful output, a harm rate of {{1}} %. After new mitigations, 2 of the same 400 prompts did, {{2}} %.",
  "gaps": [
    { "answer": "3", "accepted": ["3.0"] },
    { "answer": "0.5", "accepted": ["0,5"] }
  ],
  "explanation": "12 / 400 = 0.03 and 2 / 400 = 0.005. Re-run the same set after every change, and add new attack prompts so the test does not go stale."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "fairness-test",
  "level": "college",
  "purpose": "check",
  "objectives": ["principles", "harms"],
  "misconception": "model-is-neutral",
  "question": "A company uses a model to write first drafts of performance reviews from managers' notes. How would you test it for unfairness, and what would you require before launch?",
  "rubric": [
    "Counterfactual tests: identical notes with only name, gender, age or origin changed; compare tone, adjectives, length and ratings.",
    "Measures differences across groups quantitatively on a sizeable set and sets an acceptable threshold.",
    "Requires human decision and accountability (managers own the final review), transparency to employees, and monitoring after launch."
  ],
  "sample_answer": "Create 200 pairs of manager notes that are identical except for the employee's name and pronouns, generate drafts, and compare length, sentiment, competence vs. warmth adjectives and any suggested rating. Launch only if the differences stay within a set threshold, managers remain the authors who edit and sign each review, employees are told AI drafts are used, and a named owner re-runs the test after every model or prompt change.",
  "explanation": "Fairness is measured with counterfactual pairs; decisions about people stay with accountable humans."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "grading-tool",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["principles", "mitigation-layers"],
  "misconception": "disclaimer-enough",
  "question": "A school wants an AI to grade essays automatically and send the grades to students. Which design is responsible?",
  "options": [
    { "text": "The AI proposes a grade with reasons tied to the rubric; the teacher reviews and decides; students know AI assisted and can appeal", "correct": true, "feedback": "Yes: human decision, transparency, contestability and a check for bias across groups." },
    { "text": "Send AI grades directly with a note \"AI may make mistakes\"", "correct": false, "feedback": "A disclaimer does not replace human oversight for a high-stakes decision about people." },
    { "text": "Use the AI grade only for weak students", "correct": false, "feedback": "That treats groups differently without justification." },
    { "text": "Keep AI use secret so students do not worry", "correct": false, "feedback": "Transparency is a core principle, and hiding it removes the chance to contest errors." }
  ],
  "explanation": "High-stakes decisions about people need meaningful human oversight, transparency and accountability."
}
```

# Examples

- **Seat belt, airbag, crumple zone**: car safety comes from several layers, each catching what the others miss. Where it breaks down: AI harms are often subtle (a biased word choice), not a crash anyone notices.
- **Counterfactual pair**: "Write a recommendation for Anna, a software developer" vs. "… for Ahmed, a software developer": if one gets "reliable and caring" and the other "brilliant and driven", the system treats them differently.
- **Overreliance**: a student copies an AI explanation of a chemistry experiment with a wrong safety step; the app showed no source and no hint to check with a teacher.

# Tutor notes

- Keep it concrete: one product (a homework helper) through all four steps of the cycle works better than abstract principles.
- Security attacks (prompt injection, data theft) are the next element; here focus on harms that occur in normal use.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 3 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/03-using-generative-ai-responsibly): responsible AI principles and mitigation layers; college.

# Sources

Grounding: [^ms-genai-03]. Text, examples and questions are original.

[^ms-genai-03]: Microsoft, Generative AI for Beginners, lesson 3, MIT License. Used for scope and order only.
