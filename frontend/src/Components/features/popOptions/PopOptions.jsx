import React, { Fragment } from "react";
import "../../css/Navbar/Navbar.scss";
import { useSelector } from "react-redux";
import InputPostComponents from "./Component_PopOptions/InputPostComponents";
import AlertDeleteAccount from "../features_components/Micro_components/alert/AlertDeleteAccount";
import BugReport from "../features_components/Micro_components/bug/BugReport";
import PostStory from "../features_components/Micro_components/post/PostStory/PostStory";

import ContainerDisplayStories from "../homepage/Micro_ComponentHomePage/DisplayStories/ContainerDisplayStories";

function PopOptions() {
  const { dltCheck, checkPost, CheckBugReport, checkUploadStory } = useSelector(
    (state) => state.check
  );

  return (
    <Fragment>
      {checkPost ? <InputPostComponents /> : null}
      {dltCheck ? <AlertDeleteAccount /> : null}
      {CheckBugReport ? <BugReport /> : null}
      {checkUploadStory ? <PostStory /> : null}
      {/* <ContainerDisplayStories /> */}
    </Fragment>
  );
}

export default PopOptions;
