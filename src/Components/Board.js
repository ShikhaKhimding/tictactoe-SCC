import React from "react";
import Square from "./Square";
import { useGameContext } from "./GameContext";

const Board = () => {
  const { board, handleSquareClick } = useGameContext();

  return (
    <>
      <div className="board-row">
        <Square value={board[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={board[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={board[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={board[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={board[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={board[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={board[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={board[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
};

export default Board;
