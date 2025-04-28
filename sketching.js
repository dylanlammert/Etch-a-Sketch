// Create a grid of divs

// grab references of all neccessary buttons and input values

const menuToggle = document.querySelector("#menuToggle");
const colorPicker = document.querySelector("#colorPicker");
const eraserToggle = document.querySelector("#eraserToggle");
const gridToggle = document.querySelector("#gridToggle");
const scaleText = document.querySelector("#scaleText");
const scaleSlider = document.querySelector("#scaleSlider");
//set initial text for slider
scaleText.textContent = `${scaleSlider.value} x ${scaleSlider.value}`;

const inportImageButton = document.querySelector("#importImageButton");
const exportImageButton = document.querySelector("#exportImageButton");
const clearCanvasButton = document.querySelector("#clearCanvasButton");
const canvasMenu = document.querySelector("#canvasMenu");
const subCanvasMenu = document.querySelector("#subDiv");
// reference to the canvas
const canvasRef = document.querySelector("#canvas");

// global variables
let isDrawing = false;
let grid = true;
let isErasing = false;

function getSizeOfGridItems(parentWidth) {
    let gridItemSize = parentWidth / scaleSlider.value
    return gridItemSize;
};

function createCanvas(numberOfGridItems) {
    // grab a const ref to the parent element
    // getBoundingClientRect() returns a DOMRect object that I can use
    // to determine width, height, and coordinates
    const canvasWidth = canvasRef.getBoundingClientRect().width;

    // loop throught n number of times till you reach the grid size desired
    for( let i = 0; i < numberOfGridItems; i++) {
        for( let j = 0; j < numberOfGridItems; j++) {
            // create a new div for the gridItem
            const newGridItem = document.createElement("div");
            newGridItem.setAttribute("class", "gridItem");
            if( grid == true){
                newGridItem.classList.toggle("grid");
            }
            else if( grid == false) {
                newGridItem.style.border = `1px solid white`;
            }
            // every time you change the canvas it will keep the colorPicker color as you draw
            newGridItem.addEventListener("mouseenter", (event) => changeDrawingColor(event, colorPicker.value));
            
            // set gridItem width and height
            /* 
                add a border to the canvas****
            */
            newGridItem.style.backgroundColor = "white";
            newGridItem.style.width = `${(getSizeOfGridItems(canvasWidth) - 2)}px`;
            newGridItem.style.height = `${(getSizeOfGridItems(canvasWidth) - 2)}px`;
            canvasRef.appendChild(newGridItem);
        }
    }
};

function clearCanvas() {
    // get reference to all items
    const gridItems = document.querySelectorAll(".gridItem");

    //for each gridItem set its background color to white
    gridItems.forEach((item) => {
        item.style.backgroundColor = "white";
    });
};

function toggleGrid() {
    const gridItems = document.querySelectorAll(".gridItem");

    console.log("toggle grid");
    // turn grid off
    if(grid == true) {
        gridItems.forEach(item => {
            item.classList.remove("grid");
            item.style.border = `1px solid ${item.style.backgroundColor}`;
            gridToggle.classList.remove("toggleButton");
        });
        grid = false;
    }
    // turn grid on
    else if(grid == false) {
        gridItems.forEach((item) => {
            item.style.removeProperty("border");
            item.classList.add("grid");
            gridToggle.classList.add("toggleButton");
        });
        grid = true;
    }
};
/* 
    event = actual event that triggered this function. When used with .target
            it will target the div that made this event trigger.
    colorCode = the color code 
*/
function changeDrawingColor(event, colorCode) {
    if(isDrawing) {
        event.target.style.backgroundColor = colorCode;
        if(grid == false && isErasing == false) {
            event.target.style.border = `1px solid ${colorCode}`;
        }
        else if(isErasing == true && grid == false) {
            event.target.style.border = `1px solid ${colorCode}`;
        }
            
    };
};

// event listeners
//change color 
colorPicker.addEventListener("input", () => {
    // grab reference list for gridItems
    const gridItems = document.querySelectorAll(".gridItem");

    /* 
        item = each gridItem
        event = refers to the event being triggered
    */
    gridItems.forEach((item) => {
        item.removeEventListener("mouseenter", changeDrawingColor);
        item.addEventListener("mouseenter", (event) => changeDrawingColor(event, colorPicker.value));
    });
});

// detect if the user wishes to draw
canvasRef.addEventListener("mousedown", () => {
    isDrawing = true;
});

canvasRef.addEventListener("mouseup", () => {
    isDrawing = false;
});

// erase toggle
eraserToggle.addEventListener("click", () => {
    const gridItems = document.querySelectorAll(".gridItem");
    if(isErasing == false) {
        isErasing = true;
        eraserToggle.classList.add("toggleButton");
        gridItems.forEach((item) => {
            item.removeEventListener("mouseenter", changeDrawingColor);
            item.addEventListener("mouseenter", (event) => changeDrawingColor(event, "white"));
        });
    }
    else if(isErasing == true) {
        isErasing = false;
        eraserToggle.classList.remove("toggleButton");
        gridItems.forEach((item) => {
            item.removeEventListener("mouseenter", changeDrawingColor);
            item.addEventListener("mouseenter", (event) => changeDrawingColor(event, colorPicker.value));
        });
    }
    /* 
        item = each gridItem
        event = refers to the event being triggered
    */
});

// clear canvas
clearCanvasButton.addEventListener("click", () => {
    clearCanvas();
});

// toggle grid
gridToggle.addEventListener("click", () => {
    toggleGrid();
});
//scale slider events having difficulty with the new canvas
scaleSlider.addEventListener("input", () => {
    scaleText.textContent = `${scaleSlider.value} x ${scaleSlider.value}`;
    canvasRef.replaceChildren();
    createCanvas(scaleSlider.value);
});

menuToggle.addEventListener("click", () => {
    subCanvasMenu.classList.toggle("subDivInactive");
    subCanvasMenu.classList.toggle("subDivActive");
})


createCanvas(scaleSlider.value);