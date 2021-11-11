const screenMain = document.querySelector('.screen-main');
let currentMainValue = "2";
screenMain.textContent = currentMainValue;

const screenTop = document.querySelector('.screen-top');
let currentTopValue = "1 + 1";
screenTop.textContent = currentTopValue;

let currentOperand;

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      console.log(button.id);
      screenMain.textContent = button.id;
    })
});

function clickHandler(button) {
    switch (button.classList.contains) {
        case 'number-btn':
            screenMain.textContent = button.id;
            break;
        case 'function-btn':
            let topValueFormula = Array.from(currentTopValue);
            calculate(topValueFormula[0], topValueFormula[1], topValueFormula[2]);
    }
}

/*
click button
if number, display on screenMain
if there is a number on screenMain, next number should append to it's right
    if (screen contains numbers) { screenValue + button.id}
if operand is clicked, move first number to top of screen
    operands: add, subtract, divide, multiply
store top of screen contents in currentTopValue
when = is clicked, calculate currentTopValue
if screenTop is 1 + 1, if the next button is a number append it (eg 1+1 becomes 1+12) OR if it's an operator, calculate (1+1) and display that on screenMain
* limit amount of numbers than can appear on the screen - round longer numbers?
* disable decimal if there's already one on the screen
    if (screen contains decimal) { disable decimal button }
* pressing clear should reset all 'current' variables
* extra credit: backspace, keyboard support
*/

function calculate(number1, operand, number2) {
    if (operand === add) {
        return number1 + number2;
    } else if (operand === subtract) {
        return number1 - number2;
    } else if (operand === multiply) {
        return number1 * number2;
    } else if (operand === divide) {
        return number1 / number2;
    } else {
        return "80085";
    }
};