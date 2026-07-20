import {
    isMatch,
    matchCards,
    hideCards
} from "./gameLogic";
//import {addPlayerScore} from "./score";

export const checkPlayerMatch = ({
    cards,
    selectedIds,
    setCards,
    setPlayerScore,
    setSelectedCards,
    setIsChecking,
    setTurn
}) => {

    const firstCard = cards.find(card => card.id === selectedIds[0]);
    const secondCard = cards.find( card => card.id === selectedIds[1] );
    const matched = isMatch(firstCard, secondCard);
    if (matched) {
        setTimeout(() => {
            setCards(prevCards =>
                matchCards(prevCards,selectedIds)
            );
            setPlayerScore(prev => prev + 1);
            setSelectedCards([]);
            setIsChecking(false);
            // Player gets another chance
        }, 700);

    } else {
        setTimeout(() => {
            setCards(prevCards =>
                hideCards( prevCards,selectedIds )
            );
            setSelectedCards([]);
            setIsChecking(false);
            // Computer's turn
            setTurn("computer");
        }, 1000);
    }
};