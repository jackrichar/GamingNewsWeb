import React, { useState, useEffect } from "react";
import slidesData from "../../Assets/jsone/Search.json";
import "./SlideShow.module.scss";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // برای عوض کردن اسلاید هر ۳ ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slidesData.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // هر ۳ ثانیه اسلاید عوض می‌شه

    return () => clearInterval(interval); // تمیز کردن interval
  }, []);
  return (
    <div className="slideshow">
      <div className="slide">
        <img
          src={slidesData[currentSlide].poster}
          alt={slidesData[currentSlide].name}
          className="slide-image"
        />
        <h2 className="slide-title">{slidesData[currentSlide].name}</h2>
      </div>
    </div>
  );
};

export default Slideshow;
