import React, { useState } from "react";
import GameCard from "../cart/Cart";
import gamesData from "../../Assets/jsone/Search.json";
import "./GameListe.scss";

const GameList = () => {
  const [games, setGames] = useState(gamesData); // داده‌ها رو تو state می‌ریزیم

  const handleSave = (id) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, savegame: true } : game
      )
    );
  };

  return (
    <div className="game-list">
      {gamesData.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          name={game.name}
          genre={game.genre}
          poster={game.poster}
          savegame={game.savegame}
          onSave={handleSave}
        />
      ))}
    </div>
  );
};

export default GameList;
