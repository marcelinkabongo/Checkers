function markPossibleMoves(i, j, playerPlusMinus, board, moves, capturePossible) {
    let usableBoard = copyBoard(board);
    let onBoard1 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length;
    let onBoard2 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j - 2) < usableBoard.length;
    let newPosition = [];
    let capturedPosition = [];
    let oldPosition = [];
    let move = [];

    let capturable = false;
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length && (j + 1) >= 0) {
        capturable = usableBoard[i + playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j + 1] === 2 * playerPlusMinus;
    }

    if (onBoard1 && usableBoard[i + 2 * playerPlusMinus][j + 2] === 0 && capturable) {
        newPosition = [i + 2 * playerPlusMinus, j + 2];
        oldPosition = [i, j];
        capturedPosition = [[i + playerPlusMinus, j + 1]];
        move = [oldPosition, newPosition, capturedPosition];
        moves.push(move);
        capturePossible = true;
        moves = doubleCapture(playerPlusMinus, usableBoard, newPosition, moves);
    }

    capturable = false;
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length && (j - 1) >= 0) {
        capturable = usableBoard[i + playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j - 1] === 2 * playerPlusMinus;
    }
    if (onBoard2 && usableBoard[i + 2 * playerPlusMinus][j - 2] === 0 && capturable) {
        newPosition = [i + 2 * playerPlusMinus, j - 2];
        oldPosition = [i, j];
        capturedPosition = [[i + playerPlusMinus, j - 1]];
        move = [oldPosition, newPosition, capturedPosition];
        moves.push(move);
        capturePossible = true;
        moves = doubleCapture(playerPlusMinus, usableBoard, newPosition, moves);
    }

    if (Math.abs(usableBoard[i][j]) === 2) {
        onBoard1 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length;
        onBoard2 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j - 2) < usableBoard.length;

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length && (j + 1) >= 0) {
            capturable = usableBoard[i - playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j + 1] === 2 * playerPlusMinus;
        }

        if (onBoard1 && usableBoard[i - 2 * playerPlusMinus][j + 2] === 0 && capturable) {
            newPosition = [i - 2 * playerPlusMinus, j + 2];
            oldPosition = [i, j];
            capturedPosition = [[i - playerPlusMinus, j + 1]];
            move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
            capturePossible = true;
            moves = doubleCapture(playerPlusMinus, usableBoard, newPosition, moves, king = true);
        }

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length && (j - 1) >= 0) {
            capturable = usableBoard[i - playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j - 1] === playerPlusMinus * 2;
        }

        if (onBoard2 && usableBoard[i - 2 * playerPlusMinus][j - 2] === 0 && capturable) {
            newPosition = [i - 2 * playerPlusMinus, j - 2];
            oldPosition = [i, j];
            capturedPosition = [[i - playerPlusMinus, j - 1]];
            move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
            capturePossible = true;
            moves = doubleCapture(playerPlusMinus, usableBoard, newPosition, moves, king = true);
        }

        if (!capturePossible) {
            onBoard1 = (i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length;
            onBoard2 = (i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length;
            if (onBoard1 && usableBoard[i - playerPlusMinus][j + 1] === 0) {
                newPosition = [i - playerPlusMinus, j + 1];
                oldPosition = [i, j];
                capturedPosition = [];
                move = [oldPosition, newPosition, capturedPosition];
                moves.push(move);
            }

            if (onBoard2 && usableBoard[i - playerPlusMinus][j - 1] === 0) {
                newPosition = [i - playerPlusMinus, j - 1];
                oldPosition = [i, j];
                capturedPosition = [];
                move = [oldPosition, newPosition, capturedPosition];
                moves.push(move);
            }
        }

    }

    if (!capturePossible) {
        onBoard1 = (i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length;
        onBoard2 = (i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length;
        if (onBoard1 && usableBoard[i + playerPlusMinus][j + 1] === 0) {
            newPosition = [i + playerPlusMinus, j + 1];
            oldPosition = [i, j];
            capturedPosition = [];
            move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
        }

        if (onBoard2 && usableBoard[i + playerPlusMinus][j - 1] === 0) {
            newPosition = [i + playerPlusMinus, j - 1];
            oldPosition = [i, j];
            capturedPosition = [];
            move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
        }
    }

    return [moves, capturePossible];
}


function findEveryMove(playerPlusMinus, board) {
    let usableBoard = copyBoard(board);
    let moves = [];
    let capturePossible = false;
    for (let i = 0; i < usableBoard.length; i++) {
        for (let j = 0; j < usableBoard.length; j++) {
            if (usableBoard[i][j] * playerPlusMinus < 0) {
                // careful with the sign of playerPlusMinus, always a pain in the ass
                let result = markPossibleMoves(i, j, playerPlusMinus, usableBoard, moves, capturePossible);
                moves = result[0];
                capturePossible = result[1];
            }
        }
    }
    return moves
}

function isThereAMove(playerPlusMinus, board) {
    let usableBoard = copyBoard(board);
    let moves = [];
    let capturePossible = false;
    for (let i = 0; i < usableBoard.length; i++) {
        for (let j = 0; j < usableBoard.length; j++) {
            if (usableBoard[i][j] * playerPlusMinus < 0) {
                // careful with the sign of playerPlusMinus, always a pain in the ass
                let result = markPossibleMoves(i, j, playerPlusMinus, usableBoard, moves, capturePossible);
                moves = result[0];
                if (moves.length > 0) {
                    return true;
                }
            }

        }
    }
    return false;
}

function boardAfterMove(moves, indexMove, playerPlusMinus, board) {
    let usableBoard = copyBoard(board);
    let oldPosition = moves[indexMove][0];
    let newPosition = moves[indexMove][1];
    let arr = [];
    arr = usableBoard[newPosition[0]];
    arr.splice(newPosition[1], 1, usableBoard[oldPosition[0]][oldPosition[1]]);
    //console.log(usableBoard);
    usableBoard[newPosition[0]][newPosition[1]] = usableBoard[oldPosition[0]][oldPosition[1]];
    usableBoard[newPosition[0]].splice(newPosition[1], 1, usableBoard[oldPosition[0]][oldPosition[1]]);
    usableBoard[oldPosition[0]][oldPosition[1]] = 0;
    if (playerPlusMinus === -1) { //white
        if (newPosition[0] === 0) {
            usableBoard[newPosition[0]][newPosition[1]] = 2;
        }
    }
    if (playerPlusMinus === 1) { //black
        if (newPosition[0] === usableBoard.length) {
            usableBoard[newPosition[0]][newPosition[1]] = -2;
        }
    }
    for (let i = 0; i < moves[indexMove][2].length; i++) {
        capturedPosition = moves[indexMove][2][i];
        usableBoard[capturedPosition[0]][capturedPosition[1]] = 0;
    }
    return usableBoard;
}

function doubleCapture(playerPlusMinus, board, position, moves, king = false) {
    return moves;
    console.log("i'm in double capture");
    let usableBoard = copyBoard(board);
    let i = position[0];
    let j = position[1];
    let move = [];
    let onBoard1 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length && (j + 2) >= 0;
    let onBoard2 = (i + 2 * playerPlusMinus) >= 0 && (i + 2 * playerPlusMinus) < usableBoard.length && (j - 2) < usableBoard.length && (j - 2) >= 0;
    let leftPossible = false;
    let capturable = false;
    let capturedPosition = [];
    let capturedPositions = [];
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length && (j + 1) >= 0) {
        capturable = (usableBoard[i + playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j + 1] === 2 * playerPlusMinus);
    }
    if (onBoard1 && usableBoard[i + 2 * playerPlusMinus][j + 2] === 0 && capturable) {
        let newPosition1 = [i + 2 * playerPlusMinus, j + 2];
        move = moves.pop();
        move[1] = newPosition1;
        capturedPosition = [i + playerPlusMinus, j + 1];
        move[2].push(capturedPosition);
        moves.push(move);
        moves = doubleCapture(playerPlusMinus, usableBoard, newPosition1, moves);
        leftPossible = true;
    }

    capturable = false;
    if ((i + playerPlusMinus) >= 0 && (i + playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length && (j - 1) >= 0) {
        capturable = usableBoard[i + playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i + playerPlusMinus][j - 1] === 2 * playerPlusMinus;
    }

    if (onBoard2 && usableBoard[i + 2 * playerPlusMinus][j - 2] === 0 && capturable) {
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
        moves = doubleCapture(playerPlusMinus, usableBoard, newPosition2, moves);
    }

    if (king) {
        onBoard1 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j + 2) < usableBoard.length;
        onBoard2 = (i - 2 * playerPlusMinus) >= 0 && (i - 2 * playerPlusMinus) < usableBoard.length && (j - 2) < usableBoard.length;
        let leftPossible = false;

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j + 1) < usableBoard.length && (j + 1) >= 0) {
            capturable = usableBoard[i - playerPlusMinus][j + 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j + 1] === 2 * playerPlusMinus;
        }

        if (onBoard1 && usableBoard[i - 2 * playerPlusMinus][j + 2] === 0 && capturable) {
            let newPosition1 = [i - 2 * playerPlusMinus, j - 2];
            move = moves.pop();
            move[1] = newPosition1;
            capturedPosition = [i - playerPlusMinus, j + 1];
            move[2].push(capturedPosition);
            moves.push(move);
            moves = doubleCapture(playerPlusMinus, usableBoard, newPosition1, moves);
            leftPossible = true;
        }

        capturable = false;
        if ((i - playerPlusMinus) >= 0 && (i - playerPlusMinus) < usableBoard.length && (j - 1) < usableBoard.length && (j - 1) >= 0) {
            capturable = usableBoard[i - playerPlusMinus][j - 1] === playerPlusMinus || usableBoard[i - playerPlusMinus][j - 1] === 2 * playerPlusMinus;
        }

        if (onBoard2 && usableBoard[i - 2 * playerPlusMinus][j - 2] === 0 && capturable) {
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
            moves = doubleCapture(playerPlusMinus, usableBoard, newPosition2, moves);
        }
    }

    return moves;
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
            console.log("there is no moves");
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


function gameBetweenAI(playerWhite, playerBlack, depth = 4, showGame = false) {
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

    builBoard(board);
    while (isThereAMove(playerArray[indexPlayer], board) && nbMovesPlayed < 500) {
        console.log("number of moves played is " + nbMovesPlayed);
        printBoard(board, "initial board");
        result = pickMove(board, playerArray[indexPlayer], playerAI[indexPlayer], depth, -Infinity, +Infinity, isMaximising[indexPlayer]);
        printBoard(board, "board after pickMove");
        value = result[0];
        indexMove = result[1];
        moves = result[2];
        console.log("index move is " + indexMove);
        console.log("the value of the move chosen " + value);
        if (indexMove === -1 || moves === null) {
            console.log("c'est la merdeee");
            throw new Error("Error in pickMove");
        }
        board = boardAfterMove(moves, indexMove, playerArray[indexPlayer], board);
        indexPlayer = (indexPlayer + 1) % 2;
        console.log("the new indexPlayer is " + indexPlayer);
        nbMovesPlayed++;
        builBoard(board);
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

function builBoard(boardGiven) {
    let usableBoard = copyBoard(boardGiven);
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
            if (usableBoard[i][j] === 1) {
                occupied = "whitePiece";
                white++;
            } else if (usableBoard[i][j] === -1) {
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

function printBoard(board, string){
    console.log(string);
    for (let index = 0; index < board.length; index++) {
        console.log("row " + index + " : " + board[index]);        
    }
}

function copyBoard(board){
    let arr = new Array(board.length);
    let arr1 = new Array(board[0].length);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            arr1[j] = board[i][j];            
        }
        arr[i] = arr1;        
    }
    return arr;
}

//export { organizeGames, gameBetweenAI };