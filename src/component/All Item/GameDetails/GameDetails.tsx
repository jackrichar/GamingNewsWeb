import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import gamesData from "../../../Assets/jsone/Search.json";
import "./GameDetails.scss";

const GameDetails = () => {
  const { id } = useParams<{ id: string }>(); // مشخص کردن نوع id به‌عنوان string
  const game = gamesData.find((game) => game.id === parseInt(id || "0")); // مدیریت id undefined
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleBack = () => {
    window.history.back(); // بازگشت به صفحه قبلی در تاریخچه مرورگر
  };

  if (!game) {
    return (
      <div className="game-not-found">
        <h2>بازی یافت نشد</h2>
        <p>بازی با شناسه {id} وجود ندارد.</p>
        <button onClick={handleBack} className="back-button">
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <div className="game-details">
      <button onClick={handleBack} className="back-button">
        بازگشت
      </button>
      <img src={game.Banner} alt={game.Title} className="game-banner" />
      <h2>{game.Title}</h2>
      <p>ژانر: {game.Genre}</p>
      {game.MetaScore && <p>امتیاز: {game.MetaScore}/100</p>}
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
                onClick={() => openLightbox(image)}
              />
            ))}
          </div>
        </div>
      )}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img
              src={selectedImage}
              alt="Enlarged screenshot"
              className="lightbox-image"
            />
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
