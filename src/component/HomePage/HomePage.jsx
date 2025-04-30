import React from "react";
import "./HomePageStyle.scss";

// Import Component
import Slideshow from "../All Item/SlideShow/SlideShow";

const HomePage = () => {
    return (
        <div className="Home-Page-Background">
            <div className="Home-Page-Slide-Show">
                <Slideshow/>
            </div>
        </div>
    );
};

export default HomePage;