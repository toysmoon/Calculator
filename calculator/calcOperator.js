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
};

Calculator.prototype.funcPlus = function(a, b) {
  return (Number(a) + Number(b)).toString();
};

Calculator.prototype.funcMinus = function(a, b) {
  return (Number(a) - Number(b)).toString();
};

Calculator.prototype.funcMultipliy = function(a, b) {
  return (Number(a) * Number(b)).toString();
};

Calculator.prototype.funcDivide = function(a, b) {
  return (Number(a) / Number(b)).toString();
};
