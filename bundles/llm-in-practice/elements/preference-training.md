---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/preference-training
title: Learning from preferences - RLHF and DPO
description: After supervised fine-tuning, models are trained on which of two answers people prefer. RLHF learns a reward model from those comparisons and optimises the model against it with reinforcement learning; DPO reaches a similar goal directly from the pairs.
lang: en
levels: [highschool, college]
objectives:
  - id: rl-terms
    text: Map the terms of reinforcement learning (agent, environment, action, reward, policy) onto a language model writing an answer.
  - id: rlhf-pipeline
    text: Describe the RLHF pipeline - preference pairs, reward model, optimisation with a penalty for drifting from the reference model - and explain why the penalty is needed.
  - id: dpo
    text: Explain how direct preference optimisation learns from preference pairs without a separate reward model, and compute its loss for one pair.
tags: [llm, rlhf, dpo, ppo, reward-model, reinforcement-learning, alignment]
about:
  - wikidata: Q115570683
    label: reinforcement learning from human feedback
  - wikidata: Q139833558
    label: Direct Preference Optimization
  - wikidata: Q830687
    label: reinforcement learning
requires:
  - ptf:el/llm-in-practice/supervised-fine-tuning
  - ptf:el/llm-basics/from-babbler-to-assistant
leads_to:
  - ptf:el/llm-in-practice/reasoning-with-grpo
duration_min: { highschool: 20, college: 30 }
simulators:
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: stages
    levels: [highschool, college]
    role: explore
    use_when: the learner wants to compare answers after pretraining, SFT and preference training side by side
sources:
  - id: hf-llm-course-12-2
    resource: https://huggingface.co/learn/llm-course/chapter12/2
    title: "Hugging Face LLM Course, chapter 12, section 2: Reinforcement learning and its role in LLMs"
    author: Hugging Face and contributors
    license: Apache-2.0
  - id: rafailov-2023-dpo
    resource: https://arxiv.org/abs/2305.18290
    title: "Rafailov et al., Direct Preference Optimization: Your Language Model is Secretly a Reward Model (2023)"
generated: { by: claude/opus, at: 2026-11-06T01:20:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Supervised fine-tuning teaches a model to imitate example answers. But for most questions it is far easier for a person to say which of two answers is better than to write the perfect answer.
- This step shows how models learn from such comparisons: the classic route with a reward model and reinforcement learning (RLHF), and the shortcut most open models use today (DPO).
- Afterwards the learner can describe how a chat assistant was trained after SFT, explain why the training must keep the model close to where it started, and compute the DPO loss for a pair.

# Core

Reinforcement learning trains an agent (the language model, also called
the policy) to choose actions (the next tokens, together an answer) that
earn a high reward. For language the reward comes from people: they compare
two answers to the same prompt and pick the better one. RLHF first trains a
reward model to predict these preferences, then optimises the language
model to produce answers the reward model scores highly, with a penalty for
moving too far from the SFT model, because the reward model can be fooled
by answers unlike anything it was trained on (reward hacking). Direct
preference optimisation skips the separate reward model and the RL loop: it
raises the probability of the preferred answer and lowers that of the
rejected one, both relative to a frozen reference model.

# Key facts

- **RL terms for an LLM**: agent / policy = the language model; state = prompt plus the tokens written so far; action = the next token (or the whole answer); reward = a score for the finished answer; environment = the prompt source and whoever gives the reward.
- **Preference data**: prompt + chosen answer + rejected answer. Comparing is faster and more consistent for people than writing ideal answers.
- **Reward model**: usually the SFT model with a scalar head; trained so the chosen answer scores higher: P(chosen ≻ rejected) = σ(r_chosen − r_rejected) (Bradley–Terry model). Scores 1.5 vs 0.5 → σ(1) ≈ 0.731.
- **RLHF objective**: maximise the expected reward minus β · KL(π ‖ π_ref), a penalty for drifting from the reference (SFT) model. PPO (proximal policy optimisation) is the classic algorithm; it needs the policy, the reference model, the reward model and a value model in memory.
- **Reward hacking**: the policy finds outputs the reward model overrates (very long answers, flattery, repeating phrases). The KL penalty and a limited number of steps keep this in check.
- **InstructGPT (2022)**: labelers preferred outputs of a 1.3-billion-parameter model trained with SFT and RLHF over those of the 175-billion-parameter GPT-3.
- **DPO (2023)**: loss for a pair = −log σ(β · [(log π(y_w) − log π_ref(y_w)) − (log π(y_l) − log π_ref(y_l))]), with y_w the preferred and y_l the rejected answer. At the start (π = π_ref) the loss is log 2 ≈ 0.693. With β = 0.1 and log-ratios +2.0 (chosen) and −1.0 (rejected) the loss is −log σ(0.3) ≈ 0.554.
- DPO needs only the policy and a frozen reference model, no sampling during training and no reward model, which makes it simpler and cheaper. RLHF with online sampling can still be stronger when the reward is good. Both are implemented in the TRL library (`DPOTrainer`, PPO / online trainers).
- Human feedback can also be replaced by AI feedback (a model judges with a written set of principles) or by verifiable rewards (tests, correct final answers), the topic of the next step.

# Level: highschool

<!-- ptf:text v1 -->

How do you teach a dog to fetch? You do not show it a perfect fetch
step by step; you reward it when it does well. Over many tries it learns
which actions bring treats. That is **reinforcement learning**: an agent
tries actions, gets a reward, and changes its behaviour (its policy) to
get more reward.

For a language model, the agent is the model itself, each action is the
next token it writes, and the reward comes at the end, for the whole
answer. But who gives the treats? People. Writing a perfect answer is
hard, but saying which of two answers is better is easy. So people are
shown two answers to the same question and click the better one, many
thousands of times.

**RLHF**, reinforcement learning from human feedback, then works in two
moves. First, a separate model, the **reward model**, learns to predict
which answer people would choose; now it can give "treats" automatically,
millions of times. Second, the language model writes answers, the reward
model scores them, and the language model is nudged towards answers that
score well.

There is a catch: the reward model is only an imitation of human taste,
and it can be fooled. A model chasing points may learn to write extremely
long, flattering answers that the reward model likes but people do not,
like a student who has figured out the teacher's favourite words. So the
training also adds a penalty for drifting too far from how the model
wrote before.

**DPO**, direct preference optimisation, is a shortcut many teams use
today. It skips the reward model: for each pair it simply makes the
preferred answer a bit more likely and the rejected one a bit less likely,
measured against a frozen copy of the starting model. Simpler, cheaper,
and often just as good.

# Level: college

<!-- ptf:text v1 -->

Frame generation as an RL problem before reading on: what are the state,
the action space, the episode and the reward for an assistant answering a
prompt?

State s_t = (prompt x, y_{<t}); action a_t = y_t from a vocabulary of
~10⁵ tokens; the episode ends at EOS; the policy is π_θ(y_t | s_t), the
language model itself; the reward is typically sparse, given once for
the complete answer. Policy-gradient methods raise the log-probability
of tokens in answers with above-average reward.

**Reward modelling.** From pairs (x, y_w, y_l), train r_φ with the
Bradley–Terry likelihood: minimise −log σ(r_φ(x, y_w) − r_φ(x, y_l)).
Only differences of r are identified, so rewards are often normalised.

**RL step.** Maximise E_{y ~ π_θ}[r_φ(x, y)] − β · KL(π_θ(· | x) ‖ π_ref(· | x)).
The KL term keeps the policy in the region where r_φ was trained and
preserves fluency; without it, optimisation finds adversarial outputs
(reward hacking: length, sycophancy, repeated phrases). PPO implements
this with clipped policy updates and a learned value function for
advantages, so four models are involved (policy, reference, reward,
value), plus online sampling, which makes it expensive and finicky.

**DPO.** The KL-regularised objective has the closed-form optimum
π*(y | x) ∝ π_ref(y | x) · exp(r(x, y) / β). Solving for r and inserting it
into the Bradley–Terry loss eliminates the reward model:
L = −log σ(β [Δ_w − Δ_l]) with Δ = log π_θ(y | x) − log π_ref(y | x).
At initialisation Δ_w = Δ_l = 0 and L = log 2; with β = 0.1, Δ_w = 2,
Δ_l = −1, L = −log σ(0.3) ≈ 0.554. Training is offline, supervised-style,
on a fixed preference set; it is cheap and stable. Weaknesses: it can
lower the likelihood of both answers (only the margin matters), it
overfits small preference sets, and it lacks the exploration of online
RL. Variants (IPO, KTO, ORPO, online/iterative DPO) address these.

# Misconceptions

- **rl-needs-labels**: Preference training needs someone to write the ideal answer → it only needs comparisons of two answers; writing ideal answers is what SFT needs.
- **reward-is-truth**: A high reward-model score means a good answer → the reward model is an imperfect proxy; optimising it too hard leads to reward hacking.
- **no-kl-needed**: The model should simply maximise the reward → without the penalty for drifting from the reference model, it learns degenerate outputs that fool the reward model.
- **dpo-has-reward-model**: DPO also trains a separate reward model first → it optimises the policy directly on the pairs; the reward is implicit in the probability ratios.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "dog-and-model", "level": "highschool", "purpose": "check",
  "objectives": ["rl-terms"],
  "question": "In reinforcement learning for a chat model, what is the \"action\"?",
  "options": [
    { "text": "Writing the next token (and so, step by step, the whole answer)", "correct": true, "feedback": "Right. The model is the agent; its tokens are its actions." },
    { "text": "The reward people give", "correct": false, "feedback": "The reward is the feedback, not the action." },
    { "text": "The user's question", "correct": false, "feedback": "The question is the situation (state) the model starts from." }
  ],
  "explanation": "Agent/policy = model, state = prompt and text so far, action = next token, reward = score for the answer."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "why-compare", "level": "highschool", "purpose": "check",
  "objectives": ["rlhf-pipeline"], "misconception": "rl-needs-labels",
  "question": "Why do people compare two answers instead of writing the perfect answer themselves?",
  "options": [
    { "text": "Picking the better of two is much faster and easier than writing an ideal answer", "correct": true, "feedback": "Right. Comparisons scale to many thousands of examples." },
    { "text": "People are not allowed to write answers", "correct": false, "feedback": "They do write answers for SFT; comparisons are simply cheaper for this step." },
    { "text": "Because models cannot learn from written answers", "correct": false, "feedback": "They can (that is SFT); comparisons add information about quality." }
  ],
  "explanation": "Preference data is cheap to collect and captures what people like better."
}
```

```ptf-question
{
  "kind": "ordering", "id": "rlhf-order", "level": "highschool", "purpose": "check",
  "objectives": ["rlhf-pipeline"],
  "instruction": "Put the stages of training a chat assistant with RLHF in order.",
  "items": [
    "Pretrain the model on a huge amount of text",
    "Fine-tune it on example conversations (SFT)",
    "Collect people's choices between pairs of answers",
    "Train a reward model to predict those choices",
    "Optimise the chat model against the reward model, with a penalty for drifting"
  ],
  "explanation": "Pretraining gives language, SFT the conversation format, preference training the polish."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "reward-hacking", "level": "highschool", "purpose": "check",
  "objectives": ["rlhf-pipeline"], "misconception": "no-kl-needed",
  "question": "After long RLHF training without any penalty, the model writes extremely long, flattering answers. What happened?",
  "options": [
    { "text": "It found a way to get high scores from the reward model that people do not actually like", "correct": true, "feedback": "Right. That is reward hacking; the drift penalty is there to prevent it." },
    { "text": "People really prefer very long answers", "correct": false, "feedback": "Real people found them worse; the reward model was fooled." },
    { "text": "The reward model was switched off", "correct": false, "feedback": "It was on; the model learned to exploit it." }
  ],
  "explanation": "The reward model is an imitation of human taste and can be fooled."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "dpo-simple", "level": "highschool", "purpose": "check",
  "objectives": ["dpo"], "misconception": "dpo-has-reward-model",
  "question": "What does DPO do with a pair of answers where people preferred answer A over answer B?",
  "options": [
    { "text": "Make A a bit more likely and B a bit less likely, compared with a frozen copy of the starting model", "correct": true, "feedback": "Right. No separate reward model is needed." },
    { "text": "Train a reward model first, then use reinforcement learning", "correct": false, "feedback": "That is RLHF; DPO skips both." },
    { "text": "Delete answer B from the model", "correct": false, "feedback": "Models do not store answers; probabilities are adjusted." }
  ],
  "explanation": "DPO turns preference pairs directly into a training signal."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "reward-prob", "level": "highschool", "purpose": "check",
  "objectives": ["rlhf-pipeline"],
  "question": "A reward model scores answer A with 2.0 and answer B with 0.0. It predicts that people prefer A with probability 1 / (1 + e^(−(2.0 − 0.0))). About what percent is that?",
  "answer": 88.1, "tolerance": 1, "unit": "%",
  "explanation": "1 / (1 + e^−2) = 1 / 1.135 ≈ 0.881. A score difference of 2 means a strong, but not certain, preference."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "rl-mapping", "level": "college", "purpose": "check",
  "objectives": ["rl-terms"],
  "question": "Which mappings of RL concepts to LLM training are right? (Several can be right.)",
  "options": [
    { "text": "Policy π_θ(y_t | x, y_{<t}) is the language model itself", "correct": true, "feedback": "Right." },
    { "text": "The reward is usually sparse: one score for the complete answer", "correct": true, "feedback": "Right. Token-level credit has to be inferred." },
    { "text": "The action space is the vocabulary", "correct": true, "feedback": "Right. Each step picks one of ~10⁵ tokens." },
    { "text": "The environment changes the model's weights after every token", "correct": false, "feedback": "Weights change only in training updates after whole batches of episodes." }
  ],
  "explanation": "Text generation is an episodic RL problem with a huge discrete action space and sparse reward."
}
```

```ptf-question
{
  "kind": "free_text", "id": "why-kl", "level": "college", "purpose": "check",
  "objectives": ["rlhf-pipeline"], "misconception": "reward-is-truth",
  "question": "Write down the KL-regularised RLHF objective and explain two concrete things that go wrong if β = 0.",
  "rubric": [
    "max E[r_φ(x, y)] − β KL(π_θ(·|x) ‖ π_ref(·|x)).",
    "Reward hacking: outputs outside r_φ's training distribution that it overrates (length, flattery, repetition).",
    "Loss of fluency/diversity or mode collapse; drifting away from SFT behaviour and language quality."
  ],
  "sample_answer": "Maximise E_y~π[r(x, y)] − β · KL(π ‖ π_ref). With β = 0 the policy is free to exploit the reward model, for example by writing ever longer or more flattering answers it overrates, and it can drift into degenerate, repetitive or less fluent text because nothing anchors it to the SFT model.",
  "explanation": "The KL term keeps optimisation where the proxy reward is trustworthy."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "dpo-loss", "level": "college", "purpose": "check",
  "objectives": ["dpo"], "misconception": "dpo-has-reward-model",
  "title": "DPO loss for one preference pair",
  "intro": "β = 0.1. Log-probability ratios against the reference: chosen Δ_w = log π(y_w) − log π_ref(y_w) = 2.0, rejected Δ_l = −1.0. Round to three decimals.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Margin", "β · (Δ_w − Δ_l)", "0.3"],
    ["σ(margin)", "1 / (1 + e^−0.3)", "0.574"],
    ["Loss at the start (Δ_w = Δ_l = 0)", "−log σ(0)", "0.693"]
  ],
  "result": { "label": "Loss for this pair", "value": "0.554" },
  "explanation": "−log σ(0.3) ≈ 0.554, lower than log 2 at the start: the policy already favours the chosen answer relative to the reference. The implicit reward of an answer is β · Δ."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "dpo-vs-ppo", "level": "college", "purpose": "check",
  "objectives": ["dpo", "rlhf-pipeline"],
  "question": "Which statements comparing DPO with PPO-based RLHF are right? (Several can be right.)",
  "options": [
    { "text": "DPO needs only the policy and a frozen reference in memory; PPO also needs a reward and a value model", "correct": true, "feedback": "Right. That is a large part of DPO's appeal." },
    { "text": "DPO trains offline on a fixed preference set; PPO samples new answers during training", "correct": true, "feedback": "Right. Online sampling gives PPO exploration at a cost." },
    { "text": "DPO can lower the probability of both answers as long as the margin grows", "correct": true, "feedback": "Right. Only the difference of log-ratios enters the loss." },
    { "text": "DPO removes the need for a reference model", "correct": false, "feedback": "The reference model appears in every log-ratio." }
  ],
  "explanation": "DPO is a supervised-style loss derived from the same KL-regularised objective."
}
```

# Examples

- **Dog training**: rewards for good behaviour instead of a demonstration of every movement. Breaks down: the model's "treats" come from a learned reward model, which can be fooled.
- **Taste test**: people choose between two cakes far more easily than they could write the perfect recipe; preference data uses the same asymmetry.

# Tutor notes

- If the learner took llm-basics, recall the three stages from the babbler-to-assistant step in one sentence; this step zooms into the third.
- Highschool: the dog analogy and reward hacking carry the step; DPO in one paragraph without formulas.
- College: derive the DPO loss only if the learner wants it; computing one pair's loss is the required part.

# Further reading

- [Hugging Face LLM Course, chapter 12.2: Reinforcement learning and its role in LLMs](https://huggingface.co/learn/llm-course/chapter12/2): RL vocabulary, RLHF and why GRPO matters (highschool, college).
- [Rafailov et al., Direct Preference Optimization](https://arxiv.org/abs/2305.18290): the DPO paper with the derivation (expert).

# Sources

Grounding: [^hf-llm-course-12-2], [^rafailov-2023-dpo]. Text, examples and questions are original.

[^hf-llm-course-12-2]: Hugging Face, LLM Course, chapter 12, section 2 ("Introduction to Reinforcement Learning and its Role in LLMs"), https://huggingface.co/learn/llm-course, Apache License 2.0.
[^rafailov-2023-dpo]: Rafael Rafailov et al., "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", 2023, arXiv:2305.18290.
