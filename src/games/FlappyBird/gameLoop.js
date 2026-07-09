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

    setScore,

    onGameOver

}) {

    // Bird Physics

    updateBird(bird);

    // Pipe Movement
   
    updatePipes(pipes);

    // Remove Old Pipes

    const filtered = removeOldPipes(pipes);

    pipes.length = 0;

    pipes.push(...filtered);

    // Pipe Spawn

    const now = Date.now();

    if (now - gameState.lastPipeTime > gameState.pipeInterval) {

        addPipe(pipes);

        gameState.lastPipeTime = now;

    }

    // Score

    pipes.forEach(pipe => {

        if (

            !pipe.passed &&

            pipe.x + PIPE_WIDTH< bird.x

        ) {

            pipe.passed = true;

            setScore(prev => prev + 10);

        }

    });

    // Collision

    if (checkCollision(bird, pipes)) {

        onGameOver();

    }

}