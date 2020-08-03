"use strict";

var MINE = "💣";
var FLAG = "🚩";
var HURT = '❤️';
var gStartTime;
var gTimeInterval;
var isLoseGame = false;
var isGameOver = false;
var isFirstClickMine = false;
var gNumOfHint = 3;
var isHintOn = false;
var gLivesCount = 1;
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};
var gLevels = [
  { SIZE: 4, MINES: 2 },
  { SIZE: 8, MINES: 12 },
  { SIZE: 12, MINES: 30 },
];
var level = 0;

var gBoard;

function initGame() {
  gBoard = buildBoard();
  addRandMines();
  addNegsToModal();
  renderBoard();
  renderHurts();
  console.log(gBoard);
}

function renderBoard() {
  var strHtml = "";
  for (var i = 0; i < gLevels[level].SIZE; i++) {
    strHtml += "<tr>";
    for (var j = 0; j < gLevels[level].SIZE; j++) {
      var cell = "";
      var loseClass = "";

      if (gBoard[i][j].isShown) {
        cell = gBoard[i][j].minesAroundCount
          ? gBoard[i][j].minesAroundCount
          : "";
        loseClass = "shown";
      } else if (gBoard[i][j].isMine && isLoseGame) {
        cell = MINE;
        loseClass = "mine";
      } else if (gBoard[i][j].isMarked) {
        cell = FLAG;
      }

      strHtml += `<td class="cell ${loseClass}" onclick="cellClicked(this,${i},${j}, event)" oncontextmenu="cellClicked(this,${i},${j}, event)">${cell}</td>`;
    }
    strHtml += "</tr>";
  }
  var elMat = document.querySelector(".board");
  elMat.innerHTML = strHtml;
}

function buildBoard() {
  // build the board
  var board = [];
  for (var i = 0; i < gLevels[level].SIZE; i++) {
    board[i] = [];
    for (var j = 0; j < gLevels[level].SIZE; j++) {
      board[i][j] = createCell();
    }
  }
  return board;
}

function createCell() {
  return {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
    isRecursived: false,
  };
}

function addNegsToModal() {
  for (var i = 0; i < gLevels[level].SIZE; i++) {
    for (var j = 0; j < gLevels[level].SIZE; j++) {
      gBoard[i][j].minesAroundCount = setMinesNegsCount(i, j);
    }
  }
}

function setMinesNegsCount(i, j) {
  var negCounter = 0;
  var iStart = i - 1;
  var iEnd = i + 1;
  var jStart = j - 1;
  var jEnd = j + 1;

  // verify the area
  if (i === 0) {
    iStart = 0;
  }
  if (i === gLevels[level].SIZE - 1) {
    iEnd = gLevels[level].SIZE - 1;
  }
  if (j === 0) {
    jStart = 0;
  }
  if (j === gLevels[level].SIZE - 1) {
    jEnd = gLevels[level].SIZE - 1;
  }

  // count neighbors
  for (var rowIdx = iStart; rowIdx <= iEnd; rowIdx++) {
    for (var callIdx = jStart; callIdx <= jEnd; callIdx++) {
      if (gBoard[rowIdx][callIdx].isMine) {
        negCounter++;
      }
    }
  }
  if (gBoard[i][j].isMine) {
    negCounter = "B";
  }
  return negCounter;
}

function cellClicked(elCell, i, j, ev) {
  if (isLoseGame || isGameOver || gBoard[i][j].isShown) return;
  //start the game
  if (isHintOn) {
    hintRevealNegs(i, j);
    return;
  }
  if (!gGame.isOn) {
    gGame.isOn = true;
    gStartTime = new Date();
    gTimeInterval = setInterval(renderTime, 500);
    // first click and a mine
    if (gBoard[i][j].isMine) {
      addRandMineFirstClick();
      gBoard[i][j].isMine = false;
      addNegsToModal();
    }
  }
  if (ev.type == "contextmenu") {
    // right click
    if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
      gBoard[i][j].isMarked = true;
      gGame.markedCount++;
      elCell.innerHTML = FLAG;
    } else if (gBoard[i][j].isMarked) {
      gBoard[i][j].isMarked = false;
      gGame.markedCount--;
      elCell.innerHTML = "";
    }
  } else if (!gBoard[i][j].isMarked) {
    // left click
    if (gBoard[i][j].isMine) {
      gLivesCount--;
      renderHurts();
      gBoard[i][j].isShown = true;
      renderBoard();
      // end game
      if (gLivesCount === 0) {
        loseGame();
      }
    } else {
      if (gBoard[i][j].minesAroundCount === 0) {
        revealNegs(i, j);
      } else {
        gBoard[i][j].isShown = true;
        elCell.innerHTML = gBoard[i][j].minesAroundCount;
        elCell.classList.add("shown");
      }
    }
  }

  winGame(checkGameOver());
}

function addRandMines() {
  var rands = [];

  var tempBoard = [];
  for (var i = 0; i < gLevels[level].SIZE; i++) {
    tempBoard[i] = [];
    for (var j = 0; j < gLevels[level].SIZE; j++) {
      tempBoard[i][j] = { i, j };
    }
  }
  for (var i = 0; i < gLevels[level].MINES; i++) {
    var randRow = Math.floor(Math.random() * gLevels[level].SIZE);
    var randCall = Math.floor(Math.random() * tempBoard[randRow].length);

    var randValRow = tempBoard[randRow][randCall].i;
    var randValCall = tempBoard[randRow][randCall].j;
    rands.push({ randValRow, randValCall });
    tempBoard[randRow].splice(randCall, 1);
    gBoard[randValRow][randValCall].isMine = true;
  }
}

function renderTime() {
  var currTime = Math.round((new Date() - gStartTime) / 1000);
  gGame.secsPassed = currTime;
  var updateTime = "Time: " + currTime + "[sec]";
  document.querySelector(".time-counter").innerHTML = updateTime;
}

// disable right click
document.addEventListener("contextmenu", (event) => event.preventDefault());

function loseGame() {
  endGame();
  isLoseGame = true;
  renderBoard();
  var elLose = document.querySelector(".end-game");
  elLose.classList.add("end-game-style");
  elLose.innerHTML = `<h2 class="win-game">You lost the game...</h2>`;
}

function checkGameOver() {
  for (var i = 0; i < gLevels[level].SIZE; i++) {
    for (var j = 0; j < gLevels[level].SIZE; j++) {
      if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
        return false;
      }
      if (gBoard[i][j].minesAroundCount >= 0 && !gBoard[i][j].isShown) {
        return false;
      }
    }
  }
  return true;
}

function winGame(isWin) {
  if (!isWin) return;
  endGame();
  var elWin = document.querySelector(".end-game");
  document.querySelector(".end-game").classList.add("end-game-style");
  elWin.innerHTML = `<h2 class="win-game">You wan the game in ${gGame.secsPassed}[sec]</h2>`;
}

function endGame() {
  gLivesCount = 3;
  clearInterval(gTimeInterval);
  isGameOver = true;
  document.querySelector(".end-game").classList.remove("end-game-style");
  isFirstClickMine = false;
}

function revealNegs(i, j) {
  var iStart = i - 1;
  var iEnd = i + 1;
  var jStart = j - 1;
  var jEnd = j + 1;

  // verify the area
  if (i === 0) {
    iStart = 0;
  }
  if (i === gLevels[level].SIZE - 1) {
    iEnd = gLevels[level].SIZE - 1;
  }
  if (j === 0) {
    jStart = 0;
  }
  if (j === gLevels[level].SIZE - 1) {
    jEnd = gLevels[level].SIZE - 1;
  }
  // count neighbors
  for (var rowIdx = iStart; rowIdx <= iEnd; rowIdx++) {
    for (var callIdx = jStart; callIdx <= jEnd; callIdx++) {
      if (
        !gBoard[rowIdx][callIdx].isMine &&
        !gBoard[rowIdx][callIdx].isMarked
      ) {
        gBoard[rowIdx][callIdx].isShown = true;
        if (
          !gBoard[rowIdx][callIdx].minesAroundCount &&
          (rowIdx !== i || callIdx !== j) &&
          !gBoard[rowIdx][callIdx].isRecursived
        ) {
          gBoard[rowIdx][callIdx].isRecursived = true;
          revealNegs(rowIdx, callIdx);
        }
      }
    }
  }
  gBoard[i][j].isShown = true;
  renderBoard();
}

function newTable(newLevel) {
  level = newLevel;
  gLivesCount = level + 1;
  renderHurts();
  restartGame();
}

function restartGame() {
  gStartTime = 0;
  gGame.isOn = false;
  gBoard = null;
  isLoseGame = false;
  isGameOver = false;
  initGame();
  var updateTime = "Time: " + 0 + "[sec]";
  document.querySelector(".time-counter").innerHTML = updateTime;
  clearInterval(gTimeInterval);
  var elLose = document.querySelector(".end-game");
  elLose.innerHTML = ``;
  document.querySelector(".end-game").classList.remove("end-game-style");
  // hints
  var elHints = document.querySelectorAll(".hint");
  for (var i = 0; i < elHints.length; i++) {
    if (!elHints[i].classList.contains("hint-on")) {
      elHints[i].classList.add("hint-on");
    }
    elHints[i].src = "image/light-on.PNG";
  }
}

function addRandMineFirstClick() {
  var tempRands = [];
  for (var i = 0; i < gLevels[level].SIZE; i++) {
    for (var j = 0; j < gLevels[level].SIZE; j++) {
      if (!gBoard[i][j].isMine) {
        tempRands[i] = { i, j };
      }
    }
  }
  var randPos = Math.floor(Math.random() * tempRands.length);
  var randValRow = tempRands[randPos].i;
  var randValCall = tempRands[randPos].j;
  gBoard[randValRow][randValCall].isMine = true;
}

function hintClicked(elHint) {
  if (!elHint.classList.contains("hint-on") || isLoseGame || isGameOver) return;
  console.log(elHint);
  elHint.classList.remove("hint-on");
  elHint.src = "image/light-off.PNG";
  isHintOn = true;
}

function hintRevealNegs(i, j) {
  var iStart = i - 1;
  var iEnd = i + 1;
  var jStart = j - 1;
  var jEnd = j + 1;

  // verify the area
  if (i === 0) {
    iStart = 0;
  }
  if (i === gLevels[level].SIZE - 1) {
    iEnd = gLevels[level].SIZE - 1;
  }
  if (j === 0) {
    jStart = 0;
  }
  if (j === gLevels[level].SIZE - 1) {
    jEnd = gLevels[level].SIZE - 1;
  }
  // reveal neighbors
  for (var rowIdx = iStart; rowIdx <= iEnd; rowIdx++) {
    for (var callIdx = jStart; callIdx <= jEnd; callIdx++) {
      var prevState = gBoard[rowIdx][callIdx].isShown;
      gBoard[rowIdx][callIdx].isShown = true;
      returnPrevValFromHint(rowIdx, callIdx, prevState);
    }
  }
  renderBoard();
  isHintOn = false;
}

function returnPrevValFromHint(rowIdx, callIdx, prevState) {
  setTimeout(
    () => {
      // debugger
      console.log("hey!", prevState);
      gBoard[rowIdx][callIdx].isShown = prevState;
      renderBoard();
    },
    1000,
    [rowIdx, callIdx, prevState]
  );
}

function renderHurts() {
  var elHursts = document.querySelector('.hurts');
  elHursts.innerHTML = '';
  for (var i = 0; i < gLivesCount; i++) {
    elHursts.innerHTML += HURT;
  }
}