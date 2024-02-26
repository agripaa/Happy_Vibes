import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../../../../css/Navbar/Navbar.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import OptionMore from "../../Micro_components/option/OptionMore";
import { CheckBgMore } from "../../../../libs/redux/CheckReducer/Check";

function MoreInfo({ check }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  const [dataProfile, setDataProfile] = useState({});
  const [Options, setOptions] = useState(false);
  const { dltCheckNav, checkBgMore } = useSelector((state) => state.check);
  const components = useSelector((state) => state.icons);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
    // getProfileUser();
  }, [getInnerWidth]);

  // async function getProfileUser() {
  //   try {
  //     await axios
  //       .get("http://localhost:5000/auth/profile", { withCredentials: true })
  //       .then(({ data }) => {
  //         setDataProfile(data.result);
  //       })
  //       .catch(({ response }) => {
  //         const { status } = response.data;
  //         console.error(response.data);
  //         if (status === 401) {
  //           navigate("/");
  //         }
  //       });
  //   } catch ({ response }) {
  //     console.error(response.data);
  //   }
  // }

  return (
    <Fragment>
      {check ? (
        getInnerWidth > 500 ? (
          <div className="NavbarMore">
            <div
              className="NavbarMore-Container"
              onClick={() => {
                if (!dltCheckNav) {
                  dispatch(CheckBgMore(true));
                } else {
                  dispatch(CheckBgMore(false));
                }
              }}
            >
              <div className="bulletsMore">
                <div className="bulletsMore-wrap">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <p className="paragraph-semibold">More</p>
            </div>
            <OptionMore Optionse={checkBgMore} responseCheck={true} />
          </div>
        ) : null
      ) : (
        <div className="NavbarMore">
          <div className="NavbarMore-Container">
            <figure>
              {/* <img src={dataMore.url} alt={dataMore.name_img} /> */}
              <img src={components.ImageDummy} alt={"asdsad"} />

              <div className="bulletsMore">
                <div
                  className="bulletsMore-wrap"
                  onClick={() => dispatch(CheckBgMore(true))}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <OptionMore Optionse={checkBgMore} responseCheck={false} />
              </div>
            </figure>
            <figcaption>
              {/* <h5>{dataProfile.name}</h5>
              <p>@{dataProfile.username}</p> */}
              <h5>roni</h5>
              <p>@roni</p>
            </figcaption>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default MoreInfo;
