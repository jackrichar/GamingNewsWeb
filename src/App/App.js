import React from "react";
import "./AppStyle.scss";

// Import Component
import Navigation from "../component/navigation/Navigatin";
import Slideshow from "../component/SlideShow/SlideShow";

const App = () => {
  return (
    <div className="App-Background">
      <div className="App-Navigation">
        <Navigation />
      </div>
      <div className="App-Content">
        <Slideshow />
      </div>
    </div>
  );
};

export default App;
