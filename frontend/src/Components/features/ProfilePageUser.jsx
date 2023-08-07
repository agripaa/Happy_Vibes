import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./features_components/Navbar";
import AsideSearch from "./features_components/AsideSearch";
import ImageBack from "../img/Vector-back.png";
import "../css/ProfilePage.scss";
import "../css/Posting_ProfilePage.scss";
import HeaderPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/HeaderPageProfile";
import Navigation_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/Navigation_ProfilePage";
import FeaturePost_ProfilePage from "./features_components/Micro_Components_ProfilePge.jsx/FeaturePost_ProfilePage";
import MainPageProfileUsers from "./features_components/Micro_Components_ProfilePge.jsx/MainPageProfileUsers";
import OptionBugReport from "./features_components/Micro_components/MiniMicro_Components/OptionBugReport";
import axios from "axios";
import { useSelector } from "react-redux";
import ChangeProfileImage from "./features_components/Micro_components/ChangeProfileImage";
import CommentComponents from "./features_components/Micro_components/Comment";
import Version from "./features_components/Micro_components/Version";
import AlertDeletePosting from "./features_components/Micro_components/MiniMicro_Components/AlertDeletePosting";

function ProfilepageUsers() {
  const [user, setUser] = useState({});
  const [background, setBackground] = useState({});
  const myEdit = useSelector((state) => state.CheckDeleteReducer);
  const myComment = useSelector((state) => state.CheckMyPostReducer);

  async function getDataUser() {
    try {
      await axios
        .get("http://localhost:5000/auth/profile", { withCredentials: true })
        .then(({ data }) => {
          setUser(data.result);
        })
        .catch(({ response }) => {
          console.error(response);
        });
    } catch (err) {
      console.error(err);
    }
  }

  async function getDataBackground() {
    try {
      await axios
        .get("http://localhost:5000/background/user", { withCredentials: true })
        .then(({ data }) => {
          setBackground(data.result);
        })
        .catch(({ response }) => {
          console.error(response);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDataUser();
    getDataBackground();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="Container-ProfilePage">
        <div className="WrapContainer-ProfilePage">
          <HeaderPageProfile ImageBack={ImageBack} userName={user.name} />
          <MainPageProfileUsers users={user} background={background} />
          <Navigation_ProfilePage />
          <FeaturePost_ProfilePage />
        </div>
      </div>
      {myEdit.checkEdit ? <ChangeProfileImage /> : null}
      {myComment.checkImageComment ? <CommentComponents /> : null}
      {myEdit.dltCheckPosting ? <AlertDeletePosting /> : null}
      <OptionBugReport />
      <AsideSearch />
      <Version />
    </Fragment>
  );
}

export default ProfilepageUsers;
