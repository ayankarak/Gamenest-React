import {useEffect,useRef,useState} from "react";

import "./CarRacing.css";
import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";
import { GAME_WIDTH, GAME_HEIGHT } from "./constant";
import {moveLeft,moveRight ,moveForward,moveBackward,moveEnemy} from "./controls";
import { createPlayer , createEnemy } from "./cars";
import {checkCollision} from "./gameLogic";

function CarRacing() {
    // Canvas
    const canvasRef = useRef(null);
    // Player
    const playerRef = useRef(createPlayer());
    const playerImageRef = useRef(new Image());
    const enemyImageRefs = useRef([]);
    const enemyCarsRef = useRef([createEnemy(0),createEnemy(3), createEnemy(4)]);
    // Game State
    const [ difficulty, setDifficulty ] = useState("easy");
    const [ score, setScore ] = useState(0);
    const [highScore,setHighScore] = useState(0);
    const [gameOver,setGameOver] = useState(false);

    // Keyboard Controls

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ) {
                e.preventDefault();
            }
            if (gameOver) {
                return;
            }
            if (e.key === "ArrowLeft") {
                moveLeft(playerRef.current);
            }
            if (e.key === "ArrowRight") {
                moveRight(playerRef.current);
            }
            if (e.key === "ArrowUp") {
                moveForward(playerRef.current);
            }
            if (e.key === "ArrowDown") {
                moveBackward(playerRef.current);
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
//player car draw
    useEffect(() => {
        playerImageRef.current.src = playerRef.current.image;
    }, []);
// enemy car draw
    useEffect(() => {
        enemyImageRefs.current = enemyCarsRef.current.map( enemy => {
                    const image = new Image();
                    image.src = enemy.image;
                    return image;
                }
            );
    }, []);

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
            const player =playerRef.current;
            enemyCarsRef.current.forEach(enemy => {moveEnemy(enemy, 4); });
            if (checkCollision(player, enemyCarsRef.current, player.height))
            {
                setGameOver(true);
                return;
            }
            if (playerImageRef.current.complete) {
                ctx.drawImage(
                    playerImageRef.current,
                    player.x,
                    player.y,
                    player.width,
                    player.height
                );
            }
            // Enemy Cars
            enemyCarsRef.current.forEach( (enemy, index) => {
                   // Move Enemy
                    moveEnemy( enemy, 4 );
                    const enemyImage = enemyImageRefs.current[index];
                    if (enemyImage &&enemyImage.complete) {
                        ctx.drawImage(
                            enemyImage,
                            enemy.x,
                            enemy.y,
                            enemy.width,
                            enemy.height
                        );
                    }
                }
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