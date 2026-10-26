---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-basics/from-babbler-to-assistant
title: From babbler to assistant
description: A pretrained decoder-only transformer only continues documents; fine-tuning on example dialogues and reinforcement learning from human feedback turn it into an assistant, at a scale thousands of times larger than a toy model.
lang: en
levels: [child, highschool, college, expert]
tags: [llm, pretraining, fine-tuning, rlhf, decoder-only, encoder-decoder, scale]
about:
  - wikidata: Q117286419
    label: fine-tuning
  - wikidata: Q115570683
    label: reinforcement learning from human feedback
  - wikidata: Q115305900
    label: large language model
requires:
  - ptf:el/llm-basics/gpt-end-to-end
duration_min: { child: 10, highschool: 15, college: 20, expert: 15 }
simulators:
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: document-completer
    levels: [child, highschool, college]
    role: explore
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: stages
    levels: [child, highschool, college]
    role: practice
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: scale
    levels: [child, highschool, college]
    role: explore
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: architectures
    levels: [highschool, college]
    role: explore
sources:
  - id: karpathy-gpt
    resource: https://www.youtube.com/watch?v=kCc8FmEb1nY
    title: "Andrej Karpathy: Let's build GPT: from scratch, in code, spelled out"
generated: { by: claude/opus, at: 2026-10-26T13:30:00Z }
status: draft
version: 0.2.1
license: CC-BY-SA-4.0
---

# Core

Everything up to here builds a model that continues text in the style of
what it read. Trained on the internet, it completes documents; it does not
answer questions. An assistant needs further training: first on example
conversations, then with feedback on which answers people prefer. The
architecture stays the same decoder-only transformer, only much bigger.

# Key facts

- GPT is decoder-only: causal self-attention blocks, no encoder, no cross-attention. That is all it needs for generating text.
- The original transformer (2017) was an encoder-decoder for translation: the encoder reads the source sentence with unmasked attention; the decoder generates the target with causal self-attention plus cross-attention to the encoder.
- Stage 1, pretraining: next-token prediction on a huge text corpus. Result: a document completer. Asked a question, it may continue with more questions, as a forum page would.
- Stage 2, supervised fine-tuning: training on question–answer examples written by people, a much smaller dataset (thousands of examples rather than billions of tokens). The model learns the format "question, then helpful answer".
- Stage 3, reward model: people rank several model answers; a second model learns to predict these rankings.
- Stage 4, reinforcement learning (e.g. PPO) against the reward model; stages 3 and 4 are known together as RLHF.
- Scale: a small Shakespeare model has about 10 million parameters and saw about 1 million characters; GPT-3 has 175 billion parameters (about 17,500 times more) and was trained on about 300 billion tokens.
- The pretraining stage is by far the most expensive: thousands of GPUs over weeks for models of GPT-3 size.

# Level: child

<!-- ptf:text v1 -->

Imagine a parrot that has listened to the radio for years. Say "How do you
bake a cake?" and it might answer "How do you bake bread? How do you bake
cookies?", because it has heard lots of lists of questions. It sounds like
language, but it is not helping you.

A language model that has only read texts is a bit like that parrot. It is
very good at continuing text. To make it a helpful assistant, people show it
many good examples: a question, and then a helpful answer. After that, people
look at its answers and say which ones they like better, and it practises
until it gets better at what people find helpful.

And it is big. If a small model were a single sheet of paper, a model like
GPT-3 would be a stack of 17,500 sheets: taller than a grown-up.

# Level: highschool

<!-- ptf:text v1 -->

Guess first: you give a model that has only been trained to continue
internet text the start "How do I bake an apple pie?". What does it write?
Often not a recipe, but more questions, like a forum page: "How long does
yeast dough need to rise? Can you freeze apples?". It is a document
completer: it continues the text the way such texts usually go on.

To turn it into an assistant, three more steps follow. First, it is trained
further on example conversations written by people, so it learns the
pattern "question, then helpful answer". Second, people compare several of
its answers and rank them; a second model learns to predict these rankings.
Third, the assistant practises against that judge and is rewarded for
answers the judge rates highly. This is called reinforcement learning from
human feedback (RLHF).

The building plan does not change: it is the same stack of attention and
feed-forward blocks with residual connections. What changes is the size. A
small model that writes fake Shakespeare has about 10 million adjustable
numbers; GPT-3 has 175 billion.

# Level: college

<!-- ptf:text v1 -->

The decoder-only transformer models p(x_t | x_<t) and is trained by maximum
likelihood on a large corpus, so its behaviour mirrors the distribution of
documents rather than the intent of a user. Alignment to assistant behaviour
is a post-training pipeline: supervised fine-tuning (SFT) on curated
prompt–response pairs; a reward model r(prompt, response) trained on human
preference comparisons; then policy optimisation (PPO) maximising r with a
KL penalty towards the SFT model to avoid reward hacking. Encoder-decoder
models remain useful where input and output are distinct sequences
(translation, summarisation) and encoder-only models where no generation is
needed (classification, retrieval embeddings).

# Level: expert

<!-- ptf:text v1 -->

Post-training has diversified beyond PPO-based RLHF: direct preference
optimisation (DPO) and related methods optimise preferences without an
explicit reward model or RL loop; constitutional and AI-feedback methods
replace part of the human labels; reinforcement learning with verifiable
rewards trains reasoning on maths and code with automatic checking. Scaling
follows predictable power laws in parameters, data and compute; compute-
optimal training (Chinchilla) shifted the field from very large
undertrained models to smaller ones on more tokens. Most capability comes
from pretraining; post-training mainly elicits and shapes it, which is why
base models can already do much with careful few-shot prompting.

# Misconceptions

- **pretraining-makes-assistant**: Pretraining on internet text yields a helpful assistant → it yields a document completer; assistant behaviour comes from fine-tuning and RLHF.
- **decoder-needed-everywhere**: Every transformer task needs the causal mask → only generation needs it; understanding tasks can use unmasked encoders.
- **chatgpt-different-architecture**: Assistants use a fundamentally different architecture from a small GPT → the core is the same decoder-only transformer, scaled up and post-trained.
- **scale-is-small**: Big models are maybe a hundred times bigger than toy models → GPT-3 has about 17,500 times the parameters of a 10-million-parameter model.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "parrot",
  "level": "child",
  "purpose": "warmup",
  "misconception": "pretraining-makes-assistant",
  "question": "A model has only read lots of texts. You type \"How do you bake a cake?\". What might it do?",
  "options": [
    { "text": "Write more questions, like a list it has seen before", "correct": true, "feedback": "Yes! It continues the text the way texts often continue." },
    { "text": "Always give you a recipe", "correct": false, "feedback": "Not necessarily. It has not yet learned that it should help; it only continues text." },
    { "text": "Ask you to bake together", "correct": false, "feedback": "That would be cute, but it just continues text the way it has seen it." }
  ],
  "explanation": "Being helpful is learned later, from good examples and feedback."
}
```

```ptf-question
{
  "kind": "ordering",
  "id": "training-stages",
  "level": "highschool",
  "purpose": "check",
  "misconception": "pretraining-makes-assistant",
  "instruction": "Put the training stages of an assistant in order.",
  "items": ["Pretraining on huge amounts of text (next-token prediction)", "Fine-tuning on example conversations", "Training a reward model from human rankings", "Reinforcement learning against the reward model"],
  "explanation": "Language first, then the dialogue format, then a judge of quality, then practice against the judge."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "scale-factor",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "scale-is-small",
  "question": "A small model has 10 million parameters, GPT-3 has 175 billion. How many times bigger is GPT-3?",
  "answer": 17500,
  "tolerance": 2500,
  "unit": "times",
  "explanation": "175,000,000,000 / 10,000,000 = 17,500."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-architecture",
  "level": "college",
  "purpose": "transfer",
  "misconception": "decoder-needed-everywhere",
  "question": "Which architecture fits each task best? Sentiment classification of a review / translating German to English / a chat assistant.",
  "options": [
    { "text": "Encoder / encoder-decoder / decoder-only", "correct": true, "feedback": "Right. No generation, distinct input and output sequences, open-ended generation." },
    { "text": "Decoder-only / encoder / encoder-decoder", "correct": false, "feedback": "No. An encoder alone cannot generate a translation, and a chat model is typically decoder-only." },
    { "text": "Decoder-only for all three, nothing else works", "correct": false, "feedback": "Decoder-only models can do all three, but the claim that nothing else works is wrong: encoders are standard for classification." }
  ],
  "explanation": "The mask and the source of keys and values define the architecture's role."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "kl-penalty",
  "level": "expert",
  "purpose": "transfer",
  "question": "In RLHF, why is the policy usually penalised for diverging from the supervised fine-tuned model (KL penalty)?",
  "rubric": ["The reward model is an imperfect proxy", "Unconstrained optimisation exploits its errors (reward hacking)", "The KL term keeps outputs close to the distribution the reward model was trained on", "It preserves language quality and diversity"],
  "sample_answer": "The reward model only approximates human preferences and is reliable near the outputs it was trained on. Without a constraint the policy finds outputs that score highly but are bad (reward hacking) and its language degrades. The KL penalty keeps it close to the SFT model, where the reward model's judgments are trustworthy.",
  "explanation": "Optimising a learned proxy needs a leash; the KL penalty is that leash."
}
```

# Further reading

Optional deep dive after the lesson; the element does not depend on it.

- [Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=6120s): decoder-only vs. encoder-decoder, nanoGPT, and how ChatGPT is trained from pretraining to RLHF (video, 1:42–1:56; highschool, college).
- [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155): the InstructGPT paper behind the fine-tuning and RLHF stages (paper; expert).

# Sources

Grounding: decoder-only vs. encoder-decoder and ChatGPT training chapters of [^karpathy-gpt].

[^karpathy-gpt]: Andrej Karpathy, "Let's build GPT: from scratch, in code, spelled out".
