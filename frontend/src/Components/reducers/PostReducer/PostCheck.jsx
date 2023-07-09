export const CHECKPOST = "CHECKPOST";
export const CHECKCOMMENT = "CHECKCOMMENT";
export const CHECKTRUECROP = "CHECKTRUECROP";
let InitialState = {
  checkPost: false,
  checkImageComment: false,
  checkImageTrueCrop: false,
};

const CheckMyPost = (state = InitialState, action) => {
  switch (action.type) {
    case CHECKPOST:
      return {
        ...state,
        checkPost: action.payload.checkpst,
      };
    case CHECKCOMMENT:
      return {
        ...state,
        checkImageComment: action.payload.checkImageComment,
      };
    case CHECKTRUECROP:
      return {
        ...state,
        checkImageTrueCrop: action.payload.checkImageTrueCrop,
      };
    default:
      return state;
  }
};
export default CheckMyPost;
