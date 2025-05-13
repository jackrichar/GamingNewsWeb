import React from "react";
import { useParams, Link } from "react-router-dom";
import gamesData from "../../../Assets/jsone/Search.json"; // مسیر فایل JSON
import "./GameDetails.scss"; // استایل مخصوص

const GameDetails = () => {
  const { id } = useParams(); // id از URL دریافت می‌شود (به صورت رشته)
  const game = gamesData.find((game) => game.id === parseInt(id)); // تبدیل id به عدد

  if (!game) {
    return (
      <div className="game-not-found">
        <h2>بازی یافت نشد</h2>
        <p>بازی با شناسه {id} وجود ندارد.</p>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </div>
    );
  }

  return (
    <div className="game-details">
      <Link to="/" className="back-button">
        بازگشت
      </Link>
      <img src={game.Banner} alt={game.Title} className="game-banner" />
      <h2>{game.Title}</h2>
      <p>ژانر: {game.Genre}</p>
      {game.Rating && <p>امتیاز: {game.Rating}/100</p>}
      {game.Gallery && (
        <div className="game-gallery">
          <h3>گالری تصاویر</h3>
          <div className="gallery-images">
            {game.Gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${game.Title} screenshot ${index + 1}`}
                className="gallery-image"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
