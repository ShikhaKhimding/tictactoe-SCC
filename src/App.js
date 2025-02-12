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

          <Game />
        </div>
      </GameProvider>
    </ThemeProvider>
  );
};

export default App;
