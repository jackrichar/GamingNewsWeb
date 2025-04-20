import React from "react";
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

function Navigation() {
  return (
    <>
      <nav className="container">
        <div className="items">
          <div className="logo_search">
            <div className="logo">
              <img style={{ width: 52, height: 38 }} src={logo} alt="logo" />
            </div>

            <Searchbox />

            <div className="navigation-Menu">
              <a href="#" className="navigation-Menu-Items">
                <button>
                  <span>صفحه اصلی</span>
                </button>
              </a>
              <a href="#" className="navigation-Menu-Items">
                <button>
                  <span>بازی ها</span>
                </button>
              </a>
              <a href="#" className="navigation-Menu-Items">
                <button>
                  <span>مورد علاقه</span>
                </button>
              </a>
              <a href="#" className="navigation-Menu-Items">
                <button>
                  <span>درمورد ما</span>
                </button>
              </a>
            </div>
          </div>

          <Profile/>

        </div>
      </nav>
    </>
  );
}

export default Navigation;
