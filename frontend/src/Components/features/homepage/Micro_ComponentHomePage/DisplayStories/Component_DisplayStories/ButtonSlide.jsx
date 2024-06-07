import {
  nextBarStories,
  nextIndexContentStories,
  PlayAndPauseStory,
  prevBarStories,
  prevIndexContentStories,
} from "@redux/StoryReducer/StoryReducer";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ButtonSlide({ arrows, indexed, slideRef }) {
  const { SlideStories, countSlideStories } = useSelector(
    (state) => state?.story
  );
  const dispatch = useDispatch();

  return (
    <Fragment>
      {arrows === "next" ? (
        <button
          className="btn-Next"
          onClick={() => {
            if (countSlideStories < SlideStories[indexed].stories.length - 1) {
              dispatch(nextBarStories("next"));
              dispatch(nextIndexContentStories());

              dispatch(PlayAndPauseStory(false));
            } else {
              dispatch(nextIndexContentStories("done"));

              dispatch(nextBarStories());

              slideRef.current.slideNext();
            }
          }}
        />
      ) : (
        <button
          className="btn-Prev"
          onClick={() => {
            if (countSlideStories > 0) {
              dispatch(prevBarStories("prev"));
              dispatch(PlayAndPauseStory(false));
              dispatch(prevIndexContentStories());
            } else {
              dispatch(prevIndexContentStories("done"));
              dispatch(prevBarStories());

              slideRef.current.slidePrev();
            }
          }}
        />
      )}
    </Fragment>
  );
}
