import {
    CANVAS_HEIGHT,
    BALL_SIZE,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
} from "./constant";
// ==============================
// Wall Collision
// ==============================
export const checkWallCollision = (ball) => {
    if (
        ball.y <= 0 ||
        ball.y + BALL_SIZE >= CANVAS_HEIGHT
    ) {
        ball.vy *= -1;
    }
};
// ==============================
// Paddle Collision
// ==============================
export const checkPaddleCollision = (
    ball,
    player,
    ai
) => {
    // Player Paddle
    if (
        ball.x <= player.x + PADDLE_WIDTH &&
        ball.y + BALL_SIZE >= player.y &&
        ball.y <= player.y + PADDLE_HEIGHT
    ) {
        ball.vx *= -1;
        ball.x = player.x + PADDLE_WIDTH;
    }
    // AI Paddle
    if (
        ball.x + BALL_SIZE >= ai.x &&
        ball.y + BALL_SIZE >= ai.y &&
        ball.y <= ai.y + PADDLE_HEIGHT

    ) {
        ball.vx *= -1;
        ball.x = ai.x - BALL_SIZE;
    }
};