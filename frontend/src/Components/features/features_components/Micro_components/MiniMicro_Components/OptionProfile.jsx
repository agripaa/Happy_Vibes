import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETECHECK } from "../../../../Action/CheckAcconutDelete";

function OptionProfile({
  Optionse,
  responseCheck,
  logout,
  bugReport,
  deletes,
  logout2,
  bugReport2,
  deletes2,
}) {
  const { dltCheckNav } = useSelector((state) => state.CheckDeleteReducer);
  const dispath = useDispatch();
  function HandleClickButtonDelete(e) {
    e.preventDefault();
    dispath(DELETECHECK(true));
  }

  return (
    <Fragment>
      {responseCheck ? (
        <div
          className={
            Optionse ? "OptionsProfile activeOption" : "OptionsProfile"
          }
        >
          <div className="wrapOptionsProfile">
            <section className="Container-BugReport">
              <img src={bugReport} alt="" />
              <p>Bug Report</p>
            </section>
            <section className="Container-Logout">
              <img src={logout} alt="" />
              <p>Logout</p>
            </section>
            <section
              className="Container-DeleteAccount"
              onClick={HandleClickButtonDelete}
            >
              <img src={deletes} alt="" />
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
            <section className="Container-BugReport">
              <img src={logout2} alt="" />
              <p>Bug Report</p>
            </section>
            <section className="Container-Logout">
              <img src={bugReport2} alt="" />
              <p>Logout</p>
            </section>
            <section
              className="Container-DeleteAccount"
              onClick={HandleClickButtonDelete}
            >
              <img src={deletes2} alt="" />
              <p>Delete Account</p>
            </section>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default OptionProfile;
