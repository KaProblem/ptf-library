"""Step 6: multi-head attention plus feed-forward make a block.

Several small attention heads run in parallel, each free to look for a
different kind of relation, and their outputs are concatenated. Attention
is the communication between tokens; the feed-forward layer that follows is
the computation, done on every token separately. Together they form a block.

This step has no residual connections and no layer norm yet. Try stacking
more blocks with --n-layer 4 and watch the loss: depth alone does not help
much. Step 7 fixes that.

    python3 steps/06_transformer_block.py
    python3 steps/06_transformer_block.py --n-head 1 --no-ffwd   # back to step 5
    python3 steps/06_transformer_block.py --n-layer 4
"""

import argparse
import os
from pathlib import Path

import torch
import torch.nn as nn
from torch.nn import functional as F

LAB = Path(__file__).resolve().parent.parent
SMOKE = os.environ.get("PTF_SMOKE") == "1"

parser = argparse.ArgumentParser(description="Train a model made of transformer blocks without residuals.")
parser.add_argument("--data", default=str(LAB / "data" / "input.txt"), help="training text (UTF-8)")
parser.add_argument("--block-size", type=int, default=8)
parser.add_argument("--batch-size", type=int, default=32)
parser.add_argument("--n-embd", type=int, default=32)
parser.add_argument("--n-head", type=int, default=4, help="attention heads per block; n-embd must be divisible by it")
parser.add_argument("--n-layer", type=int, default=1, help="number of blocks")
parser.add_argument("--no-ffwd", action="store_true", help="leave out the feed-forward layer")
parser.add_argument("--max-iters", type=int, default=5000)
parser.add_argument("--eval-interval", type=int, default=500)
parser.add_argument("--eval-iters", type=int, default=200)
parser.add_argument("--lr", type=float, default=1e-3)
parser.add_argument("--generate", type=int, default=300)
parser.add_argument("--device", default="cuda" if torch.cuda.is_available() else "cpu")
args = parser.parse_args()
if SMOKE:
    args.max_iters, args.eval_interval, args.eval_iters, args.generate = 20, 10, 2, 50
assert args.n_embd % args.n_head == 0, "--n-embd must be divisible by --n-head"

torch.manual_seed(1337)

# --- from steps 1 and 2 ---
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


class Head(nn.Module):
    """One head of self-attention (step 5)."""

    def __init__(self, head_size):
        super().__init__()
        self.key = nn.Linear(args.n_embd, head_size, bias=False)
        self.query = nn.Linear(args.n_embd, head_size, bias=False)
        self.value = nn.Linear(args.n_embd, head_size, bias=False)
        self.register_buffer("tril", torch.tril(torch.ones(args.block_size, args.block_size)))

    def forward(self, x):
        B, T, C = x.shape
        k, q = self.key(x), self.query(x)
        wei = q @ k.transpose(-2, -1) * k.shape[-1] ** -0.5
        wei = wei.masked_fill(self.tril[:T, :T] == 0, float("-inf"))
        wei = F.softmax(wei, dim=-1)
        return wei @ self.value(x)


class MultiHeadAttention(nn.Module):
    """Several heads in parallel; their outputs are concatenated."""

    def __init__(self, num_heads, head_size):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])

    def forward(self, x):
        return torch.cat([h(x) for h in self.heads], dim=-1)  # num_heads * head_size = n_embd


class FeedForward(nn.Module):
    """A small two-layer network applied to every token on its own."""

    def __init__(self, n_embd):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(n_embd, 4 * n_embd), nn.ReLU(), nn.Linear(4 * n_embd, n_embd))

    def forward(self, x):
        return self.net(x)


class Block(nn.Module):
    """Communication (attention) followed by computation (feed-forward)."""

    def __init__(self):
        super().__init__()
        self.sa = MultiHeadAttention(args.n_head, args.n_embd // args.n_head)
        self.ffwd = nn.Identity() if args.no_ffwd else FeedForward(args.n_embd)

    def forward(self, x):
        x = self.sa(x)
        x = self.ffwd(x)
        return x


class BlockModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.token_embedding_table = nn.Embedding(vocab_size, args.n_embd)
        self.position_embedding_table = nn.Embedding(args.block_size, args.n_embd)
        self.blocks = nn.Sequential(*[Block() for _ in range(args.n_layer)])
        self.lm_head = nn.Linear(args.n_embd, vocab_size)

    def forward(self, idx, targets=None):
        B, T = idx.shape
        x = self.token_embedding_table(idx) + self.position_embedding_table(torch.arange(T, device=idx.device))
        x = self.blocks(x)
        logits = self.lm_head(x)
        if targets is None:
            return logits, None
        return logits, F.cross_entropy(logits.view(B * T, -1), targets.view(B * T))

    @torch.no_grad()
    def generate(self, idx, max_new_tokens):
        for _ in range(max_new_tokens):
            logits, _ = self(idx[:, -args.block_size :])
            probs = F.softmax(logits[:, -1, :], dim=-1)
            idx = torch.cat((idx, torch.multinomial(probs, num_samples=1)), dim=1)
        return idx


@torch.no_grad()
def estimate_loss():
    model.eval()
    out = {}
    for split in ("train", "val"):
        losses = torch.zeros(args.eval_iters)
        for k in range(args.eval_iters):
            X, Y = get_batch(split)
            losses[k] = model(X, Y)[1].item()
        out[split] = losses.mean().item()
    model.train()
    return out


model = BlockModel().to(args.device)
print(f"{args.n_layer} block(s), {args.n_head} head(s) of size {args.n_embd // args.n_head}, "
      f"feed-forward {'off' if args.no_ffwd else 'on'}, parameters: {sum(p.numel() for p in model.parameters()):,}")
optimizer = torch.optim.AdamW(model.parameters(), lr=args.lr)
for it in range(args.max_iters + 1):
    if it % args.eval_interval == 0:
        losses = estimate_loss()
        print(f"step {it:5d}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}")
    if it == args.max_iters:
        break
    xb, yb = get_batch("train")
    _, loss = model(xb, yb)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    optimizer.step()

print("-" * 40)
print("for comparison: one head (step 5) ends at about 2.4")
start = torch.zeros((1, 1), dtype=torch.long, device=args.device)
print(decode(model.generate(start, max_new_tokens=args.generate)[0].tolist()))
