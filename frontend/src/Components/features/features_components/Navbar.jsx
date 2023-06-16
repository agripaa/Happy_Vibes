import React, { useEffect, useState } from "react";
import "../../css/Navbar.scss";
import ImageListHome from "../../img/Vector-Home.png";
import ImageListExplore from "../../img/Vector-Explore.png";
import ImageListMessages from "../../img/Vector-Messages.png";
import ImageListNotifications from "../../img/Vector-Notifications.png";
import ImageListProfile from "../../img/Vector-Profile.png";
import ImageListBookmarks from "../../img/Vector-Bookmarks.png";
import ImageDummmy from "../../img/imageDummy2.png";
import { Link } from "react-router-dom";
function Navbar() {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <div className="ContainerNavbar">
      {getInnerWidth <= 500 ? (
        <div className="NavbarLogo">
          <h1>HyV</h1>
        </div>
      ) : null}
      <div className="ContainerNavbar-Components">
        {getInnerWidth > 500 ? (
          <div className="NavbarLogo">
            <h1>HyV</h1>
          </div>
        ) : null}
        <div className="NavbarList">
          <nav className="navTags">
            <ul className="NavbarList-Container">
              <li>
                <div className="Listhome">
                  <Link to={"/"}>
                    <img src={ImageListHome} alt="" />
                    <p>Home</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className="ListExplore">
                  <Link to={"/"}>
                    <img src={ImageListExplore} alt="" />
                    <p>Explore</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className="ListNotifications">
                  <Link to={"/"}>
                    <img src={ImageListNotifications} alt="" />
                    <p>Notifications</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className="ListMessages">
                  <Link to={"/"}>
                    <img src={ImageListMessages} alt="" />
                    <p>Messages</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className="ListBookmarks">
                  <Link to={"/"}>
                    <img src={ImageListBookmarks} alt="" />
                    <p>Bookmarks</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className="ListProfile">
                  <Link to={"/"}>
                    <img src={ImageListProfile} alt="" />
                    <p>Profile</p>
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        {getInnerWidth > 500 ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
