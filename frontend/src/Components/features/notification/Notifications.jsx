import React, { Fragment } from "react";
import "../../css/Notifcations.scss";
import Section_Notification from "./Micro_ComponentNotifcation/Section_Notification";
import { useSelector } from "react-redux";

import Version from "../features_components/Micro_components/Version";
import { useNavigate } from "react-router";
import Navbar from "../features_components/Navbar/Navbar";
import AsideSearch from "../features_components/AsideSearch/AsideSearch";
import OptionBugReport from "../features_components/Micro_components/option/OptionBugReport";

function Notifications() {
  const components = useSelector((state) => state.icons);
  const navigate = useNavigate();
  return (
    <Fragment>
      <Navbar />
      <div className="ContainerNotifications">
        <div className="wrapNotifications">
          <header className="header-Notifications">
            <figure className="buttonBackNotifications">
              <img
                src={components.ImageBack}
                alt=""
                onClick={() => navigate("/homepage")}
                style={{ cursor: "pointer" }}
              />
            </figure>
            <div className="NameNotifications">
              <h1>Notifications</h1>
            </div>
          </header>
          <main className="main-Notifications">
            <Section_Notification />
          </main>
        </div>
      </div>
      <OptionBugReport />
      <AsideSearch />
      <Version />
    </Fragment>
  );
}

export default Notifications;
