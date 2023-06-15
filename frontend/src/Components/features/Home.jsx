import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import AboutHv from "./AboutHv";
import { useSwiper, Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.min.css";
import "../css/welcome.scss";
import SwiperSlideNext from "./SwiperSlideNexr";
import Register from "./Register"

function Home() {
  const [display, setDisplay] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(innerWidth);
  const swiper = useSwiper();
  function ChangeDisplay() {
    setDisplay(false);
  }

  useEffect(() => {
    setTimeout(() => {
      ChangeDisplay();
    }, 4200);
  }, [display, displayWidth]);
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
        >
          <SwiperSlide>
            <Welcome />
          </SwiperSlide>
          <SwiperSlide>
            <AboutHv />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <Register/>
          </SwiperSlide>
          <SwiperSlideNext />
        </Swiper>
      )}
    </div>
  );
}

export default Home;
