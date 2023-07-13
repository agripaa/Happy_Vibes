export const GETWIDTH = "GETWIDTH";
export const SAVEIMAGE = "SAVEIMAGE";
export const SAVEFILEIMAGE = "SAVEFILEIMAGE";
export const SETCREDENTIALIMAGE = "SETCREATEDENTIALIMAGE";

const initialState = {
  getwidth: innerWidth,
  getImage: null,
  getCredentialImage: {},
};

const PostRdc = (state = initialState, action) => {
  switch (action.type) {
    case GETWIDTH:
      return {
        ...state,
        getwidth: action.payload.getwidth,
      };
    case SAVEIMAGE:
      return {
        ...state,
        getImage: action.payload.getImage,
      };
      case SAVEFILEIMAGE:
        return{
          ...state,
          getFileImage: action.payload.getFileImage
        }

    case SETCREDENTIALIMAGE:
      return {
        ...state,
        getCredentialImage: action.payload.getCredentialImage,
      };
    default:
      return state;
  }
};
export default PostRdc;
