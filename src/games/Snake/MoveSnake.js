import { checkCollision } from "./checkCollision";

// ==============================
// Board Size
// ==============================

const BOARD_SIZE = 20;

// ==============================
// Game Speed
// ==============================

export const getSpeed = (difficulty) => {

    switch (difficulty) {

        case "easy":
            return 200;

        case "medium":
            return 130;

        case "hard":
            return 80;

        default:
            return 200;

    }

};

// ==============================
// Random Food
// ==============================

export const generateFood = (snake) => {

    let food;

    do {

        food = {

            x: Math.floor(Math.random() * BOARD_SIZE),

            y: Math.floor(Math.random() * BOARD_SIZE),

        };

    } while (

        snake.some(

            (cell) =>

                cell.x === food.x &&
                cell.y === food.y

        )

    );

    return food;

};

// ==============================
// Snake Move
// ==============================

export const moveSnake = ({

    snake,

    setSnake,

    food,

    setFood,

    direction,

    score,

    setScore,

    highScore,

    setHighScore,

    setGameOver,

    setGameStarted,

}) => {

    const head = {

        ...snake[0]

    };

    switch (direction) {

        case "UP":
            head.y--;
            break;

        case "DOWN":
            head.y++;
            break;

        case "LEFT":
            head.x--;
            break;

        case "RIGHT":
            head.x++;
            break;

        default:
            break;

    }

    // ==========================
    // Collision
    // ==========================

    if (checkCollision(head, snake)) {

        setGameOver(true);

        setGameStarted(false);

        return;

    }

    // ==========================
    // New Snake
    // ==========================

    const newSnake = [

        head,

        ...snake,

    ];

    // ==========================
    // Eat Food
    // ==========================

    if (

        head.x === food.x &&
        head.y === food.y

    ) {

        const newScore = score + 10;

        setScore(newScore);

        if (newScore > highScore) {

            setHighScore(newScore);

            localStorage.setItem(

                "snakeHighScore",

                newScore

            );

        }

        setFood(

            generateFood(newSnake)

        );

    }

    else {

        newSnake.pop();

    }

    // ==========================

    setSnake(newSnake);

};