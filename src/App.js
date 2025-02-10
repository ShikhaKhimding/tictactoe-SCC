import React, { useState } from "react";
import Game from "./Components/Game";
import "./App.css";
import { GameProvider } from "./Components/GameContext";
import { ThemeProvider, useTheme } from "./ThemeContext";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider>
      <GameProvider>
        <div className={`App ${theme}`}>
          {/* Single Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-blue-500 text-white rounded-md absolute top-5 right-5"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>

          <Game />
        </div>
      </GameProvider>
    </ThemeProvider>
  );
};

export default App;
