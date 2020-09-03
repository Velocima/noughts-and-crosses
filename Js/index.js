const tiles = document.querySelectorAll('.tile');
let moveCounter = 0;
let playState = true;
const board = new Array(9).fill(false);

const makeMove = () => {
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            if (
                tile.children[0].classList.value.includes('tile-active') || 
                tile.children[1].classList.value.includes('tile-active') ||
                !playState
            ) return;
            

            if(moveCounter % 2) {
               tile.children[0].classList.add('tile-active');
               board[index] = "Noughts";
               moveCounter++;
            }
            else {
                tile.children[1].classList.add('tile-active');
                board[index] = "Crosses";
                moveCounter++;
            }
            if (moveCounter>4) {
                checkWin();
            }
        })
    })
}

const checkWin = () => {
    // check rows
    board[0] && board[0] === board[1] && board[1] === board[2] ? gameOver(board[0]) :
    board[3] && board[3] === board[4] && board[4] === board[5] ? gameOver(board[3]) :
    board[6] && board[6] === board[7] && board[7] === board[8] ? gameOver(board[6]) :
    // check columns
    board[0] && board[0] === board[3] && board[3] === board[6] ? gameOver(board[0]) : 
    board[1] && board[1] === board[4] && board[4] === board[7] ? gameOver(board[1]) : 
    board[2] && board[2] === board[5] && board[5] === board[8] ? gameOver(board[2]) :
    // check diagonals
    board[0] && board[0] === board[4] && board[4] === board[8] ? gameOver(board[0]) : 
    board[2] && board[2] === board[4] && board[4] === board[6] ? gameOver(board[2]) :
    false;
}

const gameOver = (winner) => {
    playState = false;
    const victor = document.querySelector('.winner');
    victor.innerHTML = winner;
}

makeMove();