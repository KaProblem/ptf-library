// Recomputes the answers of elements/tokenizer-algorithms.md (ptf-spec SPEC.md §7.1).

const corpus = { snow: 7, now: 4, no: 5, know: 3, snowy: 2 };

// Learn BPE merges: returns [{ pair: [a, b], count }] in order.
function learnBpe(words, nMerges) {
  const seg = Object.fromEntries(Object.keys(words).map((w) => [w, [...w]]));
  const merges = [];
  for (let m = 0; m < nMerges; m++) {
    const counts = new Map();
    for (const [w, f] of Object.entries(words)) {
      const s = seg[w];
      for (let i = 0; i + 1 < s.length; i++) {
        const key = s[i] + "\u0000" + s[i + 1];
        counts.set(key, (counts.get(key) || 0) + f);
      }
    }
    let best = null;
    for (const [k, c] of counts) if (!best || c > best.count) best = { key: k, count: c };
    const ties = [...counts.values()].filter((c) => c === best.count).length;
    ptf.assert(ties === 1, `round ${m + 1} has a tie`);
    const [a, b] = best.key.split("\u0000");
    merges.push({ pair: [a, b], count: best.count });
    for (const w of Object.keys(seg)) seg[w] = applyMerge(seg[w], a, b);
  }
  return merges;
}
function applyMerge(s, a, b) {
  const out = [];
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && s[i] === a && s[i + 1] === b) { out.push(a + b); i++; } else out.push(s[i]);
  }
  return out;
}
const encode = (word, merges) => merges.reduce((s, m) => applyMerge(s, m.pair[0], m.pair[1]), [...word]);
const merges = learnBpe(corpus, 5);
const base = new Set(Object.keys(corpus).join(""));

check("first-merge", () => {
  const m = merges[0];
  ptf.assert(m.count === 21, "n + o 21 times");
  return [m.pair.join("+") === "n+o", m.pair.join("+") === "o+w", m.pair.join("+") === "s+n"];
});

check("merge-table", () => ({ rows: merges.slice(0, 3).map((m) => m.count), result: base.size + 3 }));

check("apply-snows", () => {
  const t = encode("snows", merges.slice(0, 4)).join(" | ");
  return [t === "snow | s", t === "s | n | o | w | s", t === "s | now | s"];
});

check("apply-nosy", () => {
  const first3 = merges.slice(0, 3);
  const known = encode("known", first3);
  ptf.assert(known.join(" ") === "k now n", "known → k now n");
  return [String(encode("nosy", first3).length), known[2]];
});

check("gpt2-merges", () => 50257 - 256 - 1);

check("order-matters", () => {
  const ordered = [{ pair: ["a", "b"] }, { pair: ["b", "c"] }, { pair: ["ab", "c"] }];
  const swapped = [ordered[1], ordered[0], ordered[2]];
  const a = encode("abc", ordered).join("|"), b = encode("abc", swapped).join("|");
  return [a === "abc" && b === "a|bc", a === b, a === "ab|c"];
});

check("wordpiece-score", () => {
  const th = 50 / (100 * 60), qu = 10 / (10 * 80);
  ptf.assert(ptf.round(th, 4) === 0.0083 && qu === 0.0125, "scores");
  const wp = qu > th ? "qu" : "th", bpe = 50 > 10 ? "th" : "qu";
  return [wp === "qu" && bpe === "th", wp === "th" && bpe === "th", wp === "qu" && bpe === "qu"];
});

check("unigram-best", () => {
  const p = { snow: 0.08, sno: 0.02, s: 0.1, now: 0.1, no: 0.1, n: 0.1, o: 0.1, w: 0.1, y: 0.05 };
  const best = (w) => {
    if (w === "") return 1;
    let b = 0;
    for (let i = 1; i <= w.length; i++) if (p[w.slice(0, i)]) b = Math.max(b, p[w.slice(0, i)] * best(w.slice(i)));
    return b;
  };
  return best("snowy") * 1000;
});

fact("Merges in order: n + o → no (21 times), no + w → now (16), s + now → snow (9), k + now → know (3), snow + y → snowy (2)", () => {
  const want = [["n+o", 21], ["no+w", 16], ["s+now", 9], ["k+now", 3], ["snow+y", 2]];
  return want.every(([p, c], i) => merges[i].pair.join("+") === p && merges[i].count === c);
});
fact("Base vocabulary k, n, o, s, w, y (6 symbols)", () => [...base].sort().join(",") === "k,n,o,s,w,y");
fact("\"snows\" → [snow, s]; \"nosy\" → [no, s, y]", () => encode("snows", merges).join(",") === "snow,s" && encode("nosy", merges).join(",") === "no,s,y");
fact("GPT-2: 256 bytes + 50,000 merges + 1 special token = 50,257", () => 256 + 50000 + 1 === 50257);
fact("(s, n) 9, (k, n) 3, (w, y) 2", () => 7 + 2 === 9);
fact("7 + 4 + 5 + 3 + 2 = 21", () => 7 + 4 + 5 + 3 + 2 === 21);
fact("7 + 4 + 3 + 2 = 16", () => 7 + 4 + 3 + 2 === 16);
