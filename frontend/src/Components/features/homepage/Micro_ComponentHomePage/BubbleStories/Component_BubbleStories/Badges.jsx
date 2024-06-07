import React from "react";
import { useSelector } from "react-redux";

export default function Badges() {
  const components = useSelector((state) => state?.icons);

  return (
    <figure className="Stories">
      <div className="Badges">
        <img src={components.DummyBubbleStories} alt="" />
      </div>
      <figcaption className="NameStory">
        <p>Your Story</p>
      </figcaption>
    </figure>
  );
}
