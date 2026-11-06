"""Figure for the lora element: a frozen W next to the trainable bottleneck B · A.

Usage: python3 figures/src/lora-update.py figures/lora-update.svg"""
import sys
OUT = sys.argv[1]
d = k = 4096
r_ = 8
full, lora = d * k, r_ * (d + k)
# Numbers the captions and the description state.
assert full == 16_777_216 and round(full / 1e6, 1) == 16.8
assert lora == 65_536 and round(100 * lora / full, 2) == 0.39

TITLE = 'LoRA: a frozen matrix and a thin trainable detour'
DESC = ('The input x goes two ways. Upper path: the pretrained weight matrix W of size 4,096 × 4,096 '
        '(16.8 million numbers), frozen. Lower path: matrix A squeezes x to r = 8 numbers (8 × 4,096), '
        'matrix B expands them back to 4,096 (4,096 × 8); only A and B are trained, 65,536 numbers together, '
        '0.39 % of W. Both paths are added: h = W x + (α / r) · B A x. B starts at zero, so at the start '
        'the output equals the pretrained W x.')
CAPS = [
    'The pretrained matrix W (4,096 × 4,096, 16.8 million numbers) stays frozen.',
    'A detour: A squeezes the input x down to r = 8 numbers (8 × 4,096).',
    'B expands the 8 numbers back to 4,096 (4,096 × 8). Only A and B are trained: 65,536 numbers, 0.39 % of W.',
    'Both paths are added: h = W x + (α / r) · B A x. B starts at zero, so training starts from the pretrained model.',
]

def rect(x, y, w, h, cls):
    return f'    <rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" rx="3"/>\n'
def text(x, y, s, cls='t', anchor='middle'):
    return f'    <text class="{cls}" x="{x}" y="{y}" text-anchor="{anchor}">{s}</text>\n'
def arrow(x1, y1, x2, y2, c='ink'):
    return f'    <line class="s-{c} w2" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" marker-end="url(#ptf-arrow-{c})"/>\n'
def poly(pts, cls):
    return f'    <polygon class="{cls}" points="{" ".join(f"{a},{b}" for a, b in pts)}"/>\n'

YW, YL = 92, 207          # centre lines of the upper and lower path
base = (rect(12, 50, 18, 210, 'f-surface s-ink w2') + text(21, 40, 'x', 't-l math bold')
        + rect(306, 50, 18, 210, 'f-surface s-ink w2') + text(315, 40, 'h', 't-l math bold'))
s1 = (arrow(30, YW, 66, YW)
      + rect(70, 32, 120, 120, 'f-surface s-muted w2')
      + text(130, 88, 'W', 't-l bold') + text(130, 112, 'frozen', 't-s f-muted') + text(130, 134, '4,096 × 4,096', 't-s f-muted')
      + arrow(190, YW, 262, 150))
s2 = (arrow(30, YL, 66, YL)
      + poly([(70, 172), (128, 199), (128, 215), (70, 242)], 'f-accent-soft s-accent w2')
      + text(96, 212, 'A', 't-l bold f-accent')
      + text(98, 268, 'A: 8 × 4,096', 't-s f-accent'))
s3 = (poly([(150, 199), (208, 172), (208, 242), (150, 215)], 'f-accent-soft s-accent w2')
      + text(182, 212, 'B', 't-l bold f-accent')
      + f'    <line class="s-accent w2" x1="128" y1="{YL}" x2="150" y2="{YL}"/>\n'
      + text(139, 190, 'r = 8', 't-s f-accent')
      + text(190, 288, 'B: 4,096 × 8', 't-s f-accent'))
s4 = (arrow(208, YL, 262, 168, 'accent')
      + text(250, 214, 'α / r', 't-s f-accent math')
      + f'    <circle class="f-surface s-ink w2" cx="275" cy="160" r="13"/>\n'
      + text(275, 166, '+', 't-l bold')
      + arrow(288, 160, 302, 160)
      + text(168, 314, 'h = W x + (α / r) · B A x', 't math'))

def step(n, inner):
    return f'  <g data-step="{n}" data-caption="{CAPS[n-1]}">\n{inner}  </g>\n'
DEFS = '  <defs>' + ''.join(f'<marker id="ptf-arrow-{c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="f-{c}" d="M0 0 L10 5 L0 10 z"/></marker>' for c in ('ink', 'accent')) + '</defs>\n'
svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 326" role="img" data-ptf-figure="1">\n'
       f'  <title>{TITLE}</title>\n  <desc>{DESC}</desc>\n' + DEFS
       + '  <g>\n' + base + '  </g>\n' + step(1, s1) + step(2, s2) + step(3, s3) + step(4, s4) + '</svg>\n')
open(OUT, 'w').write(svg)
