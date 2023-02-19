// Set up game board
const board = ['', '', '', '', '', '', '', '', ''];

// Player X always goes first
let currentPlayer = 'X';

// Get all cells on the board
const cells = document.querySelectorAll('.cell');

// Loop through each cell and add click event listener
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

// Function to handle cell click
function handleClick(e) {
  const cell = e.target;
  const cellIndex = cell.id;

  // Check if cell is already filled
  if (board[cellIndex] !== '') {
    return;
  }

  // Update board with current player's move
  board[cellIndex] = currentPlayer;

  // Update cell with current player's move
  cell.textContent = currentPlayer;

  // Check if current player has won
  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    resetGame();
    return;
  }

  // Check if there is a tie
  if (checkTie()) {
    alert('Tie game!');
    resetGame();
    return;
  }

  // Switch to the other player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // Add click event listener to the cell again
  cell.addEventListener('click', handleClick, { once: true });
}

// Function to check if the current player has won
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

// Function to check if there is a tie
function checkTie() {
  return board.every(cell => {
    return cell !== '';
  });
}

// Function to reset the game
function resetGame() {
  board.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
}

// Get reset button and add click event listener
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGame);
