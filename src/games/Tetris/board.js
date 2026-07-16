import {
    ROWS,
    COLS
} from "./constant";

// Create Empty Board

export const createBoard = () => {
    return Array.from(
        { length: ROWS },
        () => Array(COLS).fill(0)
    );
};

// Draw Board

export const drawBoard = (
    ctx,
    board,
    blockSize,
    colors
) => {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const value = board[row][col];
            if (value !== 0) {
                ctx.fillStyle = colors[value];
                ctx.fillRect(
                    col * blockSize,
                    row * blockSize,
                    blockSize,
                    blockSize
                );
                ctx.strokeStyle = "#111";
                ctx.strokeRect(
                    col * blockSize,
                    row * blockSize,
                    blockSize,
                    blockSize
                );
            }
            else {

                ctx.fillStyle = "#181818";

                ctx.fillRect(
                    col * blockSize,
                    row * blockSize,
                    blockSize,
                    blockSize
                );
                ctx.strokeStyle = "#252525";
                ctx.strokeRect(
                    col * blockSize,
                    row * blockSize,
                    blockSize,
                    blockSize
                );
            }
        }
    }
};