---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/genai-apps/image-generation
title: Generating and editing images
description: How text-to-image models turn a prompt into a picture, how to write image prompts and edit part of an image with a mask, and the extra risks of generated images (real people, copyright, bias, realism) with the safeguards an app needs.
lang: en
levels: [highschool, college]
objectives:
  - id: how-images-generated
    text: Explain in outline how a text-to-image model turns random noise into a picture guided by the prompt, and why the same prompt gives a different image each time.
  - id: image-prompts
    text: Write image prompts that state subject, details, setting, style and composition, and use editing with a mask to change only part of an image.
  - id: image-risks
    text: Name the risks of generated images (fake pictures of real people, copyright, biased depictions, misleading realism) and the safeguards an image app needs.
tags: [generative-ai, image-generation, diffusion, text-to-image, deepfake]
about:
  - wikidata: Q113940039
    label: text-to-image model
  - wikidata: Q114617315
    label: diffusion model
requires:
  - ptf:el/genai-apps/prompt-basics
leads_to:
  - ptf:el/genai-apps/responsible-genai
duration_min: { highschool: 20, college: 25 }
sources:
  - id: ms-genai-09
    resource: https://github.com/microsoft/generative-ai-for-beginners/tree/main/09-building-image-applications
    title: "Microsoft, Generative AI for Beginners, lesson 9: Building image generation applications (MIT License)"
generated: { by: claude/opus, at: 2026-11-06T09:30:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: describe a picture of "a dog" in one sentence so that a painter would paint exactly the dog you have in mind. You probably added breed, colour, place and mood; image models need the same.
- Image models create pictures from a text request, and many can also change part of an existing picture. They start from random noise, so every run gives a new picture.
- Afterwards the learner can explain how a picture comes out of noise, write prompts that get the intended image, edit part of an image, and knows why image apps need extra rules about real people, copyright and realism.

# Core

A text-to-image model creates a picture from a prompt. The most common
kind, a diffusion model, was trained by adding noise to millions of
captioned pictures and learning to remove it again; to generate, it
starts from pure random noise and removes noise in many small steps,
each step steered by the meaning of the prompt, until a picture appears.
Because the starting noise is random, the same prompt gives a different
picture every time; image APIs therefore usually have no temperature, and
variety or repeatability comes from the random start (a seed) and from
how specific the prompt is. A good image prompt names the subject and its
details, the setting, the style (photo, watercolour, diagram) and the
composition (close-up, from above, lighting). Editing takes an existing
picture, a mask that marks the area to change and a prompt for the
change, and leaves the rest as it was. Generated pictures look real
enough to deceive, so image apps need rules the text side does not:
no realistic pictures of real people without consent, care with
protected characters, logos and artists' styles, checks for one-sided
depictions of people, labels that mark images as generated, and filters
on prompts and results.

# Key facts

- Diffusion: training teaches the model to remove noise from noisy pictures; generation runs that in reverse from pure noise, in tens of steps, guided by an encoding of the prompt. Many models do this in a compressed "latent" version of the image to save compute.
- Other current models generate the picture as a sequence of image tokens with a transformer, like text. In both kinds the prompt steers a random start.
- Same prompt, different picture: the random start differs. A fixed seed (where the API offers one) repeats a result with the same model version; there is usually no temperature setting.
- Prompt parts: subject ("a red bicycle"), details ("old, with a basket"), setting ("leaning on a stone wall in a village street"), style ("watercolour", "photo", "flat icon"), composition ("seen from the side, morning light, plenty of empty sky for a title").
- Specific beats vague, as with text: "a car" leaves make, colour, place and mood to chance.
- Typical weaknesses: exact counts ("seven apples"), text inside the image, hands, consistent characters across several pictures, and precise layouts. Newer models are better at text, but results still need checking.
- Editing (inpainting): image + mask + prompt. Only the masked area is regenerated; the rest stays. Useful to replace a background or remove an object.
- Metaprompt: the app adds fixed rules to every user prompt ("child-friendly, no violence, no real persons, no brand logos"). It is one layer; provider filters on prompts and outputs are another.
- Real people: realistic fake pictures (deepfakes) can harm reputations and deceive; the EU AI Act requires deepfakes to be disclosed as such. Apps should refuse realistic images of real, identifiable people without consent.
- Copyright: pictures that copy a protected character, logo or a living artist's distinctive work can infringe rights even when generated; who may use a generated image depends on the provider's terms and local law.
- Bias: "a doctor" or "a scientist" can come out as the same type of person every time; test prompts about people for one-sided results.
- Provenance: invisible watermarks and content credentials (for example the C2PA standard) record that an image was generated; they can be lost when an image is edited or screenshotted, so a visible label helps too.
- Cost is per image and grows with size and quality settings; generating several variants multiplies it. Example with an assumed price of $0.04 per image: 4 variants per request and 2,500 requests a day cost $400 a day.

# Level: highschool

<!-- ptf:text v1 -->

Picture a photo full of static, like an old TV with no signal. Now
imagine someone who has practised removing static from millions of
photos. Give them pure static and a sentence like "a red bicycle in the
snow", and step by step they wipe away what does not fit the sentence
until a red bicycle in the snow appears. That is roughly how many image
models work. Because the static at the start is random, you get a new
bicycle every time, even with the same sentence.

So, as with text, the more you say, the closer the picture gets to your
idea. "A bicycle" could be anything. "An old red bicycle with a basket,
leaning on a stone wall, watercolour, soft morning light" leaves much
less to chance. Name the thing, its details, the place, the style and
how it is framed.

Many apps can also edit: you paint over part of a picture (the mask) and
say what should be there instead, for example a different sky. The rest
of the picture stays the same.

Generated pictures can look completely real. That is why a good image
app will not make realistic pictures of real people, such as a
classmate or a politician, without their consent; a fake photo can hurt
someone badly and spread fast. Copying famous characters or logos can
break copyright. And if the app only ever draws one type of person as
"a doctor", it repeats a stereotype. Good apps label pictures as
AI-generated.

# Level: college

<!-- ptf:text v1 -->

Diffusion models learn a denoising function: during training, Gaussian
noise is added to images at random strengths and the network learns to
predict the noise given the noisy image, the noise level and a text
encoding of the caption. Generation starts from pure noise and applies
the learned denoiser over a schedule of tens of steps; classifier-free
guidance strengthens the influence of the prompt at the cost of variety.
Latent diffusion runs this in the latent space of an autoencoder, which
makes high resolutions affordable. Some current systems instead generate
discrete image tokens autoregressively with a transformer, often with a
diffusion decoder. Either way, the output is a sample conditioned on the
prompt, so the seed decides the result for a fixed model and prompt, and
sampling settings like temperature are usually not exposed.

Prompting follows the same rule as text: specify what the model would
otherwise default to. Subject, attributes, setting, medium and style,
composition, lighting and aspect ratio are the main levers; known
weaknesses (counts, legible text, hands, multi-object spatial relations,
character consistency) need verification or a different tool, for
example adding text in a layout program rather than in the prompt.
Inpainting regenerates only a masked region conditioned on the
surrounding pixels and a prompt; outpainting extends the canvas.

Image apps carry risks beyond those of text: non-consensual or deceptive
images of real people, intellectual property (characters, trademarks,
style imitation), demographic bias in depictions, sexual or violent
content, and realism that makes misinformation persuasive. Mitigations
are layered: a metaprompt that fixes scope and bans, prompt and output
classifiers, refusal of identifiable real persons, provenance (C2PA
content credentials, watermarks) plus visible labelling, human review
where images are published, and bias tests over prompts that describe
people. Cost scales per image with resolution and quality, and with the
number of variants requested.

# Misconceptions

- **image-search**: The model searches the internet for a matching picture → it generates a new picture from noise; it does not look one up, although it can reproduce things it has seen very often.
- **same-prompt-same-image**: The same prompt always gives the same picture → the random start differs; only a fixed seed with the same model repeats a result.
- **temperature-for-images**: Image variety is controlled with temperature, like text → image APIs usually have no temperature; variety comes from the random start and the prompt.
- **short-prompt-enough**: A short prompt like "a car" gets the picture I imagine → unstated details are filled with typical choices.
- **edit-regenerates-all**: Editing a picture means it is redrawn completely → with a mask only the marked area changes.
- **generated-is-free-to-use**: A generated picture can be used for anything → protected characters, logos, real people and the provider's terms still apply.
- **realistic-means-real**: A photo-realistic picture shows something that happened → generated pictures can show events that never took place.

# Questions

```ptf-question
{
  "kind": "multiple_choice",
  "id": "where-from",
  "level": "highschool",
  "purpose": "warmup",
  "misconception": "image-search",
  "question": "Guess: you ask an image app for \"a cat riding a skateboard on the moon\". Where does the picture come from?",
  "options": [
    { "text": "The model creates a new picture that did not exist before", "correct": true, "feedback": "Yes: it is generated, not found." },
    { "text": "The app finds the best matching photo on the internet", "correct": false, "feedback": "That is image search. A generator makes a new picture." },
    { "text": "The app glues together pieces of photos of cats, skateboards and the moon", "correct": false, "feedback": "It does not cut and paste; it builds the picture step by step from noise." }
  ],
  "explanation": "Image models generate new pictures, guided by what they learned from many captioned images."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "noise-to-picture",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["how-images-generated"],
  "misconception": "same-prompt-same-image",
  "question": "You type the same prompt twice and get two different pictures. Why?",
  "options": [
    { "text": "Each picture starts from different random noise, which the model then turns into a picture", "correct": true, "feedback": "Yes: a different random start gives a different result." },
    { "text": "The model learned from your first picture and improved", "correct": false, "feedback": "The model does not learn from your requests." },
    { "text": "The app picked a different photo from its collection", "correct": false, "feedback": "It does not pick photos; it generates." },
    { "text": "The temperature was set too high", "correct": false, "feedback": "Image APIs usually have no temperature; the random start causes the variety." }
  ],
  "explanation": "Same prompt, new random start, new picture."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "best-image-prompt",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["image-prompts"],
  "misconception": "short-prompt-enough",
  "question": "You need a picture for a school poster about cycling to school. Which prompt is most likely to give a usable picture?",
  "options": [
    { "text": "\"Two teenagers cycling along a tree-lined path towards a school building in the morning, bright flat illustration, wide view with empty sky at the top for a title\"", "correct": true, "feedback": "Yes: subject, setting, style and composition are all there." },
    { "text": "\"Bike\"", "correct": false, "feedback": "Everything else is left to chance." },
    { "text": "\"A really good picture for my poster, make it nice\"", "correct": false, "feedback": "The model does not know your poster; say what should be in the picture." }
  ],
  "explanation": "Name subject, details, setting, style and composition."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "classmate-photo",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["image-risks"],
  "misconception": "generated-is-free-to-use",
  "question": "Someone wants to upload a classmate's photo and generate a realistic picture of them at a party they never went to, \"just as a joke\". What is right?",
  "options": [
    { "text": "It can seriously hurt the classmate, because the picture looks real and spreads fast; good apps refuse realistic images of real people without consent", "correct": true, "feedback": "Yes: a fake picture of a real person can damage them even if it was meant as a joke." },
    { "text": "It is fine, because the picture is generated and not a real photo", "correct": false, "feedback": "It looks like a real photo; that is exactly the danger." },
    { "text": "It is fine as long as the app does not save the picture", "correct": false, "feedback": "The harm happens when the picture is shown and shared." }
  ],
  "explanation": "Realistic pictures of real people need consent; deepfakes must be disclosed."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "mask-edit",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["image-prompts"],
  "misconception": "edit-regenerates-all",
  "question": "You like a generated picture of your dog in a garden, but want snow instead of grass. Which way keeps the dog exactly as it is?",
  "options": [
    { "text": "Edit the picture: paint a mask over the grass and prompt \"snow-covered ground\"", "correct": true, "feedback": "Yes: only the masked area is redrawn." },
    { "text": "Generate a new picture with the same prompt plus \"in the snow\"", "correct": false, "feedback": "A new picture also gives you a new dog." },
    { "text": "Ask for the same picture again and hope", "correct": false, "feedback": "The random start makes a different picture." }
  ],
  "explanation": "Editing with a mask changes one area and keeps the rest."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "seed-and-guidance",
  "level": "college",
  "purpose": "check",
  "objectives": ["how-images-generated"],
  "misconception": "temperature-for-images",
  "question": "A team must regenerate the exact illustration for a textbook later and wants to understand the levers. Which two statements are correct?",
  "options": [
    { "text": "With the same model version, prompt, settings and seed, a diffusion model repeats its result, because the seed fixes the starting noise", "correct": true, "feedback": "Yes: generation is a deterministic function of the starting noise for fixed settings." },
    { "text": "Stronger guidance makes images follow the prompt more closely and usually reduces variety", "correct": true, "feedback": "Yes: classifier-free guidance trades diversity for prompt adherence." },
    { "text": "Lowering the temperature makes the same prompt give the same image", "correct": false, "feedback": "Image models usually expose no temperature; the seed controls repeatability." },
    { "text": "Saving the prompt is enough to regenerate the exact image years later", "correct": false, "feedback": "Without the seed and the same model version the result differs; keep the image file itself." }
  ],
  "explanation": "Seed, model version and settings decide the result; for archives, store the image."
}
```

```ptf-question
{
  "kind": "estimate_number",
  "id": "variant-cost",
  "level": "college",
  "purpose": "check",
  "objectives": ["image-prompts"],
  "question": "A worksheet app generates 4 variants per request so teachers can pick one. At an assumed $0.04 per image and 2,500 requests a day, what does a day cost, in dollars? If better prompts let it generate 2 variants instead, how much is saved per 30-day month? Enter the daily cost.",
  "answer": 400,
  "tolerance": 0,
  "unit": "$",
  "explanation": "4 × 0.04 × 2,500 = $400 a day. With 2 variants it is $200 a day, saving $200 × 30 = $6,000 a month: specific prompts are also a cost lever."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "school-image-guardrails",
  "level": "college",
  "purpose": "check",
  "objectives": ["image-risks"],
  "misconception": "realistic-means-real",
  "question": "A school platform lets pupils generate illustrations for presentations. Design the safeguards, and say which risk each one addresses.",
  "rubric": [
    "A metaprompt and prompt/output filters that fix the scope (child-appropriate, no violence or sexual content, no brand logos or protected characters).",
    "Refusal of realistic images of real, identifiable people (classmates, teachers, public figures) to prevent deepfakes and bullying.",
    "Provenance and labelling (watermark or content credentials plus a visible 'AI-generated' label) so images are not taken as real photos.",
    "Bias tests over prompts describing people, and a way to report bad images with review by staff."
  ],
  "sample_answer": "Every request gets a metaprompt that fixes a child-friendly illustration style and bans violence, sexual content, logos and copyrighted characters; prompts and results also pass the provider's filters. Prompts naming real people or uploads of faces are refused, which prevents deepfakes of classmates and teachers. Each image carries content credentials and a visible 'AI-generated' corner label so it cannot pass as a photo. Before launch the team runs prompts like 'a scientist' or 'a nurse' a hundred times and checks the spread of depicted people. Pupils and teachers can report an image, and reports go to a staff member and into the test set.",
  "explanation": "Layered safeguards: scope rules, filters, no real persons, provenance, bias tests and reporting."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "logo-style",
  "level": "college",
  "purpose": "transfer",
  "objectives": ["image-prompts", "image-risks"],
  "question": "A small bakery asks you to generate its new logo \"in the style of\" a famous living illustrator, with the shop name in the picture. What do you advise, and how would you get a good result?",
  "rubric": [
    "Points out the rights issue: imitating a living artist's distinctive style or copying protected work is risky, and a logo needs clear rights to use; check the provider's terms.",
    "Describes the wanted look in own words (shapes, colours, mood) instead of naming the artist.",
    "Notes that text in images is a known weakness: generate the emblem, then set the shop name with a font in a design tool, and check the result."
  ],
  "sample_answer": "Do not ask for a living illustrator's style by name: it can infringe their rights or at least cause disputes, and a logo must be safe to use for years. Describe the look instead: 'round emblem, hand-drawn line art of a wheat sheaf and a loaf, warm brown and cream, friendly'. Generate several variants, pick one, and then add the name 'Bäckerei Huber' with a real font in a design program, because models often misspell text. Check the provider's terms on commercial use and keep the final file.",
  "explanation": "Describe styles instead of copying artists, and use the right tool for text."
}
```

# Examples

- **Static to picture**: like a sculptor who removes everything that is not the statue, except that the "stone" is random noise and the prompt says what the statue is. Where it breaks down: the model removes noise in many small steps and can still add details that were never asked for.
- **Variants as a cost lever**: four variants per request quadruple the cost; a more specific prompt often gets a usable picture in one or two.
- **Text in images**: ask for a sign saying "Open Monday to Friday" and you may get "Opne Mondy to Fridya". Set text in a layout tool instead.

# Tutor notes

- Image generation is optional in the app-builder path; it fits after prompt basics and before responsible AI, where the deepfake discussion connects.
- If the learner has an image tool, let them run the same prompt twice, then a more specific one, and compare. Do not have them generate images of real people.
- Keep the diffusion explanation at the level of "remove noise step by step"; the college level adds guidance and latent space only if the learner asks how it works inside.

# Further reading

- Microsoft, Generative AI for Beginners, lesson 9 (https://github.com/microsoft/generative-ai-for-beginners/tree/main/09-building-image-applications): building an image generation and editing app in code; college.

# Sources

Grounding: [^ms-genai-09]. Text, examples and questions are original.

[^ms-genai-09]: Microsoft, Generative AI for Beginners, lesson 9, MIT License. Used for scope and order only.
