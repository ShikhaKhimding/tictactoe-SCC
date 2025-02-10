import React from "react";
import { useGameContext } from "./GameContext";
import { useTheme } from "../ThemeContext";
import Board from "./Board";
import PlayerForm from "./PlayerForm";

export default function Game() {
  const { theme, toggleTheme } = useTheme();
  const {
    board,
    playerX,
    playerO,
    currentTurn,
    calculateWinner,
    isAI,
    setIsAI,
    resetGame,
    gameStarted,
    history,
    jumpTo,
  } = useGameContext();

  const winner = calculateWinner(board);

  if (!gameStarted) {
    return <PlayerForm />;
  }

  return (
    <div
      className={`game flex flex-col min-h-screen p-4 
       ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      {/* Theme Toggle Button */}

      <h2>
        {playerX} (X) vs {playerO} (O)
      </h2>
      <div className="settings mb-4">
        <button
          className={`px-4 py-2 rounded-md text-white font-semibold transition ${
            isAI
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => {
            setIsAI(!isAI);
            resetGame();
          }}
        >
          {isAI ? "Switch to 2 Players" : "Play Against AI"}
        </button>
      </div>

      <div className="game-board">
        <Board />
      </div>

      <div className="game-info">
        <div>
          <strong>{currentTurn === "X" ? playerX : playerO}'s Turn</strong>
        </div>
        {winner ? (
          <div className="winner-message">
            🎉 {winner === "X" ? playerX : playerO} wins! 🎉
          </div>
        ) : null}

        <button
          className="reset-button px-4 py-2 bg-red-500 text-white rounded-lg mt-4"
          onClick={resetGame}
        >
          Reset Game
        </button>

        <h3 className="mt-4">Game History</h3>
        <button
          onClick={() => jumpTo(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg mt-2"
        >
          Go to Start
        </button>
        <ul className="mt-2">
          {history.map(
            (_, move) =>
              move > 0 && (
                <li key={move}>
                  <button
                    onClick={() => jumpTo(move)}
                    className="px-3 py-1 bg-gray-300 rounded-lg mt-1"
                  >
                    Go to Move #{move}
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}
