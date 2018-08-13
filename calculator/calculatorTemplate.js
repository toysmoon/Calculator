//Template 수정을 통해 마크업, attr 자유롭게 수정가능
Template = {};
Template.calcurator = {
  tagInfo: {
    resultBox: "<span {{attrInfo}}>{{value}}</span>",
    numberButton: "<button {{attrInfo}}>{{value}}</button>",
    funcButton: "<button {{attrInfo}}>{{value}}</button>"
  },
  defaultAttr: {
    resultBox: {
      "data-target": "",
      class: "calc-result"
    },
    numberButton: {
      "data-command": "clickNumberButton",
      class: "calc calc-number"
    },
    funcButton: {
      "data-command": "clickFuncButton",
      class: "calc calc-func"
    }
  },
  itemList: [
    "<div>",
    "resultBox:0",
    "funcButton:R",
    "</div><div>",
    "numberButton:1",
    "numberButton:2",
    "numberButton:3",
    "funcButton:+",
    "</div><div>",
    "numberButton:4",
    "numberButton:5",
    "numberButton:6",
    "funcButton:-",
    "</div><div>",
    "numberButton:7",
    "numberButton:8",
    "numberButton:9",
    "funcButton:*",
    "</div><div>",
    "funcButton:.",
    "numberButton:0",
    "funcButton:=",
    "funcButton:/",
    "</div>"
  ]
};
