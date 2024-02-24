import React, { Fragment, useState, useEffect } from "react";
import ImageBack from "../../../img/Vector-back.png";
import "../../../css/ProfilePage.scss";
import "../../../css/Posting_ProfilePage.scss";
import HeaderPageProfile from "../Micro_Components_ProfilePge.jsx/HeaderPageProfile";
import Navigation_ProfilePage from "../Micro_Components_ProfilePge.jsx/Navigation_ProfilePage";

import axios from "axios";
import { useSelector } from "react-redux";
import ChangeProfileImage from "../../features_components/Micro_components/ChangeProfileImage";
import Version from "../../features_components/Micro_components/Version";

import FeaturePost_OwnerProfilePage from "./Owner_Micro_Component_Profile/FeaturePost_OwnerProfilePage";
import Owner_MainPageProfile from "../User/User_Micro_Component_Profile/User_MainPageProfile";
import Navbar from "../../features_components/Navbar/Navbar";
import AsideSearch from "../../features_components/AsideSearch/AsideSearch";
import CommentComponents from "../../features_components/Micro_components/Comment/Comment";
import AlertDeletePosting from "../../features_components/Micro_components/alert/AlertDeletePosting";
import OptionBugReport from "../../features_components/Micro_components/option/OptionBugReport";

function Owner_Profilepage() {
  const [user, setUser] = useState({});
  const [background, setBackground] = useState({});
  const myComment = useSelector((state) => state.check);

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
          <Owner_MainPageProfile users={user} background={background} />
          <Navigation_ProfilePage />
          <FeaturePost_OwnerProfilePage />
        </div>
      </div>
      {myComment.checkEdit ? <ChangeProfileImage /> : null}
      {myComment.checkImageComment ? <CommentComponents /> : null}
      {myComment.dltCheckPosting ? <AlertDeletePosting /> : null}
      <OptionBugReport />
      <AsideSearch />
      <Version />
    </Fragment>
  );
}

export default Owner_Profilepage;
