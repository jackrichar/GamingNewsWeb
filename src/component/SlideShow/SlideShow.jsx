import React, { useState, useEffect } from "react";
import slidesData from "../../Assets/jsone/topgame"; // فایل JSON رو وارد می‌کنیم
// import "./Slider.css"; // برای استایل‌ها

const SlideShow = () => {
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

  // دکمه‌ها برای عوض کردن دستی اسلاید
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slidesData.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slidesData.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="slider">
      <div className="slide">
        <img
          src={slidesData[currentSlide].image}
          alt={slidesData[currentSlide].title}
        />
        <h2>{slidesData[currentSlide].title}</h2>
        <p>{slidesData[currentSlide].description}</p>
      </div>
      <button className="prev" onClick={prevSlide}>
        &larr; قبلی
      </button>
      <button className="next" onClick={nextSlide}>
        بعدی &rarr;
      </button>
    </div>
  );
};

export default SlideShow;
