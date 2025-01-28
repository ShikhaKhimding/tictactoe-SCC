import React from "react";
import { useGameContext } from "./GameContext";
import Board from "./Board";
// import calculateWinner from "./CalculateWinner";

export default function Game() {
  const { board, playerX, playerO, currentTurn, calculateWinner } =
    useGameContext();

  const winner = calculateWinner(board);

  return (
    <div className="game">
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
      </div>
    </div>
  );
}
