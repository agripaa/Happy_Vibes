import React from "react";
import ImageSearchAside from "../../../img/Vector-Explore.png";
import "../../../css/Aside-Search.scss";

function ComponentsSearch() {
  return (
    <div className="Container-search">
      <form className="FormSearch-aside">
        <figure className="imageSearch-aside">
          <img src={ImageSearchAside} alt="" />
        </figure>
        <div className="inputForm">
          <input type="text" placeholder="search name" />
        </div>
      </form>
    </div>
  );
}

export default ComponentsSearch;
