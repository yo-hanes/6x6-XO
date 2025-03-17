const board = document.getElementById("board");
const totalCells = 6;  // 6x6 grid
let currentPlayer = "red"; // red starts
let gameOver = false;
let moves = 0;

// Create a 6x6 board dynamically
for (let i = 0; i < totalCells * totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    board.appendChild(cell);
}

const cells = Array.from(board.getElementsByClassName("cell"));

// Event listener for cell clicks
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameOver && !cell.classList.contains("red") && !cell.classList.contains("blue")) {
            cell.classList.add(currentPlayer);
            cell.textContent = currentPlayer === "red" ? "X" : "O"; // Add X or O to the cell
            moves++;
            if (checkWinner()) {
                showWinner(currentPlayer);
            } else if (moves === totalCells * totalCells) {
                showWinner(null); // It's a draw
            } else {
                currentPlayer = currentPlayer === "red" ? "blue" : "red";
            }
        }
    });
});

// Check if the current player has won (four in a row)
function checkWinner() {
    const winLength = 4;  // Winning length is 4 cells

    // Check all horizontal, vertical, and diagonal combinations for 4 same-colored cells
    for (let row = 0; row < totalCells; row++) {
        for (let col = 0; col < totalCells; col++) {
            if (cells[row * totalCells + col].classList.contains(currentPlayer)) {

                // Horizontal check (4 cells in a row)
                if (col + winLength <= totalCells) {
                    let horizontalWin = true;
                    for (let i = 1; i < winLength; i++) {
                        if (!cells[row * totalCells + (col + i)].classList.contains(currentPlayer)) {
                            horizontalWin = false;
                            break;
                        }
                    }
                    if (horizontalWin) return true;
                }

                // Vertical check (4 cells in a column)
                if (row + winLength <= totalCells) {
                    let verticalWin = true;
                    for (let i = 1; i < winLength; i++) {
                        if (!cells[(row + i) * totalCells + col].classList.contains(currentPlayer)) {
                            verticalWin = false;
                            break;
                        }
                    }
                    if (verticalWin) return true;
                }

                // Diagonal check (4 cells in a diagonal from top-left to bottom-right)
                if (row + winLength <= totalCells && col + winLength <= totalCells) {
                    let diagonalWin = true;
                    for (let i = 1; i < winLength; i++) {
                        if (!cells[(row + i) * totalCells + (col + i)].classList.contains(currentPlayer)) {
                            diagonalWin = false;
                            break;
                        }
                    }
                    if (diagonalWin) return true;
                }

                // Diagonal check (4 cells in a diagonal from top-right to bottom-left)
                if (row + winLength <= totalCells && col - winLength + 1 >= 0) {
                    let diagonalWin = true;
                    for (let i = 1; i < winLength; i++) {
                        if (!cells[(row + i) * totalCells + (col - i)].classList.contains(currentPlayer)) {
                            diagonalWin = false;
                            break;
                        }
                    }
                    if (diagonalWin) return true;
                }
            }
        }
    }
    return false;
}

// Show winner message
function showWinner(winner) {
    gameOver = true;
    const winnerPopup = document.getElementById("winner-popup");
    const winnerMessage = document.getElementById("winner-message");
    if (winner) {
        winnerMessage.textContent = `${winner === "red" ? "Player one" : "player two"} Wins!`;
    } else {
        winnerMessage.textContent = "It's a Draw!";
    }
    winnerPopup.style.display = "block";
}

// Reset the game
document.getElementById("reset-button").addEventListener("click", () => {
    cells.forEach(cell => cell.classList.remove("red", "blue"));
    cells.forEach(cell => cell.textContent = ""); // Clear the text (X/O)
    currentPlayer = "red";
    gameOver = false;
    moves = 0;
    document.getElementById("winner-popup").style.display = "none";
});
