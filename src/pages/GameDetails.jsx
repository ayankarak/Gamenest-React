import { useParams, Link } from "react-router-dom";
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

        <Link to="/" className="back-btn">
            ← Back to Home
        </Link>

        <div className="game-banner">
            <img src={game.image} alt={game.title} />
        </div>

        <div className="game-info">

            <h1>{game.title}</h1>

            <p>{game.description}</p>

            <h3>Category</h3>
            <p>{game.category}</p>

            <h3>Difficulty</h3>
            <p>{game.difficulty}</p>

            <button className="play-btn">
            ▶ Play Game
            </button>

        </div>

        </div>
  );
}

export default GameDetails;