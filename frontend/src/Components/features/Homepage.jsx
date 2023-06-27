import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./features_components/Navbar";
import "../css/Homepage.scss";
import "../css/myLibrary.scss";
import AsideSearch from "./features_components/AsideSearch";
import ImageDummy from "../img/imageDummy2.png";
import ImageDummy2 from "../img/Frame_10.png";
import ImageLove from "../img/Vector-Like.png";
import ImageChat from "../img/Vector-Chat.png";
import ImageShare from "../img/Vector-Share.png";
import ImageBookmarks from "../img/Vector-Save.png";
import ImageChat2 from "../img/chat-components.svg";
import FeaturePost_HomePage from "./features_components/Micro_ComponentHomePage/FeaturesPost_HomePage";

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

          <FeaturePost_HomePage
            ImageDummy={ImageDummy}
            ImageDummy2={ImageDummy2}
            ImageLove={ImageLove}
            ImageChat={ImageChat}
            ImageShare={ImageShare}
            ImageBookmarks={ImageBookmarks}
          />
        </div>
      </div>
      <AsideSearch />
    </Fragment>
  );
}

export default Homepage;
