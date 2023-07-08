import React, { Fragment } from "react";
import Navbar from "./features_components/Navbar";
import AsideSearch from "./features_components/AsideSearch";
import ImageBack from "../img/Vector-back.png";
import "../css/ProfilePage.scss";
import "../css/Posting_ProfilePage.scss";
import ImageProfilePage from "../img/Background-profile.png";
import ImageProfilePage2 from "../img/imageDummy2.png";
import HeaderPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/HeaderPageProfile";
import Navigation_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/Navigation_ProfilePage";

import FeaturePost_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/FeaturePost_ProfilePage";
import MainPageProfileUsers from "./features_components/Micro_Components_ProfilePge.jsx/MainPageProfileUsers";
import OptionBugReport from "./features_components/Micro_components/MiniMicro_Components/OptionBugReport";
import CommentComponents from "./features_components/Micro_components/Comment";
import { useSelector } from "react-redux";
import ChangeProfileImage from "./features_components/Micro_components/ChangeProfileImage";
function ProfilepageUsers() {
  const myComment = useSelector((state) => state.CheckMyPostReducer);
  const myEdit = useSelector((state) => state.CheckDeleteReducer);

  return (
    <Fragment>
      <Navbar />
      <div className="Container-ProfilePage">
        <div className="WrapContainer-ProfilePage">
          <HeaderPageProfile ImageBack={ImageBack} />
          <MainPageProfileUsers />
          <Navigation_ProfilePage />
          <FeaturePost_ProfilePage />
        </div>
      </div>
      {myEdit.checkEdit ? <ChangeProfileImage /> : null}
      {myComment.checkImageComment ? <CommentComponents /> : null}

      <OptionBugReport />
      <AsideSearch />
    </Fragment>
  );
}

export default ProfilepageUsers;
