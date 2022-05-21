const screenMain = document.querySelector('.screen-main');
const screenTop = document.querySelector('.screen-top');
const buttons = document.querySelectorAll('.btn');

let currentMainValue = 0;
let currentTopValue = [];
let currentOperand;

function displayMain(displayValue) {
currentMainValue = displayValue;
return screenMain.textContent = currentMainValue;
}

displayMain(0);

function displayTop() {
    return screenTop.textContent = currentTopValue;
    };

// these functions handle all type conversion from string to number
const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => Number(num1) - Number(num2);
const multiply = (num1, num2) => Number(num1) * Number(num2)
const divide = (num1, num2) => {
    if (num2 == 0) {
        alert("Cannot divide by zero - resetting values");
        return allClear();
    } else {
        return Number(num1) / Number(num2);
    }
}

// ## MAIN FUNCTION USING VARIABLES - NO CHAINING
function calculate(num1, operand, num2) {
    switch (operand) {
        case add:
            return add(num1, num2);
            // no need for breaks if returning
        case subtract:
            return subtract(num1, num2);
        case multiply:
            return multiply(num1, num2);
        case divide:
            return divide(num1, num2);
        default:
            console.error("no operand input");
    }
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleClick(button);
    })
})

function handleClick(button) {
    console.log(`${button.id} pressed`);

    if (button.id === "allClear") {
        return allClear();
    
    } else if (button.id === "clear") {
        return clear(currentMainValue);

    } else if ("decimal" in button.dataset) {
        // add a decimal point to the end of the displayed number
        // if a decimal is already there, do nothing

    
    } else if ("number" in button.dataset) {
        // numberHandler()
        if (currentMainValue === 0) {
            currentMainValue = button.id;
            return displayMain(currentMainValue);
        }
        currentMainValue += button.id;
        return displayMain(currentMainValue);

    } else if ("operand" in button.dataset) {
        currentOperand = button.id;

    } else if (button.id === "=") {
        calculate();
    
    } else {
        console.error("no handler");
    }
}

function allClear() {
    currentOperand = null;
    operandActive = false;
    decimalActive = false;
    equalsActive = false;
    currentMainValue = 0;
    screenMain.textContent = currentMainValue;
    currentTopValue = [];
    screenTop.textContent = currentTopValue;
};

function clear(number) {
    if (number <= 9 || number === NaN) { // cant check for Nan
        currentMainValue = 0;
        return screenMain.textContent = currentMainValue;
    } else if (number > 10 || isFloat(number)) {
        let string = number.toString();
        let newString = string.slice(0,-1);
        let newNumber = parseInt(newString);
        currentMainValue = newNumber;
        return screenMain.textContent = currentMainValue;
        // if number is a float either higher or lower than 10 this codeblock will still execute
    } else {
        return console.error("no clear condition to handle this value");
    }
};