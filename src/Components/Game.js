import React from "react";
import { useGameContext } from "./GameContext";
import { useTheme } from "../ThemeContext";
import { useLanguage } from "../LanguageContext"; // Import useLanguage
import Board from "./Board";
import PlayerForm from "./PlayerForm";

export default function Game() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage(); // Get language and toggleLanguage from context
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
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        {language === "en" ? "Switch to Nepali" : "Switch to English"}
      </button>

      <h2>
        {language === "en"
          ? `${playerX} (X) vs ${playerO} (O)`
          : `${playerX} (X) बनाम ${playerO} (O)`}
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
          {isAI
            ? language === "en"
              ? "Switch to 2 Players"
              : "२ खेलाडीमा स्विच गर्नुहोस्"
            : language === "en"
            ? "Play Against AI"
            : "ए.आई.सँग खेल्नुहोस्"}
        </button>
      </div>

      <div className="game-board">
        <Board />
      </div>

      <div className="game-info">
        <div>
          <strong>
            {language === "en"
              ? `${currentTurn === "X" ? playerX : playerO}'s Turn`
              : `${currentTurn === "X" ? playerX : playerO} को पालो`}
          </strong>
        </div>
        {winner ? (
          <div className="winner-message">
            🎉{" "}
            {language === "en"
              ? winner === "X"
                ? playerX
                : playerO
              : winner === "X"
              ? playerX
              : playerO}{" "}
            wins! 🎉
          </div>
        ) : null}

        <button
          className="reset-button px-4 py-2 bg-red-500 text-white rounded-lg mt-4"
          onClick={resetGame}
        >
          {language === "en" ? "Reset Game" : "खेल पुनः सुरु गर्नुहोस्"}
        </button>

        <h3 className="mt-4">
          {language === "en" ? "Game History" : "खेलको इतिहास"}
        </h3>
        <button
          onClick={() => jumpTo(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg mt-2"
        >
          {language === "en" ? "Go to Start" : "सुरूमा जानुहोस्"}
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
                    {language === "en"
                      ? `Go to Move #${move}`
                      : `चला #${move} मा जानुहोस्`}
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}
