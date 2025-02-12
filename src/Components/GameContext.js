import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([]); // Stores all games
  const [stepNumber, setStepNumber] = useState(0);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [currentTurn, setCurrentTurn] = useState("X");
  const [isAI, setIsAI] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // 🟢 Start the game with player names
  const startGame = (playerXName, playerOName) => {
    setPlayerX(playerXName);
    setPlayerO(playerOName);
    setBoard(Array(9).fill(null));
    setStepNumber(0);
    setCurrentTurn("X");
    setGameStarted(true);
  };

  const handleSquareClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = currentTurn;

    setBoard(newBoard);
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
    const winner = calculateWinner(board);
    const gameStatus = winner ? "Completed" : "Incomplete";

    // Store the completed game
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        gameBoard: board, // Stores the final board state
        playerX,
        playerO,
        winner: winner ? (winner === "X" ? playerX : playerO) : null,
        gameStatus,
      },
    ]);

    // Reset game states
    setBoard(Array(9).fill(null));
    setStepNumber(0);
    setCurrentTurn("X");
    setGameStarted(false);
  };

  const jumpTo = (step) => {
    const game = history[step];
    if (!game) return;

    setBoard(game.gameBoard);
    setPlayerX(game.playerX);
    setPlayerO(game.playerO);
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
        startGame, // 🟢 Provide startGame function
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
