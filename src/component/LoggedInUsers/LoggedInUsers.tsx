import React, { useEffect, useState } from "react";
import styles from "./LoggedInUsers.module.scss";
import Swal from "sweetalert2";

interface User {
  name: string;
  email: string;
  password: string;
}

const LoggedInUsers: React.FC = () => {
  const [loggedInUsers, setLoggedInUsers] = useState<User[]>([]);

  // تابع برای به‌روزرسانی لیست کاربران
  const updateLoggedInUsers = () => {
    const users = JSON.parse(localStorage.getItem("loggedInUsers") || "[]");
    setLoggedInUsers(users);
  };

  useEffect(() => {
    // بارگذاری اولیه کاربران
    updateLoggedInUsers();

    // listener برای تغییرات localStorage در تب‌های دیگر
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "loggedInUsers") {
        updateLoggedInUsers();
      }
    };

    // listener برای تغییرات در همان تب
    const handleCustomStorageUpdate = () => {
      updateLoggedInUsers();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("storageUpdate", handleCustomStorageUpdate);

    // پاک‌سازی event listenerها
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("storageUpdate", handleCustomStorageUpdate);
    };
  }, []);

  const handleDeleteUser = (email: string) => {
    // حذف از loggedInUsers
    const updatedLoggedInUsers = loggedInUsers.filter(
      (user) => user.email !== email
    );
    localStorage.setItem("loggedInUsers", JSON.stringify(updatedLoggedInUsers));
    setLoggedInUsers(updatedLoggedInUsers);

    // حذف از users
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedAllUsers = allUsers.filter(
      (user: User) => user.email !== email
    );
    localStorage.setItem("users", JSON.stringify(updatedAllUsers));

    // ارسال رویداد سفارشی
    const event = new Event("storageUpdate");
    window.dispatchEvent(event);

    Swal.fire({
      title: `کاربر با ایمیل ${email} با موفقیت حذف شد!`,
      icon: "success",
      confirmButtonText: "باشه",
      customClass: {
        confirmButton: "my-swal-button",
      },
    });
  };

  return (
    <div className={styles.LoggedInUsers}>
      <h3>کاربران لاگین‌شده</h3>
      {loggedInUsers.length > 0 ? (
        <ul>
          {loggedInUsers.map((user) => (
            <li key={user.email} className={styles.LoggedInUsers__item}>
              <p>
                <strong>نام:</strong> {user.name}
              </p>
              <p>
                <strong>ایمیل:</strong> {user.email}
              </p>
              <p>
                <strong>رمز عبور:</strong> {user.password}
              </p>
              <button
                type="button"
                className={styles.LoggedInUsers__deleteButton}
                onClick={() => handleDeleteUser(user.email)}
              >
                حذف کاربر
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.LoggedInUsers__empty}>
          هیچ کاربری لاگین نکرده است.
        </p>
      )}
    </div>
  );
};

export default LoggedInUsers;
