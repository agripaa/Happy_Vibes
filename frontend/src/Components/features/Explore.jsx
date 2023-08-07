import React, { Fragment } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "./features_components/Navbar";
import "../css/Explore.scss";
import "../css/Explore_TrendingPost.scss";
import "../css/Explore_PaintingPost.scss";
import "../css/myLibrary.scss";
import AsideSearchExplore from "./features_components/AsideSearchExplore";
import ComponentsSearchExplore from "./features_components/Micro_components/SearchExplore";
import Component_TrendingPost from "./features_components/Micro_ComponentExplore/Component_TrendingToday";
import Component_People from "./features_components/Micro_ComponentExplore/Component_People";
import Component_Paingting from "./features_components/Micro_ComponentExplore/Component_Paingting";
import OptionBugReport from "./features_components/Micro_components/MiniMicro_Components/OptionBugReport";
import CommentComponents from "./features_components/Micro_components/Comment";
import { useSelector } from "react-redux";
import Version from "./features_components/Micro_components/Version";
import BugReportPosting from "./features_components/Micro_components/MiniMicro_Components/BugReportPosting";
import AlertReportPosting from "./features_components/Micro_components/MiniMicro_Components/BugReportPosting";
function Explore() {
  const myComment = useSelector((state) => state.CheckMyPostReducer);
  const checkReport = useSelector((state) => state.CheckDeleteReducer);

  return (
    <Fragment>
      <Navbar />
      <div className="Container-Explore">
        <div className="WrapExplore">
          <ComponentsSearchExplore />
          {/* <Component_TagHot /> */}
          <Component_TrendingPost />
          <Component_People />
          <Component_Paingting />
        </div>
      </div>
      {myComment.checkImageComment ? <CommentComponents /> : null}
      {checkReport.CheckBugReportPosting ? <AlertReportPosting /> : null}

      <OptionBugReport />
      <AsideSearchExplore />
      <Version />
    </Fragment>
  );
}

export default Explore;
