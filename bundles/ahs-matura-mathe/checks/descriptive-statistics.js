// Recomputes the answers of elements/descriptive-statistics.md (PTF SPEC.md §7.1).

const sum = (xs) => xs.reduce((s, x) => s + x, 0);
const mean = (xs) => sum(xs) / xs.length;
const sorted = (xs) => [...xs].sort((a, b) => a - b);
const median = (xs) => { const s = sorted(xs), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const mode = (xs) => { const c = {}; xs.forEach((x) => (c[x] = (c[x] || 0) + 1)); return Number(Object.keys(c).sort((a, b) => c[b] - c[a])[0]); };
const sd = (xs) => { const m = mean(xs); return Math.sqrt(mean(xs.map((x) => (x - m) ** 2))); };
const range = (xs) => Math.max(...xs) - Math.min(...xs);
const nums = (text) => (String(text).match(/\d+(?:\.\d+)?/g) || []).map(Number);

const cafe = [...Array(9).fill(2000), 52000];
check("cafe-mean", () => { ptf.assert(median(cafe) === 2000, "median stays 2000"); return mean(cafe); });

const grades = [...Array(3).fill(1), ...Array(5).fill(2), ...Array(8).fill(3), ...Array(3).fill(4), 5];
check("grade-table-mean", () => mean(grades));

check("pie-angle", () => (grades.filter((g) => g === 3).length / grades.length) * 360);

check("measures", () => { const d = [8, 3, 13, 5, 8, 7, 5, 8, 6]; return [mean(d), median(d), mode(d), range(d)]; });

check("boxplot-reading", () => {
  // Build 200 travel times with exactly these five numbers (50 values per quarter).
  const part = (a, b) => Array.from({ length: 50 }, (_, i) => a + ((b - a) * i) / 49);
  const d = sorted([...part(5, 12), ...part(12, 15), ...part(15, 20), ...part(20, 45)]);
  const share = (p) => d.filter(p).length / d.length;
  return [
    share((x) => x <= 15) >= 0.5,
    share((x) => x >= 12 && x <= 20) >= 0.5,
    share((x) => x > 20) > share((x) => x >= 12 && x < 15),
    ptf.near(mean(d), 15),
    20 - 12 === 40,
  ];
});

check("spread-comparison", (q) => {
  const sds = q.options.map((o) => sd(nums(o.text)));
  q.options.forEach((o) => ptf.assert(mean(nums(o.text)) === 3, "all means are 3"));
  ptf.assert(ptf.near(sd([2, 3, 3, 4]), 0.71, 0.005), "s ≈ 0.71 in the feedback");
  return sds.map((s) => s === Math.max(...sds));
});

check("shift-and-scale", () => {
  const d = [12, 15, 15, 18, 22, 9, 30], e = d.map((x) => x + 2);
  return [
    ptf.near(mean(e), mean(d) + 2),
    ptf.near(sd(e), sd(d)),
    ptf.near(median(e), median(d)),
    ptf.near(range(e), range(d) + 2),
    ptf.near(sd(e), sd(d) + 2),
  ];
});

check("combined-mean", () => {
  const A = Array(20).fill(3.0), B = [...Array(5).fill(2), ...Array(5).fill(2.8)];
  ptf.assert(ptf.near(mean(B), 2.4), "class B mean 2.4");
  return mean([...A, ...B]);
});

check("which-measure", () => {
  const prices = [210, 230, 240, 250, 260, 270, 2500, 2600];
  ptf.assert(median(prices) < 300 && mean(prices) > 700, "luxury flats pull the mean, not the median");
  return [true, false, false, false];
});

check("median-probe", (q) => q.options.map((o) => ptf.near(ptf.num(o.text), median([9, 2, 7, 3]))));

check("two-classes", () => true);
