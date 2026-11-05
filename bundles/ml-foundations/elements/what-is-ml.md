---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/what-is-ml
title: What machine learning is
description: A model learns a rule from labeled examples instead of being programmed with it; features, labels, training and inference, and the main kinds of ML tasks.
lang: en
levels: [highschool, college]
objectives:
  - id: supervised-terms
    text: Name the features, the label, an example and the prediction in a concrete supervised learning task.
  - id: task-types
    text: Tell regression, classification, clustering and generative tasks apart from a description of the problem.
  - id: training-vs-inference
    text: Explain what changes in a model during training, what happens at inference, and why training needs labeled examples.
tags: [machine-learning, supervised-learning, features, labels, introduction]
about:
  - wikidata: Q334384
    label: supervised learning
  - wikidata: Q2539
    label: machine learning
leads_to:
  - ptf:el/ml-foundations/linear-regression
duration_min: { highschool: 20, college: 20 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), introduction and prework"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: here are three houses with their size and price: 50 m² for € 200,000, 80 m² for € 320,000, 100 m² for € 400,000. What would 70 m² cost? You just learned a rule from examples. That is what machine learning automates.
- Instead of a programmer writing the rule, a program finds it from many examples whose answers are known, and then applies it to new cases.
- Afterwards the learner can name features, labels and predictions in any ML task, say which kind of task a problem is, and explain what training and inference do.

# Core

Machine learning (ML) is a way to build software that learns a rule from
data instead of having the rule written by hand. In supervised learning
every training example has features (the inputs, such as a house's size)
and a label (the known answer, such as its price). Training adjusts the
model's parameters until its predictions are close to the labels;
inference applies the trained model to new examples whose label is
unknown. A regression model predicts a number, a classification model
predicts a category; unsupervised models find structure (such as
clusters) in unlabeled data, and generative models produce new content.

# Key facts

- Example = one row of data: features (inputs, often called x) plus, in supervised learning, a label (the answer, y).
- Model = a function with parameters (weights) that maps features to a prediction (often written y′). Its form is chosen by people; its parameter values are learned.
- Training: show the model labeled examples, measure how wrong its predictions are (the loss), change the parameters to reduce it. Inference: use the trained, now fixed model on new, unlabeled examples.
- Regression: the prediction is a number (price, temperature, minutes). Classification: the prediction is one of a set of categories (spam / not spam; cat / dog / bird). Binary classification has two classes, multi-class more.
- Unsupervised learning has no labels; clustering groups similar examples. Reinforcement learning learns from rewards for actions in an environment. Generative AI produces new text, images or audio from patterns in its training data.
- House example: 50 m² → € 200,000, 80 m² → € 320,000, 100 m² → € 400,000 follows price = € 4,000 per m² × size, so 70 m² → € 280,000.
- ML is worth it when the rule is too complex or changes too often to write by hand, and when enough examples with good labels exist. A simple rule that works needs no ML.

# Level: highschool

<!-- ptf:text v1 -->

Look at the houses again: 50 m² for € 200,000, 80 m² for € 320,000,
100 m² for € 400,000. You probably noticed that every square metre costs
€ 4,000, and guessed € 280,000 for 70 m². Nobody gave you that rule; you
found it in the examples.

Machine learning does the same with a computer. The size is a **feature**:
something we know about each house. The price is the **label**: the answer
we want. A house with its size and price is one **example**. The
**model** is the rule, written as a formula with some adjustable numbers.

**Training** means trying out those numbers, checking how far the model's
guesses are from the real prices, and changing the numbers so the guesses
get better, again and again over many examples. Once trained, the numbers
stay fixed. **Inference** is using the model on a new house whose price
nobody knows yet: that is its **prediction**.

Not every problem predicts a number. "Is this email spam?" picks a
category: that is **classification**. "What will the temperature be?"
gives a number: **regression**. Sometimes there are no answers at all,
and the computer only groups similar things (**clustering**), and
generative models such as chatbots write new text from what they learned.

# Level: college

<!-- ptf:text v1 -->

Start with a task: predict a house's price from its size, number of rooms
and location. Each house is an example with a feature vector
x = (size, rooms, location, …) and a label y (the sale price). A model is a
parameterized function f_θ(x) = y′; we choose its family (a linear
function, a neural network) and training chooses θ.

Training is optimization: a loss function measures how far predictions y′
are from labels y over the training set, and an algorithm such as
gradient descent changes θ to reduce it. Labels are what make this
possible: without them there is nothing to measure the error against.
Inference evaluates f_θ with θ fixed on new examples, usually many times
cheaper than training.

The label's type decides the task. A real-valued label makes it
regression; a label from a finite set makes it classification (binary or
multi-class), where the model usually outputs a probability per class.
Without labels, unsupervised methods such as clustering find structure on
their own; reinforcement learning learns a policy from rewards; generative
models learn the distribution of their training data and sample new
content from it (an LLM predicts the next token, a supervised task whose
labels come from the text itself).

ML pays off when a rule is too complex or changes too fast to hand-code
and when there are enough well-labeled examples. If a few if-statements
solve the problem reliably, they are cheaper to build, test and explain.

# Misconceptions

- **ml-is-programmed-rules**: In ML a programmer writes the rules and the computer follows them → the programmer chooses the model's form and the data; the rule itself, the parameter values, is learned from examples.
- **model-learns-at-inference**: A model keeps learning every time it is used → at inference the parameters are fixed; it only changes when it is trained again.
- **label-is-feature**: The label is just another input → the label is the answer the model must predict; it is only available during training and must not be among the features.
- **classification-is-any-yes-no-number**: A model that predicts a number from 0 to 10 is a classification model because the numbers are few → if the label is a quantity, it is regression; classification predicts categories.
- **ml-always-better**: ML is the best solution for every problem → a simple hand-written rule is better when it works; ML needs data and maintenance.

# Questions

```ptf-question
{
  "kind": "estimate_number",
  "id": "house-guess",
  "level": "highschool",
  "purpose": "warmup",
  "question": "Houses of 50 m², 80 m² and 100 m² sold for € 200,000, € 320,000 and € 400,000. What would you expect a 70 m² house to cost, in €?",
  "answer": 280000,
  "tolerance": 0,
  "unit": "€",
  "explanation": "Every example costs € 4,000 per m², so 70 m² → € 280,000. You learned that rule from the examples: that is the idea of machine learning."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "name-the-parts",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["supervised-terms"],
  "misconception": "label-is-feature",
  "question": "An app learns to predict how long a pizza delivery takes from the distance and the time of day. Past deliveries with their real duration are used to train it. Which two statements are true?",
  "options": [
    { "text": "The real delivery duration is the label", "correct": true, "feedback": "Yes: it is the answer the model should learn to predict." },
    { "text": "Distance and time of day are features", "correct": true, "feedback": "Yes: they are what we know about each delivery before it happens." },
    { "text": "The delivery duration should also be a feature, so the model has all the information", "correct": false, "feedback": "For a new order the duration is unknown; it is what we want to predict, so it cannot be an input." },
    { "text": "Each past delivery is a model", "correct": false, "feedback": "Each past delivery is one example; the model is the rule learned from all of them." },
    { "text": "The model's guess for a new order is the label", "correct": false, "feedback": "The model's guess is the prediction; the label is the true value, known only for training examples." }
  ],
  "explanation": "Features are the inputs, the label is the known answer, and the model turns features into a prediction."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-task",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["task-types"],
  "misconception": "classification-is-any-yes-no-number",
  "question": "Which task is a classification task?",
  "options": [
    { "text": "Deciding whether a photo shows a cat, a dog or a bird", "correct": true, "feedback": "Yes: the answer is one of three categories." },
    { "text": "Predicting tomorrow's temperature in °C", "correct": false, "feedback": "A temperature is a number on a scale: regression." },
    { "text": "Predicting how many minutes a bus will be late", "correct": false, "feedback": "Minutes are a quantity, even if they are whole numbers: regression." },
    { "text": "Sorting songs into groups that sound alike, without any given group names", "correct": false, "feedback": "Without labels this is clustering, an unsupervised task." }
  ],
  "explanation": "Classification predicts a category; regression predicts a number; clustering finds groups without labels."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "training-or-inference",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["training-vs-inference"],
  "misconception": "model-learns-at-inference",
  "question": "A spam filter was trained last month. Today it marks a new email as spam. What happens to the filter's adjustable numbers in that moment?",
  "options": [
    { "text": "Nothing: they stay as training left them; the filter only uses them", "correct": true, "feedback": "Yes: this is inference. The numbers only change when the filter is trained again." },
    { "text": "They change a little, because the filter learns from every email", "correct": false, "feedback": "To learn it would need the correct answer (the label), which it does not have for a new email." },
    { "text": "They are reset and found again from scratch", "correct": false, "feedback": "That would be a full retraining, not a single prediction." }
  ],
  "explanation": "Training changes the parameters using labeled examples; inference applies the fixed model to new examples."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "why-labels",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["training-vs-inference", "supervised-terms"],
  "question": "Why can a model not learn to predict house prices from a list of houses that has sizes and locations but no prices?",
  "rubric": [
    "Training compares the model's predictions with the true answers (labels)",
    "Without prices there is nothing to measure the error against, so the model cannot know which way to change",
    "Names price as the label and size/location as features"
  ],
  "sample_answer": "The price is the label. Training works by comparing the model's guesses with the real prices and changing the model so the difference shrinks. Without prices there is no difference to measure, so the model cannot tell whether a change made it better or worse.",
  "explanation": "Supervised learning needs labels to measure error; without them only unsupervised methods such as clustering are possible."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "task-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["task-types", "supervised-terms"],
  "question": "A shop wants to predict how many umbrellas it will sell next week from the weather forecast. Which kind of task is that, and what is the label?",
  "options": [
    { "text": "Regression; the label is the number of umbrellas sold", "correct": true, "feedback": "Yes: a quantity is predicted, and past weeks' sales are the labels." },
    { "text": "Classification; the label is rain or no rain", "correct": false, "feedback": "Rain is part of the forecast, a feature. The shop wants a number of umbrellas." },
    { "text": "Clustering; there is no label", "correct": false, "feedback": "Past sales are known, so there are labels: this is supervised." }
  ],
  "explanation": "The label is what we want to predict (sales); its type (a number) makes it regression."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "task-types-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["task-types"],
  "question": "Which two pairs of problem and task type are correct?",
  "options": [
    { "text": "Estimating the probability that a loan will default, to approve or reject it → binary classification", "correct": true, "feedback": "Yes: the label is default / no default; the probability is the model's output for one class." },
    { "text": "Grouping customers by purchase behaviour when no segments are defined → clustering (unsupervised)", "correct": true, "feedback": "Yes: no labels exist, the groups come from the data." },
    { "text": "Predicting a film's star rating from 1 to 5, averaged over many users (e.g. 3.7) → multi-class classification", "correct": false, "feedback": "An average rating is a real number: regression." },
    { "text": "Generating a product description from a list of features → clustering", "correct": false, "feedback": "Producing new text is generative modelling." },
    { "text": "Predicting next month's electricity use in kWh → binary classification", "correct": false, "feedback": "A quantity in kWh is regression." }
  ],
  "explanation": "The label's type decides the task: real number → regression, category → classification; no label → unsupervised; new content → generative."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "theta-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["supervised-terms", "training-vs-inference"],
  "misconception": "ml-is-programmed-rules",
  "question": "A team builds a model y′ = f_θ(x) to predict a flight's delay from features x. Which statement is correct?",
  "options": [
    { "text": "The team chooses the family of f (say, linear); training chooses θ by minimizing a loss over labeled flights", "correct": true, "feedback": "Yes: the form is a design choice, the parameter values are learned." },
    { "text": "The team writes θ by hand from their knowledge of airports; the data only checks it", "correct": false, "feedback": "Then no learning happens. In ML, θ is fitted to the data." },
    { "text": "At inference θ is updated using the predicted delay as the new label", "correct": false, "feedback": "The prediction is not a label; θ is fixed at inference. Training on its own outputs would teach the model nothing new." },
    { "text": "The delay is part of x, so the model can use it", "correct": false, "feedback": "The delay is the label y; it is unknown when we need the prediction." }
  ],
  "explanation": "Model family = human choice; parameters = learned from labeled examples by minimizing the loss; inference uses fixed parameters."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "llm-labels-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["training-vs-inference", "task-types"],
  "question": "A language model is trained on billions of sentences that nobody labeled by hand. Why is its training still supervised in the sense of having labels?",
  "options": [
    { "text": "Each position in a text is an example: the preceding tokens are the features and the next token is the label", "correct": true, "feedback": "Yes: the text supplies its own labels (self-supervised learning)." },
    { "text": "It is not; language models are trained by clustering sentences", "correct": false, "feedback": "Clustering would group sentences; the model is trained to predict the next token, which needs a target." },
    { "text": "Human raters label every sentence as good or bad before training", "correct": false, "feedback": "That happens only in a small later fine-tuning stage, not for the billions of sentences." }
  ],
  "explanation": "Training needs a target to measure error; for next-token prediction the target is the next token in the text."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "ml-or-rule",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["task-types", "training-vs-inference"],
  "misconception": "ml-always-better",
  "question": "A school wants software that (a) marks a test as passed when the score is at least 50 % and (b) flags essays that were probably copied from other students' essays. For which part would you use ML, and why? Name the task type and what the labels would be.",
  "rubric": [
    "(a) is a fixed, known rule: a simple if-statement, no ML",
    "(b) the rule is hard to write by hand (paraphrases, partial copies): ML can learn it",
    "(b) as binary classification with labels copied / not copied from past cases checked by teachers (or a similarity score with a learned threshold)",
    "Mentions that ML needs enough labeled examples"
  ],
  "sample_answer": "(a) needs no ML: score ≥ 50 % is a known rule. (b) is hard to capture in rules because copying can be paraphrased, so I would train a binary classifier on essays that teachers already judged as copied or not; those judgments are the labels, and features compare the essay with the others. It only works if there are enough judged essays.",
  "explanation": "Use ML when a rule is too complex to write and labeled examples exist; otherwise write the rule."
}
```

# Examples

- **Recipe vs taste**: a hand-written program is like a recipe someone wrote down; an ML model is like a cook who tasted thousands of dishes and adjusted their own recipe. Breaks down: the model has no taste of its own, only the examples and the loss it was given.

# Tutor notes

- This is the first step of the course: keep it short and concrete, and let the learner find the house rule before naming any term.
- Use one running example (houses or deliveries) for all terms; switch examples only for the task types.
- College: introduce the notation x, y, y′ and θ here, since later steps use it.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
