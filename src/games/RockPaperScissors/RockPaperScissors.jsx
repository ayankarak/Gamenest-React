import "./RockPaperScissors.css";
import { useState, useEffect } from "react";
function RockPaperScissors() {

    const [difficulty, setDifficulty] = useState("easy");

    const [userScore, setUserScore] = useState(0);

    const [compScore, setCompScore] = useState(0);

    const [playerMove, setPlayerMove] = useState("❔");

    const [computerMove, setComputerMove] = useState("❔");

    const [result, setResult] = useState("Choose your move");

    const [gameOver, setGameOver] = useState(false);

    const WINNING_SCORE = 5;

    const moves = {
        rock: "✊",
        paper: "📄",
        scissors: "✂️",
    };
    const winningMoves = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper",
    };
    function getWinningMove(userChoice) {
        const counterMoves = {
            rock: "paper",
            paper: "scissors",
            scissors: "rock",
        };
        return counterMoves[userChoice];
    }
    function getRandomMove() {
        const options = ["rock", "paper", "scissors"];

        const randomIndex = Math.floor(
            Math.random() * options.length
        );

        return options[randomIndex];
    }
    function computerChoice(userChoice) {
        // EASY
        if (difficulty === "easy") {
            return getRandomMove();
        }

        // MEDIUM
        if (difficulty === "medium") {
            const random = Math.random();

            if (random < 0.5) {
            return getRandomMove();
            }

            return getWinningMove(userChoice);
        }

        // HARD
        if (difficulty === "hard") {
            return getWinningMove(userChoice);
        }

        return getRandomMove();
    }
    useEffect(() => {
        if (userScore >= WINNING_SCORE) {
            setResult("🏆 Congratulations! You won the match!");
            setGameOver(true);
        }

        if (compScore >= WINNING_SCORE) {
            setResult("💀 Computer won the match!");
            setGameOver(true);
        }
    }, [userScore, compScore]);
    function playGame(userChoice) {
        // Stop if game is already over
        if (gameOver) return;

        // Computer Move
        const compChoice = computerChoice(userChoice);

        // Update Moves
        setPlayerMove(moves[userChoice]);
        setComputerMove(moves[compChoice]);

        // Draw
        if (userChoice === compChoice) {
            setResult("🤝 It's a Draw!");
            return;
        }

        // User Wins
        if (winningMoves[userChoice] === compChoice) {
            setResult("🎉 You Win!");
            setUserScore((prev) => prev + 1);
        }

        // Computer Wins
        else {
            setResult("💻 Computer Wins!");
            setCompScore((prev) => prev + 1);
        }
    }
    function resetGame() {
        setUserScore(0);
        setCompScore(0);

        setPlayerMove("❔");
        setComputerMove("❔");

        setResult("Choose your move");

        setGameOver(false);

        setDifficulty("easy");
    }
    return (
        <div className="rps-container">

            <h1>Rock Paper Scissors</h1>

            {/* Difficulty */}

            <div className="difficulty">

                <label>Difficulty</label>

                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>

                    <option value="easy">Easy</option>

                    <option value="medium">Medium</option>

                    <option value="hard">Hard</option>

                </select>

            </div>

            {/* Score */}

            <div className="scoreboard">

                <div>

                    <h3>You</h3>

                    <p>{userScore}</p>

                </div>

                <div>

                    <h3>Computer</h3>

                    <p>{compScore}</p>

                </div>

            </div>

            {/* Moves */}

            <div className="moves">

                <div>

                    <h2>Player</h2>

                    <div className="move">{playerMove}</div>

                </div>

                <div>

                    <h2>Computer</h2>

                    <div className="move">{computerMove}</div>

                </div>

            </div>

            {/* Result */}

            <h2 className="result">
                {result}
            </h2>

            {/* Buttons */}

            <div className="choices">

                <button disabled={gameOver} onClick={() => playGame("rock")}>
                    ✊
                </button>

                <button disabled={gameOver} onClick={() => playGame("paper")}>
                    📄
                </button>

                <button disabled={gameOver} onClick={() => playGame("scissors")}>
                    ✂️
                </button>

            </div>
            {gameOver && (
                <div className="reset-container">
                    <button
                        className="reset-btn"
                        onClick={resetGame}
                    >
                        🔄 Play Again
                    </button>
                </div>
            )}

        </div>
    );
}

export default RockPaperScissors;