import "./RockPaperScissors.css";
import { useState } from "react";
function RockPaperScissors() {

  const [difficulty, setDifficulty] = useState("easy");

  const [userScore, setUserScore] = useState(0);

  const [compScore, setCompScore] = useState(0);

  const [playerMove, setPlayerMove] = useState("❔");

  const [computerMove, setComputerMove] = useState("❔");

  const [result, setResult] = useState("Choose your move");

  const [gameOver, setGameOver] = useState(false);
  return (
    <div className="rps-container">

      <h1>Rock Paper Scissors</h1>

      {/* Difficulty */}

      <div className="difficulty">

        <label>Difficulty</label>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>

          <option value="easy">Easy</option>

          <option value="medium">Medium</option>

          <option value="hard">Hard</option>

        </select>

      </div>

      {/* Score */}

      <div className="scoreboard">

        <div>

          <h3>You</h3>

          <p>{userScore}</p>

        </div>

        <div>

          <h3>Computer</h3>

          <p>{compScore}</p>

        </div>

      </div>

      {/* Moves */}

      <div className="moves">

        <div>

          <h2>Player</h2>

          <div className="move">{playerMove}</div>

        </div>

        <div>

          <h2>Computer</h2>

          <div className="move">{computerMove}</div>

        </div>

      </div>

      {/* Result */}

      <h2 className="result">
        {result}
      </h2>

      {/* Buttons */}

      <div className="choices">

        <button>✊</button>

        <button>📄</button>

        <button>✂️</button>

      </div>

    </div>
  );
}

export default RockPaperScissors;