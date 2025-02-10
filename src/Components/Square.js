import React from "react";
import { useTheme } from "../ThemeContext";
// import { useGameContext } from "../GameContext";

const Square = ({ value, onSquareClick }) => {
  const theme = useTheme();

  return (
    <button
      className={`square ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
