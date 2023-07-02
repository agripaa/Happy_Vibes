import React from "react";
import { useSelector } from "react-redux";

function Section_ImagePageProfile() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  return (
    <section className="section-ImageProfilePage">
      <figure className="BackgroundProfilePage">
        <img src={components.ImageProfilePage} alt="" />
      </figure>
      <figure className="FrontProfilePage">
        <img src={components.ImageDummy} alt="" />
      </figure>
    </section>
  );
}

export default Section_ImagePageProfile;
