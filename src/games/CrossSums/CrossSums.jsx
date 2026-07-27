import { useState, useEffect } from "react";

import "./CrossSums.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";
import { generatePuzzle } from "./gameLogic";
import { BOARD_SIZE } from "./constants";

function CrossSums() {
    const [difficulty, setDifficulty] = useState("easy");
    //const [gameStarted, setGameStarted] = useState(false);
    const [puzzle, setPuzzle] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [score, setScore] = useState(0);

    const [board, setBoard] = useState([]);

    const createNewPuzzle = () => {
        const size = BOARD_SIZE[difficulty];
        const newPuzzle = generatePuzzle(size);
        setPuzzle(newPuzzle);
        const emptyBoard = newPuzzle.solution.map(row =>
            row.map(() => null)
        );
        setBoard(emptyBoard);
        setGameOver(false);
        setScore(0);
    };

    useEffect(() => {
        createNewPuzzle();
    }, [difficulty]);

    const restartGame = () => {
        createNewPuzzle();
    };

    return (
    <div className="cross-sums-container">

        <GameHeader
            title="➕ Cross Sums"
        />

        <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
        />

        <GameContainer
            width={500}
        >

            <div className="cross-sums-wrapper">

                {/* GAME BOARD */}

                <div className="cross-sums-board">

                    {board.map((row, rowIndex) => (

                        <div
                            className="cross-sums-row"
                            key={rowIndex}
                        >

                            {/* BOARD CELLS */}

                            {row.map((cell, colIndex) => (

                                <div
                                    className="cross-sums-cell"
                                    key={`${rowIndex}-${colIndex}`}
                                >
                                    {cell}
                                </div>

                            ))}

                            {/* ROW SUM */}

                            <div className="sum-cell row-sum">
                                {puzzle?.rowSums[rowIndex]}
                            </div>

                        </div>

                    ))}


                    {/* COLUMN SUMS */}

                    <div className="cross-sums-row column-sums">

                        {puzzle?.colSums.map(
                            (sum, index) => (

                                <div
                                    className="sum-cell"
                                    key={index}
                                >
                                    {sum}
                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* GAME OVER / COMPLETED OVERLAY */}

                {gameOver && (

                    <div
                        className="game-over-overlay"
                    >

                        <div
                            className="game-over-card"
                        >

                            <h2>
                                🎉 Puzzle Completed!
                            </h2>

                            <p>
                                Score: {score}
                            </p>

                            <button
                                className="play-again-btn"
                                onClick={restartGame}
                            >
                                🔄 Play Again
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </GameContainer>

    </div>
);
}

export default CrossSums;