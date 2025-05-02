import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import carts from "../../../Assets/jsone/Search.json";
import { ReactComponent as FavouriteIcon } from "../../../Assets/Icon/Favourite.svg";
import "./CartSlideShowMobile.scss";
import React, { useState } from "react";

const CartSlideShowMobile = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      speed={3000}
      slidesPerView={2}
      spaceBetween={100}
      grabCursor={true}
    >
      {carts.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="game-card"
            style={{
              margin: "20px auto",
              borderRadius: "8px",
              textAlign: "center",
              width: "300px",
              height: "400px",
            }}
          >
            <img
              src={slide.Poster}
              alt={slide.Title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div className="container">
              <FavouriteIcon className="favouriticon" />
              <input className="More-Button" type="button"></input>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CartSlideShowMobile;
