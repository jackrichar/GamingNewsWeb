import React from "react";
import style from "./Cart.module.scss";
import RDR from "../../Assets/image/Untitled.png";

function Cart() {
  return (
    <div className={style.main}>
      <div className={style.main_container}>
        <div className={style.main_image_container}>
          <img className={style.main_image} src={RDR}></img>
        </div>
        <div className={style.main_save_box}>
          <div className={style.main_save_button}>
            <input
              className={style.main_save_button_input}
              type="button"
              value={"save"}
            ></input>
          </div>
          <div className={style.main_more_button}>
            <input
              className={style.main_more_button_input}
              type="button"
              value={"more"}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
