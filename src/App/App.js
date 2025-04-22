import React from "react";
import "./AppStyle.scss";

// Import Component
import Cart from "../component/cart/Cart";
import Navigation from "../component/navigation/Navigatin";
const App = () => {
  return (
    <div className="App-Background">
      <Navigation/>
    </div>
  );
};

export default App;
