//import { organizeGames, gameBetweenAI } from "./ai_functions";

const modal = document.getElementById("easyModal");
let game = document.getElementById("game");

// let board = [
//     [-1, 0, -1, 0, -1, 0, -1, 0],
//     [0, -1, 0, -1, 0, -1, 0, -1],
//     [-1, 0, -1, 0, -1, 0, -1, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 0, 1, 0, 1, 0, 1],
//     [1, 0, 1, 0, 1, 0, 1, 0],
//     [0, 1, 0, 1, 0, 1, 0, 1],
// ];

// builBoard(board);

let pop = new Population(64);
let players = pop.population;

let gamesList = organizeGames(players);
let l = gamesList.length;
l = 1
for (let i = 0; i < l; i++) {
    if (i === 0) {
        gameBetweenAI(players[gamesList[i][0]], players[gamesList[i][1]], depth = 8, showGame = true);
    }
    else {
        gameBetweenAI(gamesList[i][0], gamesList[i][1]);
    }
}