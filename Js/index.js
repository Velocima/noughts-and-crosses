const tiles = document.querySelectorAll('.tile');
const victor = document.querySelector('.win-message');
const playButton = document.querySelector('.win-screen');

let moveCounter = 0;
let playState = true;

const board = new Array(9).fill(false);

const makeMove = () => {
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
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
    return board[0] && board[0] === board[1] && board[1] === board[2] ? gameOver(board[0]) :
    board[3] && board[3] === board[4] && board[4] === board[5] ? gameOver(board[3]) :
    board[6] && board[6] === board[7] && board[7] === board[8] ? gameOver(board[6]) :
    // check columns
    board[0] && board[0] === board[3] && board[3] === board[6] ? gameOver(board[0]) : 
    board[1] && board[1] === board[4] && board[4] === board[7] ? gameOver(board[1]) : 
    board[2] && board[2] === board[5] && board[5] === board[8] ? gameOver(board[2]) :
    // check diagonals
    board[0] && board[0] === board[4] && board[4] === board[8] ? gameOver(board[0]) : 
    board[2] && board[2] === board[4] && board[4] === board[6] ? gameOver(board[2]) :
    true;
}

const gameOver = (winner) => {
    playState = false;
    playButton.classList.add('win-screen-active');
    if(winner) {
        victor.innerHTML = `${winner} win!`;
    } else {
        victor.innerHTML = "It's a draw!";
    }
}

const resetBoard = () => {
    playState = true;
    moveCounter = 0;
    playButton.classList.remove('win-screen-active');
    board.fill(false);
}

const playAgain = () => {
    playButton.addEventListener('click', () => {
        resetBoard();
        tiles.forEach(tile => {
            tile.children[0].classList.remove('token-active');
            tile.classList.remove('tile-active');
        })
    });
}

playAgain();
makeMove();