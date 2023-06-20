import React, { Fragment } from "react";
import Navbar from "./features_components/Navbar";
import AsideSearch from "./features_components/AsideSearch";
import ImageBack from "../img/Vector-back.png";
import "../css/ProfilePage.scss";
import ImageProfilePage from "../img/Background-profile.png";
import ImageProfilePage2 from "../img/imageDummy2.png";
import HeaderPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/HeaderPageProfile";
import MainPageProfile from "./features_components/Micro_Components_ProfilePge.jsx/MainPageProfile";
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
        </div>
      </div>
      <AsideSearch />
    </Fragment>
  );
}

export default Profilepage;
