import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

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
import ImageDummy from "../img/imageDummy2.png";
import ImageDummy2 from "../img/Frame_10.png";
import ImageLove from "../img/Vector-Like.png";
import ImageChat from "../img/Vector-Chat.png";
import ImageShare from "../img/Vector-Share.png";
import ImageBookmarks from "../img/Vector-Save.png";
import ImageChat2 from "../img/chat-components.svg";
import Verified from "../img/Verified.svg";
import Component_TrendingPost from "./features_components/Micro_ComponentExplore/Component_TrendingToday";
import Component_People from "./features_components/Micro_ComponentExplore/Component_People";
import ListPost_Trending from "./features_components/Micro_ComponentExplore/Component_TrendingPost/ListPost-Trending";
import Component_Paingting from "./features_components/Micro_ComponentExplore/Component_Paingting";
function Explore() {
  return (
    <Fragment>
      <Navbar />
      <div className="Container-Explore">
        <div className="WrapExplore">
          <ComponentsSearchExplore />
          <Component_TagHot />
          <Component_TrendingPost
            ImageDummy={ImageDummy}
            ImageDummy2={ImageDummy2}
            ImageLove={ImageLove}
            ImageChat={ImageChat}
            ImageShare={ImageShare}
            ImageBookmarks={ImageBookmarks}
          />
          <Component_People
            ImageDummy={ImageDummy}
            ImageDummy2={ImageDummy2}
            Verified={Verified}
          />
          <Component_Paingting
            ImageDummy={ImageDummy}
            ImageDummy2={ImageDummy2}
            ImageLove={ImageLove}
            ImageChat={ImageChat}
            ImageShare={ImageShare}
            ImageBookmarks={ImageBookmarks}
          />
        </div>
      </div>
      <AsideSearchExplore />
    </Fragment>
  );
}

export default Explore;
