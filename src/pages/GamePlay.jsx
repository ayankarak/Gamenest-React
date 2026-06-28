import { useParams } from "react-router-dom";
import RockPaperScissors from "../games/RockPaperScissors/RockPaperScissors";

function GamePlay() {
  const { gameName } = useParams();

  switch (gameName) {
    case "rock-paper-scissors":
      return <RockPaperScissors />;

    default:
      return (
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>
          🚧 This game is under development.
        </h1>
      );
  }
}

export default GamePlay;