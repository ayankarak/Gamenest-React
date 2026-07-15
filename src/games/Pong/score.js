import {
    CANVAS_WIDTH,
    BALL_SIZE,
    WINNING_SCORE
} from "./constant";

export const updateScore = ({
    ball,
    setPlayerScore,
    setAiScore,
    resetBall,
    setGameOver,
    setWinner

}) => {

    // AI scores
    if (ball.x + BALL_SIZE < 0) {

        setAiScore(prev => {
            const newScore = prev + 1;
            if (newScore >= WINNING_SCORE) {
                setWinner("Computer");
                setGameOver(true);
            }
            return newScore;
        });

        resetBall(ball);

        return;

    }

    // Player scores
    if (ball.x > CANVAS_WIDTH) {

        setPlayerScore(prev => {
            const newScore = prev + 1;
            if (newScore >= WINNING_SCORE) {
                setWinner("Player");
                setGameOver(true);
            }
            return newScore;
        });

        resetBall(ball);

    }

};