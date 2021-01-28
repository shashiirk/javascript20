const highContent = document.getElementById('high-content');
const scoreContent = document.getElementById('score-content');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startContainer = document.querySelector('.start-container');
const startBtn = document.getElementById('start-btn');
const endContainer = document.querySelector('.end-container');
const playBtn = document.getElementById('play');
// High score
let highScore = 0;
// Current Score
let currentScore = 0;
// Boolean value
let pauseGame = false;
// No.of rows of bricks
const brickRows = 5;
// No.of columns of bricks
const brickColumns = 9;
// Array that stores all the brick items
const bricks = [];
// General brick properties
const brickTemplate = {
  w: 74,
  h: 20,
  padding: 10,
  offSetX: 12,
  offSetY: 10,
  visible: true,
};

// Defining properties for all the bricks
for (let i = 0; i < brickRows; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumns; j++) {
    const x =
      j * (brickTemplate.w + brickTemplate.padding) + brickTemplate.offSetX;
    const y =
      i * (brickTemplate.h + brickTemplate.padding) + brickTemplate.offSetY;
    bricks[i][j] = { x, y, ...brickTemplate };
  }
}

// Ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Paddle properties
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Draw the bricks on canvas
function drawBricks() {
  bricks.forEach((row) => {
    row.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#fd1034' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Draw the ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#fd1034';
  ctx.fill();
  ctx.closePath();
}

// Draw the paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#fd1034';
  ctx.fill();
  ctx.closePath();
}

// Get high score from localStorage if possible and put it in document
function fetchHighScoreFromLocalStorage() {
  highScore =
    localStorage.getItem('highScore') !== null
      ? localStorage.getItem('highScore')
      : 0;

  highContent.innerText = highScore;
}

// Regenerate all the bricks when ball collides the bottom boundary
function regenerateBricks() {
  bricks.forEach((row) => {
    row.forEach((brick) => {
      brick.visible = true;
    });
  });
}

// Draw all items
function draw() {
  // Clear out previous canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
}

// Update the score board values in the document
function updateScoreBoard() {
  scoreContent.innerText = currentScore;
  // Check if currentScore is the highScore
  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem('highScore', highScore);
    highContent.innerText = highScore;
  }
  // Win condition
  if (currentScore === brickRows * brickColumns) {
    // Show modal
    endContainer.classList.add('show');
    resetGame();
  }
}

// Reset the game to its initial state
function resetGame() {
  regenerateBricks();
  // Reposition ball
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  // Reposition paddle
  paddle.x = canvas.width / 2 - 40;
  paddle.y = canvas.height - 20;
  // Reset scoreboard
  currentScore = 0;
  scoreContent.innerText = currentScore;
  highScore = 0;
  highContent.innerText = highScore;
  localStorage.setItem('highScore', highScore);
  // Remove animation frame
  pauseGame = true;
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // When ball collides the left or right boundary
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dx *= -1;
  }

  // When ball collides the top or bottom boundary
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy *= -1;

    // Reset the game when ball collides the bottom boundary
    if (ball.y + ball.radius > canvas.height) {
      currentScore = 0;
      updateScoreBoard();
      regenerateBricks();
    }
  }

  // When ball collides the paddle
  if (
    ball.x - ball.radius > paddle.x &&
    ball.x + ball.radius < paddle.x + paddle.w &&
    ball.y + ball.radius > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // When ball collides the bricks
  bricks.forEach((row) => {
    row.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.radius > brick.x &&
          ball.x + ball.radius < brick.x + brick.w &&
          ball.y - ball.radius < brick.y + brick.h &&
          ball.y + ball.radius > brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;
          currentScore += 1;
          updateScoreBoard();
        }
      }
    });
  });
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Boundary detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  } else if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Update canvas
function update() {
  if (pauseGame) {
    return;
  }

  movePaddle();
  moveBall();
  draw();
  // Request for animation frame
  requestAnimationFrame(update);
}

// When key is down
function keyDownHandler(ev) {
  if (ev.key === 'Right' || ev.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (ev.key === 'Left' || ev.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

// When key is up
function keyUpHandler(ev) {
  if (ev.key === 'Right' || ev.key === 'ArrowRight') {
    paddle.dx = 0;
  } else if (ev.key === 'Left' || ev.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
}

// Start the game
function startBtnHandler() {
  // Hide modal
  startContainer.classList.add('hide');
  update();
  fetchHighScoreFromLocalStorage();
}

// Restart a new game when playBtn clicked
function playBtnHandler() {
  // Hide modal
  endContainer.classList.remove('show');
  pauseGame = false;
  update();
}

// Listen to keydown event
document.addEventListener('keydown', keyDownHandler);
// Listen to keyup event
document.addEventListener('keyup', keyUpHandler);
// Listen to click event on startBtn
startBtn.addEventListener('click', startBtnHandler);
// Listen to click event on playBtn
playBtn.addEventListener('click', playBtnHandler);
