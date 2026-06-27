import { useState, useEffect } from "react";
import Hero from "../component/Hero";
import GameCard from "../component/GameCard";
import games from "../data/Games";

function Home() {
    const [search,setSearch] = useState("");
    const [category, setCategory] = useState("All");

  // Dynamic Categories
  const categories = ["All", ...new Set(games.map((game) => game.category))];

  // Filter Games
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || game.category === category;

    return matchesSearch && matchesCategory;
  });

    return (
        <>
            <Hero />

            {/* Search & Filter */}
            <div className="controls">

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
                    {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                    ))}
                </select>
                </div>

            </div>

            {/* Game Cards */}
            <section className="games-container" id="games">
                {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                    <GameCard
                    key={game.id}
                    game={game}
                    />
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