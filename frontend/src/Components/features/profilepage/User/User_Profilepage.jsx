import React, { Fragment, useEffect, useState } from "react";
import "../../../css/ProfilePage.scss";
import "../../../css/Posting_ProfilePage.scss";
import HeaderPageProfile from "../Micro_Components_ProfilePge.jsx/HeaderPageProfile";
import Navigation_ProfilePage from "../Micro_Components_ProfilePge.jsx/Navigation_ProfilePage";

import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Version from "../../features_components/Micro_components/Version";

import FeaturePost_UserProfilePage from "./User_Micro_Component_Profile/FeaturePost_UserProfilePage";
import User_MainPageProfile from "./User_Micro_Component_Profile/User_MainPageProfile";
import Navbar from "../../features_components/Navbar/Navbar";
import AsideSearch from "../../features_components/AsideSearch/AsideSearch";
import OptionBugReport from "../../features_components/Micro_components/option/OptionBugReport";
import AlertReportPosting from "../../features_components/Micro_components/alert/AlertReportPosting";
import CommentComponents from "../../features_components/Micro_components/Comment/Comment";

function User_Profilepage() {
  const { id } = useParams();
  const myComment = useSelector((state) => state.check);

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  async function getDataUser() {
    try {
      axios
        .get(`http://localhost:5000/get/user/${id}`, { withCredentials: true })
        .then(({ data }) => {
          setUser(data.result);
        })
        .catch(({ response }) => {
          const { status } = response.data;
          if (status === 403) {
            navigate("/profile/user");
          }
        });
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getDataUser();
  }, [user.id, setUser]);
  return (
    <Fragment>
      <Navbar />
      <div className="Container-ProfilePage">
        <div className="WrapContainer-ProfilePage">
          <HeaderPageProfile userName={user.username} />
          <User_MainPageProfile user={user} />
          <Navigation_ProfilePage />
          <FeaturePost_UserProfilePage userId={user.id} />
        </div>
      </div>
      {myComment.checkImageComment ? <CommentComponents /> : null}
      {myComment.CheckBugReportPosting ? <AlertReportPosting /> : null}

      <OptionBugReport />
      <AsideSearch />
      <Version />
    </Fragment>
  );
}

export default User_Profilepage;
