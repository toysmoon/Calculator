var Calculator = (function() {
  /*
  @param parentElemnt 계산기가 그려질 장소
  @param option {layout: []} 레이아웃 순서 및 정보
  */
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
    data += event.buttonValue;
    this.calcViewModel.setData(data);

    return data;
  };

  Calculator.prototype.clickFuncButton = function(event) {
    var value = event.buttonValue;
    var data = this.calcViewModel.getData();
    switch (value) {
      case ".":
        this.decialPointHandler();
        break;
      case "R":
        this.resetCalc();
        break;
      case "=":
        this.equalHandler(data);
        break;
      default:
        this.operatorHandler(value, data);
    }
  };

  Calculator.prototype.decialPointHandler = function() {
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

  Calculator.prototype.equalHandler = function(data) {
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

  Calculator.prototype.operatorHandler = function(operator, data) {
    var dataList = this.calcData.dataList;
    dataList.push(data);
    if (this.isCanCalculate()) {
      this.calculate();
    }
    this.setCurrentOperator(operator);
    this.setHaveToRefresh(true);
  };

  Calculator.prototype.isCanCalculate = function() {
    var currentOperator = this.getCurrentOperator();
    if (currentOperator === "=") {
      this.calcData.dataList.pop();
    }
    return this.calcData.dataList.length === 2 && currentOperator !== "=";
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
