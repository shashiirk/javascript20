import getWord from './words.js';

const difficulty = document.getElementById('difficulty');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const wordEl = document.getElementById('word');
const inputEl = document.getElementById('input');
const endContainer = document.querySelector('.end-container');
const finalScore = document.getElementById('final-score');
const playBtn = document.getElementById('play');
// Time variable
let time = 10;
// Score variable
let score = 0;
// Word variable
let word;
// Fetch difficulty level from local storage if possible
let difficultyLevel =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';
// Update the difficulty select
difficulty.value = difficultyLevel;
// setInterval Id
let setIntervalId;
// Boolean value used to start game
let gameStarted = false;

// Display the word in the document
function displayWord() {
  // Gets a random word
  word = getWord();
  wordEl.innerText = word;
}

// Modify difficulty level
function difficultyHandler() {
  difficultyLevel = difficulty.value;
  // Add difficulty level to the local storage
  localStorage.setItem('difficulty', difficultyLevel);
  resetGame();
}

// Update the score board
function updateScore() {
  score += 1;
  scoreEl.innerText = score;
}

// Update the clock every second
function runClock() {
  setIntervalId = setInterval(() => {
    time -= 1;
    if (time >= 0) {
      timeEl.innerText = time;
    } else {
      finalScore.innerText = score;
      endContainer.classList.add('visible');
      // Remove keyboard focus
      document.activeElement.blur();
      stopClock();
    }
  }, 1000);
}

// Stop the clock
function stopClock() {
  clearInterval(setIntervalId);
}

// Reset the game
function resetGame() {
  time = 10;
  timeEl.innerText = 10;
  score = 0;
  scoreEl.innerText = 0;
  finalScore.innerText = 0;
  inputEl.value = '';
  inputEl.focus();
  displayWord();
  endContainer.classList.remove('visible');
  gameStarted = false;
}

// Add more time to the clock when typing a word correctly
function giftTime() {
  // Time according to the difficulty level selected
  if (difficultyLevel === 'easy') {
    time += 3;
  } else if (difficultyLevel === 'medium') {
    time += 2;
  } else if (difficultyLevel === 'hard') {
    time += 1;
  }
}

// Check the word typed by user
function inputHandler() {
  // Start the game when user entered the first letter
  if (!gameStarted) {
    runClock();
    gameStarted = true;
  }

  const inputWord = inputEl.value;

  // If the word entered by user is correct
  if (inputWord === word) {
    // Display a new word in the document
    displayWord();
    // Gift more time
    giftTime();
    // Update the user's score
    updateScore();
    // Clear the input field
    inputEl.value = '';
  }
}

// On load
displayWord();

//Listen to input event on input field
inputEl.addEventListener('input', inputHandler);
// Listen to click event on play button
playBtn.addEventListener('click', resetGame);
// Listen to change event on difficulty select
difficulty.addEventListener('change', difficultyHandler);
