// import {
//     WINNING_SCORE
// } from "./constant";

export const updateScore = ({
    lines,
    setScore,
    setHighScore
}) => {

    if (lines === 0) return;

    setScore(prev => {

        const newScore =
            prev + lines * 100;

        setHighScore(high =>
            Math.max(high, newScore)
        );

        return newScore;

    });

};