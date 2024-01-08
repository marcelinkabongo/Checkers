const modal = document.getElementById("easyModal");
let game = document.getElementById("game");

let pop = new Population(64);
let players = pop.population;

let gamesList = organizeGames(players);
let l = gamesList.length;

for (let i = 0; i < l; i++) {
    if (i === 0) {
        gameBetweenAI(players[gamesList[i][0]], players[gamesList[i][1]], depth = 8, showGame = false);
    }
    else {
        gameBetweenAI(gamesList[i][0], gamesList[i][1]);
    }
}