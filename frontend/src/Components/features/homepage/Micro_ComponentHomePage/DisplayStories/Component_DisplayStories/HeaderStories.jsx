import { PlayAndPauseStory } from "@redux/StoryReducer/StoryReducer";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderStories({ user }) {
  const components = useSelector((state) => state?.icons);
  const { autoPlay } = useSelector((state) => state?.story);
  const dispatch = useDispatch();
  function handleAutoPlayStories() {
    dispatch(PlayAndPauseStory(!autoPlay));
  }
  return (
    <Fragment>
      {user === "syahroni" ? (
        <>
          <figure>
            <figcaption>
              <p>My Story</p>
            </figcaption>
          </figure>
          <section className="OptionStories">
            <div className="AutoPlay"></div>
            <figure className="SeeStories">
              <img src={components.EyeStories} alt="" />
              <p>660</p>
            </figure>
            <div
              onClick={handleAutoPlayStories}
              style={{ cursor: "pointer" }}
              className="pointOptionStories"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>
        </>
      ) : (
        <>
          <figure>
            <img src={components.ImageDummy3} alt="" />
            <figcaption>
              <p>{user}</p>
              <p>49m</p>
            </figcaption>
          </figure>
          <div className="OptionStories">
            <img src={components.WarningStories} alt="" />
          </div>
        </>
      )}
    </Fragment>
  );
}
