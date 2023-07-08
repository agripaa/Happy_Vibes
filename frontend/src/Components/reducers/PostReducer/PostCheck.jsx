export const CHECKPOST = "CHECKPOST";
export const CHECKCOMMENT = "CHECKCOMMENT";
let InitialState = {
  checkPost: false,
  checkImageComment: false,
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
    default:
      return state;
  }
};
export default CheckMyPost;
