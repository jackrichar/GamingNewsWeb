import React, {useState} from "react";
import "./AppStyle.scss";

// Import Component
import Navigation from "../component/navigation/Navigatin";
import SlideShow from "../component/SlideShow/SlideShow";




const App = () => {
    const [NavigationStatus, setNavigationStatus] = useState(false);
  return (
    <div className="App-Background">
        <div className="App-Navigation" style={ NavigationStatus ? {width: "13rem"} : {width: "55px"}}>
            <Navigation setNavigationStatus={setNavigationStatus}/>
        </div>
        <div className="App-Content" style={ NavigationStatus ? {width: "calc(100% - 13rem)"} : {width: "calc(100% - 55px)"}}>

        </div>
    </div>
  );
};

export default App;
