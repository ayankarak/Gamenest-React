import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import GameCard from "./component/GameCard";
import Footer from "./component/Footer";

import games from "./data/Games";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
       <section className="games-container" id="games">

        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}

      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;