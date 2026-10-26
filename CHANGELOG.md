# Changelog

## [Unreleased]

### Added
- `llm-basics` 0.2.0: learning elements `training-examples`, `causal-mask`, `self-attention`, `transformer-block`, `residual-stream` and `from-babbler-to-assistant`, each with level texts, misconceptions and question blocks; the `gpt-from-scratch` path now has nine written steps and tutor notes for pacing.
- Simulators `causal-mask`, `attention-lab`, `transformer-block`, `residual-stream` and `babbler-to-assistant` 1.0.0 (German UI), with self-tests.

### Changed
- `tokenizer` 0.1.1: `leads_to` now includes `training-examples`.
- Bundle `llm-basics` (pilot): learning elements tokenizer, softmax and cross-entropy with level texts, misconceptions and 13 question blocks; learning path `gpt-from-scratch` with 3 written and 5 planned steps; lockfile.
- Simulator `next-char-lab` 1.0.0 (deprecated) and 2.0.0, and `loss-lens` 1.0.0, imported from the first trial session: Google Fonts and localStorage removed, full HTML documents, station ids, PTF runtime integration (levels, goto, snapshot, events, state), self-tests.
- `tools/import-artifact.py`: the one-off importer used for the above.
