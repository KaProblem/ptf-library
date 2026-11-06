// Checks the numbers in elements/function-calling.md (PTF SPEC.md §7.1).

fact("the app returns 409.5", () => ptf.near(0.175 * 2340, 409.5, 1e-9));
fact("Order numbers have the form A-123456", () => /^A-[0-9]{6}$/.test("A-123456") && !/^A-[0-9]{6}$/.test("A-12345"));
