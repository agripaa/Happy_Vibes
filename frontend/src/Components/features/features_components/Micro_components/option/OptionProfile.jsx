import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { CHECKBUG, DELETECHECK } from "../../../../redux/CheckReducer/Check";

function OptionProfile({ Optionse, responseCheck }) {
  const { dltCheckNav } = useSelector((state) => state.check);
  const components = useSelector((state) => state.icons);
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const dispath = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios
        .delete("http://localhost:5000/auth/logOut", { withCredentials: true })
        .then(() => {
          navigate("/");
        });
    } catch (err) {
      console.error(err);
    }
  }

  function HandleClickButtonDelete(e) {
    e.preventDefault();
    dispath(DELETECHECK(true));
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <Fragment>
      {responseCheck ? (
        <div
          className={
            Optionse ? "OptionsProfile activeOption" : "OptionsProfile"
          }
        >
          <div className="wrapOptionsProfile">
            <section className="Container-Logout">
              <img src={components.ImageLogout} alt="" />
              <p onClick={handleLogout}>Logout</p>
            </section>
            <section
              className="Container-DeleteAccount"
              onClick={HandleClickButtonDelete}
            >
              <img src={components.ImageDeleteAccount} alt="" />
              <p>Delete Account</p>
            </section>
          </div>
        </div>
      ) : (
        <div
          className={
            Optionse && dltCheckNav
              ? "OptionsProfile activeOption"
              : "OptionsProfile"
          }
        >
          <div className="wrapOptionsProfile">
            <section
              className="Container-BugReport"
              onClick={() => dispath(CHECKBUG(true))}
            >
              <img src={components.ImageBug2} alt="" />
              <p>Bug Report</p>
            </section>
            <section className="Container-Logout">
              <img src={components.ImageLogout2} alt="" />
              <p>Logout</p>
            </section>
            <section
              className="Container-DeleteAccount"
              onClick={HandleClickButtonDelete}
            >
              <img src={components.ImageDeleteAccount2} alt="" />
              <p>Delete Account</p>
            </section>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default OptionProfile;
