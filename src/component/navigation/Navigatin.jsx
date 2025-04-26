import React, {useState, useEffect} from "react";
import "./NavigationStyle.scss";

// Import Component
import Searchbox from "../searchBox/Searchbox";
import Profile from "./Profile/Profile";

// Import PNG Image
import logo from "../../Assets/image/Logo.png";

//Import SVG Icon
import {ReactComponent as HomeIcon} from "../../Assets/Icon/Home.svg";
import {ReactComponent as AllGamesIcon} from "../../Assets/Icon/AllGames.svg";
import {ReactComponent as Hardware} from "../../Assets/Icon/Hardware.svg";
import {ReactComponent as AboutUsIcon} from "../../Assets/Icon/AboutUs.svg";
import {ReactComponent as SearchIcon} from "../../Assets/Icon/search.svg";
import {ReactComponent as ArrowIcon} from "../../Assets/Icon/Arrow.svg";
import {ReactComponent as ProfileIcon} from "../../Assets/Icon/Profile.svg";

function Navigation({setNavigationStatus}) {
    const [Open,setOpen] = useState(false);
    const [Delay, setDelay] = useState(false);
    const [Select,setSelect] = useState(false);

    useEffect(()=>{
        setNavigationStatus(Open);
    },[Open, setNavigationStatus]);

    useEffect(() => {
        let timer;

        if (!Open) {
            timer = setTimeout(() => {
                setDelay(true);
            }, 200);
        } else {
            setDelay(false);
        }

        return () => clearTimeout(timer);
    }, [Open]);


  return (
      <nav className={`Navigation-Background ${Open ? "Open-Navigation" : "Close-Navigation"}`}>
          <div className="Navigation-Logo">
              <img src={logo} alt="Logo"/>
          </div>
          <div className="Navigation-Content">
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select">
                      <div className="NC-ICO">
                          <SearchIcon className="Navigation-Icon"/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>جستوجو</span>
                      </div>
                  </button>
                  {
                      !Open ?
                          (
                              <div className="Navigation-Content-Show-Title">
                                  <span>جسنوجو</span>
                              </div>
                          ):
                          null
                  }
              </div>
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select">
                      <div className="NC-ICO">
                          <HomeIcon className="Navigation-Icon"/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>صفحه اصلی</span>
                      </div>
                  </button>
                  {
                      !Open && Delay ?
                          (
                              <div className="Navigation-Content-Show-Title">
                                  <span>صفحه اصلی</span>
                              </div>
                          ):
                          null
                  }
              </div>
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select">
                      <div className="NC-ICO">
                          <AllGamesIcon className="Navigation-Icon"/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>بازی ها</span>
                      </div>
                  </button>
                  {
                      !Open ?
                          (
                              <div className="Navigation-Content-Show-Title">
                                  <span>بازی ها</span>
                              </div>
                          ):
                          null
                  }
              </div>
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select">
                      <div className="NC-ICO">
                          <AboutUsIcon className="Navigation-Icon"/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>درمورد ما</span>
                      </div>
                  </button>
                  {
                      !Open ?
                          (
                              <div className="Navigation-Content-Show-Title">
                                  <span>درباره ما</span>
                              </div>
                          ):
                          null
                  }
              </div>
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select">
                      <div className="NC-ICO">
                          <ProfileIcon className="Navigation-Icon"/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>پروفایل</span>
                      </div>
                  </button>
                  {
                      !Open ?
                          (
                              <div className="Navigation-Content-Show-Title">
                                  <span>پروفایل</span>
                              </div>
                          ):
                          null
                  }
              </div>
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select" onClick={() => setOpen(!Open)}>
                      <div className="NC-ICO">
                          <ArrowIcon className="Navigation-Icon" style={Open ? {rotate: "0deg"} : {rotate: "180deg"}}/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>بسته</span>
                      </div>
                  </button>
                  {
                      !Open && Delay ?
                          (
                              <div className="Navigation-Content-Show-Title">
                                  <span>باز</span>
                              </div>
                          ):
                          null
                  }
              </div>
          </div>
      </nav>
  );
}

export default Navigation;
