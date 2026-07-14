import {
    CANVAS_WIDTH,
    BALL_SIZE
} from "./constant";

export const updateScore = ({

    ball,

    setPlayerScore,

    setAiScore,

    resetBall

}) => {

    // AI scores
    if (ball.x + BALL_SIZE < 0) {

        setAiScore(prev => prev + 1);

        resetBall(ball);

        return;

    }

    // Player scores
    if (ball.x > CANVAS_WIDTH) {

        setPlayerScore(prev => prev + 1);

        resetBall(ball);

    }

};