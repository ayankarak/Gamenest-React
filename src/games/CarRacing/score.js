// Increase Score

export const increaseScore = (setScore) => {
    setScore(
        prevScore => prevScore + 1
    );
};

// Update High Score

export const updateHighScore = (score,highScore,setHighScore) => {
    if (score > highScore) {
        setHighScore(score);
    }
};

// Reset Score

export const resetScore = (setScore) => {
    setScore(0);
};