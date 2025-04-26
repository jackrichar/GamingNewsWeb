import React from "react";
import "./Cart.scss";

const Cart = ({ id, name, genre, poster }) => {
  return (
    <div className="game-card">
      <img src={poster} alt={name} className="game-poster" />
      <h3 className="game-name">{name}</h3>

      <div className="game-info">
        <button className="details-btn">جزئیات بیشتر</button>
      </div>
    </div>
  );
};

export default Cart;
