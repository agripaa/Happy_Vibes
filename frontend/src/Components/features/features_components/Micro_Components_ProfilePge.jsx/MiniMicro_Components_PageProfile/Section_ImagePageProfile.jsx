import React from "react";
import { useSelector } from "react-redux";

function Section_ImagePageProfile({urlProfile, nameProfile, urlBackground, nameBackground}) {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  return (
    <section className="section-ImageProfilePage">
      <figure className="BackgroundProfilePage">
        <img src={urlBackground ? urlBackground : components.ImageProfilePage } alt={!nameBackground ? "default img background" : nameBackground} />
      </figure>
      <figure className="FrontProfilePage">
        <img src={urlProfile} alt={nameProfile} />
      </figure>
    </section>
  );
}

export default Section_ImagePageProfile;
