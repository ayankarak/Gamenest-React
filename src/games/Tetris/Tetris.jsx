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
    const lastDropTime = useRef(Date.now());
    const canvasRef = useRef(null);

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

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const animate = () => {
           if (gameOver) return;
            gameLoop({

                board:boardRef.current,
                piece: pieceRef.current,

                lastDropTime,

                dropInterval: getDropInterval(),
                setScore,
                setHighScore,
                setGameOver
            });

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

            animationRef.current =
                requestAnimationFrame(animate);

        };

        animate();

        return () => {

            cancelAnimationFrame(
                animationRef.current
            );

        };

    }, [difficulty,gameOver]);
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

        <GameContainer width={420}>

            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="tetris-canvas"
            />

        </GameContainer>

    </div>
);
}
export default Tetris;