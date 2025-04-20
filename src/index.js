import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import Navigation from "./component/navigation/Navigatin";
import Cart from "./component/cart/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navigation />

    <App />
  </React.StrictMode>
);
