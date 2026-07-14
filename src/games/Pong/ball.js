import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    BALL_SIZE,
    INITIAL_BALL_SPEED
} from "./constant";

// ==============================
// Create Ball
// ==============================

export const createBall = () => {

    return {

        x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,

        y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,

        vx: INITIAL_BALL_SPEED,

        vy: INITIAL_BALL_SPEED

    };

};

// ==============================
// Reset Ball
// ==============================

export const resetBall = (ball) => {

    ball.x = CANVAS_WIDTH / 2 - BALL_SIZE / 2;

    ball.y = CANVAS_HEIGHT / 2 - BALL_SIZE / 2;

    ball.vx =
        Math.random() > 0.5
            ? INITIAL_BALL_SPEED
            : -INITIAL_BALL_SPEED;

    ball.vy =
        Math.random() > 0.5
            ? INITIAL_BALL_SPEED
            : -INITIAL_BALL_SPEED;

};

// ==============================
// Move Ball
// ==============================

export const moveBall = (ball) => {

    ball.x += ball.vx;

    ball.y += ball.vy;

};