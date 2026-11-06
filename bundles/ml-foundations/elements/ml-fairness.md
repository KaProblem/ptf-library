---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ml-foundations/ml-fairness
title: Fairness in machine learning
description: Models learn the biases of the data and decisions they are built from; recognising types of bias, comparing metrics across groups, and choosing mitigations with their trade-offs.
lang: en
levels: [highschool, college]
objectives:
  - id: bias-types
    text: Recognise the common types of bias in ML data and decisions (reporting, historical, selection, group attribution, implicit and automation bias) in a described case.
  - id: evaluate-groups
    text: Compare a model's outcomes across groups from a small table, and check demographic parity and equality of opportunity.
  - id: mitigate
    text: Propose mitigations (better data, changes to training or thresholds, counterfactual checks, human review) and explain why fairness criteria can conflict.
tags: [machine-learning, fairness, bias, ethics, evaluation, responsible-ai]
about:
  - wikidata: Q80100972
    label: fairness in machine learning
  - wikidata: Q45253460
    label: algorithmic bias
requires:
  - ptf:el/ml-foundations/production-ml
duration_min: { highschool: 35, college: 40 }
sources:
  - id: google-mlcc
    resource: https://developers.google.com/machine-learning/crash-course
    title: "Google for Developers: Machine Learning Crash Course (text CC BY 4.0, code Apache 2.0), module Fairness: types of bias, identifying, mitigating and evaluating bias, demographic parity, equality of opportunity, counterfactual fairness"
generated: { by: claude/opus, at: 2026-11-06T02:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: a company trains a model to pre-select job applications, using the last ten years of its own hiring decisions as labels. In those years it hired very few women as engineers. What will the model learn, even if "gender" is not one of its features?
- ML models make or prepare decisions about loans, jobs, medical care and what people see. They learn from data that records past decisions and an unequal world, so they can repeat and even scale up unfairness, usually without anyone intending it.
- Afterwards the learner can name the kind of bias at work in a case, compare a model across groups with numbers, and argue for a mitigation, knowing that different notions of fairness can pull in different directions.

# Core

A model learns the patterns of its training data, including patterns that
come from biased measurement, sampling or past decisions. Common types:
reporting bias (what gets written down is not typical), historical bias
(the data reflects an unequal past), selection bias (the data does not
represent the population the model serves: coverage, non-response or
sampling problems), group attribution bias (generalizing from individuals
to a group or the reverse), implicit bias (the assumptions of the people
who build and label), and automation bias (trusting the system over
other evidence). Removing a sensitive attribute does not remove bias,
because other features act as proxies. Fairness is checked by evaluating
the model separately for each group: demographic parity asks for equal
rates of positive decisions, equality of opportunity asks for equal true
positive rates among those who qualify. When base rates differ between
groups, such criteria cannot all hold at once, so choosing one is a
value judgement that has to be made openly. Mitigations range from better
data to changes in training, thresholds and human oversight.

# Key facts

- Reporting bias: reviews mostly come from very happy or very angry customers. Historical bias: past hiring favoured one group. Coverage bias: a skin-condition model trained mostly on light skin. Non-response bias: a survey that only some groups answer. Sampling bias: data not randomly drawn. Group attribution bias: "she is from that school, so she must be good". Implicit bias: labellers' assumptions. Automation bias: staff accept a wrong model output against their own evidence.
- Proxies: postcode, school, first name or shopping patterns can stand in for a removed attribute.
- Example: group A, 200 applicants, 120 qualified; the model accepts 100 qualified and 10 unqualified → acceptance rate 110 / 200 = 55 %, TPR among qualified 100 / 120 ≈ 83.3 %. Group B, 100 applicants, 40 qualified; accepts 24 qualified and 6 unqualified → acceptance 30 / 100 = 30 %, TPR 24 / 40 = 60 %.
- Demographic parity: equal acceptance rates (55 % vs 30 %: violated). Equality of opportunity: equal TPR among the qualified (83.3 % vs 60 %: violated). In this example qualified applicants from B are clearly disadvantaged.
- Precision per group: A 100 / 110 ≈ 0.91, B 24 / 30 = 0.80.
- With different base rates (A 60 % qualified, B 40 %), a perfect classifier satisfies equality of opportunity but not demographic parity (60 % vs 40 % accepted). In general, calibration and equal error rates cannot all hold when base rates differ (unless the classifier is perfect).
- Mitigation options: collect or reweight data for under-represented groups; check labels; add a fairness term to the training loss; choose thresholds with group results in view (legal limits apply in some domains); counterfactual tests (change only the group attribute and see if the decision changes); keep humans in the loop and document the model's limits.
- Fairness work continues after launch: monitor metrics per group in production.

# Level: highschool

<!-- ptf:text v1 -->

The hiring model will learn that the people hired in the past were mostly
men, and it will look for whatever separated them from the rest. Even
without a "gender" column it can find hints: a women's football club in
the CV, a girls' school, certain hobbies. The model is not "mean"; it
copies a pattern from data that recorded an unfair past. That is
**historical bias**.

There are more ways bias gets into data:

- **Reporting bias**: what gets written down is unusual. Online reviews come mostly from people who loved or hated something.
- **Selection bias**: the data does not show everyone the model will meet. A skin-cancer app trained mostly on photos of light skin works worse on dark skin.
- **Group attribution bias**: judging a person by their group, or a group by one person.
- **Implicit bias**: the people who label the data bring their own assumptions.
- **Automation bias**: people trust the computer's answer even when their own eyes tell them otherwise.

How do you find out whether a model treats groups unfairly? Look at the
results **per group**. Say the model accepts 110 of 200 applicants from
group A (55 %) but only 30 of 100 from group B (30 %). Equal acceptance
rates would be **demographic parity**. But maybe fewer people in B were
qualified? Then look only at the qualified ones: the model accepted 100
of 120 qualified people in A (83 %) but only 24 of 40 in B (60 %). A
qualified person from B has a much worse chance: that breaks **equality
of opportunity**, and here it is a clear problem.

What can you do? Collect better and more balanced data; check the labels;
test the model by changing only the group and seeing whether the
decision changes; adjust how the model is trained or where the threshold
lies; and let people review important decisions. One thing does not
work: just deleting the group column, because other features give it
away. And there is no single definition of "fair" that always fits:
deciding which one matters in a situation is a human choice that should
be made openly.

# Level: college

<!-- ptf:text v1 -->

Bias enters at every stage: problem framing (what is the label a proxy
for?), data collection (selection: coverage, non-response, sampling),
measurement and labelling (reporting bias, implicit bias of annotators,
historical bias in outcomes such as past hiring or arrests), modelling
(majority patterns dominate the loss; under-represented groups get
higher error), and deployment (automation bias, feedback loops where
decisions shape future training data). Excluding a sensitive attribute A
("fairness through unawareness") fails when features correlate with A.

Evaluation disaggregates metrics by group. With Ŷ the decision and Y the
outcome: demographic parity requires P(Ŷ = 1 | A = a) equal across a;
equality of opportunity requires equal TPR, P(Ŷ = 1 | Y = 1, A = a);
equalized odds adds equal FPR; calibration within groups requires
P(Y = 1 | score = s, A = a) = s. In the example (A: 200 applicants, 120
qualified, accepted 100 + 10; B: 100, 40 qualified, accepted 24 + 6)
acceptance is 55 % vs 30 % and TPR 83.3 % vs 60 %. Since base rates differ
(60 % vs 40 %), even a perfect classifier violates demographic parity, and
impossibility results show that calibration and equal FPR and FNR cannot
hold together when base rates differ, except for a perfect classifier.
Choosing a criterion is a normative decision tied to the use: equality of
opportunity fits "qualified people should have the same chance";
demographic parity fits allocation where the label itself is suspected to
be biased.

Mitigation can act before training (collect data for under-covered
groups, reweight or resample, audit and fix labels), during training (a
penalty on the difference of a metric between groups, constrained
optimization), or after training (group-aware thresholds, which may be
restricted by law, e.g. anti-discrimination rules). Counterfactual
fairness tests whether a decision changes when only A (and what A
causally determines) changes. Every mitigation has costs: overall
accuracy, other fairness criteria, legal constraints. Document them
(model cards), monitor group metrics after launch, and keep humans able
to override the model.

# Misconceptions

- **remove-attribute-fixes**: Removing the sensitive attribute makes a model fair → other features act as proxies and carry the same information.
- **data-is-neutral**: Data is objective, so a model trained on it is neutral → data records how it was collected and past decisions, including their biases.
- **overall-accuracy-enough**: High overall accuracy shows the model works for everyone → errors can be concentrated in a small group; evaluate per group.
- **one-fairness-definition**: There is one correct definition of fairness that a model can always meet → criteria such as demographic parity and equality of opportunity conflict when base rates differ.
- **model-intends-bias**: A biased model was built by someone who wanted it biased → most bias is unintended and comes from data, labels and design choices.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "hiring-warmup",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "remove-attribute-fixes",
  "question": "A model learns from ten years of hiring decisions in which very few women were hired as engineers. 'Gender' is not a feature. What will the model most likely do?",
  "options": [
    { "text": "Prefer CVs that look like those of the men hired before, using hints such as hobbies or schools", "correct": true, "feedback": "Yes: other features act as proxies for the removed one." },
    { "text": "Treat everyone equally, because it does not see gender", "correct": false, "feedback": "It does not need the column; it learns from correlated features." },
    { "text": "Prefer women, to balance the past", "correct": false, "feedback": "A model copies patterns in its labels; it has no goal of balancing." }
  ],
  "explanation": "Historical bias in labels is learned through proxies even without the sensitive attribute."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "name-the-bias",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["bias-types"],
  "misconception": "data-is-neutral",
  "question": "A skin-cancer app was trained on 50,000 photos, 95 % of them of light skin. It works well on light skin and badly on dark skin. Which type of bias is this?",
  "options": [
    { "text": "Selection (coverage) bias: the training data does not represent all the people the app is used on", "correct": true, "feedback": "Yes: dark skin is under-covered." },
    { "text": "Automation bias", "correct": false, "feedback": "That is about people trusting the system too much." },
    { "text": "Reporting bias", "correct": false, "feedback": "That is about which events get written down, e.g. only extreme reviews." }
  ],
  "explanation": "Coverage bias: the data misses or under-samples part of the population."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "more-bias-types",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["bias-types"],
  "question": "Which two pairings of situation and bias type are correct?",
  "options": [
    { "text": "A nurse follows the system's 'low risk' label although the patient clearly looks very ill → automation bias", "correct": true, "feedback": "Yes: trusting the machine over one's own evidence." },
    { "text": "A restaurant model learns from online reviews, which are written mostly by very happy or very angry guests → reporting bias", "correct": true, "feedback": "Yes: what is reported is not typical." },
    { "text": "A survey is answered mostly by retired people because it runs during working hours → automation bias", "correct": false, "feedback": "That is non-response (selection) bias." },
    { "text": "A labeller assumes every person in a kitchen photo is cooking → reporting bias", "correct": false, "feedback": "The labeller's own assumption: implicit bias." }
  ],
  "explanation": "Name the bias by where it enters: what is recorded, who is in the data, who labels, who trusts the output."
}
```

```ptf-question
{
  "kind": "calculation_steps",
  "id": "group-rates",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["evaluate-groups"],
  "misconception": "overall-accuracy-enough",
  "title": "Comparing two groups",
  "intro": "Group A: 200 applicants, 120 qualified; the model accepts 100 qualified and 10 unqualified. Group B: 100 applicants, 40 qualified; it accepts 24 qualified and 6 unqualified.",
  "columns": ["Quantity", "Calculation", "Value"],
  "rows": [
    ["Acceptance rate A", "(100 + 10) / 200", "0.55"],
    ["Acceptance rate B", "(24 + 6) / 100", "0.3"],
    ["Qualified accepted A", "100 / 120", "0.833"],
    ["Qualified accepted B", "24 / 40", "0.6"]
  ],
  "result": { "label": "Qualified accepted B", "value": "0.6" },
  "explanation": "Acceptance rates differ (demographic parity is violated), and so do the chances of qualified applicants (equality of opportunity is violated)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "which-criterion",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["evaluate-groups", "mitigate"],
  "misconception": "one-fairness-definition",
  "question": "In a group, 60 % of applicants are qualified; in another group, 40 % are. A perfect model accepts exactly the qualified ones. Which statement is true?",
  "options": [
    { "text": "Every qualified person is accepted in both groups (equal opportunity), but the acceptance rates differ, 60 % vs 40 % (no demographic parity)", "correct": true, "feedback": "Yes: different notions of fairness can disagree even for a perfect model." },
    { "text": "A perfect model meets every fairness definition", "correct": false, "feedback": "Demographic parity would require equal acceptance rates, which it does not have." },
    { "text": "The model is unfair to the 60 % group", "correct": false, "feedback": "Every qualified person in each group gets in." }
  ],
  "explanation": "Which criterion matters is a choice about values; make it openly."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "mitigation-hs",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["mitigate"],
  "misconception": "remove-attribute-fixes",
  "question": "The skin-cancer app works badly on dark skin. Which two steps actually help?",
  "options": [
    { "text": "Collect many more labelled photos of dark skin and retrain", "correct": true, "feedback": "Yes: fix the coverage problem at its source." },
    { "text": "Report the app's accuracy separately for each skin tone, and warn users where it is weak until it improves", "correct": true, "feedback": "Yes: measure per group and be honest about limits." },
    { "text": "Remove skin tone from the image data", "correct": false, "feedback": "Skin tone is in every pixel; and hiding it does not add the missing examples." },
    { "text": "Report only the overall accuracy, which is high", "correct": false, "feedback": "The overall number hides the weak group." }
  ],
  "explanation": "Fix data gaps, evaluate per group, and be transparent."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "fairness-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["bias-types", "evaluate-groups"],
  "misconception": "overall-accuracy-enough",
  "question": "A face-recognition system has 98 % accuracy overall. Is it fair?",
  "options": [
    { "text": "You cannot tell: you need the accuracy for each group of people separately", "correct": true, "feedback": "Yes: errors can be concentrated in one group." },
    { "text": "Yes: 98 % is excellent", "correct": false, "feedback": "If most errors fall on one small group, that group is badly served." },
    { "text": "No: any system under 100 % is unfair", "correct": false, "feedback": "Fairness is about how errors are distributed, not whether there are any." }
  ],
  "explanation": "Fairness needs disaggregated evaluation."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "criteria-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["evaluate-groups"],
  "question": "Use the example: A (accepted 100 of 120 qualified, 10 of 80 unqualified), B (accepted 24 of 40 qualified, 6 of 60 unqualified). Which two statements are correct?",
  "options": [
    { "text": "FPR is 0.125 in A and 0.10 in B", "correct": true, "feedback": "10 / 80 and 6 / 60." },
    { "text": "Equalized odds is violated, because TPR differs (0.833 vs 0.60)", "correct": true, "feedback": "Equalized odds needs equal TPR and equal FPR." },
    { "text": "Precision is equal in both groups", "correct": false, "feedback": "A: 100 / 110 ≈ 0.91; B: 24 / 30 = 0.80." },
    { "text": "Demographic parity holds because both groups have unqualified people accepted", "correct": false, "feedback": "Acceptance rates are 0.55 and 0.30." }
  ],
  "explanation": "Compute every rate per group; each fairness criterion compares a different one."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "parity-threshold-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["mitigate", "evaluate-groups"],
  "question": "To reach demographic parity, group B (100 applicants, 40 qualified) is now accepted at A's rate of 55 %, and the acceptances go to qualified applicants first. What is B's true positive rate (share of qualified applicants accepted) then?",
  "answer": 1,
  "tolerance": 0,
  "explanation": "55 acceptances: all 40 qualified (TPR 1.0) and 15 unqualified. Parity and opportunity now point in different directions: B's qualified do better than A's (0.83), and B's FPR rises to 15 / 60 = 0.25."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "impossibility-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["mitigate", "evaluate-groups"],
  "misconception": "one-fairness-definition",
  "question": "Two groups have different base rates of the positive outcome, and the classifier is not perfect. Which statement follows from known impossibility results?",
  "options": [
    { "text": "It cannot be calibrated within each group and have equal false positive and false negative rates across groups at the same time", "correct": true, "feedback": "Yes: one of these has to give." },
    { "text": "It can always satisfy every fairness criterion if trained long enough", "correct": false, "feedback": "The conflict is mathematical, not a matter of training." },
    { "text": "Demographic parity implies equal TPR", "correct": false, "feedback": "Equal acceptance rates with different base rates usually mean different TPRs." }
  ],
  "explanation": "With different base rates, fairness criteria trade off; the choice is normative and should be documented."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "pipeline-college",
  "level": "college",
  "purpose": "check",
  "objectives": ["bias-types", "mitigate"],
  "misconception": "data-is-neutral",
  "question": "A city trains a model on past police stop records to decide where to send patrols. Which two statements are correct?",
  "options": [
    { "text": "The labels record where police looked, not where crime happened: a proxy with historical and selection bias", "correct": true, "feedback": "Yes: areas patrolled more produce more records." },
    { "text": "Deploying it creates a feedback loop: more patrols produce more records in the same areas, which the next model learns", "correct": true, "feedback": "Yes: decisions shape future training data." },
    { "text": "Removing the neighbourhood's demographics from the features removes the bias", "correct": false, "feedback": "Location itself is a proxy, and the label is the problem." },
    { "text": "High precision on held-out stop records shows the model is fair", "correct": false, "feedback": "It shows it reproduces the records, including their bias." }
  ],
  "explanation": "Check what the label measures and how deployment feeds back into the data."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "audit-transfer",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["bias-types", "evaluate-groups", "mitigate"],
  "question": "A bank asks you to audit a credit-scoring model before launch. Describe how you would look for bias in the data and labels, which metrics you would compute per group, which fairness criterion you would argue for and why, and two mitigations you would consider with their costs.",
  "rubric": [
    "Data and labels: coverage of groups, historical bias in past approvals (defaults only observed for approved applicants), proxies such as postcode",
    "Per-group metrics: approval rate, TPR/FNR among creditworthy, FPR, precision/default rate, calibration",
    "Argues for a criterion tied to the use (e.g. equal opportunity for creditworthy applicants, or calibration), acknowledging conflicts",
    "Mitigations with costs: data collection/reweighting, fairness penalty in training, threshold changes (legal limits), human review of borderline cases",
    "Mentions monitoring after launch and documentation"
  ],
  "sample_answer": "First the data: are all groups covered, and do the labels only exist for people the bank approved in the past (selection and historical bias)? Which features are proxies, such as postcode? Then per group: approval rate, TPR among applicants who repaid, FPR, default rate among approved and calibration. I would argue for equality of opportunity, since creditworthy people should have the same chance, while keeping the scores calibrated, and state openly that parity is not met. Mitigations: collect outcome data for under-covered groups or reweight (slow, costly), and add a fairness penalty in training (some accuracy loss). Borderline cases get human review. After launch, the same metrics are monitored per group.",
  "explanation": "A fairness audit covers data, labels, per-group metrics, an explicit criterion, mitigations with costs, and monitoring."
}
```

# Tutor notes

- This topic can touch the learner's own experiences; keep it factual and concrete, and use the numbers to make the criteria tangible.
- Do not present one fairness criterion as "the" right one; ask the learner which fits a given decision and why.
- As the last step of the course, end with a review: ask the learner to trace one example (say, a loan model) through all steps, from labels and features to metrics, production and fairness.

# Sources

Grounding: [^google-mlcc]. Text, examples and questions are original.

[^google-mlcc]: Google for Developers, Machine Learning Crash Course, module "Fairness", https://developers.google.com/machine-learning/crash-course, text licensed CC BY 4.0, code samples Apache 2.0. Used for scope and order; nothing was copied.
