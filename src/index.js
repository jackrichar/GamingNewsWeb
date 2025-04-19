import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import Cart from "./component/cart/Cart";
import Navigation from "./component/navigation/Navigatin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navigation />
    <App />
    <Cart />
  </React.StrictMode>
);
