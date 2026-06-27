import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <div className="game-card">

      <img src={game.image} alt={game.title} />

      <h2>{game.title}</h2>

      <p>{game.description}</p>

      <Link
        className="play-btn"
        to={`/games/${game.slug}`}
      >
        ▶ Play Game
      </Link>

    </div>
  );
}

export default GameCard;