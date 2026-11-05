// Recomputes the answers of elements/responsible-genai.md (PTF SPEC.md §7.1).

check("errors-per-day", () => (1 - 0.97) * 10000);

check("harm-rate", () => [(12 / 400) * 100, (2 / 400) * 100]);

fact("An error rate of 3 % at 10,000 uses a day is 300 bad outputs a day", () => Math.round(0.03 * 10000) === 300);
fact("12 of 400 red-team prompts give harmful output: 3 %; after mitigation 2 of 400: 0.5 %", () => ptf.near(12 / 400, 0.03) && ptf.near(2 / 400, 0.005));
fact("for example 12/400 = 3 %", () => ptf.near((12 / 400) * 100, 3));
