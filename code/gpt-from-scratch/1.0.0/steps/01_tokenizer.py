"""Step 1: turn text into numbers.

A language model never sees letters, only numbers. The simplest tokenizer
gives every distinct character its own number. This step reads the training
text, builds that character vocabulary, and shows encode and decode.

    python3 steps/01_tokenizer.py
    python3 steps/01_tokenizer.py --data my_text.txt
"""

import argparse
from pathlib import Path

import torch

LAB = Path(__file__).resolve().parent.parent

parser = argparse.ArgumentParser(description="Build a character tokenizer.")
parser.add_argument("--data", default=str(LAB / "data" / "input.txt"), help="training text (UTF-8)")
args = parser.parse_args()

text = Path(args.data).read_text(encoding="utf-8")
print(f"text length: {len(text):,} characters")
print("first 200 characters:")
print(text[:200])
print("-" * 40)

# The vocabulary: every character that occurs, sorted so the numbering is stable.
chars = sorted(set(text))
vocab_size = len(chars)
print(f"vocabulary ({vocab_size} characters): {''.join(chars)!r}")

# Two lookup tables: character -> number and number -> character.
stoi = {ch: i for i, ch in enumerate(chars)}
itos = {i: ch for i, ch in enumerate(chars)}


def encode(s):
    """Text -> list of integers."""
    return [stoi[c] for c in s]


def decode(ids):
    """List of integers -> text."""
    return "".join(itos[i] for i in ids)


sample = "hii there"
print(f"encode({sample!r}) = {encode(sample)}")
print(f"decode(encode({sample!r})) = {decode(encode(sample))!r}")

# The whole text as one long tensor of token ids.
data = torch.tensor(encode(text), dtype=torch.long)
print(f"data tensor: shape {tuple(data.shape)}, dtype {data.dtype}")
print(f"first 20 ids: {data[:20].tolist()}")

# Keep the last 10 % aside. The model never trains on it, so the loss on it
# tells us whether the model learned general patterns or just memorised.
n = int(0.9 * len(data))
train_data, val_data = data[:n], data[n:]
print(f"train: {len(train_data):,} tokens, validation: {len(val_data):,} tokens")
