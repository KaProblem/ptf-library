"""Step 7: the complete GPT.

Three additions make deep stacks of blocks trainable:

- Residual connections: every block adds its result to a running stream
  (x = x + block(x)) instead of replacing it, so the signal and the
  gradients have a direct path through the whole network.
- Layer norm before each part (pre-norm): keeps every token vector at a
  similar scale, whatever happened before.
- Dropout: during training, randomly switches off some activations, so the
  model cannot lean on single paths and generalises better.

With these, the model can be scaled up. The default preset runs on a laptop
CPU in a few minutes; --preset gpu is the larger model (about 10 million
parameters) that needs a GPU. The trained model is saved to out/gpt.pt for
step 8.

    python3 steps/07_gpt.py
    python3 steps/07_gpt.py --no-residual          # see why residuals matter
    python3 steps/07_gpt.py --preset gpu           # the big one, on a GPU
    python3 steps/07_gpt.py --data my_text.txt     # learn your own text
"""

import argparse
import os
import time
from pathlib import Path

import torch
import torch.nn as nn
from torch.nn import functional as F

LAB = Path(__file__).resolve().parent.parent
SMOKE = os.environ.get("PTF_SMOKE") == "1"

PRESETS = {
    # the small model of steps 5 and 6, now with residuals and layer norm
    "tiny": dict(block_size=8, batch_size=32, n_embd=32, n_head=4, n_layer=3, dropout=0.0,
                 lr=1e-3, max_iters=5000, eval_interval=500, eval_iters=200),
    # a few minutes on a laptop CPU
    "laptop": dict(block_size=64, batch_size=32, n_embd=128, n_head=4, n_layer=4, dropout=0.1,
                   lr=1e-3, max_iters=3000, eval_interval=300, eval_iters=100),
    # about 10.8 million parameters; roughly 15 minutes on one modern GPU
    "gpu": dict(block_size=256, batch_size=64, n_embd=384, n_head=6, n_layer=6, dropout=0.2,
                lr=3e-4, max_iters=5000, eval_interval=500, eval_iters=200),
}

parser = argparse.ArgumentParser(description="Train a small GPT and save it to out/gpt.pt.")
parser.add_argument("--data", default=str(LAB / "data" / "input.txt"), help="training text (UTF-8)")
parser.add_argument("--preset", choices=PRESETS, default="laptop")
for name in PRESETS["laptop"]:
    kind = float if name in ("dropout", "lr") else int
    parser.add_argument("--" + name.replace("_", "-"), type=kind, default=None, help="overrides the preset")
parser.add_argument("--no-residual", action="store_true", help="blocks replace the stream instead of adding to it")
parser.add_argument("--no-layernorm", action="store_true", help="leave out layer norm")
parser.add_argument("--generate", type=int, default=500)
parser.add_argument("--out", default="out", help="directory for the checkpoint and the sample")
parser.add_argument("--device", default="cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu")
args = parser.parse_args()
for name, value in PRESETS[args.preset].items():
    if getattr(args, name) is None:
        setattr(args, name, value)
if SMOKE:
    args.max_iters, args.eval_interval, args.eval_iters, args.generate = 20, 10, 2, 50
    args.block_size, args.n_embd, args.n_layer = min(args.block_size, 16), 32, 2
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
    def __init__(self, cfg, head_size):
        super().__init__()
        self.key = nn.Linear(cfg["n_embd"], head_size, bias=False)
        self.query = nn.Linear(cfg["n_embd"], head_size, bias=False)
        self.value = nn.Linear(cfg["n_embd"], head_size, bias=False)
        self.register_buffer("tril", torch.tril(torch.ones(cfg["block_size"], cfg["block_size"])))
        self.dropout = nn.Dropout(cfg["dropout"])

    def forward(self, x):
        B, T, C = x.shape
        k, q = self.key(x), self.query(x)
        wei = q @ k.transpose(-2, -1) * k.shape[-1] ** -0.5
        wei = wei.masked_fill(self.tril[:T, :T] == 0, float("-inf"))
        wei = self.dropout(F.softmax(wei, dim=-1))  # randomly drop some attention links
        return wei @ self.value(x)


class MultiHeadAttention(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        head_size = cfg["n_embd"] // cfg["n_head"]
        self.heads = nn.ModuleList([Head(cfg, head_size) for _ in range(cfg["n_head"])])
        self.proj = nn.Linear(cfg["n_embd"], cfg["n_embd"])  # projection back into the residual stream
        self.dropout = nn.Dropout(cfg["dropout"])

    def forward(self, x):
        return self.dropout(self.proj(torch.cat([h(x) for h in self.heads], dim=-1)))


class FeedForward(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        n = cfg["n_embd"]
        self.net = nn.Sequential(nn.Linear(n, 4 * n), nn.ReLU(), nn.Linear(4 * n, n), nn.Dropout(cfg["dropout"]))

    def forward(self, x):
        return self.net(x)


class Block(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        self.residual = cfg["residual"]
        self.sa = MultiHeadAttention(cfg)
        self.ffwd = FeedForward(cfg)
        norm = nn.LayerNorm if cfg["layernorm"] else lambda n: nn.Identity()
        self.ln1, self.ln2 = norm(cfg["n_embd"]), norm(cfg["n_embd"])

    def forward(self, x):
        if self.residual:
            x = x + self.sa(self.ln1(x))  # read from the stream, add the result back
            x = x + self.ffwd(self.ln2(x))
        else:
            x = self.sa(self.ln1(x))
            x = self.ffwd(self.ln2(x))
        return x


class GPT(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        self.cfg = cfg
        self.token_embedding_table = nn.Embedding(cfg["vocab_size"], cfg["n_embd"])
        self.position_embedding_table = nn.Embedding(cfg["block_size"], cfg["n_embd"])
        self.blocks = nn.Sequential(*[Block(cfg) for _ in range(cfg["n_layer"])])
        self.ln_f = nn.LayerNorm(cfg["n_embd"]) if cfg["layernorm"] else nn.Identity()
        self.lm_head = nn.Linear(cfg["n_embd"], cfg["vocab_size"])

    def forward(self, idx, targets=None):
        B, T = idx.shape
        x = self.token_embedding_table(idx) + self.position_embedding_table(torch.arange(T, device=idx.device))
        x = self.blocks(x)
        logits = self.lm_head(self.ln_f(x))
        if targets is None:
            return logits, None
        return logits, F.cross_entropy(logits.view(B * T, -1), targets.view(B * T))

    @torch.no_grad()
    def generate(self, idx, max_new_tokens, temperature=1.0):
        for _ in range(max_new_tokens):
            logits, _ = self(idx[:, -self.cfg["block_size"] :])
            probs = F.softmax(logits[:, -1, :] / temperature, dim=-1)
            idx = torch.cat((idx, torch.multinomial(probs, num_samples=1)), dim=1)
        return idx


@torch.no_grad()
def estimate_loss():
    model.eval()  # switches dropout off
    out = {}
    for split in ("train", "val"):
        losses = torch.zeros(args.eval_iters)
        for k in range(args.eval_iters):
            X, Y = get_batch(split)
            losses[k] = model(X, Y)[1].item()
        out[split] = losses.mean().item()
    model.train()
    return out


cfg = dict(vocab_size=vocab_size, block_size=args.block_size, n_embd=args.n_embd, n_head=args.n_head,
           n_layer=args.n_layer, dropout=args.dropout, residual=not args.no_residual, layernorm=not args.no_layernorm)
model = GPT(cfg).to(args.device)
print(f"preset {args.preset}: {args.n_layer} layers, {args.n_head} heads, n_embd {args.n_embd}, "
      f"context {args.block_size}, dropout {args.dropout}, residual {'on' if cfg['residual'] else 'off'}, "
      f"layer norm {'on' if cfg['layernorm'] else 'off'}, device {args.device}")
print(f"parameters: {sum(p.numel() for p in model.parameters()) / 1e6:.2f} M")

optimizer = torch.optim.AdamW(model.parameters(), lr=args.lr)
started = time.time()
for it in range(args.max_iters + 1):
    if it % args.eval_interval == 0:
        losses = estimate_loss()
        print(f"step {it:5d}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}  ({time.time() - started:.0f} s)")
    if it == args.max_iters:
        break
    xb, yb = get_batch("train")
    _, loss = model(xb, yb)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    optimizer.step()

out = Path(args.out)
out.mkdir(exist_ok=True)
# Only tensors, numbers and strings: step 8 can load this with weights_only=True.
torch.save({"model": model.state_dict(), "config": cfg, "chars": "".join(chars)}, out / "gpt.pt")
model.eval()
start = torch.zeros((1, 1), dtype=torch.long, device=args.device)
sample = decode(model.generate(start, max_new_tokens=args.generate)[0].tolist())
(out / "sample.txt").write_text(sample, encoding="utf-8")
print("-" * 40)
print(sample)
print("-" * 40)
print(f"saved the model to {out / 'gpt.pt'}; continue with: python3 steps/08_generate.py --prompt \"ROMEO:\"")
