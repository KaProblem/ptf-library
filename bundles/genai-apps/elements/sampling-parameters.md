---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/sampling-parameters
title: Temperature, top-p and output limits
description: How the settings of a request change the output; temperature sharpens or flattens the probabilities of the next token, top-p cuts off unlikely tokens, and output limits and stop sequences end the answer.
lang: en
levels: [highschool, college]
objectives:
  - id: temperature
    text: Explain how temperature reshapes the probabilities of the next token and predict the effect of low and high values.
  - id: top-p-and-limits
    text: Explain what top-p sampling, the output token limit and stop sequences do.
  - id: choose-settings
    text: Choose settings for a task (extraction or classification, chat, creative writing), knowing that low temperature makes outputs more repeatable but not more correct.
tags: [generative-ai, llm, temperature, sampling, top-p]
about:
  - wikidata: Q122237668
    label: top-p sampling
requires:
  - ptf:el/genai-apps/genai-and-llms
leads_to:
  - ptf:el/genai-apps/chat-apps
duration_min: { highschool: 20, college: 25 }
simulators:
  - ref: ptf:sim/bigram-lab@^1.1.0
    station: temperature
    levels: [highschool, college]
    role: explore
    use_when: the learner wants to see generated text change from repetitive to chaotic as temperature rises
sources:
  - id: ms-genai-06
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/06-text-generation-apps
    title: "Microsoft, Generative AI for Beginners, lesson 6: Building text generation applications (MIT License)"
  - id: ms-genai-05
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/05-advanced-prompts
    title: "Microsoft, Generative AI for Beginners, lesson 5: Creating advanced prompts (MIT License)"
generated: { by: claude/opus, at: 2026-11-05T23:20:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Guess: you ask the same chatbot the same question twice and get two different answers. Is it broken? No: it rolls dice over the next token, and a setting called temperature decides how wild the dice are.
- Apps set these values on every request: a data-extraction tool wants the same sober answer every time, a story generator wants variety.
- Afterwards the learner can predict what temperature, top-p and output limits do and choose them for a task.

# Core

For every next token the model computes a probability for each token in
its vocabulary, and the application then samples one. Temperature
reshapes these probabilities before sampling: low values sharpen them so
the most likely token almost always wins, giving focused and repeatable
text; high values flatten them so unlikely tokens get picked more often,
giving varied, surprising and eventually incoherent text. Top-p sampling
keeps only the most likely tokens whose probabilities add up to p and
samples among those. The output token limit and stop sequences end the
answer. Settings change how the model picks among what it considers
likely; they add no knowledge, so a low temperature makes answers more
repeatable, not more correct.

# Key facts

- Temperature T divides the model's scores (logits) before softmax: p_i = e^(z_i / T) / Σ_j e^(z_j / T).
- Example scores [2, 1, 0]: at T = 1 the probabilities are 66.5 %, 24.5 %, 9.0 %; at T = 0.5 they are 86.7 %, 11.7 %, 1.6 %; at T = 2 they are 50.6 %, 30.7 %, 18.6 %.
- T → 0 approaches greedy decoding (always the most likely token); many APIs treat 0 as greedy. Typical ranges: 0 to 0.3 for extraction, classification and code; about 0.7 to 1 for chat and creative writing; well above 1 quickly becomes incoherent.
- Top-p (nucleus) sampling: sort tokens by probability, keep the smallest set whose probabilities sum to at least p, renormalise, sample. With [50 %, 25 %, 15 %, 6 %, 4 %] and p = 0.9, three tokens remain (50 + 25 + 15 = 90 %), and the first now has 50 / 90 ≈ 55.6 %.
- Top-k keeps the k most likely tokens. Providers usually recommend changing temperature or top-p, not both.
- Output limit (`max_tokens`, `max_output_tokens`): hard cap on generated tokens; a reply that hits it is cut off mid-sentence. It is also a cost cap.
- Stop sequences: strings that end generation when produced, for example a closing tag or "\n\n".
- Even at temperature 0, outputs can differ slightly between runs because of numerical effects on the server and model updates; some APIs offer a seed for more repeatable results, without a guarantee.
- Other settings found in APIs: frequency and presence penalties (discourage repetition), number of candidates n, and on reasoning models a reasoning-effort setting instead of or besides temperature.

# Level: highschool

<!-- ptf:text v1 -->

Picture the model at the end of "The cat sat on the …". It gives every
possible next word a chance: "mat" 60 %, "sofa" 25 %, "roof" 10 %, and so
on. Then the app rolls a die weighted by these chances. That is why the
same question can get different answers.

Temperature changes the die. Turn it down and the favourite gets even
stronger: "mat" almost every time, the text becomes focused and
predictable. Turn it up and the chances get more even: "roof" and odder
words appear more often. A bit more is creative; a lot more is nonsense.

Top-p is a different trick: only the most likely words that together make
up, say, 90 % of the chance are allowed; the long tail of strange words is
cut off. And the app can set a maximum answer length, which stops the
answer even mid-sentence, and stop words that end it early.

So which settings? For pulling dates out of letters or sorting messages,
low temperature: you want the same sober answer every time. For a story or
ideas, higher temperature. But careful: a low temperature does not make
the model smarter. It just gives you its favourite answer every time,
right or wrong.

# Level: college

<!-- ptf:text v1 -->

Given logits z over the vocabulary, sampling at temperature T uses
p_i = softmax(z / T)_i. T < 1 increases the gaps between log-
probabilities, concentrating mass on the top tokens; T → 0 tends to
argmax (greedy decoding); T > 1 flattens the distribution towards
uniform. For scores [2, 1, 0], the top token's probability goes from
86.7 % at T = 0.5 to 66.5 % at T = 1 and 50.6 % at T = 2.

Truncation samplers remove the low-probability tail, which is where most
incoherent tokens come from. Top-k keeps a fixed number of tokens; top-p
(nucleus) keeps the smallest prefix of the sorted distribution with
cumulative probability ≥ p, so the candidate set adapts to how confident
the model is. After truncation the kept probabilities are renormalised.
Tune one of temperature and top-p, not both at once.

Generation ends at an end-of-sequence token, a stop sequence, or the
output limit, which truncates the text and bounds cost; check the
finish reason in the API response to detect truncation. Determinism is
approximate: greedy decoding can still vary because of non-deterministic
floating-point reductions and batching on the server, and model versions
change; a seed parameter, where offered, improves but does not guarantee
repeatability. Settings select among what the model already considers
probable, so they trade diversity against focus; they do not correct
factual errors. Reasoning models often fix or ignore temperature and
expose a reasoning-effort control instead.

# Misconceptions

- **temp-zero-correct**: Temperature 0 makes the answers correct → it makes the model pick its most likely token, which is repeatable but can be repeatably wrong.
- **temp-zero-identical**: Temperature 0 always gives exactly the same output → it is close, but server-side numerical effects and model updates can still change outputs.
- **high-temp-smarter**: A higher temperature makes the model more creative in the sense of more intelligent → it only makes less likely tokens more frequent; too high produces nonsense.
- **temperature-changes-knowledge**: Temperature changes what the model knows → it reshapes the probabilities of the next token; knowledge comes from training and the prompt.
- **max-tokens-summarises**: A low output limit makes the model write a shorter, complete answer → the model does not see the limit; it is cut off when it hits it. Ask for brevity in the prompt.
- **top-p-is-top-tokens-percent**: Top-p 0.9 keeps the top 90 % of all tokens → it keeps the most likely tokens until their probabilities sum to 0.9, often only a handful.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "two-apps",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "high-temp-smarter",
  "question": "One app reads invoice dates out of scanned letters, another writes bedtime stories. Guess: which one should use a higher temperature?",
  "options": [
    { "text": "The story app", "correct": true, "feedback": "Yes: variety is good in stories; in data extraction you want the same sober answer every time." },
    { "text": "The invoice app", "correct": false, "feedback": "Randomness in a date reader only adds chances for odd output." },
    { "text": "Both the same, temperature makes no difference", "correct": false, "feedback": "It changes how adventurous the next-token choice is." }
  ],
  "explanation": "Low temperature for focused, repeatable output; higher for variety."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "turn-down",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["temperature"],
  "misconception": "temperature-changes-knowledge",
  "question": "The model gives \"mat\" 60 %, \"sofa\" 25 % and \"roof\" 10 %. What happens when you lower the temperature?",
  "options": [
    { "text": "\"mat\" gets an even higher chance, \"roof\" an even lower one", "correct": true, "feedback": "Yes: low temperature sharpens the differences." },
    { "text": "All three get the same chance", "correct": false, "feedback": "That is what a very high temperature tends towards." },
    { "text": "The model learns new words", "correct": false, "feedback": "Temperature only reshapes the chances; it adds nothing to the model." },
    { "text": "\"roof\" becomes the favourite", "correct": false, "feedback": "The order stays the same; only the gaps change." }
  ],
  "explanation": "Lower temperature: favourite stronger, text more predictable. Higher: chances more even, text more surprising."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "cut-off",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["top-p-and-limits"],
  "misconception": "max-tokens-summarises",
  "question": "An app's answers often end in the middle of a sentence. What is the most likely cause?",
  "options": [
    { "text": "The maximum answer length (output token limit) is set too low", "correct": true, "feedback": "Yes: the model does not see the limit; it is simply stopped when it hits it." },
    { "text": "The temperature is too low", "correct": false, "feedback": "Low temperature makes text predictable, not shorter." },
    { "text": "Top-p is too high", "correct": false, "feedback": "Top-p limits which words may be picked, not how many." },
    { "text": "The model ran out of ideas", "correct": false, "feedback": "A model that is done writes an end token; mid-sentence stops come from a limit." }
  ],
  "explanation": "If you want short answers, ask for them in the prompt and keep the limit as a safety cap."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "low-temp-facts",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["choose-settings"],
  "misconception": "temp-zero-correct",
  "question": "A friend says: \"Set the temperature to 0, then the chatbot cannot make mistakes.\" What is right?",
  "options": [
    { "text": "It will give its favourite answer every time, which can be wrong every time", "correct": true, "feedback": "Yes: repeatable is not the same as correct." },
    { "text": "True: at temperature 0 the model checks its facts", "correct": false, "feedback": "There is no fact checking in the setting; it only picks the most likely token." },
    { "text": "True: temperature 0 switches off hallucinations", "correct": false, "feedback": "A made-up fact can be the most likely continuation." }
  ],
  "explanation": "Settings choose among what the model thinks is likely; they do not add knowledge."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "temperature-half",
  "level": "college",
  "purpose": "check",
  "objectives": ["temperature"],
  "title": "Softmax at temperature 0.5",
  "intro": "Logits [2, 1, 0], temperature T = 0.5. Divide by T, exponentiate, normalise. Round to three decimals.",
  "columns": ["Step", "Value"],
  "rows": [
    ["e^(2/0.5) = e^4", "54.598"],
    ["e^(1/0.5) = e^2", "7.389"],
    ["e^(0/0.5) = e^0", "1"],
    ["Sum", "62.987"],
    ["Probability of the second token", "0.117"]
  ],
  "result": { "label": "Probability of the top token", "value": "0.867" },
  "explanation": "54.598 / 62.987 ≈ 0.867, against 0.665 at T = 1: halving the temperature squares the ratios between token probabilities."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "nucleus",
  "level": "college",
  "purpose": "check",
  "objectives": ["top-p-and-limits"],
  "misconception": "top-p-is-top-tokens-percent",
  "text": "The next-token probabilities are 50 %, 25 %, 15 %, 6 % and 4 %. With top-p = 0.9, {{1}} tokens remain, and after renormalising the most likely token has a probability of {{2}} % (one decimal).",
  "gaps": [
    { "answer": "3", "accepted": ["three"] },
    { "answer": "55.6", "accepted": ["55,6"] }
  ],
  "explanation": "50 + 25 + 15 = 90 % reaches p, so three tokens stay; 50 / 90 ≈ 55.6 %."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "repeatable-pipeline",
  "level": "college",
  "purpose": "check",
  "objectives": ["choose-settings"],
  "misconception": "temp-zero-identical",
  "question": "A test suite compares a model's output for fixed prompts with stored expected outputs, and sometimes fails although nothing changed. Which two statements are correct?",
  "options": [
    { "text": "Even with temperature 0, server-side numerical effects can change the output slightly", "correct": true, "feedback": "Yes: greedy decoding is close to, but not perfectly, deterministic in practice." },
    { "text": "Tests should check properties (valid schema, contains the key facts) rather than exact strings", "correct": true, "feedback": "Yes: robust tests tolerate harmless variation." },
    { "text": "Raising top-p to 1 makes the outputs identical", "correct": false, "feedback": "Top-p = 1 keeps all tokens; it does not remove randomness." },
    { "text": "A seed parameter guarantees bit-identical outputs forever", "correct": false, "feedback": "It improves repeatability, but providers do not guarantee it across updates." }
  ],
  "explanation": "Pin the model version, use low temperature, and test for properties, not exact text."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "quiz-generator-settings",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["choose-settings", "top-p-and-limits"],
  "question": "A quiz generator must produce varied questions on each run, always as valid JSON, and never longer than 300 tokens. Which settings and safeguards do you choose, and why?",
  "rubric": [
    "Moderate temperature (about 0.7 to 1) or top-p for variety, not extreme values.",
    "Output limit as a safety cap, with brevity requested in the prompt and the finish reason checked for truncation.",
    "Schema or JSON mode plus validation and retry, because sampling settings do not guarantee valid structure."
  ],
  "sample_answer": "Temperature around 0.8 gives varied questions without drifting into nonsense; leave top-p at its default. Ask for at most five questions in the prompt and set max_tokens to 300 as a cap; if the finish reason says the limit was hit, retry. Use the JSON or schema mode and validate every reply, retrying on failure.",
  "explanation": "Sampling settings control variety; structure and length need instructions, limits and validation."
}
```

# Examples

- **Weighted die**: the model's probabilities are the weights, temperature makes the die more or less loaded. Where it breaks down: a real die has six sides; the model's has tens of thousands, most with tiny weights.
- **Top-p as a guest list**: only the guests who together make up 90 % of the votes get in. Where it breaks down: the list changes for every single token.
- **Repeatable but wrong**: at temperature 0 a model asked for the population of a small town may give the same wrong number every time.

# Tutor notes

- If the learner wants to see it, the temperature station of the bigram lab shows the effect on generated text directly; say first that the model there is tiny and only the effect of the setting matters.
- The calculation at college level revisits softmax; if the learner knows softmax from the course on how LLMs work, connect it, otherwise give the formula and the example.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 6 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/06-text-generation-apps): setting temperature and token limits in code; college.

# Sources

Grounding: [^ms-genai-06], [^ms-genai-05]. Text, examples and questions are original.

[^ms-genai-06]: Microsoft, Generative AI for Beginners, lesson 6, MIT License. Used for scope and order only.
[^ms-genai-05]: Microsoft, Generative AI for Beginners, lesson 5, MIT License. Used for scope and order only.
