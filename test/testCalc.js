const calculator1 = new Calculator({ parentElemnt: document.body });
const commandCenter = commandString => {
  let command;
  for (let i = 0; i < commandString.length; i++) {
    command = commandString[i];
    if (window.isNaN(Number(command))) {
      calculator1.clickFuncButton({ buttonValue: command });
    } else {
      calculator1.clickNumberButton({ buttonValue: command });
    }
  }
  return document.querySelector("[data-target]").innerText;
};
