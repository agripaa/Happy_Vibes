import React from "react";
import ImageSearchAside from "../../../img/Vector-Explore.png";
import "../../../css/Explore.scss";

function ComponentsSearchExplore() {
  return (
    <div className="Container-searchExplore">
      <form className="FormSearch-Explore">
        <figure className="imageSearch-Explore">
          <img src={ImageSearchAside} alt="" />
        </figure>
        <div className="inputForm">
          <input type="text" placeholder="search name" />
        </div>
      </form>
    </div>
  );
}

export default ComponentsSearchExplore;
