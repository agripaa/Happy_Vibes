import React, { Fragment } from "react";
import Navbar from "./features_components/Navbar";
import AsideSearch from "./features_components/AsideSearch";
import "../css/Notifcations.scss";
import Section_Notification from "./features_components/Micro_ComponentNotifcation/Section_Notification";
import { useSelector } from "react-redux";

function Notifications() {
  const components = useSelector((state) => state.ComponentImagePostReducer);

  return (
    <Fragment>
      <Navbar />
      <div className="ContainerNotifications">
        <div className="wrapNotifications">
          <header className="header-Notifications">
            <figure className="buttonBackNotifications">
              <img src={components.ImageBack} alt="" />
            </figure>
            <div className="NameNotifications">
              <h1>Notifications</h1>
            </div>
          </header>
          <main className="main-Notifications">
            <Section_Notification />
            <Section_Notification />
            <Section_Notification />
            <Section_Notification />
          </main>
        </div>
      </div>
      <AsideSearch />
    </Fragment>
  );
}

export default Notifications;
