import rock from "../assets/rock_paper.png";
import tic from "../assets/tic.png";
import snake from "../assets/snake.png";
import flappy from "../assets/flappy_back.png";
import pong from "../assets/pong.png";
import tetris from "../assets/tetris.png";
import car from "../assets/car.png";
import match from "../assets/match.png";
import cross from "../assets/cross.png";
import water from "../assets/water.png";

const games = [
  {
    id: 1,
    title: "Rock Paper Scissors",
    image: rock,
    description: "Interactive game with dynamic result logic.",
    link: "/games/rock-paper-scissor"
  },
  {
    id: 2,
    title: "Tic Tac Toe",
    image: tic,
    description: "Dynamic winner detection with clean UI logic.",
    link: "https://ayankarak.github.io/TIC-TAC_TOE/"
  },
  {
    id: 3,
    title: "Snake Game",
    image: snake,
    description: "Classic snake game with smooth controls.",
    link: "https://ayankarak.github.io/MY-SNAKE-GAME/"
  },
  {
    id: 4,
    title: "Flappy Bird",
    image: flappy,
    description: "Challenging bird-flapping game with simple controls.",
    link: "/games/flappy-bird"
  },
    {
    id: 5,
    title: "Pong",
    image: pong,
    description: "Classic arcade game with simple controls.",
    link: "/games/pong"
    },
    {
        id: 6,
        title: "Tetris",
        image: tetris,
        description: "Classic puzzle game with smooth controls.",
        link: "https://ayankarak.github.io/Tetris/"
    },
    {
        id: 7,
        title: "Car Racing",
        image: car,
        description: "Exciting car racing game with realistic physics.",
        link: "https://ayankarak.github.io/MY-CAR-GAMES/"
    },

    {
        id: 8,
        title: "Memory Match",
        image: match,
        description: "Challenging memory matching game with simple controls.",
        link: "https://ayankarak.github.io/MATCH-THE-IMAGES//"
    },
    {
        id: 9,
        title: "Cross Sum",
        image: cross,
        description: "Grid-based puzzle where row and column sums must match the target numbers.",
        link: "/games/cross-sum"
    },
    {
        id: 10,
        title: "Water Sorting",
        image: water,
        description: "Challenging water sorting game with simple controls.",
        link: "/games/water-sorting"
    }

  // baki games ekhane add korbo...
];

export default games;