import { useState, useEffect } from "react";
import Hero from "../component/Hero";
import GameCard from "../component/GameCard";
import games from "../data/Games";

function Home() {
    const [search,setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredGames = games.filter((game) => {
        const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
        category === "All" || game.category === category;

        return matchesSearch && matchesCategory;
    });

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
            <div className="filter-container">
                <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option>All</option>
                <option>Arcade</option>
                <option>Puzzle</option>
                <option>Strategy</option>
                <option>Memory</option>
                <option>Racing</option>
                </select>
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