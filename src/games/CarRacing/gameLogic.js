// Move Player Car
export const movePlayer = (
    player,
    direction,
    laneWidth,
    totalLanes
) => {
    if (direction === "left") {
        if (player.lane > 0) {
            return {...player,lane: player.lane - 1};
        }
    }
    if (direction === "right") {
        if (player.lane < totalLanes - 1) {
            return {...player,lane: player.lane + 1};
        }
    }
    return player;
};

// Move Enemy Cars

export const moveEnemies = ( enemies, speed ) => {
    return enemies.map(enemy => ({
        ...enemy,
        y: enemy.y + speed
    }));
};

// Remove Cars That Left Screen

export const removeOffScreenEnemies = (enemies,canvasHeight) => {
    return enemies.filter( enemy => enemy.y < canvasHeight );

};


// Check Collision
export const isCollision = ( player,enemy,laneWidth,carHeight) => {

    // Different lane = no collision

    if ( player.lane !== enemy.lane ) {
        return false;
    }
    const playerTop = player.y;
    const playerBottom = player.y + carHeight;
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + carHeight;
    return (playerBottom > enemyTop && playerTop < enemyBottom );
};

// Check All Enemy Collisions

export const checkCollision = (player,enemies,carHeight) => {
    return enemies.some(
        enemy => isCollision( player, enemy, null, carHeight )
    );
};