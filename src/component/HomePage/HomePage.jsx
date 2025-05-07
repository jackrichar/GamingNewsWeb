import React from "react";
import "./HomePageStyle.scss";

// Import SVG
import { ReactComponent as ArrowIcon } from "../../Assets/Icon/ArrowV2.svg";

// Import Component
import Slideshow from "../All Item/SlideShow/SlideShow";
import GameList from "../All Item/GameList/GameList";
import CartSlideShow from "../All Item/CartSlideShow/CartSlideShow";

const HomePage = () => {
  return (
    <div className="Home-Page-Background">
      <div className="Home-Page-Slide-Show">
        <Slideshow />
      </div>
      <div className="Home-Page-Cart-Slide-Show">
        <div className="Home-Page-Cart-Title">
          <button>
            <ArrowIcon />
          </button>
          <span>محبوب ترین</span>
        </div>
        <div className="Home-Page-Card-Background">
          <CartSlideShow />
        </div>
      </div>
      {/*<div className="Home-Page-Cart-Slide-Show-Mobile">*/}
      {/*  <CartSlideShowMobile />*/}
      {/*</div>*/}

      {/*<div className="Home-Page-GameList">*/}
      {/*  <GameList />*/}
      {/*</div>*/}
    </div>
  );
};

export default HomePage;
