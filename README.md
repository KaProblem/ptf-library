# PTF Library

Learning content in the [Personal Tutor Format (PTF)](https://github.com/KaProblem/ptf-spec):
bundles of learning elements (each concept explained at up to four levels:
child, high school, college, expert), question blocks, learning paths,
versioned, sandboxed simulators, and code labs that learners run and extend
on their own machine.

An AI tutor uses this library as material: it picks the right level for the
learner, adapts or rewrites the explanations, shows the simulators and asks
the questions. The content is open; the explanation is personal.

## Contents

| Bundle | Topic | Elements |
| --- | --- | --- |
| [llm-basics](bundles/llm-basics/index.md) | How large language models work | tokenizer, training examples, softmax, cross-entropy, bigram model, causal mask, self-attention, transformer block, residual stream, the whole machine, from babbler to assistant |
| [gravity](bundles/gravity/index.md) | Gravity, from the leaning tower to curved spacetime | free fall, air resistance, inclined plane, rolling, universal gravitation, curved spacetime |

| Simulator | Versions | UI language | Concepts |
| --- | --- | --- | --- |
| [next-char-basics](sims/next-char-basics/) | 1.0.0 | en, de | next-character prediction, tokenizer, bigram counts, sampling, training examples |
| [bigram-lab](sims/bigram-lab/) | 1.0.0 | en, de | loss, validation curve, temperature, bigram table |
| [next-char-lab](sims/next-char-lab/) | 1.0.0, 2.0.0, 2.1.0, 2.2.0 (all deprecated: split into next-char-basics and bigram-lab) | de | tokenizer, bigram, softmax, loss, sampling, temperature |
| [loss-lens](sims/loss-lens/) | 1.0.0, 1.1.0, 1.2.0, 1.3.0 | de | cross-entropy, negative log-likelihood |
| [causal-mask](sims/causal-mask/) | 1.0.0 | en, de | causal mask, weighted average, masked softmax |
| [attention-lab](sims/attention-lab/) | 1.0.0 | en, de | self-attention, query/key/value, scaling, positions |
| [transformer-block](sims/transformer-block/) | 1.0.0 | en | multi-head attention, feed-forward, loss ladder |
| [residual-stream](sims/residual-stream/) | 1.0.0 | en | residual connections, layer norm, dropout, parameter count |
| [babbler-to-assistant](sims/babbler-to-assistant/) | 1.0.0 | en | pretraining, fine-tuning, RLHF, encoder/decoder, scale |
| [training-loop](sims/training-loop/) | 1.0.0, 1.1.0 | en | bigram table, gradient step, learning rate, training loop, generation |
| [gpt-pipeline](sims/gpt-pipeline/) | 1.0.0 | en | the whole GPT pipeline, tensor shapes, context window, learned vs. fixed parts |
| [falling-tower](sims/falling-tower/) | 1.0.0 | en, de | free fall, drag, terminal speed, numerical integration |
| [inclined-plane](sims/inclined-plane/) | 1.0.0 | en, de | inclined plane, t² law, force components, rolling, moment of inertia |
| [newton-einstein](sims/newton-einstein/) | 1.0.0 | en, de | orbits, inverse-square law, spacetime curvature (3D, three.js), GPS clocks, perihelion precession |

| Code lab | Versions | Language | Steps |
| --- | --- | --- | --- |
| [gpt-from-scratch](code/gpt-from-scratch/1.0.0/README.md) | 1.0.0 | Python, PyTorch | tokenizer → batches → bigram → averaging → self-attention → transformer block → GPT → generate |

## Layout

```
bundles/<bundle>/index.md          bundle metadata and table of contents
bundles/<bundle>/elements/*.md     learning elements
bundles/<bundle>/paths/*.md        learning paths
bundles/<bundle>/ptf.lock          pinned simulator versions
sims/<name>/<version>/             immutable simulator packages (sim.json, index.html, ptf-sim.js, test.json)
code/<name>/<version>/             immutable code labs (lab.json, README.md, steps/, data/)
```

## Working on the library

Clone [ptf-spec](https://github.com/KaProblem/ptf-spec) next to this repository, then:

```bash
(cd ../ptf-spec && npm install)
node ../ptf-spec/tools/ptf-check.mjs .                                   # validate everything
node ../ptf-spec/tools/ptf-selftest.mjs sims/*/*/                        # run simulator self-tests (Playwright)
node ../ptf-spec/tools/ptf-selftest.mjs --serve sims/next-char-basics/1.0.0 # try a simulator in the dev host
node ../ptf-spec/tools/ptf-check.mjs hash --write sims/<name>/<version>  # after editing an unpublished version
node ../ptf-spec/tools/ptf-check.mjs lock bundles/<bundle> .             # refresh a bundle's lockfile
node ../ptf-spec/tools/ptf-codetest.mjs code/*/*/                        # smoke-test code labs (needs Python and the lab's packages)
```

Rules:

- Everything in this repository is written in English, except simulator UIs, which declare their language in `sim.json`.
- Published simulator and code lab versions never change. Fix something by adding a new version.
- Code labs follow [CODE-SPEC.md](https://github.com/KaProblem/ptf-spec/blob/main/CODE-SPEC.md): every step runs on its own, no network, no subprocesses.
- Lessons are self-contained: learner-facing text never refers to the source material.
- Simulators follow [SIMULATOR-SPEC.md](https://github.com/KaProblem/ptf-spec/blob/main/SIMULATOR-SPEC.md): no network, no storage, no eval.

## License

Content (bundles): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
Simulators (`sims/`), code labs (`code/`) and tools: MIT. The Tiny Shakespeare text in `code/gpt-from-scratch/*/data/` is public domain. See [LICENSE](LICENSE).

Contributions are licensed under the same terms; contributors are responsible for their content. See [CONTRIBUTING.md](CONTRIBUTING.md).
