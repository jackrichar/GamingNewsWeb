import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

// Import JSON data
import slidesData from "../../../Assets/jsone/Search.json";

// Import custom styles
import "./SlideShowStyle.scss";

export default function Slideshow() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="MySwiper"
      autoplay={{
        delay: 30000, // هر ۳ ثانیه اسلاید عوض می‌شه
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      loop={true} // حلقه بی‌نهایت
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="Slide"
            style={{
              backgroundImage: `url(${slide.Banner})`,
            }}
          >
            <div className="Rating">
              <span>{slide.Rating}</span>
            </div>
            <h2 className="SlideTitle">{slide.Title}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
