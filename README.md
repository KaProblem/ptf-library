# PTF Library

Learning content in the [Personal Tutor Format (PTF)](https://github.com/KaProblem/ptf-spec):
bundles of learning elements (each concept explained at up to four levels:
child, high school, college, expert), question blocks, learning paths, and
versioned, sandboxed simulators.

An AI tutor uses this library as material: it picks the right level for the
learner, adapts or rewrites the explanations, shows the simulators and asks
the questions. The content is open; the explanation is personal.

## Contents

| Bundle | Topic | Elements |
| --- | --- | --- |
| [llm-basics](bundles/llm-basics/index.md) | How large language models work | tokenizer, softmax, cross-entropy (+ 5 planned steps) |

| Simulator | Versions | UI language | Concepts |
| --- | --- | --- | --- |
| [next-char-lab](sims/next-char-lab/) | 1.0.0 (deprecated), 2.0.0 | de | tokenizer, bigram, softmax, loss, sampling, temperature |
| [loss-lens](sims/loss-lens/) | 1.0.0 | de | cross-entropy, negative log-likelihood |

## Layout

```
bundles/<bundle>/index.md          bundle metadata and table of contents
bundles/<bundle>/elements/*.md     learning elements
bundles/<bundle>/paths/*.md        learning paths
bundles/<bundle>/ptf.lock          pinned simulator versions
sims/<name>/<version>/             immutable simulator packages (sim.json, index.html, ptf-sim.js, test.json)
```

## Working on the library

Clone [ptf-spec](https://github.com/KaProblem/ptf-spec) next to this repository, then:

```bash
(cd ../ptf-spec && npm install)
node ../ptf-spec/tools/ptf-check.mjs .                                   # validate everything
node ../ptf-spec/tools/ptf-selftest.mjs sims/*/*/                        # run simulator self-tests (Playwright)
node ../ptf-spec/tools/ptf-selftest.mjs --serve sims/next-char-lab/2.0.0 # try a simulator in the dev host
node ../ptf-spec/tools/ptf-check.mjs hash --write sims/<name>/<version>  # after editing an unpublished version
node ../ptf-spec/tools/ptf-check.mjs lock bundles/<bundle> .             # refresh a bundle's lockfile
```

Rules:

- Everything in this repository is written in English, except simulator UIs, which declare their language in `sim.json`.
- Published simulator versions never change. Fix something by adding a new version.
- Lessons are self-contained: learner-facing text never refers to the source material.
- Simulators follow [SIMULATOR-SPEC.md](https://github.com/KaProblem/ptf-spec/blob/main/SIMULATOR-SPEC.md): no network, no storage, no eval.

## License

Content (bundles): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
Simulators (`sims/`) and tools: MIT. See [LICENSE](LICENSE).

Contributions are licensed under the same terms; contributors are responsible for their content. See [CONTRIBUTING.md](CONTRIBUTING.md).
