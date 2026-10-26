# Changelog

## [Unreleased]

### Added
- Bundle `gravity` 0.1.0: learning elements free fall, air resistance, inclined plane, rolling, universal gravitation and curved spacetime (all four levels where it fits, misconceptions, 37 question blocks, `# Further reading`); learning path `pisa-to-einstein`; lockfile.
- Simulators `falling-tower`, `inclined-plane` and `newton-einstein` 1.0.0 (English and German UI, focus mode, self-tests that check computed physics values against closed-form results). `newton-einstein` is the pilot for vendored libraries (SIMULATOR-SPEC §8 proposal): its spacetime station uses the allowlisted `three-core@0.170.0` build and falls back to text without WebGL.
- Bundle `llm-basics` (pilot): learning elements tokenizer, softmax and cross-entropy with level texts, misconceptions and 13 question blocks; learning path `gpt-from-scratch` with 3 written and 5 planned steps; lockfile.
- Simulator `next-char-lab` 1.0.0 (deprecated) and 2.0.0, and `loss-lens` 1.0.0, imported from the first trial session: Google Fonts and localStorage removed, full HTML documents, station ids, PTF runtime integration (levels, goto, snapshot, events, state), self-tests.
- `tools/import-artifact.py`: the one-off importer used for the above.
