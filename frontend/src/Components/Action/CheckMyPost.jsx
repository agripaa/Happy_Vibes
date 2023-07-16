import {
  CHECKCOMMENT,
  CHECKPOST,
  CHECKTRUECROP,
  CHECKIDPOST
} from "../reducers/PostReducer/PostCheck";

export const CheckMyPostUser = (check) => {
  return (dispatch) => {
    dispatch({
      type: CHECKPOST,
      payload: {
        checkpst: check,
      },
    });
  };
};
export const CheckImageUserComment = (check) => {
  return (dispatch) => {
    dispatch({
      type: CHECKCOMMENT,
      payload: {
        checkImageComment: check,
      },
    });
  };
};
export const CheckPostId = (postId) => {
  return (dispatch) => {
    dispatch({
      type: CHECKIDPOST,
      payload: {
        postID: postId
      }
    })
  }
}
export const CheckCropImageUser = (check) => {
  return (dispatch) => {
    dispatch({
      type: CHECKTRUECROP,
      payload: {
        checkImageTrueCrop: check,
      },
    });
  };
};
