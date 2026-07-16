import {
    isCollision
} from "./collision";

export const rotatePiece = (
    board,
    piece
) => {

    const original = piece.shape;

    const rotated =
        original[0].map((_, i) =>
            original.map(row => row[i]).reverse()
        );

    piece.shape = rotated;

    if (isCollision(board, piece)) {

        piece.shape = original;

    }

};