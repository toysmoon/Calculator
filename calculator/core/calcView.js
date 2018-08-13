var CalcView = (function() {
  function CalcView(viewModel, option) {
    this.calcViewModel = viewModel;
    this.initializeLayout(option || {});
    this.initializeTemplate();
    this.render();
    this.bindEvent();
    this.appendElement(option.parentElemnt);
  }

  CalcView.prototype.initializeLayout = function(option) {
    this.itemList = option.itemList || Template.calculator.itemList;
  };

  CalcView.prototype.initializeTemplate = function() {
    this.template = "";
    for (var i = 0; i < this.itemList.length; i++) {
      this.template += this.makeItem(i);
    }
  };

  CalcView.prototype.makeItem = function(index) {
    var item = this.itemList[index];
    var itemInfo = item.split(":");
    var itemTag = itemInfo[0];
    var itemValue = itemInfo[1];
    var itemTemplate = Template.calcurator.tagInfo[itemTag] || item;
    itemTemplate = itemTemplate.replace(/\{\{value\}\}/g, itemValue);
    itemTemplate = itemTemplate.replace(
      /\{\{attrInfo\}\}/g,
      this.makeItemAttr(index)
    );

    return itemTemplate;
  };

  CalcView.prototype.makeItemAttr = function(index) {
    var item = this.itemList[index];
    var itemInfo = item.split(":");
    var itemTag = itemInfo[0];
    var attrObject = Template.calcurator.defaultAttr[itemTag];
    var attrString = "";
    for (var attrName in attrObject) {
      attrString += attrName + '="' + attrObject[attrName] + '"';
    }

    return attrString;
  };

  CalcView.prototype.render = function() {
    this.element = document.createElement("div");
    this.element.innerHTML = this.template;
  };

  CalcView.prototype.appendElement = function(parentElemnt) {
    parentElemnt.appendChild(this.element);
  };

  CalcView.prototype.bindEvent = function() {
    var eventCallback = this.bindFunction(this.eventParser, this);
    var eventTarget = this.element;
    //IE8 addEventListener 대신 attachEvent 사용
    if (eventTarget.addEventListener) {
      eventTarget.addEventListener("click", eventCallback);
    } else {
      eventTarget.attachEvent("onclick", eventCallback);
    }
  };

  CalcView.prototype.eventParser = function(event) {
    this.calcViewModel.calcEventHandler(event);
  };

  //IE8 bind 함수 정의되어 있지 않아 간단하게 만들어서 사용
  CalcView.prototype.bindFunction = function(func, target) {
    return function() {
      func.apply(target, arguments);
    };
  };

  CalcView.prototype.setResultData = function(data) {
    var targetElemnt = this.element.querySelector("[data-target]");
    targetElemnt.innerText = data;
  };

  return CalcView;
})();
