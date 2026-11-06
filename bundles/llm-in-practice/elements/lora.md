---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/lora
title: LoRA - fine-tuning with small low-rank adapters
description: Low-rank adaptation freezes the pretrained weights and trains only two thin matrices per layer whose product is the change; it cuts trainable parameters by orders of magnitude, fits fine-tuning onto one GPU, and the adapter can be merged or swapped.
lang: en
levels: [highschool, college]
objectives:
  - id: low-rank-idea
    text: Explain the LoRA idea - freeze the weight matrix W and learn its change as the product B · A of two thin matrices of rank r, scaled by α / r.
  - id: count-params
    text: Compute the number of trainable parameters LoRA adds for a layer and a model, and compare it with full fine-tuning.
  - id: use-adapters
    text: Choose rank, scaling and target layers, and explain merging, swapping adapters and why LoRA (and QLoRA) saves memory.
tags: [llm, fine-tuning, lora, peft, adapters, qlora, low-rank]
about:
  - wikidata: Q130145067
    label: Low-Rank Adaptation
  - wikidata: Q6692777
    label: low-rank approximation
requires:
  - ptf:el/llm-in-practice/supervised-fine-tuning
leads_to:
  - ptf:el/llm-in-practice/llm-evaluation
duration_min: { highschool: 15, college: 25 }
figures:
  - id: lora-update
    objectives: [low-rank-idea, count-params]
    use_when: before the learner computes parameter counts, to show that the frozen W and the thin B and A run side by side
sources:
  - id: hf-llm-course-11-4
    resource: https://huggingface.co/learn/llm-course/chapter11/4
    title: "Hugging Face LLM Course, chapter 11, section 4: LoRA (Low-Rank Adaptation)"
    author: Hugging Face and contributors
    license: Apache-2.0
  - id: hu-2021-lora
    resource: https://arxiv.org/abs/2106.09685
    title: "Hu et al., LoRA: Low-Rank Adaptation of Large Language Models (2021)"
generated: { by: claude/opus, at: 2026-11-06T01:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Fully fine-tuning a 7-billion-parameter model needs more than a hundred gigabytes of GPU memory and stores a complete 14-gigabyte copy per task. Most people do not have that.
- LoRA trains a tiny add-on instead, often well under one percent of the parameters, and leaves the original model untouched.
- Afterwards the learner can explain why a change to a huge matrix can be described by two thin ones, compute how many parameters an adapter has, and choose sensible LoRA settings.

# Core

A transformer's linear layers multiply by large weight matrices W. LoRA
freezes W and adds a parallel path: the input is multiplied by a thin
matrix A (shrinking it to r numbers) and then by a thin matrix B
(expanding back), scaled by α / r. Only A and B are trained, so the
learned change ΔW = (α / r) · B · A has rank at most r. Because the change
needed to adapt a pretrained model to a task is usually low-dimensional, a
small r such as 8 or 16 works well. B starts at zero, so training starts
exactly from the pretrained model. After training the adapter can be
merged into W (no extra cost at inference) or kept separate, so one base
model can serve many tasks by swapping small adapters.

# Key facts

- For W of size d × k: A is r × k, B is d × r. Trainable parameters per adapted matrix r · (d + k) instead of d · k.
- Example: d = k = 4,096, r = 8: 8 · 8,192 = 65,536 trainable parameters instead of 16,777,216, about 0.39 %.
- Whole model: adapting the query and value projections (4,096 × 4,096) in all 32 layers with r = 8 gives 32 · 2 · 65,536 = 4,194,304 ≈ 4.2 million parameters, about 0.06 % of 7 billion.
- **Initialisation**: A random, B = 0, so ΔW = 0 at the start.
- **Scaling**: the update is multiplied by α / r; with α fixed, changing r does not change the size of the update much, so the learning rate need not be retuned. Common choices: r = 4 to 32 (start small, for example 8, and raise it if the adapter underfits; 64 for hard tasks), α often 2r (for example r = 16, α = 32), dropout 0.05 to 0.1.
- **Target modules**: the original paper adapted the attention query and value projections; adapting all linear layers (attention and MLP) usually gives better results at somewhat more parameters.
- **Memory**: full fine-tuning with Adam in mixed precision needs about 16 bytes per parameter (weights, gradients and two optimizer states): about 112 GB for 7 billion parameters. With LoRA the frozen base needs only its 16-bit weights (14 GB) plus small adapter states.
- **QLoRA**: the frozen base is stored in 4 bits (about 0.5 bytes per parameter, 3.5 GB for 7 billion) and the adapters are trained in 16 bits, so a 7B model can be fine-tuned on one consumer GPU.
- **Merging**: W' = W + (α / r) · B · A gives an ordinary model without extra inference latency. Keeping adapters separate lets one base model serve many tasks; each adapter file is a few megabytes.
- In the LoRA paper (2021), adapting GPT-3 175B reduced trainable parameters by about 10,000 times and GPU memory by about 3 times, with quality on par with full fine-tuning.
- The PEFT library implements LoRA (`LoraConfig`, `get_peft_model`, `merge_and_unload`); TRL's `SFTTrainer` accepts a LoRA configuration.

# Level: highschool

<!-- ptf:text v1 -->

Think of a huge spreadsheet of 4,096 rows and 4,096 columns: almost 17
million numbers. A language model has hundreds of such tables. Normal
fine-tuning nudges every single number, which needs a lot of memory and
gives you a whole new copy of the model for every task.

Now suppose the change you want is simple, say "answer more politely".
Such a change does not need 17 million independent numbers. It can be
described by a few "directions": a short list of patterns to look for in
the input, and for each pattern how to adjust the output. That is the
LoRA idea.

LoRA leaves the big table W frozen. Next to it, it adds two thin tables:
A squeezes the input down to just r numbers (say 8), and B blows those 8
numbers back up to full size. The model's output becomes "what W says"
plus "what B and A add". Only A and B are trained. With r = 8 they have
8 × 4,096 + 4,096 × 8 = 65,536 numbers together, less than half a percent
of the big table.

At the start B is all zeros, so the add-on adds nothing and the model
behaves exactly as before. During training the add-on learns the change.

Afterwards you have two options. You can add the change into the big
table once (merging), and the model is as fast as before. Or you keep the
small add-on as a separate file of a few megabytes: one base model can
then have a "polite customer service" add-on, a "legal German" add-on and
a "JSON output" add-on, swapped as needed.

Because the big table is frozen, it can even be stored in a squeezed
4-bit form during training (QLoRA), so fine-tuning a 7-billion-parameter
model fits on one gaming graphics card.

# Level: college

<!-- ptf:text v1 -->

Count before reading on: a 4,096 × 4,096 matrix has 16.8 million entries.
How many numbers does a rank-8 matrix of the same size need, written as a
product of two factors?

LoRA reparametrises a frozen pretrained linear map h = W x as
h = W x + (α / r) · B A x with A ∈ ℝ^{r × k}, B ∈ ℝ^{d × r}, r ≪ min(d, k).
Trainable parameters per matrix: r(d + k); for d = k = 4,096, r = 8:
65,536 (0.39 %). Over 32 layers with LoRA on W_q and W_v: 4.19 million.
The hypothesis behind it is that fine-tuning updates have low intrinsic
rank: pretrained models already contain the needed features, and
adaptation recombines them in few directions.

Initialisation A ~ random, B = 0 makes ΔW = 0 at step 0, so training
starts at the pretrained function. The α / r scaling decouples the update
magnitude from r, which keeps the effective learning rate stable when
sweeping r; rsLoRA argues for α / √r at large ranks.

Memory accounting for Adam in mixed precision: ~16 bytes per trainable
parameter (fp32 master weight 4, gradient 4, two moments 8; 16-bit
working copies on top), so full fine-tuning of 7B needs roughly 112 GB
before activations. LoRA keeps the base in bf16 (14 GB) with no gradients
or optimizer states for it; optimizer memory scales with the adapter
only. QLoRA quantises the frozen base to 4-bit NormalFloat (≈ 3.5 GB for
7B) and backpropagates through it into bf16 adapters, adding paged
optimizers for memory spikes. Activations still scale with batch and
sequence length; gradient checkpointing trades compute for that memory.

Deployment: W' = W + (α / r) B A merges the adapter (no latency, but one
full model per task); unmerged adapters (MBs each) allow multi-tenant
serving with one base model. Choice of targets matters more than r in
practice: all linear layers with r = 16 usually beats attention-only with
r = 64. LoRA can underperform full fine-tuning when the task needs large
changes (for example continued pretraining on a new language).

# Misconceptions

- **lora-smaller-model**: LoRA makes the model smaller → the base model stays the same size; LoRA makes the trainable part (and the saved task file) small. QLoRA additionally stores the frozen base in 4 bits.
- **lora-slower-inference**: LoRA always slows down inference → after merging the adapter into W there is no extra cost.
- **lora-changes-base**: Training LoRA overwrites the pretrained weights → W stays frozen; the change lives in A and B until you merge it.
- **higher-rank-always-better**: A larger rank r is always better → small ranks are usually enough; target layers, data and learning rate matter more.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "what-trained", "level": "highschool", "purpose": "check",
  "objectives": ["low-rank-idea"], "misconception": "lora-changes-base",
  "question": "During LoRA fine-tuning, which numbers change?",
  "options": [
    { "text": "Only the two small add-on tables A and B; the big table W stays frozen", "correct": true, "feedback": "Right. The pretrained model is untouched." },
    { "text": "All numbers of the model, but faster", "correct": false, "feedback": "That is full fine-tuning." },
    { "text": "Only the big table W, in fewer steps", "correct": false, "feedback": "W is frozen in LoRA." }
  ],
  "explanation": "LoRA trains a small parallel path B · A next to each frozen weight matrix."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "b-zero", "level": "highschool", "purpose": "check",
  "objectives": ["low-rank-idea"],
  "question": "At the start of LoRA training, B is filled with zeros. Why?",
  "options": [
    { "text": "So the add-on adds nothing at first and the model starts exactly as the pretrained one", "correct": true, "feedback": "Right. Training then learns the change from there." },
    { "text": "So the model forgets what it learned before", "correct": false, "feedback": "The opposite: it keeps the pretrained behaviour at the start." },
    { "text": "Zeros make training impossible, which is a known bug", "correct": false, "feedback": "A is random, so the gradients for B are not zero and training works." }
  ],
  "explanation": "B · A = 0 at step 0; the pretrained model is the starting point."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "count-hs", "level": "highschool", "purpose": "check",
  "objectives": ["count-params"], "misconception": "lora-smaller-model",
  "question": "A table has 1,000 rows and 1,000 columns. LoRA with r = 4 adds A (4 × 1,000) and B (1,000 × 4). How many numbers are trained?",
  "answer": 8000, "tolerance": 0, "unit": "numbers",
  "explanation": "4 · 1,000 + 1,000 · 4 = 8,000, instead of 1,000,000 for the full table: 0.8 %."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "swap-adapters", "level": "highschool", "purpose": "check",
  "objectives": ["use-adapters"], "misconception": "lora-slower-inference",
  "question": "A company has one base model and needs it for customer service, legal texts and JSON output. What does LoRA make possible?",
  "options": [
    { "text": "Train three small adapters of a few megabytes and swap them on the same base model", "correct": true, "feedback": "Right. One big model, many small task add-ons." },
    { "text": "Nothing; each task needs a full copy of the model", "correct": false, "feedback": "That is the full fine-tuning situation LoRA avoids." },
    { "text": "Merge all three into one model that does everything perfectly", "correct": false, "feedback": "Adapters can be merged, but merging three different tasks does not guarantee all three work." }
  ],
  "explanation": "Adapters are small, separate files; they can be swapped or merged as needed."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "qlora-why", "level": "highschool", "purpose": "check",
  "objectives": ["use-adapters"], "misconception": "lora-smaller-model",
  "question": "Why can QLoRA fine-tune a 7-billion-parameter model on one gaming graphics card?",
  "options": [
    { "text": "The frozen base is stored squeezed into 4 bits per number, and only the small adapters are trained", "correct": true, "feedback": "Right. About 3.5 GB for the base plus small adapters." },
    { "text": "It deletes most layers of the model", "correct": false, "feedback": "All layers stay; they are stored more compactly." },
    { "text": "It trains on fewer examples", "correct": false, "feedback": "The data size is not what saves the memory." }
  ],
  "explanation": "Frozen weights need no gradients or optimizer states, and 4-bit storage shrinks them further."
}
```

```ptf-question
{
  "kind": "calculation_steps", "id": "model-adapter", "level": "college", "purpose": "check",
  "objectives": ["count-params"],
  "title": "Trainable parameters of a LoRA adapter",
  "intro": "A 7-billion-parameter model has 32 layers. LoRA with r = 8 is applied to W_q and W_v, both 4,096 × 4,096.",
  "columns": ["Quantity", "Computation", "Value"],
  "rows": [
    ["Full matrix", "4,096 · 4,096", "16777216"],
    ["LoRA per matrix", "8 · (4,096 + 4,096)", "65536"],
    ["Share per matrix (%)", "65,536 / 16,777,216 · 100", "0.39"],
    ["LoRA for the model", "32 · 2 · 65,536", "4194304"]
  ],
  "result": { "label": "Share of the 7 billion parameters (%)", "value": "0.06" },
  "explanation": "About 4.2 million trainable parameters, 0.06 % of the model. The adapter file in 16-bit is about 8 MB."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "full-ft-memory", "level": "college", "purpose": "check",
  "objectives": ["use-adapters"],
  "question": "Full fine-tuning with Adam in mixed precision needs about 16 bytes per parameter for weights, gradients and optimizer states. About how many GB is that for a 7-billion-parameter model, before activations?",
  "answer": 112, "tolerance": 5, "unit": "GB",
  "explanation": "7 · 10⁹ · 16 bytes = 112 GB. With LoRA the frozen base needs only its 16-bit weights (14 GB), with QLoRA about 3.5 GB, plus small adapter states."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "alpha-r", "level": "college", "purpose": "check",
  "objectives": ["use-adapters", "low-rank-idea"], "misconception": "higher-rank-always-better",
  "question": "Which statements about LoRA hyperparameters are right? (Several can be right.)",
  "options": [
    { "text": "The update is scaled by α / r, so increasing r with α fixed does not blow up the update size", "correct": true, "feedback": "Right. That keeps the learning rate usable across ranks." },
    { "text": "Adapting all linear layers often helps more than raising r on attention projections only", "correct": true, "feedback": "Right. Target choice usually matters more than rank." },
    { "text": "r should be close to the hidden size to match full fine-tuning", "correct": false, "feedback": "Then LoRA would lose its savings; small r usually suffices." },
    { "text": "B and A should both start random so training is faster", "correct": false, "feedback": "Then ΔW ≠ 0 at the start and the pretrained function is disturbed." }
  ],
  "explanation": "Small r, sensible α, broad target modules, B = 0 at initialisation."
}
```

```ptf-question
{
  "kind": "free_text", "id": "merge-or-not", "level": "college", "purpose": "check",
  "objectives": ["use-adapters"], "misconception": "lora-slower-inference",
  "question": "Explain what merging a LoRA adapter does mathematically, one advantage of merging and one advantage of keeping adapters unmerged. When might LoRA fall short of full fine-tuning?",
  "rubric": [
    "Merging computes W' = W + (α / r) B A once; the model has the original architecture.",
    "Merged: no extra latency or code at inference.",
    "Unmerged: one base serves many tasks; adapters are tiny and swappable; base stays reusable.",
    "Falls short when the task needs large, high-rank changes (e.g. new language, continued pretraining) or when r/targets are too limited."
  ],
  "sample_answer": "Merging adds the scaled product B A into W, giving an ordinary model with the same speed as before. Unmerged adapters keep one shared base and swap a few megabytes per task. LoRA can fall short when the update needs to be large and high-rank, such as teaching a model a new language through continued pretraining.",
  "explanation": "LoRA is a low-rank restriction on the update; it is ideal when adaptation is a small change."
}
```

# Examples

- **Clip-on lens**: instead of grinding a new camera lens (full fine-tuning), you clip a thin correction lens in front (adapter); you can take it off or swap it. Breaks down: a merged adapter is ground into the lens.
- **Low rank in a spreadsheet**: a table where every row is a multiple of one pattern row needs only that pattern and one factor per row: rank 1.

# Tutor notes

- Show the figure `lora-update` before any formula; let the learner count the numbers in A and B themselves.
- At highschool level stay with "big frozen table plus two thin trainable tables"; skip the α / r discussion.
- Learners with a GPU can run QLoRA with PEFT and TRL on their SFT data from the previous step; with a 1-billion-parameter model it also works on a laptop CPU, slowly.

# Further reading

- [Hugging Face LLM Course, chapter 11.4: LoRA](https://huggingface.co/learn/llm-course/chapter11/4): configuring LoRA with PEFT and TRL, and merging adapters in code (college).
- [Hu et al., LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685): the original paper with experiments on GPT-3 (expert).

# Sources

Grounding: [^hf-llm-course-11-4], [^hu-2021-lora]. Text, examples and questions are original.

[^hf-llm-course-11-4]: Hugging Face, LLM Course, chapter 11, section 4 ("LoRA (Low-Rank Adaptation)"), https://huggingface.co/learn/llm-course, Apache License 2.0.
[^hu-2021-lora]: Edward J. Hu et al., "LoRA: Low-Rank Adaptation of Large Language Models", 2021, arXiv:2106.09685.
