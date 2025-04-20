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
      </div>
    </div>
  );
}

export default Cart;
