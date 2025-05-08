import React, { useState, useEffect } from "react";
import "./NavigationStyle.scss";
import { Link } from "react-router-dom";
// Import Component
import Search from "./Search/Search";
import Profile from "./Profile/Profile";

// Import PNG Image
import logo from "../../Assets/image/Logo.png";

//Import SVG Icon
import { ReactComponent as HomeIcon } from "../../Assets/Icon/Home.svg";
import { ReactComponent as AllGamesIcon } from "../../Assets/Icon/AllGames.svg";
import { ReactComponent as AboutUsIcon } from "../../Assets/Icon/AboutUs.svg";
import { ReactComponent as SearchIcon } from "../../Assets/Icon/search.svg";
import { ReactComponent as ArrowIcon } from "../../Assets/Icon/Arrow.svg";
import { ReactComponent as ProfileIcon } from "../../Assets/Icon/Profile.svg";

function Navigation({ setNavigationStatus }) {
  const [selectedItem, setSelectedItem] = useState("Home");

  //////////////////////////////////////////////////////////////////////////////

  const [Open, setOpen] = useState(false);
  const [Delay, setDelay] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setNavigationStatus(Open);
  }, [Open, setNavigationStatus]);

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

  useEffect(() => {
    setTimeout(() => {}, 2);
  });

  ///////////////////////////////////////////////////////////////////////////////

  const handleSelect = (event) => {
    const target = event.target.closest("button[data-name]");

    if (target) {
      const name = target.dataset.name;
      console.log(name);
      setSelectedItem(name);
    }
  };

  return (
    <nav
      className={`Navigation-Background ${
        Open ? "Open-Navigation" : "Close-Navigation"
      }`}
    >
      <div className="Navigation-Logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="Navigation-Content" onClick={(e) => handleSelect(e)}>
        <div className="Navigation-Content-Icon">
          <button
            onClick={() => setOpenModal(true)}
            className={`Navigation-Content-Select ${
              OpenModal ? "Active-Select" : ""
            }`}
          >
            <div className="NC-ICO">
              <SearchIcon
                className="Navigation-Icon"
                style={{ rotate: "90deg" }}
              />
            </div>
            <div
              className={`Icon-Title ${
                Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"
              }`}
            >
              <span>جستوجو</span>
            </div>
          </button>
          {!Open ? (
            <div className="Navigation-Content-Show-Title">
              <span>جسنوجو</span>
            </div>
          ) : null}
          <Search OpenModal={OpenModal} setOpenModal={setOpenModal} />
        </div>
        <div className="Navigation-Content-Icon">
          <Link to="/">
            <button
              data-name="Home"
              className={`Navigation-Content-Select ${
                selectedItem === "Home" ? "Active-Select" : ""
              }`}
            >
              <div className="NC-ICO">
                <HomeIcon className="Navigation-Icon" />
              </div>
              <div
                className={`Icon-Title ${
                  Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"
                }`}
              >
                <span>صفحه اصلی</span>
              </div>
            </button>
          </Link>

          {!Open && Delay ? (
            <div className="Navigation-Content-Show-Title">
              <span>صفحه اصلی</span>
            </div>
          ) : null}
        </div>
        <div className="Navigation-Content-Icon">
          <button
            data-name="AllGames"
            className={`Navigation-Content-Select ${
              selectedItem === "AllGames" ? "Active-Select" : ""
            }`}
          >
            <div className="NC-ICO">
              <AllGamesIcon className="Navigation-Icon" />
            </div>
            <div
              className={`Icon-Title ${
                Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"
              }`}
            >
              <span>بازی ها</span>
            </div>
          </button>
          {!Open ? (
            <div className="Navigation-Content-Show-Title">
              <span>بازی ها</span>
            </div>
          ) : null}
        </div>
        <div className="Navigation-Content-Icon">
          <button
            data-name="AboutUs"
            className={`Navigation-Content-Select ${
              selectedItem === "AboutUs" ? "Active-Select" : ""
            }`}
          >
            <div className="NC-ICO">
              <AboutUsIcon className="Navigation-Icon" />
            </div>
            <div
              className={`Icon-Title ${
                Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"
              }`}
            >
              <span>درمورد ما</span>
            </div>
          </button>
          {!Open ? (
            <div className="Navigation-Content-Show-Title">
              <span>درباره ما</span>
            </div>
          ) : null}
        </div>
        <div className="Navigation-Content-Icon">
          <Link to="/LoginPage">
            <button
              data-name="Profile"
              className={`Navigation-Content-Select ${
                selectedItem === "Profile" ? "Active-Select" : ""
              }`}
            >
              <div className="NC-ICO">
                <ProfileIcon className="Navigation-Icon" />
              </div>
              <div
                className={`Icon-Title ${
                  Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"
                }`}
              >
                <span>پروفایل</span>
              </div>
            </button>
          </Link>
          {!Open ? (
            <div className="Navigation-Content-Show-Title">
              <span>پروفایل</span>
            </div>
          ) : null}
        </div>
        <div className="Navigation-Content-Icon Navigation-Button-Status">
          <button
            className="Navigation-Content-Select"
            onClick={() => setOpen(!Open)}
          >
            <div className="NC-ICO">
              <ArrowIcon
                className="Navigation-Icon"
                style={Open ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <div
              className={Open ? "Show-Navigation-Text" : "Hide-Navigation-Text"}
            >
              <span>بسته</span>
            </div>
          </button>
          {!Open && Delay ? (
            <div className="Navigation-Content-Show-Title">
              <span>باز</span>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
