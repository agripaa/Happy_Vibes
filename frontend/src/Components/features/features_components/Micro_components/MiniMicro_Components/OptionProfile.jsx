import React, { Fragment } from "react";

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
            <section className="Container-DeleteAccount">
              <img src={deletes} alt="" />
              <p>Delete Account</p>
            </section>
          </div>
        </div>
      ) : (
        <div
          className={
            Optionse ? "OptionsProfile activeOption" : "OptionsProfile"
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
            <section className="Container-DeleteAccount">
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
