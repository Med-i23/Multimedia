let gridSize = 5;
let lights = [];
let container = document.getElementById('container');

let clickcounter = 0;


function initializeLights() {
    lights = [];
    for (let i = 0; i < gridSize; i++) {
        lights[i] = [];
        for (let j = 0; j < gridSize; j++) {
            lights[i][j] = Math.random() < 0.5 ? 1 : 0;
        }
    }
}

function createGrid() {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`; // Set grid columns based on gridSize
    container.style.gridTemplateRows = `repeat(${gridSize}, 50px)`; // Set grid rows based on gridSize
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell' + (lights[i][j] ? ' active' : '');
            cell.addEventListener('click', () => toggleLights(i, j));
            container.appendChild(cell);
        }
    }

}

function toggleLights(row, col) {
    lights[row][col] ^= 1;
    if (row > 0) lights[row - 1][col] ^= 1;
    if (row < gridSize - 1) lights[row + 1][col] ^= 1;
    if (col > 0) lights[row][col - 1] ^= 1;
    if (col < gridSize - 1) lights[row][col + 1] ^= 1;
    createGrid();
    counter();
    if (checkWin()) {
        alert("Congratulations! You've won!");
    }
}

function counter(){
    clickcounter++;
    let variableElement = document.getElementById('counter');
    variableElement.innerHTML = clickcounter;
}
function checkWin() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (lights[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function changeGridSize() {
    let selectElement = document.getElementById('gridSizeSelect');
    let selectedSize = parseInt(selectElement.value);
    gridSize = selectedSize;
    initializeGridSize(gridSize);
    initializeLights();
    createGrid();
}

function initializeGridSize(number) {
    gridSize = number;
    initializeLights();
}

initializeLights();
createGrid();