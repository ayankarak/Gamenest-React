import { useState, useRef, useEffect } from "react";
import "./Snake.css";

const BOARD_SIZE = 20;

const INITIAL_SNAKE = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
];

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
    // Difficulty Speed
    // -----------------------------

    const getSpeed = () => {
        switch (difficulty) {
            case "easy":
                return 200;

            case "medium":
                return 130;

            case "hard":
                return 80;

            default:
                return 200;
        }
    };

    const generateFood = (currentSnake) => {
        let newFood;

        do {
            newFood = {
                x: Math.floor(Math.random() * BOARD_SIZE),
                y: Math.floor(Math.random() * BOARD_SIZE),
            };
        } while (
            currentSnake.some(
                (cell) => cell.x === newFood.x && cell.y === newFood.y
            )
        );

        return newFood;
    };

    // -----------------------------
    // Collision Check
    // -----------------------------

    const checkCollision = (head, snakeBody) => {
        // Wall Collision
        if (
            head.x < 0 ||
            head.x >= BOARD_SIZE ||
            head.y < 0 ||
            head.y >= BOARD_SIZE
        ) {
            return true;
        }

        // Self Collision
        return snakeBody.some(
            (cell) => cell.x === head.x && cell.y === head.y
        );
    };

    // -----------------------------
    // Snake Movement
    // -----------------------------

    const moveSnake = () => {
        setSnake((prevSnake) => {
            const head = { ...prevSnake[0] };

            switch (direction) {
                case "UP":
                    head.y--;
                    break;

                case "DOWN":
                    head.y++;
                    break;

                case "LEFT":
                    head.x--;
                    break;

                case "RIGHT":
                    head.x++;
                    break;

                default:
                    break;
            }

            // Game Over
            if (checkCollision(head, prevSnake)) {
                setGameOver(true);
                setGameStarted(false);

                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem("snakeHighScore", score);
                }

                clearInterval(intervalRef.current);

                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Food Eat
            if (head.x === food.x && head.y === food.y) {
                setScore((prev) => prev + 10);

                setFood(generateFood(newSnake));
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
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
    moveSnake();
  }, getSpeed());

  return () => {
    clearInterval(intervalRef.current);
  };
}, [gameStarted, direction, paused, gameOver, difficulty]);


return (
  <div className="snake-container">

    {/* Title */}
    <h1>🐍 Snake Game</h1>

    {/* Difficulty */}
    <div className="difficulty">
      <label>Difficulty : </label>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

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

    {/* Game Layout */}
    <div className="game-layout">

      {/* Left Panel */}
      <div className="left-panel">

        <div className="score-card">
          <h3>Score</h3>
          <p>{score}</p>
        </div>

        <div className="score-card">
          <h3>High Score</h3>
          <p>{highScore}</p>
        </div>

      </div>

      {/* Game Board */}
      <div className="board">
        {Array.from({ length: BOARD_SIZE }).map((_, row) =>
          Array.from({ length: BOARD_SIZE }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`cell ${
                isSnakeCell(col, row) ? "snake" : ""
              } ${
                isFoodCell(col, row) ? "food" : ""
              }`}
            ></div>
          ))
        )}
      </div>

    </div>

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

  </div>
);
}

export default Snake;