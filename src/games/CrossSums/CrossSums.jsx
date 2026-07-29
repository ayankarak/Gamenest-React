import { Fragment,useState, useEffect } from "react";

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
    const [removedCells, setRemovedCells] = useState([]);
    const [wrongCells, setWrongCells] = useState([]);
    const [lastCell, setLastCell] = useState(null);

    const toggleCell = (row, col) => {
        const previousValue = removedCells[row]?.[col] || false;
        setRemovedCells(prev => {
            const updated = prev.map(r => [...r]);
            updated[row][col] = !previousValue;
            return updated;
        });
        setLastCell({
            row,
            col,
            previousValue
        });
    };

    const createNewPuzzle = () => {
        const size = BOARD_SIZE[difficulty];
        const newPuzzle = generatePuzzle(size);
        setPuzzle(newPuzzle);
        // Initially no cells are removed by player
        const initialBoard = newPuzzle.solution.map(row =>
            row.map(() => false)
        );
        setRemovedCells(initialBoard);
        setLastCell(null);
        setGameOver(false);
        setScore(0);
    };

    // const handleCellClick = (rowIndex, colIndex) => {
    //     const newRemovedCells = removedCells.map(row => [...row]);
    //     const newValue = !newRemovedCells[rowIndex][colIndex];
    //     newRemovedCells[rowIndex][colIndex] = newValue;
    //     setRemovedCells(newRemovedCells);
    //     setLastCell({ row: rowIndex, col: colIndex });
    // };

    useEffect(() => {
        createNewPuzzle();
    }, [difficulty]);

    const checkAnswer = () => {
        let correct = true;
        const newWrongCells = puzzle.solution.map((row, rowIndex) =>
            row.map((_, colIndex) => {
                const playerRemoved =
                    removedCells[rowIndex]?.[colIndex] || false;
                const correctRemoved =
                    puzzle.removedSolution[rowIndex][colIndex];
                if (playerRemoved !== correctRemoved) {
                    correct = false;
                    return true;
                }
                return false;
            })
        );
        setWrongCells(newWrongCells);
        if (correct) {
            setScore(100);
            setGameOver(true);
        }
    };

    const undoLastMove = () => {
        if (!lastCell) {
            return;
        }
        const { row,col,previousValue } = lastCell;
        setRemovedCells(prev => {
            const updated = prev.map(r => [...r]);
            updated[row][col] = previousValue;
            return updated;
        });

        setWrongCells(prev => {
            const updated = prev.map(r => [...r]);
            if (updated[row]) {
                updated[row][col] = false;
            }
            return updated;
        });
        setLastCell(null);
    };

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
                onChange={(value) => {
                    setDifficulty(value);
                    setGameOver(false);
                }}
            />

            <GameContainer width={545}>

                <div className="cross-sums-wrapper">

                    {/* GAME BOARD */}

                    <div
                        className="cross-sums-board"
                        style={{
                            gridTemplateColumns: `repeat(${puzzle?.solution.length + 1}, 60px)`
                        }}
                    >

                        {/* Top-left empty cell */}
                        <div className="cross-sums-cell empty-cell" />

                        {/* Column Sums */}
                        {puzzle?.colSums.map((sum, index) => (
                            <div
                                key={`col-sum-${index}`}
                                className="cross-sums-cell sum-cell"
                            >
                                {sum}
                            </div>
                        ))}

                        {/* Rows */}
                        {puzzle?.solution.map((row, rowIndex) => (
                            <Fragment key={`row-${rowIndex}`}>

                                {/* Row Sum */}
                                <div className="cross-sums-cell sum-cell">
                                    {puzzle.rowSums[rowIndex]}
                                </div>

                                {/* Puzzle Cells */}
                                {row.map((value, colIndex) => {

                                    const removed =
                                        removedCells[rowIndex]?.[colIndex];

                                    const isWrong =
                                        wrongCells[rowIndex]?.[colIndex];

                                    return (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            className={`cross-sums-cell puzzle-cell
                                                ${removed ? "removed" : ""}
                                                ${isWrong ? "wrong" : ""}
                                            `}
                                            onClick={() =>
                                                toggleCell(
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                        >
                                            {value}
                                        </div>
                                    );
                                })}

                            </Fragment>
                        ))}

                    </div>

                    {/* CONTROLS */}

                    <div className="cross-sums-controls">

                        <button
                            className="check-btn"
                            onClick={checkAnswer}
                        >
                            ✅ Check
                        </button>

                        <button
                            className="undo-btn"
                            onClick={undoLastMove}
                            disabled={!lastCell}
                        >
                            ↩️ Undo
                        </button>

                    </div>

                    {/* COMPLETED / RESULT OVERLAY */}

                    {gameOver && (
                        <div className="game-over-overlay">

                            <div className="game-over-card">

                                <h2>
                                    🎉 You Win!
                                </h2>

                                <p>
                                    Puzzle Completed!
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