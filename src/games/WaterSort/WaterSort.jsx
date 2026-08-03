import { useState } from "react";

import "./WaterSort.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";

function WaterSort() {

    const [difficulty, setDifficulty] = useState("easy");

    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(() => {
        const savedHighScore =
            localStorage.getItem("waterSortHighScore");

        return savedHighScore
            ? Number(savedHighScore)
            : 0;
    });

    const [gameOver, setGameOver] = useState(false);

    const [tubes, setTubes] = useState([]);

    const [selectedTube, setSelectedTube] = useState(null);

    return (
        <div className="water-sort-container">

            <GameHeader
                title="💧 Water Sort"
            />

            <ScoreBoard
                items={[
                    {
                        label: "Score",
                        value: score
                    },
                    {
                        label: "High Score",
                        value: highScore
                    }
                ]}
            />

            <DifficultySelector
                value={difficulty}
                onChange={setDifficulty}
            />

            <GameContainer width={600}>

                <div className="water-sort-wrapper">

                    {/* GAME BOARD */}

                    <div className="water-sort-board">

                        {tubes.length === 0 ? (

                            <div className="empty-board">
                                <p>
                                    Puzzle will appear here
                                </p>
                            </div>

                        ) : (

                            tubes.map((tube, index) => (

                                <div
                                    key={index}
                                    className={`water-tube ${
                                        selectedTube === index
                                            ? "selected"
                                            : ""
                                    }`}
                                >

                                    {tube.map(
                                        (color, colorIndex) => (
                                            <div
                                                key={colorIndex}
                                                className="water-layer"
                                                style={{
                                                    backgroundColor:
                                                        color
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    {/* GAME OVER */}
                    {gameOver && (
                        <div className="game-over-overlay">
                            <div className="game-over-card">
                                <h2>
                                    🎉 Puzzle Completed!
                                </h2>
                                <p>
                                    Score: {score}
                                </p>
                                <button
                                    className="play-again-btn"
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

export default WaterSort;