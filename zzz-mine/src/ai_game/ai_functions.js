function markPossibleMoves(i, j, playerPlusMinus, board, moves, capturePossible) {
    let usableBoard = copyBoard(board);
    let usableMoves = copyMoves(moves);
    let hasBeenModified = false;
    let onBoard1 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length;
    let onBoard2 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j - 2) >= 0;
    let capturable = false;
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length) {
        capturable = usableBoard[i + playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j + 1] === 2 * playerPlusMinus;
    }

    if (onBoard1 && usableBoard[i + 2 * playerPlusMinus][j + 2] === 0 && capturable) {

        let oldPosition = new Array(2);
        let newPosition = new Array(2);
        let capturedPosition = new Array(3);
        let capturedPositions = new Array(1);
        let move = new Array(3);
        newPosition = [i + 2 * playerPlusMinus, j + 2];
        oldPosition = [i, j];
        capturedPosition = [i + playerPlusMinus, j + 1, 0];
        capturedPositions[0] = capturedPosition;
        move = [oldPosition, newPosition, capturedPositions];
        usableMoves.push(move);
        hasBeenModified = true;

        capturePossible = true;
        console.log("doubleCapture case 1");
        usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition, usableMoves);
    }

    capturable = false;
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j - 1) >= 0) {
        capturable = usableBoard[i + playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j - 1] === 2 * playerPlusMinus;
    }
    if (onBoard2 && usableBoard[i + 2 * playerPlusMinus][j - 2] === 0 && capturable) {

        let oldPosition = new Array(2);
        let newPosition = new Array(2);
        let capturedPosition = new Array(3);
        let capturedPositions = new Array(1);
        let move = new Array(3);
        newPosition = [i + 2 * playerPlusMinus, j - 2];
        oldPosition = [i, j];
        capturedPosition = [i + playerPlusMinus, j - 1, 0];
        capturedPositions[0] = capturedPosition;
        move = [oldPosition, newPosition, capturedPositions];
        usableMoves.push(move);
        hasBeenModified = true;

        capturePossible = true;
        console.log("doubleCapture case 2");
        usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition, usableMoves);
    }

    if (Math.abs(usableBoard[i][j]) === 2) {
        onBoard1 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length;
        onBoard2 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j - 2) >= 0;

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length) {
            capturable = usableBoard[i - playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j + 1] === 2 * playerPlusMinus;
        }

        if (onBoard1 && usableBoard[i - 2 * playerPlusMinus][j + 2] === 0 && capturable) {

            let oldPosition = new Array(2);
            let newPosition = new Array(2);
            let capturedPosition = new Array(3);
            let capturedPositions = new Array(1);
            let move = new Array(3);
            newPosition = [i - 2 * playerPlusMinus, j + 2];
            oldPosition = [i, j];
            capturedPosition = [i - playerPlusMinus, j + 1, 0];
            capturedPositions[0] = capturedPosition;
            move = [oldPosition, newPosition, capturedPositions];
            usableMoves.push(move);
            hasBeenModified = true;
            capturePossible = true;
            console.log("doubleCapture case 3");
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition, usableMoves, king = true);
        }

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j - 1) >= 0) {
            capturable = usableBoard[i - playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j - 1] === playerPlusMinus * 2;
        }

        if (onBoard2 && usableBoard[i - 2 * playerPlusMinus][j - 2] === 0 && capturable) {

            let oldPosition = new Array(2);
            let newPosition = new Array(2);
            let capturedPosition = new Array(3);
            let capturedPositions = new Array();
            let move = new Array(3);
            newPosition = [i - 2 * playerPlusMinus, j - 2];
            oldPosition = [i, j];
            capturedPosition = [i - playerPlusMinus, j - 1, 0];
            capturedPositions[0] = capturedPosition;
            move = [oldPosition, newPosition, capturedPositions];
            usableMoves.push(move);
            hasBeenModified = true;
            capturePossible = true;
            console.log("doubleCapture case 4");
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition, usableMoves, king = true);
        }

        if (!capturePossible) {
            onBoard1 = (i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length;
            onBoard2 = (i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j - 1) >= 0;
            if (onBoard1 && usableBoard[i - playerPlusMinus][j + 1] === 0) {

                let oldPosition = new Array(2);
                let newPosition = new Array(2);
                let capturedPositions = new Array();
                let move = new Array(3);
                newPosition = [i - playerPlusMinus, j + 1];
                oldPosition = [i, j];
                move = [oldPosition, newPosition, capturedPositions];
                usableMoves.push(move);
                hasBeenModified = true;
            }

            if (onBoard2 && usableBoard[i - playerPlusMinus][j - 1] === 0) {

                let oldPosition = new Array(2);
                let newPosition = new Array(2);
                let capturedPositions = new Array();
                let move = new Array(3);
                newPosition = [i - playerPlusMinus, j - 1];
                oldPosition = [i, j];
                move = [oldPosition, newPosition, capturedPositions];
                usableMoves.push(move);
                hasBeenModified = true;

            }
        }

    }

    if (!capturePossible) {
        onBoard1 = (i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length;
        onBoard2 = (i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j - 1) >= 0;
        if (onBoard1 && usableBoard[i + playerPlusMinus][j + 1] === 0) {

            let oldPosition = new Array(2);
            let newPosition = new Array(2);
            let capturedPositions = new Array();
            let move = new Array(3);
            newPosition = [i + playerPlusMinus, j + 1];
            oldPosition = [i, j];
            move = [oldPosition, newPosition, capturedPositions];
            usableMoves.push(move);
            hasBeenModified = true;
        }

        if (onBoard2 && usableBoard[i + playerPlusMinus][j - 1] === 0) {

            let oldPosition = new Array(2);
            let newPosition = new Array(2);
            let capturedPositions = new Array();
            let move = new Array(3);
            newPosition = [i + playerPlusMinus, j - 1];
            oldPosition = [i, j];
            move = [oldPosition, newPosition, capturedPositions];
            usableMoves.push(move);
            hasBeenModified = true;
        }
    }
    return [usableMoves, capturePossible];
}


function findEveryMove(playerPlusMinus, board) {
    let usableBoard = copyBoard(board);
    let moves = new Array();
    let capturePossible = false;
    for (let i = 0; i < usableBoard.length; i++) {
        for (let j = 0; j < usableBoard.length; j++) {
            if (usableBoard[i][j] * playerPlusMinus < 0) {
                // careful with the sign of playerPlusMinus, always a pain in the ass
                let result = markPossibleMoves(i, j, playerPlusMinus, usableBoard, moves, capturePossible);
                moves = copyMoves(result[0]);
                capturePossible = result[1];
            }
        }
    }
    if (capturePossible) {
        let i = 0;
        while (i < moves.length && i < 1000) {
            if (moves[i][2].length === 0) {
                moves.splice(i, 1);
            }
            else {
                i++;
            }
        }
    }
    return moves
}

function isThereAMove(playerPlusMinus, board) {
    let usableBoard = copyBoard(board);
    let moves = new Array();
    let capturePossible = false;
    for (let i = 0; i < usableBoard.length; i++) {
        for (let j = 0; j < usableBoard.length; j++) {
            if (usableBoard[i][j] * playerPlusMinus < 0) {
                // careful with the sign of playerPlusMinus, always a pain in the ass
                let result = markPossibleMoves(i, j, playerPlusMinus, usableBoard, moves, capturePossible);
                if (result[0].length > 0) {
                    return true;
                }
            }

        }
    }
    return false;
}

function boardAfterMove(moves, indexMove, playerPlusMinus, board, printBool = false) {
    let usableBoard = copyBoard(board);
    let usableMoves = copyMoves(moves);
    let oldPosition = usableMoves[indexMove][0];
    let newPosition = usableMoves[indexMove][1];
    usableBoard[newPosition[0]][newPosition[1]] = usableBoard[oldPosition[0]][oldPosition[1]];
    usableBoard[oldPosition[0]][oldPosition[1]] = 0;
    if (playerPlusMinus === -1) { //white
        if (newPosition[0] === 0) {
            usableBoard[newPosition[0]][newPosition[1]] = 2;
        }
    }
    if (playerPlusMinus === 1) { //black
        if (newPosition[0] === usableBoard.length - 1) {
            usableBoard[newPosition[0]][newPosition[1]] = -2;
        }
    }
    for (let i = 0; i < usableMoves[indexMove][2].length; i++) {
        if (usableMoves[indexMove][2][i] === undefined) {
            break;
        }
        capturedPosition = usableMoves[indexMove][2][i];
        usableBoard[capturedPosition[0]][capturedPosition[1]] = 0;
    }
    return usableBoard;
}

function doubleCapture(playerPlusMinus, board, position, moves, king = false, depth = 1) {
    //return moves;
    // console.log("i'm in double capture");
    if (depth > 30) {
        console.log("problemsssss " + depth);
        return -1;
    }
    let usableBoard = board;
    let usableMoves = copyMoves(moves);
    let i = position[0];
    let j = position[1];
    let move = [];
    let onBoard1 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length && (j + 2) >= 0;
    let onBoard2 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j - 2) < usableBoard.length && (j - 2) >= 0;
    let capturable = false;
    let capturedPosition = [];
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length && (j + 1) >= 0) {
        capturable = (usableBoard[i + playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j + 1] === 2 * playerPlusMinus);
    }
    if (onBoard1 && usableBoard[i + 2 * playerPlusMinus][j + 2] === 0 && capturable) {
        let newPosition1 = [i + 2 * playerPlusMinus, j + 2];
        move = usableMoves.pop();
        move[1] = newPosition1;
        capturedPosition = [i + playerPlusMinus, j + 1, depth];
        move[2].push(capturedPosition);
        usableMoves.push(move);
        if ((playerPlusMinus === 1 && newPosition1[0] === 7) || (playerPlusMinus === -1 && newPosition1[0] === 0)) {
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition1, usableMoves, king = true, depth = depth + 1);
        }
        else {
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition1, usableMoves, king = false, depth = depth + 1);
        }
    }
    capturable = false;
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length && (j - 1) >= 0) {
        capturable = usableBoard[i + playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j - 1] === 2 * playerPlusMinus;
    }

    if (onBoard2 && usableBoard[i + 2 * playerPlusMinus][j - 2] === 0 && capturable) {
        move = usableMoves.pop();
        let moveCopy = copySingularMove(move);
        if (move[2][move[2].length - 1][2] !== depth - 1) {
            usableMoves.push(moveCopy);
        }
        while (move[2][move[2].length - 1][2] >= depth) {
            console.log(move[2][move[2].length - 1][2] + ' is greater than depth: ' + depth);
            move[2].pop();
        }
        let newPosition2 = [i + 2 * playerPlusMinus, j - 2];
        move[1] = newPosition2;
        capturedPosition = [i + playerPlusMinus, j - 1, depth];
        move[2].push(capturedPosition);
        usableMoves.push(move);
        if ((playerPlusMinus === 1 && newPosition2[0] === 7) || (playerPlusMinus === -1 && newPosition2[0] === 0)) {
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition2, usableMoves, king = true, depth = depth + 1);
        }
        else {
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition2, usableMoves, king = false, depth = depth + 1);
        }
    }

    if (king) {
        onBoard1 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length;
        onBoard2 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j - 2) >= 0;

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length && (j + 1) >= 0) {
            capturable = usableBoard[i - playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j + 1] === 2 * playerPlusMinus;
        }

        if (onBoard1 && usableBoard[i - 2 * playerPlusMinus][j + 2] === 0 && capturable) {
            let newPosition1 = [i - 2 * playerPlusMinus, j - 2];
            move = usableMoves.pop();
            let moveCopy = copySingularMove(move);
            if (move[2][move[2].length - 1][2] !== depth - 1) {
                usableMoves.push(moveCopy);
            }
            while (move[2][move[2].length - 1][2] >= depth) {
                console.log(move[2][move[2].length - 1][2] + ' is greater than depth: ' + depth);
                move[2].pop();
            }
            move[1] = newPosition1;
            capturedPosition = [i - playerPlusMinus, j + 1, depth];
            move[2].push(capturedPosition);
            usableMoves.push(move);
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition1, usableMoves, king = true, depth = depth +1);
        }

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length && (j - 1) >= 0) {
            capturable = usableBoard[i - playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j - 1] === 2 * playerPlusMinus;
        }

        if (onBoard2 && usableBoard[i - 2 * playerPlusMinus][j - 2] === 0 && capturable) {
            move = usableMoves.pop();
            let moveCopy = copySingularMove(move);
            if (move[2][move[2].length - 1][2] !== depth - 1) {
                usableMoves.push(moveCopy);
            }
            while (move[2][move[2].length - 1][2] >= depth) {
                console.log(move[2][move[2].length - 1][2] + ' is greater than depth: ' + depth);
                move[2].pop();
            }
            let newPosition2 = [i - 2 * playerPlusMinus, j - 2];
            move[1] = newPosition2;
            capturedPosition = [i - playerPlusMinus, j - 1];
            move[2].push(capturedPosition);
            usableMoves.push(move);
            usableMoves = doubleCapture(playerPlusMinus, usableBoard, newPosition2, usableMoves, king = true, depth = depth + 1);
        }
    }

    return usableMoves;
}

function boardToInput(board, playerPlusMinus, kingValue) {
    let usableBoard = copyBoard(board);
    let input = new Array(34);
    let indexInput = 0;
    for (let i = 0; i < usableBoard.length; i++) {
        for (let j = 0; j < usableBoard.length; j++) {
            if ((i + j) % 2 === 0) {
                input[indexInput] = usableBoard[i][j] / 2;
                if (Math.abs(input[indexInput]) === 0.5) {
                    input[indexInput] = input[indexInput] / (0.5 * kingValue);
                }
                indexInput++;
            }
        }
    }
    let nbMoves = findEveryMove(playerPlusMinus, usableBoard).length;
    input[32] = playerPlusMinus;
    input[33] = nbMoves / 64; //arbitrary to have smth between 0 and 1
    return input;
}

function pickMove(board, playerPlusMinus, playerAI, depth, alpha, beta, isMaximising) {
    //use seedTree = null when you create the first tree
    //use alpha = -Infinity
    //use beta = +Infinity
    //depth = 2n
    let usableBoard = copyBoard(board);
    let brain = playerAI.brain;
    if (depth === 0) {
        //printBoard(usableBoard, "depth = 0");
        let input = boardToInput(usableBoard, playerPlusMinus, brain.kingValue);
        let evaluation = brain.feedForward(input);
        return [evaluation, -1, null];
    }
    let moves = findEveryMove(playerPlusMinus, usableBoard);
    let index = 0;
    let hasBeenModified = false;
    let evaluationArray = new Array(moves.length);
    let evaluation = 0;
    if (isMaximising) {
        let bestVal = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            let newBoard = boardAfterMove(moves, i, playerPlusMinus, usableBoard);
            let result = pickMove(newBoard, -playerPlusMinus, playerAI, depth - 1, alpha, beta, false);
            evaluation = result[0];
            evaluationArray[i] = evaluation;
            if (evaluation > bestVal) {
                bestVal = evaluation;
                index = i;
                alpha = Math.max(bestVal, alpha);
                hasBeenModified = true;
            }
            if (beta <= alpha) {
                // console.log("alpha beta pruning, new alpha = " + alpha);
                break;
            }
        }

        if (moves.length === 0) {
            let input = boardToInput(usableBoard, playerPlusMinus, brain.kingValue);
            evaluation = brain.feedForward(input);
            bestVal = evaluation;
            index = -1;
        }
        return [bestVal, index, moves];
    }
    else {
        let minVal = Infinity;
        for (let i = 0; i < moves.length; i++) {
            let newBoard = boardAfterMove(moves, i, playerPlusMinus, usableBoard);
            let result = pickMove(newBoard, -playerPlusMinus, playerAI, depth - 1, alpha, beta, true);
            evaluation = result[0];
            if (evaluation < minVal) {
                minVal = evaluation;
                index = i;
                beta = Math.min(minVal, beta);
                hasBeenModified = true;
            }
            if (beta <= alpha) {
                // console.log("alpha beta pruning, new beta = " + beta);
                break;
            }
        }
        if (moves.length === 0) {
            console.log("there is no moves");
            let input = boardToInput(usableBoard, playerPlusMinus, brain.kingValue);
            evaluation = brain.feedForward(input);
            minVal = evaluation;
            hasBeenModified = true;
            index = -1;
        }
        return [minVal, index, moves];
    }
}


function gameBetweenAI(playerWhite, playerBlack, depth = 4) {
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
    let playerArray = [-1, 1];
    let playerAI = [playerWhite, playerBlack];
    let isMaximising = [true, false];
    let indexPlayer = 0;
    let nbMovesPlayed = 0;
    let value = 0;
    let indexMove = 0;
    let moves = [];
    let result = [];

    while (isThereAMove(playerArray[indexPlayer], board) && nbMovesPlayed < 500) {
        printBoard(board, "board after move : " + nbMovesPlayed);
        result = pickMove(board, playerArray[indexPlayer], playerAI[indexPlayer], depth, -Infinity, +Infinity, isMaximising[indexPlayer]);
        value = result[0];
        indexMove = result[1];
        moves = copyMoves(result[2]);
        if (indexMove === -1 || moves === null) {
            console.log("c'est la merdeee");
            throw new Error("Error in pickMove");
        }

        board = boardAfterMove(moves, indexMove, playerArray[indexPlayer], board);
        indexPlayer = (indexPlayer + 1) % 2;
        nbMovesPlayed++;
    }
    if (nbMovesPlayed === 500) {
        playerWhite.addScore(1);
        playerBlack.addScore(1);
    }
    else {
        console.log("the winner's score is " + playerAI[indexPlayer].getScore());
        playerAI[indexPlayer].addScore(3);
    }
}



function organizeGames(players) {
    const numberOfPlayers = players.length;

    // Ensure the number of players is even for pairings
    if (numberOfPlayers % 2 !== 0) {
        throw new Error('The number of players must be even.');
    }

    const games = [];

    for (let i = 0; i < numberOfPlayers - 1; i++) {
        for (let j = i + 1; j < numberOfPlayers; j++) {
            const playerWhite = players[i];
            const playerBlack = players[j];

            // Create two games, one with playerWhite as white, and the other with playerBlack as white
            const game1 = [i, j];
            const game2 = [j, i];

            games.push(game1, game2);
        }
    }
    return games;
}

function buildBoard(boardGiven) {
    let usableBoard = copyBoard(boardGiven);
    let game = document.getElementById("game");
    game.innerHTML = "";
    black = 0;
    white = 0;


    for (let i = 0; i < usableBoard.length; i++) {
        const element = usableBoard[i];
        let row = document.createElement("div"); // create div for each row
        row.setAttribute("class", "row");

        for (let j = 0; j < element.length; j++) {
            const elmt = element[j];
            let col = document.createElement("div");
            let piece = document.createElement("div");
            let caseType = "";
            let occupied = "";

            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    caseType = "Whitecase";
                } else {
                    caseType = "blackCase";
                }
            } else {
                if (j % 2 !== 0) {
                    caseType = "Whitecase";
                } else {
                    caseType = "blackCase";
                }
            }



            // add the piece if the case isn't empty
            if (usableBoard[i][j] > 0) {
                occupied = "whitePiece";
                white++;
            } else if (usableBoard[i][j] < 0) {
                occupied = "blackPiece";
                black++;
            } else {
                occupied = "empty";
            }

            piece.setAttribute("class", "occupied " + occupied);

            // set row and colum in the case
            piece.setAttribute("row", i);
            piece.setAttribute("column", j);
            piece.setAttribute("data-position", i + "-" + j);

            col.appendChild(piece);

            col.setAttribute("class", "column " + caseType);
            row.appendChild(col);

        }

        game.appendChild(row);
    }

    displayCounter(black, white);
}

function displayCounter(black, white) {
    var blackContainer = document.getElementById("black-player-count-pieces");
    var whiteContainer = document.getElementById("white-player-count-pieces");
    blackContainer.innerHTML = black;
    whiteContainer.innerHTML = white;
}

function printBoard(board, string) {
    console.log(string);
    for (let index = 0; index < board.length; index++) {
        console.log("row " + index + " : " + board[index]);
    }
}

function copyBoard(board) {
    let arr = new Array(board.length);
    for (let i = 0; i < board.length; i++) {
        let arr1 = new Array(board[0].length);
        for (let j = 0; j < board[i].length; j++) {
            arr1[j] = board[i][j];
        }
        arr[i] = arr1;
    }
    return arr;
}

function copyMoves(moves) {
    let arr = new Array(moves.length);
    for (let i = 0; i < moves.length; i++) {
        let move = new Array(3);
        let oldPosition = new Array(2);
        let newPosition = new Array(2);
        for (let j = 0; j < 2; j++) {
            oldPosition[j] = moves[i][0][j];
            newPosition[j] = moves[i][1][j];
        }
        let capturedPosition = new Array(3);
        let capturedPositions;
        if (moves[i][2].length === 0) {
            capturedPositions = new Array();
        }
        else {
            capturedPositions = new Array(moves[i][2].length);
            for (let j = 0; j < moves[i][2].length; j++) {
                if (moves[i][2][j] === undefined) {
                    break;
                }
                capturedPosition[0] = moves[i][2][j][0];
                capturedPosition[1] = moves[i][2][j][1];
                capturedPosition[2] = moves[i][2][j][2];
                capturedPositions[j] = capturedPosition;
            }
        }
        move[0] = oldPosition;
        move[1] = newPosition;
        move[2] = capturedPositions;
        arr[i] = move;
    }

    return arr;
}

function copySingularMove(move) {
    let copy = new Array(3);
    let oldPosition = new Array(2);
    let newPosition = new Array(2);
    for (let j = 0; j < 2; j++) {
        oldPosition[j] = move[0][j];
        newPosition[j] = move[1][j];
    }
    let capturedPosition = new Array(3);
    let capturedPositions;
    if (move[2].length === 0) {
        capturedPositions = new Array();
    }
    else {
        capturedPositions = new Array(move[2].length);
        for (let j = 0; j < move[2].length; j++) {
            if (move[2][j] === undefined) {
                break;
            }
            capturedPosition[0] = move[2][j][0];
            capturedPosition[1] = move[2][j][1];
            capturedPosition[2] = move[2][j][2];
            capturedPositions[j] = capturedPosition;
        }
    }
    copy[0] = oldPosition;
    copy[1] = newPosition;
    copy[2] = capturedPositions;
    return copy;
}

//export { organizeGames, gameBetweenAI };