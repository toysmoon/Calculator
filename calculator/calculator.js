var Calculator = (function() {
  function Calculator(option) {
    this.calcViewModel = new CalcViewModel(this, option);
    this.setHaveToRefresh(true);
    this.initializeData();
  }

  Calculator.prototype.clickNumberButton = function(event) {
    var data = this.calcViewModel.getData();
    if (this.getHaveToRefresh()) {
      if (event.buttonValue !== "0") {
        this.setHaveToRefresh(false);
      }
      data = "";
    }
    if (this.checkCipher(data)) {
      data += event.buttonValue;
      this.calcViewModel.setData(data);
    }
  };

  Calculator.prototype.checkCipher = function(data) {
    var splitData = data.split(".");
    var maxCipher = [10, 5];
    var isHaveDecimalPoint = data.indexOf(".") > -1 ? 1 : 0;

    return (
      splitData[isHaveDecimalPoint].length !== maxCipher[isHaveDecimalPoint]
    );
  };

  Calculator.prototype.clickFuncButton = function(event) {
    switch (event.buttonValue) {
      case ".":
        this.decimalPointHandler();
        break;
      case "R":
        this.resetCalc();
        break;
      case "=":
        this.equalHandler(event);
        break;
      default:
        this.operatorHandler(event);
    }
  };

  Calculator.prototype.decimalPointHandler = function() {
    var data = this.calcViewModel.getData();
    if (this.getHaveToRefresh()) {
      this.setHaveToRefresh(false);
      data = "0.";
    }
    if (data.indexOf(".") === -1) {
      data += ".";
    }
    this.calcViewModel.setData(data);
  };

  Calculator.prototype.resetCalc = function() {
    this.setHaveToRefresh(true);
    this.initializeData();
    this.calcViewModel.setData("0");
  };

  Calculator.prototype.equalHandler = function(event) {
    var data = event.data;
    var dataList = this.calcData.dataList;
    var currentExpression = this.getCurrentExpression();
    var currentOperator = this.getCurrentOperator();
    var result;
    if (currentOperator === "=") {
      result = currentExpression.operate(
        dataList.pop(),
        currentExpression.value
      );
      dataList.push(result);
      this.calcViewModel.setData(result);
    } else {
      dataList.push(data);
      this.calculate();
    }

    this.setCurrentOperator("=");
    this.setHaveToRefresh(true);
  };

  Calculator.prototype.operatorHandler = function(event) {
    var operator = event.buttonValue;
    var data = event.data;
    var dataList = this.calcData.dataList;
    dataList.push(data);
    if (this.isCanCalculate(event)) {
      this.calculate();
    }
    this.setCurrentOperator(operator);
    this.setHaveToRefresh(true);
  };

  Calculator.prototype.isCanCalculate = function(event) {
    var currentOperator = this.getCurrentOperator();
    var currentEventValue = event.currentEventValue;
    if (currentOperator === "=" || this.isCommandOperator(currentEventValue)) {
      this.calcData.dataList.pop();
    }
    return this.calcData.dataList.length === 2 && currentOperator !== "=";
  };

  Calculator.prototype.isCommandOperator = function(command) {
    return this.findOpertorFunction(command) !== false;
  };

  Calculator.prototype.calculate = function() {
    var dataList = this.calcData.dataList;
    var currentOperator = this.getCurrentOperator();
    var b = dataList.pop();
    var a = dataList.pop();
    var operate = this.findOpertorFunction(currentOperator);
    var result = this[operate](a, b);

    dataList.push(result);
    this.calcViewModel.setData(result);
    this.setCurrentExpression(this[operate], b);
  };

  Calculator.prototype.setHaveToRefresh = function(booleanData) {
    this._haveToRefresh = booleanData === true ? true : false;
  };

  Calculator.prototype.getHaveToRefresh = function() {
    return this._haveToRefresh;
  };

  Calculator.prototype.setCurrentExpression = function(
    operaterFunction,
    value
  ) {
    this.calcData.currentExpression = {
      operate: operaterFunction,
      value: value
    };
  };

  Calculator.prototype.getCurrentExpression = function() {
    return this.calcData.currentExpression;
  };

  Calculator.prototype.setCurrentOperator = function(operator) {
    this.calcData.currentOperator = operator;
  };

  Calculator.prototype.getCurrentOperator = function() {
    return this.calcData.currentOperator;
  };

  Calculator.prototype.initializeData = function() {
    this.calcData = {
      currentExpression: null,
      currentOperator: null,
      dataList: []
    };
  };

  return Calculator;
})();
