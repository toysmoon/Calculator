var CalcViewModel = (function() {
  function CalcViewModel(model, option) {
    this.calcModel = model;
    this.calcView = new CalcView(this, option);
    this.currentEventValue = null;
    this.data = "0";
  }

  CalcViewModel.prototype.calcEventHandler = function(event) {
    var eventInfo = this.eventParser(event);
    if (typeof this.calcModel[eventInfo.command] === "function") {
      this.calcModel[eventInfo.command](eventInfo);
      this.currentEventValue = event.buttonValue;
    }
  };

  CalcViewModel.prototype.eventParser = function(event) {
    var eventTarget = event.srcElement;
    return (result = {
      command: eventTarget.getAttribute("data-command"),
      buttonValue: eventTarget.innerText,
      currentEventValue: this.currentEventValue,
      data: this.getData()
    });
  };

  CalcViewModel.prototype.getData = function() {
    return this.data;
  };

  CalcViewModel.prototype.setData = function(data) {
    var viewData;
    this.data = data;
    viewData = this.makeViewData(data);
    this.calcView.setResultData(viewData);
  };

  CalcViewModel.prototype.makeViewData = function(data) {
    var isHaveComma = data.indexOf(".") > 0;
    var divideData = data.split(".");
    var intigerValue = divideData[0];
    var decimalValue = divideData[1] === undefined ? "" : divideData[1];
    var commaCount = Math.floor((intigerValue.length - 1) / 3);
    var headNumberCount = intigerValue.length % 3 || 3;
    var result = intigerValue.slice(0, headNumberCount);
    intigerValue = intigerValue.slice(headNumberCount);

    for (var i = 0; i < commaCount; i++) {
      result += ",";
      result += intigerValue.slice(0, 3);
      intigerValue = intigerValue.slice(3);
    }

    if (isHaveComma) {
      result = result + "." + decimalValue;
    }

    return result;
  };

  return CalcViewModel;
})();
