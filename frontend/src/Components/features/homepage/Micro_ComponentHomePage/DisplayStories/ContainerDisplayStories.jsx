import DisplayStories from "./Component_DisplayStories/DisplayStories";
import { SwiperSlide, Swiper } from "swiper/react";
import "@css/Homepage/DisplayStories.scss";
import "@css/Option/OptionStories/OptionStories.scss";
import { EffectCoverflow, Navigation } from "swiper";
import { Fragment, useRef, useState } from "react";
import SekeletonStories from "./Component_DisplayStories/SkeletonStories";
import { useDispatch, useSelector } from "react-redux";
import {
  nextBarStories,
  nextIndexContentStories,
  PlayAndPauseStory,
  prevBarStories,
  prevIndexContentStories,
} from "@redux/StoryReducer/StoryReducer";
import OptionStories from "../../../features_components/Micro_components/option/OptionStories/OptionStories";
import ButtonSlide from "./Component_DisplayStories/ButtonSlide";

export default function ContainerDisplayStories() {
  const slideRef = useRef(null);
  const { SlideStories } = useSelector((state) => state?.story);
  const [indexed, indexedSet] = useState(0);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <article className="DisplayStories">
        <Swiper
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={"auto"}
          className="mySwiper"
          spaceBetween={100}
          navigation={true}
          onBeforeInit={(swipers) => (slideRef.current = swipers)}
          onSlideChange={(swiperCore) => {
            if (swiperCore.swipeDirection === "next") {
              dispatch(nextBarStories());
              dispatch(nextIndexContentStories("done"));
            } else if (swiperCore.swipeDirection === "prev") {
              dispatch(prevIndexContentStories("done"));
              dispatch(prevBarStories());
            }
            indexedSet(swiperCore.activeIndex);
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[Navigation, EffectCoverflow]}
        >
          {SlideStories?.map((items, i) => {
            return (
              <SwiperSlide key={i}>
                {indexed !== SlideStories.indexOf(items) ? (
                  <SekeletonStories text={items.name} />
                ) : (
                  <>
                    <DisplayStories items={items} />
                  </>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="ShadowOptionStories">
          <div className="WrapOptionStories">
            <OptionStories />
          </div>
          {/* <div className="ShadowManageStories"></div> */}
        </div>
        <ButtonSlide arrows="next" indexed={indexed} slideRef={slideRef} />
        <ButtonSlide arrows="prev" slideRef={slideRef} />
      </article>
    </Fragment>
  );
}
