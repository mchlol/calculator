const screenMain = document.querySelector('.screen-main');
let currentMainValue = 0;
screenMain.textContent = currentMainValue;

const screenTop = document.querySelector('.screen-top');
let currentTopValue = [];
screenTop.textContent = currentTopValue;

let currentOperand = null;
let operandActive = false;
let decimalActive = false;
let newValue;
let equalsActive = false;

const buttons = document.querySelectorAll('.btn');

// const allClearBtn = document.querySelector('[data-allclear]');
// const clearBtn = document.querySelector('[data-clear]');
// const operandBtns = document.querySelectorAll('[data-operand');
// const numberBtns = document.querySelectorAll('[data-number]');
// const decimalBtn = document.querySelector('[data-decimal');
// const equalsBtn = document.querySelector('[data-equals');


const add = function add(num1, num2) {
    return Number(num1) + Number(num2);
}

const subtract = function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

const multiply = function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

const divide = function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

// stack can be an array eg. [1, “*”, 1]

// ## FUNCTION USING ARRAY STACK
function operate(array) {
    switch(array[1]) {
        case "+":
            return add(array[0],array[2]);
        case "-":
            return subtract(array[0],array[2]);
        case "*":
            return multiply(array[0],array[2]);
        case "/":
            return divide(array[0],array[2]);
        default: 
            console.log("no operand input");
    }
}


// ## FUNCTION USING VARIABLES
// function operate(num1, operand, num2) {
//     switch(operand) {
//         case add:
//             return add(num1,num2);
//         case subtract:
//             return subtract(num1,num2);
//         case multiply:
//             return multiply(num1,num2);
//         case divide:
//             return divide(num1,num2);
//         default: 
//             console.log("no operand input");
//     }
// }

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleClick(button);
    })
})

// max numbers = 10
function handleClick(button) {
    if (button.id === 'allclear') {
        allClear();

    } else if (button.id === 'clear') {
        decimalActive = false;
        clear(currentMainValue);

    } else if ('decimal' in button.dataset) {
        if (decimalActive === true) {
            console.log(`Decimal point present: ${decimalActive}`);
        } else {
        decimalActive = true;
        decimalPoint(currentMainValue);
        }

    } else if ('number' in button.dataset) { 

        if (equalsActive) {

        }

        // check currentTopValue has value
        else if (currentMainValue === 0) {
            currentMainValue = button.id;
            screenMain.textContent = currentMainValue;

        } else if (currentTopValue) {
            currentMainValue = button.id;
            screenMain.textContent = currentMainValue;

        } else {
        currentMainValue += button.id;
        screenMain.textContent = currentMainValue;
        }

    } else if ('operand' in button.dataset) {

        if (currentTopValue.includes("+" || "-" || "*" || "/")) {
            // check for all operands
            console.log(`operand found: ${currentOperand}`)
            currentTopValue = [];
        }
        currentOperand = button.id;
        operandActive = true;
        console.log(`Current operand is now ${currentOperand}`);
        currentTopValue.push(currentMainValue);
        currentTopValue.push(currentOperand);
        screenTop.textContent = currentTopValue.join('');

        // don't clear the currentMainValue 

    } else if ('equals' in button.dataset) {
        console.log(`equalsActive = ${equalsActive}`);
        if (!equalsActive) {
            equalsActive = true;
            currentTopValue.push(currentMainValue);
            screenTop.textContent = currentTopValue.join('');
            if (currentTopValue.length < 3) {
                console.log('insufficient formula')
            } else {
            let result = operate(currentTopValue);
            currentMainValue = result;
            screenMain.textContent = currentMainValue;
            }
        
        } else {
            equalsActive = true;
            // if formula is 1+2=3 then new formula should be 3+2
            currentTopValue[0] = currentMainValue;
            screenTop.textContent = currentTopValue.join('');
            
            let result = operate(currentTopValue);
            currentMainValue = result;
            screenMain.textContent = currentMainValue;

    }
    } else {
        console.log('no handler for this button yet')
    }
}

function decimalPoint(number) {
    let decimalAdded = number += ".";
    currentMainValue = decimalAdded;
    return screenMain.textContent = currentMainValue;
}

// https://dev.to/uzairsamad/how-to-check-if-number-is-float-in-js-h98
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }

function hasPeriod(str) {
    if (str.includes('.')) {
        console.log('float presented as string')
    } else {
        console.log('not a float')
    }
}

function allClear() {
    decimalActive = false;
    equalsActive = false;
    currentMainValue = 0;
    currentTopValue = [];
    screenMain.textContent = currentMainValue;
    screenTop.textContent = currentTopValue;
};

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
    } else if (isFloat(number)) {
        console.log("number is a floating point integer");
    } else {
        return console.error("no clear condition to handle this value");
    }
};



