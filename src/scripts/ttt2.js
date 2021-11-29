



// document.getElementById("cell").innerText = "X"

// document.getElementsByTagName("p").innerText = "x"

// document.getElementsByClassName("cell").innerText = "x"

// document.querySelector('[data-cell]').innerHTML = 'x'

// const cellElements = document.querySelectorAll('[data-cell]')

// console.log(cellElements)

const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'


function myFunction() {
    var x, i;
    x = document.querySelectorAll("[data-cell]");
    for (i = 0; i < x.length; i++) {
      x[i].innerText = "circle";
    }
  }

myFunction()

