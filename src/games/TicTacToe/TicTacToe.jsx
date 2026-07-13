import { useState, useEffect } from "react";
import "./TicTacToe.css";
import { getWinner } from "./winner";
import { computerMove } from "./ai";
import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";

function TicTacToe() {

    const [mode, setMode] = useState("");
    const [board, setBoard] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState([]);
    const [difficulty, setDifficulty] = useState("easy");
    const [isThinking, setIsThinking] = useState(false);
    const [xWins, setXWins] = useState(0);

    const [oWins, setOWins] = useState(0);

    const [draws, setDraws] = useState(0);


    const handleClick = (index) => {

        if (
            board[index] !== "" ||
            winner ||
            isThinking
        ) {
            return;
        }

        if (
            mode === "computer" &&
            currentPlayer !== "X"
        ) {
            return;
        }

        const newBoard = [...board];

        newBoard[index] = currentPlayer;

        setBoard(newBoard);

        const result = getWinner(newBoard);

        if (result.winner) {

            setWinner(result.winner);
            setWinningCells(result.winningCells);

            return;
        }

        if (mode === "player") {

            setCurrentPlayer(
                currentPlayer === "X" ? "O" : "X"
            );

        } else {

            setCurrentPlayer("O");

        }

    };

    useEffect(() => {

        if (
            mode !== "computer" ||
            currentPlayer !== "O" ||
            winner ||
            isThinking
        ) {
            return;
        }

        computerMove({
            board,
            difficulty,
            setBoard,
            setCurrentPlayer,
            setWinner,
            setWinningCells,
            setIsThinking
        });

    }, [board, currentPlayer, winner, isThinking, mode, difficulty]);

    return (

        <div className="ttt-container">

            <GameHeader title="⭕ Tic Tac Toe" />

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

                            {
                                isThinking
                                    ?

                                    "🤖 Computer Thinking..."

                                    :

                                    `Turn : ${currentPlayer}`
                            }

                        </div>

                    </div>
                    {mode === "computer" && (
                        <DifficultySelector
                            value={difficulty}
                            onChange={setDifficulty}
                        />
                    )}
                        {winner && (

                            <div className="winner-box">
                                {winner === "Draw"
                                    ?
                                    "🤝 Match Draw"
                                    :
                                    `🏆 Player ${winner} Wins!`
                                }
                            </div>

                        )}
                    <div className="game-layout">

                        <div className="board">

                            {board.map((cell, index) => (

                                <div
                                    key={index}
                                    className={`cell ${winningCells.includes(index)
                                        ? "winner-cell"
                                        : ""
                                        }`}
                                    onClick={() => handleClick(index)}
                                >
                                    {cell}
                                </div>

                            ))}

                        </div>
                        <div className="buttons">

                            <button
                                className="restart-btn"
                                onClick={() => {
                                    setBoard(Array(9).fill(""));
                                    setCurrentPlayer("X");
                                    setWinner(null);
                                    setWinningCells([]);
                                    setIsThinking(false);
                                }}
                            >

                                🔄 Restart

                            </button>

                            <button
                                className="back-btn"
                                onClick={() => {

                                    setMode("");

                                    setBoard(Array(9).fill(""));

                                    setCurrentPlayer("X");

                                    setWinner(null);

                                    setWinningCells([]);

                                    setIsThinking(false);

                                }}
                            >

                                ⬅ Change Mode

                            </button>
                        </div>



                    </div>

                </>

            )}

        </div>

    );
}

export default TicTacToe;