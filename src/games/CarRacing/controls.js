import {TOTAL_LANES, GAME_WIDTH} from "./constant";

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