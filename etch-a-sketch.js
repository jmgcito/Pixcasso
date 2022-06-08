let gridSize = 16;
let rangeSlider = document.querySelector("#range-slider");
rangeSlider.value = gridSize;
let rangeSliderLabel = document.querySelector("#range-slider-label");

rangeSlider.oninput = function () {
  gridSize = this.value;
  createGrid(gridSize);
};

// creates a square grid given a size
function createGrid(gridSize) {
  const gridContainer = document.querySelector("#grid-container");

  //clears gridContainer
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }

  for (let i = 0; i < gridSize; i++) {
    let tempSquareContainer = document.createElement("div");
    tempSquareContainer.classList.add("square-container");

    // created individual square elements and adds them to a horizontal grid
    for (let j = 0; j < gridSize; j++) {
      let tempSquare = document.createElement("div");
      tempSquare.classList.add("square");
      tempSquare.addEventListener("mouseenter", function () {
        tempSquare.classList.add("black-background");
      });
      tempSquareContainer.appendChild(tempSquare);
    }

    // adds new horizontal grid below previous one
    gridContainer.appendChild(tempSquareContainer);
  }
  //updates slider numbers
  rangeSliderLabel.textContent = `${gridSize} x ${gridSize}`;
}

createGrid(gridSize);
