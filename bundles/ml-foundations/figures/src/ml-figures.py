"""Figures for the ml-foundations bundle (SPEC.md §6.8).

Usage: python3 figures/src/ml-figures.py figures
Writes learning-rates.svg, roc-curve.svg, overfitting-curves.svg and tiny-network.svg.
Every number a caption or description states is computed or asserted here."""
import os, sys
OUT = sys.argv[1] if len(sys.argv) > 1 else 'figures'
r = lambda v: f'{v:.1f}'
DEFS = '  <defs>' + ''.join(f'<marker id="ptf-arrow-{c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="f-{c}" d="M0 0 L10 5 L0 10 z"/></marker>' for c in ('ink', 'muted', 'accent', 'warn', 'good')) + '</defs>\n'
def step(n, cap, inner): return f'  <g data-step="{n}" data-caption="{cap}">\n{inner}  </g>\n'
def svg(name, w, h, title, desc, body):
    assert w <= 360
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-labelledby="{name}-t {name}-d" data-ptf-figure="1">\n'
         f'  <title id="{name}-t">{title}</title>\n  <desc id="{name}-d">{desc}</desc>\n' + DEFS + body + '</svg>\n')
    open(os.path.join(OUT, name + '.svg'), 'w').write(s)
def text(x, y, s, cls='t-s f-ink', anchor='start'):
    return f'    <text class="{cls}" x="{r(x)}" y="{r(y)}"' + ('' if anchor == 'start' else f' text-anchor="{anchor}"') + f'>{s}</text>\n'
def line(x1, y1, x2, y2, cls, extra=''):
    return f'    <line class="{cls}" x1="{r(x1)}" y1="{r(y1)}" x2="{r(x2)}" y2="{r(y2)}"{extra}/>\n'
def circle(x, y, rad, cls): return f'    <circle class="{cls}" cx="{r(x)}" cy="{r(y)}" r="{rad}"/>\n'
def poly(pts, cls): return f'    <polyline class="{cls}" points="' + ' '.join(f'{r(a)},{r(b)}' for a, b in pts) + '"/>\n'

# ---------- 1. learning-rates: L(w) = (w − 3)², start w = 0, three learning rates ----------
L = lambda w: (w - 3) ** 2
def path(a, n): ws = [0.0]; [ws.append(ws[-1] - a * 2 * (ws[-1] - 3)) for _ in range(n)]; return ws
p1, p5, p11 = path(0.1, 4), path(0.5, 2), path(1.1, 3)
assert [round(x, 3) for x in p1] == [0, 0.6, 1.08, 1.464, 1.771]
assert p5[1] == 3 and p5[2] == 3
assert [round(x, 3) for x in p11] == [0, 6.6, -1.32, 8.184]
def panel(top, ws, label, cls):
    ox, sx, sy, base = 22, 25, 2.6, top + 100   # w from −2 to 10, L up to 36 → 94 units high
    X = lambda w: ox + (w + 2) * sx
    Y = lambda l: base - l * sy
    s = line(X(-2), base, X(10.3), base, 's-ink w1', ' marker-end="url(#ptf-arrow-ink)"')
    for t in (0, 3, 6, 9):
        s += line(X(t), base, X(t), base + 4, 's-ink w1') + text(X(t), base + 18, str(t), 't-s f-muted', 'middle')
    s += text(X(10.3), base - 6, 'w', 't-s f-ink math', 'end')
    curve = [(X(w / 10), Y(L(w / 10))) for w in range(-20, 101) if L(w / 10) <= 36.5]
    s += poly(curve, 's-muted w2')
    for a, b in zip(ws, ws[1:]):
        long = ((X(b) - X(a)) ** 2 + (Y(L(b)) - Y(L(a))) ** 2) ** 0.5 > 30   # short hops get no arrowhead, it would hide them
        s += f'    <path class="s-{cls} w2" d="M{r(X(a))} {r(Y(L(a)))} L{r(X(b))} {r(Y(L(b)))}"' + (f' marker-end="url(#ptf-arrow-{cls})"' if long else '') + '/>\n'
    for w in ws: s += circle(X(w), Y(L(w)), 4, f'f-{cls}')
    s += text(ox + 4, top + 2, label, f't-s bold f-{cls}')
    return s
lr_body = (step(1, 'α = 0.1: each step shrinks the distance to the bottom only by the factor 0.8. After 4 steps w is 1.77, still far from 3.', panel(14, p1, 'α = 0.1: too small, slow progress', 'accent'))
         + step(2, 'α = 0.5: for this valley the first step lands exactly on the bottom at w = 3.', panel(150, p5, 'α = 0.5: right size, one step to 3', 'good'))
         + step(3, 'α = 1.1: every step overshoots further, 0 → 6.6 → −1.32 → 8.18. The loss grows: training diverges.', panel(286, p11, 'α = 1.1: too large, runs away', 'warn')))
svg('learning-rates', 340, 420, 'Three learning rates on the same loss valley',
    'Three copies of the loss curve L(w) = (w − 3)², each with gradient descent starting at w = 0. Top, α = 0.1: small steps 0, 0.6, 1.08, 1.46, 1.77, still far from the minimum at 3. Middle, α = 0.5: one step lands on w = 3. Bottom, α = 1.1: the steps overshoot and grow, 0, 6.6, −1.32, 8.18, so the loss rises and training diverges.', lr_body)

# ---------- 2. roc-curve: the eight-email example ----------
emails = [(0.95, 1), (0.85, 1), (0.70, 0), (0.60, 1), (0.45, 0), (0.40, 1), (0.20, 0), (0.10, 0)]
P, N = sum(y for _, y in emails), sum(1 - y for _, y in emails)
pts = [(0.0, 0.0)]
for t, _ in emails:
    tp = sum(1 for s, y in emails if s >= t and y); fp = sum(1 for s, y in emails if s >= t and not y)
    pts.append((fp / N, tp / P))
auc = sum((b[0] - a[0]) * a[1] for a, b in zip(pts, pts[1:]))
assert auc == 0.8125 and (P, N) == (4, 4)
tp5 = sum(1 for s, y in emails if s >= 0.5 and y); fp5 = sum(1 for s, y in emails if s >= 0.5 and not y)
assert (fp5 / N, tp5 / P) == (0.25, 0.75)
ox, oy, S = 56, 286, 256
X = lambda f: ox + f * S
Y = lambda t: oy - t * S
base = '  <g>\n'
for k in range(5):
    v = k / 4
    base += line(X(v), Y(0), X(v), Y(1), 's-line w1') + line(X(0), Y(v), X(1), Y(v), 's-line w1')
    base += text(X(v), oy + 18, f'{v:g}', 't-s f-muted', 'middle') + text(ox - 6, Y(v) + 5, f'{v:g}', 't-s f-muted', 'end')
base += text(X(1), oy + 36, 'false positive rate (FPR)', 't-s f-ink', 'end')
base += text(ox - 44, Y(1) - 12, 'true positive rate (TPR)', 't-s f-ink')
base += '  </g>\n'
s1 = ''.join(circle(X(f), Y(t), 4.5, 'f-accent') for f, t in pts)
s1 += circle(X(0.25), Y(0.75), 7, 'f-none s-warn w2') + text(X(0.04), Y(0.92), 'threshold 0.5:', 't-s f-warn') + text(X(0.04), Y(0.84), '(0.25, 0.75)', 't-s f-warn')
area = f'    <path class="f-accent-soft" d="M{r(X(0))} {r(Y(0))} ' + ' '.join(f'L{r(X(f))} {r(Y(t))}' for f, t in pts) + f' L{r(X(1))} {r(Y(0))} Z"/>\n'
s2 = area + poly([(X(f), Y(t)) for f, t in pts], 's-accent w3') + text(X(0.55), Y(0.35), 'AUC = 0.8125', 't f-accent bold')
s3 = line(X(0), Y(0), X(1), Y(1), 's-muted w2 dash') + text(X(1) - 4, Y(0.06), 'random: AUC 0.5', 't-s f-muted', 'end')
roc_body = base + step(1, 'Each threshold gives one point (FPR, TPR). From the highest to the lowest score: (0, 0.25), (0, 0.5), (0.25, 0.5), … up to (1, 1). Threshold 0.5 gives (0.25, 0.75).', s1) \
    + step(2, 'Joining the points gives the ROC curve. The area under it is 0.8125: 13 of the 16 spam/normal pairs are ranked correctly.', s2) \
    + step(3, 'The diagonal is random guessing, AUC 0.5. The closer the curve hugs the top left corner, the better the scores separate the classes.', s3)
assert round(auc * 16) == 13
svg('roc-curve', 340, 340, 'ROC curve of eight emails',
    'ROC curve for eight emails with scores 0.95 spam, 0.85 spam, 0.70 normal, 0.60 spam, 0.45 normal, 0.40 spam, 0.20 normal, 0.10 normal. Lowering the threshold step by step gives the points (0, 0), (0, 0.25), (0, 0.5), (0.25, 0.5), (0.25, 0.75), (0.5, 0.75), (0.5, 1), (0.75, 1), (1, 1); threshold 0.5 is the point (0.25, 0.75). The area under the curve is 0.8125 (13 of 16 pairs ranked correctly), compared with 0.5 for the dashed diagonal of random guessing.', roc_body)

# ---------- 3. overfitting-curves ----------
train = [0.85, 0.52, 0.36, 0.28, 0.21, 0.15]
val = [0.90, 0.60, 0.45, 0.41, 0.43, 0.48]
best = val.index(min(val)) + 1
assert best == 4 and all(a > b for a, b in zip(train, train[1:]))
ox, oy, sx, sy = 50, 250, 52, 220
X = lambda e: ox + (e - 1) * sx + 14
Y = lambda l: oy - l * sy
base = '  <g>\n'
for k in range(0, 5):
    v = k * 0.25
    base += line(ox, Y(v), X(6) + 14, Y(v), 's-line w1') + text(ox - 6, Y(v) + 5, f'{v:g}', 't-s f-muted', 'end')
for e in range(1, 7): base += text(X(e), oy + 18, str(e), 't-s f-muted', 'middle')
base += text(X(6) + 14, oy + 36, 'epoch', 't-s f-ink', 'end') + text(ox - 40, Y(1) - 8, 'loss', 't-s f-ink')
base += '  </g>\n'
c1 = poly([(X(e + 1), Y(v)) for e, v in enumerate(train)], 's-accent w3') + ''.join(circle(X(e + 1), Y(v), 4, 'f-accent') for e, v in enumerate(train)) + text(X(6), Y(train[-1]) + 22, 'training', 't-s f-accent', 'end')
c2 = poly([(X(e + 1), Y(v)) for e, v in enumerate(val)], 's-warn w3') + ''.join(circle(X(e + 1), Y(v), 4, 'f-warn') for e, v in enumerate(val)) + text(X(6), Y(val[-1]) - 12, 'validation', 't-s f-warn', 'end')
c3 = line(X(best), Y(0), X(best), Y(1), 's-good w2 dash') + circle(X(best), Y(val[best - 1]), 7, 'f-none s-good w2') + text(X(best) - 6, Y(0.92), 'best: epoch 4', 't-s f-good bold', 'end') + text(X(best) + 6, Y(0.92), 'overfitting →', 't-s f-muted')
ov_body = base + step(1, 'Training loss falls every epoch: 0.85, 0.52, 0.36, 0.28, 0.21, 0.15.', c1) \
    + step(2, 'Validation loss falls at first, is lowest at epoch 4 (0.41) and then rises again: 0.43, 0.48.', c2) \
    + step(3, 'From epoch 5 on the model memorizes the training data. Early stopping keeps the model from epoch 4.', c3)
svg('overfitting-curves', 340, 300, 'Training and validation loss while overfitting',
    'Loss over six epochs. Training loss falls steadily: 0.85, 0.52, 0.36, 0.28, 0.21, 0.15. Validation loss falls 0.90, 0.60, 0.45, reaches its minimum 0.41 at epoch 4 and then rises to 0.43 and 0.48 while the training loss keeps falling: overfitting. Early stopping keeps the parameters from epoch 4.', ov_body)

# ---------- 4. tiny-network: 2 inputs, 2 ReLU hidden nodes, 1 output ----------
relu = lambda z: max(0, z)
W1, b1, W2, b2, x = [[1, 1], [-1, 2]], [0, 1], [3, 2], -1, [2, -1]
z = [W1[i][0] * x[0] + W1[i][1] * x[1] + b1[i] for i in range(2)]
h = [relu(v) for v in z]
y = W2[0] * h[0] + W2[1] * h[1] + b2
assert z == [1, -3] and h == [1, 0] and y == 2
IN, HID, OUTN = [(46, 86), (46, 226)], [(170, 86), (170, 226)], (294, 156)
R = 24
def edge(a, b, cls):
    import math
    dx, dy = b[0] - a[0], b[1] - a[1]; d = math.hypot(dx, dy)
    return line(a[0] + dx / d * R, a[1] + dy / d * R, b[0] - dx / d * (R + 2), b[1] - dy / d * (R + 2), cls, f' marker-end="url(#ptf-arrow-{cls.split()[0][2:]})"')
fmt = lambda v: str(v).replace('-', '−')
base = '  <g>\n'
for i, a in enumerate(IN):
    for j, b in enumerate(HID): base += edge(a, b, 's-muted w2')
for j, b in enumerate(HID): base += edge(b, OUTN, 's-muted w2')
for (cx, cy), lab in zip(IN, ('x₁', 'x₂')): base += circle(cx, cy, R, 'f-surface s-ink w2') + text(cx, cy + 6, lab, 't f-ink math', 'middle')
for (cx, cy), lab in zip(HID, ('h₁', 'h₂')): base += circle(cx, cy, R, 'f-accent-soft s-accent w2') + text(cx, cy + 6, lab, 't f-ink math', 'middle')
base += circle(*OUTN, R, 'f-surface s-ink w2') + text(OUTN[0], OUTN[1] + 6, 'y′', 't f-ink math', 'middle')
base += text(46, 30, 'input', 't-s f-muted', 'middle') + text(170, 30, 'hidden (ReLU)', 't-s f-muted', 'middle') + text(294, 30, 'output', 't-s f-muted', 'middle')
base += '  </g>\n'
# weights: placed along the edges, near the receiving node
w = ''
w += text(104, 74, fmt(W1[0][0]), 't-s f-accent bold', 'middle')          # x1→h1
w += text(84, 128, fmt(W1[1][0]), 't-s f-accent bold', 'middle')          # x1→h2
w += text(84, 196, fmt(W1[0][1]), 't-s f-accent bold', 'middle')          # x2→h1
w += text(104, 244, fmt(W1[1][1]), 't-s f-accent bold', 'middle')         # x2→h2
w += text(170, 124, f'b = {b1[0]}', 't-s f-muted', 'middle') + text(170, 266, f'b = {b1[1]}', 't-s f-muted', 'middle')
w += text(240, 108, fmt(W2[0]), 't-s f-accent bold', 'middle') + text(240, 214, fmt(W2[1]), 't-s f-accent bold', 'middle')
w += text(294, 196, f'b = {fmt(b2)}', 't-s f-muted', 'middle')
inp = text(10, 92, f'{x[0]}', 't bold f-warn', 'start') + text(4, 232, fmt(x[1]), 't bold f-warn', 'start')
inp += text(170, 292, f'h₁ = ReLU(1·2 + 1·(−1) + 0) = {h[0]}', 't-s f-ink', 'middle')
inp += text(170, 312, f'h₂ = ReLU(−1·2 + 2·(−1) + 1) = ReLU(−3) = {h[1]}', 't-s f-ink', 'middle')
outp = text(170, 340, f'y′ = 3·1 + 2·0 − 1 = {y}', 't f-good bold', 'middle')
tn_body = base + step(1, 'Two inputs, two hidden nodes with ReLU, one output. Each arrow carries a weight; each node adds its bias.', w) \
    + step(2, 'Inputs x₁ = 2, x₂ = −1. Hidden node 1: 1·2 + 1·(−1) + 0 = 1, ReLU keeps 1. Hidden node 2: −1·2 + 2·(−1) + 1 = −3, ReLU turns it into 0.', inp) \
    + step(3, 'Output: 3·h₁ + 2·h₂ − 1 = 3·1 + 2·0 − 1 = 2.', outp)
svg('tiny-network', 340, 356, 'Forward pass through a tiny network',
    'A network with inputs x₁ and x₂, two hidden ReLU nodes h₁ and h₂ and one output y′. Weights into h₁: 1 from x₁, 1 from x₂, bias 0. Weights into h₂: −1 from x₁, 2 from x₂, bias 1. Weights into y′: 3 from h₁, 2 from h₂, bias −1. With x = (2, −1): h₁ = ReLU(1) = 1, h₂ = ReLU(−3) = 0, y′ = 3 · 1 + 2 · 0 − 1 = 2.', tn_body)
print('ok')
