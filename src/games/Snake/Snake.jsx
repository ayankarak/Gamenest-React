import { useState, useRef, useEffect } from "react";
import "./Snake.css";
import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";

import {
    getSpeed,
    moveSnake,
    generateFood
} from "./moveSnake";

import {

    BOARD_SIZE,
    INITIAL_SNAKE

} from "./constant";

function Snake() {
    const [snake, setSnake] = useState(INITIAL_SNAKE);

    const [food, setFood] = useState({ x: 15, y: 10 });

    const [direction, setDirection] = useState("RIGHT");

    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(
        Number(localStorage.getItem("snakeHighScore")) || 0
    );

    const [gameStarted, setGameStarted] = useState(false);

    const [gameOver, setGameOver] = useState(false);

    const [paused, setPaused] = useState(false);

    const [difficulty, setDifficulty] = useState("easy");

    const intervalRef = useRef(null);

    // -----------------------------
    // Helper Functions
    // -----------------------------

    const isSnakeCell = (x, y) => {
        return snake.some((cell) => cell.x === x && cell.y === y);
    };

    const isFoodCell = (x, y) => {
        return food.x === x && food.y === y;
    };

    // -----------------------------
    // Keyboard Controls
    // -----------------------------

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ) {
                e.preventDefault();
            }

            // Space = Start / Pause / Resume
            if (e.code === "Space") {

                // Start Game
                if (!gameStarted && !gameOver) {
                    setGameStarted(true);
                    setPaused(false);
                    return;
                }

                // Pause / Resume
                if (gameStarted && !gameOver) {
                    setPaused((prev) => !prev);
                    return;
                }
                // Don't allow movement before game starts
                if (!gameStarted || paused || gameOver) return;
            }

            switch (e.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") setDirection("UP");
                    break;

                case "ArrowDown":
                    if (direction !== "UP") setDirection("DOWN");
                    break;

                case "ArrowLeft":
                    if (direction !== "RIGHT") setDirection("LEFT");
                    break;

                case "ArrowRight":
                    if (direction !== "LEFT") setDirection("RIGHT");
                    break;

                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [direction, gameStarted, paused, gameOver]);

    useEffect(() => {
        if (!gameStarted || gameOver || paused) return;

       intervalRef.current = setInterval(() => {

            moveSnake({
                snake,
                setSnake,
                food,
                setFood,
                direction,
                score,
                setScore,
                highScore,
                setHighScore,
                setGameOver,
                setGameStarted
            });

        }, getSpeed(difficulty));

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [
            gameStarted,
            direction,
            paused,
            gameOver,
            difficulty,

            snake,
            food,
            score,
            highScore
        ]);


    return (
        <div className="snake-container">

            {/* Title */}
            <GameHeader title="🐍 Snake Game" />

            {/* Scoreboard */}

            <ScoreBoard
                    items={[
                        { label: "Score", value: score },
                        { label: "High Score", value: highScore }
                    ]}
                />

            {/* Difficulty */}

            <DifficultySelector
                value={difficulty}
                onChange={setDifficulty}
            />

            {/* Status */}
            <div className="status">
                {gameOver
                    ? "💀 Game Over"
                    : paused
                        ? "⏸ Paused"
                        : gameStarted
                            ? "🎮 Playing"
                            : "▶ Ready"}
            </div>

            <GameContainer width={900}>
                {/* Game Layout */}
                {/* <div className="game-layout">
                    {/* Game Board */}
                    <div className="board">
                        {Array.from({ length: BOARD_SIZE }).map((_, row) =>
                            Array.from({ length: BOARD_SIZE }).map((_, col) => {

                                const isSnake = isSnakeCell(col, row);

                                const isHead =
                                    snake[0].x === col &&
                                    snake[0].y === row;

                                return (
                                    <div
                                        key={`${row}-${col}`}
                                        className={`
                                            cell
                                            ${isSnake ? "snake" : ""}
                                            ${isHead ? "snake-head" : ""}
                                            ${isFoodCell(col, row) ? "food" : ""}
                                        `}
                                    ></div>
                                );

                            })
                        )}
                    </div>

                {/* </div> */}
            </GameContainer>

            {/* Buttons */}
            <div className="buttons">
                <button
                    className="restart-btn"
                    onClick={() => {
                        clearInterval(intervalRef.current);

                        setSnake(INITIAL_SNAKE);
                        setFood(generateFood(INITIAL_SNAKE));
                        setDirection("RIGHT");

                        setScore(0);
                        setGameOver(false);
                        setPaused(false);
                        setGameStarted(false);
                    }}
                >
                    🔄 Restart
                </button>
            </div>

            {/* Game Over */}
            {gameOver && (
                <div className="game-over-overlay">

                    <div className="game-over-card">

                        <h2>💀 Game Over</h2>

                        <p>Score : {score}</p>

                        <p>High Score : {highScore}</p>

                        <button
                            className="play-again-btn"
                            onClick={() => {
                                clearInterval(intervalRef.current);

                                setSnake(INITIAL_SNAKE);
                                setFood(generateFood(INITIAL_SNAKE));
                                setDirection("RIGHT");

                                setScore(0);
                                setPaused(false);
                                setGameOver(false);
                                setGameStarted(true);
                            }}
                        >
                            🔄 Play Again
                        </button>

                    </div>

                </div>
            )}
            <div className="mobile-controls">

                <button
                    onClick={() => {
                        if (direction !== "DOWN")
                            setDirection("UP");
                    }}
                >
                    ⬆
                </button>

                <div>

                    <button
                        onClick={() => {
                            if (direction !== "RIGHT")
                                setDirection("LEFT");
                        }}
                    >
                        ⬅
                    </button>

                    <button
                        onClick={() => {
                            if (direction !== "LEFT")
                                setDirection("RIGHT");
                        }}
                    >
                        ➡
                    </button>

                </div>

                <button
                    onClick={() => {
                        if (direction !== "UP")
                            setDirection("DOWN");
                    }}
                >
                    ⬇
                </button>

            </div>

        </div>
    );
}

export default Snake;