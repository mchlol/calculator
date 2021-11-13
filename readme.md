# Calculator

Alright. Makin' a calculator. I'm not terribly enthused about this project (any more than a to-do list app or memory game) but it's good practice so let's go!  

## Setting Up

Firstly let's think about what you want to do with a calculator. Add some numbers, multiply them, subtract, divide. We also need to be able to clear the screen. So let's go ahead and add some buttons and basic styling.  

*fast-forward*  

![calculator](./images/screenshot-calculator01.png)

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

