import {GAME_WIDTH,GAME_HEIGHT,TOTAL_LANES} from "./constant";
// const getLaneX = (lane,carWidth) => {
//     const laneWidth = GAME_WIDTH / TOTAL_LANES;
//     return (lane * laneWidth +(laneWidth - carWidth) / 2);
// };
// // Move Player Car
// export const movePlayer = (player,direction) => {
//     if (direction === "left") {
//         if (player.lane > 0) {
//             newLane = player.lane - 1;
//         }
//     }
//     if (direction === "right") {
//         if (player.lane < totalLanes - 1) {
//             newLane = player.lane + 1;
//         }
//     }
//     return {
//         ...player,
//         lane: newLane,
//         x: getLaneX(
//             newLane,
//             player.width
//         )
//     };
// };

// // Move Enemy Cars

// export const moveEnemies = ( enemies, speed ) => {
//     return enemies.map(enemy => ({
//         ...enemy,
//         y: enemy.y + speed
//     }));
// };

// // Remove Cars That Left Screen

// export const removeOffScreenEnemies = (enemies) => {
//     return enemies.filter(enemy =>enemy.y < GAME_HEIGHT);
// };

// Check Collision

export const isCollision = (player,enemy) => {
    // Different lane = no collision
    if (player.lane !== enemy.lane) {
        return false;
    }
    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.height;
    return (
        playerBottom > enemyTop &&
        playerTop < enemyBottom
    );

};

// Check All Enemy Collisions

export const checkCollision = (player,enemies) => {
    return enemies.some(
        enemy => isCollision( player, enemy )
    );
};