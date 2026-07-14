import { useRef, useEffect ,useState } from "react";

import "./Pong.css";

import GameHeader from "../../component/PlayPage/GameHeader";
import ScoreBoard from "../../component/PlayPage/ScoreBoard";
import DifficultySelector from "../../component/PlayPage/DifficultySelector";
import GameContainer from "../../component/PlayPage/GameContainer";

import {CANVAS_WIDTH,CANVAS_HEIGHT,PADDLE_WIDTH,PADDLE_HEIGHT} from "./constant";
import {createBall} from "./ball";

import {createPlayerPaddle,createAIPaddle,movePlayer} from "./paddle";
import { moveAI } from "./ai";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    BALL_SIZE
} from "./constant";

function Pong() {

    const canvasRef = useRef(null);

    const animationRef = useRef(null);
    const [difficulty, setDifficulty] = useState("easy");

    const playerRef = useRef(
        createPlayerPaddle()
    );

    const aiRef = useRef(
        createAIPaddle()
    );
    const ballRef = useRef(
        createBall()
    );

    const keysRef = useRef({

        ArrowUp: false,

        ArrowDown: false

    });

    useEffect(() => {

        const handleKeyDown = (e) => {

            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown"
            ) {
                keysRef.current[e.key] = true;
            }

        };

        const handleKeyUp = (e) => {

            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowDown"
            ) {
                keysRef.current[e.key] = false;
            }

        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        window.addEventListener(
            "keyup",
            handleKeyUp
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

            window.removeEventListener(
                "keyup",
                handleKeyUp
            );

        };

    }, []);

    // ===========================
    // Draw
    // ===========================

    const draw = (ctx) => {

        ctx.clearRect(
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );

        ctx.fillStyle = "#00e5ff";

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
            ballRef.current.x,
            ballRef.current.y,
            BALL_SIZE / 2,
            0,
            Math.PI * 2
            );
            ctx.fill();

    };

    // ===========================
    // Animation Loop
    // ===========================

    useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const animate = () => {

        movePlayer(

            playerRef.current,

            keysRef.current

        );

        moveAI(

            aiRef.current,

            ballRef.current,

            difficulty

        );

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

}, [difficulty]);

    // return (...)

    return (
    <div className="pong-container">

        <GameHeader title="🏓 Pong" />

        <ScoreBoard
            items={[
                { label: "Score", value: 0 },
                { label: "High Score", value: 0 }
            ]}
        />

        <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
        />

        <GameContainer width={900}>

            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            />

        </GameContainer>

    </div>
);
}
export default Pong;