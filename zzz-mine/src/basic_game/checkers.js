class Piece {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  compare(piece) {
    return piece.row === this.row && piece.column === this.column;
  }
}

const modal = document.getElementById("easyModal");
let game = document.getElementById("game");

let currentPlayer = 1;
let newPiecesPositions = [];
let newPiecesPositionsCapture = [];

let noPossibleMoves = true;
let PossibleCapture = false;
let doubleCapture = false;
let doubleCapturePiece = new Piece(-1, -1);
let winnerPlayer = 0;
let black = 0;
let white = 0;

let board = [
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
];

// let board = [
//   [-1, 0, -1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ];

builBoard();

console.log("the code is done");