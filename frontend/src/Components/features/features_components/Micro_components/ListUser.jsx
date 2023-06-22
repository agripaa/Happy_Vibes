import React from "react";
import ImageDummmy from "../../../img/imageDummy2.png";
import "../../../css/Aside-Search.scss";
function ListUser() {
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
      </div>
      <div className="FollowProfile-Aside">
        <button className="ButtonFollow-Aside">Follow</button>
      </div>
    </div>
  );
}

export default ListUser;
