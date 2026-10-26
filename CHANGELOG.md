# Changelog

## [Unreleased]

### Added
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
