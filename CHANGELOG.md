# Changelog

## [Unreleased]

### Fixed
- `loss-lens` 1.1.0: the simulator now tells the tutor what the learner did. Every station emits `experienced` with the tried values (p, text, distribution, loss), the quiz is checkable multiple choice with `answered` and misconception IDs, stations emit `station_completed`, the snapshot describes the current values instead of only the visible stations, the whole experiment is saved via `ptf/state` and restored, and the simulator supports focus mode (starts at station 1, Back/Next, progress row, `goto { focus }`).
- `next-char-lab` 2.1.0: follows `goto { focus }` and starts in focus mode, so a path step shows one station instead of six; own texts with emoji no longer break the lab (vocabulary, counting and slicing all split text into code points); every station reports `experienced` and `station_completed`; richer snapshot; full state incl. a custom corpus up to 30,000 characters is saved and restored; the source reference in the footer is gone (lessons are self-contained).
- `training-loop` 1.1.0: resume after a reload. The state holds lookups, the nudged example and its learning rate, training steps (replayed deterministically), generated text, quiz answers, completed stations and focus; starts in focus mode.
- `self-attention` 0.2.2: the hand calculation `tiny-attention` now scales the scores by 1/√d as the element's formula does (first weight 57.6 % instead of 66.5 %) and says what the scaling changes.

### Changed
- Path tutor notes: simulators are aids, said what to look for before and debriefed after; the step 1 guessing game of `gpt-from-scratch` opens the course once, later sessions recall it instead of repeating it.
- Self-tests of the new versions check the tutor contract: events per station, exactly one visible station after a focused `goto`, snapshot contents, and a resume round trip (`reload`), using the new `ptf-selftest` steps (ptf-spec SIMULATOR-SPEC.md §6). `llm-basics` 0.3.2 locks the new versions.
- CI pins every tool: ptf-spec by commit (`PTF_SPEC_REF`), GitHub Actions by commit SHA, the runner image, Node, Python, Playwright and PyTorch by exact version.

### Added
- Learning goals in every element and path (ptf-spec SPEC.md §6.1, §6.7): `objectives`, an `# Introduction` and `use_when` for each simulator station, so the tutor can say what the learner is working towards and open a simulator only when it helps. Paths rename `# Overview` to `# Introduction` and say what the learner can do at the end. `gravity` 0.2.0, `llm-basics` 0.4.0, element minor versions bumped. CI uses the ptf-spec commit that defines these fields.
- Simulators `residual-stream`, `transformer-block`, `attention-lab`, and `gpt-pipeline` 1.1.0 and `training-loop` 1.2.0 (on top of the resumable 1.1.0): following PEDAGOGY.md (predict, then reveal; familiar first), six stations now ask for a guess before showing the result and report it as `answered`; `gpt-pipeline` starts with the familiar sentence (trace) before ordering the parts. `llm-basics` lockfile moves to 1.1.0. The guess is only recorded when picked and judged at the first use of the revealed controls (ptf-spec SIMULATOR-SPEC §7 rule 5).
- Simulators `falling-tower`, `inclined-plane` and `newton-einstein` 1.1.0: predict before you try (every experiment stays locked until a prediction is picked, and the prediction is judged and reported as `answered` only after the result), start at station 1 with a progress row for direct go-to, an illustrated leaning tower and Earth, canvas colours resolved through the browser so host theme tokens no longer turn drawings black, canvases no longer stretched on wide screens. Bundle `gravity` 0.1.2 uses them.
- Wikidata subject anchors (`about`, ptf-spec SPEC.md §6.6) for 16 of 17 learning elements, looked up and verified against Wikidata (`causal-mask` has no matching item). `llm-basics` 0.3.1, `gravity` 0.1.1, element patch versions bumped. CI verifies all IDs with `ptf-wikidata verify`.
- CONTRIBUTING.md and pull request template: contributors are responsible for their content and its legal compliance, license contributions under the repository's licenses, and confirm a contributor statement in every PR.
- Bundle `gravity` 0.1.0: learning elements free fall, air resistance, inclined plane, rolling, universal gravitation and curved spacetime (all four levels where it fits, misconceptions, 37 question blocks, `# Further reading`); learning path `pisa-to-einstein`; lockfile.
- Simulators `falling-tower`, `inclined-plane` and `newton-einstein` 1.0.0 (English and German UI, focus mode, self-tests that check computed physics values against closed-form results). `newton-einstein` is the pilot for vendored libraries (SIMULATOR-SPEC §8 proposal): its spacetime station uses the allowlisted `three-core@0.170.0` build and falls back to text without WebGL.
- Code lab `gpt-from-scratch` 1.0.0 (CODE-SPEC.md): eight runnable Python/PyTorch steps from the character tokenizer to a trained GPT and text generation, each complete on its own, with `try` ideas, CPU-friendly defaults, a `--preset gpu` for the 10.8 M parameter model, the Tiny Shakespeare dataset and a smoke mode. CI runs the smoke test.
- `llm-basics` 0.3.0: elements `bigram-model` (a first model that learns: table lookup, gradient step, learning rate, training loop, generation) and `gpt-end-to-end` (the whole pipeline, shapes, learned vs. fixed parts, context window); path `gpt-from-scratch` 0.3.0 with eleven steps; every element from the tokenizer to the residual stream links its code lab step (`code:`).
- Simulators `training-loop` 1.0.0 (look up a row, nudge one example, train with three learning rates, generate) and `gpt-pipeline` 1.0.0 (order the parts, trace one prediction with shapes, shape quiz, context window, learned or fixed), both with focus mode and self-tests.
- `llm-basics` 0.2.0: learning elements `training-examples`, `causal-mask`, `self-attention`, `transformer-block`, `residual-stream` and `from-babbler-to-assistant`, each with level texts, misconceptions and question blocks; the `gpt-from-scratch` path now has nine written steps and tutor notes for pacing.
- Simulators `causal-mask`, `attention-lab`, `transformer-block`, `residual-stream` and `babbler-to-assistant` 1.0.0, with self-tests. UI in English; `causal-mask` and `attention-lab` also ship a German UI as the example of the language rules in SIMULATOR-SPEC.md §4.6.

- `# Further reading` in all nine elements: the matching section of the source video (with timestamps) and key papers, as an optional deep dive (SPEC.md §6.5).
- Focus mode in the five new simulators (SIMULATOR-SPEC.md §4.7): one station at a time with Back / Next, a "Step by step" button for standalone use; they ship the updated `ptf-sim.js` that passes `{ focus }` to `onGoto`.

### Changed
- `tokenizer` 0.1.1: `leads_to` now includes `training-examples`.
- `softmax`, `cross-entropy` 0.1.1: `# Further reading` added.
- Bundle `llm-basics` (pilot): learning elements tokenizer, softmax and cross-entropy with level texts, misconceptions and 13 question blocks; learning path `gpt-from-scratch` with 3 written and 5 planned steps; lockfile.
- Simulator `next-char-lab` 1.0.0 (deprecated) and 2.0.0, and `loss-lens` 1.0.0, imported from the first trial session: Google Fonts and localStorage removed, full HTML documents, station ids, PTF runtime integration (levels, goto, snapshot, events, state), self-tests.
- `tools/import-artifact.py`: the one-off importer used for the above.
