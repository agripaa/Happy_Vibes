import React, { Fragment } from "react";
import "../../css/Navbar.scss";
import { useSelector } from "react-redux";
import InputPostComponents from "./Component_PopOptions/InputPostComponents";
import AlertDeleteAccount from "../features_components/Micro_components/alert/AlertDeleteAccount";
import BugReport from "../features_components/Micro_components/bug/BugReport";

function PopOptions() {
  const { dltCheck, checkPost, CheckBugReport } = useSelector(
    (state) => state.check
  );

  return (
    <Fragment>
      {checkPost ? <InputPostComponents /> : null}
      {dltCheck ? <AlertDeleteAccount /> : null}
      {CheckBugReport ? <BugReport /> : null}
    </Fragment>
  );
}

export default PopOptions;
