var PACMAN = '&#9786;';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);
  if (nextCell === CHERRY) updateScore(10);
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      setTimeout(addGhost, 5000);
      gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    } else {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      return;
    }
  } else if (nextCell === SUPER_FOOD) {
    if (!gPacman.isSuper) {
      foodAmount--;
      gPacman.isSuper = true;
      setTimeout(() => {
        gPacman.isSuper = false;
      }, 3000);
    } else {
      setTimeout(replaceSuperFood, 500, nextLocation.i, nextLocation.j);//interval- when user moved- clear it
    }
  }

  // if (nextCell === SUPER_FOOD && gPacman.isSuper) {
  //   // gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  //   // renderCell(gPacman.location, EMPTY)
  //   setTimeout(replaceSuperFood, 500, nextLocation.i, nextLocation.j);
  // }

  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  renderCell(gPacman.location, EMPTY);
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  renderCell(gPacman.location, PACMAN);
  if (gGame.score >= foodAmount) victory();
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      PACMAN = '&#x1F446;';
      break;
    case 'ArrowDown':
      nextLocation.i++;
      PACMAN = '&#128071;';
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      PACMAN = '&#128072;';
      break;
    case 'ArrowRight':
      nextLocation.j++;
      PACMAN = '&#128073';
      break;
    default:
      return null;
  }
  return nextLocation;
}

function replaceSuperFood(i, j) {
  if (gBoard[i][j] === EMPTY) {

    gBoard[i][j] = SUPER_FOOD;
    renderCell({ i, j }, SUPER_FOOD);
  }
}
