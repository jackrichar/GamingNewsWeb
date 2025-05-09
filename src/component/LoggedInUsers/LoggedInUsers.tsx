import React, { useEffect, useState } from "react";
import styles from "./LoggedInUsers.module.scss";

const LoggedInUsers: React.FC = () => {
  const [loggedInUsers, setLoggedInUsers] = useState<string[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("loggedInUsers") || "[]");
    setLoggedInUsers(users);
  }, []);

  return (
    <div className={styles.LoggedInUsers}>
      <h3>کاربران لاگین‌شده</h3>
      {loggedInUsers.length > 0 ? (
        <ul>
          {loggedInUsers.map((email) => (
            <li key={email}>{email}</li>
          ))}
        </ul>
      ) : (
        <p>هیچ کاربری لاگین نکرده است.</p>
      )}
    </div>
  );
};

export default LoggedInUsers;
