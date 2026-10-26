"""Step 2: one chunk of text is many training examples.

A chunk of block_size + 1 tokens holds block_size examples at once: after
the first token, after the first two, and so on. Many chunks go into a batch
and are processed side by side, but they never influence each other.

    python3 steps/02_batches.py
    python3 steps/02_batches.py --block-size 16 --batch-size 2
"""

import argparse
from pathlib import Path

import torch

LAB = Path(__file__).resolve().parent.parent

parser = argparse.ArgumentParser(description="Show how training examples are cut from the text.")
parser.add_argument("--data", default=str(LAB / "data" / "input.txt"), help="training text (UTF-8)")
parser.add_argument("--block-size", type=int, default=8, help="context length T")
parser.add_argument("--batch-size", type=int, default=4, help="chunks per batch B")
args = parser.parse_args()

torch.manual_seed(1337)

# --- from step 1: tokenizer and train/validation split ---
text = Path(args.data).read_text(encoding="utf-8")
chars = sorted(set(text))
stoi = {ch: i for i, ch in enumerate(chars)}
itos = {i: ch for i, ch in enumerate(chars)}
encode = lambda s: [stoi[c] for c in s]
decode = lambda ids: "".join(itos[i] for i in ids)
data = torch.tensor(encode(text), dtype=torch.long)
n = int(0.9 * len(data))
train_data, val_data = data[:n], data[n:]

block_size, batch_size = args.block_size, args.batch_size

# One chunk: inputs are tokens 0..T-1, targets are the same tokens shifted by one.
x = train_data[:block_size]
y = train_data[1 : block_size + 1]
print(f"one chunk of {block_size + 1} tokens gives {block_size} examples:")
for t in range(block_size):
    context, target = x[: t + 1], y[t]
    print(f"  {decode(context.tolist())!r:>14} -> {decode([target.item()])!r}")
print("-" * 40)


def get_batch(split):
    """B random chunks of T tokens, plus the targets shifted by one."""
    d = train_data if split == "train" else val_data
    ix = torch.randint(len(d) - block_size, (batch_size,))
    xb = torch.stack([d[i : i + block_size] for i in ix])
    yb = torch.stack([d[i + 1 : i + block_size + 1] for i in ix])
    return xb, yb


xb, yb = get_batch("train")
print(f"inputs xb: shape {tuple(xb.shape)}  (batch B={batch_size}, time T={block_size})")
print(xb)
print(f"targets yb: shape {tuple(yb.shape)}")
print(yb)
print(f"this batch holds {batch_size * block_size} independent examples, for instance:")
for b in range(min(batch_size, 2)):
    for t in range(min(block_size, 3)):
        print(f"  row {b}: when the input is {xb[b, : t + 1].tolist()} the target is {yb[b, t].item()}")
