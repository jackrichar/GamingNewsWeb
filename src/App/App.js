import React from "react";
import "./AppStyle.scss";

// Import Component
import Navigation from "../component/navigation/Navigatin";




const App = () => {
  return (
    <div className="App-Background">
        <div className="App-Navigation">
            <Navigation />
        </div>
        <div className="App-Content">

        </div>
    </div>
  );
};

export default App;
