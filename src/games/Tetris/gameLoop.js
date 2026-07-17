import { createPiece } from "./pieces";
import { isCollision } from "./collision";
import {
    mergePiece,
    clearLines
} from "./board";
import {
    updateScore
} from "./score";

export const gameLoop = ({

    board,
    piece,
    nextPiece,
    setNextPiece,
    lastDropTime,
    dropInterval,
    setScore,
    setHighScore,
    setGameOver

}) => {
    const now = Date.now();
    if (
        now - lastDropTime.current <
        dropInterval
    ) {
        return;
    }
    // Move Piece Down
    piece.y++;
    // Collision
    if (
        isCollision(
            board,
            piece
        )
    ) {
        piece.y--;
        // Merge Piece
        mergePiece(
            board,
            piece
        );
        // Clear Lines
        const lines = clearLines(board);
        // Update Score
        updateScore({
            lines,
            setScore,
            setHighScore
        });

        // Spawn New Piece
        //const nextPiece = createPiece();
        piece.shape = nextPiece.shape;
        piece.x = nextPiece.x;
        piece.y = nextPiece.y;
        setNextPiece(createPiece());
        // GAME OVER

        if (
            isCollision(board,piece)
        ) {
            setGameOver(true);
            return;
        }
    }

    lastDropTime.current = now;

};