const screenMain = document.querySelector('.screen-main');
let currentMainValue = 0;
screenMain.textContent = currentMainValue;

const screenTop = document.querySelector('.screen-top');
let currentTopValue;
screenTop.textContent = currentTopValue;

let currentOperand;

const buttons = document.querySelectorAll('.btn');

// const allClearBtn = document.querySelector('[data-all-clear]');
// const clearBtn = document.querySelector('[data-clear]');
// const operandBtns = document.querySelectorAll('[data-operand');
const numberBtns = document.querySelector('[data-number]');
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

// store the result in currentValue variable, 
// append it to the screen
//doesnt need to return it ?

buttons.forEach(button => {
    button.addEventListener('click', () => {
        displayValue(button);
    })
})

function displayValue(button) {
    currentMainValue = button.id;
    screenMain.textContent = currentMainValue;
}


function handleClick(button) {
    if (button.hasAttribute('[data-number]')) { // first check if the button was a number, not an operand etc.
        if (screenMain.textContent) { // if this returns true textContent has a value
            screenMain.textContent += currentMainValue;
        } else { // if it's false it has no value and we can give it one
            screenMain.textContent = currentMainValue;
        }
    // } else if () {
    
    } else {
        console.log('button was not a number')
    }
}

/*
click number button
number is added to currentMainValue
currentMainValue appears in screenMain
click operand
number in currentMainValue is moved to currentTopValue
currentTopValue appears in screenTop
operand shows to the right of currentTopValue
click another number
that number replaces the value in currentMainValue, showing in screenMain
click equals button
currentMainValue is moved to the right of currentTopValue eg 1 + 1 
1 + 1 is calculated
calculated value updates currentMainValue
currentMainValue shows in screenMain
*/