import React, {useEffect, useState} from "react";

// Import Data
import carts from "../../../Assets/jsone/Search.json";

// Swiper Component
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Component
import Card from './Card/Card';

// Style
import "./CartSlideShowStyle.scss";

// Import Data
import GameData from "../../../Assets/jsone/Search.json";

const CartSlideShow = ({CardNumber = 5, Delay = 500}) => {
  return (
      <Swiper
          autoplay={{
              delay: Delay,
              disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            }
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
      >
        {
          GameData.map((item, index) => {
            if(index <= CardNumber){
              return (
                  <SwiperSlide key={index}><Card Poster={item.Poster}/></SwiperSlide>
              )
            }
          })
        }
      </Swiper>
  );
};

export default CartSlideShow;