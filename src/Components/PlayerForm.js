import React, { useState } from "react";
import { useGameContext } from "./GameContext";

const PlayerForm = () => {
  const { updatePlayerNames } = useGameContext();
  const [playerXName, setPlayerXName] = useState("");
  const [playerOName, setPlayerOName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlayerNames(playerXName, playerOName);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-4">
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Player X Name:</label>
        <input
          type="text"
          value={playerXName}
          onChange={(e) => setPlayerXName(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Player O Name:</label>
        <input
          type="text"
          value={playerOName}
          onChange={(e) => setPlayerOName(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Game
      </button>
    </form>
  );
};

export default PlayerForm;
