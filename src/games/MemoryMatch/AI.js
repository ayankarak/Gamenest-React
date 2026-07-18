// Get Available Cards

const getAvailableCards = ( cards, matchedCards ) => {
    return cards.filter( card =>
            !matchedCards.includes(card.id)
    );
};

// Random Card Selection

const getRandomCard = ( cards ) => {
    const randomIndex =
        Math.floor(
            Math.random() * cards.length
        );
    return cards[randomIndex];
};

// EASY AI

const easyAI = ( cards, matchedCards ) => {
    const availableCards =
        getAvailableCards( cards, matchedCards );
    if ( availableCards.length < 2 ) {
        return [];
    }
    const firstCard = getRandomCard( availableCards );
    const remainingCards =
        availableCards.filter( card => card.id !== firstCard.id );
    const secondCard =
        getRandomCard( remainingCards );
    return [firstCard, secondCard];
};

// Find Known Pair

const findKnownPair = ( memory ) => {
    const entries = Object.entries( memory );
    for ( let i = 0; i < entries.length; i++ ) {
        const [ image, ids ] = entries[i];
        if ( ids.length >= 2 )
        {
            return [ids[0],ids[1]];
        }

    }
    return null;
};

// MEDIUM AI

const mediumAI = (
    cards,
    matchedCards,
    memory
) => {
    const availableCards =
        getAvailableCards(
            cards,
            matchedCards
        );

    if ( availableCards.length < 2 ) {
        return [];
    }

    // First try known pair

    const knownPair = findKnownPair( memory );
    if ( knownPair ) {
        const firstCard =
            availableCards.find(
                card => card.id === knownPair[0]
            );
        const secondCard =
            availableCards.find(
                card => card.id === knownPair[1]
            );
        if ( firstCard && secondCard ) {
            return [firstCard,secondCard];
        }
    }

    // Otherwise random

    return easyAI( cards, matchedCards);
};

// HARD AI

const hardAI = (
    cards,
    matchedCards,
    memory
) => {
    const availableCards =
        getAvailableCards(
            cards,
            matchedCards
        );
    if ( availableCards.length < 2 ) {
        return [];
    }
    // Hard AI always tries known pair first
    const knownPair = findKnownPair( memory );
    if ( knownPair) {
        const firstCard =
            availableCards.find(
                card => card.id === knownPair[0]
            );
        const secondCard =
            availableCards.find(
                card => card.id === knownPair[1]
            );
        if (firstCard &&secondCard) {
            return [ firstCard, secondCard ];
        }
    }
    // choose a card that has been seen before
    const knownCards =
        availableCards.filter(
            card =>
                memory[card.image] &&
                memory[card.image].length > 0
        );


    if (knownCards.length >= 2) {
        return [ knownCards[0], knownCards[1] ];
    }

    // Otherwise random

    return easyAI(cards,matchedCards);
};
// MAIN AI FUNCTION

export const chooseAICards = ({
    cards,
    matchedCards,
    difficulty,
    memory
}) => {
    switch (
        difficulty
    ) {
        case "easy":
            return easyAI(cards,matchedCards);
        case "medium":
            return mediumAI(
                cards,
                matchedCards,
                memory
            );
        case "hard":
            return hardAI(
                cards,
                matchedCards,
                memory
            );
        default:
            return easyAI(cards,matchedCards);
    }

};