import React, { Fragment, useEffect, useState } from "react";
import "../../css/Homepage/Homepage.scss";
import "../../css/Status/Comment.scss";
import "../../css/myLibrary.scss";
import FeaturePost_HomePage from "./Micro_ComponentHomePage/FeaturesPost_HomePage";

import { useSelector } from "react-redux";
import Version from "../features_components/Micro_components/Version";
import CommentComponents from "../features_components/Micro_components/Comment/Comment";
import AlertDeletePosting from "../features_components/Micro_components/alert/AlertDeletePosting";
import OptionBugReport from "../features_components/Micro_components/option/OptionBugReport";
import AsideSearch from "../features_components/AsideSearch/AsideSearch";
import Navbar from "../features_components/Navbar/Navbar";

function Homepage() {
  const myCheck = useSelector((state) => state.check);
  const components = useSelector((state) => state.icons);
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
                <img src={components.ImageChat2} alt="" />
              </figure>
            </div>
          ) : null}
          <FeaturePost_HomePage />
        </div>
      </div>
      {myCheck.checkImageComment ? <CommentComponents /> : null}
      {myCheck.dltCheckPosting ? <AlertDeletePosting /> : null}
      <OptionBugReport />
      <AsideSearch />
      <Version />
    </Fragment>
  );
}

export default Homepage;
