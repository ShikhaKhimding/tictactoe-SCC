import React, { useState, useEffect } from "react";
import { useGameContext } from "./GameContext";

const PlayerForm = () => {
  const [playerXName, setPlayerXName] = useState("");
  const [playerOName, setPlayerOName] = useState("");
  const { startGame, history, gameStarted, jumpTo } = useGameContext();

  const handleStartGame = (e) => {
    e.preventDefault();
    startGame(playerXName, playerOName);
  };

  useEffect(() => {
    if (gameStarted) {
      setPlayerXName("");
      setPlayerOName("");
    }
  }, [gameStarted]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Enter Player Names
      </h1>
      <form onSubmit={handleStartGame} className="space-y-4">
        <div>
          <label className="block font-semibold">Player X Name:</label>
          <input
            type="text"
            value={playerXName}
            onChange={(e) => setPlayerXName(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Player X name"
          />
        </div>
        <div>
          <label className="block font-semibold">Player O Name:</label>
          <input
            type="text"
            value={playerOName}
            onChange={(e) => setPlayerOName(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Player O name"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Start Game
        </button>
      </form>

      {/* Game History Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-center mb-3">Game History</h2>
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No games played yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((game, index) => {
              const winnerText = game.winner
                ? `Winner: ${game.winner}`
                : "No winner yet";
              return (
                <li
                  key={index}
                  className="p-3 border rounded-lg shadow-sm bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => jumpTo(index)}
                >
                  <span className="font-semibold">Game #{index + 1}:</span>{" "}
                  {game.playerX} vs {game.playerO} -{" "}
                  <span className="font-semibold">{winnerText}</span> -{" "}
                  <span
                    className={`px-2 py-1 rounded-md text-white ${
                      game.gameStatus === "Completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {game.gameStatus}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlayerForm;
