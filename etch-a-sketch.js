let gridSize = 16;
let colorMode = "black";
let etchASketchMode = false;

//handles range slider
const rangeSlider = document.querySelector("#range-slider");
rangeSlider.value = gridSize;
const rangeSliderLabel = document.querySelector("#range-slider-label");

// creates grid based on slider grid size
rangeSlider.oninput = function () {
  gridSize = this.value;
  createGrid(gridSize);
};

// if etch-a-sketch mode is on, user can draw without clicking mouse
const etchCheckbox = document.querySelector("#etchCheckbox");
etchCheckbox.addEventListener("change", function () {
  if (this.checked) {
    etchASketchMode = true;
  } else {
    etchASketchMode = false;
  }
});

// changes color mode
function toggleMode(tempMode) {
  if (colorMode == tempMode) {
    colorMode = "black";
  } else {
    colorMode = tempMode;
  }
}

// sets css to active button
function setButtons(mode) {
  if (mode != "rainbow") {
    rainbowButton.classList.remove("button-on");
  } else {
    rainbowButton.classList.toggle("button-on");
  }
  if (mode != "shade") {
    shadingButton.classList.remove("button-on");
  } else {
    shadingButton.classList.toggle("button-on");
  }
  if (mode != "lighten") {
    lightenButton.classList.remove("button-on");
  } else {
    lightenButton.classList.toggle("button-on");
  }
}

const rainbowButton = document.querySelector("#rainbow-button");
rainbowButton.addEventListener("click", function () {
  toggleMode("rainbow");
  setButtons(colorMode);
});

const shadingButton = document.querySelector("#shading-button");
shadingButton.addEventListener("click", function () {
  toggleMode("shade");
  setButtons(colorMode);
});

const lightenButton = document.querySelector("#lighten-button");
lightenButton.addEventListener("click", function () {
  toggleMode("lighten");
  setButtons(colorMode);
});

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", function () {
  createGrid(gridSize);
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
  return `background-color: rgb(${red},${green},${blue}); filter: brightness(100%);`;
}

// square coloring engine
function colorSquare(square) {
  //changes squares next color
  if (colorMode == "rainbow") {
    square.style.cssText = randomColor();
  } else if (colorMode == "shade") {
    //shade mode
    if (parseInt(square.style.filter.slice(11, 14)) == 100) {
      square.style.filter = "brightness(90%)";
    } else {
      filterPercent = parseInt(square.style.filter.slice(11, 13));
      square.style.filter = `brightness(${filterPercent - 10}%)`;
    }
  } else if (colorMode == "lighten") {
    //lighten mode
    if (parseInt(square.style.filter.slice(11, 14)) == 100) {
    } else {
      filterPercent = parseInt(square.style.filter.slice(11, 13));
      square.style.filter = `brightness(${filterPercent + 10}%)`;
    }
  } else {
    square.style.cssText = "filter: brightness(0%)";
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
      tempSquare.style.cssText = "filter: brightness(100%)";
      // colors square when mouse is over square element
      tempSquare.addEventListener("mouseenter", function (e) {
        //makes sure mouse is clicked to enable drawing
        if (e.buttons == 1 && !etchASketchMode) {
          colorSquare(tempSquare);
        } else if (etchASketchMode) {
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
