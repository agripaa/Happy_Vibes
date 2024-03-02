import { createSlice } from "@reduxjs/toolkit";

let InitialState = {
  checkPost: false,
  checkImageComment: false,
  checkImageTrueCrop: false,
  postId: null,
  dltCheck: false,
  dltCheckNav: false,
  CheckBugReport: false,
  CheckBugReportPosting: false,
  checkEdit: false,
  dltCheckPosting: false,
  checkoptionListPosting: false,
  checkReportPosting: false,
  checkReportAccount: false,
  checkBgMore: false,
  checkBgUpload: false,
  checkSubmitReport: {
    PopUp: false,
    index: 0,
    typeReport: "",
  },
};

const SliceCheck = createSlice({
  name: "checked",
  initialState: InitialState,
  reducers: {
    CheckMyPostUser: (state, action) => {
      state.checkPost = action.payload;
    },
    CheckImageUserComment: (state, action) => {
      state.checkImageComment = action.payload;
    },
    CheckPostId: (state, action) => {
      state.postId = action.payload;
    },
    CheckCropImageUser: (state, action) => {
      state.checkImageTrueCrop = action.payload;
    },
    //Action Check delete and bug
    DELETECHECK: (state, action) => {
      state.dltCheck = action.payload;
    },
    DELETECHECKNAV: (state, action) => {
      state.dltCheckNav = action.payload;
    },
    CHECKBUG: (state, action) => {
      state.CheckBugReport = action.payload;
    },
    CheckEditProfil: (state, action) => {
      state.checkEdit = action.payload;
    },
    CheckDeletePosting: (state, action) => {
      state.dltCheckPosting = action.payload;
    },

    CheckBugReportPost: (state, action) => {
      state.CheckBugReportPosting = action.payload;
    },
    CheckoptionListPosting: (state, action) => {
      state.checkoptionListPosting = action.payload;
    },
    CheckReportPosting: (state, action) => {
      state.checkReportPosting = action.payload;
    },
    CheckReportAccount: (state, action) => {
      state.checkReportAccount = action.payload;
    },
    CheckBgMore: (state, action) => {
      state.checkBgMore = action.payload;
    },
    CheckBgUpload: (state, action) => {
      state.checkBgUpload = action.payload;
    },
    CheckSubmitReport: (state, action) => {
      state.checkSubmitReport = action.payload;
    },
  },
});

export const {
  CheckMyPostUser,
  CheckImageUserComment,
  CheckPostId,
  CheckCropImageUser,
  DELETECHECK,
  DELETECHECKNAV,
  CHECKBUG,
  CheckEditProfil,
  CheckDeletePosting,
  CheckBugReportPost,
  CheckoptionListPosting,
  CheckReportPosting,
  CheckReportAccount,
  CheckBgMore,
  CheckBgUpload,
  CheckSubmitReport,
} = SliceCheck.actions;
export default SliceCheck.reducer;
