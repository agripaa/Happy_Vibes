import React, { Fragment } from "react";
import "../css/Navbar.scss";
import { useSelector } from "react-redux";
import InputPostComponents from "./features_components/Micro_components/InputPostComponents";
import AlertDeleteAccount from "./features_components/Micro_components/MiniMicro_Components/AlertDeleteAccount";
import BugReport from "./features_components/Micro_components/MiniMicro_Components/BugReport";

function PopOptions() {
  const { dltCheck } = useSelector((state) => state.CheckDeleteReducer);
  const { checkPost } = useSelector((state) => state.CheckMyPostReducer);
  const { CheckBugReport } = useSelector((state) => state.CheckDeleteReducer);
  return (
    <Fragment>
      {checkPost ? <InputPostComponents /> : null}
      {dltCheck ? <AlertDeleteAccount /> : null}
      {CheckBugReport ? <BugReport /> : null}
    </Fragment>
  );
}

export default PopOptions;
