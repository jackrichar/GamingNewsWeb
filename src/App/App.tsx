import React, { Suspense, useState, useContext } from "react";
import "./AppStyle.scss";
import { Navigate, Route, Routes } from "react-router-dom";
// Import Component
import Navigation from "../component/navigation/Navigatin";
import { AppValueContext } from "../component/Context/AppContext";

const HomePageLazy = React.lazy(() => import("../component/HomePage/HomePage"));
const ArchivePageLazy = React.lazy(() => import("../component/ArchivePage/ArchivePage"));
const LoginPageLazy = React.lazy(() => import("../component/LoginPage/LoginPage"));
const NotFoundPageLazy = React.lazy(() => import("../component/All Item/NotFoundPage/NotFoundPage"));
const LoadingPageLazy = React.lazy(() => import("../component/All Item/LoadingPage/LoadingPage"));

const App: React.FC = () => {
  const [NavigationStatus, setNavigationStatus] = useState(false);
  return (
    <>
      <div className="App-Background">
        <div
          className={`App-Navigation  ${NavigationStatus ? "Open-App-Navigation" : "Close-App-Navigation"}`}>
          <Navigation setNavigationStatus={setNavigationStatus} />
        </div>
        <div className={`App-Content  ${NavigationStatus ? "Open-App-Content" : "Close-App-Content"}`}>
          <Suspense fallback={<LoadingPageLazy />}>
            <Routes>
              <Route path="*" element={<NotFoundPageLazy />} />
              <Route path="/" element={<HomePageLazy />} />
              <Route path="/Home" element={<Navigate to="/" />} />
              <Route path="/Archive" element={<ArchivePageLazy />} />
              <Route path="/Profile" element={<LoginPageLazy />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
