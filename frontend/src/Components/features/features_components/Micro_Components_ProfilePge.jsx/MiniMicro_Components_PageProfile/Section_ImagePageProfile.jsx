import React from "react";

function Section_ImagePageProfile({ ImageProfilePage, ImageProfilePage2 }) {
  return (
    <section className="section-ImageProfilePage">
      <figure className="BackgroundProfilePage">
        <img src={ImageProfilePage} alt="" />
      </figure>
      <figure className="FrontProfilePage">
        <img src={ImageProfilePage2} alt="" />
      </figure>
    </section>
  );
}

export default Section_ImagePageProfile;
