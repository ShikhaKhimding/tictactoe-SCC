import React from "react";
import Game from "./Components/Game";
import "./App.css";
import { GameProvider } from "./Components/GameContext";

const App = () => {
  return (
    <GameProvider>
      <div className="App">
        <Game />
      </div>
    </GameProvider>
  );
};

export default App;
