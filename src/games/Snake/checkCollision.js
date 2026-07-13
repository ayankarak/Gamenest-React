import { BOARD_SIZE } from "./constant";

export const checkCollision = (head, snakeBody) => {

    // Wall Collision
    if (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE
    ) {
        return true;
    }

    // Self Collision
    for (let i = 1; i < snakeBody.length; i++) {

        if (
            snakeBody[i].x === head.x &&
            snakeBody[i].y === head.y
        ) {
            return true;
        }

    }

    return false;
};