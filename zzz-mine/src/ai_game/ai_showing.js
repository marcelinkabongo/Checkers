//import { organizeGames, gameBetweenAI } from "./ai_functions";

function sleep(millis) {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while (curDate - date < millis);
}

const modal = document.getElementById("easyModal");
let game = document.getElementById("game");







let pop = new Population(2);
let players = pop.population;

let gamesList = organizeGames(players);
let l = gamesList.length;
l = 1
let i = 0;

let playerWhite = players[0];
let playerBlack = players[1];


let playerArray = [-1, 1];
let playerAI = [playerWhite, playerBlack];
let isMaximising = [true, false];
let indexPlayer = 0;
let nbMovesPlayed = 0;
let value = 0;
let indexMove = 0;
let moves = [];
let result = [];
let depth = 8;


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




function showGameBetweenAI() {


  result = pickMove(board, playerArray[indexPlayer], playerAI[indexPlayer], depth, -Infinity, +Infinity, isMaximising[indexPlayer]);
  value = result[0];
  indexMove = result[1];
  moves = copyMoves(result[2]);
  if (indexMove === -1 || moves === null) {
    console.log("c'est la merdeee");
    throw new Error("Error in pickMove");
  }

  board = boardAfterMove(moves, indexMove, playerArray[indexPlayer], board, printBool = true);
  indexPlayer = (indexPlayer + 1) % 2;
  nbMovesPlayed++;
  buildBoard(board);

}


game.addEventListener("click", showGameBetweenAI);