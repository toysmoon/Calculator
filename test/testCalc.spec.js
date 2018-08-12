const testcase = [
  { command: "1+2", result: "2" },
  { command: "1+2+", result: "3" },
  { command: "1+2=", result: "3" },
  { command: "1+2==", result: "5" },
  { command: ".12", result: "0.12" },
  { command: "12345+54321+", result: "66,666" },
  { command: "1234567890", result: "1,234,567,890" },
  //계산버튼을 반복적으로 눌렀을 때 입력된 값 유지
  { command: "123+-+-", result: "123" },
  //연산자 먼저 누르고 숫자 눌렀을 때
  { command: "+5+5+", result: "10" },
  //연산자 먼저 누르고 숫자 눌렀을 때 2
  { command: "-5+5+", result: "0" },
  //자리수 제한 테스트
  { command: "123456789012345.123456789", result: "1,234,567,890.12345" },
  //나누기 소숫점 자리수 제한 테스트
  { command: "1/3=", result: "0.33333" }
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
