import React, { useState } from "react";
import GameCard from "../Cart/Cart";
import gamesData from "../../../Assets/jsone/Search.json";
import "./GameListe.scss";

const GameList = () => {
  const [games, setGames] = useState(gamesData);

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
          name={game.Title}
          genre={game.Genre}
          poster={game.Banner}
          savegame={game.savegame}
          onSave={handleSave}
        />
      ))}
    </div>
  );
};

export default GameList;
