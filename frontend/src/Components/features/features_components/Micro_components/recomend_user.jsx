import React from "react";
import ImageDummmy from "../../../img/imageDummy2.png";
import "../../../css/Aside-Search.scss";
import ListUser from "./ListUser";

function Recomend_user() {
  return (
    <div className="Container-recomendUser">
      <div className="titleAsideSearch">
        <p>Make Your Friend in HyV</p>
      </div>
      <div className="WrapUser">
        <ListUser />
        <ListUser />
        <ListUser />
        <ListUser />
      </div>
    </div>
  );
}

export default Recomend_user;
