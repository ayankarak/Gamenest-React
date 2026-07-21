// Draw Road
export const drawRoad = (
    ctx,
    canvasWidth,
    canvasHeight,
    laneWidth,
    totalLanes,
    roadOffset
) => {
    // Road Background
    ctx.fillStyle = "#333";
    ctx.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );

    // Road Side Borders

    ctx.fillStyle = "#fff";
    ctx.fillRect(
        0,
        0,
        8,
        canvasHeight
    );
    ctx.fillRect(
        canvasWidth - 8,
        0,
        8,
        canvasHeight
    );
    // Lane Lines
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.setLineDash([ 30, 30 ]);
    ctx.lineDashOffset = roadOffset;
    for (let i = 1;i < totalLanes;i++) {
        const x = i * laneWidth;
        ctx.beginPath();
        ctx.moveTo( x,0 );
        ctx.lineTo( x, canvasHeight );
        ctx.stroke();
    }
    // Reset Dash
    ctx.setLineDash([]);
};

// Draw Car

export const drawCar = (
    ctx,
    car,
    laneWidth,
    carWidth,
    carHeight,
    image
) => {
    const x =car.lane * laneWidth + (laneWidth - carWidth) / 2;
    const y = car.y;
    if (image) {
        ctx.drawImage(
            image,
            x,
            y,
            carWidth,
            carHeight
        );
    } 
    else {
        // Fallback Rectangle
        ctx.fillStyle = car.color || "red";
        ctx.fillRect(x,y,carWidth,carHeight);
    }
};

// Draw All Enemy Cars

export const drawEnemies = (
    ctx,
    enemies,
    laneWidth,
    carWidth,
    carHeight,
    enemyImage
) => {

    enemies.forEach(enemy => {
        drawCar(
            ctx,
            enemy,
            laneWidth,
            carWidth,
            carHeight,
            enemyImage
        );
    });
};

// Draw Player Car

export const drawPlayer = (
    ctx,
    player,
    laneWidth,
    carWidth,
    carHeight,
    playerImage
) => {
    drawCar(
        ctx,
        player,
        laneWidth,
        carWidth,
        carHeight,
        playerImage
    );
};