const inputElement = document.getElementById("inputString");
const outputElement = document.getElementById("output");
const buttons = document.querySelectorAll(".btn");

outputElement.textContent = " ";

const updateInputValue = (input) => {
  inputElement.value = input;
};
const updateOutputValue = (output) => {
  outputElement.textContent = output;
};

function init() {
  let inputString = "";
  let openingBacketCount = 0;

  function evalInput() {
    try {
      let newString = inputString.replace(new RegExp("x", "g"), "*");
      return eval(newString);
    } catch {
      return "error";
    }
  }

  function handleBracketInut() {
    console.log("hey");
    const opArr = ["-", "+", "x", "/", "%"];
    if (
      inputString === "" ||
      opArr.includes(inputString.charAt(inputString.length - 1))
    ) {
      inputString += "(";
      openingBacketCount++;
    } else if (openingBacketCount > 0) {
      inputString += ")";
      openingBacketCount--;
    }
    updateInputValue(inputString);
    const res = evalInput();
    if (res === "error") return;
    updateOutputValue(res);
  }

  function handleEqualTo() {
    const res = evalInput();
    if (res === "error") return;
    updateInputValue(res);
    updateOutputValue("");
    inputString = res;
  }

  function handleClearInput() {
    inputString = "";
    updateInputValue("");
    updateOutputValue("");
  }

  function handleRemoveLastCharater() {
    inputString = inputString.slice(0, -1);
    updateInputValue(inputString);
    const res = evalInput();
    if (res === "error") return;
    updateOutputValue(res);
  }

  function handleInput(input) {
    inputString += input;
    updateInputValue(inputString);
    const res = evalInput();
    if (res === "error") return;
    updateOutputValue(res);
  }
  return {
    handleClearInput,
    handleEqualTo,
    handleInput,
    handleRemoveLastCharater,
    handleBracketInut,
  };
}

const {
  handleClearInput,
  handleEqualTo,
  handleInput,
  handleRemoveLastCharater,
  handleBracketInut,
} = init();

const handleInputEvents = (e) => {
  const input = e.target.value.toLowerCase();

  switch (input) {
    case "=":
      handleEqualTo();
      break;
    case "c":
      handleClearInput();
      break;
    case "<":
      handleRemoveLastCharater();
      break;
    case "()":
      handleBracketInut();
      break;
    default:
      handleInput(input);
  }
};

buttons.forEach((node) => {
  node.addEventListener("click", handleInputEvents);
});
