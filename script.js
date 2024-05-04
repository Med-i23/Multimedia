////////////////////////////Variables////////////////////////////////
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
let intervalId = null;
let picture = document.getElementById('sound-icons');
let scoreboard = [];

window.addEventListener('load', loadScoreboard);

////////////////////////////music////////////////////////////////

// Triggers uppon clicking a cell
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.volume = 0.1;
    clickSound.play();
}

// Triggers uppon winning the game
function playWinSound() {
    winsound.currentTime = 0;
    winsound.volume = 0.1;
    winsound.play();
}
// Triggers when we choose first choose a difficulty
function playBackgroundMusic() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    backgroundMusic.play();
}

// Mute on/off
function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        backgroundMusic.volume = 0;
        picture.src = "assets/soundoff.png"
    } else {
        backgroundMusic.volume = 0.1;
        picture.src = "assets/sound.png";
    }
}


////////////////////////////Start////////////////////////////////

// Sets up the game
function initializeGame() {
    changeGridSize();
    initializeLights();
    createGrid();
    playBackgroundMusic();
}

////////////////////////////Gameplay////////////////////////////////

// Using the current value of the gridSize we change the grid
function changeGridSize() {
    let selectElement = document.getElementById('gridSizeSelect');
    let selectedSize = parseInt(selectElement.value);
    gridSize = selectedSize;
    clearInterval(intervalId);
    startTime = null;
    clickcounter = 0;
    elapsedTimeElement.textContent = "0.00";
}

// Sets up a gridSize x gridSize matrix with 1's and 0's
// 1 = yellow, 0 = black
function initializeLights() {
    lights = [];
    for (let i = 0; i < gridSize; i++) {
        lights[i] = [];
        for (let j = 0; j < gridSize; j++) {
            lights[i][j] = Math.random() < 0.70 ? 1 : 0;
        }
    }
}

// Sets up the grid and creates the cells
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

// Switches the color of the cell and also checks if we won the game
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
        let endTime = new Date();
        updateElapsedTime();
        let timeDiff = endTime - startTime;
        showWinPopup(timeDiff / 1000);
    }
}

// Sets the new elapsed time of the game
function updateElapsedTime() {
    let currentTime = new Date();
    let timeDiff = currentTime - startTime;
    elapsedTimeElement.textContent = (timeDiff / 1000).toFixed(2);
}

// Adds to the counter
function counter(){
    clickcounter++;
    let counter = document.getElementById('counter');
    counter.innerHTML = clickcounter;
}


// Checks if all the matrix numbers (lights) are 0
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


////////////////////////////End////////////////////////////////

// Function that shows a popup when the game ends and sets up the scoreboard
function showWinPopup(time) {
    updateScoreboard(time, clickcounter);
    let winPopup = document.getElementById('winPopup');
    let winMessage = document.getElementById('winMessage');
    winMessage.textContent = "Yay, you won in " + time.toFixed(2) + " seconds and " + clickcounter + " steps!";
    winPopup.style.display = "block";
    winPopup.classList.add('show');

}

// Define a function to save scoreboard to local storage
function saveScoreboard() {
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
}

// Function to retrieve scoreboard from local storage
function loadScoreboard() {
    scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || [];
    displayScoreboard();
}

// Function to update the scoreboard when a player wins a game
function updateScoreboard(time, steps) {
    let playerName = prompt("Congratulations! Enter your name for the scoreboard:");
    let record = { "name": playerName, "time": time, "steps": steps };
    scoreboard.push(record);
    scoreboard.sort((a, b) => a.time - b.time);
    if (scoreboard.length > 10) {
        scoreboard.pop();
    }
    displayScoreboard();
    saveScoreboard();
}

// Function that lists out the scoreboard
function displayScoreboard() {
    let scoreboardContainer = document.getElementById('scoreboard');
    scoreboardContainer.innerHTML = '<h2>Scoreboard</h2>';
    scoreboard.forEach((record, index) => {
        scoreboardContainer.innerHTML += `<p>${index + 1}. ${record.name} - ${record.time.toFixed(2)} seconds (${record.steps} steps)</p>`;
    });
}

// Closes the popup by setting its display css to none
function closePopup() {
    let winPopup = document.getElementById('winPopup');
    winPopup.style.display = "none";
}





