export const CHECKPOST = "CHECKPOST";
let InitialState = {
  checkPost: false,
};

const CheckMyPost = (state = InitialState, action) => {
  switch (action.type) {
    case CHECKPOST:
      return {
        ...state,
        checkPost: action.payload.checkpst,
      };
    default:
      return state;
  }
};
export default CheckMyPost;
