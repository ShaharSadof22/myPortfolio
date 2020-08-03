"use strict";
const WALL = "#";
const FOOD = ".";
const EMPTY = " ";
const SUPER_FOOD = "🥦";
const CHERRY = "🍒";

var foodAmount = 60;
var gIntervalSuperFood;
var gIntervalCherry;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, ".board-container");
  addSuperFood();
  gIntervalCherry = setInterval(addCherry, 15000);
  gGame.isOn = true;
  gGame.score = 0;
  updateScore(0);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector("header h3 span").innerText = gGame.score;
}

function gameOver() {//TODO: remove duplicate code
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalSuperFood);
  clearInterval(gIntervalCherry);
  gIntervalGhosts = null;
  var gameOverHTML = `<div><h3>Game over... </h3><button class="play-again" onclick="playAgain()">Play Again</button></div>`;
  document.querySelector(".end-game").innerHTML = gameOverHTML;
}
function victory() {
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalSuperFood);
  clearInterval(gIntervalCherry);
  gIntervalGhosts = null;
  gGame.isOn = false;
  var victoryHTML = `<div><h3>You wan the game!! </h3><button class="play-again" onclick="playAgain()">Play Again</button></div>`;
  document.querySelector(".end-game").innerHTML = victoryHTML;
}

function playAgain() {
  document.querySelector(".end-game").innerHTML = "";
  init();
}


function addSuperFood() {
  gIntervalSuperFood = setInterval(generateSuperFood, 5000);
}

function generateSuperFood() {
  var newLocation = createEmptyOrFoodCell();
  gBoard[newLocation.i][newLocation.j] = SUPER_FOOD;
  renderCell(newLocation, SUPER_FOOD);
}

function createEmptyOrFoodCell() {
  var iRand = getRandomIntInclusive(1, 8);
  var jRand = getRandomIntInclusive(1, 8);

  while (gBoard[iRand][jRand] !== FOOD && gBoard[iRand][jRand] !== EMPTY) {
    iRand = getRandomIntInclusive(1, 8);
    jRand = getRandomIntInclusive(1, 8);
  }//In the end- this will be an infinite loop
  return { i: iRand, j: jRand };
}

function addCherry() {
  var emptyCells = findEmptyCells();
  if (emptyCells.length) {
    console.log(emptyCells);
  var randIdx = Math.floor(Math.random() * (emptyCells.length));
  console.log(randIdx);
  var i = emptyCells[randIdx].i;
  var j = emptyCells[randIdx].j;


  gBoard[i][j] = CHERRY;
  renderCell({i, j}, CHERRY)
  }
}

function findEmptyCells() {
  var emptyCells = [];
  for (var i = 1; i < gBoard[0].length - 1; i++) {
    for (var j = 1; j < gBoard[0].length - 1; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCells.push({i,j})
      }
    }
  }
  return emptyCells;
}
