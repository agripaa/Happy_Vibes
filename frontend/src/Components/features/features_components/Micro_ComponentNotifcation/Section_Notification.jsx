import React from "react";
import { useSelector } from "react-redux";

function Section_Notification() {
  const components = useSelector((state) => state.ComponentImagePostReducer);

  return (
    <section className="ThisNotifications">
      <div className="BlockNameUser">
        <div className="Nameuser-Notifications">
          <figure>
            <img src={components.ImageDummy} alt="" />
          </figure>
          <figcaption>
            <p>Jonathan.as</p>
            <p>@jonathan.as</p>
          </figcaption>
        </div>
        <div className="Text-Notifications">
          <p>Has been followed you</p>
        </div>
      </div>
      <div className="CircleNotifications">
        <div className="ThisCircle"></div>
      </div>
    </section>
  );
}

export default Section_Notification;
