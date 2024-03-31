const gridSize = 5;
let lights = [];
let container = document.getElementById('container');

function initializeLights() {
    for (let i = 0; i < gridSize; i++) {
        lights[i] = [];
        for (let j = 0; j < gridSize; j++) {
            lights[i][j] = Math.random() < 0.5 ? 1 : 0;
        }
    }
}

function createGrid() {
    container.innerHTML = '';
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
}

initializeLights();
createGrid();
