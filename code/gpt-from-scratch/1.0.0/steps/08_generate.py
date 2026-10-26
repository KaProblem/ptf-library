"""Step 8: generate text from the trained model.

Generation is a loop: feed the text so far (cropped to the context length),
take the scores for the next token, turn them into probabilities, sample
one token, append it, repeat. Temperature and top-k change how adventurous
the sampling is. --explain shows the top candidates for the first tokens.

Needs out/gpt.pt from step 7.

    python3 steps/08_generate.py --prompt "ROMEO:"
    python3 steps/08_generate.py --prompt "ROMEO:" --temperature 0.5 --explain 5
    python3 steps/08_generate.py --top-k 1          # always the most likely token
"""

import argparse
import os
import sys
from pathlib import Path

import torch
import torch.nn as nn
from torch.nn import functional as F

SMOKE = os.environ.get("PTF_SMOKE") == "1"

parser = argparse.ArgumentParser(description="Generate text with the model trained in step 7.")
parser.add_argument("--checkpoint", default="out/gpt.pt")
parser.add_argument("--prompt", default="\n", help="text to continue; only characters the model knows")
parser.add_argument("--tokens", type=int, default=500, help="how many tokens to generate")
parser.add_argument("--temperature", type=float, default=1.0, help="below 1: safer, above 1: wilder")
parser.add_argument("--top-k", type=int, default=0, help="sample only among the k most likely tokens (0 = all)")
parser.add_argument("--explain", type=int, default=0, help="print the top candidates for the first N tokens")
parser.add_argument("--seed", type=int, default=1337)
parser.add_argument("--device", default="cuda" if torch.cuda.is_available() else "cpu")
args = parser.parse_args()
if SMOKE:
    args.tokens, args.explain = 30, 2


# --- the model classes from step 7, unchanged ---
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
        wei = self.dropout(F.softmax(wei, dim=-1))
        return wei @ self.value(x)


class MultiHeadAttention(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        head_size = cfg["n_embd"] // cfg["n_head"]
        self.heads = nn.ModuleList([Head(cfg, head_size) for _ in range(cfg["n_head"])])
        self.proj = nn.Linear(cfg["n_embd"], cfg["n_embd"])
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
            x = x + self.sa(self.ln1(x))
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

    def forward(self, idx):
        B, T = idx.shape
        x = self.token_embedding_table(idx) + self.position_embedding_table(torch.arange(T, device=idx.device))
        return self.lm_head(self.ln_f(self.blocks(x)))


checkpoint = Path(args.checkpoint)
if not checkpoint.exists():
    sys.exit(f"{checkpoint} not found. Train a model first: python3 steps/07_gpt.py")
# weights_only=True: load tensors and plain values only, never code.
ckpt = torch.load(checkpoint, map_location=args.device, weights_only=True)
cfg, chars = ckpt["config"], ckpt["chars"]
stoi = {ch: i for i, ch in enumerate(chars)}
itos = {i: ch for i, ch in enumerate(chars)}
unknown = sorted(set(args.prompt) - set(chars))
if unknown:
    sys.exit(f"the model has never seen these characters: {''.join(unknown)!r}")

model = GPT(cfg).to(args.device)
model.load_state_dict(ckpt["model"])
model.eval()  # dropout off
torch.manual_seed(args.seed)

idx = torch.tensor([[stoi[c] for c in args.prompt]], dtype=torch.long, device=args.device)
print(f"model: {cfg['n_layer']} layers, context {cfg['block_size']}; temperature {args.temperature}, "
      f"top-k {args.top_k or 'off'}")
out = []
with torch.no_grad():
    for i in range(args.tokens):
        context = idx[:, -cfg["block_size"] :]  # the model never sees further back than its context
        logits = model(context)[:, -1, :] / args.temperature
        if args.top_k:
            kth = torch.topk(logits, args.top_k).values[:, -1, None]
            logits = logits.masked_fill(logits < kth, float("-inf"))
        probs = F.softmax(logits, dim=-1)
        nxt = torch.multinomial(probs, num_samples=1)
        if i < args.explain:
            top = torch.topk(probs[0], 5)
            cands = ", ".join(f"{itos[j.item()]!r} {p.item():.2f}" for p, j in zip(top.values, top.indices))
            print(f"after {''.join(itos[j] for j in context[0, -12:].tolist())!r}: {cands} -> picked {itos[nxt.item()]!r}")
        idx = torch.cat((idx, nxt), dim=1)
        out.append(itos[nxt.item()])
print("-" * 40)
print(args.prompt + "".join(out))
print("-" * 40)
print(f"generated {args.tokens} tokens")
