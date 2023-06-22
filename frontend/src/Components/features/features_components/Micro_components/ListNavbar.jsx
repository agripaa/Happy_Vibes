import React, { useEffect, useState } from "react";
import "../../../css/Navbar.scss";
import ImageListHome from "../../../img/Vector-Home.png";
import ImageListExplore from "../../../img/Vector-Explore.png";
import ImageListMessages from "../../../img/Vector-Messages.png";
import ImageListNotifications from "../../../img/Vector-Notifications.png";
import ImageListProfile from "../../../img/Vector-Profile.png";
import ImageListBookmarks from "../../../img/Vector-Bookmarks.png";
import ImageListPost from "../../../img/Vector-Post.png";
import { Link } from "react-router-dom";

function ListNavbar() {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
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
          {/* <li>
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
          </li> */}

          <li>
            <div className="ListProfile">
              <Link to={"/"}>
                <img src={ImageListProfile} alt="" />
                <p>Profile</p>
              </Link>
            </div>
          </li>
          <li>
            <div className="ListButtonPost">
              <Link to={"/"}>
                <p>Post</p>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ListNavbar;
