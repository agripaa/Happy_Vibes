import React from "react";
import ImageSearchAside from "../../../img/Vector-Explore.png";
import "../../../css/Explore.scss";
import { useSelector } from "react-redux";

function ComponentsSearchExplore() {
  const components = useSelector((state) => state.ComponentImagePostReducer);

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
      <div className="FindSearch">
        <div className="SearchInputUser">
          <img src={components.IconSearchExplore} alt="" />
          <p>Search Input</p>
        </div>
        <div className="SearchFindInputUser">
          <img src={components.IconSearchExplore} alt="" />
          <p>#Search Input</p>
        </div>
      </div>
    </div>
  );
}

export default ComponentsSearchExplore;
