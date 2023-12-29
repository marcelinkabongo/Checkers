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
            if (board[i][j] === player) {
                // careful with the sign of player, always a pain in the ass
                moves, capturePossible = markPossibleMoves(i, j, -player, board, moves, capturePossible);
            }
        }
    }
    return moves
}

function boardAfterMove(moves, indexMove, player, board) {
    let oldPosition = moves[indexMove][0];
    let newPosition = moves[indexMove][1];
    board[oldPosition[0]][oldPosition[1]] = 0;
    board[newPosition[0]][newPosition[1]] = player;
    for (let i = 0; i < moves[indexMove][2].length; i++) {
        capturedPosition = moves[indexMove][2][i];
        board[capturedPosition[0]][capturedPosition[1]] = 0;
    }
    return board, newPosition;
}

function doubleCapture(player, board, position, moves) {
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
        capturedPosition = (i + player, j - 1);
        move[2].push(capturedPosition);
        moves.push(move);
        moves = doubleCapture(player, board, newPosition2, moves);
    }

    return moves;
}