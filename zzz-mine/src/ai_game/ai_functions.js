function markPossibleMoves(i, j, playerPlusMinus, board, moves, capturePossible) {
    let onBoard1 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < board.length && (j + 2) < board.length;
    let onBoard2 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < board.length && (j - 2) < board.length;
    let capturable = board[i + playerPlusMinus][j + 1] === playerPlusMinus || board[i + playerPlusMinus][j + 1] === 2 * playerPlusMinus;
    let newPosition;
    let capturedPosition;
    let oldPosition;

    if (onBoard1 && board[i + 2 * playerPlusMinus][j + 2] === 0 && capturable) {
        newPosition = [i + 2 * playerPlusMinus, j + 2];
        oldPosition = [i, j];
        capturedPosition = [[i + playerPlusMinus, j + 1]];
        let move = [oldPosition, newPosition, capturedPosition];
        moves.push(move);
        capturePossible = true;
        moves = doubleCapture(playerPlusMinus, board, newPosition, moves);
    }

    capturable = board[i + playerPlusMinus][j - 1] === playerPlusMinus || board[i + playerPlusMinus][j - 1] === 2 * playerPlusMinus;
    if (onBoard2 && board[i + 2 * playerPlusMinus][j - 2] === 0 && capturable) {
        newPosition = [i + 2 * playerPlusMinus, j - 2];
        oldPosition = [i, j];
        capturedPosition = [[i + playerPlusMinus, j - 1]];
        let move = [oldPosition, newPosition, capturedPosition];
        moves.push(move);
        capturePossible = true;
        moves = doubleCapture(playerPlusMinus, board, newPosition, moves);
    }

    if (abs(board[i][j]) === 2) {
        let onBoard1 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < board.length && (j + 2) < board.length;
        let onBoard2 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < board.length && (j - 2) < board.length;
        capturable = board[i - playerPlusMinus][j + 1] === playerPlusMinus || board[i - playerPlusMinus][j + 1] === 2 * playerPlusMinus;

        if (onBoard1 && board[i - 2 * playerPlusMinus][j + 2] === 0 && capturable) {
            newPosition = [i - 2 * playerPlusMinus, j + 2];
            oldPosition = [i, j];
            capturedPosition = [[i - playerPlusMinus, j + 1]];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
            capturePossible = true;
            moves = doubleCapture(playerPlusMinus, board, newPosition, moves, king = true);
        }
        capturable = board[i - playerPlusMinus][j - 1] === playerPlusMinus || board[i - playerPlusMinus][j - 1] === playerPlusMinus * 2;

        if (onBoard2 && board[i - 2 * playerPlusMinus][j - 2] === 0 && capturable) {
            newPosition = [i - 2 * playerPlusMinus, j - 2];
            oldPosition = [i, j];
            capturedPosition = [[i - playerPlusMinus, j - 1]];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
            capturePossible = true;
            moves = doubleCapture(playerPlusMinus, board, newPosition, moves, king = true);
        }

        if (!capturePossible) {
            onBoard1 = (i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < board.length && (j + 1) < board.length;
            onBoard2 = (i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < board.length && (j - 1) < board.length;
            if (onBoard1 && board[i - playerPlusMinus][j + 1] === 0) {
                newPosition = [i - playerPlusMinus, j + 1];
                oldPosition = [i, j];
                capturedPosition = [];
                let move = [oldPosition, newPosition, capturedPosition];
                moves.push(move);
            }

            if (onBoard2 && board[i - playerPlusMinus][j - 1] === 0) {
                newPosition = [i - playerPlusMinus, j - 1];
                oldPosition = [i, j];
                capturedPosition = [];
                let move = [oldPosition, newPosition, capturedPosition];
                moves.push(move);
            }
        }

    }

    if (!capturePossible) {
        onBoard1 = (i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < board.length && (j + 1) < board.length;
        onBoard2 = (i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < board.length && (j - 1) < board.length;
        if (onBoard1 && board[i + playerPlusMinus][j + 1] === 0) {
            newPosition = [i + playerPlusMinus, j + 1];
            oldPosition = [i, j];
            capturedPosition = [];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
        }

        if (onBoard2 && board[i + playerPlusMinus][j - 1] === 0) {
            newPosition = [i + playerPlusMinus, j - 1];
            oldPosition = [i, j];
            capturedPosition = [];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
        }
    }

    return moves, capturePossible;
}


function findEveryMove(playerPlusMinus, board) {
    let moves = [];
    let capturePossible = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] * playerPlusMinus < 0) {
                // careful with the sign of playerPlusMinus, always a pain in the ass
                moves, capturePossible = markPossibleMoves(i, j, playerPlusMinus, board, moves, capturePossible);
            }
        }
    }
    return moves
}

function isThereAMove(playerPlusMinus, board) {
    let moves = [];
    let capturePossible = false;
    console.log(playerPlusMinus);
    console.log(board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] * playerPlusMinus < 0) {
                // careful with the sign of playerPlusMinus, always a pain in the ass
                console.log("I'm here");
                moves, capturePossible = markPossibleMoves(i, j, playerPlusMinus, board, moves, capturePossible);
                if (moves.length > 0) {
                    return true;
                }
            }

        }
    }
    return false;
}

function boardAfterMove(moves, indexMove, playerPlusMinus, board) {
    let oldPosition = moves[indexMove][0];
    let newPosition = moves[indexMove][1];
    board[newPosition[0]][newPosition[1]] = board[oldPosition[0]][oldPosition[1]];
    board[oldPosition[0]][oldPosition[1]] = 0;
    if (playerPlusMinus === -1) { //white
        if (newPosition[0] === 0) {
            board[newPosition[0]][newPosition[1]] = 2;
        }
    }
    if (playerPlusMinus === 1) { //black
        if (newPosition[0] === board.length) {
            board[newPosition[0]][newPosition[1]] = -2;
        }
    }
    for (let i = 0; i < moves[indexMove][2].length; i++) {
        capturedPosition = moves[indexMove][2][i];
        board[capturedPosition[0]][capturedPosition[1]] = 0;
    }
    return board;
}

function doubleCapture(playerPlusMinus, board, position, moves, king = false) {
    let i = position[0];
    let j = position[1];
    let move;
    let onBoard1 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < board.length && (j + 2) < board.length;
    let onBoard2 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < board.length && (j - 2) < board.length;
    let leftPossible = false;
    let capturable = board[i + playerPlusMinus][j + 1] === playerPlusMinus || board[i + playerPlusMinus][j + 1] === 2 * playerPlusMinus;
    if (onBoard1 && board[i + 2 * playerPlusMinus][j + 2] === 0 && capturable) {
        let newPosition1 = [i + 2 * playerPlusMinus, j + 2];
        move = moves.pop();
        move[1] = newPosition1;
        capturedPosition = [i + playerPlusMinus, j + 1];
        move[2].push(capturedPosition);
        moves.push(move);
        moves = doubleCapture(playerPlusMinus, board, newPosition1, moves);
        leftPossible = true;
    }


    capturable = board[i + playerPlusMinus][j - 1] === playerPlusMinus || board[i + playerPlusMinus][j - 1] === 2 * playerPlusMinus;
    if (onBoard2 && board[i + 2 * playerPlusMinus][j - 2] === 0 && capturable) {
        move = moves.pop();
        if (leftPossible) {
            moves.push(move)
        }
        let newPosition2 = [i + 2 * playerPlusMinus, j - 2];
        move[1] = newPosition2;
        capturedPositions = move[2];
        if (capturedPositions.length > 0) {
            capturedPosition = capturedPositions.pop();
            while (capturedPosition[0] * playerPlusMinus > (i + playerPlusMinus) * playerPlusMinus) {
                capturedPosition = capturedPositions.pop();
            }
        }
        capturedPosition = [i + playerPlusMinus, j - 1];
        capturedPositions.push(capturedPosition);
        move[2] = capturedPositions;
        moves.push(move);
        moves = doubleCapture(playerPlusMinus, board, newPosition2, moves);
    }

    if (king) {
        onBoard1 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < board.length && (j + 2) < board.length;
        onBoard2 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < board.length && (j - 2) < board.length;
        let leftPossible = false;
        capturable = board[i - playerPlusMinus][j + 1] === playerPlusMinus || board[i - playerPlusMinus][j + 1] === 2 * playerPlusMinus;

        if (onBoard1 && board[i - 2 * playerPlusMinus][j + 2] === 0 && capturable) {
            let newPosition1 = [i - 2 * playerPlusMinus, j - 2];
            move = moves.pop();
            move[1] = newPosition1;
            capturedPosition = [i - playerPlusMinus, j + 1];
            move[2].push(capturedPosition);
            moves.push(move);
            moves = doubleCapture(playerPlusMinus, board, newPosition1, moves);
            leftPossible = true;
        }

        capturable = board[i - playerPlusMinus][j - 1] === playerPlusMinus || board[i - playerPlusMinus][j - 1] === 2 * playerPlusMinus;
        if (onBoard2 && board[i - 2 * playerPlusMinus][j - 2] === 0 && capturable) {
            move = moves.pop();
            if (leftPossible) {
                moves.push(move)
            }
            let newPosition2 = [i - 2 * playerPlusMinus, j - 2];
            move[1] = newPosition2;
            capturedPositions = move[2];
            if (capturedPositions.length > 0) {
                capturedPosition = capturedPositions.pop();
                while (capturedPosition[0] * playerPlusMinus > (i - playerPlusMinus) * playerPlusMinus) {
                    capturedPosition = capturedPositions.pop();
                }
            }
            capturedPosition = [i - playerPlusMinus, j - 1];
            capturedPositions.push(capturedPosition);
            move[2] = capturedPositions;
            moves.push(move);
            moves = doubleCapture(playerPlusMinus, board, newPosition2, moves);
        }
    }

    return moves;
}

function boardToInput(board, playerPlusMinus, kingValue) {
    input = new Array(34);
    indexInput = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if ((i + j) % 2 === 0) {
                input[indexInput] = board[i][j] / 2;
                if (abs(input[indexInput]) === 0.5) {
                    input[indexInput] = input[indexInput] / kingValue;
                }
            }
        }
    }
    nbMoves = findEveryMove(playerPlusMinus, board).length;
    input[32] = playerPlusMinus;
    input[33] = nbMoves / 64; //arbitrary to have smth between 0 and 1
    return input;
}

function pickMove(board, playerPlusMinus, playerAI, depth, alpha, beta, isMaximising) {
    //use seedTree = null when you create the first tree
    //use alpha = -Infinity
    //use beta = +Infinity
    //depth = 2n
    let brain = playerAI.brain;
    if (depth === 0) {
        input = boardToInput(board, playerPlusMinus, brain.kingValue);
        evaluation = brain.feedForward(input);
        return (evaluation, -1, null);
    }
    moves = findEveryMove(playerPlusMinus, board);
    index = 0;
    if (isMaximising) {
        bestVal = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            newBoard = boardAfterMove(moves, i, playerPlusMinus, board);
            result = createTree(newBoard, -playerPlusMinus, playerAI, depth - 1, alpha, beta, false);
            evaluation = result[0];
            index = result[1];
            if (evaluation > bestVal) {
                bestVal = evaluation;
                index = i;
            }
            alpha = Math.max(bestVal, alpha);
            if (beta <= alpha) {
                break;
            }
        }
        return (bestVal, index, moves);
    }
    else {
        minVal = Infinity;
        for (let i = 0; i < moves.length; i++) {
            newBoard = boardAfterMove(moves, i, playerPlusMinus, board);
            result = createTree(newBoard, -playerPlusMinus, playerAI, depth - 1, alpha, beta, true);
            evaluation = result[0];
            index = result[1];
            if (evaluation < minVal) {
                bestVal = evaluation;
                index = i;
            }
            beta = Math.min(minVal, beta);
            if (beta <= alpha) {
                break;
            }
        }
        return (minVal, index, moves);
    }
}



function gameBetweenAI(playerWhite, playerBlack, depth = 4, showGame = false) {
    board = [
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
    let value; let indexMove; let moves;
    console.log(playerArray.length);
    console.log(isThereAMove(playerArray[indexPlayer], board));
    while (isThereAMove(playerArray[indexPlayer], board) && nbMovesPlayed < 500) {
        value, indexMove, moves = pickMove(board, playerArray[indexPlayer], playerAI[indexPlayer], depth, -Infinity, +Infinity, isMaximising[indexPlayer]);
        console.log(value);
        if (indexMove === -1 || moves === null) {
            throw new Error("Error in pickMove");
        }
        board = boardAfterMove(moves, indexMove, playerArray[indexPlayer], board);
        indexPlayer = (indexPlayer + 1) % 2;
        nbMovesPlayed++;
        builBoard(board);
    }
    if (nbMovesPlayed === 500) {
        playerWhite.addScore(1);
        playerBlack.addScore(1);
    }
    else {
        console.log(playerAI[indexPlayer].getScore());
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

function builBoard(board) {
    game.innerHTML = "";
    black = 0;
    white = 0;

    for (let i = 0; i < board.length; i++) {
        const element = board[i];
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
            if (board[i][j] > 0) {
                occupied = "whitePiece";
                white++;
            } else if (board[i][j] < 0) {
                occupied = "blackPiece";
                black++;
            } else {
                occupied = "empty";
            }



            col.setAttribute("class", "column " + caseType);
            row.appendChild(col);

        }

        game.appendChild(row);
    }
    //display the number of piece for each player
    displayCounter(black, white);
}

function displayCounter(black, white) {
    let blackContainer = document.getElementById("black-player-count-pieces");
    let whiteContainer = document.getElementById("white-player-count-pieces");
    blackContainer.innerHTML = black;
    whiteContainer.innerHTML = white;
}

//export { organizeGames, gameBetweenAI };