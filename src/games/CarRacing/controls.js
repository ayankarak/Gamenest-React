import {
    TOTAL_LANES
} from "./constant";

// Move Player Left

export const moveLeft = (player) => {

    if (player.lane > 0) {
        player.lane--;
    }
};

// Move Player Right

export const moveRight = (player) => {
    if (player.lane < TOTAL_LANES - 1 ) {
        player.lane++;
    }
};