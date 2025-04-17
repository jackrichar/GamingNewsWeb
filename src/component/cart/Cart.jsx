import React from "react";
import style from "./Cart.module.scss";

function Cart() {
  return (
    <div className={style.main}>
      <div className={style.main_container}>
        <div className={style.main_image}></div>
      </div>
      <div className={style.main_text}>Red Dead Redemption 2</div>
    </div>
  );
}

export default Cart;
