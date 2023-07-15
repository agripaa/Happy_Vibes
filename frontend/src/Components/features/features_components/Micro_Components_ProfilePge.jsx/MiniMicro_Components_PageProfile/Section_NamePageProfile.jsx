import React from "react";
import { useSelector } from "react-redux";

function Section_NamePageProfile() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
            <div className="NameProfilePageUser">
              <h4>NameDummy</h4>
              <p>@namedummy</p>
            </div>
            <figure className="VerifiedClass">
              <img src={components.Verified} alt="" />
            </figure>
          </div>
        </div>
        <div className="buttonFollow-ProfilePage">
          <button>Follow</button>
        </div>
      </div>
    </section>
  );
}

export default Section_NamePageProfile;
