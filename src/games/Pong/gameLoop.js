import { movePlayer } from "./paddle";
import { moveAI } from "./ai";
import { moveBall } from "./ball";
import {checkWallCollision,checkPaddleCollision} from "./collision";
import { updateScore } from "./score";
import { resetBall } from "./ball";
export const gameLoop = ({
    player,
    ai,
    ball,
    keys,
    difficulty,
    setPlayerScore,
    setAiScore
}) => {

    // Player Movement

    movePlayer(
        player,
        keys
    );

    // AI Movement

    moveAI(
        ai,
        ball,
        difficulty
    )
    // Ball Movement
    moveBall(
        ball
    );

    // Wall Collision

    checkWallCollision(
        ball
    );

    // Paddle Collision

    checkPaddleCollision(
        ball,
        player,
        ai
    );

    // Score Update
    updateScore({
        ball,
        setPlayerScore,
        setAiScore,
        resetBall
    });
};