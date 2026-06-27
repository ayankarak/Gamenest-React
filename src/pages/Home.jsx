import Hero from "../component/Hero";
import GameCard from "../component/GameCard";
import games from "../data/Games";

function Home() {
  return (
    <>
      <Hero />

      <section className="games-container" id="games">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>
    </>
  );
}

export default Home;