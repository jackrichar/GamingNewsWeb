import React, {useContext, useState} from "react";
import "./AppStyle.scss";

// Import Component
import Navigation from "../component/navigation/Navigatin";
import Slideshow from "../component/SlideShow/SlideShow";

// Import Context



const App = () => {
    const [NavigationStatus, setNavigationStatus] = useState(false);

  return (
    <div className="App-Background">
        <div className="App-Navigation" style={ NavigationStatus ? {width: "13rem"} : {width: "55px"}}>
            <Navigation setNavigationStatus={setNavigationStatus}/>
        </div>
        <div className="App-Content">
            <Slideshow/>
        </div>
    </div>
  );
};

export default App;
