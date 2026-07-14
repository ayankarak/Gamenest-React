import {
    CANVAS_HEIGHT,
    PADDLE_HEIGHT,
    PLAYER_SPEED
} from "./constant";

// ==============================
// Create Paddles
// ==============================

export const createPlayerPaddle = () => ({
    x: 20,
    y: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2
});

export const createAIPaddle = () => ({
    x: 865,
    y: (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2
});

// ==============================
// Player Movement
// ==============================

export const movePlayer = (
    paddle,
    mouseY
) => {
    paddle.y = mouseY - PADDLE_HEIGHT / 2;
    // Keep Paddle Inside Canvas
    if (paddle.y < 0) {
        paddle.y = 0;
    }
    if (
        paddle.y >
        CANVAS_HEIGHT - PADDLE_HEIGHT
    ) {
        paddle.y =
            CANVAS_HEIGHT - PADDLE_HEIGHT;
    }
};