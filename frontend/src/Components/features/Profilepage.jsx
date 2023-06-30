import React, { Fragment } from "react";
import Navbar from "./features_components/Navbar";
import AsideSearch from "./features_components/AsideSearch";
import ImageBack from "../img/Vector-back.png";
import "../css/ProfilePage.scss";
import "../css/Posting_ProfilePage.scss";
import ImageProfilePage from "../img/Background-profile.png";
import ImageProfilePage2 from "../img/imageDummy2.png";
import HeaderPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/HeaderPageProfile";
import MainPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/MainPageProfile";
import Navigation_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/Navigation_ProfilePage";
import ImageDummy from "../img/imageDummy2.png";
import ImageDummy2 from "../img/Frame_10.png";
import ImageLove from "../img/Vector-Like.png";
import ImageChat from "../img/Vector-Chat.png";
import ImageShare from "../img/Vector-Share.png";
import ImageBookmarks from "../img/Vector-Save.png";
import FeaturePost_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/FeaturePost_ProfilePage";
function Profilepage() {
  return (
    <Fragment>
      <Navbar />
      <div className="Container-ProfilePage">
        <div className="WrapContainer-ProfilePage">
          <HeaderPageProfile ImageBack={ImageBack} />
          <MainPageProfile
            ImageProfilePage={ImageProfilePage}
            ImageProfilePage2={ImageProfilePage2}
          />
          <Navigation_ProfilePage />
          <FeaturePost_ProfilePage />
        </div>
      </div>
      <AsideSearch />
    </Fragment>
  );
}

export default Profilepage;
