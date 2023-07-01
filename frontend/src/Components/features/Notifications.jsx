import React, { Fragment } from "react";
import Navbar from "./features_components/Navbar";
import AsideSearch from "./features_components/AsideSearch";
import "../css/Notifcations.scss";
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
              <h1>NameDummy</h1>
            </div>
          </header>
        </div>
      </div>
      <AsideSearch />
    </Fragment>
  );
}

export default Notifications;
