const screen = document.querySelector(".screen-bottom");
let currentValue = "2";
screen.textContent = currentValue;

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      console.log(button.id);
      if(button.classList.contains("number-btn")) {
      currentValue = button.textContent;
      screen.textContent = currentValue;
      }
      else {
          if (button.classList.contains("function-btn")) {
              if (button.id = "add") {
                  // currentValue plus next value?
              }
          }
      }
    })
  });


  /* 
  click button
  if number button display on screen
  if function button perform function
  store screen value in variable
  */

