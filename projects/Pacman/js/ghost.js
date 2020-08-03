var gIntervalGhosts;
var GHOST;
var gGhosts;

function createGhost(board, i, j) {
  var ghost = {
    location: {
      i: i,
      j: j,
    },
    currCellContent: FOOD,
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  GHOST = randColorGhost();
  gGhosts = [];

  createGhost(board, 1, 1);
  createGhost(board, 5, 5);
  createGhost(board, 8, 2);
  gIntervalGhosts = setInterval(moveGhosts, 3000);
}

function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];

    // Create the moveDiff
    var moveDiff = getMoveDiff();
    var nextLocation = {
      i: ghost.location.i + moveDiff.i,
      j: ghost.location.j + moveDiff.j,
    };
    // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)
    var nextCel = gBoard[nextLocation.i][nextLocation.j];
    if (nextCel === WALL) return;
    if (nextCel === GHOST) return;    
    if (nextCel === SUPER_FOOD) return;    

    // if PACMAN - gameOver
    if (nextCel === PACMAN) {
      //isSuper- Pacman still dying
      gameOver();
      return;
    }

    // set back what we stepped on: update Model, DOM
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    renderCell(ghost.location, ghost.currCellContent);

    // move the ghost
    ghost.location = nextLocation;

    // keep the contnet of the cell we are going to
    ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j];

    // move the ghost and update model and dom
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    renderCell(ghost.location, getGhostHTML(ghost));
  }
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  return `<span>${GHOST}</span>`;
}

function randColorGhost() {
  var randRed = getRandomIntInclusive(50, 255);
  var randBlue = getRandomIntInclusive(50, 255);
  var randGreen = getRandomIntInclusive(50, 255);
  return `<span style="color: rgb(${randRed}, ${randBlue}, ${randGreen});">&#9781;</span>`;
}

function addGhost() {
  console.log("add ghost");
  var newLocation = createEmptyOrFoodCell();
  gBoard[newLocation.i][newLocation.j] = GHOST;
  renderCell(newLocation, GHOST);
}
