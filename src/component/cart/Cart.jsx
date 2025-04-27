import React, { useState } from "react";
import "./Cart.scss";
import { ReactComponent as FavouriteIcon } from "../../Assets/Icon/Favourite.svg";

const Cart = ({ id, name, genre, poster, savegame, onSave }) => {
  const [isSaved, setIsSaved] = useState(savegame); // برای مدیریت وضعیت دکمه

  const handleClick = () => {
    if (!isSaved) {
      setIsSaved(true); // تغییر وضعیت دکمه
      onSave(id); // تغییر savegame تو state کلی
    }
  };

  return (
    <div className="game-card">
      <img src={poster} alt={name} className="game-poster" />
      <h3 className="game-name">{name}</h3>

      <div className="game-info">
        <button
          className={`details-btn ${isSaved ? "saved" : ""}`}
          onClick={handleClick}
        >
          {isSaved ? "ذخیره شد" : "ذخیره"}
          <FavouriteIcon className="favouriticon" />
        </button>

        <p>بیشتر</p>
      </div>
    </div>
  );
};

export default Cart;
