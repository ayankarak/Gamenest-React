// Check whether two selected cards match
export const isMatch = (
    firstCard,
    secondCard
) => {

    return (
        firstCard.image === secondCard.image
    );

};

// Flip selected cards

export const flipCards = ( cards,selectedIds ) => {
    return cards.map(card => {
        if ( selectedIds.includes(card.id)) {
            return {...card, isFlipped: true };
        }
        return card;
    });

};

// Mark cards as matched

export const matchCards = ( cards, selectedIds ) => {
    return cards.map(card => {
        if ( selectedIds.includes(card.id) ) {
            return {
                ...card,
                isFlipped: true,
                isMatched: true
            };
        }
        return card;
    });
};
// Hide unmatched cards
export const hideCards = ( cards, selectedIds ) => {
    return cards.map(card => {
        if ( selectedIds.includes(card.id) ) {
            return {...card, isFlipped: false };
        }
        return card;
    });
};
// Check whether game is over
export const isGameOver = ( cards ) => {
    return cards.every(
        card => card.isMatched
    );
};

// Find Winner

export const getWinner = ( playerScore, computerScore ) => {
    if ( playerScore > computerScore ) {
        return "Player";
    }
    if ( computerScore > playerScore ) {
        return "Computer";
    }
    return "Draw";
};