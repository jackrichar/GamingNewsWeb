import React from "react";
import style from "./Navigation.module.scss";
import Searchbox from "../searchBox/Searchbox";
import logo from "../../Assets/image/Logo.png";

function Navigatin() {
  return (
    <>
      <div className={style.container}>
        <div className={style.container_items}>
          <div className={style.container_logo_search}>
            <div className={style.container_logo}>
              <img style={{ width: 52, height: 38 }} src={logo} alt="logo" />
            </div>
            <div className={style.container_searchBox}>
              <Searchbox />
            </div>

            <div className={style.container_navigation_menu}>
              <a>home</a>
              <a>home</a>
              <a>home</a>
              <a>home</a>
            </div>
          </div>
          <div className={style.container_profile}>profile</div>
        </div>
      </div>
    </>
  );
}

export default Navigatin;
