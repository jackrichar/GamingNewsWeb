import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import carts from "../../../Assets/jsone/Search.json";
import { ReactComponent as FavouriteIcon } from "../../../Assets/Icon/Favourite.svg";
import "./CartSlideShow.module.scss";
import React, { useState } from "react";

const CartSlideShow = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      speed={3000}
      slidesPerView={4}
      spaceBetween={200}
      grabCursor={true}
    >
      {carts.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            style={{
              margin: "20px auto",
              borderRadius: "8px",
              textAlign: "center",
              width: "344px",
              height: "214px",
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
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CartSlideShow;
