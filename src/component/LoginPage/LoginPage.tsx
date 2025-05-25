import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent/InputComponent";
import styles from "./LoginPage.module.scss";
import Swal from "sweetalert2";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface User {
  name: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [registerErrors, setRegisterErrors] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const patterns = {
    name: /^[a-zA-Zآ-ی\s]{2,}$/,
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  };

  useEffect(() => {
    const loggedInUsers = JSON.parse(
      localStorage.getItem("loggedInUsers") || "[]"
    );
    if (loggedInUsers.length > 0) {
      setCurrentUser(loggedInUsers[0]);
    }
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });

    const error = validateField(name, value, {
      ...loginFormData,
      [name]: value,
    });
    setLoginErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });

    const error = validateField(name, value, {
      ...registerFormData,
      [name]: value,
    });
    setRegisterErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateField = (
    name: string,
    value: string,
    formData: LoginFormData | RegisterFormData
  ): string => {
    if (!value && (name !== "confirmPassword" || !isLogin)) {
      return "این فیلد الزامی است";
    }
    if (name === "name" && value && !patterns.name.test(value)) {
      return "نام باید حداقل ۲ کاراکتر و فقط شامل حروف باشد";
    }
    if (name === "email" && value && !patterns.email.test(value)) {
      return "لطفاً ایمیل معتبر وارد کنید";
    }
    if (name === "email" && value && !isLogin) {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((user) => user.email === value)) {
        return "این ایمیل قبلاً ثبت شده است";
      }
    }
    if (name === "password" && value && !patterns.password.test(value)) {
      return "رمز عبور باید حداقل ۸ کاراکتر، شامل حرف بزرگ، کوچک و عدد باشد";
    }
    if (
      name === "confirmPassword" &&
      value &&
      value !== (formData as RegisterFormData).password
    ) {
      return "تأیید رمز عبور با رمز عبور مطابقت ندارد";
    }
    return "";
  };

  const dispatchStorageUpdate = () => {
    const event = new Event("storageUpdate");
    window.dispatchEvent(event);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      const fieldsToValidate = ["email", "password"];
      const newErrors: LoginFormData = { email: "", password: "" };

      fieldsToValidate.forEach((field) => {
        newErrors[field as keyof LoginFormData] = validateField(
          field,
          loginFormData[field as keyof LoginFormData],
          loginFormData
        );
      });

      setLoginErrors(newErrors);

      if (!Object.values(newErrors).some((error) => error)) {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (u) =>
            u.email === loginFormData.email &&
            u.password === loginFormData.password
        );
        if (user) {
          const loggedInUsers = JSON.parse(
            localStorage.getItem("loggedInUsers") || "[]"
          );
          if (
            !loggedInUsers.some((u: User) => u.email === loginFormData.email)
          ) {
            loggedInUsers.push(user);
            localStorage.setItem(
              "loggedInUsers",
              JSON.stringify(loggedInUsers)
            );
            dispatchStorageUpdate();
          }
          setCurrentUser(user);
          Swal.fire({
            title: `خوش آمدید، ${user.name}!`,
            icon: "success",
            confirmButtonText: "باشه",
            customClass: { confirmButton: "my-swal-button" },
          });
          setLoginFormData({ email: "", password: "" });
          setLoginErrors({ email: "", password: "" });
        } else {
          setLoginErrors((prev) => ({
            ...prev,
            email: "ایمیل یا رمز عبور اشتباه است",
          }));
        }
      }
    } else {
      const fieldsToValidate = ["name", "email", "password", "confirmPassword"];
      const newErrors: RegisterFormData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      fieldsToValidate.forEach((field) => {
        newErrors[field as keyof RegisterFormData] = validateField(
          field,
          registerFormData[field as keyof RegisterFormData],
          registerFormData
        );
      });

      setRegisterErrors(newErrors);

      if (!Object.values(newErrors).some((error) => error)) {
        const newUser: User = {
          name: registerFormData.name,
          email: registerFormData.email,
          password: registerFormData.password,
        };
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        const loggedInUsers = JSON.parse(
          localStorage.getItem("loggedInUsers") || "[]"
        );
        if (
          !loggedInUsers.some((u: User) => u.email === registerFormData.email)
        ) {
          loggedInUsers.push(newUser);
          localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
          dispatchStorageUpdate();
        }
        setCurrentUser(newUser);
        Swal.fire({
          title: "ثبت‌نام با موفقیت انجام شد!",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: { confirmButton: "my-swal-button" },
        });
        setRegisterFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setRegisterErrors({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsLogin(true);
      }
    }
  };

  const handleLogout = () => {
    const loggedInUsers = JSON.parse(
      localStorage.getItem("loggedInUsers") || "[]"
    );
    const updatedUsers = loggedInUsers.filter(
      (u: User) => u.email !== currentUser?.email
    );
    localStorage.setItem("loggedInUsers", JSON.stringify(updatedUsers));
    dispatchStorageUpdate();
    setCurrentUser(null);
    setLoginFormData({ email: "", password: "" });
    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setLoginErrors({ email: "", password: "" });
    setRegisterErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    Swal.fire({
      title: "شما با موفقیت خارج شدید!",
      icon: "info",
      confirmButtonText: "باشه",
      customClass: { confirmButton: "my-swal-button" },
    });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const renderLoginForm = () => (
    <form className={styles.AuthForm__form} onSubmit={handleSubmit}>
      <InputComponent
        label="ایمیل"
        name="email"
        value={loginFormData.email}
        onChange={handleLoginChange}
        error={loginErrors.email}
        placeholder="ایمیل خود را وارد کنید"
      />
      <InputComponent
        label="رمز عبور"
        name="password"
        type="password"
        value={loginFormData.password}
        onChange={handleLoginChange}
        error={loginErrors.password}
        placeholder="رمز عبور خود را وارد کنید"
      />
      <button type="submit" className={styles.AuthForm__submit}>
        ورود
      </button>
    </form>
  );

  const renderRegisterForm = () => (
    <form className={styles.AuthForm__form} onSubmit={handleSubmit}>
      <InputComponent
        label="نام"
        name="name"
        value={registerFormData.name}
        onChange={handleRegisterChange}
        error={registerErrors.name}
        placeholder="نام خود را وارد کنید"
      />
      <InputComponent
        label="ایمیل"
        name="email"
        value={registerFormData.email}
        onChange={handleRegisterChange}
        error={registerErrors.email}
        placeholder="ایمیل خود را وارد کنید"
      />
      <div className={styles.AuthForm__password}>
        <div className={styles.AuthForm__flexInput}>
          <InputComponent
            label="رمز عبور"
            name="password"
            type="password"
            value={registerFormData.password}
            onChange={handleRegisterChange}
            error={registerErrors.password}
            placeholder="رمز عبور خود را وارد کنید"
          />
        </div>
        <div className={styles.AuthForm__flexInput}>
          <InputComponent
            label="تأیید رمز عبور"
            name="confirmPassword"
            type="password"
            value={registerFormData.confirmPassword}
            onChange={handleRegisterChange}
            error={registerErrors.confirmPassword}
            placeholder="رمز عبور را دوباره وارد کنید"
          />
        </div>
      </div>
      <button type="submit" className={styles.AuthForm__submit}>
        ثبت‌نام
      </button>
    </form>
  );

  return (
    <div className={styles.container}>
      <div className={styles.AuthForm}>
        {currentUser ? (
          <div>
            <h2 className={styles.AuthForm__title}>خوش آمدید!</h2>
            <p>شما با ایمیل {currentUser.email} وارد شده‌اید.</p>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.AuthForm__submit}
            >
              خروج
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.AuthForm__title}>
              {isLogin ? "ورود" : "ثبت‌نام"}
            </h2>
            <div className={styles.AuthForm__tabs}>
              <button
                type="button"
                className={`${styles.AuthForm__tab} ${
                  isLogin ? styles.AuthForm__tab__active : ""
                }`}
                onClick={() => setIsLogin(true)}
              >
                ورود
              </button>
              <button
                type="button"
                className={`${styles.AuthForm__tab} ${
                  !isLogin ? styles.AuthForm__tab__active : ""
                }`}
                onClick={() => setIsLogin(false)}
              >
                ثبت‌نام
              </button>
            </div>
            {isLogin ? renderLoginForm() : renderRegisterForm()}
            <p className={styles.AuthForm__toggle}>
              {isLogin ? "حساب کاربری ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}
              <button
                type="button"
                onClick={toggleForm}
                className={styles.AuthForm__toggleButton}
              >
                {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
