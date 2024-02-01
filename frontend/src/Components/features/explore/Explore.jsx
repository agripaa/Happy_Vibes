import React, { Fragment } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/Explore.scss";
import "../../css/Explore_TrendingPost.scss";
import "../../css/Explore_PaintingPost.scss";
import "../../css/myLibrary.scss";
import ComponentsSearchExplore from "./Micro_ComponentExplore/Component_Micro_Explore/SearchExplore";
import Component_TrendingPost from "./Micro_ComponentExplore/Component_TrendingToday";
import Component_People from "./Micro_ComponentExplore/Component_People";
import Component_Paingting from "./Micro_ComponentExplore/Component_Paingting";

import { useSelector } from "react-redux";
import Version from "../features_components/Micro_components/Version";

import Navbar from "../features_components/Navbar/Navbar";
import AsideSearchExplore from "../features_components/AsideSearch/AsideSearchExplore";
import OptionBugReport from "../features_components/Micro_components/option/OptionBugReport";
import CommentComponents from "../features_components/Micro_components/Comment/Comment";
import AlertReportPosting from "../features_components/Micro_components/alert/AlertReportPosting";
function Explore() {
  const CheckExplore = useSelector((state) => state.check);

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
      {CheckExplore.checkImageComment ? <CommentComponents /> : null}
      {CheckExplore.CheckBugReportPosting ? <AlertReportPosting /> : null}

      <OptionBugReport />
      <AsideSearchExplore />
      <Version />
    </Fragment>
  );
}

export default Explore;
