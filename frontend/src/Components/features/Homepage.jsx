import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./features_components/Navbar";
import "../css/Homepage.scss";

import "../css/myLibrary.scss";
import AsideSearch from "./features_components/AsideSearch";
import ImageChat2 from "../img/chat-components.svg";
import FeaturePost_HomePage from "./features_components/Micro_ComponentHomePage/FeaturesPost_HomePage";
import { useSelector } from "react-redux";

function Homepage() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <Fragment>
      <Navbar />
      <div className="Container-HomePage">
        <div className="WrapContainer-HomePage">
          {getWitdh <= 500 ? (
            <div className="NavbarHomePage">
              <header>
                <h1>HV</h1>
              </header>
              <figure className="featuresChat">
                <img src={ImageChat2} alt="" />
              </figure>
            </div>
          ) : null}
          <FeaturePost_HomePage />
        </div>
      </div>

      <AsideSearch />
    </Fragment>
  );
}

export default Homepage;
