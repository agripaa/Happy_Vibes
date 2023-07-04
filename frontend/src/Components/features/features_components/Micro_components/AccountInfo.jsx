import React, { Fragment, useEffect, useState } from "react";
import ProfileNavbar from "./ProfileNavbar";
import CloseNavbar from "../../../img/close.png";
function AccountInfo({ closeNav }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <Fragment>
      {getInnerWidth < 500 ? (
        <div className="ContainerAccountInfo">
          <div className="WrappingAccountInfo">
            <header className="HeaderAccountInfo">
              <h1>Account Info</h1>
              <img
                src={CloseNavbar}
                alt=""
                onClick={closeNav}
                style={{ cursor: "pointer" }}
              />
            </header>
            <main className="mainAccountInfo">
              <ProfileNavbar check={false} />
              <div className="NavbarFollow">
                <div className="FollowingNavbar">
                  <p>20 Following</p>
                </div>
                <div className="FollowersNavbar">
                  <p>12 followers</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default AccountInfo;
