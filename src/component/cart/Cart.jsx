import React from "react";
import "./Cart.scss";

const Cart = ({ id, name, genre, poster }) => {
  return (
    <div className="game-card">
      <img src={poster} alt={name} className="game-poster" />
      <div className="game-info">
        <h3>{name}</h3>
        <p>
          <strong>ژانر:</strong> {genre}
        </p>

        <button className="details-btn">جزئیات بیشتر</button>
      </div>
    </div>
  );
};

export default Cart;
