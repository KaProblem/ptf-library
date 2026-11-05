---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/prompt-techniques
title: Prompting techniques
description: Few-shot examples, step-by-step reasoning, splitting a task into a chain of prompts, structured output and self-checks, and when each one helps.
lang: en
levels: [highschool, college]
objectives:
  - id: few-shot
    text: Use zero-shot and few-shot prompts and explain how examples in the prompt steer labels and format without any training.
  - id: step-by-step
    text: Use step-by-step reasoning and split a multi-step task into a chain of prompts, and say when this helps.
  - id: structured-output
    text: Ask for structured output such as JSON, check it in code, and use a verification step, knowing that a model checking itself is not proof.
tags: [generative-ai, prompt-engineering, few-shot, chain-of-thought, structured-output]
about:
  - wikidata: Q117322965
    label: in-context learning
  - wikidata: Q110797734
    label: few-shot learning
  - wikidata: Q135305651
    label: chain-of-thought prompt
requires:
  - ptf:el/genai-apps/prompt-basics
leads_to:
  - ptf:el/genai-apps/sampling-parameters
  - ptf:el/genai-apps/function-calling
duration_min: { highschool: 25, college: 30 }
sources:
  - id: ms-genai-05
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/05-advanced-prompts
    title: "Microsoft, Generative AI for Beginners, lesson 5: Creating advanced prompts (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T23:10:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: "happy → positive, terrible → negative, boring → ?" You knew the answer and the format from two examples. Models do the same.
- A few standard techniques fix most prompt problems: show examples, let the model work step by step, split big jobs, demand a fixed format, and check the result.
- Afterwards the learner can pick the technique that fits a problem and knows where each one stops working.

# Core

Examples in the prompt steer a model without training it: with none
(zero-shot) it follows the instruction alone; with a few (few-shot) it
copies their labels, style and format, which is called in-context
learning. For problems with several steps, asking the model to work
through the steps before giving the answer, or splitting the job into a
chain of smaller prompts where each output feeds the next, makes errors
less likely and easier to find. When code has to use the answer, ask for
a fixed structure such as JSON with named fields and check it in code.
A second pass where the model reviews its own answer catches some
mistakes, but a model checking itself is not proof; facts and numbers
still need a source, a tool or a test.

# Key facts

- Zero-shot: instruction only. Few-shot: instruction plus a few input → output examples, typically 2 to 5. One-shot: one example.
- In-context learning: the model's weights do not change; the examples only exist in this prompt and are gone in the next request.
- Examples should be varied, correct, and in the exact output format wanted; models copy their quirks (length, wording, label set), including mistakes.
- Step-by-step (chain-of-thought) prompting: "Work through this step by step, then give the final answer on the last line." Helps on arithmetic, logic and multi-step questions; little effect on simple lookups. Reasoning models do this internally without being asked.
- The written-out steps are not guaranteed to be how the model really reached the answer; they can look convincing and still be wrong.
- Prompt chaining (decomposition): split a job into steps with one prompt each, for example extract facts → check facts → write summary. Each step is simpler, testable and replaceable.
- Structured output: describe the fields and give one example, or use the provider's JSON or schema mode. Always parse and validate in code (required fields, types, allowed values) and handle failures (retry, fallback).
- Self-check or critique: a second prompt asks "Does this answer follow the rules? List problems." It catches format slips and some reasoning errors; it does not reliably catch invented facts the model believes.
- Arithmetic and exact counting: better done by code or a tool than by the model (see the element on function calling).

# Level: highschool

<!-- ptf:text v1 -->

Look at this prompt: "great → positive; awful → negative; boring → ".
You knew "negative" and you knew to write just one word. That is a
few-shot prompt: a few examples of input and answer, then the new input.
The model copies the pattern. It does not learn anything permanently; the
next chat starts from zero. Without examples (zero-shot) the model only
has your instruction, which is often enough for simple jobs. Choose your
examples carefully, because it copies their mistakes too.

For a tricky problem like a word problem in maths, ask: "Work through it
step by step, then write the answer on the last line." Writing out the
steps gives the model room to get each one right. For a big job, such as
turning a long article into a quiz, split it: first "list the five most
important facts", then "write one question for each fact". Each small
step is easier and you can see where something went wrong.

If a program has to use the answer, ask for a fixed shape, such as
`{"question": "...", "answer": "..."}`, and let the program check that
it really got that shape.

Finally, you can ask the model to check its own answer against your
rules. That catches some slips, but not everything: a model can be wrong
and confidently approve its own mistake. Numbers and facts still need a
real check.

# Level: college

<!-- ptf:text v1 -->

Few-shot prompting conditions the model on demonstrations; it is
in-context learning, with no weight update, so the effect lasts for one
request. Demonstrations specify the label space, output format and style
more precisely than instructions, and models reproduce their biases
(label order, length, errors). Use 2 to 5 diverse, correct examples
covering edge cases; for production, consider storing examples and
retrieving the most similar ones per request.

Chain-of-thought prompting asks for intermediate reasoning before the
answer. It increases accuracy on multi-step arithmetic, logic and
planning, costs output tokens and latency, and has little benefit on
retrieval-style questions. Reasoning models internalise it. The visible
rationale is not a faithful trace of the computation and must not be
treated as an explanation that guarantees correctness. Prompt chaining
decomposes a task into a pipeline of prompts with explicit intermediate
artefacts (extracted facts, outlines, drafts), which makes each stage
testable, cacheable and individually improvable.

For machine consumption, specify a schema and use the provider's
structured-output or JSON mode where available; still parse and validate
(types, required fields, enums, value ranges) and define retries or
fallbacks. Self-critique or a separate verifier prompt can catch format
and rule violations and some reasoning errors, but errors the model is
confidently wrong about tend to survive; ground-truth checks (code,
retrieval, tests, humans) are needed where correctness matters.

# Misconceptions

- **few-shot-trains**: Few-shot examples teach the model permanently → they act only in this prompt; nothing is learned for the next request.
- **examples-only-content**: Examples only show the topic → the model also copies their format, length, wording and mistakes.
- **cot-always-helps**: "Think step by step" improves every task → it helps multi-step problems and costs tokens; on simple lookups it adds little.
- **steps-are-proof**: If the model shows its steps, the answer is right → the steps can look sound and still be wrong, and need not reflect how the answer was produced.
- **json-always-valid**: If I ask for JSON I always get valid JSON with the right fields → outputs can be malformed or miss fields; parse and validate in code.
- **self-check-is-proof**: Asking the model "are you sure?" makes the answer reliable → models often confirm their own errors; real checks need sources, tools or tests.

# Questions

```ptf-question
{
  "kind": "guess_next",
  "id": "pattern-guess",
  "level": "highschool",
  "purpose": "warmup",
  "intro": "Be the model. What comes after the arrow?",
  "prefix": "great → positive; awful → negative; boring →",
  "answer": "negative",
  "accepted": ["Negative"],
  "hint": "Look at what the examples do.",
  "explanation": "Two examples gave you the labels and the format. This is a few-shot prompt."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "few-shot-effect",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["few-shot"],
  "misconception": "few-shot-trains",
  "question": "You give a model three example emails with the labels you want, then a new email. Which two statements are true?",
  "options": [
    { "text": "The model will copy the labels and format of the examples", "correct": true, "feedback": "Yes: examples are the clearest way to show what you want." },
    { "text": "In a new chat tomorrow the model will not know the examples anymore", "correct": true, "feedback": "Yes: examples only act inside this prompt." },
    { "text": "The model has now been trained on your emails for good", "correct": false, "feedback": "Nothing in the model changes; the examples are just part of the input." },
    { "text": "If one example has a wrong label, the model ignores it", "correct": false, "feedback": "It may copy the mistake." }
  ],
  "explanation": "Few-shot prompting steers this one answer; it is not training."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "when-step-by-step",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["step-by-step"],
  "misconception": "cot-always-helps",
  "question": "For which task is \"work through it step by step\" most useful?",
  "options": [
    { "text": "A train leaves at 9.40 am, takes 2 h 35 min and waits 15 min halfway; when does it arrive?", "correct": true, "feedback": "Yes: several steps of arithmetic, each one easy to get wrong in one jump." },
    { "text": "What is the capital of Italy?", "correct": false, "feedback": "A single fact; steps add nothing." },
    { "text": "Translate \"good morning\" into French", "correct": false, "feedback": "A one-step task." }
  ],
  "explanation": "Step-by-step reasoning helps when a problem has several steps; it costs extra tokens otherwise."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "quiz-maker",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["structured-output"],
  "misconception": "self-check-is-proof",
  "question": "Your app makes quiz questions from a text and shows them on cards. Which two steps make it reliable?",
  "options": [
    { "text": "Ask for a fixed shape such as {\"question\": …, \"answer\": …} and let the program check every card has both", "correct": true, "feedback": "Yes: the program can only show cards that have the right shape." },
    { "text": "Check that each answer really is in the original text", "correct": true, "feedback": "Yes: that catches made-up answers." },
    { "text": "Ask the model \"Are your answers correct?\" and trust a \"yes\"", "correct": false, "feedback": "A model can confidently approve its own mistakes." },
    { "text": "Ask for \"some questions\" in any form", "correct": false, "feedback": "Free-form output breaks the program that shows the cards." }
  ],
  "explanation": "Fixed format checked by code, plus a check against the source."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "design-few-shot",
  "level": "college",
  "purpose": "check",
  "objectives": ["few-shot"],
  "misconception": "examples-only-content",
  "question": "You build a few-shot prompt that classifies support tickets as bug, billing or feature request. What makes the examples good, and what can go wrong?",
  "rubric": [
    "Examples are correct, diverse, cover all labels and edge cases, and use exactly the output format wanted.",
    "Notes that the model copies quirks: label imbalance or order, length, wording, and errors in the examples.",
    "Notes that the effect is per request (in-context), and suggests testing on held-out tickets."
  ],
  "sample_answer": "Use two to four short, correct examples per label, including a borderline case, each answered with just the label. If two of three examples are bugs or the bug example comes last, the model may over-predict bug; a wrong example label gets copied. The examples only act within the prompt, so test the prompt on tickets that are not among the examples.",
  "explanation": "Demonstrations define the label space and format and transmit their biases."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "prompt-chain",
  "level": "college",
  "purpose": "check",
  "objectives": ["step-by-step"],
  "instruction": "A pipeline turns a long lab report into a fact-checked one-paragraph abstract. Put its prompts in a sensible order.",
  "items": [
    "Extract the key claims and numbers as a list",
    "Check each claim against the report and mark unsupported ones",
    "Write the abstract from the supported claims only",
    "Check the abstract's length and format, and retry if it fails"
  ],
  "explanation": "Each stage produces an artefact the next one uses; the checks sit where errors would otherwise propagate."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "validate-json",
  "level": "college",
  "purpose": "check",
  "objectives": ["structured-output"],
  "misconception": "json-always-valid",
  "question": "Your service asks a model for JSON with the fields name (string), quantity (integer 1 to 99) and unit (\"kg\", \"g\" or \"pcs\"). What should the code do with each reply?",
  "options": [
    { "text": "Parse it, validate types, required fields and allowed values, and retry or fall back when validation fails", "correct": true, "feedback": "Yes: treat model output like untrusted input." },
    { "text": "Use it directly, since the prompt asked for JSON", "correct": false, "feedback": "Replies can be malformed, miss fields or contain values outside the range." },
    { "text": "Ask the model whether its JSON is valid", "correct": false, "feedback": "A parser answers that exactly; the model may be wrong." },
    { "text": "Lower the temperature to 0 and skip validation", "correct": false, "feedback": "Determinism does not guarantee validity." }
  ],
  "explanation": "Schema modes help a lot, but code-side validation and error handling are still needed."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "faithful-steps",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["step-by-step", "structured-output"],
  "misconception": "steps-are-proof",
  "question": "A model shows a neat five-step derivation of a tax amount. What follows?",
  "options": [
    { "text": "Recompute the amount in code from the inputs before using it", "correct": true, "feedback": "Yes: the steps make errors easier to spot, but only an independent computation verifies the number." },
    { "text": "The amount is correct, because each step looks right", "correct": false, "feedback": "Steps can look plausible and still contain an error, and need not be how the answer was produced." },
    { "text": "Ask the model to repeat the derivation and accept it if the result is the same", "correct": false, "feedback": "A repeated mistake is still a mistake." }
  ],
  "explanation": "Chain-of-thought improves accuracy, not verifiability; verify computed values with code or tools."
}
```

# Examples

- **Recipe card**: few-shot examples are like showing a new cook two finished plates; they will plate the third the same way, including the smudge on the rim. Where it breaks down: the cook remembers tomorrow; the model does not.
- **Showing your work in maths class** gives you room to get each step right and lets the teacher see where it went wrong. Where it breaks down: a model's written steps may not be how it actually got the answer.
- **Chain**: "extract facts → check facts → write" is an assembly line; a bad part is caught at the station that checks it instead of in the finished product.

# Tutor notes

- Let the learner do the warm-up pattern guess themselves before naming "few-shot".
- If the learner has a chatbot, a good experiment is a word problem with and without "step by step", repeated a few times.
- Keep "a model checking itself is not proof" central; it prepares the elements on RAG, evaluation and security.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 5 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/05-advanced-prompts): more techniques such as generated knowledge and least-to-most; college.

# Sources

Grounding: [^ms-genai-05]. Text, examples and questions are original.

[^ms-genai-05]: Microsoft, Generative AI for Beginners, lesson 5, MIT License. Used for scope and order only.
