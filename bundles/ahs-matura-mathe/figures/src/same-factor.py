"""Figure for the exponential-functions element: equal steps in x, equal factor in y.

Usage: python3 figures/src/same-factor.py figures/same-factor.svg en
       python3 figures/src/same-factor.py figures/same-factor.de.svg de"""
import math, sys, re
OUT, LANG = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else 'en')
T = {
 'en': dict(title='Exponential growth: the same factor for every step',
            desc='Graph of f(x) = 2 · 1.5^x for x from 0 to 7, next to the line g(x) = 2 + 3x. From x = 1 to 2, f grows from 3 to 4.5; from x = 5 to 6, from 15.2 to 22.8. Both times the factor is 1.5, although the increase is much larger the second time. The line instead adds the same 3 for every step.',
            c1='The curve f(x) = 2 · 1.5^x starts at 2 and gets steeper and steeper.',
            c2='One step from x = 1 to x = 2: 3 becomes 4.5, that is × 1.5.',
            c3='One step from x = 5 to x = 6: 15.2 becomes 22.8, again × 1.5.',
            c4='Compare the line g(x) = 2 + 3x: it adds 3 per step, the curve multiplies by 1.5.',
            rule='f(x + 1) = 1.5 · f(x)', dec='.'),
 'de': dict(title='Exponentielles Wachstum: gleicher Faktor pro Schritt',
            desc='Graph von f(x) = 2 · 1,5^x für x von 0 bis 7, daneben die Gerade g(x) = 2 + 3x. Von x = 1 auf 2 wächst f von 3 auf 4,5, von x = 5 auf 6 von 15,2 auf 22,8. Beide Male ist der Faktor 1,5, obwohl der Zuwachs beim zweiten Mal viel größer ist. Die Gerade addiert dagegen bei jedem Schritt dieselben 3.',
            c1='Die Kurve f(x) = 2 · 1,5^x startet bei 2 und wird immer steiler.',
            c2='Ein Schritt von x = 1 auf x = 2: aus 3 wird 4,5, also × 1,5.',
            c3='Ein Schritt von x = 5 auf x = 6: aus 15,2 wird 22,8, wieder × 1,5.',
            c4='Zum Vergleich die Gerade g(x) = 2 + 3x: Sie addiert pro Schritt 3, die Kurve multipliziert mit 1,5.',
            rule='f(x + 1) = 1,5 · f(x)', dec=','),
}[LANG]
num = lambda v: f'{v:.1f}'.replace('.', T['dec']).replace(T['dec'] + '0', '') if abs(v - round(v)) < 1e-9 else f'{v:.1f}'.replace('.', T['dec'])
f = lambda x: 2 * 1.5 ** x
g = lambda x: 2 + 3 * x
# The numbers the captions and the description state.
assert all(abs(f(x + 1) - 1.5 * f(x)) < 1e-12 for x in range(7)), "same factor per step"
assert (round(f(1), 1), round(f(2), 1)) == (3.0, 4.5), "step 2 caption: 3 → 4.5"
assert (round(f(5), 1), round(f(6), 1)) == (15.2, 22.8), "step 3 caption: 15.2 → 22.8"
assert all(g(x + 1) - g(x) == 3 for x in range(7)) and g(0) == 2, "line adds 3 per step"
assert f(7) < 36, "curve stays inside the y-axis range 0..36"
ox, oy, sx, sy = 40, 260, 38, 6.4
P = lambda x, y: (ox + x * sx, oy - y * sy)
r = lambda v: f'{v:.1f}'
s = ''
for x in range(0, 8):
    X, _ = P(x, 0)
    s += f'    <line class="s-line" x1="{r(X)}" y1="{r(P(0,36)[1])}" x2="{r(X)}" y2="{oy}"/>\n'
    s += f'    <text class="t-s f-muted" x="{r(X)}" y="{oy+18}" text-anchor="middle">{x}</text>\n'
for y in range(0, 36, 10):
    _, Y = P(0, y)
    s += f'    <line class="s-line" x1="{ox}" y1="{r(Y)}" x2="{r(P(7,0)[0])}" y2="{r(Y)}"/>\n'
    s += f'    <text class="t-s f-muted" x="{ox-6}" y="{r(Y+5)}" text-anchor="end">{y}</text>\n'
s += (f'    <line class="s-ink w2" x1="{ox}" y1="{oy}" x2="{r(P(7.4,0)[0])}" y2="{oy}" marker-end="url(#ptf-arrow-ink)"/>\n'
      f'    <line class="s-ink w2" x1="{ox}" y1="{oy}" x2="{ox}" y2="{r(P(0,38)[1])}" marker-end="url(#ptf-arrow-ink)"/>\n'
      f'    <text class="t-s f-ink math" x="{r(P(7.4,0)[0])}" y="{oy-8}" text-anchor="end">x</text>\n')
base = '  <g>\n' + s + '  </g>\n'
pts = ' '.join(f'{r(P(x/10, f(x/10))[0])},{r(P(x/10, f(x/10))[1])}' for x in range(0, 71))
curve = (f'    <polyline class="s-accent w3" points="{pts}"/>\n'
         f'    <text class="t f-accent math" x="{r(P(0.3,31)[0])}" y="{r(P(0.3,31)[1])}">f(x) = 2 · 1{T["dec"]}5^(x)</text>\n')
def pair(x0, cls, left):
    a, b = P(x0, f(x0)), P(x0 + 1, f(x0 + 1))
    out = (f'    <circle class="f-{cls}" cx="{r(a[0])}" cy="{r(a[1])}" r="5"/>\n'
           f'    <circle class="f-{cls}" cx="{r(b[0])}" cy="{r(b[1])}" r="5"/>\n'
           f'    <path class="s-{cls} w2 dash" d="M{r(a[0])} {r(a[1])} H{r(b[0])} V{r(b[1])}"/>\n')
    lab = f'{num(f(x0))} → {num(f(x0+1))}  (× 1{T["dec"]}5)'
    if left:
        out += f'    <text class="t-s f-{cls}" x="{r(a[0]-8)}" y="{r(a[1]-10)}" text-anchor="end">{lab}</text>\n'
    else:
        out += f'    <text class="t-s f-{cls}" x="{r(b[0]+8)}" y="{r(b[1]+16)}">{lab}</text>\n'
    return out
lin = (f'    <line class="s-muted w2 dash" x1="{r(P(0,g(0))[0])}" y1="{r(P(0,g(0))[1])}" x2="{r(P(7,g(7))[0])}" y2="{r(P(7,g(7))[1])}"/>\n'
       f'    <text class="t-s f-muted math" x="{r(P(2.4,13)[0])}" y="{r(P(2.4,13)[1])}" text-anchor="end">g(x) = 2 + 3x</text>\n'
       f'    <text class="t f-ink" x="{ox}" y="{oy+46}">{T["rule"]}</text>\n')
def step(n, cap, inner):
    return f'  <g data-step="{n}" data-caption="{cap}">\n{inner}  </g>\n'
DEFS = '  <defs>' + ''.join(f'<marker id="ptf-arrow-{c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="f-{c}" d="M0 0 L10 5 L0 10 z"/></marker>' for c in ('ink', 'accent', 'warn', 'good')) + '</defs>\n'
body = base + step(1, T['c1'], curve) + step(2, T['c2'], pair(1, 'warn', False)) + step(3, T['c3'], pair(5, 'good', True)) + step(4, T['c4'], lin)
svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 320" role="img" aria-labelledby="same-factor-t same-factor-d" data-ptf-figure="1">\n'
       f'  <title id="same-factor-t">{T["title"]}</title>\n  <desc id="same-factor-d">{T["desc"]}</desc>\n' + DEFS + body + '</svg>\n')
svg = re.sub(r'\^\(([^)]*)\)(?=[^<]*</text>)', lambda m: '<tspan class="t-s" dy="-7">' + m.group(1) + '</tspan><tspan dy="7"> </tspan>', svg)
open(OUT, 'w').write(svg)
