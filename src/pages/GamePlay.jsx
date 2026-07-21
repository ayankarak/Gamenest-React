import { useParams } from "react-router-dom";
import RockPaperScissors from "../games/RockPaperScissors/RockPaperScissors";
import Snake from "../games/Snake/Snake";
import TicTacToe from "../games/TicTacToe/TicTacToe";
import FlappyBird from "../games/FlappyBird/FlappyBird";
import Pong from "../games/Pong/Pong";
import Tetris from "../games/Tetris/Tetris";
import MemoryMatch from "../games/MemoryMatch/MemoryMatch";
import CarRacing from "../games/CarRacing/CarRacing";

function GamePlay() {
  const { gameName } = useParams();

  switch (gameName) {
    case "rock-paper-scissors":
      return <RockPaperScissors />;
    case "snake-game":
      return <Snake />;
    case "tic-tac-toe":
      return <TicTacToe />;
    case "flappy-bird":
      return <FlappyBird />;
    case "pong":
      return <Pong />;
    case "tetris":
      return<Tetris/>
    case "memory-match":
      return <MemoryMatch/>
    case "car-racing":
      return <CarRacing/>
    default:
      return (
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>
          🚧 This game is under development.
        </h1>
      );
  }
}

export default GamePlay;