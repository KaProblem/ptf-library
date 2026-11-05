---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/llm-in-practice/chat-templates
title: Chat templates - how a conversation becomes text
description: A chat model still only continues text. A chat template turns the list of system, user and assistant messages into one string with special tokens that mark who speaks, and ends it so the model answers as the assistant.
lang: en
levels: [highschool, college]
objectives:
  - id: base-vs-instruct
    text: Explain the difference between a base model and an instruction-tuned chat model and predict what each does with a question.
  - id: apply-template
    text: Turn a conversation of system, user and assistant messages into the text a model expects, including role markers, end markers and the generation prompt.
  - id: template-pitfalls
    text: Explain why a wrong or missing template degrades answers, why training and use must share a template, and why long conversations grow expensive.
tags: [llm, chat, chat-template, instruct, special-tokens, prompt-format]
about:
  - wikidata: Q870780
    label: chatbot
requires:
  - ptf:el/llm-in-practice/subword-tokenization
  - ptf:el/llm-in-practice/pretraining-and-transfer
leads_to:
  - ptf:el/llm-in-practice/supervised-fine-tuning
duration_min: { highschool: 15, college: 20 }
simulators:
  - ref: ptf:sim/babbler-to-assistant@^1.0.0
    station: document-completer
    levels: [highschool, college]
    role: explore
    use_when: the learner should see a base model continue a question with more questions instead of answering
sources:
  - id: hf-llm-course-11-2
    resource: https://huggingface.co/learn/llm-course/chapter11/2
    title: "Hugging Face LLM Course, chapter 11, section 2: Chat templates"
    author: Hugging Face and contributors
    license: Apache-2.0
generated: { by: claude/opus, at: 2026-11-06T00:40:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- When you chat with an assistant, it looks like a conversation. Under the hood the model still sees one long text and continues it. Something has to turn the conversation into that text.
- This step shows the format: who says what, where a message ends, and where the model's turn begins. That format is called the chat template.
- Afterwards the learner can write out the text a model actually sees for a short conversation, explain why the same question gets a better answer with the right template, and why every message makes later answers more expensive.

# Core

A base model only continues text: given a question, it may answer, but
equally may continue with more questions. An instruction-tuned (chat) model
was fine-tuned on conversations written in a fixed format, so it has
learned to answer when a text ends with "now the assistant speaks". A chat
template is that format: it wraps each message in special tokens that mark
its role (system, user, assistant) and its end, and adds the opening of the
assistant's turn as the generation prompt. Every model family has its own
template, stored with its tokenizer; using another template or none makes
the model see an unfamiliar text, and answers get worse. Each turn sends the
whole conversation again, so long chats cost ever more tokens.

# Key facts

- **Base model**: pretrained only; continues any text. **Instruct / chat model**: base model fine-tuned on conversations (and usually preference training); expects the chat format.
- **Roles**: `system` (instructions and persona for the whole chat), `user`, `assistant`; many templates also have a role for tool results.
- **Messages** are given as a list such as `[{"role": "system", "content": "…"}, {"role": "user", "content": "…"}]`.
- **ChatML** style (used for example by Qwen and SmolLM2): each message is `<|im_start|>role` + newline + content + `<|im_end|>` + newline. With the generation prompt the text ends in `<|im_start|>assistant` + newline.
- **Llama 3** style: `<|begin_of_text|>`, then per message `<|start_header_id|>role<|end_header_id|>`, two newlines, content, `<|eot_id|>`.
- In the Transformers library `tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)` produces the string; the template itself is a Jinja template stored in the tokenizer configuration.
- `add_generation_prompt=True` appends the assistant header so the model answers instead of writing another user message. For training on complete conversations it is left off.
- The model stops when it produces the end marker of its turn (`<|im_end|>`, `<|eot_id|>`), which serves as the stop token.
- **Same template for training and use**: a model fine-tuned with one template and prompted with another sees text unlike its training data.
- **Cost of multi-turn chat**: every turn resends the system prompt and the whole history. With a 200-token system prompt and turns of 60 user + 140 assistant tokens, the context after 10 turns is 200 + 10 · 200 = 2,200 tokens.

# Level: highschool

<!-- ptf:text v1 -->

Type "What is the capital of France?" into a model that was only
pretrained on web text. A likely continuation is "What is the capital
of Germany? What is the capital of Italy?", because on the web such
questions often come in lists, like a quiz page. The model is not being
rude; it just continues text.

Chat models are the same kind of model, trained further on thousands of
conversations that all look the same way. In that training text, every
message is wrapped in markers that say who speaks and where the message
ends, for example:

```
<|im_start|>system
You are a helpful tutor.<|im_end|>
<|im_start|>user
What is the capital of France?<|im_end|>
<|im_start|>assistant
```

The model learned: when the text ends with "assistant", the next thing is
the assistant's answer, and when the answer is done, I write
`<|im_end|>`. That end marker is how the program knows the answer is
finished. These wrappers are the **chat template**. The **system** message
sets the rules for the whole chat; **user** and **assistant** take turns.

Each model family has its own markers. If you feed a model the wrong
ones, or none, it sees a text that looks unlike everything it practised
on, and its answers get worse, a bit like a quiz show contestant who is
asked questions in a strange format.

One more surprise: the model has no memory between your messages. Each
time you send a message, the whole conversation so far is wrapped and
sent again. A long chat is therefore long text for the model to read, every
single time.

# Level: college

<!-- ptf:text v1 -->

Render a two-message conversation with `apply_chat_template(…,
tokenize=False, add_generation_prompt=True)` for two model families and
print both strings: the content is identical, the scaffolding is not.

A chat model is p(next token | formatted history). Supervised fine-tuning
on conversations in one serialisation teaches it role semantics (system
instructions persist, user turns ask, assistant turns answer), the turn
boundary (`<|im_end|>`, `<|eot_id|>` act as EOS) and conditional
behaviour on the generation prompt. The template is part of the model's
interface just like its tokenizer: it lives as a Jinja template in
`tokenizer_config.json`, handles system-message placement (some
templates fold it into the first user turn), tool definitions and tool
results, and sometimes special formatting for reasoning traces.

Failure modes:

- **No template** (raw question to an instruct model): out of
  distribution; often still works for simple prompts, degrades on
  complex ones.
- **Wrong template**: the role markers are ordinary text (or unrelated
  special tokens) for this model; it may echo markers, fail to stop, or
  ignore the system prompt.
- **Missing generation prompt**: the model may write a user turn or
  continue the previous message instead of answering.
- **Double BOS**: templates that already insert `<|begin_of_text|>`
  combined with tokenizing with `add_special_tokens=True` produce two
  BOS tokens.
- **Train/inference mismatch**: fine-tuning with one template and
  serving with another.

Statelessness has a cost: turn k sends the system prompt plus all k − 1
earlier turns plus the new user message. With a 200-token system prompt
and 60 + 140 tokens per turn, ten turns send 11,600 prompt tokens in
total, quadratic growth in the number of turns, which is why servers
cache the KV state of shared prefixes and why long chats get summarised
or truncated.

# Misconceptions

- **chat-is-different-model**: A chat model works completely differently from a text-completion model → it is the same kind of model, fine-tuned to continue a conversation format with the assistant's answer.
- **template-optional**: The template is just cosmetic formatting → it is part of the model's interface; the wrong one degrades answers or breaks stopping.
- **model-remembers-chat**: The model remembers earlier messages between requests → it is stateless; the whole history is sent again every turn.
- **system-prompt-magic**: The system message is a separate channel the model must obey → it is text in the prompt that the model was trained to weight strongly, not a hard rule.

# Questions

```ptf-question
{
  "kind": "multiple_choice", "id": "base-model-question", "level": "highschool", "purpose": "warmup",
  "misconception": "chat-is-different-model",
  "question": "A model that was only pretrained on web text gets \"What is the capital of France?\". What might it write?",
  "options": [
    { "text": "\"What is the capital of Germany? What is the capital of Italy?\"", "correct": true, "feedback": "Possible! It continues text, and quiz pages list questions." },
    { "text": "Always exactly \"Paris.\"", "correct": false, "feedback": "It might answer, but nothing makes it stop after one answer." },
    { "text": "An error, because it cannot read questions", "correct": false, "feedback": "It reads any text and continues it." }
  ],
  "explanation": "A base model continues text; answering is something a chat model learns later."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "base-vs-chat", "level": "highschool", "purpose": "check",
  "objectives": ["base-vs-instruct"], "misconception": "chat-is-different-model",
  "question": "What makes a chat model answer questions instead of just continuing the text?",
  "options": [
    { "text": "It was trained further on many conversations in a fixed format, so it learned to answer when it is the assistant's turn", "correct": true, "feedback": "Right. Same kind of model, extra training on conversations." },
    { "text": "It is a completely different kind of program with a built-in answer database", "correct": false, "feedback": "It still predicts the next token; it just learned a conversation format." },
    { "text": "The user's question mark switches it into answer mode", "correct": false, "feedback": "No switch exists; the training on conversations does the work." }
  ],
  "explanation": "Instruction tuning teaches the model the conversation format and the role of the assistant."
}
```

```ptf-question
{
  "kind": "ordering", "id": "build-chatml", "level": "highschool", "purpose": "check",
  "objectives": ["apply-template"],
  "instruction": "Put the parts of the text the model sees in order (ChatML style), for a system message, one question, and the start of the answer.",
  "items": [
    "<|im_start|>system",
    "You are a helpful tutor.<|im_end|>",
    "<|im_start|>user",
    "What is the capital of France?<|im_end|>",
    "<|im_start|>assistant"
  ],
  "explanation": "Every message: start marker with role, content, end marker. The text ends with the assistant's start marker so the model writes the answer."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "end-marker", "level": "highschool", "purpose": "check",
  "objectives": ["apply-template"],
  "question": "How does the chat program know that the model's answer is finished?",
  "options": [
    { "text": "The model writes the end-of-message marker it learned in training, and the program stops there", "correct": true, "feedback": "Right. The end marker works as the stop token." },
    { "text": "The model always writes exactly 100 tokens", "correct": false, "feedback": "Answers have different lengths; a maximum exists only as a safety limit." },
    { "text": "The program waits until the user types again", "correct": false, "feedback": "The model's own end marker decides." }
  ],
  "explanation": "Turn-end markers like <|im_end|> or <|eot_id|> tell the program to stop generating."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "wrong-markers", "level": "highschool", "purpose": "check",
  "objectives": ["template-pitfalls"], "misconception": "template-optional",
  "question": "Someone uses the markers of model family A to chat with model B. What is likely?",
  "options": [
    { "text": "Worse answers, the model may show strange markers or not stop, because the text looks unlike its training", "correct": true, "feedback": "Right. The template is part of how the model was trained." },
    { "text": "No difference, markers are just decoration", "correct": false, "feedback": "For the model they are the signals that say who speaks and when to stop." },
    { "text": "The model refuses to answer", "correct": false, "feedback": "It usually answers, just worse." }
  ],
  "explanation": "Use the template that came with the model."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "context-after-turns", "level": "highschool", "purpose": "check",
  "objectives": ["template-pitfalls"], "misconception": "model-remembers-chat",
  "question": "A chat has a system message of 200 tokens. Every turn adds a 60-token question and a 140-token answer. How many tokens does the conversation have after 10 turns?",
  "answer": 2200, "tolerance": 0, "unit": "tokens",
  "explanation": "200 + 10 · (60 + 140) = 2,200. All of it is sent again with the next message, because the model does not remember earlier requests."
}
```

```ptf-question
{
  "kind": "cloze", "id": "apply-chat-template", "level": "college", "purpose": "check",
  "objectives": ["apply-template"],
  "text": "To get the prompt string for inference you call tokenizer.apply_chat_template(messages, tokenize={{1}}, add_generation_prompt={{2}}). For training on complete conversations, add_generation_prompt is set to {{3}}, because the assistant's reply is already part of the messages.",
  "gaps": [ { "answer": "False" }, { "answer": "True" }, { "answer": "False" } ],
  "explanation": "tokenize=False returns the string; the generation prompt appends the assistant header for inference only."
}
```

```ptf-question
{
  "kind": "multiple_choice", "id": "debug-template", "level": "college", "purpose": "check",
  "objectives": ["template-pitfalls", "apply-template"], "misconception": "template-optional",
  "question": "Which observations point to a chat-template problem? (Several can be right.)",
  "options": [
    { "text": "Outputs contain literal strings like \"<|im_start|>user\" and keep going with a fake user turn", "correct": true, "feedback": "Right. Missing generation prompt or wrong stop token / template." },
    { "text": "The model ignores the system message after fine-tuning with a different template", "correct": true, "feedback": "Right. Train/inference template mismatch." },
    { "text": "The tokenized prompt starts with two <|begin_of_text|> tokens", "correct": true, "feedback": "Right. The template already adds BOS and the tokenizer added another." },
    { "text": "The model's answers differ from run to run at temperature 0.8", "correct": false, "feedback": "That is sampling, not the template." }
  ],
  "explanation": "Template bugs show up as leaked markers, missing stops, ignored roles and duplicated special tokens."
}
```

```ptf-question
{
  "kind": "estimate_number", "id": "prompt-tokens-total", "level": "college", "purpose": "check",
  "objectives": ["template-pitfalls"], "misconception": "model-remembers-chat",
  "question": "System prompt 200 tokens; each turn a 60-token user message and a 140-token reply. Without prompt caching, how many prompt (input) tokens are sent in total over 10 turns? (Turn k sends the system prompt, all k − 1 earlier turns and the new user message.)",
  "answer": 11600, "tolerance": 0, "unit": "tokens",
  "explanation": "Turn k sends 200 + 200 · (k − 1) + 60 tokens. Summed over k = 1 … 10: 10 · 260 + 200 · 45 = 11,600. Input grows quadratically with the number of turns."
}
```

```ptf-question
{
  "kind": "free_text", "id": "base-or-instruct", "level": "college", "purpose": "check",
  "objectives": ["base-vs-instruct"], "misconception": "system-prompt-magic",
  "question": "You want to (a) continue fine-tuning on raw medical text so the model learns the domain, and (b) build a helpful assistant that follows a system prompt. Would you start from the base or the instruct checkpoint in each case, and why? Is the system prompt a guarantee of behaviour?",
  "rubric": [
    "(a) Base model: continued pretraining on raw text matches its objective; an instruct model would partly lose its chat behaviour anyway.",
    "(b) Instruct model (or base + own SFT with a chosen template): it already follows the conversation format and system prompts.",
    "System prompt is ordinary text the model learned to weight; it steers behaviour statistically, not as a hard rule."
  ],
  "sample_answer": "For domain adaptation on raw text I start from the base model, because continued next-token training on documents is exactly its objective. For the assistant I start from the instruct checkpoint and use its template, because it already learned roles and stopping. The system prompt is only text the model was trained to follow; it usually works but can be overridden by later instructions.",
  "explanation": "Base = text continuation; instruct = conversation format plus learned helpfulness."
}
```

# Examples

- **Stage script**: a play's script marks who speaks (SPEAKER:) and where a line ends; the actor (model) knows when it is their turn. Breaks down: the model writes only one role and stops at its end marker.
- **Forms with fixed fields**: a form only makes sense if everyone uses the same layout; a model trained on one layout misreads another.

# Tutor notes

- Start with the base-model warm-up; the "continues with more questions" surprise motivates the whole step.
- Write out the ChatML text together; learners understand templates once they see that a conversation is just one string with markers.
- The `document-completer` station of the babbler-to-assistant simulator shows the base-model behaviour; open it if the learner doubts that a model would not just answer.

# Further reading

- [Hugging Face LLM Course, chapter 11.2: Chat templates](https://huggingface.co/learn/llm-course/chapter11/2): base vs. instruct models, common template formats and `apply_chat_template` in code (college).

# Sources

Grounding: [^hf-llm-course-11-2]. Text, examples and questions are original.

[^hf-llm-course-11-2]: Hugging Face, LLM Course, chapter 11, section 2 ("Chat Templates"), https://huggingface.co/learn/llm-course, Apache License 2.0.
