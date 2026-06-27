import { useState, useEffect } from "react";
import Hero from "../component/Hero";
import GameCard from "../component/GameCard";
import games from "../data/Games";

function Home() {
    const [search,setSearch] = useState("");

    const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

   return (
        <>
            <Hero />

            {/* Search Bar */}
            <div className="search-container">
                <input
                type="text"
                placeholder="Search your favorite game..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Game Cards */}
            <section className="games-container" id="games">
                {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))
                ) : (
                <h2 className="no-games">
                    No games found 😔
                </h2>
                )}
            </section>
        </>
  );
}

export default Home;