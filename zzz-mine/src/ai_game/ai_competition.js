//import { organizeGames, gameBetweenAI } from "./ai_functions";

let pop = new Population(64);
let players = pop.population;

let gamesList = organizeGames(players);

const modal = document.getElementById("easyModal");
let game = document.getElementById("game");

for (let i = 0; i < gamesList.length; i++) {
    if (i === 0) {
        gameBetweenAI(players[gamesList[i][0]], players[gamesList[i][1]], depth = 4, showGame = true);
    }
    else {
        gameBetweenAI(gamesList[i][0], gamesList[i][1]);
    }
}