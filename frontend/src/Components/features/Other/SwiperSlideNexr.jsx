import React from "react";
import { useSwiper } from "swiper/react";
import "../../css/AboutHv.scss";
import "../../css/myLibrary.scss";
function SwiperSlideNext() {
  const swiper = useSwiper();
  return (
    <div className="buttonNext">
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
}

export default SwiperSlideNext;
