import React from "react";
import { useForm } from "react-hook-form";
import { useGameContext } from "./GameContext";

export default function PlayerForm() {
  const { setPlayerX, setPlayerO, setGameStarted } = useGameContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setPlayerX(data.playerX);
    setPlayerO(data.playerO);
    setGameStarted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="player-form">
      <div>
        <label>Player X Name:</label>
        <input {...register("playerX", { required: true })} />
        {errors.playerX && <p className="error">Name is required</p>}
      </div>

      <div>
        <label>Player O Name:</label>
        <input {...register("playerO", { required: true })} />
        {errors.playerO && <p className="error">Name is required</p>}
      </div>

      <button type="submit">Start Game</button>
    </form>
  );
}
