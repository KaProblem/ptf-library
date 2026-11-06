---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/decoding-strategies
title: Choosing the next token - greedy, sampling, temperature, top-k, top-p, beams
description: A model only gives probabilities for the next token; the decoding strategy picks one. Greedy, sampling with temperature, top-k and top-p, beam search, repetition penalties and stop rules decide whether the text is safe, varied, repetitive or wild.
lang: en
levels: [highschool, college]
objectives:
  - id: greedy-vs-sampling
    text: Explain the difference between greedy decoding and sampling and why greedy text often becomes repetitive.
  - id: filter-distribution
    text: Apply temperature, top-k and top-p to a next-token distribution and say which tokens remain and with which probabilities.
  - id: choose-settings
    text: Explain beam search, repetition penalties and stopping rules, and choose decoding settings for a given use.
tags: [llm, decoding, sampling, temperature, top-k, top-p, beam-search]
about:
  - wikidata: Q122237668
    label: top-p sampling
  - wikidata: Q2835852
    label: beam search
requires:
  - ptf:el/llm-basics/softmax
  - ptf:el/llm-in-practice/transformer-architectures
leads_to:
  - ptf:el/llm-in-practice/inference-performance
duration_min: { highschool: 20, college: 25 }
simulators:
  - ref: ptf:sim/bigram-lab@^1.1.0
    station: temperature
    levels: [highschool, college]
    role: explore
    use_when: the learner should see generated text change from repetitive to wild as the temperature rises
  - ref: ptf:sim/next-char-basics@^1.0.0
    station: generate
    levels: [highschool, college]
    role: explore
    use_when: the learner has never seen that generation is repeated sampling from a distribution
figures:
  - id: top-k-top-p
    objectives: [filter-distribution]
    use_when: after the learner has guessed which words survive top-k and top-p, to show the cut and the renormalised shares
sources:
  - id: hf-llm-course-1-8
    resource: https://huggingface.co/learn/llm-course/chapter1/8
    title: "Hugging Face LLM Course, chapter 1, section 8: Inference with LLMs (sampling strategies)"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-06T00:10:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Ask a chat assistant the same question twice and you may get two different answers. Ask a code assistant twice and you usually get the same code. Same kind of model, different setting of one knob.
- The model never writes a token; it only says how likely each possible next token is. A separate rule, the decoding strategy, picks one.
- Afterwards the learner can explain the knobs in every LLM interface (temperature, top-k, top-p, maximum tokens, stop sequences), compute what they do to a distribution, and pick sensible values for a task.

# Core

At each step the model outputs a probability for every token in the
vocabulary. Greedy decoding always takes the most likely token: safe but
often dull and repetitive. Sampling draws a token at random according to
the probabilities: varied, but rare bad tokens can slip in. Temperature
reshapes the distribution before sampling (low = sharper, high = flatter);
top-k keeps only the k most likely tokens and top-p keeps the smallest set
whose probabilities add up to p, renormalising what is left. Beam search
follows several candidate continuations and keeps the most probable
sequences overall, which suits tasks with one right answer. Repetition
penalties and stop rules (maximum length, end token, stop sequences)
control the rest.

# Key facts

- **Greedy**: argmax at every step. Deterministic; prone to loops ("I think that I think that…") and bland text because high-probability phrases reinforce themselves.
- **Sampling**: draw from p. The same prompt gives different outputs; a fixed random seed makes it reproducible.
- **Temperature T**: divide the logits by T before softmax. T = 1 leaves p unchanged; T < 1 sharpens (T → 0 approaches greedy); T > 1 flattens. Logits [2, 1, 0]: top token 0.665 at T = 1, 0.867 at T = 0.5, 0.506 at T = 2.
- **Top-k**: keep the k most likely tokens, set the rest to 0, renormalise. p = [0.5, 0.2, 0.15, 0.1, 0.05] with k = 2 → [0.714, 0.286].
- **Top-p (nucleus)**: keep the smallest set of most likely tokens whose cumulative probability reaches p, renormalise. Same p with top-p 0.8: cumulative 0.5, 0.7, 0.85 → keep 3 tokens → [0.588, 0.235, 0.176]. Unlike top-k, the number of kept tokens adapts: few when the model is sure, many when it is not.
- Typical order in libraries: repetition penalties → temperature → top-k → top-p → sample.
- **Beam search** with beam width B keeps the B partial sequences with the highest total log-probability at each step. It can find a sequence greedy misses: step 1 A 0.6 / B 0.4, then after A the best is 0.4 and after B 0.9: greedy gets A… with 0.6 · 0.4 = 0.24, beam search with B = 2 finds B… with 0.4 · 0.9 = 0.36. Good for translation and summarisation, poor for open-ended text (generic, repetitive).
- **Repetition penalties**: a presence penalty lowers every token that has already appeared by a fixed amount; a frequency penalty lowers it more the more often it appeared; a repetition penalty (Transformers) divides positive logits of seen tokens by a factor > 1.
- **Stopping**: maximum new tokens, the end-of-sequence token, or stop sequences (for example "\n\n" or "User:").
- Rules of thumb: extraction, code, factual answers → greedy or T 0 to 0.3; chat → T about 0.7 with top-p 0.9 to 0.95; brainstorming, stories → T 0.8 to 1.0. Very high T produces nonsense.

# Level: highschool

<!-- ptf:text v1 -->

Finish the sentence: "For breakfast I had a cup of …". Most people say
coffee or tea, a few say cocoa, almost nobody says "gravel". A language
model sees it the same way, only with numbers: coffee 50 %, tea 20 %,
cocoa 15 %, milk 10 %, soup 5 %. The model stops there. Something else has
to pick the word.

The simplest rule, **greedy**, always picks the favourite: coffee. Every
time. That sounds sensible, but over a whole text it makes boring,
sometimes looping writing, because the safest next word is often a word
you just used.

**Sampling** rolls a weighted die instead: coffee comes up half the time,
soup once in twenty rolls. Now the text varies, but now and then a weird
word slips in, and one weird word can derail the rest.

Three knobs tame the die:

- **Temperature** squeezes or stretches the odds. Low temperature makes
  the favourite even more likely (close to greedy); high temperature
  makes all options more equal, so the text gets surprising and finally
  silly.
- **Top-k** throws away all but the k most likely words. With k = 2 only
  coffee and tea stay; their 50 and 20 are rescaled to about 71 % and 29 %.
- **Top-p** keeps the most likely words until together they reach p,
  say 80 %: coffee (50) + tea (20) + cocoa (15) = 85 %, so three words stay.
  When the model is sure, that is one or two words; when it is unsure,
  many.

**Beam search** is the careful planner: it follows a few promising
sentence beginnings at once and in the end keeps the one that is most
likely as a whole. That is great for translation, where there is one
right answer, and dull for stories.

Finally, something has to stop the text: a maximum number of tokens, a
special end token, or a stop phrase you choose.

# Level: college

<!-- ptf:text v1 -->

Take logits z = [2, 1, 0] and compute softmax(z / T) for T = 0.5, 1 and
2 before reading on: the top probability goes 0.867, 0.665, 0.506.
Temperature is the only knob that changes the shape of the whole
distribution; the others truncate it.

Decoding turns p(x_t | x_{<t}) into a sequence. Greedy maximises each
step, not the sequence, and its outputs degenerate: high-probability
continuations make repeating themselves likely, a feedback loop. Pure
sampling avoids that but accumulates errors from the long tail of
low-probability tokens, each unlikely on its own but together likely
over hundreds of steps.

Truncation fixes the tail. Top-k keeps a fixed number of tokens, which
is too many when the distribution is peaked and too few when it is flat.
Top-p keeps the minimal set S with ∑_{x ∈ S} p(x) ≥ p, so its size
adapts to the model's uncertainty; with p = [0.5, 0.2, 0.15, 0.1, 0.05]
and top-p 0.8, |S| = 3 and the renormalised probabilities are 0.588,
0.235, 0.176. Min-p variants keep tokens above a fraction of the top
probability. In Transformers the logits processors run in order:
repetition penalty, temperature, top-k, top-p.

Beam search approximates argmax over sequences: keep the B highest
scoring prefixes by summed log-probability, expand each, keep the best B
again. Because short sequences have higher probability, a length penalty
normalises the score. Beam search wins where the output is constrained
by the input (translation, summarisation, speech recognition) and loses
for open-ended generation, where the most probable text is generic.

Penalties act on logits of tokens already generated: presence penalty
subtracts a constant once a token has appeared, frequency penalty
subtracts proportionally to its count, and the multiplicative repetition
penalty divides positive logits (multiplies negative ones) by θ > 1.
Stopping: `max_new_tokens`, EOS, or stop strings checked on the decoded
text.

Choose by task: determinism and correctness (code, extraction, tool
arguments) → greedy or low T; conversational quality → T ≈ 0.7, top-p
≈ 0.9; diversity for brainstorming or sampling several candidates to
rank later → T ≈ 1.

# Misconceptions

- **model-picks-word**: The model itself chooses the next word → it outputs a probability distribution; the decoding strategy chooses.
- **greedy-best-text**: Always taking the most likely token gives the best text → greedy text is often repetitive and bland; the most likely next token does not give the most likely or best sequence.
- **temperature-creativity-free**: Higher temperature just means more creativity → it flattens the distribution, so errors and nonsense also become more likely.
- **topk-topp-same**: Top-k and top-p are the same → top-k keeps a fixed number of tokens, top-p a number that adapts to how sure the model is.
- **zero-temp-no-randomness-everywhere**: Temperature 0 makes every API call identical → it removes sampling randomness, but numerical non-determinism on GPUs and server-side changes can still make outputs differ slightly.

# Questions

```ptf-question
{
  "kind": "guess_next", "id": "breakfast", "level": "highschool", "purpose": "warmup",
  "intro": "Be the model: which word comes next? Think about how sure you are.",
  "prefix": "For breakfast I had a cup of",
  "answer": "coffee", "accepted": ["tea", "cocoa", "milk", "hot chocolate"],
  "hint": "Something hot to drink.",
  "explanation": "Coffee and tea are most likely, cocoa and milk possible. A model sees exactly such a list with probabilities; a separate rule then picks one."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "greedy-boring", "level": "highschool", "purpose": "check",
  "objectives": ["greedy-vs-sampling"], "misconception": "greedy-best-text",
  "question": "Why does always picking the most likely word often give boring, looping text?",
  "options": [
    { "text": "The safest next word is often one that was just used, so the text repeats itself", "correct": true, "feedback": "Right. High-probability phrases reinforce themselves." },
    { "text": "The most likely word is always wrong", "correct": false, "feedback": "It is often a good word; the problem appears over many steps." },
    { "text": "Greedy picks words at random", "correct": false, "feedback": "Greedy is the opposite of random: always the favourite." }
  ],
  "explanation": "Greedy is deterministic and tends to fall into loops; sampling adds variety."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "two-answers", "level": "highschool", "purpose": "check",
  "objectives": ["greedy-vs-sampling"], "misconception": "model-picks-word",
  "question": "You ask a chat assistant the same question twice and get two different answers. What is the reason?",
  "options": [
    { "text": "The next word is drawn at random according to the probabilities (sampling)", "correct": true, "feedback": "Right. Same probabilities, different rolls of the weighted die." },
    { "text": "The model learned something new between the questions", "correct": false, "feedback": "The model's weights do not change while you chat." },
    { "text": "The model is broken", "correct": false, "feedback": "Different answers are the expected result of sampling." }
  ],
  "explanation": "With sampling, the same model and prompt can produce different texts."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "topk-coffee", "level": "highschool", "purpose": "check",
  "objectives": ["filter-distribution"], "misconception": "topk-topp-same",
  "question": "The model says coffee 50 %, tea 20 %, cocoa 15 %, milk 10 %, soup 5 %. With top-k = 2, how likely is coffee after rescaling (in %)?",
  "answer": 71.4, "tolerance": 1, "unit": "%",
  "explanation": "Only coffee and tea stay: 50 / (50 + 20) ≈ 71.4 %, tea ≈ 28.6 %."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "topp-count", "level": "highschool", "purpose": "check",
  "objectives": ["filter-distribution"], "misconception": "topk-topp-same",
  "question": "Same list (coffee 50 %, tea 20 %, cocoa 15 %, milk 10 %, soup 5 %). With top-p = 0.8, how many words remain?",
  "answer": 3, "tolerance": 0, "unit": "words",
  "explanation": "50 + 20 = 70 % is not yet 80 %; adding cocoa gives 85 %, so coffee, tea and cocoa remain."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "temperature-effect", "level": "highschool", "purpose": "check",
  "objectives": ["filter-distribution"], "misconception": "temperature-creativity-free",
  "question": "What happens when you raise the temperature a lot?",
  "options": [
    { "text": "All words become more equally likely, so the text gets surprising and eventually nonsensical", "correct": true, "feedback": "Right. Creativity and nonsense rise together." },
    { "text": "The model becomes smarter", "correct": false, "feedback": "Temperature does not change what the model knows, only how a word is picked." },
    { "text": "The favourite word becomes even more likely", "correct": false, "feedback": "That is what a low temperature does." }
  ],
  "explanation": "Low temperature sharpens, high temperature flattens the probabilities."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "settings-for-task", "level": "highschool", "purpose": "check",
  "objectives": ["choose-settings"],
  "question": "Which settings fit a program that turns invoices into a table of numbers?",
  "options": [
    { "text": "Greedy or a very low temperature, so the output is reliable and the same every time", "correct": true, "feedback": "Right. Extraction needs correctness, not variety." },
    { "text": "High temperature for more creative numbers", "correct": false, "feedback": "Creative invoice numbers are wrong invoice numbers." },
    { "text": "Beam search with a high temperature and no stop rule", "correct": false, "feedback": "Without a stop rule the output may never end, and high temperature adds errors." }
  ],
  "explanation": "Match the knobs to the task: exactness → greedy/low T; stories → higher T with top-p."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "temperature-calc", "level": "college", "purpose": "check",
  "objectives": ["filter-distribution"], "misconception": "temperature-creativity-free",
  "title": "Temperature on three logits",
  "intro": "Logits z = [2, 1, 0]. Compute the probability of the first token after softmax(z / T). Round to three decimals.",
  "columns": ["T", "z / T", "p(first token)"],
  "rows": [
    ["0.5", "[4, 2, 0]", "0.867"],
    ["1", "[2, 1, 0]", "0.665"],
    ["2", "[1, 0.5, 0]", "0.506"]
  ],
  "result": { "label": "p(first token) at T = 0.1", "value": "1.000" },
  "explanation": "As T → 0 the distribution collapses onto the argmax (greedy); as T grows it tends to uniform (1/3 each here)."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "topp-renorm", "level": "college", "purpose": "check",
  "objectives": ["filter-distribution"], "misconception": "topk-topp-same",
  "title": "Top-p = 0.8 on a five-token distribution",
  "intro": "p = [0.5, 0.2, 0.15, 0.1, 0.05], sorted. Round to three decimals.",
  "columns": ["Token rank", "Cumulative probability", "Renormalised probability"],
  "rows": [
    ["1", "0.50", "0.588"],
    ["2", "0.70", "0.235"],
    ["3", "0.85", "0.176"]
  ],
  "result": { "label": "Number of tokens in the nucleus", "value": "3" },
  "explanation": "The nucleus is the smallest prefix reaching 0.8; dividing by 0.85 renormalises. With a peaked distribution (say 0.9 for one token) the same p would keep a single token."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "beam-vs-greedy", "level": "college", "purpose": "check",
  "objectives": ["choose-settings", "greedy-vs-sampling"], "misconception": "greedy-best-text",
  "question": "Step 1: p(A) = 0.6, p(B) = 0.4. Step 2: after A the best token has 0.4; after B the best has 0.9. Which statement is right?",
  "options": [
    { "text": "Greedy ends with probability 0.24; beam search with width 2 finds a sequence with 0.36", "correct": true, "feedback": "Right. 0.6 · 0.4 = 0.24 against 0.4 · 0.9 = 0.36." },
    { "text": "Greedy always finds the most probable sequence", "correct": false, "feedback": "Here it does not: the locally best first step leads to a worse sequence." },
    { "text": "Beam search with width 2 ends with 0.24 as well", "correct": false, "feedback": "Beam search keeps B as a candidate and finds the 0.36 sequence." }
  ],
  "explanation": "Greedy optimises each step, beam search approximates the best sequence."
}
```

```ptf-question
{
  "kind": "free_text", "id": "pick-config", "level": "college", "purpose": "check",
  "objectives": ["choose-settings"], "misconception": "zero-temp-no-randomness-everywhere",
  "question": "Give decoding settings (strategy, temperature, top-p, stopping) for (a) generating JSON arguments for a tool call, (b) a friendly chat reply, (c) 20 diverse slogan candidates you will rank afterwards. Justify each briefly.",
  "rubric": [
    "(a) greedy or T ≈ 0, a stop rule (end of JSON / EOS, max tokens): correctness and reproducibility.",
    "(b) T ≈ 0.7 with top-p ≈ 0.9 (optionally mild repetition penalty), max tokens: natural but coherent.",
    "(c) T ≈ 1 (or higher with top-p), several samples: diversity matters, quality is filtered later.",
    "Mentions that beam search is unsuitable for open-ended chat, or that greedy is deterministic only up to numerical noise."
  ],
  "sample_answer": "(a) Greedy (T = 0), stop at the closing brace or EOS, max 200 tokens: arguments must be exact. (b) T 0.7, top-p 0.9, max 300 tokens: varied but sensible wording. (c) T 1.0, top-p 0.95, sample 20 times: I want variety and will rank them myself; greedy would give 20 identical slogans.",
  "explanation": "Decoding is a per-task choice, not a model property."
}
```

# Examples

- **Weighted die**: sampling rolls a die whose faces have the model's probabilities; temperature reshapes the die, top-k and top-p remove faces. Breaks down: the die changes after every roll, because the context changes.
- **Route planner**: greedy takes the best-looking next street, beam search keeps a few routes open and compares whole routes.

# Tutor notes

- Start with the breakfast sentence and let the learner give their own probabilities before showing the model's.
- The bigram-lab `temperature` station makes temperature visible on generated text; open it after the learner has predicted what high and low temperature will do.
- At highschool level skip the penalty formulas; "a penalty makes repeated words less likely" is enough.

# Further reading

- [Hugging Face LLM Course, chapter 1.8: Inference with LLMs](https://huggingface.co/learn/llm-course/chapter1/8): sampling parameters, repetition penalties, stop rules and beam search with interactive visualisations (highschool, college).

# Sources

Grounding: [^hf-llm-course-1-8]. Text, examples and questions are original.

[^hf-llm-course-1-8]: Hugging Face, LLM Course, chapter 1, section 8 ("Inference with LLMs"), https://huggingface.co/learn/llm-course, Apache License 2.0.
