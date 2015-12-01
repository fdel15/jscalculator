var display = "";
var placeHolders = []

$(document).ready(function(){
  clearDisplay();
  $(".numbers").click(numberPressed)
  $(".operators").click(operatorPressed)
  $("#ac").click(clearAll)
  $("#ce").click(clearDisplay)
  $("#equals").click(equals)
  $("#percent").click(percent)
})

function numberPressed() {
  var target = $(event.target);
  display += target.val();
  display = display.slice(0, 12);
  displayText();
}

function operatorPressed() {
  var target = $(event.target);
  display = ""
  placeHolders.push($("#display").text())
  if(placeHolders.length === 3 ) {
    equals()
    placeHolders.push($("#display").text())
  }
  placeHolders.push(target.val())
}

function equals() {
  placeHolders.push($("#display").text())
  calculate()
  clearVariables()
}

function clearDisplay() {
  display = ""
  $("#display").text("0");
}

function clearVariables() {
  display = "";
  placeHolders = [];
}

function clearAll() {
  clearDisplay();
  clearVariables();
}

function add(a,b) {
  return a + b;
}

function sub(a,b) {
  return a - b;
}

function mult(a,b) {
  return a * b;
}

function div(a,b) {
  return a / b;
}

function calculate() {
  var num1 = parseFloat(placeHolders[0])
  var num2 = parseFloat(placeHolders[2])
  var operator = placeHolders[1];
  var result;

  switch(operator) {
    case "add":
      result = add(num1, num2)
      break;

    case "subtract":
      result = sub(num1, num2)
      break;

    case "multiply":
      result = mult(num1, num2)
      break;

    case "divide":
      result = div(num1, num2)
      break;
  }
  result = sciNotation(result);
  display = result.toString().slice(0, 12);
  displayText();
}

function sciNotation(result) {
  var string = result.toString().split(".")[0]

  if ( string.length > 12 ) {
    result = result.toExponential(3);
  }

  return result
}

function displayText() {
  if(display[0] === ".") {
    display = "0."
  }
  $("#display").text(display)
}

function percent() {
  if (placeHolders.length < 2) return;
  var percentWanted = parseFloat($("#display").text());
  var baseNum = placeHolders[0];
  var num = (percentWanted * baseNum) / 100
  placeHolders.push(num);
  equals();
}

