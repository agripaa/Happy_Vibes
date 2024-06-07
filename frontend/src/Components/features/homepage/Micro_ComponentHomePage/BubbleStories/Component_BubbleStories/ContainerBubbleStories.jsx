import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "@css/Homepage/BubbleStories.scss";
import Badges from "./Badges";

export default function ContainerBubbleStories() {
  return (
    <div className="ContainerBubbleStories">
      <Swiper
        className="mySwiper"
        slidesPerView={5}
        spaceBetween={5}
        navigation={true}
        modules={[Navigation]}
      >
        <SwiperSlide>
          <Badges />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
