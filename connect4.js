let playerRed = 'R'; 
let playerYellow = 'Y'; 
let currPlayer = playerRed; // we are starting with the red player 

let gameOver = false; 
let board; 
let currColumns; 

let rows = 6; 
let columns = 7; //since the board is basically a 6 x 7 

// when the page loads, run this function 
window.onload = function() {
    setGame(); 
}

// this function is to basically to put the id on the tiles based on their coordinates
// top left being with the id of 0-0, the one on the right being 0-1 and so forth 
function setGame() {
    board = []; 
    currColumns = [5,5,5,5,5,5,5]; 

    for (let r = 0; r < rows; r++){
        let row = []; 
        for (let c = 0; c < columns; c++) {

            row.push(' '); 

            // And we get something like this <div class='tile' id='0-0'></div>
            // and we put it in the div of our html element with the id of 'board'
            let tile = document.createElement('div'); 
            tile.id = r.toString() + "-" + c.toString(); 
            tile.classList.add('tile'); 
            document.getElementById('board').append(tile); 
            // this event listener is for when they click a piece goes there 
            tile.addEventListener('click', setPiece); 
        }
        board.push(row); 
    }
}

function setPiece () {
    if (gameOver) {
        return; 
    }

    let coords = this.id.split("-"); // the coordinates are like this "0-0" and with this line of code we turn them into this ['0','0']
    let r = parseInt(coords[0]); // parseint basically gets a string and returns a int 
    let c = parseInt(coords[1]); 
    
    r = currColumns[c];
    if (r < 0) {
        return; 
    }
    // here is where we basically put the color into the div that the player clicked
    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString()); // this is basically a word that connected to the parent, in this case tile = this; is the same as the parent tile 
    // the tile = document.createEleement('div'); 
    if (currPlayer == playerRed) {
        tile.classList.add('red-piece'); 
        currPlayer = playerYellow; 
    } else {
        tile.classList.add('yellow-piece'); 
        currPlayer = playerRed; 
    }

    r -= 1; // updating the row height for the columns
    currColumns[c] = r; // updating the array

    checkWinner(); 
}


function checkWinner() {
    // we are checking if the connect 4 is horizontally 
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' '){
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r,c); 
                    return;
                }
            }
        }
    }

    // vertically 
    for (let c = 0; c < columns; c++) { 
        for (let r = 0; r < rows-3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r,c); 
                    return; 
                }
            }
        }
    }

    // anti diagonally 
    for (let r=0; r < rows-3; r++) {
        for (let c = 0; c < columns - 3; c++){
            if(board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r,c); 
                    return; 
                }
            }
        }
    }

    // diagonally 
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns -3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r,c); 
                    return; 
                }
            }
        }
    }
}

function setWinner(r,c) {
    let winner = document.getElementById('winner'); 
    if (board[r][c] == playerRed) {
        winner.innerText = 'Red wins'; 
    } else {
        winner.innerText = 'Yellow wins'; 
    }

    endGame(); 
  }

  function endGame() {
    // TODO: pop up alert message
    alert(`${winner.innerText}`);
    gameOver = true; 
}


