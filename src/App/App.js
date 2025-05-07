import React, { useState } from "react";
import "./AppStyle.scss";
import { Route, Routes } from "react-router-dom";
// Import Component
import Navigation from "../component/navigation/Navigatin";
import HomePage from "../component/HomePage/HomePage";
import LoginPage from "../component/LoginPage/LoginPage";
import TestLinke from "../component/TestLinke";

const App = () => {
  const [NavigationStatus, setNavigationStatus] = useState(false);
  return (
    <>
      <div className="App-Background">
        <div
          className={`App-Navigation  ${
            NavigationStatus ? "Open-App-Navigation" : "Close-App-Navigation"
          }`}
        >
          <Navigation setNavigationStatus={setNavigationStatus} />
        </div>
        <div
          className={`App-Content  ${
            NavigationStatus ? "Open-App-Content" : "Close-App-Content"
          }`}
        >
          <TestLinke />
          <Routes>
            <Route
              path="../component/LoginPage/LoginPage"
              element={<LoginPage />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
