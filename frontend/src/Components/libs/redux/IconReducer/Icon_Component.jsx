import ImageLove from "../../../img/Vector-Like.svg";
import ImageLikeLove from "../../../img/heart-red.svg";
import ImageChat from "../../../img/Vector-Chat.svg";
import ImageShare from "../../../img/Vector-Share.svg";
import ImageBookmarks from "../../../img/Vector-Bookmarks.svg";
import ImageChat2 from "../../../img/chat-components.svg";
import ImageDummy2 from "../../../img/Frame_10.png";
import ImageDummy from "../../../img/imageDummy2.png";
import ImageProfilePage from "../../../img/Background-profile.png";
import ImageBack from "../../../img/Vector-back.png";
import ImageSend from "../../../img/sendImage.png";
import Verified from "../../../img/Verified.svg";
import ImageBug from "../../../img/bug_report.svg";
import ImageDeleteAccount from "../../../img/delete.svg";
import ImageLogout from "../../../img/logout.svg";
import ImageBug2 from "../../../img/bug_report2.svg";
import ImageDeleteAccount2 from "../../../img/delete2.svg";
import ImageLogout2 from "../../../img/logout2.svg";
import Close from "../../../img/close-post.svg";
import inputImage from "../../../img/imageInput.svg";
import ImgTesting from "../../../img/img-3.png";
import ImgTesting2 from "../../../img/img-2.png";
import PenPost from "../../../img/pen.svg";
import LogoNavbar from "../../../img/LogoHappyVibesTransparant.png";
import DeleteImgBackground from "../../../img/deleteImage.svg";
import AddImageBackground from "../../../img/addImage.svg";
import AddImagePP from "../../../img/pencil.svg";
import EditDesc from "../../../img/edit.svg";
import IconSearchExplore from "../../../img/search-line.svg";
import alertRed from "../../../img/alert-red2.svg";
import Bookmarked from "../../../img/bookmark-line.svg";
import LogoutRed from "../../../img/Logout-red.svg";
import ArrowRight from "../../../img/arrow-right.svg";
import ArrowLeft from "../../../img/arrow-left.svg";
import IconAddPost from "../../../img/Vector-AddPost.svg";
import IconSuccessReport from "../../../img/Vector-SuccessReport.svg";
import IconChangeBgStory from "../../../img/Vector-ChangeColor.svg";
import IconChangeFontStory from "../../../img/Vector-ChangeFont.svg";
import IconResetStory from "../../../img/Vector-Reset.svg";

//
import IconListHome from "../../../img/Vector-Home.svg";
import IconListHomeClick from "../../../img/Vector-Home-Click.svg";
//
import IconListExplore from "../../../img/Vector-Explore.svg";
import IconListExploreClick from "../../../img/Vector-Explore-Click.svg";
//
import IconListNotifications from "../../../img/Vector-Notifications.svg";
import IconListNotificationsClick from "../../../img/Vector-Notifications-Click.svg";
//
import IconListProfile from "../../../img/Vector-Profile.svg";
import IconListProfileClick from "../../../img/Vector-Profile-Click.svg";
//
import IconListMessage from "../../../img/Vector-Message.svg";
import IconListMessageClick from "../../../img/Vector-Message-Click.svg";

import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  IconListHome,
  IconListHomeClick,
  IconListExplore,
  IconListExploreClick,
  IconListNotifications,
  IconListNotificationsClick,
  IconListProfile,
  IconListProfileClick,
  IconListMessage,
  IconListMessageClick,
  //

  ImageLove,
  ImageChat,
  ImageShare,
  ImageBookmarks,
  ImageChat2,
  ImageDummy2,
  ImageDummy,
  ImageProfilePage,
  ImageBack,
  Verified,
  ImageLikeLove,
  ImageBug,
  ImageDeleteAccount,
  ImageLogout,
  ImageBug2,
  ImageDeleteAccount2,
  ImageLogout2,
  Close,
  inputImage,
  ImageSend,
  PenPost,
  LogoNavbar,
  ImgTesting,
  ImgTesting2,
  DeleteImgBackground,
  AddImageBackground,
  AddImagePP,
  EditDesc,
  IconSearchExplore,
  alertRed,
  Bookmarked,
  LogoutRed,
  ArrowRight,
  ArrowLeft,
  IconAddPost,
  IconSuccessReport,
  IconChangeBgStory,
  IconChangeFontStory,
  IconResetStory,
};
const IconComponent = createSlice({
  name: "icon",
  initialState,
});

export default IconComponent.reducer;
