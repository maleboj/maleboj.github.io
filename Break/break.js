const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
const pauseButton = document.querySelector('#pauseButton');
const playButton = document.querySelector('#playButton');
const blockColors = ['red', 'blue', 'green', 'yellow', 'orange'];

let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;
let level = 1;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// Get the volume controls
const volumeDownBtn = document.getElementById('volumeDownBtn');
const volumeUpBtn = document.getElementById('volumeUpBtn');
const muteBtn = document.getElementById('muteBtn');

// Event listener for volume down button
volumeDownBtn.addEventListener('click', decreaseVolume);

// Event listener for volume up button
volumeUpBtn.addEventListener('click', increaseVolume);

// Event listener for mute/unmute button
muteBtn.addEventListener('click', toggleMute);

// Sound effects
const blockSound = new Audio("audio/blockhit.mp3");
blockSound.preload = "auto";
const winSound = document.getElementById("win");
const loseSound = document.getElementById("lose");

// Function to decrease volume
function decreaseVolume() {
  blockSound.volume -= 0.1;
  winSound.volume -= 0.1;
  loseSound.volume -= 0.1;
}

// Function to increase volume
function increaseVolume() {
  blockSound.volume += 0.1;
  winSound.volume += 0.1;
  loseSound.volume += 0.1;
}

// Function to mute/unmute the audio
function toggleMute() {
  blockSound.muted = !blockSound.muted;
  winSound.muted = !winSound.muted;
  loseSound.muted = !loseSound.muted;
}

//controlls
pauseButton.addEventListener('click', pauseGame);
playButton.addEventListener('click', playGame);

function pauseGame() {
  clearInterval(timerId);
}

function playGame() {
  timerId = setInterval(moveBall, 30);
}

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.backgroundColor = blockColors[i % blockColors.length]; // Assign different colors based on index
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

addBlocks();

// add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw the user
function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

//move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
  }
}

document.addEventListener('keydown', function (e) {
  moveUser(e);
});

// add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//move ball
function moveBall() {
  if(level === 1){
  ballCurrentPosition[0] += xDirection * 2;
  ballCurrentPosition[1] += yDirection * 2;
  }else if (level === 2){
  ballCurrentPosition[0] += xDirection * 4;
  ballCurrentPosition[1] += yDirection * 4;
}
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

//check for collisions
function checkForCollisions() {
  //check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[i].classList.remove('block');
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      blockSound.play();

      //check for win
      if (blocks.length === 0) {
        if (level === 1) {
          level = 2;
          // Reset the ball position and direction
          ballCurrentPosition = ballStart;
          xDirection = -4;
          yDirection = 4;
          clearInterval(timerId); //Clear the current timer
          timerId = setInterval(moveBall, 20); // Increase the ball speed for level 2
        } else if (level === 2) {
          // Handle game completion for all levels
          scoreDisplay.innerHTML = 'YOU WIN';
          clearInterval(timerId);
          document.removeEventListener('keydown', moveUser);
          winSound.play();
        }
      }
    }
  }

  //check for wall collisions
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
    wallSound.play();
  }

  //check for user collisions
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
    wallSound.play();
  }

  //check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = 'Ha ha ha, You Suck!';
    document.removeEventListener('keydown', moveUser);
    loseSound.play();
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
