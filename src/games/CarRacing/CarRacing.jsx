import {useEffect,useRef,useState} from "react";

import "./CarRacing.css";
import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";
import { GAME_WIDTH, GAME_HEIGHT } from "./constant";
import { createPlayer } from "./cars";

function CarRacing() {
    // Canvas
    const canvasRef = useRef(null);
    // Player
    const playerRef = useRef(createPlayer());
    // Game State
    const [ difficulty, setDifficulty ] = useState("easy");
    const [ score, setScore ] = useState(0);
    const [highScore,setHighScore] = useState(0);
    const [gameOver,setGameOver] = useState(false);

    // Keyboard Controls

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) {
                return;
            }
            if (e.key === "ArrowLeft") {
                playerRef.current.lane--;
            }
            if (e.key === "ArrowRight") {
                playerRef.current.lane++;
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
    }, [gameOver]);

    // Canvas Draw

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");
        const draw = () => {
            // Clear Canvas

            ctx.clearRect(
                0,
                0,
                GAME_WIDTH,
                GAME_HEIGHT
            );

            // Road

            ctx.fillStyle = "#222";

            ctx.fillRect(
                0,
                0,
                GAME_WIDTH,
                GAME_HEIGHT
            );

            // Lane Lines

            ctx.strokeStyle = "#ffffff";
            ctx.setLineDash([20,20]);
            for (let i = 1;i < 5;i++) {
                const x = i * (GAME_WIDTH / 5);
                ctx.beginPath();
                ctx.moveTo( x, 0 );
                ctx.lineTo( x, GAME_HEIGHT );
                ctx.stroke();
            }
            ctx.setLineDash([]);
            // Player Car
            const player = playerRef.current;
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(
                player.x,
                player.y,
                player.width,
                player.height
            );
            requestAnimationFrame( draw );
        };


        draw();


    }, []);

    // Restart Game

    const restartGame = () => {
        playerRef.current = createPlayer();
        setScore(0);
        setGameOver(false);
    };


    return (

        <div className="car-racing-container">
            <GameHeader
                title="🏎️ Car Racing"
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
                onChange={
                    setDifficulty
                }
            />
            <GameContainer
                width={GAME_WIDTH}
            >
                <canvas
                    ref={canvasRef}
                    width={GAME_WIDTH}
                    height={GAME_HEIGHT}
                    className="car-racing-canvas"
                />
            </GameContainer>
            {gameOver && (
                <div
                    className="game-over-overlay"
                >
                    <div
                        className="game-over-card"
                    >
                        <h2>
                            💥 Game Over
                        </h2>
                        <p>
                            Score: {score}
                        </p>

                        <button
                            className="play-again-btn"
                            onClick={
                                restartGame
                            }
                        >
                            🔄 Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarRacing;