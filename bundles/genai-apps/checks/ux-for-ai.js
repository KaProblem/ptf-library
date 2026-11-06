// Recomputes the answers of elements/ux-for-ai.md (PTF SPEC.md §7.1).

check("acceptance-rate", () => {
  const unchanged = 340, edited = 410, rejected = 250, shown = 1000;
  ptf.assert(unchanged + edited + rejected === shown, "the three groups add up to all suggestions");
  ptf.assert(((unchanged + edited) / shown) * 100 === 75, "75 % are used with edits");
  return (unchanged / shown) * 100;
});
