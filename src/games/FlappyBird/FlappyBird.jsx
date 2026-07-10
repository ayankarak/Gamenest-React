import { useEffect, useRef, useState } from "react";
import "./FlappyBird.css";

import bgImage from "../../assets/flappy/flappy_back.png";
import pipeImage from "../../assets/flappy/pipe.png";
import birdImg from "../../assets/flappy/bird.png";

//import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

import {
    createBird,
    jumpBird
} from "./bird";

import {

    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    INITIAL_PIPE_SPEED

} from "./constants";

import { gameLoop } from "./gameLoop";

function FlappyBird() {

    const canvasRef = useRef(null);

    const animationRef = useRef(null);

    const birdRef = useRef(createBird());
    const birdImage = useRef(new Image());
    const scoreRef = useRef(0);

    const pipesRef = useRef([]);

    const bgRef = useRef(new Image());

    const pipeRef = useRef(new Image());

    // const gameState = useRef({

    //     lastPipeTime: Date.now(),

    //     pipeInterval: 1800

    // });

    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(

        Number(localStorage.getItem("flappyHighScore")) || 0

    );
    const [gameStarted, setGameStarted] = useState(false);

    const [gameOver, setGameOver] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    // --------------------
    // Load Images
    // --------------------

    useEffect(() => {
        bgRef.current.src = bgImage;
        pipeRef.current.src = pipeImage;
        birdImage.current.src = birdImg;
    }, []);

    const gameState = useRef({
        lastPipeTime: Date.now(),
        pipeInterval: 1800,
        pipeSpeed: INITIAL_PIPE_SPEED,
        difficulty: "easy"
    });

    // --------------------
    // Draw
    // --------------------



    const draw = (ctx) => {
        const bg = bgRef.current;
        const pipe = pipeRef.current;
        ctx.clearRect(
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );

        // Background

        ctx.drawImage(
            bg,
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );

        // Pipes

        pipesRef.current.forEach((p) => {

            // Top Pipe
            ctx.save();
            ctx.translate(p.x + 35, p.topHeight);
            ctx.scale(1, -1);
            ctx.drawImage(
                pipe,
                -35,
                0,
                70,
                p.topHeight
            );
            ctx.restore();

            // Bottom Pipe

            ctx.drawImage(
                pipe,
                p.x,
                p.bottomY,
                70,
                CANVAS_HEIGHT - p.bottomY
            );
        });

        // Bird

        const bird = birdRef.current;
        ctx.beginPath();
        ctx.save();
        ctx.translate(
            bird.x,
            bird.y
        );

        ctx.rotate(
            bird.rotation * Math.PI / 180
        );
        ctx.drawImage(
            birdImage.current,
            -25,
            -25,
            50,
            50
        );
        ctx.restore();
    };

    // --------------------
    // Start Game
    // --------------------

    const startGame = () => {
        if (gameOver) return;
        if (!gameStarted) {
            setGameStarted(true);
        }
        jumpBird(birdRef.current);
    };

    // --------------------
    // Restart
    // --------------------

    const restartGame = () => {
        scoreRef.current = 0;
        gameState.current.pipeSpeed = INITIAL_PIPE_SPEED;
        birdRef.current = createBird();
        pipesRef.current = [];
        gameState.current.lastPipeTime = Date.now();
        setScore(0);
        setGameStarted(false);
        setGameOver(false);
    };

    // --------------------
    // Keyboard
    // --------------------

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                startGame();
            }
        };
        window.addEventListener(
            "keydown",
            handleKeyDown
        );
        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
    }, [gameStarted, gameOver]);

    useEffect(() => {

        localStorage.setItem(
            "flappyHighScore",
            highScore
        );

    }, [highScore]);

    // --------------------
    // Game Loop
    // --------------------

    useEffect(() => {

        if (!gameStarted || gameOver) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Update game state
        gameState.current.difficulty = difficulty;

        const animate = () => {

            gameLoop({

                bird: birdRef.current,
                pipes: pipesRef.current,
                gameState: gameState.current,

                scoreRef,

                setScore,

                onGameOver: () => {
                    setGameOver(true);
                    setGameStarted(false);
                    cancelAnimationFrame(animationRef.current);
                    const finalScore = scoreRef.current;
                    if (finalScore > highScore) {
                        setHighScore(finalScore);
                        localStorage.setItem(
                            "flappyHighScore",
                            finalScore
                        );

                    }

                }

            });
            draw(ctx);
            animationRef.current = requestAnimationFrame(animate);

        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
        };

    }, [

        gameStarted,
        gameOver,
        difficulty,

    ]);

    // RETURN HERE

    return (

        <div className="flappy-container">

            <h1>🐦 Flappy Bird</h1>

            {/* Scoreboard */}

            <div className="scoreboard">

                <div className="score-card">

                    <h3>Score</h3>

                    <p>{score}</p>

                </div>

                <div className="score-card">

                    <h3>High Score</h3>

                    <p>{highScore}</p>

                </div>

            </div>
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

            {/* Game Area */}

            <div className="game-area">

                <canvas

                    ref={canvasRef}

                    width={CANVAS_WIDTH}

                    height={CANVAS_HEIGHT}

                    onClick={startGame}

                    onTouchStart={startGame}

                />

                {/* Start Screen */}

                {!gameStarted && !gameOver && (

                    <div className="start-overlay">

                        <h2>🐦 Flappy Bird</h2>

                        <p>Press <b>SPACE</b> or Click to Start</p>

                    </div>

                )}

                {/* Game Over */}

                {gameOver && (

                    <div className="game-over-overlay">

                        <div className="game-over-card">

                            <h2>💀 Game Over</h2>

                            <p>Score : {score}</p>

                            <p>High Score : {highScore}</p>

                            <button

                                className="restart-btn"

                                onClick={restartGame}

                            >

                                🔄 Play Again

                            </button>

                        </div>

                    </div>

                )}

            </div>

            {/* Controls */}

            <div className="controls">

                <p>

                    ⌨️ <b>SPACE</b> or <b>Mouse Click</b> to Fly

                </p>

            </div>

        </div>

    );
}

export default FlappyBird;