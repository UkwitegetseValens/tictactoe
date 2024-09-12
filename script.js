document.addEventListener('DOMContentLoaded', () => {
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.querySelector('.game-board');
    const winningMessageElement = document.getElementById('winningMessage');
    const winningMessageTextElement = document.getElementById('winningMessageText');
    const restartButton = document.getElementById('restartButton');
    const gameOverButton = document.getElementById('gameOverButton');
    const turnIndicator = document.getElementById('turnIndicator');
    let circleTurn;

    startGame();

    restartButton.addEventListener('click', startGame);
    gameOverButton.addEventListener('click', startGame);

    function startGame() {
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setBoardHoverClass();
        winningMessageElement.classList.remove('show');
        gameOverButton.classList.add('hidden');  // Hide Game Over button at the start
        updateTurnIndicator();  // Update turn display at game start
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? O_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
            updateTurnIndicator();  // Update turn display after each move
        }
    }

    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!';
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        }
        winningMessageElement.classList.add('show');
        gameOverButton.classList.remove('hidden');  // Show Game Over button after the game ends
    }

    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        circleTurn = !circleTurn;
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);
        if (circleTurn) {
            board.classList.add(O_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    }

    // Update the turn indicator based on who's turn it is
    function updateTurnIndicator() {
        turnIndicator.innerText = circleTurn ? "Player O's Turn" : "Player X's Turn";
    }
});
