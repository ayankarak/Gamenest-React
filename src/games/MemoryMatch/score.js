// Add Player Score

export const addPlayerScore = (
    setPlayerScore
) => {

    setPlayerScore(prev => prev + 1);
};

// Add Computer Score

export const addComputerScore = ( setComputerScore ) => {
    setComputerScore(prev => prev + 1);
};

// Get Winner

export const getWinner = (playerScore,computerScore) => {
    if ( playerScore > computerScore ) {
        return "Player";
    }
    if (computerScore >playerScore) {
        return "Computer";
    }
    return "Draw";
};