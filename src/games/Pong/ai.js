import {
    CANVAS_HEIGHT,
    PADDLE_HEIGHT
} from "./constant";

export const moveAI = (
    ai,
    ball,
    difficulty
) => {
    let speed;
    let error;
    switch (difficulty) {
        case "easy":
            speed = 3;
            error = 40;
            break;
        case "medium":
            speed = 5;
            error = 20;
            break;
        case "hard":
            speed = 8;
            error = 0;
            break;
        default:
            speed = 5;
            error = 20;
    }
    // Ball er target position
    const targetY =
        ball.y +
        (Math.random() * error - error / 2);
    const aiCenter =
        ai.y + PADDLE_HEIGHT / 2;
    if (aiCenter < targetY) {
        ai.y += speed;
    }
    else if (aiCenter > targetY) {
        ai.y -= speed;
    }
    // Screen er baire jete dibo na
    if (ai.y < 0)
        ai.y = 0;
    if (
        ai.y >
        CANVAS_HEIGHT - PADDLE_HEIGHT
    ) {
        ai.y =
            CANVAS_HEIGHT - PADDLE_HEIGHT;
    }

};