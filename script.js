let gridSize = 4;
let lights = [];
let container = document.getElementById('container');
let clickcounter = 0;
let startTime = null;
let elapsedTimeElement = document.getElementById('elapsedTime');
let clickSound = new Audio('sounds/click-sound.mp3');
let backgroundMusic = new Audio('sounds/background-music.mp3');
let winsound = new Audio('sounds/wow-sound.mp3');
let isMuted = false;
let muteButton = document.getElementById('muteButton');
let intervalId = null;

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.volume = 0.1;
    clickSound.play();
}

function playWinSound() {
    winsound.currentTime = 0;
    winsound.volume = 0.1;
    winsound.play();
}

function playBackgroundMusic() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    backgroundMusic.play();
}

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
        intervalId = setInterval(updateElapsedTime, 1000);
    }
    playClickSound();
    lights[row][col] ^= 1;
    if (row > 0) lights[row - 1][col] ^= 1;
    if (row < gridSize - 1) lights[row + 1][col] ^= 1;
    if (col > 0) lights[row][col - 1] ^= 1;
    if (col < gridSize - 1) lights[row][col + 1] ^= 1;
    createGrid();
    counter();
    if (checkWin()) {
        playWinSound();
        backgroundMusic.pause();
        playWinAlert();
    }
}

function playWinAlert(){
    let endTime = new Date();
    updateElapsedTime();
    let timeDiff = endTime - startTime;
    alert("Yay, you won! " + (timeDiff / 1000).toFixed(2) + " seconds!");
}

function updateElapsedTime() {
    let currentTime = new Date();
    let timeDiff = currentTime - startTime;
    elapsedTimeElement.textContent = (timeDiff / 1000).toFixed(2);
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
    clearInterval(intervalId);
    startTime = null;
    clickcounter = 0;
    elapsedTimeElement.textContent = "0.00";
}

function initializeGame() {
    changeGridSize();
    initializeLights();
    createGrid();
    playBackgroundMusic();
}

function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        backgroundMusic.volume = 0;
        muteButton.textContent = "Unmute";
    } else {
        backgroundMusic.volume = 0.1;
        muteButton.textContent = "Mute";
    }
}
