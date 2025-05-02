import React, { useState } from "react";
import "./AppStyle.scss";

// Import Component
import Navigation from "../component/navigation/Navigatin";
import HomePage from "../component/HomePage/HomePage";

const App = () => {
  const [NavigationStatus, setNavigationStatus] = useState(false);
  return (
    <>
      <div className="App-Background">
        <div
          className={`App-Navigation  ${
            NavigationStatus ? "Open-App-Navigation" : "Close-App-Navigation"
          }`}
        >
          <Navigation setNavigationStatus={setNavigationStatus} />
        </div>
        <div
          className={`App-Content  ${
            NavigationStatus ? "Open-App-Content" : "Close-App-Content"
          }`}
        >
          <HomePage />
        </div>
      </div>
    </>
  );
};

export default App;
