import { createPiece } from "./pieces";

import {isCollision} from "./collision";

import {mergePiece, clearLines} from "./board";
import { updateScore } from "./score";

export const gameLoop = ({

    board,

    piece,

    lastDropTime,

    dropInterval,
    setScore

}) => {

    const now = Date.now();

    if (
        now - lastDropTime.current <
        dropInterval
    ) {
        return;
    }

    piece.y++;

    if (
        isCollision(
            board,
            piece
        )
    ) {

        piece.y--;

        mergePiece(
            board,
            piece
        );
        // updateScore({
        //     lines,
        //     setScore,
        //     setHighScore
        // });

        const nextPiece = createPiece();

        piece.shape = nextPiece.shape;

        piece.x = nextPiece.x;

        piece.y = nextPiece.y;

    }

    lastDropTime.current = now;

};