const tiles = document.querySelectorAll('.tile');
let moveCounter = 0;
const board = new Array(9).fill(false);

const makeMove = () => {
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            if (tile.children[0].classList.value.includes('tile-active') || tile.children[1].classList.value.includes('tile-active')) return;
            if(moveCounter % 2) {
               tile.children[0].classList.add('tile-active');
               board[index] = "x";
               moveCounter++;
            }
            else {
                tile.children[1].classList.add('tile-active');
                board[index] = "o";
                moveCounter++;
            }
        })
    })
}


makeMove();