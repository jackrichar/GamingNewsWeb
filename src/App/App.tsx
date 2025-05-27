import React, { useState } from "react";
import "./AppStyle.scss";
import { Navigate, Route, Routes } from "react-router-dom";
// Import Component
import Navigation from "../component/navigation/Navigatin";
import Breadcrumb from "../component/All Item/Breadcrumb/Breadcrumb";

const HomePageLazy = React.lazy(() => import("../component/HomePage/HomePage"));
const ArchivePageLazy = React.lazy(
  () => import("../component/ArchivePage/ArchivePage")
);
const LoadingPageLazy = React.lazy(
  () => import("../component/All Item/LoadingPage/LoadingPage")
);

const LoginPageLazy = React.lazy(
  () => import("../component/LoginPage/LoginPage")
);
const NotFoundPageLazy = React.lazy(
  () => import("../component/All Item/NotFoundPage/NotFoundPage")
);
const GameDetailsLazy = React.lazy(
  () => import("../component/All Item/GameDetails/GameDetails")
);

const App = () => {
  const [NavigationStatus, setNavigationStatus] = useState(false);

  return (
    <div className="App-Background">
      <div
        className={`App-Navigation ${
          NavigationStatus ? "Open-App-Navigation" : "Close-App-Navigation"
        }`}
      >
        <Navigation setNavigationStatus={setNavigationStatus} />
      </div>
      <div
        className={`App-Content ${
          NavigationStatus ? "Open-App-Content" : "Close-App-Content"
        }`}
      >
        <React.Suspense fallback={<LoadingPageLazy />}>
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<HomePageLazy />} />
            <Route path="/Home" element={<Navigate to="/" />} />
            <Route path="/Archive" element={<ArchivePageLazy />} />
            <Route path="/Profile" element={<LoginPageLazy />} />
            <Route path="/game/:id" element={<GameDetailsLazy />} />
            <Route path="*" element={<NotFoundPageLazy />} />
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
