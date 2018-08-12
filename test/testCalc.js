const calculator1 = new Calculator({ parentElemnt: document.body });
const commandCenter = commandString => {
  let command;
  for (let i = 0; i < commandString.length; i++) {
    command = commandString[i];
    var param = {
      buttonValue: command,
      currentEventValue: commandString[i - 1],
      data: calculator1.calcViewModel.getData()
    };
    if (window.isNaN(Number(command))) {
      calculator1.clickFuncButton(param);
    } else {
      calculator1.clickNumberButton(param);
    }
  }
  return document.querySelector("[data-target]").innerText;
};
