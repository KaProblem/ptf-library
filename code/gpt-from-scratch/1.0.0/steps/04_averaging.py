"""Step 4: averaging over the past with a triangular mask.

To look further back than one token, each position needs information from
the positions before it, and never from the ones after it (those are what
it has to predict). The crudest way: average the vectors of all earlier
positions. This step computes that average three ways and shows they agree.
The third way, masked softmax, is exactly the shape self-attention uses.

    python3 steps/04_averaging.py
"""

import torch
from torch.nn import functional as F

torch.manual_seed(1337)
B, T, C = 4, 8, 2  # batch, time, channels
x = torch.randn(B, T, C)

# Version 1: explicit loops. xbow[b, t] = mean of x[b, 0..t]  ("bag of words")
xbow = torch.zeros((B, T, C))
for b in range(B):
    for t in range(T):
        xbow[b, t] = torch.mean(x[b, : t + 1], dim=0)

# Version 2: one matrix multiplication with a lower-triangular weight matrix.
wei = torch.tril(torch.ones(T, T))
wei = wei / wei.sum(1, keepdim=True)  # each row sums to 1
xbow2 = wei @ x  # (T, T) @ (B, T, C) -> (B, T, C)

# Version 3: start from scores (all zero), block the future with -inf, softmax.
tril = torch.tril(torch.ones(T, T))
scores = torch.zeros((T, T))
scores = scores.masked_fill(tril == 0, float("-inf"))
wei3 = F.softmax(scores, dim=-1)  # exp(-inf) = 0, the rest share equally
xbow3 = wei3 @ x

print("weights of version 3 (row t = how much position t takes from each position):")
print(wei3)
print(f"loops == matrix multiply: {torch.allclose(xbow, xbow2, atol=1e-6)}")
print(f"loops == masked softmax:  {torch.allclose(xbow, xbow3, atol=1e-6)}")
print("-" * 40)

# Self-attention replaces the zero scores by "how well does my query match your key".
# Then the weights depend on the data: different tokens take different amounts from the past.
head_size = 16
x = torch.randn(B, T, 32)
key = torch.nn.Linear(32, head_size, bias=False)
query = torch.nn.Linear(32, head_size, bias=False)
k, q = key(x), query(x)  # (B, T, head_size)
scores = q @ k.transpose(-2, -1) * head_size**-0.5  # (B, T, T), scaled so softmax stays soft
scores = scores.masked_fill(tril == 0, float("-inf"))
wei = F.softmax(scores, dim=-1)
torch.set_printoptions(precision=2, sci_mode=False)
print("data-dependent weights for the first sequence (still zero above the diagonal):")
print(wei[0].detach())
