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
   
    updatePipes(

    pipes,

    gameState.pipeSpeed

);

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

pipes.forEach(pipe=>{

    if(

        !pipe.passed &&

        pipe.x + PIPE_WIDTH < bird.x

    ){

        pipe.passed=true;

        setScore(prev=>{

            const newScore=prev+10;

            // Difficulty Based Speed

            if(newScore % 5===0){

                switch(gameState.difficulty){

                    case "easy":

                        gameState.pipeSpeed=Math.min(

                            gameState.pipeSpeed+0.5,

                            5

                        );

                        break;

                    case "medium":

                        gameState.pipeSpeed=Math.min(

                            gameState.pipeSpeed+1,

                            8

                        );

                        break;

                    case "hard":

                        gameState.pipeSpeed=Math.min(

                            gameState.pipeSpeed+2,

                            12

                        );

                        break;

                }

            }

            return newScore;

        });

    }

});

    // Collision

    if (checkCollision(bird, pipes)) {

        onGameOver();

    }

}