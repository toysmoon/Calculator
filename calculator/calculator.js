var Calculator = (function() {
  /*
  @param parentElemnt 계산기가 그려질 장소
  @param option {layout: []} 레이아웃 순서 및 정보
  */
  function Calculator(option) {
    this.calcViewModel = new CalcViewModel(this, option);
    this._haveToRefresh = true;
    this.calcData = {
      currentOperate: null,
      currentOperater: null,
      dataList: []
    };
  }

  Calculator.prototype.clickNumberButton = function(event) {
    var data = this.calcViewModel.getData();
    if (this._haveToRefresh === true) {
      if (event.buttonValue !== "0") {
        this._haveToRefresh = false;
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
    if (this._haveToRefresh === true) {
      this._haveToRefresh = false;
      data = "0.";
    }
    if (data.indexOf(".") === -1) {
      data += ".";
    }
    this.calcViewModel.setData(data);
  };

  Calculator.prototype.resetCalc = function() {
    this._haveToRefresh = true;
    this.calcData = {
      currentOperate: null,
      currentOperater: null,
      dataList: []
    };
    this.calcViewModel.setData("0");
  };

  Calculator.prototype.equalHandler = function(data) {
    var dataList = this.calcData.dataList;
    var currentOperate = this.calcData.currentOperate;
    var result;
    if (this.calcData.currentOperater === "=") {
      result = currentOperate.operate(dataList.pop(), currentOperate.value);
      dataList.push(result);
      this.calcViewModel.setData(result);
    } else {
      dataList.push(data);
      this.calculate();
    }

    this.calcData.currentOperater = "=";
    this._haveToRefresh = true;
  };

  Calculator.prototype.operatorHandler = function(operator, data) {
    var dataList = this.calcData.dataList;
    dataList.push(data);
    if (this.isCanCalculate()) {
      this.calculate();
    }
    this.calcData.currentOperater = operator;
    this._haveToRefresh = true;
  };

  Calculator.prototype.isCanCalculate = function() {
    if (this.calcData.currentOperater === "=") {
      this.calcData.dataList.pop();
    }
    return (
      this.calcData.dataList.length === 2 &&
      this.calcData.currentOperater !== "="
    );
  };

  Calculator.prototype.calculate = function() {
    var dataList = this.calcData.dataList;
    var b = dataList.pop();
    var a = dataList.pop();
    var operate = this.findOpertorFunction(this.calcData.currentOperater);
    var result = this[operate](a, b);

    dataList.push(result);
    this.calcViewModel.setData(result);

    this.calcData.currentOperate = {
      value: b,
      operate: this[operate]
    };
  };

  return Calculator;
})();
