import { WINNING_COMBINATIONS } from "./constants";

export function getWinner(board) {

    // Check Winner
    for (const combination of WINNING_COMBINATIONS) {

        const [a, b, c] = combination;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            return {
                winner: board[a],
                winningCells: combination
            };

        }

    }

    // Check Draw
    if (board.every(cell => cell !== "")) {

        return {
            winner: "Draw",
            winningCells: []
        };

    }

    // Game Continue
    return {
        winner: null,
        winningCells: []
    };

}