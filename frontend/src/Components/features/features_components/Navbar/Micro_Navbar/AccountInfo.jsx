import React, { Fragment, useEffect, useState } from "react";
import ProfileNavbar from "./MoreInfo";
import CloseNavbar from "../../../../img/close.png";
import axios from "axios";
import MoreInfo from "./MoreInfo";
function AccountInfo({ closeNav }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  const [user, setUser] = useState({});
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);

  // async function getFollowsUser() {
  //   try {
  //     await axios
  //       .get("http://localhost:5000/auth/profile", { withCredentials: true })
  //       .then(({ data }) => {
  //         setUser(data.result);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getFollowsUser();
  // }, []);
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
              <MoreInfo check={false} />
              <div className="NavbarFollow">
                <div className="FollowingNavbar">
                  {/* <p>{user.followingCount} Following</p> */}
                  <p>100 Following</p>
                </div>
                <div className="FollowersNavbar">
                  {/* <p>{user.followerCount} followers</p> */}
                  <p>121 followers</p>
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
