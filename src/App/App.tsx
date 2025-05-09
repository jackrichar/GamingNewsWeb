import React, { Suspense, useState } from "react";
import "./AppStyle.scss";
import { Navigate, Route, Routes } from "react-router-dom";
// Import Component
import Navigation from "../component/navigation/Navigatin";
import NotFound from "../component/NotFound/NotFound";
import LoadingPage from "../component/LoadingPage/LoadingPage";

const HomePageLazy = React.lazy(() => import("../component/HomePage/HomePage"));
const LoginPageLAzy = React.lazy(
  () => import("../component/LoginPage/LoginPage")
);

const App: React.FC = () => {
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
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<HomePageLazy />} />
              <Route path="/Home" element={<Navigate to="/" />} />
              <Route path="/LoginPage" element={<LoginPageLAzy />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
