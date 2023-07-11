import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "./features_components/Navbar";
import "../css/Homepage.scss";
import "../css/Comment.scss";
import "../css/myLibrary.scss";
import AsideSearch from "./features_components/AsideSearch";
import ImageChat2 from "../img/chat-components.svg";
import FeaturePost_HomePage from "./features_components/Micro_ComponentHomePage/FeaturesPost_HomePage";
import OptionBugReport from "./features_components/Micro_components/MiniMicro_Components/OptionBugReport";
import { useSelector } from "react-redux";
import CommentComponents from "./features_components/Micro_components/Comment";

function Homepage() {
  const myComment = useSelector((state) => state.CheckMyPostReducer);
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const components = useSelector((state) => state.ComponentImagePostReducer);
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
                <img src={components.LogoNavbar} alt="" />
              </header>
              <figure className="featuresChat">
                <img src={components.ImageChat2} alt="" />
              </figure>
            </div>
          ) : null}
          <FeaturePost_HomePage />
        </div>
      </div>
      {myComment.checkImageComment ? <CommentComponents /> : null}
      <OptionBugReport />
      <AsideSearch />
    </Fragment>
  );
}

export default Homepage;
