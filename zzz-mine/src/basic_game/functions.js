function builBoard() {
  game.innerHTML = "";
  black = 0;
  white = 0;
  noPossibleMoves = true;
  PossibleCapture = false;


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
      if (board[i][j] === 1) {
        occupied = "whitePiece";
        white++;
      } else if (board[i][j] === -1) {
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
      if (currentPlayer === board[i][j]) {
        // -currentPlayer when using other function
        p = new Piece(i, j);
        if (noPossibleMoves && findPossibleNewPosition(p, -currentPlayer)) {
          noPossibleMoves = false;
        }

        if (!PossibleCapture && findPossibleNewPositionCapture(p, -currentPlayer)) {
          PossibleCapture = true;
        }
      }

      //add event listener to each piece
      piece.addEventListener("click", movePiece);

      col.appendChild(piece);

      col.setAttribute("class", "column " + caseType);
      row.appendChild(col);

    }

    game.appendChild(row);
  }
  //initialisation des variables
  readyToMove = null;
  newPiecesPositions = [];
  newPiecesPositionsCapture = [];

  if (black === 0 || white === 0 || noPossibleMoves) {
    if (black === 0 || currentPlayer === -1) {
      winnerPlayer = 1;
      console.log("white wins");
    } else {
      winnerPlayer = -1;
      console.log("black wins");
    }
  }
  //display the number of piece for each player
  displayCounter(black, white);
}

function displayCounter(black, white) {
  var blackContainer = document.getElementById("black-player-count-pieces");
  var whiteContainer = document.getElementById("white-player-count-pieces");
  blackContainer.innerHTML = black;
  whiteContainer.innerHTML = white;
}

function displayCurrentPlayer() {
  let container = document.getElementById("next-player");
  if (currentPlayer === -1) {
    container.setAttribute("class", "occupied blackPiece");
  } else {
    container.setAttribute("class", "occupied whitePiece");
  }
}

function modalOpen(black) {
  document.getElementById("winner").innerHTML = black === 0 ? "White" : "Black";
  document.getElementById("loser").innerHTML = black !== 0 ? "White" : "Black";
  modal.classList.add("effect");
}



//Moving the pieces





function markPossiblePosition(piece, player, number, capture) {
  if (capture === 0) {
    newPiecesPositions.push(new Piece(piece.row + player, piece.column + number));

  } else {
    newPiecesPositionsCapture.push(new Piece(piece.row + 2 * player, piece.column + number));
  }
}

function findPossibleNewPosition(piece, player) {
  let onBoard1 = (piece.row + player) >= 0 && (piece.row + player) < board.length && (piece.column + 1) < board.length;
  let onBoard2 = (piece.row + player) >= 0 && (piece.row + player) < board.length && (piece.column - 1) < board.length;
  let foundNP = false;

  if (onBoard1 && board[piece.row + player][piece.column + 1] === 0) {
    readyToMove = piece;
    markPossiblePosition(piece, player, 1, 0);
    foundNP = true;
  }

  if (onBoard2 && board[piece.row + player][piece.column - 1] === 0) {
    readyToMove = piece;
    markPossiblePosition(piece, player, -1, 0);
    foundNP = true;
  }
  return foundNP;
}

function findPossibleNewPositionCapture(piece, player) {
  let onBoard1 = (piece.row + 2 * player) >= 0 && (piece.row + 2 * player) < board.length && (piece.column + 2) < board.length;
  let onBoard2 = (piece.row + 2 * player) >= 0 && (piece.row + 2 * player) < board.length && (piece.column - 2) < board.length;
  let foundNPC = false;
  //player is the opposite of current player so no minus to check the color of the piece on the square
  if (onBoard1 && board[piece.row + 2 * player][piece.column + 2] === 0 && board[piece.row + player][piece.column + 1] === player) {
    readyToMove = piece;
    markPossiblePosition(piece, player, 2, 1);
    foundNPC = true;
  }

  if (onBoard2 && board[piece.row + 2 * player][piece.column - 2] === 0 && board[piece.row + player][piece.column - 1] === player) {
    readyToMove = piece;
    markPossiblePosition(piece, player, -2, 1);
    foundNPC = true;
  }
  //console.log("return findPossibleNewCapture " + foundNPC);
  return foundNPC;
}

function enableToMove(p, capture) {
  let found = false;
  let newPosition = null;

  if (capture === 0) {
    //console.log("here");
    newPiecesPositions.forEach((element) => {
      if (element.compare(p)) {
        found = true;
        newPosition = element;
        return;
      }
    });
    console.log("Last move was a normal move");
  }

  else if (capture === 1) {
    newPiecesPositionsCapture.forEach((element) => {
      if (element.compare(p)) {
        found = true;
        newPosition = element;
        return;
      }
    });

    console.log("Last move was a capture");
  }


  if (found) {
    console.log("currentPlayer = " + currentPlayer);
    // if the current piece can move on, edit the board and rebuild
    board[newPosition.row][newPosition.column] = currentPlayer;
    board[readyToMove.row][readyToMove.column] = 0;
    if (capture === 1) {
      board[(newPosition.row + readyToMove.row) / 2][(newPosition.column + readyToMove.column) / 2] = 0; //Captured is between former and new position
      newPiecesPositionsCapture = []
      let newPositionPiece = new Piece(newPosition.row, newPosition.column);
      if (findPossibleNewPositionCapture(newPositionPiece, -currentPlayer)) {
        console.log("in the double capture window");
        doubleCapture = true;
        doubleCapturePiece = newPositionPiece;
        currentPlayer = -currentPlayer;
      }
    }


    currentPlayer = -currentPlayer;
    console.log("currentPlayer = " + currentPlayer);

    displayCurrentPlayer();
    builBoard();
  } else {
    builBoard();
  }
}

function movePiece(e) {
  let piece = e.target;
  const row = parseInt(piece.getAttribute("row"));
  const column = parseInt(piece.getAttribute("column"));
  let p = new Piece(row, column);

  if (PossibleCapture) {
    console.log("There has to be a capture");
  }

  if (doubleCapture) {
    if (!p.compare(doubleCapturePiece)) {
      console.log("Double capture mannnnn")
    } else {
      findPossibleNewPositionCapture(doubleCapturePiece, -currentPlayer);
      doubleCapture = false;
      console.log(newPiecesPositionsCapture);
    }
  }

  else if (newPiecesPositionsCapture.length > 0) {
    //console.log([newPiecesPositionsCapture[0].row, newPiecesPositionsCapture[0].column]);
    enableToMove(p, 1);
  }


  else if (currentPlayer === board[row][column]) {
    // -currentPlayer bc coded for the opposite and easier to change that way
    findPossibleNewPosition(p, -currentPlayer);
    findPossibleNewPositionCapture(p, -currentPlayer);
  }



  else if (newPiecesPositions.length > 0 && !PossibleCapture) {
    enableToMove(p, 0);
  }


}