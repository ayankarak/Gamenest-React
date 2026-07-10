import { updateBird } from "./bird";
import { PIPE_WIDTH } from "./constants";

import {
    updatePipes,
    removeOldPipes,
    addPipe
} from "./pipe";

import { checkCollision } from "./collision";

export function gameLoop({

    bird,
    pipes,
    gameState,
    scoreRef,
    setScore,
    onGameOver

}) {

    // ---------------- Bird ----------------

    updateBird(bird);

    // ---------------- Pipes ----------------

    updatePipes(

        pipes,

        gameState.pipeSpeed

    );

    const filtered = removeOldPipes(pipes);

    pipes.length = 0;

    pipes.push(...filtered);

    // ---------------- Spawn ----------------

    const now = Date.now();

    if (

        now - gameState.lastPipeTime >

        gameState.pipeInterval

    ) {

        addPipe(pipes);

        gameState.lastPipeTime = now;

    }

    // ---------------- Score ----------------

    pipes.forEach(pipe => {
        if (
            !pipe.passed &&
            pipe.x + PIPE_WIDTH < bird.x
        ) {
            pipe.passed = true;
            setScore(prev => {
                const newScore = prev + 10;
                scoreRef.current=newScore;
                //return newScore;
                // Every 50 score speed increase
                if (newScore % 50 === 0) {
                    switch (gameState.difficulty) {
                        case "easy":
                            gameState.pipeSpeed = Math.min(
                                gameState.pipeSpeed + 0.5,
                                5
                            );
                            break;
                        case "medium":
                            gameState.pipeSpeed = Math.min(
                                gameState.pipeSpeed + 1,
                                8
                            );
                            break;
                        case "hard":
                            gameState.pipeSpeed = Math.min(
                                gameState.pipeSpeed + 2,
                                12
                            );
                            break;
                    }
                }
                return newScore;
            });
        }
    });

    // ---------------- Collision ----------------
    if (
        checkCollision(
            bird,
            pipes
        )
    ) {
        onGameOver();
    }

}