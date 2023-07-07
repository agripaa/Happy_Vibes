import {
  GETWIDTH,
  SAVEIMAGE,
  SETCREDENTIALIMAGE,
} from "../reducers/PosttRdc/PostRdc";

export const HandleGetWidth = (wdth) => {
  return (dispatch) => {
    dispatch({
      type: GETWIDTH,
      payload: {
        getwidth: wdth,
      },
    });
  };
};
export const HandleSaveImage = (image) => {
  return (dispatch) => {
    dispatch({
      type: SAVEIMAGE,
      payload: {
        getImage: image,
      },
    });
  };
};
export const HandleSaveCredential = (crd) => {
  return (dispatch) => {
    dispatch({
      type: SETCREDENTIALIMAGE,
      payload: {
        getCredentialImage: crd,
      },
    });
  };
};
