---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/ux-for-ai
title: Designing the user experience of AI features
description: Good AI features start from a user need, set honest expectations, help users trust the output as much as it deserves (no more, no less) through transparency and sources, and leave users in control with ways to correct, undo and give feedback.
lang: en
levels: [highschool, college]
objectives:
  - id: user-needs
    text: Start an AI feature from a real user need, check it is usable, reliable, accessible and pleasant, and set honest expectations of what it can and cannot do.
  - id: trust-calibration
    text: Explain calibrated trust (neither over- nor under-trust) and use transparency and explanations (AI disclosure, sources, uncertainty, how a result was made) to calibrate it.
  - id: control-feedback
    text: Give users control (edit, regenerate, undo, opt out, reach a human) and design feedback that improves the system.
tags: [generative-ai, ux-design, trust, explainability, human-computer-interaction]
about:
  - wikidata: Q11248500
    label: user experience design
  - wikidata: Q40890078
    label: explainable AI
requires:
  - ptf:el/genai-apps/chat-apps
  - ptf:el/genai-apps/responsible-genai
leads_to:
  - ptf:el/genai-apps/genai-lifecycle
duration_min: { highschool: 20, college: 25 }
sources:
  - id: ms-genai-12
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/12-designing-ux-for-ai-applications
    title: "Microsoft, Generative AI for Beginners, lesson 12: Designing UX for AI applications (MIT License)"
generated: { by: claude/opus, at: 2026-11-06T00:55:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Think of two calculators. One is always right. The other is right 90 % of the time but looks exactly the same. How should the second one look different?
- An AI feature is only as good as the way people use it: if they trust it blindly they get hurt by its mistakes, if they distrust it they ignore its help.
- Afterwards the learner can design an AI feature from a user need, help users trust it the right amount and keep them in control.

# Core

An AI feature should begin with a user need, not with the technology:
which task becomes easier, and is AI the right tool for it at all? Because
generative AI is sometimes wrong in ways users cannot easily see, the
central design goal is calibrated trust: users should rely on the output
about as much as it deserves. Transparency builds that: say clearly that
content is AI-generated, set expectations about what it can and cannot
do, show sources and how a result came about, and signal uncertainty.
Control keeps users safe and in charge: let them edit, regenerate, undo
and decline AI suggestions, keep important decisions with people, and
offer a way to reach a human. Easy feedback (rating, correcting,
reporting) shows where the system fails and feeds its improvement, and
the whole feature must be usable and accessible for everyone.

# Key facts

- Start from the need: the job users want done, the cost of a mistake, and whether a non-AI solution is better. A feature where errors are costly and hard to spot needs more checks or is a bad fit.
- Four qualities of any product, also AI ones: usability (it does the job efficiently), reliability (consistent behaviour, graceful failure), accessibility (screen readers, keyboard, plain language, captions, multiple languages), pleasantness.
- Calibrated trust: over-trust (automation bias) lets errors through; under-trust wastes the benefit. Aim for reliance that matches accuracy.
- Transparency: disclose AI use; explain at the start what it can and cannot do; label generated content; show sources for factual claims; show confidence or "I am not sure" where the system can estimate it; explain in plain words how a result was made (for example "based on your last 5 essays").
- Onboarding examples ("Try: summarise this article for a 10-year-old") show users what works.
- Control: AI proposes, user disposes; editable drafts; regenerate; undo; turn the feature off; human handover for complex or sensitive cases; confirmation before actions.
- Feedback: thumbs up/down with an optional reason, inline corrections, reporting of harmful output; act on it (evaluation set, prompt changes) and tell users that it matters.
- Failure design: clear messages when the AI cannot help, no fake confidence, fallbacks (search, FAQ, a person).
- Metrics: task success, acceptance or edit rate of suggestions, time saved, feedback rates, reports; a high acceptance rate with little editing can also mean over-trust, so sample and check accepted outputs.

# Level: highschool

<!-- ptf:text v1 -->

Picture two calculators that look the same. One is always right, the
other one is right only 90 % of the time. If they look identical, people
will trust the second one as much as the first and get burned. AI apps
are like the second calculator. Good design makes that visible without
making the app useless.

Start with the user: what do they actually need help with, and how bad is
a mistake? Help writing a birthday card: small risk. Help with medication
doses: big risk, so a lot more checking, or no AI at all.

Then help users trust the AI the right amount. Say clearly that it is an
AI. Tell them at the start what it is good at and what not. Show where an
answer comes from (links to sources), and let the AI say "I'm not sure"
instead of always sounding confident.

Keep users in control. The AI suggests, the person decides: they can edit
the text, ask for a new version, undo, or switch the feature off, and
there is a way to reach a real person. Before anything important happens,
like sending or buying, the user confirms.

Finally, make feedback easy: a thumbs up or down, a way to correct or
report an answer. The makers use it to find and fix problems. And make
sure everyone can use it, including people who use screen readers or read
in another language.

# Level: college

<!-- ptf:text v1 -->

Design for the task and the error profile. Map the user's job, the
frequency and severity of model errors, and how easily users can detect
them; high-severity, low-detectability cases call for verification steps,
human decision or a non-generative design. Classic UX qualities still
apply (usability, reliability, accessibility, pleasantness), plus AI-
specific ones.

The goal is calibrated reliance. Over-reliance (automation bias) is the
dominant failure of fluent generative output; under-reliance wastes value.
Levers for calibration: disclosure and labelling of AI content; scoped
onboarding that states capabilities and limits with working examples;
provenance (citations users can open, highlighting of the supporting
passage); uncertainty communication where it is meaningful (abstaining,
"low confidence" when retrieval found nothing, never invented percentages);
and process explanations ("drafted from the meeting transcript, not
checked against the CRM"). Explanations should help users decide whether
to rely on an output, not merely justify it.

Control and feedback close the loop: suggestions rather than silent
actions, editable outputs, regenerate and undo, opt-out, confirmation for
side effects, escalation to a person. Instrument explicit feedback
(ratings with reasons, corrections, reports) and implicit signals (edit
distance, acceptance, abandonment), route failures into evaluation sets,
and audit accepted outputs too, because high acceptance can signal
over-trust rather than quality. Make it accessible: semantic markup for
streamed content, keyboard operation, plain language, and parity across
supported languages.

# Misconceptions

- **ai-first**: Start with the AI model and look for a use → start with a user need and check whether AI is the right tool.
- **more-trust-better**: The goal is to make users trust the AI as much as possible → the goal is calibrated trust that matches how often it is right.
- **confidence-sells**: The AI should always sound confident so users like it → false confidence leads to over-trust and harm; honest uncertainty helps users decide.
- **explanation-is-proof**: Any explanation of an AI result makes it trustworthy → explanations should help users check the result; a convincing story can also mislead.
- **high-acceptance-good**: If users accept most suggestions, the feature works → it can also mean users stopped checking; sample accepted outputs.
- **feedback-button-enough**: A thumbs-down button is enough feedback design → feedback must be easy, specific and acted on, and users should see that it matters.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "two-calculators",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "more-trust-better",
  "question": "Guess: a calculator app is right only 90 % of the time but looks exactly like a normal one. What is the main danger?",
  "options": [
    { "text": "People trust it as much as a normal calculator and do not notice its mistakes", "correct": true, "feedback": "Right: the design hides that it needs checking." },
    { "text": "People will not use it because it looks boring", "correct": false, "feedback": "Looks are not the problem; hidden unreliability is." },
    { "text": "There is no danger, 90 % is a lot", "correct": false, "feedback": "One in ten results wrong, unnoticed, is a lot of damage." }
  ],
  "explanation": "Design should help users trust a system as much as it deserves: calibrated trust."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "need-first",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["user-needs"],
  "misconception": "ai-first",
  "question": "A pharmacy wants to add AI. Which plan starts in the right place?",
  "options": [
    { "text": "Ask customers what they struggle with, then check for each idea how bad a mistake would be before choosing AI", "correct": true, "feedback": "Yes: need first, then risk, then technology." },
    { "text": "Add a chatbot that answers dosage questions, because chatbots are popular", "correct": false, "feedback": "Technology first, and dosage errors are dangerous." },
    { "text": "Use AI everywhere, it can always be fixed later", "correct": false, "feedback": "Some mistakes cannot be fixed later." }
  ],
  "explanation": "Start from the user's need and the cost of errors."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "calibrate",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["trust-calibration"],
  "misconception": "confidence-sells",
  "question": "Which two design choices help users trust a study helper the right amount?",
  "options": [
    { "text": "Each answer shows links to the class notes it is based on", "correct": true, "feedback": "Yes: users can check where it comes from." },
    { "text": "When it finds nothing in the notes, it says \"I'm not sure, this is not in your notes\"", "correct": true, "feedback": "Yes: honest uncertainty instead of a confident guess." },
    { "text": "It always sounds 100 % sure, so students feel safe", "correct": false, "feedback": "False confidence leads to over-trust." },
    { "text": "It hides that it is an AI", "correct": false, "feedback": "Users need to know what they are dealing with." }
  ],
  "explanation": "Disclosure, sources and honest uncertainty calibrate trust."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "in-control",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["control-feedback"],
  "question": "An AI writes reply suggestions in a messaging app. Which design keeps the user in control?",
  "options": [
    { "text": "The suggestion appears as an editable draft; the user can change it, ask for another one, or ignore it, and nothing is sent without pressing send", "correct": true, "feedback": "Yes: the AI proposes, the person decides." },
    { "text": "The AI sends the reply automatically after 10 seconds", "correct": false, "feedback": "Actions without confirmation take control away." },
    { "text": "The suggestion cannot be edited, only accepted or rejected as a whole", "correct": false, "feedback": "Editing is part of control." }
  ],
  "explanation": "Editable suggestions, regenerate, ignore, and confirmation before actions."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "acceptance-rate",
  "level": "college",
  "purpose": "check",
  "objectives": ["control-feedback"],
  "misconception": "high-acceptance-good",
  "question": "In a week, an email assistant shows 1,000 suggestions; 340 are accepted unchanged, 410 accepted after editing, 250 rejected. What share of suggestions is accepted unchanged, in percent?",
  "answer": 34,
  "tolerance": 0,
  "unit": "%",
  "explanation": "340 / 1,000 = 34 %; with edits, 75 % are used. Whether 34 % unchanged is good depends on whether those were correct: sample them to detect over-trust."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "useful-explanation",
  "level": "college",
  "purpose": "check",
  "objectives": ["trust-calibration"],
  "misconception": "explanation-is-proof",
  "question": "An AI drafts a summary of a contract for a non-lawyer. Which explanation helps the user most to decide how far to rely on it?",
  "options": [
    { "text": "Each point links to the clause it summarises, and a note says which parts (annexes, referenced laws) were not read", "correct": true, "feedback": "Yes: provenance plus stated limits support checking." },
    { "text": "A paragraph on how large language models work in general", "correct": false, "feedback": "True but useless for judging this summary." },
    { "text": "\"This summary is 97 % accurate.\"", "correct": false, "feedback": "An invented-looking number without basis misleads." },
    { "text": "A long, persuasive justification of each point written by the model", "correct": false, "feedback": "Persuasive text can increase over-trust without making checking easier." }
  ],
  "explanation": "Good explanations help users verify: sources, scope and limits."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "feedback-loop",
  "level": "college",
  "purpose": "check",
  "objectives": ["control-feedback", "user-needs"],
  "misconception": "feedback-button-enough",
  "question": "Design the feedback loop for an AI that drafts answers to customer emails for support agents.",
  "rubric": [
    "Explicit feedback with reasons (wrong fact, wrong tone, missing info) and implicit signals (edit distance, rejection, time to send).",
    "Routes failures into an evaluation set or review and uses them to change prompts, retrieval or model, then re-measures.",
    "Closes the loop with users (agents see that fixes happen) and audits accepted drafts to catch over-trust."
  ],
  "sample_answer": "Agents can rate a draft with a reason (wrong fact, tone, missing info) in one click; the system also logs how much they edit, whether they reject it and how long sending takes. Weekly, drafts with low ratings or heavy edits go into a review queue; confirmed failures become evaluation cases, and prompt or retrieval changes are tested against them. A changelog shows agents which reported problems were fixed. Ten accepted, unedited drafts a week are checked by a team lead to catch over-trust.",
  "explanation": "Feedback must be easy, specific, acted on and visible, and acceptance must be audited."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "medical-triage",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["user-needs", "trust-calibration", "control-feedback"],
  "misconception": "ai-first",
  "question": "A clinic considers an AI chat that tells patients whether to go to the emergency room. Which response reflects good AI UX practice?",
  "options": [
    { "text": "Treat it as high-stakes with hard-to-detect errors: keep the decision with clinicians or validated rules, use AI at most to help patients describe symptoms, with clear disclosure and an always-visible emergency number", "correct": true, "feedback": "Yes: severity and detectability of errors shape the design, sometimes towards less AI." },
    { "text": "Launch it with a disclaimer; users are responsible for their decisions", "correct": false, "feedback": "A disclaimer does not make a dangerous design safe." },
    { "text": "Make it sound very confident so patients follow its advice", "correct": false, "feedback": "Confidence without reliability causes harm." },
    { "text": "Hide that it is an AI to avoid scaring patients", "correct": false, "feedback": "Disclosure is basic transparency." }
  ],
  "explanation": "The cost and detectability of errors decide how much autonomy an AI feature may have."
}
```

# Examples

- **Sat-nav**: a good one shows the route, lets you choose alternatives, reroutes when you ignore it, and you still look at the road. Where it breaks down: sat-nav errors are visible (a closed road); a fluent AI error often is not.
- **Citations as a trust tool**: a study helper that underlines the sentence in the notes it used lets students check an answer in seconds.
- **Graceful failure**: "I couldn't find this in the course materials. Here are the three closest sections, or ask your teacher." beats a confident made-up answer.

# Tutor notes

- If the learner uses AI tools daily, ask them which features make them trust or distrust an answer; build from their examples.
- Keep the focus on calibrated trust; the other points (control, feedback, accessibility) follow from it.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 12 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/12-designing-ux-for-ai-applications): UX for AI applications with design examples; college.

# Sources

Grounding: [^ms-genai-12]. Text, examples and questions are original.

[^ms-genai-12]: Microsoft, Generative AI for Beginners, lesson 12, MIT License. Used for scope and order only.
