import React from "react";
import style from "./LoginPage.module.scss";
function LoginPage() {
  return (
    <>
      <div className={style.LoginPage}>
        <div className={style.LoginPage__container}>
          <div className={style.container__inputs}>
            <input className={style.inputs__email} type="email" />
            <input className={style.inputs__email} type="email" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
