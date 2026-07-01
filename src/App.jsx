import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import NotFound from "./pages/NotFound";
import GamePlay from "./pages/GamePlay";

import games from "./data/Games";
import RockPaperScissors from "./games/RockPaperScissors/RockPaperScissors";
import Snake from "./games/Snake/Snake";
import TicTacToe from "./games/TicTacToe/TicTacToe";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Game Details */}
          <Route
            path="/games/:gameName"
            element={<GameDetails />}
          />

          {/* Play Game */}
          <Route
            path="/games/:gameName/play"
            element={<GamePlay />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;