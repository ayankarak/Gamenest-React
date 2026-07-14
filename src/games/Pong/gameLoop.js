import { movePlayer } from "./paddle";

import { moveAI } from "./ai";

import { moveBall } from "./ball";

import {

    checkWallCollision,

    checkPaddleCollision

} from "./collision";

export const gameLoop = ({

    player,

    ai,

    ball,

    keys,

    difficulty

}) => {

    // ==========================
    // Player
    // ==========================

    movePlayer(

        player,

        keys

    );

    // ==========================
    // AI
    // ==========================

    moveAI(

        ai,

        ball,

        difficulty

    );

    // ==========================
    // Ball
    // ==========================

    moveBall(

        ball

    );

    // ==========================
    // Wall Collision
    // ==========================

    checkWallCollision(

        ball

    );

    // ==========================
    // Paddle Collision
    // ==========================

    checkPaddleCollision(

        ball,

        player,

        ai

    );

};