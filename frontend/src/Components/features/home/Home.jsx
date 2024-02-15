import React, { useEffect, useState } from "react";
import Welcome from "../Other/Welcome";
import AboutHv from "../Other/AboutHv";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.min.css";
import SwiperSlideNext from "../Other/SwiperSlideNexr";
import Login from "../login/Login";

function Home() {
  const [display, setDisplay] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(innerWidth);
  const [getIndex, setgetIndex] = useState(0);
  const [getIndexLength, setgetIndexLength] = useState(0);
  function ChangeDisplay() {
    setDisplay(false);
  }

  useEffect(() => {
    setTimeout(() => {
      ChangeDisplay();
    }, 4200);
  }, [display, displayWidth, getIndex]);
  return (
    <div>
      {" "}
      {displayWidth > 500 ? (
        display ? (
          <Welcome />
        ) : (
          <AboutHv />
        )
      ) : (
        <Swiper
          style={{
            "--swiper-pagination-color": "#282828",
          }}
          pagination={{ type: "bullets", clickable: true }}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          onSwiper={(swiper) => setgetIndexLength(swiper.slides.length)}
          onSlideChange={(swiper) => setgetIndex(swiper.activeIndex)}
        >
          <SwiperSlide>
            <Welcome />
          </SwiperSlide>
          <SwiperSlide>
            <AboutHv />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <Login />
          </SwiperSlide>
          {getIndex < getIndexLength - 1 ? <SwiperSlideNext /> : null}
        </Swiper>
      )}
    </div>
  );
}

export default Home;
