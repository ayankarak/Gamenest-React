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
    keys
) => {

    if (keys.ArrowUp) {
        paddle.y -= PLAYER_SPEED;
    }

    if (keys.ArrowDown) {
        paddle.y += PLAYER_SPEED;
    }

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