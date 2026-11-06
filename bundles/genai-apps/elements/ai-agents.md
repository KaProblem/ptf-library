---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/ai-agents
title: AI agents
description: "An agent is a language model in a loop: it decides the next step towards a goal, calls tools, observes the results and repeats until done; powerful for open-ended tasks, but errors compound, so agents need limits, checks and human approval."
lang: en
levels: [highschool, college]
objectives:
  - id: agent-loop
    text: Explain what makes an AI agent (a goal, a model that decides, tools, state, a loop) and how it differs from a single model call and from a fixed workflow.
  - id: reliability
    text: Compute how small error rates compound over many steps, and explain why agents need step limits, checks and human approval for risky actions.
  - id: when-agent
    text: Decide whether a task needs an agent, a fixed workflow or a single prompt, and name the parts of an agent design (planning, memory, tools, guardrails, evaluation).
tags: [generative-ai, ai-agents, tool-use, autonomy, reliability]
about:
  - wikidata: Q132451509
    label: AI agent
  - wikidata: Q1142726
    label: intelligent agent
requires:
  - ptf:el/genai-apps/function-calling
leads_to:
  - ptf:el/genai-apps/securing-genai-apps
duration_min: { highschool: 25, college: 35 }
figures:
  - id: agent-loop
    objectives: [agent-loop, reliability]
    use_when: when the learner first meets agents, before talking about frameworks or risks
sources:
  - id: ms-genai-17
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/17-ai-agents
    title: "Microsoft, Generative AI for Beginners, lesson 17: AI agents (MIT License)"
generated: { by: claude/opus, at: 2026-11-06T00:15:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess: a helper gets each single step right 95 % of the time. How likely is it to get a 10-step task completely right? Not 95 %: about 60 %.
- Agents (models that plan, use tools and act in a loop) can do whole tasks like "research this and write a summary with sources" or "fix this failing test". That power and that risk come from the same loop.
- Afterwards the learner can explain how an agent works, estimate how reliable a multi-step run is, and decide when an agent is the right tool.

# Core

An AI agent is a language model given a goal, a set of tools and a state
(what has happened so far), running in a loop: it decides the next step,
calls a tool, observes the result, adds it to the state and decides again,
until it judges the goal reached or a limit stops it. Unlike a single call
or a fixed workflow whose steps a developer wrote down, the agent chooses
its own steps, which lets it handle open-ended tasks but makes its
behaviour less predictable. Small error rates per step multiply over many
steps, and every action happens with real tools, so agents need step and
cost limits, checks of intermediate results, least-privilege tools, and a
person's approval before risky actions. Use an agent only when the steps
cannot be known in advance; when they can, a fixed workflow is cheaper,
faster and easier to test.

# Key facts

- Parts of an agent: goal (from the user), model (decides), tools (search, code, APIs, files), state or memory (messages, notes, results so far), loop control (stop when done, step limit, budget), guardrails (permissions, approvals, checks).
- Single call: one prompt, one answer. Workflow: fixed sequence of prompts and tools, chosen by the developer. Agent: the model chooses the sequence at run time.
- Compounding: if each step succeeds independently with probability p, n steps all succeed with probability pⁿ. 0.95¹⁰ ≈ 0.60, 0.95²⁰ ≈ 0.36, 0.99²⁰ ≈ 0.82. With p = 0.95 the chance drops below 50 % from step 14 on.
- Checks that catch errors (running tests, validating outputs, re-reading sources) raise the effective per-step success; that is why coding agents that run tests work better than ones that do not.
- Cost: every loop step resends the growing state; 8 steps with 6,000 input and 300 output tokens each cost 8 × (0.012 + 0.0024) ≈ $0.12 at the example prices of this course ($2 and $8 per million tokens).
- Common patterns: plan first then execute; reflect on the result and retry; hand subtasks to specialised sub-agents (multi-agent); keep long-term notes outside the context.
- Frameworks (many exist and change fast) provide the loop, tool wiring, memory and tracing; the concepts above are the same in all of them.
- Human in the loop: approval before irreversible or external actions (payments, emails, deleting, publishing), and a visible log of what the agent did.
- Agents read untrusted content (web pages, emails, files) that can contain instructions; combined with tools this is the main security risk (see the element on securing apps).

# Level: highschool

<!-- ptf:text v1 -->

Think of planning a class trip. You do not know all the steps in
advance: look up train times, notice the train is full, check buses
instead, compare prices, write to the teacher. Each result decides the
next step. An AI agent works like that: you give it a goal, and it loops.
It thinks "what should I do next?", uses a tool (searches the web, runs a
small program, reads a file), looks at what came back, and decides again,
until it thinks it is done.

That is different from a chatbot answering one question, and also
different from an app that always does the same three steps in the same
order. The agent picks its own steps. That makes it flexible, and also
less predictable.

And small mistakes add up. If the agent gets each step right 95 % of the
time, a 10-step task is completely right only about 60 % of the time
(0.95 multiplied by itself 10 times). So good agents check their work
along the way (for example, run the program to see if it works), stop
after a set number of steps, and ask a person before doing anything that
cannot be undone, like sending a message, paying or deleting something.

If you already know the steps of a task, you do not need an agent. A fixed
list of steps is cheaper, faster and easier to test.

# Level: college

<!-- ptf:text v1 -->

An agent is a control loop around a model: given goal g and state s_t
(conversation, tool results, notes), the model produces either an action
(a tool call with arguments) or a final answer; the environment executes
the action and appends the observation to s_{t+1}. Variants add explicit
planning (plan, then execute and re-plan), reflection (critique and retry),
external memory (notes or a vector store beyond the context window), and
delegation to sub-agents with their own tools and contexts.

Contrast with workflows: in a workflow the developer fixes the control
flow (prompt chains, routing, parallel calls) and the model fills in
steps; in an agent the model chooses the control flow. Workflows are
cheaper, lower-latency and testable step by step; agents fit tasks whose
path depends on intermediate results (open-ended research, debugging,
multi-system operations). Start with the simplest design that works.

Reliability compounds: with independent per-step success p, an n-step
trajectory succeeds with pⁿ (0.95¹⁰ ≈ 0.60). Feedback from the
environment (tests, validators, type checkers, retrieval of ground truth)
lets the agent detect and repair errors, raising effective p. Bound runs
with step, time and cost budgets; every step resends the growing state.
Treat tool outputs and fetched content as untrusted (indirect prompt
injection), grant least-privilege tools, require human approval for
irreversible or external side effects, and log full traces. Evaluate
agents on end-to-end task success over a suite of realistic tasks,
alongside cost, latency and the rate of unsafe or unnecessary actions.

# Misconceptions

- **agent-is-chatbot**: An agent is a chatbot with a different name → an agent runs in a loop with tools and state and takes actions towards a goal, choosing its own steps.
- **steps-dont-add-up**: If each step is 95 % reliable, the whole task is 95 % reliable → the probabilities multiply: 10 steps give about 60 %.
- **more-autonomy-better**: The more autonomous an agent, the better → autonomy costs predictability, money and safety; use the least autonomy that solves the task.
- **agent-for-everything**: Every AI feature should be an agent → if the steps are known in advance, a fixed workflow is cheaper and easier to test.
- **agent-knows-when-done**: The agent always knows when it is finished → it can stop too early, loop forever or declare success wrongly; step limits and checks are needed.
- **frameworks-are-agents**: An agent framework makes an agent reliable → frameworks supply the loop and wiring; reliability comes from tools, checks, limits and evaluation.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "ten-steps",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "steps-dont-add-up",
  "question": "A helper does each step right 95 % of the time. Guess: how likely is it to get all 10 steps of a task right, in percent?",
  "answer": 60,
  "tolerance": 5,
  "unit": "%",
  "explanation": "0.95¹⁰ ≈ 0.60. Every step must succeed, so the chances multiply."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "what-makes-agent",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["agent-loop"],
  "misconception": "agent-is-chatbot",
  "question": "Which one is an AI agent?",
  "options": [
    { "text": "A helper that gets the goal \"plan our class trip\", searches train and bus times, compares prices, notices a full train and tries another, then drafts a plan", "correct": true, "feedback": "Yes: it loops, uses tools and decides each next step from the results." },
    { "text": "A chatbot that answers one question about trains", "correct": false, "feedback": "One question, one answer: no loop, no actions." },
    { "text": "An app that always translates a text and then summarises it", "correct": false, "feedback": "Two fixed steps chosen by the developer: a workflow, not an agent." }
  ],
  "explanation": "Agent = goal + model deciding the next step + tools + state, in a loop."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "agent-safety",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["reliability"],
  "misconception": "agent-knows-when-done",
  "question": "Which two rules make a shopping agent safer?",
  "options": [
    { "text": "It must ask you before it pays for anything", "correct": true, "feedback": "Yes: paying cannot easily be undone." },
    { "text": "It stops after a set number of steps or a spending limit", "correct": true, "feedback": "Yes: so it cannot loop forever or spend too much." },
    { "text": "It may do whatever it thinks is best, so it is faster", "correct": false, "feedback": "Speed is not worth unchecked payments." },
    { "text": "It decides by itself when it is done and never needs limits", "correct": false, "feedback": "Agents can loop or stop wrongly; limits catch that." }
  ],
  "explanation": "Approvals for risky actions and limits on steps and money."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "agent-or-not",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["when-agent"],
  "misconception": "agent-for-everything",
  "question": "Every evening an app should take the day's school news, shorten each item to two sentences and post the list to the class chat. What fits best?",
  "options": [
    { "text": "A fixed workflow: the same steps every evening, each with a prompt", "correct": true, "feedback": "Yes: the steps are known in advance, so a workflow is cheaper and easier to test." },
    { "text": "An agent that decides its own steps", "correct": false, "feedback": "Possible, but it adds cost and unpredictability without a benefit here." },
    { "text": "No AI at all is possible here", "correct": false, "feedback": "Shortening texts is a typical model task." }
  ],
  "explanation": "Use an agent only when the steps depend on intermediate results."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "compounding",
  "level": "college",
  "purpose": "check",
  "objectives": ["reliability"],
  "misconception": "steps-dont-add-up",
  "title": "Success probability of an agent run",
  "intro": "Each step succeeds independently with probability p; a run needs all n steps. Round to two decimals.",
  "columns": ["p", "n", "Success of the run"],
  "rows": [
    ["0.95", "10", "0.6"],
    ["0.95", "20", "0.36"],
    ["0.99", "20", "0.82"]
  ],
  "result": { "label": "Smallest n with 0.95ⁿ below 0.5", "value": "14" },
  "explanation": "pⁿ falls quickly: 0.95¹³ ≈ 0.513 and 0.95¹⁴ ≈ 0.488. Raising p from 0.95 to 0.99 with checks more than doubles the 20-step success rate."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "workflow-vs-agent",
  "level": "college",
  "purpose": "check",
  "objectives": ["agent-loop", "when-agent"],
  "misconception": "more-autonomy-better",
  "question": "Which two statements about workflows and agents are correct?",
  "options": [
    { "text": "In a workflow the developer fixes the control flow; in an agent the model chooses it at run time", "correct": true, "feedback": "Yes: that is the defining difference." },
    { "text": "Debugging a failing build, where each step depends on the last output, suits an agent with test-running tools", "correct": true, "feedback": "Yes: the path is unknown in advance, and tests give feedback." },
    { "text": "Agents are always more accurate than workflows because they can retry", "correct": false, "feedback": "Retrying helps only with feedback; agents also add new failure modes." },
    { "text": "Agents need no evaluation, because they check themselves", "correct": false, "feedback": "They need end-to-end evaluation on realistic tasks." }
  ],
  "explanation": "Choose the least autonomy that solves the task."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "agent-run-cost",
  "level": "college",
  "purpose": "check",
  "objectives": ["when-agent"],
  "question": "An agent run takes 8 steps, each with 6,000 input and 300 output tokens. At $2 per million input and $8 per million output tokens, what does one run cost, in dollars?",
  "answer": 0.1152,
  "tolerance": 0.005,
  "unit": "$",
  "explanation": "Per step 6,000 × 2/10⁶ + 300 × 8/10⁶ = 0.012 + 0.0024 = $0.0144; 8 steps ≈ $0.115. At 10,000 runs a day that is about $1,150."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "design-research-agent",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["when-agent", "reliability", "agent-loop"],
  "question": "Design a research agent that answers a question with a cited one-page report from the web. Name its tools, its state, its stop conditions and its guardrails.",
  "rubric": [
    "Tools: web search, page fetch or reader, possibly a notes or citation store; no unnecessary write or send tools.",
    "State and loop: keeps queries, sources read, extracted claims with source; decides next search from gaps.",
    "Stop conditions and guardrails: step, time and cost budget; treat page content as untrusted (ignore instructions in it); check that every claim in the report has a fetched source; log the trace."
  ],
  "sample_answer": "Tools: search(query), fetch(url) returning clean text, and save_note(claim, url). State: the question, a plan of sub-questions, notes with source URLs. Loop: pick the next open sub-question, search, read the two best pages, save claims, update the plan. Stop when every sub-question has two sources or after 20 steps or $0.50. Guardrails: page text is data, never instructions; the agent has no tools that send or post; a final check verifies each sentence of the report against a saved note and drops unsupported ones; the full trace is stored.",
  "explanation": "Minimal tools, explicit state, hard budgets and verification against sources."
}
```

# Examples

- **Class trip planner**: each search result decides the next step, as for a person planning a trip. Where it breaks down: a person notices when something feels off; an agent may confidently continue down a wrong path.
- **Coding agent**: goal "make the failing test pass"; it reads the error, edits a file, runs the tests, reads the new error, and loops. The test results are the feedback that keeps it on track.
- **Runaway loop**: an agent without a step limit keeps searching for a source that does not exist, spending money on every step.

# Tutor notes

- Start with the warm-up estimate; the compounding idea makes the safety rules feel necessary rather than arbitrary.
- Show the figure `agent-loop` before naming any framework; do not teach a specific framework, they change quickly.
- If the learner uses a coding assistant that runs commands, use it as the example: it is an agent.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 17 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/17-ai-agents): agent frameworks compared with code; college.

# Sources

Grounding: [^ms-genai-17]. Text, examples, figure and questions are original.

[^ms-genai-17]: Microsoft, Generative AI for Beginners, lesson 17, MIT License. Used for scope and order only.
