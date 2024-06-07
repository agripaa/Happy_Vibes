import React from "react";
import { useSelector } from "react-redux";
export default function SekeletonStories({ text }) {
  const components = useSelector((state) => state?.icons);

  return (
    <section
      className="UserStoriesDisplaySkeleton"
      style={{
        borderRadius: "10px",
        backgroundColor: "transparent !important",
      }}
    >
      <figure className="ContentStoriesSkeleton">
        <img src={components.ImageDummy2} alt="" />
      </figure>
      <figure className="NextUserStories">
        <img src={components.ImageDummy} alt="" />
        <figcaption>
          <p>Your Story</p>
          <p>@{text}</p>
        </figcaption>
      </figure>
      {/* <button>Share</button> */}
    </section>
  );
}
