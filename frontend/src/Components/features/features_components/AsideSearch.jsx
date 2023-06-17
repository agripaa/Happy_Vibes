import React from "react";
import "../../css/Aside-Search.scss";
import ImageSearchAside from "../../img/Vector-Explore.png";
import ImageDummmy from "../../img/imageDummy2.png";
function AsideSearch() {
  return (
    <aside className="AsideSearch">
      <div className="AsideSearch-components">
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
        <div className="Container-recomendUser">
          <div className="titleAsideSearch">
            <p>Make Your Friend in HyV</p>
          </div>
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
        </div>
      </div>
    </aside>
  );
}

export default AsideSearch;
