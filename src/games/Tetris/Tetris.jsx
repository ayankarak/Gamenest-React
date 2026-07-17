import { useRef, useEffect, useState } from "react";

import "./Tetris.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";
import { gameLoop } from "./gameLoop";

import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    BLOCK_SIZE,
    COLORS
} from "./constant";

import {moveLeft,moveRight,softDrop} from "./controls";
import {rotatePiece} from "./rotate";


import {createBoard, drawBoard} from "./board";

import {createPiece} from "./pieces";

function Tetris(){

    const animationRef = useRef(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [nextPiece, setNextPiece] = useState(createPiece());
    const lastDropTime = useRef(Date.now());
    const canvasRef = useRef(null);
    const nextCanvasRef = useRef(null);

    const [difficulty, setDifficulty] =
        useState("easy");

    const boardRef = useRef(
        createBoard()
    );
    const pieceRef = useRef(
        createPiece()
    );
    
    const getDropInterval = () => {
        switch (difficulty) {
            case "easy":
                return 700;
            case "medium":
                return 450;
            case "hard":
                return 200;
            default:
                return 700;
        }
    };
    const drawPiece = (ctx) => {
        const piece = pieceRef.current;
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = COLORS[value];
                    ctx.fillRect(
                        (piece.x + x) * BLOCK_SIZE,
                        (piece.y + y) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                    ctx.strokeStyle = "#111";
                    ctx.strokeRect(
                        (piece.x + x) * BLOCK_SIZE,
                        (piece.y + y) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                }
            });
        });
    };
    const drawNextPiece = (ctx) => {
        ctx.clearRect(0, 0, 120, 120);
        const piece = nextPiece;
        const block = 25;
        // Center the piec
        const startX =
            (120 - piece.shape[0].length * block) / 2;
        const startY =
            (120 - piece.shape.length * block) / 2;
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = COLORS[value];
                    ctx.fillRect(
                        startX + x * block,
                        startY + y * block,
                        block,
                        block
                    );
                    ctx.strokeStyle = "#111";
                    ctx.strokeRect(
                        startX + x * block,
                        startY + y * block,
                        block,
                        block
                    );
                }
            });
        });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    moveLeft(
                        boardRef.current,
                        pieceRef.current
                    );
                    break;
                case "ArrowRight":
                    moveRight(
                        boardRef.current,
                        pieceRef.current
                    );
                    break;
                case "ArrowDown":
                    softDrop(
                        boardRef.current,
                        pieceRef.current
                    );
                    break;
                case "ArrowUp":
                    rotatePiece(
                        boardRef.current,
                        pieceRef.current
                    );
                    break;
                default:
                    break;
            }
        };
        window.addEventListener(
            "keydown",
          handleKeyDown
        );
        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, []);
    useEffect(() => {
    const canvas = canvasRef.current;
        const nextCanvas = nextCanvasRef.current;
        if (!canvas || !nextCanvas) return;
        const ctx = canvas.getContext("2d");
        const nextCtx = nextCanvas.getContext("2d");
        const animate = () => {
            gameLoop({
                board: boardRef.current,
                piece: pieceRef.current,
                nextPiece,
                setNextPiece,
                lastDropTime,
                dropInterval: getDropInterval(),
                setScore,
                setHighScore,
                setGameOver
            });
            // Main Board
            ctx.clearRect(
                0,
                0,
                CANVAS_WIDTH,
                CANVAS_HEIGHT
            );
            drawBoard(
                ctx,
                boardRef.current,
                BLOCK_SIZE,
                COLORS
            );
            drawPiece(ctx);
            // Next Piece
            drawNextPiece(nextCtx);
            animationRef.current =
                requestAnimationFrame(animate);
        };
        animate();
        return () => {
            cancelAnimationFrame(
                animationRef.current
            );
        };
    }, [difficulty, nextPiece]);
    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        boardRef.current = createBoard();
        pieceRef.current = createPiece();
        lastDropTime.current = Date.now();
    };
    return (
    <div className="tetris-container">
        <GameHeader title="🧩 Tetris" />
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
        <GameContainer width={650}>
            <div className="tetris-layout">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="tetris-canvas"
                />
                <div className="next-piece-panel">
                    <h3>Next</h3>
                    <canvas
                        ref={nextCanvasRef}
                        width={120}
                        height={120}
                        className="next-canvas"
                    />
                </div>
            </div>

        </GameContainer>
        {gameOver && (
            <div className="game-over-overlay">
                <div className="game-over-card">
                    <h2>💀 Game Over</h2>
                    <p>
                        Final Score : {score}
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
);
}
export default Tetris;