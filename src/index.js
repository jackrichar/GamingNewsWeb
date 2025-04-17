import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import Cart from "./component/cart/Cart";
import SlideShow from "./component/SlideShow/SlideShow";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Cart />
    <SlideShow />
  </React.StrictMode>
);
