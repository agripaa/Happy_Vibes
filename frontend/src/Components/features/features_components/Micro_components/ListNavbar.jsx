import React, { Fragment, useEffect, useState } from "react";
import "../../../css/Navbar.scss";
import ImageListHome from "../../../img/Vector-Home.png";
import ImageListExplore from "../../../img/Vector-Explore.png";
import ImageListNotifications from "../../../img/Vector-Notifications.png";
import ImageListProfile from "../../../img/Vector-Profile.png";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CheckMyPostUser } from "../../../Action/CheckMyPost";

function ListNavbar() {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <Fragment>
      <div className="NavbarList">
        <nav className="navTags">
          <ul className="NavbarList-Container">
            <li>
              <div className="Listhome">
                <Link to={"/homepage"}>
                  <img src={ImageListHome} alt="" />
                  <p>Home</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="ListExplore">
                <Link to={"/explore"}>
                  <img src={ImageListExplore} alt="" />
                  <p>Explore</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="ListNotifications">
                <Link to={"/notifications"}>
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
                <Link to={"/profileusers/1"}>
                  <img src={ImageListProfile} alt="" />
                  <p>Profile</p>
                </Link>
              </div>
            </li>
            <li>
              <div
                className="ListButtonPost"
                onClick={() => dispatch(CheckMyPostUser(true))}
              >
                <p>Post</p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}

export default ListNavbar;
