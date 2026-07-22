import playerCarImage from "../../assets/car/car.png";

import blueCarImage from "../../assets/car/bluecar.png";
import greenCarImage from "../../assets/car/greencar.png";
import yellowCarImage from "../../assets/car/yellowcar.png";
import { GAME_WIDTH, TOTAL_LANES } from "./constant";

// Player Car

const getLaneX = (lane, carWidth) => {
    const laneWidth =GAME_WIDTH / TOTAL_LANES;
    return (lane * laneWidth +(laneWidth - carWidth) / 2);
};

export const createPlayer = () => {
    return {
        lane: 2,
        x: getLaneX(2, 80),
        y: 600,
        width: 80,
        height: 80,
        image: playerCarImage
    };
};

// Enemy Car Images

export const ENEMY_CAR_IMAGES = [
    blueCarImage,
    greenCarImage,
    yellowCarImage
];

// Create Enemy Car

export const createEnemy = ( lane ) => {
    const randomIndex = Math.floor(Math.random() * ENEMY_CAR_IMAGES.length );
    return {
        lane,
        x: getLaneX(lane, 80),
        y: -100,
        width: 80,
        height: 80,
        image:ENEMY_CAR_IMAGES[randomIndex]
    };
};