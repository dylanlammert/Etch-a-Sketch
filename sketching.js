// Create a grid of divs


let numberofBoxes = 16;


function getSizeOfGridItems(parentWidth) {
    let gridItemSize = parentWidth / numberofBoxes
    return gridItemSize;
}

function createCanvas(numberOfGridItems) {
    // grab a const ref to the parent element
    const canvasRef = document.querySelector("#canvas");
    // getBoundingClientRect() returns a DOMRect object that I can use
    // to determine width, height, and coordinates
    const canvasWidth = canvasRef.getBoundingClientRect().width;
    // loop throught n number of times till you reach the grid size desired
    for( let i = 0; i < numberOfGridItems; i++) {
        for( let j = 0; j < numberOfGridItems; j++) {
            // create a new div for the gridItem
            
            const newGridItem = document.createElement("div");
            newGridItem.setAttribute("class", "gridItem");
            newGridItem.addEventListener("mouseenter", () => {
                //mouse enter is not affected by hovering over
                //children elements.
                newGridItem.style.backgroundColor = "black";
            });
            // set gridItem width and height
            /* 
                change the -2 to - gridItem border so that I can change the
                border in the css, easier to maintain. 
            */
            newGridItem.style.width = `${(getSizeOfGridItems(canvasWidth) - 2)}px`;
            newGridItem.style.height = `${(getSizeOfGridItems(canvasWidth) - 2)}px`;
            canvasRef.appendChild(newGridItem);
        }
    }
}


createCanvas(numberofBoxes);