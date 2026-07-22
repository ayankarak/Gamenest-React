import {TOTAL_LANES, GAME_WIDTH,GAME_HEIGHT} from "./constant";

// Move Player Left

export const moveLeft = (player) => {
    if (player.lane > 0) {
        player.lane--;
        const laneWidth = GAME_WIDTH / TOTAL_LANES;
        player.x = player.lane * laneWidth + (laneWidth - player.width) / 2;
    }
};

// Move Player Right

export const moveRight = (player) => {
    if (player.lane < TOTAL_LANES - 1) {
        player.lane++;
        const laneWidth = GAME_WIDTH / TOTAL_LANES;
        player.x = player.lane * laneWidth + (laneWidth - player.width) / 2;
    }

};

// Move Player Forward

export const moveForward = (player) => {
    if (player.y > 0) {
        player.y -= 20;
    }
};

// Move Player Backward

export const moveBackward = (player) => {
    if (player.y <GAME_HEIGHT - player.height) {
        player.y += 20;
    }

};

export const moveEnemy = (enemy,speed) => {
    enemy.y += speed;
    if (enemy.y > GAME_HEIGHT) {
        enemy.y = -enemy.height;
        // Random lane
        enemy.lane = Math.floor( Math.random() * TOTAL_LANES );
        const laneWidth = GAME_WIDTH / TOTAL_LANES;
        enemy.x = enemy.lane * laneWidth + (laneWidth - enemy.width) / 2;
    }
};