// src/Components/GameContext.js
import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]); // Store history
  const [stepNumber, setStepNumber] = useState(0);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [currentTurn, setCurrentTurn] = useState("X");
  const [isAI, setIsAI] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleSquareClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = currentTurn;

    setBoard(newBoard);
    setHistory([...history.slice(0, stepNumber + 1), newBoard]);
    setStepNumber(stepNumber + 1);
    setCurrentTurn(currentTurn === "X" ? "O" : "X");

    if (isAI && currentTurn === "X") {
      setTimeout(() => handleAIMove(newBoard), 500);
    }
  };

  const handleAIMove = (newBoard) => {
    const emptySquares = newBoard
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);

    if (emptySquares.length > 0) {
      const randomMove =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      newBoard[randomMove] = "O";
      setBoard([...newBoard]);
      setHistory([...history, newBoard]);
      setStepNumber(stepNumber + 1);
      setCurrentTurn("X");
    }
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
    for (let [a, b, c] of lines) {
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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setCurrentTurn("X");
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setBoard(history[step]);
    setCurrentTurn(step % 2 === 0 ? "X" : "O");
  };

  return (
    <GameContext.Provider
      value={{
        board,
        playerX,
        playerO,
        currentTurn,
        isAI,
        setIsAI,
        handleSquareClick,
        resetGame,
        setPlayerX,
        setPlayerO,
        gameStarted,
        setGameStarted,
        calculateWinner,
        history,
        stepNumber,
        jumpTo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
