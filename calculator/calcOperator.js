// calculator.js 파일이 아닌 외부 파일로 분리하여
// 해당 파일만 수정하면 새로운 수식이 추가될 수 있도록 처리

Calculator.prototype.OperatorMap = {
  funcPlus: "+",
  funcMinus: "-",
  funcMultipliy: "*",
  funcDivide: "/"
};

Calculator.prototype.findOpertorFunction = function(operator) {
  for (var item in this.OperatorMap) {
    if (this.OperatorMap[item] === operator) {
      return item;
    }
  }
  return false;
};

Calculator.prototype.funcPlus = function(a, b) {
  return (Number(a) + Number(b)).toString();
};

Calculator.prototype.funcMinus = function(a, b) {
  return (Number(a) - Number(b)).toString();
};

Calculator.prototype.funcMultipliy = function(a, b) {
  var result = Math.floor(Number(a) * Number(b) * 100000) / 100000;
  return result.toString();
};

Calculator.prototype.funcDivide = function(a, b) {
  var result = Math.floor((Number(a) / Number(b)) * 100000) / 100000;
  return result.toString();
};
