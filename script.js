const screenMain = document.querySelector('.screen-main');

let currentMainValue = 0;

function displayMain(displayValue) {
currentMainValue = displayValue;
return screenMain.textContent = currentMainValue;
}

displayMain(0);

const screenTop = document.querySelector('.screen-top');

currentTopValue = [];

function displayTop() {
return screenTop.textContent = currentTopValue;
};


let currentOperand;
let operandActive = false;
let decimalActive = false;
let equalsActive = false;

const buttons = document.querySelectorAll('.btn');


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
    if (num2 == 0) {
        alert("Cannot divide by zero - resetting values")
        return allClear();
    } else {
    return Number(num1) / Number(num2);
    }
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
        return allClear();


    } else if (button.id === 'clear') {
        return clear(currentMainValue);

    } else if ('decimal' in button.dataset) {

        if (operandActive) {
            // check if operand active first
            // if so, clear currentMainValue & replace with "0."
            decimalActive = true;
            console.log(`decimalActive: ${decimalActive}`)
            currentMainValue = "0.";
            return screenMain.textContent = currentMainValue;
        } else if (decimalActive === true) {
            return console.log(`decimalActive: ${decimalActive}`)
            // do nothing - unable to add a 2nd decimal point
        } else {
        return decimalPoint(currentMainValue);
        }


    } else if ('number' in button.dataset) { 

        if (decimalActive) {
            currentMainValue += button.id;
            return screenMain.textContent = currentMainValue;

        } else if (equalsActive) {
            console.log("equals already active");
            currentTopValue =  [];
            screenTop.textContent = currentTopValue;
            currentMainValue = button.id;
            return screenMain.textContent = currentMainValue;
        }

        else if (operandActive) {
            if (button.id == 0) { // if 0 is pressed add it to the displayed number
                currentMainValue += button.id;
                return screenMain.textContent = currentMainValue;
            }
            currentMainValue = button.id;
            return screenMain.textContent = currentMainValue;
        }
        
        else if (currentMainValue == 0) {

            if (decimalActive) {
                currentMainValue += button.id;
                return screenMain.textContent = currentMainValue;
            } else {
            currentMainValue = button.id;
            return screenMain.textContent = currentMainValue;
            }

        } else {
        currentMainValue += button.id;
        return screenMain.textContent = currentMainValue;
        }


    } else if ('operand' in button.dataset) {
        return operandHandler(button.id);


    } else if ('equals' in button.dataset) {
        if (!equalsActive) {
            equalsActive = true; // if equalsActive is false, set it to true
            console.log(`equalsActive: ${equalsActive}`);
            currentTopValue.push(currentMainValue);
            screenTop.textContent = currentTopValue.join('');
            if (currentTopValue.length < 3) {
                return console.log('insufficient formula')
            } else if (currentTopValue.length > 3) {
                return console.log("Too many indexes in formula")
            } else {
            let result = operate(currentTopValue);
            currentMainValue = result;
            return screenMain.textContent = currentMainValue;
            }
        
        } else {
            equalsActive = true;
            console.log(`equalsActive: ${equalsActive}`)
            // if formula is 1+2=3 then new formula should be 3+2
            currentTopValue[0] = currentMainValue;
            screenTop.textContent = currentTopValue.join('');
            
            let result = operate(currentTopValue);
            currentMainValue = result;
            return screenMain.textContent = currentMainValue;

    }

    } else {
        console.log('no handler for this scenario yet!')
    }
}


function operandHandler(button) {

    if (equalsActive) {
        console.log("operandHandler(): equals already active, clearing top value & setting main value to button id");
        currentTopValue = [0];
        screenTop.textContent = currentTopValue;
        currentMainValue = button.id;
        return screenMain.textContent = currentMainValue;

    } else if (currentTopValue.includes("+" || "-" || "*" || "/")) {
        console.log(`operandhandler: Active operand found: ${currentOperand}`)

        // if top value has 3 or more indexes change the last one for the new main value
        if (currentTopValue.length >= 3) {
            currentTopValue[2] = currentMainValue;
        } else if (currentTopValue.length < 3) {
            currentTopValue.push(currentMainValue);
            screenTop.textContent = currentTopValue.join('');
            currentMainValue = operate(currentTopValue);
            
            operandActive = true;
            console.log(`operandActive: ${operandActive}`)
            // equalsActive = true;
            console.log(`equalsActive: ${equalsActive}`)

            return screenMain.textContent = currentMainValue;
        }

    } else { // equals is not active and we are just changing the active operand    
    currentOperand = button;
    operandActive = true;
    console.log(`operandActive: ${operandActive}`)
    console.log(`Current operand is now ${currentOperand}`);
    currentTopValue.push(currentMainValue);
    currentTopValue.push(currentOperand);
    return screenTop.textContent = currentTopValue.join('');
    }
}

function decimalPoint(number) {
    decimalActive = true;
    console.log(`decimalActive: ${decimalActive}`)
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
        return console.log('float presented as string')
    } else {
        return console.log('not a float')
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
    return screenTop.textContent = currentTopValue;
};

function clear(number) {
    if (number <= 9 || number === NaN) {
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



