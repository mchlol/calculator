# Calculator

Alright. Makin' a calculator. I'm not terribly enthused about this project (any more than a to-do list app or memory game) but it's good practice so let's go!  

### Resources

[The main project page on the Odin Project](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator)  
[This project from section.io](https://www.section.io/engineering-education/building-a-calculator-a-javascript-project-for-beginners/)

## Setting Up

Firstly let's think about what you want to do with a calculator. Add some numbers, multiply them, subtract, divide. We also need to be able to clear the screen. So let's go ahead and add some buttons and basic styling.  

*fast-forward*  

![calculator](./images/screenshot-calculator01.png)

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

The AC button and = button are supposed to span two columns in the grid layout, however I don't want to waste too much time mucking around with the layout (an easy trap to fall into!) so let's move on to the script.  


## The Basics

Thinking firstly about the steps involved and also reviewing the tips from [the project page](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator).  


### Steps

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

Cool, it works. But we actually only want numbers to display on the screen. Lets try an old faithful if statement.