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

function markPossibleMoves(i, j, player, board, moves, capturePossible) {
    let onBoard1 = (i + 2 * player) >= 0 && (i + 2 * player) < board.length && (j + 2) < board.length;
    let onBoard2 = (i + 2 * player) >= 0 && (i + 2 * player) < board.length && (j - 2) < board.length;

    if (onBoard1 && board[i + 2 * player][j + 2] === 0 && board[i + player][j + 1] === player) {
        newPosition = (i + 2 * player, j + 2);
        oldPosition = (i, j);
        capturedPosition = [(i + player, j + 1)];
        let move = [oldPosition, newPosition, capturedPosition];
        moves.push(move);
        capturePossible = true;
        moves = doubleCapture(player, board, newPosition, moves);
    }

    if (onBoard2 && board[i + 2 * player][j - 2] === 0 && board[i + player][j - 1] === player) {
        newPosition = (i + 2 * player, j - 2);
        oldPosition = (i, j);
        capturedPosition = [(i + player, j - 1)];
        let move = [oldPosition, newPosition, capturedPosition];
        moves.push(move);
        capturePossible = true;
        moves = doubleCapture(player, board, newPosition, moves);
    }

    if (abs(board[i][j]) === 2) {
        let onBoard1 = (i - 2 * player) >= 0 && (i - 2 * player) < board.length && (j + 2) < board.length;
        let onBoard2 = (i - 2 * player) >= 0 && (i - 2 * player) < board.length && (j - 2) < board.length;

        if (onBoard1 && board[i - 2 * player][j + 2] === 0 && board[i - player][j + 1] === player) {
            newPosition = (i - 2 * player, j + 2);
            oldPosition = (i, j);
            capturedPosition = [(i - player, j + 1)];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
            capturePossible = true;
            moves = doubleCapture(player, board, newPosition, moves, king = true);
        }

        if (onBoard2 && board[i - 2 * player][j - 2] === 0 && board[i - player][j - 1] === player) {
            newPosition = (i - 2 * player, j - 2);
            oldPosition = (i, j);
            capturedPosition = [(i - player, j - 1)];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
            capturePossible = true;
            moves = doubleCapture(player, board, newPosition, moves, king = true);
        }

        if (!capturePossible) {
            onBoard1 = (i - player) >= 0 && (i - player) < board.length && (j + 1) < board.length;
            onBoard2 = (i - player) >= 0 && (i - player) < board.length && (j - 1) < board.length;
            if (onBoard1 && board[i - player][j + 1] === 0) {
                newPosition = (i - player, j + 1);
                oldPosition = (i, j);
                capturedPosition = [];
                let move = [oldPosition, newPosition, capturedPosition];
                moves.push(move);
            }

            if (onBoard2 && board[i - player][j - 1] === 0) {
                newPosition = (i - player, j - 1);
                oldPosition = (i, j);
                capturedPosition = [];
                let move = [oldPosition, newPosition, capturedPosition];
                moves.push(move);
            }
        }

    }

    if (!capturePossible) {
        onBoard1 = (i + player) >= 0 && (i + player) < board.length && (j + 1) < board.length;
        onBoard2 = (i + player) >= 0 && (i + player) < board.length && (j - 1) < board.length;
        if (onBoard1 && board[i + player][j + 1] === 0) {
            newPosition = (i + player, j + 1);
            oldPosition = (i, j);
            capturedPosition = [];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
        }

        if (onBoard2 && board[i + player][j - 1] === 0) {
            newPosition = (i + player, j - 1);
            oldPosition = (i, j);
            capturedPosition = [];
            let move = [oldPosition, newPosition, capturedPosition];
            moves.push(move);
        }
    }

    return moves, capturePossible;
}


function findEveryMove(player, board) {
    let moves = [];
    let capturePossible = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] * player < 0) {
                // careful with the sign of player, always a pain in the ass
                moves, capturePossible = markPossibleMoves(i, j, player, board, moves, capturePossible);
            }
        }
    }
    return moves
}

function isThereAMove(player, board) {
    let moves = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] * player < 0) {
                // careful with the sign of player, always a pain in the ass
                moves, capturePossible = markPossibleMoves(i, j, player, board, moves, capturePossible);
                if (moves.length > 0) {
                    return true;
                }
            }

        }
    }
    return false;
}

function boardAfterMove(moves, indexMove, player, board) {
    let oldPosition = moves[indexMove][0];
    let newPosition = moves[indexMove][1];
    board[newPosition[0]][newPosition[1]] = board[oldPosition[0]][oldPosition[1]];
    board[oldPosition[0]][oldPosition[1]] = 0;
    if (player === -1) { //white
        if (newPosition[0] === 0) {
            board[newPosition[0]][newPosition[1]] = 2;
        }
    }
    if (player === 1) { //black
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

function doubleCapture(player, board, position, moves, king = false) {
    i = position[0];
    j = position[1];
    let move;
    let onBoard1 = (i + 2 * player) >= 0 && (i + 2 * player) < board.length && (j + 2) < board.length;
    let onBoard2 = (i + 2 * player) >= 0 && (i + 2 * player) < board.length && (j - 2) < board.length;
    let leftPossible = false;
    if (onBoard1 && board[i + 2 * player][j + 2] === 0 && board[i + player][j + 1] === player) {
        newPosition1 = (i + 2 * player, j + 2);
        move = moves.pop();
        move[1] = newPosition1;
        capturedPosition = (i + player, j + 1);
        move[2].push(capturedPosition);
        moves.push(move);
        moves = doubleCapture(player, board, newPosition1, moves);
        leftPossible = true;
    }



    if (onBoard2 && board[i + 2 * player][j - 2] === 0 && board[i + player][j - 1] === player) {
        move = moves.pop();
        if (leftPossible) {
            moves.push(move)
        }
        move[1] = (i + 2 * player, j - 2);
        capturedPositions = move[2];
        if (capturedPositions.length > 0) {
            capturedPosition = capturedPositions.pop();
            while (capturedPosition[0] * player > (i + player) * player) {
                capturedPosition = capturedPositions.pop();
            }
        }
        capturedPosition = (i + player, j - 1);
        capturedPositions.push(capturedPosition);
        move[2] = capturedPositions;
        moves.push(move);
        moves = doubleCapture(player, board, newPosition2, moves);
    }

    if (king) {
        onBoard1 = (i - 2 * player) >= 0 && (i - 2 * player) < board.length && (j + 2) < board.length;
        onBoard2 = (i - 2 * player) >= 0 && (i - 2 * player) < board.length && (j - 2) < board.length;
        let leftPossible = false;
        if (onBoard1 && board[i - 2 * player][j + 2] === 0 && board[i - player][j + 1] === player) {
            newPosition1 = (i - 2 * player, j - 2);
            move = moves.pop();
            move[1] = newPosition1;
            capturedPosition = (i - player, j + 1);
            move[2].push(capturedPosition);
            moves.push(move);
            moves = doubleCapture(player, board, newPosition1, moves);
            leftPossible = true;
        }



        if (onBoard2 && board[i - 2 * player][j - 2] === 0 && board[i - player][j - 1] === player) {
            move = moves.pop();
            if (leftPossible) {
                moves.push(move)
            }
            move[1] = (i - 2 * player, j - 2);
            capturedPositions = move[2];
            if (capturedPositions.length > 0) {
                capturedPosition = capturedPositions.pop();
                while (capturedPosition[0] * player > (i - player) * player) {
                    capturedPosition = capturedPositions.pop();
                }
            }
            capturedPosition = (i - player, j - 1);
            capturedPositions.push(capturedPosition);
            move[2] = capturedPositions;
            moves.push(move);
            moves = doubleCapture(player, board, newPosition2, moves);
        }
    }

    return moves;
}

function boardToInput(board, player, kingValue) {
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
    nbMoves = findEveryMove(player, board).length;
    input[32] = player;
    input[33] = nbMoves / 64; //arbitrary to have smth between 0 and 1
    return input;
}

function pickMove(board, player, playerAI, depth, alpha, beta, isMaximising) {
    //use seedTree = null when you create the first tree
    //use alpha = -Infinity
    //use beta = +Infinity
    //depth = 2n
    brain = playerAI.brain;
    if (depth === 0) {
        input = boardToInput(board, player, brain.kingValue);
        eval = brain.feedForward(input);
        return (eval, -1, null);
    }
    moves = findEveryMove(player, board);
    index = 0;
    if (isMaximising) {
        bestVal = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            newBoard = boardAfterMove(moves, i, player, board);
            result = createTree(newBoard, -player, playerAI, depth - 1, alpha, beta, false);
            eval = result[0];
            index = result[1];
            if (eval > bestVal) {
                bestVal = eval;
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
            newBoard = boardAfterMove(moves, i, player, board);
            result = createTree(newBoard, -player, playerAI, depth - 1, alpha, beta, true);
            eval = result[0];
            index = result[1];
            if (eval < minVal) {
                bestVal = eval;
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



function game(playerWhite, playerBlack, depth = 4) {
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
    player = (-1, 1);
    playerAI = (playerWhite, playerBlack);
    isMaximising = (true, false);
    indexPlayer = 0;
    nbMovesPlayed = 0;
    while (isThereAMove(player[indexPlayer], board) && nbMovesPlayed < 500) {
        value, indexMove, moves = pickMove(board, player[indexPlayer], playerAI[indexPlayer], depth, -Infinity, +Infinity, isMaximising[indexPlayer]);
        if (indexMove === -1 || moves === null) {
            throw new Error("Error in pickMove");
        }
        board = boardAfterMove(moves, indexMove, player[indexPlayer], board);
        indexPlayer = (indexPlayer + 1) % 2;
        nbMovesPlayed++;
    }
    if (nbMovesPlayed === 500) {
        playerWhite.score += 1;
        playerBlack.score += 1;
    }
    else {
        playerAI[indexPlayer].score += 3;
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
            const game1 = (i, j);
            const game2 = (j, i);

            games.push(game1, game2);
        }
    }
    return games;
}

