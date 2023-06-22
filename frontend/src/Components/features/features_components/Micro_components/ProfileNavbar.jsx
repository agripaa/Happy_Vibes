import React, { Fragment, useEffect, useState } from "react";
import "../../../css/Navbar.scss";

import ImageDummmy from "../../../img/imageDummy2.png";
function ProfileNavbar({ check }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <Fragment>
      {check ? (
        getInnerWidth > 500 ? (
          <div className="NavbarProfile">
            <div className="NavbarProfile-Container">
              <figure>
                <img src={ImageDummmy} alt="" />
              </figure>
              <figcaption>
                <h5>NameDummy</h5>
                <p>@nameDummy</p>
              </figcaption>
            </div>
          </div>
        ) : null
      ) : (
        <div className="NavbarProfile">
          <div className="NavbarProfile-Container">
            <figure>
              <img src={ImageDummmy} alt="" />
              <div className="bulletsProfile">
                <div className="bulletsProfile-wrap">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </figure>
            <figcaption>
              <h5>NameDummy</h5>
              <p>@nameDummy</p>
            </figcaption>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ProfileNavbar;
