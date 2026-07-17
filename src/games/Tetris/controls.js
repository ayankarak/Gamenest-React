import {
    isCollision
} from "./collision";
// Move Left
export const moveLeft = (
    board,
    piece
) => {
    piece.x--;
    if (isCollision(board, piece)) {
        piece.x++;
    }
};
// Move Right
export const moveRight = (
    board,
    piece
) => {
    piece.x++;
    if (isCollision(board, piece)) {
        piece.x--;
    }
};
// Soft Drop
export const softDrop = (
    board,
    piece
) => {
    piece.y++;
    if (isCollision(board, piece)) {
        piece.y--;
    }
};