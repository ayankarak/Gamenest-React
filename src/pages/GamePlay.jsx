import { useParams } from "react-router-dom";
import RockPaperScissors from "../games/RockPaperScissors/RockPaperScissors";
import Snake from "../games/Snake/Snake";
import TicTacToe from "../games/TicTacToe/TicTacToe";

function GamePlay() {
  const { gameName } = useParams();

  switch (gameName) {
    case "rock-paper-scissors":
      return <RockPaperScissors />;
    case "snake-game":
      return <Snake />;
    case "tic-tac-toe":
      return <TicTacToe />;

    default:
      return (
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>
          🚧 This game is under development.
        </h1>
      );
  }
}

export default GamePlay;