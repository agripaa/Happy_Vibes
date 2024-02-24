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
} = SliceCheck.actions;
export default SliceCheck.reducer;
