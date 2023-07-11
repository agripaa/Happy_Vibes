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
import axios from 'axios';

function ProfilepageUsers() {
  const [user, setUser] = useState();

  async function getDataUser() {
    try {
      await axios.get('http://localhost:5000/auth/profile', {withCredentials: true})
      .then(({data}) => {
        // console.log(data.result);
        setUser(data.result);
      }) .catch(({response}) => {
        console.error(response);
      })
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDataUser();
  }, []);
  
  return (
    <Fragment>
      <Navbar />
      <div className="Container-ProfilePage">
        <div className="WrapContainer-ProfilePage">
          <HeaderPageProfile ImageBack={ImageBack}/>
          <MainPageProfileUsers />
          <Navigation_ProfilePage />
          <FeaturePost_ProfilePage />
        </div>
      </div>
      <OptionBugReport />
      <AsideSearch />
    </Fragment>
  );
}

export default ProfilepageUsers;
