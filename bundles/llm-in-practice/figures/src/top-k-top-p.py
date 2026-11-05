"""Figure for the decoding-strategies element: top-k and top-p on one distribution.

Usage: python3 figures/src/top-k-top-p.py figures/top-k-top-p.svg"""
import sys
OUT = sys.argv[1]
words = ['coffee', 'tea', 'cocoa', 'milk', 'soup']
p = [0.50, 0.20, 0.15, 0.10, 0.05]
topk = [x / sum(p[:2]) for x in p[:2]]
cum, n = 0, 0
while cum < 0.8 - 1e-12:
    cum += p[n]; n += 1
topp = [x / sum(p[:n]) for x in p[:n]]
pct = lambda x: f'{round(100 * x)} %'
assert [pct(x) for x in topk] == ['71 %', '29 %'] and n == 3 and round(cum, 2) == 0.85
assert [pct(x) for x in topp] == ['59 %', '24 %', '18 %']

TITLE = 'Top-k and top-p on the same next-word probabilities'
DESC = ('Next-word probabilities after “a cup of”: coffee 50 %, tea 20 %, cocoa 15 %, milk 10 %, soup 5 %. '
        'Top-k with k = 2 keeps coffee and tea and rescales them to 71 % and 29 %. Top-p with p = 0.8 adds words '
        'until the sum reaches 80 %: 50 + 20 + 15 = 85 %, so coffee, tea and cocoa stay, rescaled to 59 %, 24 % and 18 %.')
CAPS = [
    'What the model says about the next word after “a cup of”.',
    'Top-k = 2 keeps the two most likely words and rescales them to add up to 100 %.',
    'Top-p = 0.8 keeps words until their sum reaches 80 %: 50 + 20 + 15 = 85 %, so three words stay.',
]
def t(x, y, s, cls='t-s f-ink', a='start'):
    return f'    <text class="{cls}" x="{x}" y="{y}" text-anchor="{a}">{s}</text>\n'
X0, SC, Y0, RH = 66, 220, 56, 34
base = t(8, 22, 'next word after “a cup of”', 't-s f-muted')
s1 = ''
for i, (w, x) in enumerate(zip(words, p)):
    y = Y0 + i * RH
    s1 += t(X0 - 6, y + 17, w, 't-s f-ink', 'end')
    s1 += f'    <rect class="f-muted" x="{X0}" y="{y + 4}" width="{SC * x:.1f}" height="18" rx="2"/>\n'
    s1 += t(X0 + SC * x + 6, y + 18, pct(x), 't-s f-muted')
def column(x, head, vals, cls):
    s = t(x, Y0 - 8, head, f't-s bold {cls}', 'middle')
    for i in range(len(words)):
        y = Y0 + i * RH + 18
        s += t(x, y, pct(vals[i]) if i < len(vals) else '–', f't-s {cls if i < len(vals) else "f-muted"}', 'middle')
    return s
s2 = column(252, 'k = 2', topk, 'f-accent')
s3 = (column(310, 'p = 0.8', topp, 'f-warn')
      + f'    <path class="s-warn w2" d="M330 {Y0 + 2} H336 V{Y0 + 3 * RH - 4} H330"/>\n'
      + t(170, Y0 + 5 * RH + 22, 'sum of the kept words: 85 % ≥ 80 %', 't-s f-warn', 'middle'))
def step(n, inner):
    return f'  <g data-step="{n}" data-caption="{CAPS[n-1]}">\n{inner}  </g>\n'
svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 266" role="img" data-ptf-figure="1">\n'
       f'  <title>{TITLE}</title>\n  <desc>{DESC}</desc>\n'
       + '  <g>\n' + base + '  </g>\n' + step(1, s1) + step(2, s2) + step(3, s3) + '</svg>\n')
open(OUT, 'w').write(svg)
