import { createPiece } from "./pieces";

export const gameLoop = ({
    piece,
    lastDropTime,
    dropInterval
}) => {

    const now = Date.now();

    if (
        now - lastDropTime.current >=
        dropInterval
    ) {

        piece.y++;

        lastDropTime.current = now;

    }

};