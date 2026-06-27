import { useParams } from "react-router-dom";
import games from "../data/Games";

function GameDetails() {
  const { gameName } = useParams();

  const game = games.find(
    (g) => g.slug === gameName
  );

  if (!game) {
    return <h1>Game Not Found</h1>;
  }

  return (
    <div className="game-details">
      <img
        src={game.image}
        alt={game.title}
      />

      <h1>{game.title}</h1>

      <p>{game.description}</p>

      <p>
        Slug: {game.slug}
      </p>
    </div>
  );
}

export default GameDetails;