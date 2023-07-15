import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Navbar.scss";

import OptionProfile from "./MiniMicro_Components/OptionProfile";
import { useSelector } from "react-redux";

function ProfileNavbar({ check }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  const [dataProfile, setDataProfile] = useState({});
  const [Options, setOptions] = useState(false);
  const { dltCheckNav } = useSelector((state) => state.CheckDeleteReducer);
  const components = useSelector((state) => state.ComponentImagePostReducer);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
    getProfileUser();
  }, [getInnerWidth]);

  async function getProfileUser() {
    try {
      await axios
        .get("http://localhost:5000/auth/profile", { withCredentials: true })
        .then(({ data }) => {
          setDataProfile(data.result);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      {check ? (
        getInnerWidth > 500 ? (
          <div className="NavbarProfile">
            <div className="NavbarProfile-Container">
              <figure>
                <img src={dataProfile.url} alt={dataProfile.name_img} />
              </figure>
              <figcaption>
                <h5>{dataProfile.name}</h5>
                <p>@{dataProfile.username}</p>
              </figcaption>
              <div className="bulletsProfile">
                <div
                  className="bulletsProfile-wrap"
                  onClick={() => {
                    if (!dltCheckNav) {
                      setOptions(!Options);
                    } else {
                      setOptions(false);
                    }
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <OptionProfile Optionse={Options} responseCheck={true} />
              </div>
            </div>
          </div>
        ) : null
      ) : (
        <div className="NavbarProfile">
          <div className="NavbarProfile-Container">
            <figure>
              <img src={dataProfile.url} alt={dataProfile.name_img} />

              <div className="bulletsProfile">
                <div
                  className="bulletsProfile-wrap"
                  onClick={() => setOptions(!Options)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <OptionProfile Optionse={Options} responseCheck={false} />
              </div>
            </figure>
            <figcaption>
              <h5>{dataProfile.name}</h5>
              <p>@{dataProfile.username}</p>
            </figcaption>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ProfileNavbar;
