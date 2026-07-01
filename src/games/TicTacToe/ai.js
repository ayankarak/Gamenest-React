import { getWinner } from "./winner";

export function findWinningMove(board, player) {

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            const tempBoard = [...board];

            tempBoard[i] = player;

            const result = getWinner(tempBoard);

            if (result.winner === player) {

                return i;

            }

        }

    }

    return null;

}

export function minimax(board, depth, isMaximizing) {

    const result = getWinner(board);

    if (result.winner === "O") return 10 - depth;

    if (result.winner === "X") return depth - 10;

    if (result.winner === "Draw") return 0;

    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                board[i] = "O";

                const score = minimax(board, depth + 1, false);

                board[i] = "";

                bestScore = Math.max(bestScore, score);

            }

        }

        return bestScore;

    }

    else {

        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                board[i] = "X";

                const score = minimax(board, depth + 1, true);

                board[i] = "";

                bestScore = Math.min(bestScore, score);

            }

        }

        return bestScore;

    }

}

export function getBestMove(board) {

    let bestScore = -Infinity;

    let move = null;

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            board[i] = "O";

            const score = minimax(board, 0, false);

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;

                move = i;

            }

        }

    }

    return move;

}

export function computerMove({

    board,

    difficulty,

    setBoard,

    setCurrentPlayer,

    setWinner,

    setWinningCells,

    setIsThinking

}) {

    setIsThinking(true);

    setTimeout(() => {

        let move = null;

        // EASY
        if (difficulty === "easy") {

            const emptyCells = board
                .map((cell, index) => cell === "" ? index : null)
                .filter(index => index !== null);

            if (emptyCells.length) {

                move = emptyCells[
                    Math.floor(Math.random() * emptyCells.length)
                ];

            }

        }

        // MEDIUM
        else if (difficulty === "medium") {

            move = findWinningMove(board, "O");

            if (move === null)
                move = findWinningMove(board, "X");

            if (move === null) {

                const emptyCells = board
                    .map((cell, index) => cell === "" ? index : null)
                    .filter(index => index !== null);

                move = emptyCells[
                    Math.floor(Math.random() * emptyCells.length)
                ];

            }

        }

        // HARD
        else {

            move = getBestMove(board);

        }

        if (move === null) {

            setIsThinking(false);

            return;

        }

        const newBoard = [...board];

        newBoard[move] = "O";

        setBoard(newBoard);

        const result = getWinner(newBoard);

        if (result.winner) {

            setWinner(result.winner);

            setWinningCells(result.winningCells);

        }
        else {

            setCurrentPlayer("X");

        }

        setIsThinking(false);

    }, 800);

}