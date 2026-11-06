"""Figure for the transformer-architectures element: which query may attend to which key.

Usage: python3 figures/src/attention-patterns.py figures/attention-patterns.svg"""
import sys
OUT = sys.argv[1]
N, C = 6, 21                     # tokens, cell size
enc = [(q, k) for q in range(N) for k in range(N)]
dec = [(q, k) for q in range(N) for k in range(N) if k <= q]
assert len(enc) == 36 and len(dec) == 21 == N * (N + 1) // 2

TITLE = 'Encoder and decoder: who may look at whom'
DESC = ('Two 6 × 6 grids for a sentence of 6 tokens; rows are the token that looks (query), columns the token '
        'looked at (key). Encoder: all 36 cells are allowed, every token sees every token, before and after it. '
        'Decoder: only the 21 cells on and below the diagonal are allowed, each token sees itself and the tokens '
        'before it. The mask is the only difference between the two.')
CAPS = [
    'Encoder: every token (row) may look at every token (column), before and after it. All 36 cells.',
    'Decoder: each token may look only at itself and the tokens before it. 21 of 36 cells.',
    'Same building blocks, different mask: reading a finished text versus writing one token after another.',
]
def t(x, y, s, cls='t-s f-muted', a='middle'):
    return f'    <text class="{cls}" x="{x}" y="{y}" text-anchor="{a}">{s}</text>\n'
def grid(x0, y0, cells, title, count, cls):
    s = t(x0 + N * C / 2, y0 - 30, title, 't bold f-ink')
    for i in range(N):
        s += t(x0 + i * C + C / 2, y0 - 8, str(i + 1))
        s += t(x0 - 8, y0 + i * C + C / 2 + 5, str(i + 1), 't-s f-muted', 'end')
    for q in range(N):
        for k in range(N):
            on = (q, k) in cells
            s += f'    <rect class="{cls if on else "f-surface"} s-line" x="{x0 + k * C}" y="{y0 + q * C}" width="{C}" height="{C}"/>\n'
    s += t(x0 + N * C / 2, y0 + N * C + 24, count, 't-s f-ink')
    return s
X1, X2, Y = 34, 196, 70
base = t(170, 16, 'row = token that looks, column = token seen', 't-s f-muted')
s1 = grid(X1, Y, enc, 'Encoder', '36 of 36 allowed', 'f-accent-soft')
s2 = grid(X2, Y, dec, 'Decoder', '21 of 36 allowed', 'f-warn-soft')
s3 = (t(170, Y + N * C + 58, 'Only the mask differs:', 't f-ink')
      + t(170, Y + N * C + 80, 'read everything vs. look back only', 't-s f-muted'))
def step(n, inner):
    return f'  <g data-step="{n}" data-caption="{CAPS[n-1]}">\n{inner}  </g>\n'
svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 300" role="img" data-ptf-figure="1">\n'
       f'  <title>{TITLE}</title>\n  <desc>{DESC}</desc>\n'
       + '  <g>\n' + base + '  </g>\n' + step(1, s1) + step(2, s2) + step(3, s3) + '</svg>\n')
open(OUT, 'w').write(svg)
