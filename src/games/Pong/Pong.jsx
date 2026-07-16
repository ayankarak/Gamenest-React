import { useRef, useEffect ,useState } from "react";

import "./Pong.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";
import {createBall} from "./ball";

import {createPlayerPaddle,createAIPaddle,movePlayer} from "./paddle";
import { moveAI } from "./ai";
import { gameLoop } from "./gameLoop";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    BALL_SIZE
} from "./constant";

function Pong() {

    const canvasRef = useRef(null);
    const mouseYRef = useRef(CANVAS_HEIGHT / 2);
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const animationRef = useRef(null);
    const [difficulty, setDifficulty] = useState("easy");
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState("");
    const playerRef = useRef(
        createPlayerPaddle()
    );

    const aiRef = useRef(
        createAIPaddle()
    );
    const ballRef = useRef(
        createBall()
    );

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseYRef.current = e.clientY - rect.top;
        };
        canvas.addEventListener(
            "mousemove",
            handleMouseMove
        );
        return () => {
            canvas.removeEventListener(
                "mousemove",
                handleMouseMove
            );
        };

    }, []);

    // Draw

    const draw = (ctx) => {
        //console.log("drawing....");
        ctx.clearRect(
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );
        ctx.fillStyle = "#00e5ff";
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.setLineDash([12, 12]);
            ctx.moveTo(CANVAS_WIDTH / 2, 0);
            ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
            ctx.stroke();
            ctx.setLineDash([]);
                    
        // Player Paddle
        ctx.fillRect(
            playerRef.current.x,
            playerRef.current.y,
            PADDLE_WIDTH,
            PADDLE_HEIGHT
        );
        // AI Paddle
        ctx.fillRect(
            aiRef.current.x,
            aiRef.current.y,
            PADDLE_WIDTH,
            PADDLE_HEIGHT
        );
        // Ball
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
            ballRef.current.x + BALL_SIZE / 2,
            ballRef.current.y + BALL_SIZE / 2,
            BALL_SIZE / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    };

    // Animation Loop

    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const animate = () => {
        if (gameOver) {
        draw(ctx);      
        return;         // Animation stop
    }
            gameLoop({
                player: playerRef.current,
                ai: aiRef.current,
                ball: ballRef.current,
                mouseY: mouseYRef.current,
                difficulty,
                gameOver,
                setPlayerScore,
                setAiScore,
                setGameOver,
                setWinner
            });
            draw(ctx);
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

const restartGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setWinner("");
    playerRef.current = createPlayerPaddle();
    aiRef.current = createAIPaddle();
    ballRef.current = createBall();
    //cancelAnimationFrame(animationRef.current);

};

    // return (...)

    return (
    <div className="pong-container">

        <GameHeader title="🏓 Pong" />

        <ScoreBoard
            items={[
                {
                    label: "Player",
                    value: playerScore
                },
                {
                    label: "Computer",
                    value: aiScore
                }
            ]}
        />

        <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
        />

        <GameContainer width={960}>

            <canvas
                ref={canvasRef}
                className="pong-canvas"
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            />

        </GameContainer>
        {gameOver && (

        <div className="game-over-overlay">

            <div className="game-over-card">

                <h2>🏆 {winner} Wins!</h2>

                <p>
                    Player : {playerScore}
                </p>

                <p>
                    Computer : {aiScore}
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
export default Pong;