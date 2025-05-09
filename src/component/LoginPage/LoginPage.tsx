import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent/InputComponent";
import styles from "./LoginPage.module.scss";

interface FormData {
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

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [currentUser, setCurrentUser] = useState<string | null>(null); // ذخیره ایمیل کاربر لاگین‌شده

  const patterns = {
    name: /^[a-zA-Zآ-ی\s]{2,}$/,
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  };

  // بررسی وضعیت لاگین هنگام بارگذاری کامپوننت
  useEffect(() => {
    const loggedInUsers = JSON.parse(
      localStorage.getItem("loggedInUsers") || "[]"
    );
    if (loggedInUsers.length > 0) {
      setCurrentUser(loggedInUsers[0]); // فرض می‌کنیم فقط یک کاربر می‌تونه لاگین باشه
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateField = (
    name: string,
    value: string,
    formData: FormData
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
    if (name === "confirmPassword" && value !== formData.password) {
      return "تأیید رمز عبور با رمز عبور مطابقت ندارد";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: isLogin ? "" : validateField("name", formData.name, formData),
      email: validateField("email", formData.email, formData),
      password: validateField("password", formData.password, formData),
      confirmPassword: isLogin
        ? ""
        : validateField("confirmPassword", formData.confirmPassword, formData),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      if (isLogin) {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (u) => u.email === formData.email && u.password === formData.password
        );
        if (user) {
          // اضافه کردن کاربر به لیست لاگین‌شده‌ها
          const loggedInUsers = JSON.parse(
            localStorage.getItem("loggedInUsers") || "[]"
          );
          if (!loggedInUsers.includes(formData.email)) {
            loggedInUsers.push(formData.email);
            localStorage.setItem(
              "loggedInUsers",
              JSON.stringify(loggedInUsers)
            );
          }
          setCurrentUser(formData.email);
          alert(`خوش آمدید، ${user.name}!`);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          setErrors({ ...errors, email: "ایمیل یا رمز عبور اشتباه است" });
        }
      } else {
        const newUser: User = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        // لاگین خودکار بعد از ثبت‌نام
        const loggedInUsers = JSON.parse(
          localStorage.getItem("loggedInUsers") || "[]"
        );
        if (!loggedInUsers.includes(formData.email)) {
          loggedInUsers.push(formData.email);
          localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
        }
        setCurrentUser(formData.email);
        alert("ثبت‌نام با موفقیت انجام شد!");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setIsLogin(true);
      }
    }
  };

  const handleLogout = () => {
    const loggedInUsers = JSON.parse(
      localStorage.getItem("loggedInUsers") || "[]"
    );
    const updatedUsers = loggedInUsers.filter(
      (email: string) => email !== currentUser
    );
    localStorage.setItem("loggedInUsers", JSON.stringify(updatedUsers));
    setCurrentUser(null);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    alert("شما با موفقیت خارج شدید!");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className={styles.AuthForm}>
      {currentUser ? (
        <div>
          <h2 className={styles.AuthForm__title}>خوش آمدید!</h2>
          <p>شما با ایمیل {currentUser} وارد شده‌اید.</p>
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
          <form className={styles.AuthForm__form} onSubmit={handleSubmit}>
            {!isLogin && (
              <InputComponent
                label="نام"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="نام خود را وارد کنید"
              />
            )}
            <InputComponent
              label="ایمیل"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="ایمیل خود را وارد کنید"
            />
            <InputComponent
              label="رمز عبور"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="رمز عبور خود را وارد کنید"
            />
            {!isLogin && (
              <InputComponent
                label="تأیید رمز عبور"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="رمز عبور را دوباره وارد کنید"
              />
            )}
            <button type="submit" className={styles.AuthForm__submit}>
              {isLogin ? "ورود" : "ثبت‌نام"}
            </button>
          </form>
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
  );
};

export default AuthForm;
