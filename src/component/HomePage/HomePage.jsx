import React from "react";
import "./HomePageStyle.scss";

// Import Component
import Slideshow from "../All Item/SlideShow/SlideShow";
import GameList from "../All Item/GameList/GameList";
import CartSlideShow from "../All Item/CartSlideShow/CartSlideShow";

const HomePage = () => {
  return (
    <div className="Home-Page-Background">
      <p>مهبوب ترین ها</p>
      <div className="Home-Page-Slide-Show">
        <Slideshow />
      </div>
      <p>جدید ترین ها</p>
      <div className="Home-Page-Cart-Slide-Show">
        <CartSlideShow />
      </div>
      <p>همه بازی ها</p>
      <div className="Home-Page-GameList">
        <GameList />
      </div>
    </div>
  );
};

export default HomePage;
