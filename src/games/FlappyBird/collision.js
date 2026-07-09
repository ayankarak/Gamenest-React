import {
    CANVAS_HEIGHT,
    PIPE_WIDTH
} from "./constants";

export function checkBoundaryCollision(bird) {

    return (

        bird.y - bird.radius <= 0 ||

        bird.y + bird.radius >= CANVAS_HEIGHT

    );

}

export function checkPipeCollision(bird, pipes) {

    for (const pipe of pipes) {

        const hitX =

            bird.x + bird.radius > pipe.x &&

            bird.x - bird.radius < pipe.x + PIPE_WIDTH;

        const hitTop =

            bird.y - bird.radius < pipe.topHeight;

        const hitBottom =

            bird.y + bird.radius > pipe.bottomY;

        if (hitX && (hitTop || hitBottom)) {

            return true;

        }

    }

    return false;

}

export function checkCollision(bird, pipes) {

    return (

        checkBoundaryCollision(bird) ||

        checkPipeCollision(bird, pipes)

    );

}