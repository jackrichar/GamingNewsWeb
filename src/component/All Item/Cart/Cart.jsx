import React, { useState } from "react";
import "./Cart.scss";
import { ReactComponent as FavouriteIcon } from "../../../Assets/Icon/Favourite.svg";
import { Link } from "react-router-dom";

const Cart = ({ id, name, genre, poster, savegame, onSave }) => {
  const [isSaved, setIsSaved] = useState(savegame);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    onSave(id);
  };

  return (
    <div className="Card-Slide-Show-Background">
      <img src={poster} alt={name} className="game-poster" />
      <h3 className="game-name">{name}</h3>

      <div className="game-info">
        <button
          className={`details-btn ${isSaved ? "saved" : ""}`}
          onClick={handleSaveClick}
        >
          <FavouriteIcon
            className={`Favourite-Icon ${isSaved ? "favouriticonActive" : ""}`}
          />
        </button>
      </div>

      <div className="game-information">
        <p className="game-genre">{genre}</p>
      </div>

      <div className="game-info-More">
        <Link to={`/game/${id}`}>
          <button className="more-button">بیشتر</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
