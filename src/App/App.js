import React from "react";
import "./AppStyle.scss";

// Import Component
import Cart from "../component/cart/Cart";
import Navigation from "../component/navigation/Navigatin";
import SlideShow from "../component/SlideShow/SlideShow";




const App = () => {
  return (
    <div className="App-Background">
      <Navigation />
      <SlideShow />
    </div>
  );
};

export default App;
