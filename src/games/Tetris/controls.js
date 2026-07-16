import {
    COLS
} from "./constant";

import {
    isCollision
} from "./collision";

export const moveLeft = (
    board,
    piece
) => {

    piece.x--;

    if (isCollision(board, piece)) {

        piece.x++;

    }

};

export const moveRight = (
    board,
    piece
) => {

    piece.x++;

    if (isCollision(board, piece)) {

        piece.x--;

    }

};

export const softDrop = (
    board,
    piece
) => {

    piece.y++;

    if (isCollision(board, piece)) {

        piece.y--;

    }

};