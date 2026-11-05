---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/reasoning-with-grpo
title: Training reasoning models - verifiable rewards and GRPO
description: Reasoning models learn to think step by step through reinforcement learning on problems whose answers a program can check. GRPO scores several answers to the same problem against each other, so no separate value model is needed; DeepSeek-R1 made the approach famous.
lang: en
levels: [highschool, college]
objectives:
  - id: verifiable-rewards
    text: Explain how reasoning models are trained with automatically checkable rewards (correct final answer, required format) and what the "aha moment" refers to.
  - id: group-advantage
    text: Compute GRPO advantages for a group of answers to the same prompt and explain why this removes the need for a value model.
  - id: grpo-update
    text: Describe how the GRPO update uses advantages, ratio clipping and a KL penalty, and name limits of the approach.
tags: [llm, reasoning, reinforcement-learning, grpo, deepseek-r1, chain-of-thought]
about:
  - wikidata: Q131936230
    label: reasoning language model
  - wikidata: Q131914874
    label: DeepSeek-R1
requires:
  - ptf:el/llm-in-practice/preference-training
leads_to: []
duration_min: { highschool: 20, college: 30 }
sources:
  - id: hf-llm-course-12
    resource: https://huggingface.co/learn/llm-course/chapter12/3
    title: "Hugging Face LLM Course, chapter 12, sections 3 to 4: the DeepSeek-R1 paper, GRPO in DeepSeekMath, implementing GRPO in TRL"
    author: Hugging Face and contributors
    license: Apache-2.0
  - id: deepseek-r1
    resource: https://arxiv.org/abs/2501.12948
    title: "DeepSeek-AI, DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (2025)"
  - id: deepseekmath
    resource: https://arxiv.org/abs/2402.03300
    title: "Shao et al., DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models (2024)"
generated: { by: claude/opus, at: 2026-11-06T01:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Some models now "think" before they answer: they write long chains of reasoning, check themselves and correct mistakes. Nobody wrote those chains as examples.
- This step shows how they learn it: let the model try maths and coding problems many times, reward only answers a program can verify, and compare several attempts at the same problem with each other (GRPO).
- Afterwards the learner can compute the learning signal GRPO gives each attempt, explain why a checkable reward is so useful, and describe how a reasoning model like DeepSeek-R1 was built.

# Core

For problems with a checkable result (a maths answer, code that passes
tests), the reward can come from a program instead of people or a reward
model: 1 for a correct final answer, 0 otherwise, plus a small reward for
the required format. GRPO (group relative policy optimisation) samples a
group of answers to the same prompt, rewards each, and uses each answer's
reward relative to the group's mean, divided by the group's standard
deviation, as its advantage: better-than-average attempts are made more
likely, worse ones less likely. Because the group provides the baseline,
no separate value model is needed. The update clips how far probabilities
may move in one step and adds a KL penalty towards a reference model.
Trained this way, models learn on their own to write longer reasoning and
to re-check their work.

# Key facts

- **Verifiable rewards**: accuracy reward (final answer matches, code passes tests) and format reward (for example reasoning inside `<think>…</think>` and the answer afterwards). Rule-based rewards are hard to fool compared with a learned reward model, and are cheap.
- **DeepSeek-R1-Zero** (2025): GRPO with rule-based rewards applied directly to a base model, without SFT first. Its pass@1 on the AIME 2024 maths competition rose from 15.6 % to 71.0 % during training, and its answers grew longer.
- **"Aha moment"**: during R1-Zero's training the model began to pause, re-evaluate and correct an earlier approach in its own reasoning ("wait, …"), a behaviour that was not demonstrated to it but emerged from the reward.
- **DeepSeek-R1 pipeline** (four stages): (1) cold start: SFT on a small set of long, readable reasoning examples; (2) reasoning-oriented RL with GRPO; (3) rejection sampling: generate many answers, keep good ones (about 600,000 reasoning and 200,000 other samples) and fine-tune again; (4) RL for all scenarios, including helpfulness and harmlessness.
- **GRPO advantage** for answer i in a group of G: Aᵢ = (rᵢ − mean(r)) / std(r). Rewards [1, 0, 0, 1]: mean 0.5, std 0.5 → advantages [1, −1, −1, 1]. Rewards [1, 0, 0, 0]: mean 0.25, std ≈ 0.433 → [1.732, −0.577, −0.577, −0.577]. (Here std divides by G; some implementations divide by G − 1.)
- **No signal when all agree**: if every answer in a group is right (or every one wrong), all advantages are 0 and the prompt teaches nothing; problems of the right difficulty matter.
- **GRPO update**: for each token of answer i, the probability ratio ρ = π_θ / π_old is multiplied by Aᵢ and clipped to [1 − ε, 1 + ε] (ε about 0.2); the objective takes the smaller of the clipped and unclipped terms, minus β · KL to a reference model. Ratio 1.5 with a positive advantage and ε = 0.2 counts as 1.2.
- GRPO was introduced in DeepSeekMath (2024). Compared with PPO it drops the value model (less memory) and needs several samples per prompt (more generation). It is implemented in TRL (`GRPOTrainer`).
- **Limits**: needs tasks with checkable answers; long generations are expensive; models may exploit flaws in the checker (reward hacking) or mix languages and become hard to read without the cold-start and later stages.

# Level: highschool

<!-- ptf:text v1 -->

Picture a maths club that wants to get better without a teacher. Every
member gets the same problem and works it out. Then they check the
answers against the solution sheet. Whoever was right sees their way of
thinking confirmed; whoever was wrong learns to avoid theirs. Over
hundreds of problems the whole club gets better, without anyone ever
explaining a solution.

That is how reasoning models are trained. The model gets a maths or
programming problem and writes, say, four different attempts, each with
its reasoning and a final answer. A simple program checks only the final
answers (or runs the code against tests): right gets 1 point, wrong gets
0. There is also a small bonus for using the agreed format, reasoning
first and then the answer.

Then comes the trick of **GRPO**: each attempt is judged against the
others in its group. If two of four attempts were right, the two right
ones were better than average and are made more likely; the two wrong
ones were worse than average and are made less likely. If all four were
right, nobody was better than average, and the model learns nothing from
that problem; it was too easy.

Researchers at DeepSeek trained a model this way and watched something
surprising: without ever being shown how, the model started writing
longer and longer reasoning, and sometimes stopped in the middle with
"wait, let me check that again" and fixed its own mistake. They called it
the "aha moment".

This works best where a program can check the answer. For "write a nice
poem" there is no solution sheet, so other methods are needed there.

# Level: college

<!-- ptf:text v1 -->

Compute before reading on: four sampled answers to one problem get
rewards [1, 0, 0, 1]. If each answer's learning signal is its reward
minus the group mean, divided by the group's standard deviation, what are
the four signals? ([1, −1, −1, 1].)

**Rewards.** For reasoning tasks the reward is a program: exact match of
the final answer after normalisation, unit tests for code, plus a format
reward for `<think>` structure. Unlike a learned reward model it is
cheap and robust (though not unexploitable: weak checkers get gamed).

**GRPO** (DeepSeekMath, 2024). For each prompt q sample G outputs
{o₁ … o_G} from π_old, score them, and set the advantage of every token
of oᵢ to Âᵢ = (rᵢ − mean(r)) / std(r). The group mean replaces PPO's
learned value baseline, which removes a model the size of the policy
from memory. The objective per token is
min(ρ Âᵢ, clip(ρ, 1 − ε, 1 + ε) Âᵢ) − β · D_KL(π_θ ‖ π_ref),
with ρ = π_θ(o_{i,t} | q, o_{i,<t}) / π_old(o_{i,t} | q, o_{i,<t}),
averaged over tokens and outputs. Clipping bounds each update; the KL
term (estimated per token) keeps the policy near the reference.
Variance normalisation makes the signal scale-free but means a group
with identical rewards contributes nothing (std 0); curricula that keep
problems at intermediate difficulty, and variants that drop the std
normalisation or the length bias of per-sequence averaging, address
this.

**DeepSeek-R1.** R1-Zero applied GRPO with rule-based rewards straight to
the base model: AIME 2024 pass@1 rose from 15.6 % to 71.0 %, response
length grew steadily, and self-verification ("wait…") emerged, but
outputs were hard to read and mixed languages. R1 added a cold-start
SFT on curated long chains of thought, reasoning RL with a
language-consistency reward, rejection sampling (about 600k reasoning +
200k general samples) followed by SFT, and a final RL stage over all
scenarios with rule-based and preference rewards. Distilling R1's
outputs into smaller dense models transferred much of the ability.

**Costs and limits.** G samples of long chains per prompt make
generation the bottleneck; only verifiable domains get clean rewards;
reward hacking of checkers, overlong reasoning and readability need
separate care.

# Misconceptions

- **reasoning-was-taught**: Reasoning models learned to think by imitating thousands of human-written reasoning chains → in R1-Zero the behaviour emerged from rewards on final answers alone; later stages add some curated examples for readability.
- **absolute-reward**: GRPO makes every correct answer equally more likely, whatever the others did → it uses the reward relative to the group; if all answers are right, the signal is zero.
- **grpo-needs-critic**: GRPO, like PPO, needs a learned value model → the group mean is the baseline; no value model is trained.
- **rl-any-task**: Verifiable-reward RL works equally for every task → it needs answers a program can check; open-ended writing needs preference or judge-based rewards.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "checker-reward", "level": "highschool", "purpose": "check",
  "objectives": ["verifiable-rewards"], "misconception": "rl-any-task",
  "question": "Why are maths and programming problems so well suited for training reasoning models with rewards?",
  "options": [
    { "text": "A program can check the final answer or run tests, so rewards are cheap, automatic and hard to fool", "correct": true, "feedback": "Right. No people or reward model needed." },
    { "text": "Because language models like numbers more than words", "correct": false, "feedback": "It is about checking answers, not preferences." },
    { "text": "Because maths problems are always easy", "correct": false, "feedback": "They can be very hard; what matters is that the answer can be checked." }
  ],
  "explanation": "Verifiable rewards are the key ingredient: right/wrong decided by a program."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "aha", "level": "highschool", "purpose": "check",
  "objectives": ["verifiable-rewards"], "misconception": "reasoning-was-taught",
  "question": "What was the \"aha moment\" observed while training DeepSeek-R1-Zero?",
  "options": [
    { "text": "The model started on its own to stop, re-check and correct its reasoning, without being shown how", "correct": true, "feedback": "Right. The behaviour emerged from rewarding correct answers." },
    { "text": "The researchers suddenly found a bug", "correct": false, "feedback": "It refers to the model's behaviour, not the researchers'." },
    { "text": "The model was given a list of examples of self-checking", "correct": false, "feedback": "R1-Zero got no such examples; that is what made it surprising." }
  ],
  "explanation": "Rewarding only correct final answers was enough for longer, self-checking reasoning to appear."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "group-hs", "level": "highschool", "purpose": "check",
  "objectives": ["group-advantage"], "misconception": "absolute-reward",
  "question": "Four attempts at the same problem: right, wrong, wrong, right. What does GRPO do?",
  "options": [
    { "text": "Makes the two right attempts more likely and the two wrong ones less likely, because they were above or below the group's average", "correct": true, "feedback": "Right. Each attempt is judged against its group." },
    { "text": "Makes all four more likely, because two were right", "correct": false, "feedback": "Only the better-than-average attempts are pushed up." },
    { "text": "Does nothing, because the group is split evenly", "correct": false, "feedback": "A split group gives the strongest signal." }
  ],
  "explanation": "Advantage = how much better than the group average an attempt was."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "all-right", "level": "highschool", "purpose": "check",
  "objectives": ["group-advantage"], "misconception": "absolute-reward",
  "question": "All four attempts at a problem are right. What does the model learn from this problem in GRPO?",
  "options": [
    { "text": "Nothing: no attempt was better than the average, so all signals are zero", "correct": true, "feedback": "Right. Problems that are too easy (or too hard) teach nothing." },
    { "text": "A lot, because four right answers are four rewards", "correct": false, "feedback": "GRPO only uses differences within the group." },
    { "text": "To avoid this problem in future", "correct": false, "feedback": "There is no penalty either; the signal is simply zero." }
  ],
  "explanation": "Useful training problems are those the model sometimes solves and sometimes does not."
}
```

```ptf-question
{
  "kind": "ordering", "id": "r1-stages", "level": "highschool", "purpose": "check",
  "objectives": ["grpo-update", "verifiable-rewards"],
  "instruction": "Put the training stages of DeepSeek-R1 (after pretraining) in order.",
  "items": [
    "Fine-tune on a small set of long, readable reasoning examples (cold start)",
    "Reinforcement learning on checkable reasoning problems with GRPO",
    "Generate many answers, keep the good ones and fine-tune on them (rejection sampling)",
    "Reinforcement learning for all kinds of tasks, including helpfulness and safety"
  ],
  "explanation": "Readable start, reasoning RL, filtered data for SFT, then broad RL."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "advantage-hs", "level": "highschool", "purpose": "check",
  "objectives": ["group-advantage"],
  "question": "Rewards of four attempts: 1, 0, 0, 1. The group average is 0.5 and the spread (standard deviation) is 0.5. What is the signal (advantage) of a right attempt, (reward − average) / spread?",
  "answer": 1, "tolerance": 0,
  "explanation": "(1 − 0.5) / 0.5 = 1; a wrong attempt gets (0 − 0.5) / 0.5 = −1."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "advantages-college", "level": "college", "purpose": "check",
  "objectives": ["group-advantage"], "misconception": "grpo-needs-critic",
  "title": "GRPO advantages for a group of four",
  "intro": "Rewards (accuracy 1/0 plus format bonus 0.2 for the right structure): 1.2, 0.2, 0.0, 0.2. Standard deviation over the group, dividing by G = 4. Round to three decimals.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Mean", "(1.2 + 0.2 + 0 + 0.2) / 4", "0.4"],
    ["Standard deviation", "√((0.64 + 0.04 + 0.16 + 0.04) / 4)", "0.469"],
    ["Advantage of answer 1", "(1.2 − 0.4) / 0.469", "1.706"],
    ["Advantage of answer 3", "(0 − 0.4) / 0.469", "-0.853"]
  ],
  "result": { "label": "Advantage of answers 2 and 4", "value": "-0.426" },
  "explanation": "The correct answer gets a large positive signal; well-formatted wrong answers are still pushed down, but less than the badly formatted one. The group mean is the baseline, so no value network is needed."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "clip-ratio", "level": "college", "purpose": "check",
  "objectives": ["grpo-update"],
  "question": "For a token with advantage Â = 2, the new policy makes it 1.5 times as likely as the old one (ρ = 1.5). With ε = 0.2, what is the value of min(ρ Â, clip(ρ, 0.8, 1.2) Â)?",
  "answer": 2.4, "tolerance": 0,
  "explanation": "ρ Â = 3.0, clip(1.5) = 1.2 → 2.4; the minimum is 2.4. Beyond 1 + ε a positive advantage earns no further gain, which bounds each update."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "grpo-vs-ppo", "level": "college", "purpose": "check",
  "objectives": ["grpo-update", "group-advantage"], "misconception": "grpo-needs-critic",
  "question": "Which statements about GRPO compared with PPO are right? (Several can be right.)",
  "options": [
    { "text": "GRPO replaces the learned value function with the group's mean reward as baseline", "correct": true, "feedback": "Right. That saves a policy-sized model in memory." },
    { "text": "GRPO needs several sampled answers per prompt", "correct": true, "feedback": "Right. The group is what makes the baseline." },
    { "text": "GRPO keeps PPO's ratio clipping and adds a KL penalty to a reference model", "correct": true, "feedback": "Right." },
    { "text": "GRPO gives a useful signal even when every answer in a group has the same reward", "correct": false, "feedback": "Identical rewards give zero advantages (and std 0)." }
  ],
  "explanation": "GRPO trades a value model for more sampling and relative scoring."
}
```

```ptf-question
{
  "kind": "free_text", "id": "r1-zero-lessons", "level": "college", "purpose": "check",
  "objectives": ["verifiable-rewards", "grpo-update"], "misconception": "reasoning-was-taught",
  "question": "What did DeepSeek-R1-Zero show about reinforcement learning on a base model, what went wrong with it, and how did the full R1 pipeline fix that? Name one remaining limit of the approach.",
  "rubric": [
    "RL with rule-based rewards on a base model, without SFT, produced strong reasoning (AIME pass@1 15.6 % → 71.0 %), longer chains and emergent self-verification.",
    "Problems: poor readability, language mixing.",
    "R1: cold-start SFT on readable long CoT, language-consistency reward, rejection sampling + SFT, final RL over all scenarios.",
    "Limit: needs verifiable tasks; generation cost; checker exploitation; overlong reasoning."
  ],
  "sample_answer": "R1-Zero showed that GRPO with only accuracy and format rewards can teach a base model to reason: AIME pass@1 went from 15.6 % to 71.0 % and self-checking emerged. But its chains were hard to read and mixed languages. R1 started from a small readable SFT set, added a language-consistency reward, then used rejection sampling to build SFT data and a final RL stage for general helpfulness. It still depends on tasks with checkable answers and costs a lot of generation.",
  "explanation": "Rewards shape behaviour; data stages shape readability and breadth."
}
```

# Examples

- **Maths club with a solution sheet**: attempts are compared with each other and with the answer key; no one explains solutions. Breaks down: the model adjusts token probabilities, not explicit strategies.
- **Grading on a curve**: GRPO's advantage is like grading relative to the class average; if everyone gets full marks, the curve says nothing.

# Tutor notes

- Start with the maths-club picture, then let the learner compute advantages for [1, 0, 0, 1] before seeing the formula.
- The "all right → no signal" question is the conceptual core; make sure the learner can explain it.
- At college level, connect to the previous step: GRPO keeps PPO's clipping and KL, but drops the value model; DPO dropped the reward model instead.
- Learners with a GPU can run TRL's `GRPOTrainer` on a small model with a toy verifiable task (for example arithmetic or a format reward) to watch rewards and answer lengths change.

# Further reading

- [Hugging Face LLM Course, chapter 12: Build reasoning models](https://huggingface.co/learn/llm-course/chapter12/3): the DeepSeek-R1 paper explained, a worked GRPO example, and implementing GRPO with TRL and Unsloth (college, expert).
- [DeepSeek-R1 paper](https://arxiv.org/abs/2501.12948) and [DeepSeekMath paper](https://arxiv.org/abs/2402.03300): the original sources (expert).

# Sources

Grounding: [^hf-llm-course-12], [^deepseek-r1], [^deepseekmath]. Text, examples and questions are original.

[^hf-llm-course-12]: Hugging Face, LLM Course, chapter 12 ("Build Reasoning Models"), sections 3 to 4, https://huggingface.co/learn/llm-course, Apache License 2.0.
[^deepseek-r1]: DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", 2025, arXiv:2501.12948.
[^deepseekmath]: Zhihong Shao et al., "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models", 2024, arXiv:2402.03300.
