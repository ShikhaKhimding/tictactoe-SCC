import React, { createContext, useContext, useState } from "react";

// Create the GameContext
const GameContext = createContext();

// GameProvider Component
export const GameProvider = ({ children }) => {
  // State for player names
  const [playerNames, setPlayerNames] = useState({
    playerX: "Player X",
    playerO: "Player O",
  });

  // State for the current turn
  const [currentTurn, setCurrentTurn] = useState("X");

  // Function to switch turns
  const switchTurn = () => {
    setCurrentTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
  };

  // Update player names
  const updatePlayerNames = (playerXName, playerOName) => {
    setPlayerNames({ playerX: playerXName, playerO: playerOName });
  };

  return (
    <GameContext.Provider
      value={{
        playerNames,
        currentTurn,
        switchTurn,
        updatePlayerNames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the GameContext
export const useGameContext = () => useContext(GameContext);
