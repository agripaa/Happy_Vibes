import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import ListPeople from "./Component_People/ListPeople";
function Component_People({ ImageDummy2, ImageDummy, Verified }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <main className="main-ContainerPeople">
      <header className="JudulPeople">
        <h1>People</h1>
      </header>
      <Swiper
        slidesPerView={getInnerWidth <= 992 ? 1 : 2}
        grabCursor={true}
        spaceBetween={30}
        modules={[Pagination]}
        className="mySwiper FramePeople"
      >
        <SwiperSlide>
          <ListPeople
            ImageDummy={ImageDummy}
            ImageDummy2={ImageDummy2}
            Verified={Verified}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListPeople
            ImageDummy={ImageDummy}
            ImageDummy2={ImageDummy2}
            Verified={Verified}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListPeople
            ImageDummy={ImageDummy}
            ImageDummy2={ImageDummy2}
            Verified={Verified}
          />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}

export default Component_People;
