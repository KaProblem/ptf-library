"""Figures of the genai-apps bundle (PTF SPEC.md §6.8).

Usage: python3 figures/src/figures.py figures/

Writes embedding-map.svg, rag-pipeline.svg, function-calling.svg and agent-loop.svg.
Coordinates are computed here, never placed by eye; every number a caption or a
description states is asserted below."""
import math, os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else 'figures'
r = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
esc = lambda s: s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')

def defs():
    return '  <defs>' + ''.join(
        f'<marker id="ptf-arrow-{c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" '
        f'orient="auto-start-reverse"><path class="f-{c}" d="M0 0 L10 5 L0 10 z"/></marker>'
        for c in ('ink', 'accent', 'warn', 'good', 'muted')) + '</defs>\n'

def svg(name, w, h, title, desc, body):
    assert w <= 360, 'viewBox at most 360 wide'
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" '
         f'aria-labelledby="{name}-t {name}-d" data-ptf-figure="1">\n'
         f'  <title id="{name}-t">{esc(title)}</title>\n  <desc id="{name}-d">{esc(desc)}</desc>\n'
         + defs() + body + '</svg>\n')
    with open(os.path.join(OUT, f'{name}.svg'), 'w') as f:
        f.write(s)

def step(n, caption, inner):
    return f'  <g data-step="{n}" data-caption="{esc(caption)}">\n{inner}  </g>\n'

def text(x, y, s, cls='t-s f-ink', anchor=None):
    a = f' text-anchor="{anchor}"' if anchor else ''
    return f'    <text class="{cls}" x="{r(x)}" y="{r(y)}"{a}>{esc(s)}</text>\n'

def arrow(x1, y1, x2, y2, c='ink', extra=''):
    return f'    <line class="s-{c} w2{extra}" x1="{r(x1)}" y1="{r(y1)}" x2="{r(x2)}" y2="{r(y2)}" marker-end="url(#ptf-arrow-{c})"/>\n'

def box(x, y, w, h, lines, fill='f-surface', stroke='s-ink', tcls='t-s f-ink'):
    """A rounded box with centred lines of text (14 units, 18 units line height)."""
    out = f'    <rect class="{fill} {stroke} w2" x="{r(x)}" y="{r(y)}" width="{r(w)}" height="{r(h)}" rx="8"/>\n'
    top = y + h / 2 - (len(lines) - 1) * 9 + 5
    for i, line in enumerate(lines):
        assert len(line) * 7.6 <= w - 12, f'text "{line}" too wide for its box'
        out += text(x + w / 2, top + i * 18, line, tcls, 'middle')
    return out

# ---------------------------------------------------------------- embedding-map
dot = lambda a, b: sum(x * y for x, y in zip(a, b))
norm = lambda a: math.sqrt(dot(a, a))
cos = lambda a, b: dot(a, b) / (norm(a) * norm(b))
q, A, B = (0.6, 0.8), (0.8, 0.6), (0.96, -0.28)
assert abs(norm(q) - 1) < 1e-12 and abs(norm(A) - 1) < 1e-12 and abs(norm(B) - 1) < 1e-12, 'unit vectors'
assert round(cos(q, A), 2) == 0.96 and round(cos(q, B), 2) == 0.35, 'cosines stated in caption and description'
ang = lambda v: math.degrees(math.atan2(v[1], v[0]))
assert round(ang(q) - ang(A)) == 16 and round(ang(q) - ang(B)) == 69, 'angles stated in the description'

ox, oy, S = 70, 190, 170
P = lambda v: (ox + v[0] * S, oy - v[1] * S)
base = (f'    <line class="s-line w1" x1="{ox - 40}" y1="{oy}" x2="{ox + 1.15 * S:.0f}" y2="{oy}"/>\n'
        f'    <line class="s-line w1" x1="{ox}" y1="{oy + 0.45 * S:.0f}" x2="{ox}" y2="{oy - 1.05 * S:.0f}"/>\n'
        f'    <circle class="f-ink" cx="{ox}" cy="{oy}" r="3"/>\n')
def vec(v, c, label, dx, dy, extra=''):
    x, y = P(v)
    return arrow(ox, oy, x, y, c, extra) + text(x + dx, y + dy, label, f't bold f-{c}', 'middle')
def arc(a, b, rad, c):
    a1, a2 = math.radians(ang(a)), math.radians(ang(b))
    x1, y1 = ox + rad * math.cos(a1), oy - rad * math.sin(a1)
    x2, y2 = ox + rad * math.cos(a2), oy - rad * math.sin(a2)
    return f'    <path class="s-{c} w2 f-none" d="M{r(x1)} {r(y1)} A{rad} {rad} 0 0 0 {r(x2)} {r(y2)}"/>\n'
LY = 290
legend_notes = text(16, LY, 'A: Chlorophyll breaks down in autumn.', 't-s f-good') + text(16, LY + 20, 'B: Turn left at the yellow house.', 't-s f-warn')
legend_q = text(16, LY + 40, 'q: Why do leaves turn yellow?', 't-s f-accent')
s1 = vec(A, 'good', 'A', 12, -2) + vec(B, 'warn', 'B', 12, 12) + legend_notes
s2 = vec(q, 'accent', 'q', -4, -10, ' dash') + legend_q
s3 = (arc(A, q, 75, 'good') + arc(B, q, 95, 'warn')
      + text(ox + 30, oy - 95, 'cos 0.96', 't-s bold f-good', 'end')
      + text(ox + 104, oy - 10, 'cos 0.35', 't-s bold f-warn'))
svg('embedding-map', 340, 350,
    'Embeddings: similar meaning, similar direction',
    'Two notes and a question as two-dimensional embedding vectors of length 1, drawn as arrows from the origin. '
    'A, "Chlorophyll breaks down in autumn.", is (0.8, 0.6). B, "Turn left at the yellow house.", is (0.96, −0.28). '
    'The question q, "Why do leaves turn yellow?", is (0.6, 0.8). q and A are 16° apart, cosine similarity 0.96; '
    'q and B are 69° apart, cosine similarity 0.35, although B shares the word "yellow" with the question. '
    'Real embeddings have hundreds of dimensions; the idea is the same.',
    '  <g>\n' + base + '  </g>\n'
    + step(1, 'Each note becomes an arrow, its embedding. Here with 2 numbers; real ones have hundreds.', s1)
    + step(2, 'The question is embedded with the same model and becomes an arrow too.', s2)
    + step(3, 'Similarity is the angle: q and A point almost the same way (cosine 0.96), q and B do not (0.35), although B contains "yellow".', s3))

# ---------------------------------------------------------------- rag-pipeline
W = 340
L, R, BW, BH = 12, 178, 150, 46
cx = lambda x: x + BW / 2
rows = [20, 96, 172, 248]
left = ['Documents', 'Split into chunks', 'Embed each chunk', 'Vector index']
right = ['Question', 'Embed the question', 'Find top-k chunks']
s1 = text(cx(L), 12, 'Once, ahead of time', 't-s bold f-muted', 'middle')
for i, lab in enumerate(left):
    s1 += box(L, rows[i], BW, BH, [lab])
    if i < len(left) - 1:
        s1 += arrow(cx(L), rows[i] + BH, cx(L), rows[i + 1] - 2)
s2 = text(cx(R), 12, 'For every question', 't-s bold f-accent', 'middle')
for i, lab in enumerate(right):
    s2 += box(R, rows[i], BW, BH, [lab], 'f-accent-soft', 's-accent')
    if i < len(right) - 1:
        s2 += arrow(cx(R), rows[i] + BH, cx(R), rows[i + 1] - 2, 'accent')
s2 += arrow(L + BW, rows[3] + BH / 2, R + 12, rows[2] + BH, 'accent', ' dash')
PY = 330
s3 = arrow(cx(R), rows[2] + BH, cx(R), PY - 2, 'accent')
s3 += box(L, PY, W - 2 * L, 64, ['Prompt: instructions + the', 'k chunks + the question'], 'f-good-soft', 's-good')
s3 += arrow(W / 2, PY + 64, W / 2, PY + 92, 'good')
s3 += box(L + 40, PY + 94, W - 2 * L - 80, BH, ['LLM'], 'f-surface', 's-good')
s3 += arrow(W / 2, PY + 94 + BH, W / 2, PY + 168, 'good')
s3 += box(L, PY + 170, W - 2 * L, BH, ['Answer that cites the chunks'], 'f-good-soft', 's-good')
s4 = (text(W / 2, PY + 250, 'If the right chunk is not retrieved,', 't-s f-warn', 'middle')
      + text(W / 2, PY + 268, 'the model cannot use it.', 't-s f-warn', 'middle'))
svg('rag-pipeline', W, PY + 280,
    'Retrieval-augmented generation',
    'A RAG system in two parts. Once, ahead of time: documents are split into chunks, each chunk is embedded, '
    'and the vectors are stored in a vector index. For every question: the question is embedded with the same model, '
    'the index returns the k chunks with the most similar vectors, and the prompt is built from the instructions, '
    'those k chunks and the question. The LLM writes an answer that cites the chunks. '
    'If the right chunk is not among the k retrieved, the model cannot use it.',
    step(1, 'Ahead of time: documents are split into chunks, each chunk is embedded and stored in a vector index.', s1)
    + step(2, 'For each question: embed it with the same model and fetch the k chunks with the most similar vectors.', s2)
    + step(3, 'The prompt combines instructions, the retrieved chunks and the question; the model answers and cites the chunks.', s3)
    + step(4, 'Retrieval is the weak point: a chunk that is not retrieved does not exist for the model.', s4))

# ---------------------------------------------------------------- function-calling
W = 340
AX, MX = 60, 280
top, gap = 100, 74
ys = [top + i * gap for i in range(5)]
H = ys[-1] + 74
base = (box(AX - 50, 8, 100, 36, ['App'], 'f-surface', 's-ink', 't-s bold f-ink')
        + box(MX - 50, 8, 100, 36, ['Model'], 'f-accent-soft', 's-accent', 't-s bold f-accent')
        + f'    <line class="s-line w2 dash" x1="{AX}" y1="44" x2="{AX}" y2="{H - 10}"/>\n'
        + f'    <line class="s-line w2 dash" x1="{MX}" y1="44" x2="{MX}" y2="{H - 10}"/>\n')
def msg(i, to_model, label, sub, c):
    y = ys[i]
    x1, x2 = (AX + 4, MX - 4) if to_model else (MX - 4, AX + 4)
    return (text((AX + MX) / 2, y - 22, label, f't-s bold f-{c}', 'middle')
            + text((AX + MX) / 2, y - 6, sub, 't-s f-muted', 'middle')
            + arrow(x1, y + 4, x2, y + 4, c))
s1 = msg(0, True, '1  question + tool list', 'get_weather(city)', 'ink')
s2 = msg(1, False, '2  tool call, not an answer', 'get_weather("Graz")', 'accent')
y3 = ys[2]
s3 = (box(AX - 48, y3 - 30, 156, 52, ['3  app checks and', 'runs the function'], 'f-warn-soft', 's-warn')
      + text(AX + 128, y3 + 2, '{"temp_c": 12}', 't-s f-warn'))
s4 = msg(3, True, '4  tool result', '{"temp_c": 12}', 'ink')
s5 = msg(4, False, '5  final answer', '"It is 12 °C in Graz."', 'good')
svg('function-calling', W, H,
    'Function calling: the model asks, the app acts',
    'A sequence between the app and the model. 1: the app sends the question with a list of tools, here '
    'get_weather(city). 2: the model replies with a tool call, get_weather("Graz"), instead of an answer. '
    '3: the app checks the call and runs the function itself, which returns {"temp_c": 12}. '
    '4: the app sends the result back to the model. 5: the model writes the final answer, "It is 12 °C in Graz." '
    'The model never runs code; only the app does.',
    '  <g>\n' + base + '  </g>\n'
    + step(1, 'The app sends the question together with descriptions of the tools the model may ask for.', s1)
    + step(2, 'The model does not answer yet: it replies with a structured request to call a tool, with arguments.', s2)
    + step(3, 'The app, not the model, checks the request and runs the function.', s3)
    + step(4, 'The app sends the function\'s result back to the model as a new message.', s4)
    + step(5, 'Now the model can answer in words, using the result.', s5))

# ---------------------------------------------------------------- agent-loop
W, H = 340, 380
G = box(10, 10, 180, BH, ['Goal from the user'], 'f-surface', 's-ink')
M = box(10, 100, 180, 64, ['Model decides the', 'next step'], 'f-accent-soft', 's-accent')
D = box(222, 109, 108, BH, ['Final answer'], 'f-good-soft', 's-good')
T = box(170, 240, 160, 64, ['Tool runs', '(search, code, API)'], 'f-warn-soft', 's-warn')
O = box(10, 240, 140, 64, ['Result is added', 'to the state'], 'f-good-soft', 's-good')
s1 = G + arrow(100, 10 + BH, 100, 98) + M
s2 = arrow(150, 164, 228, 238, 'warn') + text(214, 196, 'action', 't-s f-warn') + T
s3 = (arrow(170, 272, 152, 272, 'good') + O + arrow(60, 240, 60, 166, 'good')
      + text(68, 208, 'observe', 't-s f-good'))
s4 = (arrow(190, 132, 220, 132) + text(206, 100, 'done', 't-s f-ink', 'middle') + D
      + text(W / 2, 336, 'Also stops at a step limit.', 't-s f-ink', 'middle')
      + text(W / 2, 360, 'Risky actions wait for a person.', 't-s bold f-warn', 'middle'))
svg('agent-loop', W, H,
    'An agent is a loop',
    'An AI agent as a loop. A goal from the user goes to the model, which decides the next step. '
    'If it chooses an action, a tool runs (search, code, an API), and its result is added to the state that the model sees next. '
    'The loop repeats until the model decides it is done or a step limit is reached; then it gives a final answer. '
    'Risky actions wait for approval by a person.',
    step(1, 'The user gives a goal; the model decides what to do first.', s1)
    + step(2, 'It picks an action, and a tool runs it: a search, a piece of code, an API call.', s2)
    + step(3, 'The result goes back into the state the model sees, and the model decides again.', s3)
    + step(4, 'The loop ends when the model is done or a step limit is hit. Risky actions need a person\'s approval.', s4))
print('wrote 4 figures to', OUT)
