import React, { createContext, useContext, useState } from "react";

const GameContext = createContext(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState("Player 1");
  const [playerO, setPlayerO] = useState("Player 2");
  const [currentTurn, setCurrentTurn] = useState("X");

  const handleSquareClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = currentTurn;

    setBoard(newBoard);
    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <GameContext.Provider
      value={{
        board,
        playerX,
        playerO,
        currentTurn,
        handleSquareClick,
        setPlayerX,
        setPlayerO,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
