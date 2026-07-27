import { useState } from "react";

import "./CrossSums.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";

function CrossSums() {

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

                        {board.length === 0 ? (

                            <div className="empty-board">
                                <p>
                                    Puzzle will appear here
                                </p>
                            </div>

                        ) : (

                            board.map((row, rowIndex) => (

                                row.map((cell, colIndex) => (

                                    <div
                                        className="cross-sums-cell"
                                        key={`${rowIndex}-${colIndex}`}
                                    >
                                        {cell}
                                    </div>

                                ))

                            ))

                        )}

                    </div>


                    {/* START OVERLAY */}

                    {!gameStarted &&
                        !gameOver && (

                            <div
                                className="game-start-overlay"
                            >

                                <div
                                    className="game-start-card"
                                >

                                    <h2>
                                        ➕ Cross Sums
                                    </h2>

                                    <p>
                                        Solve the puzzle
                                    </p>

                                    <button
                                        className="play-now-btn"
                                        onClick={startGame}
                                    >
                                        ▶️ Play Now
                                    </button>

                                </div>

                            </div>

                        )
                    }


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