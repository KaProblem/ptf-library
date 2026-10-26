#!/usr/bin/env python3
"""One-off importer: turns the pre-PTF simulator artifacts (HTML fragments from the
first learning sessions) into PTF simulator packages. Kept for reference; new
simulators are written against SIMULATOR-SPEC.md directly."""
import json, re, shutil, sys
from pathlib import Path

LEVELS = {"1": "highschool", "2": "college", "3": "expert"}

def convert(src, dst, sim_id, version, stations, guess_station=None):
    html = Path(src).read_text(encoding="utf-8")
    # Remote fonts and Claude-specific meta are not allowed / not needed in a package.
    html = re.sub(r'<link rel="preconnect"[^>]*>\n', "", html)
    html = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>\n', "", html)
    html = re.sub(r'<meta name="claude:[^>]*>\n', "", html)
    # Fragment -> full document.
    html = html.replace("<title>", '<!doctype html>\n<html lang="de">\n<head>\n<meta charset="utf-8">\n'
                        '<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>', 1)
    html = html.replace("</style>\n", "</style>\n</head>\n<body>\n", 1)
    # Stations get stable ids, in document order.
    sections = list(re.finditer(r'<section class="station"', html))
    assert len(sections) == len(stations), (src, len(sections), len(stations))
    for m, st in reversed(list(zip(sections, stations))):
        html = html[:m.end()] + f' data-station="{st}"' + html[m.end():]
    # No storage in simulators: the level is kept by the host via ptf/state.
    html = html.replace('  try{localStorage.setItem("nzl-level",l)}catch(e){}\n', "")
    html = html.replace('let start="1";try{start=localStorage.getItem("nzl-level")||"1"}catch(e){}', 'let start="1";')
    if guess_station:
        html = html.replace("if(ok)g0.hits++;", f'if(ok)g0.hits++;window.__ptfAnswered&&window.__ptfAnswered("{guess_station}",ok,g0.total);', 1)
    has_levels = 'data-level="1"' in html
    integration = f"""<script src="ptf-sim.js"></script>
<script>
/* PTF integration (SIMULATOR-SPEC.md §4) */
const PTF_LEVELS = {json.dumps(LEVELS) if has_levels else "{}"};
const ptf = PTF.connect({{
  id: "{sim_id}", version: "{version}",
  onInit(ctx) {{
    const lvl = (ctx.state && ctx.state.level) || ctx.level;
    if (lvl) applyLevel(lvl);
    if (ctx.station) gotoStation(ctx.station);
  }},
  onSetLevel: applyLevel,
  onGoto: gotoStation,
  snapshot() {{
    const shown = [...document.querySelectorAll("[data-station]")].filter(s => !s.hidden).map(s => s.dataset.station);
    const lvlBtn = document.querySelector('.levels button[aria-pressed="true"]');
    const parts = [`Visible stations: ${{shown.join(", ")}}`];
    if (lvlBtn) parts.unshift(`Level: ${{PTF_LEVELS[lvlBtn.dataset.level]}}`);
    const corpus = document.getElementById("corpusInfo");
    if (corpus && corpus.textContent) parts.push(corpus.textContent);
    const score = document.getElementById("g0Score");
    if (score && score.textContent) parts.push(`Guessing: ${{score.textContent}}`);
    return parts.join(". ");
  }}
}});
function applyLevel(level) {{
  const n = Object.keys(PTF_LEVELS).find(k => PTF_LEVELS[k] === level);
  if (n && typeof setLevel === "function") setLevel(n);
}}
function gotoStation(id) {{
  const s = document.querySelector(`[data-station="${{id}}"]`);
  if (!s) return;
  if (s.hidden && s.dataset.show) setLevel(s.dataset.show.split(" ")[0]);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  s.scrollIntoView({{ behavior: reduce ? "auto" : "smooth", block: "start" }});
}}
document.querySelectorAll(".levels button").forEach(b => b.addEventListener("click", () => {{
  const level = PTF_LEVELS[b.dataset.level];
  ptf.event("level_changed", {{ level }});
  ptf.saveState({{ level }});
}}));
let guessCompleted = false;
window.__ptfAnswered = (station, correct, total) => {{
  ptf.event("answered", {{ station, result: {{ correct }} }});
  if (total >= 5 && !guessCompleted) {{ guessCompleted = true; ptf.stationCompleted(station); }}
}};
</script>
"""
    html = html.rstrip("\n") + "\n" + integration + "</body>\n</html>\n"
    dst = Path(dst); dst.mkdir(parents=True, exist_ok=True)
    (dst / "index.html").write_text(html, encoding="utf-8")

if __name__ == "__main__":
    spec, art, lib = map(Path, sys.argv[1:4])
    nz = ["tokenizer", "counted-probabilities", "generate", "loss", "training-curve", "temperature", "context-window", "bigram-table", "corpus"]
    convert(art / "naechstes-zeichen/v1/index.html", lib / "sims/next-char-lab/1.0.0", "ptf:sim/next-char-lab", "1.0.0", nz)
    nz2 = ["guess"] + nz[:8] + ["summary", "corpus"]
    convert(art / "naechstes-zeichen/v2/index.html", lib / "sims/next-char-lab/2.0.0", "ptf:sim/next-char-lab", "2.0.0", nz2, guess_station="guess")
    convert(art / "loss-lupe/v1/index.html", lib / "sims/loss-lens/1.0.0", "ptf:sim/loss-lens", "1.0.0", ["surprise", "average", "distribute", "quiz"])
    for d in ["sims/next-char-lab/1.0.0", "sims/next-char-lab/2.0.0", "sims/loss-lens/1.0.0"]:
        shutil.copy(spec / "runtime/ptf-sim.js", lib / d / "ptf-sim.js")
