import { useEffect, useState } from "react";

import "./MemoryMatch.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";

import { createCards } from "./cards";

function MemoryMatch() {

    const [difficulty, setDifficulty] =
        useState("easy");

    const [cards, setCards] =
        useState(() =>
            createCards("easy")
        );

    const [selectedCards, setSelectedCards] =
        useState([]);

    const [playerScore, setPlayerScore] =
        useState(0);

    const [computerScore, setComputerScore] =
        useState(0);

    const [turn, setTurn] =
        useState("player");

    const [gameOver, setGameOver] =
        useState(false);

    const [winner, setWinner] =
        useState("");

    const [isChecking, setIsChecking] =
        useState(false);


    // ============================
    // Difficulty Change
    // ============================

    const handleDifficultyChange = (value) => {

        setDifficulty(value);

        setCards(
            createCards(value)
        );

        setSelectedCards([]);

        setPlayerScore(0);

        setComputerScore(0);

        setTurn("player");

        setGameOver(false);

        setWinner("");

    };


    // ============================
    // Card Click
    // ============================

    const handleCardClick = (card) => {

        // Only Player can click

        if (turn !== "player") return;

        // Prevent clicking while checking

        if (isChecking) return;

        // Already opened/matched card

        if (
            card.isFlipped ||
            card.isMatched
        ) {
            return;
        }

        // Maximum 2 cards

        if (
            selectedCards.length >= 2
        ) {
            return;
        }

        const updatedCards =
            cards.map(currentCard =>

                currentCard.id === card.id

                    ? {
                        ...currentCard,
                        isFlipped: true
                    }

                    : currentCard

            );

        setCards(updatedCards);

        const newSelectedCards = [

            ...selectedCards,

            card.id

        ];

        setSelectedCards(
            newSelectedCards
        );

        // Check after 2 cards

        if (
            newSelectedCards.length === 2
        ) {

            checkMatch(
                newSelectedCards
            );

        }

    };


    // ============================
    // Check Match
    // ============================

    const checkMatch = (
        selectedIds
    ) => {

        setIsChecking(true);

        const firstCard =
            cards.find(
                card =>
                    card.id === selectedIds[0]
            );

        const secondCard =
            cards.find(
                card =>
                    card.id === selectedIds[1]
            );


        if (
            firstCard.image ===
            secondCard.image
        ) {

            // Match

            setTimeout(() => {

                setCards(prevCards =>

                    prevCards.map(card =>

                        selectedIds.includes(
                            card.id
                        )

                            ? {
                                ...card,
                                isMatched: true,
                                isFlipped: true
                            }

                            : card

                    )

                );

                setPlayerScore(
                    prev => prev + 1
                );

                setSelectedCards([]);

                setIsChecking(false);

                // Player gets another chance

            }, 700);

        }

        else {

            // Not Match

            setTimeout(() => {

                setCards(prevCards =>

                    prevCards.map(card =>

                        selectedIds.includes(
                            card.id
                        )

                            ? {
                                ...card,
                                isFlipped: false
                            }

                            : card

                    )

                );

                setSelectedCards([]);

                setIsChecking(false);

                // Turn goes to Computer

                setTurn("computer");

            }, 1000);

        }

    };


    // ============================
    // Game Over Check
    // ============================

    useEffect(() => {

        if (
            cards.length > 0 &&
            cards.every(
                card => card.isMatched
            )
        ) {

            setGameOver(true);

            if (
                playerScore >
                computerScore
            ) {

                setWinner("Player");

            }

            else if (
                computerScore >
                playerScore
            ) {

                setWinner("Computer");

            }

            else {

                setWinner("Draw");

            }

        }

    }, [
        cards,
        playerScore,
        computerScore
    ]);


    // ============================
    // Restart Game
    // ============================

    const restartGame = () => {

        setCards(
            createCards(difficulty)
        );

        setSelectedCards([]);

        setPlayerScore(0);

        setComputerScore(0);

        setTurn("player");

        setGameOver(false);

        setWinner("");

        setIsChecking(false);

    };


    return (

        <div className="memory-match-container">
            <GameHeader
                title="🧠 Memory Match"
            />
            <ScoreBoard
                items={[
                    {
                        label: "Player",
                        value: playerScore
                    },
                    {
                        label: "Computer",
                        value: computerScore
                    }
                ]}
            />
            <DifficultySelector
                value={difficulty}
                onChange={
                    handleDifficultyChange
                }
            />
            <p className="turn-status">
                {turn === "player"
                    ? "🎮 Your Turn"
                    : "🤖 Computer's Turn"
                }
            </p>
            <GameContainer width={700}>

                <div
                    className={`
                        memory-card-grid
                        difficulty-${difficulty}
                    `}
                >
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className={`
                                memory-card
                                ${
                                    card.isFlipped ||
                                    card.isMatched
                                        ? "flipped"
                                        : ""
                                }
                            `}
                            onClick={() =>
                                handleCardClick(card)
                            }
                        >
                            <div
                                className="card-front"
                            >
                                ❓
                            </div>
                            <div
                                className="card-back"
                            >
                                {card.image}
                            </div>
                        </div>
                    ))}
                </div>
            </GameContainer>


            {gameOver && (
                <div
                    className="game-over-overlay"
                >
                    <div
                        className="game-over-card"
                    >
                        <h2>
                            {winner === "Draw"
                                ? "🤝 It's a Draw!"
                                : `🏆 ${winner} Wins!`
                            }
                        </h2>
                        <p>
                            Player: {playerScore}
                        </p>
                        <p>
                            Computer: {computerScore}
                        </p>
                        <button
                            className="play-again-btn"
                            onClick={
                                restartGame
                            }
                        >
                            🔄 Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default MemoryMatch;