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
import styles from "./SlideShow.module.scss";

export default function Slideshow() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      className={styles.mySwiper}
      autoplay={{
        delay: 30000, // هر ۳ ثانیه اسلاید عوض می‌شه
        disableOnInteraction: false,
      }}
      loop={true} // حلقه بی‌نهایت
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className={styles.slide}
            style={{
              backgroundImage: `url(${slide.Banner})`,
            }}
          >
            <div className={styles.rating}>
              <span>{slide.Rating}</span>
            </div>
            <h2 className={styles.slideTitle}>{slide.Title}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
