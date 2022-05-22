// variable declarations
const screenMain = document.querySelector('.screen-main');
const screenTop = document.querySelector('.screen-top');
const buttons = document.querySelectorAll('.btn');

let currentMainValue = 0;
let currentTopValue = [];
let currentOperator;
let operatorActive = false;
let decimalActive = false;
let equalsActive = false;
let lastBtnPressed = null;


// ## DISPLAY FUNCTIONS
function displayMain(value) {
    if (value == 0 || value === ".") {
        currentMainValue += value;
    } else {
    currentMainValue = value;
    }
    return screenMain.textContent = currentMainValue;
} ;


function displayTop(value) {
    currentTopValue = value;
    return screenTop.textContent = currentTopValue;
    };

displayMain(0);


// #### MATH FUNCTIONS ####

const add = function add(num1, num2) { return Number(num1) + Number(num2); }
const subtract = function subtract(num1, num2) { return Number(num1) - Number(num2); }
const multiply = function multiply(num1, num2) { return Number(num1) * Number(num2); }
const divide = function divide(num1, num2) {
    if (num2 == 0) {
        alert("Cannot divide by zero - resetting values")
        console.clear();
        return allClear();
    } else { return Number(num1) / Number(num2); }
}


// ## CALCULATOR FUNCTION USING ARRAY STACK eg. [1, “*”, 1]
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
            console.log("no operator input");
    }
}

// begin functions!
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleClick(button);
    })
})

// max numbers = 10
function handleClick(button) {
    lastBtnPressed = button.id;
    console.log(`last button pressed: ${lastBtnPressed}`)
    if (button.id === 'allclear') {
        return allClear();

    } else if (button.id === 'clear') {
        return clear(currentMainValue);

    } else if ('decimal' in button.dataset) {
        alert(`Sorry, this isn't working yet!`);

        // if (operatorActive) {
        //     // check if operator active first
        //     // if so, clear currentMainValue & replace with "0."
        //     decimalActive = true;
        //     console.log(`decimalActive: ${decimalActive}`)
        //     currentMainValue = "0.";
        //     return screenMain.textContent = currentMainValue;
        // } else if (decimalActive === true) {
        //     return console.log(`decimalActive: ${decimalActive}`)
        //     // do nothing - unable to add a 2nd decimal point
        // } else {
        // return decimalPoint(currentMainValue);
        // }


    } else if ('number' in button.dataset) { 

        /// add a new condition if zero button was pressed

        if (decimalActive) {
            currentMainValue += button.id;
            return screenMain.textContent = currentMainValue;

        } else if (equalsActive) {
            console.log("equals already active");
            currentTopValue = [];
            screenTop.textContent = currentTopValue;
            currentMainValue = button.id;
            return screenMain.textContent = currentMainValue;
        }

        else if (currentTopValue.length === 2) {
            currentMainValue = button.id;
            screenMain.textContent = currentMainValue;
        } else if (currentTopValue.includes("+" || "-" || "*" || "/")) {
            currentMainValue = button.id;
            currentTopValue = [];
            screenMain.textContent = currentMainValue;
            return screenTop.textContent = currentTopValue.join('');
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


    } else if ('operator' in button.dataset) {
        return operatorHandler(button.id);


    } else if ('equals' in button.dataset) {
        if (!equalsActive) {
            equalsActive = true; 
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


function operatorHandler(button) {

    if (equalsActive) {
        currentTopValue = [currentMainValue];
        screenTop.textContent = currentTopValue;
        currentMainValue = button.id;
        return screenMain.textContent = currentMainValue;

    } else if (currentTopValue.includes("+" || "-" || "*" || "/")) {
        console.log(`operatorHandler: Active operator found: ${currentOperator}`)

        // if top value has 3 or more indexes change the last one for the new main value
        if (currentTopValue.length >= 3) {
            currentTopValue[2] = currentMainValue;
            console.log(`operatorHandler: currentTopValue is ${currentTopValue}`)
            return screenTop.textContent = currentTopValue.join('');
        } else if (currentTopValue.length < 3) {
            console.log(`operatorHandler: Starting currentTopValue is ${currentTopValue}`)
            currentTopValue.push(currentMainValue);
            screenTop.textContent = currentTopValue.join('');
            currentMainValue = operate(currentTopValue);
            
            operatorActive = true;
            console.log(`operatorHandler: operatorActive is ${operatorActive}`)
            // equalsActive = true;
            console.log(`operatorHandler: equalsActive is ${equalsActive}`)
            console.log(`operatorHandler: Ending currentTopValue is ${currentTopValue}`)
            return screenMain.textContent = currentMainValue;
        }

    } else { // equals is not active and we are just changing the active operator    
    currentOperator = button;
    operatorActive = true;
    console.log(`operatorActive: ${operatorActive}`)
    console.log(`Current operator is now ${currentOperator}`);
    currentTopValue.push(currentMainValue);
    currentTopValue.push(currentOperator);
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
    console.clear();
    currentOperator = null;
    operatorActive = false;
    decimalActive = false;
    equalsActive = false;
    currentMainValue = 0;
    screenMain.textContent = currentMainValue;
    currentTopValue = [];
    return screenTop.textContent = currentTopValue;
};

function clear(number) {
    if (number <= 9) {
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



