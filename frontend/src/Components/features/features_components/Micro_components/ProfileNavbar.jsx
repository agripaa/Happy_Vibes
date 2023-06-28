import React, { Fragment, useEffect, useState } from "react";
import "../../../css/Navbar.scss";
import ImageDummmy from "../../../img/imageDummy2.png";
import ImageBug2 from "../../../img/bug_report2.svg";
import ImageDeleteAccount2 from "../../../img/delete2.svg";
import ImageLogout2 from "../../../img/logout2.svg";
import OptionProfile from "./MiniMicro_Components/OptionProfile";
function ProfileNavbar({ check, logout, bugReport, deletes }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  const [Options, setOptions] = useState(false);
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
              <div className="bulletsProfile">
                <div
                  className="bulletsProfile-wrap"
                  onClick={() => setOptions(!Options)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <OptionProfile
                  Optionse={Options}
                  responseCheck={true}
                  bugReport={bugReport}
                  deletes={deletes}
                  logout={logout}
                  bugReport2={ImageBug2}
                  deletes2={ImageDeleteAccount2}
                  logout2={ImageLogout2}
                />
              </div>
            </div>
          </div>
        ) : null
      ) : (
        <div className="NavbarProfile">
          <div className="NavbarProfile-Container">
            <figure>
              <img src={ImageDummmy} alt="" />
              <div className="bulletsProfile">
                <div
                  className="bulletsProfile-wrap"
                  onClick={() => setOptions(!Options)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <OptionProfile
                  Optionse={Options}
                  responseCheck={false}
                  bugReport={bugReport}
                  deletes={deletes}
                  logout={logout}
                  bugReport2={ImageBug2}
                  deletes2={ImageDeleteAccount2}
                  logout2={ImageLogout2}
                />
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
