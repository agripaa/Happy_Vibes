import ImageLove from "@icons/Vector-Like.svg";
import ImageLikeLove from "@icons/heart-red.svg";
import ImageChat from "@icons/Vector-Chat.svg";
import ImageShare from "@icons/Vector-Share.svg";
import ImageBookmarks from "@icons/Vector-Bookmarks.svg";
import ImageChat2 from "@icons/chat-components.svg";
import ImageDummy from "@icons/imageDummy2.png";
import ImageDummy2 from "@icons/Frame_10.png";
import ImageDummy3 from "@icons/img-1.png";
import ImageProfilePage from "@icons/Background-profile.png";
import ImageBack from "@icons/Vector-back.png";
import ImageSend from "@icons/sendImage.png";
import Verified from "@icons/Verified.svg";
import ImageBug from "@icons/bug_report.svg";
import ImageDeleteAccount from "@icons/delete.svg";
import ImageLogout from "@icons/logout.svg";
import ImageBug2 from "@icons/bug_report2.svg";
import ImageDeleteAccount2 from "@icons/delete2.svg";
import ImageLogout2 from "@icons/logout2.svg";
import Close from "@icons/close-post.svg";
import inputImage from "@icons/imageInput.svg";
import ImgTesting from "@icons/img-3.png";
import ImgTesting2 from "@icons/img-2.png";
import PenPost from "@icons/pen.svg";
import LogoNavbar from "@icons/LogoHappyVibesTransparant.png";
import DeleteImgBackground from "@icons/deleteImage.svg";
import AddImageBackground from "@icons/addImage.svg";
import AddImagePP from "@icons/pencil.svg";
import EditDesc from "@icons/edit.svg";
import IconSearchExplore from "@icons/search-line.svg";
import alertRed from "@icons/alert-red2.svg";
import Bookmarked from "@icons/bookmark-line.svg";
import LogoutRed from "@icons/Logout-red.svg";
import ArrowRight from "@icons/arrow-right.svg";
import ArrowLeft from "@icons/arrow-left.svg";
import IconAddPost from "@icons/Vector-AddPost.svg";
import IconSuccessReport from "@icons/Vector-SuccessReport.svg";
import DummyBubbleStories from "@icons/imageBubbleStories.png";
import EyeStories from "@icons/Vector-EyeStories.svg";
import WarningStories from "@icons/Vector-Warning.svg";
//
import IconChangeBgStory from "@icons/Vector-ChangeColor.svg";
import IconChangeFontStory from "@icons/Vector-ChangeFont.svg";
import IconResetStory from "@icons/Vector-Reset.svg";
import IconUploadImgStory from "@icons/Vector-UploadImgStory.svg";

//
import IconListHome from "@icons/Vector-Home.svg";
import IconListHomeClick from "@icons/Vector-Home-Click.svg";
//
import IconListExplore from "@icons/Vector-Explore.svg";
import IconListExploreClick from "@icons/Vector-Explore-Click.svg";
//
import IconListNotifications from "@icons/Vector-Notifications.svg";
import IconListNotificationsClick from "@icons/Vector-Notifications-Click.svg";
//
import IconListProfile from "@icons/Vector-Profile.svg";
import IconListProfileClick from "@icons/Vector-Profile-Click.svg";
//
import IconListMessage from "@icons/Vector-Message.svg";
import IconListMessageClick from "@icons/Vector-Message-Click.svg";

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
  ImageDummy,
  ImageDummy2,
  ImageDummy3,
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
  IconUploadImgStory,
  DummyBubbleStories,
  EyeStories,
  WarningStories,
};
const IconComponent = createSlice({
  name: "icon",
  initialState,
});

export default IconComponent.reducer;
