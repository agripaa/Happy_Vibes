import React, { useState } from "react";
import ImageDummmy from "../../../img/imageDummy2.png";
import "../../../css/Aside-Search.scss";
import { useSelector } from "react-redux";
function ListUser() {
  const [follow, setFollow] = useState(false);
  const components = useSelector((state) => state.ComponentImagePostReducer);
  return (
    <div className="ThisUser">
      <div className="imageProfile-Aside">
        <figure>
          <img src={ImageDummmy} alt="" />
        </figure>
      </div>
      <div className="NameProfile-Aside">
        <figcaption>
          <h5>NameDummy</h5>
          <p>@NameDummy</p>
        </figcaption>
        <figure>
          <img src={components.Verified} alt="" />
        </figure>
      </div>
      <div className="FollowProfile-Aside">
        {follow ? (
          <button
            className="ButtonFollowed-Aside"
            onClick={() => setFollow(false)}
          >
            Followed
          </button>
        ) : (
          <button
            className="ButtonFollow-Aside"
            onClick={() => setFollow(true)}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}

export default ListUser;
