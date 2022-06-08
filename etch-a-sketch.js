let gridSize = 16;
let colorMode = "black";
let etchASketchMode = false;

const rangeSlider = document.querySelector("#range-slider");
rangeSlider.value = gridSize;
const rangeSliderLabel = document.querySelector("#range-slider-label");

// creates grid based on slider grid size
rangeSlider.oninput = function () {
  gridSize = this.value;
  createGrid(gridSize);
};

function toggleMode(tempMode) {
  if (colorMode == tempMode) {
    colorMode = "black";
  } else {
    colorMode = tempMode;
  }
}

const rainbowButton = document.querySelector("#rainbow-button");
rainbowButton.addEventListener("click", function () {
  toggleMode("rainbow");
  rainbowButton.classList.toggle("button-on");
});

// returns value from 0 to 255
function randomColorValue() {
  return Math.floor(Math.random() * 256);
}
// returns css text that sets background color to random rgb value
function randomColor() {
  let red = randomColorValue();
  let green = randomColorValue();
  let blue = randomColorValue();
  return `background-color: rgb(${red},${green},${blue});`;
}

// square coloring engine
function colorSquare(square) {
  //changes squares next color
  if (colorMode == "rainbow") {
    square.style.cssText = randomColor();
  } else if (colorMode == "shader") {
  } else {
    square.style.cssText = "background-color: black";
  }
}

// creates a square grid given a size
function createGrid(gridSize) {
  const gridContainer = document.querySelector("#grid-container");

  //clears gridContainer
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }

  // loop lays out grid of squares
  for (let i = 0; i < gridSize; i++) {
    let tempSquareContainer = document.createElement("div");
    tempSquareContainer.classList.add("square-container");

    // created individual square elements and adds them to a horizontal grid
    for (let j = 0; j < gridSize; j++) {
      let tempSquare = document.createElement("div");
      tempSquare.classList.add("square");
      // colors square when mouse is over square element
      tempSquare.addEventListener("mouseenter", function (e) {
        //makes sure mouse is clicked to enable drawing
        if (e.buttons == 1 && !etchASketchMode) {
          colorSquare(tempSquare);
        }
      });
      // colors square when mouse button is clicked down
      // allows for individual squares to be colored
      tempSquare.addEventListener("mousedown", function () {
        colorSquare(tempSquare);
      });
      tempSquareContainer.appendChild(tempSquare);
    }

    // adds new horizontal grid below previous one
    gridContainer.appendChild(tempSquareContainer);
  }
  //updates slider numbers
  rangeSliderLabel.textContent = `${gridSize} x ${gridSize}`;
}

// initializes grid
createGrid(gridSize);
