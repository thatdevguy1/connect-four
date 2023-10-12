//cached elements
const gameBoardEl = document.querySelector("#game-board");
const colEls = gameBoardEl.children;
const winMessageEl = document.querySelector("#win-message");

//state
const gameBoard = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const players = [1, 2];

let playerTurn = 1;

let winner = null;

//event listeners
gameBoardEl.addEventListener("click", function (e) {
  if (e.target.className !== "cell") return;

  const col = e.target.parentElement;
  addChipToBoard(col.getAttribute("data-num"));
});

function addChipToBoard(colNum) {
  const gameBoardCol = gameBoard[colNum];
  gameBoardCol.forEach(function (cell, idx) {
    if (cell && gameBoardCol[idx - 1] === null) {
      gameBoardCol[idx - 1] = playerTurn;
    }
    if (idx === 3 && cell === null) {
      gameBoardCol[idx] = playerTurn;
    }
  });
  changePlayer();
  checkWinner();
  render();
}

function changePlayer() {
  playerTurn = players[playerTurn % 2];
}

function checkWinner() {
  gameBoard.forEach(function (col, colIdx) {
    col.forEach(function (cell, cellIdx) {
      if (!winner && cell) {
        if (
          col[cellIdx + 1] === cell &&
          col[cellIdx + 2] === cell &&
          col[cellIdx + 3] === cell
        ) {
          winner = cell;
        } else if (
          gameBoard[colIdx + 3] &&
          gameBoard[colIdx + 1][cellIdx] === cell &&
          gameBoard[colIdx + 2][cellIdx] === cell &&
          gameBoard[colIdx + 3][cellIdx] === cell
        ) {
          winner = cell;
        } else if (
          gameBoard[colIdx + 3] &&
          gameBoard[colIdx + 3][cellIdx + 3] &&
          gameBoard[colIdx + 1][cellIdx + 1] === cell &&
          gameBoard[colIdx + 2][cellIdx + 2] === cell &&
          gameBoard[colIdx + 3][cellIdx + 3] === cell
        ) {
          winner = cell;
        } else if (
          gameBoard[colIdx - 3] &&
          gameBoard[colIdx - 3][cellIdx + 3] &&
          gameBoard[colIdx - 1][cellIdx + 1] === cell &&
          gameBoard[colIdx - 2][cellIdx + 2] === cell &&
          gameBoard[colIdx - 3][cellIdx + 3] === cell
        ) {
          winner = cell;
        }
      }
    });
  });
}

function render() {
  const colElsArr = Array.from(colEls);
  colElsArr.forEach(function (col, colIdx) {
    const colArr = Array.from(col.children);
    colArr.forEach(function (cell, cellIdx) {
      if (gameBoard[colIdx][cellIdx]) {
        cell.style.backgroundColor =
          gameBoard[colIdx][cellIdx] === 1 ? "teal" : "pink";
      }
    });
  });
  if (winner) {
    winMessageEl.textContent = `Player ${
      winner === 1 ? "teal" : "pink"
    } is the winner`;
    winMessageEl.style.backgroundColor = winner === 1 ? "teal" : "pink";
  }
}
