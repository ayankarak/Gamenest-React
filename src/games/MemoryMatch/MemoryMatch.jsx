import { useEffect, useState } from "react";

import "./MemoryMatch.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";
import { chooseAICards } from "./AI";
import { createCards } from "./cards";
import {checkPlayerMatch} from "./playerLogic";

import {isMatch, flipCards, matchCards, hideCards, isGameOver, getWinner} from "./gameLogic";

function MemoryMatch() {
    const [difficulty, setDifficulty] = useState("easy");
    const [cards, setCards] =
        useState(() =>
            createCards("easy")
        );
    const [isChecking, setIsChecking] = useState(false);
    const [aiMemory, setAiMemory] = useState({});
    const [selectedCards, setSelectedCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [turn, setTurn] = useState("player");
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState("");
    //const [isChecking, setIsChecking] = useState(false);

    // Difficulty Change

    const handleDifficultyChange = (
        value
    ) => {
        setDifficulty(value);
        setCards( createCards(value) );
        setSelectedCards([]);
        setPlayerScore(0);
        setComputerScore(0);
        setTurn("player");
        setGameOver(false);
        setWinner("");
        setIsChecking(false);
        setAiMemory({});
    };

    // Player Card Click

    const handleCardClick = ( card ) => {
        // Only player can play
        if (turn !== "player") {
            return;
        }
        // Prevent click while checking
        if ( isChecking) {
            return;
        }
        // Already flipped or matched
        if ( card.isFlipped || card.isMatched ) {
            return;
        }
        // Maximum two cards
        if ( selectedCards.length >= 2 ) {
            return;
        }
        const newCards = flipCards(cards,[card.id] );
        setCards(newCards);
        const newSelectedCards = [...selectedCards,card.id];
        setSelectedCards( newSelectedCards );
        // Check after two cards
        if (newSelectedCards.length === 2) {
            setIsChecking(true);
            checkPlayerMatch({
                cards,
                selectedIds: newSelectedCards,
                setCards,
                setPlayerScore,
                setSelectedCards,
                setIsChecking,
                setTurn
            });

        }
    };

    // Check Player Match
/// function is here

    // Game Over

    useEffect(() => {
        if (cards.length > 0 &&isGameOver(cards)) {
            setGameOver(true);
            setWinner(
                getWinner( playerScore,computerScore)
            );
        }
    }, [cards,playerScore,computerScore]);

// Computer Turn

    useEffect(() => {
        if ( turn !== "computer" || gameOver || isChecking) {
            return;
        }
        setIsChecking(true);
        const timer = setTimeout(() => {
            const aiSelectedCards =
                chooseAICards({
                    cards,
                    matchedCards: cards
                        .filter(card => card.isMatched)
                        .map(card => card.id),
                    difficulty,
                    memory: aiMemory
                });
            if (aiSelectedCards.length < 2 ) {
                setIsChecking(false);
                return;
            }
            const selectedIds = aiSelectedCards.map(card => card.id);
            // Reveal AI cards
            setCards(prevCards =>
                flipCards(prevCards,selectedIds)
            );
            // AI remembers its own cards
            setAiMemory(prev => {
                const updatedMemory = {...prev };
                aiSelectedCards.forEach(card => {
                    if (!updatedMemory[card.image]) {
                        updatedMemory[card.image] = [];
                    }
                    if (!updatedMemory[card.image].includes(card.id)){
                        updatedMemory[card.image].push(card.id );
                    }
                });
                return updatedMemory;
            });
            setTimeout(() => {
                const firstCard = aiSelectedCards[0];
                const secondCard = aiSelectedCards[1];
                const matched = isMatch( firstCard,secondCard );
                if (matched) {
                    setCards( prevCards =>
                        matchCards(prevCards,selectedIds)
                    )
                    setComputerScore(prev => prev + 1);
                    setIsChecking(false);
                    // Computer gets another turn
                    setTurn("computer");
                }
                else {
                    setCards( prevCards =>
                        hideCards( prevCards,selectedIds )
                    );
                    setIsChecking(false);
                    // Back to player
                    setTurn("player");
                }
            }, 1000);
        }, 800);
        return () => {clearTimeout(timer); };
    }, [turn,gameOver,isChecking,cards,aiMemory,difficulty]);

    // Restart Game
    const restartGame = () => {
        setCards(createCards(difficulty));
        setSelectedCards([]);
        setPlayerScore(0);
        setComputerScore(0);
        setTurn("player");
        setGameOver(false);
        setWinner("");
        setIsChecking(false);
        setAiMemory({});
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
            <GameContainer
                width={700}
            >
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