const tiles = document.querySelectorAll('.tile');
const victor = document.querySelector('.win-message');
const playButton = document.querySelector('.win-screen');
const lines = document.querySelectorAll('.line');
const scores = document.querySelector('.score');
const resetButton = document.querySelector('.reset');

let moveCounter = 0;
let playState = true;
let noughtWins = 0;
let crossWins = 0;
let drawCounter = 0;

const board = new Array(9).fill(false);

const makeMove = () => {
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            // return if tile is in play or game is not in play
            if (
                tile.children[0].classList.value.includes('token-active') || 
                !playState
            ) return;
            
            if(moveCounter % 2) {
                tile.children[0].innerHTML = "O";
                tile.children[0].classList.add('token-active');
                tile.classList.add('tile-active');
                board[index] = "Noughts";
                moveCounter++;
            }
            else {
                tile.children[0].innerHTML = "X";
                tile.children[0].classList.add('token-active');
                tile.classList.add('tile-active');
                board[index] = "Crosses";
                moveCounter++;
            }
            // check if game has been won or drawn
            if (moveCounter>4) {
                checkWin();
                if(moveCounter === 9 && checkWin()) {
                    gameOver(false);
                }
            }
        })
    })
}

const checkWin = () => {
    // check rows
    return board[0] && board[0] === board[1] && board[1] === board[2] ? gameOver(board[0], 0) :
    board[3] && board[3] === board[4] && board[4] === board[5] ? gameOver(board[3], 1) :
    board[6] && board[6] === board[7] && board[7] === board[8] ? gameOver(board[6], 2) :
    // check columns
    board[0] && board[0] === board[3] && board[3] === board[6] ? gameOver(board[0], 3) : 
    board[1] && board[1] === board[4] && board[4] === board[7] ? gameOver(board[1], 4) : 
    board[2] && board[2] === board[5] && board[5] === board[8] ? gameOver(board[2], 5) :
    // check diagonals
    board[0] && board[0] === board[4] && board[4] === board[8] ? gameOver(board[0], 7) : 
    board[2] && board[2] === board[4] && board[4] === board[6] ? gameOver(board[2], 6) :
    true;
}

// ends the game, bringing up the end screen. decalares a winner. updates the scoreboard. called when there is a win or draw
const gameOver = (winner, line) => {
    playState = false;
    if (line < 6) {
        lines[line].classList.add("line-won");
    } else if(line<8) {
        lines[line].classList.add(`line-${line + 1}-won`);
    }
    updateScore(winner);
    if(winner) {
        victor.innerHTML = `${winner} win!`;
    } else {
        victor.innerHTML = "It's a draw!";
    }
    setTimeout(() => {playButton.classList.add('win-screen-active')}, 800);
}

// reset the board for a new game. called in playAgain 
const resetBoard = () => {
    playState = true;
    moveCounter = 0;
    playButton.classList.remove('win-screen-active');
    board.fill(false);
    lines.forEach(line => {
        line.classList.remove('line-won', "line-7-won", "line-8-won")
    })
}

// starts a new game when end screen is clicked
const playAgain = () => {
    playButton.addEventListener('click', () => {
        resetBoard();
        tiles.forEach(tile => {
            tile.children[0].classList.remove('token-active');
            tile.classList.remove('tile-active');
        })
    });
}

// updates the score board. called in gameOver
const updateScore = (winner) => {
    if(winner == "Noughts") {
        noughtWins++
        scores.children[0].innerHTML = `Noughts: ${noughtWins}`
    } else if (winner == "Crosses") {
        crossWins++
        scores.children[1].innerHTML = `Crosses: ${crossWins}`
    } else {
        drawCounter++
        scores.children[2].innerHTML = `Draws: ${drawCounter}`
    }
}

// sets all scores back to 0 when button is clicked
resetButton.onclick = () => {
    noughtWins = 0;
    crossWins = 0;
    drawCounter = 0;
    scores.children[0].innerHTML = `Noughts: ${noughtWins}`
    scores.children[1].innerHTML = `Crosses: ${crossWins}`
    scores.children[2].innerHTML = `Draws: ${drawCounter}`
}

// starts game
playAgain();
makeMove();
