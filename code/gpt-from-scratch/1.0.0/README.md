# GPT from scratch

Build a small GPT, one runnable file per step. Every step is complete on its
own: you can start at any step, compare two steps to see exactly what
changed, and change anything you like. The model reads and writes single
characters and learns from about 1.1 million characters of Shakespeare
(`data/input.txt`), or from any text you give it.

## Setup

You need Python 3.10 or newer. In this folder:

```bash
python3 -m venv .venv && . .venv/bin/activate   # optional, keeps things tidy
python3 -m pip install -r requirements.txt       # installs PyTorch
```

Everything runs on a laptop CPU. A GPU (CUDA, or Apple silicon via `mps`
in step 7) only matters for `--preset gpu`.

## Steps

| # | What it builds | Run | Time on a CPU |
| --- | --- | --- | --- |
| 1 | Turn text into numbers | `python3 steps/01_tokenizer.py` | seconds |
| 2 | One chunk of text is many training examples | `python3 steps/02_batches.py` | seconds |
| 3 | A bigram model that learns, and samples text | `python3 steps/03_bigram.py` | seconds |
| 4 | Averaging over the past with a triangular mask | `python3 steps/04_averaging.py` | seconds |
| 5 | One head of self-attention | `python3 steps/05_self_attention.py` | under a minute |
| 6 | Multi-head attention and feed-forward make a block | `python3 steps/06_transformer_block.py` | 1 to 2 minutes |
| 7 | The complete GPT: residuals, layer norm, dropout | `python3 steps/07_gpt.py` | 5 to 10 minutes |
| 8 | Generate text from the saved model | `python3 steps/08_generate.py --prompt "ROMEO:"` | seconds |

Every script has `--help`. Most take `--data your_text.txt`. Step 7 writes
`out/gpt.pt` and `out/sample.txt`; step 8 reads `out/gpt.pt`.

To see what a step adds, compare it with the one before:

```bash
diff steps/05_self_attention.py steps/06_transformer_block.py
```

## Numbers to compare with

Validation loss on Tiny Shakespeare (lower is better). Your numbers will be
close, not identical.

| Model | Val loss |
| --- | --- |
| Guessing uniformly among 65 characters | 4.17 |
| Untrained bigram table (random start) | about 4.7 |
| Bigram (step 3) | about 2.5 |
| One attention head (step 5) | about 2.4 |
| Four heads (step 6, `--no-ffwd`) | about 2.28 |
| Four heads and feed-forward (step 6) | about 2.2 |
| Three blocks with residuals and layer norm (step 7, `--preset tiny`) | about 2.06 |
| Laptop preset (step 7, 0.8 M parameters) | about 1.68 |
| 10.8 million parameters (step 7, `--preset gpu`) | about 1.48 |

## Build on it

- **Your own text.** Train step 7 on your own writing, song lyrics, code or
  a language you speak. Small, consistent texts of a few hundred thousand
  characters work best.
- **Better tokens.** Replace the character tokenizer with words or with
  byte-pair encoding. The model sees more text per context, but needs a
  bigger embedding table.
- **Watch attention.** Return `wei` from a head in step 5 and print it for a
  sentence you choose. Which earlier characters does each position look at?
- **Learning rate schedule.** Lower the learning rate during step 7's
  training (for example with `torch.optim.lr_scheduler.CosineAnnealingLR`)
  and compare the final loss.
- **Scale it.** On a GPU, run `--preset gpu`, then try more layers or a
  longer context and see what each change costs and gains.
