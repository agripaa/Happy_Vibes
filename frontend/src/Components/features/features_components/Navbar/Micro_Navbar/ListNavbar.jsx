import React, { Fragment, useEffect, useState } from "react";
import "../../../../css/Navbar/Navbar.scss";

import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckBgUpload,
  CheckMyPostUser,
} from "../../../../libs/redux/CheckReducer/Check";
import OptionUpload from "../../Micro_components/option/OptionUpload";

function ListNavbar() {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  const dispatch = useDispatch();
  // const params = useSearchParams(location.search);
  const params = window.location.pathname.split("/")[1];
  const components = useSelector((state) => state.icons);
  const { checkBgUpload } = useSelector((state) => state.check);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <Fragment>
      <nav className="NavbarList">
        <div className="navTags">
          <ul className="NavbarList-Container">
            <div className="NavbarList-SubContainer">
              <li>
                <Link
                  to={"/homepage"}
                  className={`Listhome ${
                    params.includes("homepage") && "ActiveclickLink"
                  }`}
                >
                  <img
                    src={
                      params.includes("homepage")
                        ? components.IconListHomeClick
                        : components.IconListHome
                    }
                    alt=""
                  />
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link
                  to={"/message"}
                  className={`ListMessages ${
                    params.includes("message") && "ActiveclickLink"
                  }`}
                >
                  <img
                    src={
                      params.includes("message")
                        ? components.IconListMessageClick
                        : components.IconListMessage
                    }
                    alt=""
                  />
                  <p>Messages</p>
                </Link>
              </li>
              <li>
                <Link
                  to={"/explore"}
                  className={`ListExplore ${
                    params.includes("explore") && "ActiveclickLink"
                  }`}
                >
                  <img
                    src={
                      params.includes("explore")
                        ? components.IconListExploreClick
                        : components.IconListExplore
                    }
                    alt=""
                  />
                  <p>Explore</p>
                </Link>
              </li>
              <li>
                <Link
                  to={"/notifications"}
                  className={`ListNotifications ${
                    params.includes("notifications") && "ActiveclickLink"
                  }`}
                >
                  <img
                    src={
                      params.includes("notifications")
                        ? components.IconListNotificationsClick
                        : components.IconListNotifications
                    }
                    alt=""
                  />
                  <p>Notifications</p>
                </Link>
              </li>

              {/* <li>
            <div className="ListBookmarks">
              <Link to={"/"}>
                <img src={IconListBookmarks} alt="" />
                <p>Bookmarks</p>
              </Link>
            </div>
          </li> */}

              <li>
                <Link
                  to={"/profile/user"}
                  className={`ListProfile ${
                    params.includes("profile") && "ActiveclickLink"
                  }`}
                >
                  <img
                    src={
                      params.includes("profile")
                        ? components.IconListProfileClick
                        : components.IconListProfile
                    }
                    alt=""
                  />
                  <p>Profile</p>
                </Link>
              </li>
            </div>
            <li>
              <div
                className="ListButtonPost"
                onClick={() => dispatch(CheckBgUpload(true))}
              >
                <img src={components.IconAddPost} alt="" />
                <p className="text-upload">Upload</p>
                <OptionUpload popCome={checkBgUpload} />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}

export default ListNavbar;
