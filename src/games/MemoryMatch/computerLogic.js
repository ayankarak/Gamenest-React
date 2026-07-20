import {
    isMatch,
    flipCards,
    matchCards,
    hideCards
} from "./gameLogic";

import {
    chooseAICards
} from "./AI";


export const computerTurn = ({
    cards,
    difficulty,
    aiMemory,

    setCards,
    setComputerScore,
    setAiMemory,
    setIsChecking,
    setTurn,
    setComputerTurnKey,
    matchedCards
}) => {
    const aiSelectedCards =
        chooseAICards({
            cards,
            matchedCards,
            difficulty,
            memory: aiMemory
        });

    if (aiSelectedCards.length < 2) {
        setIsChecking(false);
        setTurn("player");
        return;
    }


    const selectedIds = aiSelectedCards.map( card => card.id );

    // Reveal AI Cards

    setCards(
        prevCards => flipCards( prevCards, selectedIds )
    );

    // Update AI Memory

    setAiMemory(prev => {
        const updatedMemory = {...prev };
        aiSelectedCards.forEach(card => {
            if (!updatedMemory[card.image]) {
                updatedMemory[card.image] = [];
            }
            if (!updatedMemory[card.image].includes(card.id) ) {
                updatedMemory[ card.image ].push(card.id);
            }
        });
        return updatedMemory;
    });
    // Check AI Match

    setTimeout(() => {
        const firstCard = aiSelectedCards[0];
        const secondCard = aiSelectedCards[1];
        const matched = isMatch(firstCard,secondCard );
        if (matched) {
            // MATCH
            setCards( prevCards =>
                matchCards( prevCards, selectedIds )
            );
            setComputerScore( prev => prev + 1 );
            setIsChecking(false);
            // Computer gets another turn
            setComputerTurnKey(prev => prev + 1);
        }
        else {
            // NOT MATCH
            setCards(
                prevCards => hideCards( prevCards, selectedIds )
            );
            setIsChecking(false);
            // Player's turn
            setTurn("player");
        }
    }, 1000);

};