import {
    ROWS,
    COLS
} from "./constant";

export const isCollision = (
    board,
    piece
) => {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] === 0)
                continue;
            const newX = piece.x + x;
            const newY = piece.y + y;
            // Left Right Bottom
            if (
                newX < 0 ||
                newX >= COLS ||
                newY >= ROWS
            ) {
                return true;
            }
            // Existing Block
            if (
                newY >= 0 &&
                board[newY][newX] !== 0
            ) {
                return true;
            }
        }
    }
    return false;
};