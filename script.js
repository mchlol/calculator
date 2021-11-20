const screenMain = document.querySelector('.screen-main');
let currentMainValue = 0;
screenMain.textContent = currentMainValue;

const screenTop = document.querySelector('.screen-top');
let currentTopValue = 0;
screenTop.textContent = currentTopValue;

let currentOperand = null;
let newValue;

const buttons = document.querySelectorAll('.btn');

// const allClearBtn = document.querySelector('[data-allclear]');
// const clearBtn = document.querySelector('[data-clear]');
// const operandBtns = document.querySelectorAll('[data-operand');
// const numberBtns = document.querySelectorAll('[data-number]');
// const decimalBtn = document.querySelector('[data-decimal');
// const equalsBtn = document.querySelector('[data-equals');


const add = function add(number1, number2) {
    return number1 + number2;
}

const subtract = function subtract(number1, number2) {
    return number1 - number2;
}

const multiply = function multiply(number1, number2) {
    return number1 * number2;
}

const divide = function divide(number1, number2) {
    return number1 / number2;
}

function operate(operand, number1, number2) {
    switch(operand) {
        case add:
            return add(number1,number2);
        case subtract:
            return subtract(number1,number2);
        case multiply:
            return multiply(number1,number2);
        case divide:
            return divide(number1,number2);
        default: 
            console.log("no operand");
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleClick(button);
    })
})

// max numbers = 10
function handleClick(button) {
    if (button.id === 'allclear') {
        currentMainValue = 0;
        currentTopValue = 0;
        screenMain.textContent = currentMainValue;
        screenTop.textContent = currentTopValue;
    } else if (button.id === 'clear') {
        clear(currentMainValue);
    } else if ('number' in button.dataset) { 
        if (currentMainValue === 0) {
            currentMainValue = button.id;
            screenMain.textContent = currentMainValue;
        } else if (currentMainValue === NaN) { // if value is NaN ?
            currentMainValue = 0;
            screenMain.textContent = currentMainValue;
        } else {
        currentMainValue += button.id;
        screenMain.textContent = currentMainValue;
        }
    } else {
        console.log('button was not a number')
    }
}

function clear(number) {
    if (number === 0) {
        currentMainValue = 0;
        return screenMain.textContent = currentMainValue;
    } else if (number <= 9) {
        currentMainValue = 0;
        return screenMain.textContent = currentMainValue;
    } else if (number > 10) {
        let string = number.toString();
        let newString = string.slice(0,-1);
        let newNumber = parseInt(newString);
        currentMainValue = newNumber;
        return screenMain.textContent = currentMainValue;
    } else {
        return console.error("ERROR");
    }
};



