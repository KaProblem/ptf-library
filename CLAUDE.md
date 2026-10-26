# CLAUDE.md

Content library for the **Personal Tutor Format (PTF)**. The format itself, the schemas and the
tools live in [ptf-spec](https://github.com/KaProblem/ptf-spec); read its SPEC.md and
SIMULATOR-SPEC.md before adding content.

- Write everything in **English** (simulator UIs may use another language, declared in `sim.json`).
- Learning elements are material for a tutor, not finished lessons: get Core, Key facts and
  Misconceptions right; level texts are optional and start with something to try.
- Lessons must be self-contained: never refer to the source video/paper in learner-facing text.
  Sources go into `sources` frontmatter only.
- Never modify a published `sims/<name>/<version>/`; create a new version and update ranges/lockfiles.
- Before committing: `node ../ptf-spec/tools/ptf-check.mjs .` (0 errors) and
  `node ../ptf-spec/tools/ptf-selftest.mjs sims/*/*/` for changed simulators.
- Update CHANGELOG.md and the bundle's log.md.
