//Game Logic

const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const updateBoard = (index, mark) => { board[index] = mark; };
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, updateBoard, resetBoard };
}

)();

const Player = (name, marker) => {
    return { name, marker };
}

const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const isGameOver = () => gameOver;

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const reset = () => {
        currentPlayer = player1;
        gameOver = false;
    }

    const getCurrentPlayer = () => currentPlayer;

    const playTurn = (index) => {
        const board = Gameboard.getBoard();

        if (gameOver) return;

        if (board[index] !== "") return;

        Gameboard.updateBoard(index, currentPlayer.marker);

        if (checkWinner(board, currentPlayer.marker)) {
            gameOver = true;
            return `${currentPlayer.name} wins!`;
        }

        if (board.every(cell => cell !== "")) {
            gameOver = true;
            return "It's a tie!";
        }

        switchTurn();
        return null;
    };

    const checkWinner = (board, marker) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6] //diagnol
        ];

        return winConditions.some(condition =>
            condition.every(index => board[index] === marker)
        );
    };

    return { playTurn, reset, getCurrentPlayer, isGameOver };
})();

function printBoard(playerChoice) {
    GameController.playTurn(playerChoice);
    const board = Gameboard.getBoard();
    console.log("\n----------\n")
    console.log(board.slice(0, 3));
    console.log(board.slice(3, 6));
    console.log(board.slice(6, 9));
}

//DOM JS

const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const messageDiv = document.getElementById("message");
    const currentPlayerDiv = document.getElementById("currentPlayer");
    const restartBtn = document.getElementById("restartBtn");

    //Render the board to the screen
    const render = () => {
        const currentPlayer = GameController.getCurrentPlayer();

        currentPlayerDiv.textContent = GameController.isGameOver()
            ? ""//hide when game is over
            : `Current Player: ${currentPlayer.name} (${currentPlayer.marker})`;
        
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    //Add click events to cells
    const setup = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const index = cell.getAttribute("data-index");
                const result = GameController.playTurn(index);
                render();

                if (result) {
                    messageDiv.textContent = result;
                }
            });
        });

        restartBtn.addEventListener("click", () => {
            Gameboard.resetBoard();
            messageDiv.textContent = "";
            GameController.reset();
            render();
        })

    };

    return { render, setup };
})();

DisplayController.setup();
DisplayController.render();
