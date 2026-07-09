import {
    CANVAS_HEIGHT,
    PIPE_WIDTH,
    PIPE_GAP,
    PIPE_SPEED
} from "./constants";

export function createPipe() {

    const minHeight = 60;

    const maxHeight =
        CANVAS_HEIGHT -
        PIPE_GAP -
        60;

    const topHeight =
        Math.floor(
            Math.random() *
            (maxHeight - minHeight + 1)
        ) + minHeight;

    return {

        x: 700,

        topHeight,

        bottomY: topHeight + PIPE_GAP,

        passed: false

    };

}

export function updatePipes(pipes) {

    pipes.forEach(pipe => {

        pipe.x -= PIPE_SPEED;

    });

}

export function removeOldPipes(pipes) {

    return pipes.filter(

        pipe => pipe.x + PIPE_WIDTH > 0

    );

}

export function addPipe(pipes) {

    pipes.push(

        createPipe()

    );

}