# Changelog

## [Unreleased]

### Added
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
