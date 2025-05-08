// Login.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import style from "./LoginPage.module.scss";

function LoginPage() {
  // حالت برای سوئیچ بین ورود و ثبت‌نام
  const [isLogin, setIsLogin] = useState(true);
  // حالت‌های فرم ورود
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // حالت‌های فرم ثبت‌نام
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  // پیام خطا
  const [error, setError] = useState("");

  // اعتبارسنجی فرم ورود
  const isLoginFormValid = loginEmail && loginPassword;
  // اعتبارسنجی فرم ثبت‌نام
  const isRegisterFormValid =
    registerName &&
    registerEmail &&
    registerPassword &&
    registerPassword === registerConfirmPassword;

  // مدیریت ارسال فرم ورود
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (isLoginFormValid) {
      setError("");
      console.log("ورود:", { loginEmail, loginPassword });
      // اینجا می‌تونید منطق ورود (مثل فراخوانی API) رو اضافه کنید
    } else {
      setError("لطفاً همه فیلدها را پر کنید.");
    }
  };

  // مدیریت ارسال فرم ثبت‌نام
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (isRegisterFormValid) {
      setError("");
      console.log("ثبت‌نام:", {
        registerName,
        registerEmail,
        registerPassword,
      });
      // اینجا می‌تونید منطق ثبت‌نام (مثل فراخوانی API) رو اضافه کنید
    } else {
      setError(
        registerPassword !== registerConfirmPassword
          ? "رمز عبور و تأیید آن مطابقت ندارند."
          : "لطفاً همه فیلدها را پر کنید."
      );
    }
  };

  return (
    <div className={style.login}>
      <div className={style["login__container"]}>
        {/* تب‌ها برای سوئیچ بین ورود و ثبت‌نام */}
        <div className={style["login__container__tabs"]}>
          <button
            className={classNames(style["login__container__tabs__tab"], {
              [style["login__container__tabs__tab--active"]]: isLogin,
            })}
            onClick={() => setIsLogin(true)}
          >
            ورود
          </button>
          <button
            className={classNames(style["login__container__tabs__tab"], {
              [style["login__container__tabs__tab--active"]]: !isLogin,
            })}
            onClick={() => setIsLogin(false)}
          >
            ثبت‌نام
          </button>
        </div>

        {/* فرم ورود */}
        {isLogin ? (
          <form
            className={style["login__container__form"]}
            onSubmit={handleLoginSubmit}
          >
            {error && (
              <div className={style["login__container__form__error"]}>
                {error}
              </div>
            )}
            <div className={style["login__container__form__field"]}>
              <label
                className={style["login__container__form__field__label"]}
                htmlFor="login-email"
              >
                ایمیل
              </label>
              <input
                type="email"
                id="login-email"
                className={style["login__container__form__field__input"]}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
            <div className={style["login__container__form__field"]}>
              <label
                className={style["login__container__form__field__label"]}
                htmlFor="login-password"
              >
                رمز عبور
              </label>
              <input
                type="password"
                id="login-password"
                className={style["login__container__form__field__input"]}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
              />
            </div>
            <button
              type="submit"
              className={classNames(style["login__container__form__button"], {
                [style["login__container__form__button--disabled"]]:
                  !isLoginFormValid,
              })}
              disabled={!isLoginFormValid}
            >
              ورود
            </button>
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames(style["login__container__form__link"], {
                  [style["login__container__form__link--active"]]: isActive,
                })
              }
            >
              برو به صفحه اصلی
            </NavLink>
          </form>
        ) : (
          /* فرم ثبت‌نام */
          <form
            className={style["login__container__form"]}
            onSubmit={handleRegisterSubmit}
          >
            {error && (
              <div className={style["login__container__form__error"]}>
                {error}
              </div>
            )}
            <div className={style["login__container__form__field"]}>
              <label
                className={style["login__container__form__field__label"]}
                htmlFor="register-name"
              >
                نام
              </label>
              <input
                type="text"
                id="register-name"
                className={style["login__container__form__field__input"]}
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="نام خود را وارد کنید"
              />
            </div>
            <div className={style["login__container__form__field"]}>
              <label
                className={style["login__container__form__field__label"]}
                htmlFor="register-email"
              >
                ایمیل
              </label>
              <input
                type="email"
                id="register-email"
                className={style["login__container__form__field__input"]}
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
            <div className={style["login__container__form__field"]}>
              <label
                className={style["login__container__form__field__label"]}
                htmlFor="register-password"
              >
                رمز عبور
              </label>
              <input
                type="password"
                id="register-password"
                className={style["login__container__form__field__input"]}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
              />
            </div>
            <div className={style["login__container__form__field"]}>
              <label
                className={style["login__container__form__field__label"]}
                htmlFor="register-confirm-password"
              >
                تأیید رمز عبور
              </label>
              <input
                type="password"
                id="register-confirm-password"
                className={style["login__container__form__field__input"]}
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                placeholder="رمز عبور را دوباره وارد کنید"
              />
            </div>
            <button
              type="submit"
              className={classNames(style["login__container__form__button"], {
                [style["login__container__form__button--disabled"]]:
                  !isRegisterFormValid,
              })}
              disabled={!isRegisterFormValid}
            >
              ثبت‌نام
            </button>
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames(style["login__container__form__link"], {
                  [style["login__container__form__link--active"]]: isActive,
                })
              }
            >
              برو به صفحه اصلی
            </NavLink>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
