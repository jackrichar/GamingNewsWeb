import React from "react";
import "./CardStyle.scss";
import { Link } from "react-router-dom";
import "../../../../Assets/jsone/Search.json";

// import NotLoadingImagePoster from "../../../../Assets/image/NotLoadImagePoster.png";

const Card = ({ id, Poster }) => {
  return (
    <div className="Card-Background">
      <img className="Card-img" src={Poster} alt="" />

      <Link to={`/game/${id}`}>
        <button className="Card-Button">
          <span>جزئیات بیشتر</span>
        </button>
      </Link>
    </div>
  );
};

export default Card;
