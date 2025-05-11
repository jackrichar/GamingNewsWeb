import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./component/Context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <AppContext>
          <App />
      </AppContext>
  </BrowserRouter>
);
