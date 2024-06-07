import {
  nextBarStories,
  nextIndexContentStories,
} from "@redux/StoryReducer/StoryReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
export default function CarouselTimer({ playSLide, items }) {
  const { countSlideStories, autoPlay } = useSelector((state) => state?.story);
  const controls = useAnimation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (playSLide === countSlideStories) {
      const IndicatorTime = setTimeout(() => {
        dispatch(nextBarStories("next"));
        dispatch(nextIndexContentStories());
      }, 5000);
      if (countSlideStories >= items.stories.length - 1) {
        clearTimeout(IndicatorTime);
      }
      if (autoPlay) {
        controls.stop();
        clearTimeout(IndicatorTime);
      } else {
        controls.start({
          width: [0, "100%"],
          transition: { duration: 5, ease: "linear" },
        });
      }
      return () => clearTimeout(IndicatorTime);
    }
  });
  return (
    <div className="CarouselTimer">
      {playSLide === countSlideStories ? (
        <motion.div
          animate={controls}
          style={{
            backgroundColor: "white",
            width: 0,
            height: "100%",
          }}
        ></motion.div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            width: playSLide < countSlideStories ? "100%" : "0",
            height: "100%",
          }}
        ></div>
      )}
    </div>
  );
}
