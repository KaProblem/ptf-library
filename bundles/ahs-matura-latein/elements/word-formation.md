---
type: Learning Element
ptf_version: "0.1"
id: ptf:el/ahs-matura-latein/word-formation
title: Word formation and loanwords
description: Prefixes (with assimilation), suffixes, compounds of two stems, and Latin words behind German and English loanwords and foreign words, as asked in the first interpretation tasks of every Austrian AHS Latin Matura.
lang: en
levels: [highschool]
objectives:
  - id: wf-loanwords
    text: Find in a Latin text the word that is related to a given German or English loanword or foreign word, and explain the link.
  - id: wf-affixes
    text: Split a derived word into prefix or suffix and base word, with the base in its dictionary form and a fitting meaning for each part, also when the prefix is assimilated.
  - id: wf-compounds
    text: Name the two Latin words a compound is made of (agricola, magnanimus, aedificare) with their meanings.
tags: [latin, matura, austria, ahs, word-formation, etymology, prefix, suffix, loanword]
duration_min: { highschool: 60 }
sources:
  - id: bmbwf-srp-latein
    resource: https://www.matura.gv.at/
    title: "BMBWF: Standardisierte kompetenzorientierte Reifeprüfung Latein (AHS), Aufgabenformate Fremdwörter und Wortbildung; Präfix-/Suffix-Liste"
generated: { by: claude/opus, at: 2026-11-05T22:00:00Z }
status: draft
version: 0.1.0
license: CC-BY-SA-4.0
---

# Introduction

- Try it: which Latin word hides in *Vision*, *Diktat* and *Nation*? And what are the parts of *impedimentum*?
- The first two or three interpretation tasks of a Matura are almost always: find the Latin word for a loanword, and split words into prefix, suffix and base. They give 4 to 6 easy points – if the rules are known.
- Afterwards the learner can solve these tasks quickly and in the form the Matura requires.

# Core

Many German and English words come from Latin, often through the stem of
a perfect participle or a noun: *Vision* from *videre, visum* (to see),
*Diktat* from *dicere, dictum* (to say), *Nation* from *nasci, natus* (to be born). In the
loanword task you quote one Latin word of the text that is related; any
word class counts. In the word-formation task you split a word into its
meaningful parts and give each part with its meaning in context: prefixes
(*ante-* before, *con-* together, *de-* down/away, *ex-* out, *in-* in or
not, *re-* back/again, *sub-* under, *trans-* across …), nominal suffixes
in the nominative singular (*-tas* and *-itia* state or quality, *-tio*
action, *-or* agent or state, *-trix* female agent, *-ilis/-bilis*
possibility, *-osus* full of) and the base word in its dictionary form
(verbs in the infinitive, nouns and adjectives in the nominative
singular). Prefixes often change their last consonant to match the next
sound (assimilation): *ad + ferre* → *afferre*, *in + mittere* →
*immittere*, *con + ponere* → *componere*, *ex + ferre* → *efferre*. The
stem vowel of the base may weaken (*facere* → *-ficere*, *capere* →
*-cipere*). A compound joins two stems: *agricola* (ager + colere),
*aedificare* (aedes + facere).

# Key facts

- Form rules (Matura): the whole word must be covered; nominal suffixes in the nominative singular (-tas, -itia, -tio); base: verbs in the infinitive, nouns/adjectives in the nominative singular; one meaning per part in brackets.
- Examples: tristitia = tristis (sad) + -itia (state); nobilitas = nobilis (noble) + -tas (quality); praeponere = prae- (before) + ponere (put); dimittere = dis- (apart, away) + mittere (send); genetrix = gignere (give birth) + -trix (female agent).
- Assimilation: ad → ac/af/ag/al/ap/ar/as/at (accedere, afferre, aggredi, alloqui, apparere, arripere, assequi, attingere); in → il/im/ir (illustris, impedire, irrumpere); con → col/com/cor/co (colligere, componere, corrumpere, cogere); ex → e/ef (emittere, efferre); ob → oc/of/op (occurrere, offerre, opprimere); sub → suc/suf/sum/sup (succedere, sufferre, summittere, supponere).
- Vowel weakening: facere → efficere, capere → accipere, cadere → accidere, tenere → retinere.
- Loanwords (examples): Vision ← videre; Diktat ← dicere; Mission ← mittere; Akte ← agere; Kurs ← currere (cursus); Preis ← pretium; Porto ← portare.
- Scoring: one point per correct quotation or correctly analysed word; a part split wrongly makes the whole row wrong.

# Level: highschool

<!-- ptf:text v1 -->

Split from the outside in. *impedimentum*: the ending *-mentum* is a
suffix (means, tool, thing that …); what is left, *impedi-*, belongs to
*impedire* (to hinder). *impedire* itself is *in-* (in) + *pes, pedis*
(foot): to put something in the way of the feet. So: *impedire* (hinder) +
suffix *-mentum* (means), or *in-* + *pes* + *-mentum* if three parts are
asked.

Watch for assimilation. *afferre* does not contain a prefix *af-*; it is
*ad-* (to) + *ferre* (bring), with the *d* turned into *f*. Write the
prefix in its basic form: *ad-*.

For loanwords, think of the meaning first and the letters second: a
*Mission* is a sending, and a Latin text with *misit* (he sent) has the
related word.

# Misconceptions

- **assimilated-prefix**: The prefix of afferre is af- → it is ad-; the d is assimilated to f. Give the basic form and its meaning.
- **suffix-form**: Suffixes can be given in any form (-tatem) → nominal suffixes in the nominative singular (-tas), verbs in the infinitive.
- **looks-alike**: Any word with similar letters counts as related → the words must share a stem and meaning (Option – optare, not oppidum).
- **partial-split**: It is enough to name the prefix → the whole word must be covered, with a meaning for each part.

# Questions

```ptf-question
{
  "kind": "cloze",
  "id": "loanwords",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["wf-loanwords"],
  "misconception": "looks-alike",
  "text": "Text: Mercator optimas merces in urbem portavit, ubi cives eas emere optabant; sed pretium nimis magnum erat. Quote the related Latin word: Preis → {{1}}; Porto (postage) → {{2}}; Optimum → {{3}}.",
  "gaps": [
    { "answer": "pretium" },
    { "answer": "portavit" },
    { "answer": "optimas" }
  ],
  "explanation": "pretium (price), portare (carry), optimus (best)."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "assimilation",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["wf-affixes"],
  "misconception": "assimilated-prefix",
  "question": "Which analyses are right (with the prefix in its basic form)?",
  "options": [
    { "text": "afferre = ad- (to) + ferre (bring)", "correct": true, "feedback": "Yes: d assimilated to f." },
    { "text": "impedire = in- (in) + pes (foot) + verb ending", "correct": true, "feedback": "Yes: to put in the way of the feet." },
    { "text": "componere = con- (together) + ponere (put)", "correct": true, "feedback": "Yes: n assimilated to m." },
    { "text": "efficere = ex- (out) + fingere (shape)", "correct": false, "feedback": "-ficere comes from facere (make): ex- + facere." },
    { "text": "occurrere = ob- (against) + currus (chariot)", "correct": false, "feedback": "The base is currere (run): ob- + currere." }
  ],
  "explanation": "Assimilation changes the prefix's last consonant; vowel weakening changes the base (facere → -ficere)."
}
```

```ptf-question
{
  "kind": "cloze",
  "id": "suffix-analysis",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["wf-affixes"],
  "misconception": "suffix-form",
  "text": "Split with suffix in the nominative singular: libertatem = {{1}} (free) + suffix {{2}} (state); orationis = orare (speak) + suffix {{3}} (action).",
  "gaps": [
    { "answer": "liber" },
    { "answer": "-tas", "accepted": ["tas"] },
    { "answer": "-tio", "accepted": ["tio", "-io"] }
  ],
  "explanation": "liber + -tas → libertas; orare + -tio → oratio."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "compounds",
  "level": "highschool",
  "purpose": "check",
  "objectives": ["wf-compounds"],
  "question": "Which compounds are split correctly into two Latin words?",
  "options": [
    { "text": "agricola = ager (field) + colere (cultivate)", "correct": true, "feedback": "Yes." },
    { "text": "magnanimus = magnus (great) + animus (mind)", "correct": true, "feedback": "Yes: great-hearted." },
    { "text": "aedificare = aedes (house) + facere (make)", "correct": true, "feedback": "Yes: to build." },
    { "text": "benevolus = bene (well) + volvere (roll)", "correct": false, "feedback": "The base is velle (want): well-wishing." }
  ],
  "explanation": "A compound joins two stems; the second often decides the word class."
}
```

```ptf-question
{
  "kind": "multiple_choice",
  "id": "word-formation-probe",
  "level": "highschool",
  "purpose": "probe",
  "objectives": ["wf-affixes"],
  "misconception": "partial-split",
  "question": "Which answer to 'split tristitiam' would score?",
  "options": [
    { "text": "tristis (sad) + suffix -itia (state)", "correct": true, "feedback": "Yes: base in the nominative, suffix in the nominative singular, meanings given." },
    { "text": "trist- + -itiam", "correct": false, "feedback": "Base and suffix must be in their dictionary forms, with meanings." },
    { "text": "suffix -itia (sadness)", "correct": false, "feedback": "The base word is missing; the whole word must be covered." }
  ],
  "explanation": "Cover the whole word, give dictionary forms and a meaning for each part."
}
```

```ptf-question
{
  "kind": "free_text",
  "id": "explain-loanword",
  "level": "highschool",
  "purpose": "transfer",
  "objectives": ["wf-loanwords", "wf-affixes"],
  "question": "Explain how the German word 'Konferenz' is related to Latin, naming prefix, base and the shift in meaning.",
  "rubric": [
    "con- (together) + ferre (bring, carry)",
    "conferre = bring together; also compare, discuss",
    "A Konferenz is a meeting where ideas are brought together"
  ],
  "sample_answer": "Konferenz comes from conferre: con- (together) + ferre (bring). conferre means to bring together and also to discuss; at a conference people bring their views together.",
  "explanation": "Prefix + base + meaning link."
}
```

# Tutor notes

- These tasks are the cheapest points of the interpretation part; practise them until each takes under a minute.
- The official prefix/suffix list may be used in the exam: let the learner practise with the same list.

# Sources

Grounding: [^bmbwf-srp-latein]. Text, examples and questions are original.

[^bmbwf-srp-latein]: Bundesministerium für Bildung, Wissenschaft und Forschung, standardised written Matura in Latin (AHS): interpretation tasks on loanwords and word formation; official prefix and suffix list.
