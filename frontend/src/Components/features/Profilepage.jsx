import React, { Fragment } from "react";
import Navbar from "./features_components/Navbar";
import AsideSearch from "./features_components/AsideSearch";
import "../css/ProfilePage.scss";
import "../css/Posting_ProfilePage.scss";
import HeaderPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/HeaderPageProfile";
import MainPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/MainPageProfile";
import Navigation_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/Navigation_ProfilePage";
import FeaturePost_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/FeaturePost_ProfilePage";

import OptionBugReport from "./features_components/Micro_components/MiniMicro_Components/OptionBugReport";
import CommentComponents from "./features_components/Micro_components/Comment";
import { useSelector } from "react-redux";
function Profilepage() {
  const myComment = useSelector((state) => state.CheckMyPostReducer);

  return (
    <Fragment>
      <Navbar />
      <div className="Container-ProfilePage">
        <div className="WrapContainer-ProfilePage">
          <HeaderPageProfile />
          <MainPageProfile />
          <Navigation_ProfilePage />
          <FeaturePost_ProfilePage />
        </div>
      </div>
      {myComment.checkImageComment ? <CommentComponents /> : null}

      <OptionBugReport />

      <AsideSearch />
    </Fragment>
  );
}

export default Profilepage;
