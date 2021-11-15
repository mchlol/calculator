# Calculator

Alright. Makin' a calculator. I'm not terribly enthused about this project (any more than a to-do list app or memory game) but it's good practice so let's go!  

### Resources

* [The main project page on the Odin Project](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator)  
* [This project from section.io](https://www.section.io/engineering-education/building-a-calculator-a-javascript-project-for-beginners/)  
* [Changing image size in Markdown 😅](https://stackoverflow.com/questions/14675913/changing-image-size-in-markdown)

## Setting Up

Firstly let's think about what you want to do with a calculator. Add some numbers, multiply them, subtract, divide. We also need to be able to clear the screen. So let's go ahead and add some buttons and basic styling.  

*fast-forward*  

[<img src="./images/screenshot-calculator01.png" height="500"/>](./images/screenshot-calculator01.png)

The screen is divided into two parts - the main part of the screen will hold the value of whichever number button has been pressed. The smaller top part of the screen will hold the formula we are going to calculate.   
At this point I'll set an exact size of the screen parts so for now I don't need to worry about how they will look when there's no value in them.  

```
.screen-top {
    height: 22px;
    width: 279px;
}

.screen-main {
    font-size: 28px;
    height: 35px;
    width: 279px;
}
```

*Dealing with overflow of numbers*  
We still want the numbers to be present so we can perform calculations on them if necessary. But we don't want to be able to see them. 

```
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    line-height: 2;
```

The AC button and = button are supposed to span two columns in the grid layout, however I don't want to waste too much time mucking around with the layout (an easy trap to fall into!) so let's move on to the script.  


## The Basics

Thinking firstly about the steps involved in using a calculator, and also reviewing the tips from [the project page](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator).  


### Steps

```
click button  
if number, display on screenMain  
if there is a number on screenMain, next number should append to it's right  
    if (screen contains numbers) { screenValue + button.id}  
if operand is clicked, move first number to top of screen  
    operands: add, subtract, divide, multiply  
store top of screen contents in currentTopValue  
when = is clicked, calculate currentTopValue  
if screenTop is 1 + 1, if the next button is a number append it (eg 1+1 becomes 1+12) OR if it's an operator, calculate (1+1) and display that on screenMain  
- limit amount of numbers than can appear on the screen - round longer numbers?  
- disable decimal if there's already one on the screen  
    if (screen contains decimal) { disable decimal button }  
- pressing clear should clear the data in all 'current' variables  
- extra credit: backspace, keyboard support   
```


## The Script

Firstly grab the two `div`s that will hold the two parts of the screen - the main and the top - and hold them in a variable each. Create a variable for each to hold the current value. Then set the `textContent` of each to display...something.  

```
const screenMain = document.querySelector('.screen-main');
let currentMainValue;
screenMain.textContent = currentMainValue;

const screenTop = document.querySelector('.screen-top');
let currentTopValue;
screenTop.textContent = currentTopValue;
```
Now let's get an event listener on the buttons, so we can click a button and show the value of that button on the screen.

```
buttons.forEach((button) => {
    button.addEventListener('click', () => {
      currentMainValue = button.id;
      screenMain.textContent = currentMainValue;
    })
});
```

Cool, it works. But we actually only want numbers to display on the screen. I tried creating a function using an `if` statement based on `.classList.contains()` and used that as a callback function, but got a TypeError reading properties of undefined. [This project from section.io](https://www.section.io/engineering-education/building-a-calculator-a-javascript-project-for-beginners/) suggests using data-attributes instead of classes so let's give that a go.  
Rather than noodling around with classes, we can use `hasAttribute` to check if a specific data-attribute is present.  


### Functions

So firstly I'll make some very basic functions for each method and see if I can get that to work. 

```
const add = function add(number1, number2) {
    return number1 + number2;
}
```

Refresh to page, test it out in the browser, it works.  
Now let's mash them all together in a switch statement.

```
function calculate(operand, number1, number2) {
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
```

Two things: firstly, I was calling a function for each case, but not actually returning anything. This might not be necessary on building the code further but needs it work now! Secondly, I was treating each case as a string and it was returning undefined??? I fixed this by putting each function into a variable and treating each case as a variable instead of a string.  

Next we need to work on the logic. I'll do this by writing out the pseudocode and figuring out the order from there, and then rewriting that into actual code.  
A little snippet of what that would look like:  
```
Check if button is a number
  Check if there’s a number on main screen
    If there is, add the new number to it (1+1 = 11, not 1+1 = 2)
    If there isn’t, show the current number on main screen
  if button isn't a number, check if it's an operand
    ... 
```

First let's look at what to do if the button is a number. This will end up looking something like this:  
```
function handleClick(button) {
    if ('number' in button.dataset) { 
        currentMainValue = button.id;
        screenMain.textContent = currentMainValue;
    } else {
        console.log('button was not a number')
    }
}
```

What I tried and what didn't work/did work if the button that was clicked had a specific data-attribute:  
* `button.hasAttribute('[data-number]');` returns FALSE
* `button.dataset['number'];` returns FALSE
* `'number' in button.dataset;` returns TRUE! [Thanks MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)

Some things we need to look out for:
* Only when the = is clicked do we want to actually perform any calculation. As shown above if there's already a number in the main screen we want to put the next number next to it. Eg 1 becomes 11, not 1+1. However we can't call the calculator function until we have a whole formula. 
* if a decimal point is already present in the number we want to prevent another one being added
* storing the operand in its own variable eg `currentOperand` saves trying to perform calculations on a string

### Decimals
I can work around whether there is a decimal point in the number displayed by creating a variable `decimalActive = false` and setting it to `true` once the decimal button is clicked. Maybe this can be cleared once the equals button is pressed? Come back to this. 

### the Clear button
```
function clear(number) {
    let string = number.toString();
    let newString = string.slice(0,-1);
    let newNumber = parseInt(newString);
    currentMainValue = newNumber;
    return screenMain.textContent = currentMainValue;
}
```

![](./images/screenshot-calculator-NaN.gif)  
The clear button does delete the last digit from a number perfectly - but once it runs out of numbers, we end up with NaN.  


### More steps

* Create the functions that populate the display when you click the number buttons.  


* You should be storing the display value in a variable somewhere for later use.


* Store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.