function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} />

      <h2>{game.title}</h2>

      <p>{game.description}</p>

      <a href={game.link} className="play-btn">
        ▶ Play Game
      </a>
    </div>
  );
}

export default GameCard;