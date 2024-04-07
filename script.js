let gridSize = 5;
let lights = [];
let container = document.getElementById('container');
let clickcounter = 0;
let startTime = null;
let elapsedTimeElement = document.getElementById('elapsedTime');

function initializeLights() {
    lights = [];
    for (let i = 0; i < gridSize; i++) {
        lights[i] = [];
        for (let j = 0; j < gridSize; j++) {
            lights[i][j] = Math.random() < 0.70 ? 1 : 0;
        }
    }
}

function createGrid() {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;
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
    if (clickcounter === 0) {
        startTime = new Date();
        setInterval(updateElapsedTime, 1000);
    }
    lights[row][col] ^= 1;
    if (row > 0) lights[row - 1][col] ^= 1;
    if (row < gridSize - 1) lights[row + 1][col] ^= 1;
    if (col > 0) lights[row][col - 1] ^= 1;
    if (col < gridSize - 1) lights[row][col + 1] ^= 1;
    createGrid();
    counter();
    if (checkWin()) {
        let endTime = new Date();
        updateElapsedTime();
        let timeDiff = endTime - startTime;
        alert("Congratulations! You've won in " + (timeDiff / 1000).toFixed(2) + " seconds!");
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
    clickcounter = 0;
    startTime = new Date();
    initializeGridSize(gridSize);
    initializeLights();
    createGrid();

}

function initializeGridSize(number) {
    gridSize = number;
    initializeLights();
}

function updateElapsedTime() {
    let currentTime = new Date();
    let timeDiff = currentTime - startTime;
    elapsedTimeElement.textContent = (timeDiff / 1000).toFixed(2); // Display elapsed time in seconds with two decimal places
}


function solver(){
    /*második sortól kezdesz
    ha a második sor felett van fény akkor a második soriba kattolsz
    ez végig az utolsó sorig
    utána amilyen pattern maradt lookup olod
    legfelső sortól a pattern bekattintod és újra az algoritmus*/
}



initializeLights();
createGrid();
