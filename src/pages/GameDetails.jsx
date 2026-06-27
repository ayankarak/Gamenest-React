import { useParams } from "react-router-dom";

function GameDetails() {
  const { gameName } = useParams();

  return (
    <div>
      <h1>{gameName}</h1>
    </div>
  );
}

export default GameDetails;