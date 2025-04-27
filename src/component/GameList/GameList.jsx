import React from "react";
import GameCard from "../cart/Cart";
import gamesData from "../../Assets/jsone/Search.json";
import "./GameListe.scss";

const GameList = () => {
  return (
    <div className="game-list">
      {gamesData.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          name={game.name}
          genre={game.genre}
          poster={game.poster}
        />
      ))}
    </div>
  );
};

export default GameList;
