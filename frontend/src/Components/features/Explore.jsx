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
import Component_TagHot from "./features_components/Micro_ComponentExplore/Component_TagHot";

import Component_TrendingPost from "./features_components/Micro_ComponentExplore/Component_TrendingToday";
import Component_People from "./features_components/Micro_ComponentExplore/Component_People";
import Component_Paingting from "./features_components/Micro_ComponentExplore/Component_Paingting";
import OptionBugReport from "./features_components/Micro_components/MiniMicro_Components/OptionBugReport";
function Explore() {
  return (
    <Fragment>
      <Navbar />
      <div className="Container-Explore">
        <div className="WrapExplore">
          <ComponentsSearchExplore />
          <Component_TagHot />
          <Component_TrendingPost />
          <Component_People />
          <Component_Paingting />
        </div>
      </div>
      <OptionBugReport />
      <AsideSearchExplore />
    </Fragment>
  );
}

export default Explore;
