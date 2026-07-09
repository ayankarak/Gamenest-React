import {
    BIRD_X,
    BIRD_RADIUS,
    GRAVITY,
    JUMP_FORCE
} from "./constants";

export const createBird = () => ({
    x: BIRD_X,
    y: 250,
    velocity: 0,
    radius: BIRD_RADIUS,
    rotation: 0
});

export function updateBird(bird) {

    bird.velocity += GRAVITY;

    bird.y += bird.velocity;

    if (bird.velocity < 0) {
        bird.rotation = -25;
    }
    else {
        bird.rotation = Math.min(
            bird.rotation + 3,
            90
        );
    }

}

export function jumpBird(bird) {

    bird.velocity = JUMP_FORCE;

}

export function resetBird(bird) {

    bird.x = BIRD_X;
    bird.y = 250;
    bird.velocity = 0;

}