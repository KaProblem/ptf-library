"""Step 3: a first model that learns, the bigram model.

The model is a single table with one row per token. The row of the current
token holds a score (logit) for every possible next token. Training nudges
the numbers in the table, step by step, so that the right next token gets a
higher probability. Then we generate text by sampling one token at a time.

The bigram model only ever looks at the last token. Everything after this
step is about letting the model look further back.

    python3 steps/03_bigram.py
    python3 steps/03_bigram.py --lr 1e-1 --max-iters 1000
"""

import argparse
import os
from pathlib import Path

import torch
import torch.nn as nn
from torch.nn import functional as F

LAB = Path(__file__).resolve().parent.parent
SMOKE = os.environ.get("PTF_SMOKE") == "1"  # tiny run for automated tests

parser = argparse.ArgumentParser(description="Train a bigram language model.")
parser.add_argument("--data", default=str(LAB / "data" / "input.txt"), help="training text (UTF-8)")
parser.add_argument("--block-size", type=int, default=8)
parser.add_argument("--batch-size", type=int, default=32)
parser.add_argument("--max-iters", type=int, default=3000)
parser.add_argument("--eval-interval", type=int, default=300)
parser.add_argument("--eval-iters", type=int, default=200, help="batches to average for a stable loss estimate")
parser.add_argument("--lr", type=float, default=1e-2, help="learning rate")
parser.add_argument("--generate", type=int, default=300, help="characters to generate at the end")
parser.add_argument("--device", default="cuda" if torch.cuda.is_available() else "cpu")
args = parser.parse_args()
if SMOKE:
    args.max_iters, args.eval_interval, args.eval_iters, args.generate = 20, 10, 2, 50

torch.manual_seed(1337)

# --- from steps 1 and 2: tokenizer, split, batches ---
text = Path(args.data).read_text(encoding="utf-8")
chars = sorted(set(text))
vocab_size = len(chars)
stoi = {ch: i for i, ch in enumerate(chars)}
itos = {i: ch for i, ch in enumerate(chars)}
encode = lambda s: [stoi[c] for c in s]
decode = lambda ids: "".join(itos[i] for i in ids)
data = torch.tensor(encode(text), dtype=torch.long)
n = int(0.9 * len(data))
train_data, val_data = data[:n], data[n:]


def get_batch(split):
    d = train_data if split == "train" else val_data
    ix = torch.randint(len(d) - args.block_size, (args.batch_size,))
    x = torch.stack([d[i : i + args.block_size] for i in ix])
    y = torch.stack([d[i + 1 : i + args.block_size + 1] for i in ix])
    return x.to(args.device), y.to(args.device)


class BigramLanguageModel(nn.Module):
    def __init__(self, vocab_size):
        super().__init__()
        # The whole model: a vocab_size x vocab_size table. Row i holds the
        # scores for "which token comes after token i".
        self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)

    def forward(self, idx, targets=None):
        # idx: (B, T) token ids. Looking up each id gives its row: (B, T, vocab_size).
        logits = self.token_embedding_table(idx)
        if targets is None:
            return logits, None
        # Cross-entropy wants (N, C) scores and (N,) targets, so flatten B and T.
        B, T, C = logits.shape
        loss = F.cross_entropy(logits.view(B * T, C), targets.view(B * T))
        return logits, loss

    @torch.no_grad()
    def generate(self, idx, max_new_tokens):
        for _ in range(max_new_tokens):
            logits, _ = self(idx)
            logits = logits[:, -1, :]  # only the last position predicts the next token
            probs = F.softmax(logits, dim=-1)  # scores -> probabilities
            idx_next = torch.multinomial(probs, num_samples=1)  # sample, don't just take the maximum
            idx = torch.cat((idx, idx_next), dim=1)  # append and repeat
        return idx


@torch.no_grad()
def estimate_loss():
    """Average the loss over many batches; one batch alone is too noisy."""
    model.eval()
    out = {}
    for split in ("train", "val"):
        losses = torch.zeros(args.eval_iters)
        for k in range(args.eval_iters):
            X, Y = get_batch(split)
            _, loss = model(X, Y)
            losses[k] = loss.item()
        out[split] = losses.mean().item()
    model.train()
    return out


model = BigramLanguageModel(vocab_size).to(args.device)
start = torch.zeros((1, 1), dtype=torch.long, device=args.device)  # token 0 is the newline character

print(f"vocabulary: {vocab_size}, parameters: {sum(p.numel() for p in model.parameters()):,}")
print(f"a model that guesses uniformly has loss -ln(1/{vocab_size}) = {torch.log(torch.tensor(float(vocab_size))):.3f}")
print("sample before training:")
print(decode(model.generate(start, max_new_tokens=args.generate)[0].tolist()))
print("-" * 40)

# The training loop: forward pass, loss, gradients, update. That is all of training.
optimizer = torch.optim.AdamW(model.parameters(), lr=args.lr)
for it in range(args.max_iters + 1):
    if it % args.eval_interval == 0:
        losses = estimate_loss()
        print(f"step {it:5d}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}")
    if it == args.max_iters:
        break
    xb, yb = get_batch("train")
    logits, loss = model(xb, yb)  # 1. how wrong are we on this batch?
    optimizer.zero_grad(set_to_none=True)
    loss.backward()  # 2. for every number in the table: which direction lowers the loss?
    optimizer.step()  # 3. move every number a little in that direction

print("-" * 40)
print("sample after training:")
print(decode(model.generate(start, max_new_tokens=args.generate)[0].tolist()))
