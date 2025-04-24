import React, {useState, useRef, useEffect} from "react";
import "./NavigationStyle.scss";

// Import Component
import Searchbox from "../searchBox/Searchbox";
import Profile from "./Profile/Profile";

// Import PNG Image
import logo from "../../Assets/image/Logo.png";

//Import SVG Icon
import {ReactComponent as HomeIcon} from "../../Assets/Icon/Home.svg";
import {ReactComponent as AllGamesIcon} from "../../Assets/Icon/AllGames.svg";
import {ReactComponent as FavouriteIcon} from "../../Assets/Icon/Favourite.svg";
import {ReactComponent as AboutUsIcon} from "../../Assets/Icon/AboutUs.svg";
import {ReactComponent as SearchIcon} from "../../Assets/Icon/search.svg";

function Navigation() {
    const NavigationSelect = useRef(null);
    const [Open,setOpen] = useState(false);
    const [Select,setSelect] = useState(false);


    // Functions
    useEffect(() => {
        function handleClickOutside(event) {
            if (NavigationSelect.current && !NavigationSelect.current.contains(event.target)) {
                setOpen(false); // فقط اگه بیرون بود، ببند
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


  return (
      <nav
          className={`Navigation-Background ${Open ? "Open-Navigation" : "Close-Navigation"}`}
          ref={NavigationSelect}
          onClick={() => setOpen(true)}
      >
          <div className="Navigation-Logo">
              <img src={logo} alt="Logo"/>
          </div>
          <div className="Navigation-SearchBox">
              <SearchIcon className="Navigation-Icon"/>
              {/*<Searchbox/>*/}
          </div>
          <div className="Navigation-Content">
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select">
                      <div className="NC-ICO">
                          <HomeIcon className="Navigation-Icon"/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>صفحه اصلی</span>
                      </div>
                  </button>
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
              </div>
              <div className="Navigation-Content-Icon">
                  <button className="Navigation-Content-Select">
                      <div className="NC-ICO">
                          <FavouriteIcon className="Navigation-Icon"/>
                      </div>
                      <div className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}>
                          <span>مورد علاقه</span>
                      </div>
                  </button>
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
              </div>
          </div>
      </nav>
  );
}

export default Navigation;
