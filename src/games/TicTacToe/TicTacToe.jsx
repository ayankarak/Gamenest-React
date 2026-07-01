import { useState } from "react";
import "./TicTacToe.css";

function TicTacToe() {

    const [mode, setMode] = useState("");
    const [board, setBoard] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");

    return (

        <div className="ttt-container">

            <h1>⭕ Tic Tac Toe</h1>

            {!mode ? (

                <div className="mode-selection">

                    <h2>Select Game Mode</h2>

                    <button
                        onClick={() => setMode("player")}
                    >
                        👥 Player vs Player
                    </button>

                    <button
                        onClick={() => setMode("computer")}
                    >
                        🤖 Player vs Computer
                    </button>

                </div>

            ) : (

                <>

                    <div className="top-bar">

                        <div className="mode">

                            {mode === "player"
                                ? "👥 Player vs Player"
                                : "🤖 Player vs Computer"}

                        </div>

                        <div className="turn">

                            Turn : {currentPlayer}

                        </div>

                    </div>

                    <div className="board">

                        {board.map((cell, index) => (

                            <div
                                key={index}
                                className="cell"
                            >
                                {cell}
                            </div>

                        ))}

                    </div>

                    <div className="buttons">

                        <button className="restart-btn">

                            🔄 Restart

                        </button>

                        <button
                            className="back-btn"
                            onClick={() => setMode("")}
                        >

                            ⬅ Change Mode

                        </button>

                    </div>

                </>

            )}

        </div>

    );
}

export default TicTacToe;