"""Step 5: one head of self-attention.

Every token now gets a vector (token embedding) plus a vector for its
position (position embedding). One self-attention head lets each position
gather information from earlier positions: its query is compared with the
keys of all earlier positions, the scores go through a masked softmax, and
the resulting weights mix the values. A final linear layer turns the result
into scores for the next token.

    python3 steps/05_self_attention.py
    python3 steps/05_self_attention.py --no-mask     # let it peek at the future
    python3 steps/05_self_attention.py --no-scale    # leave out 1/sqrt(head_size)
"""

import argparse
import os
from pathlib import Path

import torch
import torch.nn as nn
from torch.nn import functional as F

LAB = Path(__file__).resolve().parent.parent
SMOKE = os.environ.get("PTF_SMOKE") == "1"

parser = argparse.ArgumentParser(description="Train a model with one self-attention head.")
parser.add_argument("--data", default=str(LAB / "data" / "input.txt"), help="training text (UTF-8)")
parser.add_argument("--block-size", type=int, default=8)
parser.add_argument("--batch-size", type=int, default=32)
parser.add_argument("--n-embd", type=int, default=32, help="size of the token and position vectors")
parser.add_argument("--max-iters", type=int, default=5000)
parser.add_argument("--eval-interval", type=int, default=500)
parser.add_argument("--eval-iters", type=int, default=200)
parser.add_argument("--lr", type=float, default=1e-3)
parser.add_argument("--generate", type=int, default=300)
parser.add_argument("--no-mask", action="store_true", help="remove the causal mask (positions see the future)")
parser.add_argument("--no-scale", action="store_true", help="do not divide the scores by sqrt(head_size)")
parser.add_argument("--device", default="cuda" if torch.cuda.is_available() else "cpu")
args = parser.parse_args()
if SMOKE:
    args.max_iters, args.eval_interval, args.eval_iters, args.generate = 20, 10, 2, 50

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
    """One head of self-attention."""

    def __init__(self, head_size):
        super().__init__()
        self.key = nn.Linear(args.n_embd, head_size, bias=False)  # what do I contain?
        self.query = nn.Linear(args.n_embd, head_size, bias=False)  # what am I looking for?
        self.value = nn.Linear(args.n_embd, head_size, bias=False)  # what do I pass on if you attend to me?
        # tril is not a parameter, just a constant that moves to the device with the model.
        self.register_buffer("tril", torch.tril(torch.ones(args.block_size, args.block_size)))
        self.head_size = head_size

    def forward(self, x):
        B, T, C = x.shape
        k, q = self.key(x), self.query(x)  # (B, T, head_size)
        wei = q @ k.transpose(-2, -1)  # (B, T, T): how well each query matches each key
        if not args.no_scale:
            wei = wei * self.head_size**-0.5  # keeps the scores near variance 1, so softmax stays soft
        if not args.no_mask:
            wei = wei.masked_fill(self.tril[:T, :T] == 0, float("-inf"))  # no peeking at the future
        wei = F.softmax(wei, dim=-1)
        v = self.value(x)
        return wei @ v  # (B, T, head_size): a weighted mix of the values


class SelfAttentionModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.token_embedding_table = nn.Embedding(vocab_size, args.n_embd)
        self.position_embedding_table = nn.Embedding(args.block_size, args.n_embd)
        self.sa_head = Head(args.n_embd)
        self.lm_head = nn.Linear(args.n_embd, vocab_size)  # vectors -> scores for the next token

    def forward(self, idx, targets=None):
        B, T = idx.shape
        tok_emb = self.token_embedding_table(idx)  # (B, T, n_embd): what the token is
        pos_emb = self.position_embedding_table(torch.arange(T, device=idx.device))  # (T, n_embd): where it is
        x = tok_emb + pos_emb
        x = self.sa_head(x)
        logits = self.lm_head(x)  # (B, T, vocab_size)
        if targets is None:
            return logits, None
        loss = F.cross_entropy(logits.view(B * T, -1), targets.view(B * T))
        return logits, loss

    @torch.no_grad()
    def generate(self, idx, max_new_tokens):
        for _ in range(max_new_tokens):
            idx_cond = idx[:, -args.block_size :]  # there are only block_size position embeddings
            logits, _ = self(idx_cond)
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


model = SelfAttentionModel().to(args.device)
print(f"parameters: {sum(p.numel() for p in model.parameters()):,}")
if args.no_mask:
    print("WARNING: no causal mask. Every position can see the token it is supposed to predict.")
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
print("for comparison: the bigram model of step 3 ends at about 2.5")
start = torch.zeros((1, 1), dtype=torch.long, device=args.device)
print(decode(model.generate(start, max_new_tokens=args.generate)[0].tolist()))
