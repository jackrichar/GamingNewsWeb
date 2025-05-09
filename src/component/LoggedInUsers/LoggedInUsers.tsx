import React, { useEffect, useState } from "react";
import styles from "./LoggedInUsers.module.scss";

interface User {
  name: string;
  email: string;
  password: string;
}
const LoggedInUsers: React.FC = () => {
  const [loggedInUsers, setLoggedInUsers] = useState<User[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("loggedInUsers") || "[]");
    setLoggedInUsers(users);
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

    alert(`کاربر با ایمیل ${email} با موفقیت حذف شد!`);
  };
  console.log(localStorage.users);

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
