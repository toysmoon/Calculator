const testcase = [
  { command: "1+2", result: "2" },
  { command: "1+2+", result: "3" },
  { command: "1+2=", result: "3" },
  { command: "1+2==", result: "5" },
  { command: ".12", result: "0.12" },
  { command: "12345+54321+", result: "66,666" },
  { command: "1234567890", result: "1,234,567,890" }
];

describe("calculator basic button event :", () => {
  beforeEach(() => {
    calculator1.clickFuncButton({ buttonValue: "R" });
  });

  it("Calcurator Test", () => {
    for (let i = 0; i < testcase.length; i++) {
      const test = testcase[i];
      const result = commandCenter(test.command);
      expect(result).toBe(test.result);
      calculator1.clickFuncButton({ buttonValue: "R" });
    }
  });

  afterEach(() => {
    calculator1.clickFuncButton({ buttonValue: "R" });
  });
});
