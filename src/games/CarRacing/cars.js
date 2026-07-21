import {
    GAME_HEIGHT,
    LANE_COUNT,
    LANE_WIDTH,
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    ENEMY_WIDTH,
    ENEMY_HEIGHT
} from "./constant";

// Get lane X position
export const getLaneX = (lane) => {
    return (
        lane * LANE_WIDTH +
        (LANE_WIDTH - PLAYER_WIDTH) / 2
    );
};

// Create Player

export const createPlayer = () => {
    const lane =
        Math.floor(
            LANE_COUNT / 2
        );
    return {
        lane,
        x: getLaneX(lane),
        y:GAME_HEIGHT - PLAYER_HEIGHT - 20,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT
    };
};

// Create Enemy
export const createEnemy = () => {
    const lane =
        Math.floor(
            Math.random() * LANE_COUNT
        );
    return {
        lane,
        x:lane * LANE_WIDTH +(LANE_WIDTH - ENEMY_WIDTH) / 2,
        y: -ENEMY_HEIGHT,
        width: ENEMY_WIDTH,
        height: ENEMY_HEIGHT
    };

};